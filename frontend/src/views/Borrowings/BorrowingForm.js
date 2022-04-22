import React, { useState } from 'react'
import Button from '../../UI/Button'

const BorrowingForm = (props) => {

    const borrowingState = [
        { option: '1', label: 'Prestado' },
        { option: '2', label: 'Devuelto' }
    ]

    const [equipment, setEquipment] = useState('')
    const [user, setUser] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [fine, setFine] = useState('')
    const [status, setStatus] = useState('')

    const onHandlerSubmit = (event) => {
        event.preventDefault();

        props.addNewBorrowing({
            '_idUser' : user,
            'equipment' : equipment,
            'borrowStart' : startDate,
            'borrowEnd' : endDate,
            'returnDate' : returnDate,
            'fine' : fine,
            'status' : status
        })

        setUser('');
        setEquipment('');
        setStartDate('');
        setEndDate('');
        setReturnDate('');
        setFine('');
        setStatus('');
    }

    const selectUser = Object.values(props.users).map((user) => {
        return (
            <option value={user._id} name={user.userId} id={user.userId} >{user.firstname} {user.lastname}</option>
        )
    })

    const selectBorrowingState = Object.values(borrowingState).map(item => {
        return (
            <option value={item.label} >{item.label}</option>
        )
    })

    const selectOneOption = (event) => {
        let index = event.target.selectedIndex;
        setUser(event.target.value)
    }

    return (
        <div>
            <form onSubmit={onHandlerSubmit}>
                <div>
                    <div>
                        <label>Usuario</label>
                            <select
                                value={user} onChange={selectOneOption}>
                                <option value="--- seleccione ---" ></option>
                                {selectUser}
                            </select>
                    </div>

                    <div>
                        <label>Equipo</label>
                            <input
                                    value={equipment}
                                    onChange={({ target: { value } }) => setEquipment(value)}
                                    disabled
                                />
                    </div>
                </div>

                <div>
                    <div>
                        <label>Fecha de inicio</label>
                            <input
                                type="date"
                                values={startDate}
                                onChange={({ target: { value } }) => setStartDate(value)}
                            />
                    </div>
                    <div>
                        <label>Fecha fin</label>
                            <input
                                type="date"
                                values={endDate}
                                onChange={({ target: { value } }) => setEndDate(value)}
                            />
                    </div>
                    <div>
                        <label>Fecha de retorno</label>
                            <input
                                type="date"
                                values={returnDate}
                                onChange={({ target: { value } }) => setReturnDate(value)}
                            />
                    </div>
                    <div>
                        <label>Grupo</label>
                            <input
                                type="number"
                                value={fine}
                                onChange={({ target: { value } }) => setFine(value)}
                            />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Estado</label>
                            <select
                                    className="form-control"
                                    value={status} onChange={({ target: { value } }) => setStatus(value)}>
                                    <option value="" >--- seleccione ---</option>
                                    {selectBorrowingState}
                                </select>
                    </div>
                </div>
                <Button type="submit">Guardar</Button>
            </form>
        </div>
    )
}

export default BorrowingForm;