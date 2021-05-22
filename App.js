/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
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
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AppNavBar from './components/Appbar';


const Tab = createMaterialBottomTabNavigator();
const TabComponent = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
    </Tab.Navigator>
  )
}

const MainStack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Tab"
        screenOptions={{
          header: AppNavBar,
        }}>
        <MainStack.Screen name='Tab' component={TabComponent} />
        <MainStack.Screen name='Settings' component={SettingsScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

//import CallLogs from 'react-native-call-log';
//CallLogs.loadAll().then(c => console.log(c));

export default App;