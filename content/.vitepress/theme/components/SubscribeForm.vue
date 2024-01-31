<script lang="ts" setup>
</script>

<template>
    <p class="font-semibold leading-7 text-lg text-[var(--vp-c-brand-1)]">Stay connected with latest industry updates
    </p>
    <p class="my-4 mt-2 text-gray-500 dark:text-gray-400">Subscribe to get updated with our template updates,
        development-related resources, Freebies, and product offers.</p>
    <form class="flex items-center gap-4">
        <input type="email" required
            class="py-3 px-4 block w-full bg-white dark:bg-zinc-900 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:border-transparent dark:text-gray-400 dark:focus:ring-emerald-600"
            placeholder="john@mail.com" />
        <button
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[var(--vp-c-brand-1)] focus:ring-2 focus:outline-none focus:ring-emerald-500 text-white hover:bg-emerald-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-emerald-600">Subscribe</button>
    </form>
</template>
