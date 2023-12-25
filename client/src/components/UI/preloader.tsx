import React from 'react';
import preloader from "../../assets/Pulse-1s-200px (1).svg"

const Preloader = () => {
    return (
        <div style={{position: "fixed", width: "100vw", height: "100vh", left: "0", top: "0", display: "flex",
        justifyContent: "center", alignItems: "center"}}>
            <img src={preloader} alt="#"/>
        </div>
    );
};

export default Preloader;