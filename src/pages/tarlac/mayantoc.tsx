import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { MayantocPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Mayantoc() {
  return (
    <Layout>
      <Seo 
        templateTitle='Mayantoc'
        description=''
      />

      <main>
      <PageHeading>Mayantoc Tarlac</PageHeading>

      <Container>
        <MayantocPostCard />
      </Container>
      </main>

    </Layout>
  );
}