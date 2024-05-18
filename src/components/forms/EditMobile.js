import '../pages/rolePages/adminPage/adminPageStyle.css'

const EditMobile = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    setEditClientModeMobile,
    close
}) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_edit_mobile ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form>
                        <table style={{ width: "100%" }}>

                            <tbody>
                                <tr>
                                    <td className="input_td">
                                        <input
                                            type="number"
                                            name="phone"
                                            value={selectedClient.phone}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>

                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => {handleEditClient(selectedClient._id); setEditClientModeMobile(false)}}>
                                Сохранить
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default EditMobile