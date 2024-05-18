import '../pages/rolePages/adminPage/adminPageStyle.css'
import React, { useState, useEffect, useRef } from "react";

const EditProduct = ({
    dataProducts,
    editClientMode,
    setSelectedClient,
    selectedClient,
    handleEditClient,
    close,
    checkedProducts,
    setCheckedProducts,
    setEditClienViewtMode,
    setEditClientModeProduct
}) => {

    useEffect(() => {
        setSelectedClient(prevSelectedClient => ({ ...prevSelectedClient, product: checkedProducts }));
        console.log(checkedProducts)
    }, [checkedProducts]);

    const handleCheckboxChange = (productId, productName, productCost, productCount) => {
        const productIndex = checkedProducts.findIndex(item => item._id === productId && item.name === productName && item.cost === productCost && item.count === productCount);

        if (productIndex !== -1) {
            setCheckedProducts(prevCheckedProducts => prevCheckedProducts.filter((item, index) => index !== productIndex));
        } else {
            setCheckedProducts(prevCheckedProducts => [...prevCheckedProducts, { _id: productId, name: productName, cost: productCost, count: productCount }]);
        }
    };

    const isChecked = (productId, productName, productCost, productCount) => {
        console.log(checkedProducts.some(item => item._id === productId && item.name === productName && item.cost === productCost && item.count === productCount))
        return checkedProducts.some(item => item._id === productId && item.name === productName && item.cost === productCost && item.count === productCount);
    };

    return (
        <div>
            {editClientMode && selectedClient && (
                <>
                    <div className={`overlay ${editClientMode && selectedClient ? "active" : ""}`} onClick={close}></div>
                    <div style={{ display: "block" }} className={`user_modal ${editClientMode && selectedClient ? "show" : ""}`}>
                        <div className="close" onClick={close}>
                            &times;
                        </div>

                        <form>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    {dataProducts.map((option) => (
                                        <tr key={option._id}>
                                            <td>{option.name}</td>
                                            <td>{option.cost}</td>
                                            <td>{option.count}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={isChecked(option._id, option.name, option.cost, option.count)}
                                                    onChange={() => handleCheckboxChange(option._id, option.name, option.cost, option.count)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='btn_form_block'>
                                <button className='register' style={{ width: "120px" }} type="button" onClick={() => {
                                    handleEditClient(selectedClient._id, checkedProducts);
                                    setEditClienViewtMode(true);
                                    setEditClientModeProduct(false)
                                }}
                                >
                                    Добавить
                                </button>
                            </div>
                        </form>
                    </div></>

            )}

        </div>

    )
}

export default EditProduct;