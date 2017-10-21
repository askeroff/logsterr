import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UnwrappedLogin } from '../components/Login';

Enzyme.configure({ adapter: new Adapter() });

test('Login Component renders correctly', () => {
  const component = shallow(
    <UnwrappedLogin
      handleLogin={() => 1}
      user={{ email: 'test@gmail.com' }}
      history={{}}
    />
  );
  expect(component).toMatchSnapshot();
});
