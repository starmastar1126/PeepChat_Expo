import React from 'react';
import {
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject, observer } from 'mobx-react/native';
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Row, CloseButton } from '../../components/common';
import { theme } from '../../constants/theme';
import { authStorePropTypes } from '../../types';

const baseIconStyles = {
    size: 25,
    color: theme.color.grey,
};

const LINKS = [
    // {
    //     link: 'Share',
    //     title: 'Invite Friends',
    //     icon: <EvilIcons name="share-apple" {...baseIconStyles} />,
    // },
    {
        link: 'Help',
        title: 'Help',
        icon: <Ionicons name="ios-help-circle-outline" {...baseIconStyles} />,
    },
    // {
    //     link: 'About',
    //     title: 'About this app',
    //     icon: (
    //         <Ionicons
    //             name="ios-information-circle-outline"
    //             {...baseIconStyles}
    //         />
    //     ),
    // },
    {
        link: 'ProfileUpdate',
        title: 'Update Info',
        icon: <EvilIcons name="pencil" {...baseIconStyles} />,
    },
];

@inject('authStore')
@observer
class Settings extends React.Component {
    static propTypes = {
        ...authStorePropTypes,
    };

    static navigationOptions = {
        title: 'Settings',
        headerBackTitle: null,
        headerLeft: <CloseButton />,
    };

    handleLogout = () => {
        this.props.authStore.logoutUser();
    };

    async componentDidMount() {
        // await this.props.authStore.setupAuth();
    }

    render() {
        const rowSeperatorStyle = {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.color.greyLight,
        };
        const { userInfo } = this.props.authStore;
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    {userInfo ? (
                        <Row seperatorStyle={rowSeperatorStyle}>
                            <Row.ColumnLeft>
                                <Text size="xl" bold>
                                    Hello {userInfo.userName}
                                </Text>
                            </Row.ColumnLeft>
                            <Row.ColumnRight>
                                <Box avatar circle={50} shadow={1}>
                                    {userInfo.profilePhoto ? (
                                        <Image
                                            source={{
                                                uri: userInfo.profilePhoto,
                                            }}
                                            style={{ width: 30, height: 30 }}
                                        />
                                    ) : null}
                                </Box>
                            </Row.ColumnRight>
                        </Row>
                    ) : null}
                    {LINKS.map(link => (
                        <Row link={link.link} key={link.title}>
                            <Row.ColumnLeft>
                                <Box dir="row" align="center">
                                    <Box f={0.2}>{link.icon}</Box>
                                    <Box f={1}>
                                        <Text>{link.title}</Text>
                                    </Box>
                                </Box>
                            </Row.ColumnLeft>
                            <Row.ColumnRight>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    {...baseIconStyles}
                                />
                            </Row.ColumnRight>
                        </Row>
                    ))}
                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 40,
                            marginTop: 20,
                            borderWidth: 1,
                            borderColor: theme.color.peepBlue,
                            borderRadius: 6,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}
                        onPress={this.handleLogout}>
                        <Text bold color="peepBlue">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Box>
        );
    }
}

export default Settings;
