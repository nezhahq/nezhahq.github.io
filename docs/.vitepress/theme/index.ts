import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HorizontalAd from './components/HorizontalAd.vue'
import VerticalAd from './components/VerticalAd.vue'

export default {
    ...DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-top': () => h(HorizontalAd),
            'aside-top': () => h(VerticalAd),
        })
    }
}
