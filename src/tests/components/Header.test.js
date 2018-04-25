import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let wrapper, logOut;

beforeEach(() => {
    logOut = jest.fn();
    wrapper = shallow(<Header logOut={logOut} />);

});


test('should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);

    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find('h1').text()).toBe('Expensify');
});

test('Should call logOut on button click', () => {

    const button = wrapper.find('button.logout');

    expect(button).toHaveLength(1);

    button.at(0).simulate('click');

    expect(logOut).toHaveBeenCalled();

});

