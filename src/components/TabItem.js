import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { createIconSetFromFontello, Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { tabBarIcons, theme } from '../constants';
import fontelloConfig from '../../config.json';
import { NavigationService } from '../services/NavigationService';

const Icon = createIconSetFromFontello(fontelloConfig);

class TabItem extends React.PureComponent {
    handlePress = () => {
        NavigationService.navigate(this.props.routeName);
    };

    render() {
        const { routeName, isActive } = this.props;
        let tintColor = 'gray';
        let textColor = 'greyDark';
        if (isActive) {
            tintColor = theme.color.peepBlue;
            textColor = theme.color.peepBlue;
        }
        const iconName = tabBarIcons[routeName];
        return (
            <Box f={1} pt={10} center>
                <TouchableOpacity
                    onPress={this.handlePress}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Box mb={3}>
                        {iconName !== 'ios-list-box' ? (
                            <Icon name={iconName} size={25} color={tintColor} />
                        ) : (
                            <Ionicons
                                name={iconName}
                                size={25}
                                color={tintColor}
                            />
                        )}
                    </Box>
                    <Box>
                        <Text size="xs" ls={0.12} color={textColor} lowercase>
                            {routeName}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        );
    }
}

TabItem.propTypes = {
    routeName: PropTypes.string,
    isActive: PropTypes.bool,
    navigation: PropTypes.any,
};

export default TabItem;
