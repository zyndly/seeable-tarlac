import { FormEvent, useState } from 'react';

import ContributeForm from '@/components/contribute/ContributeForm';

export const Contribute = () => {
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
    <section className='bg-black'>

      <div>
        <ContributeForm
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
