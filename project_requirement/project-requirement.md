# ENGR 301 Project "Dungeons and Dragons Tabletop Application 2" Project Proposal and Requirements Document
#### Author list, a comma-separated list of the names of each member of the team.
- Connor de Bruyn, Oliver Badrick, Patrick Laing, Adam Sinclair, Elijah Guarina, Jeremiah Choi, Michael Tang

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
 - Multiple maps should be able to be generated concurrently on different machines
 - Maps generated should be able to be saved and loaded
 - Users should be able to specify the level/difficulty and theme of the maps, as well as specify it to be random

#### The Primary Map Displaying Screen of the Program should meet the Following Goals
 - The map should be scalable and resizable to the screen that its displayed on
 - Locations on the map should be covered in fog of war unless specified by the dungeon master
 - The map should have some form of scale, allowing players to gauge distance
 - The map displayed should be pannable to adjust for any map size

#### The Secondary Screen Map Controller of the Program should meet the Following Goals
 - The screen should be able to display any/all enemies' stats
 - The dungeon master should be able to see the full map
 - The dungeon master should be able to control where to uncover the fog of war on using the screen
 - The dungeon master should be able to generate a new map with the selected theme
 - The dungeon master should be able to change any monster's stats
 - The dungeon master should be able to pan the map to adjust for any map size

### 1.3 Product overview
#### 1.3.1 Product perspective

This system generates maps to be used for a Dungeons and Dragons game, while also allowing the Dungeon Master to manage the game and choose what the players see. This system is similar to other systems such as ProDnD[1], an app available on the app store that allows users to input map sizes, complexity, and other information to generate a dungeon. Our system would not be as complex but will still be inspired in part by the ProDnD system and other systems similar to it.

The system will generate a map as well as populate the map with enemies of varying levels and types. The Dungeon Master would then calculate any damage to the enemies and players and manage the player’s information off-screen. The system would also generate information about the enemy such as the armour level. The levels of the generated enemies would depend on the level of the Dungeon.

The system would display information to the players using a similar system to Kahoot[2], a system that allows the host (the Dungeon Master in our system) to host a game that the players can connect to on their devices. Our system would be different from Kahoot's system as the Dungeon Master would need to be able to choose what image the players see on their device. This system would have no direct relationship with any other products or systems similar to Kahoot, but will instead be inspired by the design and functions of other products such as Kahoot. Whereas Kahoot is hosted via the internet, therefore anyone can connect to a given game, our system will use a server to generate maps and monster data, send the information to the Dungeon Master's device, have the Dungeon Master's device construct a map based on the information sent by the server, and save and load data for the Dungeon Master's device.

For our system to appear as a Dungeons and Dragons system, we will need to either create or use artwork. The artwork we use will either be created by ourselves or will be free to use images.

#### 1.3.2 Product functions

##### 1.3.2.1 Minimum Viable Product

The minimum viable product is a software solution that allows a dungeon master to automatically generate a random playable underground level for a game of dungeons and dragons. The generated dungeon will populate the level with monsters that are appropriate for the level and context of the generated level. The level will have both an entrance and exit with the exit leading to further harder generated levels. The level must have a measure or scale of distance for movement. We are not expected to make assets, we are expected to find assets online that we are able to use legally.

The dungeon master will have a separate display to the players that will allow them to see additional information and control map visibility. The additional information in the minimum viable product is monster stats for the generated monsters (hp, armour, etc). The players will be playing on a large display (projector or large TV) that allows them to move figurines around a pannable dungeon. The level has optional line of sight and map hiding functions. Room sizes will be appropriate for the monsters in the rooms.

The software solution will allow multiple games to run concurrently and for the games to be loaded and saved.

##### 1.3.2.2 Dungeon Generation Package

- **Entry and Exit**  The generated level must have a clear entry and exit point. These must be clearly connected and the exit point will lead to the next generated level.

- **Monster Population**  The generated level must be auto populated with monsters that are level appropriate. This means in levels 1-3 you would expect to find monsters that are very close to level 1-3. The monsters are expected to be context appropriate (In an underground level you would not expect to find horse riding knights)

- **Room sizing**  Rooms are expected to be appropriately sized for the monsters that populate them. A room with an ogre should have entrances that allow the movement of that orge based on size.

- **Level Scale**  Levels have a scale that ties them to distance.

##### 1.3.2.3 Dungeon Master View

- **Level overview**  The dungeon master can see the entire map and the monsters on it.

- **Level control** The dungeon master can scale and pan the entire map to display on the player view

- **Line of sight**  The dungeon master can change the line of sight of the players using the dungeon master view. Changes are reflected immediately inside the player view.

- **Monster Stats**  The dungeon master is able to see the monster stats of monsters inside the level. This includes stats such as health points, armour, size, speed etc.

##### 1.3.2.4 Player View

- **Display**  The players are able to see the sections of the map that have line of sight (as controlled by the dungeon master)

- **View control** The players can scale and pan the entire map that is displayed

- **Tile Size**  The display has the tiles large enough that the players are able to move physical figurines around on the map. This will require a minimum projector/TV size for the players to use.

##### 1.3.2.5 Server Specific

- **Save and Load**  The server is able to save and load games

- **Concurrent Games**  The server supports concurrent games

#### 1.3.3 User characteristics   

The client (Craig Watterson) has outlined that the system will initially be for his personal use, and releasing the system commercially is a potential goal after the completion of the minimum viable product. Therefore, there is a priority on designing the system around the client's characteristics and attributes. These characteristics and attributes are thus assumed to be that of a typical user of the system.

One characteristic the client has is that they are experienced with the premise of a Dungeons and Dragons game, as well as the process of how a game plays out. Therefore, the system will be designed with an assumption that users already have knowledge of how a game of Dungeons and Dragons works. Thus, the system will not prioritise teaching newer Dungeons and Dragons players how to play, but rather facilitate, digitise, and streamline the mechanics, information retrieval, and actions of a Dungeons and Dragons game that experienced players are familiar with.

While the system is aimed more towards experienced Dungeons and Dragons players, the system is still aimed to be intuitive to use. This is because the client's main goal with the system is to create a map for a Dungeons and Dragons game in a short time and with little effort from the user. This is also supported by the fact that Dungeons and Dragons map-generator systems/applications are not widely used. Therefore, processes, functions, and actions the system supports should employ conventions and designs most people are familiar with.

According to the client, the system is to be facilitated in a digital manner, using web browser(s) to host the system on multiple devices simultaneously for a single Dungeons and Dragons game. Therefore, the users are expected to:
- Have basic experience with using technologies such as computers and/or mobile devices
- Have basic experience with using a web browser

The client has also outlined that the system is to be used in conjunction with real-life figures that are completely separate from the system. Therefore, users are expected to have such figures for use with the system. Thus, the system will not be designed with the need to track players. Rather, the Dungeon Master will manually track each Players' positions, and use the system to adjust the appearance of the map accordingly.

#### 1.3.4 Limitations

##### 1.3.4.1 Software Limitations
* A modern web browser will be needed to display the application to the DM and users.

* Use of copyright material is (under any circumstances) not permitted.

##### 1.3.4.2 Hardware Limitations
* An internet connection will be required to use the program. A loss of internet connection will mean the game cannot continue to work unless it is hosted locally.

* A computer will be required to host the server (locally or online).

* Players will need a large enough screen or projector to use the program.


##### 1.3.4.3 Usage Assumptions
* It is assumed that there'll only be two devices involved per game.

* It will be assumed that the devices will be used in the same room. Any UX features involving the display of information, crucial for online play, will not be implemented.

* Assuming the DM will only rely on this for dungeon generation and nothing more. Any other dm support (such as calculating player stats, health modifiers, speed modifiers inventory space, etc) will not be included. Custom dungeon creation of any sort will not be included.

## 2. References

[1] Name of Software: ProDnD Publisher: Gray Lake Studios Date Accessed: 23/3/2021 Type of Medium: Mobile App Available: http://prodnd.blogspot.com/

[2] Name of Software: Kahoot! Publisher: Morten Versvik, Johan Brand, and Jamie Brooker Date Accessed: 25/3/2021 Type of Medium Website. Available: https://kahoot.com/

## 3. Specific requirements  

### 3.1 External interfaces

#### 3.1.1 Dungeon Master's View

The dungeon master must be able to see a different view from the players. The dungeon master's view must be controllable by the dungeon master and must include features such as changing the player's view and viewing enemy statistics. This view includes displaying individual rooms as well as the dungeon as a whole.

#### 3.1.2 Player's View

The player's view must display what the dungeon master chooses to display. This means that the player's view interface and the dungeon master interface must be connected so that the dungeon master can change the display for the players, but not the other way around.

### 3.2 Functions

[![](https://mermaid.ink/img/eyJjb2RlIjoic3RhdGVEaWFncmFtLXYyXG4gICAgUEVSU09OIDogUEVSU09OXG4gICAgUEVSU09OIC0tPiBDaG9vc2VfVmlldyhETS9QbGF5ZXIpXG4gICAgQ2hvb3NlX1ZpZXcoRE0vUGxheWVyKSAtLT4gUGxheWVyIDogU2VsZWN0cyBQbGF5ZXJcbiAgICBDaG9vc2VfVmlldyhETS9QbGF5ZXIpIC0tPiBEdW5nZW9uX01hc3RlciA6IFNlbGVjdHMgRE1cblxuICAgIFN0YXRlIER1bmdlb25fTWFzdGVyIHtcbiAgICAgICAgRE0gOiBETVxuICAgICAgICBETSAtLT4gVmlld19QbGF5ZXJfTWFwXG4gICAgICAgIERNIC0tPiBQaWNrX1RoZW1lXG4gICAgICAgIFBpY2tfVGhlbWUgLS0-IEdlbmVyYXRlX01hcFxuICAgICAgICBETSAtLT4gQ2hhbmdlX1Zpc2liaWxpdHlcbiAgICAgICAgRE0gLS0-IFJlbW92ZV9Nb25zdGVyc1xuICAgICAgICBETSAtLT4gVmlld19Nb25zdGVyX0RhdGFcbiAgICAgICAgRE0gLS0-IENoYW5nZV9NYXBcbiAgICAgICAgRE0gLS0-IFNlZV9GdWxsX01hcFxuICAgICAgICBETSAtLT4gUG9wdWxhdGVfTW9uc3RlcnNcbiAgICAgICAgRE0gLS0-IEV4aXRfR2FtZVxuICAgICAgICBETSAtLT4gU2F2ZV9HYW1lXG4gICAgICAgIERNIC0tPiBMb2FkX0dhbWVcbiAgICB9XG4gICAgXG4gICAgU3RhdGUgUGxheWVyIHtcbiAgICAgICAgUExBWUVSIDogUExBWUVSXG4gICAgICAgIFBMQVlFUiAtLT4gVmlld19QbGF5ZXJfTWFwXG4gICAgfSIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic3RhdGVEaWFncmFtLXYyXG4gICAgUEVSU09OIDogUEVSU09OXG4gICAgUEVSU09OIC0tPiBDaG9vc2VfVmlldyhETS9QbGF5ZXIpXG4gICAgQ2hvb3NlX1ZpZXcoRE0vUGxheWVyKSAtLT4gUGxheWVyIDogU2VsZWN0cyBQbGF5ZXJcbiAgICBDaG9vc2VfVmlldyhETS9QbGF5ZXIpIC0tPiBEdW5nZW9uX01hc3RlciA6IFNlbGVjdHMgRE1cblxuICAgIFN0YXRlIER1bmdlb25fTWFzdGVyIHtcbiAgICAgICAgRE0gOiBETVxuICAgICAgICBETSAtLT4gVmlld19QbGF5ZXJfTWFwXG4gICAgICAgIERNIC0tPiBQaWNrX1RoZW1lXG4gICAgICAgIFBpY2tfVGhlbWUgLS0-IEdlbmVyYXRlX01hcFxuICAgICAgICBETSAtLT4gQ2hhbmdlX1Zpc2liaWxpdHlcbiAgICAgICAgRE0gLS0-IFJlbW92ZV9Nb25zdGVyc1xuICAgICAgICBETSAtLT4gVmlld19Nb25zdGVyX0RhdGFcbiAgICAgICAgRE0gLS0-IENoYW5nZV9NYXBcbiAgICAgICAgRE0gLS0-IFNlZV9GdWxsX01hcFxuICAgICAgICBETSAtLT4gUG9wdWxhdGVfTW9uc3RlcnNcbiAgICAgICAgRE0gLS0-IEV4aXRfR2FtZVxuICAgICAgICBETSAtLT4gU2F2ZV9HYW1lXG4gICAgICAgIERNIC0tPiBMb2FkX0dhbWVcbiAgICB9XG4gICAgXG4gICAgU3RhdGUgUGxheWVyIHtcbiAgICAgICAgUExBWUVSIDogUExBWUVSXG4gICAgICAgIFBMQVlFUiAtLT4gVmlld19QbGF5ZXJfTWFwXG4gICAgfSIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

#### 3.2.1 Generate Maps

**What is the Goal of the use case?**  
To create a map of tiles to act as the board for the Dungeons and Dragons tabletop game.

**Who benefits from the result of this use case?**  
The dungeon master will benefit from this use case by reducing the time taken to create a playable board and have an automatic tool to create dungeons for them.

**How will this use case be achieved?**  
This can be achieved by generating a map in two stages after the user presses a generate map button:
* The function will randomly assign a random amount prefab "features" to an empty space. These prefab features will be a predetermined set of tiles which emulate more realistic map characteristics that random tilesets cannot replicate (I.e. creating caves with rounded edges or underground rooms).
* The function will then conduct a path finding algorithm to join these prefab features generated in the first stage. Creating random paths between the map features, allowing overlaps to keep everything more random.

**How will we verify this specific requirement?**  
Once a map has been generated with a new set of tiles we can ensure that this use case has functioned as intended.

**What limitations are there to achieving the use case?**  
* The dungeon master will no longer be allowed to select a desired map, but will only be able to generate random maps for usage.
* If there aren't enough prefab rooms, or if the user is really unlucky, they may experience very similar maps being generated if duplicate prefabs are being used.

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| Pressing the Generate maps button | [User Intention] |
| Construct a map of prefabs | [System Responsibilities] |
| Joins prefabs in map | [System Responsibilities] |
| Displays the generated Board | [User Interface] |

#### 3.2.2 View Player Maps

**What is the Goal of the use case?** <br>

For the player to be able to view their view of the map and for the Dungeon Master to be able to work with 3.2.3 Change Visibility in order to do so.

**Who benefits from the result of this use case?** <br>

The players benefit directly as the players will be able to see what is going on directly on their screen. The Dungeon Master benefits indirectly as the players are able to play, therefore the Dungeon Master is able to play.

**How will this use case be achieved?** <br>

This use case will be achieved by the system taking the display chosen by the Dungeon Master and displaying it on the players screen.

**How will we verify this specific requirement?** <br>

We will measure that this has been taken into account if the players are able to see a view of the board.

**What limitations are there to achieving the use case?** <br>

The limitations of this use case are the implementations of 3.2.3 change visibility as the player view relies on the Dungeon Master's choice of the view.

**Use Case Flow** <br>
| Action | Type |
| ---------------- | ------------------ |
| View the map from player's perspective | [User Intention] |
| Get the player view | [System Responsibilities] |
| Display the view | [User Interface] |

#### 3.2.3 Change Visibility

**What is the Goal of the use case?**  
The goal of "Change visibility" is to allow the dm to manually select tiles that are visible on the "player's display" screen. This keeps unexplored parts of the dungeon hidden from the player, allowing the dungeon master to show the player's what they'll see directly.

**Who benefits from the result of this use case?**  
This use case benefits Dungeon Master. He will gain the ability to control the narrative by controlling what the player's know. This maintains the experience for the players.

**How will this use case be achieved?**  
This use case will be consistently available to the dm once the dungeon map has generated. When first generated, the entire dungeon is not visible to the players. The dm will be free to reveal which parts of the map are visible to the player there onwards; at his own discretion.

**How will we verify this specific requirement?**  
This use case is essential to gameplay. We can judge it's success via playtesting. A successful implementation will make the tiles selected by the dm visible on the player's screen should update once selection is completed.

**What limitations are there to achieving the use case?**  
- Connection to the server must be stable for the dm to update the player's vision.
- The map must be generated before in order for this use case to function.

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| Player characters move to different room. | [User Intention] | 
| Add fog of war. | [User Intention] | 
| Allow/Register controls on DM device. | [System Responsibilities] | 
| Flag tiles invisible. | [System Responsibilities] |
| Update player's vision screen. | [System Responsibilities] | 
| Make new room visible. | [User Intention] |
| Allow/Register controls on DM device. | [System Responsibilities] | 
| Flag tiles visible. | [System Responsibilities] | 
| Update player's vision screen. | [System Responsibilities] | 
| Player's and DM able to see new screen. | [User Interface] | 
| Game continues. | [User Intention] | 

#### 3.2.4 Change Maps

**What is the goal of this use case** <br>

The goal of the use case "Change Maps" is for the Dungeon Master to be able to change maps between levels.

**Who benefits from the result of this use case?** <br>

The beneficiaries of this use case are the players, who will be able to play another level on a new map at higher levels, and the Dungeon Master, whose campaign continues on.

**How will this use case be achieved?** <br>

This use case will be achieved through the system generating a map and populating the map with higher levelled monsters than the previous map.

**How will we verify this specific requirement?** <br>

We will be able to measure this use case being taken into account by seeing if the system is able to generate and move onto another map after the current map the players are on has been completed.

**What are the limitations of achieving this use case?** <br>

The limitations of achieving this use case are generating maps. This is because the map must be generated before displaying anything to the users.

**Use Case Flow** <br>

| Action | Type |
| ------------------ | ------------------ |
| Change maps between levels | [User Intention] |
| Generate a new level | [System Responsibilities] |
| Generate monsters | [System Responsibilities] |
| Display to Dungeon Master Map information | [System Responsibilities] |
| Dungeon Master sees map information | [User Interface] |
| Continue the game | [User Intention] |

#### 3.2.5 View Monster data

**What is the Goal of the use case?**<br>
The goal of this use case is to display the monster data of any specific monster on the map.

**Who benefits from the result of this use case?**<br>
The DM and players benefits from this use case, seeing the monster data allows the DM to know its stats. This means when the players are battling a monster the DM knows how much health, damage, etc. the monster deals and takes.

**How will this use case be achieved?**  

The system will store the monsters' data. The generated map will have generated monsters that are on certain locations on the map. The DM should be able to at minimum select a specific monster from a list of monsters through a button that displays the monsters data.

**How will we verify this specific requirement?**  

We can see that the use case has been taken into the account when the system generates a map, the user chooses the map and is able to select a specific monster from a list of monster names that displays its stats. This use case is successful if the DM selects the monster to see its stats to calculate how much damage it takes and deals when facing the players.  

**What limitations are there to achieving the use case?**<br>
 - The system must have a predefined set of monsters stored inside
 - There must be a screen to display the monsters' stats


**Use Case Flow**<br>
| Action | Type |
| ---------------- | ------------------ |
 | The user can see any selected monster's stats | [user intention] |
 | The system must have a stored set of monsters and their stats | [system responsibilities] |
 | The system must display any specific monster's stats on a screen | [system responsibilities] |
 | The user should be able to pick a monster's name from a list of monsters and see its stats | [user interface] |

#### 3.2.6 See Full Maps

**What is the Goal of the use case?**<br>
The goal of this use case is to display the full generated map on to a screen.

**Who benefits from the result of this use case?**<br>
The dungeon master benefits from this use case by being to see the full map and plan for the game/players or choose another map. This means it also indirectly helps the players by allowing them to have a better experience playing because of the DM's benefits. Displaying the full map also allows the user to decide whether they like the map, or want to generate a different one for their needs.

**How will this use case be achieved?**  

The DM should be able to hit the generate map button or load a map save, and the system will generate/load the map, and display that  full map.

**How will we verify this specific requirement?**  

We will be able to see that this use case has been taken in to account when the system generate/load the map, and the user can see the map in its entirety. It is essential to the program, so we can judge its success when we can see the full map once the program has been implemented.

**What limitations are there to achieving the use case?**  <br>
 - The system must generate the map before it can be displayed
 - There must be a screen to display the full map on

**Use Case Flow**  
| Action | Type |
| ---------------- | ------------------ |
| The user can see the full generated map | [user intention] |
| The system must generate the map | [system responsibility] |
| The system must display the generated map on to a screen | [system responsibility] |
| The user should be able to press the generate map button and see the full map | [user interface] |
| The user should be able to press the see map button and see the full map | [user interface] |

#### 3.2.7 Pick Map theme and level
**What is the Goal of the use case?**  
Map themes are the type of dungeon the game takes place in. They determine monster population. The Dungeon Master shall be able to pick what themed dungeon and level they would like to play in before map generation. The DM should also be able to also specify a random theme or level.

**Who benefits from the result of this use case?**  
This use case benefits the DM in the sense that they'll be able to choose what sort of experience they want the game session to have.

**How will this use case be achieved?**  
The Dungeon master shall choose the theme and level (or random theme/level)of the dungeon before map generation.

**How will we verify this specific requirement?**  
Map themes are a pre-requisite for monster population. If successfully implemented, the types of monsters within the dungeon should be consistent to the theme (for instance, undead shouldn't be spawning in an bandit hideout) and the difficulty of the monsters should more difficult (more health, damage, armour levels, etc.) than the levels below the chosen level.

**What limitations are there to achieving the use case?**
- This use case is used after the Dungeon Master role is assigned.
- When implementing, this feature must be implemented after "populate monsters".

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| Select map theme. | [User Intention] |
| Select level difficulty | [User Intention] |
| Display options | [System Responsibilities] |
| Dungeon Master makes selections. | [User Intention] | 
| Store selection in public variable. | [System Responsibilities] | 
| Populate dungeon with monsters according to the theme and level. | [System Responsibilities] | 

#### 3.2.8 Populate monsters

**What is the Goal of the use case?**  
The goal of the use case is to allow the DM to automatically populate monsters in the dungeon.

**Who benefits from the result of this use case?**  
Both the players and the DM benefit from this use case. This is because there is less time in setup of the game given the monsters have been already populated. It allows the game to get up and running quicker than if it had not been implemented.

**How will this use case be achieved?**  
This will be achieved by implementing an algorithm that takes in a dungeon map and a list of monsters to pick from. It will then automatically populate the map with appropriately levelled and themed monsters.  

**How will we verify this specific requirement?**  
We can ensure that this use case has been taken into account if when the DM presses the generate monsters button the dungeon is automatically populated with appropriately levelled and themed monsters.

**What limitations are there to achieving the use case?**  

- This requires some list or store of monsters to use. It requires the list to contain monsters of the appropriate level and style that the map is generated in.
- Requires the dungeon map to generate so that monsters can be placed inside it.

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| DM pushes button to generate monsters | [user intention] |
| Button sends request to server | [system responsibility] |
| server runs monster generation algorithm | [system responsibility] |
| server returns generated monster list | [system responsibility] |
| view updates display to show monsters | [user interface] |

#### 3.2.9 Exit Game/server

**What is the Goal of the use case?**  
Close the dungeons and dragons application and server.

**Who benefits from the result of this use case?**
The dungeon master will benefit from this function as they are able to close the application after usage of the game, instead of using system resources to keep the application up when they are no longer using it.

**How will this use case be achieved?**  
By pressing an exit application button, the system will close all processes that are being used. This should close the server that displays the board for the players device as well as the GUI for the dungeon master.

**How will we verify this specific requirement?**  
If we are unable to see the application or server running, as well as no longer being able to see system resources being used from the device's manager then we know the function is working as intended.

**What limitations are there to achieving the use case?**  
* This use-case requires the board and server to be implemented and operational.

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| Close the application | [User Intention] |
| Stop all running processes | [System Responsibilities] |
| Dungeon masters view is no longer being displayed | [User Interface] |
| Players view is no longer being displayed | [User Interface] |

#### 3.2.10 Choose View (DM Or Player)

**What is the Goal of the use case?**  
The goal is to categorise users into the Dungeon Master and the Player(s) by allowing users to choose to view either the DM's view and the players' view.

**Who benefits from the result of this use case?**  
Allowing users to choose between the two views provides them the option decide what responsibilities they have during a Dungeons and Dragons game.

**How will this use case be achieved?**  
This function will be achieved by prompting a user that visits the Dungeons and Dragons Map Generator website with buttons to choose whether they wish to view the map from the Dungeon Master's (DM) perspective, or though the Player's perspective.

**How will we verify this specific requirement?**  
We can judge this by observing whether choosing a view provides the user with the correct view. Specifically:

- Choosing to view the Player view instructs the system to present the Player view to the user
- Choosing to view the DM view instructs the system to present the DM view instead

**What limitations are there to achieving the use case?**   
Limitations of achieving this function include:
 - An inability to access the website/launch the application (no internet access, application does not launch properly)
 - Being able to provide two different views to the user requires there to be two different views of the application in the first place

**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| Open/Go to the DnD Map Generator website | [user interface] |
| Launch application | [system responsibility] |
| Ask user to start a new game or load an existing game | [system responsibility] |
| Start a new game or load an existing game | [user interface] |
| Ask user to choose between viewing the DM's view or the Player's view | [system responsibility] |
| Choose a view | [user interface] |
| Display the view that the player selected, including all functionalities associated with that view | [system responsibility] |

#### 3.2.11 Save Game (DM)

**What is the Goal of the use case?**<br>
The goal is to allow the DM to save the generated map, so that they are able to load the map for another game.

**Who benefits from the result of this use case?**<br>
The dungeon master and the players will benefit from this use case. If they don't finish the game in one session, it is useful to all the users that they can save their progress.

**How will this use case be achieved?**<br>
It could store the saved game in a JSON file, which is then stored on an online database

**How will we judge/measure that this use case has been taken into account?**<br>
This will be judged by checking that when the save game is loaded, it is the same as it was when it was saved.

**What limitations are there to achieving the use case?**<br>
If the JSON file is stored on an online database, it is very difficult to retrieve the information from the file.

| Action | Type |
| ------ | ---- |
| User clicks the save button | [User Intention] |
| The JSON file is saved to an online database | [System Requirements] |
| Display a 'Saved Game' message | [User Interface] |

#### 3.2.12 Load Game (DM)

**What is the goal of the use case?**<br>
The goal is to allow the DM to load a previously saved game, so that the players can continue where they left off.

**Who benefits from the result of this use case?**<br>
The dungeon master and the players will benefit from this use case. It is important for the players to be able to continue a game from where they
had left off in a previous session, since DnD games can sometimes take a long time to complete.

**How will this use case be achieved?**<br>
It can be achieved by accessing an online database where the saved JSON file is stored, then loading the JSON file in the game.

**How will we judge/measure that this use case has been taken into account?**<br>
This will be judged by checking that all information about the game when loaded is identical to what it was when saved. 

**What limitations are there to achieving the use case?**<br>
It is very difficult to store JSON files in a relational database.

| Action | Type |
| ------ | ---- |
| User clicks the load game button | [User Intention] |
| The JSON file is retrieved from the online database | [System Responsibility] |
| Displays the map in the same way as it was when saved | [User Interface] |
| If saved game cannot be found, display a 'cannot find game' message | [User Interface] |

#### 3.2.13 Map Resizing and Panning (DM)

**What is the Goal of the use case?**  
The goal of this use case to allow the functionability of resizing and panning of the map on the DM's display.

**Who benefits from the result of this use case?**  
This use case benfits the DM. It allows the DM to get a better look at the rooms in the map.

**How will this use case be achieved?**  
This use case will be achieved by the DM interacting with the map through touch or mouse, adjusting a slider to zooming of the map and panning by click/touch and drag. The program changes the display of the map to the touch/mouse adjustation, by either zooming in/out and panning.

**How will we verify this specific requirement?**  
This use case is essential to gameplay. We can judge it's success via playtesting using large scale map. A successful implementation will zoom and pan the map accordingly to the player/DM's touch/mouse.

**What limitations are there to achieving the use case?**  
- A map must be generated to scale and pan
- The DM must have access to touch/mouse to interact with the display


**Use Case Flow**
| Action | Type |
| ---------------- | ------------------ |
| DM's maps displays a scale slider | [User Interface] |
| DM adjusts the map scale slider | [User Intention] | 
| DM touch/clicks and drags the map | [User Intention] | 
| Update DM's screen | [System Responsibilities] | 
| DM is able to see the zoomed in/zoomed out/panned screen. | [User Interface] | 


### 3.3 Usability Requirements

In order to create a fully functional Dungeons and Dragons tabletop, the following usability requirements needs to be met:
* Measurable **effectiveness** of the application: The application needs to operate at a desired level of functionality without failure.
* **Efficiency** of the application: The application has to manage functions inputted by the user without inefficiencies.
* Client specified **criteria for satisfaction**: The application needs to portray desired functions specified by the client.

**Effectiveness:**
* The DM device must take input functionality from the user to perform various defined tasks.
* The devices need to communicate to and from the server.
* The application must generate a dungeons and dragons map for player usage and be displayed on the player view.
* The application should switch between multiple states (maps).

**Efficiency:**
* There should be no latency issues between the two devices.
* The application should be booted up from devices and run from the get-go.
* Map generation should be efficient and not take longer than 20 seconds to be created.

**Satisfaction Criteria:**
* A web-based application must be used so that the application can be run from any operating system.
* The application must be able to be run from the two different sized devices specified by the client (An iPad and a projector).
* The application contains a "fog of war", only displaying sections of the map that the user can currently see.
* The separate device from the player view should contain functionality only the dungeon-master can use.
* The application should contain a scale or grid to determine size of characters and scenery.
* Size of tiles should be large enough to fit physical pieces on top.

The application as the result of this project should contain no obscurities that could offend any of the users whilst using the application. The application must avoid any risks of usage that could arise from specific context of use.


### 3.4 Performance requirements

The program will need to support concurrent games with two terminals per game. One terminal will be used to display the randomly generated map, which will be used by the players to view the game map. The second terminal will be used to display the information about each room in the map, this will be used by the dungeon master. The first terminal will need to be large enough to display a map that will display the player character's positions (using physical figures supplied by the players). The physical objects will not interact with the board. The second terminal will need to be compatible with a smart device, or a laptop.

There will need to be at least two simultaneous users being supported. One user will be using the second terminal (they are the dungeon master) and the other users will be using the first terminal.

There will need to be information about each room that will be displayed to the dungeon master. The information that is given to the dungeon master will be room name, monster details and the treasure for each room. The monster details are the type of monster, their hit-points, their armour and what weapon they are using. This information will not need to be transferred between the two terminals, it will just be seen by the dungeon master. The information given to the players terminal will be the layout of the dungeon itself, displaying each room and how they connect.

The information that will be sent to the terminals will be persistent. It will be stored on the server.

The maps will only be generated when the players are entering them. For example, when the game starts it will only randomly generate the first level. The map generation should take no longer than 20 seconds to generate a map and display it on the screen.  

Since the game will be played in real time, the game will need to react to changes made quickly. Each time the players progress to the next level of the dungeon a new map will be generated. If the players want to go back to a previous level, it should take less than 1 second to load, since the map had already been generated previously. The only other aspect that will need to be changed dynamically is the Fog of War system. When the players go to each room the dungeon master should be able to make the room visible on the map display. This will need to take less than a second to change, since waiting for a while for the rooms visibility to load may ruin the immersion of the players.

When saving the game it is expected that it takes no longer than 20 seconds. The players don't want to spend a long time saving the game, since they may be in a rush to finish the session. When loading the game, assuming the internet is stable, it should take no longer than 20 seconds.

### 3.5 Logical database requirements

#### 3.5.1 Overview domain model
[![](https://mermaid.ink/img/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgICAgICAgVFlQRSB8fC0tfHsgTU9OU1RFUiA6IFwidHlwZV9pZFwiXG4gICAgICAgICAgU0laRSB8fC0tfHsgTU9OU1RFUiA6IFwic2l6ZV9pZFwiXG4gICAgICAgICAgQ0hBTExFTkdFIHx8LS18eyBNT05TVEVSIDogXCJjaGFsbGVuZ2VfcmF0aW5nXCJcbiAgICAgICAgICAgICIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgICAgICAgVFlQRSB8fC0tfHsgTU9OU1RFUiA6IFwidHlwZV9pZFwiXG4gICAgICAgICAgU0laRSB8fC0tfHsgTU9OU1RFUiA6IFwic2l6ZV9pZFwiXG4gICAgICAgICAgQ0hBTExFTkdFIHx8LS18eyBNT05TVEVSIDogXCJjaGFsbGVuZ2VfcmF0aW5nXCJcbiAgICAgICAgICAgICIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

For a more detailed entity relation diagram please view:
```plantuml
entity "Monster" as e01 {
  * **monster_id : number** <<generated>> <<PK>>
  --
  *name : text
  **type_id : number** <<FK>>
  **challenge_rating : number** <<FK>>
  **size_id : number** <<FK>>
  languages : string 
  hp : number
  alignment : string
  armorClass : string
  specialTraitList : string
  speedList : string
  senseList : string
  actionList : string
  skillsList : string
  strength : number
  dexterity : number
  constitution : number
  intelligence : number
  wisdom : number
  charisma : number
  immunities : string
  vulnerabilities : string
  resistances : string
}

entity "Challenge" as e02 {
  * **challenge_rating : number** <<PK>>
  --
  *xp : number
}

entity "Type" as e03 {
  * **type_id : number** <<generated>> <<PK>>
  --
  *monster_type : string
  tag : string
  tag_description : string
}

entity "Size" as e04 {
  * **size_id : number** <<generated>> <<PK>>
  --
  *size : string
  space : string
  hit_die : string
}

e02 ||..|{ e01
e03 ||..|{ e01
e04 ||..|{ e01
```

#### 3.5.2 Monsters
The monster class is responsible for providing all of the monsters information to the dungeon master. 

**A monster provides information on the following:**
- Statistics: strength, dexterity, charisma, wisdom, constitution and intelligence. Used in general calculations.
- Actions: active abilities the monster can do on their turn.
- Senses / Special traits: passive abilities that occur without the monsters input.
- Alignments: The political faction the monster associates to.
- Profficiencies: Weapons, armor and tools the monster is allowed to use.
- Languages spoken.
- Immunities / Vulnerabilities / Resistances.

#### 3.5.3 Type
The type class is responsible for providing the monsters type to the monster class, as well as the tag if applicable.

#### 3.5.4 Size
The size class is responsible for providing the size of the monster to the monster class. A given size specifies how much space the monster occupies as well as the amount of hit dice needed to generate the monsters health. 

#### 3.5.5 Challenge
The challenge class is responsible for providing the overall level of the monster (challenge rating) to the monster class. The challenge rating specifies how tough a given monster is, as well as the amount of xp provided for defeating the monster.

### 3.6 Design constraints

#### Copyright And Legal Constraints
Dungeons and dragons is owned by Wizards Of The Coast and they have a copyright and/or licence agreement on all their assets relating to the game. We need to ensure we do not violate any of their terms and conditions associated with their assets. This includes monster information/names, dungeons and dragons images, game assets, and any other assets implemented into the game.

Any other assets we use for this project that are free or paid will have terms of use associated with the assets. We must ensure we adhere to these requirements to avoid legal issues.

#### Data and Privacy
The program will not collect or store any personal data to avoid privacy laws.

#### Time limitation
Time is limited to about 7 hours a week working on this project. There is a hard deadline of October to finish the project. Because of this time constraint there are no guarantees that any work outside the scope of this requirements document can be completed before the deadline. Any stretch targets could be left unfinished, however these will be in a feature branch and will not affect the functionality of the main program.

### 3.7 Nonfunctional system attributes

- Performance
- Usability
- Scalability
- Testing
- Extensibility

Operability

It is expected that the application is able to successfully generate a random map without any errors. It is also expected to display the map correctly using the assets provided, and correctly update the map whenever the Dungeon Master makes an update on his device.

Performance

It is expected that the system is able to perform the inputs in an efficient amount of time. It should take less than 10-20 seconds to generate a new random dungeon level. It should take less time than that to display a previously generated level.

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

Requirements for the map display:
- It must either
    - Be a screen facing upwards or
    - Be a projector projecting the image onto a table
    - This is necessary because the players will need to be able to place their figures on the map
- It must be big enough so that the figures all fit on the map, and are to the correct scale (an ogre taking up more tiles than a human, for example)
- It must be able to connect to a server
- It must support a modern web browser.

Requirements for the dungeon master device:
- It must be able to connect to a server
- It must be able to get input from the dungeon master (e.g when they want to change levels)
- It must support a modern web browser.

Requirements for room:
- Must be big enough for the players to comfortably play the game

### 3.9 Supporting information

No supporting information provided.

## 4. Verification

#### 4.1 Generate Maps

**How will we verify this specific requirement?**  
To ensure this requirement has been met we can manually test by observing the board after generation. 
Once a map has been generated with a new set of tiles we can ensure that this use case has functioned as intended.
For a further test we can run a not-null test of the generated tiles in the 2d array after the map generation function,
to ensure objects have been constructed correctly. In addition, we can also compare hashes before and after each
generation to ensure uniqueness of the maps.

#### 4.2 View Player Maps

**How will we verify this specific requirement?** <br>

We will measure that this has been taken into account if the players are able to see a view of the board.

We will test that this feature is working by checking manually that what the Dungeon Master wants the player to see is visible on the player's device. We will test this feature's software is working by checking if information has been sent by the Dungeon Master's device and received by the player's device. If both tests work, the function will be deemed to be working.

#### 4.3 Change Visibility

**How will we verify this specific requirement?**  
This use case is essential to gameplay. We can judge it's success via playtesting. A successful implementation will make the tiles selected by the dm visible on the player's screen should update once selection is completed.

#### 4.4 Change Maps

**How will we verify this specific requirement?** <br>

We will be able to measure this use case being taken into account by seeing if the system is able to generate and move onto another map after the current map the players are on has been completed.

We will test if this is working by having the Dungeon Master advance the players on to the next map. If the level of the dungeon is higher with a new map generated, then the function works and the test is deemed successful.

#### 4.5 View Monster data

**How will we verify this specific requirement?**  

We can see that the use case has been taken into the account when the system generates a map, the user chooses the map and is able to select a specific monster from a list of monster names that displays its stats. This use case is successful if the DM selects the monster to see its stats to calculate how much damage it takes and deals when facing the players.  

#### 4.6 See Full Maps

**How will we verify this specific requirement?**  

We will be able to see that this use case has been taken in to account when the system generate the map, and the user can see it. It is essential to the program, so we can judge its success when we can see the full map once the program has been implemented.

#### 4.7 Pick Map theme

**How will we verify this specific requirement?**  
Map themes are a pre-requisite for monster population. If successfully implemented, the types of monsters within the dungeon should be consistent to the theme (for instance, undead shouldn't be spawning in an bandit hideout) and the difficulty of the monsters should more difficult (more health, damage, armour levels, etc.) than the levels below the chosen level.

#### 4.8 Populate monsters

**How will we verify this specific requirement?**  
We can ensure that this use case has been taken into account if when the DM presses the generate monsters button the dungeon is automatically populated with appropriately levelled and themed monsters.

#### 4.9 Exit Game/server

**How will we verify this specific requirement?**  
This requirement can be manually tested by viewing the application and server after running the function. 
If the board is no longer displaying on either device, and the application has closed on the dungeon masters device.
Then we can assume this requirement has been fulfilled. For a further test we may check the system resource usage
on the dungeon masters device and server, to ensure no background processes are pursuing after exiting. 

#### 4.10 Choose View (DM Or Player)

**How will we verify this specific requirement?**  
We can judge this by observing whether choosing a view provides the user with the correct view. Specifically:

- Choosing to view the Player view instructs the system to present the Player view to the user
- Choosing to view the DM view instructs the system to present the DM view instead

#### 4.11 Save Game

**How will we verify this specific requirement?**<br>
This requirement can be tested by saving the game to the JSON file, then going through the file and checking that it includes the aspects of the dungeon that need to be saved. The parts of the map that need to be checked are:

- The room layout of the levels
- The amount and type of monsters in each room
- Which rooms are the entrance and exit rooms
- The visual theme of the dungeon

#### 4.12 Load Game

**How will we verify this specific requirement?**<br>
This requirement can be tested by loading a saved game and comparing it to when it was saved. The parts of the map that need to be compared are:

- The room layout of the levels
- The amount and type of monsters in each room
- Which rooms are the entrance and exit rooms
- The visual theme of the dungeon

#### 4.13 Map Resizing and Panning

**How will we verify this specific requirement?**<br>
This use case is essential to gameplay. We can judge it's success via playtesting using large scale map. A successful implementation will zoom and pan the map accordingly to the DM's touch/mouse.

## 5. Development schedule.

### 5.1 Schedule

#### Architectural prototype
07/05/2021
- The architectural prototype is to be completed by Monday 7th May 2021

#### Map Generation Demo
01/06/2021
- The map generation will be demoed to get client feedback

#### Monster Generation Demo
26/07/2021
- Monsters incorporated into map generation to be demoed for client feedback

#### Saving and Loading
09/08/2021
- Saving and loading functionality to be demoed for client feedback

#### Minimum viable product
07/09/2021
- Minimum viable product to be demoed for client feedback.

### 5.2 Budget

No paid items to be purchased have been outlined to be required for the purpose of constructing the system. Because no purchases have been outlined, and therefore no expenses have been outlined, no budget has been explicitly allocated for this project.

However, a few potential expenses have been outlined. Potential expenses are expenses that are not determined to be necessary for the completion of this project, and therefore their costs and budgets are initially not real expenses. However, these potential expenses are considered to become real expenses if certain project circumstances change. If any of these potential expenses are ever decided to be purchased for the purpose of this project (i.e., they become real expenses), then their corresponding budgets are to be used to limit spending on each respective expense.

The table below describes these potential expenses.  
| Item            | Purpose                              | Budget (NZD)       |
|---------------------------|--------------------------------------------------------------------|-------------------|
| Cloud Instance | A Cloud Instance is to be paid for if the DnD Map Generator application is to be hosted and launched from the instance on a Cloud service such as Microsoft Azure or Amazon Web Service. This however is an alternative option, as ideally, the application would be hosted instead on servers operated by Victoria University of Wellington: School of Engineering and Computer Science (a.k.a. ECS Servers). This is because hosting the application from the ECS Servers would be free, whereas hosting it on Cloud services would not. If this ideal option turns out to not be possible however, then a Cloud instance would be the next preferred choice, and the outlined budget would be the limit on how much is spent on using the Cloud instance.  | $50.00 |
| Paid Assets | Paid Assets are third-party non-free resources to be used in the DnD Map Generator. This includes map textures, User Interface artwork, or any other assets to be outlined in the future. There is no initial plan to purchase any paid assets, as there is a bias to using free assets.  | $100.00 |

### 5.3 Risks

| # | Risk | Risk Type | Likelihood | Severity |
| --- | :--------------------------------------------------------------------------------: |  --------------- | ------------ | ---------------- |
| 1 | COVID-19 levels increase, restricting access to laboratories and equipment | Performance | High | Tolerable |
| 2 | Client removes budget or online resources become unavailable | Financial / Availability | Low | Tolerable |
| 3 | Incompatibility of services or equipment | Availability / Performance | Medium | Severe |
| 4 | Minimal requirements will not be met by the end of the project (Scope creep) | Operational | Medium | Extreme |
| 5 | Team members are unable to work on the project (Illness, lack of internet, etc) | Health and Safety / Performance | Medium | Extreme |
| 6 | Customer alters the requirements during development | Strategic | Low | Tolerable |
| 7 | The products do not align with stakeholder expectations | Strategic | Medium | Tolerable |
| 8 | Lack of communication amongst team members and stakeholders | Performance | Low | Severe |
| 9 | Product has underlying bugs that impact the products functionality | Operational | Low | Tolerable |
| 10 | Team members lack required skills to complete the project | Performance | Low | Tolerable |

| # | Risk | Mitigation Strategy |
| --- | :--------------------------------------------------------------------------------: |  ------------------------------------------------ |
| 1 | COVID-19 levels increase, restricting access to laboratories and equipment | Frequent usage of online resources to keep in-contact and productive until covid levels decrease or the project finalizes.  |
| 2 | Client removes budget or online resources become unavailable | Utilisation of offline resources, if we are using any online assets (or planning to) we will need to produce them ourselves.  |
| 3 | Incompatibility of services or equipment | Research alternative services and equipment to use in case the current ones fail or become unavailable for usage. |
| 4 | Minimal requirements will not be met by the end of the project (Scope creep) | We could invest in buying components to fulfil the remaining requirements or focus all members efforts into accomplishing the minimum requirements before attempting stretch goals. |
| 5 | Team members are unable to work on the project (Illness, lack of internet, etc) | Divide the absent members workload evenly amongst all remaining members to keep workflow consistent and to not overwhelm one member. |
| 6 | Customer alters the requirements during development | As the client did not specify these requirements during the proposition, we may decline the additional requirements if we deem them to be unachievable during the remaining time given.  |
| 7 | The products do not align with stakeholder expectations | Create frequent meetings with the client to ensure that each feature added is to specification. This will provide clarity if we are missing features or misinterpreted requirements. |
| 8 | Lack of communication amongst team members and stakeholders | We will conduct frequent weekly meetups and utilize online social media platforms (Mattermost) to ensure each member understands the given situation and tasks needed to be completed for project completion.  |
| 9 | Product has underlying bugs that impact the products functionality | We can create tests to identify and fix bugs occurring during development of each function. Ensuring each function remains bug-free before advancing to new tasks. |
| 10 | Team members lack required skills to complete the project | Create sessions to learn the required information needed to progress through the project. If one member knows the skills necessary, they can tutor the remaining members until all members are fully capable to continue. |

### 5.4 Health and Safety

1. These are the computer-related risks that could occur during this project, and how they will be managed.
- Eye damage: The 20-20-20 rule. Every 20 minutes, look at somthing 20 feet away for 20 seconds
- Spine injury: Make sure to stretch for about 5-10 minutes every hour
- Hand injury: Make sure to remove hands from keyboard when its not being used, also use whole arm to move mouse instead of wrist

2. The project does not requre work or testing at an external workplace/site.

3. The project does not require any testing with human and animal subjects.

#### 5.4.1 Safety Plans

Project requirements do not involve risk of death, serious harm, harm or injury.

## 6. Appendices
### 6.1 Assumptions and dependencies

- That the devices used have access to the internet
- That the devices used have enough computing power to run the application
- That the online server used to store the saved game has enough space to store the file
- That the device that displays the map has a large enough display for the player's physical figures to fit on the map 
- That the device that the DM uses has some way to get input

### 6.2 Acronyms and abbreviations

**Risk Acronyms and Abbreviations:**
* Performance Risk: A risk that impacts the efficiency of project operations.
* Financial Risk: A risk that impacts the budget of the product, affecting bought items and assets.
* Availability Risk: A risk that halts or reduces the amount of work team-members can contribute.
* Operational Risk: A risk that alters the functionality of the product.
* Health and Safety Risk: A risk that impacts the health and well-being of the team members.
* Strategic Risk: A risk that alters requirements of the project or client specifications.

## 7. Contributions

| User | Sections Done | 
| --------------- | :--------------------------------------------------------------------------------: |
| Adam Sinclair |  1.3.2, 3.2.8, 3.2.9, 3.5, 3.6, 4.8, 4.9, 5.1, 7 |
| Oliver Badrick | 3.2.12, 3.2.13, 3.4, 3.5, 3.7, 3.8, 4.12, 4.13, 5.1, 6.1, 7 |
| Patrick Laing | 1.3.1, 2, 3.1, 3.2.2, 3.2.4, 3.5, 4.2, 4.4, 5.1, 7 |
| Elijah Guarina | 1.3.3, 3.2.11, 3.5, 4.11, 5.1, 5.2, 7 |
| Jeremiah Choi |  1.3.4, 2, 3.2.3, 3.2.7, 3.5, 4.3, 4.7, 5.1, 7 |
| Connor de Bruyn | 3.2.1, 3.2.10, 3.3, 3.5, 4.1, 4.10, 5.1, 5.3, 6.2, 7 |
| Michael Tang | 1.0, 1.1, 1.2, 1.3.2.1, 1.3.2.4, 3.2.5, 3.2.6, 3.2.14, 3.5, 4.5, 4.6, 4.14, 5.1, 7 |

## Formatting Rules

 * Write your document using [Markdown](https://gitlab.ecs.vuw.ac.nz/help/user/markdown#gitlab-flavored-markdown-gfm) and ensure you commit your work to your team's GitLab repository.
 * Major sections should be separated by a horizontal rule.


## Assessment  

The goal of a requirements document is the problem you are attempting to solve:  not a first attempt at a solution to that problem. The most important factor in the assessmernt of the document is how will it meet that goal. The document will be assessed for both presentation and content.

The presentation will be based on how easy it is to read, correct spelling, grammar, punctuation, clear diagrams, and so on.

The content will be assessed according to its clarity, consistency, relevance, critical engagement and a demonstrated understanding of the material in the course. We look for evidence these traits are represented and assess the level of performance against these traits. While being comprehensive and easy to understand, this document must be reasonably concise too. You will be affected negatively by writing a report with too many pages (far more than what has been suggested for each section above).

We aim to evaluate ENGR301 documents and projects as if they were real projects rather than academic exercises &mdash; especially as they are real projects with real clients. The best way to get a good mark in a document is to do the right thing for your project, your client, and your team. We encourage you to raise questions with your tutor or course staff, as soon as possible, so you can incorporate their feedback into your work.

---
