# OAS
An online auction web application created in Next.js, inspired by eBay and TCGPlayer.    
The Online Auction System (OAS) is an auction system aimed towards trading card collectors. The system is equipped with functions to create and update auction listings, as well as placing bids in real time. The OAS is developed as a basis for a web auction system and ensures ease of deployment locally for testing purposes before being hosted on a server, with a simple database that is imported and managed by the backend RESTful API. 

# A.	System Requirements
**•	Visual Studio Code (for ease of deployment)**

**•	Web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, etc.)**

**•	Python 3.13.0 or above**

**•	Node.js 20.18.0 or above**

**•	Django 4.2.0 or above**

**•	Microsoft SQL Server 2022 Developer (64-bit) or above**

**•	SQL Server Management Studio 20 (64-bit) or above**

**•	npm 10.8.2. or above**

**•	At least 2GB of RAM**

**•	At least 4 cores CPU**

# B.	System Deployment
The Online Auction System can be deployed locally by using a command terminal, in this case, Visual Studio Code’s terminal. 
First, create a database.

**a)	Install SQL Server and SQL Server Management Studio.**

**b)	Open SQL Server Management Studio and connect to a local database server.**

**c)	From the Object Explorer, create a database named OAS_DB.**

After the database is created, head over to Visual Studio Code. Open two instances of Visual Studio Code from the “New Window” option inside Visual Studio Code.
From each window, open folders containing the source code, one for the API and one for the web frontend.

Open the Terminal from the Terminal tab on Visual Studio Code.

Both the API and the web frontend should be set up before deployment. First, the API.
Run the following commands. 

**pipenv shell**

**pipenv install**

**python -m pip install bcrypt**

**python manage.py migrate**

**python manage.py runserver**


Now the API is set up, and tables are migrated and created in the database.
On the web frontend side, run the following commands.

**npm i**

**npm run dev**


From there, you can access the website from these following addresses.

**http://localhost:3000/login**

**http://localhost:3000/admin/login**

