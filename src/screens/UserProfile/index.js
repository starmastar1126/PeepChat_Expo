/* eslint-disable react/prop-types */
import React from 'react';
import {
    View,
    Text,
    Image,
    // TouchableOpacity,
    StatusBar,
    StyleSheet,
    Alert,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { inject } from 'mobx-react/native';
import { Permissions, ImagePicker } from 'expo';
// import { Icon } from 'native-base';

import {
    TwitterView,
    InstagramView,
    LinkedinView,
} from '../../components/common/SocialView';

import { SettingsButton } from '../../components/common';
import { promisify } from '../../utils';

@inject('userStore')
@inject('authStore')
class UserProfile extends React.Component {
    static navigationOptions = {
        title: 'My Profile',
        headerRight: <SettingsButton />,
    };

    state = {
        user: {},
        isLoading: true,
        navigation: {
            index: 0,
            routes: [],
        },
    };

    handlePickImage = async () => {
        const currentPermissionStatus = await Permissions.getAsync(
            Permissions.CAMERA_ROLL,
        );

        let askForPermission = null;
        if (currentPermissionStatus !== 'granted') {
            try {
                askForPermission = await Permissions.askAsync(
                    Permissions.CAMERA_ROLL,
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        if (
            askForPermission.status === 'granted' ||
            currentPermissionStatus === 'granted'
        ) {
            const [newPhoto, newPhotoErr] = await promisify(
                ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                }),
            );
            if (newPhotoErr) {
                throw new Error(newPhotoErr);
            }

            if (!newPhoto.cancelled) {
                const uri = `data:image/jpg;base64,${newPhoto.base64}`;
                this.setState({
                    user: { ...this.state.user, profilePhoto: uri },
                });
                /* eslint-disable no-unused-vars */
                const [_, updateUserProfileErr] = await promisify(
                    this.props.userStore.updateUserProfilePicture(
                        this.state.user.id,
                        {
                            id: this.state.user.id,
                            file: this.state.user.profilePhoto,
                        },
                    ),
                );
                /* eslint-enable no-unused-vars */
                if (updateUserProfileErr) {
                    throw new Error(updateUserProfileErr);
                }
            }
        } else {
            Alert.alert('App does not have access to your photos');
        }
    };

    getProfilePhoto = () => {
        const { profilePhoto } = this.state.user;
        const { userInfo } = this.props.authStore;
        if (profilePhoto) {
            return profilePhoto;
        } else if (userInfo.profilePhoto) {
            return userInfo.profilePhoto;
        } else {
            return 'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png';
        }
    };
    updateRoute = (routes, route, fields, values) => {
        if (fields.length !== values.length) return;

        for (let i = 0; i < fields.length; i++) {
            routes.filter(r => r.key === route)[0][fields[i]] = values[i];
        }
        return routes;
    };

    generateRoutes = info => {
        const routes = [
            {
                active: 0,
                key: 'twitter',
                title: 'Twitter',
                icon: 'twitter',
                uri: '',
            },
            {
                active: 0,
                key: 'linkedin',
                title: 'Linkedin',
                icon: 'linkedin',
                uri: '',
            },
            {
                active: 0,
                key: 'instagram',
                title: 'Instagram',
                icon: 'instagram',
                uri: '',
            },
        ];

        if (info.isTwitterActive && info.twitterLink)
            this.updateRoute(
                routes,
                'twitter',
                ['uri', 'active'],
                [info.twitterLink, 1],
            );
        if (info.isLinkedinActive && info.linkedinLink)
            this.updateRoute(
                routes,
                'linkedin',
                ['uri', 'active'],
                [info.linkedinLink, 1],
            );
        if (info.isInstagramActive && info.instagramLink)
            this.updateRoute(
                routes,
                'instagram',
                ['uri', 'active'],
                [info.instagramLink, 1],
            );

        this.setState({
            navigation: {
                index: this.state.navigation.index,
                routes: routes.filter(r => r.active),
            },
        });
    };

    getUserInfo = async () => {
        const { authStore, userStore } = this.props;
        const [fullUserInfo, fullUserInfoErr] = await promisify(
            userStore.oneUser(authStore.userInfo.id),
        );
        if (fullUserInfoErr) {
            throw new Error(fullUserInfoErr);
        }

        this.generateRoutes(fullUserInfo);
        this.setState({ user: { ...fullUserInfo } });
    };
    updateUserData = newData => {
        this.setState({ user: newData });
    };

    async componentDidMount() {
        await this.getUserInfo();

        this.setState({ isLoading: false });
    }
    componentDidUpdate() {
        const { user } = this.state;
        const newUserData = this.props.navigation.state.params;

        if (newUserData && newUserData.user !== user) {
            this.updateUserData(newUserData.user);
            this.generateRoutes(newUserData.user);
        }
    }

    render() {
        const { user, navigation } = this.state;
        const activeNavigation = navigation.routes.filter(r => r.active);

        return (
            <View style={styles.container}>
                <StatusBar />
                <View style={styles.header}>
                    <View style={styles.thumbnailContainer}>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: this.getProfilePhoto() }}
                        />
                        {/* <TouchableOpacity
                            onPress={this.handlePickImage}
                            style={styles.photoUpload}>
                            <Icon
                                type="FontAwesome"
                                name="camera"
                                style={{ color: '#959595' }}
                            />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={styles.profile}>
                    <Text>{user.bio}</Text>
                </View>
                {activeNavigation.length ? (
                    <TabView
                        navigationState={{ ...navigation }}
                        renderScene={({ route, jumpTo }) => {
                            switch (route.key) {
                                case 'twitter':
                                    return (
                                        <TwitterView
                                            jumpTo={jumpTo}
                                            uri={route.uri}
                                        />
                                    );
                                case 'linkedin':
                                    return (
                                        <LinkedinView
                                            jumpTo={jumpTo}
                                            uri={route.uri}
                                        />
                                    );
                                case 'instagram':
                                    return (
                                        <InstagramView
                                            jumpTo={jumpTo}
                                            uri={route.uri}
                                        />
                                    );
                            }
                        }}
                        onIndexChange={index =>
                            this.setState({
                                navigation: Object.assign(navigation, {
                                    index: index,
                                }),
                            })
                        }
                        initialLayout={{}}
                    />
                ) : (
                    <Text>No social media registered</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    thumbnailContainer: {
        height: 140,
        width: 140,
    },
    thumbnail: {
        height: 140,
        width: 140,
        borderRadius: 70,
        borderColor: '#FFF',
        borderWidth: 5,
    },
    photoUpload: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'column',
        padding: 4,
        width: 45,
        height: 45,
        alignContent: 'center',
        backgroundColor: '#cbcbcb',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 23,
    },
    profile: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    socialMedia: {
        marginTop: 5,
        paddingHorizontal: 20,
        borderColor: '#DDD',
        borderWidth: 3,
        borderRadius: 2,
    },
});

export default UserProfile;
