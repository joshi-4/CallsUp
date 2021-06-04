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


const theme = {
    ...DefaultTheme,
    roundness: 20,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5784BA',
        accent: '#EB96AA',
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
