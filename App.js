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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';



//Storage Functions

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
    console.log('Could not save in storage');
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      // value previously stored
      console.log(value);
    } else { console.log('Null Value'); }
  } catch (e) {
    // error reading value

    console.log('Error reading value');
  }
}



//Helper Functions

const daysBetween = (ts1, ts2) => {
  if (ts2 > ts1) { let temp = ts1; ts1 = ts2; ts2 = temp; }
  const oneDay = 1000 * 60 * 60 * 24;

  const days = Math.floor((ts1 - ts2) / oneDay);

  const weeks = Math.floor(days / 7);

  const daysLeft = days % 7;
  const ans = String(weeks) + 'w' + String(daysLeft) + 'd';
  return ans;
}

const numberFormatter = (num) => {
  num = num.replace(/\D/g, '').slice(-10);

  return num;
}

const scoreCalculater = (t, currentTimestamp) => {
  const avgFreq = (t.latestTimestamp - t.lastTimestamp) / t.totalCalls;
  const timeFromLast = (currentTimestamp - t.latestTimestamp);

  const score = avgFreq != 0 ? Math.floor(timeFromLast / avgFreq) : -1;

  return (score);
}

// Tab Navigation
const Tab = createMaterialBottomTabNavigator();
const TabComponent = ({ route }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.activeColor}
    //theme={theme}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        initialParams={{ contactScores: route.params.contactScores }} />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        initialParams={{ contactScores: route.params.contactScores }}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

// Root Navigation
const MainStack = createStackNavigator();


// App.js
const App = () => {

  const [appLoading, setAppLoading] = useState(true);
  const [contactScores, setContactScores] = useState([]);
  const callLogsMap = new Map();


  // Data Fetching while app is loading
  useEffect(() => {

    getData();

    storeData('Hello, Storage!');

    getData();




    let promise_contact = Contacts.getAll();
    let promise_calllogs = CallLogs.loadAll();

    Promise.all([promise_contact, promise_calllogs]).then((values) => {
      let userContacts = values[0];
      let userCallLogs = values[1];

      for (let temp of userCallLogs) {

        let number = numberFormatter(temp.phoneNumber);
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

      const currentTimestamp = new Date().getTime();

      for (let temp of userContacts) {

        let obj = {};
        obj.name = temp.displayName;
        obj.number = numberFormatter(temp.phoneNumbers[0].number);
        obj.score = -1;
        obj.last = 'never';

        // console.log(obj.number);
        //console.log(callLogsMap);
        const t = callLogsMap.get(obj.number);
        // console.log(t);
        if (t != undefined) {
          obj.score = scoreCalculater(t, currentTimestamp);
          obj.last = daysBetween(currentTimestamp, t.lastTimestamp);
        }

        arr.push(obj);
      }

      setContactScores(arr);
      setAppLoading(false);

    })
      .catch((err) => { console.log(err) })
  }, []);


  if (appLoading) {
    return (
      <View><Text>App is Loading</Text></View>
    )
  }

  return (
    <NavigationContainer theme={theme}>
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