import React from 'react';
import ClientRegistrationForm from '../../../forms/ClientRegistrationForm';
import View from './View';
import SortImg from "../../../../img/sort.png"

const ClientsBlock = ({
    numberPhone,
    addLeedMode,
    dataBuyers,
    handleRegistrationClient,
    setRegistrationDataClient,
    availability,
    notFind,
    addLeed,
    openFilter,
    handleSearchWrapper,
    clearing,
    handleInputChange,
    handleFormSubmit,
    adminKey,
    showClients,
    myClient,
    notMyClient,
    dataManagers,
    hasUncompletedTaskToday,
    formatDateTime,
    ManagerImg,
    ClockImg,
    ClientImg,
    EditImg,
    handleClientClicks,
    handleClientDoubleClick,
    handleDataProductClick,
    setEditClienViewtMode,
    setEditClientModeNotice,
    editClientModeNotice,
    closeNotice,
    setEditClientModeSecondPhone,
    editClientModeSecondPhone,
    closeSecondPhone,
    editClientModePaymentCost,
    setEditClientModePaymentCost,
    closePaymentCost,
    addPayment,
    closePayment,
    setEditClientModePayment,
    editClientModePayment,
    setProducts,
    products,
    setCheckedProducts,
    checkedProducts,
    closeProduct,
    setEditClientModeProduct,
    editClientModeProduct,
    handleDataClick,
    setEditClientModeEmail,
    setEditClientModeName,
    setEditClientModeDate,
    setEditNoticeMode,
    setEditClientModeStatus,
    setEditClientModeManager,
    editClientModeManager,
    editClientModeEmail,
    editClientModeName,
    editClientModeMobile,
    editClientModeDate,
    editClientModeStatus,
    closeEmail,
    closeMobile,
    closeName,
    closeDate,
    closeStatus,
    closeManager,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortActivated,
    setSortActivated,
    sortedData,
    setSortedData,
    cancelSort,
    setShowClients,
    setMyDataLeed,
    myDataLeed,
    handleDeleteNotice,
    closeNoticeEdit,
    leedNotice,
    editNoticeMode,
    setSelectedNotice,
    handleNoticeClick,
    handleEditNotice,
    selectedNotice,
    taskToday,
    setLoadedItemsCancel,
    setStatusFilterCancel,
    setLoadedItemsWholesale,
    setStatusFilterWholesale,
    setLoadedItemsNds,
    setStatusFilterNds,
    setStatusFilterReturn,
    setLoadedItemsReturn,
    setStatusFilterSuccesful,
    setLoadedItemsSuccesful,
    setStatusFilterAgreed,
    setLoadedItemsAgreed,
    setStatusFilterInProcessing,
    setLoadedItemsInProcessing,
    setStatusFilter,
    setLoadedItems,
    closeFilter,
    filterBlock,
    handleDateChange,
    paymentArray,
    data,
    dataNotices,
    handleRegistrationNoticeChange,
    registrationDataNotice,
    handleRegistrationNotice,
    handleDeleteClient,
    setEditClientModeMobile,
    handleClientClick,
    editClientViewMode,
    editClientMode,
    handleEditClient,
    setSelectedClient,
    selectedClient,
    keyManage,
    managerIDOptions,
    ManagerStatusOptions,
    registrationDataClient,
    handleRegistrationClientChange,
    dataProducts,
    fetchData,
    close,

}) => (
    <div>
        {showClients && (
            <div className="show_clients_block">
                <div className="clients_block">
                    <div className="fixed_search_form">
                    //commit
                        <form onSubmit={handleFormSubmit} className="search_form" action="">
                            <div className="search">
                                <div className="search_block">
                                    <input className="search_input" type="text" value={numberPhone} onChange={handleInputChange} />
                                    <button className="search_reset" type="button" onClick={clearing}>&times;</button>
                                </div>

                                <div className="head_btns">
                                    <button className="search_btn" onClick={handleSearchWrapper}>Найти</button>
                                    <div className="openFilterBtn" onClick={openFilter}><img src={SortImg} alt="" /></div>
                                </div>

                            </div>

                            <div className="add_leed" onClick={addLeed}>Добавить Лид</div>

                        </form>

                    </div>
                    <ul className="search_leed_result">
                        {myClient.map((client) => (
                            <li
                                className="statusColsElement"
                                key={client._id}
                                onClick={() => handleClientClicks(client._id, handleClientDoubleClick)}
                            >
                                <div className="managers_name_block">
                                    <img className="clock_img" src={ManagerImg} alt="" />
                                    {dataManagers.map(el => {
                                        if (el.managerID === client.managerID) {
                                            return <div>{el.nameManager}</div>
                                        }
                                    })}
                                </div>
                                <div className={`date_name_block ${hasUncompletedTaskToday.some(el => el.email === client.email) ? 'uncompleted_tasks' : ''}`}>
                                    <img className={`clock_img `} src={ClockImg} alt="" />
                                    {formatDateTime(new Date(client.selectedDate))}
                                </div>
                                <div className="client_name_block">
                                    <img className="clock_img" src={ClientImg} alt="" />
                                    {client.clientName}
                                </div>
                                <div className="date_name_block" style={{ position: "absolute", bottom: "0", right: "0", color: "rgb(170 170 170)", backgroundColor: "#fff" }}>
                                    {client.dateOfCreated}
                                </div>
                                <div style={{ width: "max-content", textAlign: "center", position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={() => handleClientClick(client._id)}>
                                    <img className="clock_img" src={EditImg} alt="" />
                                </div>
                            </li>
                        ))}
                        {notMyClient.map((person) => (

                            <table style={{ marginTop: "30px" }}>
                                <tr>
                                    <th>Email менеджера</th>
                                    <th>Имя менеджера</th>
                                    <th>Имя клиента</th>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>{dataManagers.find(el => el.managerID === person.managerID)?.email}</td>
                                    <td>{dataManagers.find(el => el.managerID === person.managerID)?.nameManager}</td>
                                    <td>{person.clientName}</td>
                                </tr>
                            </table>
                        ))}
                        {notFind && <div>Клиент не найден</div>}
                        {availability}
                    </ul>



                    <View
                        fetchData={fetchData}
                        setEditNoticeMode={setEditNoticeMode}
                        handleDataProductClick={handleDataProductClick} setEditClienViewtMode={setEditClienViewtMode} setEditClientModeMobile={setEditClientModeMobile}
                        setEditClientModeNotice={setEditClientModeNotice} editClientModeNotice={editClientModeNotice} closeNotice={closeNotice} setEditClientModeSecondPhone={setEditClientModeSecondPhone} editClientModeSecondPhone={editClientModeSecondPhone} closeSecondPhone={closeSecondPhone}
                        editClientModePaymentCost={editClientModePaymentCost} setEditClientModePaymentCost={setEditClientModePaymentCost} closePaymentCost={closePaymentCost}
                        addPayment={addPayment} closePayment={closePayment} setEditClientModePayment={setEditClientModePayment} editClientModePayment={editClientModePayment}
                        setProducts={setProducts} products={products} setCheckedProducts={setCheckedProducts} checkedProducts={checkedProducts}
                        closeProduct={closeProduct} setEditClientModeProduct={setEditClientModeProduct} editClientModeProduct={editClientModeProduct}
                        handleDataClick={handleDataClick} setEditClientModeEmail={setEditClientModeEmail} setEditClientModeName={setEditClientModeName} setEditClientModeDate={setEditClientModeDate} setEditClientModeStatus={setEditClientModeStatus} setEditClientModeManager={setEditClientModeManager} editClientModeManager={editClientModeManager} editClientModeEmail={editClientModeEmail} editClientModeName={editClientModeName} editClientModeMobile={editClientModeMobile} editClientModeDate={editClientModeDate} editClientModeStatus={editClientModeStatus} closeEmail={closeEmail} closeMobile={closeMobile} closeName={closeName} closeDate={closeDate} closeStatus={closeStatus} closeManager={closeManager}
                        startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} sortActivated={sortActivated} setSortActivated={setSortActivated} sortedData={sortedData} setSortedData={setSortedData} cancelSort={cancelSort} showClients={showClients} setShowClients={setShowClients} setMyDataLeed={setMyDataLeed} myDataLeed={myDataLeed} handleDeleteNotice={handleDeleteNotice} closeNoticeEdit={closeNoticeEdit} leedNotice={leedNotice} editNoticeMode={editNoticeMode} setSelectedNotice={setSelectedNotice} handleNoticeClick={handleNoticeClick} handleEditNotice={handleEditNotice} selectedNotice={selectedNotice} taskToday={taskToday} setLoadedItemsCancel={setLoadedItemsCancel} setStatusFilterCancel={setStatusFilterCancel} setLoadedItemsWholesale={setLoadedItemsWholesale} setStatusFilterWholesale={setStatusFilterWholesale} setLoadedItemsNds={setLoadedItemsNds} setStatusFilterNds={setStatusFilterNds} setStatusFilterReturn={setStatusFilterReturn} setLoadedItemsReturn={setLoadedItemsReturn} setStatusFilterSuccesful={setStatusFilterSuccesful} setLoadedItemsSuccesful={setLoadedItemsSuccesful} setStatusFilterAgreed={setStatusFilterAgreed} setLoadedItemsAgreed={setLoadedItemsAgreed} setStatusFilterInProcessing={setStatusFilterInProcessing} setLoadedItemsInProcessing={setLoadedItemsInProcessing} setStatusFilter={setStatusFilter} setLoadedItems={setLoadedItems} closeFilter={closeFilter} filterBlock={filterBlock} dataManagers={dataManagers} hasUncompletedTaskToday={hasUncompletedTaskToday} handleDateChange={handleDateChange} paymentArray={paymentArray} data={data} dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleDeleteClient={handleDeleteClient} handleClientDoubleClick={handleClientDoubleClick} handleClientClick={handleClientClick} editClientViewMode={editClientViewMode} editClientMode={editClientMode} handleEditClient={handleEditClient} setSelectedClient={setSelectedClient} selectedClient={selectedClient} keyManage={keyManage} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} close={close} />
                </div>
                <ClientRegistrationForm
                    setRegistrationDataClient={setRegistrationDataClient}
                    handleRegistrationClient={handleRegistrationClient}
                    paymentArray={paymentArray}
                    dataProducts={dataProducts}
                    dataBuyers={dataBuyers}
                    handleDateChange={handleDateChange}
                    handleRegistrationClientChange={handleRegistrationClientChange}
                    addLeedMode={addLeedMode}
                    adminKey={adminKey}
                    close={close}
                    registrationDataClient={registrationDataClient}
                />
            </div>
        )}
    </div>
);

export default ClientsBlock;
