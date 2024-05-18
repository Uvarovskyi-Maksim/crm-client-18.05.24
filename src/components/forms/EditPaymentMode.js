import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

import DatePicker from 'react-datepicker';


import 'react-datepicker/dist/react-datepicker.css';

const EditPaymentMode = ({
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    paymentArray,
    paymentIndex,
    close
}) => {


    const handlePaymentStatusChange = (newStatus) => {
        const updatedPayment = { ...selectedClient.payment[paymentIndex], paymentStatus: newStatus };
        const updatedPayments = [...selectedClient.payment];
        updatedPayments[paymentIndex] = updatedPayment;
        setSelectedClient({
            ...selectedClient,
            payment: updatedPayments
        });
    };

    const handlePaymentMethodChange = (newMethod) => {
        const updatedPayment = { ...selectedClient.payment[paymentIndex], paymentMethod: newMethod };
        const updatedPayments = [...selectedClient.payment];
        updatedPayments[paymentIndex] = updatedPayment;
        setSelectedClient({
            ...selectedClient,
            payment: updatedPayments
        });
    };

    const handleDateChange = (newDate) => {
        if (newDate instanceof Date) {
            console.log("newDate is a Date object:", newDate);
            const updatedPayment = { ...selectedClient.payment[paymentIndex], selectedDate: newDate };
            const updatedPayments = [...selectedClient.payment];
            updatedPayments[paymentIndex] = updatedPayment;
            setSelectedClient({
                ...selectedClient,
                payment: updatedPayments
            });
        } else {
            console.error("newDate is not a Date object:", newDate);
        }
    };


    return (
        <div>
            {editClientMode && selectedClient && (
                <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
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
                                            value={selectedClient.payment[paymentIndex].paymentMethod}
                                            onChange={(e) => handlePaymentMethodChange(e.target.value)}
                                        >
                                            <option value="">Выберите метод оплаты</option>
                                            {paymentArray.map((method) => (
                                                <option key={method} value={method}>
                                                    {method}
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
                                                className={`status_btn ${selectedClient.payment[paymentIndex].paymentStatus === "Оплачено" ? "selected" : ""}`}
                                                onClick={() => handlePaymentStatusChange("Оплачено")}
                                            >
                                                Оплачено
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className={`status_btn ${selectedClient.payment[paymentIndex].paymentStatus === "Не оплачено" ? "selected" : ""}`}
                                                onClick={() => handlePaymentStatusChange("Не оплачено")}
                                            >
                                                Не оплачено
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="input_td">
                                        <div className='input_name'>Сумма</div>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={selectedClient.payment[paymentIndex].cost}
                                            onChange={(e) => {
                                                const newCost = e.target.value;
                                                console.log("Изменяемое значение cost:", newCost);
                                                const updatedPayment = [...selectedClient.payment];
                                                updatedPayment[paymentIndex] = { ...updatedPayment[paymentIndex], cost: newCost };
                                                setSelectedClient({
                                                    ...selectedClient,
                                                    payment: updatedPayment
                                                });
                                            }}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="input_td">
                                        <div className='input_name'>Заметка</div>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={selectedClient.payment[paymentIndex].notice}
                                            onChange={(e) => {
                                                const notice = e.target.value;
                                                console.log("Изменяемое значение notice:", notice);
                                                const updatedPayment = [...selectedClient.payment];
                                                updatedPayment[paymentIndex] = { ...updatedPayment[paymentIndex], notice: notice };
                                                setSelectedClient({
                                                    ...selectedClient,
                                                    payment: updatedPayment
                                                });
                                            }}
                                            required
                                        />
                                    </td>
                                </tr>


                                <tr>
                                    <td>
                                        <div className='input_name'>Дата оплаты</div><br />
                                        <DatePicker
                                            selected={new Date(selectedClient.payment[paymentIndex].selectedDate)}
                                            onChange={date => handleDateChange(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeInputLabel="Enter Time"
                                            timeIntervals={5}
                                            dateFormat="MMMM d, yyyy HH:mm"
                                            shouldCloseOnSelect={false}
                                            minDate={new Date()}
                                        />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='btn_form_block'>
                            <button className='register' style={{ width: "120px" }} type="button" onClick={() => handleEditClient(selectedClient._id)}>
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditPaymentMode 