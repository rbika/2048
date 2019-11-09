# 2048

This game is a React implementation of the [2048](<https://en.wikipedia.org/wiki/2048_(video_game)>) game.

Play the game [here](#).

## Development environment

1. Clone the repository:

```
git clone
```

1. Change directory:

```
cd 2048
```

1. Run the application:

```
$ docker-compose up
```

1. The application will be running on [localhost:3000]()

## Installing and updating dependencies

To install new dependencies, run:

```
$ docker-compose exec -T app npm install [...]
```

Then run:

```
$ docker-compose exec -T app cat package.json > package.json
$ docker-compose exec -T app cat package-lock.json > package-lock.json
```

If someone else add or update a dependency you need to rebuild the project images in order to see those changes reflected on your development environment:

```
$ docker-compose up --build
```
