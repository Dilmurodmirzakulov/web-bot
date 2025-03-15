import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";

function NavbarMenu() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          PRISM
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-light"
            onClick={toggleLanguage}
            className="me-2"
          >
            {language === "ru" ? "UZ" : "RU"}
          </Button>
          <Navbar.Toggle aria-controls="navbar-nav" />
        </div>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/exchange">
              {language === "ru" ? "Обмен валюты" : "Valyuta almashinuvi"}
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              {language === "ru" ? "О нас" : "Biz haqimizda"}
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              {language === "ru" ? "Профиль" : "Profil"}
            </Nav.Link>
            <Nav.Link as={Link} to="/bonus">
              {language === "ru" ? "Бонусная программа" : "Bonus dasturi"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
