import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chats/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chats/PotentialChats";
import ChatBox from "../components/chats/ChatBox";


const Chat = () => {
    const {user}=useContext(AuthContext);
    const {userChats, isUserChatsLoading, updateCurrentChat} = useContext(ChatContext);

    console.log("UserChatsss", userChats);
    return (
        <div className="container">
            <PotentialChats/>
            {userChats?.length < 1 ? null : (
            <div className="text-white">
                <ul className="flex flex-row">
                    <li className="grow">
                        <div className="messages-box flex flex-col ">
                            {isUserChatsLoading && <p>Loading chats...</p>}
                            {userChats?.map((chat,index)=>{
                                return(
                                    <div key={index} onClick ={()=> updateCurrentChat(chat)}>
                                        <UserChat chat={chat} user={user}/>
                                    </div>
                                )
                            })}
                        </div>
                    </li>
                    <ChatBox/>
                </ul>
            </div>
            )}
        </div>  );
};
 
export default Chat;