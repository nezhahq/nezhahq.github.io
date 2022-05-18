import DefaultTheme from 'vitepress/theme'
import DarkLayout from './DarkLayout.vue'
import DarkStyles from './dark-theme.css'

export { DarkStyles }

export default {
    ...DefaultTheme,
    // override the Layout with a wrapper component that injects the slots
    Layout: DarkLayout
}
