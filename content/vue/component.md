# Component

## Register Component

### Global Registration

```ts
import MyComponent from './MyComponent.vue'

app.component('MyComponent', MyComponent)

// We can chain component method
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Now `MyComponent` is globally available. We can use it in any component like below:

```vue
<MyComponent />
```

### Local Registration

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Defining a Component

### 1. SFC

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

### 2. `defineComponent`

```ts
import { ref, h, defineComponent } from 'vue'

const Comp = defineComponent(
  (props) => {

    return () => {
      return h('div', props.title)
    }
  },
  {
    props: {
      title: String,
    }
  }
)

export default Comp
```

### 3. `defineAsyncComponent`

```ts
defineAsyncComponent(() => import('@/components/TestCompo.vue'));
```

### 4. Using tsx

```vue
<script setup lang="tsx">
const Foo = (props: {msg: string}) => {
  return <div> {props.msg} </div>
}
</script>

<template>
  <Foo :msg="message" />
</template>

```

::: warning Warning
If using Vite - you need `@vitejs/plugin-vue-jsx` for this
:::

## Props

### Defining Props

```vue
<script setup lang="ts">
// Recommended way to define props
interface Props {
    title: string
    likes: number
}
defineProps<Props>()

// define props using Object
defineProps({
    title: String, 
    id: Number
})

// define props using Array
defineProps(['title', 'id'])

// Extending props with existing interface 
interface CustomProps extends Props {
    name: string
}
defineProps<CustomProps>()
</script>
```

### Prop Validation

We can validate prop using its types, required parameter, validator function. We can also pass default value to the prop.

```ts
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,

  // Multiple possible types
  propB: [String, Number],

  // Required string
  propC: {
    type: String,
    required: true
  },

  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },

  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },

  // Custom validator function
  // All props passed as 2nd argument in 3.4+
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },

  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory 
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  },

  // If you don't pass value to prop by default it will take false.
  propH: Boolean,

  // Change the default behavior of Boolean type prop.
  propI: {
    type: Boolean, 
    default: undefined,
  },

})
```

### Binding Props

```vue
<script setup lang="ts">
const propsData = {
  title: 'title',
  likes: 1,
  views: 1000
}

const id = ref(1)
const title = ref('vuexy')

</script>

<template>
    <!-- prop binding -->
    <MyComponent :title='title'></MyComponent>

    <!-- use v-bind directive prop to bind multiple props -->
    <MyComponent v-bind="propsData"></MyComponent>

    <!-- Same name shorthand (available in vue 3.4+) -->
    <Post :id :title />

    <!-- Boolean Casting -->

    <!-- equivalent of passing :disabled="true" -->
    <MyComponent disabled />

    <!-- equivalent of passing :disabled="false" -->
    <MyComponent />
</template>
```

### Two Way binding

```vue
<script>
  // two way binding with defineModel
  const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

```vue
<script>
  // making the v-model required
  const model = defineModel({ required: true })

  // providing a default value
  const model = defineModel({ default: 0 })

  // multiple v-model binding
  const firstName = defineModel('firstName')
  const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>

```

```vue
<script>
  // Handling v-model modifier
  const [model, modifiers] = defineModel({
    set(value) {
      if (modifiers.capitalize) {
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
      return value
    }
  })
</script>

<template>
  <MyComponent v-model.capitalize="myText" />
</template>
```

## Events

### Declaring events

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

### Using Events

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

### Event Validation

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

## Slots

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

## Provide & Inject

![Provide and Inject](https://vuejs.org/assets/provide-inject.tIACH1Z-.png)

::: code-group

```vue{2,8} [Parent.vue]
<script setup>
import { ref, provide } from 'vue'
import Child from './Child.vue'

// by providing a ref, the GrandChild
// can react to changes happening here.
const message = ref('hello')
provide('message', message)
</script>

<template>
  <input v-model="message">
  <Child />
</template>
```

```vue [Child.vue]
<script setup>
import GrandChild from './GrandChild.vue'
</script>

<template>
  <GrandChild />
</template>
```

```vue{2,4} [GrandChild.vue  ]
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    Message to grand child: {{ message }}
  </p>
</template>
```

:::
