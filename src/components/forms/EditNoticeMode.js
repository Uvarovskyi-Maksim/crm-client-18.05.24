import '../pages/rolePages/adminPage/adminPageStyle.css'
import { handleEditData } from '../common/EditData';

const EditNoticeMode = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    setEditClientModeNotice,
    setEditMode,
    fetchData,
    handleEditClient,
    close
}) => {
    const handleEditNotice = async () => {
        const requestData = {
          _id: selectedClient._id,
          content: selectedClient.content,
        };
    
        await handleEditData('/api/updateNotice', requestData, setEditMode, fetchData);
      };
    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_edit_leed ${editClientMode && selectedClient ? "show" : ""}`}>
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
                                            name="notice"
                                            value={selectedClient.notice}
                                            onChange={(e) => setSelectedClient({ ...selectedClient, notice: e.target.value })}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => {
                                handleEditClient(selectedClient._id);
                                setEditClientModeNotice(false)
                            }}>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditNoticeMode