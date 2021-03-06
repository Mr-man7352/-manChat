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
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <ActivityIndicator size="large" color="#3c1f61" />;
  }
  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !image || !name) {
      alert('please add all the field');
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        pic: image,
        status: 'online',
        password: password,
      });
      setLoading(false);
    } catch (err) {
      alert(err.message, 5000);
      setLoading(false);
    }
  };

  const pickImageAndUpload = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(fileobj.uri);

      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert('image uploaded');
        },
        error => {
          alert('error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
          });
        },
      );
    });
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome to my man chat</Text>
        <Image style={styles.img} source={require('../assets/manchat2.png')} />
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
            />

            <Button
              icon="camera"
              mode="contained"
              onPress={() => pickImageAndUpload()}>
              Select Profile Pic
            </Button>
            <Button
              mode="contained"
              disabled={image ? false : true}
              onPress={() => userSignup()}>
              Signup
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => setShowNext(true)}>
            Next
          </Button>
        )}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{textAlign: 'center'}}>Already have an account ?</Text>
        </TouchableOpacity>
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
