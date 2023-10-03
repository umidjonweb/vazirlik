<script setup>
import InstructionClause from "./InstructionClause.vue"
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { ref } from 'vue'
import { getInstruction_API, getBasic_API, postInstruction_API, getUserList_API, _instructionStore, getMinisty_API } from '@/services/instruction'
import { ElMessage } from 'element-plus';

const router = useRouter()
const _item = ref({
   instruction_clauses__ministry: null,
   register_number: null,
   user: null,
   basis: null,
   type: null,
   to_date: null,
   from_date: null
})
const _instructionRes = ref([])
const _intructionType = ref([])
const _basic = ref([])
const _users = ref([])
const _ministrys = ref([])


async function getMinisty() {
   const [response, error] = await getMinisty_API()
   if (error) return
   _ministrys.value = response
}
getMinisty()

async function getInstruction() {
   const [response, error] = await getInstruction_API()
   if (error) return
   _intructionType.value = response
}

getInstruction()

async function getBasic() {
   const [response, error] = await getBasic_API()
   if (error) return
   _basic.value = response
}
getBasic()

async function getUserList() {
   const [response, error] = await getUserList_API()
   if (error) return
   _users.value = response
}

getUserList()

async function postInstruction() {
   const [response, error] = await postInstruction_API(_item.value)
   if (error) return
   _instructionRes.value = response
   _instructionStore.value = response
   ElMessage({
      message: 'Кўрсатма киритилди',
      type: 'success',
   })
}
postInstruction()
</script>
<template>
   <div>
      <el-form class="" ref="ruleFormRef" :rules="rules" :model="form" label-position="top">
         <div class="wrap1">
            <el-form-item label="Вазирлик номи" placeholder="Вазирлик номи" prop="type">
               <el-select v-model="_item.instruction_clauses__ministry" clearable placeholder="Вазирлик номи*">
                  <el-option v-for="item in _ministrys.results" :key="item.id" :label="item.name" :value="item.id" />
               </el-select>
            </el-form-item>
            <el-form-item label="Кўрсатма тури" placeholder="Кўрсатма тури" prop="type">
               <el-select v-model="_item.type" clearable placeholder="Кўрсатма тури*">
                  <el-option v-for="item in _intructionType.results" :key="item.id" :label="item.name" :value="item.id" />
               </el-select>
            </el-form-item>
            <el-form-item label="Ижрочилар" placeholder="Ижрочилар" prop="login">
               <el-select v-model="_item.user" clearable placeholder="Асосий ижрочи">
                  <el-option v-for="item in _users.results" :key="item.id"
                     :label="item.first_name + ' ' + item.last_name + ' ' + item.middle_name" :value="item.id" />
               </el-select>
            </el-form-item>
         </div>
         <div class="wrap2">
            <el-form-item label="Керакли ОЙни танланг" placeholder="Керакли ОЙни танланг" prop="login">
               <el-select v-model="_item.basis" clearable placeholder="Керакли ОЙни танланг">
                  <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id" />
               </el-select>
            </el-form-item>
            <el-form-item label="Керакли ЙИЛни танланг" placeholder="Керакли ЙИЛни танланг" prop="login">
               <el-input v-model="input" type="number" placeholder="Керакли ЙИЛни танланг" clearable />
            </el-form-item>
            <el-form-item label="Қачондан" placeholder="Қачондан" prop="login">
               <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="_item.from_date" type="date"
                  placeholder="Pick a day" :size="size" />
            </el-form-item>
            <el-form-item label="Қачонгача" placeholder="Қачонгача" prop="login">
               <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="_item.to_date" type="date"
                  placeholder="Pick a day" :size="size" />
            </el-form-item>
         </div>
         <div class="wrap3">
            <el-form-item label="Ҳужжат рақами" placeholder="Ҳужжат рақами" prop="login">
               <el-input v-model="_item.basis" placeholder="Ҳужжат рақами" />
            </el-form-item>
            <el-form-item label="Қайд рақами" placeholder="Қайд рақами" prop="login">
               <el-input v-model="_item.register_number" />
            </el-form-item>
            <el-form-item prop="login">
               <el-button @click="postInstruction" style="width: 100%;" type="primary">Излаш</el-button>
            </el-form-item>
            <el-form-item prop="login">
               <el-button style="width: 100%;" type="primary">Янгилаш</el-button>
            </el-form-item>
         </div>
      </el-form>
      <div v-if="_instructionRes?.results?.length">
         <el-table highlight-current-row :data="_instructionRes.results">
            <el-table-column type="index" width="50" />
            <el-table-column width="80" prop="basis.name" label="Асос" />
            <el-table-column prop="register_date" label="register_date" />
            <el-table-column prop="register_number" label="register_number" />
            <el-table-column prop="type.name" label="Кўрсатма тури" />
            <el-table-column prop="user.username" label="user" />
            <el-table-column width="60">
               <template #default="scope">
                  <el-button @click="router.push({path: '/dashbord/addInstruction', query: {items: JSON.stringify(scope.row) }})" class="btns"><svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                           d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z">
                        </path>
                     </svg></el-button>
               </template>
            </el-table-column>
         </el-table>
      </div>
   </div>
</template>


<style lang="scss">
.btns{
   padding-left: 6px;
   padding-right: 6px;
   svg{
      width: 20px;
      height: 20px;
      fill: rgb(125, 149, 208);
   }

}
.el-table__body,
.el-table__header {
   table-layout: auto !important;
   width: auto !important;
}

.wrap1 {
   padding: 16px;
   padding-bottom: 0;
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: 30px;
}

.wrap2,
.wrap3 {
   padding: 0px 16px;
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: 30px;
   align-items: end;
}</style>