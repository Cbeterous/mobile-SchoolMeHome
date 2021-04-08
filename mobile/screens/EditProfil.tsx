import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useReducer, useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Pressable } from "react-native";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useUser } from '../context/userContext';
import { User } from '../types';
import { TextInputMask } from 'react-native-masked-text'

const initialUser = {
    _id : '',
    firstName : '',
    lastName :'',
    email : '',
    phone : '',
    birthdate : '',
    street : '',
    zipcode : '',
    city : '',
}
const reducer = (state : User, action : any) => {
    switch (action.type){
        case 'init':
            console.log(action.user)
            return {...state, ...action.user};
        case 'name':
            return {...state, lastName : action.value}
        case 'firstname':
            return {...state, firstName : action.value}
        case 'phone':
            return {...state, phone : action.value}
        case 'birth':
            return {...state, birthdate : action.value}
        case 'street':
            return {...state, street : action.value}
        case 'zip':
            return {...state, zipcode : action.value}
        case 'city':
            return {...state, city : action.value}
        default:
            return state;
    }
}

export default function EditProfil({navigation}: any){
    const {userEmail} = useUser();
    const [state, dispatch] = useReducer(reducer, initialUser);
    const GET_USER = gql`
    query findUser($email: String!){
        getOne(email : $email) {_id, firstName, lastName, email, phone, birthdate, street, zipcode, city}
    }
    `;
    
    const {data, loading, error, refetch } = useQuery(GET_USER, {variables : {email :userEmail}});
    useEffect(() => {
        if(userEmail){
        if(data){
            dispatch({type: 'init', user : data.getOne});
        }
        }
    }, [userEmail, data])

    const UPADTE_USER = gql`
    mutation updateUser($data: UserInput!){
        update(data : $data) {_id, firstName, lastName, email, phone, birthdate, street, zipcode, city}
    }
    `;
    const [updateUser] = useMutation(UPADTE_USER);

    const submit = () => {
        
        console.log(state);
        updateUser({variables : {data : {...state, __typename : undefined}}})
            .then(() => navigation.push('ProfilScreen'))
            .catch(e => console.log(JSON.stringify(e, null, 4)))    
    }

    const [show, setShow] = useState(false);

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text>Nom :</Text>
                <TextInput value={state.lastName} onChangeText={value => dispatch({type: 'name', value : value})}/>
                <Text>Prénom :</Text>
                <TextInput value={state.firsName} onChangeText={value => dispatch({type: 'firstname', value : value})}/>
                <Text>Téléphone :</Text>
                <TextInput value={state.phone} onChangeText={value => dispatch({type: 'phone', value : value})}/>
                <Text>Date d'anniversaire :</Text>
                <TextInputMask type={'datetime'} options={{format: 'DD/MM/YYYY'}} value={state.birthdate} onChangeText={value => {dispatch({type: 'birth', value : value})}}></TextInputMask>
                <Text>Rue :</Text>
                <TextInput value={state.street} onChangeText={value => dispatch({type: 'street', value : value})}/>
                <Text>Code postal :</Text>
                <TextInput value={state.zipcode} onChangeText={value => dispatch({type: 'zip', value : value})}/>
                <Text>Ville :</Text>
                <TextInput value={state.city} onChangeText={value => dispatch({type: 'city', value : value})}/>
                <Button title='Enregistrer' color="#f05454" onPress={submit}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        backgroundColor: '#30475e',
        color: '#fff',
    },
});