<script setup>
import BaseButton from './BaseButton.vue'

import { isPlaceholderValid, isInputValueValid } from '../validators.js'

import { ref } from 'vue'


defineProps({
   placeholder: {
      type: String,
      required: true,
      validator: isPlaceholderValid
   }
})

let inputValue = ref('')
let error = ref(false)

const emit = defineEmits({
   addNewValue: {
      type: String,
      validator: isInputValueValid
   }
})

function addNewValue() {
   if (isInputValueValid(inputValue.value)) {
      emit('addNewValue', inputValue.value)
      inputValue.value = ''
      console.log('if')
      return
   }
   error.value = true
   console.log('else')
}
</script>

<template>
   <div class="bg-stone-200 flex justify-between items-center pl-2 rounded-md mt-4">
      <input
         v-model="inputValue"
         :placeholder="placeholder"
         type="text"
         @input="error = false"
         class="outline-0 px-2 bg-stone-200 w-44 h-8 border-r duration-1000"
         :class="{
            'placeholder:text-red-500 text-red-500': error
         }"
      />
      <base-button @click="addNewValue()" :background="'text-lime-600'"> <slot></slot></base-button>
   </div>
</template>
