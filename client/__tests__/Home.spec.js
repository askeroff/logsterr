import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../components/Home';

Enzyme.configure({ adapter: new Adapter() });

test('Home Component renders correctly', () => {
  const component = shallow(<Home />);
  expect(component).toMatchSnapshot();
});
