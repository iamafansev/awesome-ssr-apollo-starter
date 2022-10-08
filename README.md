# Awesome react ssr starter

This starter includes such technologies and tools as:

- React with server rendering support (Razzle)
- Apollo and gql code and type generation via @graphql-codegen
- Material UI
- Internationalization (i18next)
- Routing (react-router)
- Code splitting to reduce package (@loadable/component)
- Generation of icon components from svg files (svgr)

## Configuration

Remove the ending example from all `.env.**.example` and change the `RAZZLE_API_ENDPOINT` variable, which will point to your `gql-uri`.

You can also run in test mode with a value already set2 to `RAZZLE_API_ENDPOINT`

## How to use

```bash
yarn install
yarn start
```

The application will open at http://localhost:3000/

## Docker

SSR is a Node.js application and it is easily [dockerized](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/).

See the [Dockerfile](./Dockerfile) on how to build a Docker image of your server.

Now to build a Docker image of your own Nest server simply run:

```bash
# give your docker image a name
docker build -t <your username>/awesome-ssr-apollo-starter .
# for example
docker build -t awesome-ssr-apollo-starter .
```

After Docker build your docker image you are ready to start up a docker container running the nest server:

```bash
docker run -d -t -p 3000:3000 awesome-ssr-apollo-starter
```

## Do you have any questions?

If you are missing build configuration information, you can most likely find it in the [Razzle documentation](https://razzlejs.org/]).
