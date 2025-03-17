import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";
import { getData } from "../api/data";
import { ExchangeDataContext } from "../ExchangeDataContext";
import { getOrders } from "../api/orders";
const tg = window.Telegram.WebApp;

// let tgConverted = JSON.parse(
//   '{"' +
//     (((window.Telegram || {}).WebApp || {}).initData || "")
//       .replace(/&/g, '","')
//       .replace(/=/g, '":"') +
//     '"}',
//   function (key, value) {
//     return key === "" ? value : decodeURIComponent(value);
//   }
// );

function Home() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language].home;
  const [showOrders, setShowOrders] = useState(false);
  const { data } = useContext(ExchangeDataContext);
  const [ordersData, setOrdersData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [tgId, setTgId] = useState(0);
  // const orders = [
  //   {
  //     from: "1 000 AED",
  //     to: "270 USDT",
  //     city: "Дубай",
  //     dateTime: "11.03.2025 11:43",
  //   },
  //   {
  //     from: "1 000 USDT",
  //     to: "3 550 AED",
  //     city: "Дубай",
  //     dateTime: "11.03.2025 11:41",
  //   },
  //   {
  //     from: "1 000 USDT",
  //     to: "3 550 AED",
  //     city: "Дубай",
  //     dateTime: "11.03.2025 11:40",
  //   },
  // ];

  const handleGetOrders = async () => {
    try {
      const res = await getOrders({ id: 692196525, page, pageSize });
      setOrdersData(res.data);
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.expand();

      // SHOW the back button
      webApp.BackButton.show();

      // OPTIONAL: handle what happens when user taps it
      const handleBackClick = () => {
        // e.g. navigate back in React
        navigate(-1);
      };

      // Register the back button click event
      webApp.onEvent("backButtonClicked", handleBackClick);

      // Cleanup on unmount
      return () => {
        webApp.offEvent("backButtonClicked", handleBackClick);
        webApp.BackButton.hide();
      };
    }
  }, [navigate]);

  useEffect(() => {
    handleGetOrders();
  }, [page, pageSize]);

  useEffect(() => {
    tg.ready();

    tg.expand();

    tg.enableClosingConfirmation();
  }, []);

  // useEffect(() => {
  //   const userId = JSON.parse(tgConverted?.user)?.id;
  //   setTgId(userId);
  // }, [JSON.parse(tgConverted?.user)?.id]);

  return (
    <Container className="text-center mt-5">
      <h1>{tgId}</h1>
      <p>{t.description}</p>

      <Row className="justify-content-center my-4">
        <Col xs={12} md={6}>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-3"
            onClick={() => navigate("/exchange")}
          >
            {t.buttonExchange}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-3"
            onClick={() => navigate("/about")}
          >
            {t.buttonAbout}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-3"
            onClick={() => navigate("/profile")}
          >
            {t.buttonProfile}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-3"
            onClick={() => navigate("/bonus")}
          >
            {t.buttonBonus}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-3"
            onClick={() => setShowOrders(!showOrders)}
            aria-controls="order-history-collapse"
            aria-expanded={showOrders}
          >
            {t.buttonOrders}
          </Button>

          <Collapse in={showOrders}>
            <div id="order-history-collapse">
              <ListGroup className="mb-3">
                {(ordersData?.orders || []).map((order, index) => (
                  <ListGroup.Item key={index}>
                    <strong>
                      {order.from_amount} {order.from_code} &nbsp;⇄&nbsp;{" "}
                      {order.to_amount} {order.to_code}
                    </strong>
                    <br />
                    {order.city_ru} — {order.time}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
