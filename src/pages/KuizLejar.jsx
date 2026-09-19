import React, { useState, useEffect } from 'react';
import { spmTransactions, butirOptions } from '../data/transactions';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

function KuizLejar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizState, setQuizState] = useState("ENTRY"); // ENTRY, EVALUATED, BALANCING, BALANCING_EVALUATED, REVIEW
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  // Form State - Entry Phase
  const [debitDate, setDebitDate] = useState("");
  const [debitButir, setDebitButir] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  
  const [kreditDate, setKreditDate] = useState("");
  const [kreditButir, setKreditButir] = useState("");
  const [kreditAmount, setKreditAmount] = useState("");

  // Validation UI state
  const [feedback, setFeedback] = useState(null);

  // Balancing State
  const [bakiHbSide, setBakiHbSide] = useState(""); // 'debit' or 'kredit'
  const [bakiHbAmount, setBakiHbAmount] = useState("");
  const [totalVal, setTotalVal] = useState("");
  const [bakiBbSide, setBakiBbSide] = useState("");
  const [bakiBbAmount, setBakiBbAmount] = useState("");

  useEffect(() => {
    // Load score from localStorage if exists on mount
    const savedScore = localStorage.getItem('akaunScore');
    if (savedScore) {
      // Just showing we could load it, but usually quiz starts at 0 for a session
      // setScore(parseInt(savedScore));
    }
  }, []);

  const currentTx = spmTransactions[currentIndex];

  const resetForm = () => {
    setDebitDate(""); setDebitButir(""); setDebitAmount("");
    setKreditDate(""); setKreditButir(""); setKreditAmount("");
    setBakiHbSide(""); setBakiHbAmount("");
    setTotalVal("");
    setBakiBbSide(""); setBakiBbAmount("");
    setFeedback(null);
  };

  const handleSemakJawapan = () => {
    // Determine which side user filled
    const isDebitFilled = debitButir !== "" || debitAmount !== "";
    const isKreditFilled = kreditButir !== "" || kreditAmount !== "";

    let isCorrect = false;
    let msg = "";

    if (isDebitFilled && isKreditFilled) {
      msg = "Sila isi satu bahagian sahaja (Debit ATAU Kredit) mengikut Sistem Catatan Bergu untuk akaun ini.";
    } else if (!isDebitFilled && !isKreditFilled) {
      msg = "Sila buat catatan pada bahagian Debit atau Kredit.";
    } else {
      const userSide = isDebitFilled ? 'debit' : 'kredit';
      const userDate = isDebitFilled ? debitDate : kreditDate;
      const userButir = isDebitFilled ? debitButir : kreditButir;
      const userAmount = isDebitFilled ? debitAmount : kreditAmount;

      if (userSide !== currentTx.correctSide) {
        msg = "Salah bahagian! " + currentTx.explanation;
      } else if (userButir !== currentTx.correctButir) {
        msg = "Butiran salah. Anda sepatutnya merekod akaun yang dihubungkan secara catatan bergu.";
      } else if (userAmount !== currentTx.amount) {
        msg = "Amaun salah. Sila masukkan nilai yang tepat dari urus niaga.";
      } else {
        isCorrect = true;
        msg = "Tepat sekali! " + currentTx.explanation;
        setScore(prev => {
          const newScore = prev + 1;
          localStorage.setItem('akaunScore', newScore.toString());
          return newScore;
        });
      }
    }

    setFeedback({ isCorrect, msg });
    setQuizState("EVALUATED");
  };

  const handleTeruskanKeImbangan = () => {
    setQuizState("BALANCING");
    setFeedback(null);
  };

  const handleSemakImbangan = () => {
    let isCorrect = false;
    let msg = "";

    const correctHbSide = currentTx.correctSide === 'debit' ? 'kredit' : 'debit';
    const correctBbSide = currentTx.correctSide;

    if (bakiHbSide !== correctHbSide || bakiHbAmount !== currentTx.amount) {
      msg = "Baki h/b salah. Baki h/b mesti berada pada bahagian yang lebih kecil untuk menyamakan jumlah.";
    } else if (totalVal !== currentTx.amount) {
      msg = "Jumlah tidak tepat.";
    } else if (bakiBbSide !== correctBbSide || bakiBbAmount !== currentTx.amount) {
      msg = "Baki b/b salah. Baki b/b dibawa ke awal bulan pada bahagian baki normal akaun.";
    } else {
      isCorrect = true;
      msg = "Imbangan tepat! Akaun telah ditutup dengan betul.";
    }

    setFeedback({ isCorrect, msg });
    setQuizState("BALANCING_EVALUATED");

    // Save to history
    if (isCorrect && !history.find(h => h.id === currentTx.id)) {
      setHistory(prev => [...prev, { ...currentTx, passed: true }]);
    }
  };

  const handleSeterusnya = () => {
    if (currentIndex < spmTransactions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setQuizState("ENTRY");
      resetForm();
    } else {
      setQuizState("REVIEW");
    }
  };

  const renderDropdown = (value, onChange, disabled) => (
    <select value={value} onChange={onChange} disabled={disabled}>
      {butirOptions.map((opt, i) => (
        <option key={i} value={opt}>{opt === "" ? "-- Pilih Butir --" : opt}</option>
      ))}
    </select>
  );

  if (quizState === "REVIEW") {
    return (
      <div>
        <div className="panel" style={{ backgroundColor: 'var(--energetic-yellow)' }}>
          <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Tamat Kuiz!</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Markah anda: {score} / {spmTransactions.length}</p>
          <button className="btn mt-2" onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setHistory([]);
            setQuizState("ENTRY");
            resetForm();
          }}>
            <RotateCcw size={18} /> Cuba Lagi
          </button>
        </div>

        <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Semakan Urus Niaga</h3>
        {spmTransactions.map((tx, i) => (
          <div key={i} className="panel">
            <p><strong>{tx.date}:</strong> {tx.scenario}</p>
            <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem', border: '2px solid var(--border-color)' }}>
              <p><strong>Akaun Sasaran:</strong> {tx.targetAccount}</p>
              <p><strong>Catatan:</strong> {tx.correctSide.toUpperCase()} {tx.correctButir} RM{tx.amount}</p>
              <p><strong>Sebab:</strong> {tx.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const isEntryDisabled = quizState !== "ENTRY";
  const isBalancingActive = quizState === "BALANCING" || quizState === "BALANCING_EVALUATED";

  return (
    <div>
      <div className="panel" style={{ backgroundColor: 'var(--energetic-yellow)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', textTransform: 'uppercase' }}>Soalan {currentIndex + 1} / {spmTransactions.length}</h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Markah Terkumpul: {score}</p>
        </div>
      </div>

      <div className="panel" style={{ backgroundColor: '#eff6ff', border: '3px solid var(--primary-blue)' }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Urus Niaga:</h3>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {currentTx.date}: {currentTx.scenario}
        </p>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '6px', border: '2px dashed var(--border-color)', fontWeight: 'bold' }}>
          Sila buat catatan lejar dalam: <span style={{ color: 'var(--danger-red)', fontSize: '1.2rem' }}>{currentTx.targetAccount.toUpperCase()}</span>
        </div>
      </div>

      {/* T-Ledger Layout */}
      <div className="t-ledger">
        <div className="t-ledger-side">
          <div className="t-ledger-header">DEBIT (Dt)</div>
          
          <div className="t-ledger-row" style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
            <div className="t-ledger-cell cell-date">Tarikh</div>
            <div className="t-ledger-cell cell-details">Butir</div>
            <div className="t-ledger-cell cell-amount">RM</div>
          </div>
          
          <div className="t-ledger-row">
            <div className="t-ledger-cell cell-date">
              <input type="text" placeholder="Tarikh" value={debitDate} onChange={e => setDebitDate(e.target.value)} disabled={isEntryDisabled} />
            </div>
            <div className="t-ledger-cell cell-details">
              {renderDropdown(debitButir, e => setDebitButir(e.target.value), isEntryDisabled)}
            </div>
            <div className="t-ledger-cell cell-amount">
              <input type="number" placeholder="0" value={debitAmount} onChange={e => setDebitAmount(e.target.value)} disabled={isEntryDisabled} />
            </div>
          </div>

          {/* Balancing rows for Debit */}
          {isBalancingActive && (
            <>
              {/* Baki h/b Row */}
              <div className="t-ledger-row">
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center">
                  {bakiHbSide === 'debit' ? (
                     <span style={{fontWeight:'bold'}}>Baki h/b</span>
                  ) : (
                    <button className="btn btn-yellow" style={{padding:'0.2rem 0.5rem', fontSize:'0.9rem'}} onClick={() => setBakiHbSide('debit')} disabled={quizState === 'BALANCING_EVALUATED'}>Pilih Baki h/b</button>
                  )}
                </div>
                <div className="t-ledger-cell cell-amount">
                  {bakiHbSide === 'debit' && <input type="number" value={bakiHbAmount} onChange={e => setBakiHbAmount(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} placeholder="RM" />}
                </div>
              </div>
              
              {/* Total Row */}
              <div className="t-ledger-row" style={{ borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', backgroundColor: '#f1f5f9' }}>
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center" style={{fontWeight:'bold'}}>JUMLAH</div>
                <div className="t-ledger-cell cell-amount">
                  <input type="number" value={totalVal} onChange={e => setTotalVal(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} style={{fontWeight:'bold', borderBottom:'4px double var(--border-color)'}} />
                </div>
              </div>

              {/* Baki b/b Row */}
              <div className="t-ledger-row">
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center">
                   {bakiBbSide === 'debit' ? (
                     <span style={{fontWeight:'bold'}}>Baki b/b</span>
                  ) : (
                    <button className="btn btn-green" style={{padding:'0.2rem 0.5rem', fontSize:'0.9rem'}} onClick={() => setBakiBbSide('debit')} disabled={quizState === 'BALANCING_EVALUATED'}>Pilih Baki b/b</button>
                  )}
                </div>
                <div className="t-ledger-cell cell-amount">
                   {bakiBbSide === 'debit' && <input type="number" value={bakiBbAmount} onChange={e => setBakiBbAmount(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} placeholder="RM" />}
                </div>
              </div>
            </>
          )}

        </div>

        <div className="t-ledger-side">
          <div className="t-ledger-header">KREDIT (Kt)</div>
          
          <div className="t-ledger-row" style={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
            <div className="t-ledger-cell cell-date">Tarikh</div>
            <div className="t-ledger-cell cell-details">Butir</div>
            <div className="t-ledger-cell cell-amount">RM</div>
          </div>
          
          <div className="t-ledger-row">
            <div className="t-ledger-cell cell-date">
              <input type="text" placeholder="Tarikh" value={kreditDate} onChange={e => setKreditDate(e.target.value)} disabled={isEntryDisabled} />
            </div>
            <div className="t-ledger-cell cell-details">
              {renderDropdown(kreditButir, e => setKreditButir(e.target.value), isEntryDisabled)}
            </div>
            <div className="t-ledger-cell cell-amount">
              <input type="number" placeholder="0" value={kreditAmount} onChange={e => setKreditAmount(e.target.value)} disabled={isEntryDisabled} />
            </div>
          </div>

          {/* Balancing rows for Kredit */}
          {isBalancingActive && (
            <>
              {/* Baki h/b Row */}
              <div className="t-ledger-row">
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center">
                  {bakiHbSide === 'kredit' ? (
                     <span style={{fontWeight:'bold'}}>Baki h/b</span>
                  ) : (
                    <button className="btn btn-yellow" style={{padding:'0.2rem 0.5rem', fontSize:'0.9rem'}} onClick={() => setBakiHbSide('kredit')} disabled={quizState === 'BALANCING_EVALUATED'}>Pilih Baki h/b</button>
                  )}
                </div>
                <div className="t-ledger-cell cell-amount">
                  {bakiHbSide === 'kredit' && <input type="number" value={bakiHbAmount} onChange={e => setBakiHbAmount(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} placeholder="RM" />}
                </div>
              </div>
              
              {/* Total Row */}
              <div className="t-ledger-row" style={{ borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', backgroundColor: '#f1f5f9' }}>
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center" style={{fontWeight:'bold'}}>JUMLAH</div>
                <div className="t-ledger-cell cell-amount">
                  <input type="number" value={totalVal} onChange={e => setTotalVal(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} style={{fontWeight:'bold', borderBottom:'4px double var(--border-color)'}} />
                </div>
              </div>

              {/* Baki b/b Row */}
              <div className="t-ledger-row">
                <div className="t-ledger-cell cell-date"></div>
                <div className="t-ledger-cell cell-details text-center">
                   {bakiBbSide === 'kredit' ? (
                     <span style={{fontWeight:'bold'}}>Baki b/b</span>
                  ) : (
                    <button className="btn btn-green" style={{padding:'0.2rem 0.5rem', fontSize:'0.9rem'}} onClick={() => setBakiBbSide('kredit')} disabled={quizState === 'BALANCING_EVALUATED'}>Pilih Baki b/b</button>
                  )}
                </div>
                <div className="t-ledger-cell cell-amount">
                   {bakiBbSide === 'kredit' && <input type="number" value={bakiBbAmount} onChange={e => setBakiBbAmount(e.target.value)} disabled={quizState === 'BALANCING_EVALUATED'} placeholder="RM" />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Feedback Panel */}
      {feedback && (
        <div className={`panel ${feedback.isCorrect ? 'correct-entry' : 'incorrect-entry'}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {feedback.isCorrect ? <CheckCircle size={32} color="var(--mint-green)" /> : <XCircle size={32} color="var(--danger-red)" />}
          <div>
            <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{feedback.isCorrect ? 'Tepat!' : 'Tidak Tepat'}</h4>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{feedback.msg}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between mt-2 mb-2">
        {quizState === "ENTRY" && (
          <button className="btn" onClick={handleSemakJawapan}>
            Semak Jawapan <CheckCircle size={18} />
          </button>
        )}
        
        {quizState === "EVALUATED" && feedback?.isCorrect && (
          <button className="btn btn-yellow" onClick={handleTeruskanKeImbangan}>
            Hitung & Imbangkan Akaun <ArrowRight size={18} />
          </button>
        )}

        {quizState === "EVALUATED" && !feedback?.isCorrect && (
          <button className="btn btn-yellow" onClick={() => {
            setQuizState("ENTRY");
            setFeedback(null);
          }}>
            Cuba Lagi <RotateCcw size={18} />
          </button>
        )}

        {quizState === "BALANCING" && (
          <button className="btn btn-green" onClick={handleSemakImbangan}>
            Semak Imbangan <CheckCircle size={18} />
          </button>
        )}

        {quizState === "BALANCING_EVALUATED" && feedback?.isCorrect && (
          <button className="btn" onClick={handleSeterusnya}>
            Soalan Seterusnya <ArrowRight size={18} />
          </button>
        )}

        {quizState === "BALANCING_EVALUATED" && !feedback?.isCorrect && (
          <button className="btn btn-yellow" onClick={() => {
            setQuizState("BALANCING");
            setFeedback(null);
          }}>
            Semak Semula Imbangan <RotateCcw size={18} />
          </button>
        )}
      </div>

    </div>
  );
}

export default KuizLejar;
