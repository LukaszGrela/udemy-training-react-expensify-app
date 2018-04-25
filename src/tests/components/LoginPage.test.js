import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';


let wrapper, startLogin;

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage startLogin={startLogin} />);

});

test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('Should call startLogin on button click', () => {

    const button = wrapper.find('button.login');

    expect(button).toHaveLength(1);

    button.at(0).simulate('click');

    expect(startLogin).toHaveBeenCalled();

});

