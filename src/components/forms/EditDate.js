import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditDate = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    setEditClientModeDate,
    close
}) => {

    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block"}} className={`user_modal_edit_time ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                
                                        <DatePicker
                                            selected={selectedClient.selectedDate ? new Date(selectedClient.selectedDate) : null}
                                            onChange={(date) => setSelectedClient({ ...selectedClient, selectedDate: date })}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeInputLabel="Enter Time"
                                            timeIntervals={5}
                                            dateFormat="MMMM d, yyyy HH:mm"
                                            shouldCloseOnSelect={false}
                                            minDate={new Date()}
                                        />                                       
                                   
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => {handleEditClient(selectedClient._id); setEditClientModeDate(false)}}>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditDate