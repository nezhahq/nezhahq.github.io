import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SmallAd from './components/SmallAd.vue'

export default {
    ...DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'aside-top': () => h(SmallAd)
        })
    }
}