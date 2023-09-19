<script setup>
defineProps({
   text: {
      type: String,
      required: true
   },
	color: {
		type: String,
		required: false
	}
})
</script>

<template>
   <div class="w-full h-12 border rounded-md flex justify-center items-center duration-700 uppercase font-semibold cursor-pointer" :class="color"><p>delete</p></div>
</template>
