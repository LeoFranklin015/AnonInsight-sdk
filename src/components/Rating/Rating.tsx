import React, { useState } from 'react';
import './rating.scss';
export interface RatingProps {
  groupid: string;
  apikey: string;
  GOOGLE_CLIENT_ID: string;
  sindri_circuit_id: string;
  sindri_api_key: string;
}
import { Identity } from '@semaphore-protocol/identity';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import sindri from 'sindri';
import { jwtDecode } from 'jwt-decode';
export const Rating: React.FC<RatingProps> = ({
  groupid,
  apikey,
  GOOGLE_CLIENT_ID,
  sindri_api_key,
  sindri_circuit_id,
}) => {
  const [_identity, setIdentity] = useState<Identity>();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [identity, setIdentitydone] = useState<boolean>(false);
  const [group, setGroup] = useState<boolean>(false);
  const [groupdebug, setGroupdebug] = useState<string>();
  const [name, setName] = useState<string>();
  const [emailverify, setEmailverify] = useState<boolean>(false);
  const [emaildebug, setEmaildebug] = useState<string>();
  const [loadingverify, setLoadingverify] = useState<boolean>(false);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  const createIdentity = async () => {
    const identity = new Identity(email);
    setIdentity(identity);
    console.log(
      'Your new Semaphore identity was just created with the following commitment: ',
      _identity?.commitment.toString()
    );
    const groupId = groupid;
    const memberId = identity.commitment.toString();
    const url = `https://api.bandada.pse.dev/groups/${groupId}/members/${memberId}`;
    console.log(memberId);
    const apiKey = apikey;
    console.log('Joined Successfully');
    setGroup(true);
    setIdentitydone(true);
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        accept: '*/*',
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        setGroupdebug(response.statusText);
        setGroup(true);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setGroupdebug(error.message);
        console.error('There was an error!', error);
      });
  };
  const proveemail = async (mail: string) => {
    sindri.authorize({
      apiKey: sindri_api_key,
    });
    console.log('started');
    try {
      const msg_value = byt(mail);
      setLoadingverify(true);
      const proof = await sindri.proveCircuit(sindri_circuit_id, `{"msg": ${msg_value}}`);
      if (proof.proof) {
        setLoadingverify(false);
        setEmailverify(true);
        setEmaildebug('Email Verified');
        console.log(identity);
      } else {
        setLoadingverify(false);
        setEmailverify(false);
        setEmaildebug(proof.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const byt = (email: string) => {
    const maxLength = 100;

    const encoder = new TextEncoder();
    const buffer = encoder.encode(email.padEnd(maxLength, '\0'));

    const charArray = Array.from(buffer).map((s) => s.toString());
    console.log(JSON.stringify(charArray));
    return JSON.stringify(charArray);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    console.log('Email:', email);
    alert('Your feedback was recorded');
  };
  const googleSuccess = (resp) => {
    const decoded: { name?: any; email?: string } = jwtDecode(resp?.credential);
    const email = decoded?.email || ''; // Provide a default value for email
    const name = decoded?.name;
    setEmail(email);
    setName(name);
    proveemail(email);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className='rating-form'>
        <form onSubmit={handleSubmit}>
          <div className='center'>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                googleSuccess(credentialResponse);
              }}
            ></GoogleLogin>
          </div>

          {groupdebug == 'Unexpected end of JSON input' && <p>Group Joined</p>}
          <div className='divcenter'>
            {name && <p>{name}</p>}
            {email && <p>{email}</p>}
            {emaildebug &&
              (emailverify ? (
                <p className='greentxt'>Email Verified</p>
              ) : (
                <p className='redtxt'>Email Not Eligible</p>
              ))}
            {loadingverify && (
              <>
                <p>Verifying</p>
                <div className='lds-ellipsis'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </>
            )}
          </div>
          <h2>Rate Us</h2>
          <button
            className={`${!identity ? 'submit-button' : 'success-button'}`}
            disabled={!emailverify}
            onClick={createIdentity}
          >
            {!identity ? `Create Identity` : `Identity Created`}
          </button>
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
                <span className='star'>
                  {rating !== null && value <= rating ? '\u2605' : '\u2606'}
                </span>
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
    </GoogleOAuthProvider>
  );
};
