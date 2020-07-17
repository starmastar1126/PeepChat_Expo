import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { types, flow } from 'mobx-state-tree';
import { Constants } from 'expo';

import { UserModel } from '../models';
import { loginEndpoint, userEndpoint } from '../api/Endpoints';
import { NavigationService } from '../services/NavigationService';
import { promisify } from '../utils';

const REQUEST_TIMEOUT = 5000;
const axiosDefaults = {
    timeout: REQUEST_TIMEOUT,
    validateStatus: function(status) {
        return status < 500;
    },
};

export const AuthStore = types
    .model('AuthStore', {
        userInfo: types.maybe(UserModel),
        authToken: types.maybe(types.string),
    })
    .actions(self => ({
        /**
         * Initalize user auth
         */
        setupAuth: flow(function*() {
            try {
                yield self.getAuthToken();
                yield self.getUserInfo();
            } catch (err) {
                console.log(err);

                yield self.logoutUser();
            }
        }),
        /**
         * Persist token from app state to local storage
         *
         * @param {string} token the jwt token returned from api
         * after user login / signup
         */
        saveAuthToken: flow(function*(token) {
            /* eslint-disable no-unused-vars */
            const [_, err] = yield promisify(
                AsyncStorage.setItem(
                    Constants.manifest.extra.jwtTokenStorageKey,
                    token,
                ),
            );
            /* eslint-enable no-unused-vars */
            if (err) {
                console.log(err);

                yield self.logoutUser();
            }
        }),
        /**
         * Retrive user authentication token from
         * localstrage to be used in app state
         */
        getAuthToken: flow(function*() {
            const [token, tokenErr] = yield promisify(
                AsyncStorage.getItem(
                    Constants.manifest.extra.jwtTokenStorageKey,
                ),
            );
            if (tokenErr) {
                console.log(tokenErr);

                yield self.logoutUser();
            }

            if (!token) {
                return NavigationService.navigate('Auth');
            }

            self.authToken = token;
        }),
        /**
         * Remove user from local storage and app state
         */
        logoutUser: flow(function*() {
            self.userInfo = undefined;
            self.authToken = undefined;

            /* eslint-disable no-unused-vars */
            const [_, err] = yield promisify(
                AsyncStorage.removeItem(
                    Constants.manifest.extra.jwtTokenStorageKey,
                ),
            );
            /* eslint-enable no-unused-vars */
            if (err) {
                console.log(err);
            }

            yield self.setupAuth();
        }),
        /**
         * Fetch user info based on JWT auth token
         * provided from login
         */
        getUserInfo: flow(function*() {
            if (self.authToken) {
                const url = `${userEndpoint}/me`;
                const [response, responseErr] = yield promisify(
                    axios(url, {
                        method: 'GET',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: self.authToken,
                        },
                        ...axiosDefaults,
                    }),
                );
                if (responseErr) {
                    console.log(responseErr);
                    yield self.logoutUser();
                }

                if (response.status !== 200 && response.status !== 304) {
                    throw new Error(response.data.message);
                }

                /**
                 * Set local app state
                 */
                if (response && response.data) {
                    self.userInfo = response.data.response;

                    console.log('Logged In User: ', self);
                    return NavigationService.navigate('Peep');
                }
            }

            console.log('No auth token.');
        }),
        /**
         * Client size oauth login logic
         *
         * @param {string} oauthToken thats returned from provider
         * @param {string} provider atm either 'FACEBOOK' / 'GOOGLE'
         */
        loginOAuth: flow(function*(oauthToken, provider) {
            const url = `${loginEndpoint}/oauth`;
            const [response, responseErr] = yield promisify(
                axios(url, {
                    method: 'POST',
                    data: JSON.stringify({
                        oauthToken,
                        provider,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    ...axiosDefaults,
                }),
            );
            if (responseErr) {
                throw new Error(responseErr);
            }

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            /**
             * Persist returned data from login
             */
            if (response && response.data.response.authToken) {
                self.authToken = response.data.response.authToken;
                /* eslint-disable no-unused-vars */
                const [_, err] = yield promisify(
                    Promise.all([
                        self.saveAuthToken(response.data.response.authToken),
                        self.getUserInfo(),
                    ]),
                );
                /* eslint-enable no-unused-vars */
                if (err) {
                    console.log(err);

                    yield self.logoutUser();
                }
            }
        }),
        /**
         * Client side basic email & password login
         *
         * @param {string} email
         * @param {string} password
         */
        loginBasic: flow(function*({ email, password }) {
            const url = `${loginEndpoint}/`;
            const [response, responseErr] = yield promisify(
                axios(url, {
                    method: 'POST',
                    data: JSON.stringify({ email, password }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    ...axiosDefaults,
                }),
            );
            if (responseErr) {
                throw new Error(responseErr);
            }

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            /**
             * Persist returned data to local state
             */
            if (response && response.data.response.authToken) {
                self.authToken = response.data.response.authToken;
                /* eslint-disable no-unused-vars */
                const [_, err] = yield promisify(
                    Promise.all([
                        self.saveAuthToken(response.data.response.authToken),
                        self.getUserInfo(),
                    ]),
                );
                /* eslint-enable no-unused-vars */
                if (err) {
                    console.log(err);

                    yield self.logoutUser();
                }
            }
        }),
        /**
         * Register a user
         *
         * @param {string} username
         * @param {string} email
         * @param {string} password
         */
        register: flow(function*(data) {
            const url = `${userEndpoint}/`;
            const [response, responseErr] = yield promisify(
                axios(url, {
                    method: 'POST',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    ...axiosDefaults,
                }),
            );

            if (responseErr) {
                throw new Error(responseErr);
            }

            if (response.status !== 201) {
                throw new Error(response.data.message);
            }

            /**
             * Persist returned data to local state
             */
            if (response && response.data.response.authToken) {
                self.authToken = response.data.response.authToken;
                /* eslint-disable no-unused-vars */
                const [_, err] = yield promisify(
                    Promise.all([
                        self.saveAuthToken(response.data.response.authToken),
                        self.getUserInfo(),
                    ]),
                );
                /* eslint-enable no-unused-vars */
                if (err) {
                    console.log(err);

                    yield self.logoutUser();
                }
            }
        }),
    }));
