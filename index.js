/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import PushNotification from "react-native-push-notification";



PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification)
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
})

PushNotification.createChannel(
    {
        channelId: "channel-id",
        channelName: "My channel",
    }
)

const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: "channel-id",
        message: "Tap to see which of your Contacts you need to call today!", // (required)
        date: new Date(Date.now() + 20 * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        repeatType: "day",
    });
}

scheduleNotification();

const theme = {
    ...DefaultTheme,
    roundness: 20,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5784BA',
        accent: '#EB96AA',
        surface: '#ffffff',
        activeColor: '#ffffff',
    },
};

const Main = () => {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    )
}
export { theme };
export default Main;
AppRegistry.registerComponent(appName, () => Main);
