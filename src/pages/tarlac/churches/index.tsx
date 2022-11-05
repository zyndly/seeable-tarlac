import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import { ReligiousPostCard } from "@/components/post/FeaturedPost";
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";



export default function AttractionsPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='Faith Destinations'
        description=''
      />

      <main>
        <PageHeading>Tarlac Churches</PageHeading>

        <Container>
          <ReligiousPostCard />
        </Container>
      </main>

      
    </Layout>
  );
}