import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { TarlacPostCard } from "@/components/post/townWidget/two";
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Tarlac() {
  return (
    <Layout>
      <Seo 
        templateTitle='Tarlac'
        description=''
      />

      <main>
      <PageHeading>Tarlac City</PageHeading>

        <Container>
          <TarlacPostCard />
        </Container>
      </main>

    </Layout>
  );
}