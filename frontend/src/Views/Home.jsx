import React from "react";
import {useNavigate} from "react-router-dom"

const Home = () => {
    const spacedStyle = {'margin':'6px'};
    let navigate = useNavigate();
    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70vh'}}>
                <h1>MVC semestres pasados - Ingeniería Web - Diego Hiriart</h1>              
            </div>
            <div>
                <button onClick={() => {navigate("/users")}} style={spacedStyle}>Manage users</button>
                <button onClick={() => {navigate("/borrowings")}} style={spacedStyle}>Manage borrowings </button>
            </div>
        </div>    
    );
}

export default Home;