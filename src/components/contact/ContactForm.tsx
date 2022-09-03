/* eslint-disable no-console */
import emailjs from '@emailjs/browser';
import * as React from 'react';
import { FormEvent } from 'react';

import Button from '@/components/buttons/Button';

export interface ContactFormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export const ContactForm  = ({

  disabled = false,
}: ContactFormProps) => {

  const [name,setName] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [message,setMessage] = React.useState('')
  const [errorMessage,setErrorMessage] = React.useState('')
  const [confirmationMessage,setConfimationMessage] = React.useState('')
  const form = React.useRef<HTMLFormElement>(null);

  React.useEffect(()=>{
      setConfimationMessage('')
  },[])
  // Updates the state when something is typed
  const handleInput = ({target}:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      
      const {name,value} = target
      if (name === 'name'){
          setName(value)
      }
      if (name === 'email'){
          setEmail(value)
      }
      if (name === 'message'){
          setMessage(value)
      }
  }

  // Displays error message if input is selected and then unselected without entering the appropriate value
  const checkInput = ({target}:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      const {name,value} = target
      
      if (name === 'name'){
          if (value===''){
              setErrorMessage('Name is required')
          }
      }
      if (name === 'email'){
          if (value===''){
              setErrorMessage('Email is required')
          } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value)){
              setErrorMessage('You must enter a valid email')

          }
      }
      if (name === 'message'){
          if (value===''){
              setErrorMessage('Message is required')
          }
      }
  }
  
  // Passes the data from the form if the email is valid - console.log the data as placeholder before setting up backend
  const sentEmail = () => {
      setName('')
      setEmail('')
      setMessage('')
      setConfimationMessage('Message sent.  we will be in touch shortly.  Thank you for your interest.')
  }
  
  const sendEmail = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)){
          setErrorMessage('Invalid Email')
          return
      }
      const formInfo=form.current?form.current:''
      
       emailjs.sendForm('service_tdehq12', 'template_obrdfcj',  formInfo, 'CtLELSwFCiUmhlOhi')
        // eslint-disable-next-line unused-imports/no-unused-vars
        .then((result) => {
            sentEmail()
        }, (error) => {
            console.log(error.text);
        });
  }

  return (
    <form ref={form} className='form space-y-2' onSubmit={sendEmail}>
      <div className='form-control w-full'>
        <label htmlFor='name' className='label cursor-pointer'>
          <span className='label-text'>Name</span>
        </label>
        
        <input
          name='name'
          type='text'
          value={name}
          onBlur={checkInput}
          onChange={handleInput}
                    onClick={()=>setErrorMessage('')}

          required
          placeholder='name'

          className='input input-bordered w-full text-black'
        />
      </div>

      <div className='form-control w-full'>
        <label htmlFor='email' className='label cursor-pointer'>
          <span className='label-text'>Email</span>
        </label>

        <input
          name='email'
          type='email'
          value={email}
          onChange={handleInput}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          placeholder='Email'

          className='input input-bordered w-full text-black'
          required
        />
      </div>

      <div className='form-control w-full'>
        <label htmlFor='message' className='label cursor-pointer'>
          <span className='label-text'>Message</span>
        </label>
        <textarea
          name="message"
          value={message}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          onChange={handleInput}
          placeholder='Message'

          rows={3}
          className='textarea textarea-bordered w-full text-black'
          required
          
          >

        </textarea>
      </div>

      <div>{errorMessage}</div>
      <div>{confirmationMessage}</div>

      <Button
        type='submit'
        value='Send'
        className={`btn btn-block !mt-4 ${
          disabled ? 'btn-disabled' : 'btn-primary'
        }`}
        disabled={disabled}>
        Send Message
      </Button>
      
    </form>
  );
};

export default ContactForm;