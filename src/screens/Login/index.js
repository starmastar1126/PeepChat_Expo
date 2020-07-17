import React from 'react';
import { Animated, Image } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';

import SplashScreenLogo from '../../components/SplashScreenLogo';
import { Button, Input, LinkWithArrow } from '../../components/common';
import { GoogleApi } from '../../api/Google';
import { theme } from '../../constants';
import { NavigationService } from '../../services/NavigationService';
import { isEmptyInput, promisify } from '../../utils';
import { authStorePropTypes } from '../../types';
import { images } from '../../constants/images';

const initialState = {
    opacity: new Animated.Value(0),
    position: new Animated.Value(0),
    email: '',
    password: '',
    isLoading: false,
    disableLoginButton: false,
    disableOAuthButtons: false,
    error: '',
};

@inject('authStore')
class Login extends React.Component {
    static propTypes = {
        ...authStorePropTypes,
    };

    state = { ...initialState };

    handleOpacityAnimation = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 350,
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
            disableLoginButton: true,
            disableOAuthButtons: true,
        });

        const [token, tokenErr] = await promisify(GoogleApi.loginAsync());
        if (tokenErr) {
            console.log(tokenErr);

            this.setState({
                disableLoginButton: false,
                disableOAuthButtons: false,
            });
        }

        /**
         * Handle cancelled login requests
         * As in the login methods we return null
         * if cancelled
         */
        if (!token) {
            this.setState({
                disableLoginButton: false,
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
                disableLoginButton: false,
                disableOAuthButtons: false,
                error: err.toString(),
            });
        }
    };

    handleEmailPasswordLogin = async () => {
        this.setState({
            isLoading: true,
            disableLoginButton: true,
            disableOAuthButtons: true,
        });

        const { email, password } = this.state;
        const userInput = { email, password };
        const checkInputValues = isEmptyInput(userInput);
        if (checkInputValues) {
            /* eslint-disable no-unused-vars */
            const [_, err] = await promisify(
                this.props.authStore.loginBasic(userInput),
            );
            /* eslint-enable no-unused-vars */
            if (err) {
                console.log(err);

                this.setState({
                    isLoading: false,
                    disableLoginButton: false,
                    disableOAuthButtons: false,
                    error: err.toString(),
                });
            }
        } else {
            this.setState({
                isLoading: false,
                disableLoginButton: false,
                disableOAuthButtons: false,
                error: 'You must fill in fields.',
            });
        }
    };

    handleInput = (name, value) => {
        this.setState({ [name]: value });
    };

    handleRegisterNavigation = () => {
        NavigationService.navigate('Register');
    };

    componentDidMount() {
        Animated.parallel([
            this.handleOpacityAnimation(),
            this.handlePositionAnimation(),
        ]);
        this.props.authStore.setupAuth();
    }

    render() {
        const {
            position,
            opacity,
            email,
            password,
            error,
            isLoading,
            disableLoginButton,
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
                            flex: 0.7,
                            transform: [
                                {
                                    translateY: logoTranslate,
                                },
                            ],
                        }}>
                        <SplashScreenLogo width={300} height={300} />
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 0.6,
                            alignItems: 'center',
                            width: '100%',
                            opacity,
                        }}>
                        <Box
                            style={{
                                width: '100%',
                                flex: 0.8,
                            }}
                            mb="xs">
                            {!!error && (
                                <Box f={1} h={15} center>
                                    <Text color="red" bold>
                                        {error}
                                    </Text>
                                </Box>
                            )}
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
                        <Box f={0.4} w="100%">
                            <Button
                                onPress={this.handleEmailPasswordLogin}
                                disabled={disableLoginButton}
                                isLoading={isLoading}>
                                <Box f={1} center>
                                    <Text color="white">Login</Text>
                                </Box>
                            </Button>
                        </Box>
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 0.4,
                            width: '100%',
                            flexDirection: 'column',
                            opacity,
                            borderTopWidth: 1,
                            borderTopColor: theme.color.greyLighter,
                        }}>
                        <Box f={1} center w="100%">
                            <LinkWithArrow
                                onPress={this.handleRegisterNavigation}
                                disabled={disableLoginButton}
                                text="Register"
                                arrowRight={true}
                            />
                        </Box>
                        <Box f={1} center w="100%">
                            <Button
                                onPress={this.handleGoogleLogin}
                                disabled={disableOAuthButtons}
                                backgroundColor="#4285f4">
                                <Box f={1} dir="row">
                                    <Image
                                        source={images.googleButton}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            position: 'absolute',
                                        }}
                                    />
                                    <Box f={1} dir="row" center>
                                        <Text f={1} color="white" self="center">
                                            Google
                                        </Text>
                                    </Box>
                                </Box>
                            </Button>
                        </Box>
                    </Animated.View>
                </Box>
            </Box>
        );
    }
}

export default Login;
