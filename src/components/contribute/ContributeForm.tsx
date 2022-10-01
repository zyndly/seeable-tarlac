/* eslint-disable no-console */
import emailjs from '@emailjs/browser';
import * as React from 'react';
import { FormEvent } from 'react';

import Button from '@/components/buttons/Button';

export interface ContactFormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export const ContributeForm  = ({

  disabled = false,
}: ContactFormProps) => {

  const [name,setName] = React.useState('')
  const [email,setEmail] = React.useState('')

  const [title,setTitle] = React.useState('')
  const [excerpt,setExcerpt] = React.useState('')
  const [link,setLink] = React.useState('')
  const [content,setContent] = React.useState('')

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
      if (name === 'title'){
        setTitle(value)
      }
      if (name === 'excerpt'){
        setExcerpt(value)
      }
      if (name === 'link'){
          setLink(value)
      }
      if (name === 'content'){
        setContent(value)
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
      if (name === 'title'){
          if (value===''){
              setErrorMessage('Title is required')
          }
      }
      if (name === 'excerpt'){
        if (value===''){
            setErrorMessage('Excerpt is required')
        }
      }
      if (name === 'link'){
        if (value===''){
            setErrorMessage('Link is required')
        }
      }
      if (name === 'content'){
        if (value===''){
            setErrorMessage('Content is required')
        }
      }
  }
  
  // Passes the data from the form if the email is valid - console.log the data as placeholder before setting up backend
  const sentEmail = () => {
      setName('')
      setEmail('')
      setTitle('')
      setExcerpt('')
      setLink('')
      setContent('')
      setConfimationMessage('Your request sent.  we will be in touch shortly.  Thank you for your interest.')
  }
  
  const sendEmail = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)){
          setErrorMessage('Invalid Email')
          return
      }
      const formInfo=form.current?form.current:''
      
       emailjs.sendForm('service_tdehq12', 'template_s50w3vp',  formInfo, 'CtLELSwFCiUmhlOhi')
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
        
        <label htmlFor='title' className='label cursor-pointer'>
          <span className='label-text'>Title</span>
        </label>

        <input
          name='title'
          type='text'
          value={title}
          onChange={handleInput}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          placeholder='Title'

          className='input input-bordered w-full text-black'
          required
        />
      </div>

      <div className='form-control w-full'>
        
        <label htmlFor='excerpt' className='label cursor-pointer'>
          <span className='label-text'>Excerpt</span>
        </label>

        <input
          name='excerpt'
          type='text'
          value={excerpt}
          onChange={handleInput}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          placeholder='Excerpt'

          className='input input-bordered w-full text-black'
          required
        />
      </div>

      <div className='form-control w-full'>
        
        <label htmlFor='link' className='label cursor-pointer'>
          <span className='label-text'>Link</span>
        </label>

        <input
          name='link'
          type='text'
          value={link}
          onChange={handleInput}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          placeholder='Input Asset and 3d Tours link here'

          className='input input-bordered w-full text-black'
          required
        />
      </div>

      <div className='form-control w-full'>
        <label htmlFor='content' className='label cursor-pointer'>
          <span className='label-text'>Tour Description</span>
        </label>
        
        <textarea
          name="content"
          value={content}
          onBlur={checkInput}
          onClick={()=>setErrorMessage('')}
          onChange={handleInput}
          placeholder='Tour Description'

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

export default ContributeForm;