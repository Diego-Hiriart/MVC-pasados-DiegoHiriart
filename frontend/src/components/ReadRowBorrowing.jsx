import React from 'react'
import { format, parseISO } from 'date-fns';

const ReadRowBorrowing = ({borrowing, handleEditClick, handleDeleteClick}) => {
    const spacedStyle = {'margin':'2px'};
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};
    return(
        <tr key={borrowing._id} style={tableStyle}>
            {/*This is needed in case the user linked to this borrowing was deleted from the database */}
            {borrowing._idUser != null || borrowing._idUser != undefined ?
                <> 
                <td style={tableStyle}>{borrowing._idUser.firstName} {borrowing._idUser.lastName}</td>
                <td style={tableStyle}>{borrowing._idUser.userId}</td>
                </> 
            : 
                <>
                <td style={tableStyle}>No user registered, correct this data</td>
                <td style={tableStyle}>No user registered, correct this data</td>
                </>
            }
            
            <td style={tableStyle}>{borrowing.equipment}</td>
            {/*Use format to give the yyy-MM-dd format to the string obtained by parsing an ISO date*/}
            {/* This awful ".replace(/-/g, '\/').replace(/T.+/, '')" is needed because if there are '-' instead of '/' the date gets messed up by one day beacuse of UTC*/}
            <td style={tableStyle}>{format(new Date((borrowing.borrowStart).replace(/-/g, '\/').replace(/T.+/, '')), 'yyy-MM-dd')}</td>
            <td style={tableStyle}>{format(new Date((borrowing.borrowEnd).replace(/-/g, '\/').replace(/T.+/, '')), 'yyy-MM-dd')}</td>
            <td style={tableStyle}>{borrowing.returnDate != null ? 
                                    format(new Date((borrowing.returnDate).replace(/-/g, '\/').replace(/T.+/, '')), 'yyy-MM-dd') 
                                    : 'Unknown' }</td>
            <td style={tableStyle}>{borrowing.fine}</td>
            <td style={tableStyle}>{borrowing.status}</td>
            <td style={tableStyle}>
                <button type="button" onClick={(event) => handleEditClick(event, borrowing)} style={spacedStyle}>Edit</button>{/*Lets us use  the editable row when clicking*/}
                <button type="button" onClick={() => handleDeleteClick(borrowing._id)} style={spacedStyle}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadRowBorrowing;