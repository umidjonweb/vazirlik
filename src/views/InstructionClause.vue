<script setup>
import Modal from "./Modal.vue"
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { getImportanceType_API, getInstructionClauseType_API, getMinisty_API, getUserList_API, postInstructionClause_API, _instructionStore, getInstructionClause_API, _itemsStore, _patchIntructions } from '@/services/instruction'
import { ElMessage } from 'element-plus';
import { _bandId } from '../services/instruction';

const _fileModalRef = ref()
const router = useRouter()
const route = useRoute()
let editItems = route?.query?.items ? JSON.parse(route?.query?.items) : {};
const _items = ref([{
   instruction: _instructionStore.value.id,
   importance: 0,
   user: null,
   text: "",
   ministry: [],
   expire_date: "",
   instruction_clause_type: null
}])
if (route?.query?.items) {
   _items.value = editItems?.instruction_clauses?.map((el) => {
      let content = {}
      content.id = el.id
      content.importance = el.importance.name
      content.user = el.user.first_name + " " + el.user.last_name
      content.text = el.text
      content.expire_date = el.expire_date
      content.instruction_clause_type = el.instruction_clause_type
      content.ministry = el.ministry.map((el) => el.name)
      return content
   })
}
function getassign() {
   // _patchIntructions.value = 

}
const _ministrys = ref([])
const _importanceType = ref([])
const _postInstructionClause = ref([])
const _instructionClauseType = ref([])
const _users = ref([])

async function getImportanceType() {
   const [response, error] = await getImportanceType_API()
   if (error) return
   _importanceType.value = response
}

getImportanceType()

async function getInstructionClauseType() {
   const [response, error] = await getInstructionClauseType_API()
   if (error) return
   _instructionClauseType.value = response
}
getInstructionClauseType()

async function getUserList() {
   const [response, error] = await getUserList_API()
   if (error) return
   _users.value = response
}

getUserList()

async function getMinisty() {
   const [response, error] = await getMinisty_API()
   if (error) return
   _ministrys.value = response
}
getMinisty()

async function postInstructionClause(item, ind) {
   console.log('fff', item);
   const [response, error] = await postInstructionClause_API(item)
   if (error) return
   _postInstructionClause.value = response
   _items.value[ind].id =_postInstructionClause.value.id
   console.log('_postInstructionClause.value', _postInstructionClause.value, _items.value[ind].id);
   ElMessage({
      message: 'Кўрсатма банди киритилди',
      type: 'success',
   })
}
async function getInstructionClause() {
   const [response, error] = await getInstructionClause_API()
   if (error) return
}
getInstructionClause()
function handleItem() {
   _items.value.push({
      instruction: _instructionStore.value.id,
      importance: null,
      user: null,
      text: "",
      ministry: [],
      expire_date: "",
      instruction_clause_type: null
   })
}

function handleInp1(id, key, value) {

   if (_bandId.value = id) {
      _patchIntructions.value[key] = value;
   }
}
function handleMultisel(ind, content) {
   if (typeof _items.value[ind].ministry[0] == 'string') {
      let m = content.ministry.map(el => {
         return _ministrys.value.results.filter((k => k.name == el)).map(el => el.id)
      })
      _items.value[ind].ministry = m.flat(2)
   }
}

function openModal(item) {
   console.log(' _fileModalRef.value?.open(item)', item);
  _fileModalRef.value?.open(item)
}
</script>

<template>
   <div>
      <div v-for="_item, ind in _items" :key="ind" class="add-band">
         <div class="text-add-band">
            <p>{{ ind + 1 }}. Кўрсатма бандини киритиш</p>
         </div>
         <div style="display: flex; justify-content: flex-end; margin-top: 10px; margin-right: 20px;">
         <el-button :disabled="!_item.id" @click="openModal(_item)" type="primary">Javob</el-button>
         </div>
         <el-form ref="ruleFormRef" :rules="rules" :model="form" label-position="top">
            <el-form-item style="margin: 15px" label="Банд мазмуни" placeholder="Банд мазмуни" prop="text">
               <el-input @input="handleInp1(_item.id, 'text', _item.text)" v-model="_item.text" :rows="2" type="textarea"
                  placeholder="Банд мазмуни" />
            </el-form-item>
            <div class="instruction1">
               <el-form-item label="Масъул ижрочи" placeholder="Масъул ижрочи*" prop="login">
                  <el-select @change="handleInp1(_item.id, 'user', _item.user)" v-model="_item.user" clearable
                     placeholder="Масъул ижрочи*">
                     <el-option v-for="item in _users.results" :key="item.id"
                        :label="item.first_name + ' ' + item.last_name + ' ' + item.middle_name" :value="item.id" />
                  </el-select>
               </el-form-item>
               <el-form-item label="Юбориладиган Вазирлик номи" placeholder="Юбориладиган Вазирлик номи" prop="login">
                  <el-select @visible-change="handleMultisel(ind, _item)" :persistent="true"
                     @change="handleInp1(_item.id, 'ministry', _item.ministry)" v-model="_item.ministry" multiple
                     placeholder="Select">
                     <el-option v-for="item in _ministrys.results" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
               </el-form-item>
               <el-form-item label="Ижро муддати" placeholder="Ижро муддати" prop="login">
                  <el-date-picker @change="handleInp1(_item.id, 'expire_date', _item.expire_date)"
                     v-model="_item.expire_date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date"
                     placeholder="Ижро муддати" />
               </el-form-item>
               <el-form-item label="Кўрсатма банди тури" placeholder="Кўрсатма банди тури" prop="login">
                  <el-select @change="handleInp1(_item.id, 'instruction_clause_type', _item.instruction_clause_type)"
                     v-model="_item.instruction_clause_type" clearable placeholder="Кўрсатма банди тури">
                     <el-option v-for="item in _instructionClauseType.results" :key="item.id" :label="item.name"
                        :value="item.id" />
                  </el-select>
               </el-form-item>
               <el-form-item label="Муҳимлик даражаси" placeholder="Муҳимлик даражаси" prop="login">
                  <el-select @change="handleInp1(_item.id, 'importance', _item.importance)" v-model="_item.importance"
                     clearable placeholder="Муҳимлик даражаси">
                     <el-option v-for="item in _importanceType.results" :key="item.id" :label="item.name"
                        :value="item.id" />
                  </el-select>
               </el-form-item>
               <el-form-item>
                  <el-button :disabled="_item.id" @click="postInstructionClause(_item, ind)" style="width: 45%;" type="primary">Saqlash</el-button>
                  <el-button @click="handleItem" style="width: 45%;" type="primary">Band qo'shish</el-button>
               </el-form-item>
            </div>
         </el-form>
      </div>
      <Modal  ref="_fileModalRef" />
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
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: 30px;
   align-items: end;
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
}
</style>