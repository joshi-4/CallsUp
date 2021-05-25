/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    roundness: 20,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
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
