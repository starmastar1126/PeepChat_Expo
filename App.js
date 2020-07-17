import React from 'react';
import { Font } from 'expo';
import { UIManager } from 'react-native';
import { UtilityThemeProvider } from 'react-native-design-utility';
import { Provider } from 'mobx-react/native';

import Root from './src/Root';
import { images, theme } from './src/constants';
import cacheImages from './src/utils/cacheImages';
import { Loader } from './src/components/common';
import { store } from './src/stores';

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
    state = { isReady: false };

    componentDidMount() {
        this.cacheAndLoadAssets();
    }

    cacheAndLoadAssets = async () => {
        const imageAssets = cacheImages([...Object.values(images)]);

        await Promise.all([...imageAssets]);

        await Font.loadAsync({
            fontello: require('./assets/fonts/fontello.ttf'),
        });

        this.setState({ isReady: true });
    };

    render() {
        if (!this.state.isReady) {
            return <Loader size="large" />;
        }

        return (
            <Provider {...store}>
                <UtilityThemeProvider theme={theme}>
                    <Root />
                </UtilityThemeProvider>
            </Provider>
        );
    }
}
