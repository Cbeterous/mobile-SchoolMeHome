import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, ScrollView,  StyleSheet, Platform } from 'react-native';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Avatar, Card, ListItem, Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/userContext';
import { gql, useQuery } from '@apollo/client';
import { User } from '../types';
import * as SecureStore from 'expo-secure-store';

export default function ProfilScreen({navigation} : any) {

  const [avatar, setAvatar] = useState("https://randomuser.me/api/portraits/men/75.jpg");
  const {userEmail} = useUser();
  const [user, setUser] = useState<User>();
  const GET_USER = gql`
      query findUser($email: String!){
        getOne(email : $email) {_id, firstName, lastName, email, phone, birthdate, street, zipcode, city}
      }
    `;
    
  const {data, loading, error } = useQuery(GET_USER, {variables : {email :userEmail}});
  useEffect(() => {
    // console.log('test rendu page');
    if(userEmail){
      if(data){
        setUser(data.getOne);
        // getToken(); 
      }
    }
  })

// async function  getToken(){
//     let result = await SecureStore.getItemAsync('userToken');
//   }

  const pickImage = async () => {
    (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    })();
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);
    refRBSheet.current?.close()

    if (!result.cancelled) {
        setAvatar(result.uri);
    }
  };

  const takeImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
          allowsEditing : true,
          quality: 1,
          aspect: [4,3],
      })

      console.log(result);
      refRBSheet.current?.close()

      if (!result.cancelled) {
          setAvatar(result.uri);
      }
  }

  const refRBSheet = useRef<RBSheet | null>(null);


  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/profilBG.png')} style={styles.imageBG}>
            <ScrollView >
                <Avatar containerStyle={{ alignSelf: 'center'}} rounded source={{ uri : avatar}} size='xlarge'>
                  <Avatar.Accessory name='camera' 
                    type='font-awesome-5' style={{backgroundColor: "#f05454"}} iconStyle={{fontSize: 20}} size={36} onPress={() => refRBSheet.current?.open()}/>
                </Avatar>
                <RBSheet
                  height={170}
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  customStyles={{
                    wrapper: {
                      backgroundColor: "transparent"
                    },
                    draggableIcon: {
                      backgroundColor: "#f05454"
                    },
                    container :{
                      backgroundColor: '#30475e'
                    }
                  }}
                >
                  <ListItem onPress={pickImage} containerStyle={{ backgroundColor:'#30475e' }}>
                    <ListItem.Content>
                      <ListItem.Title style={styles.whiteText}>Choisir une photo de la gallerie</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                  <ListItem onPress={takeImage} containerStyle={{ backgroundColor:'#30475e' }}>
                    <ListItem.Content>
                      <ListItem.Title style={styles.whiteText}>Prendre une photo</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </RBSheet>
                <Text style={styles.title}>{user ? user.firstName : ''} {user ? user.lastName : ''} </Text>
                <Text style={styles.promo}>L1 front React | Groupe 1</Text>
                <Card containerStyle={styles.cardBox}>
                  <Card.Title style={styles.title}>Mes informations personnelles</Card.Title>
                  <Card.Divider />
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <Entypo name="mail" size={16} color="#f05454"/>
                    <ListItem.Content><Text style={styles.whiteText}>{user ? user.email : ''}</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <FontAwesome name="phone" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>{user ? user.phone :''}</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <FontAwesome name="birthday-cake" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>{user ? user.birthdate :''}</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <Entypo name="location-pin" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>
                    {user ? user.street :'1 place des cerises'} {user ? user.zipcode : ''} {user ? user.city : ''} 
                    </Text></ListItem.Content> 
                  </ListItem>
                  <Icon 
                    iconStyle={{fontSize: 30}}
                    containerStyle={{position: 'absolute', right: -15, top : -15}}
                    name='plus-circle' 
                    type='font-awesome-5' 
                    color="#f05454"
                    onPress={() => {
                      navigation.push('EditProfil')
                    }}/>
                </Card>

                <Card containerStyle={styles.cardBox}>
                  <Card.Title style={styles.title}>Mes centres d'intérêts</Card.Title>
                  <Card.Divider/>
                </Card>

                <Card containerStyle={styles.cardBox}>
                  <Card.Title style={styles.title}>Mes notes</Card.Title>
                  <Card.Divider/>
                </Card>
            </ScrollView>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: '#30475e',
    color: '#fff',
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  imgProfil:{
      width: 100,
      height: 100,
      borderRadius: 100,
      alignSelf: 'center',
  },

  title: {
    alignSelf: 'center',
    padding: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  promo: {
    alignSelf: 'center',
    color: '#fff'
  },
  cardBox: {
    backgroundColor: '#233445',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    borderColor:'#233445',
  },
  whiteText: {
    color: '#fff'
  },
  align: {
    flex: 1,
    justifyContent: 'center',
  },
  mgBot : {
    marginBottom: 16,
  },
});