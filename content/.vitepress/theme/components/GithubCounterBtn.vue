<script lang="ts" setup>
import { useData } from 'vitepress';
import GithubButton from 'vue-github-button';

const { isDark } = useData()

console.log('theme :>> ', isDark.value);
</script>

<template>
    <div class="widget">
        <!-- Place this tag where you want the button to render. -->
        <github-button href="https://github.com/themeselection/vue-cheatsheet"
            :data-color-scheme="`no-preference: ${isDark ? 'dark' : 'light'};light: ${isDark ? 'dark' : 'light'} ; dark: ${isDark ? 'dark' : 'light'}`"
            data-icon="octicon-star" data-size="large" data-show-count="true"
            aria-label="Star themeselection/vue-cheatsheet on GitHub">Star</github-button>
    </div>
</template>

<style lang="scss">
.widget {
    display: block;
    margin-inline-start: 0.75rem;
    margin-block-start: 0.375rem;

    .social-count {
        display: none;
    }
}
</style>
