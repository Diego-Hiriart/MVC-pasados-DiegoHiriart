import {React, useEffect, useState } from "react";

function Users(){
    const urlGet = 'http://localhost:4000/user/get'//Use http not https like with .NET API
    const [users, setUsers] = useState(null);//Users is empty by default
    const [newUserForm, setNewUserForm] = useState({
        userId : '',
        firstName : '',
        lastName : '',
        phone : '',
        email : ''
    })

    const inputStyle = {'margin':'2px'};

    //Check if the user is logged in as soon as this page is entered
    useEffect(() => {
        getAll();
    }, [])  

    //Function to send GET request
    const getAll = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',},
        };
        await fetch(urlGet, requestOptions)
        .then(res => {
            if(res.ok){
                res.json()
                .then(json => setUsers(json));
            }else{
                console.log("GET users failed");
            }
        })
    } 
    
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");//Get the name field
        const fieldValue = event.target.value;//Get the value of the field

        const newFormData = {...newUserForm}//Get the current state of newBorrowing
        newFormData[fieldName] = fieldValue//Update the value of a field

        setNewUserForm(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const create = async (user) => {
            const urlPost = 'http://localhost:4000/user/create';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            console.log(JSON.stringify(user))
            await fetch(urlPost, requestOptions)
                .then(res => {
                    if(res.ok){
                        getAll();
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const newUser = {
            userId : newUserForm.userId,
            firstName : newUserForm.firstName,
            lastName : newUserForm.lastName,
            phone : newUserForm.phone,
            email : newUserForm.email
        }

        create(newUser);
    }

    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

    let content = 
        <div className="container">
            <div style={{display: 'flex', flexDirection:"column",  justifyContent:'normal', alignItems:'center', width: '70%'}}>
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
                <div style={{display: 'flex', flexDirection : "column",  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <table style={tableStyle}>
                        <thead>
                            <tr style={tableStyle}>
                                <th style={tableStyle}>ID</th>
                                <th style={tableStyle}>First name</th>
                                <th style={tableStyle}>Last name</th>
                                <th style={tableStyle}>Phone</th>
                                <th style={tableStyle}>Email</th>
                                <th style={tableStyle}>Options</th>
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
                    <div style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                        <h2>Create new user</h2>
                        <form onSubmit={handleAddFormSubmit} style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'normal', width: '70%'}}>
                            <label>User ID </label>
                            <input type="text" name="userId" required="required" placeholder="User ID" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>First name </label>
                            <input type="text" name="firstName" required="required" placeholder="First name" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Last name </label>
                            <input type="text" name="lastName" required="required" placeholder="Last name" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Phone </label>
                            <input type="text" name="phone" required="required" placeholder="Phone" onChange={handleAddFormChange} style={inputStyle}/>
                            <label>Email </label>
                            <input type="email" name="email" required="required" placeholder="Email" onChange={handleAddFormChange} style={inputStyle}/>
                            <button type="submit" style={inputStyle}>Add user</button>
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

export default Users;