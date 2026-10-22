<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ locale?: 'zh' | 'en' }>(), { locale: 'zh' })
const selected = ref(0)
const copy = computed(() => props.locale === 'en' ? {
  eyebrow: 'NEZHA × MODEL CONTEXT PROTOCOL',
  title: 'Let AI understand your servers—and help you manage them.',
  description: 'Use Codex, OpenClaw, or Claude Code to check your servers, investigate issues, and carry out changes you authorize. Describe the task, then review the findings and results.',
  connect: 'See setup steps', scenarios: 'Explore use cases',
  guide: '/en_US/guide/mcp.html#connect-clients',
  badges: ['Self-hosted monitoring', 'You control access', 'Reuse connected servers'],
  example: 'WORKFLOW EXAMPLE · NO LIVE SERVER CONNECTION',
  prompt: 'Your request', tools: 'How it works', outcome: 'What you get',
  steps: ['Describe the task', 'Check current state', 'Act as authorized', 'Verify the result'],
  cases: [
    { name: 'Fleet inspection', prompt: 'Check my authorized servers for disk pressure and runtime versions. List unreachable hosts separately. Do not change anything.', tools: 'List servers → Check state → Run inspection commands', outcome: 'A per-server inspection report, with observed findings, unknowns, and next actions kept separate.' },
    { name: 'Incident diagnosis', prompt: 'Explain this high-memory alert. Inspect current state and relevant logs, then propose a targeted fix.', tools: 'Check state → Read logs → Run diagnostics', outcome: 'A diagnosis tied to actual evidence, followed by a specific plan rather than an unverified restart.' },
    { name: 'Change verification', prompt: 'Review this configuration change. Back up the file, check for conflicting edits, and validate the service after the approved change.', tools: 'Read configuration → Apply approved changes → Check the service', outcome: 'A configuration diff and before/after checks. Arrange backups and approval in your workflow.' },
    { name: 'Alert-assisted response', prompt: 'When an alert reaches my assistant, gather a fresh diagnosis and prepare a response that preserves essential processes.', tools: 'Receive alert → Inspect with AI → Propose a response', outcome: 'A response based on current conditions. Configure alert reception in your assistant; manage alerts and tasks in Nezha’s admin UI or REST API.' }
  ]
} : {
  eyebrow: 'NEZHA × MODEL CONTEXT PROTOCOL',
  title: '让 AI 读懂服务器，也能动手运维。',
  description: '用 Codex、OpenClaw、Claude Code 检查服务器、排查故障，并执行你授权的修改。说出要做的事，再查看检查依据和操作结果。',
  connect: '查看接入步骤', scenarios: '看看能做什么',
  guide: '/guide/mcp.html#connect-clients',
  badges: ['监控自托管', '访问范围由你决定', '复用已接入的服务器'],
  example: '交互式工作流示意 · 不连接真实服务器',
  prompt: '你提出需求', tools: '如何完成', outcome: '你得到什么',
  steps: ['说出需求', '检查现状', '按授权操作', '验证结果'],
  cases: [
    { name: '多机巡检', prompt: '检查我有权限的服务器：磁盘是否紧张、运行时版本是什么。单独列出无法连接的节点，先不要做任何修改。', tools: '获取清单 → 检查状态 → 运行巡检命令', outcome: '一份逐台巡检报告：发现了什么、哪些还不确定、下一步怎么处理。' },
    { name: '故障排查', prompt: '解释这条高内存告警。先检查当前状态和相关日志，再给出针对性处置方案。', tools: '查看状态 → 读取日志 → 运行诊断', outcome: '基于真实证据定位问题，给出具体方案；执行重启等变更前按你的授权流程处理。' },
    { name: '变更验证', prompt: '检查这份配置变更。先备份文件并检查有无并发修改，按批准的方案修改后验证服务。', tools: '读取配置 → 按批准方案修改 → 检查服务', outcome: '拿到配置差异和修改前后的检查结果；备份与确认步骤由你的工作流安排。' },
    { name: '告警协同', prompt: '告警到达我的助手后，先重新诊断，再准备一个保留关键进程的处置方案。', tools: '接收告警 → AI 检查现状 → 提出处置方案', outcome: '根据当前情况准备处置方案。助手需配置告警接收，告警与任务通过哪吒后台或 REST API 管理。' }
  ]
})
const activeCase = computed(() => copy.value.cases[selected.value])
const panelId = computed(() => `mcp-workflow-${props.locale}`)
function selectWithKeyboard(event: KeyboardEvent, index: number) {
  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % copy.value.cases.length
  else if (event.key === 'ArrowLeft') next = (index + copy.value.cases.length - 1) % copy.value.cases.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = copy.value.cases.length - 1
  else return
  event.preventDefault()
  selected.value = next
  const tabs = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  tabs?.[next]?.focus()
}
</script>

<template>
  <section class="mcp-feature" :aria-label="locale === 'en' ? 'AI-powered operations with Nezha MCP' : '哪吒 MCP 智能运维'">
    <div class="mcp-hero">
      <p class="mcp-eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="mcp-description">{{ copy.description }}</p>
      <div class="mcp-actions">
        <a class="mcp-primary" :href="copy.guide">{{ copy.connect }} <span aria-hidden="true">→</span></a>
        <a class="mcp-secondary" href="#scenarios">{{ copy.scenarios }} <span aria-hidden="true">↓</span></a>
      </div>
      <ul class="mcp-badges" :aria-label="locale === 'en' ? 'Key benefits' : '产品特色'">
        <li v-for="badge in copy.badges" :key="badge"><span aria-hidden="true">◆</span>{{ badge }}</li>
      </ul>
    </div>
    <div class="mcp-demo">
      <p class="mcp-example-label"><span class="mcp-indicator" aria-hidden="true"></span>{{ copy.example }}</p>
      <div class="mcp-tabs" role="tablist" :aria-label="locale === 'en' ? 'Operations scenarios' : '运维场景'">
        <button v-for="(item, index) in copy.cases" :id="`${panelId}-tab-${index}`" :key="item.name"
          type="button" role="tab" :aria-selected="selected === index" :aria-controls="panelId"
          :tabindex="selected === index ? 0 : -1" :class="{ active: selected === index }"
          @click="selected = index" @keydown="selectWithKeyboard($event, index)">
          {{ item.name }}
        </button>
      </div>
      <div :id="panelId" class="mcp-panel" role="tabpanel" :aria-labelledby="`${panelId}-tab-${selected}`" tabindex="0">
        <p class="mcp-small-label">{{ copy.prompt }}</p>
        <p class="mcp-prompt">{{ activeCase.prompt }}</p>
        <ol class="mcp-steps">
          <li v-for="(step, index) in copy.steps" :key="step"><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ step }}</li>
        </ol>
        <div class="mcp-tool-row"><span>{{ copy.tools }}</span><p class="mcp-path">{{ activeCase.tools }}</p></div>
        <div class="mcp-outcome"><p class="mcp-small-label">{{ copy.outcome }}</p><p>{{ activeCase.outcome }}</p></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mcp-feature { margin: 0 0 44px; }
.mcp-hero { padding: 30px 0 22px; }
.mcp-feature .mcp-eyebrow { margin: 0 0 20px; color: var(--vp-c-brand-1); font-size: 11px; font-weight: 750; letter-spacing: .14em; }
.mcp-feature h1 { max-width: 760px; margin: 0 0 22px; font-size: clamp(34px, 4.2vw, 54px); line-height: 1.17; letter-spacing: -.045em; font-weight: 760; text-wrap: balance; }
.mcp-description { max-width: 650px; color: var(--vp-c-text-2); font-size: 17px; line-height: 1.85; text-wrap: pretty; }
.mcp-actions { display: flex; flex-wrap: wrap; gap: 12px; margin: 26px 0 22px; }
.mcp-actions a { display: inline-flex; align-items: center; justify-content: space-between; gap: 22px; padding: 12px 19px; border-radius: 9px; font-size: 14px; font-weight: 650; text-decoration: none; transition: background .15s; }
.mcp-actions .mcp-primary { background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); }
.mcp-actions .mcp-primary:hover { background: var(--vp-button-brand-hover-bg); color: var(--vp-button-brand-hover-text); }
.mcp-actions .mcp-secondary { color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.mcp-feature .mcp-badges { display: flex; flex-wrap: wrap; gap: 9px 22px; padding: 0; margin: 0; list-style: none; }
.mcp-feature .mcp-badges li { display: flex; gap: 8px; align-items: center; margin: 0; color: var(--vp-c-text-2); font-size: 12px; }
.mcp-badges span { font-size: 8px; color: var(--vp-c-brand-1); }
.mcp-demo { margin-top: 14px; border: 1px solid var(--vp-c-divider); border-radius: 16px; overflow: hidden; background: var(--vp-c-bg); box-shadow: 0 12px 32px -22px rgb(25 40 70 / 35%); }
.mcp-feature .mcp-example-label { display: flex; align-items: center; gap: 9px; margin: 0; padding: 16px 22px; border-bottom: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 12px; letter-spacing: .03em; }
.mcp-indicator { width: 7px; height: 7px; border: 2px solid var(--vp-c-brand-1); border-radius: 50%; }
.mcp-tabs { display: flex; flex-wrap: wrap; gap: 4px; padding: 12px 16px 0; }
.mcp-tabs button { padding: 8px 12px; border-radius: 7px; color: var(--vp-c-text-2); font-size: 12px; font-weight: 600; cursor: pointer; }
.mcp-tabs button:hover { background: var(--vp-c-bg-soft); }
.mcp-tabs button.active { color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.mcp-feature a:focus-visible, .mcp-feature button:focus-visible, .mcp-panel:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }
.mcp-panel { padding: 20px 22px 24px; }
.mcp-feature .mcp-small-label { margin: 0 0 7px; color: var(--vp-c-text-3); font-size: 11px; font-weight: 600; }
.mcp-feature .mcp-prompt { min-height: 78px; margin: 0; font-size: 16px; line-height: 1.75; font-weight: 550; }
.mcp-feature .mcp-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0 24px; padding: 0; list-style: none; }
.mcp-feature .mcp-steps li { display: flex; flex-direction: column; gap: 7px; margin: 0; padding-top: 10px; border-top: 2px solid var(--vp-c-brand-soft); font-size: 12px; color: var(--vp-c-text-2); }
.mcp-steps span { font-size: 11px; font-variant-numeric: tabular-nums; color: var(--vp-c-brand-1); }
.mcp-tool-row { display: flex; flex-direction: column; gap: 7px; padding: 14px 16px; border-radius: 8px; background: var(--vp-c-bg-soft); }
.mcp-tool-row span { color: var(--vp-c-text-3); font-size: 10px; }
.mcp-feature .mcp-tool-row .mcp-path { margin: 0; padding: 0; background: transparent; color: var(--vp-c-brand-1); font-size: 12px; line-height: 1.8; white-space: normal; overflow-wrap: anywhere; }
.mcp-outcome { padding: 16px 0 0; }
.mcp-outcome p:last-child { margin: 0; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.85; }
@media (max-width: 600px) {
  .mcp-hero { padding-top: 20px; }
  .mcp-feature h1 { font-size: 36px; }
  .mcp-description { font-size: 15px; }
  .mcp-feature .mcp-example-label { padding: 14px 16px; font-size: 11px; }
  .mcp-panel { padding: 18px 16px; }
  .mcp-tabs { padding: 10px 10px 0; }
  .mcp-tabs button { padding: 8px 9px; }
  .mcp-feature .mcp-steps { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .mcp-feature .mcp-prompt { min-height: 108px; font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) { .mcp-actions a { transition: none; } }
</style>
