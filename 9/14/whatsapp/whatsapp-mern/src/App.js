import React, { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";

function App() {
  
  useEffect(() => {
    const pusher = new Pusher("01beb92902dbf8e263bd", {
      cluster: "us2"
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", (data) => {
      alert(JSON.stringify(data));
    });
    return () => {}
  }, [])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
