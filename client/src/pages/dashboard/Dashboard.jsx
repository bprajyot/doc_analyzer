import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { documentApi, riskApi } from "../../libs/apis";
import { Link } from 'react-router-dom';

function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [riskyDocs, setRiskyDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch both in parallel for better performance
        const [docsData, riskyData] = await Promise.all([
          documentApi.getAllDocs(),
          riskApi.getAllRiskyDocs(),
        ]);

        setDocs(docsData);
        setRiskyDocs(riskyData);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <Navbar />
        <Loading />
      </div>
    );

  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Navbar />
      <div className="pt-20 flex flex-col items-center p-10">
        <div className="w-full my-5 border border-white rounded-2xl shadow-xl p-6">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white text-center">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-1 text-3xl font-extrabold">{docs.length}</dt>
              <dd className="text-green-500">Total Documents</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-1 text-3xl font-extrabold">{riskyDocs.length}</dt>
              <dd className="text-red-500">Risky Documents</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-1 text-3xl font-bold">5.5s</dt>
              <dd className="text-blue-500">Average Time Taken</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full">
          <div className="flex-1">
            <div className="w-full mt-10 text-white">
              <h2 className="text-xl font-bold mb-3">Documents</h2>
              {docs.length === 0 ? (
                <p>No documents found.</p>
              ) : (
                <ul className="space-y-2 border-2 border-gray-500 p-2 rounded-xl">
                  {docs.map((doc) => (
                    <li
                      key={doc.id}
                      className="border border-gray-600 shadow-xl rounded-lg p-3 flex justify-between items-center space-x-2"
                    >
                      <span className='flex justify-start items-center space-x-2'>
                        <svg
                          className="w-4 h-4 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
                          />
                        </svg>
                        <span>{doc.filename}</span>
                      </span>
                      <Link to={`/document_summary/${doc.id}`} className="text-xs text-blue-400 underline italic  py-1 rounded-md">
                        <p>get details...</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full mt-10 text-white">
              <h2 className="text-xl font-bold mb-3">Risk Reports</h2>
              {riskyDocs.length === 0 ? (
                <p>No risky documents found.</p>
              ) : (
                <ul className="space-y-2 border-2 border-gray-500 p-2 rounded-xl">
                  {riskyDocs.map((doc) => (
                    <li
                      key={doc.id}
                      className="border border-gray-600 shadow-xl rounded-lg p-3 flex justify-between items-center space-x-2"
                    >
                      <span className='flex justify-start items-center space-x-2'>
                        <svg
                          className="w-4 h-4 text-gray-800 dark:text-red-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
                          />
                        </svg>
                        <span>{doc.document.filename}</span>
                      </span>
                      <Link to={`/risk_report/${doc.id}`} className="text-xs text-red-400 underline italic">
                        <p>get details...</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
