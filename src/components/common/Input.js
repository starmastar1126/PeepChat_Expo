import React from 'react';
import { TextInput } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import { theme } from '../../constants';

function Input({ containerStyle, inputHeight, label, error, ...rest }) {
    return (
        <React.Fragment>
            <Box
                w="100%"
                h={inputHeight ? inputHeight : 55}
                p="xs"
                mt="xs"
                mb="xs"
                style={[
                    {
                        borderBottomWidth: 1,
                        borderBottomColor: error
                            ? theme.color.red
                            : theme.color.greyLight,
                    },
                    containerStyle,
                ]}>
                {label ? (
                    <Text size="xs" color={theme.color.greyLight} pb="xs">
                        {label}
                    </Text>
                ) : null}
                <TextInput
                    style={{ flex: 1, height: 50 }}
                    selectionColor={theme.color.peepBlue}
                    placeholderTextColor={error ? theme.color.red : null}
                    underlineColorAndroid="transparent"
                    {...rest}
                />
            </Box>
        </React.Fragment>
    );
}

Input.propTypes = {
    containerStyle: PropTypes.object,
    error: PropTypes.string,
    rest: PropTypes.any,
    inputHeight: PropTypes.any,
    label: PropTypes.any,
};

export default Input;
