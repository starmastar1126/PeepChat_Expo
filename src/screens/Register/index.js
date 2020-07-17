import React from 'react';
import { Animated } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';

import SplashScreenLogo from '../../components/SplashScreenLogo';
import { Button, Input, LinkWithArrow } from '../../components/common';
import { GoogleApi } from '../../api/Google';
import { theme } from '../../constants';
import { NavigationService } from '../../services/NavigationService';
import { isEmptyInput, promisify } from '../../utils';
import { authStorePropTypes } from '../../types';

const initialState = {
    opacity: new Animated.Value(0),
    position: new Animated.Value(0),
    userName: '',
    email: '',
    password: '',
    isLoading: false,
    disableRegistrationButton: false,
    disableOAuthButtons: false,
    error: '',
};

@inject('authStore')
class Register extends React.Component {
    static propTypes = {
        ...authStorePropTypes,
    };

    state = { ...initialState };

    handleOpacityAnimation = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 850,
            delay: 100,
        }).start();
    };

    handlePositionAnimation = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true,
        }).start();
    };

    handleGoogleLogin = async () => {
        this.setState({
            disableRegistrationButton: true,
            disableOAuthButtons: true,
        });

        const [token, tokenErr] = await promisify(GoogleApi.loginAsync());
        if (tokenErr) {
            console.log(tokenErr);

            this.setState({
                disableRegistrationButton: false,
                disableOAuthButtons: false,
            });
        }

        /**
         * Handle cancelled register requests
         * As in the register methods we return null
         * if cancelled
         */
        if (!token) {
            this.setState({
                disableRegistrationButton: false,
                disableOAuthButtons: false,
            });

            return;
        }

        /* eslint-disable no-unused-vars */
        const [_, err] = await promisify(
            this.props.authStore.loginOAuth(token, 'GOOGLE'),
        );
        /* eslint-enable no-unused-vars */
        if (err) {
            console.log(err);

            this.setState({
                disableRegistrationButton: false,
                disableOAuthButtons: false,
                error: err.toString(),
            });
        }
    };

    handleRegistration = async () => {
        this.setState({
            isLoading: true,
            disableRegistrationButton: true,
            disableOAuthButtons: true,
        });

        const { userName, email, password } = this.state;
        const userInput = { userName, email, password };

        const checkInputValues = isEmptyInput(userInput);
        if (checkInputValues) {
            /* eslint-disable no-unused-vars */
            const [_, err] = await promisify(
                this.props.authStore.register(userInput),
            );
            /* eslint-enable no-unused-vars */
            if (err) {
                console.log(err);

                this.setState({
                    isLoading: false,
                    disableRegistrationButton: false,
                    disableOAuthButtons: false,
                    error: err.toString(),
                });
            }
        } else {
            this.setState({
                isLoading: false,
                disableRegistrationButton: false,
                disableOAuthButtons: false,
                error: 'You must fill in fields.',
            });
        }
    };

    handleInput = (name, value) => {
        this.setState({ [name]: value });
    };

    handleLoginNavigation = () => {
        NavigationService.back();
    };

    componentDidMount() {
        Animated.parallel([
            this.handleOpacityAnimation(),
            this.handlePositionAnimation(),
        ]);
    }

    render() {
        const {
            position,
            opacity,
            userName,
            email,
            password,
            error,
            isLoading,
            disableRegistrationButton,
            disableOAuthButtons,
        } = this.state;
        const logoTranslate = position.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 15],
        });
        return (
            <Box f={1} center bg="white">
                <Box f={1} w="80%">
                    <Animated.View
                        style={{
                            flex: 0.45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [
                                {
                                    translateY: logoTranslate,
                                },
                            ],
                        }}>
                        <SplashScreenLogo width={250} height={250} />
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            width: '100%',
                            opacity,
                        }}>
                        <Box f={1} w="100%" mb="xs">
                            {!!error && (
                                <Box f={1} h={15} center>
                                    <Text color="red" bold>
                                        {error}
                                    </Text>
                                </Box>
                            )}
                            <Input
                                placeholder="UserName"
                                onChangeText={text =>
                                    this.handleInput('userName', text)
                                }
                                value={userName}
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                spellCheck={false}
                                error={error}
                                label="User Name"
                            />
                            <Input
                                placeholder="Email"
                                onChangeText={text =>
                                    this.handleInput('email', text)
                                }
                                value={email}
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                spellCheck={false}
                                error={error}
                                label="Email"
                            />
                            <Input
                                placeholder="Password"
                                onChangeText={text =>
                                    this.handleInput('password', text)
                                }
                                value={password}
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                secureTextEntry={true}
                                spellCheck={false}
                                error={error}
                                label="Password"
                            />
                        </Box>
                        <Box
                            style={{
                                flex: 0.2,
                                width: '100%',
                            }}>
                            <Button
                                onPress={this.handleRegistration}
                                disabled={disableRegistrationButton}
                                isLoading={isLoading}>
                                <Box f={1} center>
                                    <Text color="white">Register</Text>
                                </Box>
                            </Button>
                        </Box>
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 0.35,
                            width: '100%',
                            flexDirection: 'column',
                            opacity,
                            borderTopWidth: 1,
                            borderTopColor: theme.color.greyLighter,
                        }}>
                        <Box f={1} center w="100%">
                            <LinkWithArrow
                                onPress={this.handleLoginNavigation}
                                disabled={disableRegistrationButton}
                                text="Login"
                                arrowLeft={true}
                            />
                        </Box>
                        <Box f={1} center w="100%">
                            <Button
                                onPress={this.handleGoogleLogin}
                                disabled={disableOAuthButtons}
                                backgroundColor="googleGreen">
                                <Box f={1} center>
                                    <Text color="white">Google</Text>
                                </Box>
                            </Button>
                        </Box>
                    </Animated.View>
                </Box>
            </Box>
        );
    }
}

export default Register;
