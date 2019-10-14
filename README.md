# Event Manager App

Latest release: [here](https://combat-robotics-event-manager.firebaseapp.com)

## V1.0

### TO-DOs

Items that will be worked on, or are under consideration, for Robot Ruckus 2019.

#### Must Haves:

- Add the ability to move matches up or down in the schedule
- Create a "Currently Fighting" section,
  - Only one match can be scheduled at a time. Must resolve that match to put a new match into it's place
- Create a way to delete fight results (and correctly adjust the stats of each involved bot)
- Change the state of a bot, as an admin

#### Suggestions & Might-Dos:

- Add the ability to schedule breaks between fights
- Various types of 'past safety', depending on weight class?
- Do we want to track who marked a team as past safety?
- Proper bracket view

- Auto-scheduling feature, that adjusts fight times in some logical way (taking into consideration current time & expected time between matches)
- List of fights for each bot, on robot's page
- List of scheduled fight(s) for each bot, on robot's pages

#### Good user experience:

- Use data tables that allow users to sort the table by each individual column
- Robot details page a modal, not it's own page
- Collapse navbar to include an Admin dropdown, to save space
- Responsive design for mobile friendliness
- Logged in mode should display user & photo at top right of navbar

### Completed (since migration of this list from Google Keep to GitHub on 14/10/2019)

- Add route guards so unauthorized users cannot access admin pages through URL


## V2.0

Future improvements to the app.

### Competitor Interaction

Version of this app that allows competitors to interact with the app to pass along information.

- Implement a user page, where users can ask to be associated with a competing bot, granting them access to change that bot's state
  - Admin can then approve/deny said access
- Robot details page to allow teams to change the state of their bot (Arrived -> Ready for Safety, Repairing -> Ready)
- Push notifications of scheduled fights, and other news

