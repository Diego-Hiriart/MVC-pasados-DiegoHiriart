import React from 'react'

const UserList = (props) => {

    const count = 1

    const renderedUserList = Object.values(props.users).map(item => {
        return (
            <tr key={item._id}>
                <th scope="row">{count}</th>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.borrowing}</td>
            </tr>
        )
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Equipo</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedUserList}
                </tbody>
            </table>
        </div>
    )
}

export default UserList