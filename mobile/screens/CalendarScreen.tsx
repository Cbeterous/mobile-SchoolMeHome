import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { Provider as PaperProvider, Card, Title, Paragraph, Menu, Button, DefaultTheme } from "react-native-paper";
import moment from 'moment';
import { gql, useQuery } from '@apollo/client';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

type Lesson = {
  start: string;
  end: string;
  subject: { name: string, id?: string };
  promo: string;
}

type Item = {
  name: string;
  start: string;
  end: string;
  promo: string;
}

const renderItem = (item: Item) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{moment(item.start).format('HH:mm')} à {moment(item.end).format('HH:mm')}</Title>
        <Paragraph>{item.promo} / {item.name}</Paragraph>
      </Card.Content>
    </Card>
  )
}

const CalendarScreen = () => {
  const GET_LESSONS = gql`
    query { findAllLesson { start, end, promo, subject { name }}}
`;

  const { loading, error, data } = useQuery(GET_LESSONS);

  const [items, setItems] = useState<Item | null>(null);

  useEffect(() => {

    if (data) {
      console.log(data)
      let item: any = {};
      data.findAllLesson.forEach((d: Lesson) => {
        const date: string = moment(d.start).format('YYYY-MM-DD')
        const samedate = Object.keys(item).filter(t => t === date);
        if (samedate.length > 0) {
          item = { ...item, [date]: [...item[date], { name: d.subject.name, start: d.start, end: d.end, promo: d.promo }].sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0)) }
        } else {
          item = { ...item, [date]: [{ name: d.subject.name, start: d.start, end: d.end, promo: d.promo }] }
        }
      })
      setItems(item)
    }
  }, [data])


  if (loading) return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#f05454" />
    </View>
  );
  if (error) return <View><Text>Error! </Text></View>;
  if (items) {
    return (
      <Agenda
        items={items}
        renderItem={(item: Item) => renderItem(item)}
      />
    )
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#f05454" />
    </View>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 25
  },
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
  }
});

export default CalendarScreen;
