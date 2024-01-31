<script lang="ts" setup>
</script>

<template>
    <p class="font-semibold leading-7 text-lg text-[var(--vp-c-brand-1)]">Subscribe to our newsletter
    </p>
    <p class="my-4 mt-2 text-gray-500 dark:text-gray-400">A weekly latest Articles, UI Kits, Free & Premium Resources.</p>
    <form action="https://themeselection.com/mailster/subscribe" method="post" class="flex items-center gap-4">

        <input name="_action" type="hidden" value="subscribe">
        <input name="_timestamp" type="hidden" value="1706684888">
        <input name="_referer" type="hidden" value="extern">
        <input name="_nonce" type="hidden" value="342601d290">
        <input name="formid" type="hidden" value="1">
        <input type="email" required name="email"
            class="py-3 px-4 block w-full bg-white dark:bg-zinc-900 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 dark:border-transparent dark:text-gray-400 dark:focus:ring-emerald-600"
            placeholder="john@mail.com" />
        <button type="submit"
            class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[var(--vp-c-brand-1)] focus:ring-2 focus:outline-none focus:ring-emerald-500 text-white hover:bg-emerald-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-emerald-600">Subscribe</button>
    </form>
</template>
