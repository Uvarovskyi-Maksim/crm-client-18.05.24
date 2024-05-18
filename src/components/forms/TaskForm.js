import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

const TaskForm = ({ selectedManager, registrationDataTask, handleRegistrationTaskChange, handleRegistrationTask }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td className='input_td'>
                                <div>Задание</div>
                                <input type="text" name="taskLine" value={registrationDataTask.taskLine} onChange={handleRegistrationTaskChange} required />
                                <input style={{ display: "none" }} type="text" name="managerID" value={registrationDataTask.managerID = selectedManager.managerID} onChange={handleRegistrationTaskChange} required />
                                <input className="date" type="date" placeholder='Дата начала' value={registrationDataTask.startDate = startDate} onInput={handleStartDateChange} onChange={handleRegistrationTaskChange} />
                                <input className="date" type="date" placeholder='Дата конца' value={registrationDataTask.endDate = endDate} onInput={handleEndDateChange} onChange={handleRegistrationTaskChange} />

                            </td>
                        </tr>
                    </tbody>
                    <button className='register' type="button" onClick={handleRegistrationTask}>
                        Добавить
                    </button>
                </table>
            </div>

        </>
    )
}

export default TaskForm