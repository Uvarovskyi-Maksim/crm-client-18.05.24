const logout = async () => {
    fetch('/logout', {
        method: 'POST',
    })
        .then(response => {
            if (response.ok) {
                // Redirect to the home page or login page after successful logout
                window.location.href = '/'; // Change the URL if needed
            } else {
                // Handle error, display a message, or redirect to an error page
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
}

const handleEditClient = async (selectedClient, setEditMode, fetchData, setEditClientModeProduct, handleEditData) => {

    const requestData = {
      _id: selectedClient._id,
      email: selectedClient.email,
      phone: selectedClient.phone,
      managerID: selectedClient.managerID,
      status: selectedClient.status,
      product: selectedClient.product,
      clientName: selectedClient.clientName,
      payment: selectedClient.payment,
      notice: selectedClient.notice,
      selectedDate: selectedClient.selectedDate,
      secondPhone: selectedClient.secondPhone
    };

    await handleEditData('/api/updateClientData', requestData, setEditMode, fetchData, setEditClientModeProduct);
  };

 const fetchDataReload = async (status, getDataNew, setMyDataLeed, setDataLoaded) => {
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

export { logout, handleEditClient, fetchDataReload};