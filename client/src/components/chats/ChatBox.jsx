import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment/moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const {user} = useContext(AuthContext);
    const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat,user);
    const [textMessage, setTextMessage] = useState("")

    console.log("text",textMessage)
    console.log(user)
    console.log(currentChat)

    if(!recipientUser) return (
        <p className="text-center">
            No conversation yet...
        </p>
    );
    if(isMessagesLoading) return (
        <p className="text-center">
            Loading Chat...
        </p>
    );
    return(
        <div className="chat-box w-full flex flex-col">
            <div className="chat-header"> 
                <strong>{recipientUser?.name}</strong>
            </div>
            <div className="messages flex-grow overflow-y-auto">
                {messages && messages.map((message, index) => (
                <ul 
                    key={index}
                    className={`message m-2 ${
                        message?.senderId === user?._id ? "ml-auto self" : ""
                    }`}
                > 
                    <li><span>{message.text}</span></li>
                    <li className="message-footer"><span>{moment(message.createdAt).calendar()}</span></li>
                    </ul>
                ))}
            </div>

            <div className="chat-input flex items-center p-2">
                <InputEmoji 
                value={textMessage} 
                onChange={setTextMessage} 
                fontFamily="nunito" 
                borderColor="rgba(72,112,223, 0.2)"
                />
                <button className="" onClick={() => sendTextMessage(currentChat._id,user,textMessage, sendTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
 
export default ChatBox;