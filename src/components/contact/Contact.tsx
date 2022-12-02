import { FormEvent, useState } from 'react';

import ContactForm from '@/components/contact/ContactForm';

import User from '@/constant/User';

export const Contact = () => {
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const onContactFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: { [key: string]: string } = {};
    const elements = e.currentTarget.elements as unknown as Array<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >;

    Array.from(elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    await fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setStatus(res.status);
      });
  };

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mt-20 text-[#F2F5EB]'>
      <div className='space-y-14'>
        <header className=''>
          <h2 className='font-bold text-3xl mt-6'>
            Get in touch, let&apos;s talk.
          </h2>
          <p className='mt-2 font-semibold text-2xl'>
            Fill in the details
          </p>
          <p className='text-2xl font-semibold'>we will get back to you as soon as we can.</p>
        </header>

        <div className='inline-flex flex-col gap-6 '>
          <div className='flex flex-row items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='h-4 w-4 text-secondary'
              viewBox='0 0 16 16'>
              <path
                fillRule='evenodd'
                d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
              />
            </svg>
            <p className='text-2xl'>{User.phone}</p>
          </div>

          <div className='flex flex-row items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='h-4 w-4 text-secondary'
              viewBox='0 0 16 16'>
              <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z' />
            </svg>
            <p className='text-2xl'>{User.email}</p>
          </div>

          <div className='flex flex-row items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='h-4 w-4 text-secondary'
              viewBox='0 0 16 16'>
              <path d='M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z' />
            </svg>
            <p className='text-2xl'>{User.location}</p>
          </div>
        </div>
      </div>

      <div>
        <ContactForm
          onSubmit={onContactFormSubmit}
          disabled={message.length > 0}
        />
        {message.length > 0 ? (
          <div
            className={`alert shadow-lg mt-4 ${
              status === 'success' ? 'alert-success' : 'alert-error'
            }`}>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>{message}</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
