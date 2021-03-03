import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function TakePicture () {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const camera = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Camera not found</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const snap = async () => {
        if (camera.current) {
            try {
            let photo = await camera.current.takePictureAsync();
            console.log(photo);
            // console.log(
            //     await ImageManipulator.manipulateAsync(photo.uri, [
            //       { resize: { height: 400 } },
            //     ])
            //   );
            } catch (err) {
            console.log(err);
            }
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prendre une nouvelle photo de profil</Text>
            <Camera style={styles.camera} type={type} ref={camera}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <MaterialIcons name="camera-front" size={40} color="#f05454" />
                </TouchableOpacity>
                <TouchableOpacity onPress={snap}>
                    <MaterialIcons name="camera-enhance" size={40} color="#f05454" />
                </TouchableOpacity>
                
            </View>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30475e',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});