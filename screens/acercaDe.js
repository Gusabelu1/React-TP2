import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';

function AcercaDeCamara() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        alert(data);
    };

    if (hasPermission === null) {
        return <Text>Pidiendo permiso para usar la Cámara</Text>;
    }
    if (hasPermission === false) {
        return <Text>La aplicacion no tiene permiso para usar la cámara</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Volver a Escanear'} onPress={() => setScanned(false)} />}
        </View>
    );
}

export default function AcercaDeQr() {
    return (
        <View>
            <View style={styles.qr}>
                <QRCode
                    value="App desarrollada por Octavio Martinez y Santino Castro"
                />
            </View>
            <View style={styles.camara}>
                <AcercaDeCamara/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    qr: {
        alignItems: 'center',
        marginVertical: 50
    },
    
    camara: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        height: 1000,
        width: 1000
    }
});