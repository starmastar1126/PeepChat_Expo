import React from 'react';
import { EvilIcons } from '@expo/vector-icons';

import HeaderButton from './HeaderButton';
import { NavigationService } from '../../services/NavigationService';

export default class SettingsButton extends React.PureComponent {
    handleNavigate = () => {
        NavigationService.navigate('Settings');
    };

    render() {
        return (
            <HeaderButton left onPress={this.handleNavigate}>
                <EvilIcons name="gear" color="white" size={28} />
            </HeaderButton>
        );
    }
}
