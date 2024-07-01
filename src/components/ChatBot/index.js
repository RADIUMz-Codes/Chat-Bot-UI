import React, { useEffect, useState } from "react";
import "./index.css";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import Bot from "../Bot";
import User from "../User";

function ChatBot({ setIsModalOpen }) {
    const [data, setData] = useState("");
    const [incType, setIncType] = useState();
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [incId, setIncId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "http://localhost:8000/api/incident-types/"
            );

            setData(response.data);
        };

        fetchData();
    }, []);

    const handleSend = () => {
        setUserMessage(inputValue);
        setInputValue("");
        postIncident();
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const postIncident = async () => {
        let data = {
            incident_type: incType,
            description: inputValue,
        };
        const response = await axios.post('http://localhost:8000/api/incident/',data)
        setInputDisabled(true);
        setIncId(response.data.id)

        
    };

    return (
        <>
            <div className="bot-layout">
                {/** ***************** Haeder ********************* */}
                <div className="bot-info">
                    {/* <FaRegUserCircle className="icn-profile" />*/}
                    <div className="user-name">KPMG</div>
                    <button
                        className="btn-close"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <IoClose className="icn-close" />
                    </button>
                </div>

                {/** **************** Chat Area ******************  */}
                <div className="chat-area">
                    <Bot
                        message={
                            "Welcome User! Please select your incident type."
                        }
                    />
                    {
                        <div className="options">
                            {data &&
                                data.map((item) => (
                                    <button
                                        key={item.id}
                                        id={item.id}
                                        className={
                                            incType === item.inc_type
                                                ? "active"
                                                : ""
                                        }
                                        disabled={optionsDisabled}
                                        onClick={() => {
                                            setIncType(item.inc_type);
                                            setOptionsDisabled(true);
                                            setInputDisabled(false);
                                        }}
                                    >
                                        {item.inc_type}
                                    </button>
                                ))}
                        </div>
                    }
                    {incType && (
                        <Bot
                            message={`Your incident type is ${incType}. Please describe the incident`}
                        />
                    )}

                    {userMessage && <User message={userMessage} />}
                    {incId && <Bot message={`Your Incident Id is ${incId}`}/>}
                </div>

                {/** **************** Input Box ******************  */}
                <div className="input-area">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        className="chat-input"
                        placeholder="Type your message ..."
                        disabled={inputDisabled}
                    />
                    <button
                        className="btn-send"
                        onClick={handleSend}
                        disabled={inputDisabled}
                    >
                        <IoSend className="icn-send" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatBot;
