import axios from "axios"

const REST_API_BASE_URL="http://localhost:8080/api/departments"
const config = { headers: {'Content-Type': 'application/json'}}

export const listDepartments = () => axios.get(REST_API_BASE_URL);
export const createDepartment = (department) => axios.post(REST_API_BASE_URL,department);
export const updateDepartment = (departmentId,department) => axios.put(REST_API_BASE_URL+'/'+departmentId,department,config);
export const getDepartmentById = (departmentId)=>axios.get(REST_API_BASE_URL+'/'+departmentId);
export const deleteDepartmentById = (departmentId) => axios.delete(REST_API_BASE_URL+'/'+departmentId);