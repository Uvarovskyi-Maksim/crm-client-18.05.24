import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

import DatePicker from 'react-datepicker';


import 'react-datepicker/dist/react-datepicker.css';

const EditPayment = ({
    editClientMode,
    setEditClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    paymentArray,
    registrationDataClient,
    close
}) => {

    const handleEditData = async (requestData) => {
        try {
            const response = await fetch('/api/updateClientDataPayment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),

            });
            console.log(JSON.stringify(requestData))
            if (response.ok) {
                setEditClientMode(false)
                return await response.text();
            } else {
                throw new Error('Ошибка при обновлении данных');
            }
        } catch (error) {
            console.error(`Ошибка при обновлении данных: ${error}`);
            throw error;
        }
    };


    const handleDateChange = (date) => {
        if (selectedClient.payment) {
            const newDate = new Date(date); // Преобразуем значение в объект даты
            console.log("Выбрана новая дата:", newDate);
            setSelectedClient({
                ...selectedClient,
                payment: {
                    ...selectedClient.payment,
                    selectedDate: newDate
                }
            });
        }
    };

    const handlePaymentStatusChange = (status) => {
        setSelectedClient({
            ...selectedClient,
            payment: {
                ...selectedClient.payment,
                paymentStatus: status
            }
        });
    };

    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal_edit_payment ${editClientMode && selectedClient ? "show" : ""}`}>
                    <div className="close" onClick={close}>
                        &times;
                    </div>

                    <form>
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='input_name'>Оплата:</div>
                                        <select
                                            name="payment"
                                            value={selectedClient.payment.paymentMethod} // Установка значения из объекта payment
                                            onChange={(e) => setSelectedClient({
                                                ...selectedClient,
                                                payment: { ...selectedClient.payment, paymentMethod: e.target.value }// Обновление paymentMethod
                                            })}
                                        >
                                            <option value="">Выберите оплату</option>
                                            {paymentArray.map((buyer) => (
                                                <option key={buyer} value={buyer}>
                                                    {buyer}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='input_name'>Статус оплаты:</div>
                                        <div>
                                            <div
                                                className={`status_btn ${selectedClient.payment.paymentStatus === "Оплачено" ? "selected" : ""}`}
                                                onClick={() => handlePaymentStatusChange("Оплачено")}
                                            >
                                                Оплачено
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className={`status_btn ${selectedClient.payment.paymentStatus === "Не оплачено" ? "selected" : ""}`}
                                                onClick={() => handlePaymentStatusChange("Не оплачено")}
                                            >
                                                Не оплачено
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <div className='input_name'>Сумма:</div>
                                        <input type="number"
                                            value={selectedClient.payment.cost}
                                            onChange={(e) => setSelectedClient({
                                                ...selectedClient,
                                                payment: { ...selectedClient.payment, cost: e.target.value }
                                            })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='input_name'>Заметка:</div>
                                        <input type="textarea"
                                            value={selectedClient.payment.notice}
                                            onChange={(e) => setSelectedClient({
                                                ...selectedClient,
                                                payment: { ...selectedClient.payment, notice: e.target.value }
                                            })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='input_name'>Дата оплаты:</div>
                                        <DatePicker
                                            selected={selectedClient.payment.selectedDate}
                                            onChange={handleDateChange}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeInputLabel="Enter Time"
                                            timeIntervals={5}
                                            dateFormat="MMMM d, yyyy HH:mm"
                                            shouldCloseOnSelect={false}
                                            placeholderText='Выберите дату'
                                            minDate={new Date()}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditData(selectedClient)}>
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditPayment