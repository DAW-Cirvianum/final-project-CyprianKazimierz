# MyApp

## Requeriments
1. Have docker installed, if you don't have it you can follow this [guide for ubuntu](https://docs.docker.com/engine/install/ubuntu/) and do the post-installation steps, and for windows go to the web site and download it.
2. Windows:
    - For Windows users you might have the wsl in docker, if you don't have following this [guide](https://learn.microsoft.com/es-es/windows/wsl/install), you can only do the step 1. 
        - Next to integrate to windwos docker you will follow this [guide](https://learn.microsoft.com/es-es/windows/wsl/tutorials/wsl-containers).
        - When you are in wsl "ubntu in windows" terminal, you will first update the system:
        ```bash
        sudo apt update
        ```
        - Next, you will install npm/node inside the wsl, to doesn't use the nmp/nodem of windows, to check this execute the command:
        ```bash
        which npm
        ```
        - If you get something like this is ok:
        ```text
        /user/bin/node
        /user/bin/npm
        ```
        - But, if you get something like that you will have to install the node/npm inside the wsl using this [guide](https://nodejs.org/en/download) for "linux" using "nvm" with "npm":
        ```text
        /mnt/c/Program Files/nodejs/npm.cmd or /mnt/c/Program Files/nodejs//npm
        ```
            

## Instructions for start up
1. Clone the repository.
2. Open the terminal in the main folder or move to the cloned folder.
3. Open or run Docker.
4. In the repository you will modify the file .env.example to .env and change the content:
    ```sh
    DB_CONNECTION=bbdd that you use  example mysql
    DB_HOST=127.0.0.1 or the service of yhe bbdd that you will use example mysql
    DB_PORT=3306 
    DB_DATABASE=laravel | name of the database
    DB_USERNAME=root | username of the database
    DB_PASSWORD= | his password
    ```
    ```sh
    MAIL_MAILER=log | change to smtp
    MAIL_SCHEME=null \ no modifie if you want is not necessary
    MAIL_HOST=127.0.0.1 | change fot smtp.gmail 
    MAIL_PORT=587
    MAIL_USERNAME= "your email or email of the sender"
    MAIL_PASSWORD= "password of the two setp verification"
    MAIL_FROM_ADDRESS="your email or email of the sender"
    MAIL_FROM_NAME="${APP_NAME}"
    ```
5. To start the project you will run:
    ```sh
    npm run appUp
    ```
6. To turn off you will run:
    ```sh
    npm run appDown
    ```
