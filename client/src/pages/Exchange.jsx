// src/pages/Exchange.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";
import { ExchangeDataContext } from "../ExchangeDataContext";
import { getRate } from "../api/getRate";
import { createOrder } from "../api/order";
import { useNavigate } from "react-router-dom";

function Exchange() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].exchange;
  const navigate = useNavigate();
  // Form state for numeric and text fields
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("2025-03-14");
  const [time, setTime] = useState("13 мар в 8:00 - 11:00");
  const { data } = useContext(ExchangeDataContext);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [rateData, setRateData] = useState(null);
  const [errors, setErrors] = useState({});
  // Static time slots if needed for selection
  const timeSlots = [
    "13 мар в 8:00 - 11:00",
    "13 мар в 11:00 - 14:00",
    "13 мар в 14:00 - 17:00",
    "13 мар в 17:00 - 20:00",
    "13 мар в 20:00 - 23:00",
    "14 мар в 8:00 - 11:00",
    "14 мар в 11:00 - 14:00",
    "14 мар в 14:00 - 17:00",
    "14 мар в 17:00 - 20:00",
    "14 мар в 20:00 - 23:00",
  ];

  // Get the selected city object based on the selectedCityId
  const selectedCity = data?.cities?.find(
    (city) => city.city_id.toString() === selectedCityId
  );

  // Extract currency options from selected city's exchanges.
  // from_currency options
  const fromCurrencies =
    selectedCity?.exchanges?.map((ex) => ex.from_currency) || [];
  // to_currency options
  const toCurrencies =
    selectedCity?.exchanges?.map((ex) => ex.to_currency) || [];

  // Deduplicate currencies by ID using a Map
  const uniqueFromCurrencies = Array.from(
    new Map(fromCurrencies.map((item) => [item.id, item])).values()
  );
  const uniqueToCurrencies = Array.from(
    new Map(toCurrencies.map((item) => [item.id, item])).values()
  );

  const handleGetRate = async () => {
    if (!fromCurrency || !toCurrency) return;
    try {
      const res = await getRate({
        id: "692196525",
        from: fromCurrency,
        to: toCurrency,
        city: selectedCityId,
        amount: parseFloat(fromAmount),
      });
      setRateData(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (rateData) setToAmount(fromAmount * rateData.rate);
  }, [fromAmount]);

  useEffect(() => {
    handleGetRate();
  }, [fromCurrency, toCurrency, selectedCityId, fromAmount]);

  // When the selected city changes, reset currency selections
  useEffect(() => {
    if (selectedCity) {
      if (uniqueFromCurrencies.length > 0)
        setFromCurrency(uniqueFromCurrencies[0].id.toString());
      if (uniqueToCurrencies.length > 0)
        setToCurrency(uniqueToCurrencies[0].id.toString());
    }
  }, [selectedCity]);

  // Handle form submission by sending a POST request with the JSON body
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    // Assemble the request body.
    // Replace telegram_id (currently 0) with the real user's Telegram ID when available.
    const requestBody = {
      telegram_id: "692196525",
      from_amount: parseFloat(fromAmount),
      to_amount: parseFloat(toAmount),
      from_currency: parseInt(fromCurrency),
      city: parseInt(selectedCityId),
      to_currency: parseInt(toCurrency),
      address: address,
      comment: comment,
      date: date,
      time: time,
      language: language,
    };

    try {
      await createOrder(requestBody);
      setFromAmount(0);
      setAddress("");
      setComment("");
      setDate("2025-03-14");
      setTime("13 мар в 8:00 - 11:00");
      alert("Обмен успешно создан! / Exchange was successful!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("Произошла ошибка при создании обмена. / An error occurred.");
      }
    }
  };

  useEffect(() => {
    if (data?.cities?.length > 0 && !selectedCityId) {
      // Pick the first city as default
      setSelectedCityId(data.cities[0].city_id.toString());
    }
  }, [data, selectedCityId]);

  // console.log("data", data);
  console.log("selectedCity", selectedCity);
  console.log("fromCurrency", fromCurrency);
  console.log("toCurrency", toCurrency);
  console.log("fromAmount", fromAmount);

  return (
    <Container className="my-4">
      <h2>{t.title}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Label>{t.labelGive}</Form.Label>
            <Form.Select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {uniqueFromCurrencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {language === "ru" ? currency.name_ru : currency.name_uz}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6}>
            <Form.Label>{t.labelReceive}</Form.Label>
            <Form.Select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {uniqueToCurrencies.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {language === "ru" ? currency.name_ru : currency.name_uz}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelCity}</Form.Label>
          <Form.Select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            <option value="" disabled>
              -- Выберите город --
            </option>
            {data?.cities?.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {language === "ru" ? city.name_ru : city.name_uz}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelDateTime}</Form.Label>
          <Form.Select value={time} onChange={(e) => setTime(e.target.value)}>
            <option hidden>{t.labelDateTimeOption}</option>
            {timeSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">{t.workingHours}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelAddress}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t.placeholderAddress}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <div className="text-danger">{errors.address.join(", ")}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Комментарий</Form.Label>
          <Form.Control
            type="text"
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {errors.comment && (
            <div className="text-danger">{errors.comment.join(", ")}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Сумма (отдаете)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите сумму"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Сумма (получаете)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите сумму"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
          />
          <Form.Text className="text-muted">
            {translations[language].bonus.discountTitle} {rateData?.discount}%
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {t.buttonSubmit}
        </Button>
      </Form>
    </Container>
  );
}

export default Exchange;
