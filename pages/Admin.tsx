
import React, { useState, useEffect } from 'react';
import caseStudiesData from '../data/caseStudies.json';

const PASSCODE = '1989';
const GITHUB_REPO = 'bnpattara/benn-pattara-portfolio-2';

// Case study template for AI generation
const CASE_STUDY_TEMPLATE = {
    published: true,
    isNewSectionFormat: true,
    heroTitle: "",
    heroSubtitle: "",
    context: {
        background: "",
        ask: "",
        problem: ""
    },
    investigation: {
        researchMethods: [{ title: "", description: "" }],
        dataPoints: [{ label: "", value: "", description: "" }]
    },
    pivot: {
        insight: "",
        strategy: ""
    },
    solution: {
        conceptName: "",
        concept: "",
        execution: [{ title: "", description: "" }]
    },
    impact: {
        benefits: [{ title: "", description: "" }]
    }
};

const Admin: React.FC = () => {
    // Authentication
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('admin_auth') === 'true';
    });
    const [passcodeInput, setPasscodeInput] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    // Tab state
    const [activeTab, setActiveTab] = useState<'editor' | 'generator'>('editor');

    // GitHub
    const [githubToken, setGithubToken] = useState(() => {
        return localStorage.getItem('github_pat') || '';
    });
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    // Case Studies
    const [caseStudies, setCaseStudies] = useState(caseStudiesData);
    const firstStudyId = Object.keys(caseStudiesData)[0];
    const [selectedStudy, setSelectedStudy] = useState<string>(firstStudyId);
    const [editedData, setEditedData] = useState<any>(caseStudiesData[firstStudyId as keyof typeof caseStudiesData]);

    // AI Generator
    const [geminiApiKey, setGeminiApiKey] = useState(() => {
        return localStorage.getItem('gemini_api_key') || '';
    });
    const [rawInput, setRawInput] = useState('');
    const [newStudyId, setNewStudyId] = useState('');
    const [generatedStudy, setGeneratedStudy] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatorStatus, setGeneratorStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    useEffect(() => {
        setEditedData(caseStudies[selectedStudy as keyof typeof caseStudies]);
    }, [selectedStudy, caseStudies]);

    // AI Generation function
    const handleGenerateCaseStudy = async () => {
        if (!geminiApiKey) {
            setGeneratorStatus({ type: 'error', message: 'Please enter your Gemini API key' });
            return;
        }
        if (!rawInput.trim()) {
            setGeneratorStatus({ type: 'error', message: 'Please paste your case study content' });
            return;
        }
        if (!newStudyId.trim()) {
            setGeneratorStatus({ type: 'error', message: 'Please enter a case study ID (e.g., "burberry-rsc")' });
            return;
        }

        setIsGenerating(true);
        setGeneratorStatus({ type: null, message: '' });
        setGeneratedStudy(null);

        try {
            const prompt = `You are a JSON formatter for a portfolio website. Your task is to extract information from the provided case study content and format it into a specific JSON structure.

Here is the required JSON structure:
${JSON.stringify(CASE_STUDY_TEMPLATE, null, 2)}

IMPORTANT INSTRUCTIONS:
1. Extract all relevant information from the input and map it to the appropriate fields
2. For "heroTitle": Use the main title/name of the project
3. For "heroSubtitle": Create a brief tagline summarizing the project
4. For "context.background": The setup/background information
5. For "context.ask": The main question or challenge
6. For "context.problem": The problem statement
7. For "investigation.researchMethods": Array of research methods used (title + description each)
8. For "investigation.dataPoints": Key statistics or findings (label, value, description each)
9. For "pivot.insight": The key insight discovered
10. For "pivot.strategy": The strategic approach
11. For "solution.conceptName": The name of the solution/concept
12. For "solution.concept": Description of the concept
13. For "solution.execution": Array of execution elements (title + description each)
14. For "impact.benefits": Array of business benefits (title + description each)

Return ONLY valid JSON, no markdown, no explanation, just the JSON object.

INPUT CONTENT:
${rawInput}`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.3,
                            maxOutputTokens: 8192,
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!generatedText) {
                throw new Error('No response from AI');
            }

            // Clean up the response (remove markdown code blocks if present)
            let cleanJson = generatedText.trim();
            if (cleanJson.startsWith('```json')) {
                cleanJson = cleanJson.slice(7);
            }
            if (cleanJson.startsWith('```')) {
                cleanJson = cleanJson.slice(3);
            }
            if (cleanJson.endsWith('```')) {
                cleanJson = cleanJson.slice(0, -3);
            }

            const parsed = JSON.parse(cleanJson.trim());
            setGeneratedStudy(parsed);
            localStorage.setItem('gemini_api_key', geminiApiKey);
            setGeneratorStatus({ type: 'success', message: 'Case study generated! Review below and click "Add to Case Studies" to save.' });

        } catch (error: any) {
            setGeneratorStatus({ type: 'error', message: `Generation failed: ${error.message}` });
        } finally {
            setIsGenerating(false);
        }
    };

    // Add generated study to case studies
    const handleAddGeneratedStudy = () => {
        if (!generatedStudy || !newStudyId.trim()) return;

        const updatedStudies = {
            ...caseStudies,
            [newStudyId.toLowerCase().replace(/\s+/g, '-')]: generatedStudy
        };

        setCaseStudies(updatedStudies);
        setGeneratorStatus({ type: 'success', message: `Added "${newStudyId}" to case studies! Go to Editor tab to review, then Publish to GitHub.` });
        setGeneratedStudy(null);
        setRawInput('');
        setNewStudyId('');
    };

    // Passcode check
    const handlePasscodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcodeInput === PASSCODE) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setPasscodeError('');
        } else {
            setPasscodeError('Incorrect passcode');
        }
    };

    // GitHub API: Publish changes
    const handlePublishToGitHub = async () => {
        if (!githubToken) {
            setShowTokenInput(true);
            return;
        }

        setIsPublishing(true);
        setPublishStatus({ type: null, message: '' });

        try {
            const filePath = 'data/caseStudies.json';
            const content = JSON.stringify(caseStudies, null, 2);
            const base64Content = btoa(unescape(encodeURIComponent(content)));

            // Get current file SHA
            const getFileResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
                {
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                    },
                }
            );

            if (!getFileResponse.ok && getFileResponse.status !== 404) {
                throw new Error('Failed to fetch current file');
            }

            const fileData = await getFileResponse.json();
            const sha = fileData.sha;

            // Update file
            const updateResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Update case studies via Admin panel`,
                        content: base64Content,
                        sha: sha,
                        branch: 'main',
                    }),
                }
            );

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.message || 'Failed to update file');
            }

            // Also update public/caseStudies.json
            const publicFilePath = 'public/caseStudies.json';
            const getPublicFileResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_REPO}/contents/${publicFilePath}`,
                {
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                    },
                }
            );

            if (getPublicFileResponse.ok) {
                const publicFileData = await getPublicFileResponse.json();
                await fetch(
                    `https://api.github.com/repos/${GITHUB_REPO}/contents/${publicFilePath}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `token ${githubToken}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: `Sync public case studies via Admin panel`,
                            content: base64Content,
                            sha: publicFileData.sha,
                            branch: 'main',
                        }),
                    }
                );
            }

            setPublishStatus({
                type: 'success',
                message: 'Published successfully! Changes will be live in ~2 minutes after GitHub Pages rebuilds.'
            });
            localStorage.setItem('github_pat', githubToken);
        } catch (error: any) {
            setPublishStatus({
                type: 'error',
                message: `Failed to publish: ${error.message}`
            });
        } finally {
            setIsPublishing(false);
        }
    };

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
        setPublishStatus({ type: null, message: '' });
        alert('Changes saved locally! Click "Publish to GitHub" to make them live.');
    };

    // Passcode Gate
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-stone-900 flex items-center justify-center">
                <div className="bg-white p-8 max-w-md w-full mx-4">
                    <h1 className="text-2xl font-bold tracking-wider text-stone-900 mb-2">ADMIN ACCESS</h1>
                    <p className="text-stone-500 text-sm mb-6">Enter passcode to continue</p>
                    <form onSubmit={handlePasscodeSubmit}>
                        <input
                            type="password"
                            value={passcodeInput}
                            onChange={(e) => setPasscodeInput(e.target.value)}
                            placeholder="Enter passcode"
                            className="w-full px-4 py-3 border border-stone-300 text-lg tracking-widest mb-4"
                            autoFocus
                        />
                        {passcodeError && (
                            <p className="text-red-600 text-sm mb-4">{passcodeError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 bg-stone-900 text-white font-bold tracking-wider uppercase hover:bg-stone-800"
                        >
                            Enter
                        </button>
                    </form>
                </div>
            </main>
        );
    }

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
                    <p className="text-stone-400 text-sm mt-2">Edit case studies or generate new ones with AI</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-stone-200 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto flex gap-0">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={`px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'editor'
                            ? 'border-stone-900 text-stone-900'
                            : 'border-transparent text-stone-400 hover:text-stone-600'
                            }`}
                    >
                        📝 Case Study Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('generator')}
                        className={`px-6 py-4 text-sm font-bold tracking-wider uppercase border-b-2 transition-all ${activeTab === 'generator'
                            ? 'border-stone-900 text-stone-900'
                            : 'border-transparent text-stone-400 hover:text-stone-600'
                            }`}
                    >
                        ✨ AI Generator (Experimental)
                    </button>
                </div>
            </div>

            {/* Generator Tab */}
            {activeTab === 'generator' && (
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 mb-8">
                        <h2 className="text-xl font-bold text-purple-900 mb-2">✨ AI Case Study Generator</h2>
                        <p className="text-purple-700 text-sm">
                            Paste your case study content below (any format: notes, bullet points, full write-up) and AI will format it into the correct structure.
                        </p>
                    </div>

                    {/* Gemini API Key */}
                    <div className="bg-white border border-stone-200 p-6 mb-6">
                        <label className="block text-xs font-bold text-stone-600 mb-2">GEMINI API KEY</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                                placeholder="Enter your Gemini API key"
                                className="flex-1 px-3 py-2 border border-stone-300 text-sm"
                            />
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200"
                            >
                                Get API Key →
                            </a>
                        </div>
                        <p className="text-xs text-stone-400 mt-2">Your key is saved locally in your browser.</p>
                    </div>

                    {/* Case Study ID */}
                    <div className="bg-white border border-stone-200 p-6 mb-6">
                        <label className="block text-xs font-bold text-stone-600 mb-2">CASE STUDY ID</label>
                        <input
                            type="text"
                            value={newStudyId}
                            onChange={(e) => setNewStudyId(e.target.value)}
                            placeholder="e.g., burberry-rsc, nike-snkrs, on-apex"
                            className="w-full px-3 py-2 border border-stone-300 text-sm"
                        />
                        <p className="text-xs text-stone-400 mt-2">Use lowercase with hyphens. This becomes the URL slug.</p>
                    </div>

                    {/* Raw Input */}
                    <div className="bg-white border border-stone-200 p-6 mb-6">
                        <label className="block text-xs font-bold text-stone-600 mb-2">PASTE YOUR CASE STUDY CONTENT</label>
                        <textarea
                            value={rawInput}
                            onChange={(e) => setRawInput(e.target.value)}
                            placeholder="Paste your case study content here... 

Can be any format:
- Raw notes
- Bullet points
- Full write-up
- Structured sections

The AI will extract and format everything automatically."
                            rows={15}
                            className="w-full px-3 py-2 border border-stone-300 text-sm font-mono"
                        />
                        <p className="text-xs text-stone-400 mt-2">{rawInput.length} characters</p>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerateCaseStudy}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold tracking-wider uppercase hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                        {isGenerating ? '✨ Generating...' : '✨ Generate Case Study with AI'}
                    </button>

                    {/* Status */}
                    {generatorStatus.type && (
                        <div className={`p-4 mb-6 ${generatorStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <p className={`text-sm ${generatorStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                {generatorStatus.message}
                            </p>
                        </div>
                    )}

                    {/* Generated Preview */}
                    {generatedStudy && (
                        <div className="bg-white border border-stone-200 p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-stone-900">Generated Case Study Preview</h3>
                                <button
                                    onClick={handleAddGeneratedStudy}
                                    className="px-6 py-2 bg-green-600 text-white text-sm font-bold tracking-wider uppercase hover:bg-green-700"
                                >
                                    ✅ Add to Case Studies
                                </button>
                            </div>
                            <div className="bg-stone-50 p-4 rounded overflow-auto max-h-96">
                                <pre className="text-xs text-stone-700 whitespace-pre-wrap">
                                    {JSON.stringify(generatedStudy, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Editor Tab */}
            {activeTab === 'editor' && (
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                    {/* Controls */}
                    <div className="flex flex-wrap gap-4 mb-4">
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
                            onClick={handlePublishToGitHub}
                            disabled={isPublishing}
                            className="px-6 py-2 bg-blue-600 text-white text-sm font-bold tracking-wider uppercase hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPublishing ? 'Publishing...' : '🚀 Publish to GitHub'}
                        </button>

                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-stone-200 text-stone-700 text-sm font-bold tracking-wider uppercase hover:bg-stone-300"
                        >
                            Download JSON
                        </button>
                    </div>

                    {/* GitHub Token Input */}
                    {showTokenInput && !githubToken && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-4">
                            <h4 className="font-bold text-yellow-900 text-sm mb-2">🔑 GitHub Token Required</h4>
                            <p className="text-yellow-800 text-xs mb-3">
                                To publish directly, you need a GitHub Personal Access Token with 'repo' permissions.
                                <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                                    Create one here →
                                </a>
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    value={githubToken}
                                    onChange={(e) => setGithubToken(e.target.value)}
                                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                    className="flex-1 px-3 py-2 border border-yellow-300 text-sm"
                                />
                                <button
                                    onClick={() => {
                                        if (githubToken) {
                                            localStorage.setItem('github_pat', githubToken);
                                            setShowTokenInput(false);
                                            handlePublishToGitHub();
                                        }
                                    }}
                                    className="px-4 py-2 bg-yellow-600 text-white text-sm font-bold hover:bg-yellow-700"
                                >
                                    Save & Publish
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Publish Status */}
                    {publishStatus.type && (
                        <div className={`p-4 mb-4 ${publishStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <p className={`text-sm ${publishStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                {publishStatus.message}
                            </p>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 p-6 mb-8 text-sm">
                        <h3 className="font-bold text-blue-900 mb-2">📝 How to Use:</h3>
                        <ol className="list-decimal list-inside space-y-1 text-blue-800">
                            <li>Select a case study from the dropdown</li>
                            <li>Edit the fields below</li>
                            <li>Click "Save Changes" to save your edits</li>
                            <li>Click "🚀 Publish to GitHub" to make changes live (requires GitHub token)</li>
                        </ol>
                        <p className="mt-3 text-blue-600 text-xs">
                            After publishing, changes will be live in ~2 minutes once GitHub Pages rebuilds.
                        </p>
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
            )}
        </main>
    );
};

export default Admin;
