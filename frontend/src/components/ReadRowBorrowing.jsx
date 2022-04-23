import React from 'react'
import { format, parseISO } from 'date-fns';

const ReadRowBorrowing = ({borrowing, handleEditClick, handleDeleteClick}) => {
    const tableStyle = {"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', 'padding':'5px'};
    return(
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
            <td style={tableStyle}>
                <button type="button" onClick={(event) => handleEditClick(event, borrowing)}>Edit</button>{/*Lets us use  the editable row when clicking*/}
                <button type="button" onClick={() => handleDeleteClick(borrowing._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadRowBorrowing;