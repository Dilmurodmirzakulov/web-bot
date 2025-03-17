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
    console.log("Telegram User ID:", window.Telegram.WebApp.initDataUnsafe);

    setUserId(id);
  }, []);

  return (
    <>
      <div>
        <h1>testtttt user id{userId}</h1>
      </div>
    </>
  );
}
export default Home;
