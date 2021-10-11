# Final Project Report

**Project Name:** Dungeon In a Jiffy<br>
**Client:** Craig Watterson<br>
**Date:** 12 October 2021<br>

## Project Objective(s)

The project objectives were to deliver a Dungeons And Dragons underground map generator to our client in order to make preparation for Dungeons and Dragons sessions easier for the client and other Dungeon Masters. In order to do this we needed to create a way of generating underground maps randomly, and to have the maps we generated look visually interesting while not taking too much away from the imagination of the players. The project would need to be able to be seen by the players and Dungeon Master on seperate screens, with the Dungeon Master being able to control the game on their screen, and the players only viewing on their screen.

## Summary of Project Results

The team was able to deliver a successful product to our client Craig Watterson which performs all the specified tasks from the project requirements. The DnD map generation tool is able to provide the Dungeon Master with all necessary functions such as manipulating fog, generating new levels and display rooms generated from the tool. The product is able to host games concurrently and allow separate games to take place with the ability of working on any device size and operating system.

## Original and Delivered Scope

The original scope was for one theme and one game at a time. More work was delivered in the end than was originally scheduled including our stretch targets of multiple concurrent games and multiple themes/tilesets.

Items that were not delivered include the scaling of monsters for the map level, and rooms being an appropriate size for the size of the monsters they might spawn inside them. These were not delivered because there were technical issues in generating the monsters and not enough time was given to the issue. This could be picked up by modifying the algorithm that generates the monsters to include a difficulty parameter, and including this when generating the monsters.

## Original and Actual Schedule

The group observed that the actual time taken to complete a large portion of the project’s issues/tasks differed greatly from the original time estimates made in Trimester 1. Originally, time estimates were only ever allocated within 1 sprint, with no issues/tasks overflowing into subsequent sprints. However, some issues ended up taking longer than expected, and some features took much less time than expected to implement and add. Additionally, as the team learned more about the technologies used in this project, new issues were occasionally added when needed, and some issues changed drastically or were removed altogether. 

While the above points caused development to deviate greatly from the original estimates, team members consistently took initiative and adjusted to dynamic needs of the project requirements and other team members. Because of this, the project was completed to a satisfactory level by the end of all 6 sprints, including polishing the project and adding a few extra backburner features.

Below is a list of some of the most notable deviations from the original time estimates:

- One of the biggest detachments from the schedule was the delivery of the monster generation, as this was originally planned to be integrated into the project by 26th July. However this was not integrated until 4th October due to technical difficulties and the focus of progression on other features.
- Similar to the monster generation, the map generation was slowly worked on over ~3-5 sprints. This was because the basic and advanced versions of the map generation algorithm were constantly iterated on and improved, including adding more features and better integration with the Firebase database.
- As for tasks that took shorter than expected, the task to upload, retrieve, and parse JSON files to manage map information persistence was nullified after the team learned more about how data storage with Google Firebase worked. This was because Firebase automatically handled the JSON parsing, thus making all REST functionalities simple to invoke and use. Therefore, these JSON tasks were already taken care of naturally with Firebase.

## Delivered Expenditure

No expenditure.

## Project Self-Assessment

The final result of our project differed heavily from when we were first planning it. This was the result of us having little to no knowledge about the frameworks and technologies we would be utilizing during the planning phase. For instance, Google’s online database service “Firebase”. Our original plan involved heavy use of JSON objects stored locally on the device. Furthermore, we believed we needed to implement networking software, to connect the DM device to the Player device. Google’s “Firebase” not only removed the need for any sort of networking implementation, but made the game playable from anywhere with an internet connection. Firebase also made the implementation of our stretch goal “Multiple, concurrent games” extremely simple to implement.

We choose React Expo as our framework, with little prior knowledge. Learning it on the fly, we utilized the framework in a way it wasn’t intended to be used. For instance, Expo is incompatible with HTML tags. This made implementing some other later features impossible without going back to rewrite our entire code (for instance, the player view zoom controls from the DM). React itself is also heavily bloated. The app is only designed to display a dungeons and dragons map, but the size of all the files is over 400MB.

Monster generation requirements as stated originally in the architecture documents were harder to fulfil than expected, with monsters being generated that adjust for the size of the room not implemented in the algorithm due to time constraints (although it is set up to be implemented within the algorithm). This was also true for monster level difficulty generation, where it is almost fully set up for but requires set up on the database side (Firestore) of multiple documents and sets of monsters within the documents.

## Lessons Learned

To fit the project requirements in developing a web application, our team had to learn a framework, programming language and database API unfamiliar to everyone in the group. This was a significant drawback to the initial development of the product as additional resources were expended to learn these new frameworks and programming languages. Most of our team also had to learn how to interact with a client in development of a product for the first time. This meant that there were some miscommunications with the client when discussing product features, causing some obstacles when implementing the original feature the client intended to implement.

The team believes that the framework “ReactJS” would be the most beneficial framework to continue developing the product in future. This would give added functionalities such as CSS styling, web routing, larger component libraries and easier deployment without the added difficulties of implementing app functionalities natively. The command line interface “React Expo” also wasn’t too beneficial to the development of the product as it bloated our repositories with unuseful files.

## Procurement Summary

No procurements.
