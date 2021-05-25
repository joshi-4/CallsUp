import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Card } from 'react-native-paper';
import HomeContact from './HomeContact';

const HomeCard = (props) => {

    const arr = props.contactScores;
    console.log(arr);
    return (
        <Card elevation={2} >
            <HomeContact item={arr[0]} />
            <HomeContact item={arr[1]} />
            <HomeContact item={arr[2]} />
            <HomeContact item={arr[3]} />
            <HomeContact item={arr[4]} />
        </Card>
    )
}

export default HomeCard;