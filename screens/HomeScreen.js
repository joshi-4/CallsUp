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
import HomeCard from '../components/HomeCard';


const HomeScreen = ({ route, navigation }) => {

    let final = route.params.final;
    let finalArr = Object.entries(final);

    finalArr.sort((a, b) => { return (b[1].score - a[1].score) });



    return (
        <View style={appStyles.container}>
            <View>
                <Title>Recommended Calls</Title>
            </View>

            <HomeCard finalArr={finalArr} />


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