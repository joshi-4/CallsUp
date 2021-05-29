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
    const finalArr = props.finalArr;
    console.log(finalArr[0][1].numbers);
    //   console.log(arr);



    return (
        <Card elevation={2} >
            <HomeContact item={finalArr[0]} />
            <HomeContact item={finalArr[1]} />
            <HomeContact item={finalArr[2]} />
            <HomeContact item={finalArr[3]} />
            <HomeContact item={finalArr[4]} />
        </Card>
    )
}

export default HomeCard;