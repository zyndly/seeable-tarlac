import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { ConcepcionPostCard } from "@/components/post/townWidget/three"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Concepcion() {
  return (
    <Layout>
      <Seo 
        templateTitle='Concepcion'
        description=''
      />

      <main>
      <PageHeading>Concepcion Tarlac</PageHeading>

      <Container>
        <ConcepcionPostCard />
      </Container>
      </main>

    </Layout>
  );
}