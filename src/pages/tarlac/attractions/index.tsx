import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import { AttractionsPostCard } from "@/components/post/FeaturedPost";
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";



export default function AttractionsPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='Attractions'
        description=''
      />

      <main>
        <PageHeading>Tarlac Attractions</PageHeading>

        <Container>
          <AttractionsPostCard />
        </Container>
      </main>

      
    </Layout>
  );
}