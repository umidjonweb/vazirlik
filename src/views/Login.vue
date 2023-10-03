<script setup>
import { ref, reactive } from 'vue'
import { Login_API, _loginStore } from '@/services/login'
import { useRouter } from 'vue-router';
const router = useRouter()
const form = ref({
   username: '',
   password: ''
})
const ruleFormRef = ref()

const rules = reactive({
   username: [{ required: true, message: 'Майдонни тўлдиринг', trigger: 'blur' }],
   password: [{ required: true, message: 'Майдонни тўлдиринг', trigger: 'blur' }],
})
const submitForm = async () => {
   if (!ruleFormRef.value) return
   await ruleFormRef.value.validate(async (valid, fields) => {
      if (valid) {
         const [response, error] = await Login_API(form.value)
         if (error) return
         _loginStore.value = response
         router.push('/dashbord/addInstruction')
      } else {
         console.log('error submit!', fields)
      }
   })
}

</script>

<template>
   <main>
      <el-card class="card">
         <h2>Кўрсатма назорати</h2>
         <el-form ref="ruleFormRef" :rules="rules" :model="form" class="form" label-position="top">
            <el-form-item label="Логинни киритинг" placeholder="Логинни киритинг" prop="username">
               <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="Паролни киритинг" prop="password">
               <el-input v-model="form.password" />
            </el-form-item>
         </el-form>
         <el-button style="width: 100%; text-align: center; margin-top: 10px;" type="primary"
            @click="submitForm">Кириш</el-button>
      </el-card>
   </main>
</template>
<style lang="scss" scoped>
h2 {
   font-size: 28px;
   text-align: center;
   margin-bottom: 16px;
   font-weight: 800;
}

main {
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
}

.card {
   width: 380px;
   max-width: 100%;
}</style>