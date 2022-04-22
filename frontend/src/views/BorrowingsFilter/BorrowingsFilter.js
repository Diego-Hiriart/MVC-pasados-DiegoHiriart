import React, { useContext } from 'react'
import Table from './Table';
import AppContext from '../../context/app-context'

const BorrowingsFilter = () => {

    const appCtx = useContext(AppContext);

    let content = (
        < Table borrowings={appCtx.borrowings} />
    )

    if (appCtx.error) {
        content = ( <p style={{fontWeight: 'bold'}}>Error no se encuentra lo que se esta filtrando</p>)
    }

    if (appCtx.loading) {
        content = 'Cargando la tabla filtrada...';
    }

    return (
        <div>
            <h2>Filtrar Fechas</h2>
            {content}
        </div>
    )
}

export default BorrowingsFilter