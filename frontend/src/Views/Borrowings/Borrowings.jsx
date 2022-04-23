import {React, useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';

function Borrowings(){
    const urlGetBorrowings = 'http://localhost:4000/borrowing/get'//Use http not https like with .NET API
    const urlGetUsers = 'http://localhost:4000/user/get'
    const [borrowings, setBorrowings] = useState(null);//Users is empty by default
    const [users, setUsers] = useState(null);//Users is empty by default
    const [newBorrowingForm, setNewBorrowingForm] = useState({
        _idUser : '',
        equipment : '',
        borrowStart : '',
        borrowEnd : '',
        returnDate : '',
        fine : '',
        status : ''
    })

    const inputStyle = {'margin':'2px'};

    //Check if the user is logged in as soon as this page is entered
    useEffect(() => {
        getAll();
        getUsers();
    }, [])  

    //Function to send GET request
    const getAll = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        };
        await fetch(urlGetBorrowings, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setBorrowings(json));
            }else{
                console.log("GET borrowings failed");
            }
        })
    }  

    const getUsers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        };
        await fetch(urlGetUsers, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setUsers(json));
            }else{
                console.log("GET borrowings failed");
            }
        })
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");//Get the name field
        const fieldValue = event.target.value;//Get the value of the field

        const newFormData = {...newBorrowingForm}//Get the current state of newBorrowing
        newFormData[fieldName] = fieldValue//Update the value of a field

        setNewBorrowingForm(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const create = async (borrowing) => {
            const urlPost = 'http://localhost:4000/borrowing/create';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(borrowing)
            };
            console.log(JSON.stringify(borrowing))
            await fetch(urlPost, requestOptions)
                .then(res => {
                    if(res.ok){
                        getAll();
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const newBorrowing = {
            _idUser : newBorrowingForm._idUser,
            equipment : newBorrowingForm.equipment,
            borrowStart : newBorrowingForm.borrowStart,
            borrowEnd : newBorrowingForm.borrowEnd,
            returnDate : newBorrowingForm.returnDate,
            fine : newBorrowingForm.fine,
            status : newBorrowingForm.status
        }

        create(newBorrowing);
    }

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    let content = 
        <div className="container">
            <div style={{display: 'flex', flexDirection:"column",  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Get Borrowings</h1>
                <p>Something went wrong</p>  
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
            </div>
        </div>
    
    if(borrowings){//If borrowings array has content
        console.log(borrowings)
        content =
            <div className="container">
                <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                    <h1>Get borrowings</h1>
                </div>
                <div style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableStyle}>
                                <th style={tableStyle}>User</th>
                                <th style={tableStyle}>User ID</th>
                                <th style={tableStyle}>Equipment</th>
                                <th style={tableStyle}>Start date</th>
                                <th style={tableStyle}>End date</th>
                                <th style={tableStyle}>Return date</th>
                                <th style={tableStyle}>Fine</th>
                                <th style={tableStyle}>Status</th>
                                <th style={tableStyle}>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowings &&
                                borrowings.map((borrowing) => (
                                    <tr key={borrowing._id} style={tableStyle}>
                                        <td style={tableStyle}>{borrowing._idUser.firstName} {borrowing._idUser.lastName}</td>
                                        <td style={tableStyle}>{borrowing._idUser.userId}</td>
                                        <td style={tableStyle}>{borrowing.equipment}</td>
                                        {/*Use format to give the yyy-MM-dd format to the string obtained by parsing an ISO date*/}
                                        <td style={tableStyle}>{format(parseISO(borrowing.borrowStart), 'yyy-MM-dd')}</td>
                                        <td style={tableStyle}>{format(parseISO(borrowing.borrowEnd), 'yyy-MM-dd')}</td>
                                        <td style={tableStyle}>{borrowing.returnDate != null ? 
                                                                format(parseISO(borrowing.returnDate), 'yyy-MM-dd') 
                                                                : 'Unknown' }</td>
                                        <td style={tableStyle}>{borrowing.fine}</td>
                                        <td style={tableStyle}>{borrowing.status}</td>
                                    </tr>
                                ))
                            }                            
                        </tbody>
                    </table>
                    <div style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                        <h2>Create new borrowing</h2>
                        <form onSubmit={handleAddFormSubmit} style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'normal', width: '70%'}}>
                            <label>User </label>
                            <select name="_idUser" required="required" id="users" defaultValue={"default"} onChange={handleAddFormChange} style={inputStyle}>
                                <option value={"default"} disabled>Choose an option</option>
                                {users &&
                                    users.map((user) => (<option value={user._id}>{user.firstName} {user.lastName}</option>))
                                }
                            </select>
                            <label>Equipment </label>
                            <input type="text" name="equipment" required="required" placeholder="equipment" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Start date </label>
                            <input type="date" name="borrowStart" required="required" placeholder="start date" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>End date </label>
                            <input type="date" name="borrowEnd" required="required" placeholder="end date" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Return date </label>
                            <input type="date" name="returnDate" required="required" placeholder="return date" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Fine </label>
                            <input type="text" name="fine" required="required" placeholder="fine" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Status </label>
                            <input type="text" name="status" required="required" placeholder="status" onChange={handleAddFormChange} style={inputStyle}/>
                            <button type="submit" style={inputStyle}>Add borrowing</button>
                        </form>
                    </div>
                </div>
            </div>
    }
    
    return(
        <div>
            {content}
        </div>
    )
}

export default Borrowings;