import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Provider as PaperProvider, Card, Title, Paragraph, Menu, Button } from "react-native-paper";
import Carousel, { Pagination } from 'react-native-snap-carousel';


const { width } = Dimensions.get("window");

export default function SlidesViewScreen() {

  const [presentation, setPresentation] = useState([{
    _id: 1,
    title: 'cours 1',
    slides: [
      {
        content: `<h2><strong>React native</strong></h2>
        <p><img src="https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg" alt="dfsdfsdf" width="400" height="300" style="display: block; margin-left: auto; margin-right: auto;" /></p>
        <p><strong>Lorem Ipsum</strong><span>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>`
      },
      {
        content: '<h1>Cours 1 Slide 2</h1>'
      },
      {
        content: '<h1>Cours 1 Slide 3</h1>'
      },
    ]
  },
  {
    _id: 2,
    title: 'cours 2',
    slides: [
      {
        content: '<h1>Cours 2 Slide 1</h1>'
      },
      {
        content: '<h1>Cours 2 Slide 2</h1>'
      },
    ]
  },
  ])

  const [selectedPres, setSelectedPres] = useState(presentation[0]._id);

  const [activeSlide, setActiveSlide] = useState<number>(0)

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const _renderItem = ({ item, index }: any) => {
    return (
      <View >
        <Card >
          <Card.Content style={styles.carousel}>
            <ScrollView>
              <HTMLView
                value={item.content}
                stylesheet={styles}
              />
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    );
  }


  return (
    <PaperProvider>
      <View style={styles.container}>
        <Carousel
          // ref={(c: any) => { _carousel = c; }}
          data={presentation.find(p => p._id === selectedPres)?.slides}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width - 75}
          layout={'default'}
          onSnapToItem={(index: number) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={presentation.find(p => p._id === selectedPres)?.slides.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(75, 54, 54, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          statusBarHeight={-175}
          anchor={<Button mode="contained" onPress={openMenu}>Choix du cours</Button>}>
          {presentation.map(p => {
            return (
              <Menu.Item
                onPress={() => {
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
    height: 450
  }
});
