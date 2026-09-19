import React, { useState } from 'react';
import { kssmNotes } from '../data/notes';
import { ChevronDown, ChevronUp } from 'lucide-react';

function NotaModul() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="panel" style={{ backgroundColor: 'var(--primary-blue)', color: 'white' }}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', textShadow: '2px 2px 0 #000' }}>Nota Ringkas Tingkatan 4</h2>
        <p style={{ fontWeight: 'bold' }}>Klik pada setiap modul untuk membaca nota secara terperinci.</p>
      </div>

      <div className="notes-list">
        {kssmNotes.map(nota => (
          <div key={nota.id} className="panel" style={{ padding: '0' }}>
            <div 
              className="panel-header flex justify-between items-center" 
              style={{ padding: '1.5rem', marginBottom: '0', cursor: 'pointer', borderBottom: expandedId === nota.id ? '3px solid var(--border-color)' : 'none' }}
              onClick={() => toggleExpand(nota.id)}
            >
              <span>{nota.title}</span>
              {expandedId === nota.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedId === nota.id && (
              <div 
                style={{ padding: '1.5rem' }} 
                dangerouslySetInnerHTML={{ __html: nota.content }} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotaModul;
