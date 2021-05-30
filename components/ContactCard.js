import React from 'react';
import { Title, Card, Paragraph, Switch } from 'react-native-paper';
import { Text, TouchableOpacity, View } from 'react-native';
import { storeObject, getObject } from '../App'
const ContactCard = ({ item }) => {

    const [isSwitchOn, setIsSwitchOn] = React.useState(item[1].priority);
    const onToggleSwitch = async () => {
        setIsSwitchOn(!isSwitchOn)
        let priority = await getObject('priority');
        priority[item[0]] = !isSwitchOn;
        storeObject('priority', priority);
    };

    let name = 'John Hamm';
    let number = '+91-9328742983';
    let last = 'never';

    if (item != undefined) {
        name = item[1].name;
        number = item[1].numbers[0];
        last = item[1].last;
        // number = item != undefined ? item.phoneNumbers[0].number : "Undefined";
    }

    const onPressHandler = () => {
        console.log(name + ' Pressed');
    }

    return (
        //  <TouchableOpacity onPress={onPressHandler} >

        <Card.Title
            title={name}
            subtitle={number}
            right={() => <Text style={{ margin: 10 }}> <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /></Text>}
        >
        </Card.Title>

        //</TouchableOpacity>
    )
}

export default ContactCard;