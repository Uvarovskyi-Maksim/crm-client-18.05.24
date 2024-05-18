import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";
import { handleEditData } from '../common/EditData';

const EditNotice = ({
    editNoticeMode,
    setSelectedNotice,
    selectedNotice,
    setEditMode,
    fetchData,
    handleDeleteNotice,
    setEditClientModeNotice,
    close
}) => {
    const handleEditNotice = async () => {
        const requestData = {
            _id: selectedNotice._id,
            content: selectedNotice.content,
        };

        await handleEditData('/api/updateNotice', requestData, setEditMode, fetchData);
    };
    return (
        <div>
            {editNoticeMode && selectedNotice && (
                <div style={{ display: "block" }} className={`user_modal_notice ${editNoticeMode && selectedNotice ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form>
                        <table style={{ width: "100%" }}>

                            <tbody>

                                <tr>
                                    <td className="input_td">


                                        <textarea
                                        rows={5}
                                        cols={30}
                                            type="text"
                                            name="phone"
                                            value={selectedNotice.content}
                                            onChange={(e) => setSelectedNotice({ ...selectedNotice, content: e.target.value })}
                                            required
                                        />

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>

                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => { handleEditNotice(selectedNotice._id); fetchData(); setEditClientModeNotice(false)}}>
                                Сохранить
                            </button>
                            <button className='register' style={{ width: "120px", marginLeft:"15px" }} type="button" onClick={() => handleDeleteNotice(selectedNotice._id)}>
                                Delete
                            </button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default EditNotice;