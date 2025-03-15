// src/pages/Profile.jsx
import React, { useContext, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { LanguageContext } from "../LanguageContext";
import { translations } from "../translations";
import { getProfile } from "../api/profile";
import { ProfileContext } from "../ProfileContext";

function Profile() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].profile;
  const { profile, setProfile } = useContext(ProfileContext);
  const handleGetProfile = async () => {
    try {
      const res = await getProfile("692196525");
      setProfile(res?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <Container className="my-4">
      <h2>{t.title}</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{t.labelName}</Form.Label>
          <Form.Control type="text" value={profile?.name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelTelegramId}</Form.Label>
          <Form.Control type="text" value="" readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelTelegramUsername}</Form.Label>
          <Form.Control type="text" value={profile?.username} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelPhone}</Form.Label>
          <Form.Control type="tel" value={profile?.phone} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{t.labelDiscount}</Form.Label>
          <Form.Control type="text" readOnly />
        </Form.Group>

        <Button variant="success" type="submit">
          {t.buttonSave}
        </Button>
      </Form>
    </Container>
  );
}

export default Profile;
