import { axiosInstance } from './axios'
import { useStorage } from '@vueuse/core'
export const _instructionStore = useStorage('Instruction', [])
export const _itemsStore = useStorage('items', [])
export const _patchIntructions = useStorage('_patchIntructions', {})
export const _bandId = useStorage('_bandId', null)

export async function getInstruction_API() {
   try {
      const response = await axiosInstance.get('regulation/instruction_type/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getBasic_API() {
   try {
      const response = await axiosInstance.get('regulation/basis/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getUserList_API() {
   try {
      const response = await axiosInstance.get('user/list/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function postInstruction_API(item) {
   try {
      const response = await axiosInstance.get('regulation/instructions/', {
         params: {
            ...item
         }
      })
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getMinisty_API() {
   try {
      const response = await axiosInstance.get('regulation/ministry/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getInstructionClauseType_API() {
   try {
      const response = await axiosInstance.get('regulation/instruction_clause_type/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getImportanceType_API() {
   try {
      const response = await axiosInstance.get('regulation/importance_type/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function postInstructionClause_API(item) {
   try {
      const response = await axiosInstance.post('regulation/instruction_clause/', {
         ...item
      })
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getInstructionClause_API() {
   try {
      const response = await axiosInstance.get('regulation/instruction_clauses/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getStatistic_API() {
   try {
      const response = await axiosInstance.get('regulation/statistics/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function postfile_API(item) {
   const data = new FormData()
   data.append('number', item.number)
   data.append('instruction_clause', item.instruction_clause)
   data.append('text', item.text)
   data.append('file', item.file)
   try {
      const response = await axiosInstance({
         url: 'regulation/reply_letter/',
         method: 'POST',
         data,
         headers: { 'Content-Type': 'multipart/form-data' }
      })
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}

export async function getfile_API() {
   try {
      const response = await axiosInstance.get('regulation/reply_letter/')
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function pachtIntruction_API(id, item) {
   try {
      const response = await axiosInstance.patch(`regulation/instruction_clause/${id}/`, {
         ...item
      })
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
export async function getIntruction_API(id) {
   try {
      const response = await axiosInstance.get(`regulation/instruction_clause/${id}/`)
      return [response.data, null]
   } catch (error) {
      return [null, error]
   }
}
