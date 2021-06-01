import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppNavBar = ({ navigation }) => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => { navigation.navigate('Settings') }

    return (
        <Appbar.Header>
            <Appbar.Content title="Calls Up" titleStyle={{ fontSize: 32 }} />

            <Appbar.Action icon="help-circle" size={32} onPress={_handleMore} />
        </Appbar.Header>
    );
};

export default AppNavBar;