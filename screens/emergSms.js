import React, { useState, useEffect } from "react";
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

export default function emergSms({telNumber}) {
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

  configureShake(acceleration => {
    console.log(telNumber);
    handleSend(telNumber)
    console.log("shake with acceleration " + acceleration);    
  });

  return (<></>);
}