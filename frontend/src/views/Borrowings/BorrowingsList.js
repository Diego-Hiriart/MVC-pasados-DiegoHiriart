import React from 'react'

const BorrowingsList = (props) => {

    const count = 1

    const renderedBorrowings = Object.values(props.borrowings).map(item => {
        return (
            <tr key={item._id}>
                <th scope="row">{count}</th>
                    <td>{item._idUser.firstname} {item._idUser.lastname}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.returnDate}</td>
                    <td>{item.fine}</td>
                    <td>{item.status}</td>
            </tr>
        )
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Fecha inicio</th>
                        <th scope="col">Fecha fin</th>
                        <th scope="col">Fecha retorno</th>
                        <th scope="col">Multa</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedBorrowings}
                </tbody>
            </table>
        </div>
    )
}

export default BorrowingsList;