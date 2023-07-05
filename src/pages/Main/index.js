import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios'
import './main.css';

function Main() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const getWeather = async (lat, long) => {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }  
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
  
  if (location == false) {
    return (
      <div className='center'>
        Você precisa habilitar a localização no browser!!!
      </div>
    )
  } else if (weather == false) {
    return (
      <div className='center'>
        Carregando o clima...
      </div>
    )
  } else {
    return (
      <div className='center'>
        <h2>Clima nas suas Coordenadas: {weather['weather'][0]['description']}</h2>
        <ul className="lista">
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade: {weather['main']['humidity']}%</li>
        </ul>
      </div>
    );
  }
}

export default Main;
