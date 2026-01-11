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

## Libraries

### FrontEnd (React)

- **React**  
  https://react.dev  
  JavaScript library for building user interfaces based on components.

- **React DOM**  
  https://react.dev/reference/react-dom  
  Allows React components to be rendered into the browser DOM.

- **React Router DOM**  
  https://reactrouter.com  
  Library for handling routing and navigation in React single-page applications (SPAs).

  - **i18n**
  https://www.i18next.com/
  Library for multilanguage manager.

---

#### Development and build tools

- **Vite**  
  https://vitejs.dev  
  Fast development and build tool for modern web projects.

- **@vitejs/plugin-react**  
  https://vitejs.dev/plugins/#vitejs-plugin-react  
  Official Vite plugin that provides full support for React and JSX.

---

#### Styling

- **Tailwind CSS**  
  https://tailwindcss.com  
  Utility-first CSS framework for building modern and responsive user interfaces.

- **PostCSS**  
  https://postcss.org  
  Tool for transforming CSS using JavaScript-based plugins.

- **Autoprefixer**  
  https://github.com/postcss/autoprefixer  
  PostCSS plugin that automatically adds vendor prefixes for better browser compatibility.

- **React-Tostify**
  https://www.npmjs.com/package/react-toastify
  Better notification messages

- **React-Icons**
  https://www.npmjs.com/package/react-icons
  Icons for react
---

#### Linting and code quality

- **ESLint**  
  https://eslint.org  
  Static code analysis tool for identifying problems and enforcing coding standards.

- **@eslint/js**  
  https://eslint.org/docs/latest/use/configure/language-options  
  Core ESLint rules for modern JavaScript.

- **eslint-plugin-react-hooks**  
  https://www.npmjs.com/package/eslint-plugin-react-hooks  
  Ensures correct usage of React Hooks.

- **eslint-plugin-react-refresh**  
  https://www.npmjs.com/package/eslint-plugin-react-refresh  
  Provides support for React Fast Refresh during development.

- **globals**  
  https://www.npmjs.com/package/globals  
  Defines global variables for different JavaScript environments.

---

#### Typing support

- **@types/react**  
  https://www.npmjs.com/package/@types/react  
  Type definitions for React.

- **@types/react-dom**  
  https://www.npmjs.com/package/@types/react-dom  
  Type definitions for React DOM.

---

### BackEnd (Laravel + PHP)
- sosialite