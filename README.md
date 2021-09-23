# Group 2 

## Introduction to the Project
Dungeons and Dragons (D&D) is a co-operative tabletop fantasy role-playing game. Most players play as adventurers/heroes that explore the world by going on quests, fighting monsters and hunting for rewards. One player is the Dungeon Master (DM) who facilitates the game, controls the non-player characters and monsters, and narrates the story. The players traverse the world as figures moving on top of a set-up map, which contains non-playable characters that the players interact with.

There are enemies that the DM controls (often a type of monster). Each enemy has statistics on its hit points, armour class and speed. This allows the players to interact and do battle with the adversary. The enemies may also contain additional information on their challenge rating, armour type, race, size, alignment and other specific data that could affect the nature of the battle.

D&D includes a specific type of map called dungeons. Which is a dangerous enclosed space (E.g. basement of a haunted mansion, an underground dark elven city, a monster-filled treasure cave) that might contain many dangerous monsters and traps. A dungeon should present a large risk to the players, but they are rewarded heavily if they're triumphant in their dungeon run. A dungeon may contain multiple layers that the players can traverse between. The dungeon should get progressively more dangerous the deeper it is. The players' view is also restricted, meaning they can only see a certain portion of the dungeon and what enemies are within their view at any time (except for the DM, who can see/knows the whole map). This creates uncertainty and allows for interesting decisions/outcomes for the players.

## Project Details
This project is primarly coded in React Native, using typescript and Expo as a CLI for development. Due to the project being coded based on web-based frameworks, the app works with almost every device and system.

This project is a map generation tool for our client at the university. This project allows for multiple devices to connect to a game and concurrent games to take place. One player joins as the "DM", the DM creates the game and controls features displayed to the player. Another player(s) can join as the "Player", The player can simply only view the board with the aim of moving physical pieces and awaiting further changes from the DM.

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
    - By typing "ls" on mac/linux or "dir" on windows you should see a "group-2" folder
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
When creating our project, we tried sticking to correct react native practices. We created self documenting file and folder names. To sum what each folder in our project does:
- **Test folder** - Folder that contains all our utility function and front end component tests, that run with "npx jest"
- **Assets folder** - Contains all the images that are used in the project
- **Interface folder** - Contains files that are relating to object interfaces, defining parameters used by objects
- **Components folder** - Defines front-end components that can be imported into screens (I.e buttons, text inputs...)
- **Coverage folder** - Coverage reports that are generated from running the tests, showing % of code being tested in each file
- **Pages folder** - Defines different pages that the user can navigate to and renders that page's front-end components
- **Styles folder** - Contains files that define styles for front-end rendering pages
- **Utility folder** - Functions that perform various tasks to be re-used and create more readable code
