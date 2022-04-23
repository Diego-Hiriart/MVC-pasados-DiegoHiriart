import React from 'react'
import { format, parseISO } from 'date-fns';

const EditableRowBorrowing = ({borrowing, users, handleFormChange, handleCancelClick}) => {
    const inputStyle = {'margin':'2px'};
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};
    return(
        <tr key={borrowing._id} style={tableStyle}>
            {/*This is needed in case the user linked to this borrowing was deleted from the database */}
            {borrowing._idUser != null || borrowing._idUser != undefined ?
                <td style={tableStyle}>
                    <select name="_idUser" required="required" id="_idUser" defaultValue={borrowing._idUser._id} onChange={handleFormChange} style={inputStyle}>
                        {users &&
                            users.map((user) => (<option value={user._id}>{user.firstName} {user.lastName}</option>))
                        }
                    </select>
                </td>
            :
                <td style={tableStyle}>
                    <select name="_idUser" required="required" id="_idUser" defaultValue={"default"} onChange={handleFormChange} style={inputStyle}>
                    <option value={"default"} disabled>Choose an option</option>
                        {users &&
                            users.map((user) => (<option value={user._id}>{user.firstName} {user.lastName}</option>))
                        }
                    </select>
                </td>
            }
            <td style={tableStyle}>
                {/*No input goes goes here, selecting a user will select the ID*/}
            </td>
            <td style={tableStyle}>
                <input type="text" name="equipment" required="required" defaultValue={borrowing.equipment} 
                placeholder="equipment" onChange={handleFormChange} style={inputStyle}/>
            </td>
            {/*Use format to give the yyy-MM-dd format to the string obtained by parsing an ISO date, this formats the date correctly so that it can be usaed as a default value*/}
            <td style={tableStyle}>
                <input type="date" name="borrowStart" required="required" defaultValue={format(parseISO(borrowing.borrowStart), 'yyy-MM-dd')} 
                placeholder="start date" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="date" name="borrowEnd" required="required" defaultValue={format(parseISO(borrowing.borrowEnd), 'yyy-MM-dd')} 
                placeholder="end date" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="date" name="returnDate" defaultValue={format(parseISO(borrowing.returnDate), 'yyy-MM-dd')} 
                placeholder="return date" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <input type="text" name="fine" defaultValue={borrowing.fine} 
                placeholder="fine" onChange={handleFormChange} style={inputStyle}/>
            </td>
            <td style={tableStyle}>
                <select name="status" required="required" id="status" defaultValue={borrowing.status} onChange={handleFormChange} style={inputStyle}>
                    <option value={"borrowed"}>borrowed</option>
                    <option value={"returned"}>returned</option>
                </select>
            </td>
            <td style={tableStyle}>
                <button type="submit" style={spacedStyle}>Save</button>
                <button type="button" onClick={handleCancelClick} style={spacedStyle}>Cancel</button>
            </td>
        </tr>
    )                            
}

export default EditableRowBorrowing;