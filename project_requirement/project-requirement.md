# ENGR 301: Project Requirements Document

The aim of this document is to specify the requirements of the system your group is to build. The focus of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem. This document should communicate clearly to the supervisor, client and course coordinator what the system you build is going to do, and what constraints it must meet while doing so.

The document should also demonstrate your understanding of the main analysis principles and quality guidelines, and applicable standards, using tools and notations as necessary to communicate the requirements precisely, unambiguously and clearly in a written technical document. Page specifications below are *limits not targets* and refer to the pages in the PDF generated from the markdown. Because the size of your document is necessarily limited, you should ensure that you focus your efforts on those requirements that are most important to completing a successful system: if sections are at their page limit, indicate how many items would be expected in a complete specification.

The ENGR 301 project proposal and requirements document should be based on the standard ISO/IEC/IEEE 29148:2011(E), primarily sections 8.4 and 9.5, plus section 9.4 for projects involving hardware and ISO 25010 SQuaRE for systemic requirements. While excerpts from the standard have been quoted within the template, to understand what is required it will be necessary to read earlier sections of the standards themselves. A supplementary treatment of requirements gathering in engineering projects may be found in [Requirements in Engineering Projects](https://victoria.rl.talis.com/items/F166DA94-DAD8-FBDB-0785-7A63C9BA3603.html?referrer=%2Flists%2F5886F297-2506-1F17-45D9-7F04CEE284EE.html%23item-F166DA94-DAD8-FBDB-0785-7A63C9BA3603) (Talis). The requirements document should contain the sections listed below, and conform to the formatting rules listed at the end of this brief.

All team members are expected to contribute equally to the document and list their contributions in section 6 of the document. You should work on your document in your team's GitLab repository. While collective contributions are expected to be the exception rather than the rule, if more than one team member has contributed to a particular commit then all those team member IDs should be included in the first line of the git commit message. `git blame`, `git diff`, file histories, etc. will be tools used to assess individual contributions, so everyone is encouraged to contribute individually, commit early and commit often. Any team wishing to separate individually contributed sections into a single file before collation into the single proposal document for submission is welcome to do so.

---

<div style="page-break-after: always;"></div>

# ENGR 301 Project *NN* Project Proposal and Requirements Document
#### Author list, a comma-separated list of the names of each member of the team.

## 1. Introduction

Dungeons and Dragons (D&D) is a co-operative tabletop fantasy role-playing game. Most players play as adventurers/heroes that explore the world by going on quests, fighting monsters and hunting for rewards. One player is the Dungeon Master (DM) who facilitates the game, controls the non-player characters and monsters, and narrates the story. The players traverse the world as figures moving on top of a set-up map, which contains non-playable characters that the players interact with.

There are enemies that the DM controls (often a type of monster). Each enemy has statistics on its hit points, armour class and speed. This allows the players to interact and do battle with the adversary. The enemies may also contain additional information on their challenge rating, armour type, race, size, alignment and other specific data that could affect the nature of the battle.

D&D includes a specific type of map called dungeons. Which is a dangerous enclosed space (E.g. basement of a haunted mansion, an underground dark elven city, a monster-filled treasure cave) that might contain many dangerous monsters and traps. A dungeon should present a large risk to the players, but they are rewarded heavily if they're triumphant in their dungeon run. A dungeon may contain multiple layers that the players can traverse between. The dungeon should get progressively more dangerous the deeper it is. The players' view is also restricted, meaning they can only see a certain portion of the dungeon and what enemies are within their view at any time (except for the DM, who can see/knows the whole map). This creates uncertainty and allows for interesting decisions/outcomes for the players.

### Client

**Craig Watterson**  
Victoria University of Wellington, Cotton Building, Room 253  
**Phone:** +64 4 886 5333  
**Email:** craig.watterson@vuw.ac.nz  

### 1.1 Purpose

To create a D&D map generator that also generates a well-weighted list of monsters within the map. The generated map can be displayed on a large table screen, and be able be controlled via a secondary screen.

### 1.2 Scope

#### The Map Generation of the Program should meet the Following Goals
 - Maps generated should be different each time
 - Maps should adhere to at least 1 theme
 - The location that enemies are placed should make sense in relation to the place/theme on the map
 - The enemies should be weighted so that the amount of enemies at any given location is well balanced

#### The Primary Map Displaying Screen of the Program should meet the Following Goals
 - The map should be scalable and resizable to the screen that its displayed on
 - Locations on the map should be covered in fog of war unless specified by the dungeon master
 - The map should have some form of scale, allowing players to gauge distance

#### The Secondary Screen Map Controller of the Program should meet the Following Goals
 - The screen should be able to display any/all enemies' stats
 - The dungeon master should be able to see the full map
 - The dungeon master should be able to control where to uncover the fog of war on using the screen
 - The dungeon master should be able to generate a new map with the selected theme
 - The dungeon master should be able to change any monster's stats


### 1.3 Product overview
#### 1.3.1 Product perspective

This system generates maps to be used for a Dungeons and Dragons game, while also allowing the Dungeon Master to manage the game and choose what the players see. This system is similar to other systems such as ProDnD[1], an app available on the app store that allows users to input map sizes, complexity, and other information to generate a dungeon. Our system would not be as complex but will still be inspired in part by the ProDnD system and other systems similar to it.
 
The system will generate a map as well as populate the map with enemies of varying levels and types. The Dungeon Master would then calculate any damage to the enemies and players and manage the player’s information off-screen and input the hit points lost to the enemies on their device. The system would also generate information about the enemy such as the armour level. The levels of the generated enemies would depend on the level of the Dungeon.
 
The system would display information to the players using a similar system to Kahoot[2], a system that allows the host (the Dungeon Master in our system) to host a game that the players can connect to on their devices. Our system would be different from Kahoot's system as the Dungeon Master would need to be able to choose what image the players see on their device. This system would have no direct relationship with any other products or systems similar to Kahoot, but will instead be inspired by the design and functions of other products such as Kahoot. Whereas Kahoot is hosted via the internet, therefore anyone can connect to a given game, our system will use a local area network to connect between devices.
 
For our system to appear as a Dungeons and Dragons system, we will need to either create or use the artwork. The artwork we use will either be created by ourselves or will be free to use images.

> **9.5.3 Product perspective** <br>
> Define the system's relationship to other related products.
>
> If the product is an element of a larger system, then relate the requirements of that larger system to the functionality of the product covered by the software requirements specification.
>
> If the product is an element of a larger system, then identify the interfaces between the product covered by the software requirements specification and the larger system of which the product is an element.
>
> A block diagram showing the major elements of the larger system, interconnections, and external interfaces can be helpful.
>
> Describe how the software operates within the following constraints:  
a) System interfaces;  
b) User interfaces;  
c) Hardware interfaces;  
d) Software interfaces;  
e) Communications interfaces;  
f) Memory;  
g) Operations;  
h) Site adaptation requirements.

#### 1.3.2 Product functions

##### 1.3.2.1 Minimum Viable Product

The minimum viable product is a software solution that allows a dungeon master to automatically generate a random playable underground level for a game of dungeons and dragons. The generated dungeon will populate the level with monsters that are appropriate for the level and context of the generated level. The level will have both an entrance and exit with the exit leading to further harder generated levels. The level must have a measure or scale of distance for movement. We are not expected to make assets, we are expected to find assets online that we are able to use legally.

The dungeon master will have a separate display to the players that will allow them to see additional information and control map visability. The additional information in the minimum viable product is monster stats for the generated monsters (hp,armor,etc). The players will be playing on a large display (projector or large TV) that allows them to move figurines around the dungeon. The level has optional line of sight and map hiding functions. Room sizes will be appropriate for the monsters in the rooms.

The software solution will run locally and is not expected to run over the internet.

##### 1.3.2.2 Dungeon Generation Package

- **Entry and Exit** The generated level must have a clear entry and exit point. These must be clearly connected and the exit point will lead to the next generated level.

- **Monster Population** The generated level must be auto populated with monsters that are level appropriate. This means in levels 1-3 you would expect to find monsters that are very close to level 1-3. The monsters are expected to be context appropriate (In an underground level you would not expect to find horse riding knights)

- **Room sizing** Rooms are expected to be appropriately sized for the monsters that populate them. A room with an ogre should have entrances that allow the movement of that orge based on size.

- **Level Scale** Levels have a scale that ties them to distance. This is done using tile sizes.

##### 1.3.2.3 Dungeon Master View

- **Level overview** The dungeon master can see the entire map and the monsters on it.

- **Line of sight** The dungeon master can change the line of sight of the players using the dungeon master view. Changes are reflected immediately inside the player view.

- **Monster Stats** The dungeon master is able to see the monster stats of monsters inside the level. This includes stats such as health points, armour, size, speed etc.

#### 1.3.2.4 Player View

- **Display** The players are able to see the sections of the map that have line of sight (as controlled by the dungeon master)

- **Tile Size** The display has the tiles large enough that the players are able to move physical figurines around on the map. This will require a minimum projector/TV size for the players to use.

#### 1.3.3 User characteristics   

One page identifying the main classes of users and their characteristics (9.5.5)

The client (Craig Watterson) has outlined that the system will initially be for his personal use, and releasing the system commercially is a potential goal after the completion of the minimum viable product. Therefore, there is a priority on designing the system around the client's characteristics and attributes. These characteristics and attributes are thus assumed to be that of a typical user of the system.

One characteristic the client has is that they are experienced with the premise of a Dungeons and Dragons game, as well as the process of how a game plays out. Therefore, the system will be designed with an assumption that users already have knowledge of how a game of Dungeons and Dragons works. Thus, the system will not prioritise teaching newer Dungeons and Dragons players how to play, but rather facilitate, digitise, and streamline the mechanics, information retrieval, and actions of a Dungeons and Dragons game that experienced players are familiar with.

While the system is aimed more towards experienced Dungeons and Dragons players, the system is still aimed to be intuitive to use. This is because the client's main goal with the system is to create a map for a Dungeons and Dragons game in a short time and with little effort from the user. This is also supported by the fact that Dungeons and Dragons map-generator systems/applications are not widely used. Therefore, processes, functions, and actions the system supports should employ conventions and designs most people are familiar with.

According to the client, the system is to be faciliated in a digital manner, using web browser(s) to host the system on multiple devices simultaneously for a single Dungeons and Dragons game. Therefore, the users are expected to:
- Have basic experience with using technologies such as computers and/or mobile devices
- Have basic experience with using a web browser

The client has also outlined that the system is to be used in conjuction with real-life figures that are completely separate from the system. Therefore, users are expected to have such figures for use with the system. Thus, the system will not be designed with the need to track players. Rather, the Dungeon Master will manually track each Players' positions, and use the system to adjust the appearance of the map accordingly.

#### 1.3.4 Limitations

##### 1.3.4.1 Software Limitations
* The software will be written using the React framework. The system will be running on a web application such as "chrome", or something similar like "Node.js".  A standalone executable application will not be released.

* No server hosting. Without server hosting available to us as a resource, the system won't be designed to run on a server. Devices will have to communicate with each other via peer-to-peer connection. The software will utilize Local Area Networking (assuming it is available, see next subsection).

* Persistence of any kind is not supported. The DM will not be able to save and reload dungeons.

* Use of copyright material is (under any circumstances) not permitted.

##### 1.3.4.2 Hardware Limitations
* No 24 hour remote connections. An extension to software limitations, the lack of server hosting also means any sort of remote connection is impossible without a host computer portforwarding the program through their modem. Any remote connection features will not be supported.

* Connectivity between devices will not work without a Local Area Network. The system does not require connection to the internet, but all devices must be connected to the same network.

##### 1.3.4.3 Usage Assumptions
* It is assumed that there'll only be two devices involved. A network of more than 2 devices will be not be supported.

* It will be assumed that the devices will be used in the same room. Any UX features involving the display of information, curcial for online play, will not be implemented. The user of the software will be able to see both devices and their separate displays.

* Assuming the DM will only rely on this for dungeon generation and nothing more. any more dm support (such as calculating player stats, health modificers, speed modifiers inventory space, etc) will not be included. Custom Dungeon creation of any sort will not be included.

## 2. References

[1] Name of Software: ProDnD Publisher: Gray Lake Studios Date Accessed: 23/3/2021 Type of Medium: Mobile App Avaiable: http://prodnd.blogspot.com/

[2] Name of Software: Kahoot! Publisher: Morten Versvik, Johan Brand, and Jamie Brooker Date Accessed: 25/3/2021 Type of Medium Website. Available: https://kahoot.com/

References to other documents or standards. Follow the IEEE Citation  Reference scheme, available from the [IEEE website](https://www.ieee.org/) (please use the search box). (1 page, longer if required)

## 3. Specific requirements  

20 pages outlining the requirements of the system. You should apportion these pages across the following subsections to focus on the most important parts of your product.

### 3.1 External interfaces

See 9.5.10. for most systems this will be around one page.

#### 3.1.1 Dungeon Master's View

The dungeon master must be able to see a different view from the players. The dungeon master's view must be controllable by the dungeon master and must include features such as changing the player's view and viewing enemy statistics. This view includes displaying individual rooms as well as the dungeon as a whole.

#### 3.1.2 Player's View

The player's view must display what the dungeon master chooses to display. This means that the player's view interface and the dungeon master interface must be connected so that the dungeon master can change the display for the players, but not the other way around.

### 3.2 Functions

#### 3.2.1 Template Use case
**What is the Goal of the use case?**  

**Who benefits from the result of this use case?**  

**How will this use case be achieved?**  

**How will we judge/measure that this use case has been taken into account?**  

**What limitations are there to achieving the use case?**  

**Use Case Flow**
-User Intention:
-System Responsibilities:
-User Interface:

#### 3.2.1 Generate Maps

**What is the Goal of the use case?**  
To create a map of tiles to act as the board for the Dungeons and Dragons tabletop game.

**Who benefits from the result of this use case?**  
The dungeon master will benefit from this use case by reducing the time taken to create a playable board and have an automatic tool to create dungeons for them. 

**How will this use case be achieved?**  
This can be achieved by generating a map in two stages after the user presses a generate map button:
* The function will randomly assign a random amount prefab "features" to an empty space. These prefab features will be a predetermined set of tiles which emulate more realistic map characteristics that random tilesets cannot replicate (I.e. creating caves with rounded edges or underground rooms). 
* The function will then conduct a path finding algorithm to join these prefab features generated in the first stage. Creating random paths between the map features, allowing overlaps to keep everything more random.

**How will we judge/measure that this use case has been taken into account?**  
Once a map has been generated with a new set of tiles we can ensure that this use case has functioned as intended.

**What limitations are there to achieving the use case?**  
* The dungeon master will no longer be allowed to select a desired map, but will only be able to generate random maps for usage.
* If there arent enough prefab rooms, or if the user is really unlucky, they may experience very similar maps being generated if duplicate prefabs are being used.

**Use Case Flow**
* Pressing the Generate maps button [User Intention]
* Construct a map of prefabs [System Responsibilities]
* Joins prefabs in map [System Responsibilities]
* Displays the generated Board [User Interface]

#### 3.2.2 View Player Maps

**What is the Goal of the use case?** <br>

For the player to be able to view their view of the map and for the Dungeon Master to be able to work with 3.2.3 Change Visability in order to do so.

**Who benefits from the result of this use case?** <br>

The players benefit directly as the players will be able to see what is going on directly on their screen. The Dungeon Master benefits indirectly as the players are able to play, therefore the Dungeon Master is able to play. 

**How will this use case be achieved?** <br>

This use case will be acheived by the system taking the display chosen by the Dungeon Master and displaying it on the players screen. 

**How will we judge/measure that this use case has been taken into account?** <br> 

We will measure that this has been taken into account if the players are able to see a view of the board.

**What limitations are there to achieving the use case?** <br>

The limitations of this use case are the implementations of 3.2.3 change visibility as the player view relies on the Dungeon Master's choice of the view.

**Use Case Flow** <br>

View the map from player's perspective [User Intention] <br>
Get the player view [System Responsibilities] <br>
Display the view [User Interface] <br>

#### 3.2.3 Change Visability

**What is the Goal of the use case?**  
The goal of "Change visability" is to allow the dm to manually select tiles that are visible on the "player's display" screen. This keeps unexplored parts of the dungeon hidden from the player, allowing the dungeon master to show the player's what they'll see directly.

**Who benefits from the result of this use case?**  
This use case benefits Dungeon Master. He will gain the ability to control the narrative by controlling what the player's know. This maintains the experience for the players.

**How will this use case be achieved?**  
This use case will be consistently available to the dm once the dungeon map has generated. When first generated, the entire dungeon is not visible to the players. The dm will be free to reveal which parts of the map are visible to the player there onwards; at his own discretion.

**How will we judge/measure that this use case has been taken into account?**  
This use case is essential to gameplay. We can judge it's success via playtesting. A successful implementation will make the tiles selected by the dm visible on the player's screen should update once selection is completed.

**What limitations are there to achieving the use case?**  
- Connection to the server must be stable for the dm to update the player's vision. 
- The map must be generated before in order for this use case to function.

**Use Case Flow**
- User Intention: Player characters move to different room. 
- User Intention: Add fog of war. 
- System Responsibilities: Allow/Register controls on DM device.
- System Responsibilities: Flag tiles invisible.
- System Responsibilities: Update player's vision screen.
- User Intention: Make new room visible. 
- System Responsibilities: Allow/Register controls on DM device.
- System Responsibilities: Flag tiles visible.
- System Responsibilities: Update player's vision screen.
- User Interface: Player's and DM able to see new screen.
- User Intention: Game continues.

#### 3.2.4 Change Maps

**What is the goal of this use case** <br>

The goal of the use case "Change Maps" is for the Dungeon Master to be able to change maps between levels.

**Who benefits from the result of this use case?** <br>

The beneficiaries of this use case are the players, who will be able to play another level on a new map at higher levels, and the Dungeon Master, whos campaign continues on. 

**How will this use case be achieved?** <br>

This use case will be acheived through the system generating a map and populating the map with higher leveled monsters than the previous map.

**How will we judge/measure that this use case has been taken into account?** <br>

We will be able to measure this use case being taken into account by seeing if the system is able to generate and move onto another map after the current map the players are on has been completed.

**What are the limitations of acheiving this use case?** <br>

The limitations of acheiving this use case are generating maps. This is because the map must be generated before displaying anything to the users.

**Use Case Flow** <br>

Change maps between levels [User Intention] <br>
Generate a new level [System Responsibilities] <br>
Generate monsters [System Responsibilities] <br>
Display to Dungeon Master Map information [System Responsibilities] <br>
Dungeon Master sees map information [User Interface] <br>
Continue the game [User Intention] <br>

#### 3.2.5 View Monster data
MT

**What is the Goal of the use case?**<br>
The goal of this use case is to display the monster data of any specific monster on the map.

**Who benefits from the result of this use case?**<br>
The DM and players benefits from this use case, seeing the monster data allows the DM to know its stats. This means when the players are battling a monster the DM knows how much health, damage, etc. the monster deals and takes.

**How will this use case be achieved?**<br>
The system will store the monsters' data. The generated map will have generated monsters that are on certain locations on the map. The DM should be able to at minimum select a specific monster from a list of monsters through a button that displays the monsters data. 

**How will we judge/measure that this use case has been taken into account?**<br>
We can see that the use case has been taken into the account when the system generates a map, the user chooses the map and is able to select a specific monster from a list of monster names that displays its stats. This use case is successful if the DM selects the monster to see its stats to calculate how much damage it takes and deals when facing the players.  

**What limitations are there to achieving the use case?**<br>
 - The system must have a predefined set of monsters stored inside
 - There must be a screen to display the monsters' stats


**Use Case Flow**<br>
 - The user can see any selected monster's stats [user intention]
 - The system must have a stored set of monsters and their stats [system responsibilities]
 - The system must display any specific monster's stats on a screen [system responsibilites]
 - The user should be able to pick a monster's name from a list of monsters and see its stats [user interface]

#### 3.2.6 See Full Maps

**What is the Goal of the use case?**<br>
The goal of this use case is to display the full generated map on to a screen.

**Who benefits from the result of this use case?**<br>
The dungeon master benefits from this use case by being to see the full map and plan for the game/players or choose another map. This means it also indirectly helps the players by allowing them to have a better experience playing because of the DM's benefits. Displaying the full map also allows the user to decide whether they like the map, or want to generate a different one for their needs.

**How will this use case be achieved?**<br>
The DM should be able to hit the generate map button, and the system will generate the map, and display the full map that is generated. 

**How will we judge/measure that this use case has been taken into account?** <br>
We will be able to see that this use case has been taken in to account when the system generate the map, and the user can see it. It is essential to the program, so we can judge its success when we can see the full map once the program has been implemented.

**What limitations are there to achieving the use case?**  <br>
 - The system must generate the map before it can be displayed
 - There must be a screen to display the full map on

**Use Case Flow**<br>
 - The user can see the full generated map [user intention]
 - The system must generate the map [system responsibility]
 - The system myst display the generated map on to a screen [system responsibility]
 - The user should be able to press the generate map button and see the full map [user interface]
 - The user should be able to press the see map button and see the full map [user interface]

#### 3.2.7 Pick Map theme
**What is the Goal of the use case?**  
Map themes are the type of dungeon the game takes place in. They determine monster population. The Dungeon Master shall be able to pick what themed dungeon they would like to play in before map generation.

**Who benefits from the result of this use case?**  
This use case benefits the DM in the sense that they'll be able to choose what sort of experience they want the game session to have.

**How will this use case be achieved?**  
The Dungeon master shall choose the theme of the dungeon before map generation.

**How will we judge/measure that this use case has been taken into account?**  
Map themes are a pre-requisite for monster population. If successfully implemented, the types of monsters within the dungeon should be consistent to the theme (for instance, undead shouldn't be spawning in an bandit hideout).

**What limitations are there to achieving the use case?**
- This use case is used after the Dungeon Master role is assigned. 
- When implementing, this feature must be implemented after "populate monsters".

**Use Case Flow**
- User Intention: Select map theme.
- System Responsibilities: Display options, 
- User Intention: Dungeon Master makes selection.
- System Responsibilities: Store selection in public variable.
- System Responsibilities: Populate dungeon with monsters according to the theme.

#### 3.2.8 Remove monsters

**What is the Goal of the use case?**  
The goal of the "Remove Monsters" use case is to ensure the monsters can be removed by the DM in the DM view to ensure that what is displayed on the DM view is still relevent.

**Who benefits from the result of this use case?**  
The DM benefits from the use case. By removing monsters that are no longer relevent to the dungeon map (they have been defeated for instance, or the DM removed them for other reasons) it ensures that the DM view displays the current state of the board. This reduces noise to the DM and the need to remember which monsters have been defeated or removed.

**How will this use case be achieved?**  
The DM has a view that shows monsters on the map. When the DM clicks on monsters there will be an option to delete that monster from the board and remove them from the map.

**How will we judge/measure that this use case has been taken into account?**  
We can ensure that this use case has been taken into account if the monster is no longer displayed on the map when the DM clicks the delete button for that monster.

**What limitations are there to achieving the use case?**

- This requires input from the DM, and so a button will need to be implemented that the DM can click that will remove the monster from the map.
- The dungeon must be populated with monsters for this to work. Hence if the monster population function does not work this will not be able to work.

**Use Case Flow**
- DM clicks monster delete button [user intention]
- Button sends request to delete monster [system responsibility]
- Monster is removed from monster list [system responsibility]
- View updates with monster removed [user interface]


#### 3.2.9 Populate monsters

**What is the Goal of the use case?**  
The goal of the use case is to allow the DM to automatically populate monsters in the dungeon.

**Who benefits from the result of this use case?**  
Both the players and the DM benefit from this use case. This is because there is less time in setup of the game given the monsters have been already populated. It allows the game to get up and running quicker than if it had not been implemented.

**How will this use case be achieved?**  
This will be achieved by implementing an algorithm that takes in a dungeon map and a list of monsters to pick from. It will then automatically populate the map with appropriately leveled and themed monsters.  

**How will we judge/measure that this use case has been taken into account?**  
We can ensure that this use case has been taken into account if when the DM presses the generate monsters button the dungeon is automatically populated with appropriately leveled and themed monsters.

**What limitations are there to achieving the use case?**  

- This requires some list or store of monsters to use. It requires the list to contain monsters of the appropriate level and style that the map is generated in.
- Requires the dungeon map to generate so that monsters can be placed inside it.

**Use Case Flow**
- DM pushes button to generate monsters [user intention]
- Button sends request to server [system responsibility]
- server runs monster generation algorithm [system responsibility]
- server returns generated monster list [system responsibility]
- view updates display to show monsters [user interface]

#### 3.2.10 Exit Game/server

**What is the Goal of the use case?**  
Close the dungeons and dragons application and server.

**Who benefits from the result of this use case?** 
The dungeon master will benefit from this function as they are able to close the application after usage of the game, instead of using system resources to keep the application up when they are no longer using it.

**How will this use case be achieved?**  
By pressing an exit application button, the system will close all processes that are being used. This should close the server that displays the board for the players device as well as the GUI for the dungeon master.

**How will we judge/measure that this use case has been taken into account?**  
If we are unable to see the application or server running, as well as no longer being able to see system resources being used from the device's manager then we know the function is working as intended.

**What limitations are there to achieving the use case?**  
* This use-case requires the board and server to be implemented and operational.

**Use Case Flow**
* Close the application [User Intention]
* Stop all running processes [System Responsibilities]
* Dungeon masters view is no longer being displayed [User Interface]
* Players view is no longer being displayed [User Interface]

#### 3.2.11 Choose View (DM Or Player)

**What is the Goal of the use case?** <br>
The goal is to categorise users into the Dungeon Master and the Player(s) by allowing users to choose to view either the DM's view and the players' view.

**Who benefits from the result of this use case?** <br>
Choosing which view allows users to clearly choose what responsibilities they have during a DnD game.

**How will this use case be achieved?** <br>
This function will be achieved by prompting a user that visits the DnD Map Generation website with buttons to choose whether they wish to view the map from the Dungeon Master's (DM) perspective, or though the Player's perspective.

**How will we judge/measure that this use case has been taken into account?** <br>
This is judged by whether choosing the view actually shows the correct view to the user.

**What limitations are there to achieving the use case?** <br>
A limitation of achieving this function include:
 - An inability to access the website/launch the application (no internet access, application does not launch properly)
 - Being able to provide two different views to the user requires there to be two different views of the application in the first place

**Use Case Flow** <br>
Open/Go to the DnD Map Generator website [User intention] <br>
Launch application [System responsibility] <br>
Ask User to choose between viewing the Dm's view or the Player's view [System responsibility] <br>
Choose a view [User intention] <br>
Display the view that the player selected, including all functionalities associated with that view [System responsibility] <br>

#### 3.2.12 Save Game (DM)

**What is the Goal of the use case?**<br>
The goal is to allow the DM to save the generated map, so that they are able to load the map for another game.

**Who benefits from the result of this use case?**<br>
The dungeon master and the players will benefit from this use case. If they don't finish the game in one session, it is useful to all the users that they can save their progress.

**How will this use case be achieved?**<br>
It could store the saved game in a JSON file, which is then stored on an online database

**How will we judge/measure that this use case has been taken into account?**<br>
This will be judged by checking that when the save game is loaded, it is the same as it was when it was saved.

**What limitation are there to achieving the use case?**<br>
If the JSON file is stored on an online databse, it is very difficult to retrieve the information from the file.


| User Intention | System Responsibility | User Interface |
| -------------- | --------------------- | -------------- |
| User clicks the save button | The JSON file is saved to an online database | Display a 'Saved Game' message |

#### 3.2.13 Load Game (DM)

**What is the goal of the use case?**<br>
The goal is to allow the DM to load a previously saved game, so that the players can continue where they left off.

**Who benefits from the result of this use case?**<br>
The dungeon master and the players will benefit from this use case. It is important for the players to be able to continue a game from where they
had left off in a previous session, since DnD games can sometimes take a long time to complete.

**How will this use case be achieved?**<br>
It can be acieved by accessing an online database where the saved JSON file is stored, then load the JSON file in the game.

**How will we judge/measure that this use case has been taken into account?**<br>
This will be judged by checking that all information about the game when loaded is identical to what it was when saved. 

**What limitations are there to achieving the use case?**<br>
It is very difficult to store JSON files in a relational database.

| User Intention | System Responsibility | User Interface |
| -------------- | --------------------- | -------------- |
| User clicks the load game button | The JSON file is retrieved from the online database | Displays the map in the same way as it was when saved|


This is typically the longest subsection in the document. List up to fifty use cases (in order of priority for development), and for at least top ten focal use cases, write a short goal statement and use case body (up to seven pages).  Identify the use cases that comprise a minimum viable product.

### 3.3 Usability Requirements

In order to create a fully functional Dungeons and Dragons tabletop, the following usability requirements needs to be met:
* Measurable **effectiveness** of the application: The application needs to operate at a desired level of functionality without failure.
* **Efficiency** of the application: The application has to manage functions inputted by the user without inefficiencies.
* Client specified **criteria for satisfaction**: The application needs to portray desired functions specified by the client.

**Effectiveness:**
* The touch table must take in touch functionality from the user to perform various defined tasks.
* The touch table needs to communicate to another device and take in inputs from that device.
* The application must generate a dungeons and dragons map for player usage and be displayed on the touch table.
* The application should switch between multiple states (maps).

**Efficiency:**
* There should be no latency issues between the two devices.
* The application should be booted up from devices and run from the get-go.
* Map generation should be efficient and not take too long to be created.

**Satisfaction Criteria:**
* A web-based application must be used so that the application can be run from any operating system.
* The application must be able to be run from the two different sized devices specified by the client (An IPad and the touch table).
* The application contains a "fog of war", only displaying sections of the map that the user can currently see.
* The seperate device from the touch table should contain functionality only the dungeon-master can use.
* The application should contain a scale or grid to determine size of characters and scenery.
* Size of tiles should be large enough to fit physical pieces ontop.

The application as the result of this project should contain no obscurities that could offend any of the users whilst using the application. The application must avoid any risks of usage that could arise from specific context of use.


### 3.4 Performance requirements

See 9.5.13. for most systems this will be around one page. Hardware projects also see section 9.4.6.

> **9.5.13 Performance requirements** <br>
> Specify both the static and the dynamic numerical requirements placed on the software or on human interaction with the software as a whole.
>
> Static numerical requirements may include the following:
>
> a) The number of terminals to be supported;  
> b) The number of simultaneous users to be supported;  
> c) Amount and type of information to be handled.
>
> Static numerical requirements are sometimes identified under a separate section entitled Capacity.
>
> Dynamic numerical requirements may include, for example, the numbers of transactions and tasks and the amount of data to be processed within certain time periods for both normal and peak workload conditions. The performance requirements should be stated in measurable terms.
>
>  For example, "_95 % of the transactions shall be processed in less than 1 second._" rather than, "An operator shall not have to wait for the transaction to complete."
>
> NOTE Numerical limits applied to one specific function are normally specified as part of the processing subparagraph description of that function.


The program will need to support two terminals. One terminal will be used to display the randomly generated map, which will be used by the players to
view the game map. The second terminal will be used to display the information about each room in the map, this will be used by the dungeon master. The first terminal will need to be large enough to display a map that will display the player character's positions (using physical figures supplied by the players). The physical objects will not interact with the board. The second terminal will need to be compatible with a smart device, or a laptop.

There will need to be at least two simultaneous users being supported. One user will be using the second terminal (they are the dungeon master) and the other users will be using the first terminal.

There will need to be information about each room that will be displayed to the dungeon master. The information that is given to the dungeon master will be room name, monster details and the treasure for each room. The monster details are the type of monster, their hit-points, their armour and what weapon they are using. This information will not need to be transferred between the two terminals, it will just be seen by the dungeon master. The information given to the players terminal will be the layout of the dungeon itself, displaying each room and how they connect.

The information that will be sent to the terminals will be persistent. It will need to be stored somewhere that the two devices can access.

On startup, the maps should not take a long time to generate. The maps will only be generated when the players are entering them. For example, when the game starts it will only randomly generate the first level. The map generation should take less than 10-20 seconds to generate a map and display it on the screen. It should then take less time to display the information for the dungeon master.

Since the game will be played in real time, the game will need to react to changes made quickly. Each time the players progress to the next level of the dungeon a new map will be generated. If the players want to go back to a previous level, it should take less than 1 second to load, since the map had already been generated previously. The only other aspect that will need to be changed dynamically is the Fog of War system. When the players go to each room the dungeon master should be able to make the room visible on the map display. This will need to take less than a second to change, since waiting for a while for the rooms visibility to load may ruin the immersion of the players.

### 3.5 Logical database requirements

See 9.5.14. for most systems, a focus on d) and e) is appropriate, such as an object-oriented domain analysis. You should provide an overview domain model (e.g.  a UML class diagram of approximately ten classes) and write a brief description of the responsibilities of each class in the model (3 pages).

You should use right tools, preferabley PlantUML, to draw your URL diagrams which can be easily embedded into a Mardown file (PlantUML is also supported by GitLab and Foswiki).

### 3.6 Design constraints

#### Copyright And Legal Constraints:
> Dungeons and dragons is owned by Wizards Of The Coast and they have a copyright and/or licence agreement on all their assets relating to the game. We need to ensure we do not violate any of their terms and conditions associated with their assets. This includes monster information/names, dungeons and dragons images, game assets, and any other assets implemented into the game.

> Any other assets we use for this project that are free or paid will have terms of use associated with the assets. We must ensure we adhere to these requirements to avoid legal issues.

#### Data and Privacy
> The program will not collect or store any personal data to avoid privacy laws.

#### Time limitation
> Time is limited to about 7 hours a week working on this project. There is a hard deadline of October to finish the project. Because of this time constraint there are no guarantees that any work outside the scope of this requirements document can be completed before the deadline. Any stretch targets could be left unfinished, however these will be in a feature branch and will not affect the functionality of the main program.

### 3.7 Nonfunctional system attributes

Present the systemic (aka nonfunctional) requirements of the product (see ISO/IEC 25010).
List up to twenty systemic requirements / attributes.
Write a short natural language description of the top nonfunctional requirements (approx. five pages).

- Performance
- Usability
- Scalability
- Testing
- Extensibility

Operability

It is expected that the application is able to successfully generate a random map without any errors. It is also expected to display the map correctly using the assets provided, and correctly update the map whenever the Dungeon Master makes an update on his device.

Performance

It is expected that the system is able to perform the inputs in an efficient amount of time. It shouldn't take
longer than 2-3 seconds to generate a new random dungeon level. It should take less time than that to display a previously generated level.

Scalability

It is expected that the display is able to be scaled to the different devices it is used on. A table with a screen displaying the map may not be the same size as the image shown with a projector, so the display should be able to scale. This is the same with the Dungeon Masters application, since this should be able to be used on multiple different devices.

Usability

It is expected that the application is intuitive to use for the user. The map should be displayed in a clear way, the information that is displayed on the map should be clear to the users. The Dungeon Masters application should also be easy to use

Testing

All aspects of the application are expected to be extensively tested, so that it can randomly generate a map, establish a connection between the map display device and Dungeon Master device, and update the map when the Dungeon Master performs an input.

Extensibility

Since the client has ideas for stretch goals that could be achieved once the minimum requirements have been reached, it is important that adding new features is possible to achieve without majorly overhauling the program.

Compliance

It is expected that the application conforms to the values of the client. It is also important that if the decision is made to release the application to the public, that any names/terms that are copyrighted by Wizards of the Coast are not used.

### 3.8 Physical and Environmental Requirements

For systems with hardware components, identify the physical characteristics of that hardware (9.4.10) and environment conditions in which it must operate (9.4.11).  Depending on the project, this section may be from one page up to 5 pages.

Requirements for the map display:
- It must either
    - Be a screen facing upwards or
    - Be a projector projecting the image onto a table
    - This is necessary because the players will need to be able to place their figures on the map
- It must be big enough so that the figures all fit on the map, and are to the correct scale (an ogre taking up more tiles than a human, for example)
- It must be able to at least connect to the local network

Requirements for the dungeon master device:
- It must be able to at least connect to the local network
- It must be able to get input from the dungeon master (e.g when they want to change levels)

Requirements for room:
- Must be big enough for the players to comfortably play the game

### 3.9 Supporting information

see 9.5.19.

## 4. Verification

3 pages outlining how you will verify that the product meets the most important specific requirements. The format of this section should parallel section 3 of your document (see 9.5.18). Wherever possible (especially systemic requirements) you should indicate testable acceptance criteria.

## 5. Development schedule.

### 5.1 Schedule

Identify dates for key project deliverables:

1. architectural prototype
1. minimum viable product
1. further releases

(1 page).

### 5.2 Budget

No paid items to be purchased have been outlined to be required for the purpose of constructing the system. Because no purchases have been outlined, and therefore no expenses have been outlined, no budget has been explicitly allocated for this project.

However, a potential expense is the use of paid/non-free assets (e.g. map textures, monster item icons/textures, or any other assets to be outlined in the future). There is no plan to purchase such assets, as instead there is a bias towards the use of free assets. However, if paid assets are decided to be used in the project, then a budget for purchasing paid assets will be set.

### 5.3 Risks
Identify the ten most important project risks to achieving project goals: their type, likelihood, impact, and mitigation strategies (3 pages).

If the project will involve any work outside the ECS laboratories, i.e. off-campus activities, these should be included in the following section.

| # | Risk | Risk Type | Likelihood | Severity |
| --- | :--------------------------------------------------------------------------------: |  --------------- | ------------ | ---------------- |
| 1 | COVID-19 levels increase, restricting access to laboratories and equipment | Performance | High | Tolerable |
| 2 | Client removes budget or online resources become unavailable | Financial / Availability | Low | Tolerable |
| 3 | Incompabitibility of services or equipment | Availability / Performance | Medium | Severe |
| 4 | Minimal requirements will not be met by the end of the project (Scope creep) | Operational | Medium | Extreme |
| 5 | Team members are unable to work on the project (Illness, lack of internet, etc) | Health and Saftey / Performance | Medium | Extreme |
| 6 | Customer alters the requirements during development | Strategic | Low | Tolerable |
| 7 | The products do not align with stakeholder expectations | Strategic | Medium | Tolerable |
| 8 | Lack of communication amongst team members and stakeholders | Performance | Low | Severe |
| 9 | Product has underlying bugs that impact the products functionality | Operational | Low | Tolerable |
| 10 | Team members lack required skills to complete the project | Performance | Low | Tolerable |

| # | Risk | Mitigation Strategy |
| --- | :--------------------------------------------------------------------------------: |  ------------------------------------------------ |
| 1 | COVID-19 levels increase, restricting access to laboratories and equipment | Frequent usage of online resources to keep in-contact and productive until covid levels decrease or the project finalizes.  |
| 2 | Client removes budget or online resources become unavailable | Utilisation of offline resources, if we are using any online assets (or planning to) we will need to produce them ourselves.  |
| 3 | Incompabitibility of services or equipment | Research alternative services and equipment to use incase the current ones fail or become unavailable for usage. |
| 4 | Minimal requirements will not be met by the end of the project (Scope creep) | We could invest in buying components to fulfill the remaining requirements or focus all members efforts into accomplishing the minimum requirements before attempting stretch goals. |
| 5 | Team members are unable to work on the project (Illness, lack of internet, etc) | Divide the absent members workload evenly amongst all remaining members to keep workflow consistent and to not overwhelm one member. |
| 6 | Customer alters the requirements during development | As the client did not specify these requirements during the proposition, we may decline the additional requirements if we deem them to be unachievable during the remaining time given.  |
| 7 | The products do not align with stakeholder expectations | Create frequent meetings with the client to ensure that each feature added is to specification. This will provide clarity if we are missing features or misinterpreted requirements. |
| 8 | Lack of communication amongst team members and stakeholders | We will conduct frequent weekly meetups and utilize online social media platforms (Mattermost) to ensure each member understands the given situation and tasks needed to be completed for project completion.  |
| 9 | Product has underlying bugs that impact the products functionality | We can create tests to identify and fix bugs occuring during development of each function. Ensuring each function remains bug-free before advancing to new tasks. |
| 10 | Team members lack required skills to complete the project | Create sessions to learn the required information needed to progress through the project. If one member knows the skills necessary, they can tutor the remaining members until all members are fully capable to continue. |

### 5.4 Health and Safety

Document here project requirements for Health and Safety. All teams must state in this section:

1. How teams will manage computer-related risks such as Occupational Over Use, Cable management, etc.  

2. Whether project work requires work or testing at any external (off-campus) workplaces/sites. If so, state the team's plans for receiving a Health and Safety induction for the external workplaces/sites. If the team has already received such an induction, state the date it was received.

3. Whether project work requires the team test with human or animal subjects? If so, explain why there is no option but for the team to perform this testing, and state the team's plans for receiving Ethics Approval _prior_ to testing.

Also document in this section any additional discussions with the School Safety Officer regarding Health and Safety risks. Give any further information on relevant health and safety regulations, risks, and mitigations, etc.


#### 5.4.1 Safety Plans

Safety Plans may be required for some projects, depending on project requirements. Safety Plan templates are available on the course Health & Safety page. Two questions all teams must answer are:

**Do project requirements involve anything that can cause serious harm or death?**  
Examples: building/modifying devices using voltages > 60 V, chemicals, large moving machinery, flying devices, bodies of water.

If so, you will have to write a separate Safety Plan as part of project requirements, and the Safety Plan must be referenced in this section. For health and safety risks involving serious harm or death, you must first contact the School Safety Officer and Course Coordinator first to discuss the Safety Plan and project requirements.

**Do project requirements involve anything that can cause harm or injury?**  
Examples: building/modifying things with voltages <= 60V, small moving machinery, wearable devices.

If so, you will have to write a separate Safety Plan as part of project requirements, and the Safety Plan must be referenced in this section. For health and safety risks involving harm or injury, you should write a draft of the Safety Plan before contacting the School Safety Officer and Course Coordinator to discuss the Safety Plan and project requirements.

If a safety plan is required, list in this section the date the School Safety officer accepted your Health and Safety plan (if accepted by submission date).

_If the project is purely software and requires no contact risks involving physical harm, then state "Project requirements do not involve risk of death, serious harm, harm or injury." in this section._


## 6. Appendices
### 6.1 Assumptions and dependencies

One page on assumptions and dependencies (9.5.7).

### 6.2 Acronyms and abbreviations

One page glossary _as required_.

## 7. Contributions

A one page statement of contributions, including a list of each member of the group and what they contributed to this document.

---

## Formatting Rules

 * Write your document using [Markdown](https://gitlab.ecs.vuw.ac.nz/help/user/markdown#gitlab-flavored-markdown-gfm) and ensure you commit your work to your team's GitLab repository.
 * Major sections should be separated by a horizontal rule.


## Assessment  

The goal of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem. The most important factor in the assessmernt of the document is how will it meet that goal. The document will be assessed for both presentation and content.

The presentation will be based on how easy it is to read, correct spelling, grammar, punctuation, clear diagrams, and so on.

The content will be assessed according to its clarity, consistency, relevance, critical engagement and a demonstrated understanding of the material in the course. We look for evidence these traits are represented and assess the level of performance against these traits. While being comprehensive and easy to understand, this document must be reasonably concise too. You will be affected negatively by writing a report with too many pages (far more than what has been suggested for each section above).

We aim to evaluate ENGR301 documents and projects as if they were real projects rather than academic exercises &mdash; especially as they are real projects with real clients. The best way to get a good mark in a document is to do the right thing for your project, your client, and your team. We encourage you to raise questions with your tutor or course staff, as soon as possible, so you can incorporate their feedback into your work.

---
