import React from 'react';
import PropTypes from 'prop-types';

import { View, WebView } from 'react-native';

const SocialView = ({ uri, style }) => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                style={{
                    ...style,
                    height: '100%',
                }}
                source={{ uri }}
            />
        </View>
    );
};

export const TwitterView = ({ uri }) => {
    return (
        <SocialView
            style={{ marginTop: -100 }}
            uri={`https://twitter.com/${uri}`}
        />
    );
};
export const InstagramView = ({ uri }) => {
    return (
        <SocialView
            style={{ marginTop: -50 }}
            uri={`https://instagram.com/${uri}`}
        />
    );
};
export const LinkedinView = ({ uri }) => {
    return (
        <SocialView
            style={{ marginTop: -52 }}
            uri={`https://linkedin.com/in/${uri}`}
        />
    );
};

SocialView.propTypes = {
    uri: PropTypes.string,
    style: PropTypes.object,
};

TwitterView.propTypes = { uri: PropTypes.string };
InstagramView.propTypes = { uri: PropTypes.string };
LinkedinView.propTypes = { uri: PropTypes.string };
