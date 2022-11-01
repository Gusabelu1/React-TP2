import React, { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import { Text, View, TouchableOpacity } from "react-native";
import { Linking, Platform  } from "react-native";
import configTelContext from "../contexts/configTelContext";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function handleSend(emNumber) {
    try {
      SMS.sendSMSAsync(emNumber, "* Inserte mensaje de Emergencia *")
    } catch (e) {
      // console.error(e)
    }
}

export default function emergSms() {
  const [number, setNumber] = useState()

  const configureShake = onShake => {
    Accelerometer.setUpdateInterval(100);
    
    const onUpdate = ({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      const sensibility = 2.0;
      if (acceleration >= sensibility) {
        onShake(acceleration);
      }
    };
    
    Accelerometer.addListener(onUpdate);
  };
  
  const getData = async () => {
    try {
      setNumber(null)
      const value = await AsyncStorage.getItem('tel_number')
      if(value !== null) {
        await setNumber(value)
      }
    } catch(e) {
      console.log(e)
    }
  }

  configureShake(acceleration => {
    getData()
    setTimeout(() => {
      handleSend(number)
    }, 500)
    console.log("shake with acceleration " + acceleration);    
  });
}