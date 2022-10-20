import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { RamosPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Ramos() {
  return (
    <Layout>
      <Seo 
        templateTitle='Rammos'
        description=''
      />

      <main>
      <PageHeading>Ramos Tarlac</PageHeading>

      <Container>
        <RamosPostCard />
      </Container>
      </main>

    </Layout>
  );
}