import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { SanManuelPostCard } from "@/components/post/townWidget/one"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function SanManuel() {
  return (
    <Layout>
      <Seo 
        templateTitle='San Manuel'
        description=''
      />

      <main>
      <PageHeading>San Manuel Tarlac</PageHeading>

      <Container>
        <SanManuelPostCard />
      </Container>
      </main>

    </Layout>
  );
}