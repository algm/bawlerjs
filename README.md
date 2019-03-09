# Bawlerjs

Simple translatable messages in your javascript coming from a backend or object.

[![npm version](https://badge.fury.io/js/bawlerjs.svg)](https://badge.fury.io/js/bawlerjs)
[![Build Status](https://travis-ci.org/algm/bawlerjs.svg?branch=master)](https://travis-ci.org/algm/bawlerjs)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/algm/bawlerjs/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/algm/bawlerjs/?branch=master)
[![](https://data.jsdelivr.com/v1/package/npm/bawlerjs/badge)](https://www.jsdelivr.com/package/npm/bawlerjs)

# Motivation

Talking with a colleague about how to integrate translations into an old js codebase I came up with the idea of making this package. It is the simplest approach to translations in javascript I could think about.

As you are probably thinking, the purpose of this package is to be as easy to setup and use as possible.

# Installation

## Using npm

Execute this command in the console:

```
npm i bawlerjs
```

## Using yarn

Execute this command in the console:

```
yarn add bawlerjs
```

## Standalone

Add this to your html:

```html
<script src="https://cdn.jsdelivr.net/npm/bawlerjs/dist/main.min.js"></script>
```

You can see all available versions here: https://www.jsdelivr.com/package/npm/bawlerjs

# Usage

Rememeber that if you are using the package as a js module using yarn or npm you have to import the package:

```js
import Bawler from 'bawlerjs';
```

You can also import the msg method directly:

```js
import { msg } from 'bawlerjs';
```

## Setting output language for the messages

You can change the language Bawler is outputting messages to by calling the `lang` method. By default the selected language will be `en`.

```js
Bawler.lang('es'); //set the "es" language
```

## Registering messages to languages

You can set messages in Bawler by using the `register` and `registerUrl` methods.

### Synchronous message registration

By using the `register` method you can register the messages of a language in a synchronous way.

```js
Bawler.register('en', {
    'HELLO WORLD': 'Hello world!',
});
```

### Asynchronous message registration

You can also register messages from an url by calling the `registerUrl` method. The output of the url must be a json object whose keys are the message keys and the values are the translated messages.

The method will return a promise that will be resolved when the url is correctly loaded.

Example:

```js
await Bawler.registerUrl('/messages-en.json', 'en');
```

## Outputting messages

To output a message, simply call the `msg` method. Remember you can import the `msg` function directly from the module.

```js
Bawler.register('en', {
    'HELLO WORLD': 'Hello world!',
});

Bawler.lang('en');

Bawler.msg('HELLO WORLD'); //Outputs: Hello world!
```

You can also pass variables to the messages by using sprintf syntax (as in C and similar languages):

```js
Bawler.register('en', {
    'HELLO %s': 'Hello, %s!',
});

Bawler.lang('en');

Bawler.msg('HELLO %s', ['handsome']); //Outputs: Hello handsome!
```

If the message is not defined in the current language, Bawler will output the passed key directly:

```js
Bawler.register('en', {
    'HELLO WORLD': 'Hello world!',
});

Bawler.lang('es');

Bawler.msg('HELLO WORLD'); //Outputs: HELLO WORLD

Bawler.lang('en');

Bawler.msg('THIS DOES NOT EXIST'); //Outputs: THIS DOES NOT EXIST
```
