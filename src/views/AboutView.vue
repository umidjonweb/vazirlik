<script  setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

import SearchInstuction from './SearchInstuction.vue';
import { getStatistic_API } from '@/services/instruction'
const _statistics = ref([])
const router = useRouter()
async function getInstruction() {
   const [response, error] = await getStatistic_API()
   if (error) return
   _statistics.value = response
}
getInstruction()
</script>

<template>
   <div class="about">
      <h2>Кўрсатмалар v1.0e</h2>
      <div class="cards">
         <div style="border: 1px solid #ccc; border-radius: 6px;" >
            <div class="content2">
               <svg style="width: 64px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 9.5V12.5C21 14.9853 16.9706 17 12 17C7.02944 17 3 14.9853 3 12.5V9.5C3 11.9853 7.02944 14 12 14C16.9706 14 21 11.9853 21 9.5ZM3 14.5C3 16.9853 7.02944 19 12 19C16.9706 19 21 16.9853 21 14.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5V14.5ZM12 12C7.02944 12 3 9.98528 3 7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5C21 9.98528 16.9706 12 12 12Z"></path></svg>
               <div class="title">
                  <h2>{{ _statistics.all_appeals_count }}</h2>
                  <p>Барча кўрсатмалар сони:</p>
               </div>
            </div>
            <div @click="router.push({name: 'instructionList', query: {items : JSON.stringify(_statistics.all_appeals)}})" style="display: flex; justify-content: space-between; padding: 10px 6px;">
               <p>Батафсил маълумотлар</p>
               <svg style="width: 16px; fill: blue;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
            </div>
         </div>
         <div style="border: 1px solid #ccc; border-radius: 6px;" >
            <div class="content1">
               <svg style="width: 64px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM8 11V13H11V11H8ZM8 7V9H11V7H8ZM8 15V17H11V15H8ZM13 15V17H16V15H13ZM13 11V13H16V11H13ZM13 7V9H16V7H13Z"></path></svg>
               <div class="title">
                  <h2>{{ _statistics.accepted_count }}</h2>
                  <p>Назоратдан олинганлар:</p>
               </div>
            </div>
            <div @click="router.push({name: 'instructionList', query: {items : JSON.stringify(_statistics.accepted)}})" style="display: flex; justify-content: space-between; padding: 10px 6px;">
               <p>Батафсил маълумотлар</p>
               <svg style="width: 16px; fill: blue;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
            </div>
         </div>
         <div style="border: 1px solid #ccc; border-radius: 6px;" >
            <div class="content3">
               <svg style="width: 64px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 13C15.3137 13 18 10.3137 18 7C18 3.68629 15.3137 1 12 1C8.68629 1 6 3.68629 6 7C6 10.3137 8.68629 13 12 13ZM15 18C15 16.3431 16.3431 15 18 15C18.4631 15 18.9018 15.105 19.2934 15.2924L15.2924 19.2934C15.105 18.9018 15 18.4631 15 18ZM16.7066 20.7076L20.7076 16.7066C20.895 17.0982 21 17.5369 21 18C21 19.6569 19.6569 21 18 21C17.5369 21 17.0982 20.895 16.7066 20.7076ZM18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13ZM12 14C12.0843 14 12.1683 14.0013 12.252 14.0039C11.4628 15.137 11 16.5145 11 18C11 19.4872 11.4638 20.8662 12.2547 22H4C4 17.5817 7.58172 14 12 14Z"></path></svg>
               <div class="title">
                  <h2>{{ _statistics.expired_count }}</h2>
                  <p>Муддати ўтганлар сони:</p>
               </div>
            </div>
            <div @click="router.push({name: 'instructionList', query: {items : JSON.stringify(_statistics.expired)}})" style="display: flex; justify-content: space-between; padding: 10px 6px;">
               <p>Батафсил маълумотлар</p>
               <svg style="width: 16px; fill: blue;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
            </div>
         </div>
         <div style="border: 1px solid #ccc; border-radius: 6px;" >
            <div class="content4">
               <svg style="width: 54px; fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z"></path></svg>
               <div class="title">
                  <h2>0</h2>
                  <p>Ўқилмаган ҳужжатлар сони:</p>
               </div>
            </div>
            <div @click="router.push({name: 'instructionList', query: {items : JSON.stringify(_statistics.expired)}})" style="display: flex; justify-content: space-between; padding: 6px;">
               <p>Батафсил маълумотлар</p>
               <svg style="width: 16px; fill: blue;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"></path></svg>
            </div>
         </div>
      </div>
      <SearchInstuction/>
   </div>
</template>

<style lang="scss">
.cards {
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: 30px;
   margin-top: 10px;
   .content2{
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      background: #337AB7;
      padding: 8px;
   }
   .content1{
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      background: #5Cb8Bc;
      padding: 8px;
   }
   .content4{
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      background: #F0AD40;
      padding: 8px;
   }
   .content3{
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      background: rgb(223, 128, 128);
      padding: 8px;
   }
   .title {
      h2 {
         text-align: end;
         padding: 0px 10px;
         font-size: 24px;
         color:white;
      }

      p {
         color: white;
      }
   }
}
</style>
