import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import HTMLView from 'react-native-htmlview';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Provider as PaperProvider, Card, Title, Paragraph, Menu, Button, DefaultTheme } from "react-native-paper";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { gql, useQuery } from '@apollo/client';


const { width, height } = Dimensions.get("window");

type Slide = {
  _id: string,
  title: string,
  htmlContent: string
}

type Presentation = {
  _id: string,
  title: string,
  slides: Slide[]
}


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f05454',
  },
};

export default function SlidesViewScreen() {

  const GET_PRESENTATIONS = gql`
  query findAllPres {findAllPresentation {_id, title, slides{title, htmlContent}}}
`;

  const { loading, error, data } = useQuery(GET_PRESENTATIONS);
  const [presentation, setPresentation] = useState<Presentation[]>([])
  const [selectedPres, setSelectedPres] = useState<string>();
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (data.findAllPresentation.length > 0) {
        setPresentation(data.findAllPresentation)
        setSelectedPres(data.findAllPresentation[0]._id)
      }
    }
  }, [data])

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const _renderItem = ({ item, index }: any) => {
    return (
      <View >
        <Card >
          <Card.Content style={styles.carousel}>
            <ScrollView >
              <HTMLView
                value={item.htmlContent}
                stylesheet={styles}
              />
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    );
  }

  if (loading) return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#f05454" />
    </View>
  );
  if (error) return <View><Text>Error! </Text></View>;
  if (presentation.length > 0) {
    return (
      <PaperProvider >
        <View style={styles.container}>
          <Carousel
            data={presentation.find(p => p._id === selectedPres)?.slides}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width - 75}
            layout={'default'}
            onSnapToItem={(index: number) => {
              setActiveSlide(index)
            }}
          />
          <Pagination
            dotsLength={presentation.find(p => p._id === selectedPres)?.slides.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#f05454'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            statusBarHeight={-height / 2}
            anchor={<Button mode="contained" theme={theme} labelStyle={{ color: "white" }} style={{ marginBottom: 10 }} onPress={openMenu}>Choix du cours</Button>}>
            {presentation.map(p => {
              return (
                <Menu.Item
                  key={p._id}
                  onPress={() => {
                    // setActiveSlide(0)
                    setSelectedPres(p._id);
                    closeMenu()
                  }}
                  title={p.title} />
              )
            })}
          </Menu>
        </View>
      </PaperProvider>
    );
  }
  return <View style={styles.container}><Text> Aucune Présentation sur votre espace </Text></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  carousel: {
    height: 440
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});