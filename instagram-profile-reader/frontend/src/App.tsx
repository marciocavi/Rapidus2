import { useState, useEffect } from 'react';
import './App.css';
import { AnalysisResult } from './components/AnalysisResult';

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
    const fetchData = async () => {
      console.log('Fetching initial data...');
      try {
        const profilesRes = await fetch(`${API_URL}/profiles`);
        if (!profilesRes.ok) throw new Error('Failed to fetch profiles');
        const profilesData = await profilesRes.json();
        console.log('Profiles received:', profilesData);
        setProfiles(profilesData.profiles || []);
        if (profilesData.profiles?.length > 0) {
          setSelectedProfile(profilesData.profiles[0]);
        }

        const promptRes = await fetch(`${API_URL}/prompt`);
        if (!promptRes.ok) throw new Error('Failed to fetch prompt');
        const promptData = await promptRes.json();
        console.log('Prompt received.');
        setPrompt(promptData.prompt || '');
      } catch (e: any) {
        console.error('Error fetching initial data:', e);
        setError('Failed to fetch initial data from server. Is the server running?');
      }
    };
    fetchData();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedProfile) {
      setError('Please select a profile.');
      return;
    }
    console.log(`Analyzing '${selectedProfile}'...`);
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get analysis from server.');
      }

      const data = await response.json();
      console.log('Analysis result:', data);
      setAnalysisResult(data);
    } catch (e: any) {
      console.error('Error during analysis:', e);
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', textAlign: 'left', width: '100%' }}>
      <main style={{ flex: 2 }}>
        <h1>Instagram Profile Reader</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', maxWidth: '400px' }}>
          <label>
            Profile to Analyze (Fixtures):
            <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} disabled={profiles.length === 0} style={{ width: '100%', padding: '8px', marginTop: '4px' }}>
              {profiles.length > 0 ? profiles.map(p => <option key={p} value={p}>{p}</option>) : <option>Loading...</option>}
            </select>
          </label>
          <label>
            OpenAI API Key (Optional):
            <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." style={{ width: '100%', padding: '8px', marginTop: '4px' }} />
          </label>
          <button onClick={handleAnalyze} disabled={isLoading} style={{ padding: '10px' }}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && <div style={{ color: '#ff7b7b', marginTop: '1rem' }}>Error: {error}</div>}

        {analysisResult && <AnalysisResult result={analysisResult} />}
      </main>
      <aside style={{ flex: 1, backgroundColor: '#1e1e1e', padding: '1rem', borderRadius: '8px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2>LLM Prompt</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {prompt || 'Loading prompt...'}
        </pre>
      </aside>
    </div>
  );
}

export default App;
