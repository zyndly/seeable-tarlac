import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import TownsWidget from "@/components/post/townWidget/TownsWidget";
import Seo from "@/components/Seo";
import { TownsHeading } from "@/components/text/TownsHeading";

export default function TarlacProvince() {
  return (
    <Layout>
      <Seo 
        templateTitle='Tarlac Province'
        description=''
      />   
      <TownsHeading/>


    <Container>
      <div className="flex items-center pb-5">
        
      </div>

      <TownsWidget/>
      
    </Container>
      
    </Layout>
  );
}