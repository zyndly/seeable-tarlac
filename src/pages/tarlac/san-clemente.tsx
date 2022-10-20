import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { SanClementePostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function SanClemente() {
  return (
    <Layout>
      <Seo 
        templateTitle='San Clemente'
        description=''
      />

      <main>
      <PageHeading>San Clemente Tarlac</PageHeading>

      <Container>
        <SanClementePostCard />
      </Container>
      </main>

    </Layout>
  );
}