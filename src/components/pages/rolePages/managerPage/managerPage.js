import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
//commit
import ClientRegistrationForm from "../../../forms/ClientRegistrationForm";
import EditFormBuyer from "../../../forms/EditFormBuyer";
import ProductBlock from "../adminPage/ProductBlock";
import DeletedClientsList from "../adminPage/DeletedClientsListBlock";
import EditFormProduct from "../../../forms/EditFormProduct";
import EditFormTask from "../../../forms/EditFormTask";
import BuyersBlock from "../adminPage/BuyerBlock";
import ClientsBlock from "../adminPage/ClientsBlock";
import handleClientClicks from "../../../common/Click";
import { fetchDeleteLeed, fetchDeleteNotice, fetchDataById, formatDateTimeTomorrow, formatDateTimeYet, fetchDataByIdNotice, handleEditData, registerTask, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../../../common/EditData";
import "react-datepicker/dist/react-datepicker.css";
import { logout, handleEditClient } from "../../../common/methods";
import Overlay from "../adminPage/Overlay";
import View from "../adminPage/View";
import Spinner from "../../../../services/Spinner";
import AnalyticsImg from "../../../../img/analytics.png"
import AddUserImg from "../../../../img/addUser.png"
import BuyerImg from "../../../../img/buyer.png"
import LeedImg from "../../../../img/leed.png"
import ClockImg from '../../../../img/clock.png'
import ClientImg from '../../../../img/client.png'
import ManagerImg from '../../../../img/manager.png'
import EditImg from '../../../../img/edit.png'
import SortImg from "../../../../img/sort.png"
import HideImg from '../../../../img/hide.png'
import BucketImg from '../../../../img/bucket.png'
import ProductListImg from "../../../../img/productList.png"
import LeaveImg from "../../../../img/leave.png"
import { TaskFormRegister, LeedInfoClose } from "../../../forms/editForm";
import '../adminPage/adminPageStyle.css'
import { getAllData, getDataSuccesful, getDataWholesale, getDataNds, getDataReturn, getDataInProcessing, getDataInCancel, getDataNew, getDataAgreed, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks } from "../../../../services/gettingData";
const currentDate = new Date()
const currentDate2 = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
console.log(currentDate2)
const formattedDateTime = formatDateTime(currentDate);
const storedAdminKey = localStorage.getItem('managerID');
const storedManagerKey = localStorage.getItem('managerKey');
const storedUserName = localStorage.getItem('userName')
const storedUser = localStorage.getItem('user')

const storedUserRole = localStorage.getItem('userRole')
const ManagerPage = () => {

  const formatDateTomorrow = formatDateTimeTomorrow(currentDate)
  const formatDateYet = formatDateTimeYet(currentDate)
  const overlays = [
    'editBuyerMode',
    'editProductMode',
    'taskMode',
    'editMode',
  ];
  const [dataLoaded, setDataLoaded] = useState(false);

  const [registrationDataClient, setRegistrationDataClient] = useState({
    _id: '',
    email: '',
    phone: '',
    secondPhone: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
    status: 'new',
    product: [],
    payment: [],
    notice: '',
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
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
  });
  const [registrationDataTask, setRegistrationDataTask] = useState({
    startDate: '',
    endDate: '',
    createdDate: `${formattedDateTime}`,
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
    taskLine: '',
    taskStatus: 'false'
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
  const [adminKey, setAdminKey] = useState(null);
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState(false);
  const [notFind, setNotFind] = useState(false)
  const [hideLeftMenu, setHideLeftMenu] = useState(false)


  const [data, setData] = useState(null);
  const [myDataLeed, setMyDataLeed] = useState(null)

  const [allData, setAllData] = useState(null)
  const [allUsers, setAllUsers] = useState(null)

  const [closeClients, setCloseClients] = useState(null)
  const [filterBlock, setFilterBlock] = useState(false)
  const [sortActivated, setSortActivated] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const [notMyClient, setNotMyClient] = useState([]);
  const [myClient, setMyClient] = useState([]);
  const [numberPhone, setNumber] = useState("");
  const [availability, setAvailability] = useState();
  const [showClients, setShowClients] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [startBlock, setStartBlock] = useState(true)
  const [leedNotice, setLeedNotice] = useState([])
  const [editClienViewtModeClose, setEditClienViewtModeClose] = useState(false)

  const [userName, setUserName] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [user, setUser] = useState(null)

  const [ManagerStatusOptions, setManagerStatusOptions] = useState([])
  const [managerIDOptions, setManagerIDOptions] = useState([]);
  const [paymentArray, setPaymentArray] = useState([])

  const [dataManagers, setDataManagers] = useState(null)
  const [dataBuyers, setDataBuyers] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataNotices, setDataNotices] = useState(null)
  const [dataTasks, setDataTasks] = useState(null)
  const [taskMode, setTaskMode] = useState(false)

  const [editClientModeMobile, setEditClientModeMobile] = useState(false)
  const [editClientModeEmail, setEditClientModeEmail] = useState(false)
  const [editClientModeName, setEditClientModeName] = useState(false)
  const [editClientModeDate, setEditClientModeDate] = useState(false)
  const [editClientModeStatus, setEditClientModeStatus] = useState(false)
  const [editClientModeManager, setEditClientModeManager] = useState(false)
  const [editClientModeProduct, setEditClientModeProduct] = useState(false)

  const [dataManagersID, setDataManagersID] = useState([])
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [taskToday, setTaskToday] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editClientMode, setEditClientMode] = useState(false);
  const [editClientViewMode, setEditClienViewtMode] = useState(false);
  const [addLeedMode, setAddLeedMode] = useState(false)
  const [showDeletedBlock, setShowDeletedBlock] = useState(false)

  const [editBuyerMode, setEditBuyerMode] = useState(false);
  const [editProductMode, setEditProductMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [editNoticeMode, setEditNoticeMode] = useState(false);

  const [hasUncompletedTaskToday, setHasUncompletedTaskToday] = useState(false);
  const [hasUncompletedTaskTodayLoad, setHasUncompletedTaskTodayLoad] = useState(false);

  const [registerUserBlock, setRegisterUserBlock] = useState(false)
  const [managersList, setManagersList] = useState(false)
  const [showBuyerBlock, setShowBuyerBlock] = useState(false)
  const [showProductBlock, setShowProductBlock] = useState(false)
  const [showAnalyticBlock, setShowAnalyticBlock] = useState(false)

  const [loadedItems, setLoadedItems] = useState(10000);
  const [loadedItemsAgreed, setLoadedItemsAgreed] = useState(10000);
  const [loadedItemsInProcessing, setLoadedItemsInProcessing] = useState(10000);
  const [loadedItemsCancel, setLoadedItemsCancel] = useState(10000);
  const [loadedItemsSuccesful, setLoadedItemsSuccesful] = useState(10000);
  const [loadedItemsReturn, setLoadedItemsReturn] = useState(10000);
  const [loadedItemsNds, setLoadedItemsNds] = useState(10000);
  const [loadedItemsWholesale, setLoadedItemsWholesale] = useState(10000);



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


  const [editClientModePayment, setEditClientModePayment] = useState(false)
  const [editClientModePaymentCost, setEditClientModePaymentCost] = useState(false)
  const [editClientModeNotice, setEditClientModeNotice] = useState(false)
  const [editClientModeSecondPhone, setEditClientModeSecondPhone] = useState(false)

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setStartDateFilter(currentDate);
    setEndDateFilter(currentDate);
  }, []);

  useEffect(() => {
    const uncompletedTaskToday = dataTasks && dataTasks.some(
      (task) => task.taskStatus === 'false' && task.startDate && new Date(task.startDate).toISOString().split('T')[0] === startDateFilter
    );

    setHasUncompletedTaskToday(uncompletedTaskToday);
  }, [dataTasks, startDateFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/usersByAdminKey?adminKey=${storedManagerKey}`);

        if (response.ok) {
          const data = await response.json();
          //// console.log(adminKey);
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
          //// console.log('NO');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);


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
    setEndDateFilter(currenttoDate);
  }, []);


  useEffect(() => {
    //// console.log(data);
  }, [data]);

  useEffect(() => {
    setAdminKey(storedAdminKey);

  })

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
  const showForm = () => {
    setFormState(true);
  };

  const hideForm = () => {
    setFormState(false);
  };

  const showData = () => {
    setShowClients(true);
  };

  const hideData = () => {
    setShowClients(false);
  };
  const showBlock = (blockName) => {
    setActiveMenuItem(blockName);
    setShowClients(blockName === 'Лиды');
    setRegisterUserBlock(blockName === 'Добавить пользователя');
    setManagersList(blockName === 'Список менеджеров');
    setShowBuyerBlock(blockName === 'Покупатели');
    setShowProductBlock(blockName === 'Продукты');
    setShowAnalyticBlock(blockName === 'Задачи');
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
          const respose = responseData.filter(data => data.managerID == storedAdminKey)
          console.log(respose)
          const existingData = Array.isArray(prevData) ? prevData : [];
          const uniqueData = respose.filter((newItem) => !existingData.some((item) => item._id === newItem._id));

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
            console.log(formattedDateTime);

            return formattedDateYet < taskDate && taskDate < formattedDate;
          });




          setTaskToday(taskToday)

          setHasUncompletedTaskTodayLoad(uncompletedTaskToday);

          return combinedData;
        });
        const responseData = [...responseData1, ...responseDataAgreed, ...responseDataInProcessing, ...responseDataCancel, ...responseDataSuccesful, ...responseReturn, ...responseDataNds, ...responseWholesale]


        setDataManagers(responseManagers);
        setDataBuyers(responseBuyers.filter(buyer => storedAdminKey === buyer.managerID));
        setDataProducts(responseProducts);
        setDataNotices(responseNotices);
        setCloseClients(responseCloseClients.filter(buyer => storedAdminKey === buyer.managerID))
        setDataTasks(responseTasks.filter(buyer => storedAdminKey === buyer.managerID))
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

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const clearing = () => {
    setNotMyClient([]);
    setMyClient([]);
    setAvailability("");
    setNumber("");
    setNotFind(false)
  };
  
  const handleSearch = async (event, numberPhone, adminKey, setMyClient, setNotMyClient, setNotFind) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/searchClientsManagers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numberPhone,
          adminKey
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении поиска в базе данных');
      }

      const searchData = await response.json();

      // Обработка результатов поиска
      if (searchData.length > 0) {
        const myClients = searchData.filter(person => person.managerID === adminKey);

        setMyClient(myClients);

        const notMyClients = searchData.filter(person => person.managerID !== adminKey);

        setNotMyClient(notMyClients);
      } else {
        setNotFind(true);
      }
    } catch (error) {
      console.error(`Произошла ошибка при выполнении поиска: ${error}`);
      // Дополнительная обработка ошибки, например, вывод сообщения пользователю
    }
  };

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
    status: 'new'
  });


  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegistrationProductChange = (e) => {
    setRegistrationDataProduct({
      ...registrationDataProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationTaskChange = (e) => {
    setRegistrationDataTask({
      ...registrationDataTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteClient = async () => {
    const id = {
      _id: selectedClient._id
    }
    await handleDeleteData('/api/deleteClient', id, fetchData);
  };

  //commit
  const handleDeleteClientFully = async (id) => {

    fetchDeleteLeed(id, '/api/getCloseClientsData', setSelectedClient, fetchData);
    console.log(id)
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
  const handleSearchWrapper = (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    if (numberPhone.trim() !== '') { // Проверяем, не пустое ли поле поиска
      clearing();
      handleSearch(event, numberPhone, adminKey, setMyClient, setNotMyClient, setNotFind); // Выполняем поиск
    }
  };
  //commit
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    handleSearchWrapper(event); // Вызываем функцию поиска
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



  const handleRegistrationNoticeChange = (e) => {
    setRegistrationDataNotice({
      ...registrationDataNotice,
      [e.target.name]: e.target.value,
    });
  };



  const handleRegistrationClient = async () => {
    await registerClient({
      ...registrationDataClient,
      _id: uuidv4(),
      dateOfCreated: `${formattedDateTime}`,
      managerID: storedAdminKey,
      managerKey: storedManagerKey,
    },
    fetchDataReload, cancelSort, handleClientDoubleClick, setRegistrationDataClient, setAddLeedMode);
  };

  const handleRegistrationBuyer = async () => {
    await registerBuyer(registrationDataBuyer, fetchData);
  };

  const handleRegistrationProduct = async () => {
    await registerProduct(registrationDataProduct, fetchData);
    setRegistrationDataProduct(prevData => ({
      ...prevData,
      name: '',
      cost: '',
      count: '',
    }));
  };

  const handleRegistrationTask = async () => {
    await registerTask(registrationDataTask, fetchData);
  };

  const handleNoticeClick = async (id) => {
    fetchDataByIdNotice(id, '/api/getNoticeData', setSelectedNotice, setEditNoticeMode, setRegistrationDataNotice);
  };

  const reset = () => {
    setRegistrationDataNotice({})
  }

  //commit2
  const handleRegistrationNotice = async () => {
    await registerNotice(registrationDataNotice, fetchData);
    setRegistrationDataNotice(prevData => ({
      ...prevData,
      content: ''
    }));
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
    console.log(checkedProducts)
  };
  const handleBuyerClick = async (id) => {
    fetchDataById(id, '/api/getBuyerData', setSelectedBuyer, setEditBuyerMode, setRegistrationDataNotice);
  };

  const handleProductClick = async (id) => {
    fetchDataById(id, '/api/getProductData', setSelectedProduct, setEditProductMode, setRegistrationDataNotice);
  };

  const handleTaskClick = async (id) => {
    fetchDataById(id, '/api/getTaskData', setSelectedTask, setEditTaskMode, setRegistrationDataNotice);

  }

  const handleDeleteClientDoubleClick = async (id) => {
    fetchDataById(id, '/api/getCloseClientsData', setSelectedClient, setEditClienViewtModeClose, setRegistrationDataNotice);

  };

  const handleEditTaskStatus = async () => {
    const requestData = {
      _id: selectedTask._id,
      taskStatus: selectedTask.taskStatus
    }
    await handleEditData('/api/updateTaskStatus', requestData, setEditTaskMode, fetchData);

  }

  const handleDateChange = (date) => {
    //// console.log("Received date:", date);

    if (typeof date === 'string') {
      // Преобразование строки в объект Date
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      const offset = new Date().getTimezoneOffset();
      const correctedDate = new Date(date.getTime());

      console.log("Corrected date:", correctedDate);

      setRegistrationDataClient((prevData) => ({
        ...prevData,
        selectedDate: correctedDate,
      }));
    } else {
      console.error("Invalid date object:", date);
      // Можно предпринять какие-то дополнительные действия в случае недопустимой даты
    }
  };

  const close = () => {
    setEditClientMode(false)
    setEditBuyerMode(false)
    setEditProductMode(false)
    setEditClienViewtMode(false)
    setAddLeedMode(false)
    setEditMode(false)
    setEditTaskMode(false)
    setTaskMode(false)
    setEditClienViewtModeClose(false)
  }
  const taskOpen = () => {
    setTaskMode(true)
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

  return (
    <div className="main">
      {dataLoaded ? (<>
        {overlays.map((mode, index) => (
          <Overlay key={index} mode={eval(mode)} close={close} />
        ))}




        <div className={`left_menu ${hideLeftMenu ? "hide" : ""}`}>
          <div className={`manager_name_block ${hideLeftMenu ? "hide" : ""}`}>
            <div className="name">
              {userName}
            </div>
            <div className="role">
              {userRole}
            </div>
            <img onClick={logout} className="logout" src={LeaveImg} alt="" />
          </div>
          <div className="menu_block">
            <div className="menu_arrow" onClick={hideMenu}><img className="menu_arrow_img" src={HideImg} alt="" /></div>
            <div className="left_menu_buttons">
              <div
                className={`menu_element ${activeMenuItem === 'Лиды' ? 'active_el' : ''} `}
                onClick={() => showBlock('Лиды')}
              >

                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={LeedImg} alt="" /> <div className={`menu_text mob ${hideLeftMenu ? "hide" : ""}`}>Лиды</div>

              </div>


              <div
                className={`menu_element ${activeMenuItem === 'Покупатели' ? 'active_el' : ''}`}
                onClick={() => showBlock('Покупатели')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={BuyerImg} alt="" /> <div className={`menu_text mob ${hideLeftMenu ? "hide" : ""}`}>Покупатели</div>
              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Продукты' ? 'active_el' : ''}`}
                onClick={() => showBlock('Продукты')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={ProductListImg} alt="" /> <div className={`menu_text mob ${hideLeftMenu ? "hide" : ""}`}>Продукты</div>
              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Задачи' ? 'active_el' : ''}`}
                onClick={() => showBlock('Задачи')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={AnalyticsImg} alt="" /> <div className={`menu_text mob ${hideLeftMenu ? "hide" : ""}`}>Задачи</div>
              </div>
              <div
                className={`menu_element ${activeMenuItem === 'Удалённые' ? 'active_el' : ''}`}
                onClick={() => showBlock('Удалённые')}
              >
                <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={AddUserImg} alt="" /> <div className={`menu_text mob ${hideLeftMenu ? "hide" : ""}`}>Удалённые</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right_content">
          {startBlock && <>
            <div className="hello">Добро Пожаловать, {user}!</div>
          </>}
          <div>
            {showBuyerBlock &&
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
            }
          </div>
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
            selectedProduct={selectedProduct}
            setEditMode={setEditMode}
            fetchData={fetchData}
            close={close}
          />
          }
          {showAnalyticBlock && <div style={{ marginLeft: "1.5%", position: "relative" }}>
            <h1>Задачи</h1>
            {/* <h1>Status Chart</h1>
            <StatusChart data={closeClients} /> */}
            <div style={{ position: "absolute", right: "20px" }} className="register" onClick={taskOpen}>Добавить задачу</div>
            <div className="tasks_block">
              <div>Период:</div>

              <div className="period_inputs">
                <input type="date" value={startDateFilter} onChange={(e) => handleStartDateChange(e.target.value)} />
                <input type="date" value={endDateFilter} onChange={(e) => handleEndDateChange(e.target.value)} />
              </div>
              <div className="table_block">
                <table>
                  <tbody>
                    <>
                      <h3>Мои Задачи</h3>
                      <tr>
                        <th>Задача</th>
                        <th>Дата начала</th>
                        <th>Дата конца</th>
                        <th>Статус</th>
                      </tr>
                      {taskMode &&
                        <TaskFormRegister close={close} editTaskMode={taskMode} registrationDataTask={registrationDataTask} handleRegistrationTaskChange={handleRegistrationTaskChange} handleRegistrationTask={handleRegistrationTask}></TaskFormRegister>

                      }
                      {sortByDate(dataTasks)
                        .filter(el => {
                          if (startDateFilter && endDateFilter) {
                            const taskDate = new Date(el.startDate);
                            return taskDate >= new Date(startDateFilter) && taskDate <= new Date(endDateFilter);
                          }
                          return true; // Показывать все задачи, если промежуток не выбран
                        })
                        .map(el => (
                          <tr key={el.id}>
                            <td style={{ cursor: "pointer" }} onClick={() => handleTaskClick(el._id)}>{el.taskLine}</td>
                            <td style={{ cursor: "pointer" }} onClick={() => handleTaskClick(el._id)}>{el.startDate}</td>
                            <td style={{ cursor: "pointer" }} onClick={() => handleTaskClick(el._id)}>{el.endDate}</td>
                            <td style={{ cursor: "pointer" }} onClick={() => handleTaskClick(el._id)}>{el.taskStatus === 'true' ? 'Выполнено' : 'Не выполнено'}</td>
                            <EditFormTask editClientMode={editTaskMode} setSelectedClient={setSelectedTask} selectedClient={selectedTask} handleEditClient={handleEditTaskStatus} close={close} />
                          </tr>
                        ))}

                    </>

                  </tbody>
                </table>
              </div>
            </div>
          </div>}

          <div>
            {showDeletedBlock && <DeletedClientsList
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
                />}
          </div>
          <form>


            <div>

              <div>
                <div>{showClients &&
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
                </div></div>


            </div>

          </form>
        </div></>) : (<Spinner></Spinner>)}

    </div>
  );
};

export default ManagerPage;
