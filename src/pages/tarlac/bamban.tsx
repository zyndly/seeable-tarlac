import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { BambanPostCard } from "@/components/post/townWidget/three"
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function Bamban() {
  return (
    <Layout>
      <Seo 
        templateTitle='Bamban'
        description=''
      />

      <main>
      <PageHeading>Bamban Tarlac</PageHeading>

      <Container>
        <BambanPostCard />
      </Container>
      </main>

    </Layout>
  );
}