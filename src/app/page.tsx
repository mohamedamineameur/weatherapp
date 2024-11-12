'use client';

import React, { useEffect, useState } from 'react';
import emotion from '@emotion/styled';
import { FaSearch } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import translation from './page.json';

const Container = emotion.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 40px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #4A90E2, #187BCD);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
`;

const CityNameContainer = emotion.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  margin-bottom: 20px;
`;

const CityName = emotion.h2`
  font-size: 24px;
  font-weight: normal;
  color: #fff;
`;

const SearchIcon = emotion(FaSearch)`
  color: #fff;
  font-size: 1.2rem;
`;

const CurrentWeather = emotion.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const CurrentIcon = emotion.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
`;

const Temp = emotion.div`
  font-size: 80px;
  font-weight: 200;
`;

const Description = emotion.div`
  font-size: 24px;
  text-transform: capitalize;
  margin-top: -15px;
`;

const MinMaxTemp = emotion.div`
  font-size: 18px;
  color: #e0e0e0;
  margin: 5px 0 20px 0;
`;

const HourlyForecastContainer = emotion.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 90%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  margin: 20px 0;
`;

const ForecastItem = emotion.div`
  text-align: center;
  color: white;
  min-width: 50px;
`;

const ForecastTime = emotion.div`
  font-size: 14px;
`;

const ForecastTemp = emotion.div`
  font-size: 18px;
  font-weight: bold;
`;

const WeatherIcon = emotion.img`
  width: 40px;
  height: 40px;
`;

const DailyForecastContainer = emotion.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  width: 90%;
  margin-top: 20px;
`;

const DailyForecastItem = emotion.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  &:last-of-type {
    border-bottom: none;
  }
`;

const DayLabel = emotion.div`
  font-size: 16px;
  flex: 1;
`;

const DailyTemp = emotion.div`
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

const ModalOverlay = emotion.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = emotion.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #333;
  padding-r
`;

const ModalHeader = emotion.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #4A90E2;
`;

const ModalInput = emotion.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
  margin-bottom: 20px;
  outline: none;
  text-align: center;
`;

const ModalButton = emotion.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ABD;
  }
`;

interface WeatherData {
  city: {
    name: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
  }[];
}

export default function Home() {
  const { language } = useLanguage();
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputCity, setInputCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWeatherData = async (query: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric&lang=${language}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataByLocation = async (lat: number, lon: number) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${language}`);
      const data = await response.json();
      setWeatherData(data);
      setCityName(data.city.name);
    } catch (error) {
      console.error('Error fetching weather data by location:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByLocation(latitude, longitude);
        },
        () => {
          fetchWeatherData(cityName); // Default city if location access is denied
        }
      );
    } else {
      fetchWeatherData(cityName);
    }
  }, []);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCityName(inputCity);
      fetchWeatherData(inputCity);
      setIsModalOpen(false);
    }
  };

  const getDailyForecast = () => {
    const dailyForecast: WeatherData['list'] = [];
    const seenDays = new Set();

    weatherData?.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString(language, { weekday: 'short' });

      if (!seenDays.has(day)) {
        dailyForecast.push(item);
        seenDays.add(day);
      }
    });

    return dailyForecast;
  };

  const t = translation[language as "fr" | "en"];

  return (
    <Container>
      <CityNameContainer onClick={() => setIsModalOpen(true)}>
        
        <CityName>{weatherData?.city.name || cityName}</CityName>
        <SearchIcon />
      </CityNameContainer>
      
      {loading && <div>{t.loading}</div>}
      
      {weatherData && (
        <>
          <CurrentWeather>
            <CurrentIcon
              src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
              alt={weatherData.list[0].weather[0].description}
            />
            <Temp>{Math.round(weatherData.list[0].main.temp)}°</Temp>
          </CurrentWeather>
          <Description>{weatherData.list[0].weather[0].description}</Description>
          <MinMaxTemp>
            ↑ {Math.round(weatherData.list[0].main.temp_max)}° ↓ {Math.round(weatherData.list[0].main.temp_min)}°
          </MinMaxTemp>

          <HourlyForecastContainer>
            {weatherData.list.slice(0, 5).map((item) => (
              <ForecastItem key={item.dt}>
                <ForecastTime>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}</ForecastTime>
                <WeatherIcon src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <ForecastTemp>{Math.round(item.main.temp)}°</ForecastTemp>
              </ForecastItem>
            ))}
          </HourlyForecastContainer>

          <DailyForecastContainer>
            {getDailyForecast().map((item, index) => (
              <DailyForecastItem key={index}>
                <DayLabel>{new Date(item.dt * 1000).toLocaleDateString(language, { weekday: 'short' })}</DayLabel>
                <WeatherIcon src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={item.weather[0].description} />
                <DailyTemp>
                  ↑ {Math.round(item.main.temp_max)}° ↓ {Math.round(item.main.temp_min)}°
                </DailyTemp>
              </DailyForecastItem>
            ))}
          </DailyForecastContainer>
        </>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>{t.cityChange}</ModalHeader>
            <ModalInput
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder={t.cityChange}
            />
            <ModalButton onClick={handleSearch}>{t.search}</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
