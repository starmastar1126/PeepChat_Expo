import React from 'react';
import { StatusBar } from 'react-native';
import { Box, Text } from 'react-native-design-utility';

class Notifications extends React.Component {
    static navigationOptions = {
        title: 'Notifications',
    };

    render() {
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <Box f={1} center>
                    <Text>Notifications</Text>
                </Box>
            </Box>
        );
    }
}

export default Notifications;
