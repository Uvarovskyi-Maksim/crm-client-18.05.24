import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";
import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../common/EditData";

import BucketImg from '../../img/bucket.png'
import EditImg from '../../img/edit.png'
import EditDate from './EditDate';
import EditEmail from './EditEmail';
import EditManager from './EditManager';
import EditMobile from './EditMobile';
import EditName from './EditName';
import EditNotice from './EditNotice';
import EditNoticeMode from './EditNoticeMode';
import EditPayment from './EditPayment';
import EditPaymentMode from './EditPaymentMode';
import EditProduct from './EditProduct';
import EditSecondMobile from './EditSecondMobile';
import EditStatus from './EditStatus';


const LeedInfo = ({
    adminkey,
    dataProducts,
    editClientViewMode,
    selectedClient,
    handleClientClick,
    managerIDOptions,
    handleRegistrationNotice,
    registrationDataNotice,
    handleRegistrationNoticeChange,
    dataNotices,
    selectedNotice,
    handleEditNotice,
    handleNoticeClick,
    setSelectedNotice,
    editNoticeMode,
    close,
    handleDeleteNotice,
    closeNoticeEdit,
    setSelectedClient,
    editClientModeMobile,
    handleDataClick,
    editClientModeEmail,
    editClientModeName,
    editClientModeDate,
    editClientModeStatus,
    editClientModeManager,
    editClientModePayment,
    editClientModeProduct,
    editClientModeNotice,
    editClientModeSecondPhone,
    editClientModePaymentCost,
    setEditClientModeEmail,
    setEditClientModeName,
    setEditClientModeDate,
    setEditClientModeStatus,
    setEditClientModeManager,
    setEditClientModeProduct,
    setEditClientModePayment,
    setEditClientModeNotice,
    setEditClientModePaymentCost,
    setEditClientModeSecondPhone,
    setEditClientModeMobile,
    closeMobile,
    closeEmail,
    closeName,
    closeDate,
    closeStatus,
    closeManager,
    closeProduct,
    closePayment,
    closePaymentCost,
    closeNotice,
    closeSecondPhone,
    checkedProducts,
    setCheckedProducts,
    paymentArray,
    handleDeleteClient,
    handleDateChange,
    registrationDataClient,
    setEditClienViewtMode,
    setEditMode,
    setEditNoticeMode,
    fetchData
}) => {
    const [viewEdit, setEditClientMode] = useState(false)
    const [paymentIndex, setPaymentIndex] = useState(0);
    const handleRerender = () => {
        handleDataClick(selectedClient._id, setEditClientMode)
    };
    const handleEditClient = async () => {

        const requestData = {
          _id: selectedClient._id,
          email: selectedClient.email,
          phone: selectedClient.phone,
          managerID: selectedClient.managerID,
          status: selectedClient.status,
          product: selectedClient.product,
          clientName: selectedClient.clientName,
          payment: selectedClient.payment,
          notice: selectedClient.notice,
          selectedDate: selectedClient.selectedDate,
          secondPhone: selectedClient.secondPhone
        };
    
        await handleEditData('/api/updateClientData', requestData, setEditMode, fetchData, setEditClientModeProduct);
      };
    const fetchDataById = async (id, apiEndpoint, setDataFunction, setEditModeFunction, setCheckedProducts, setPaymentIndex, index) => {
        try {
            //// console.log(id);
            localStorage.setItem('LeedID', id)
            const currentDate = new Date();
            const formattedDateTime = formatDateTime(currentDate);


            const response = await fetch(`${apiEndpoint}?_id=${id}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Ошибка при получении данных: ${errorText}`);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setDataFunction(data);
                setPaymentIndex(index)
                setEditModeFunction(true);
                setCheckedProducts(data.product || [])

            }
        } catch (error) {
            console.error(`Ошибка при получении данных: ${error}`);
        }
    };



    const handleDataClickPay = async (id, setMode, index) => {
        fetchDataById(id, '/api/getClientData', setSelectedClient, setMode, setCheckedProducts, setPaymentIndex, index);
    }

    const handleQuantityChange = (index, count) => {
        const updatedProducts = selectedClient.product.map((product, i) => {
            if (i === index) {
                const totalPrice = product.cost * count;
                return { ...product, count, totalPrice };
            }
            return product;
        });
        setSelectedClient(prevSelectedClient => ({
            ...prevSelectedClient,
            product: updatedProducts
        }));
    };

    const handleQuantityChangeCost = (index, cost) => {
        const updatedProducts = selectedClient.product.map((product, i) => {
            if (i === index) {

                return { ...product, cost };
            }
            return product;
        });
        setSelectedClient(prevSelectedClient => ({
            ...prevSelectedClient,
            product: updatedProducts
        }));
    };

    const getTotalPrice = (index) => {
        const product = selectedClient.product[index];
        if (product) {
            return product.cost * product.count;
        }
        return 0;
    };

    const handleEditDataCancel = async (apiEndpoint, requestData) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            console.log(JSON.stringify(requestData));

            if (response.ok) {
                alert('Редактирование прошло успешно!')


            } else {
                alert("Не удалось обновить данные. Пожалуйста, попробуйте снова.");
            }
        } catch (error) {
            console.error(`Ошибка при обновлении данных: ${error}`);
        }
    };


    const cancelLeed = async () => {
        // Создаем объект requestData с необходимыми данными
        const requestData = {
            _id: selectedClient._id,
            status: "cancel"
        };

        // Вызываем функцию handleEditData, передавая объект requestData
        await handleEditDataCancel('/api/updateClientData', requestData);
    };

    async function deleteProduct(clientId, productIndex, way) {
        try {
            const response = await fetch(`/api/client/${clientId}/${way}/${productIndex}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete product: ${errorMessage}`);
            }
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            }


        } catch (error) {
            // Обработка ошибок
            console.error('Error deleting product:', error.message);
            throw error;
        }
    }



    const noticeArr = dataNotices.filter((notice) => localStorage.getItem('LeedID') === notice.noticeID)


    return (
        <div>
            <EditProduct setEditClienViewtMode={setEditClienViewtMode} setCheckedProducts={setCheckedProducts} checkedProducts={checkedProducts} close={closeProduct} dataProducts={dataProducts} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeProduct} setEditClientModeProduct={setEditClientModeProduct} ></EditProduct>

            {editClientViewMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientViewMode && selectedClient ? "active" : ""}`} onClick={close}></div>

                    <div className={`user_modal ${editClientViewMode && selectedClient ? "show" : ""}`}  >
                        <div className="close" onClick={close}>
                            &times;
                        </div>
                        <div className="user_modal_left_side">
                            {/*//commit2 <button onClick={handleRerender}>Список продуктов</button> */}
                            <div className="status_block">
                                <div>Статус: <span onClick={() => handleDataClick(selectedClient._id, setEditClientModeStatus)}>{selectedClient.status}</span> </div> <div>{selectedClient.dateOfCreated}</div>

                            </div>
                            <div className='user_modal_left_main'>
                                <div className='user_modal_left_block'>
                                    <div className="content">
                                        <h3>Про лид</h3>
                                        <label className='el'>Менеджер:</label>
                                        <select
                                            name="managerID"
                                            value={selectedClient.managerID}
                                            onClick={() => handleDataClick(selectedClient._id, setEditClientModeManager)}
                                            required
                                        >
                                            <option value={adminkey}>Я</option>
                                            {managerIDOptions.map((option) => (
                                                <option key={option._id} value={option.managerID}>
                                                    {option.nameManager}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='el' style={{ display: "flex" }}><span>Дата созвона:</span> <div className='leed_el' onClick={() => handleDataClick(selectedClient._id, setEditClientModeDate)}>{formatDateTime(new Date(selectedClient.selectedDate))}</div></div>

                                        <div className='el' style={{ display: "flex" }}>
                                            <span>Заметка:</span>
                                            <div className='leed_el' onClick={() => handleDataClick(selectedClient._id, setEditClientModeNotice)}>
                                                {selectedClient.notice || '(Пусто)'}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='user_modal_right_block'>
                                    <div className="content">
                                        <h3>Клиент</h3>
                                        <div className='el' style={{ display: "flex" }}>
                                            <span>Имя:</span>
                                            <div className='leed_el' onClick={() => handleDataClick(selectedClient._id, setEditClientModeName)}>
                                                {selectedClient.clientName || 'Укажите имя'}
                                            </div>
                                        </div>
                                        <div className='el' style={{ display: "flex" }}>
                                            <span>Почта:</span>
                                            <div className='leed_el' onClick={() => handleDataClick(selectedClient._id, setEditClientModeEmail)}>
                                                {selectedClient.email || 'Добавить почту'}
                                            </div>
                                        </div>
                                        <div className='el'><div style={{ display: "flex" }}>
                                            <div><span>Номер телефона:</span></div>
                                            <div onClick={() => handleClientClick(selectedClient._id)} className='leed_el' >{selectedClient.phone || 'Добавить номер телефона'} </div></div>
                                        </div>
                                        <div className='el'><div style={{ display: "flex" }}>
                                            <div><span>Доп. номер телефона:</span></div>
                                            <div onClick={() => handleDataClick(selectedClient._id, setEditClientModeSecondPhone)} className='leed_el' >{selectedClient.secondPhone || 'Добавить номер телефона'} </div></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div style={{ width: "100%" }} className='user_modal_left_block'>
                                <ul className='product_ul'>
                                    <div className='el' style={{ display: "flex", justifyContent: "space-between", alignItems: "self-end" }}>
                                        <div className='title_block'>Товары / Услуги</div>
                                        <div className='leed_el' style={{ width: "max-content" }} onClick={() => {
                                            handleDataClick(selectedClient._id, setEditClientModeProduct);
                                            setEditClienViewtMode(false)
                                        }}
                                        >
                                            <div className='add_pay_btn'>Добавить товар</div>
                                        </div>
                                    </div>

                                    {selectedClient.product.map((product, index) => (
                                        <li key={index}>
                                            {product.name} -
                                            <div>
                                                <label htmlFor="">Количество</label>
                                                <input
                                                    className='pruduct_data_input'
                                                    type="number"
                                                    defaultValue={Number(product.count)}
                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                />
                                            </div>
                                            -
                                            <div className='product_ul_el' >
                                                <label htmlFor="">Цена</label>
                                                <input
                                                    className='pruduct_data_input'
                                                    type="number"
                                                    defaultValue={Number(product.cost)}
                                                    onChange={(e) => handleQuantityChangeCost(index, parseInt(e.target.value))}
                                                /> <div className='currency'>₴</div>
                                            </div>
                                            <div><label htmlFor="">Общая цена:</label> {getTotalPrice(index)}</div>
                                            <div onMouseUp={handleRerender} onMouseDown={() => deleteProduct(selectedClient._id, index, 'product')}>
                                                <img className='bucketImg' src={BucketImg} alt="" />
                                            </div>

                                        </li>

                                    ))}
                                </ul>
                                <div className='btn_form_block'>
                                    <button className='register' style={{ width: "120px", marginLeft: "20px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                        Сохранить
                                    </button>
                                </div>
                            </div>

                            <div style={{ width: "100%" }} className='user_modal_left_block payment_block' onMouseEnter={handleRerender}>
                                <div className='el'> <div className='title_block'>Оплаты</div><div className='add_pay_btn' onClick={() => handleDataClick(selectedClient._id, setEditClientModePayment)}>Добавить оплату</div></div>

                                <ul className='product_ul'>

                                    {Array.isArray(selectedClient.payment) && selectedClient.payment.map((paymentItem, index) => (
                                        <li key={index} >
                                            <div>{paymentItem.paymentStatus || ''}</div>
                                            <div>{paymentItem.paymentMethod || ''}</div>
                                            <div>{paymentItem.cost || ''}</div>
                                            <div>{paymentItem.notice || ''}</div>

                                            <div>{new Date(paymentItem.selectedDate).toLocaleString()}</div>
                                            <div onClick={() => handleDataClickPay(selectedClient._id, setEditClientModePaymentCost, index)}>
                                                <img className='bucketImg' src={EditImg} alt="" />
                                            </div>
                                            <div onMouseUp={handleRerender} onMouseDown={() => deleteProduct(selectedClient._id, index, 'payment')}>
                                                <img className='bucketImg' src={BucketImg} alt="" />
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            </div>



                            <div className='btn_form_block'>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => cancelLeed(selectedClient._id)}>
                                    Отменить лид
                                </button>
                                <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                    Удалить лид
                                </button>
                            </div>
                        </div>
                        <div className="user_modal_right_side">
                            <div className='notice_container'>
                                <h4>Комментарии:</h4>
                                <ul className='notice_block'>
                                    {noticeArr.map(notice => (
                                        <li key={notice.noticeID} >
                                            <div className='notice_date'>{notice.noticeDate} </div>

                                            <div className='notice_element'>{notice.content}
                                                <div className='edit_btns'>
                                                    <div onClick={() => handleNoticeClick(notice._id)}><img className='bucketImg' src={EditImg} alt="" /></div>
                                                    <div onClick={() => handleDeleteNotice(notice._id)}><img className='bucketImg' src={BucketImg} alt="" /></div>
                                                </div>
                                            </div>

                                        </li>
                                    ))}
                                    <EditNotice setEditClientModeNotice={setEditNoticeMode} setEditMode={setEditMode} fetchData={fetchData} selectedNotice={selectedNotice} handleDeleteNotice={handleDeleteNotice} handleEditNotice={handleEditNotice} editNoticeMode={editNoticeMode} setSelectedNotice={setSelectedNotice} close={closeNoticeEdit}></EditNotice>
                                </ul>
                                <EditMobile close={closeMobile} setEditClientModeMobile={setEditClientModeMobile} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeMobile}></EditMobile>
                                <EditEmail close={closeEmail} setEditClientModeEmail={setEditClientModeEmail} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeEmail} ></EditEmail>
                                <EditName close={closeName} setEditClientModeName={setEditClientModeName} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeName} ></EditName>
                                <EditDate close={closeDate} setEditClientModeDate={setEditClientModeDate} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeDate} ></EditDate>
                                <EditStatus close={closeStatus} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeStatus} ></EditStatus>
                                <EditPayment setEditClientMode={setEditClientModePayment} close={closePayment} registrationDataClient={registrationDataClient} handleDateChange={handleDateChange} paymentArray={paymentArray} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModePayment} ></EditPayment>
                                <EditPaymentMode close={closePaymentCost} paymentIndex={paymentIndex} paymentArray={paymentArray} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModePaymentCost}></EditPaymentMode>

                                <EditSecondMobile close={closeSecondPhone} setEditClientModeSecondPhone={setEditClientModeSecondPhone} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeSecondPhone}></EditSecondMobile>

                                <EditNoticeMode setEditMode={setEditMode} fetchData={fetchData} close={closeNotice} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeNotice} setEditClientModeNotice={setEditClientModeNotice}> </EditNoticeMode>

                                <EditManager close={closeManager} adminkey={adminkey} managerIDOptions={managerIDOptions} handleEditClient={handleEditClient} selectedClient={selectedClient} setSelectedClient={setSelectedClient} editClientMode={editClientModeManager} ></EditManager>

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

export default LeedInfo;