import React, { Component } from 'react'
import './Message.css'

function Message({ user, message, time }) {
  return (
    <div className="message">
      <p className="meta">{user}<span> {time}</span></p>
      <p className="text">
        {message}
      </p>
    </div>
  );
}

export default Message;