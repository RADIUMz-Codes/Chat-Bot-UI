import React from "react";
import { IoIosPerson } from "react-icons/io";
import "./index.css";
function User({ message }) {
    return (
        <>
            <div className="user">
                <IoIosPerson className="user-icon" />
                <div className="user-message">{message}</div>
            </div>
        </>
    );
}

export default User;
