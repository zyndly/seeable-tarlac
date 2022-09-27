/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
import { graphql } from 'graphql';
import { gql,request } from 'graphql-request'; 

import { sanitizeString } from '../utils/utils';

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string; //type assertion


/* Query to get all post */
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

// query to get the featuredpost

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
    `
    const result = await request(graphqlAPI, query)
    return result.posts
  }