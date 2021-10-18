# QCloud2 Client

## Install and launch the development environment

### Requirements

First of all install the latest stable version of **[Node.js](https://nodejs.org/en/about/releases/)**

Install **[NPM (Node Packet Manager)](https://docs.npmjs.com/cli/v7/commands/npm-install)**. Node.js installs it, check your version with `npm -v`

Install **[Angular CLI](https://angular.io/cli)** with the following command:

`sudo npm install -g @angular/cli`

### Environments

Angular works with environments to separate prod, dev and test (and qdv, qlv in QCloud2), by default the development server starts with the dev environment. The environments have important variables like the backend URL.

### Sarting dev server

Clone qcloud2-client

Install the needed node modules with `npm install`. This command install all the modules and dependencies that the project needs to work. It can take a while to complete.

Then run the project with `ng serve` to start the development server with the dev environment active -> http://localhost:4200/login

## Compile the project

Compile the project clicking at the play button in transpile:prod (or transpile:test, depending on the desired environment).

![compileAngular](https://user-images.githubusercontent.com/1679820/137738223-1fec6c6a-647a-42df-b512-0ec4a9fd644e.png)

You can also use:

`node --max_old_space_size=8196 node_modules/@angular/cli/bin/ng build --configuration=production`

To achieve the same result.

Both methods will create a `dist` folder with the compiled files.

## Deploy the project

Send the compiled files to the server:

`scp -r dist/* admin@10.102.1.26:/home/admin/temp`

Make a backup of the actual prod files:

`cp -r /var/www/html/qcloud2/* /home/admin/backup`

And then delete the old prod files and send the new files to the Apache2 folder

`rm -rf /var/www/html/qcloud2/*`

`cp -r /home/admin/temp/* /var/www/html/qcloud2/`
Be carefull to do not copy qcloud2 folder. Only copy its contents (like in qsample)

Sometimes the `.htaccess` file is deleted. In this case just use the one in QSample folder:

`cp /var/www/html/qsample/.htaccess /var/www/html/qcloud2/`

Go to your favorite web browser and test if it works (Remember to clear the cache `Ctrl + shift + r`).

*Obviously everthing works*

## QLV

Switch the branch to QLV and merge with master. Change the backend URL in `src/environmnents/evironment.outside.ts` and compile with the outside environment.

## QDM

Switch the branch to QDM and merge with master, be careful about the QDM restrictions.

Compile with the demo environment and deploy it to prod like the normal version. Be aware that the demo version Apache path is different: `/var/www/html/qcloud2demo`

## Errors

Be sure that the front end is pointing to the correct back end. Check it using the dev tools -> network.

## References

[Getting started with Angular](https://angular.io/start)

QCloud2 Client environemts list:

![QCloud2 environments](images/environments.png) https://i.imgur.com/mdJR03n.jpg

---

Document created by *[Marc](mailto:vesperon51@gmail.com)* with [love](https://i.imgur.com/mdJR03n.jpg).

4/10/2021
