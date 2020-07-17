import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const MARGIN_SIZE = 8;

function HeaderButton({ children, left, right, onPress, style }) {
    const _style = {};
    if (left) {
        _style.marginLeft = MARGIN_SIZE;
    } else if (right) {
        _style.marginRight = MARGIN_SIZE;
    }

    return (
        <TouchableOpacity style={[_style, style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
}

HeaderButton.propTypes = {
    children: PropTypes.any,
    left: PropTypes.bool,
    right: PropTypes.bool,
    onPress: PropTypes.func,
    style: PropTypes.object,
};

export default HeaderButton;
