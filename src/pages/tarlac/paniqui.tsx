import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { PaniquiPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Paniqui() {
  return (
    <Layout>
      <Seo 
        templateTitle='Paniqui'
        description=''
      />

      <main>
      <PageHeading>Paniqui Tarlac</PageHeading>

      <Container>
        <PaniquiPostCard />
      </Container>
      </main>

    </Layout>
  );
}