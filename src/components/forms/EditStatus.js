import '../pages/rolePages/adminPage/adminPageStyle.css'


const EditStatus = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    close
}) => {
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_status ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>
                    <form>
                        <select
                            name="status"
                            className='select_status'
                            size={8}
                            value={selectedClient.status}
                            onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
                            required
                        >
                            <option value="new">Потенциальный</option>
                            <option value="in_processing">Я подумаю,наберать систематично</option>
                            <option value="agreed">Договорились, но не отгрузили</option>
                            <option value="successful">Успешный</option>
                            <option value="return">Клиент купил на стороне. Вернуть!</option>
                            <option value="nds">НДС</option>
                            <option value="wholesale">Опт</option>
                            <option value="cancel">Отменённый</option>
                        </select>
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

export default EditStatus