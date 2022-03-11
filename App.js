import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';

import Picker from './src/picker';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true;
      } else {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
          ],
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        );
        return (
          granted['android.permission.WRITE_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getContacts = () => {
    requestPermission().then(didGetPermission => {
      if (didGetPermission) {
        Contacts.getAll().then(contacts => {
          setContacts(contacts);
          console.log(contacts);
        });
      }
    });
  };

  const addContact = () => {
    requestPermission().then(didGetPermission => {
      if (didGetPermission) {
        const newContact = {
          familyName: 'Steve',
          givenName: 'Jones',
        };
        Contacts.addContact(newContact).then(() => {
          getContacts();
        });
      }
    });
  };

  const openContact = () => {
    requestPermission().then(didGetPermission => {
      if (didGetPermission) {
        Contacts.openContactForm().then(contacts  => {
          getContacts(contacts);
        });
      }
    });
  };

  return (
    <View style={{marginTop: 50}}>
      <Button title="get contacts" onPress={() => getContacts()} />
      <Button title="add contacts" onPress={() => addContact()} />
      <Button title="open contacts" onPress={() => openContact()} />
      {contacts.map(item => (
        <View
          key={item.recordID}
          style={{
            padding: 10,
            borderBottomColor: 'red',
            borderBottomWidth: 1,
          }}>
          <Text>Name:{item.familyName}</Text>
          <Text>Name:{item.displayName}</Text>
          <Text>
            Email:{item.emailAddresses[0] ? item.emailAddresses[0].email : null}
          </Text>
          <Text>
            PhoneNumber:{item.phoneNumbers[0] ? item.phoneNumbers[0].number : null}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default App;
