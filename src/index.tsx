import './index.css';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

import App from './App';
import config from './aws-exports';
import * as serviceWorker from './serviceWorker';

const client = new AWSAppSyncClient({
    url: config.aws_appsync_graphqlEndpoint,
    region: config.aws_appsync_region,
    auth: {
      type: config.aws_appsync_authenticationType as AUTH_TYPE,
      apiKey: config.aws_appsync_apiKey,
      // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    }
  });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>  
    </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
