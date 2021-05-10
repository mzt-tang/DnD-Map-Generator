# ENGR 301: Architectural Design and Proof-of-Concept

## Proof-of-Concept

The aim of an architectural proof-of-concept (spike or walking skeleton) is to demonstrate the technical feasibility of your chosen architecture, to mitigate technical and project risks, and to plan and validate your technical and team processes (e.g., build systems, story breakdown, Kanban boards, acceptance testing, deployment).

A walking skeleton is an initial technical attempt that will form the architectural foundation of your product. Since a walking skeleton is expected to be carried into your product, it must be completed to the quality standards expected for your final product. A walking skeleton should demonstrate all the technologies your program will rely on "end-to-end" &mdash; from the user interface down to the hardware.

In the context of ENGR 301, a walking skeleton does not need to deliver any business value to your project: the aim is technical validation and risk mitigation.


## Document

The aim of the architectural design document is to describe the architecture and high-level design of the system your group is to build, to identify any critical technical issues with your design, and to explain how you have addressed the highest rated technical and architectural risks. The architecture document should also demonstrate your understanding of architectural techniques and architectural quality, using tools and associated notations as necessary to communicate the architecture precisely, unambiguously and clearly in a written technical document.

Page specifications below are *limits not targets* and refer to the pages in the PDF generated from the markdown. Because the size of your document is necessarily limited, you should ensure that you focus your efforts on those architectural concerns that are most important to completing a successful system: if sections are at their page limit, indicate how many items would be expected in a complete specification.

The ENGR 301 project architecture design document should be based on the standard ISO/IEC/IEEE 42010:2011(E) _Systems and software engineering &mdash; Architecture description_, plus appropriate sections from ISO/IEC/IEEE 29148:2018(E) _Systems and software engineering &mdash; Life cycle processes &mdash; Requirements engineering_; ISO/IEC/IEEE 15289:2017 _Systems and software engineering &mdash; Content of life-cycle information items (documentation)_; ISO/IEC/IEEE 15288:2015 _Systems and software engineering &mdash; System life-cycle processes_; ISO/IEC/IEEE 12207:2017 _Systems and software engineering &mdash; Software life cycle processes_ and ISO 25010 SQuaRE; with notations from ISO/ISE 19501 (UML). In particular, Annex F of ISO/IEC/IEEE 15288 and Annex F of ISO/IEC/IEEE 12207. These standards are available through the Victoria University Library subscription to the [IEEE Xplore Digital Library](https://ieeexplore.ieee.org/) (e.g., by visiting IEEE Xplore from a computer connected to the University network).

The document should contain the sections listed below, and conform to the formatting rules listed at the end of this brief.

All team members are expected to contribute equally to the document and list their contributions in the last section of the document (please make sure that your continued contribution to this document can be traced in GitLab). You should work on your document in your team's GitLab repository in a directory called "M2_Architecture". If more than one team member has contributed to a particular commit, all those team member IDs should be included in the first line of the git commit message. ``git blame``, ``git diff``, file histories, etc. will be tools used to assess individual contributions, so everyone is encouraged to contribute individually (your contribution should be made to many sections of the document, rather than focusing on just a single section), commit early and commit often.

---

# ENGR 301 Project *NN* Architectural Design and Proof-of-Concept

**Authors:** a comma-separated list of the names of each member of the team.

## 1. Introduction

One page overall introduction including sections 1.1 and 1.2 (ISO/IEC/IEEE 42010:2011(E) clause 5.2)

### Client

Identify the client and their contact details.

### 1.1 Purpose

One sentence describing the purpose of the system.

### 1.2 Scope

One paragraph describing the scope of the system.

### 1.3 Changes to requirements

If the requirement have changed significantly since the requirements document, outline the changes here. Changes must be justified and supported by evidences, i.e., they must be substantiated. (max one page, only if required)

## 2. References

References to other documents or standards. Follow the IEEE Citation Reference scheme, available from the [IEEE website](https://ieee-dataport.org/sites/default/files/analysis/27/IEEE%20Citation%20Guidelines.pdf) (PDF; 20 KB). (1 page, longer if required)

## 3. Architecture

Describe your system's architecture according to ISO/IEC/IEEE 42010:2011(E), ISO/IEC/IEEE 12207, ISO/IEC/IEEE 15289 and ISO/IEC/IEEE 15288.

Note in particular the note to clause 5 of 42010:

_"The verb include when used in Clause 5 indicates that either the information is present in the architecture description or reference to that information is provided therein."_

This means that you should refer to information (e.g. risks, requirements, models) in this or other documents rather than repeat information.

### 3.1 Stakeholders

See ISO/IEC/IEEE 42010 clause 5.3 and ISO/IEC/IEEE 12207 clause 6.4.4.3(2).

For most systems this will be about 2 pages, including a table mapping concerns to stakeholder.

### 3.2 Architectural Viewpoints
(1 page, 42010 5.4) 

Identify the architectural viewpoints you will use to present your system's architecture. Write one sentence to outline each viewpoint. Show which viewpoint frames which architectural concern.

### 4. Architectural Views

(5 sub-sections of 2 pages each sub-section, per 42010, 5.5, 5.6, with reference to Annex F of both 12207 and 15288) 

Describe your system's architecture in a series of architectural views, each view corresponding to one viewpoint.

You should include views from the following viewpoints (from Kruchten's 4+1 model):

 * Logical
 * Development
 * Process
 * Physical 
 * Scenarios - present scenarios illustrating how two of your most important use cases are supported by your architecture

As appropriate you should include the following viewpoints:

 * Circuit Architecture
 * Hardware Architecture

Each architectural view should include at least one architectural model. If architectural models are shared across views, refer back to the first occurrence of that model in your document, rather than including a separate section for the architectural models.

### 4.1 Logical
...

### 4.2 Development
...

### 4.3 Process
...

### 4.4 Physical 
...

### 4.5 Scenarios
...

## 5. Development Schedule

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

One page on assumptions and dependencies (9.5.7) 

### 6.2 Acronyms and abbreviations

One page glossary as required 

## 7. Contributions

An one page statement of contributions, including a list of each member of the group and what they contributed to this document.

---

## Formatting Rules 

 * Write your document using [Markdown](https://gitlab.ecs.vuw.ac.nz/help/user/markdown#gitlab-flavored-markdown-gfm) in your team's GitLab repository.
 * Major sections should be separated by a horizontal rule.


## Assessment 

This document will be weighted at 20% on the architectural proof-of-concept(s), and 80% on the architecture design.

The proof-of-concept will be assessed for coverage (does it demonstrate all the technologies needed to build your project?) and quality (with an emphasis on simplicity, modularity, and modifiability).

The document will be assessed by considering both presentation and content. Group and individual group members will be assessed by identical criteria, the group mark for the finished PDF and the individual mark on the contributions visible through `git blame`, `git diff`, file histories, etc. 

The presentation will be based on how easy it is to read, correct spelling, grammar, punctuation, clear diagrams, and so on.

The content will be assessed according to its clarity, consistency, relevance, critical engagement and a demonstrated understanding of the material in the course. We look for evidence these traits are represented and assess the level of performance against these traits. Inspection of the GitLab Group is the essential form of assessing this document. While being comprehensive and easy to understand, this document must be reasonably concise too. You will be affected negatively by writing a report with too many pages (far more than what has been suggested for each section above).

---
