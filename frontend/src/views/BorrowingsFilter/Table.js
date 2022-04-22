import React, { useState , useReducer } from 'react'
import Filter from './Filter';

const Table = (props) => {

    let count = 1

    const [dateBegin, setDateBegin] = useState('')
    const [dateFinal, setDateFinal] = useState('')
    const [cost, setCost] = useState(0)

    const filterData = () => {
        if (dateBegin == '') {
            return props.borrowings
        }
        if (dateBegin.trim().length > 0) {
            const newFilter = Object.values(props.borrowings).filter(item => {
                if (dateFinal.trim().length > 0 || dateFinal != '') {
                    return item.date >= dateBegin && item.date <= dateFinal
                }
                return item.date.includes(dateBegin)
            });

            return newFilter;
        }
        return props.borrowings
    }
    //All this cost calculation is on the backend now, thos should be on the controller not the view
    /*const costTotal = () => {
        const tempoResult = Object.values(filterData())
        var total = tempoResult.reduce((sum , value) => ( sum + value.bonus *5 ) , 0 )
        return total ;
    }*/
    
    const renderedBorrowings = Object.values(filterData()).map(item => {
        return (
            <tr>
                <th scope="row">{count}</th>
                    <td>{item._idUser}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.returnDate}</td>
                    <td>{item.fine}</td>
                    <td>{item.status}</td>
            </tr>
        )
    })

    return (
        <>
            <div>
                <div>
                    <label>
                        Fecha Inicial </label>
                    <input
                        type="date"
                        class="form-control"
                        value={dateBegin}
                        onChange={({ target: { value } }) => setDateBegin(value)}
                    />
                </div>
                <div>
                    <label>
                        Fecha Final
                    </label>
                    <input
                        type="date"
                        class="form-control"
                        value={dateFinal}
                        onChange={({ target: { value } }) => setDateFinal(value)}
                    />
                </div>
            </div>

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
        </>
    )
}

export default Table;