import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Title, Card, Paragraph } from 'react-native-paper';
import { appStyles } from '../styles';
import ContactCard from '../components/ContactCard';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={appStyles.container}>
            <View>
                <Title>Recommended Calls</Title>
            </View>

            <ContactCard />
            <ContactCard />
            <ContactCard />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF'
    }
});
export default HomeScreen;