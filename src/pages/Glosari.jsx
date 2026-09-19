import React from 'react';
import { formatList } from '../data/notes';

function Glosari() {
  return (
    <div>
      <div className="panel" style={{ backgroundColor: 'var(--mint-green)' }}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Glosari & Format Asas</h2>
        <p style={{ fontWeight: 'bold' }}>Rujukan pantas untuk format-format penting dalam perakaunan.</p>
      </div>

      <div className="grid grid-cols-2 gap-2" style={{ gap: '1.5rem' }}>
        {formatList.map((item, index) => (
          <div key={index} className="panel">
            <h3 className="panel-header" style={{ fontSize: '1.2rem', color: 'var(--primary-blue)' }}>{item.title}</h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.format}</p>
          </div>
        ))}

        <div className="panel">
          <h3 className="panel-header" style={{ fontSize: '1.2rem', color: 'var(--primary-blue)' }}>Singkatan Biasa (Akronim)</h3>
          <ul>
            <li><strong>ABT:</strong> Akaun Belum Terima (Penghutang/Pelanggan) - ASET SEMASA</li>
            <li><strong>ABB:</strong> Akaun Belum Bayar (Pemiutang/Pembekal) - LIABILITI SEMASA</li>
            <li><strong>Dt:</strong> Debit</li>
            <li><strong>Kt:</strong> Kredit</li>
            <li><strong>b/b:</strong> Baki bawa bawah (Baki awal)</li>
            <li><strong>h/b:</strong> Baki hantar bawah (Baki akhir)</li>
            <li><strong>PHR:</strong> Peruntukan Hutang Ragu</li>
            <li><strong>SNT:</strong> Susut Nilai Terkumpul</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Glosari;
