import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "./Button";

const ContactForm = () => {
  const REACT_APP_SERVICE_ID = 'service_on3b91f';
  const REACT_APP_TEMPLATE_ID = 'template_fa80c5n';
  const REACT_APP_PUBLIC_KEY = 'mn6m3oLaK60b7yzbP';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const sendEmail = (e) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
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
        }
      );
    
    // Clears the form after sending the email
    e.target.reset();
  };

  return (
    <form onSubmit={sendEmail}>
      <div className='flex justify-between'>
        <div className='mt-6'>
          <div className='pb-4'>
            <label htmlFor='name' className='block text-med pb-2'>Name</label>
              <br></br>
                <input 
                    className='border-2 border-gray-500 p-2 rounded-md focus:border-violet-500 focus:ring-violet-500' 
                    type='text' 
                    name='user_name' 
                    placeholder='Enter your name'/>
          </div>
            <div className='pb-4'>
                <label htmlFor='email' className='block text-med pb-2'>Email</label>
                <br></br>
                   <input 
                      className='border-2 border-gray-500 p-2 rounded-md focus:border-violet-500 focus:ring-violet-500' 
                      type='email' 
                      name='user_email' 
                      placeholder='name@email.com'/>
            </div>  
            <div className='pb-4'>
                 <label htmlFor='message' className='block text-med pb-2'>Message</label>
                 <br></br>
                  <textarea 
                     className='border-2 border-gray-500 p-2 rounded-md focus:border-violet-500 focus:ring-violet-500' 
                     type='text' 
                     name='message' 
                     placeholder='Enter your message'
                     style={{resize:'none'}}/>  
                  <div>
                  <Button> 
                  <input type="submit" value="Send" disabled={isSubmitting} />
                </Button>
                {stateMessage && <p>{stateMessage}</p>}     
                </div>             
              </div>                        
            </div>
          </div>
    </form>

  );
};

export default ContactForm;