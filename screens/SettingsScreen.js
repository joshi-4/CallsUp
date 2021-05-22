import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text>Settings Screen</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View >
    )
}

export default SettingsScreen;