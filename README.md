# The Gaem :: Epic Drinking Gaem

The Gaem is a simple drinking scheduler written in JavaScript and PHP.

![Gaem spinning](http://i57.tinypic.com/2zggr4x.jpg)

## How It Works

The Gaem picks random times to give out drinks. Once this time has been reached
a spinner is displayed and a random person is chosen to drink.

## Settings

As an administrator you can browse `/admin` to set various settings for the gaem.

These settings includes:

- On/Off: Whether the game is running or not.
- Min time: Minimum time we have to wait between each spinner is displayed.
- Max time: Maximum time we have to wait between each spinner is displayed.
- Chance for double spin: Define change of two simultaneous spinners.
- Change for triple spin: Define change of three simultaneous spinners.
- Names: Names for people that can be given a drink.
- Play sounds: Whether or not to play sounds after each spinning is finished.

![Gaem settings](http://i60.tinypic.com/33yltev.jpg)

## How to setup & run

First clone this repo.

### If you have PHP in your `$PATH`

If you have PHP in you `$PATH` you can run the application using the built in
PHP server. This can easily be done using the shell script provided.

Type

    sh run.sh

In your shell and the application is accessible at

    http://localhost:8080

### Setup with Apache

Copy `ht.access` in the application root and rename it to `.htaccess`. Open
the file and edit the `RewriteBase` line if you are not running the application
in the root directory of your web server.
