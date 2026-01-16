# MyApp

## Description

This project is about a second-hand vehicle sales platform. It is divided into two main parts: the backend and the frontend.

- **Backend (Laravel – PHP):**  
  The backend is responsible for communicating with the database through a custom Laravel API. This API allows retrieving, storing, updating, and deleting data (CRUD operations).  
  Additionally, admin users have their own server-rendered pages built with Blade, which allow them to manage posts and users.

- **Frontend (React + Vite):**  
  The frontend represents the user interface and is divided into two views: **Guest View** and **User View**.

  - **Guest View:**  
    The header includes options for **Sign Up**, **Sign In**, language selection, and theme selection.  
    In the main section, guests can view posts, see post details and comments, and filter the posts they want to see.

  - **User View:**  
    The header includes a theme selector, language selector, and a dropdown menu with options to edit the profile and sign out.  
    The main content is similar to the Guest View, but users have additional features such as:
    - Marking posts as favorites
    - Liking posts
    - Adding comments to publications

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
4. In the repository you will modify the file .env.example to .env and change the content of:
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
7. (Optional if Laravel fails) if Laravel fails try to access to doker machine and run:
```bash
  composer run dev
```
8. If the problem still please contact with me "cyprian.bartosik@cirvianum.cat".

## Data Base
My data base schema is like this (only table chat and menssages are not done):
![Image of schema of Database](server/storage/app/public/Cyprian_diagrama_Projecte_final.jpeg)

## Video 
[Link to see the project](https://drive.google.com/drive/folders/1liz3iEzPUEjets-swRE8FS90K6aOViVi?usp=drive_link)


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

- **Headless UI** 
  https://headlessui.com 
  Unstyled, fully accessible UI components.

- **React Slick & Slick Carousel** 
  https://react-slick.neostack.com
  Carousel/slider component for React.

- **Heroicons** 
  https://heroicons.com
      
- **React Icons** 
  https://react-icons.github.io
  Comprehensive icon sets for UI design.

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
- **Laravel Framework** 
  https://laravel.com  
  The PHP Framework for Web Artisans.

- **Laravel Sanctum** 
  https://laravel.com
  Lightweight authentication system for APIs and SPAs.

- **Laravel Socialite** 
  https://laravel.com 
  OAuth authentication with social providers (Google, Facebook, etc.).

- **L5 Swagger**  
  https://://github.com
  OpenApi Swagger documentation generator for Laravel.

- **Laravel Tinker** 
  https://://github.com
  Powerful REPL for the Laravel framework.

#### Testing & Tools
- **PHPUnit** 
  https://phpunit.de
  Programmer-oriented testing framework for PHP.

- **Laravel Pint** 
  https://laravel.com 
  Opinionated PHP code style fixer.

- **Laravel Sail** 
  https://laravel.com 
  Docker-based development environment.

- **Faker** 
  https://fakerphp.org 
  PHP library that generates fake data for seeds and testing.

- **Concurrently** 
  https://www.://npmjs.com
  Run multiple commands (Vite + Artisan) simultaneously.

- **Axios** 
https://axios-http.com
Promise based HTTP client for the browser and node.js.