import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { CamilingPostCard } from "@/components/post/townWidget/one"
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
        <CamilingPostCard />
      </Container>
      </main>

    </Layout>
  );
}