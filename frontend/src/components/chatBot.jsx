import React, { useRef, useState } from "react";
import "./css/chatbox.css";

const ChatBox = () => {
  const animation = useRef(null);
  const chatBox = useRef(null);
  const [leetcodeUrl, setLeetCodeUrl] = useState("");
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    animation.current.style.display = "block";

    const userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user-message");

    if (!ValidateUrl(leetcodeUrl)) {
      let botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.classList.add("bot-message");

      botMessage.innerHTML = "Please enter a valid LeetCode URL.";
      chatBox.current.appendChild(botMessage);

      animation.current.style.display = "none";
      return;
    }

    if (userInput === "" || userInput.length < 10) {
      let botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.classList.add("bot-message");

      botMessage.innerHTML = "Message should be atleast 10 characters long.";
      chatBox.current.appendChild(botMessage);

      animation.current.style.display = "none";
      return;
    }

    userMessage.innerHTML = `<a href="${leetcodeUrl}" target="_blank">${leetcodeUrl}</a><br>${userInput}`;

    chatBox.current.appendChild(userMessage);

    setLeetCodeUrl("");
    setUserInput("");

    getDataFromBackend(leetcodeUrl, userInput).then((data) => {
      console.log(data);
    });
  };

  const getDataFromBackend = async (url, message) => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, message }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <div className="chat-container">
      <div ref={chatBox} className="chat-messages">
        <div className="message bot-message">Hello, how can I assist you?</div>
        <div ref={animation} id="loading-animation" style={{ display: "none" }}>
          <div id="loader"></div>
        </div>
        <div className="message user-message"> kafskajbf</div>
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={leetcodeUrl}
          onChange={(e) => setLeetCodeUrl(e.target.value)}
          placeholder="Enter LeetCode URL"
        />
        <input
          type="text"
          id="user-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button id="send-button">Send</button>
      </form>
    </div>
  );

  function ValidateUrl(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!pattern.test(url)) {
      return false;
    } else {
      if (url.includes("leetcode.com")) return true;
      else return false;
    }
  }
};

export default ChatBox;
