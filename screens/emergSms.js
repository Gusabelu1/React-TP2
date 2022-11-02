import React, { useState, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import { Text, View, TouchableOpacity } from "react-native";
import { Linking, Platform  } from "react-native";
import configTelContext from "../contexts/configTelContext";
import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function handleSend(emNumber) {
    try {
      await SMS.sendSMSAsync(emNumber, "* Inserte mensaje de Emergencia *")
    } catch (e) {
      // console.error(e)
    }
}

export default function emergSms() {
  const { number, setNumber } = useContext(configTelContext);

  const configureShake = onShake => {
    Accelerometer.removeAllListeners();
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

  configureShake(acceleration => {
    handleSend(number)
    console.log("shake with acceleration " + acceleration);  
  });

  return (<></>);
}