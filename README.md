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
### Getting Started
The Orgbook BC project sits on top of verifiable credential technology facilitated by Aries VCR. A locally running instance of Aries VCR is not required to run the Orgbook BC web application on your own machine. By default Orgbook BC forwards API calls to the publicly running instance of the Orgbook API [here](https://orgbook.gov.bc.ca/api/). The Orgbook API is simply an Aries VCR instance containing credential information about BC Business entities. You can change your local instance of Orgbook to point to any running instance of an Aries VCR agent by editing the `vue.config.js` file outlined in this section [here](#proxy-configuration). If you would like to setup a locally running instance of Aries VCR to test with Orgbook, then follow the instructions [here](https://github.com/bcgov/aries-vcr/tree/master/docs). To run Orgbook in development mode look at the project setup section [here](#project-setup)

### Proxy Configuration
The `vite.config.js` file contains configuration information for the Orgbook BC project, including the URL of the Aries VCR API that Orgbook will send requests to.
~~~ typescript
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      proxy: {
        "/api": {
          target: "https://orgbook.gov.bc.ca",
          // target: "http://localhost:8080",
        },
      },
    },
  },
~~~
Simply change the `target` to the URL of the Aries VCR instance that you wish to use. Some examples are `https://dev.orgbook.gov.bc.ca`, `https://test.orgbook.gov.bc.ca`, or `http://localhost:8080` if you are running Aries VCR locally on port 8080
### Project setup
Orgbook relies on npm and the Vue.js framework. Please make sure npm is up to date and installed on your system.
After you've verified npm is installed, run the following command in the base folder of the application to install the project dependencies.
```
npm install
```
Once all the dependencies have been installed successfully, you can start the project locally. Run the following command in the base folder of the application to start Orgbook BC on your local machine.
Orgbook will use port 8080 by default. Go to http://localhost:8080 to see your locally running instance of Orgbook
```
npm run serve
```

## Contributing

**Pull requests are always welcome!**

Please see the [Contributions Guide](CONTRIBUTING.md) for the repo.

Before contributing please run `npm run lint` and fix any linter warnings in your code contribution.

You may also create an issue if you would like to suggest additional resources to include in this repository.

All contrbutions to this repository should adhere to our [Code of Conduct](./CODE_OF_CONDUCT).
