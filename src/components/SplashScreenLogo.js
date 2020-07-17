import React from 'react';
import { Image } from 'react-native';
import { Box } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import { images } from '../constants/images';

function SplashScreenLogo({ width = 350, height = 350 }) {
    return (
        <Box f={1} center>
            <Box mb="sm">
                <Image
                    source={images.logo}
                    style={{
                        width,
                        height,
                    }}
                />
            </Box>
        </Box>
    );
}

SplashScreenLogo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

export default SplashScreenLogo;
