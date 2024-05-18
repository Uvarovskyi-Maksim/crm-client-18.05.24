import { useState, useEffect } from "react";
//commit
import BuyersBlock from "./BuyerBlock";
import ProductBlock from "./ProductBlock";
import ClientsBlock from "./ClientsBlock";
import DeletedClientsList from "./DeletedClientsListBlock";
import EditManagerForm from "../../../forms/EditManagerForm";
import { fetchDeleteLeed, fetchDeleteNotice, fetchDataById, fetchDataByIdNotice, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, formatDateTimeTomorrow, formatDateTimeYet, handleDeleteData, registerNotice, registerTask, fetchDataByIdTask } from "../../../common/EditData";
import LeftMenu from "../../../common/LeftMenu";
import handleClientClicks from '../../../common/Click'
import "react-datepicker/dist/react-datepicker.css";
import { logout, handleEditClient } from "../../../common/methods";
import handleSearch from '../../../common/Search'
import Overlay from "./Overlay";
import Spinner from "../../../../services/Spinner";
import AnalyticsImg from "../../../../img/analytics.png"
import AddUserImg from "../../../../img/addUser.png"
import BuyerImg from "../../../../img/buyer.png"
import LeedImg from "../../../../img/leed.png"
import ListImg from "../../../../img/list.png"
import ProductListImg from "../../../../img/productList.png"
import LeaveImg from "../../../../img/leave.png"
import ClockImg from '../../../../img/clock.png'
import ClientImg from '../../../../img/client.png'
import ManagerImg from '../../../../img/manager.png'
import EditImg from '../../../../img/edit.png'
import HideImg from '../../../../img/hide.png'
import './adminPageStyle.css'
import { getAllData, getDataSuccesful, getDataWholesale, getDataNds, getDataReturn, getDataInProcessing, getDataInCancel, getDataNew, getDataAgreed, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks } from "../../../../services/gettingData";
import StatusChart from './Diagram';
import { v4 as uuidv4 } from 'uuid';
// export const wsConnection = new WebSocket("ws://localhost:5000");
// wsConnection.onopen = function() {
//     alert("Соединение установлено.");
// };

// wsConnection.onclose = function(event) {
//     if (event.wasClean) {
//         alert('Соединение закрыто чисто');
//     } else {
//         alert('Обрыв соединения'); // например, "убит" процесс сервера
//     }
//     alert('Код: ' + event.code + ' причина: ' + event.reason);
// };

// wsConnection.onerror = function(error) {
//     alert("Ошибка " + error.message);
// };

// export const wsSend = function(data) {
// // readyState - true, если есть подключение
//     if(!wsConnection.readyState){
//         setTimeout(function (){
//             wsSend(data);
//         },100);
//     } else {
//         wsConnection.send(data);
//     }
// };

const AdminPage = () => {

  const overlays = [

  ];
  const storedAdminKey = localStorage.getItem('adminKey');
  const storedUserName = localStorage.getItem('userName')
  const storedUserRole = localStorage.getItem('userRole')
  const storedUser = localStorage.getItem('user')
  const storedManagerKey = localStorage.getItem('managerKey');
  const currentDate = new Date();
  const formattedDateTime = formatDateTime(currentDate);
  const formatDateTomorrow = formatDateTimeTomorrow(currentDate)
  const formatDateYet = formatDateTimeYet(currentDate)

  const [loadedItems, setLoadedItems] = useState(100000);
  const [loadedItemsAgreed, setLoadedItemsAgreed] = useState(100000);
  const [loadedItemsInProcessing, setLoadedItemsInProcessing] = useState(100000);
  const [loadedItemsCancel, setLoadedItemsCancel] = useState(100000);
  const [loadedItemsSuccesful, setLoadedItemsSuccesful] = useState(100000);
  const [loadedItemsReturn, setLoadedItemsReturn] = useState(100000);
  const [loadedItemsNds, setLoadedItemsNds] = useState(100000);
  const [loadedItemsWholesale, setLoadedItemsWholesale] = useState(100000);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [statusFilter, setStatusFilter] = useState('new');
  const [statusFilterAgreed, setStatusFilterAgreed] = useState('agreed');
  const [statusFilterInProcessing, setStatusFilterInProcessing] = useState('in_processing')
  const [statusFilterCancel, setStatusFilterCancel] = useState('cancel')
  const [statusFilterSuccesful, setStatusFilterSuccesful] = useState('successful')
  const [statusFilterReturn, setStatusFilterReturn] = useState('return')
  const [statusFilterNds, setStatusFilterNds] = useState('nds')
  const [statusFilterWholesale, setStatusFilterWholesale] = useState('wholesale')
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [products, setProducts] = useState([])
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [hideLeftMenu, setHideLeftMenu] = useState(false)
  const [adminKey, setAdminKey] = useState(null);
  const [userName, setUserName] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([]);
  const [ManagerStatusOptions, setManagerStatusOptions] = useState([])
  const [managerIDOptions, setManagerIDOptions] = useState([]);
  const [paymentArray, setPaymentArray] = useState([])
  const [formState, setFormState] = useState(false);
  const [filterBlock, setFilterBlock] = useState(false)
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null)
  const [user, setUser] = useState(null)
  const [dataManagers, setDataManagers] = useState(null)
  const [dataBuyers, setDataBuyers] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataNotices, setDataNotices] = useState(null)
  const [closeClients, setCloseClients] = useState(null)
  const [dataTasks, setDataTasks] = useState(null)
  const [selectTask, setSelectTask] = useState([])
  const [notFind, setNotFind] = useState(false)
  const [leedNotice, setLeedNotice] = useState([])
  const [sortActivated, setSortActivated] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notMyClient, setNotMyClient] = useState([]);
  const [myClient, setMyClient] = useState([]);
  const [numberPhone, setNumber] = useState("");
  const [availability, setAvailability] = useState();
  const [showClients, setShowClients] = useState(true);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [startDateFilterLoad, setStartDateFilterLoad] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [startBlock, setStartBlock] = useState(false)
  const [myDataLeed, setMyDataLeed] = useState([])
  const [editMode, setEditMode] = useState(false);
  const [editClientMode, setEditClientMode] = useState(false);
  const [editClientViewMode, setEditClienViewtMode] = useState(false);
  const [addLeedMode, setAddLeedMode] = useState(false)
  const [editTaskMode, setEditTaskMode] = useState(false)
  const [editBuyerMode, setEditBuyerMode] = useState(false);
  const [editProductMode, setEditProductMode] = useState(false);
  const [editNoticeMode, setEditNoticeMode] = useState(false);
  const [hasUncompletedTaskToday, setHasUncompletedTaskToday] = useState(false);
  const [taskToday, setTaskToday] = useState(false);
  const [managersList, setManagersList] = useState(false)
  const [showBuyerBlock, setShowBuyerBlock] = useState(false)
  const [showProductBlock, setShowProductBlock] = useState(false)
  const [showAnalyticBlock, setShowAnalyticBlock] = useState(false)
  const [showDeletedBlock, setShowDeletedBlock] = useState(false)
  const [editClientModeMobile, setEditClientModeMobile] = useState(false)
  const [editClientModeEmail, setEditClientModeEmail] = useState(false)
  const [editClientModeName, setEditClientModeName] = useState(false)
  const [editClientModeDate, setEditClientModeDate] = useState(false)
  const [editClientModeStatus, setEditClientModeStatus] = useState(false)
  const [editClientModeManager, setEditClientModeManager] = useState(false)
  const [editClientModeProduct, setEditClientModeProduct] = useState(false)
  const [editClientModePayment, setEditClientModePayment] = useState(false)
  const [editClientModePaymentCost, setEditClientModePaymentCost] = useState(false)
  const [editClientModeNotice, setEditClientModeNotice] = useState(false)
  const [editClientModeSecondPhone, setEditClientModeSecondPhone] = useState(false)

  const [registrationData, setRegistrationData] = useState({
    nameManager: '',
    email: '',
    password: '',
    role: 'manager',
    managerKey: storedAdminKey,

  });
  const [registrationDataClient, setRegistrationDataClient] = useState({
    _id: '',
    email: '',
    phone: '',
    secondPhone: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedAdminKey,
    status: 'new',
    product: [],
    payment: [],
    notice: '123',
    selectedDate: '',
    dateOfCreated: `${formattedDateTime}`,
    clientName: ''
  });
  const [registrationDataBuyer, setRegistrationDataBuyer] = useState({
    email: '',
    phone: '',
    name: '',
    notice: '',
    role: 'buyer',
    managerID: '',
    managerKey: storedAdminKey,
  });
  const [registrationDataProduct, setRegistrationDataProduct] = useState({
    name: '',
    cost: '',
    count: '',
  });
  const [registrationDataNotice, setRegistrationDataNotice] = useState({
    noticeID: '',
    content: '',
    noticeDate: '',
  });

  const [registrationDataTask, setRegistrationDataTask] = useState({
    startDate: '',
    endDate: '',
    createdDate: `${formattedDateTime}`,
    managerID: '',
    managerKey: storedAdminKey,
    taskLine: '',
    taskStatus: 'false'
  });

  useEffect(() => {
    setAdminKey(storedAdminKey);
    setUserName(storedUserName)
    setUserRole(storedUserRole)
    setUser(storedUser)
  }, [loadedItems, statusFilter, statusFilterAgreed, loadedItemsAgreed, statusFilterInProcessing, loadedItemsInProcessing, statusFilterCancel, loadedItemsCancel, statusFilterSuccesful, loadedItemsSuccesful, statusFilterReturn, loadedItemsReturn, statusFilterNds, loadedItemsNds, statusFilterWholesale, loadedItemsWholesale]);


  useEffect(() => {
    fetchData();
    const currenttoDate = new Date().toISOString().split('T')[0];
    setStartDateFilter(currenttoDate);
    setStartDateFilterLoad(currentDate)
    setEndDateFilter(currenttoDate);
  }, []);

  // useEffect(() => {
  //   let wsConnection = new WebSocket("ws://localhost:5000");

  //   wsConnection.onmessage = function (event) {
  //     const message = JSON.parse(event.data);
  //     if (message.type === 'client_added') {
  //       fetchData();
  //     }
  //   };
  //   // ws://localhost:5000
  //   wsConnection.onclose = function (event) {
  //     // При обнаружении закрытия соединения создаем новое подключение
  //     wsConnection = new WebSocket("ws://localhost:5000");

  //     wsConnection.onmessage = function (event) {
  //       const message = JSON.parse(event.data);
  //       if (message.type === 'client_added') {
  //         fetchData();
  //       }
  //     };

  //     wsConnection.onerror = function (error) {
  //       console.log("Ошибка " + error.message);
  //     };
  //   };

  //   return () => {
  //     wsConnection.close();
  //   };
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminKey = localStorage.getItem('adminKey');
        const response = await fetch(`/api/usersByAdminKey?adminKey=${adminKey}`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const managerIDArray = users.map((user) => user);
    setManagerIDOptions(managerIDArray);
  }, [users]);

  useEffect(() => {
    const managerStatusArray = ['new', 'in_processing', 'agreed', 'successful', 'return', 'nds', 'wholesale', 'cancel']
    const paymentArray = ['Б.н', 'Наличными', 'На карту']
    setPaymentArray(paymentArray)
    setManagerStatusOptions(managerStatusArray)
  }, [])

  const showBlock = (blockName) => {
    setActiveMenuItem(blockName);
    setShowClients(blockName === 'Лиды');
    setManagersList(blockName === 'Список менеджеров');
    setShowBuyerBlock(blockName === 'Покупатели');
    setShowProductBlock(blockName === 'Продукты');
    setShowAnalyticBlock(blockName === 'Аналитика')
    setShowDeletedBlock(blockName === 'Удалённые')
    setStartBlock(false)
  };

  const fetchData = async () => {
    try {
      const responsAllData = await getAllData()
      const responseData1 = await getDataNew(statusFilter);
      const responseDataAgreed = await getDataNew(statusFilterAgreed);
      const responseDataInProcessing = await getDataNew(statusFilterInProcessing);
      const responseDataCancel = await getDataNew(statusFilterCancel);
      const responseDataSuccesful = await getDataNew(statusFilterSuccesful);
      const responseReturn = await getDataNew(statusFilterReturn);
      const responseDataNds = await getDataNew(statusFilterNds);
      const responseWholesale = await getDataNew(statusFilterWholesale);
      const responseManagers = await getManagers();
      const responseBuyers = await getBuyers();
      const responseProducts = await getProducts();
      const responseNotices = await getNotices();
      const responseCloseClients = await getCloseClients();
      const responseTasks = await getTasks();

      if (
        Array.isArray(responseData1) &&
        responsAllData &&
        responseManagers &&
        responseBuyers &&
        responseProducts &&
        responseNotices &&
        responseCloseClients &&
        responseTasks
      ) {
        setData((prevData) => {
          const responseData = [...responseData1, ...responseDataAgreed, ...responseDataInProcessing, ...responseDataCancel, ...responseDataSuccesful, ...responseReturn, ...responseDataNds, ...responseWholesale]

          setAllData(responsAllData)

          const existingData = Array.isArray(prevData) ? prevData : [];
          const uniqueData = responseData.filter((newItem) => !existingData.some((item) => item._id === newItem._id));

          const combinedData = [...existingData, ...uniqueData];

          const uncompletedTaskToday = combinedData.filter((task) => {
            const taskDate = new Date(task.selectedDate);
            const formattedDate = new Date(formattedDateTime);
            return taskDate < formattedDate;
          });

          const taskToday = combinedData.filter((task) => {
            const taskDate = new Date(task.selectedDate);
            const formattedDateYes = new Date(formattedDateTime);

            const formattedDate = new Date(formatDateTomorrow);
            const formattedDateYet = new Date(formatDateYet);
            return formattedDateYet < taskDate && taskDate < formattedDate;
          });

          setTaskToday(taskToday)
          setHasUncompletedTaskToday(uncompletedTaskToday);
          console.log(uncompletedTaskToday)
          return combinedData;
        });
        const responseData = [...responseData1, ...responseDataAgreed, ...responseDataInProcessing, ...responseDataCancel, ...responseDataSuccesful, ...responseReturn, ...responseDataNds, ...responseWholesale]

        setDataManagers(responseManagers);
        setDataBuyers(responseBuyers);
        setDataProducts(responseProducts);
        setDataNotices(responseNotices);
        setCloseClients(responseCloseClients);
        setDataTasks(responseTasks)
        setMyDataLeed(responseData.filter((person) => storedAdminKey === person.managerKey || storedAdminKey === person.managerID))
        setDataLoaded(true);
      } else {
        console.error('Some data failed to load');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataReload = async (status) => {
    try {
      const response = await getDataNew(status);

      if (Array.isArray(response)) {
        setMyDataLeed(prevState => [...prevState, response[response.length - 1]]);
        setDataLoaded(true);
      } else {
        console.error('Some data failed to load');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDeleteClient = async () => {
    const id = {
      _id: selectedClient._id
    }
    await handleDeleteData('/api/deleteClient', id, fetchData);
  };

  const handleDeleteBuyer = async () => {
    const id = {
      _id: selectedBuyer._id
    }
    await handleDeleteData('/api/deleteBuyer', id, fetchData);
  };

  const handleDeleteProduct = async () => {

    const id = {
      _id: selectedProduct._id
    }
    await handleDeleteData('/api/deleteProduct', id, fetchData);
  };
  //commit
  const handleDeleteNotice = async (id) => {

    fetchDeleteNotice(id, '/api/getNoticeData', setSelectedNotice, fetchData);

  };
  //commit
  const handleDeleteClientFully = async (id) => {

    fetchDeleteLeed(id, '/api/getCloseClientsData', setSelectedClient, fetchData);
    console.log(id)
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value.trimStart();
    setNumber(newValue);
  };
  //commit
  const handleSearchWrapper = (event) => {
    clearing()
    if (numberPhone.trim() !== '') {
      handleSearch(event, numberPhone, adminKey, setMyClient, setNotMyClient, setNotFind);
    }

  };

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationClientChange = (e) => {
    setRegistrationDataClient({
      ...registrationDataClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationBuyerChange = (e) => {
    setRegistrationDataBuyer({
      ...registrationDataBuyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationProductChange = (e) => {
    setRegistrationDataProduct({
      ...registrationDataProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationNoticeChange = (e) => {
    setRegistrationDataNotice({
      ...registrationDataNotice,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationTaskChange = (e) => {
    setRegistrationDataTask({
      ...registrationDataTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async () => {
    await registerManager(registrationData, fetchData);
  };

  const handleRegistrationClient = async () => {
    await registerClient({
      ...registrationDataClient,
      _id: uuidv4(),
      dateOfCreated: `${formattedDateTime}`,
      managerID: storedAdminKey,
      managerKey: storedAdminKey,
    },
      fetchDataReload, cancelSort, handleClientDoubleClick, setRegistrationDataClient, setAddLeedMode);
  };

  const handleRegistrationBuyer = async () => {
    await registerBuyer(registrationDataBuyer, fetchData);
  };

  const handleRegistrationProduct = async () => {
    await registerProduct(registrationDataProduct, fetchData);
  };

  const handleRegistrationTask = async () => {
    await registerTask(registrationDataTask, fetchData);
  };

  //commit2
  const handleRegistrationNotice = async () => {
    await registerNotice(registrationDataNotice, fetchData);
    setRegistrationDataNotice(prevData => ({
      ...prevData,
      content: ''
    }));
  };

  const handleManagerClick = async (id) => {
    fetchDataById(id, '/api/getManagerData', setSelectedManager, setEditMode, setRegistrationDataNotice);
  };

  const handleViewTask = async (id) => {
    try {
      await fetchDataByIdTask(id, '/api/getManagerData', setSelectedManager, toggleTaskMode, dataTasks, setSelectTask);

    } catch (error) {
      console.error('Произошла ошибка при выполнении fetchDataById:', error);
    }
  };

  const handleDataClick = async (id, setMode) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setMode, setRegistrationDataNotice, setCheckedProducts);
  }

  const handleDataProductClick = async (id, setMode, setModeLeed) => {
    await fetchDataById(id, '/api/getClientData', setSelectedClient, setMode, setRegistrationDataNotice, setCheckedProducts);
  }

  const handleClientClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClientModeMobile, setRegistrationDataNotice, setCheckedProducts);
  };
  const handleClientDoubleClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClienViewtMode, setRegistrationDataNotice, setCheckedProducts);
  };
  const handleDeleteClientDoubleClick = async (id) => {
    fetchDataById(id, '/api/getCloseClientsData', setSelectedClient, setEditClienViewtMode, setRegistrationDataNotice);
  };
  const handleBuyerClick = async (id) => {
    fetchDataById(id, '/api/getBuyerData', setSelectedBuyer, setEditBuyerMode, setRegistrationDataNotice);
  };

  const handleProductClick = async (id) => {
    fetchDataById(id, '/api/getProductData', setSelectedProduct, setEditProductMode, setRegistrationDataNotice);
  };

  const handleNoticeClick = async (id) => {
    fetchDataByIdNotice(id, '/api/getNoticeData', setSelectedNotice, setEditNoticeMode, setRegistrationDataNotice);
  };
  const handleEditManager = async () => {
    const requestData = {
      _id: selectedManager._id,
      email: selectedManager.email,
      password: selectedManager.password,
      nameManager: selectedManager.nameManager
    };

    await handleEditData('/api/updateManagerData', requestData, setEditMode, fetchData);
  };

  const clearing = () => {
    setNotMyClient([]);
    setMyClient([]);
    setAvailability("");
    setNumber("");
    setNotFind(false)
  };
  const handleDateChange = (date) => {

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      const offset = new Date().getTimezoneOffset();
      const correctedDate = new Date(date.getTime());

      setRegistrationDataClient((prevData) => ({
        ...prevData,
        selectedDate: correctedDate,
      }));
    } else {
      console.error("Invalid date object:", date);
    }
  };
  const toggleTaskMode = () => {
    setEditTaskMode(true);
  };

  const close = () => {
    setEditClientMode(false)
    setEditBuyerMode(false)
    setEditProductMode(false)
    setEditClienViewtMode(false)
    setAddLeedMode(false)
    setEditMode(false)
    setEditTaskMode(false)
    setNotFind(false)
    setCheckedProducts([])
    setProducts([])
  }

  const addLeed = () => {
    setAddLeedMode(true)
  }


  const handleStartDateChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilter(date);
  };
  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  const openFilter = () => {
    setFilterBlock(true)
  }

  const closeFilter = () => {
    setFilterBlock(false)
  }

  const closeNoticeEdit = () => {
    setEditNoticeMode(false)
  }

  const closeMobile = () => {
    setEditClientModeMobile(false)
  }

  const closeEmail = () => {
    setEditClientModeEmail(false)
  }

  const closeName = () => {
    setEditClientModeName(false)
  }

  const closeDate = () => {
    setEditClientModeDate(false)
  }

  const closeStatus = () => {
    setEditClientModeStatus(false)
  }

  const closeManager = () => {
    setEditClientModeManager(false)
  }
  //commit2
  const closeProduct = () => {
    setEditClientModeProduct(false)
    setEditClienViewtMode(true)
  }

  const closePayment = () => {
    setEditClientModePayment(false)
  }

  const closePaymentCost = () => {
    setEditClientModePaymentCost(false)
  }

  const closeNotice = () => {
    setEditClientModeNotice(false)
  }

  const closeSecondPhone = () => {
    setEditClientModeSecondPhone(false)
  }

  const hideMenu = () => {
    setHideLeftMenu(prevState => !prevState);
  }

  const addPayment = () => {

  }

  const cancelSort = () => {
    setSortActivated(false);
    setSortedData([]);
    setStartDate(null)
    setEndDate(null)
    setActiveMenuItem(false)
  };
  //commit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSearchWrapper();
  };

  return (
    <div className="main">
      {dataLoaded ? (
        <>
          {overlays.map((mode, index) => (
            <Overlay key={index} mode={eval(mode)} close={close} />
          ))}
          <LeftMenu hideLeftMenu={hideLeftMenu} userName={userName} userRole={userRole} logout={logout} LeaveImg={LeaveImg} hideMenu={hideMenu} HideImg={HideImg} activeMenuItem={activeMenuItem} showBlock={showBlock} LeedImg={LeedImg} ListImg={ListImg} BuyerImg={BuyerImg} ProductListImg={ProductListImg} AnalyticsImg={AnalyticsImg} AddUserImg={AddUserImg} />

          <div className="right_content">
            {startBlock && <>
              <div className="hello">Добро Пожаловать, {user}!</div>
            </>}
            <div>

              <div>
                {showClients &&
                  <ClientsBlock
                    fetchData={fetchData}
                    showClients={showClients}
                    addLeedMode={addLeedMode}
                    dataBuyers={dataBuyers}
                    handleRegistrationClient={handleRegistrationClient}
                    setRegistrationDataClient={setRegistrationDataClient}
                    availability={availability}
                    notFind={notFind}
                    addLeed={addLeed}
                    openFilter={openFilter}
                    handleSearchWrapper={handleSearchWrapper}
                    clearing={clearing}
                    myClient={myClient}
                    notMyClient={notMyClient}
                    dataManagers={dataManagers}
                    hasUncompletedTaskToday={hasUncompletedTaskToday}
                    formatDateTime={formatDateTime}
                    ManagerImg={ManagerImg}
                    ClockImg={ClockImg}
                    ClientImg={ClientImg}
                    EditImg={EditImg}
                    handleClientClicks={handleClientClicks}
                    handleFormSubmit={handleFormSubmit}
                    numberPhone={numberPhone}
                    handleInputChange={handleInputChange}
                    handleDataProductClick={handleDataProductClick}
                    setEditClienViewtMode={setEditClienViewtMode}
                    setEditClientModeNotice={setEditClientModeNotice}
                    editClientModeNotice={editClientModeNotice}
                    closeNotice={closeNotice}
                    setEditClientModeSecondPhone={setEditClientModeSecondPhone}
                    editClientModeSecondPhone={editClientModeSecondPhone}
                    closeSecondPhone={closeSecondPhone}
                    editClientModePaymentCost={editClientModePaymentCost}
                    setEditClientModePaymentCost={setEditClientModePaymentCost}
                    closePaymentCost={closePaymentCost}
                    addPayment={addPayment}
                    closePayment={closePayment}
                    setEditClientModePayment={setEditClientModePayment}
                    editClientModePayment={editClientModePayment}
                    setProducts={setProducts}
                    products={products}
                    setCheckedProducts={setCheckedProducts}
                    checkedProducts={checkedProducts}
                    closeProduct={closeProduct}
                    setEditClientModeProduct={setEditClientModeProduct}
                    editClientModeProduct={editClientModeProduct}
                    handleDataClick={handleDataClick}
                    setEditMode={setEditMode}
                    setEditNoticeMode={setEditNoticeMode}
                    setEditClientModeEmail={setEditClientModeEmail}
                    setEditClientModeName={setEditClientModeName}
                    setEditClientModeDate={setEditClientModeDate}
                    setEditClientModeStatus={setEditClientModeStatus}
                    setEditClientModeManager={setEditClientModeManager}
                    setEditClientModeMobile={setEditClientModeMobile}
                    editClientModeManager={editClientModeManager}
                    editClientModeEmail={editClientModeEmail}
                    editClientModeName={editClientModeName}
                    editClientModeMobile={editClientModeMobile}
                    editClientModeDate={editClientModeDate}
                    editClientModeStatus={editClientModeStatus}
                    closeEmail={closeEmail}
                    closeMobile={closeMobile}
                    closeName={closeName}
                    closeDate={closeDate}
                    closeStatus={closeStatus}
                    closeManager={closeManager}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    sortActivated={sortActivated}
                    setSortActivated={setSortActivated}
                    sortedData={sortedData}
                    setSortedData={setSortedData}
                    cancelSort={cancelSort}
                    setShowClients={setShowClients}
                    setMyDataLeed={setMyDataLeed}
                    myDataLeed={myDataLeed}
                    handleDeleteNotice={handleDeleteNotice}
                    closeNoticeEdit={closeNoticeEdit}
                    leedNotice={leedNotice}
                    editNoticeMode={editNoticeMode}
                    setSelectedNotice={setSelectedNotice}
                    handleNoticeClick={handleNoticeClick}
                    selectedNotice={selectedNotice}
                    taskToday={taskToday}
                    setLoadedItemsCancel={setLoadedItemsCancel}
                    setStatusFilterCancel={setStatusFilterCancel}
                    setLoadedItemsWholesale={setLoadedItemsWholesale}
                    setStatusFilterWholesale={setStatusFilterWholesale}
                    setLoadedItemsNds={setLoadedItemsNds}
                    setStatusFilterNds={setStatusFilterNds}
                    setStatusFilterReturn={setStatusFilterReturn}
                    setLoadedItemsReturn={setLoadedItemsReturn}
                    setStatusFilterSuccesful={setStatusFilterSuccesful}
                    setLoadedItemsSuccesful={setLoadedItemsSuccesful}
                    setStatusFilterAgreed={setStatusFilterAgreed}
                    setLoadedItemsAgreed={setLoadedItemsAgreed}
                    setStatusFilterInProcessing={setStatusFilterInProcessing}
                    setLoadedItemsInProcessing={setLoadedItemsInProcessing}
                    setStatusFilter={setStatusFilter}
                    setLoadedItems={setLoadedItems}
                    closeFilter={closeFilter}
                    filterBlock={filterBlock}
                    handleDateChange={handleDateChange}
                    paymentArray={paymentArray}
                    data={data}
                    dataNotices={dataNotices}
                    handleRegistrationNoticeChange={handleRegistrationNoticeChange}
                    registrationDataNotice={registrationDataNotice}
                    handleRegistrationNotice={handleRegistrationNotice}
                    handleDeleteClient={handleDeleteClient}
                    handleClientDoubleClick={handleClientDoubleClick}
                    handleClientClick={handleClientClick}
                    editClientViewMode={editClientViewMode}
                    editClientMode={editClientMode}
                    handleEditClient={handleEditClient}
                    setSelectedClient={setSelectedClient}
                    selectedClient={selectedClient}
                    keyManage={adminKey}
                    managerIDOptions={managerIDOptions}
                    ManagerStatusOptions={ManagerStatusOptions}
                    registrationDataClient={registrationDataClient}
                    handleRegistrationClientChange={handleRegistrationClientChange}
                    dataProducts={dataProducts}
                    close={close}
                  />
                }
                {showAnalyticBlock && <div >
                  <h1>Status Chart</h1>
                  <StatusChart data={closeClients} />
                </div>
                }

              </div>

            </div>
            <div>
              {showDeletedBlock &&
                <DeletedClientsList
                  handleDeleteClientFully={handleDeleteClientFully}
                  showDeletedBlock={showDeletedBlock}
                  closeClients={closeClients}
                  handleClientClicks={handleClientClicks}
                  dataManagers={dataManagers}
                  formatDateTime={formatDateTime}
                  ManagerImg={ManagerImg}
                  ClockImg={ClockImg}
                  ClientImg={ClientImg}
                  EditImg={EditImg}
                  handleDeleteClient={handleDeleteClient}
                  setProducts={setProducts}
                  products={products}
                  setCheckedProducts={setCheckedProducts}
                  checkedProducts={checkedProducts}
                  closeProduct={closeProduct}
                  closeName={closeName}
                  closeDate={closeDate}
                  closeStatus={closeStatus}
                  closeManager={closeManager}
                  setEditClientModeProduct={setEditClientModeProduct}
                  setEditClientModeManager={setEditClientModeManager}
                  setEditClientModeStatus={setEditClientModeStatus}
                  setEditClientModeDate={setEditClientModeDate}
                  editClientModeProduct={editClientModeProduct}
                  editClientModeManager={editClientModeManager}
                  editClientModeStatus={editClientModeStatus}
                  editClientModeDate={editClientModeDate}
                  setEditClientModeName={setEditClientModeName}
                  editClientModeName={editClientModeName}
                  closeEmail={closeEmail}
                  setEditClientModeEmail={setEditClientModeEmail}
                  handleDataClick={handleDataClick}
                  closeMobile={closeMobile}
                  editClientModeEmail={editClientModeEmail}
                  editClientModeMobile={editClientModeMobile}
                  handleDeleteNotice={handleDeleteNotice}
                  closeNoticeEdit={closeNoticeEdit}
                  leedNotice={leedNotice}
                  editNoticeMode={editNoticeMode}
                  setSelectedNotice={setSelectedNotice}
                  handleNoticeClick={handleNoticeClick}
                  selectedNotice={selectedNotice}
                  dataNotices={dataNotices}
                  handleRegistrationNoticeChange={handleRegistrationNoticeChange}
                  registrationDataNotice={registrationDataNotice}
                  handleRegistrationNotice={handleRegistrationNotice}
                  handleClientClick={handleClientClick}
                  registrationDataClient={registrationDataClient}
                  handleRegistrationClientChange={handleRegistrationClientChange}
                  dataProducts={dataProducts}
                  storedAdminKey={storedAdminKey}
                  editClientViewMode={editClientViewMode}
                  setSelectedClient={setSelectedClient}
                  selectedClient={selectedClient}
                  handleEditClient={handleEditClient}
                  managerIDOptions={managerIDOptions}
                  ManagerStatusOptions={ManagerStatusOptions}
                  close={close}
                  handleDeleteClientDoubleClick={handleDeleteClientDoubleClick}
                  hasUncompletedTaskToday={hasUncompletedTaskToday}
                />
              }
            </div>
            <div>
              {showBuyerBlock &&
                <div>
                  <BuyersBlock
                    showBuyerBlock={showBuyerBlock}
                    registrationDataBuyer={registrationDataBuyer}
                    handleRegistrationBuyerChange={handleRegistrationBuyerChange}
                    dataManagers={dataManagers}
                    handleRegistrationBuyer={handleRegistrationBuyer}
                    dataBuyers={dataBuyers}
                    handleBuyerClick={handleBuyerClick}
                    editBuyerMode={editBuyerMode}
                    setSelectedBuyer={setSelectedBuyer}
                    ManagerStatusOptions={ManagerStatusOptions}
                    selectedBuyer={selectedBuyer}
                    handleDeleteBuyer={handleDeleteBuyer}
                    setEditMode={setEditMode}
                    fetchData={fetchData}
                    close={close}
                  />
                </div>
              }
            </div>
            {managersList && <div style={{ marginLeft: "1.5%" }}>
              {/* //commit2 */}
              <h1>Добавить менеджера</h1>

              <form enctype="multipart/form-data">
                <table className="reg_table computer">
                  <tbody>
                    <tr>
                      <td className="input_td"><div>Name:</div><input type="text" name="nameManager" value={registrationData.nameManager} onChange={handleRegistrationChange} required /></td>
                      <td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} required /></td>
                      <td className="input_td"><div>Password:</div><input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} required /></td>
                      <td className="input_td"><div>Role:</div><select name="role" value={registrationData.role} onChange={handleRegistrationChange}>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      </td>
                    </tr>
                  </tbody>
                  <button className="register btn_buyer" type="button" onClick={handleRegistration}>Добавить</button>
                </table>

                <table className="reg_table mobile">
                  <tbody>
                    <tr><td className="input_td"><div>Name:</div><input type="text" name="nameManager" value={registrationData.nameManager} onChange={handleRegistrationChange} required /></td></tr>
                    <tr><td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} required /></td></tr>
                    <tr><td className="input_td"><div>Password:</div><input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} required /></td></tr>
                    <tr><td className="input_td"><div>Role:</div><select name="role" value={registrationData.role} onChange={handleRegistrationChange}>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                    </td>
                    </tr>
                  </tbody>
                  <button className="register btn_buyer" type="button" onClick={handleRegistration}>Добавить</button>
                </table>


              </form>
              <h2>Список менеджеров</h2>

              <div className="table_block">
                {/* //commit2 */}
                <table style={{ cursor: "pointer" }}>
                  <thead>
                    <tr>
                      <th>Почта</th>
                      <th>Роль</th>
                      <th>Имя</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((option) => (
                      <tr className="manager_el" key={option._id} >
                        <td>{option.email}</td>
                        <td>{option.role}</td>
                        <td>{option.nameManager}</td>
                        <td className="manager_el_btns">
                          <div className="register edit_man_btn" onClick={() => handleManagerClick(option._id)}>Редактировать</div>
                          <div className="register list_task_btn" onClick={() => handleViewTask(option._id)}>Список задач</div>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>


              <EditManagerForm close={close} setSelectedManager={setSelectedManager} editMode={editMode} selectedManager={selectedManager} handleEditManager={handleEditManager} registrationDataTask={registrationDataTask} handleRegistrationTaskChange={handleRegistrationTaskChange} handleRegistrationTask={handleRegistrationTask} />

              <table style={{ marginTop: "40px" }}>
                <tbody>

                  {editTaskMode && <>
                    <div className={`overlay ${editTaskMode ? "active" : ""}`} onClick={close}></div>

                    <div style={{ display: "block" }} className={`user_modal ${editTaskMode ? "show" : ""}`}>
                      <div className="close" onClick={close}>
                        &times;
                      </div>

                      <h3 className="list_task_head">Список Задач</h3>
                      <h4 className="list_task_head">Менеджер: {selectedManager.nameManager}</h4>
                      <div className="period">Период:</div>
                      <div style={{ marginBottom: "50px" }} className="period_inputs period_inputs_date">
                        <input type="date" value={startDateFilter} onChange={(e) => handleStartDateChange(e.target.value)} />
                        <input type="date" value={endDateFilter} onChange={(e) => handleEndDateChange(e.target.value)} />
                      </div>
                      <table>
                        {sortByDate(selectTask)
                          .filter(el => {
                            if (startDateFilter && endDateFilter) {
                              const taskDate = new Date(el.startDate);
                              return taskDate >= new Date(startDateFilter) && taskDate <= new Date(endDateFilter);
                            }
                            return true;
                          })
                          .map(el => (
                            <tr key={el.id}>
                              <td>{el.taskLine}</td>
                              <td>{el.startDate}</td>
                              <td>{el.endDate}</td>
                              <td>{el.taskStatus === 'true' ? 'Выполнено' : 'Не выполнено'}</td>
                            </tr>
                          ))}
                      </table>

                    </div>
                  </>}

                </tbody>
              </table>
            </div>
            }
            {showProductBlock &&
              <ProductBlock
                registrationDataProduct={registrationDataProduct}
                handleRegistrationProductChange={handleRegistrationProductChange}
                handleRegistrationProduct={handleRegistrationProduct}
                dataProducts={dataProducts}
                handleProductClick={handleProductClick}
                handleDeleteProduct={handleDeleteProduct}
                editProductMode={editProductMode}
                setSelectedProduct={setSelectedProduct}
                // handleEditProduct={handleEditProduct}
                selectedProduct={selectedProduct}
                setEditMode={setEditMode}
                fetchData={fetchData}
                close={close}
              />
            }

          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default AdminPage