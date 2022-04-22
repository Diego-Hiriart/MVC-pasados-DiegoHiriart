import React, { useState } from 'react'

const Filter = () => {

    const [dateBegin, setDateBegin] = useState('')
    const [dateFinal, setDateFinal] = useState('')

    return (
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
    )
}

export default Filter;