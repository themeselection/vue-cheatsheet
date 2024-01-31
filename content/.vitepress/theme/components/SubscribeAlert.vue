<script lang="ts" setup>
import { ref } from 'vue';

const isSuccess = ref()
const params = new URLSearchParams(window.location.search)
isSuccess.value = params.get('success') === 'success'
</script>

<template>
    <div class="mb-16 px-8 py-3 bg-emerald-500 text-white font-medium dark:bg-emerald-600 mb-12" v-if="isSuccess">
        <p class="text-center">You have successfully subscribed to our newsletter
        </p>
    </div>
</template>
