<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { _loginStore } from '../services/login';

</script>

<template>
   <div class="headers">
      <header  class="header1">
         <div class="logo">
            <a href="!#">Ташкилот:</a>
         </div>
         <h1>ҲИСОБ ПАЛАТАСИ</h1>
         <div class="profile">
            <img src="@/assets/user.jpg" alt="">
            <p>{{ _loginStore.user.first_name + ' ' + _loginStore.user.last_name }}</p>
         </div>
      </header>
      <div class="item">
         <el-scrollbar style="width: 350px; height: 100vh;">
            <el-menu :default-openeds="['1', '3']">
               <el-sub-menu index="1">
                  <template #title>
                     <el-icon>
                        <message />
                     </el-icon> Маълумотларни киритиш
                  </template>
                  <el-menu-item-group>
                     <!-- <template #title>Group 1</template> -->
                     <el-menu-item index="1-1"><router-link class="a" to="/dashbord/about"> Бош саҳифа</router-link>
                     </el-menu-item>
                     <el-menu-item index="1-2"><router-link class="a" to="/dashbord/addInstruction">Кўрсатмани
                           юклаш</router-link></el-menu-item>
                  </el-menu-item-group>
               </el-sub-menu>
               <el-sub-menu index="2">
                  <template #title>
                     <el-icon><icon-menu /></el-icon> Ҳисоботлар
                  </template>
                  <el-menu-item-group>
                     <el-menu-item index="2-1"> <router-link class="a" to="/dashbord/addInstruction"> Ҳисобот </router-link></el-menu-item>
                  </el-menu-item-group>
               </el-sub-menu>
            </el-menu>
         </el-scrollbar>
         <div class="content">
            <router-view />
         </div>
      </div>
   </div>
</template>
<style lang="scss">
.headers{

   .a {
      padding-right: 10px;
      padding-left: 20px;
      display: block;
      width: 100%;
      height: 100%;
   }
   
   .el-scrollbar__view {
      border-right: 1px solid #ccc;
      height: 100vh;
   
      .el-menu {
         border: 0;
      }
   }
   
   .item {
      display: flex;
      justify-content: space-between;
   }
   
   .content {
      flex-grow: 1;
      padding: 20px;
      // width: calc(100vh - 350px);
   }
   
   .header1 {
   
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #3C8DBC;
   
      // #367FA9
      h1 {
         font-weight: 800;
         color: white;
      }
   
      .logo {
         width: 350px;
         display: flex;
         justify-content: center;
         align-items: center;
         background: #367FA9;
         height: 60px;
   
         a {
            color: white;
         }
      }
   
      .profile {
         display: flex;
         gap: 10px;
         align-items: center;
         padding: 10px 15px;
   
         height: 60px;
   
         img {
            width: 24px;
            height: 24px;
            border-radius: 100%;
         }
   
         transition: all .03s;
   
         &:hover {
            background: #367FA9;
         }
      }
   
      a {
         font-size: 22px;
         text-decoration: none;
      }
   }
}
</style>