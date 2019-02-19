# snapshotter

This tool generates snapshots when a URL is visited.

# Parameters

Tool may be configured using these parameters:

- BASE: URL of the website to create snapshots, for example: https://www.movistarplay.cl
- DESTINATION: Folder where snapshots will be stored.
- PORT (Optional - Default: 3000): Port where app will be listening
- VALID_SIZE (Optional - Default 50): Minimum size in Kbs to consider a snapshot valid
- USER (Optional): Basic auth username
- PASS (Optional): Basic auth password

# Execution

There are two ways to execute the application, throug Node or using Docker.

Any of these ways will expose the app at localhost through the port specified.

```
http://localhost:3000/?url=/details/serie/a-tu-casa-ganamos-aca-3374606
```

## Using Node

**Prerequisites:** You should have node installed in your system.

First we should install dependencies

```
npm i
```

Then we may run the application

```
env PORT=3000 BASE=http://enjoy.tid.es DESTINATION=./snapshots npm run start
```

## Using Docker

**Prerequisites:** You should have Docker installed in your system.

First the docker image should be build with this command.

```
# It builds the image with the tag snapshotter
docker build . -t snapshotter
```

Then we should launch the app

```
# This command deploys the previous image in a container
docker run -p 3000:3000 \
-v /origin/path/to/snapshots/:/snapshots \
-e BASE=http://enjoy.tid.es \
-e DESTINATION=/snapshots \
-d snapshotter:latest
```

Previous command has this configuration:

- Exposes the 3000 port of the app through the port 3000 of the host machine
- Uses http://deploy.tid.es as a base domain
- Sets /snapshots folder in the container to store snapshots
- Links the origin path `/origin/path/to/snapshots/` with the container folder `/snapshots` to store snapshots.
