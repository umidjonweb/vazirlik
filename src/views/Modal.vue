<script setup>
import { computed, ref } from "vue"
import { postfile_API, pachtIntruction_API,getfile_API, getIntruction_API, _patchIntructions, _bandId } from '@/services/instruction'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { _loginStore } from "../services/login";
const _visible = ref(false)

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

const options1 = ref([
   { value: 'done', label: 'бажарилган' },
   { value: 'not_done', label: 'бажарилмаган' },
   { value: 'partly_done', label: 'қисман бажарилган' },
])
const options2 = ref([
   { value: 'accepted', label: 'қабул қилинган' },
   { value: 'partly_accepted', label: 'қисман қабул қилинган' },
   { value: 'partly_done', label: 'қисман бажарилган' },
])
function hanleInput(e) {
   _item.value.file = e.target.files[0]
}
async function postfile() {
   const [response, error] = await postfile_API(_item.value)
   if (error) return
   _file.value = response
   close()
}
async function pachtIntruction() {
   const [response, error] = await pachtIntruction_API(_item.value.instruction_clause, _patchIntructions.value)
   if (error) return
   ElMessage({
      message: 'Кўрсатма банди ўзгартирилди',
      type: 'success',
   })
   _patchIntructions.value = {}
}

function open(item) {
   console.log('open',  item);
   _item.value.instruction_clause = item.id
   _visible.value = true
   getfile()
   getIntruction()
}
function close() {
   _visible.value = false
}
async function getfile() {
   const [response, error] = await getfile_API(_item.value)
   if (error) return
   let content = response.results.find((el) => el.id == _item.value.instruction_clause)
   _item.value.text = content.text
   _item.value.file = content.file
   _item.value.number = content.number
}
async function getIntruction() {
    console.log('_item.value',_item.value);
   _patchIntructions.value.done_status = null;
   _patchIntructions.value.accepted_status = null;
   const [response, error] = await getIntruction_API(_item.value.instruction_clause)
   if (error) return
   _patchIntructions.value.done_status = response.done_status;
   _patchIntructions.value.accepted_status = response.accepted_status;
}
defineExpose({ open })

</script>
<template>
   <el-dialog class="!rounded-md !p-0" v-model="_visible" width="90%" :show-close="false" top="5vh">
      <template #footer>
         <div class="flex justify-between dialog-footer px-5">
            <div class="add-band">
               <div class="text-band">
                  <p>Топшириқни бажарилишини киритиш ва жавоб файлини юклаш</p>
               </div>
               <el-form label-position="top">
                  <el-form-item style="margin: 15px" label="Ишнинг юритилиши" placeholder="Ишнинг юритилиши" prop="text">
                     <el-input v-model="_item.text" :rows="2" type="textarea" placeholder="Ишнинг юритилиши" />
                  </el-form-item>
                  <el-form-item style="margin: 15px" label="number" placeholder="number" prop="text">
                     <el-input v-model="_item.number" placeholder="number" />
                  </el-form-item>
                  <div style="margin: 16px;">
                     <a style="padding: 10px;" download :href="_item.file" v-if="_item.file">fileni yuklash</a>
                     <input @change="hanleInput"  type="file">
                  </div>
              
                  <div class="instruction1">
                     <el-form-item label="Ишнинг Бажарилганлик Ҳолати" placeholder="Ишнинг Бажарилганлик Ҳолати"
                        prop="login">
                        <el-select v-model="_patchIntructions.done_status" clearable
                           placeholder="Ишнинг Бажарилганлик Ҳолати">
                           <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                     </el-form-item>
                     <el-form-item label="Қабул қилинганлик Ҳолати" placeholder="Қабул қилинганлик Ҳолати*" prop="login">
                        <el-select v-model="_patchIntructions.accepted_status" clearable
                           placeholder="Қабул қилинганлик Ҳолати">
                           <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"  />
                        </el-select>
                     </el-form-item>
                  </div>
                  <el-form-item>
                     <el-button v-if="_loginStore.user.username == 'admin'" @click="postfile" style="width: 100%; margin: 16px;" type="primary">Saqlash</el-button>
                     <el-button v-else @click="pachtIntruction" style="width: 100%; margin: 16px;"
                        type="primary">Saqlash</el-button>
                  </el-form-item>
               </el-form>
            </div>

         </div>
      </template>
   </el-dialog>
</template>


<style lang="scss" >
.el-dialog__header {
   padding: 0 !important;
}

.el-dialog__body {
   padding: 0 !important;
}

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