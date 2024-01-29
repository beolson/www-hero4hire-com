---
title: Python Virtual Environment
tags: [Python, Development]
state: published
---

# Python Virtual Environment

In Python, by default, when you install a package it will be installed in a global scope.  This obviously does not scale accross multiple projects where you might need one version of a package in one project, and another version in another project.  

To deal with this, Python uses Virtual Environments.  Creating and activating a virtual enviornment results in all packages being installed into that virtual environment.  It is recomended each project have their own virtual environment.

In addition, you must remember to deactivate your virtual environemnt when done with it (or close out of the terminal window, thereby resetting your environment), and activating the virtual environment when begining work on that project.  

The [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) for Visual Studio code can automaticaly activate and deactivate the virtual environment for you.

The folder containing the virtual environment should not be checked in with your source code.  Instead, the requirements.txt file will be checked in and should contain every package required to be installed in the virtual environment for the project.  

## Commands

 - `python -m venv .venv` create a virtual environment in the current directory called ".venv"
 - `venv\Scripts\activate` activate the current virtual environment
 - `deactivate` deactivate the current virtual environment
 - `python -m pip install package-name` install a package called "package-name" into the current virtual environment
 -  `python -m pip freeze > requirements.txt` writes out the dependencies of the current virtual environment to a requirements.txt file.  This file will be how you restore the contents of the virtual environment on a new PC.  
 - `python -m pip install -r requirements.txt` install the contents of requirements.txt into the current virtual environment