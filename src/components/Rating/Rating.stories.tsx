import React from 'react';

export interface RatingProps {}

export const Rating: React.FC<RatingProps> = ({ children }) => {
  return (
    <div>{ children }</div>
  );
}
