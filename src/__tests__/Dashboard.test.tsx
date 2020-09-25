import React from 'react';
import { shallow, render, mount, } from 'enzyme';
import { act } from '@testing-library/react'
import Dashboard from '../pages/Dashboard/index';
import { spy } from 'sinon';

describe('<Dashboard />', () => {
  it('should shallow', () => {

    const wrapper = shallow(<Dashboard />);
    expect(wrapper);

  });
  it('render without error', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });
  it('clicked button', () => {
    const wrapper = shallow(<Dashboard />);
    wrapper.find('button').simulate('click');
  });
  it('submit event when click submit', () => {
    const onSubmit = spy();
    const wrapper = mount(
      <form onSubmit={onSubmit} />
    )
    wrapper.find('form')
      .simulate('submit', { preventDefault() { } });
  });
  it('handles async useEffect', async () => {
    const component = mount(<Dashboard />);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise(resolve => setImmediate(resolve));
      component.update();
    });
  });

});
