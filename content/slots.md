# Slots

```vue
<template>
    <!-- slot -->
    <button>
        <slot></slot>  <!-- slot Outlet -->
    </button>

    <!-- slot with fallback content -->
    <button type="submit">
        <slot>
            Submit <!-- fallback content -->
        </slot>
    </button>

    <!-- Named slots -->
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main> 
            <slot></slot> <!-- slot without name will be considered as default slot-->
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>

    <!-- Dynamic Slot names -->
     <base-layout>
        <template v-slot:[dynamicSlotName]>
            ...
        </template>

        <!-- with shorthand -->
        <template #[dynamicSlotName]>
            ...
        </template>
    </base-layout>

    <!-- Scoped Slots -->
    <MyComponent v-slot="slotProps">
        {{ slotProps.text }} {{ slotProps.count }}
    </MyComponent>

    <!-- Named Scoped Slots -->
    <MyComponent>
        <template #header="headerProps">
            {{ headerProps }}
        </template>

        <template #default="defaultProps">
            {{ defaultProps }}
        </template>

        <template #footer="footerProps">
            {{ footerProps }}
        </template>
    </MyComponent>
</template>
```
