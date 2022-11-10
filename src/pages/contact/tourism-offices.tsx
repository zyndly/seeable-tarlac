import Layout from "@/components/layout/Layout";
import Template from "@/components/layout/Template";
import Seo from "@/components/Seo";

export default function TourismOfficesPage() {
  return (
    <Layout>
      <Seo 
        templateTitle='TourismOffices'
        description=''
      />

      <Template/>

      
    </Layout>
  );
}

const tourismOffices = [ 
  {
    place: '#user-content',
    contactPerson: 'User content',
    address: 'blah blah blah',
    contactNumber1: '',
    contactNumber2: '',
    email: '',
    website: '',
  },
]