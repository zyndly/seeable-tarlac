import Layout from "@/components/layout/Layout";
import Template from "@/components/layout/Template";
import Seo from "@/components/Seo";

export default function Featured() {
  return (
    <Layout>
      <Seo 
        templateTitle='Featured'
        description=''
      />

      <Template/>

      
    </Layout>
  );
}