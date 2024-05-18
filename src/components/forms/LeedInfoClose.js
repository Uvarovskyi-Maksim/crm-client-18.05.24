import EditNotice from "./EditNotice"
import '../pages/rolePages/adminPage/adminPageStyle.css'

const LeedInfoClose = ({
    adminkey,
    editClientMode,
    editClientViewMode,
    selectedClient,
    handleClientClick,
    handleEditClient,
    managerIDOptions,
    ManagerStatusOptions,
    handleRegistrationNotice,
    registrationDataNotice,
    handleRegistrationNoticeChange,
    dataNotices,
    selectedNotice,
    handleEditNotice,
    handleNoticeClick,
    setSelectedNotice,
    editNoticeMode,
    leedNotice,
    close,
    handleDeleteNotice,
    closeNoticeEdit
}) => {
    const [viewEdit, setViewEdit] = useState(false)

    const view = () => {
        setViewEdit(true)
    }

    const noticeArr = dataNotices.filter((notice) => localStorage.getItem('LeedID') === notice.noticeID)


    return (
        <div>
            {editClientViewMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientViewMode && selectedClient ? "active" : ""}`} onClick={close}></div>

                    <div className={`user_modal ${editClientViewMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>
                        <div className="user_modal_left_side">

                            <div className="status_block">
                                <div>Статус: <span>{selectedClient.status}</span> </div> <div>{selectedClient.dateOfCreated}</div>

                            </div>
                            <div className='user_modal_left_main'>
                                <div className='user_modal_left_block'>
                                    <div className="content">
                                        <h3>Про лид</h3>
                                        <label className='el'>Менеджер:</label>
                                        <select
                                            name="managerID"
                                            value={selectedClient.managerID}
                                            required
                                        >
                                            <option value={adminkey}>Я</option>
                                            {managerIDOptions.map((option) => (
                                                <option key={option._id} value={option.managerID}>
                                                    {option.nameManager}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='el'><span>Продукт:</span> {selectedClient.product}</div>
                                        <div className='el'><span>Оплата:</span> {selectedClient.payment}</div>
                                        <div className='el'><span>Дата созвона:</span> {formatDateTime(new Date(selectedClient.selectedDate))}</div>
                                    </div>

                                </div>
                                <div className='user_modal_right_block'>
                                    <div className="content">
                                        <h3>Клиент</h3>
                                        <div className='el' onClick={view}><span>Имя:</span> {selectedClient.clientName}</div>
                                        <div className='el'><span>Почта:</span> {selectedClient.email}</div>
                                        <div className='el'><div style={{ display: "flex" }}><div><span>Номер телефона:</span></div> <div style={{ marginLeft: "10px" }}>{selectedClient.phone} <br /> {selectedClient.secondPhone}</div></div></div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="user_modal_right_side">
                            <div className='notice_container'>
                                <h4>Комментарии:</h4>
                                <ul className='notice_block'>
                                    {noticeArr.map(notice => (
                                        <li key={notice._id} >
                                            <div className='notice_date'>{notice.noticeDate} </div>

                                            <div className='notice_element'>{notice.content}</div>
                                            <div onClick={() => handleNoticeClick(notice._id)}>Редактировать</div>
                                            <div onClick={() => handleDeleteNotice(notice._id)}>Удалить</div>

                                        </li>
                                    ))}
                                    <EditNotice selectedNotice={selectedNotice} handleEditNotice={handleEditNotice} editNoticeMode={editNoticeMode} setSelectedNotice={setSelectedNotice} close={closeNoticeEdit}></EditNotice>

                                </ul>

                                <div className='add_notice'>
                                    <textarea name="content" placeholder='Введите комментарий' value={registrationDataNotice.content} onChange={handleRegistrationNoticeChange} required cols="30" rows="2"></textarea>

                                    <button type="button" onClick={handleRegistrationNotice}>Отправить</button></div>
                            </div>


                        </div>
                    </div>
                </>
            )}
        </div>


    )
}

export default LeedInfoClose