import { FormEvent, useId } from 'react';

import Button from '@/components/buttons/Button';

export interface ContactFormProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export const ContactForm = ({
  onSubmit,
  disabled = false,
}: ContactFormProps) => {
  const NameId = useId();
  const EmailId = useId();
  const MessageId = useId();

  return (
    <form className='form space-y-2' onSubmit={onSubmit}>
      <div className='form-control w-full'>
        <label htmlFor={NameId} className='label cursor-pointer'>
          <span className='label-text'>Name</span>
        </label>
        <input
          type='text'
          className='input input-bordered w-full'
          name={NameId}
          id={NameId}
          required
          disabled={disabled}
        />
      </div>

      <div className='form-control w-full'>
        <label htmlFor={EmailId} className='label cursor-pointer'>
          <span className='label-text'>Email</span>
        </label>
        <input
          type='email'
          className='input input-bordered w-full'
          name={EmailId}
          id={EmailId}
          required
          disabled={disabled}
        />
      </div>

      <div className='form-control w-full'>
        <label htmlFor={MessageId} className='label cursor-pointer'>
          <span className='label-text'>Message</span>
        </label>
        <textarea
          rows={3}
          className='textarea textarea-bordered w-full'
          name={MessageId}
          id={MessageId}
          required
          disabled={disabled}></textarea>
      </div>

      <Button
        type='submit'
        className={`btn btn-block !mt-4 ${
          disabled ? 'btn-disabled' : 'btn-primary'
        }`}
        disabled={disabled}>
        Send Message
      </Button>
      
    </form>
  );
};
