import React, { useEffect, useState } from 'react';

import './CompanyList.css';
 
const CompanyList = ({ userId }) => {

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
 
  useEffect(() => {

    fetch(`https://localhost:7287/api/delegation/${userId}`)

      .then(res => {

        if (!res.ok) throw new Error('API error');

        return res.json();

      })

      .then(data => {

        setCompanies(data);

        setLoading(false);

      })

      .catch(err => {

        console.error('Failed to load data', err);

        setError('שגיאה בטעינת הנתונים');

        setLoading(false);

      });

  }, [userId]);
 
  return (
    <div className="company-container" dir="rtl">
      <header className="company-header">
        שלום, הנך צופה בנתונים האישים של ישראל ישראלי  – {userId}
      </header>

      <main className="company-content">
        {loading ? (
          <p className="status-message">טוען נתונים...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : companies.length === 0 ? (
          <p className="status-message">אין חברות להצגה</p>
        ) : (
          <section className="company-list">
            {companies.map((company, index) => (
              <article className="company-card" key={company.companyNumber}>
                <div className="company-header-row">
                  <div className="company-info">
                    <h3 className="company-name-row">
                      <span className="company-name">
                        {company.companyName}
                      </span>
                      {" "}
                      <span className="company-index">{index + 1}</span>
                      <span className="company-number">
                        {company.companyNumber}
                      </span>
                    </h3>
                    <p className="company-date">26/06/2025</p>
                  </div>
                  <div className="button-wrapper">
                    <button
                      className="primary-button"
                      aria-label={`הגדר משתמשים עבור ${company.companyName}`}
                    >
                      הגדר משתמשים עבור צפייה בחברה
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );

};
 
export default CompanyList;

 