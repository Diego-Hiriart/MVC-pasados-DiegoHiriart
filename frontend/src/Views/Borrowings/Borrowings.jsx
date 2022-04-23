import {React, useEffect, useState, Fragment } from "react";
import ReadRowBorrowing from '../../components/ReadRowBorrowing';
import EditableRowBorrowing from "../../components/EditableRowBorrowing";

function Borrowings(){
    const urlGetBorrowings = 'http://localhost:4000/borrowing/get'//Use http not https like with .NET API
    const urlGetUsers = 'http://localhost:4000/user/get'
    const [borrowings, setBorrowings] = useState(null);//Users is empty by default
    const [users, setUsers] = useState(null);//Users is empty by default
    const [editBorrowingId, setEditBorrowingId] = useState(null);//To check if someting is being edited
    const [borrowingForm, setBorrowingForm] = useState({
        _idUser : '',
        equipment : '',
        borrowStart : '',
        borrowEnd : '',
        returnDate : '',
        fine : '',
        status : ''
    })
    const [filterForm, setFilterForm] = useState({
        borrowStart : '',
        borrowEnd : ''
    })

    const inputStyle = {'margin':'2px'};
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px', 'overflow':'auto'};

    //Check if the user is logged in as soon as this page is entered
    useEffect(() => {
        getAll();
        getUsers();
    }, [])  

    //Function to send GET request
    const getAll = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
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

    const handleFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");//Get the name field
        const fieldValue = event.target.value;//Get the value of the field

        const newFormData = {...borrowingForm}//Get the current state of newBorrowing
        newFormData[fieldName] = fieldValue//Update the value of a field

        setBorrowingForm(newFormData);
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
                        alert("User created successfully")
                        getAll();//Updates table
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const newBorrowing = {
            _idUser : borrowingForm._idUser,
            equipment : borrowingForm.equipment,
            borrowStart : borrowingForm.borrowStart,
            borrowEnd : borrowingForm.borrowEnd,
            returnDate : borrowingForm.returnDate,
            fine : borrowingForm.fine,
            status : borrowingForm.status
        }

        create(newBorrowing);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const edit = async (borrowing) => {
            const urlPost = 'http://localhost:4000/borrowing/update';
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(borrowing)
            };
            console.log(JSON.stringify(borrowing))
            await fetch(urlPost, requestOptions)
                .then(res => {
                    if(res.ok){
                        getAll();//Updates table
                        setEditBorrowingId(null)//Exits the editing row by changing the state (this causes a reload)
                    }else{
                        console.log("Creation error");
                    }
                }); 
        }

        const editedBorrowing = {
            _id: editBorrowingId,
            _idUser : borrowingForm._idUser,
            equipment : borrowingForm.equipment,
            borrowStart : borrowingForm.borrowStart,
            borrowEnd : borrowingForm.borrowEnd,
            returnDate : borrowingForm.returnDate,
            fine : borrowingForm.fine,
            status : borrowingForm.status
        }

        edit(editedBorrowing);
    }

    const handleEditClick = (event, borrowing) => {
        event.preventDefault();

        setEditBorrowingId(borrowing._id);
        const formValues = {
            _idUser : borrowing._idUser,
            equipment : borrowing.equipment,
            borrowStart : borrowing.borrowStart,
            borrowEnd : borrowing.borrowEnd,
            returnDate : borrowing.returnDate,
            fine : borrowing.fine,
            status : borrowing.status
        }

        setBorrowingForm(formValues);
    } 

    const handleCancelClick = () =>{
        setEditBorrowingId(null)//Returns to null, this causes a reload on which the editable row is not rendered
    }

    const handleDeleteClick = async (borrowingId) => {
        const urlDel = 'http://localhost:4000/borrowing/delete';
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({_id : borrowingId})//Backend accepts it this way not just plain text
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

    const handleFilterChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");//Get the name field
        const fieldValue = event.target.value;//Get the value of the field

        const newFilterData = {...filterForm}//Get the current state of newBorrowing
        newFilterData[fieldName] = fieldValue//Update the value of a field

        setFilterForm(newFilterData);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const urlGetFilteredBorrowings = 'http://localhost:4000/borrowing/filter';
        const getFiltered = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body : JSON.stringify(filterForm)
            };
            await fetch(urlGetFilteredBorrowings, requestOptions)
            .then(res => {
                if(res.ok){
                    res.json()
                    .then(json => setBorrowings(json));
                }else{
                    console.log("GET filtered borrowings failed");
                }
            })
        } 

        const editedBorrowing = {
            _id: editBorrowingId,
            _idUser : borrowingForm._idUser,
            equipment : borrowingForm.equipment,
            borrowStart : borrowingForm.borrowStart,
            borrowEnd : borrowingForm.borrowEnd,
            returnDate : borrowingForm.returnDate,
            fine : borrowingForm.fine,
            status : borrowingForm.status
        }

        getFiltered(editedBorrowing);
    }

    let content = 
        <div className="container" style={{margin:'6px'}}>
            <div style={{display: 'flex', flexDirection:"column",  justifyContent:'normal', alignItems:'center', width: '70%'}}>
                <h1>Get Borrowings</h1>
                <p>Something went wrong</p>  
            </div>
            <div style={{display: 'flex',  justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
            </div>
        </div>
    
    if(borrowings){//If borrowings array has content
        content =
            <div className="container" style={{margin:'6px'}}>
                <div style={{display: 'flex', flexDirection:'column',  justifyContent:'normal', alignItems:'center', width: '100%'}}>
                    <h1>Get borrowings</h1>
                    <p>Filter the borrowing by start and end date: </p>
                    <form onSubmit={handleFilterSubmit}>
                        <label style={{margin:'4px'}}>Start date </label>
                        <input type="date" name="borrowStart" required="required" placeholder="start date" onChange={handleFilterChange} style={inputStyle}/>
                        <label style={{margin:'4px'}}>End date </label>
                        <input type="date" name="borrowEnd" required="required" placeholder="end date" onChange={handleFilterChange} style={inputStyle}/>
                        <button type="submit">Filter</button>
                    </form>
                    <button type="button" onClick={getAll}>Clear filter</button>{/*resets the view*/}
                </div>
                <div style={{display: 'flex', flexDirection:"column", justifyContent:'center', alignItems:'center', width: '100%'}}>
                    <form onSubmit={handleEditFormSubmit}>
                        <table style={{tableStyle}}>
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
                                        <Fragment>
                                            {/*If editBorrowingId equals the id of this row's borrowing it means the button was clicked and the editable row must be rendered, 
                                            if it is null it means the user does not want to edit anything, this is seen when the editing is done on canceled*/}
                                            {editBorrowingId === borrowing._id ?  
                                            <EditableRowBorrowing borrowing={borrowing} users={users} handleFormChange={handleFormChange} handleCancelClick={handleCancelClick}/> :
                                            <ReadRowBorrowing borrowing = {borrowing} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>}  
                                        </Fragment>
                                    ))
                                }                            
                            </tbody>
                        </table>
                    </form>
                    <div style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'center', width: '70%'}}>
                        <h2>Create new borrowing</h2>
                        <form onSubmit={handleAddFormSubmit} style={{display: 'flex', flexDirection:"column", justifyContent:'space-evenly', alignItems:'normal', width: '70%'}}>
                            <label>User </label>
                            <select name="_idUser" required="required" id="users" defaultValue={"default"} onChange={handleFormChange} style={inputStyle}>
                                <option value={"default"} disabled>Choose an option</option>
                                {users &&
                                    users.map((user) => (<option value={user._id}>{user.firstName} {user.lastName}</option>))
                                }
                            </select>
                            <label>Equipment </label>
                            <input type="text" name="equipment" required="required" placeholder="equipment" onChange={handleFormChange} style={inputStyle}/>
                            <label>Start date </label>
                            <input type="date" name="borrowStart" required="required" placeholder="start date" onChange={handleFormChange} style={inputStyle}/>
                            <label>End date </label>
                            <input type="date" name="borrowEnd" required="required" placeholder="end date" onChange={handleFormChange} style={inputStyle}/>
                            <label>Return date </label>
                            <input type="date" name="returnDate" placeholder="return date" onChange={handleFormChange} style={inputStyle}/>
                            <label>Fine </label>
                            <input type="text" name="fine" placeholder="fine" onChange={handleFormChange} style={inputStyle}/>
                            <label>Status </label>
                            <select name="status" required="required" id="users" defaultValue={"default"} onChange={handleFormChange} style={inputStyle}>
                                <option value={"default"} disabled>Choose an option</option>
                                <option>borrowed</option>
                                <option>returned</option>
                            </select>
                            <button type="submit" style={spacedStyle}>Add borrowing</button>
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