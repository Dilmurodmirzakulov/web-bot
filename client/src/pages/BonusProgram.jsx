// src/pages/BonusProgram.jsx
import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

function BonusProgram() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].bonus;

  return (
    <Container className="my-4">
      <h2>{t.title}</h2>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{t.discountTitle}</Card.Title>
          <Card.Text>{t.discountText}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>{t.statsTitle}</Card.Title>
          <Card.Text>{t.statsExchanged}</Card.Text>
          <Card.Text>{t.statsRemaining}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BonusProgram;
