import React, { useEffect, useState } from 'react'
import { listDepartments } from '../services/DepartmentService'
import { deleteDepartmentById } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {
    const[departments,setDepartments] = useState([])
    const navigator = useNavigate();
    useEffect(()=>
    getAllDepartments()
    ,[])

    function getAllDepartments(){
        listDepartments().then(response => setDepartments(response.data)).catch(err => console.error(err))
    }
    function addNewDepartment(){
        navigator("/add-department")
    }
    function updateDepartment(id){
        navigator(`/edit-department/${id}`)
    }
    function deleteDepartment(id){
        deleteDepartmentById(id).then(res=>getAllDepartments()).catch(err=>console.error(err))
    }
  return (
    <div className='container'>
        <h2 className='text-center'>List Of Departments</h2>
        <button className='btn btn-primary mb-2' onClick={addNewDepartment}>Add Department</button>
        <table className='table table-striped table-bordered'>
            <thead>
            <tr>
                <th>Department ID</th> 
                <th>Department Name</th>
                <th>Department Description</th>
            </tr>
            </thead>
            <tbody>
                {departments.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => deleteDepartment(department.id)} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                    )}
            </tbody>
        </table>

    </div>
  )
}

export default ListDepartmentComponent