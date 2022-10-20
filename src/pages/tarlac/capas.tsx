import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { CapasPostCard } from "@/components/post/townWidget/three"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Camiling() {
  return (
    <Layout>
      <Seo 
        templateTitle='Camiling'
        description=''
      />

      <main>
      <PageHeading>Camiling Tarlac</PageHeading>

      <Container>
        <CapasPostCard />
      </Container>
      </main>

    </Layout>
  );
}