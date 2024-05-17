import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/account1.png"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
const UserChat = ({chat,user}) => {
    const {recipientUser} = useFetchRecipientUser(chat,user)
    const {onlineUsers, newMessage} = useContext(ChatContext);

    const isOnline = onlineUsers?.some((user)=>user?.userId === recipientUser?._id) 
    ?"user-online" 
    : ""

    console.log(recipientUser);
    return ( 
    <div>
        <ul className="flex flex-col user-card p-2 justify-between">
            <li className="cursor-pointer">
                <div className="flex">
                    <div className="me-2"><img src={avatar} className="w-[40px] "/></div>
                    <div className="text-content">
                        <div className="name">{recipientUser?.name}</div>
                        <div className="text">Text message</div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="date">10/01/2024</div>
                
                    <div className="this-user-notifications">2</div>
                    <span className={isOnline ? "user-online m-2" : ""}></span>
                </div>
            </li>
        </ul>
    </div> 
    );
}
 
export default UserChat;