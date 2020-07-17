import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    static propTypes = {
        children: PropTypes.node,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log({ error, info });
    }

    render() {
        if (this.state.hasError) {
            return <Text>Something went wrong.</Text>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
