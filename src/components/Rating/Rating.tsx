import React, { useState } from 'react';
import './rating.scss';
export interface RatingProps {
  groupid: string;
  apikey: string;
}
export const Rating: React.FC<RatingProps> = ({ groupid, apikey }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [identity, setIdentity] = useState<boolean>(true);
  const [group, setGroup] = useState<boolean>(false);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    setEmail('');
    setIdentity(false);
    setGroup(false);
    console.log('Email:', email);
  };

  return (
    <div className='rating-form'>
      <form onSubmit={handleSubmit}>
        <input type='text' className='email-input' disabled={identity} placeholder='Enter Email' />
        <button className={`${!identity ? 'submit-button' : 'success-button'}`} disabled={identity}>
          {!identity ? `Create Identity` : `Identity Created`}
        </button>
        <button
          className={`${!group ? 'submit-button' : 'success-button'}`}
          disabled={identity && group}
        >
          {!group ? `Join Group` : `Group Joined`}
        </button>
        <h2>Rate Us</h2>
        <div className='rating-input'>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value}>
              <input
                type='radio'
                name='rating'
                value={value}
                checked={rating === value}
                onChange={() => handleRatingChange(value)}
              />
              <span className='star'>&#9733;</span>
            </label>
          ))}
        </div>
        <textarea
          className='comment-input'
          placeholder='Leave an anonymous feedback'
          value={comment}
          onChange={handleCommentChange}
        />
        <button type='submit' className='submit-button' disabled={!(identity && group)}>
          Submit
        </button>
      </form>
    </div>
  );
};
