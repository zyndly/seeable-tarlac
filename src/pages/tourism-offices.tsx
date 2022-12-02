import { useRouter } from 'next/router';
import React, { useRef  } from 'react';

import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { Loader } from '@/components/post';
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";
import Tooltip from '@/components/Tooltip';

export default function TourismOfficesPage() {

  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <Layout>
      <Seo 
        templateTitle='Tourism Offices'
        description=''
      />

      <PageHeading> TOURISM OFFICES </PageHeading>

      <Container>

      <div ref={scrollRef} className="col-span-1 lg:col-span-3 flex flex-wrap flex-row justify-center items-start ">
        
        { tourismOffices.map((offices) => (
          <Tooltip interactive={false} key={offices.href} content={offices.tooltip}>
            
            <div className="max-w-xs min-w-xs rounded-lg overflow-hidden shadow-lg py-2 px-2">
              <div className="py-4 ">
                <div className="py-2 bg-primary-800">
                  <div className="font-bold text-xl px-4">
                    {`${offices.place}`} 
                  </div>
                </div>
                <div className='bg-[#F2F5EB]'>
                  <p className="text-gray-700 font-bold py-2 px-4 text-base">
                      {`${offices.contactPerson}`} 
                  </p>

                  <p className="text-gray-700 py-2 px-4 text-base">
                      {`${offices.address}`} 
                  </p>

                  <p className="text-gray-700 pt-4 px-4 text-base">
                      Tel: <span className='text-primary-500'>{`${offices.contactNumber1}`} </span> 
                  </p>
                  <p className="text-gray-700 px-4 text-base">
                      Phone: <span className='text-primary-500'>{`${offices.contactNumber2}`} </span>
                  </p>
                  <p className="text-gray-700 px-4 text-base">
                      Email: <span className='text-primary-500'>{`${offices.email}`} </span>
                  </p>

                  <p className="text-gray-700 px-4 text-base">
                      Facebook: <a className='text-primary-500 hover:text-lime-600' target="_blank" rel="noreferrer noopener external nofollow" href="{`${offices.facebook}`}">{`${offices.facebook}`}</a>
                  </p>

                  <p className="text-gray-700 px-4 text-base">
                      Website: <a className='text-primary-500 hover:text-lime-600' target="_blank" rel="noreferrer noopener external nofollow" href="{`${offices.website}`}">{`${offices.website}`}</a>
                  </p>
                  
                </div>

              </div>
            </div>
          
          </Tooltip>
          ))}

      </div>
    </Container>


      

      
    </Layout>
  );
}

const tourismOffices = [ 
  {
    place: 'Anao Municipal Tourism Management Office',
    contactPerson: 'Maria Rozet Bagayat',
    address: 'Municipal Hall Building Poblacion, Anao, Tarlac',
    contactNumber1: '(045) 606-0590',
    contactNumber2: '(044) 803 0015',
    email: 'municipalityofanao@yahoo.com',
    facebook: 'https://www.facebook.com/anaotarlac/',
    website: 'anaotarlac.gov.ph',

    href: 'anaotarlac.gov.ph',
    tooltip: 'Visit Anao Website',
  },

  {
    place: 'Bamban Municipal Tourism Management Office',
    contactPerson: 'Maritess Sigua',
    address: 'Mc-Arthur Hi-way Brgy. Anupul Bamban, Tarlac',
    contactNumber1: '(045) 925 0050',
    contactNumber2: 'N/A',
    email: 'mayoraliceguo@bambantarlac.gov.ph',
    facebook: 'https://www.facebook.com/officialbambantourism',
    website: 'bambantarlac.gov.ph',

    href: 'bambantarlac.gov.ph',
    tooltip: 'Visit Bamban Website',
  },

  {
    place: 'Camiling Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'Camiling Municipal Hall, Quezon Avenue, 2306, Camiling, Tarlac',
    contactNumber1: '045-934-1801',
    contactNumber2: '(04593) 40328',
    email: 'lgu.camilingtarlac.2306@gmail.com',
    facebook: 'https://www.facebook.com/MayorErlonTapatAtMalinisNaSerbisyo',
    website: 'http://www.camiling-lgu.gov.ph/',

    href: 'https://www.facebook.com/MayorErlonTapatAtMalinisNaSerbisyo',
    tooltip: 'Visit Camiling Facebook Page',
  },

  {
    place: 'Capas Municipal Tourism Management Office',
    contactPerson: 'Marissa Vidal',
    address: 'Sto. Domingo 2nd, McArthur Hway Capas, Tarlac, 2315 PH',
    contactNumber1: '(045) 925 0154',
    contactNumber2: '(045) 925 0154/ Local:302',
    email: 'capastourismoffice@gmail.com',
    website: 'https://www.capastarlac.gov.ph/',
    facebook:'https://www.facebook.com/profile.php?id=100064575226399',

    href: 'https://www.capastarlac.gov.ph/',
    tooltip: 'Visit Capas Website',
  },

  {
    place: 'Concepcion Municipal Tourism Management Office',
    contactPerson: 'Joanna Clarisse Castro',
    address: '8MF4+95W, C. Cortez, Concepcion, 2316 Tarlac',
    contactNumber1: '(045) 982-0672',
    contactNumber2: '+63 (45) 923 1524',
    email: 'concepciontarlaclgu@gmail.com',
    facebook: 'https://www.facebook.com/MunicipalityofConcepcion',
    website: 'N/A',

    href: 'https://www.facebook.com/MunicipalityofConcepcion',
    tooltip: 'Visit Concepcion Facebook',
  },

  {
    place: 'Gerona Municipal Tourism Management Office',
    contactPerson: 'Josie Rombaoa',
    address: 'Poblacion #3, Gerona, Tarlac, Philippines, 2302',
    contactNumber1: '0918 562 8283',
    contactNumber2: '0966 316 0414',
    email: 'geronatarlac2018@gmail.com',
    facebook: 'https://www.facebook.com/GeronaSerbisyongTotoo',
    website: 'https://geronatarlac.gov.ph/',

    href: 'https://geronatarlac.gov.ph/',
    tooltip: 'Visit Gerona Website',
  },

  {
    place: 'Lapaz Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'Municipal Office, Tagumpay St., La Paz',
    contactNumber1: '(045) 493-1936',
    contactNumber2: 'N/A',
    email: 'info@lapaztarlac.gov.ph',
    facebook: 'https://www.facebook.com/pages/LaPaz-Tarlac/393201980735327',
    website: 'N/A',

    href: 'https://www.facebook.com/pages/LaPaz-Tarlac/393201980735327',
    tooltip: 'Visit La Paz Facebook',
  },

  {
    place: 'Mayantoc Municipal Tourism Management Office',
    contactPerson: 'Roselyn Cacho',
    address: 'Poblacion Sur, Mayantoc, Tarlac',
    contactNumber1: '0917-5142-245',
    contactNumber2: 'N/A',
    email: 'info@mayantoctarlac.gov.ph',
    facebook: 'https://www.facebook.com/LGUMayantocIO',
    website: 'http://www.mayantoc.gov.ph/',

    href: 'https://www.facebook.com/LGUMayantocIO',
    tooltip: 'Visit Mayantoc Facebook',
  },

  {
    place: 'Moncada Municipal Tourism Management Office',
    contactPerson: 'Juvy C. Mendoza',
    address: 'Otop Bbuilding, Pob. 1 Municipall Hall, Moncada, Tarlac',
    contactNumber1: '(045) 606 – 5374',
    contactNumber2: '(045) 606 – 5405',
    email: 'info@moncadatarlac.gov.ph',
    facebook: 'https://www.facebook.com/profile.php?id=100066895391949',
    website: 'https://moncadatarlac.gov.ph/',

    href: 'https://moncadatarlac.gov.ph/',
    tooltip: 'Visit Moncada Website',
  },

  {
    place: 'Paniqui Municipal Tourism Management Office',
    contactPerson: 'Benz Obcena',
    address: 'Gomez St., Barangay Poblacion Norte, Paniqui, Tarlac',
    contactNumber1: '(045) 606 6157',
    contactNumber2: 'N/A',
    email: 'info@paniquitarlac.gov.ph',
    facebook: 'https://www.facebook.com/PaniquiCultureArtsSportsTourismOfficial',
    website: 'https://paniquitarlac.gov.ph/',

    href: 'https://paniquitarlac.gov.ph/',
    tooltip: 'Visit Paniqui Website',
  },

  {
    place: 'Pura Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'Municipal Hall, Pura, Tarlac',
    contactNumber1: '(045) 606-0243',
    contactNumber2: 'N/A',
    email: 'info@puratarlac.gov.ph',
    facebook: 'https://www.facebook.com/profile.php?id=100067303536694',
    website: 'https://www.puratarlac.gov.ph/',

    href: 'https://www.puratarlac.gov.ph/',
    tooltip: 'Visit Pura Website',
  },

  {
    place: 'Ramos Municipal Tourism Management Office',
    contactPerson: 'Jenny Lou Paclibare',
    address: 'Municipal Building, Poblacion Center Street, Ramos, Tarlac',
    contactNumber1: '(045) 491-7670',
    contactNumber2: '(045) 491-7659',
    email: 'lguramos@yahoo.com',
    facebook: 'https://www.facebook.com/profile.php?id=100083091594289',
    website: 'N/A',

    href: 'https://www.facebook.com/profile.php?id=100083091594289',
    tooltip: 'Visit Ramos Facebook',
  },

  {
    place: 'San Clemente Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'San Clemente Municipal Hall,Poblacion Norte,San Clemente, Tarlac',
    contactNumber1: '(045)  934 1244',
    contactNumber2: 'N/A',
    email: 'sanclemente.tarlac@gmail.com',
    facebook: 'https://www.facebook.com/SCMPS/',
    website: 'sanclementetarlac.gov.ph',

    href: 'sanclementetarlac.gov.ph',
    tooltip: 'Visit San Clemente Website',
  },

  {
    place: 'San Jose Municipal Tourism Management Office',
    contactPerson: 'Ian Lantano',
    address: 'Lawacamulag, San Jose, Tarlac',
    contactNumber1: '0917-142-6949',
    contactNumber2: 'N/A',
    email: 'N/A',
    facebook: 'https://www.facebook.com/pages/San-Jose-Tarlac/106078172757800',
    website: 'N/A',

    href: 'https://www.facebook.com/pages/San-Jose-Tarlac/106078172757800',
    tooltip: 'Visit San Jose Facebook',
  },

  {
    place: 'San Manuel Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'MacArthur Highway, San Manuel Municipal Cmpd, San Manuel, Tarlac.',
    contactNumber1: '(045) 600-0212',
    contactNumber2: '+63 (45) 606 0372',
    email: 'lgusanmanuel@yahoo.com',
    facebook: 'N/A',
    website: 'https://sanmanueltarlac.gov.ph/',

    href: 'Visit San Manuel Website',
    tooltip: 'Contact San Manuel Tarlac',
  },

  {
    place: 'Sta. Ignacia Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'https://www.santaignaciatarlac.gov.ph/',
    contactNumber1: '(045) 606 – 3190',
    contactNumber2: 'N/A',
    email: 'lgusantaignacia2@gmail.com',
    facebook: 'N/A',
    website: 'https://www.santaignaciatarlac.gov.ph/',

    href: 'https://www.santaignaciatarlac.gov.ph/',
    tooltip: 'Visit Sta. Ignacia Website',
  },

  {
    place: 'Tarlac City Tourism Management Office',
    contactPerson: 'Ricardo Virsillo S. Vega',
    address: '130 F. Tañedo St, Tarlac City, 2300 Tarlac',
    contactNumber1: '045 470 8647',
    contactNumber2: '0995 231 2411',
    email: 'tarlac.info@gmail.com',
    facebook: 'https://www.facebook.com/tarlac.cio',
    website: 'https://tarlaccity.gov.ph/',

    href: 'https://tarlaccity.gov.ph/',
    tooltip: 'Visit Tarlac City Website',
  },

  {
    place: 'Victoria Municipal Tourism Management Office',
    contactPerson: 'N/A',
    address: 'Rizal St., San Gavino, Victoria, Tarlac',
    contactNumber1: '0905-723-595',
    contactNumber2: '0950-899-7341',
    email: 'otmlguvictoria@gmail.com',
    facebook: 'www.facebook.com/victoria.tourism.5',
    website: 'https://www.victoriatarlac.gov.ph/',

    href: 'https://www.victoriatarlac.gov.ph/',
    tooltip: 'Visit Victoria Website',
  },

  {
    place: 'Tarlac Provincial Tourism Office',
    contactPerson: 'Arsenio Lugay II',
    address: 'Capitol Hills, Romulo Blvd. San Vicente,, Tarlac, Philippines',
    contactNumber1: '+63999 998 2597',
    contactNumber2: '+63917 653 8551',
    email: 'tarlac.tourism2017@gmail.com',
    facebook: 'https://www.facebook.com/tarlactourism/',
    website: 'https://tarlac.gov.ph/',

    href: 'https://www.facebook.com/tarlactourism/',
    tooltip: 'Visit Tarlac Provice Facebook',
  },


]