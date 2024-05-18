import '../pages/rolePages/adminPage/adminPageStyle.css'

const EditManager = ({
    adminkey,
    managerIDOptions,
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    close
}) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td className="input_td">
                                        <select
                                            name="managerID"
                                            value={selectedClient.managerID}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, managerID: e.target.value })}
                                            required
                                        >
                                            <option value={adminkey}>Я</option>
                                            {managerIDOptions.map((option) => (
                                                <option key={option._id} value={option.managerID}>
                                                    {option.nameManager}
                                                </option>
                                            ))}
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
                </div>
            )}
        </div>
    )
}

export default EditManager