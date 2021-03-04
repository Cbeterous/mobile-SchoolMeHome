import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity} from "react-native";


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const navigate = (id: String) => {
    switch (id) {
        case 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba':
            break
        case '3ac68afc-c605-48d3-a4f8-fbd91aa97f63':
            break
        case '58694a0f-3da1-471f-bd96-145571e29d72':
            break
    }
}

const Item = ({title}: any) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);


export default class WikiList extends Component {

    static navigationOptions = ({navigation}: any) => ({
        title: 'Home',
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        headerStyle: {backgroundColor: 'powderblue'},
    })


    renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => navigate('Detail', {
            id: item.key
        })}>
            <Item title={item.title}/>
        </TouchableOpacity>
    );

    render() {
        return (
            <FlatList style={styles.container}
                      data={DATA}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.id}
            />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});