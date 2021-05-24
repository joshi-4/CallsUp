/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AppNavBar from './components/Appbar';
import Contacts from 'react-native-contacts';
import CallLogs from 'react-native-call-log';

const Tab = createMaterialBottomTabNavigator();
const TabComponent = ({ route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ contactScores: route.params.contactScores }} />
      <Tab.Screen name="Contacts" component={ContactsScreen} initialParams={{ contactScores: route.params.contactScores }} />
    </Tab.Navigator>
  )
}

const MainStack = createStackNavigator();

const App = () => {

  const [appLoading, setAppLoading] = useState(true);
  //const [userContacts, setUserContacts] = useState([]);
  //const [userCallLogs, setUserCallLogs] = useState([]);
  const [contactScores, setContactScores] = useState([]);

  const callLogsMap = new Map();

  useEffect(() => {

    let promise_contact = Contacts.getAll();
    let promise_calllogs = CallLogs.loadAll();

    Promise.all([promise_contact, promise_calllogs]).then((values) => {
      let userContacts = values[0];
      let userCallLogs = values[1];

      for (let temp of userCallLogs) {

        let number = temp.phoneNumber;
        let name = temp.name;
        let duration = Number(temp.duration);
        let timestamp = Number(temp.timestamp);

        if (callLogsMap.has(number)) {
          let prev = callLogsMap.get(number);
          prev.totalDuration += duration;
          prev.totalCalls += 1;
          prev.lastTimestamp = timestamp;

          callLogsMap.set(number, prev);
        }
        else {
          callLogsMap.set(number, { name: name, latestTimestamp: timestamp, lastTimestamp: timestamp, totalDuration: duration, totalCalls: 1 })
        }
      }

      let arr = [];

      for (let temp of userContacts) {

        let obj = {};
        obj.name = temp.displayName;
        obj.number = temp.phoneNumbers[0].number;
        obj.score = 10 + Math.floor(Math.random() * 10);;
        obj.last = '3w1d';

        arr.push(obj);
      }

      setContactScores(arr);
      setAppLoading(false);

    })
  }, []);


  if (appLoading) {
    return (
      <View><Text>App is Loading</Text></View>
    )
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Tab"
        screenOptions={{
          header: AppNavBar,
        }}>
        <MainStack.Screen
          name='Tab'
          component={TabComponent}
          initialParams={{ contactScores: contactScores }}
        />
        <MainStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;