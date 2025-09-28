import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [profiles, setProfiles] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch available profiles and the prompt on component mount
    const fetchData = async () => {
      try {
        const profilesRes = await fetch(`${API_URL}/profiles`);
        const profilesData = await profilesRes.json();
        setProfiles(profilesData.profiles || []);
        if (profilesData.profiles?.length > 0) {
          setSelectedProfile(profilesData.profiles[0]);
        }

        const promptRes = await fetch(`${API_URL}/prompt`);
        const promptData = await promptRes.json();
        setPrompt(promptData.prompt || '');
      } catch (e) {
        setError('Failed to fetch initial data from server.');
      }
    };
    fetchData();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedProfile) {
      setError('Please select a profile.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: selectedProfile,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get analysis from server.');
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', textAlign: 'left' }}>
      <main style={{ flex: 1 }}>
        <h1>Instagram Profile Reader</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
          <label>
            Profile to Analyze (Fixtures):
            <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} disabled={profiles.length === 0}>
              {profiles.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>
            OpenAI API Key (Optional):
            <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." />
          </label>
          <button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {analysisResult && (
          <div>
            <h2>Analysis Result for @{analysisResult.insights.username}</h2>
            <pre style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        )}
      </main>
      <aside style={{ flex: 1, backgroundColor: '#2f2f2f', padding: '1rem', borderRadius: '8px' }}>
        <h2>LLM Prompt</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {prompt || 'Loading prompt...'}
        </pre>
      </aside>
    </div>
  );
}

export default App;


