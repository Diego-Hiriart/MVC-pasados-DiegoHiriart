import React, { useState, useEffect, useContext } from 'react'

import UserList from './UsersList'//Use these to fill out parts of this component
import UserForm from './UserForm'

import AppContext from '../../context/app-context'

const User = () => {

    const [status, setStatus] = useState(true);

    const appCtx = useContext(AppContext);

    let content = (
        <UserList users={appCtx.users} />
    )

    if (appCtx.error) {
        content = ( <p style={{fontWeight: 'bold'}}>Error no se encuentra el usuario</p>)
    }

    if (appCtx.loading) {
        content = 'Usuario cargando';
    }

    const addNewUser = (newUser) => {
        appCtx.addUser(newUser);
    }

    const onHandlderStatus = () => {
        setStatus(!status);
    }

    return (
        <div>
            <div>
                <h2>Usuario</h2>
                <button
                    type="button"
                    class={`${status }`}
                    onClick={onHandlderStatus}
                >

                </button>
            </div>
            {status && (
                <UserForm addNewUser={addNewUser} />
            )}
            {content}
        </div>
    )
}

export default User