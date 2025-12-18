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
4. To start the project you will run:
    ```sh
    npm run ubuntuUp
    ```
5. To turn off you will run:
    ```sh
    npm run ubuntuDown
    ```
