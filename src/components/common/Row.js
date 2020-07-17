import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import { NavigationService } from '../../services/NavigationService';

const ColumnLeft = ({ children }) => (
    <Box flex={0.5} align="start">
        {children}
    </Box>
);

const ColumnRight = ({ children }) => (
    <Box f={0.5} align="end">
        {children}
    </Box>
);

const ColumnCenter = ({ children }) => (
    <Box f={1} center>
        {children}
    </Box>
);

class Row extends React.PureComponent {
    static ColumnLeft = ColumnLeft;
    static ColumnRight = ColumnRight;
    static ColumnCenter = ColumnCenter;

    renderContent = () => {
        const { seperatorStyle, children } = this.props;
        return (
            <Box
                dir="row"
                p="sm"
                align="center"
                justify="between"
                style={seperatorStyle ? seperatorStyle : null}>
                {children}
            </Box>
        );
    };

    handlePress = () => {
        NavigationService.navigate(this.props.link);
    };

    render() {
        if (this.props.link) {
            return (
                <TouchableOpacity onPress={this.handlePress}>
                    {this.renderContent()}
                </TouchableOpacity>
            );
        }

        return this.renderContent();
    }
}

const childrenProps = {
    children: PropTypes.any,
};

ColumnLeft.propTypes = childrenProps;
ColumnRight.propTypes = childrenProps;
ColumnCenter.propTypes = childrenProps;
Row.propTypes = {
    ...childrenProps,
    link: PropTypes.string,
    seperatorStyle: PropTypes.object,
};

export default Row;
