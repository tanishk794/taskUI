Instruction for run on local machine

 1 Install dependencies
 npm install

 2 Start in development server
 npm run dev

 Usually vite app runs on http://localhost:5173. If it is not running on this it will cause cors error. Because I configure this server in backend.

Component and their functions for React frontend

Components for Authentication
1 Navbar
2 Login 
3 Register

1 Navbar
 Handles the logout feature.
 Show buttons for Login and Register

2 Register
 If the user is not autheniticated we redirect user to register component.
 It register the user with name, Email, Paasword.

3 Login
 User have to enter ID and password.
 If the user isvalid we send jwt token from backend it store it in local storage of the browser.


Components for Tasks 
1️ Dashboard (Main Component)
Manages state for tasks, selected task, and selected date.
Fetches tasks when the selected date changes.
Renders TaskFormWithCalendar (Form + Calendar) and TaskList (Task Display).

2️ TaskFormWithCalendar (Task Form + Calendar)
Handles task input (title, description, priority).
Includes a calendar for selecting the task date.
Updates selectedDate when the user picks a new date.

3️ TaskList (List of Tasks)
Displays tasks for the selected date.
Provides Edit and Delete buttons.
Calls onEdit(task) when Edit is clicked.
Calls onDelete(task._id) when Delete is clicked.
