import React, { useEffect } from 'react';
import { shallow, } from 'enzyme';
import { render } from '@testing-library/react'
import Hero from '../pages/Hero/index';
import { spy } from 'sinon';


describe('<Hero />', () => {
  it('should be defined', () => {
    expect(Hero).toBeDefined();

  });

});

