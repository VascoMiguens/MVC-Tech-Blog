# MVC Tech Blog ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
* [Description](#description)
*[Installation](#installation)
* [Preview](#preview)
* [Link](#link)
* [License](#license)
* [Questions](#questions)
  
## Description
This project is a MVC tech blog where the aim and criteria was:

 * User can publish their blog posts
 * User's can comment on other user's posts as well as their own
 * For a user to be able to publish a post or submit a comment they will have to be logged in or sign up 
 * This blog was built using:
      * Node.js and the Express framework on the backend to handle server-side logic and routing
      * To handle models and database interactions, we are utilizing the Sequelize ORM and a MySQL database.
      * On the frontend, we are using Express Handlebars to render dynamic HTML pages and allowing users to submit and view comments when they are logged in.
      * Express Session as a middleware that allows to store session data in cookies, used to track user sessions and authenticate users
      * bcrypt to encript passwords in the database
      * dotenv  to load environment variables from a .env file, used to protect sensitive information such as database passwords
      * Moment.js to format dates displayed

  * All in all, this tech blog is a full-featured web application that allows users to publish posts, submit comments, and view content in a dynamic and secure manner.

## Installation 
 
* Install all dependencies
   
      npm install
  
* Copy the .env.EXMPLE file and  rename to .env and add your database credentials 

* Initialize the database
   
       mysql -u root -p
       insert your password
       source db/schema.sql
       quit

* Seed the database
   
       npm run seed

* Run the application locally
   
       npm run start

## Preview

 ![Screenshot of website](https://github.com/VascoMiguens/MVC-Tech-Blog/blob/master/public/assets/mvc-tech-blog-main.png?raw=true)

## Link
 * Link to deployed application: 
 
      https://mvc-techie-blog.herokuapp.com/

## License 
        This project is licensed under the MIT License license.
        To know more about this license visit:
            * https://choosealicense.com/licenses/mit/

## Questions
Any questions about this project refer to:
  * [Github](https://github.com/VascoMiguens)
  * Email: v_miguens@hotmail.com
