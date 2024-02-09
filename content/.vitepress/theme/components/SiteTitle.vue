<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const { site, page } = useData()

const isHome = computed(() => page.value.frontmatter?.layout === 'home')
</script>

<template>
    <span v-if="!isHome">{{ site.title.split(' ').slice(0, 2).join(' ') }}</span>
</template>
