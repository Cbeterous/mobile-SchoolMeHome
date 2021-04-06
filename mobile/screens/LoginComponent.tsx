import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';
import { gql, useQuery } from '@apollo/client'
import {useMutation} from '@apollo/react-hooks'
import ProfilComponent from './ProfilComponent';
function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LOGIN = gql`
    mutation signIn($email: String!, $password: String!){
      signIn(email: $email, password: $password){
        user{
          firstName, 
          role
        }, 
        token
      }
    }`;
  console.log(email)
  console.log(password)


  const [signin, {data, loading, error }] = useMutation(LOGIN);
  
        if (loading) {console.log(loading)};
        if (error) {console.log(error)}
      if (data) {
        console.log(data.signIn);
      }


  return (
      <View style={styles.container}>
        <Text style={styles.title}>SCHOOL ME HOME</Text>
        <Image style={styles.logo} source={require('../assets/images/9c2b5bcbdf4cc85e91bb0fb5a47a8435-cute-student-illustration-by-vexels.png')} />
          <TextInput 
            style={styles.mail} 
            placeholder="Adresse mail "
            onChangeText={email => setEmail(email) }
            placeholderTextColor="black">
          </TextInput>
          <TextInput 
            style={styles.mail} 
            placeholder="Mot de passe"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}>
          </TextInput>
          <Button color="#f05454" title="Connexion" onPress={() => signin({variables: {email: email, password: password}})}  />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text>Rôle : {data && data.signIn.user.role}</Text>
        <Text>Prénom : {data && data.signIn.user.firstName}</Text>
        <Text>Token : {data && data.signIn.token}</Text>
      </View>
  );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#30475e'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  mail: {
    backgroundColor: '#d6e6f9',
    opacity: 33,
    borderWidth: 0.8,
    borderRadius : 4,
    borderColor: '#d6e6f9',
    padding: 4,
    marginTop: 4,
    width: 200,
    marginBottom: 6,
  },
  logo: {
    height: 200,
    width: 208
  },
});



export default LoginComponent;