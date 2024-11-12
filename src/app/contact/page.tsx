'use client'
import React from 'react';
import emotion from '@emotion/styled';
import { useLanguage } from '../LanguageProvider';
import translation from './contact.component.json';

const Container = emotion.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #4A90E2, #187BCD);
  color: white;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

const ContentBox = emotion.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  margin-top: 2rem;
`;

const Title = emotion.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  letter-spacing: 1px;
`;

const Info = emotion.p`
  font-size: 1.2rem;
  color: #d0eaff;
  margin-bottom: 0.5rem;
  text-align: left;
  line-height: 1.6;
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.5rem;
    margin-bottom: 0.8rem;
  }
`;

const Link = emotion.a`
  color: #ffffff;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 8px;
  display: inline-block;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  &:hover {
    color: #4A90E2;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ContactPage = () => {
    const { language } = useLanguage();
    const t = translation[language as "fr" | "en"]; // Sélection de la traduction en fonction de la langue

    return (
        <Container>
            <ContentBox>
                <Title>{t.title}</Title>
                <Info>{t.name}</Info>
                <Info>{t.email}</Info>
                <Info>{t.phone}</Info>
                <Link href="https://www.linkedin.com/in/ameur-mohamed-amine/?locale=en_US">{t.linkedin}</Link>
            </ContentBox>
        </Container>
    );
};

export default ContactPage;
