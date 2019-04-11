# QCloud 2 deploy guide

In this guide you will learn how to deploy QCloud 2 in production and test

Step 1. First of all compile the Angular code with:
```
node --max_old_space_size=8196 node_modules/@angular/cli/bin/ng build --configuration=dev|test|prod
```
*Please see the enviroment files in the client code to get more info about the diferent transpile configuration*

Step 2. Move the **all** the code generated in the dist folder to the ```src/main/resources/static/``` folder in the server project

Step 3. In the server project run:
```
mvn package
```
*To skip the tests add ```-Dmaven.test.skip=true```*

Step 4. Move the .jar file generated in /target folder to the server

Step 5. In the server run:

Step 5.1. For test deploy
```
java -jar QCloudXXX.jar -Dspring.profiles.active=test 
```
Step 5.2. For the production deploy:
```
java -jar QCloudXXX.jar
```
*Please see the application.yml file to get more information about the server profiles*

## Notes

Before the deploy make a database backup

If everything goes ok the FlyAway should add all the new tables and data to the database

Update the version number in the file pom.xml, application.yml and package.json

Document created by Marc Serret (marc.serret@crg.eu)

Revision 1.0 (8 April 2019)
