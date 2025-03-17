import React, { useState, useEffect } from "react";

function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if the Telegram WebApp object is available
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      // Signal that the web app is ready to be displayed
      webApp.ready();
      // Access user data from initDataUnsafe
      const user = webApp.initDataUnsafe?.user;
      if (user && user.id) {
        setUserId(user.id);
      } else {
        console.error("No user data available");
      }
    } else {
      console.error("Telegram WebApp not available");
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {userId ? (
        <h1>User ID: {userId}</h1>
      ) : (
        <p>Please open this app from Telegram.</p>
      )}
    </div>
  );
}

export default Home;
