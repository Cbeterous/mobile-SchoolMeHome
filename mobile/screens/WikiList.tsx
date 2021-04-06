import React, {Component} from "react";
import {FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity, Image} from "react-native";


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Javascript / Typescript',
        // imageUrl: "https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'ReactJS / React Native',
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '519023a0f-3da1-471f-bd96-145571e29d72',
        title: 'Flutter',
        // imageUrl: "https://miro.medium.com/max/1000/1*ilC2Aqp5sZd1wi0CopD1Hw.png",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '193837a0f-3da1-471f-bd96-145571e29d72',
        title: 'Docker',
        // imageUrl: "https://code4pi.fr/wp-content/uploads/2019/11/vertical-logo-monochromatic-1.png",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '893834a0f-3da1-471f-bd96-145571e29d72',
        title: 'GraphQL / MongoDB',
        // imageUrl: "https://blog.knoldus.com/wp-content/uploads/2019/06/graphql.png",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
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

const Item = ({item}: any) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.imageUrl}/>
    </View>
);


export default function WikiList({navigation}: any) {


    const renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => {
            navigation.push('Detail', {
                id: item.id
            })
            console.log(item)
        }
        }>
            <Item item={item}/>
        </TouchableOpacity>
    );
    return (
        <FlatList contentContainerStyle={styles.container}
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,

    },
    item: {
        backgroundColor: '#30475e',
        margin: 16,
        padding: 16,
        marginVertical: 16,
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        color: "#FFF",
        textAlignVertical: "center",
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
    image: {
        width: 48,
        height: 48,
        alignSelf: "flex-end",}
});