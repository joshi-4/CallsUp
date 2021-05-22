/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

const ContactScreen = () => {
  return (
    <View>
      <Text>Contacts Screen</Text>
    </View>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Contacts" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

//import CallLogs from 'react-native-call-log';
//CallLogs.loadAll().then(c => console.log(c));

export default App;