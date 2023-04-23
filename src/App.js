import React, { useEffect } from 'react';
import './App.css';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useState } from 'react';
import cities from './city.list.json';

function App() {
  const login = () => {
    signInAnonymously(getAuth()).then(usuario => console.log
      (usuario));
  }

  const activarMensajes = async () => {
    const token = await getToken(messaging, {
      vapidKey: "BHFi9l8i7o2x9IHmRU-6rOxcOfiUkCEY6_cqfsa8loG2sDkw_WbCXcGuDGiHPXZrYupwqqEhhDS3BcOZXm18laA"
    }).catch(error => console.log("error al generar el token paps"));
    if (token) console.log("Este es tu token: " + token);
    if (!token) console.log("No tienes token paps");
  }

  const [CitiesData, setCitiesData] = useState(0);
  const [Data, setData] = useState([]);
  const getData = async () => {
    const city = cities[CitiesData].name;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7e19e7c3d91c685e79c56b6f9d75ffb&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return { city, temperature: data.main.temp, feels_like: data.main.feels_like, humidity: data.main.humidity, pressure: data.main.pressure, wind: data.wind.speed, clouds: data.clouds.all, visibility: data.visibility };
  };

  const DataSyncShow = async () => { 
    const newData = await getData();
    setData([...Data, newData]); 
    setCitiesData(CitiesData + 1);
  };

  useEffect(() => {
    onMessage(messaging, message => {
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    });
    DataSyncShow();
  }, [CitiesData]);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <a className="navbar-brand" href="#">Mi App De Clima</a>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <button className="btn btn-outline-light my-2 my-sm-0 m-2" onClick={login}>Ingresar</button>
          <button className="btn btn-outline-light my-2 my-sm-0 m-2" onClick={activarMensajes}>Notificaciones</button>
          <button className="btn btn-outline-light my-2 my-sm-0" onClick={DataSyncShow}>Generar</button>
        </div>
      </nav>
      <ToastContainer />
      <div className="p-2 mb-4 bg-light rounded-3">
        <div className="container-fluid">
          <div className="row">
            {Data.map(({ city, temperature, feels_like, humidity, pressure, wind, clouds, visibility }, i) => (
              <div className='col-sm-4' key={i}>
                <div className="w3-card-4 w3-center">
                  <header className="w3-container w3-blue text-center">
                    <h1>{city}</h1>
                  </header>
                  <img className="card-img-top p-2 mx-auto" src="https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg" />
                  <div className="w3-container text-center">
                    <div className="column">
                      <ul>
                        <h6>Temperatura: {temperature} °C</h6>
                        <h6>Sensacion termica: {feels_like} °C</h6>
                        <h6>Humedad: {humidity} %</h6>
                        <h6>Presion: {pressure} hPa</h6>
                        <h6>Viento: {wind} m/s</h6>
                        <h6>Nubes: {clouds} %</h6>
                        <h6>Visibilidad: {visibility} m</h6>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

isPushNotificationSupported();

export default App;
