import { AuthStore } from './Auth';
import { UserStore } from './User';

const authStore = AuthStore.create();
const userStore = UserStore.create();

export const store = {
    authStore,
    userStore,
};
