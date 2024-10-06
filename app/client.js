"use client"; //client side rendering
import { useState } from "react";
import socket from "./server";
function OpenModal() {
  return (
    <button className="btn" onClick={() => my_modal_1.showModal()}>
      open modal
    </button>
  );
}
function sendMessage(message)
{
   socket.emit("sendMessage",{"message":message},(res)=>{
    console.log("send msg res",res);
    
  });
}
export default function Calendar() {
  const [message,setMessage] = useState('');

  return <div><input value={message} onChange={(event) => setMessage(event.target.value)}/><input type="button" value="전송" onClick={function(){sendMessage(message);setMessage("");}}/></div>;
}