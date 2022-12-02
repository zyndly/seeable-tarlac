/* eslint-disable react/no-unescaped-entities */
import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import CustomLink from '@/components/links/CustomLink';
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';

export default function AboutPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='About'
        description=''
      />

      <main>
        <section className='bg-[#F2F5EB]'>
          <PageHeading>Bringing Tarlac closer to you </PageHeading>
          
          <Container>

              <div className="">
                <div className='mx-10 pd-10'>
                  <div className='mx-20 pd-20'>
                    <div className='ml-40 pl-40'>
                      <div className='ml-40 pl-40 bg-primary-800 border rounded-lg'>
                     
                        <p className="text-3xl text-[#a8ce50] pt-10 pl-2 pr-20 mb-2">We believe that travel is for everyone. It helps us learn about ourselves and the world around us.</p>
                        <p className='text-2xl text-[#F2F5EB] pt-2 pl-2 pr-20 mb-2'>
                           Our goal is to help more people from more backgrounds experience the joy of exploration, especially exploring Tarlac. Because we believe this builds a kinder, more inclusive, more open-minded world.
                        </p>
                        <p className='text-2xl text-[#F2F5EB]  pt-2 pl-2 pr-20 mb-2'>
                            Like you, travel is in our DNA. At Seeable Tarlac, we believe travel opens the door to the greatest, most unforgettable experiences life can offer. And we have learned that the best travel is about putting yourself out there, about leaving behind the everyday, about immersing yourself, rather than just seeing the sights.
                        </p>

                        <div className="mb-10 pb-10 pl-2">
                          <CustomLink className='mt-8 items' href='/contact'>
                            Help us make our product better
                          </CustomLink>
                        </div>
                     </div>
                    </div>
                  </div>
                 </div>
              </div>
          </Container>


              
           
        </section>
  
      </main>

      
    </Layout>
  );
}