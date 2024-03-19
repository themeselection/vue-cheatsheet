<script lang="ts" setup>
import { useData } from 'vitepress';

const { isDark } = useData()
</script>
<template>
    <div class="mt-4 flex items-center gap-x-3">
        <a data-v-0c3feb32="" data-v-2270f7fa="" class="VPButton medium brand" href="/vue/basic.html">Let's Start</a>
        <a href="https://www.producthunt.com/posts/vue-cheatsheet?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-vue&#0045;cheatsheet"
            target="_blank"><img
                :src="`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445414&theme=${isDark ? 'dark' : 'light'}`"
                alt="Vue&#0032;CheatSheet - The&#0032;Ultimate&#0032;Vue&#0032;CheatSheet&#0032;For&#0032;Vue&#0044;&#0032;Vue&#0032;Router&#0032;&#0038;&#0032;Pinia | Product Hunt"
                style="width: auto; height: 40px;border: 1px solid #fff;border-radius: 6px;" width="auto"
                height="40" /></a>
    </div>
</template>
