export const spmTransactions = [
  {
    id: 1,
    date: "1 Mac",
    scenario: "Bawa masuk modal tunai dan dibankkan sejumlah RM20,000",
    amount: "20000",
    targetAccount: "Akaun Bank",
    correctSide: "debit",
    correctButir: "Modal",
    explanation: "Aset (Bank) bertambah direkod di sebelah Debit. Ekuiti Pemilik (Modal) bertambah."
  },
  {
    id: 2,
    date: "3 Mac",
    scenario: "Beli barang niaga secara kredit daripada Pembekal Rahmat RM1,500",
    amount: "1500",
    targetAccount: "Akaun Belian",
    correctSide: "debit",
    correctButir: "Akaun Belum Bayar: Pembekal Rahmat",
    explanation: "Belanja (Belian) bertambah direkod di sebelah Debit. Liabiliti (Pembekal Rahmat) bertambah."
  },
  {
    id: 3,
    date: "6 Mac",
    scenario: "Jual barang niaga secara tunai RM850",
    amount: "850",
    targetAccount: "Akaun Tunai",
    correctSide: "debit",
    correctButir: "Jualan",
    explanation: "Aset (Tunai) bertambah direkod di sebelah Debit. Hasil (Jualan) bertambah."
  },
  {
    id: 4,
    date: "9 Mac",
    scenario: "Beli kelengkapan pejabat dengan cek RM2,400",
    amount: "2400",
    targetAccount: "Akaun Kelengkapan",
    correctSide: "debit",
    correctButir: "Bank",
    explanation: "Aset (Kelengkapan) bertambah direkod di sebelah Debit. Aset (Bank) berkurang (Kredit)."
  },
  {
    id: 5,
    date: "12 Mac",
    scenario: "Jual barang niaga secara kredit kepada Kedai Runcit Lee RM1,200",
    amount: "1200",
    targetAccount: "Akaun Belum Terima: Kedai Runcit Lee",
    correctSide: "debit",
    correctButir: "Jualan",
    explanation: "Aset (Akaun Belum Terima) bertambah direkod di sebelah Debit. Hasil (Jualan) bertambah."
  },
  {
    id: 6,
    date: "15 Mac",
    scenario: "Bayar sewa premis kedai dengan tunai RM600",
    amount: "600",
    targetAccount: "Akaun Sewa",
    correctSide: "debit",
    correctButir: "Tunai",
    explanation: "Belanja (Sewa) bertambah direkod di sebelah Debit. Aset (Tunai) berkurang (Kredit)."
  },
  {
    id: 7,
    date: "18 Mac",
    scenario: "Ambilan tunai perniagaan untuk kegunaan persendirian RM250",
    amount: "250",
    targetAccount: "Akaun Ambilan",
    correctSide: "debit",
    correctButir: "Tunai",
    explanation: "Ambilan bertambah direkod di sebelah Debit. Aset (Tunai) berkurang (Kredit)."
  },
  {
    id: 8,
    date: "22 Mac",
    scenario: "Bayar hutang kepada Pembekal Rahmat dengan cek RM1,000",
    amount: "1000",
    targetAccount: "Akaun Belum Bayar: Pembekal Rahmat",
    correctSide: "debit",
    correctButir: "Bank",
    explanation: "Liabiliti (Pembekal Rahmat) berkurang direkod di sebelah Debit. Aset (Bank) berkurang (Kredit)."
  },
  {
    id: 9,
    date: "26 Mac",
    scenario: "Terima cek daripada pelanggan Kedai Runcit Lee RM1,200",
    amount: "1200",
    targetAccount: "Akaun Bank",
    correctSide: "debit",
    correctButir: "Akaun Belum Terima: Kedai Runcit Lee",
    explanation: "Aset (Bank) bertambah direkod di sebelah Debit. Aset (Akaun Belum Terima) berkurang (Kredit)."
  },
  {
    id: 10,
    date: "29 Mac",
    scenario: "Terima komisen jualan secara tunai RM320",
    amount: "320",
    targetAccount: "Akaun Tunai",
    correctSide: "debit",
    correctButir: "Komisen Diterima",
    explanation: "Aset (Tunai) bertambah direkod di sebelah Debit. Hasil (Komisen Diterima) bertambah (Kredit)."
  }
];

export const butirOptions = [
  "",
  "Bank", 
  "Tunai", 
  "Modal", 
  "Belian", 
  "Jualan", 
  "Kelengkapan", 
  "Perabot", 
  "Akaun Belum Bayar: Pembekal Rahmat", 
  "Akaun Belum Terima: Kedai Runcit Lee", 
  "Sewa", 
  "Ambilan", 
  "Gaji", 
  "Komisen Diterima", 
  "Baki h/b", 
  "Baki b/b"
];
