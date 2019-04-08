import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';

import { CreateBlogMutation, CreateBlogMutationVariables, ListBlogsQuery } from '../../API';
import listBlogsQuery from '../../api/listBlogsQuery';
import { createBlog } from '../../graphql/mutations';

class CreatePostMutation extends Mutation<CreateBlogMutation, CreateBlogMutationVariables> {};

export function CreateBlog() {
    return (
        <CreatePostMutation 
            mutation={gql(createBlog)}
            update={(cache, { data }) => {
                const { listBlogs: listBlogResult } = cache.readQuery<ListBlogsQuery>({ query: listBlogsQuery }) as any;
                cache.writeQuery({
                    query: listBlogsQuery,
                    data: { listBlogs: { ...listBlogResult, items: listBlogResult.items.concat([(data as any).createBlog]) }},
                });
              }}
        >
            {(createBlogAction, { data }) => {
                const mockedPost = {
                    variables: {
                        input: {
                            name: 'Mock',
                        }
                    }
                };
                return (
                    <div>
                        <button onClick={() => createBlogAction(mockedPost)} value="teste">Hue</button>
                    </div>
                );
            }}
        </CreatePostMutation>
    )
}