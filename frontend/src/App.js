import {React} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Users from "./Views/Users/Users";
import Borrowings from "./Views/Borrowings/Borrowings"
import Home from "./Views/Home";
import Error from "./Views/404";

function App() {

  return (
    <>
      <Router>
        <nav style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70%'}}>
          <Link to="/" style={{marginleft:"auto"}}>Home</Link>
        </nav>
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