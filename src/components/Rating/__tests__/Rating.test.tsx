import React from 'react';
import { Rating, RatingProps } from '..';
import { render, screen } from '@testing-library/react';

const defaultProps: RatingProps = {
  sindri_circuit_id: 'd4205533-cd52-4cff-a4a5-1511dd01bcb1',
  sindri_api_key: 'sindri-IjDGLtsLoyz7YImxxcQSUtJp6ZgS5nSB-lEbB',
  GOOGLE_CLIENT_ID: '128965649558-rua6r0kk2bq6eq3rcgo5eprnf6ho7p5s.apps.googleusercontent.com',
  groupid: '17997299276220339278453471448622',
  apikey: 'd6a0b754-cd02-4628-9798-5009a5f5f534',
};

const setup = (props = defaultProps) => render(<Rating {...props} />);

describe('Rating', () => {
  it('renders', () => {
    setup();
    expect(screen.getByText('Rate Us'));
  });
});
