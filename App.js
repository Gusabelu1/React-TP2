import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Contactos from './screens/contactos';
import AcercaDe from './screens/acercaDe';
import HoraTemp from './screens/horaTemp';
import ConfigTel from './screens/configTel';
import EmergSms from './screens/emergSms';
import configTelContext from './contexts/configTelContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const [number, setNumber] = useState(null)

  const getData = async () => {
    try {
      setNumber(null)
      const value = await AsyncStorage.getItem('tel_number')
      if(value !== null) {
        setNumber(value)
      }
    } catch(e) {
        console.log(e)
    }
  }

  useEffect(() => {
    (async () => {
      getData()
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Contactos"
        onPress={() => navigation.navigate('Contactos')}
      />
      <Button
        title="Hora y Temperatura"
        onPress={() => navigation.navigate('Hora y Temperatura')}
      />
      <Button
        title="Tel. Emergencia"
        onPress={() => navigation.navigate('Teléfono de Emergencia')}
      />
      <Button
        title="Acerca De"
        onPress={() => navigation.navigate('Acerca De')}
      />
      { 
        number ?
          <EmergSms />
        :
          null 
      }
    </View>
  );
}

function ContactosScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <Contactos/>
    </View>
  );
}

function AcercaDeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <AcercaDe/>
    </View>
  );
}

function HoraTempScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <HoraTemp/>
    </View>
  );
}

function ConfigTelScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
      <ConfigTel />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Contactos" component={ContactosScreen} />
          <Stack.Screen name="Hora y Temperatura" component={HoraTempScreen} />
          <Stack.Screen name="Teléfono de Emergencia" component={ConfigTelScreen} />
          <Stack.Screen name="Acerca De" component={AcercaDeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
