import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import PropTypes from 'prop-types';

import { Row, Input, Button } from '../../../components/common';
import { theme } from '../../../constants/theme';

const rowSeperatorStyle = {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.color.greyLight,
};

function UserProfileForm({
    formStateValues,
    handleInput,
    handlePickImage,
    handleSubmit,
    profilePhoto,
    isLoading,
}) {
    return (
        <React.Fragment>
            <Row seperatorStyle={rowSeperatorStyle}>
                <Row.ColumnCenter>
                    <TouchableOpacity onPress={handlePickImage}>
                        <Box avatar circle={75} shadow={1}>
                            <Image
                                source={{
                                    uri: profilePhoto,
                                }}
                                style={{ width: 30, height: 30 }}
                            />
                        </Box>
                    </TouchableOpacity>
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="User Name"
                        onChangeText={text => handleInput('userName', text)}
                        value={formStateValues.userName}
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        spellCheck={false}
                        error={formStateValues.error}
                        label="User Name"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Bio"
                        onChangeText={text => handleInput('bio', text)}
                        value={formStateValues.bio}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        numberOfLines={6}
                        inputHeight={100}
                        multiline={true}
                        label="Bio"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Email"
                        onChangeText={text => handleInput('email', text)}
                        value={formStateValues.email}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        keyboardType="email-address"
                        label="Email"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Phone"
                        onChangeText={text => handleInput('phone', text)}
                        value={formStateValues.phone}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        keyboardType="phone-pad"
                        label="Phone"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Instagram username"
                        onChangeText={text =>
                            handleInput('instagramLink', text)
                        }
                        value={formStateValues.instagramLink}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        label="Instagram username"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Linkedin username"
                        onChangeText={text => handleInput('linkedinLink', text)}
                        value={formStateValues.linkedinLink}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        label="Linkedin username"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Input
                        placeholder="Twitter username"
                        onChangeText={text => handleInput('twitterLink', text)}
                        value={formStateValues.twitterLink}
                        clearButtonMode="while-editing"
                        error={formStateValues.error}
                        label="Twitter username"
                    />
                </Row.ColumnCenter>
            </Row>
            <Row>
                <Row.ColumnCenter>
                    <Button onPress={handleSubmit} isLoading={isLoading}>
                        <Box f={1} center>
                            <Text color="white">Update Info</Text>
                        </Box>
                    </Button>
                </Row.ColumnCenter>
            </Row>
        </React.Fragment>
    );
}

UserProfileForm.propTypes = {
    formStateValues: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired,
    handlePickImage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default UserProfileForm;
