import React from 'react';
import emotion from '@emotion/styled';
import { useLanguage } from '../../LanguageProvider';
import translation from './footer.component.json';

const Footer = emotion.footer`
  background: linear-gradient(135deg, #444, #222);
  color: #f1f1f1;
  padding: 30px 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-size: 0.9em;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Nav = emotion.nav`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;

const NavLink = emotion.a`
  color: #f1f1f1;
  margin: 0 10px;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 2px;
    background-color: #f1f1f1;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #a9a9a9;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

const FooterText = emotion.p`
  margin: 5px 0;
  color: #d0d0d0;
  font-size: 1em;
`;

export default function FooterComponent() {
    const { language } = useLanguage();
    const t = translation[language as "fr" | "en"];

    return (
        <Footer>
            <FooterText>{t.about}</FooterText>
            <FooterText>{t.copyright.text} {t.copyright.year}</FooterText>
            <Nav>
                <NavLink href="/contact">{t.contact}</NavLink>
            </Nav>
        </Footer>
    );
}
