import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Image, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Avatar, Card, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilScreen({navigation} : any) {

  const [avatar, setAvatar] = useState("https://randomuser.me/api/portraits/men/75.jpg");

  useEffect(() => {
      (async () => {
          const img = await AsyncStorage.getItem('@profil_smh');
          if(img) setAvatar(img);
      })();
  }, []);


  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/images/profilBG.png')} style={styles.imageBG}>
            <ScrollView >
                <Avatar containerStyle={{ alignSelf: 'center'}} rounded source={{ uri : avatar}} size='xlarge'>
                  <Avatar.Accessory style={{backgroundColor: "#f05454"}} size={36} onPress={() => navigation.navigate('TakePicture')}/>
                </Avatar>
                <Text style={styles.title}>Maxime BERTHOLD</Text>
                <Text style={styles.promo}>L1 front React | Groupe 1</Text>
                <Card containerStyle={styles.cardBox}>
                  <Card.Title style={styles.title}>Mes informations personnelles</Card.Title>
                  <Card.Divider />
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <Entypo name="mail" size={16} color="#f05454"/>
                    <ListItem.Content><Text style={styles.whiteText}>m.bertold@schoolmehome.fr</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <FontAwesome name="phone" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>O1.O2.03.04.05</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <FontAwesome name="birthday-cake" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>1 janv 1990</Text></ListItem.Content> 
                  </ListItem>
                  <ListItem containerStyle={{ backgroundColor:'#233445' }}>
                    <Entypo name="location-pin" size={16} color="#f05454" />
                    <ListItem.Content><Text style={styles.whiteText}>1 place des cerises
                    99000 JARDIN</Text></ListItem.Content> 
                  </ListItem>
                  
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
  custom: {
    paddingLeft: 8,
  }
});