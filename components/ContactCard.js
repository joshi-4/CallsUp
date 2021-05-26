import React from 'react';
import { Title, Card, Paragraph } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';

const ContactCard = ({ item }) => {

    let name = 'John Hamm';
    let number = '+91-9328742983';
    let last = 'never';

    if (item != undefined) {
        name = item.name;
        number = item.number;
        last = item.last;
        // number = item != undefined ? item.phoneNumbers[0].number : "Undefined";
    }

    const onPressHandler = () => {
        console.log(name + ' Pressed');
    }

    return (
        <TouchableOpacity onPress={onPressHandler} >
            <Card.Title
                title={name}
                subtitle={number}
                right={() => <Text style={{ margin: 10 }}>{last}</Text>}
            >
            </Card.Title>
        </TouchableOpacity>
    )
}

export default ContactCard;