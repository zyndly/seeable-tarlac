import { HeadingContainer  }  from '@/components/layout/HeadingContainer';

export const TownsHeading = () => {
  return (
    <HeadingContainer>
      <div className='px-40 mx-30'>
        <h1 className='px-40 mx-20 text-3xl md:text-6xl font-bold flex text-center items-center md:text-left'>
          WELCOME TO TARLAC
        </h1>
        <p className="pt-2 text-white">
          Tarlac is the most multicultural of the Central Luzon provinces. A mixture of four distinct groups – the Pampangos, Ilocanos, Pangasinenses and Tagalogs – share this province and living together resulted in offering to the visitors the best cuisine of the places where their ancestors had come from, namely Bulacan, Nueva Ecija, Zambales, Pangasinan and the Ilocos Region. Tarlac is also best known for its fine foods and vast sugar and rice plantations. That it has fine cooking to offer is largely due to the fact that it is the melting pot of Central Luzon. Its myriad of historical sites, fine foods, vast sugar and rice plantations, and a beautifully landscaped golf course plus so many other attractions all make the province of Tarlac one of the best places to visit in Central Luzon.
        </p>
      </div>
    </HeadingContainer>
  );
};