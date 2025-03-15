// src/pages/About.jsx
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";

function About() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].about;

  return (
    <Container className="my-4">
      <h2>{t.title}</h2>
      <p>{t.text1}</p>
      <p>{t.text2}</p>
      <p>{t.text3}</p>
    </Container>
  );
}

export default About;
