import React from "react";
import {useNavigate} from "react-router-dom"

const Home = () => {
    const spacedStyle = {'margin':'4px'};
    let navigate = useNavigate();
    return(
        <div className="container">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '70vh'}}>
                <h1>MVC semestres pasados - Ingeniería Web - Diego Hiriart</h1>              
            </div>
            <div>
                <button onClick={() => {navigate("/users/get")}} style={spacedStyle}>Get users</button>
                <button onClick={() => {navigate("/users/create")}} style={spacedStyle}>Create user </button>
                <button onClick={() => {navigate("/borrowings/get")}} style={spacedStyle}>Get borrowings</button>
                <button onClick={() => {navigate("/borrowings/create")}} style={spacedStyle}>Create borrowing</button>
            </div>
        </div>    
    );
}

export default Home;