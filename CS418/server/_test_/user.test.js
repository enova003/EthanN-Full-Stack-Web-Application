const supertest = require("supertest");
const {app} = require('../server');

describe("\nTesting courses.js", ()=>{

    describe("Testing PUT courses API", ()=> {

        it("Prerequisites successfully removed. Status code 200 returned.", async ()=> {
            const course_level = "CS 330"
            const response = await supertest(app).put(`/courses/prerequisite/${course_level}`).send({
                prerequisite: "None"
            });
            expect(response.status).toEqual(200);
        });
    
        it("Prerequities successfully added. Status code 200 returned.", async ()=> {
            const course_level = "CS 330"
            const response = await supertest(app).put(`/courses/prerequisite/${course_level}`).send({
                prerequisite: "CS 250, CS 252"
            });
            expect(response.status).toEqual(200);
        });
    }),
    
    describe("Testing GET courses API by course level", ()=> {
    
        it("Course successfully found. Status code 200 returned.", async ()=> {
            const course_level = "CS 418"
            const response = await supertest(app).get(`/courses/${course_level}`);
            expect(response.status).toEqual(200);
        });
    
        it("Course not found. Status code 404 returned.", async ()=> {
            const course_level = "CS 111"
            const response = await supertest(app).get(`/courses/${course_level}`);
            expect(response.status).toEqual(404);
        });
    }),
    
    describe("Testing GET ALL courses API", ()=> {
    
        it("All courses successfully returned. Status code 200 returned.", async ()=> {
            const response = await supertest(app).get(`/courses/`);
            expect(response.status).toEqual(200);
        });
    }),

    describe("Testing POST courses API", ()=>{
        it("New course successfully posted. Returned status code 200.", async ()=>{
            const response = await supertest(app).post(`/courses/`).send({
                course_name: "Elementary Computer Science",
                course_level: "CS 098",
                prerequisite: "None",
                course_lvlGroup: "000"
            });
            expect(response.status).toEqual(200);
        })
    }),

    describe("Testing DELETE courses API", ()=>{
        it("Course successfully deleted from the database.  Status returned 200.", async ()=>{
            const course_level = "CS 098";
            const response = await supertest(app).delete(`/courses/${course_level}`);
            expect(response.status).toEqual(200);
        })
    })
});

describe("\nTesting user.js", ()=>{

    describe("Testing GET user by email API", ()=> {

        it("User found. Status code 200 returned.", async ()=> {
            const u_email = "enova003@odu.edu";
            const response = await supertest(app).get(`/user/${u_email}`);
            expect(response.status).toEqual(200);
        });
    
        it("User not found. Status code 404 returned.", async ()=> {
            const u_email = "null@test.com";
            const response = await supertest(app).get(`/user/${u_email}`);
            expect(response.status).toEqual(404);
        });
    })
});

describe("\nTesting login.js", ()=>{
    describe("Testing POST login API", ()=> {
    
        it("Login Unsuccessful. Status code 401 returned.", async ()=> {
            const response = await supertest(app).post(`/login`).send({
                u_email: "enova003@odu.edu",
                u_password: "1111",
            });
            expect(response.status).toEqual(401);
        });
    })
});

describe("\nTesting courseadvising.js", ()=>{

    describe("Testing GET all courseadvising student records", ()=> {
        it("All student records successfully returned. Status code 200 returned.", async ()=> {
            const response = await supertest(app).get(`/courseadvising/`);
            expect(response.status).toEqual(200);
        });
    })
});


