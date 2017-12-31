import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UnwrappedSignup } from '../components/Signup';

Enzyme.configure({ adapter: new Adapter() });

test.skip('Signup Component renders correctly', () => {
  const component = shallow(
    <UnwrappedSignup
      handleSignup={() => 1}
      user={{ email: 'test@gmail.com' }}
      history={{}}
    />
  );
  expect(component).toMatchSnapshot();
});
