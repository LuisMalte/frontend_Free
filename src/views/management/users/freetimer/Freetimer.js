import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react'

import Axios from 'axios';
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  
  
} from '@coreui/react';

import{
  cilTrash,
  cilPencil,
  cilUserPlus
}from '@coreui/icons';


const User = () => {

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const getUsers = async() =>{
      const response = await Axios({
        url: 'http://localhost:3000/api/listuser'
      });
      const lstUsers = Object.keys(response.data).map(i=> response.data[i]);
      setUserData(lstUsers.flat());
    }

    getUsers();
  },[]);

  function handleCreateUser(event){
    navigate('/users/userform');
  }

  function handleCreateFreetimer(event){
    navigate('/users/userform');
  }
  function handleCreateFulltimer(event){
    navigate('/users/userform');
  }
  
  function handleEdit(userId){
    
    navigate(`/users/usereditform/${userId}`)
  }

   const handleDisable = async(userId) =>{
    try{
      console.log("User ID:", userId); // Agregar un console.log para depurar
      var url = "http://localhost:3000/api/disableuser/"+userId;
      const response= await Axios.put(url)
      window.location.reload();

    }
    catch(e){
      console.log(e);
    }
  }




  return (
    <div>
      <CButton onClick={handleCreateUser} style={{ display: 'flex', alignItems: 'center' }}>
          New User
          <span style={{ marginLeft: '5px', fontSize: '20px' }}>
              <div >
                  <CIcon icon={cilUserPlus} size="xl" />

              </div>
          </span>
      </CButton>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Phone</CTableHeaderCell>
            <CTableHeaderCell>City</CTableHeaderCell>
            <CTableHeaderCell>Address</CTableHeaderCell>
            <CTableHeaderCell>Password</CTableHeaderCell>
            <CTableHeaderCell>Options</CTableHeaderCell>
            <CTableHeaderCell>Tipo de usuario</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
          
            {userData.map((user, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{user.userName}</CTableDataCell>
                <CTableDataCell>{user.userEmail}</CTableDataCell>
                <CTableDataCell>{user.userPhone}</CTableDataCell>
                <CTableDataCell>{user.cityId}</CTableDataCell>
                <CTableDataCell>{user.userAddress}</CTableDataCell>
                <CTableDataCell>{user.userPassword}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleDisable(user.userId)} >
                     <CIcon icon={cilTrash}
                     size="xl" /> 
                  </CButton>
                  <CButton onClick={() => handleEdit(user.userId)} >
                    <CIcon icon={cilPencil} 
                    size="xl"/> 
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={ handleCreateFreetimer} color="secondary" size="xl">FreeTimer</CButton>{' '}
                  <CButton onClick={ handleCreateFulltimer} color="secondary" size="xl">FullTimddder</CButton>
                </CTableDataCell>
                </CTableRow>
              ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default User
