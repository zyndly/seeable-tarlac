import { Container } from '@/components/layout/Container';
import Layout from "@/components/layout/Layout";
import { LaPazPostCard } from "@/components/post/townWidget/three";
import Seo from "@/components/Seo";
import { PageHeading } from '@/components/text/PageHeading';


export default function LaPaz() {
  return (
    <Layout>
      <Seo 
        templateTitle='La Paz'
        description=''
      />

      <main>
      <PageHeading>Lapaz Tarlac</PageHeading>

      <Container>
        <LaPazPostCard />
      </Container>
      </main>

    </Layout>
  );
}