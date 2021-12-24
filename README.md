[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Lifecycle:Maturing](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)

# Orgbook BC Client

## Overview

This application implements a user interface (built with Vue) specifically for Orgbook BC, an extension of Aries VCR, for registered organizations within the Province of British Columbia.

_Note: The following sections on [Running](#running) and [Development](#development) assume that you already have a locally running instance of Aries-VCR. Please see the instructions [here](https://github.com/bcgov/aries-vcr/tree/master/docs) for running Aries-VCR locally with docker._

## Running 

Running the web application is easiest with docker. Navigate to the `docker/` folder run the following in a terminal:

``` 
./manage build
``` 

followed by

``` 
./manage start
```

## Development

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
