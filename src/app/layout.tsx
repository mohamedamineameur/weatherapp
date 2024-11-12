'use client'
import {LanguageProvider} from "./LanguageProvider";
import FooterComponent from "./components/footer/footer.component";
import HeaderComponent from "./components/header/header.component";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  >
      <body >
        <LanguageProvider>
          <HeaderComponent />
        {children}
          <FooterComponent />
        </LanguageProvider>
      </body>
    </html>
  );
}
