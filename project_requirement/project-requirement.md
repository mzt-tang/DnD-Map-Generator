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

##The Map Generation of the Program should meet the Following Goals
 - Maps generated should be different each time
 - Maps should adhere to at least 1 theme
 - The location that enemies are placed should make sense in relation to the place/theme on the map
 - The enemies should be weighted so that the amount of enemies at any given location is well balanced

##The Primary Map Displaying Screen of the Program should meet the Following Goals
 - The map should be scalable and resizable to the screen that its displayed on
 - Locations on the map should be covered in fog of war unless specified by the dungeon master
 - The map should have some form of scale, allowing players to gauge distance

##The Secondary Screen Map Controller of the Program should meet the Following Goals
 - The screen should be able to display any/all enemies' stats
 - The dungeon master should be able to see the full map
 - The dungeon master should be able to control where to uncover the fog of war on using the screen
 - The dungeon master should be able to generate a new map with the selected theme
 - The dungeon master should be able to change any monster's stats


### 1.3 Product overview 
#### 1.3.1 Product perspective

One page defining the system's relationship to other related products
(9.5.3. but not the subsections in the standard.)

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

References to other documents or standards. Follow the IEEE Citation  Reference scheme, available from the [IEEE website](https://www.ieee.org/) (please use the search box). (1 page, longer if required)

## 3. Specific requirements  

20 pages outlining the requirements of the system. You should apportion these pages across the following subsections to focus on the most important parts of your product.

### 3.1 External interfaces

See 9.5.10. for most systems this will be around one page. 

### 3.2 Functions

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


### 3.5 Logical database requirements

See 9.5.14. for most systems, a focus on d) and e) is appropriate, such as an object-oriented domain analysis. You should provide an overview domain model (e.g.  a UML class diagram of approximately ten classes) and write a brief description of the responsibilities of each class in the model (3 pages).

You should use right tools, preferabley PlantUML, to draw your URL diagrams which can be easily embedded into a Mardown file (PlantUML is also supported by GitLab and Foswiki).

### 3.6 Design constraints

see 9.5.15 and 9.5.16. for most systems, this will be around one page.

> 9.5.15 Design constraints<br>
> Specify constraints on the system design imposed by external standards, regulatory requirements, or project limitations.
> 
> 9.5.16 Standards compliance<br>
> Specify the requirements derived from existing standards or regulations, including:
> 
> a) Report format;<br>
> b) Data naming;<br>
> c) Accounting procedures;<br>
> d) Audit tracing.
> 
> For example, this could specify the requirement for software to trace processing activity. Such traces are needed for some applications to meet minimum regulatory or financial standards. An audit trace requirement may, for example, state that all changes to a payroll database shall be recorded in a trace file with before and after values.

### 3.7 Nonfunctional system attributes

Present the systemic (aka nonfunctional) requirements of the product (see ISO/IEC 25010).
List up to twenty systemic requirements / attributes.
Write a short natural language description of the top nonfunctional requirements (approx. five pages).


### 3.8 Physical and Environmental Requirements 

For systems with hardware components, identify the physical characteristics of that hardware (9.4.10) and environment conditions in which it must operate (9.4.11).  Depending on the project, this section may be from one page up to 5 pages.

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

Present a budget for the project (table), and justify each budget item (one paragraph per item, one page overall). 

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
