import { FeatherIcon } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

const items = [
  {
    img: 'https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80',
    name: 'Audi R8',
    price: 158600,
    hp: 562,
    acceleration: 3.2,
    miles: 24000,
    location: 'Seattle, WA',
    date: new Date('2022-10-20'),
  },
  {
    img: 'https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
    name: 'Nissan GTR',
    price: 225500,
    hp: 598,
    acceleration: 3.7,
    miles: 13000,
    location: 'Richmond, VA',
    date: new Date('2022-11-22'),
  },
  {
    img: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    name: 'Porsche 911',
    price: 160100,
    hp: 640,
    acceleration: 3.5,
    miles: 6000,
    location: 'San Diego, CA',
    date: new Date('2022-11-23'),
  },
];

export default function Example() {
  return (
    <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Available Cars</Text>

        {items.map(({ img, name, price, miles, location, date, hp, acceleration }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Image alt="" resizeMode="cover" style={styles.cardImg} source={{ uri: img }} />
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{name}</Text>

                    <Text style={styles.cardPrice}>${price.toLocaleString('en-US')}</Text>
                  </View>

                  <View style={styles.cardStats}>
                    <View style={styles.cardStatsItem}>
                      <FeatherIcon color="#48496c" size={14} />

                      <Text style={styles.cardStatsItemText}>{hp} hp</Text>
                    </View>

                    <View style={styles.cardStatsItem}>
                      <FeatherIcon color="#48496c" size={14} />

                      <Text style={styles.cardStatsItemText}>
                        {miles.toLocaleString('en-US')} miles
                      </Text>
                    </View>

                    <View style={styles.cardStatsItem}>
                      <FeatherIcon color="#48496c" size={14} />

                      <Text style={styles.cardStatsItemText}>{acceleration} sec</Text>
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>{location}</Text>

                    <Text style={styles.cardFooterText}>
                      {date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        year: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48496c',
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#909090',
  },
});
