import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Contacto({ data }) {
    let numeros = []

    return (
        <View style={styles.container}>
            <Text key={data.id}>{data.firstName} {data.lastName}</Text>
            {
                data.phoneNumbers && data.phoneNumbers.map((item) => {
                    if(!numeros.some((element) => item.number === element)) {
                        numeros.push(item.number)
                        return (
                            <Text key={item.id}>{item.number}</Text>
                        )
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