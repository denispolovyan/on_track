<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { ClockIcon } from '@heroicons/vue/24/outline'
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

const navItems = ['timeline', 'progress', 'activities']
</script>

<template>
   <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-10 py-5">
      <img class="h-20" src="./assets/Logo.png" alt="Logo" />
      <div class="flex gap-1 items-center font-semibold" v-if="false">
         <a href="#" class="">All done</a>
         <CheckCircleIcon class="w-5" />
      </div>
      <div class="flex gap-1 items-center font-semibold" v-else>
         <a href="#" class="">Progress</a>
         <p>20%</p>
         <p class="w-4 h-4 bg-red-600 rounded-full"></p>
      </div>
   </header>
   <main class="px-10 py-2 flex flex-col flex-grow">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni recusandae eos cupiditate
      repellendus distinctio voluptas. Nisi quia ea maxime libero nulla corporis error, perspiciatis
      expedita sint earum omnis tempora eius reiciendis sapiente vel! Unde esse ut officiis at
      distinctio neque quam, voluptas culpa! Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Magni recusandae eos cupiditate repellendus distinctio voluptas. Nisi quia ea maxime
      libero nulla corporis error, perspiciatis expedita sint earum omnis tempora eius repellendus
      exercitationem hic, dolorum nam tenetur eligendi non. Pariatur incidunt nulla placeat dicta
      cum ducimus fuga sint beatae fugit maxime expedita minima obcaecati debitis ab ut porro
      molestias tempore hic accusantium cumque saepe asperiores vero, assumenda reprehenderit.
      Magnam neque sunt voluptas officia id, laboriosam unde quisquam quasi velit in commodi non
      suscipit quo, perferendis earum maiores ex reiciendis sapiente vel! Unde esse ut officiis at
      distinctio neque quam, voluptas culpa! Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Magni recusandae eos cupiditate repellendus distinctio voluptas. Nisi quia ea maxime
      libero nulla corporis error, perspiciatis expedita sint earum omnis tempora eius repellendus
      exercitationem hic, dolorum nam tenetur eligendi non. Pariatur incidunt nulla placeat dicta
      cum ducimus fuga sint beatae fugit maxime expedita minima at distinctio neque quam, voluptas
      culpa!
   </main>
   <nav class="sticky bottom-0 z-20 border-t bg-white p-5">
      <ul class="divide-x flex items-center justify-around">
         <li class="flex-1 border-zinc-400" v-for="el in navItems" :key="el">
            <a :href="`#${el}`" class="flex flex-col items-center p-2 text-md capitalize" href="#"
               ><p>{{ el }}</p>
               <span v-if="el == 'timeline'">
                  <ClockIcon class="w-8" />
               </span>
               <span v-else-if="el === 'progress'">
                  <p class="w-4 h-4 bg-red-600 rounded-full my-1"></p>
               </span>
               <span v-else-if="el == 'activities'">
                  <ClipboardDocumentListIcon class="w-8"/>
               </span>
            </a>
         </li>
         <!-- <li class="flex-1 border-zinc-400">
            <a class="flex flex-col items-center p-2 text-md capitalize" href="#"
               ><p>Timeline</p>
               <ClockIcon class="w-8"
            /></a>
         </li>
         <li class="flex-1 border-zinc-400">
            <a class="flex flex-col items-center p-2 text-md capitalize gap-1" href="#"
               ><p>Progress</p>
               <p class="w-4 h-4 bg-red-600 rounded-full"></p>
            </a>
         </li>
         <li class="flex-1 border-zinc-400">
            <a class="flex flex-col items-center p-2 text-md capitalize" href="#"
               ><p>Activities</p>
               <ClipboardDocumentListIcon class="w-8"
            /></a>
         </li> -->
      </ul>
   </nav>
</template>

<style></style>
