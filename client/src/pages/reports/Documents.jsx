import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Loading from '../../components/Loading'
import { documentApi, riskApi } from '../../libs/apis';
import { Link } from 'react-router-dom';


function Documents() {
    const [docs, setDocs] = useState([]);
    const [riskyDocs, setRiskyDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
        <div className='min-h-screen bg-gray-800 text-white'>
            {console.log(docs)}
            <Navbar />
            <div className='pt-25 items-center p-10'>
                <div >
                    <div className="w-full mt-10 text-white">
                        <h2 className="text-3xl text-center font-bold mb-3">Documents</h2>
                        {docs.length === 0 ? (
                            <p>No documents found.</p>
                        ) : (
                            <ul className="space-y-2 border-2 border-gray-500 p-2 rounded-xl">
                                {docs.map((doc) => (
                                    <li
                                        key={doc.id}
                                        className="border border-gray-600 shadow-xl rounded-lg p-3 text-justify space-x-2"
                                    >
                                        <div className='flex justify-start items-center space-x-2 text-lg'>
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
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
                                        </div>
                                        <div className='mt-2'>
                                            {doc.summary}
                                        </div>
                                        <Link to={`/documents/${doc.id}`}className='mt-1 italic text-blue-500 text-sm'>
                                            read more..
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Documents
