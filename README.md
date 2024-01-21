
### Setup

-   Do the following:
    -   Create a git-untracked `local.py` settings file:
        `cp DjangoReactAuth/DjangoReactAuth/settings/local.py.example backend/{{project_name}}/settings/local.py`
  - See the sample values in sample_local.py 

# HOW TO RUN PROJECT:

Run following command in terminal to start project:

Steps:

1: Create Virtual environment:
* pip install virtualenv # Install 'virtualenv' package to create virtual environments
* virtualenv myenv -p python3 # Create virtual env with python 3
* source bin/activate. # start virtual env

2: Create Database
* Config database in local.py
3: Run Migrations
* python manage.py migrate

4: Install requirements:
* pip install -r requirements.txt


5: Run Django server:
* python manage.py runserver


#### Setup and run the frontend app
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
-   Open a new command line window and go to the frontend directory
-   `npm install`
-   `npm start`



