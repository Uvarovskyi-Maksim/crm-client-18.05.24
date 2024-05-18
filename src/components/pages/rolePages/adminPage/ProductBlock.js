import React from 'react';
import EditFormProduct from '../../../forms/EditFormProduct';

const ProductBlock = ({
  registrationDataProduct,
  handleRegistrationProductChange,
  handleRegistrationProduct,
  dataProducts,
  handleProductClick,
  handleDeleteProduct,
  editProductMode,
  setSelectedProduct,

  selectedProduct,
  setEditMode,
  fetchData,
  close,
}) => (
    <div style={{ marginLeft: "1.5%" }}>
    <h1>Продукты</h1>
    <form>
      <table className="reg_table computer">
        <tbody>

          <tr>
            <td className="input_td"><div>Название:</div><input type="text" name="name" value={registrationDataProduct.name} onChange={handleRegistrationProductChange} required /></td>
            <td className="input_td"><div>Цена:</div><input type="number" name="cost" value={registrationDataProduct.cost} onChange={handleRegistrationProductChange} required /></td>
            <td className="input_td"><div>Количество:</div><input type="number" name="count" value={registrationDataProduct.count} onChange={handleRegistrationProductChange} required /></td>
          </tr>
        </tbody>
        <button className="register btn_buyer" type="button" onClick={handleRegistrationProduct}>Добавить</button>

      </table>

      <table className="reg_table mobile">
        <tbody>

          <tr>
            <td className="input_td"><div>Название:</div><input type="text" name="name" value={registrationDataProduct.name} onChange={handleRegistrationProductChange} required /></td>

          </tr>
          <tr>
            <td className="input_td"><div>Цена:</div><input type="number" name="cost" value={registrationDataProduct.cost} onChange={handleRegistrationProductChange} required /></td>
          </tr>
          <tr>
            <td className="input_td"><div>Количество:</div><input type="number" name="count" value={registrationDataProduct.count} onChange={handleRegistrationProductChange} required /></td>

          </tr>
        </tbody>
        <button className="register btn_buyer" type="button" onClick={handleRegistrationProduct}>Добавить</button>

      </table>

    </form>


    <div className="table_block">
      <table className="table_list" border="1" style={{ cursor: "pointer" }}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Стоимость</th>
            <th>Количество</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataProducts.map((option) => (
            <tr key={option._id} >
              <td>{option.name}</td>
              <td>{option.cost}</td>
              <td>{option.count}</td>
              <td className="manager_el_btns">
                <div className="register edit_buyer_btn" onClick={() => handleProductClick(option._id)}>Редактировать</div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <EditFormProduct setEditMode={setEditMode} fetchData={fetchData} handleDeleteClient={handleDeleteProduct} editClientMode={editProductMode} setSelectedClient={setSelectedProduct} selectedClient={selectedProduct} close={close} />

  </div>
);

export default ProductBlock;
