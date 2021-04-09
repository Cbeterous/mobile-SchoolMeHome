import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useReducer, useState} from 'react';
import { Text, View, StyleSheet} from "react-native";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useUser } from '../context/userContext';
import { User } from '../types';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from 'react-native-elements';

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
        
        updateUser({variables : {data : {...state, __typename : undefined}}})
            .then(() => navigation.push('ProfilScreen'))
            .catch(e => console.log(JSON.stringify(e, null, 4)))    
    }

    const [show, setShow] = useState(false);

    return(
        <View style={styles.container}>
            <ScrollView style={styles.view}>
                <Text style={styles.label}>Nom :</Text>
                <TextInput  style={styles.input} value={state.lastName} onChangeText={value => dispatch({type: 'name', value : value})}/>
                <Text style={styles.label}>Prénom :</Text>
                <TextInput style={styles.input} value={state.firstName} onChangeText={value => dispatch({type: 'firstname', value : value})}/>
                <Text style={styles.label}>Téléphone :</Text>
                <TextInputMask style={styles.input} type={'custom'} options={{mask: '99.99.99.99.99'}} value={state.phone} onChangeText={value => dispatch({type: 'phone', value : value})}></TextInputMask>
                <Text style={styles.label}>Date d'anniversaire :</Text>
                <TextInputMask style={styles.input} type={'datetime'} options={{format: 'DD/MM/YYYY'}} value={state.birthdate} onChangeText={value => {dispatch({type: 'birth', value : value})}}></TextInputMask>
                <Text style={styles.label}>Rue :</Text>
                <TextInput style={styles.input} value={state.street} onChangeText={value => dispatch({type: 'street', value : value})}/>
                <Text style={styles.label}>Code postal :</Text>
                <TextInput style={styles.input} value={state.zipcode} onChangeText={value => dispatch({type: 'zip', value : value})}/>
                <Text style={styles.label}>Ville :</Text>
                <TextInput style={styles.input} value={state.city} onChangeText={value => dispatch({type: 'city', value : value})}/>
                <Button title='Enregistrer' buttonStyle={styles.ok} onPress={submit}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        paddingHorizontal : 30,
    },
    label: {
        fontSize : 18,
        paddingTop : 12
    },
    input: {
        backgroundColor: '#d6e6f9',
        opacity: 33,
        borderWidth: 0.8,
        borderRadius : 4,
        borderColor: '#d6e6f9',
        padding: 4,
        marginTop: 4,
        marginBottom: 6,
        fontSize : 18,
    },
    ok: {
        marginTop : 20,
        marginBottom : 20,
        backgroundColor : "#f05454",
        width : 150,
        alignSelf : 'center',
        fontSize : 18,
    }
});