import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { ListBlogsQuery } from '../../API';
import listBlogsQuery from '../../api/listBlogsQuery';

class BlogQuery extends Query<ListBlogsQuery, {}> {};

export function BlogList() {
    return (
        <BlogQuery query={listBlogsQuery}>
            {({loading, error, data}) => {
                if (loading) return (<div>Loading</div>);
                if (error) return `Error!: ${error}`;
                if (data && data.listBlogs && data.listBlogs.items) {
                    console.log(data.listBlogs.items);
                    return (
                        <Fragment>
                            <div>Blogs: </div>
                            {
                                data.listBlogs.items.map(blog => 
                                    <div key={(blog as any).id}>{(blog as any).name}</div>
                                )
                            }
                        </Fragment>
                    )
                } else {
                    return null;
                }
            }}
        </BlogQuery>
    )
    
}