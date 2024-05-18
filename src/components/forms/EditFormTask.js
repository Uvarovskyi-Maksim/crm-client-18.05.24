import '../pages/rolePages/adminPage/adminPageStyle.css'

const EditFormTask = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    close }) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>

                    <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form>
                            <table style={{ width: "100%" }}>

                                <tbody>

                                    <tr>
                                        <td className="input_td">
                                            <div>Статус:</div>

                                            <select
                                                name="taskStatus"
                                                value={selectedClient.taskStatus}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, taskStatus: e.target.value })}
                                            >
                                                <option value="false">Не выполнено</option>
                                                <option value="true">Выполнено</option>


                                            </select>
                                        </td>


                                    </tr>
                                </tbody>
                            </table>
                            <div className='btn_form_block'>

                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                    Сохранить
                                </button>

                            </div>

                        </form>
                    </div></>
            )}
        </div>
    )
}

export default EditFormTask