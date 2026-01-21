
import React, { useState, useEffect } from 'react';
import caseStudiesData from '../data/caseStudies.json';

const Admin: React.FC = () => {
    const [caseStudies, setCaseStudies] = useState(caseStudiesData);
    const firstStudyId = Object.keys(caseStudiesData)[0];
    const [selectedStudy, setSelectedStudy] = useState<string>(firstStudyId);
    const [editedData, setEditedData] = useState<any>(caseStudiesData[firstStudyId as keyof typeof caseStudiesData]);

    useEffect(() => {
        setEditedData(caseStudies[selectedStudy as keyof typeof caseStudies]);
    }, [selectedStudy, caseStudies]);

    const handleDownload = () => {
        const dataStr = JSON.stringify(caseStudies, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'caseStudies.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleSave = () => {
        setCaseStudies({
            ...caseStudies,
            [selectedStudy]: editedData
        });
        alert('Changes saved! Click "Download JSON" to get the updated file.');
    };

    const updateField = (path: string[], value: string) => {
        const newData = JSON.parse(JSON.stringify(editedData));
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setEditedData(newData);
    };

    const updateArrayItem = (path: string[], index: number, field: string, value: string) => {
        const newData = JSON.parse(JSON.stringify(editedData));
        let current = newData;
        for (const key of path) {
            current = current[key];
        }
        current[index][field] = value;
        setEditedData(newData);
    };

    const addArrayItem = (path: string[], template: any) => {
        const newData = JSON.parse(JSON.stringify(editedData));
        let current = newData;
        for (const key of path) {
            current = current[key];
        }
        current.push(template);
        setEditedData(newData);
    };

    const removeArrayItem = (path: string[], index: number) => {
        const newData = JSON.parse(JSON.stringify(editedData));
        let current = newData;
        for (const key of path) {
            current = current[key];
        }
        current.splice(index, 1);
        setEditedData(newData);
    };

    return (
        <main className="min-h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-stone-900 text-white px-6 md:px-12 py-6">
                <div className="max-w-[1440px] mx-auto">
                    <h1 className="text-3xl font-bold tracking-wider">CASE STUDY ADMIN</h1>
                    <p className="text-stone-400 text-sm mt-2">Edit your case studies and download the updated JSON file</p>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                {/* Controls */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <select
                        value={selectedStudy}
                        onChange={(e) => setSelectedStudy(e.target.value)}
                        className="px-4 py-2 border border-stone-300 bg-white text-sm font-medium"
                    >
                        {Object.keys(caseStudies).map((studyId) => (
                            <option key={studyId} value={studyId}>
                                {(caseStudies[studyId as keyof typeof caseStudies] as any)?.heroTitle || studyId}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-stone-900 text-white text-sm font-bold tracking-wider uppercase hover:bg-stone-800"
                    >
                        Save Changes
                    </button>

                    <button
                        onClick={handleDownload}
                        className="px-6 py-2 bg-green-600 text-white text-sm font-bold tracking-wider uppercase hover:bg-green-700"
                    >
                        Download JSON
                    </button>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 p-6 mb-8 text-sm">
                    <h3 className="font-bold text-blue-900 mb-2">📝 How to Use:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-blue-800">
                        <li>Select a case study from the dropdown</li>
                        <li>Edit the fields below</li>
                        <li>Click "Save Changes" to update the data</li>
                        <li>Click "Download JSON" to get the updated file</li>
                        <li>Replace <code className="bg-blue-100 px-1">data/caseStudies.json</code> with your downloaded file</li>
                        <li>Commit and push to deploy</li>
                    </ol>
                </div>

                {/* Editor */}
                <div className="space-y-8">
                    {/* Hero Section */}
                    {editedData.heroTitle && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">Hero Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">HERO TITLE</label>
                                    <input
                                        type="text"
                                        value={editedData.heroTitle || ''}
                                        onChange={(e) => updateField(['heroTitle'], e.target.value)}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">HERO SUBTITLE</label>
                                    <input
                                        type="text"
                                        value={editedData.heroSubtitle || ''}
                                        onChange={(e) => updateField(['heroSubtitle'], e.target.value)}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 1: Context */}
                    {editedData.context && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">01 — The Context</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">BACKGROUND</label>
                                    <textarea
                                        value={editedData.context.background || ''}
                                        onChange={(e) => updateField(['context', 'background'], e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">THE ASK</label>
                                    <textarea
                                        value={editedData.context.ask || ''}
                                        onChange={(e) => updateField(['context', 'ask'], e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">THE PROBLEM</label>
                                    <textarea
                                        value={editedData.context.problem || ''}
                                        onChange={(e) => updateField(['context', 'problem'], e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 2: Investigation */}
                    {editedData.investigation && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">02 — The Investigation</h2>

                            {/* Research Methods */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold text-stone-600">RESEARCH METHODS</label>
                                    <button
                                        onClick={() => addArrayItem(['investigation', 'researchMethods'], { title: '', description: '' })}
                                        className="text-xs px-3 py-1 bg-stone-200 hover:bg-stone-300"
                                    >
                                        + Add Method
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {editedData.investigation.researchMethods?.map((method: any, i: number) => (
                                        <div key={i} className="border border-stone-200 p-3 relative">
                                            <button
                                                onClick={() => removeArrayItem(['investigation', 'researchMethods'], i)}
                                                className="absolute top-2 right-2 text-red-600 text-xs hover:text-red-800"
                                            >
                                                ✕ Remove
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={method.title}
                                                onChange={(e) => updateArrayItem(['investigation', 'researchMethods'], i, 'title', e.target.value)}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm mb-2 font-medium"
                                            />
                                            <textarea
                                                placeholder="Description"
                                                value={method.description}
                                                onChange={(e) => updateArrayItem(['investigation', 'researchMethods'], i, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Points */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold text-stone-600">KEY DATA POINTS</label>
                                    <button
                                        onClick={() => addArrayItem(['investigation', 'dataPoints'], { label: '', value: '', description: '' })}
                                        className="text-xs px-3 py-1 bg-stone-200 hover:bg-stone-300"
                                    >
                                        + Add Data Point
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {editedData.investigation.dataPoints?.map((point: any, i: number) => (
                                        <div key={i} className="border border-stone-200 p-3 relative">
                                            <button
                                                onClick={() => removeArrayItem(['investigation', 'dataPoints'], i)}
                                                className="absolute top-2 right-2 text-red-600 text-xs hover:text-red-800"
                                            >
                                                ✕ Remove
                                            </button>
                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={point.label}
                                                    onChange={(e) => updateArrayItem(['investigation', 'dataPoints'], i, 'label', e.target.value)}
                                                    className="px-2 py-1 border border-stone-300 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Value"
                                                    value={point.value}
                                                    onChange={(e) => updateArrayItem(['investigation', 'dataPoints'], i, 'value', e.target.value)}
                                                    className="px-2 py-1 border border-stone-300 text-sm font-bold"
                                                />
                                            </div>
                                            <textarea
                                                placeholder="Description"
                                                value={point.description}
                                                onChange={(e) => updateArrayItem(['investigation', 'dataPoints'], i, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 3: Pivot */}
                    {editedData.pivot && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">03 — The Pivot</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">THE INSIGHT</label>
                                    <textarea
                                        value={editedData.pivot.insight || ''}
                                        onChange={(e) => updateField(['pivot', 'insight'], e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">THE STRATEGY</label>
                                    <textarea
                                        value={editedData.pivot.strategy || ''}
                                        onChange={(e) => updateField(['pivot', 'strategy'], e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 4: Solution */}
                    {editedData.solution && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">04 — The Solution</h2>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">CONCEPT NAME</label>
                                    <input
                                        type="text"
                                        value={editedData.solution.conceptName || ''}
                                        onChange={(e) => updateField(['solution', 'conceptName'], e.target.value)}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-600 mb-1">CONCEPT</label>
                                    <textarea
                                        value={editedData.solution.concept || ''}
                                        onChange={(e) => updateField(['solution', 'concept'], e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-stone-300 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Execution Items */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold text-stone-600">EXECUTION</label>
                                    <button
                                        onClick={() => addArrayItem(['solution', 'execution'], { title: '', description: '' })}
                                        className="text-xs px-3 py-1 bg-stone-200 hover:bg-stone-300"
                                    >
                                        + Add Item
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {editedData.solution.execution?.map((item: any, i: number) => (
                                        <div key={i} className="border border-stone-200 p-3 relative">
                                            <button
                                                onClick={() => removeArrayItem(['solution', 'execution'], i)}
                                                className="absolute top-2 right-2 text-red-600 text-xs hover:text-red-800"
                                            >
                                                ✕ Remove
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={item.title}
                                                onChange={(e) => updateArrayItem(['solution', 'execution'], i, 'title', e.target.value)}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm mb-2 font-medium"
                                            />
                                            <textarea
                                                placeholder="Description"
                                                value={item.description}
                                                onChange={(e) => updateArrayItem(['solution', 'execution'], i, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 5: Impact */}
                    {editedData.impact && (
                        <div className="bg-white p-6 border border-stone-200">
                            <h2 className="text-xl font-bold mb-4 text-stone-900">05 — The Impact</h2>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold text-stone-600">BUSINESS BENEFITS</label>
                                    <button
                                        onClick={() => addArrayItem(['impact', 'benefits'], { title: '', description: '' })}
                                        className="text-xs px-3 py-1 bg-stone-200 hover:bg-stone-300"
                                    >
                                        + Add Benefit
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {editedData.impact.benefits?.map((benefit: any, i: number) => (
                                        <div key={i} className="border border-stone-200 p-3 relative">
                                            <button
                                                onClick={() => removeArrayItem(['impact', 'benefits'], i)}
                                                className="absolute top-2 right-2 text-red-600 text-xs hover:text-red-800"
                                            >
                                                ✕ Remove
                                            </button>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={benefit.title}
                                                onChange={(e) => updateArrayItem(['impact', 'benefits'], i, 'title', e.target.value)}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm mb-2 font-medium"
                                            />
                                            <textarea
                                                placeholder="Description"
                                                value={benefit.description}
                                                onChange={(e) => updateArrayItem(['impact', 'benefits'], i, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full px-2 py-1 border border-stone-300 text-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Actions */}
                <div className="flex gap-4 mt-8 pt-8 border-t border-stone-200">
                    <button
                        onClick={handleSave}
                        className="px-8 py-3 bg-stone-900 text-white text-sm font-bold tracking-wider uppercase hover:bg-stone-800"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDownload}
                        className="px-8 py-3 bg-green-600 text-white text-sm font-bold tracking-wider uppercase hover:bg-green-700"
                    >
                        Download JSON
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Admin;
