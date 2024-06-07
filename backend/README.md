## Project Structure

This is basic guidance to read the project structure

- `api`: Main logic writes here. each sub-folder contain 1 domain.
  - Each sub-folder commonly has 5 folder:
    - `controller.ts`: recieve Request, Response from route, pass to `service.ts` and process the response to client.
    - `route.ts`: define route for each use-cases.
    - `service.ts`: implement core logic: process calculating, query DB,...
    - `validator.ts`: validate request data from client.
  - `index.ts`: define main role for each role in `api/route`
- `common`: writing function that affect directly to business logic, create sub-folder due to needs.
- `config`: config value for app.
- `constant`: define constant use for whole application.
- `dist`: contains code build from typescript to javascript, ignore this folder.
- `loader`: define loader for each module: express, morgan, passport, mongooes,...
- `middleware`: define middleware, example: authentication for each route need token.
- `models`: same as entity, define mongo models.
- `node_modules`
- `public`: static file, assets.
- `types`: defines types for anything
  - `api`: use for api folder such as response type
  - `schema`: types for schema, also use for define validate object.
- `.env.example`: define enviroment variables