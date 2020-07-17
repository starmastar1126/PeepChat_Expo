import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Box, Text } from 'react-native-design-utility';
import { Feather } from '@expo/vector-icons';

import { theme } from '../../constants';

function LinkWithArrow({
    onPress,
    disabled,
    text,
    textColor,
    arrowLeft,
    arrowRight,
    arrowUp,
    arrowDown,
}) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Box dir="row" f={1} center>
                {arrowLeft && (
                    <Feather
                        name="chevrons-left"
                        color={textColor ? textColor : theme.color.peepBlue}
                        size={20}
                    />
                )}
                <Text color={textColor ? textColor : theme.color.peepBlue}>
                    {text}
                </Text>
                {arrowRight && (
                    <Feather
                        name="chevrons-right"
                        color={textColor ? textColor : theme.color.peepBlue}
                        size={20}
                    />
                )}
                {arrowUp && (
                    <Feather
                        name="chevrons-up"
                        color={textColor ? textColor : theme.color.peepBlue}
                        size={20}
                    />
                )}
                {arrowDown && (
                    <Feather
                        name="chevrons-down"
                        color={textColor ? textColor : theme.color.peepBlue}
                        size={20}
                    />
                )}
            </Box>
        </TouchableOpacity>
    );
}

LinkWithArrow.propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    textColor: PropTypes.string,
    arrowLeft: PropTypes.bool,
    arrowRight: PropTypes.bool,
    arrowUp: PropTypes.bool,
    arrowDown: PropTypes.bool,
};

export default LinkWithArrow;
