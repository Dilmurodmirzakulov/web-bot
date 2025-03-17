import { useState, useEffect } from "react";

export default function Home() {
  // Use state to store the Telegram user data
  const [telegramUser, setTelegramUser] = useState(null);

  useEffect(() => {
    // Define the global callback that Telegram will call after login
    window.handleTelegramResponse = function (user) {
      console.log("Telegram user:", user);
      setTelegramUser(user);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login with Telegram</h1>
      {/* Telegram login widget */}
      <script
        async
        src="https://telegram.org/js/telegram-widget.js?7"
        data-telegram-login="YourBotUsername" // Replace with your bot username
        data-size="large"
        data-userpic="false"
        data-request-access="write"
        data-onauth="handleTelegramResponse"
      ></script>

      {/* Display the Telegram ID if available */}
      {telegramUser && (
        <div style={{ marginTop: "20px", fontSize: "1.2em" }}>
          Telegram ID: {telegramUser.id}
        </div>
      )}
    </div>
  );
}
