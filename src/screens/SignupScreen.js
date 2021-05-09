import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);

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
          {!showNext && (
            <>
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
            </>
          )}

          {showNext ? (
            <>
              <TextInput
                label="Name"
                mode="outlined"
                value={name}
                onChangeText={text => setName(text)}
                secureTextEntry={true}
              />

              <Button icon="camera" mode="contained" onPress={() => {}}>
                Select Profile Pic
              </Button>
              <Button mode="contained" onPress={() => {}}>
                Signup
              </Button>
            </>
          ) : (
            <Button mode="contained" onPress={() => setShowNext(true)}>
              Next
            </Button>
          )}
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
