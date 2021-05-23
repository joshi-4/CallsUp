import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { appStyles } from '../styles';
import ContactCard from '../components/ContactCard';

const ContactsScreen = ({ route, navigaton }) => {


    const userContacts = route.params.userContacts;

    return (
        <View style={appStyles.container}>

            <Text>Contacts Screen</Text>
            <FlatList
                data={userContacts}
                renderItem={() => <ContactCard />}
            />
        </View>
    )
}
const styles = StyleSheet.create({});
export default ContactsScreen;