import '../pages/rolePages/adminPage/adminPageStyle.css'
import { handleEditData } from '../common/EditData';

const EditFormBuyer = ({
    editClientMode,
    handleDeleteClient,
    setSelectedClient,
    selectedClient, 
    managerIDOptions,
    setEditMode,
    fetchData,
    close }) => {
        const handleEditBuyer = async () => {
            const requestData = {
              _id: selectedClient._id,
              email: selectedClient.email,
              phone: selectedClient.phone,
              managerID: selectedClient.managerID,
              name: selectedClient.name,
              notice: selectedClient.notice
            };
        
            await handleEditData('/api/updateBuyerData', requestData, setEditMode, fetchData);
          };
    return (
        <div>
            {editClientMode && selectedClient && (
                <><div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>

                    <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form>
                            <h3 style={{ textAlign: "center" }}>Редактирование данных покупателя: {selectedClient.name}</h3>

                            <table style={{ width: "100%" }}>

                                <tbody>

                                    <tr>
                                        <td className="input_td">
                                            <div>Имя:</div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={selectedClient.name}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Email:</div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={selectedClient.email}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Номер телефона:</div>
                                            <input
                                                type="number"
                                                name="phone"
                                                value={selectedClient.phone}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Заметка:</div>
                                            <input
                                                type="text"
                                                name="notice"
                                                value={selectedClient.notice}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, notice: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Менеджер:</div>
                                            <select
                                                name="managerID"
                                                value={selectedClient.managerID}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, managerID: e.target.value })}
                                                required
                                            >
                                                {managerIDOptions.map((option) => (
                                                    <option key={option._id} value={option.managerID}>
                                                        {option.email}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='btn_form_block'>
                                <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                    Удалить
                                </button>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditBuyer(selectedClient.id)}>
                                    Сохранить
                                </button>

                            </div>

                        </form>
                    </div></>
            )}
        </div>
    )
}

export default EditFormBuyer