const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");

mongoose.connect(
    process.env.BBDD,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    },
    (err, _) => {
        if (err) {
            console.log("Error de conecction");
        } else {
            server();
        }
    });
function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,

    });
    serverApollo.listen().then(({ url }) => {
        console.log("################################");
        console.log(`servidor listo en la url ${url}`);
        console.log("################################");
    })
}
