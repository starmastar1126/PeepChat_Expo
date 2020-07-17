import { Google, Constants } from 'expo';

import { promisify } from '../utils';

const scopes = ['profile', 'email'];

async function loginAsync() {
    const noAppIdReject = () =>
        Promise.reject({
            code: 500,
            message: 'Google app id must be provided.',
        });

    const reverse = str =>
        str
            .split('')
            .reverse()
            .join('');

    let googleCredentials;
    if (Constants.appOwnership === 'standalone') {
        const {
            manifest: { extra },
        } = Constants;
        googleCredentials = {
            androidClientId: reverse(extra.googleClientIdAndroid),
            iosClientId: reverse(extra.googleClientIdIos),
            scopes,
            behavior: 'web',
        };
        if (
            googleCredentials.androidClientId.trim() === '' &&
            googleCredentials.iosClientId.trim() === ''
        ) {
            return noAppIdReject();
        }
    } else {
        googleCredentials = {
            androidClientId: String(process.env.GOOGLE_APP_ID_ANDROID),
            iosClientId: String(process.env.GOOGLE_APP_ID_IOS),
            scopes,
            behavior: 'web',
        };
        if (
            googleCredentials.androidClientId.trim() === '' &&
            googleCredentials.iosClientId.trim() === ''
        ) {
            return noAppIdReject();
        }
    }

    const [google, googleErr] = await promisify(
        Google.logInAsync(googleCredentials),
    );
    if (googleErr) {
        console.log(googleErr);

        return Promise.reject(googleErr);
    }

    const { type, accessToken } = google;

    if (type === 'cancel') {
        return Promise.resolve(null);
    }

    if (type !== 'success' || !accessToken) {
        return Promise.reject({
            code: 500,
            message: 'Error in google auth process.',
        });
    }

    return Promise.resolve(accessToken);
}

export const GoogleApi = {
    loginAsync,
};
