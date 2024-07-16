import React, { useRef, useState } from "react";
import "./css/chatbot.css";
import getResponse, { continueChat } from "../utils/api";
import extractQuestionName from "../utils/extractQuestion";
import ValidateUrl from "../utils/validateUrl";

const ChatBox = () => {
  const animation = useRef(null);
  const chatBox = useRef(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [isCustomDoubt, SetIsCustomDoubt] = useState(false);
  const [selectedOption, setSelectedOption] = useState("intuitions");
  const [leetcodeUrl, setLeetCodeUrl] = useState("");
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    animation.current.style.display = "block";

    if (chatStarted) {
      if (userInput === "") {
        animation.current.style.display = "none";
        return;
      }
      addMessage(userInput);
      addUserMessageToHistory("", userInput, true);
      continueChat(userInput, history).then((data) => {
        addBotMessageToHistory(data);
        addMessage(data, true);
        animation.current.style.display = "none";
        return;
      });

      setUserInput("");
    } else {
      if (!ValidateUrl(leetcodeUrl)) {
        addMessage("Invalid URL", true);
        animation.current.style.display = "none";
        return;
      }

      if (isCustomDoubt && (userInput === "" || userInput.length < 10)) {
        addMessage("Message must atleast be 10 charecters", true);
        animation.current.style.display = "none";
        return;
      }

      const userMessage = `<a href="${leetcodeUrl}" target="_blank">${leetcodeUrl}</a><br>${userInput}`;
      addMessage(userMessage);

      const question = extractQuestionName(leetcodeUrl);

      addUserMessageToHistory(question, userInput);

      getResponse(
        leetcodeUrl,
        isCustomDoubt ? userInput : selectedOption,
        isCustomDoubt,
        history
      ).then((data) => {
        addMessage(data, true);
        addBotMessageToHistory(data);
        animation.current.style.display = "none";
      });

      if (!chatStarted) setChatStarted(true);

      setLeetCodeUrl("");
      setUserInput("");
    }
  };

  return (
    <div className="chat-container">
      <div ref={chatBox} className="chat-messages">
        <div className="message bot-message">Hello, how can I assist you?</div>
      </div>
      <div ref={animation} id="loading-animation" style={{ display: "none" }}>
        <div id="loader"></div>
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        {!chatStarted && (
          <>
            <div>
              <input
                type="text"
                value={leetcodeUrl}
                onChange={(e) => setLeetCodeUrl(e.target.value)}
                placeholder="Enter LeetCode URL"
              />
            </div>
            <div>
              <label htmlFor="checkbox">Custom Doubt ?</label>
              <input
                type="checkbox"
                onChange={(e) => SetIsCustomDoubt(e.target.checked)}
              />
            </div>
            {isCustomDoubt ? (
              <div>
                <input
                  type="text"
                  id="user-input"
                  placeholder="Type your Doubt..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="options">Select what you need:</label>
                <select
                  id="options"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="intuitions">Intuitions</option>
                  <option value="pseudocode">Pseudocode</option>
                  <option value="hints">Hints</option>
                </select>
              </div>
            )}
          </>
        )}
        {chatStarted && (
          <input
            type="text"
            id="user-input"
            placeholder="Reply ..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        )}
        <button id="send-button">Send</button>
      </form>
    </div>
  );

  function addUserMessageToHistory(question, doubt, formIT = false) {
    const message = `\"Here is the LeetCode question along with the doubt I have:\n\n${question}\n\n${doubt}\"`;
    let newHistory = history;
    newHistory.push({
      role: "user",
      parts: [{ text: formIT ? doubt : message }],
    });
    setHistory(newHistory);
    localStorage.setItem("geminiHistory", JSON.stringify(newHistory));
  }

  function addBotMessageToHistory(message) {
    let newHistory = history;
    newHistory.push({
      role: "model",
      parts: [{ text: message }],
    });
    setHistory(newHistory);
    localStorage.setItem("geminiHistory", JSON.stringify(newHistory));
  }

  function addMessage(message, isBot = false) {
    if (isBot) {
      let botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.classList.add("bot-message");

      let botMessageContent = document.createElement("pre");
      botMessageContent.innerHTML = message;
      botMessage.appendChild(botMessageContent);
      chatBox.current.appendChild(botMessage);
    } else {
      let userMessage = document.createElement("div");
      userMessage.classList.add("message");
      userMessage.classList.add("user-message");

      userMessage.innerHTML = message;
      chatBox.current.appendChild(userMessage);
    }
    window.scrollTo(0, document.body.scrollHeight);
  }
};

export default ChatBox;
