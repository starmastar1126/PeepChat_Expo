import React from 'react';
import { Box } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';

import SplashScreenLogo from '../../components/SplashScreenLogo';
import { authStorePropTypes } from '../../types';

@inject('authStore')
class Splash extends React.Component {
    static propTypes = {
        ...authStorePropTypes,
    };

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = () => {
        this.checkAuthTimeout = setTimeout(async () => {
            await this.props.authStore.setupAuth();
        }, 1500);
    };

    componentWillUnmount() {
        clearTimeout(this.checkAuthTimeout);
    }

    render() {
        return (
            <Box f={1} center>
                <SplashScreenLogo />
            </Box>
        );
    }
}

export default Splash;
