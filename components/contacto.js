import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Contacto({ data, emNumber }) {
    let numeros = []

    return (
        <View style={styles.container}>
            {
                data.phoneNumbers && data.phoneNumbers.map((item) => {
                    if(!numeros.some((element) => item.number === element)) {
                        numeros.push(item.number)
                        if (item.number === emNumber) {
                            return (
                                <>
                                    <Text key={item.id} style={{color: 'green'}}>{data.firstName} {data.lastName} (Emergencia)</Text>
                                    <Text style={{color: 'green'}}>{item.number}</Text>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <Text key={item.id}>{data.firstName} {data.lastName}</Text>
                                    <Text>{item.number}</Text>
                                </>
                            )
                        }
                    }
                })
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
    },
});