import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { FlatList, Button, View, Text } from 'react-native';
import Contacto from '../components/contacto';

function requestPermission() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        return {status, data}
      }
    })();
  }, []);
}

export default function Contactos() {
    const [contactos, setContactos] = useState([])
    const [permissionGranted, setPermissionGranted] = useState(false)
    const renderItem = ({ item }) => (
        <Contacto data={item} />
    )
    
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === 'granted') {
          setPermissionGranted(true)

          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          setContactos(data);
        } else {
          setPermissionGranted(false)
        }
      })();
    }, []);

    return (
      <View>
        { permissionGranted ?
          <FlatList
              data={contactos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        :
          <View>
              <Text>La aplicación no tiene permiso para ver los contactos</Text>
          </View>
        }
      </View>
    )
}