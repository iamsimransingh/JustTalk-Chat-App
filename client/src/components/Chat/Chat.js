import React,{useState, useEffect} from 'react';//importing react hooks , useeffedt for lifecycle method inside hooks
import queryString from 'query-string';//helps in retrieving data in url
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar.js';//component
import Input from '../Input/Input.js';//component
import Messages from '../Messages/Messages.js';//component
import TextContainer from '../TextContainer/TextContainer.js';
import './Chat.css';


let socket;//variable to be stored outside our component

const Chat = ({location}) => {//prop location
    const [name, setName] = useState('');//declaring hooks, parameter - name, setname(func), passing initial value of name var, an empty string to usestate
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://justtalk-chat-application.herokuapp.com/';
    useEffect(() =>{ //useeffect call 
        const {name, room} = queryString.parse(location.search);//location is from react router that will be used as prop to chat, basically returns back url
        socket=io(ENDPOINT);//on first connection
        setName(name);
        setRoom(room);
        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });
        }, [ENDPOINT, location.search]);// with this only one time connection will happen, useeffect will run only one time at a point
   
     useEffect(()=>{//handling messages
      socket.on('message',message =>{
       setMessages([...messages, message]);//pushing messages to messsages array,adding new messages send my admin or user to messages array
      });
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }, [messages]);

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message,()=> setMessage(''));
        }
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
               {/*   <input 
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                onKeyPress={(event)=>event.key === 'Enter'? sendMessage(event) : null}>

                </input>*/}

            </div>
            <TextContainer users={users}/>
        </div>
        
    );
}

export default Chat;