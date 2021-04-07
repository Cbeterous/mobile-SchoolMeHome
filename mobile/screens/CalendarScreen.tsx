import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { Provider as PaperProvider, Card, Title, Paragraph, Menu, Button, DefaultTheme } from "react-native-paper";
import moment from 'moment'

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

const data: Lesson[] = [{
  start: '2021-04-07 09:00:00',
  end: '2021-04-07 10:00:00',
  subject: { name: 'React Native' },
  promo: 'WnS Lyon'
},
{
  start: '2021-04-07 08:00:00',
  end: '2021-04-07 09:00:00',
  subject: { name: 'React' },
  promo: 'WnS Strasbourg'
},
{
  start: '2021-04-24 09:00:00',
  end: '2021-04-24 10:00:00',
  subject: { name: 'PHP' },
  promo: 'WnS Lyon'
},{
  start: '2021-04-22 09:00:00',
  end: '2021-04-22 10:00:00',
  subject: { name: 'React Native' },
  promo: 'WnS Lyon'
},
{
  start: '2021-04-22 08:00:00',
  end: '2021-04-22 09:00:00',
  subject: { name: 'React' },
  promo: 'WnS Strasbourg'
},
{
  start: '2021-04-24 09:00:00',
  end: '2021-04-24 10:00:00',
  subject: { name: 'PHP' },
  promo: 'WnS Lyon'
},{
  start: '2021-04-22 09:00:00',
  end: '2021-04-22 10:00:00',
  subject: { name: 'React Native' },
  promo: 'WnS Lyon'
},
{
  start: '2021-04-22 08:00:00',
  end: '2021-04-22 09:00:00',
  subject: { name: 'React' },
  promo: 'WnS Strasbourg'
},
{
  start: '2021-04-24 09:00:00',
  end: '2021-04-24 10:00:00',
  subject: { name: 'PHP' },
  promo: 'WnS Lyon'
}]


const renderItem = (item: any) => {

  return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{moment(item.start).format('hh:mm')} à {moment(item.end).format('hh:mm')}</Title>
          <Paragraph>{item.promo} / {item.name}</Paragraph>
        </Card.Content>
      </Card>
  )
}

const CalendarScreen = () => {

  const [items, setItems] = useState<any>();

  useEffect(() => {
    let toto: any = {};
    data.forEach(d => {
      const date: string = moment(d.start).format('YYYY-MM-DD') 
      const samedate = Object.keys(toto).filter(t => t === date);
      if (samedate.length > 0) {
        toto = { ...toto, [date]: [...toto[date], { name: d.subject.name, start: d.start, end: d.end, promo: d.promo }].sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0)) }
      } else {
        toto = { ...toto, [date]: [{ name: d.subject.name, start: d.start, end: d.end, promo: d.promo }] }
      }
    })

    setItems(toto)

  }, [])

  if (items) {
    return (
      <Agenda
        items={items}
        renderItem={(item: any) => renderItem(item)}
      />
    )
  } else {
    return <Text>Loading...</Text>
  }

}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 25
  }
});

export default CalendarScreen;
