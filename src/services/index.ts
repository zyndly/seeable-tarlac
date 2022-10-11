/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
import { graphql } from 'graphql';
import { gql,request } from 'graphql-request'; 

import { sanitizeString } from '../utils/utils';

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string; //type assertion


// ========================================================= QUERY TO GET ALL POST ==============================================================
export const getPosts = async () : Promise<[]> => {

    const query:string = gql`
        query GetPosts () {

            posts(
                orderBy: createdAt_DESC
                last: 100
            ){
                
                author {
                    bio
                    id
                    name
                    photo {
                    url
                    }
                }
                categories {
                    name
                    slug
                }
                excerpt
                featuredImage {
                    url
                }
                createdAt
                featuredPost
                slug
                title
                id
                      
            }
            
        }
    `;

    const results = await request(graphqlAPI, query);

    console.log('posts: ', results.posts);

    return results.posts; 

}

// ========================================================= RECENT POST QUERY ==============================================================

export const getRecentPosts = async (): Promise<[]> => {

    const query = gql`
        query GetRecentPosts () {
            posts(
                orderBy: createdAt_DESC
                last: 6
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.posts;
}

// ========================================================= SIMILAR POST QUERY ==============================================================
export const getSimilarPosts = async (categories?: [string], slug?: string ): Promise<[]> => {

    const query = gql`
        query GetSimilarPosts($categories: [String!], $slug: String!) {
            posts(
                where: {
                    slug_not: $slug, 
                    AND: {
                        categories_some: {
                            slug_in: $categories
                        }
                    }
                }
                orderBy: createdAt_DESC
                last: 6
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug 
            }
        }
    `; 

    const result = await request(graphqlAPI, query, {categories, slug});

    return result.posts;
}

// ========================================================= SEARCH QUERY ==============================================================

export const searchPosts = async (searchQuery: string, max = 6): Promise<[]> => {

    searchQuery = sanitizeString(searchQuery);

    const query = gql`
        query SearchPosts($searchQuery: String!, $max: Int!) {
            posts(
                where : {
                    _search: $searchQuery       
                }
                last: $max
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                excerpt
                slug 
                id
                categories {
                    name
                    slug
                }
            }
        }
    `; 

    const result = await request(graphqlAPI, query, {searchQuery, max});

    console.log("results: ", result);

    return result.posts;
}

// ========================================================= POST DETAILS QUERY ==============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getPostDetails = async (slug: string): Promise<{}> => {

    const query = gql`
        query GetPostDetails ($slug: String!) {
            post(
                where: {
                    slug: $slug
                }
            ) {
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                }
                categories {
                    name
                    slug
                }
                excerpt
                featuredImage {
                    url
                }
                createdAt
                slug
                title
                id
                content {
                    raw
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });
    return result.post;
}

// ========================================================= COMMENTS QUERIES ==============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitComment = async (obj: any) => {

    const result = await fetch('/api/comments', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });

    return result.json();

}

export const getComments = async (slug: string): Promise<[]> => {

    const query = gql`
        query GetComments ($slug: String!) {
            comments(
                where: {
                    post: {
                        slug: $slug
                    }
                }
            ) {
                name,
                createdAt,
                comment
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});
    return result.comments;

}
// ========================================================= CATEGORY // TAG QUERY ==============================================================

export const getTagPosts = async (slug:string) : Promise<[]> => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };

// ========================================================= CATEGORIES QUERY ==============================================================

export const getCategories = async () : Promise<[]> => {

    const query = gql`
        query GetCategories () {
            categories(
                orderBy: createdAt_ASC
            ) {
                name
                slug 
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.categories;
}


// ========================================================= FEATURED POSTS QUERY ============================================================

export const getFeaturedPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where:{featuredPost:true}) {
          author {
            name
            photo{
              url
            }  
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }
    `;
    const result = await request(graphqlAPI, query)
    return result.posts
  }

// ========================================================= COLLECTION QUERIES ==============================================================
  
  export const getCollections = async (max = 4): Promise<[]> => {

    const query = gql`
        query GetCollections ($max: Int!) {
            collections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {max});
    return result.collections;

}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetCollection ($slug: String!) {
            collection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getCollection result: ", result);
    return result.collection;

}


// ========================================================= TARLAC CITY COLLECTIONS QUERY ============================================================



// eslint-disable-next-line @typescript-eslint/ban-types
export const getTarlacCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetTarlacCollection ($slug: String!) {
            tarlacCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getTarlacCollection result: ", result);
    return result.tarlacCollection;

}

export const getTarlacCollections = async (): Promise<[]> => {

    const query = gql`
        query GetTarlacCollections ($max: Int!) {
            tarlacCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.tarlacCollections;

}
// ========================================================= Anao COLLECTIONS QUERY ============================================================



// eslint-disable-next-line @typescript-eslint/ban-types
export const getAnaoCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetAnaoCollection ($slug: String!) {
            anaoCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getAnaoCollection result: ", result);
    return result.anaoCollection;

}

export const getAnaoCollections = async (): Promise<[]> => {

    const query = gql`
        query GetAnaoCollections ($max: Int!) {
            anaoCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.anaoCollections;

}

// ========================================================= BAMBAN COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getBambanCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetBambanCollection ($slug: String!) {
            bambanCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getBambanCollection result: ", result);
    return result.bambanCollection;

}

export const getBambanCollections = async (): Promise<[]> => {

    const query = gql`
        query GetBambanCollections ($max: Int!) {
            bambanCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.bambanCollections;

}

// ========================================================= CAMILING COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getCamilingCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetCamilingCollection ($slug: String!) {
            camilingCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getCamilingCollection result: ", result);
    return result.camilingCollection;

}

export const getCamilingCollections = async (): Promise<[]> => {

    const query = gql`
        query GetCamilingCollections ($max: Int!) {
            camilingCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.camilingCollections;

}

// ========================================================= CAPAS COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getCapasCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetCapasCollection ($slug: String!) {
            capasCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getCapasCollection result: ", result);
    return result.capasCollection;

}

export const getCapasCollections = async (): Promise<[]> => {

    const query = gql`
        query GetCapasCollections ($max: Int!) {
            capasCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.capasCollections;

}

// ========================================================= CONCEPCION COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getConcepcionCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetConcepcionCollection ($slug: String!) {
            concepcionCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getConcepcionCollection result: ", result);
    return result.concepcionCollection;

}

export const getConcepcionCollections = async (): Promise<[]> => {

    const query = gql`
        query GetConcepcionCollections ($max: Int!) {
            concepcionCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.concepcionCollections;

}

// ========================================================= GERONA COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getGeronaCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetGeronaCollection ($slug: String!) {
            geronaCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getGeronaCollection result: ", result);
    return result.geronaCollection;

}

export const getGeronaCollections = async (): Promise<[]> => {

    const query = gql`
        query GetGeronaCollections ($max: Int!) {
            geronaCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.geronaCollections;

}

// ========================================================= LAPAZ COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getLapazCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetLapazCollection ($slug: String!) {
            lapazCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getLapazCollection result: ", result);
    return result.lapazCollection;

}

export const getLapazCollections = async (): Promise<[]> => {

    const query = gql`
        query GetLapazCollections ($max: Int!) {
            lapazCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.lapazCollections;

}

// ========================================================= MAYANTOC COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getMayantocCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetMayantocCollection ($slug: String!) {
            mayantocCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getMayantocCollection result: ", result);
    return result.mayantocCollection;

}

export const getMayantocCollections = async (): Promise<[]> => {

    const query = gql`
        query GetMayantocCollections ($max: Int!) {
            mayantocCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.mayantocCollections;

}

// ========================================================= PANIQUI COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getPaniquiCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetPaniquiCollection ($slug: String!) {
            paniquiCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getPaniquiCollection result: ", result);
    return result.paniquiCollection;

}

export const getPaniquiCollections = async (): Promise<[]> => {

    const query = gql`
        query GetPaniquiCollections ($max: Int!) {
            paniquiCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.paniquiCollections;

}

// ========================================================= PURA COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getPuraCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetPuraCollection ($slug: String!) {
            puraCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getPuraCollection result: ", result);
    return result.puraCollection;

}

export const getPuraCollections = async (): Promise<[]> => {

    const query = gql`
        query GetPuraCollections ($max: Int!) {
            puraCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.puraCollections;

}

// ========================================================= RAMOS COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getRamosCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetRamosCollection ($slug: String!) {
            ramosCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getRamosCollection result: ", result);
    return result.ramosCollection;

}

export const getRamosCollections = async (): Promise<[]> => {

    const query = gql`
        query GetRamosCollections ($max: Int!) {
            ramosCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.ramosCollections;

}

// ========================================================= SAN CLEMENTE COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getSanclementeCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetSanclementeCollection ($slug: String!) {
            sanclementeCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getSanclementeCollection result: ", result);
    return result.sanclementeCollection;

}

export const getSanclementeCollections = async (): Promise<[]> => {

    const query = gql`
        query GetSanclementeCollections ($max: Int!) {
            sanclementeCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.sanclementeCollections;

}

// ========================================================= SAN JOSE COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getSanjoseCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetSanjoseCollection ($slug: String!) {
            sanjoseCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getSanjoseCollection result: ", result);
    return result.sanjoseCollection;

}

export const getSanjoseCollections = async (): Promise<[]> => {

    const query = gql`
        query GetSanjoseCollections ($max: Int!) {
            sanjoseCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.sanjoseCollections;

}

// ========================================================= SAN MANUEL COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getSanmanuelCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetSanmanuelCollection ($slug: String!) {
            sanmanuelCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getSanmanuelCollection result: ", result);
    return result.sanmanuelCollection;

}

export const getSanmanuelCollections = async (): Promise<[]> => {

    const query = gql`
        query GetTarlacCollections ($max: Int!) {
            tarlacCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.sanmanuelCollections;

}

// ========================================================= STA. IGNACIA COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getStaignaciaCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetStaignaciaCollection ($slug: String!) {
            staignaciaCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getStaignaciaCollection result: ", result);
    return result.staignaciaCollection;

}

export const getStaignaciaCollections = async (): Promise<[]> => {

    const query = gql`
        query GetStaignaciaCollections ($max: Int!) {
            staignaciaCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.staignaciaCollections;

}

// ========================================================= VICTORIA COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getVictoriaCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetVictoriaCollection ($slug: String!) {
            victoriaCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getVictoriaCollection result: ", result);
    return result.victoriaCollection;

}

export const getVictoriaCollections = async (): Promise<[]> => {

    const query = gql`
        query GetVictoriaCollections ($max: Int!) {
            victoriaCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.victoriaCollections;

}

// ========================================================= MONDACA COLLECTIONS QUERY ============================================================

// eslint-disable-next-line @typescript-eslint/ban-types
export const getMoncadaCollection = async (slug:string): Promise<{}> => {

    const query = gql`
        query GetMoncadaCollection ($slug: String!) {
            moncadaCollection(
                where: {slug: $slug}
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                },
                posts {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    excerpt
                    author {
                        name
                        photo {
                            url
                        }
                    }
                    slug 
                    categories {
                        name
                        slug
                    }
                    
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, {slug});

    console.log("getMoncadaCollection result: ", result);
    return result.moncadaCollection;

}

export const getMoncadaCollections = async (): Promise<[]> => {

    const query = gql`
        query GetMoncadaCollections ($max: Int!) {
            moncadaCollections(
                orderBy: createdAt_ASC
                last: $max
            ) {
                title,
                description,
                slug,
                subtitle,
                image {
                    url
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query,);
    return result.moncadaCollections;

}