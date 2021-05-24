import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Title } from 'react-native-paper';
import { appStyles } from '../styles';
import ContactCard from '../components/ContactCard';

const ContactsScreen = ({ route, navigation }) => {

    let contactScores = route.params.contactScores;

    contactScores.sort((a, b) => { return (a.name > b.name); })

    return (
        <View style={appStyles.container}>

            <Title>Contacts</Title>
            <FlatList
                data={contactScores}
                renderItem={({ item }) => <ContactCard item={item} />}
                keyExtractor={(item, index) => { return index; }}
            />
        </View>
    )
}
const styles = StyleSheet.create({});
export default ContactsScreen;