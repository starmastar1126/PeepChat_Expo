import React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import { NavigationService } from './services/NavigationService';
import { theme } from './constants/theme';
import TabBar from './components/TabBar';
import ErrorBoundary from './ErrorBoundary';

const primaryHeader = {
    headerStyle: {
        backgroundColor: theme.color.peepBlue,
        marginTop: 5,
    },
    headerTintColor: theme.color.white,
};

const AuthNavigator = createStackNavigator(
    {
        Login: {
            getScreen: () => require('./screens/Login').default,
        },
        Register: {
            getScreen: () => require('./screens/Register').default,
        },
    },
    {
        navigationOptions: {
            header: null,
        },
    },
);

// const NewsFeedStack = createStackNavigator(
//     {
//         NewsFeed: {
//             getScreen: () => require('./screens/NewsFeed').default,
//         },
//     },
//     {
//         navigationOptions: primaryHeader,
//     },
// );

const PeepStack = createStackNavigator(
    {
        Peep: {
            getScreen: () => require('./screens/Peep').default,
        },
        PeepProfile: {
            getScreen: () => require('./screens/PeepProfile').default,
        },
    },
    {
        navigationOptions: primaryHeader,
    },
);

// const NotificationsStack = createStackNavigator(
//     {
//         Notifications: {
//             getScreen: () => require('./screens/Notifications').default,
//         },
//     },
//     {
//         navigationOptions: primaryHeader,
//     },
// );

const ProfileStack = createStackNavigator(
    {
        Profile: {
            getScreen: () => require('./screens/UserProfile').default,
        },
        Settings: {
            getScreen: () => require('./screens/Settings').default,
        },
        ProfileUpdate: {
            getScreen: () => require('./screens/UserProfileUpdate').default,
        },
        Help: {
            getScreen: () => require('./screens/Help').default,
        },
    },
    {
        mode: 'modal',
        navigationOptions: primaryHeader,
    },
);

const TabNavigator = createBottomTabNavigator(
    {
        // NewsFeed: NewsFeedStack,
        Peep: PeepStack,
        // Notifications: NotificationsStack,
        Profile: ProfileStack,
    },
    {
        tabBarComponent: props => <TabBar {...props} />,
    },
);

const MainNavigator = createStackNavigator(
    {
        Tab: TabNavigator,
    },
    {
        mode: 'modal',
        navigationOptions: {
            header: null,
        },
    },
);

const AppNavigator = createSwitchNavigator(
    {
        Splash: {
            getScreen: () => require('./screens/Splash').default,
        },
        Auth: AuthNavigator,
        Main: MainNavigator,
    },
    {
        initialRouteName: 'Splash',
    },
);

export default class Root extends React.Component {
    render() {
        return (
            <ErrorBoundary>
                <AppNavigator
                    ref={r => NavigationService.setTopLevelNavigator(r)}
                />
            </ErrorBoundary>
        );
    }
}
