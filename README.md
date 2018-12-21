# Qcloud2Client

This is the web application client of QCloud 2.0 Quality control for Proteomics on the Cloud.

Clone this repo and the QCloud2.0 backend in your computer in order to run it.

## How to deploy

### Deploy in local server

If you want to deploy the application in a local server instead of using *Angular Live Development Server* transpile the application with the following command:

`npm run transpile:dev`

The application will appear in the dist folder at the root of the project. Just copy in your server at the **/qcloud2/** path. If you want to use another path change it in the package.json scripts section.

### Deploy test at the server

To deploy the application in the test server, running with port **8181** you need to use the following command:

`npm run transpile:dev`

The content generated at the dist folder has to be copied at the java/main/resources/static folder of the backend.

Then run the server with `java -jar -Dspring.profiles.active=test QCloud2-1.0.XXX.jar`

The frontend will be available at **http://qcloud2.crg.eu:8181**

### Deploy at production

Before replace any file please make a copy of the current applicacion located at /var/www/html/qcloud2

Use the following command:

`npm run traspile`

Copy the generated files at dist folder into the **/var/www/html/qcloud2**. Ask users to refresh the application with CONTROL + F5

## General guide for developing

Until now the application has been developed into this four modules

* entryPoint

* Application

    * Management

    * Administration
    
    * Statistics

    * Configuration

    * View builder

    * Shared modules
 
* Modal Module

* Plots module

### entryPoint

This module takes care of the login, registration and password recovery.

### Application
This module holds the layout of the application and the view display and plot logic.

### Management

This module takes care of the management functionality.

### Administration

This module takes care of the administartion functionality.

### Statistics

This module holds the non conformity visualization and is the place where will be the statistics functionality.

### Configuration

User configuration and user view builder

### View builder

This module is for a sort of WYSIWYG for build botht the default views for instruments and the user views.

### Shared modules

This is the place to store some components shared among modules.

### Shared folder

This is a folder holding pipes. It should be merged into shared modules

### Modal module

This module holds the modal functionality. It can trasport object between modal display and modal response for further actions.

### Plots module

This module keeps the plots functionality. There are three different plots.

## Project structure

Aside of the modules folder structure there are the **services** and **models** folder.

### Model folder

This folder contains all the classes used in the application. Almost all the classes are equal in the backend in order to keep the logic. So, if you update the backend you should update the related classes in this folder.

### Services

Every class has its own service connecting to the backend. Please check the source code of the backend.

## Authors

Daniel Mancera <daniel.mancera@crg.eu>
Roger Olivella <roger.olivella@crg.eu>
	