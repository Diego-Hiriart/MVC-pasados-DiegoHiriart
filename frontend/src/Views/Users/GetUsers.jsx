import {React, useEffect, useState } from "react";

function GetUsers(){
    const urlGet = 'http://localhost:4000/user/get'//Use http not https like with .NET API
    const [users, setUsers] = useState(null);//Users is empty by default

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
                .then(json => setUsers(json));
            }else{
                console.log("GET users failed");
            }
        })
    }  

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    let content = 
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Get users</h1>
                <p>Something went wrong</p>  
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
            </div>
        </div>
    
    if(users){//If users array has content
        content =
            <div className="container">
                <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                    <h1>Get users</h1>
                </div>
                <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableStyle}>
                                <th style={tableStyle}>ID</th>
                                <th style={tableStyle}>First name</th>
                                <th style={tableStyle}>Last name</th>
                                <th style={tableStyle}>Phone</th>
                                <th style={tableStyle}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user.userID} style={tableStyle}>
                                        <td style={tableStyle}>{user.userId}</td>
                                        <td style={tableStyle}>{user.firstName}</td>
                                        <td style={tableStyle}>{user.lastName}</td>
                                        <td style={tableStyle}>{user.phone}</td>
                                        <td style={tableStyle}>{user.email}</td>
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