import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Advising() {
    const [coursePlans, setCoursePlans] = useState("");

    useEffect(() => {
        fetchCoursePlans();
    }, []);

    const fetchCoursePlans = async () => {
        try {
            const getPlans = await axios.get(`http://localhost:8080/courseadvising/`);
            setCoursePlans(getPlans.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="text-black mt-4">
            <p className='mb-6 text-center'>
                
                Please click on a student's name to update the status 
                <br></br>and see additional information about the advising records

                <br></br><br></br>If the status is "Rejected",<b><em> hover over the word "Rejected"</em></b> to
                <br></br> display the admin note explaining the reason for rejection.
            
            </p>
            {coursePlans.length > 0 ? (
              <div className="mb-6 bg-stone-400 rounded-3xl py-2 pr-40 pl-10">
                  <div className="flex flex-row justify-between">
                      <p className="mr-20" style={{ minWidth: '33.3%' }}><strong>Student Name</strong></p>
                      <p className="mr-10" style={{ minWidth: '33.3%' }}><strong>Status</strong></p>
                      <p className="mr-10" style={{ minWidth: '33.3%' }}><strong>Term</strong></p>
                  </div>
                  {coursePlans.map((plan) => (
                      <div key={plan.id}>
                          <section className="mb-1">
                              <div className="flex flex-row justify-between">
                                  <a href={`http://localhost:3000/advising-sheet-status?name=${plan.student_name}`} className="mr-20 hover:underline" style={{ minWidth: '33.3%' }}>{plan.student_name}</a>
                                  <p className="mr-10" style={{ minWidth: '33.3%' }} title={plan.status === 'Rejected' ? plan.rejectionReason : ''}>{plan.status}</p>
                                  <p className="mr-10" style={{ minWidth: '33.3%' }}>{plan.current_term}</p>
                              </div>
                          </section>
                      </div>
                  ))}
              </div>
            ) : null}
        </main>
    );
}