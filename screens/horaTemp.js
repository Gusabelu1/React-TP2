import React, {useEffect, useState} from "react";
import { Text, View, StyleSheet, Button, RefreshControl } from "react-native";
import * as Location from 'expo-location';
import axios from "axios";
import moment from "moment";
require('moment/locale/es-mx');

async function GetWeather(location) {
    const API_KEY = "0e54bad46d4fb603caa6dbe45db4c31d"
    const url = "https://api.openweathermap.org/data/2.5/weather"

    moment.locale("es-mx")

    return await axios.get(url, {
        params: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            lang: 'es',
            units: 'metric',
            appid: API_KEY
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return console.log(error)
    });
}

export default function HoraTemp() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weather, setWeather] = useState();
    const [permissionGranted, setPermissionGranted] = useState(false)
  
    moment.locale("es-mx")
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            setPermissionGranted(true)

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } else {
            setPermissionGranted(false)
        }
  
      })();
    }, []);
  
    useEffect(() => {
        (async () => {
            let text = 'Waiting..';
            if (errorMsg) {
                text = errorMsg;
                return null
            } else if (location) {
                GetWeather(location).then(response => {setWeather(response)})
            }
        })();
    }, [location]);

    return (
        <View>
            { permissionGranted ?
                <View style={styles.container}>
                    <Text style={{textTransform: 'capitalize'}}>{moment().format('LLLL')}hs</Text>
                    {
                        weather && weather ? (
                            <>
                                <Text>{weather.name}, {weather.sys && weather.sys.country}</Text>
                                <Text style={{textTransform: 'capitalize'}}>{weather.weather && weather.weather[0].description}</Text>
                                <Text>Temp.: {weather.main && Math.round(weather.main.temp)}C°, Temp. Min: {weather.main && Math.round(weather.main.temp_min)}C°, Temp. Max: {weather.main && Math.round(weather.main.temp_max)}C°</Text>
                                <Text>Sensación Térmica: {weather.main && Math.round(weather.main.feels_like)}C°</Text>
                            </>
                        )
                        :
                            <Text>Obteniendo Temperatura...</Text>
                    }
                </View>
            :
                <View>
                    <Text>La aplicación no tiene permiso para usar la ubicación</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: 10000
    },
});