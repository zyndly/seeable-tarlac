import Layout from "@/components/layout/Layout";
import { FeaturedCollections } from "@/components/post";
import Seo from "@/components/Seo";

export default function Featured() {
  return (
    <Layout>
      <Seo 
        templateTitle='Featured'
        description=''
      />

      <FeaturedCollections/>

      
    </Layout>
  );
}