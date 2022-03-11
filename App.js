import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Icon, Header, Overlay }  from 'react-native-elements';

const App = () => {
  const [visible,setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  }

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="email"
            color="#f50"
            type="entypo"
            onPress={()=> alert('open sidedrawer')}
          />
        }
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Text>Hello</Text>
      <Icon
        name="rowing"
      />

        <Button title="open overlay" onPress={toggleOverlay}/>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from overlay</Text>
      </Overlay>
      <Icon
          raised
          name='heartbeat'
          type='font-awesome'
          color='#f50'
          onPress={() => console.log('hello')} />
    </View>
  );
}

export default App;