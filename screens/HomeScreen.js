import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Title, Card, Paragraph, Switch, Button } from 'react-native-paper';
import { appStyles } from '../styles';
import HomeCard from '../components/HomeCard';
import { getString, storeString } from '../App';

import PushNotification from "react-native-push-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: "channel-id",
        message: "Tap to see which of your Contacts you need to call today!", // (required)
        date: new Date(Date.now() + 5 * 1000), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        repeatType: "day",
    });
}

const scheduleNotificationWithDate = (date) => {
    PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: "channel-id",
        message: "Tap to see which of your Contacts you need to call today!", // (required)
        date: date,
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        repeatType: "day",
    });
}

const HomeScreen = ({ route, navigation }) => {

    let final = route.params.final;
    let finalArr = Object.entries(final);

    finalArr.sort((a, b) => { return (b[1].score - a[1].score) });

    //Notification Settings
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const onToggleSwitch = async (value) => {

        setIsSwitchOn(value);

        if (value) {
            PushNotification.cancelAllLocalNotifications();
            scheduleNotification();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }

        storeString('notification', String(value));
    }


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log(date.toLocaleTimeString());

        if (isSwitchOn) {
            PushNotification.cancelAllLocalNotifications();
            scheduleNotificationWithDate(date);
        }

        hideDatePicker();
    };

    useEffect(() => {
        getString('notification').then((val) => {
            if (val == null) {
                PushNotification.cancelAllLocalNotifications();
                scheduleNotification();
            }
            val = (val == 'false') ? false : true;
            setIsSwitchOn(val);
        })

    }, []);

    if (isSwitchOn) {
        return (
            <View style={appStyles.container}>
                <View style={{ paddingBottom: 24 }} >
                    <Title>Recommended Calls</Title>
                    <HomeCard finalArr={finalArr} />
                </View>

                <View>
                    <Title>Notification Settings</Title>
                    <Card elevation={2} style={{}} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', padding: 15 }}>
                            <Title>Show Daily Notification</Title>
                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', padding: 15, paddingTop: 0 }} >
                            <Title>Select Time </Title>
                            <View>
                                <Button mode="outlined" children={<Text>Pick Time</Text>} onPress={showDatePicker} />
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                            </View>
                        </View>

                    </Card>
                </View>

            </View>
        )
    } else {
        return (
            <View style={appStyles.container}>
                <View style={{ paddingBottom: 24 }} >
                    <Title>Recommended Calls</Title>
                    <HomeCard finalArr={finalArr} />
                </View>

                <View>
                    <Title>Notification Settings</Title>
                    <Card elevation={2} style={{}} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', padding: 15 }}>
                            <Title>Show Daily Notification</Title>
                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </View>

                    </Card>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF'
    }
});
export default HomeScreen;