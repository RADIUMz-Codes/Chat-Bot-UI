import "./App.css";
import ChatBot from "./components/ChatBot";
import { FaRobot } from "react-icons/fa";
import { useState } from "react";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className="icon"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                <FaRobot className="robo-icon" />
            </button>
            
            {isModalOpen && <ChatBot setIsModalOpen={setIsModalOpen} />}
        </>
    );
}

export default App;
