import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Image,Button } from 'react-native';


export default function ShowPicture ({navigation} : any) {

    const [img, setImg] = useState<string>('');

    useEffect(() => {
        (async () => {
            const picture = await AsyncStorage.getItem('@picture_smh') as string;
            setImg(picture);
        })();
    }, []);

    const ok = () => {
        ( async () => {
            try {
                await AsyncStorage.setItem('@profil_smh', img);
                navigation.push('ProfilScreen');
            } catch (e) {
                console.log(e);
            }
        })();
    }

    const no = async () => {
        try {
            await AsyncStorage.removeItem('@picture_smh');
        } catch(e) {
            console.log(e);
        }
        console.log('Done remove.')
        navigation.navigate('TakePicture')
    }

    return (
        <View style={{ flex: 1}}>
            <Image source={{uri : img}} style={{ height: 400}}></Image>
            <Button title="Choisir cette photo" color="#f05454" onPress={ok}></Button>
            <Button title="Supprimer" color="#f05454" onPress={no}></Button>
        </View>
    )
}