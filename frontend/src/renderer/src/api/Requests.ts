import { api } from './axios'
import { paramsConstructor } from '@renderer/utils/paramsConstructor'

/* Rutas para manejar archivos */
export const reqFileUpload = (formData: FormData) =>
  api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

/* Rutas para manejar a los pacientes */
export const reqAddPatient = (data) => api.post('/patient/register', data)
export const reqEditPatient = ({ data, id }) => api.put('/patient/update/' + id, data)
export const reqDeletePatient = (id) => api.delete('/patient/delete/' + id)
export const reqLoadAllPatients = (startDate?: string, endDate?: string) => {
  const params = paramsConstructor([
    { name: 'startDate', value: startDate ?? null },
    { name: 'endDate', value: endDate ?? null },
  ])
  return api.get(`/patient/get-all?${params.toString()}`)
}

export const reqSearchPatientByName = (name: string, startDate?: string, endDate?: string) => {
  const params = paramsConstructor([
    { name: 'name', value: name ?? null },
    { name: 'startDate', value: startDate ?? null },
    { name: 'endDate', value: endDate ?? null },
  ])
  return api.get(`/patient/search-by-name?${params.toString()}`)
}

export const reqGetPatientsCountByDate = () => api.get('/patient/count-by-date')
export const reqGetPatientsCountByGender = () => api.get('/patient/count-by-gender')

/* Rutas para manejar el auth */
export const authLogin = async (data) => api.post('/auth/login', data)
export const authRegister = async (data) => api.post('/auth/register', data)
export const authLoadProfileByToken = async (data) => api.get('/auth/load/profile/' + data)

/* Rutas para manejar las consultas */
export const reqGetConsult = async (id) => api.get('/consult/get/' + id)
export const reqCreateConsult = async (data) => api.post('/consult/create', data)
export const reqDeleteConsult = async (id) => api.delete('/consult/delete/' + id)
export const reqUpdateConsult = async ({ data, id }) => api.put('/consult/update/' + id, data)
export const reqGetAllConsults = async () => api.get('/consult/get-all')
export const reqSearchConsultByPatient = (searchValue: string) =>
  api.get(`/consult/search-by-patient/${searchValue}`)
export const reqGetAllConsultsByPatientId = (patientId: number) =>
  api.get(`/consult/get-all-by-patient-id/${patientId}`)
export const reqFindAllConsultsToDay = () => api.get('/consult/find-all-to-day')

/* Rutas para manejar al personal medico */
export const reqAddStaff = (data) => api.post('/clinicalstaff/create', data)
export const reqEditStaff = ({ data, id }) => api.patch('/clinicalstaff/update/' + id, data)
export const reqDeleteStaff = (id) => api.delete('/clinicalstaff/delete/' + id)
export const reqLoadAllStaff = (startDate?: string, endDate?: string) => {
  const params = paramsConstructor([
    { name: 'startDate', value: startDate ?? null },
    { name: 'endDate', value: endDate ?? null },
  ])
  return api.get(`/clinicalstaff/get-all?${params}`)
}
export const reqGetHospitalStats = () => api.get('/hospital/get-stats')
export const reqSearchClinicalStaffByName = (name: string) =>
  api.get(`/clinicalstaff/search-by-name?name=${name}`)
export const reqGetClinicalStaffCountByDate = () => api.get('/clinicalstaff/count-by-date')

/* Rutas para manejar notas */
export const reqCreateNote = (data) => api.post('/note', data)
export const reqUpdateNote = ({ data, id }) => api.patch(`/note/${id}`, data)
export const reqDeleteNote = (id) => api.delete(`/note/${id}`)
export const reqFindNoteById = (id) => api.get(`/note/${id}`)
export const reqFindAllNotesByPatientId = (patientId) => api.get(`/note/patient/${patientId}`)

/* Rutas para manejar diagnósticos */
export const reqCreateDiagnostic = (data) => api.post('/diagnostic', data)
export const reqUpdateDiagnostic = ({ data, id }) => api.patch(`/diagnostic/${id}`, data)
export const reqDeleteDiagnostic = (id) => api.delete(`/diagnostic/${id}`)
export const reqFindDiagnosticById = (id) => api.get(`/diagnostic/${id}`)
export const reqFindAllDiagnosticsByPatientId = (patientId) =>
  api.get(`/diagnostic/patient/${patientId}`)

/* Rutas para manejar archivos */
export const reqCreateFile = (data) => api.post('/drive/create-file', data)
export const reqRenameFile = ({ id, newName }) => api.put(`/drive/rename-file/${id}`, { newName })
export const reqDeleteFile = (id) => api.delete(`/drive/delete-file/${id}`)
export const reqDeleteManyFiles = () => api.delete('/drive/delete-many')
export const reqFindFileById = (id) => api.get(`/drive/find-file-by-id${id}`)
export const reqFindManyFiles = () => api.get('/drive/find-many')
export const reqFindFilesByFolderPath = (path) =>
  api.get(`/drive/find-files-by-folder-path?path=${path}`)
