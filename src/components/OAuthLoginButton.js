import React from 'react';
import { Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import { images } from '../constants/images';

function bgColor(type) {
    switch (type) {
        case 'google':
            return 'googleBlue';
        case 'facebook':
            return 'facebookBlue';
        default:
            return 'blue';
    }
}

function OAuthLoginButton({ provider, icon, onPress, disabled, isLoading }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Box
                shadow={1}
                dir="row"
                align="center"
                bg={bgColor(provider.toLowerCase())}
                w="80%"
                self="center"
                p="xs"
                mb="sm"
                radius="xs">
                {!isLoading ? (
                    <React.Fragment>
                        <Box mr="sm">
                            <Box bg="white" h={32} w={32} radius="xs" center>
                                {images[icon] ? (
                                    <Image source={images[icon]} />
                                ) : (
                                    <Text
                                        color={bgColor(provider.toLowerCase())}>
                                        {provider.charAt(0)}
                                    </Text>
                                )}
                            </Box>
                        </Box>
                        <Box>
                            <Text color="white">{provider}</Text>
                        </Box>
                    </React.Fragment>
                ) : (
                    <Box>
                        <Text color="white">
                            <ActivityIndicator size="small" />
                        </Text>
                    </Box>
                )}
            </Box>
        </TouchableOpacity>
    );
}

OAuthLoginButton.propTypes = {
    provider: PropTypes.string,
    icon: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
};

export default OAuthLoginButton;
