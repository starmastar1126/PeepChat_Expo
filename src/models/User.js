import { types } from 'mobx-state-tree';

export const UserModel = types.model('UserModel', {
    id: types.identifier,
    userName: types.string,
    email: types.string,
    profilePhoto: types.maybeNull(types.string),
});
