# Group 2 

## Project Details


## Group Members
 - Adam Sinclair, sinclaadam@myvuw.ac.nz
 - Elijah Guarina, guarinelij@myvuw.ac.nz
 - Connor de Bruyn, debruconn@myvuw.ac.nz
 - Oliver Badrick, badricoliv@myvuw.ac.nz
 - Michael Tang, tangmich@myvuw.ac.nz
 - Jeremiah Choi, choijere@myvuw.ac.nz
 - Patrick Laing, laingpatr@myvuw.ac.nz

## Client
**Craig Watterson** <br>
Victoria University of Wellington, Cotton Building, Room 253 <br>
**Phone:** +64 4 886 5333 <br>
**Email:** craig.watterson@vuw.ac.nz

## Hand Over Document
### How to set up the Project
This section specifies the instructions on how to retrieve the code from this repository, all relevent technologies used that needs installation, and how to use these technologies to start the application.

1. **First thing to do is clone this repository, this can be done by:**
    - Open up a terminal on your device (I.e. cmd, powershell, konsole...)
    - Install git if you havent already at: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
    - Create a new folder for the repository with "mkdir dndProject2"
    - Change into that directory with "cd dndProject2"
    - Clone the repository to this folder with "git clone https://gitlab.ecs.vuw.ac.nz/course-work/engr300/2021/group2/group-2"
2. **Next we need to install the relevant technologies relating to this application:**
    - Install Node.js / npm by visiting: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    - Install Expo CLI by:
        - Pathing to the project folder if you havent already "cd dndProject2"
        - run "npm install --global expo-cli"
3. **Now we need to install the relevant dependencies for libraries used in the project:**
    - As all the dependencies are defined in the package.json file, run "npm i" to install them.
4. **Now you should be good to go to run the project!**

### How to run the Project
This section defines how the user can run the project, If you havent already followed the how to set up project section, please do so before continuing.

1. **If you havent already, path to your cloned repository (up to the folder containing the package.json file)**
    - this can be done with "cd group-2/code/dungeons-and-dragons-app"
2. **Now to run the project:**
    - In the terminal write "npm run web"
    - Alternatively you can write "expo start" and then press the "open in web view" button
3. **You should be greeted with a DnD main menu screen**
    - The app is pretty self explanatory, you can choose to either be a dm and control the map, or a player and only view the map.

### Additional Info
- If these steps didn't help you, please contact any of the students involved in this project (Specified above).
- We also use firebase for our model, so if you need to view info or change permissions in the database, please again contact any of the students involved in this project

### Project Structure
