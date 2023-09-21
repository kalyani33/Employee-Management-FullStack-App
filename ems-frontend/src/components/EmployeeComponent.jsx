import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';
import { listDepartments } from '../services/DepartmentService';

const EmployeeComponent = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [departmentId,setDepartmentId] = useState('');
    const[departments,setDepartments] = useState([])
    const navigator = useNavigate();
    const {id} = useParams();
    useEffect(()=>{
        listDepartments().then((response)=>{
            setDepartments(response.data);
        }).catch(err=>console.error(err)),[]
    })
    useEffect(() =>{
        if(id){
            getEmployee(id).then((resonse) => {
                setFirstName(resonse.data.firstName)
                setLastName(resonse.data.lastName)
                setEmail(resonse.data.email)
                setDepartmentId(resonse.data.departmentId)
            }).catch((error) => console.log(error))
        }
    
    },[id])
    const [errors,setErrors] = useState({
        firstName:'',
        lastName:'',
        email:'',
        departmentId:''
    })
    
    function saveOrUpdateEmployee(event){
        
        event.preventDefault();
       
        if(validateForm()){
            const employee = {
                firstName : firstName,
                lastName:lastName,
                email:email,
                departmentId:departmentId
            }
            console.log(employee)
            if(id){
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                navigator('/employees')
                }).catch(error => console.error(error))
            }
            else{
            createEmployee(employee).then( response => {
                console.log(response.data);
                navigator('/employees')
            }) .catch(error => console.error(error))
        }
        }
         
    }
    // validation to form
    function validateForm(){
        const errorsCopy = {...errors}
        let valid = true;
        if(firstName.trim()){
            errorsCopy.firstName=''
        }else{
            errorsCopy.firstName="FirstName is Required"
            valid=false
        }
        if(lastName.trim()){
            errorsCopy.lastName=''
        }else{
            errorsCopy.lastName="LastName is Required"
            valid=false
        }
        if(email.trim()){
            errorsCopy.email=''
        }else{
            errorsCopy.email="Email is Required"
            valid=false
        }
        if(departmentId){
            errorsCopy.departmentId=''
        }else{
            errorsCopy.departmentId="Department is Required"
            valid=false
        }
        setErrors(errorsCopy)
        return valid
    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>FirstName:</label>
                            <input
                            className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                            type='text'
                            placeholder='Enter Employee FirstName'
                            name='firstName'
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}></input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName} </div>}
                        </div>
                        
                        <div className='form-group mb-2'>
                            <label className='form-label'>LastName:</label>
                            <input
                            className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                            type='text'
                            placeholder='Enter Employee LastName'
                            name='lastName'
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}></input>
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                            className={`form-control ${errors.email ? 'is-invalid':''}`}
                            type='text'
                            placeholder='Enter Employee Email'
                            name='email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}></input>
                            {errors.email && <div className='invalid-feedback'>{errors.email} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select 
                                className={`form-control ${errors.departmentId ? 'is-invalid':''}`}
                                value={departmentId}
                                onChange={event => setDepartmentId(event.target.value)}>
                                <option value="Select Department">Select Department</option>
                                {departments.map(department =>
                                    <option key={department.id} value={department.id}>{department.departmentName}</option>
                                )}  
                            </select>
                            {errors.departmentId && <div className='invalid-feedback'>{errors.departmentId} </div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default EmployeeComponent