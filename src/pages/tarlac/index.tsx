import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import TownsWidget from "@/components/post/townWidget/TownsWidget";
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";

export default function TarlacProvince() {
  return (
    <Layout>
      <Seo 
        templateTitle='Tarlac Province'
        description=''
      />

    <Container>
      <div className="flex items-center">
        <PageHeading>WELCOME TO TARLAC</PageHeading>
      </div>  
      
      <div className="flex items-center pb-5">
      <p className="text-primary-900">Tarlac is the most multicultural of the Central Luzon provinces. A mixture of four distinct groups – the Pampangos, Ilocanos, Pangasinenses and Tagalogs – share this province and living together resulted in offering to the visitors the best cuisine of the places where their ancestors had come from, namely Bulacan, Nueva Ecija, Zambales, Pangasinan and the Ilocos Region. Tarlac is also best known for its fine foods and vast sugar and rice plantations. That it has fine cooking to offer is largely due to the fact that it is the melting pot of Central Luzon. Its myriad of historical sites, fine foods, vast sugar and rice plantations, and a beautifully landscaped golf course plus so many other attractions all make the province of Tarlac one of the best places to visit in Central Luzon.</p>
      </div>

      <TownsWidget/>
    </Container>
      
    </Layout>
  );
}