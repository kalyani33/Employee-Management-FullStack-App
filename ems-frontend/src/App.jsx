import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import DepartmentComponent from './components/DepartmentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* http://localhost:8080/edit-employee/1 */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
          {/* http://localhost:8080/ */}
          <Route path='/' element={<ListEmployeeComponent/>}></Route>
          {/* http://localhost:8080/employees */}
          <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
          {/* http://localhost:8080/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>

          {/* http://localhost:8080/edit-department/1 */}
          <Route path='/edit-department/:id' element={<DepartmentComponent/>}></Route>
          {/* http://localhost:8080/departments */}
          <Route path='/departments' element={<ListDepartmentComponent/>}></Route>
          {/* http://localhost:8080/add-deaprtment */}
          <Route path='/add-department' element={<DepartmentComponent/>}></Route>
        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
