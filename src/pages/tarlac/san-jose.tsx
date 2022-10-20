import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { SanJosePostCard } from "@/components/post/townWidget/two"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function SanJose() {
  return (
    <Layout>
      <Seo 
        templateTitle='San Jose'
        description=''
      />

      <main>
      <PageHeading>San Jose Tarlac</PageHeading>

      <Container>
        <SanJosePostCard />
      </Container>
      </main>

    </Layout>
  );
}