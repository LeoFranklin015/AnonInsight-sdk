import React from 'react';
import { Rating, RatingProps } from '..';
import { render, screen } from '@testing-library/react';

const defaultProps: RatingProps = {
  groupid: '80307533329187687257484089551323',
  apikey: 'f6acbcb2-54a7-4544-ac02-8d05ff9d852f',
};

const setup = (props = defaultProps) => render(<Rating {...props} />);

describe('Rating', () => {
  it('renders', () => {
    setup();
    expect(screen.getByText('Rate Us'));
  });
});
