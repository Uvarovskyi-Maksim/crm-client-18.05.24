import '../pages/rolePages/adminPage/adminPageStyle.css'


const EditSecondMobile = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    setEditClientModeSecondPhone,
    close
}) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_edit_secondMobile ${editClientMode && selectedClient ? "show" : ""}`}>
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
                                            value={selectedClient.secondPhone}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, secondPhone: e.target.value })}
                                            required
                                        />

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>

                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => {handleEditClient(selectedClient._id); setEditClientModeSecondPhone(false)}}>
                                Сохранить
                            </button>

                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}

export default EditSecondMobile