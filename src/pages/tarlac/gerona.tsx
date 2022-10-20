import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { GeronaPostCard } from "@/components/post/townWidget/two"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Gerona() {
  return (
    <Layout>
      <Seo 
        templateTitle='Gerona'
        description=''
      />

      <main>
      <PageHeading>Gerona Tarlac</PageHeading>

      <Container>
        <GeronaPostCard />
      </Container>
      </main>

    </Layout>
  );
}