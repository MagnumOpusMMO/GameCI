# GameCI

## What is this?

- An open-sourced tool-chain for indie game developers to create a CI pipeline for their projects

## Why? 

- Building game assets takes time and resources. When building them, development cannot occur on the same project directory. It is costly to run local build farms for multiple platforms, and environments
- Server and client deployment is very manual
- Project collaboration is difficult
- There is no standard client updating method

## Problems we want to solve
- Building clients and servers for various platforms in the cloud
- Environment variable injection at build time
- Server and Client deployment
    - run server map/port (locally and production)
- Large binary file collaboration. How can many developers work on the same blueprints and merge them into the main branch?
- Client updating

-------------------------------

## How to Use
### Environment Variables

- Unreal Engine does not support environment variables. Instead, it uses config files (`project/Config/*.ini`).

#### Example config
Create: 
1. ```projectPath/Config/development.json```
2. ```projectPath/Config/production.json```

`Example`
```
{
  "GAME_URL": "127.0.0.1",
  "API_URL": "127.0.0.1",
  "CLIENT_VERSION": "0.7.0"
}
```

## Setup
`GameCI setup`

- populate the fields for a given platform

## Inject
`GameCI inject`

- injects a config into `DefaultGame.ini`

## Deployments
`GameCI deploy`

### Local
- Build local client and server
- deploys to s3

### Server
- Pulls and setups server to a server

## Resources
- https://www.slideshare.net/EpicGamesJapan/press-button-drink-coffee-an-overview-of-ue4-build-pipeline-and-maintenance
- https://www.ue4community.wiki/Legacy/How_to_package_your_game_with_commands
