import React from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Alert,
} from 'react-native';

import { Row } from '../../components/common';
// import { images } from '../../constants';

const data = [
    // {
    //     id: 1,
    //     text: '',
    //     image: images.demo1,
    // },
];

class NewsFeed extends React.Component {
    static navigationOptions = {
        title: 'NewsFeed',
        // headerRight: <WriteButton />,
    };

    handleShowMore = () => {
        const temp = false;
        if (temp) Alert.alert('Show more pressed.');
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <Text style={styles.title}>Weekly events</Text>
                <ScrollView>
                    {data.map(d => {
                        return (
                            <Row key={d.id}>
                                <View>
                                    <Image source={d.image} />
                                    <Text>{d.text}</Text>
                                </View>
                            </Row>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default NewsFeed;
