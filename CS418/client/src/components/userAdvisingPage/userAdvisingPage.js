import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Advising() {
  const [courses, setCourses] = useState([]);
  const[lastTerm, setLastTerm] = useState("");
  const[gpa, setGPA] = useState("");
  const[currentTerm, setCurrentTerm] = useState("");
  const[todaysDate, setTodaysDate] = useState("");
  const[coursePlans, setCoursePlans] = useState("");
  const[courseName, setCourseName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [plannedCoursesList, setPlannedCoursesList] = useState([{ courseGroupLevel: '', courseName: '' }]); 
  const [prerequisiteCourseList, setPrerequisiteCourseList] = useState([{ courseGroupLevel: '', courseName: '' }]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get('email');
    fetchCourseData();
    setEmail(userEmail);
    if(userEmail){
      fetchEmailData(userEmail);
    }
  }, []);

  const fetchEmailData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/${email}`);
      setUserData(response.data[0]); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/courses/`);
      setCourses(res.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentData = async (studentLookUp) => {
    try {
      const res = await axios.get(`http://localhost:8080/courseadvising/${studentLookUp}`);
      setStudentData(res.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const newRecord = async () => {
    const studentLookUp = userData.u_first_name + ' ' + userData.u_last_name;
    await fetchStudentData(studentLookUp);

    if(studentData.length > 0 || studentData == null){

      let allPlannedCourses = '';
      let arrPlanLength = 0;
      let allPrereqCourses = '';
      let arrPrereqLength = 0;
      let alreadyTaken = studentData.length;

      plannedCoursesList.forEach(course => {
        if(arrPlanLength !== plannedCoursesList.length - 1){
          allPlannedCourses = allPlannedCourses + course.courseName + ', ';
        }
        else
          allPlannedCourses += course.courseName;

        arrPlanLength++;
      });

      prerequisiteCourseList.forEach(course => {
        if(arrPrereqLength !== prerequisiteCourseList.length - 1){
          allPrereqCourses = allPrereqCourses + course.courseName + ', ';      
        }
        else
          allPrereqCourses += course.courseName;

        arrPrereqLength++;
      });

      studentData.forEach(student => {
        if(JSON.stringify(allPlannedCourses) === JSON.stringify(student.planned_courses)){
          alreadyTaken--;
        }
      })

      if(alreadyTaken == studentData.length){
        const formBody = JSON.stringify({
          date: todaysDate,
          current_term: currentTerm,
          last_term: lastTerm,
          last_gpa: gpa,
          prerequisites: allPrereqCourses,
          student_name: userData.u_first_name + ' ' + userData.u_last_name,
          planned_courses: allPlannedCourses,
          student_email: userData.u_email,
        });

        const newCourse = await fetch("http://localhost:8080/courseadvising", {
          method: "POST",
          body: formBody,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (newCourse.ok) {
          alert(`Course plan successfully added for ${userData.u_first_name} ${userData.u_last_name}. Once the status of your course plan is updated, an email will be sent to you at ${userData.u_email}.`)
          window.location.reload();
        }
        if(!newCourse.ok){
          alert("Internal Error: unable to add new course plan");
          window.location.reload();
        }
      }
      else{
        alert(`You have already taken ${allPlannedCourses}.  Course plan not submitted.`)
      }
    }
  };
  
  const handleButtonClick = () => {
    if(courseName !== ''){
      setIsButtonClicked(true);
      fetchCoursePlans();
    }
    else
      alert("Please enter your full name as it appears on your account.")
  }

  const fetchCoursePlans = async () => {
    try {
      const getPlans = await axios.get(`http://localhost:8080/courseadvising/${courseName}`);
      setCoursePlans(getPlans.data); 
    } catch (error) {
      console.error(error);
    }
  };

  const addPlannedCourse = () => {
    setPlannedCoursesList([...plannedCoursesList, {  courseGroupLevel: '', courseName: '' }]);
  };
  
  const handleCourseNameChange = (index, value) => {
    const updatedCourses = [...plannedCoursesList];
    updatedCourses[index].courseName = value;
    setPlannedCoursesList(updatedCourses);
  };

  const handleCourseGroupLevelChange = (index, value) => {
    const updatedCourses = [...plannedCoursesList];
    updatedCourses[index].courseGroupLevel = value;
    setPlannedCoursesList(updatedCourses);
  };

  const addPrereqCourse = () => {
    setPrerequisiteCourseList([...prerequisiteCourseList, {  courseGroupLevel: '', courseName: '' }]);
  };
  
  const handlePrerequisiteCourse = (index, value) => {
    const updatedPrereqs = [...prerequisiteCourseList];
    updatedPrereqs[index].courseName = value;
    setPrerequisiteCourseList(updatedPrereqs);
  };

  const handlePrereqCourseLevelChange = (index, value) => {
    const updatedPrereqs = [...prerequisiteCourseList];
    updatedPrereqs[index].courseGroupLevel = value;
    setPrerequisiteCourseList(updatedPrereqs);
  };

  return (
    /* Course Catalog */
    <main className="text-black mt-16" style={{ display: 'flex'}}>
      <div className="mr-10" style={{ flex: 1 }}>
        <h2 className='text-center mb-4'><strong>Course Catalog</strong></h2>
      {courses.length > 0 ? (
        courses.map(course => (
          <div key={course.id} className='mb-6 bg-rose-950 rounded-3xl py-4 px-4 text-white'>
            <section className="mb-1">
              <div className="flex flex-col space-y-4">
                <p><strong>Course Prefix and Number: </strong>{course.course_level}
                  <br></br>
                  <strong>Title: </strong> {course.course_name}
                  <br></br>
                  <strong>Prerequisites: </strong>{course.prerequisite} 
                </p>
              </div>
            </section>
          </div>
        ))

      ) : null}
    </div>
    {/* end course Catalog */}

    
  {/* Form to see course plans */}
  <div className="ml-20" style={{ flex: 1 }}>
  <p className='text-center mb-6'>
    <b>
      To see the status of your previously <br></br>submitted course plans, use this form
    </b>

    <br></br><br></br>If the status of your term is "Rejected",<br></br>
    <b><em> hover over the word "Rejected"</em></b> to <br></br>
    display the admin note explaining<br></br> 
    the reason for rejection
  </p>
    <div className='mb-6 bg-stone-500 rounded-3xl py-4 px-4'>
    <div className='mt-6 bg-stone-400 rounded-3xl py-4 px-4'>
      <h1 className='text-center'><strong>Your Course Plans</strong></h1>
        <div className="flex items-center justify-between mt-2">
          <label
            className="text-center block text-sm font-medium leading-6 text-gray-900"
          >
            Your full name as it appears on your account
          </label>
        </div>
        <div className="mt-2">
          <input
            required
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
          />
        </div>
    </div>
    <div className='mb-6'>
      <button
        className="mt-6 flex w-full justify-center rounded-full bg-amber-900 px-3 py-1.5 text-sm font-semibold leading-6 
        text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
        onClick={handleButtonClick}
      >
        See the status of your course plans
      </button>
    </div>
    </div>

    {isButtonClicked && coursePlans.length > 0 ? (
    <div className="mb-6 bg-stone-400 rounded-3xl py-4 px-4">
        <div className="flex flex-row justify-between">
            <p style={{minWidth: '33%'}}><strong>Date</strong></p>
            <p style={{minWidth: '33%'}}><strong>Term</strong></p>
            <p style={{minWidth: '33%'}}><strong>Status</strong></p>
        </div>
        {coursePlans.map((plan) => (
            <div key={plan.id}>
                <section className="mb-1">
                    <div className="flex flex-row justify-between">
                        <p style={{minWidth: '33%'}}>{plan.date}</p>
                        <p style={{minWidth: '33%'}}>{plan.current_term}</p>
                        <p style={{minWidth: '33%'}} title={plan.status === 'Rejected' ? plan.rejectionReason : ''}>{plan.status}</p>
                    </div>
                </section>
            </div>
        ))}
    </div>
    ) : isButtonClicked && (
    <p className='text-center'><b>No records found for this student</b></p>)}
      
  </div>
 {/*  end form to see course plans */}

    {/* submit new student record */}
    <div className="ml-20" style={{ flex: 1 }}>
      <p className='text-center mb-12'>
        <b>
          Submit a new course plan <br></br>
          Please enter all boxes
        </b>
      </p>
       <div className="flex flex-col space-y-4 bg-stone-500 rounded-3xl py-4 px-4">

        {/* header section */}
        <div className='bg-stone-400 rounded-3xl py-4 px-4'>
          <div>
            <h1 className='text-center'><strong>Header</strong></h1>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Term Attended (Example: Fall 2023)
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => {
                  setLastTerm(e.target.value);
                }}
                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              GPA of Last Term
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => {
                  setGPA(e.target.value);
                }}
                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Current Term (Example: Fall 2023)
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => {
                  setCurrentTerm(e.target.value);
                }}
                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Todays Date (Format: dd/mm/yyyy)
            </label>
            <div className="mt-2">
              <input
                required
                onChange={(e) => {
                  setTodaysDate(e.target.value);
                }}
                className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
        {/* end header section */}

        {/* course plan section */}
          <div className='mt-2 bg-stone-400 rounded-3xl py-4 px-4'>
            <h1 className='text-center'><strong>Course Plan</strong></h1>
            {plannedCoursesList.map((course, index) => (
              <div key={index} className="flex items-center justify-between mt-2">
                <div>
                <select 
                  value={course.courseGroupLevel}
                  onChange={(e) => handleCourseGroupLevelChange(index, e.target.value)}
                  className="w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6">
                    <option value=''>[Select course grouping level]</option>
                    <option value='100'>Level 100 Classes</option>
                    <option value='200'>Level 200 Classes</option>
                    <option value='300'>Level 300 Classes</option>
                    <option value='400'>Level 400 Classes</option>
                    <option value='500'>Level 500 Classes</option>
                    <option value='600'>Level 600 Classes</option>
                    <option value='700'>Level 700 Classes</option>
                    <option value='800'>Level 800 Classes</option>
                  </select>
                  <select
                    value={course.courseName}
                    onChange={(e) => handleCourseNameChange(index, e.target.value)}
                    className="w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
                  >
                    <option value="">[Select intended course]</option>
                    {courses.map((course) => (course.course_lvlGroup == plannedCoursesList[index].courseGroupLevel && (
                      <option key={course.id} value={course.course_level}>
                        {course.course_level} - {course.course_name}
                      </option>
                    )))}
                  </select>
                </div>
              </div>
            ))}
            <button
              className="mt-6 flex w-full justify-center rounded-full bg-amber-900 px-3 py-1.5 text-sm font-semibold leading-6 
              text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
              onClick={addPlannedCourse}
            >
              Add Another Course
            </button>
          </div>
        {/* end course plan section */}

        {/* prerequisites section */}
        <div className='mt-6 bg-stone-400 rounded-3xl py-4 px-4'>
          <h1 className='text-center'><strong>Prerequisites</strong></h1>
          {prerequisiteCourseList.map((course, index) => (
            <div key={index} className='flex items-center justify-between mt-2'>
              <div>
                <select 
                  value={course.courseGroupLevel}
                  onChange={(e) => handlePrereqCourseLevelChange(index, e.target.value)}
                  className="w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6">
                    <option value=''>[Select course grouping level]</option>
                    <option value='100'>Level 100 Classes</option>
                    <option value='200'>Level 200 Classes</option>
                    <option value='300'>Level 300 Classes</option>
                    <option value='400'>Level 400 Classes</option>
                    <option value='500'>Level 500 Classes</option>
                    <option value='600'>Level 600 Classes</option>
                    <option value='700'>Level 700 Classes</option>
                    <option value='800'>Level 800 Classes</option>
                </select>
                <select value={course.courseName} onChange={(e) => handlePrerequisiteCourse(index, e.target.value)} className='w-full rounded-full border-0 py-1.5 
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6'>
                  <option value=''>[Select course prerequisites]</option>
                  {courses.map((prereqCourse) => (
                    prereqCourse.course_lvlGroup == prerequisiteCourseList[index].courseGroupLevel && (
                      <option key={prereqCourse.id} value={prereqCourse.course_level}>
                      {prereqCourse.course_level}
                      </option>
                    )))}
                </select>
              </div>
            </div>
          ))}
          <button
            className="mt-6 flex w-full justify-center rounded-full bg-amber-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white 
            shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
            onClick={addPrereqCourse}
          >
            Add Another Prerequisite
          </button>
        </div>
        {/* end prerequisites section */}

        <div>
          <button
            className="mt-6 flex w-full justify-center rounded-full bg-amber-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
            hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
            onClick={newRecord}
          >
            Create new course plan
          </button>
        </div>
      </div>
      {/* END OF: submit new student record */}
  </div>
</main>
);
}