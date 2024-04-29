// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const mondayApiUrl = 'https://api.monday.com/v2/';
const mondayAuthToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM0ODE1MTEyOSwiYWFpIjoxMSwidWlkIjo1OTMyNDY0MywiaWFkIjoiMjAyNC0wNC0xN1QwNzoyMzoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6NTY3MTA4MywicmduIjoidXNlMSJ9.M9CjorPqcpettHfHG7XS5v7J9eMtXv_Q6vdSVgYZl5g'; // Replace with your token

const client = new ApolloClient({
    uri: mondayApiUrl,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${mondayAuthToken}`,
    },
});

export default client;
