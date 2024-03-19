import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import ActionButtons from './components/ActionButtons.vue';
import DocFooter from './components/DocFooter.vue';
import GithubCounterBtn from './components/GithubCounterBtn.vue';
import SubscribeAlert from './components/SubscribeAlert.vue';
import HomeVueThemesCallOut from './components/VueThemesCallOut.vue';
import './custom.scss';
import './tailwind.css';

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'home-features-before': h(HomeVueThemesCallOut),
            'doc-after': h(DocFooter),
            'home-hero-before': h(SubscribeAlert),
            'home-hero-actions-after': h(ActionButtons),
            'nav-bar-content-after': h(GithubCounterBtn),
        })
    }
}
