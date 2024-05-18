import React, { useState, useEffect, useRef } from "react";
import '../pages/rolePages/adminPage/adminPageStyle.css'


const TaskFormRegister = ({ close, editTaskMode, registrationDataTask, handleRegistrationTaskChange, handleRegistrationTask }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        editTaskMode && <>
            <div className={`overlay ${editTaskMode ? "active" : ""}`} onClick={close}></div>
            <div style={{ display: "block" }} className={`user_modal ${editTaskMode ? "show" : ""}`}>
                <div className="close" onClick={close}>
                    &times;
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className='input_td'>
                                <div>Задание</div>
                                <input type="text" name="taskLine" value={registrationDataTask.taskLine} onChange={handleRegistrationTaskChange} required />
                                <input className="date" type="date" value={registrationDataTask.startDate = startDate} onInput={handleStartDateChange} onChange={handleRegistrationTaskChange} />
                                <input className="date" type="date" value={registrationDataTask.endDate = endDate} onInput={handleEndDateChange} onChange={handleRegistrationTaskChange} />

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

export default TaskFormRegister