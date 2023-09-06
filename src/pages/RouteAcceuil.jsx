import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Client from './Client';
import Assistant from './Assistant';

function RouteAcceuil() {
  const [d, setD] = useState('')
  const [acc, setAcc] = useState('')

  const getRemember = async () => {
    const cookies = document.cookie.split(';');
    let userCredentials;

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

      if (name === 'userCredentials') {
        userCredentials = JSON.parse(decodeURIComponent(value));
        break;
      }
    }


    try {
      const r = await axios.post(`http://localhost:5000/remember`, {
        username: userCredentials.username,
        password: userCredentials.password,
      });

      const data = r.data[0].remember;
      const accType = r.data[0].accountType
      setD(data);
      setAcc(accType)
    } catch (error) {
      return
    }
  }


  useEffect(() => {
    getRemember();
  }, []);

  return (
    d === 0 && acc === "client" ? (<Client />) : d === 0 && acc === "assistant" ? (<Assistant />) : (<Login />)
  )
}

export default RouteAcceuil;
