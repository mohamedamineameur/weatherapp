'use client'
import React from 'react';
import emotion from '@emotion/styled';
import { useLanguage } from '../LanguageProvider';
import translation from './about.component.json';

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
    padding: 2.5rem;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 700px;
    width: 100%;
    margin-top: 2rem;
`;

const Title = emotion.h1`
    font-size: 2.5rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
    letter-spacing: 1px;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

const Paragraph = emotion.p`
    font-size: 1.2rem;
    color: #d0eaff;
    text-align: justify;
    line-height: 1.8;
    max-width: 600px;
    text-indent: 2rem;
    margin: 0 auto;
`;

const AboutPage = () => {
    const { language } = useLanguage();
    const t = translation[language as "fr" | "en"]; // Sélection de la traduction en fonction de la langue

    return (
        <Container>
            <ContentBox>
                <Title>{t.title}</Title>
                <Paragraph>{t.paragraph}</Paragraph>
            </ContentBox>
        </Container>
    );
};

export default AboutPage;
