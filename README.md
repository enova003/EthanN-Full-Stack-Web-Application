#Description

This repository contains my code for a semester long project, where the students of Old Dominion University's
CS 418 were asked to build a full-stack web appliaction.  This course allowed me to gain experience
developing both a server and client for a website.

The overall purpose of the website is to be a course portal for a university where users can view
a course catalog, register/add courses to their profile, view the status of the terms they have
registered for, and update profile information. Additionally, there is an admin user that is
responsible for approving/rejecting student’s course terms, approving/rejecting new users,
implementing new courses, and updating the prerequisites for courses. The methods that I
utilized are having node.js be the runtime environment and using HTML, CSS, and JavaScript to
construct the website. Additionally, the frameworks that I built the website with are React.js,
and I used the Tailwind CSS library. Finally, I used PHPMyAdmin as my database to
store all the information; the database utilizes MySQL.

#Features

Spread throughout the entire semester, I, along with the rest of the students, was asked 
to implement over 35 different features, which I have provided below. I have successfully 
implemented all the features seen below, and I recieved an 'A' letter grade in this course.
______________________________________________________________________________________________
1. Users should be able to register new accounts in a database using email addresses.
2. Users are identified by email address.
3. Password must be encrypted before storing in the database.
4. Users cannot register duplicate accounts using the same email address.
5. An admin user should be created from the backend. (Only 1)
6. Users cannot log in to the system until their requests are approved by the admin.
7. An admin user has a different view from a regular user: it can approve users.
8. Users should be able to log into your website using the accounts they registered.
9. Users should be able to reset their passwords if they forget it.
10. Users should be able to change their passwords after they login.
11. A 2-factor-authentication should be used when a user attempt to login; the system should send an email
with a verfication code.
13. The website should have a homepage for each user, where they can view their profiles,
change passwords, and update information. Email addreses cannot not be changed.
14. Design and create the prerequisite form that allows admin to set prerequisites for courses. The
form should display courses from levels 100 to 900 and provide fields for the administrator to
specify the level, course, and whether to add or remove the prerequisite.
15. After the admin selects prerequisites, the system should update the database accordingly,
reflecting the changes made to the course prerequisites.
16. After a student is logged into the system, he/she should have access to a menu specifically for
course advising, where he/she can view and manage his/her advising records.
17. Design and create the course advising page to display previously submitted records or indicate
no records. Records will show in the list.  Below is an example of how the records should look.
Date             Term           Status
03/03/2024       Fall 2024      Pending
10/05/2023       Spring 2024    Approved
10/01/2023       Spring 2024    Rejected
18. Develop a form for creating new course advising entries. This form should have three sections:
header, prerequisites, and course plan; a header section for general information like the last
term attended, last GPA, and current term; a section for specifying prerequisites; and a section
for planning courses for the upcoming term.
19. Implement the header section with fields: Last Term, Last GPA, Current Term.
In this section of the form student can input their last term attended, last GPA, and current term.
20. Students should be able to dynamically add rows to specify prerequisites for courses they plan to
take. Each row should have dropdown menus for selecting the course level and course name.(In
drop down only admin selected pre-requisite courses will be shown)
21. Similarly, students should be able to dynamically add rows to plan the courses they intend to
take in the upcoming term, with dropdown menus for selecting the course level and name.
22. Implement rules for course selection. The system should prevent students from adding courses
they've already taken in the last term to their course plan.
23. After students submit their advising entries, the system should update the advising page with
the new entry, indicating its status as "Pending".
24. Admin should have a screen where they can see advising sheets submitted by students in the CS
department. The screen should display student names, UINs, and the status of their advising
sheets.
25. Clicking on a student's name should redirect the admin to a page displaying all the student's
previous and latest advising records, with options to approve or reject. In case of rejection, the
admin must submit a text message explaining the reason.
26. On submission of approval or rejection, the system should update the status of student records
accordingly.
27. The system should send email notifications to students informing them of any updates to their
advising sheet status.
28. Students should be able to see the status of their advising sheet, whether it's pending,
approved, or rejected.
29. Implement reCAPTCHA on the login page for enhanced security.
30. Validate the reCAPTCHA before permitting login attempts.
31. Only allow access to the system once the reCAPTCHA is successfully verified.
32. Prevent your application from clickjacking attack. Implement the prevention of click jacking.
33. Demonstrate clickjacking prevention using an <iframe> in the .html form
34. Add a favicon to the website.
35. Add a password validation, A password with uppercase and lowercase, number and special.
Implement regex for all password fields in application.
36. Develop and execute test cases for the backend application, focusing on one form.
37. A browser compatible design, layout should be browser compatible and window size
compatible design.
