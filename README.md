## Init

- Install pnpm

https://pnpm.io/installation

- Install Docker

https://www.docker.com/get-started/

- Install Makefile

`choco install make`

- If you do not have choco, install choco

https://chocolatey.org/install

- Fill up the .env.local file (ask your mentor for the file)

- Install the dependencies of the project

`pnpm install`

## Start the project

- before starting the project always start the docker container with the help of the following command in the root of the project

`make up-dev`

- after the docker container are started and alive start the project with:

`pnpm dev` in dev mode

`pnpm start` in production mode

When the docker container are ready, you can seed the initial dta to the db with the help of `pnpm seed`

Here we go, welcome aboard
