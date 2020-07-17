import React from 'react';
import { StatusBar, ScrollView, Alert } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import { Box } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';

import { userStorePropTypes, authStorePropTypes } from '../../types';
import UserProfileForm from './components/form';
import { Loader } from '../../components/common';
import { NavigationService } from '../../services/NavigationService';
import { promisify } from '../../utils';

const initialState = {
    profilePhoto: null,
    error: null,
    isLoading: true,
    userName: '',
    bio: '',
    email: '',
    phone: '',
    showProfile: '',
    dateOfBirth: '',
    city: '',
    country: '',
    twitterLink: '',
    isTwitterActive: '',
    facebookLink: '',
    isFacebookActive: '',
    linkedinLink: '',
    isLinkedinActive: '',
    instagramLink: '',
    isInstagramActive: '',
};

@inject('userStore')
@inject('authStore')
class UserProfileUpdate extends React.Component {
    static propTypes = {
        ...userStorePropTypes,
        ...authStorePropTypes,
    };

    static navigationOptions = {
        title: 'Update Your Profile',
    };

    state = { ...initialState };

    handleInput = (name, value) => {
        this.setState({ [name]: value });
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
                this.setState({ profilePhoto: uri });
            }
        } else {
            Alert.alert('App does not have access to your photos');
        }
    };

    handleSubmit = async () => {
        this.setState({ isLoading: true });
        /* eslint-disable no-unused-vars */
        const [_, updateUserProfileErr] = await promisify(
            this.props.userStore.updateUserProfile(this.state),
        );
        const [__, updateUserProfilePictureErr] = await promisify(
            this.props.userStore.updateUserProfilePicture(this.state.id, {
                id: this.state.id,
                file: this.state.profilePhoto,
            }),
        );
        /* eslint-enable no-unused-vars */
        if (updateUserProfileErr) {
            throw new Error(updateUserProfileErr);
        }

        NavigationService.navigate('Profile', { user: this.state });
    };

    getProfilePhoto = () => {
        const { profilePhoto } = this.state;
        const { userInfo } = this.props.authStore;
        if (profilePhoto) {
            return profilePhoto;
        } else if (userInfo.profilePhoto) {
            return userInfo.profilePhoto;
        } else {
            return 'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png';
        }
    };

    getUserInfo = async () => {
        const { authStore, userStore } = this.props;
        const [fullUserInfo, fullUserInfoErr] = await promisify(
            userStore.oneUser(authStore.userInfo.id),
        );
        if (fullUserInfoErr) {
            throw new Error(fullUserInfoErr);
        }

        this.setState({ ...fullUserInfo });
    };

    async componentDidMount() {
        await this.getUserInfo();

        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        }
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <UserProfileForm
                        formStateValues={this.state}
                        handleInput={this.handleInput}
                        handlePickImage={this.handlePickImage}
                        profilePhoto={this.getProfilePhoto()}
                        handleSubmit={this.handleSubmit}
                        isLoading={this.state.isLoading}
                    />
                </ScrollView>
            </Box>
        );
    }
}

export default UserProfileUpdate;
