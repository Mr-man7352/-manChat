import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior="position">
      <View>
        <View style={styles.box1}>
          <Text style={styles.text}>Welcome to my man chat</Text>
          <Image
            style={styles.img}
            source={require('../assets/manchat2.png')}
          />
        </View>

        <View style={styles.box2}>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />

          <Button mode="contained" onPress={() => {}}>
            Login
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={{textAlign: 'center'}}>Dont have an account ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: '#04344c',
    marginTop: 10,
    marginBottom: 5,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
