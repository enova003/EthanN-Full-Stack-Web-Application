import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourseForm() {
  const [courses, setCourses] = useState([]);
  const [num, setCourseNumber] = useState("");
  const [name, setCourseName] = useState("");
  const [prereq, setCoursePrereq] = useState("");
  const [updatedPrereq, updateCoursePrereq] = useState("");
  const [courseLevelGroup, setCourseLevelGroup] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/courses/`);
      setCourses(res.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const newCourse = async () => {
    const formBody = JSON.stringify({
      course_name: name,
      course_level: num,
      prerequisite: prereq,
      course_lvlGroup: courseLevelGroup,
    })

    const response = await fetch(`http://localhost:8080/courses/`, {
     method: "POST",
     body: formBody,
     headers: {
       "Content-Type": "application/json",
     },
    });

    if(response.ok){
        alert("Course successfully registered into the database");
        window.location.href = `http://localhost:3000/admin-course-form`;
    } else{
        alert("Please enter the course information in the input boxes")
    }

  }

  const updatePrereq = async (course) => {
    const newPrereq = JSON.stringify({
      prerequisite: updatedPrereq
    })

    try {
      const req = await axios.put(`http://localhost:8080/courses/prerequisite/${course.course_level}`, newPrereq, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (req.status == 200){
        alert(`Prerequisites for ${course.course_level} successfully updated`);
        window.location.href = `http://localhost:3000/admin-course-form`;
      } else{
        alert("Error: unable to update course prerequisites");
      }

    } catch (error){
        alert(error);
    }
  }

  const removePrereq = async (course) => {
    const noPrereq = JSON.stringify({
      prerequisite: "None"
    })

    try {
      const request = await axios.put(`http://localhost:8080/courses/prerequisite/${course.course_level}`, noPrereq, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (request.status == 200){
        alert(`Prerequisites for ${course.course_level} successfully removed`);
        window.location.href = `http://localhost:3000/admin-course-form`;
      } else{
        alert("Error: unable to remove course prerequisites");
      }

    } catch (error){
        alert(error);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 text-black">
        {courses.length > 0 ? (
        <>
            <div className='mb-24 bg-stone-400 rounded-3xl py-6 px-6'>
                <h2 className="mb-2 text-center"><strong>Update Database with a New Course</strong></h2>
                <div className="flex flex-col space-y-4">

                    {/* course prefix & num */}
                    <label className="block">Course Prefix and Number:</label>
                    <input 
                    id="course-num" 
                    required
                    onChange={(e) => {
                      setCourseNumber(e.target.value);
                    }}
                    className="border border-gray-300 rounded-full px-3 py-2" 
                    />
                    {/* end course prefix & num*/}


                    {/* course name */}
                    <label className="block">Course Name:</label>
                    <input 
                    id="course-name" 
                    required
                    onChange={(e) => {
                      setCourseName(e.target.value);
                    }}
                    className="border border-gray-300 rounded-full px-3 py-2" 
                    />
                    {/* end course name */}


                    {/* course prereqs */}
                    <label className="block">Prerequisites (enter all sepreated by commas):</label>
                    <input
                     id="course-prereq" 
                     required
                     onChange={(e) => {
                      setCoursePrereq(e.target.value);
                    }}
                     className="border border-gray-300 rounded-full px-3 py-2" 
                     />
                     {/* end course prereqs */}

                    {/* course level group */}
                    <label className="block">Course Level Group:</label>
                    <input
                     id="course-level-group" 
                     required
                     onChange={(e) => {
                      setCourseLevelGroup(e.target.value);
                    }}
                     className="border border-gray-300 rounded-full px-3 py-2" 
                     />
                     {/* end course level group */}

                    <button  
                    className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800"
                    onClick={newCourse}
                    >
                      Register New Course
                    </button>
                </div>
            </div>

          <p className='text-center mb-6'><strong>Please specify <i>all</i> prerequisites seperated by commas.</strong></p>

        {courses.map(course => (
          <div key={course.id} className='mb-16 bg-stone-400 rounded-3xl py-6 px-6'>
            <section className="mb-1">
              <div className="flex flex-col space-y-4">
                <p><strong>Course: </strong> {course.course_level} - {course.course_name}
                    <br></br>
                    <strong>Current Prerequisites: </strong>{course.prerequisite} 
                    <br></br>
                    <strong>Course Level Group: </strong>{course.course_lvlGroup}
                </p>
                <input className='border boarder-gray-300 rounded-full px-3 py-2'
                onChange={(e) => {
                  updateCoursePrereq(e.target.value);
                }}
                ></input>
                <button  
                  className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800"
                  onClick={() => updatePrereq(course)}
                  >
                  Update Course Prerequisites
                </button>
                <button  
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                  onClick={() => removePrereq(course)}
                  >
                  Remove ALL Prerequisites
                </button>
              </div>
            </section>
          </div>
        ))}

        </>
        ) : null}
    </main>
  );
}