import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { MoncadaPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Moncada() {
  return (
    <Layout>
      <Seo 
        templateTitle='Moncada'
        description=''
      />

      <main>
      <PageHeading>Moncada Tarlac</PageHeading>

      <Container>
        <MoncadaPostCard />
      </Container>
      </main>

    </Layout>
  );
}