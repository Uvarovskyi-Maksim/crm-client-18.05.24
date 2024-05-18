import '../pages/rolePages/adminPage/adminPageStyle.css'
import { handleEditData } from '../common/EditData';

const EditFormProduct = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    handleDeleteClient,
    setEditMode,
    fetchData,
    selectedProduct,
    close }) => {
    const handleEditProduct = async () => {

        const requestData = {
            _id: selectedClient._id,
            name: selectedClient.name,
            cost: selectedClient.cost,
            count: selectedClient.count,
        };

        await handleEditData('/api/updateProductData', requestData, setEditMode, fetchData);
    };
    return (
        <div>
            {editClientMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>
                    <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>

                        <h3 style={{ textAlign: "center" }}>Редактирование продукта: {selectedClient.name}</h3>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form >
                            <table style={{ width: "100%" }}>
                                <tbody>

                                    <tr>
                                        <td className="input_td">
                                            <div>Наименование:</div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={selectedClient.name}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Цена:</div>
                                            <input
                                                type="number"
                                                name="cost"
                                                value={selectedClient.cost}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, cost: e.target.value })}
                                                required
                                            />
                                        </td>
                                        <td className="input_td">
                                            <div>Количество:</div>
                                            <input
                                                type="number"
                                                name="count"
                                                value={selectedClient.count}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, count: e.target.value })}
                                                required
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="btn_form_block">
                                <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                    Удалить
                                </button>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditProduct(selectedClient.id)}>
                                    Сохранить
                                </button>

                            </div>

                        </form>
                    </div></>
            )}
        </div>
    )
}

export default EditFormProduct