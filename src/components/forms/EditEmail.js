import '../pages/rolePages/adminPage/adminPageStyle.css'

const EditEmail = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    setEditClientModeEmail,
    close
}) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_edit_email ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td className="input_td">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={selectedClient.email}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => {handleEditClient(selectedClient._id); setEditClientModeEmail(false)}}>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditEmail