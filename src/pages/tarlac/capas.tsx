import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { CapasPostCard } from "@/components/post/townWidget/three"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Capas() {
  return (
    <Layout>
      <Seo 
        templateTitle='Capas'
        description=''
      />

      <main>
      <PageHeading>Capas Tarlac</PageHeading>

      <Container>
        <CapasPostCard />
      </Container>
      </main>

    </Layout>
  );
}