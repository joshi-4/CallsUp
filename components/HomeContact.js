import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

const HomeContact = (props) => {
    const item = props.item[1];
    console.log(props);
    let name = 'John Hamm';
    let number = '+919328742983';
    let last = 'never';

    if (item != undefined) {
        name = item.name;
        number = item.numbers[0];
        last = item.last;
    }

    const onPressHandler = () => {
        Linking.openURL('tel:' + number);
    }

    return (
        <View>
            <TouchableOpacity onPress={onPressHandler}>
                <Card.Title
                    title={name}
                    subtitle={number}
                    left={(props) => <Avatar.Icon {...props} icon="account-multiple" />}
                    right={(props) => <Text style={{ margin: 20, fontWeight: 'bold' }} >{last}</Text>}
                />
            </TouchableOpacity>
        </View>
    )


};

export default HomeContact;