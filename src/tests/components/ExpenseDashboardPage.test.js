import React from 'react';
import { shallow } from 'enzyme';
import 'react-dates/initialize';

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage /> );
    expect(wrapper).toMatchSnapshot();
});

