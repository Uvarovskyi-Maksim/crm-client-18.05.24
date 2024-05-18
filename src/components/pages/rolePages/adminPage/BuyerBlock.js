import React from 'react';
import EditFormBuyer from '../../../forms/EditFormBuyer';

const BuyersBlock = ({
  showBuyerBlock,
  registrationDataBuyer,
  handleRegistrationBuyerChange,
  dataManagers,
  handleRegistrationBuyer,
  dataBuyers,
  handleBuyerClick,
  editBuyerMode,
  setSelectedBuyer,

  ManagerStatusOptions,
  handleDeleteBuyer,
  selectedBuyer,
  setEditMode,
  fetchData,
  close,
}) => {
  return (
    <div>
      {showBuyerBlock && (
        <div style={{ marginLeft: "1.5%" }}>
          <form>
            <h1>Покупатели</h1>
            <table className="reg_table computer">
              <tbody>
                <tr>
                  <td className="input_td">
                    <div>Name:</div>
                    <input
                      type="text"
                      name="name"
                      value={registrationDataBuyer.name}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                  <td className="input_td">
                    <div>Email:</div>
                    <input
                      type="email"
                      name="email"
                      value={registrationDataBuyer.email}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                  <td className="input_td">
                    <div>Phone:</div>
                    <input
                      type="phone"
                      name="phone"
                      value={registrationDataBuyer.phone}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                  <td className="input_td">
                    <div>Notice:</div>
                    <input
                      type="text"
                      name="notice"
                      value={registrationDataBuyer.notice}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                  <td className="input_td">
                    <div>Manager:</div>
                    <select
                      name="managerID"
                      value={registrationDataBuyer.managerID}
                      onChange={handleRegistrationBuyerChange}
                      required
                    >
                      {dataManagers.map((option) => (
                        <option key={option.managerID} value={option.managerID}>
                          {option.email}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <button className="register btn_buyer" type="button" onClick={handleRegistrationBuyer}>
                  Добавить
                </button>
              </tbody>
            </table>
            <table className="reg_table mobile">
              <tbody>
                <tr>
                  <td className="input_td">
                    <div>Name:</div>
                    <input
                      type="text"
                      name="name"
                      value={registrationDataBuyer.name}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="input_td">
                    <div>Email:</div>
                    <input
                      type="email"
                      name="email"
                      value={registrationDataBuyer.email}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="input_td">
                    <div>Phone:</div>
                    <input
                      type="phone"
                      name="phone"
                      value={registrationDataBuyer.phone}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="input_td">
                    <div>Notice:</div>
                    <input
                      type="text"
                      name="notice"
                      value={registrationDataBuyer.notice}
                      onChange={handleRegistrationBuyerChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="input_td">
                    <div>Manager:</div>
                    <select
                      name="managerID"
                      value={registrationDataBuyer.managerID}
                      onChange={handleRegistrationBuyerChange}
                      required
                    >
                      {dataManagers.map((option) => (
                        <option key={option.managerID} value={option.managerID}>
                          {option.email}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <button className="register btn_buyer" type="button" onClick={handleRegistrationBuyer}>
                  Добавить
                </button>
              </tbody>
            </table>
          </form>
          <div className="table_block">
            <table className="table_list" border="1" style={{ cursor: "pointer" }}>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Номер телефона</th>
                  <th>Заметка</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataBuyers.map((option) => (
                  <tr key={option._id}>
                    <td>{option.name}</td>
                    <td>{option.email}</td>
                    <td>{option.phone}</td>
                    <td>{option.notice}</td>
                    <td className="manager_el_btns">
                      <div className="register edit_buyer_btn" onClick={() => handleBuyerClick(option._id)}>
                        Редактировать
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <EditFormBuyer
            setEditMode={setEditMode}
            fetchData={fetchData}
            handleDeleteClient={handleDeleteBuyer}
            editClientMode={editBuyerMode}
            setSelectedClient={setSelectedBuyer}
            
            selectedClient={selectedBuyer}
            managerIDOptions={dataBuyers}
            ManagerStatusOptions={ManagerStatusOptions}
            close={close}
          />
        </div>
      )}
    </div>
  );
};

export default BuyersBlock;
