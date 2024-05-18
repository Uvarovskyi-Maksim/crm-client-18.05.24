import React from 'react';
import LeedInfo from '../../../forms/LeedInfo';
import BucketImg from '../../../../img/bucket.png'

const DeletedClientsList = ({
  showDeletedBlock,
  closeClients,
  handleClientClicks,
  dataManagers,
  formatDateTime,
  ManagerImg,
  ClockImg,
  ClientImg,
  EditImg,
  handleDeleteClient,
  setProducts,
  products,
  setCheckedProducts,
  checkedProducts,
  closeProduct,
  closeName,
  closeDate,
  closeStatus,
  closeManager,
  setEditClientModeProduct,
  setEditClientModeManager,
  setEditClientModeStatus,
  setEditClientModeDate,
  editClientModeProduct,
  editClientModeManager,
  editClientModeStatus,
  editClientModeDate,
  setEditClientModeName,
  editClientModeName,
  closeEmail,
  setEditClientModeEmail,
  handleDataClick,
  closeMobile,
  editClientModeEmail,
  editClientModeMobile,
  handleDeleteNotice,
  closeNoticeEdit,
  leedNotice,
  editNoticeMode,
  setSelectedNotice,
  handleNoticeClick,
  handleEditNotice,
  selectedNotice,
  dataNotices,
  handleRegistrationNoticeChange,
  registrationDataNotice,
  handleRegistrationNotice,
  handleClientClick,
  registrationDataClient,
  handleRegistrationClientChange,
  dataProducts,
  storedAdminKey,
  editClientViewMode,
  setSelectedClient,
  selectedClient,
  handleEditClient,
  managerIDOptions,
  ManagerStatusOptions,
  close,
  handleDeleteClientDoubleClick,
  hasUncompletedTaskToday,
  handleDeleteClientFully
}) => (
  <div>
    {showDeletedBlock && (
      <div style={{ marginLeft: '1.5%' }}>
        <h1>Удалённые</h1>

        {closeClients.map((client) => (
          <li
            className="statusColsElement"
            key={client._id}
            onClick={() => handleClientClicks(client._id, handleDeleteClientDoubleClick)}
          >
            <div className="managers_name_block">
              <img className="clock_img" src={ManagerImg} alt="" />
              {dataManagers.map((el) => {
                if (el.managerID === client.managerID) {
                  return <div key={el.managerID}>{el.nameManager}</div>;
                }
                return null;
              })}
            </div>
            <div
              className={`date_name_block`}
            >
              <img className="clock_img" src={ClockImg} alt="" />
              {formatDateTime(new Date(client.selectedDate))}
            </div>
            <div className="client_name_block">
              <img className="clock_img" src={ClientImg} alt="" />
              {client.clientName}
            </div>
            <div
              className="date_name_block"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                color: 'rgb(170 170 170)',
                backgroundColor: '#fff',
              }}
            >
              {client.dateOfCreated}
            </div>
            <div
              style={{
                width: 'max-content',
                textAlign: 'center',
                position: 'absolute',
                top: '0',
                right: '0',
                cursor: 'pointer',
              }}
              onClick={() => handleClientClick(client._id)}
            >
              <img className="clock_img" src={EditImg} alt="" />
            </div>
            <div style={{ width: "max-content", textAlign: "center", position: "absolute", top: "0", right: "30px", cursor: "pointer" }} onClick={() => handleDeleteClientFully(client._id)}><img className='bucketImg' src={BucketImg} alt="" /></div>
            <LeedInfo handleDeleteClient={handleDeleteClient} setProducts={setProducts} products={products} setCheckedProducts={setCheckedProducts} checkedProducts={checkedProducts} closeProduct={closeProduct} closeName={closeName} closeDate={closeDate} closeStatus={closeStatus} closeManager={closeManager} setEditClientModeProduct={setEditClientModeProduct} setEditClientModeManager={setEditClientModeManager} setEditClientModeStatus={setEditClientModeStatus} setEditClientModeDate={setEditClientModeDate} editClientModeProduct={editClientModeProduct} editClientModeManager={editClientModeManager} editClientModeStatus={editClientModeStatus} editClientModeDate={editClientModeDate} setEditClientModeName={setEditClientModeName} editClientModeName={editClientModeName} closeEmail={closeEmail} setEditClientModeEmail={setEditClientModeEmail} handleDataClick={handleDataClick} closeMobile={closeMobile} editClientModeEmail={editClientModeEmail} editClientModeMobile={editClientModeMobile} handleDeleteNotice={handleDeleteNotice} closeNoticeEdit={closeNoticeEdit} leedNotice={leedNotice} editNoticeMode={editNoticeMode} setSelectedNotice={setSelectedNotice} handleNoticeClick={handleNoticeClick} handleEditNotice={handleEditNotice} selectedNotice={selectedNotice} dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleClientClick={handleClientClick} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} adminkey={storedAdminKey} editClientViewMode={editClientViewMode} setSelectedClient={setSelectedClient} selectedClient={selectedClient} handleEditClient={handleEditClient} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} close={close} />

          </li>
        ))}
      </div>
    )}
  </div>
);

export default DeletedClientsList;
