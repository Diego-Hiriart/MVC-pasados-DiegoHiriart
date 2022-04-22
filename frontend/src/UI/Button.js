import React from 'react'

const Button = (props) => {
    return (
        <button
            type={props.type}
            class="btn btn-primary"
            style={{ marginTop: 10, marginBottom: 10 }}
            onClick={ props.onHandlerClick }
        >
            {props.children}
        </button>
    )
}

export default Button