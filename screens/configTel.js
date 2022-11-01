import React, { useState, useRef, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import configTelContext from "../contexts/configTelContext";

export default function ConfigTel() {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [telGuardado, setTelGuardado] = useState(null);
    const { number, setNumber } = useContext(configTelContext)
    const phoneInput = useRef<PhoneInput>(null);

    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('tel_number', value)
        setNumber(value)
      } catch (e) {
        console.log(e)
      }
    }
    
    return (
      <>
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            <Text style={{textAlign: "center", paddingVertical: 20}}>{number}</Text>
            <PhoneInput
              ref={useRef(phoneInput)}
              value={telGuardado}
              defaultCode="AR"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withShadow
              autoFocus
            />
            <Button
              title="Guardar"
              onPress={(async() => await storeData(formattedValue))}
            />
          </SafeAreaView>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
});