import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parse, compileScript } from '@vue/compiler-sfc'
import { transformWithEsbuild } from 'vite'
import { createRenderer, nextTick } from 'vue'

// Test the real Vue component without a browser or a live server connection.
// This verifies interaction state and focus logic, not layout or browser behavior.
const source = readFileSync(new URL('../docs/.vitepress/theme/components/McpFeature.vue', import.meta.url), 'utf8')
const { descriptor } = parse(source)
const compiled = compileScript(descriptor, { id: 'mcp-feature-audit', inlineTemplate: true })
const transformed = await transformWithEsbuild(compiled.content, 'McpFeature.ts', { loader: 'ts' })
const code = transformed.code.replace(/from\s+["']vue["']/g, `from ${JSON.stringify(import.meta.resolve('vue'))}`)
const { default: Feature } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)

function node(tag, text = '') { return { tag, text, props: {}, children: [], parent: null } }
function insert(child, parent, anchor) {
  if (child.parent) remove(child)
  const at = anchor ? parent.children.indexOf(anchor) : -1
  parent.children.splice(at < 0 ? parent.children.length : at, 0, child)
  child.parent = parent
}
function remove(child) {
  const parent = child.parent
  if (parent) parent.children.splice(parent.children.indexOf(child), 1)
  child.parent = null
}
const renderer = createRenderer({
  createElement: (tag) => node(tag),
  createText: (text) => node('#text', text),
  createComment: (text) => node('#comment', text),
  setText: (target, text) => { target.text = text },
  setComment: (target, text) => { target.text = text },
  setElementText: (target, text) => { target.text = text; target.children = [] },
  patchProp: (target, key, _previous, value) => { target.props[key] = value },
  parentNode: (target) => target.parent,
  nextSibling: (target) => target.parent?.children[target.parent.children.indexOf(target) + 1] ?? null,
  insert, remove,
  insertStaticContent: (content, parent, anchor) => {
    const target = node('#static', content)
    insert(target, parent, anchor)
    return [target, target]
  }
})
function walk(root) { return [root, ...root.children.flatMap(walk)] }
function text(root) { return root.text + root.children.map(text).join(' ') }

let clicks = 0
let keyboardChecks = 0
for (const [locale, prefix, expected] of [
  ['zh', '/guide/', ['磁盘是否紧张', '高内存告警', '并发修改', '告警到达我的助手']],
  ['en', '/en_US/guide/', ['disk pressure', 'high-memory alert', 'conflicting edits', 'alert reaches my assistant']]
]) {
  const root = node('root')
  const app = renderer.createApp(Feature, { locale })
  app.mount(root)
  const tabs = () => walk(root).filter((item) => item.props.role === 'tab')
  const panel = () => walk(root).find((item) => item.props.role === 'tabpanel')
  assert.equal(tabs().length, 4, `${locale}: all four scenarios must be available`)
  assert.ok(walk(root).some((item) => item.props.href === `${prefix}mcp.html#connect-clients`))
  for (let index = 0; index < 4; index++) {
    tabs()[index].props.onClick()
    await nextTick()
    assert.equal(tabs().filter((item) => item.props['aria-selected']).length, 1)
    assert.equal(tabs()[index].props['aria-selected'], true)
    assert.equal(tabs()[index].props.tabindex, 0)
    assert.ok(text(panel()).includes(expected[index]), `${locale}: scenario ${index} did not change the prompt`)
    assert.equal(panel().props['aria-labelledby'], tabs()[index].props.id)
    clicks++
  }
  for (const [key, from, to] of [['Home', 3, 0], ['ArrowLeft', 0, 3], ['ArrowRight', 3, 0], ['End', 0, 3]]) {
    let focused = -1
    let prevented = false
    tabs()[from].props.onKeydown({
      key,
      preventDefault() { prevented = true },
      currentTarget: { parentElement: { querySelectorAll: () => tabs().map((_tab, index) => ({ focus() { focused = index } })) } }
    })
    await nextTick()
    assert.ok(prevented)
    assert.equal(focused, to)
    assert.equal(tabs()[to].props['aria-selected'], true)
    assert.ok(text(panel()).includes(expected[to]))
    keyboardChecks++
  }
  app.unmount()
}
console.log(`MCP feature audit passed: ${clicks} scenario selections and ${keyboardChecks} keyboard transitions across both languages. Browser layout remains a separate check.`)
