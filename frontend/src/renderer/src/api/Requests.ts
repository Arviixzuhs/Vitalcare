import { api } from './axios'
import { Patient } from '@renderer/interfaces/patientModel'
import { paramsConstructor } from '@renderer/utils/paramsConstructor'

/* Rutas para manejar archivos */
export const reqFileUpload = (formData: FormData) =>
  api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

/* Rutas para manejar a los pacientes */
export const reqAddPatient = (data: Partial<Patient>) => api.post('/patient/register', data)
export const reqEditPatient = ({ data, id }: { data: Partial<Patient>; id: number }) =>
  api.put('/patient/update/' + id, data)
export const reqDeletePatient = (id: number) => api.delete('/patient/delete/' + id)
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
export const reqAuthLogin = async (data: { email: string; password: string }) =>
  api.post('/auth/login', data)
export const reqAuthRegister = async (data: {
  email: string
  password: string
  name: string
  lastName: string
}) => api.post('/auth/register', data)
export const reqAuthLoadProfileByToken = async (token: string) =>
  api.get('/auth/load/profile/' + token)

/* Rutas para manejar las consultas */
export const reqGetConsult = async (id: number) => api.get('/consult/get/' + id)
export const reqCreateConsult = async (data) => api.post('/consult/create', data)
export const reqDeleteConsult = async (id: number) => api.delete('/consult/delete/' + id)
export const reqUpdateConsult = async ({ data, id }) => api.put('/consult/update/' + id, data)
export const reqGetAllConsults = async () => api.get('/consult/get-all')
export const reqSearchConsult = ({
  searchValue,
  startDate,
  endDate,
}: {
  searchValue?: string
  startDate?: string
  endDate?: string
}) => {
  const params = paramsConstructor([
    { name: 'searchValue', value: searchValue ?? null },
    { name: 'startDate', value: startDate ?? null },
    { name: 'endDate', value: endDate ?? null },
  ])
  return api.get(`/consult/search?${params}`)
}

export const reqGetAllConsultsByPatientId = (patientId: number) =>
  api.get(`/consult/get-all-by-patient-id/${patientId}`)
export const reqFindAllConsultsToDay = () => api.get('/consult/find-all-to-day')
export const reqFindAllConsultsByMonthAndYear = (month: number, year: number) =>
  api.get(`/consult/find-all-by-month-and-year?month=${month}&year=${year}`)

/* Rutas para manejar al personal medico */
export const reqAddStaff = (data) => api.post('/clinicalstaff/create', data)
export const reqEditStaff = ({ data, id }) => api.patch('/clinicalstaff/update/' + id, data)
export const reqDeleteStaff = (id: number) => api.delete('/clinicalstaff/delete/' + id)
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
export const reqDeleteNote = (id: number) => api.delete(`/note/${id}`)
export const reqFindNoteById = (id: number) => api.get(`/note/${id}`)
export const reqFindAllNotesByPatientId = (id: number) => api.get(`/note/patient/${id}`)

/* Rutas para manejar diagnósticos */
export const reqCreateDiagnostic = (data) => api.post('/diagnostic', data)
export const reqUpdateDiagnostic = ({ data, id }) => api.patch(`/diagnostic/${id}`, data)
export const reqDeleteDiagnostic = (id: number) => api.delete(`/diagnostic/${id}`)
export const reqFindDiagnosticById = (id: number) => api.get(`/diagnostic/${id}`)
export const reqFindAllDiagnosticsByPatientId = (id: number) => api.get(`/diagnostic/patient/${id}`)

/* Rutas para manejar archivos */
export const reqCreateFile = (data) => api.post('/drive/create-file', data)
export const reqRenameFile = ({ id, newName }) => api.put(`/drive/rename-file/${id}`, { newName })
export const reqDeleteFile = (id: number) => api.delete(`/drive/delete-file/${id}`)
export const reqFindFileById = (id: number) => api.get(`/drive/find-file-by-id${id}`)
export const reqFindManyFiles = () => api.get('/drive/find-many')
export const reqDeleteManyFiles = () => api.delete('/drive/delete-many')
export const reqFindFilesByFolderPath = (path: string) =>
  api.get(`/drive/find-files-by-folder-path?path=${path}`)
