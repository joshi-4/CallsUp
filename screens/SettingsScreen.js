import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { appStyles } from '../styles';

const SettingsScreen = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
            <View style={{ backgroundColor: '#FFFFFF' }} >
                <View >
                    <Appbar.Header  >
                        <Appbar.BackAction onPress={navigation.goBack} />
                        <Appbar.Content title="Help" />
                    </Appbar.Header>
                </View>

                <View style={{ paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, backgroundColor: '#FFFFFF' }}>

                    <Card elevation={2}>
                        <Card.Content>
                            <Title>Summary</Title>
                            <Paragraph>This app helps to remind you which of your contacts you should call.
                            The app selects contacts by looking at your call history and decides people you should call on various factors.
                             It is mainly useful as it helps you to never lose touch with your friends and family</Paragraph>
                        </Card.Content>

                    </Card>
                </View >

                <View style={{ paddingBottom: 24, paddingLeft: 24, paddingRight: 24, backgroundColor: '#FFFFFF' }}>

                    <Card elevation={2}>
                        <Card.Content>
                            <Title>Usage</Title>
                            <Paragraph>On the Home Tab it tells you atmost 5 contacts that are recommended to call,
                            which you can directly call by pressing on the contact.
                        </Paragraph>

                            <Paragraph>On the Contacts Tab it shows you your contacts and their priority label. You can change the priority of your contacts by pressing
                        on the switch next to contact name. Contacts with the priority label(switchOn) will be recommended more frequently than others.</Paragraph>
                        </Card.Content>

                    </Card>
                </View >

                <View style={{ paddingBottom: 24, paddingLeft: 24, paddingRight: 24, backgroundColor: '#FFFFFF' }}>

                    <Card elevation={2}>
                        <Card.Content>
                            <Title>Contact Us</Title>
                            <Paragraph>Email: arjunjoshi201@gmail.com
                        </Paragraph>

                        </Card.Content>

                    </Card>
                </View >

            </View>
        </ScrollView>
    )
}

export default SettingsScreen;