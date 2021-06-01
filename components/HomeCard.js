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

    const finalArr = props.finalArr;
    const arr = finalArr.slice(0, Math.min(finalArr.length, 5));
    console.log(finalArr[0][1].numbers);
    //   console.log(arr);

    console.log(arr);


    return (
        <Card elevation={2} >
            <FlatList
                data={arr}
                renderItem={({ item }) => { return (<HomeContact item={item} />) }}
                keyExtractor={(item, index) => { return index; }}
            />
        </Card>
    )
}

export default HomeCard;