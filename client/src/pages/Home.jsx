import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

function Home() {
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    tg.ready();

    tg.expand();

    tg.enableClosingConfirmation();
  }, []);

  useEffect(() => {
    const id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
    console.log("Telegram User ID:", userId);

    setUserId(id);
  }, []);

  return (
    <>
      <div className="App">
        <h1>{userId}</h1>
      </div>
    </>
  );
}
export default Home;
