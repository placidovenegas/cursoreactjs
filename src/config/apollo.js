
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const HttpLink = createHttpLink({
    uri: "http://localhost:4000/"
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    Link: HttpLink,
});
export default client;