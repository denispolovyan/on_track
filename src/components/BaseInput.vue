<script setup>
import BaseButton from './BaseButton.vue'

import { isPlaceholderValid, isStringNotNumber } from '../validators.js'

import { ref } from 'vue'

defineProps({
   placeholder: {
      type: String,
      required: false,
      default() {
         return 'Input'
      },
      validator(value) {
         return isPlaceholderValid(value)
      }
   }
})

const emit = defineEmits({
   addNewValue: {
      type: String,
      required: true
   }
})

let inputValue = ref('')
let error = ref(false)

function generateNewValue() {
   if (isStringNotNumber(inputValue.value)) {
      emit('addNewValue', inputValue.value)
      inputValue.value = ''
      return
   }
   error.value = true
}
</script>

<template>
   <div class="bg-stone-200 flex justify-between items-center pl-2 rounded-md mt-4">
      <input
         v-model="inputValue"
         :placeholder="placeholder"
         type="text"
         maxlength="25"
         @input="error = false"
         class="outline-0 px-2 bg-stone-200 w-full h-8 border-r duration-1000"
         :class="{
            'placeholder:text-red-500 text-red-500': error
         }"
      />
      <base-button
         @clickButton="generateNewValue()"
         :background="'bg-green-500 hover:bg-green-700 duration-500 text-white'"
      >
         <slot></slot
      ></base-button>
   </div>
</template>
