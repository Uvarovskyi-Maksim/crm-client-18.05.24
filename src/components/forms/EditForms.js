import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditForm = ({
    adminkey,
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    managerIDOptions,
    ManagerStatusOptions,
    handleDeleteClient,
    registrationDataClient,
    handleRegistrationClientChange,
    dataProducts,
    paymentArray,
    handleDateChange,

    close }) => {

    return (
        <div>
            {editClientMode && selectedClient && (
                <div>
                    <div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>
                    <div className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form className='client_reg_form'>
                            <h2 className='leed_head_txt'>Редактирование лида</h2>


                            <div >
                                <h3 style={{ color: "#445486" }}>Контактная информация</h3>
                                <div className='client_info'>
                                    <div className='client_info_left'>
                                        <div className="input_td">
                                            <div className='input_name'>Имя:</div>
                                            <input
                                                type="text"
                                                name="clientName"
                                                value={selectedClient.clientName}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, clientName: e.target.value })}
                                                required
                                            /></div>

                                        <div className="input_td">
                                            <div className='input_name'>Email:</div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={selectedClient.email}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='client_info_right'>
                                        <div className="input_td">
                                            <div className='input_name'>Номер телефона:</div>
                                            <input
                                                type="number"
                                                name="phone"
                                                value={selectedClient.phone}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="input_td">
                                            <div className='input_name'>Второй номер телефона:</div>
                                            <input
                                                type="number"
                                                name="secondPhone"
                                                value={selectedClient.secondPhone}
                                                onChange={(e) => setSelectedClient({ ...selectedClient, secondPhone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <h3 style={{ color: "#445486" }}>Дополнительная информация</h3>
                                    <div className='client_info'>
                                        <div className='client_info_left'>
                                            <div className="input_td">
                                                <div className='input_name'>Менеджер:</div>
                                                <select
                                                    name="managerID"
                                                    value={selectedClient.managerID}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, managerID: e.target.value })}
                                                    required
                                                >
                                                    <option value={adminkey}>Я</option>
                                                    {managerIDOptions.map((option) => (
                                                        <option key={option._id} value={option.managerID}>
                                                            {option.email}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Статус:</div>
                                                <select
                                                    name="status"
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
                                                </select>
                                            </div>
                                        </div>
                                        <div className='client_info_right'>
                                            <div className='input_td'>
                                                <div className='input_name'>Продукт:</div>
                                                <select
                                                    name="product"
                                                    value={selectedClient.product}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, product: e.target.value })}
                                                >
                                                    <option value="">Выберите продукт</option>
                                                    {dataProducts.map((buyer) => (
                                                        <option key={buyer._id} value={buyer.name}>
                                                            {buyer.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Оплата:</div>
                                                <select
                                                    name="payment"
                                                    value={selectedClient.payment}
                                                    onChange={(e) => setSelectedClient({ ...selectedClient, payment: e.target.value })}
                                                >
                                                    <option value="">Выберите оплату</option>
                                                    {paymentArray.map((buyer) => (
                                                        <option key={buyer} value={buyer}>
                                                            {buyer}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='input_td'>
                                                <div className='input_name'>Дата созвона:</div>
                                                <DatePicker
                                                    selected={selectedClient.selectedDate ? new Date(selectedClient.selectedDate) : null}
                                                    onChange={(date) => setSelectedClient({ ...selectedClient, selectedDate: date })}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeInputLabel="Enter Time"
                                                    timeIntervals={5}
                                                    dateFormat="MMMM d, yyyy HH:mm"
                                                    shouldCloseOnSelect={false}
                                                    minDate={new Date()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div>

                                <div>

                                </div>

                            </div>
                            <div className="btn_form_block">
                                <button className='register' style={{ width: "120px", backgroundColor: "purple" }} type="button" onClick={() => handleDeleteClient(selectedClient._id)}>
                                    Удалить лид
                                </button>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                    Сохранить
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditForm