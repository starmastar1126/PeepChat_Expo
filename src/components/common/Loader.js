import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from 'react-native-design-utility';
import PropTypes from 'prop-types';

function Loader({ size }) {
    return (
        <Box f={1} center bg="white">
            <ActivityIndicator size={size || 'large'} />
        </Box>
    );
}

Loader.propTypes = {
    size: PropTypes.string,
};

export default Loader;
