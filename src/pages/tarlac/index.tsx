import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import TownsWidget from "@/components/post/townWidget/TownsWidget";
import Seo from "@/components/Seo";

export default function TarlacProvince() {
  return (
    <Layout>
      <Seo 
        templateTitle='Tarlac Province'
        description=''
      />

    <Container>
      <TownsWidget/>
    </Container>
      
    </Layout>
  );
}