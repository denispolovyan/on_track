<script>
export default {
   inheritAttrs: false
}
</script>

<template>
   <li class="flex-1 border-zinc-400 ">
      <a v-bind="$attrs" class="flex flex-col items-center p-4 text-md">
         <slot></slot>
      </a>
   </li>
</template>
