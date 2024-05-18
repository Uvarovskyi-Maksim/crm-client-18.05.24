import TaskForm from "./TaskForm";
import React, { useState, useEffect, useRef } from "react";

const EditManagerForm = ({
    editMode,
    selectedManager,
    handleEditManager,
    setSelectedManager,
    close,
    registrationDataTask,
    handleRegistrationTaskChange,
    handleRegistrationTask
}) => {
    const [taskMode, setTaskMode] = useState(null)
    const toggleTaskMode = () => {
        setTaskMode((prevMode) => {
            return prevMode === "edit" ? null : "edit";
        });
    };
    return (
        editMode && selectedManager && (
            <div>
                <div className={`overlay ${editMode && selectedManager ? "active" : ""}`} onClick={close}></div>

                <div style={{ display: "block" }} className={`user_modal_edit_manager ${editMode ? 'show' : ''}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form >
                        <table >
                            <h3>Редактирование данных менеджера: {selectedManager.email}</h3>

                            <tbody>

                                <tr style={{ display: "flow" }}>
                                    <td className="input_td">
                                        <div>Имя:</div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedManager.nameManager}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, nameManager: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Email:</div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={selectedManager.email}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, email: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div>Пароль:</div>
                                        <input
                                            type="text"
                                            name="password"
                                            value={selectedManager.password}
                                            onChange={(e) => setSelectedManager({ ...selectedManager, password: e.target.value })}
                                            required
                                        />
                                    </td>
                                    <td className="input_td">
                                        <div className='register add_task' onClick={toggleTaskMode}>Добавить задачу</div>
                                    </td>
                                    {taskMode &&
                                        <TaskForm selectedManager={selectedManager} registrationDataTask={registrationDataTask} handleRegistrationTaskChange={handleRegistrationTaskChange} handleRegistrationTask={handleRegistrationTask} />
                                    }
                                </tr>
                            </tbody>

                            <button type="button" className='register' style={{ width: "150px" }} onClick={() => handleEditManager(selectedManager.id)}>
                                Сохранить
                            </button>
                        </table>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditManagerForm