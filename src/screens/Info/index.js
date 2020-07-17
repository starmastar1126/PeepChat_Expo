import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Share,
    SafeAreaView,
    Dimensions,
    ScrollView,
} from 'react-native';
import { inject } from 'mobx-react/native';
import { images } from '../../constants';
import { userStorePropTypes, authStorePropTypes } from '../../types';

@inject('authStore')
@inject('userStore')
class Info extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userSpotNum: 0,
            usersCount: 0,
        };
    }

    static propTypes = {
        ...userStorePropTypes,
        ...authStorePropTypes,
    };

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        this.props.authStore.getUserInfo();
        const users = await this.props.userStore.allUsers();
        this.setState({
            userSpotNum: users.length, //! To be changed in the future
            usersCount: users.length,
        });
    }

    onShare() {
        Share.share(
            {
                message:
                    'Peeped you’re not on PeepX yet. It’s a new social network. Let’s be the first ones. https://bit.ly/2SOsa0J',
                title: 'PeepX',
            },
            {
                //* Android Only
                dialogTitle: 'Share Peep with your Peeps',
                //* iOS only:
                excludedActivityTypes: [],
            },
        );
    }

    render() {
        const Wrapper = ({ children }) => {
            const height = Dimensions.get('window').height;
            const WrapperComponent = height >= 640 ? View : ScrollView;
            return (
                <WrapperComponent style={styles.container}>
                    {children}
                </WrapperComponent>
            );
        };
        return (
            <SafeAreaView style={styles.container}>
                <Wrapper>
                    <View style={styles.mainContainer}>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {`Congrats ${this.props.authStore.userInfo.userName}!!!`}
                            </Text>
                            <Text style={styles.subtitle}>
                                {`You're now joining #${this.state.userSpotNum} people who are being productive!`}
                            </Text>
                        </View>

                        <View style={styles.unlockedContainer}>
                            <View style={styles.unlockedElement}>
                                <Image
                                    style={styles.unlockedIcon}
                                    source={images.lock}
                                />
                                <View style={styles.unlockedElementText}>
                                    <Text>
                                        Explore - {'\n'}
                                        Continue traveling to unlock endless
                                        hidden opportunities everywhere you go.
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.unlockedElement}>
                                <Image
                                    style={styles.unlockedIcon}
                                    source={images.lock}
                                />
                                <View style={styles.unlockedElementText}>
                                    <Text>
                                        Peep - {'\n'}
                                        Use the preview snapshot system to gain
                                        exposure for your crafts and talents
                                        wherever you go and find new content.
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.unlockedElement}>
                                <Image
                                    style={styles.unlockedIcon}
                                    source={images.lock}
                                />
                                <View style={styles.unlockedElementText}>
                                    <Text>
                                        Repeat - {'\n'}
                                        Continue to make connects and seize
                                        life’s opportunities
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerTitle}>
                                Peeps invited
                            </Text>
                            <View>
                                <Text style={styles.userCountText}>
                                    Users: {this.state.usersCount} of 500
                                </Text>
                                <Image
                                    source={images.alphaCount}
                                    style={styles.barImage}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.shareButton}
                                onPress={() => this.onShare()}>
                                <Text style={styles.shareButtonText}>
                                    SPREAD THE WORD
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.logOutButton}
                                onPress={() =>
                                    this.props.authStore.logoutUser()
                                }>
                                <Text style={styles.logOutText}>LOG OUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Wrapper>
            </SafeAreaView>
        );
    }
}

// Going to need converting to ./constants/theme styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 24,
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'column',
        paddingVertical: '3%',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
    },
    unlockedContainer: {
        justifyContent: 'flex-start',
    },
    unlockedElement: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    unlockedElementText: {
        flex: 1,
        alignItems: 'flex-start',
    },
    unlockedIcon: {
        width: 70,
        height: 70,
    },
    footer: {
        borderColor: 'blue',
        justifyContent: 'center',
    },
    footerTitle: {
        marginVertical: 10,
        fontSize: 12,
        textAlign: 'center',
    },
    userCountText: {
        fontSize: 12,
        marginLeft: 10,
    },
    barImage: {
        alignSelf: 'center',
        marginTop: 10,
        width: '100%',
    },
    shareButton: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#4dbff8',
        borderColor: '#006aa0',
        borderWidth: 1,
        borderRadius: 12,
        width: '100%',
        paddingVertical: '3%',
    },
    shareButtonText: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#ffffff',
    },
    logOutButton: {
        marginVertical: 13,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    logOutText: {
        marginVertical: 5,
        fontSize: 12,
        fontStyle: 'italic',
        color: '#4dbff8',
    },
});

export default Info;
