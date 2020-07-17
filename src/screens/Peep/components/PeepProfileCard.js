import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { Thumbnail } from 'native-base';
import PropTypes from 'prop-types';

import { theme } from '../../../constants';

function PeepProfileCard({ user, isLeft, handlePress }) {
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={{
                borderBottomWidth: 1,
                borderColor: theme.color.peepBlue,
            }}>
            <View
                style={[
                    styles.profileContainer,
                    isLeft ? styles.leftAlign : styles.rightAlign,
                ]}>
                <Thumbnail
                    large
                    source={{
                        uri: user.profilePhoto
                            ? user.profilePhoto
                            : 'https://pbs.twimg.com/profile_images/453956388851445761/8BKnRUXg.png',
                    }}
                    style={styles.image}
                />
                <Box w="50%" mr="sm" ml="sm">
                    <Text>
                        {user.bio ? user.bio.slice(0, 30) : null}
                        ...
                    </Text>
                    <Text m="sm" bold>
                        Dist: {user.location.distance}
                    </Text>
                </Box>
            </View>
        </TouchableOpacity>
    );
}

PeepProfileCard.propTypes = {
    user: PropTypes.object.isRequired,
    isLeft: PropTypes.bool.isRequired,
    handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    leftAlign: {
        flexDirection: 'row',
    },
    rightAlign: {
        flexDirection: 'row-reverse',
    },
    profileContainer: {
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'flex-end',
        margin: 10,
    },
    bio: {
        maxWidth: '50%',
        marginLeft: 10,
        marginRight: 10,
    },
});

export default PeepProfileCard;
