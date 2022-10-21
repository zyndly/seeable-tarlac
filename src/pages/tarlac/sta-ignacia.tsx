import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { StaIgnaciaPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function StaIgnacia() {
  return (
    <Layout>
      <Seo 
        templateTitle='Sta. Ignacia'
        description=''
      />

      <main>
      <PageHeading>Sta. Ignacia</PageHeading>

      <Container>
        <StaIgnaciaPostCard />
      </Container>
      </main>

    </Layout>
  );
}