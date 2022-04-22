import {React} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GetUsers from "./Views/Users/GetUsers";
import CreateUser from "./Views/Users/Newuser";
import GetBorrowings from "./Views/Borrowings/GetBorrowings"
import NewBorrowing from "./Views/Borrowings/NewBorrowing"
import Home from "./Views/Home";
import Error from "./Views/404";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
          <Route path="/users/get" element={<GetUsers/>}/>
          <Route path="/users/create" element={<CreateUser/>}/>
          <Route path="/borrowings/get" element={<GetBorrowings/>}/>
          <Route path="/borrowings/create" element={<NewBorrowing/>}/>
          <Route path="*" element={<Error/>}/>{/*If a bad route is given*/}
        </Routes>
      </Router>
    </>
  );

}

export default App;