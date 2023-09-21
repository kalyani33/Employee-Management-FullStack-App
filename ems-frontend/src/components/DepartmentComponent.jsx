import React, { useEffect, useState } from 'react'
import { createDepartment } from '../services/DepartmentService'
import { updateDepartment } from '../services/DepartmentService'
import {getDepartmentById} from '../services/DepartmentService'
import { useNavigate, useParams} from 'react-router-dom'

const DepartmentComponent = () => {
    const [departmentName,setdepartmentName] = useState('')
    const [departmentDescription,setdepartmentDescription] = useState('')
    const navigator = useNavigate()
    const {id} = useParams();
    useEffect(()=>{
        getDepartmentById(id).then(response =>{
            setdepartmentName(response.data.departmentName);
            setdepartmentDescription(response.data.departmentDescription)
        }).catch(error => console.error(error))
    },[id])
    function saveOrUpddateDepartment(e){
            e.preventDefault();
            const department ={departmentName,departmentDescription}
            if(id){
                updateDepartment(id,department).then(res => navigator('/departments')).catch(err=>console.error(err))
            }
            else{
            console.log(department);
            createDepartment(department).then(navigator('/departments'))
            .catch(err => console.error(err))
            }
    }
    function titleChange(){
        if(id){
            return <h2 className='text-center'>Update Department</h2>
        }
        else{
            return <h2 className='text-center'>Add Department</h2>
        }
    }

  return (
    <div className='container'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6  offset-md-3 offset-md-3'>
            <div className='card-body'>
                {titleChange()}
                <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>DepartmentName:</label>
                            <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Department Name'
                            name='departmentName'
                            value={departmentName}
                            onChange={event => setdepartmentName(event.target.value)}></input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description:</label>
                            <input
                            className='form-control'
                            type='text'
                            placeholder='Enter Department Description'
                            name='departmentDescription'
                            value={departmentDescription}
                            onChange={event => setdepartmentDescription(event.target.value)}></input>
                        </div>
                        <button className='btn btn-success' onClick={(e) => saveOrUpddateDepartment(e)}>Submit</button>
                </form>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default DepartmentComponent