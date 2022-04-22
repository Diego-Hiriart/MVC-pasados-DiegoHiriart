import { useEffect, useState } from 'react';
import useHttp from '../config/use-http'

import AppContext from './app-context';

const ContextProvider = (props) => {

  const [users, setUsers] = useState([])
  const [borrowings, setBorrowings] = useState([])

  const fetchDataUsers = (users) => {
    setUsers(users)
  }

  const fetchDataBorrowings = (data) => {
    setBorrowings(data);
  }

  const addOneUser = (newUser) => {
    setUsers(prevUsers => {
      return [
        ...prevUsers,
        newUser
      ]
    })
  }

  const addOneBorrowingToList = (data) => {
    setBorrowings(prevBorrowing => {
      return [
        ...prevBorrowing,
        data
      ]
    })
  }

  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {

    fetchData(
      { url: '/user/get', mehtod : 'GET' },
      fetchDataUsers
    )

    fetchData(
      { url: '/borrowing/get', mehtod : 'GET' },
      fetchDataBorrowings
    )

  }, [])

  const addNewUser = (newUser) => {
 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    fetchData(
      {
        url: '/user/create',
        method: 'POST',
        body: newUser,
        headers: myHeaders,
      },
      addOneUser
    )
  }

  const addNewBorrowing = (newBorrowing) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    fetchData(
      {
        url: '/borrowing/create',
        method: 'POST',
        headers: myHeaders,
        body: newBorrowing
      },
      addOneBorrowingToList
    )
  }

  const appContext = {
    users: users,
    borrowing : borrowings,
    addUser: addNewUser,
    addBorrowing : addNewBorrowing,
    isLoading : isLoading, 
    error : error
  }

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;