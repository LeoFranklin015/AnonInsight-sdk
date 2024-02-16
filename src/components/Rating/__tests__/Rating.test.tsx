import React from 'react';
import { Rating, RatingProps } from '..';
import { render, screen } from '@testing-library/react';

const defaultProps: RatingProps = {
  groupid: 'nfajf',
  apikey: 'fjafj',
};

const setup = (props = defaultProps) => render(<Rating {...props} />);

describe('Rating', () => {
  it('renders', () => {
    setup();
    expect(screen.getByText('Rate Us'));
  });
});
