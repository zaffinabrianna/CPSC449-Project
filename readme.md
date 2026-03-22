# Cat Database  
CPSC 449  

---

## Names
Brianna Zaffina  
Rasha Boura  

## Emails
zaffinabrianna@csu.fullerton.edu  
rashaboura@csu.fullerton.edu  

---

## How to Run the Project

1. Clone repository  
git clone <repo-link>  

2. Install dependencies  
npm install  

3. Set up MySQL (NEW)  
Make sure MySQL is installed and running.  

Run the following:  
CREATE DATABASE cats_db;  

USE cats_db;  

CREATE TABLE cats (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(255),  
    age INT,  
    breed VARCHAR(255)  
);  

4. Configure database connection  
Open server.js and update your MySQL credentials if needed:  
const db = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "your_password",  
  database: "cats_db"  
});  

5. Run the server  
node server.js  

6. Open the application  
http://localhost:3000  

---

## Notes

- This project was updated to use MySQL instead of JSON storage  
- Make sure MySQL is running before starting the server  
- node_modules and .DS_Store are ignored  