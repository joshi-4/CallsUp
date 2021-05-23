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

const Tab = createMaterialBottomTabNavigator();
const TabComponent = ({ route }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userContacts: route.params.userContacts }} />
      <Tab.Screen name="Contacts" component={ContactsScreen} initialParams={{ userContacts: route.params.userContacts }} />
    </Tab.Navigator>
  )
}

const MainStack = createStackNavigator();

const App = () => {

  const [appLoading, setAppLoading] = useState(true);
  const [userContacts, setUserContacts] = useState([]);
  //  let userContacts = [];

  useEffect(() => {

    console.log("Data Fetching");
    Contacts.getAll()
      .then(c => {
        setUserContacts(c);
        console.log(userContacts);
      })
      .then(() => setAppLoading(false))

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
          initialParams={{ userContacts: userContacts }}
        />
        <MainStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};



//import CallLogs from 'react-native-call-log';
//CallLogs.loadAll().then(c => console.log(c));

export default App;