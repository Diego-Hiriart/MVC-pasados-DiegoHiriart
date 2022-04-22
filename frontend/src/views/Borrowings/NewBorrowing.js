import React, { useState, useContext } from 'react'
import BorrowingForm from './BorrowingForm'
import BorrowingsList from './BorrowingsList'
import AppContext from '../../context/app-context'

const NewBorrowing = () => {

    const [status, setStatus] = useState(true);

    const appCtx = useContext(AppContext);
    console.log(appCtx.borrowings)

    let content = (
        <BorrowingsList borrowings={appCtx.borrowings} />
    )

    if (appCtx.error) {
        content = ( <p style={{fontWeight: 'bold'}}>Error no se encuentra el prestamo de equipo</p>)
    }

    if (appCtx.loading) {
        content = 'Cargando prestamo...';
    }

    const onHandlderStatus = () => {
        setStatus(!status);
    }

    const addNewborrowing = (newBorrowing) => {
        appCtx.addBorrowing(newBorrowing)
    }

    return (
        <div>
            <div>
                <h2>Equipos</h2>
                <button
                    type="button"
                    class={` ${status}`}
                    onClick={onHandlderStatus}
                >

                </button>
            </div>
            {status && (
                <BorrowingForm users={appCtx.users} addNewborrowing={addNewborrowing} />
            )}
            {content}

        </div>
    )
}

export default NewBorrowing