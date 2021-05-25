import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppNavBar = ({ navigation }) => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => { navigation.navigate('Settings') }

    return (
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={_handleSearch} />
            <Appbar.Content title="Calls Up" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    );
};

export default AppNavBar;