// searchFunctions.js

  
  // const handleSearch = (event, data, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability, setNotFind) => {
  //   // clearing(setNotMyClient, setMyClient, setAvailability, numberPhone);
  
  //   event.preventDefault();
  //   const filterData = data.filter((person) => numberPhone === person.phone && person.managerKey === adminKey || numberPhone === person.secondPhone && person.managerKey === adminKey || numberPhone === person.clientName && person.managerKey === adminKey);
  //   setMyClient(filterData);
  //   const notMyClient = data.filter((person) => numberPhone === person.phone && person.managerKey !== adminKey || numberPhone === person.secondPhone && person.managerKey !== adminKey || numberPhone === person.clientName && person.managerKey !== adminKey)
  //   setNotMyClient(notMyClient);
  //   if(filterData.length == 0 && notMyClient.length == 0){
  //     setNotFind(true)
  //   }
   
  // };

  const handleSearch = async (event, numberPhone, adminKey, setMyClient, setNotMyClient, setNotFind) => {
    event.preventDefault();
    
    try {
        const response = await fetch('/api/searchClients', {
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
            const myClients = searchData.filter(person => person.managerKey === adminKey);
            setMyClient(myClients);

            const notMyClients = searchData.filter(person => person.managerKey !== adminKey);
            setNotMyClient(notMyClients);
        } else {
            setNotFind(true);
        }
    } catch (error) {
        console.error(`Произошла ошибка при выполнении поиска: ${error}`);
        // Дополнительная обработка ошибки, например, вывод сообщения пользователю
    }
};

  
  export default handleSearch;
  