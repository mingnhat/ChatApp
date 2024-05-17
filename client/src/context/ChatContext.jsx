import { useState, createContext, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { json, useSearchParams } from "react-router-dom";
import {io} from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatError, setUserChatError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null); 
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket]=useState((null))
    const [onlineUsers, setOnlineUsers] = useState([])

    console.log("OnlineUser",onlineUsers)

    //initial socket
    useEffect(() =>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket)

        return () =>{
            newSocket.disconnect()
        }
    },[user])

    //add online user
    useEffect(() =>{
        if(socket === null) return 
        socket.emit("addNewUser",user?._id)
        socket.on("getOnlineUsers",(res) =>{
            setOnlineUsers(res)
        })
    },[socket])
    //send message
    useEffect(() =>{
        if(socket === null) return ;

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);
        socket.emit("sendMessage",{...newMessage, recipientId});
        console.log("Checking:...",newMessage)
    },[newMessage])

//receive message
    useEffect(() =>{
        if(socket === null) return ;
        
        socket.on("getMessage",res =>{
            if(currentChat?._id !== res.chatId) return
            setMessages((prev) =>[...prev,res])
        })

        return () =>{
            socket.off("getMessage")
        }

    },[socket, currentChat])

    useEffect(() =>{
        const getUsers = async() =>{
            const response = await getRequest(`${baseUrl}/users/listuser`);

            if(response.error){
                return console.log("Error fetching users",response);
            }

            const pChats = response.filter((u)=>{
                let isChatCreated = false; //checking is chat created yet

                if(user?._id === u._id) return false;

                if(userChats){
                    isChatCreated = userChats?.some((chat) =>{
                        return chat.members[0] === u._id || chat.members[1] === u._id
;                    })
                }
                
                return !isChatCreated
            });
            setPotentialChats(pChats)
        }
        getUsers()
    },[userChats])


    //danh sach cuoc tro chuyen
    useEffect (() =>{
        const getUserChats = async()=>{
            if(user?._id){
                setIsUserChatsLoading(true);
                setUserChatError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if(response.error){
                    return setUserChatError(response);
                }
                setUserChats(response);
            }
        };
        getUserChats();
    },[user])

    //tin nhan
    useEffect (() =>{
        const getMessages = async()=>{
                setIsMessagesLoading(true);
                setMessagesError(null);

                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

                setIsMessagesLoading(false);

                if(response.error){
                    return setMessagesError(response);
                }
                setMessages(response);
        };
        getMessages();
    },[currentChat])
    
    //gui tin nhan
    const sendTextMessage = useCallback(
        async (currentChatId, sender, textMessage,setTextMessage) => {
        
            const response = await postRequest(`${baseUrl}/messages`,JSON.stringify({
                chatId: currentChatId,
                senderId: sender._id,
                text: textMessage
        }))
        console.log("senderId:.....:",sender._id)
        if(response.error) {return setSendTextMessageError(response);}

        setNewMessage(response);
        setMessages((prev)=>[...prev,response])
        //setTextMessage("")
    },[]);

    const updateCurrentChat = useCallback((chat) =>{
        setCurrentChat(chat);
    },[]);

    const createChat = useCallback(async(firstId, secondId) =>{
        const response = await postRequest(`${baseUrl}/chats`,JSON.stringify({
            firstId,
            secondId,
        }))
        if(response.error) return console.log("Error creating chat".response)

        setUserChats((prev) => [...prev, response]);
    },[])
    return(
    <ChatContext.Provider 
        value = {{
            userChats,
            isUserChatsLoading,
            userChatError,
            potentialChats, 
            createChat,
            updateCurrentChat,
            currentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            onlineUsers, 
            newMessage

        }}
    >
        {children}
    </ChatContext.Provider>
    );
};
