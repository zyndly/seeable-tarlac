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

// ======================== QUERIES FOR FEATURED POST FOR EACH TOWN IN THE PROVINCE OF TARLAC ============================= //
// ========================================= DISTRICT 1 ====================================================== //

// ================================== Anao Post =====================================
export const getAnaoPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where:{anaoPost:true}) {
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
// ================================== End of Anao Post =================================

// ================================== Camiling Post =====================================
export const getCamilingPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{camilingPost:true}) {
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
// ================================== End of Camiling Post =================================

// ================================== Mayantoc Post =====================================
export const getMayantocPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{mayantocPost:true}) {
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
// ================================== End of Mayantoc Post =================================

// ================================== Moncada Post =====================================
export const getMoncadaPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{moncadaPost:true}) {
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
// ================================== End of Moncada Post =================================

// ================================== Paniqui Post =====================================
export const getPaniquiPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{paniquiPost:true}) {
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
// ================================== End of Paniqui Post =================================

// ================================== Pura Post =====================================
export const getPuraPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{puraPost:true}) {
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
// ================================== End of Pura Post =================================

// ================================== Ramos Post =====================================
export const getRamosPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{ramosPost:true}) {
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
// ================================== End of Ramos Post =================================

// ================================== San Clemente Post =====================================
export const getSanclementePosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{sanclementePost:true}) {
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
// ================================== End of San Clemente Post =================================

// ================================== San Manuel Post =====================================
export const getSanmanuelPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{sanmanuelPost:true}) {
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
// ================================== End of San Manuel Post =================================

// ================================== Sta. Ignacia Post =====================================
export const getStaignaciaPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{staignaciaPost:true}) {
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
// ================================== End of Sta. Ignacia Post =================================

// ========================================= DISTRICT 2 ====================================================== //

// ================================== Gerona Post =====================================
export const getGeronaPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{geronaPost:true}) {
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
// ================================== End of Gerona Post =================================

// ================================== San Jose Post =====================================
export const getSanjosePosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{sanjosePost:true}) {
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
// ================================== End of San Jose Post =================================

// ================================== Tarlac City Post =====================================
export const getTarlacPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{tarlacPost:true}) {
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
// ================================== End of Tarlac City Post =================================

// ================================== Victoria Post =====================================
export const getVictoriaPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{victoriaPost:true}) {
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
// ================================== End of Victoria Post =================================

// ========================================= DISTRICT 3 ====================================================== //

// ================================== Bamban Post =====================================
export const getBambanPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where:{bambanPost:true}) {
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
// ================================== End of Bamban Post =================================

// ================================== Capas of Post =====================================
export const getCapasPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where:{capasPost:true}) {
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
// ================================== End Capas of Post =================================

// ================================== Concepcion of Post =====================================
export const getConcepcionPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{concepcionPost:true}) {
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
// ================================== End Concepcion of Post =================================

// ================================== La Paz of Post =====================================
export const getLapazPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{lapazPost:true}) {
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
// ================================== End La Paz of Post =================================

// ================================== Festival Post =====================================
export const getFestivalPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{festivalPost:true}) {
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
// ================================== End of Festival Post =================================

// ================================== Festival Post =====================================
export const getChurchPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where:{churchPost:true}) {
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
// ================================== End of Church Post =================================