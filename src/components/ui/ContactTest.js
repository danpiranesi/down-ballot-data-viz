'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '@/app/globals.css';
import { Button } from './Button';

export const ContactUs = () => {

  const REACT_APP_SERVICE_ID = 'service_on3b91f';
  const REACT_APP_TEMPLATE_ID = 'template_fa80c5n';
  const REACT_APP_PUBLIC_KEY = 'mn6m3oLaK60b7yzbP';

  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);

  const sendEmail = async (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, form.current, {
        publicKey: REACT_APP_PUBLIC_KEY,
      })
      .then(
        (result) => {
          console.log('SUCCESS!');
          setStateMessage('Message sent!');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStateMessage('Something went wrong, please try again later');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000); // hide message after 5 seconds
        },
      );

      e.target.reset();
  };


  return (
    <form ref={form} onSubmit={sendEmail} action='?' method="POST">
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      <div>
        <label id='box_label' >Name</label>
        <input id='text_box' type="text" name="from_name" placeholder='Enter your name'/>
        <label id='box_label' >Email</label>
        <input id='text_box' type="email" name="from_email" placeholder='Enter your email'/>
        <label id='box_label' >Message</label>
        <textarea name="message" placeholder='Enter your message'/>
        <br></br>
        <div className="g-recaptcha" data-sitekey="6Lc3z50qAAAAAOa3IgV9cBCZUahc_8nd4EpI7qBk" style={{width:"304px",height:"78px", display:'block'}} ></div>
        <Button>
          <input 
            type="submit" 
            value="Send" disabled={isSubmitting} /> 
        </Button>
        <br></br>
        {stateMessage && <p>{stateMessage}</p>} 
      </div>
    </form>
  );
};
