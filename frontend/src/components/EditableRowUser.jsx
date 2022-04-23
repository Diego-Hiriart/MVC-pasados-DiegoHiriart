import React from 'react'

const EditableRowBorrowing = ({user, handleFormChange, handleCancelClick}) => {
    const inputStyle = {'margin':'2px'};
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};
    return(
        <tr key={user._id} style={tableStyle}>
            <td style={tableStyle}>
                <input type="text" name="userId" required="required" defaultValue={user.userId} 
                placeholder="User ID" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="text" name="firstName" required="required" defaultValue={user.firstName} 
                placeholder="First name" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="text" name="lastName" required="required" defaultValue={user.lastName} 
                placeholder="Last name" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="text" name="phone" required="required" defaultValue={user.phone} 
                placeholder="Phone" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="email" name="email" defaultValue={user.email} 
                placeholder="Email" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <button type="submit" style={spacedStyle}>Save</button>
                <button type="button" onClick={handleCancelClick} style={spacedStyle}>Cancel</button>
            </td>
        </tr>
    )                            
}

export default EditableRowBorrowing;