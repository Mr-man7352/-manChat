import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  if (loading) {
    return <ActivityIndicator size="large" color="#3c1f61" />;
  }
  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert('please add all the field');
      return;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (err) {
      alert(err.message, 5000);
      setLoading(false);
    }
  };

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

          <Button mode="contained" onPress={() => userLogin()}>
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
