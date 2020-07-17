import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import HeaderButton from './HeaderButton';
import { theme } from '../../constants';

function WriteButton({ color, size, ...rest }) {
    return (
        <HeaderButton {...rest}>
            <EvilIcons
                color={color ? color : theme.color.white}
                size={size ? size : 35}
                name="pencil"
            />
        </HeaderButton>
    );
}

WriteButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    rest: PropTypes.any,
};

export default WriteButton;
