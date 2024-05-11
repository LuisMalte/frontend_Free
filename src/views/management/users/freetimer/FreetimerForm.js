import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'

const FreetimerForm = () => {
    const [freetimeData, setFreetimeData] = useState({
        userId: '',
        healthInsurance: true,
        categoryId: '1C',
    });
    
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{

        const getCategory = async () => {
            const response = await Axios({url:'http://localhost:3000/api/listCategories'});
            const lstCategories = Object.keys(response.data).map(i=> response.data[i]);
            setCategories(lstCategories.flat());
        }

        getCategory();


    },[selectedCategory]);

    function handleSelectCategories(event){
        setSelectedCategory(event.target.value);
    }

    function handleChange(event){
        const {name, value} = event.target;
        setFreetimeData({
            ...freetimeData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/users/freetimer');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
                        console.log(freetimeData)

            const response = await Axios.post('http://localhost:3000/api/createfreetimer', freetimeData);
            console.log(response.data);
            navigate('/users/freetimer');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="userId" name="userId" label="User ID" value={freetimeData.userId} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="healthInsurance" name="healthInsurance" label="health Insurance" value={freetimeData.healthInsurance} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
                <CFormSelect id="category Options" label = "category" value={ selectedCategory} onChange={handleSelectCategories} >
                    <option value="">Select a category</option>
                    {categories.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol xs={6}>
                <CButton color="primary" type="submit" >Save</CButton>
            </CCol>
            <CCol xs={6}>
                <CButton color="secondary" onClick={handleReturn}>Cancel</CButton>
            </CCol>
        </CForm>
    )
}

export default FreetimerForm