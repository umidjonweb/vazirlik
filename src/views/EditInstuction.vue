<script setup>
import { computed, ref } from "vue"
import { postfile_API, pachtIntruction_API, _patchIntructions, _bandId } from '@/services/instruction'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const editItems = route?.query?.items ? JSON.parse(route?.query?.items) : {};
const _file = ref({})
const _item = ref({
   number: null,
   instruction_clause: null,
   text: null,
   file: '',
})
const _bandOptions = computed(() => {
    return editItems?.instruction_clauses?.map((el,ind) => {
      let content = {}
      content.id = el.id
      content.label = `${ind + 1} label`
      return content
   })
})
const options1 = ref({
   DONE: "done",
   NOT_DONE: "not_done",
   PARTLY_DONE: "partly_done"
})
const options2 = ref({
   ACCEPTED: "accepted",
   PARTLY_ACCEPTED: "partly_accepted",
   NOT_ACCEPTED: "not_accepted"
})
function hanleInput(e) {
   _item.value.file = e.target.files[0]
}
async function postfile() {
   _item.value.instruction_clause = editItems.instruction_clauses[0].id
   const [response, error] = await postfile_API(_item.value)
   if (error) return
   _file.value = response
}
async function pachtIntruction() {
   const [response, error] = await pachtIntruction_API(_bandId.value, _patchIntructions.value)
   if (error) return
   ElMessage({
      message: 'Кўрсатма банди ўзгартирилди',
      type: 'success',
   })
   _patchIntructions.value = {}
}


</script>
<template>
   <div class="add-band">
      <div class="text-band">
         <p>Топшириқни бажарилишини киритиш ва жавоб файлини юклаш</p>
      </div>
      <el-form label-position="top">
         <el-form-item style="margin: 15px" label="Ишнинг юритилиши" placeholder="Ишнинг юритилиши" prop="text">
            <el-input v-model="_item.text" :rows="2" type="textarea" placeholder="Ишнинг юритилиши" />
         </el-form-item>
         <el-form-item style="margin: 15px" label="number" placeholder="number" prop="text">
            <el-input v-model="_item.number"  placeholder="number" />
         </el-form-item>
         <div style="margin: 16px;">
            <input @change="hanleInput" :value="_item.file" type="file">
         </div>
         <el-form-item style="margin: 16px; width: 47%;" label="bandni tanlang"  prop="login">
               <el-select v-model="_bandId" clearable placeholder="bandni tanlang">
                  <el-option v-for="item,ind in _bandOptions" :key="ind" :label="item.label" :value="item.id" />
               </el-select>
            </el-form-item>
         <div class="instruction1">
            <el-form-item label="Ишнинг Бажарилганлик Ҳолати" placeholder="Ишнинг Бажарилганлик Ҳолати" prop="login">
               <el-select v-model="_patchIntructions.done_status" clearable placeholder="Ишнинг Бажарилганлик Ҳолати">
                  <el-option v-for="item in options1" :key="item" :label="item" :value="item" />
               </el-select>
            </el-form-item>
            <el-form-item label="Қабул қилинганлик Ҳолати" placeholder="Қабул қилинганлик Ҳолати*" prop="login">
               <el-select v-model="_patchIntructions.accepted_status" clearable placeholder="Қабул қилинганлик Ҳолати">
                  <el-option v-for="item in options2" :key="item" :label="item" :value="item" />
               </el-select>
            </el-form-item>
         </div>
         <el-form-item>
            <el-button @click="postfile" style="width: 100%; margin: 16px;" type="primary">Saqlash1</el-button>
            <el-button @click="pachtIntruction" style="width: 100%; margin: 16px;" type="primary">Saqlash2</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>


<style lang="scss" scoped>
.add-band {
   margin-top: 40px;
   border: 1px solid #8A83A2;
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

.instruction1 {
   padding: 16px;
   display: grid;
   grid-template-columns: repeat(2, minmax(0, 1fr));
   gap: 30px;
}
</style>