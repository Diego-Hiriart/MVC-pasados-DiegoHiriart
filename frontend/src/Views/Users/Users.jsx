import {React, useEffect, useState, Fragment } from "react";
import ReadRowUser from '../../components/ReadRowUser';
import EditableRowUser from "../../components/EditableRowUser";

function Users(){
    const urlGet = 'http://localhost:4000/user/get'//Use http not https like with .NET API
    const [users, setUsers] = useState(null);//Users is empty by default
    const [editUserId, setEditUserId] = useState(null);//To check if someting is being edited
    const [userForm, setUserForm] = useState({
        userId : '',
        firstName : '',
        lastName : '',
        phone : '',
        email : ''
    })

    const inputStyle = {'margin':'2px'};
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};

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
    
    const handleFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");//Get the name field
        const fieldValue = event.target.value;//Get the value of the field

        const newFormData = {...userForm}//Get the current state of newBorrowing
        newFormData[fieldName] = fieldValue//Update the value of a field

        setUserForm(newFormData);
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
                        alert("User created successfully")
                        getAll();
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const newUser = {
            userId : userForm.userId,
            firstName : userForm.firstName,
            lastName : userForm.lastName,
            phone : userForm.phone,
            email : userForm.email
        }

        create(newUser);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const edit = async (user) => {
            const urlPost = 'http://localhost:4000/user/update';
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            console.log(JSON.stringify(user))
            await fetch(urlPost, requestOptions)
                .then(res => {
                    if(res.ok){
                        getAll();//Updates table
                        setEditUserId(null)//Exits the editing row by changing the state (this causes a reload)
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const editedUser = {
            _id: editUserId,
            userId : userForm.userId,
            firstName : userForm.firstName,
            lastName : userForm.lastName,
            phone : userForm.phone,
            email : userForm.email
        }

        edit(editedUser);
    }

    const handleEditClick = (event, user) => {
        event.preventDefault();

        setEditUserId(user._id);
        const formValues = {
            userId : user.userId,
            firstName : user.firstName,
            lastName : user.lastName,
            phone : user.phone,
            email : user.email
        }

        setUserForm(formValues);
    } 

    const handleCancelClick = () =>{
        setEditUserId(null)//Returns to null, this causes a reload on which the editable row is not rendered
    }

    const handleDeleteClick = async (userId) => {
        const urlDel = 'http://localhost:4000/user/delete';
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({_id : userId})//Backend accepts it this way not just plain text
        };
        await fetch(urlDel, requestOptions)
            .then(res => {
                if(res.ok){               
                    getAll();//Reload due to a state change
                }else{
                    console.log("Deletion failed")
                }
            }) 
    }

    let content = 
        <div className="container" style={{margin:'6px'}}>
            <div style={{display: 'flex', flexDirection:"column",  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Get users</h1>
                <p>Something went wrong</p>  
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
            </div>
        </div>
    
    if(users){//If users array has content
        content =
            <div className="container" style={{margin:'6px'}}>
                <div style={{display: 'flex',  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                    <h1>Get users</h1>
                </div>
                <div style={{display: 'flex', flexDirection : "column",  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                    <form onSubmit={handleEditFormSubmit}>
                        <table>
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
                                {users &&
                                    users.map((user) => (
                                        <Fragment>
                                            {/*If editUserId equals the id of this row's borrowing it means the button was clicked and the editable row must be rendered, 
                                            if it is null it means the user does not want to edit anything, this is seen when the editing is done on canceled*/}
                                            {editUserId === user._id ?  
                                            <EditableRowUser user={user} handleFormChange={handleFormChange} handleCancelClick={handleCancelClick}/> :
                                            <ReadRowUser user = {user} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>}
                                        </Fragment>
                                    ))
                                }                            
                            </tbody>
                        </table>
                    </form>
                    <div style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                        <h2>Create new user</h2>
                        <form onSubmit={handleAddFormSubmit} style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'normal', width: '70%'}}>
                            <label>User ID </label>
                            <input type="text" name="userId" required="required" placeholder="User ID" onChange={handleFormChange} style={inputStyle}/>
                            <label>First name </label>
                            <input type="text" name="firstName" required="required" placeholder="First name" onChange={handleFormChange} style={inputStyle}/>
                            <label>Last name </label>
                            <input type="text" name="lastName" required="required" placeholder="Last name" onChange={handleFormChange} style={inputStyle}/>
                            <label>Phone </label>
                            <input type="text" name="phone" required="required" placeholder="Phone" onChange={handleFormChange} style={inputStyle}/>
                            <label>Email </label>
                            <input type="email" name="email" placeholder="Email" onChange={handleFormChange} style={spacedStyle}/>
                            <button type="submit" style={spacedStyle}>Add user</button>
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