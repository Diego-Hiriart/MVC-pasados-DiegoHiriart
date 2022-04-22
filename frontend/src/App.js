import React from 'react'
import NewUser from './views/Users/NewUser'
import NewBorrowing from './views/Borrowings/NewBorrowing'
import BorrowingsFilter from './views/BorrowingsFilter/BorrowingsFilter'
import ContextProvider from './context/ContextProvider'

const App = () => {

  return (
    <ContextProvider>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col-6">
            < NewUser />
          </div>
          <div className="col-6">
            <NewBorrowing/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <BorrowingsFilter />
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}

export default App;
