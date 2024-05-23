import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';
import { Button } from '~/components/ui/button';

export default function One() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image source={require('~/assets/images/tryve/general.jpg')} style={styles.heroImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Track your location{'\n'}with{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>TaskTrove</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            Boost Teamwork and Visibility with Real-Time Location Sharing
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <Button onPress={() => router.push('/(onboarding)/2')} style={styles.button}>
            <Text style={styles.buttonText}>Lets go</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 34,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#281b52',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
  },
  /** Hero */
  hero: {
    backgroundColor: '#d8dffe',
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 600,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#fff2dd',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
  },
  appNameText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#281b52',
  },
  /** Button */
  button: {
    backgroundColor: colors.blue[700],
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});
