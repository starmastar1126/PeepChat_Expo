import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import HeaderButton from './HeaderButton';
import { theme } from '../../constants';
import { NavigationService } from '../../services/NavigationService';

class CloseButton extends React.PureComponent {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        rest: PropTypes.any,
    };

    handleClose = () => {
        NavigationService.back();
    };

    render() {
        const { color, size, ...rest } = this.props;
        return (
            <HeaderButton {...rest} left onPress={this.handleClose}>
                <EvilIcons
                    color={color ? color : theme.color.white}
                    size={size ? size : 25}
                    name="close"
                />
            </HeaderButton>
        );
    }
}

export default CloseButton;
