import authReducer from "../../reducers/auth";
import { login, logout } from "../../actions/auth";

test('should set default state', () => {
    const state = authReducer(undefined, '@@INIT');
    expect(state).toEqual({});
});

test('should set auth uid on login', () => {
    const uid = 'abc';
    const state = authReducer({}, login(uid));

    expect(state).toEqual({
        uid
    });
});

test('should set empty object on logout', () => {
    const state = authReducer({ uid: 'abc' }, logout());

    expect(state).toEqual({});
});