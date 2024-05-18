import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../common/EditData";
import BucketImg from '../../img/bucket.png'
import EditImg from '../../img/edit.png'

import DatePicker from 'react-datepicker';


import 'react-datepicker/dist/react-datepicker.css';

const ClientRegistrationForm = ({
    addLeedMode,
    adminKey,
    close,
    registrationDataClient,
    handleRegistrationClientChange,
    handleDateChange,
    dataBuyers,
    dataProducts,
    paymentArray,
    handleRegistrationClient,
    setRegistrationDataClient
}) => {
    const [secondPhone, setSecondPhone] = useState(false)

    const openSecondPhoneBlock = () => {
        setSecondPhone(true)
    }

    const closeSecondPhoneBlock = () => {
        setSecondPhone(false)
    }
    //commit
    const handleFormKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const isContactExists = await checkContactExists(registrationDataClient.phone);

            if (isContactExists) {
                console.log('Этот номер уже есть в базе данных у другого менеджера')
                alert('Этот номер уже есть в базе данных у другого менеджера');
            } else {
                console.log('not number')
                handleRegistrationClient();
            }
        }
    };
    //commit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const isContactExists = await checkContactExists(registrationDataClient.phone);
        console.log(isContactExists)
        if (isContactExists) {
            alert(`Этот номер уже есть в базе данных у другого менеджера ${isContactExists}`);
        } else {
            console.log('not number')
            handleRegistrationClient();
        }
    };
    //commit
    const checkContactExists = async (numberPhone) => {
        try {
            const response = await fetch('/api/checkContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    numberPhone
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка при проверке контакта в базе данных');
            }

            const data = await response.json();
            console.log(data.contactExists, data.manager.map(manager => manager.nameManager))
            return data.contactExists, data.manager.map(manager => manager.nameManager);
        } catch (error) {
            console.error(`Произошла ошибка при проверке контакта: ${error}`);
            return false;
        }
    };
    return (
        addLeedMode && (
            <>
                <div className={`overlay ${addLeedMode ? "active" : ""}`} onClick={close}></div>
                //commit2
                <div style={{ backgroundColor: "#fff" }} className={`user_modal_reg_leed ${addLeedMode ? 'show' : ''}`}>
                    <form className='client_reg_form' onSubmit={handleFormSubmit} onKeyDown={handleFormKeyDown}>
                        <h2 className='leed_head_txt'>Создание лида</h2>
                        <div className="close" onClick={close}>
                            &times;
                        </div>
                        {secondPhone && <div>
                            <div style={{ backgroundColor: "#fff", border: "3px solid", top: "39%", width: "20%", left: "64%" }} className={`user_modal ${addLeedMode ? 'show' : ''}`}>
                                <div className="close" onClick={closeSecondPhoneBlock}>
                                    &times;
                                </div>
                                <div className="input_td"><div className='input_name'>Второй номер</div><input type="number" name="secondPhone" value={registrationDataClient.secondPhone} onChange={handleRegistrationClientChange} required /></div>

                            </div>
                        </div>}

                        <div>
                            <h3 style={{ color: "#445486", marginBottom: "5px" }}>Контактная информация</h3>
                            <div className='client_info'>

                                <div className='client_info_left'>
                                    <div className="input_td"><div className='input_name'>Имя<span style={{ color: "red" }}>*</span></div><input type="text" name="clientName" value={registrationDataClient.clientName} onChange={handleRegistrationClientChange} required /></div>

                                    <div className="input_td"><div className='input_name'>Email</div><input type="email" name="email" value={registrationDataClient.email} onChange={handleRegistrationClientChange} required /></div>

                                </div>
                                <div className='client_info_right'>
                                    <div className="input_td"><div style={{ position: "relative" }} className='input_name'>Номер телефона<span style={{ color: "red" }}>*</span>
                                    {/* <div className='open_second_number' onClick={openSecondPhoneBlock}>+</div> */}
                                    </div><input type="number" name="phone" value={registrationDataClient.phone} onChange={handleRegistrationClientChange} required /></div>
                                    <div className="input_td">
                                        <div className='input_name'>Покупатель:</div>
                                        <select
                                            name="buyerID"
                                            value={registrationDataClient.buyerID}
                                            onChange={(e) => {
                                                const selectedBuyer = dataBuyers.find((buyer) => buyer.email === e.target.value);
                                                handleRegistrationClientChange(e);
                                                setRegistrationDataClient((prevData) => ({
                                                    ...prevData,
                                                    clientName: selectedBuyer.name,
                                                    email: selectedBuyer.email,
                                                    phone: selectedBuyer.phone,
                                                }));
                                            }}
                                        >
                                            <option value="">Выберите покупателя из базы</option>
                                            {dataBuyers.map((buyer) => (
                                                <option key={buyer._id} value={buyer.email}>
                                                    {buyer.email}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div>
                            <h3 style={{ color: "#445486", marginBottom: "5px" }}>Дополнительная информация</h3>
                            <div className='client_info'>
                                <div className='client_info_left'>
                                    <div className="input_td">
                                        <div className='input_name'>Дата созвона:</div>
                                        <DatePicker
                                            className='input_date'
                                            selected={registrationDataClient.selectedDate}
                                            onChange={handleDateChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={5}
                                            dateFormat="MMMM d, yyyy HH:mm"
                                            placeholderText='Выберите дату'
                                            minDate={new Date()}
                                        />
                                    </div>

                                </div>
                                <div className='client_info_right'>
                                    <div className="input_td">

                                        <div className='input_name'>Статус:</div>
                                        <select name="status" value={registrationDataClient.status} onChange={handleRegistrationClientChange}>
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
                            </div>



                            <div style={{ display: "none" }} className="input_td">
                                <div>Role:</div>
                                <select name="role" value={registrationDataClient.role} onChange={handleRegistrationClientChange}>
                                    <option value=""></option>
                                    <option value="client">Client</option>
                                </select>
                            </div>

                        </div>


                        //commit <div className='register' onClick={handleFormSubmit}>
                            Добавить
                        </div>


                    </form>

                </div>
            </>
        )
    );
};

export default ClientRegistrationForm