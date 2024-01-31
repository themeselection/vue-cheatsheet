import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import DocFooter from './components/DocFooter.vue';
import SiteTitle from './components/SiteTitle.vue';
import HomeVueThemesCallOut from './components/VueThemesCallOut.vue';
import './custom.scss';
import './tailwind.css';

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'home-features-before': h(HomeVueThemesCallOut),
            'doc-after': h(DocFooter),
            'nav-bar-title-after': h(SiteTitle),
        })
    }
}
