import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { Box } from 'react-native-design-utility';
import PropTypes from 'prop-types';

function Button({ children, onPress, backgroundColor, disabled, isLoading }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <Box
                shadow={1}
                dir="row"
                align="center"
                bg={backgroundColor ? backgroundColor : 'peepBlue'}
                w="100%"
                self="center"
                p="xs"
                mb="sm"
                h={45}
                radius="xs"
                center
                rows={[1]}>
                <Box f={1} center>
                    {!isLoading ? (
                        <React.Fragment>{children}</React.Fragment>
                    ) : (
                        <ActivityIndicator size="small" color="white" />
                    )}
                </Box>
            </Box>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backgroundColor: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
};

export default Button;
