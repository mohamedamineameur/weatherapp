// HeaderComponent.tsx
import React from 'react';
import emotion from '@emotion/styled';
import { useLanguage } from '../../LanguageProvider';
import translation from './header.component.json';

const Header = emotion.header`
  background: linear-gradient(135deg, #3b5998, #8b9dc3);
  color: #fff;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const Title = emotion.h1`
  font-size: 2em;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Nav = emotion.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const NavLink = emotion.a`
  color: #ffffff;
  font-size: 1em;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.15);
    &::before {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  &:last-of-type {
    border: 1px solid #ffffff;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: #ffffff;
    color: #3b5998;
    font-weight: bold;
    &:hover {
      background-color: #dfe3ee;
    }
  }
`;

export default function HeaderComponent() {
    const { language, toggleLanguage } = useLanguage();
    const t = translation[language as "fr" | "en"];

    return (
        <Header>
            <Title>{t.title}</Title>
            <Nav>
                <NavLink href="/">{t.home}</NavLink>
                <NavLink href="/about">{t.about}</NavLink>
                <NavLink onClick={() => toggleLanguage(language === "fr" ? "en" : "fr")}>
                    {language === "fr" ? "English" : "Français"}
                </NavLink>
            </Nav>
        </Header>
    );
}
