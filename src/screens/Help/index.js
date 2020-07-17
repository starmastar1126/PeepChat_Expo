import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Accordion } from 'native-base';

const dataArray = [
    {
        title: 'Newsfeed page',
        content:
            'Use the newsfeed page to stay intune with what’s happening in the world. Scroll to find new events happening near you where you can meet others using this platform. ',
    },
    {
        title: 'Peep page',
        content:
            'Use the peep page to bypass the noise and talk to the people you want to meet at events.' +
            'Tap on the connect button on someone’s profile to connect to their social media platform of choice.',
    },
    {
        title: 'Notifications page',
        content:
            'This page will keep you notified on connections and feed. Messaging feature coming soon.',
    },
    {
        title: 'Profile page',
        content:
            'Used Edit Profile to add your social media platform of choice. Add your username and your account will appear. Tap on the photo at the top of the settings page to change your profile picture.',
    },
];

class Help extends React.Component {
    static navigationOptions = {
        title: 'Help',
    };

    render() {
        return (
            <View style={styles.container}>
                <Accordion dataArray={dataArray} expanded={0} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
});
export default Help;
