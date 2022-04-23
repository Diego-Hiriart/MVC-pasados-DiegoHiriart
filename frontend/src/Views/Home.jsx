import React from "react";
import {useNavigate} from "react-router-dom"

const Home = () => {
    const spacedStyle = {'margin':'2px'};
    let navigate = useNavigate();
    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70vh', margin:'6px'}}>
                <h1>MVC semestres pasados - Ingeniería Web - Diego Hiriart</h1>              
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70vh', margin:'6px'}}>
                <button onClick={() => {navigate("/users")}} style={spacedStyle}>Manage users</button>
                <button onClick={() => {navigate("/borrowings")}} style={spacedStyle}>Manage borrowings </button>
            </div>
        </div>    
    );
}

export default Home;