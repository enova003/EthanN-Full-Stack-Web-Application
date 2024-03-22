import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Advising() {
    const [coursePlans, setCoursePlans] = useState("");
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        setStudentName(name);
        fetchCoursePlans();
    });

    const fetchCoursePlans = async () => {
        try {
            const getPlans = await axios.get(`http://localhost:8080/courseadvising/${studentName}`);
            setCoursePlans(getPlans.data);
        } catch (error) {
            console.error(error);
        }
    };

    const rejected = async (id) => {

        let reasonForRejection = prompt("Please explain the reason for rejecting this student. \n")

        const formBody = JSON.stringify({
          status: "Rejected",
          rejectionReason: reasonForRejection,
        })
    
        try {
          const response = await axios.put(`http://localhost:8080/courseadvising/${id}`, formBody, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
    
          if(response.status == 200){
            alert("Status updated to rejected.  An email has been sent to the student informing them of a change to their profile.");
            window.location.reload();
          }
    
          else{
            alert("Error: unable to update status")
          }
    
        } catch (error) {
          alert(error);
        }
      }

      const approved = async (id) => {

        let reasonForRejection = "N/A";

        const formBody = JSON.stringify({
          status: "Approved",
          rejectionReason: reasonForRejection,
        })
    
        try {
          const response = await axios.put(`http://localhost:8080/courseadvising/${id}`, formBody, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
    
          if(response.status == 200){
            alert("Status updated to approved.  An email has been sent to the student informing them of a change to their profile.");
            window.location.reload();
          }
    
          else{
            alert("Error: unable to update status")
          }
    
        } catch (error) {
          alert(error);
        }
      }

    return (
        <main className="text-black mt-4">
        <div className='mb-6 text-center'>
            <p>
                The purpose of this page is to approve or reject the course <br></br>
                adivisng sheets for <strong>{studentName}</strong>.  Please click on the corresponding
                <br></br> button to approve or reject each one of <strong>{studentName}'s</strong> requested terms.

                <br></br><br></br> <b>Note: </b>you can not change the status once approved or rejected.
            </p>
        </div>    
            {coursePlans.length > 0 ? (
              <div className="mb-6 bg-stone-400 rounded-3xl py-2 pl-10 pr-72">
                  <div className="flex flex-row justify-between mb-6">
                      <p className="mr-10" style={{ minWidth: '20%' }}><strong>Student Name</strong></p>
                      <p className="mr-4" style={{ minWidth: '20%' }}><strong>Term</strong></p>
                      <p className="mr-4" style={{ minWidth: '20%' }}><strong>Classes</strong></p>
                      <p className="mr-4" style={{ minWidth: '20%' }}><strong>Prerequisites</strong></p>
                      <p className="mr-4" style={{ minWidth: '20%' }}><strong>Status</strong></p>
                  </div>
                  {coursePlans.map((plan) => (
                      <div key={plan.id}>
                        {plan.status == "Pending" && (
                          <section className="mb-1">
                              <div className="flex flex-row justify-between">
                                  <p className="mr-10" style={{ minWidth: '20%' }}>{plan.student_name}</p>
                                  <p className="mr-4" style={{ minWidth: '20%' }}>{plan.current_term}</p>
                                  <p className="mr-4" style={{ minWidth: '20%' }}>{plan.planned_courses}</p>
                                  <p className="mr-4" style={{ minWidth: '20%' }}>{plan.prerequisites}</p>
                                  <p className="mr-4" style={{ minWidth: '20%' }}>{plan.status}</p>
                                  <div>
                                    <button className='bg-green-600 text-white mr-3 rounded-3xl py-1 px-2 hover:bg-green-700' onClick={() => approved(plan.id)}>Approve</button>
                                  </div>
                                  <div>
                                    <button className='bg-red-600 text-white rounded-3xl py-1 px-2 hover:bg-red-700' onClick={() => rejected(plan.id)}>Reject</button>
                                  </div>
                              </div>
                          </section>
                        )}
                      </div>
                  ))}
              </div>
            ) : null}
        </main>
    );
}