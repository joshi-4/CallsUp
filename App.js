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
  PermissionsAndroid,
  Platform,
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
import { ActivityIndicator } from 'react-native-paper';

//Storage Functions

const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('Could not save in storage');
  }
}

const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      // value previously stored
      //console.log(value);
    } //else { console.log('Null Value'); }

    return value;

  } catch (e) {
    // error reading value
    console.log('Error reading value');
    return null;
  }
}

export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e);
    // saving error
  }
}

export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
    return null;
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

const scoreCalculater = (contact, currentTimestamp, priority) => {

  const avgFreq = (contact.latestTimestamp - contact.lastTimestamp) / contact.totalCalls;
  const avgDuration = contact.totalDuration / contact.totalCalls;
  const timeFromLast = (currentTimestamp - contact.latestTimestamp);
  let score = avgFreq != 0 ? Math.floor(timeFromLast / avgFreq) : 1;

  if (priority) { score *= 2; }

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
        initialParams={{ final: route.params.final, priority: route.params.priority }} />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        initialParams={{ final: route.params.final, priority: route.params.priority }}
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
  const [final, setFinal] = useState({});

  var priority = {};

  const dataFetch = async () => {

    const ContactsGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts Permission',
        message: 'This app would like to view your contacts.',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });

    const CallLogsGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: "Call Logs Permission",
        message: 'This app would like to view your Call Logs',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )


    //Priority
    priority = await getObject('priority');
    if (priority == null) { priority = {}; }
    console.log(priority);

    //Call Logs

    let callLogs = [];

    if (CallLogsGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const lastUpdatedCallLogs = null//await getString('lastUpdatedCallLogs');

      if (lastUpdatedCallLogs == null) {
        callLogs = await CallLogs.loadAll();
      } else {
        callLogs = await CallLogs.load(-1, { minTimestamp: lastUpdatedCallLogs });
      }

      if (callLogs == null) { callLogs = []; }
    }


    // Contacts

    let lastTotalContacts = null//await getString('lastTotalContacts');
    let contacts = [];
    if (ContactsGranted === PermissionsAndroid.RESULTS.GRANTED) {
      if (lastTotalContacts == null || lastTotalContacts != String(await Contacts.getCount())) {
        contacts = await Contacts.getAll();

        lastTotalContacts = await Contacts.getCount();
        storeObject('contacts', contacts);
        storeString('lastTotalContacts', String(lastTotalContacts));
      } else {
        contacts = await getObject('contacts');
      }

      if (contacts == null) { contacts = []; }
    }
    // callLogsObject
    let callLogsObject = null //await getObject('callLogsObject');
    if (callLogsObject == null) { callLogsObject = {}; }


    // Call Logs Object getting updated
    for (let temp of callLogs) {
      let number = numberFormatter(temp.phoneNumber);
      let name = temp.name;
      let duration = Number(temp.duration);
      let timestamp = Number(temp.timestamp);

      if (callLogsObject.hasOwnProperty(number)) {
        callLogsObject[number].totalDuration += duration;
        callLogsObject[number].latestTimestamp = timestamp > callLogsObject[number].latestTimestamp ? timestamp : callLogsObject[number].latestTimestamp;
        callLogsObject[number].lastTimestamp = timestamp < callLogsObject[number].lastTimestamp ? timestamp : callLogsObject[number].lastTimestamp;
        callLogsObject[number].totalCalls += 1;
      } else {
        callLogsObject[number] = {
          name: name,
          latestTimestamp: timestamp,
          lastTimestamp: timestamp,
          totalDuration: duration,
          totalCalls: 1
        };
      }
    }

    let currentTimestamp = new Date().getTime();

    if (callLogs != []) {
      storeString('lastUpdatedCallLogs', String(currentTimestamp));
      storeObject('callLogsObject', callLogsObject);
    }

    //Not Final Yet Changes required in future

    for (let temp of contacts) {
      let obj = {};
      obj.name = temp.displayName;
      obj.numbers = [];
      obj.score = 0;
      obj.last = 'never';
      obj.priority = priority.hasOwnProperty(temp.recordID) ? priority[temp.recordID] : false;

      let maxTimestamp = 0;

      for (let t of temp.phoneNumbers) {
        obj.numbers.push(numberFormatter(t.number));
      }
      // console.log(obj.numbers)

      for (let t of obj.numbers) {
        let a = callLogsObject[t];
        if (a != undefined) {
          obj.score += scoreCalculater(a, currentTimestamp, obj.priority);
          maxTimestamp = a.lastTimestamp > maxTimestamp ? a.lastTimestamp : maxTimestamp;
        }
      }

      if (maxTimestamp != 0) { obj.last = daysBetween(currentTimestamp, maxTimestamp); }

      final[temp.recordID] = obj;
      console.log(obj);

    }

    // console.log(final);
    setAppLoading(false);

  }

  // Data Fetching while app is loading
  useEffect(() => {
    dataFetch();
  }, []);


  if (appLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator animating={true} size='large' />
      </View>
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
          initialParams={{ final: final, priority: priority }}
        />
        <MainStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;