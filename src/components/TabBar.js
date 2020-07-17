import React from 'react';
import { Box } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import TabItem from './TabItem';

function TabBar({ navigation }) {
    const { routes, index } = navigation.state;
    return (
        <Box h={60} bg="white" dir="row" shadow={0}>
            {routes.map((route, i) => (
                <TabItem
                    key={route.routeName}
                    {...route}
                    {...this.props}
                    isActive={index === i}
                />
            ))}
        </Box>
    );
}

TabBar.propTypes = {
    navigation: PropTypes.any,
};

export default TabBar;
