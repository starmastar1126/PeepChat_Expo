import PropTypes from 'prop-types';

const userShape = {
    id: PropTypes.string,
    userName: PropTypes.string,
    email: PropTypes.string,
    profilePhoto: PropTypes.string,
    authToken: PropTypes.string,
};

export const authStorePropTypes = {
    authStore: PropTypes.shape({
        setupAuth: PropTypes.func,
        saveAuthToken: PropTypes.func,
        getAuthToken: PropTypes.func,
        logoutUser: PropTypes.func,
        getUserInfo: PropTypes.func,
        loginOAuth: PropTypes.func,
        loginBasic: PropTypes.func,
        register: PropTypes.func,
        userInfo: PropTypes.shape(userShape),
    }),
};

export const userStorePropTypes = {
    userStore: PropTypes.shape({
        allUsers: PropTypes.func,
        saveUserLocationData: PropTypes.func,
        getUserLocationData: PropTypes.func,
        oneUser: PropTypes.func,
        updateUserLocation: PropTypes.func,
        getNearByUsers: PropTypes.func,
        updateUserProfile: PropTypes.func,
        users: PropTypes.shape(userShape),
    }),
};

export const navigationPropTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
};
