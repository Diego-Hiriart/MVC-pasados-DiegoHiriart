import {React} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Users from "./Views/Users/Users";
import Borrowings from "./Views/Borrowings/Borrowings"
import Home from "./Views/Home";
import Error from "./Views/404";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>{/*The "" path redirects to the component*/}
          <Route path="/users" element={<Users/>}/>
          <Route path="/borrowings" element={<Borrowings/>}/>
          <Route path="*" element={<Error/>}/>{/*If a bad route is given*/}
        </Routes>
      </Router>
    </>
  );

}

export default App;