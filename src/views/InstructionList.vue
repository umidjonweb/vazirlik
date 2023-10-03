   
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const list = JSON.parse(route?.query?.items) || null
</script>
<template>
   <div v-if="list?.length">
      <el-table highlight-current-row :data="list">
         <el-table-column type="index" width="50" />
         <el-table-column width="80" prop="basis.name" label="Асос" />
         <el-table-column prop="register_date" label="register_date" />
         <el-table-column prop="register_number" label="register_number" />
         <el-table-column prop="type.name" label="Кўрсатма тури" />
         <el-table-column prop="user.username" label="user" />

      </el-table>
   </div>
   <div v-else>
      Malumotlar yo'q
   </div>
</template>

<style>
.el-table__body {
   table-layout: auto !important;
   width: auto !important;
}
</style>