import React from "react";
import { FaRobot } from "react-icons/fa";
import "./index.css";

function Bot({ message }) {
    return (
        <>
            <div className="bot">
                <FaRobot className="bot-icon" />
                <div className="bot-message">{message}</div>
            </div>
        </>
    );
}

export default Bot;
