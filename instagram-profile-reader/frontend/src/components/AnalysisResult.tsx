interface AnalysisResultProps {
  result: any;
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  borderBottom: '1px solid #444',
  paddingBottom: '0.5rem',
};

const paletteContainer: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginTop: '1rem',
};

const colorSwatch: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '8px',
  border: '1px solid #555',
};

export function AnalysisResult({ result }: AnalysisResultProps) {
  if (!result || !result.insights) return null;

  const { insights } = result;

  return (
    <div>
      <h2>Analysis Result for @{insights.username}</h2>
      
      <div style={cardStyle}>
        <h3 style={titleStyle}>Tone of Voice</h3>
        <p>{insights.toneOfVoice}</p>
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>Headline Ideas</h3>
        <ul>
          {insights.headlineIdeas.map((idea: string, index: number) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>Keywords & Themes</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {insights.keywords.map((keyword: string, index: number) => (
            <span key={index} style={{ backgroundColor: '#333', padding: '4px 8px', borderRadius: '4px' }}>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={titleStyle}>Suggested Palette</h3>
        <div style={paletteContainer}>
          {insights.palette.map((color: { hex: string; name: string }, index: number) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ ...colorSwatch, backgroundColor: color.hex }} />
              <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>{color.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{color.hex}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


