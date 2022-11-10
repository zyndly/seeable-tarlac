import { Container } from "@/components/layout/Container";
import Layout from "@/components/layout/Layout";
import { DelicaciesPostCard } from "@/components/post/FeaturedPost";
import Seo from "@/components/Seo";
import { PageHeading } from "@/components/text/PageHeading";



export default function DelicaciesPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='Delicacies'
        description=''
      />

      <main>
        <PageHeading>Tarlac Delicacies</PageHeading>

        <Container>
          <DelicaciesPostCard />
        </Container>
      </main>

      
    </Layout>
  );
}