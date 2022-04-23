import React from 'react'

const ReadRowUser = ({user, handleEditClick, handleDeleteClick}) => {
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};
    return(
        <tr key={user.userID} style={tableStyle}>
            <td style={tableStyle}>{user.userId}</td>
            <td style={tableStyle}>{user.firstName}</td>
            <td style={tableStyle}>{user.lastName}</td>
            <td style={tableStyle}>{user.phone}</td>
            <td style={tableStyle}>{user.email}</td>
            <td style={tableStyle}>
                <button type="button" onClick={(event) => handleEditClick(event, user)} style={spacedStyle}>Edit</button>{/*Lets us use  the editable row when clicking*/}
                <button type="button" onClick={() => handleDeleteClick(user._id)} style={spacedStyle}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadRowUser;