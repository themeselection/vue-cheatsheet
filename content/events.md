# Events

## Declaring events

```vue
<script setup lang="ts">
// defineEmits with typescript
defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// with Array
defineEmits(['inFocus', 'submit'])
</script>
```

## Using Events

```vue
<!-- Emitting the events -->
<button @click="$emit('someEvent')">click me</button>

<!-- Listening to events -->
<MyComponent @some-event="handleEvent" />

<!-- Modifier can also be used on the event -->
<MyComponent @some-event.once="callback" />

<!-- Emit event with argument -->
<button @click="$emit('increaseBy', 1)">Increase by 1</button>
```

## Event Validation

```vue
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
