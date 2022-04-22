import {React, useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';

function GetUsers(){
    const urlGet = 'http://localhost:4000/borrowing/get'//Use http not https like with .NET API
    const [borrowings, setBorrowings] = useState(null);//Users is empty by default

    //Check if the user is logged in as soon as this page is entered
    useEffect(() => {
        getAll();
    }, [])  

    //Function to send GET request
    const getAll = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        };
        fetch(urlGet, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setBorrowings(json));
            }else{
                console.log("GET borrowings failed");
            }
        })
    }  

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    let content = 
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
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
                <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
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
                </div>
            </div>
    }
    
    return(
        <div>
            {content}
        </div>
    )
}

export default GetUsers;