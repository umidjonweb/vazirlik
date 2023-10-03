<script setup>
import { ref } from 'vue'
import InstructionClause from "./InstructionClause.vue"
// import EditInstuction from "./EditInstuction.vue"
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { getInstruction_API, getBasic_API, postInstruction_API, getUserList_API, _instructionStore } from '@/services/instruction'
import { ElMessage } from 'element-plus';
const router = useRouter()
const route = useRoute()
const editItems = route?.query?.items ? JSON.parse(route?.query?.items) : {};

const _item = ref({
   register_number: editItems?.register_number || "",
   user: editItems?.user || null,
   basis: editItems?.basis || null,
   type: editItems?.type || null,
   register_date: editItems?.register_date || ""
})
const _instructionRes = ref([])
const _intructionType = ref([])
const _basic = ref([])
const _users = ref([])

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
</script>

<template>
   <div>
      <div class="band">
         <div class="text-band">
            <p>Кўрсатмани киритиш: Қизил билан белгиланган майдонлар тўлдирилиши шарт!!</p>
         </div>
         <el-form class="instruction" ref="ruleFormRef" :rules="rules" :model="form" label-position="top">
            <el-form-item label="Кўрсатма тури" placeholder="Кўрсатма тури" prop="type">
               <el-select v-model="_item.type" clearable placeholder="Кўрсатма тури*">
                  <el-option v-for="item in _intructionType.results" :key="item.id" :label="item.name" :value="item.id" />
               </el-select>
            </el-form-item>
            <el-form-item label="Кўрсатма санаси" placeholder="Кўрсатма санаси" prop="register_date">

               <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="_item.register_date" type="date"
                  placeholder="Pick a day" :size="size" />

            </el-form-item>
            <el-form-item label="Қайд рақами" placeholder="Қайд рақами" prop="login">
               <el-input v-model="_item.register_number" />
            </el-form-item>
            <el-form-item label="Асос" placeholder="Асос" prop="login">
               <el-select v-model="_item.basis" clearable placeholder="Асос">
                  <el-option v-for="item in _basic.results" :key="item.id" :label="item.name" :value="item.id" />
               </el-select>
            </el-form-item>
            <el-form-item label="Асосий ижрочи" placeholder="Асосий ижрочи" prop="login">
               <el-select v-model="_item.user" clearable placeholder="Асосий ижрочи">
                  <el-option v-for="item in _users.results" :key="item.id"
                     :label="item.first_name + ' ' + item.last_name + ' ' + item.middle_name" :value="item.id" />
               </el-select>
            </el-form-item>
         </el-form>
         <div class="btn">
            <el-button @click="postInstruction" type="primary">
               saqlash
            </el-button>
         
         </div>
      </div>
      <InstructionClause />
      <!-- <EditInstuction /> -->
   </div>
</template>
<style lang="scss" scoped>
.band {
   border: 1px solid #bacee1;
   border-radius: 6px;
}

.text-band {
   background: #D9EDF7;

   p {
      text-align: center;
      padding: 10px 0;
      font-size: 18px;
      color: #3170AA;
   }
}

.instruction {
   padding: 16px;
   display: grid;
   grid-template-columns: repeat(5, minmax(0, 1fr));
   gap: 30px;
}

.instruction1 {
   padding: 16px;
   display: grid;
   grid-template-columns: repeat(4, minmax(0, 1fr));
   gap: 30px;
}

.btn {
   padding: 16px;
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   gap: 30px;
}

.add-band {
   margin-top: 20px;
   border: 1px solid #FCE8E3;
   border-radius: 6px;
}

.text-add-band {
   background: #FCE8E3;

   p {
      text-align: center;
      padding: 10px 0;
      font-size: 18px;
      color: #8A83A2;
   }
}</style>