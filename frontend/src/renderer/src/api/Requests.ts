import { api } from './axios'

/* Rutas para manejar a los pacientes */
export const reqAddPatient = (data) => api.post('/patient/register', data)
export const reqEditPatient = ({ data, id }) => api.put('/patient/update/' + id, data)
export const reqDeletePatient = (id) => api.delete('/patient/delete/' + id)
export const reqLoadAllPatients = () => api.get('/patient/get-all')
export const reqSearchPatientByName = (name: string) =>
  api.get(`/patient/search-by-name?name=${name}`)
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
export const reqSearchConsultByPatientCI = (ci: string) =>
  api.get(`/consult/search-by-patient-dni/${ci}`)

/* Rutas para manejar al personal medico */
export const reqAddStaff = (data) => api.post('/clinicalstaff/create', data)
export const reqEditStaff = ({ data, id }) => api.patch('/clinicalstaff/update/' + id, data)
export const reqDeleteStaff = (id) => api.delete('/clinicalstaff/delete/' + id)
export const reqLoadAllStaff = () => api.get('/clinicalstaff/get-all')
export const reqGetHospitalStats = () => api.get('/hospital/get-stats')
export const reqSearchClinicalStaffByName = (name: string) =>
  api.get(`/clinicalstaff/search-by-name?name=${name}`)
export const reqGetClinicalStaffCountByDate = () => api.get('/clinicalstaff/count-by-date')
