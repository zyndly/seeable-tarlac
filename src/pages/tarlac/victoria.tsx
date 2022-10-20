import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { VictoriaPostCard } from "@/components/post/townWidget/two"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Victoria() {
  return (
    <Layout>
      <Seo 
        templateTitle='Victoria'
        description=''
      />

      <main>
      <PageHeading>Victoria Tarlac</PageHeading>

      <Container>
        <VictoriaPostCard />
      </Container>
      </main>

    </Layout>
  );
}