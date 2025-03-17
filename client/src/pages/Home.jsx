import React, { useEffect, useState } from "react";

function HomePage() {
  const [telegramId, setTelegramId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check that Telegram Web App API is available
    if (window.Telegram == null || window.Telegram.WebApp == null) {
      setError(
        "Telegram WebApp API not found. Please open this page in Telegram."
      );
      return;
    }

    try {
      // Initialize the Telegram Web App (tell Telegram we are ready)
      window.Telegram.WebApp.ready();

      // Get user data from Telegram Web App init data
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user && user.id) {
        setTelegramId(user.id); // Save the Telegram user ID to state
      } else {
        setError("Telegram user data not available.");
      }
    } catch (err) {
      console.error("Telegram WebApp init error:", err);
      setError("Error retrieving Telegram user data.");
    }
  }, []); // Empty dependency array -> runs once on component mount

  return (
    <div>
      <h1>Home Page</h1>
      {telegramId ? (
        <p>
          Your Telegram ID: <strong>{telegramId}</strong>
        </p>
      ) : (
        // Show an error or loading message if ID is not available
        <p>{error ? error : "Loading Telegram data..."}</p>
      )}
    </div>
  );
}

export default HomePage;
