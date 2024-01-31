<script lang="ts" setup>
import { useData } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import SocialLinks from './SocialLinks.vue';
import SubscribeForm from './SubscribeForm.vue';

const { frontmatter } = useData()
const { hasSidebar } = useSidebar()

const firstColLinks = [
    { title: 'Freebies', link: 'https://themeselection.com/item/category/download-free-admin-templates/' },
    { title: 'UI Kits', link: 'https://themeselection.com/item/category/ui-kits/' },
    { title: 'Blog', link: 'https://themeselection.com/blog/' },
]

const secondColLinks = [
    { title: 'Vue.js Admin Templates', link: 'https://themeselection.com/item/category/vuejs-admin-templates/' },
    { title: 'Nuxt.js Admin Templates', link: 'https://themeselection.com/item/category/nuxt-admin-template/' },
    { title: 'Free Admin Templates', link: 'https://themeselection.com/item/category/free-admin-templates/' },
]
</script>

<template>
    <footer v-if="frontmatter.footer !== false" class="pt-12 px-6 bg-gray-100 dark:bg-zinc-800 sm:px-12 lg:px-16"
        :class="{ 'hidden': hasSidebar }">
        <div class="container mx-auto flex flex-wrap gap-y-14 gap-x-10 lg:justify-between  gap-y-4 mb-10">
            <div class="flex flex-col gap-4 items-start">
                <a v-for="(link, index) in firstColLinks" :key="index" target="_blank" rel="noreferrer" :href="link.link"
                    class="text-gray-500 hover:text-[var(--vp-c-brand-1)] dark:text-gray-400 dark:hover:text-[var(--vp-c-brand-1)]">{{
                        link.title
                    }}</a>
            </div>
            <div class="flex flex-col items-start gap-4">
                <a v-for="(link, index) in secondColLinks" :key="index" target="_blank" rel="noreferrer" :href="link.link"
                    class="text-gray-500 hover:text-[var(--vp-c-brand-1)] dark:text-gray-400 dark:hover:text-[var(--vp-c-brand-1)]">{{
                        link.title
                    }}</a>
            </div>
            <div class="col-span-2 max-w-lg">
                <SubscribeForm></SubscribeForm>
                <SocialLinks class="mt-6"></SocialLinks>
            </div>
        </div>
        <hr>

        <div class="container mx-auto flex items-center justify-between border-gray-300 dark:border-zinc-700 pt-8 pb-6 ">
            <a href="https://themeselection.com/" target="_blank">
                <img src="/brand-logo-small.png" alt="ThemeSelection" height="38" class="h-10" />
            </a>
            <div class="flex items-center gap-x-1">
                <span>© 2024-Present, Made with</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="red" fill-rule="evenodd"
                        d="M12 3.942a6.351 6.351 0 0 1 4.305-1.692c1.726 0 3.374.71 4.58 1.96a6.7 6.7 0 0 1 1.865 4.652a6.7 6.7 0 0 1-1.865 4.652c-.796.825-1.591 1.67-2.39 2.518c-1.624 1.724-3.265 3.467-4.97 5.108l-.003.004a2.213 2.213 0 0 1-3.113-.069l-7.295-7.561c-2.485-2.577-2.485-6.727 0-9.303A6.328 6.328 0 0 1 12 3.942"
                        clip-rule="evenodd" />
                </svg>
                <span>by <a href="https://themeselection.com/" rel="noreferrer" target="_blank"
                        class="text-[var(--vp-c-brand-1)]">ThemeSelection</a></span>
            </div>
        </div>
    </footer>
</template>
