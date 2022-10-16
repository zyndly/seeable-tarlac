import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { AnaoPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Tarlac() {
  return (
    <Layout>
      <Seo 
        templateTitle='Anao'
        description=''
      />

      <main>
      <PageHeading>Anao Tarlac</PageHeading>

      <Container>
        <AnaoPostCard />
      </Container>
      </main>

    </Layout>
  );
}