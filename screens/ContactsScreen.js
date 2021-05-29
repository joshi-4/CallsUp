import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Title, Card } from 'react-native-paper';
import { appStyles } from '../styles';
import ContactCard from '../components/ContactCard';

const ContactsScreen = ({ route, navigation }) => {

    let contactScores = route.params.contactScores;
    contactScores.sort((a, b) => { return (a.name > b.name); })

    let final = route.params.final;
    let finalArr = Object.entries(final)
    finalArr.sort((a, b) => { return (a[1].name > b[1].name) });

    return (
        <View style={appStyles.container}>

            <Title>Contacts</Title>

            <FlatList
                data={finalArr}
                renderItem={({ item }) => <ContactCard item={item} priority={route.params.priority} />}
                keyExtractor={(item, index) => { return index; }}
            />

        </View>
    )
}
const styles = StyleSheet.create({});
export default ContactsScreen;