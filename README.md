# Flixcheck

## Description

This project aims to display the current location of any given IP. 

## Infrastructure

The Project contains a backend and frontend folder. The backend is a node.js instance using Express implementing a rest api. The frontend uses react and bootstrap to render the IP dialog and uses embedded google maps.

### Linting

linting is done with prettier, eslint and stylelint

### Tests

Tests are done using jest. Testcoverage for the backend and frontend should be kept to 100%. Coverage reports are not deployed yet. 

### Deployment

The frontend and backend are wrapped into a container. The container is deployed to a private ecr instance. The Image is then fetched by an aws ec2 instance and run on a linux machine, this is currently done manually. Certificates are issued using Lets Encript. The webserver used is a lighttpd server.

### Development

To run the instance locally 
```bash
cd frontend
npm ci
npm run dev

cd backend
npm ci
npm run dev
```
Both instances use hot reloading. The container can also be build and tests locally


### Rest api Docs

The rest api is using apidoc to generate automated docs for the api. The docs is deployed with every new image