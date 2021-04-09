import React, {Component, useState} from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import {Card, Provider as PaperProvider} from "react-native-paper";
import HTMLView from 'react-native-htmlview';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {width, height} = Dimensions.get("window");


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Javascript / Typescript',
        imageUrl: "https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png",
        description: "Introduction à Javascript et TypeScript",
        update: "Mis à jour le 28/02/2021",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'ReactJS / React Native',
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        description: "Composer vos premières applications avec React",
        update: "Mis à jour le 24/02/2021",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '519023a0f-3da1-471f-bd96-145571e29d72',
        title: 'Flutter',
        imageUrl: "https://miro.medium.com/max/1000/1*ilC2Aqp5sZd1wi0CopD1Hw.png",
        description: "Explorer le nouveau langage de programmation hybride",
        update: "Mis à jour le 14/02/2021",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '193837a0f-3da1-471f-bd96-145571e29d72',
        title: 'Docker',
        imageUrl: "https://code4pi.fr/wp-content/uploads/2019/11/vertical-logo-monochromatic-1.png",
        description: "Introduction à Docker",
        update: "Mis à jour le 28/03/2021",
        content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        id: '893834a0f-3da1-471f-bd96-145571e29d72',
        title: 'GraphQL / MongoDB',
        imageUrl: "https://blog.knoldus.com/wp-content/uploads/2019/06/graphql.png",
        description: "Introduction à Javascript et TypeScript",
        update: "Mis à jour le 12/02/2021",
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
        <Image style={styles.image} source={{uri: item.imageUrl}}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.update}>{item.update}</Text>
    </View>
);


export default function WikiList({navigation}: any) {
    const [activeSlide, setActiveSlide] = useState<number>(0)


    const renderItem = ({item}: any) => (
        <View>
            <Card style={styles.carousel} onPress={() => {
                navigation.push('Detail', {
                    id: item.id
                })
            }}>
                <Card.Content>
                    <ScrollView>
                        <Item item={item}/>
                    </ScrollView>
                </Card.Content>
            </Card>
        </View>
    )
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Carousel
                    data={DATA}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - 75}
                    layout={'default'}
                    onSnapToItem={(index: number) => {
                        setActiveSlide(index)
                    }}
                />
            </View>
        </PaperProvider>
    )

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {},
    title: {
        marginTop: 8,
        fontSize: 20,
        color: "#FFF",
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "center",
        justifyContent: 'center',
        textAlign: "center"
    },
    image: {
        width: 184,
        height: 184,
        borderRadius: 12
    },
    description: {
        marginTop: 16,
        fontSize: 16,
        color: "#FFF",
        alignSelf: "center",
        justifyContent: 'center',
        textAlign: "center"
    },
    carousel: {
        flexGrow: 1,
        margin: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#30475e',
        height: 440
    },
    update: {
        marginTop: 32,
        fontSize: 12,
        color: "#FFF",
        textAlign: "center",
        bottom: 0,

    },
});