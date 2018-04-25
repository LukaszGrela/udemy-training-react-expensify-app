import { LOGIN, logout, LOGOUT, login } from "../../actions/auth";

test('should return login action object', () => {
    const uid = 'abc';
    const action = login(uid);
    expect(action).toEqual({
        type: LOGIN,
        uid
    });
});

test('should return logout action object', () => {
    const action = logout();

    expect(action).toEqual({ type: LOGOUT });
});