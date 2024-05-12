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

const TaskForm = () => {
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskDescription: '',
        date: '',
        offer: '',
        address: '',
        taskTypeId: '',
        fulltimerId: '',
    });
    
    const [tasks, setTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        const getTasks = async () => {
            const response = await Axios({url:'http://localhost:3000/api/listTypes'});
            const lstTasks = Object.keys(response.data).map(i=> response.data[i]);
            setTask(lstTasks.flat());
        }


        getTasks();


    },[selectedTask]);

    function handleSelectTasks(event){
        setSelectedTask(event.target.value);
        setTaskData({
            ...taskData,
            taskTypeId: event.target.value
        })
    }

    

    function handleChange(event){
        const {name, value} = event.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    function handleReturn(event){
        navigate('/tasks/task');
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            
            const response = await Axios.post('http://localhost:3000/api/createTask', taskData);
            console.log(response.data);
            navigate('/users/user');
        }
        catch (e){
            console.log(e);
        }
    }

    return(
        <CForm className="row g-3" onSubmit={handleSubmit}>
            <CCol md={12}>
                <CFormInput type="text" id="taskName" name="taskName" label="Name" value={taskData.taskName} onChange={handleChange} />
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="taskDescription" name="taskDescription" label="Task Description" value={taskData.taskDescription} onChange={handleChange} />
            </CCol>

            <CCol xs={4}>
                <CFormInput type="text" id="date" name="date" label="Date" value={taskData.date} onChange={handleChange} />
            </CCol>
            <CCol xs={4}>
                <CFormInput type="text" id="offer" name="offer" label="Offer" value={taskData.offer} onChange={handleChange} />
            </CCol>
            <CCol md={4}>
                <CFormInput type="text" id="address" name="address" label="Address" value={taskData.address} onChange={handleChange} />
            </CCol>

            <CCol xs={12}>
                <CFormSelect id="taskType" label = "Task taypes" value={ selectedTask} onChange={handleSelectTasks} >
                    <option value="">Select task</option>
                    {tasks.map(opcion =>(
                        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                    ))}
                </CFormSelect>
            </CCol>
            <CCol md={12}>
                <CFormInput type="text" id="fulltimerId" name="fulltimerId" label="Fulltimer ID" value={taskData.fulltimerId} onChange={handleChange} />
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

export default TaskForm