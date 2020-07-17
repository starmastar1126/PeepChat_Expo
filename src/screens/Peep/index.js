import React from 'react';
import { StatusBar, FlatList, Platform } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';
import { Constants, Location, Permissions } from 'expo';

import PeepProfileCard from './components/PeepProfileCard';
import { NavigationService } from '../../services/NavigationService';
import { Loader } from '../../components/common';
import { userStorePropTypes, authStorePropTypes } from '../../types';
import { promisify } from '../../utils';

const initialState = {
    location: null,
    errorMessage: null,
    users: [],
    isLoading: true,
};

@inject('userStore')
@inject('authStore')
class Peep extends React.Component {
    static navigationOptions = {
        title: 'Peep',
    };

    static propTypes = {
        ...userStorePropTypes,
        ...authStorePropTypes,
    };

    state = { ...initialState };

    handleShowUserProfile = user => {
        NavigationService.navigate('PeepProfile', { user });
    };

    isLeft = index => {
        return index % 2 === 0;
    };

    /**
     * Update users location in db and find users nearby
     */
    handleNearByUsers = async () => {
        const { userStore } = this.props;
        const { location } = this.state;

        if (!location) {
            throw new Error('Location is null.');
        }

        await userStore.updateUserLocation();

        const [users, usersErr] = await promisify(userStore.getNearByUsers());
        if (usersErr) {
            throw new Error(usersErr);
        }

        this.setState({ users });
    };

    /**
     * Get users current location and persist it to
     * localstorage
     */
    handleUserLocation = async () => {
        const [location, locationErr] = await promisify(
            Permissions.askAsync(Permissions.LOCATION),
        );
        if (locationErr) {
            throw new Error(locationErr);
        }

        if (!location || location.status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });

            return;
        }

        const [userLocation, userLocationErr] = await promisify(
            Location.getCurrentPositionAsync({}),
        );
        if (userLocationErr) {
            throw new Error(userLocationErr);
        }

        this.setState({ location: userLocation });

        /* eslint-disable no-unused-vars */
        const [_, saveUserLocationErr] = await promisify(
            this.props.userStore.saveUserLocationData(userLocation),
        );
        /* eslint-enable no-unused-vars */
        if (saveUserLocationErr) {
            console.log(saveUserLocationErr);

            throw new Error(saveUserLocationErr);
        }
    };

    async componentDidMount() {
        // Dev platform check @see expo location docs
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage:
                    'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this.handleUserLocation().then(async () => {
                await this.handleNearByUsers();
            });
            this.setState({ isLoading: false });

            // Update user location and nearByUsers in intervals
            const updateInterval = 1000 * 60; // One minute
            this.updateNearByUsersInterval = setInterval(() => {
                this.setState({ isLoading: true });
                this.handleUserLocation().then(async () => {
                    await this.handleNearByUsers();
                });
                this.setState({ isLoading: false });
            }, updateInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateNearByUsersInterval);
    }

    render() {
        const { isLoading, users } = this.state;
        if (isLoading) {
            return <Loader />;
        }
        return (
            <Box f={1} bg="white">
                <StatusBar barStyle="dark-content" />
                {this.state.errorMessage ? (
                    <Box f={1} center>
                        <Text>{this.state.errorMessage}</Text>
                    </Box>
                ) : null}
                {users.length > 0 ? (
                    <FlatList
                        data={users}
                        renderItem={({ item, index }) => (
                            <PeepProfileCard
                                user={item}
                                handlePress={() =>
                                    this.handleShowUserProfile(item)
                                }
                                key={item.id}
                                isLeft={this.isLeft(index)}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Box f={1} center>
                        <Text>
                            There are no users nearby. Increase your search
                            range in settings to see if anyone is out there.
                        </Text>
                    </Box>
                )}
            </Box>
        );
    }
}

export default Peep;
