import { useEffect, useState } from "react";

const tg = window.Telegram.WebApp;

let tgConverted = JSON.parse(
  '{"' +
    (((window.Telegram || {}).WebApp || {}).initData || "")
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}',
  function (key, value) {
    return key === "" ? value : decodeURIComponent(value);
  }
);
// let tgConverted = {};

function Home() {
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    tg.ready();

    tg.expand();

    tg.enableClosingConfirmation();
  }, []);

  useEffect(() => {
    setUserId(JSON.parse(tgConverted?.user)?.id);
  }, [JSON.parse(tgConverted?.user)?.id]);

  return (
    <>
      <div className="App">
        <h1>{userId}</h1>
      </div>
    </>
  );
}
export default Home;
