import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { PuraPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Pura() {
  return (
    <Layout>
      <Seo 
        templateTitle='Pura'
        description=''
      />

      <main>
      <PageHeading>Pura Tarlac</PageHeading>

      <Container>
        <PuraPostCard />
      </Container>
      </main>

    </Layout>
  );
}