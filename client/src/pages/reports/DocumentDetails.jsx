import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';
import { documentApi } from '../../libs/apis';

function DocumentDetails() {
    const { id } = useParams();
    const [doc, setDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                setLoading(true);
                const result = await documentApi.getDocById(id);
                setDoc(result);
            } catch (err) {
                console.error('Error fetching document:', err);
                setError(err.message || 'Failed to load document');
            } finally {
                setLoading(false);
            }
        };

        fetchDoc();
    }, [id]);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <Link to="/documents" className="text-blue-600 hover:underline">
                    Back to documents
                </Link>
            </div>
        );
    }

    if (!doc) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <div className="text-red-500 text-xl mb-4">Document not found</div>
                <Link to="/documents" className="text-blue-600 hover:underline">
                    Back to documents
                </Link>
            </div>
        );
    }

    const risks = doc?.risks || '';
    const risksList = risks.split('\n').filter(risk => risk.trim());
    const hasRisks = risks && !risks.includes('No issues found');

    return (
        <div className="min-h-screen dark:bg-gray-800 text-white">
            <Navbar />

            <div className="pt-25 flex flex-col items-center p-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6 w-full max-w-5xl">
                    <h1 className="text-3xl font-semibold wrap-break-word pr-4">{doc.filename}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Summary */}
                        <div className="bg-green-500 p-6 rounded-2xl shadow text-white text-justify">
                            <h2 className="text-xl font-semibold mb-4">Summary</h2>
                            <div className="whitespace-pre-line">{doc.summary}</div>
                        </div>

                        {/* Risk Assessment */}
                        <div className="text-justify bg-red-400 p-6 rounded-2xl shadow text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Risk Assessment</h2>
                                {hasRisks ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Risks Found
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        No Issues
                                    </span>
                                )}
                            </div>

                            {hasRisks ? (() => {
                                // Unescape and clean up text (convert \" → ", \\n → newline, etc.)
                                const cleanedText = risks
                                    .replace(/\\"/g, '"')   // fix escaped quotes
                                    .replace(/\\n/g, '\n')  // turn escaped newlines into real ones
                                    .trim();

                                // Split by newline
                                const lines = cleanedText.split('\n').filter(line => line.trim());

                                // Extract Risk Percentage if present
                                const riskPercentageLine = lines.find(line =>
                                    line.toLowerCase().includes('risk percentage')
                                );
                                const riskPercentage = riskPercentageLine
                                    ? riskPercentageLine.replace(/risk percentage[:\-]?\s*/i, '').trim()
                                    : null;

                                const riskItems = lines.filter(
                                    line => !line.toLowerCase().includes('risk percentage')
                                );

                                return (
                                    <>
                                        <ul className="list-disc list-inside space-y-1 text-white">
                                            {riskItems.map((risk, index) => (
                                                <li key={index}>{risk}</li>
                                            ))}
                                        </ul>

                                        {riskPercentage && (
                                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 font-medium">
                                                Risk Percentage: {riskPercentage}
                                            </div>
                                        )}
                                    </>
                                );
                            })() : (
                                <p className="text-green-700">
                                    No risk issues were identified in this document.
                                </p>
                            )}
                        </div>


                        {/* Actions */}
                        {/* <div className="bg-white p-6 rounded-lg shadow text-gray-800">
                            <h2 className="text-xl font-semibold mb-4">Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Request Review', icon: 'M12 8v4m0 4h.01M21 12a9...' },
                                    { label: 'Add Comment', icon: 'M8 12h.01M12 12h.01M16...' },
                                    { label: 'Generate Report', icon: 'M9 12h6m-6 4h6m2 5H7a2...' },
                                    { label: 'Set Alert', icon: 'M15 17h5l-1.405-1.405A2...' },
                                ].map((btn, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full p-3 bg-gray-100 rounded-md text-gray-700 font-medium hover:bg-gray-200 flex items-center justify-center"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d={btn.icon}
                                            />
                                        </svg>
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div> */}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Metadata */}
                        <div className="bg-gray-500 p-6 rounded-lg shadow text-white">
                            <h2 className="text-xl font-semibold mb-4">Metadata</h2>

                            {(() => {
                                let metadata = doc.metadata;

                                // If metadata is a string, try to parse it as JSON
                                if (typeof metadata === 'string') {
                                    try {
                                        metadata = JSON.parse(metadata);
                                    } catch (e) {
                                        console.error('Failed to parse metadata:', e);
                                        metadata = { raw: metadata };
                                    }
                                }

                                // Handle empty metadata
                                if (!metadata || Object.keys(metadata).length === 0) {
                                    return <p className="text-white">No metadata available.</p>;
                                }

                                return (
                                    <dl className="space-y-2">
                                        {Object.entries(metadata).map(([key, value]) => (
                                            <div key={key} className="grid grid-cols-3 gap-2">
                                                <dt className="text-sm font-semibold text-white truncate">
                                                    {key}
                                                </dt>
                                                <dd className="col-span-2 text-sm text-white wrap-break-word">
                                                    : {Array.isArray(value)
                                                        ? value.join(', ')
                                                        : value === null
                                                            ? '—'
                                                            : value.toString()}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                );
                            })()}
                        </div>

                        {/* Back Link */}
                        <div className="mb-6 border-gray-500 border-2 shadow-gray-500/50 shadow-md w-fit px-3 py-1 rounded-lg max-w-5xl">
                            <Link
                                to="/documents"
                                className="text-white text-sm hover: text-md flex items-center"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to documents
                            </Link>
                        </div>

                        {/* Activity */}
                        {/* <div className="bg-white p-6 rounded-lg shadow text-gray-800">
                            <h2 className="text-xl font-semibold mb-4">Activity</h2>
                            <div className="space-y-4">
                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-800">
                                            MA
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Document processed</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(doc.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-800">
                                            AI
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Risks analyzed</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(doc.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocumentDetails;
