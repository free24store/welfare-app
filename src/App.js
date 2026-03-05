import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qfjmmictnrsbmnlzrbhj.supabase.co",
  "sb_publishable_PS9o6e0oUYuzYL6NxKVpQw_YUyHNua9"
);

const Icon = ({ name, size = 18 }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    staff: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    car: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    claim: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    accounting: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  };
  return icons[name] || null;
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Noto Sans JP','Hiragino Sans',sans-serif;}
  ::-webkit-scrollbar{width:5px;height:5px;}
  ::-webkit-scrollbar-track{background:#f1f5f9;}
  ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px;}
  .card{background:white;border-radius:14px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);}
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;transition:all .15s;}
  .btn-primary{background:#2563eb;color:white;} .btn-primary:hover{background:#1d4ed8;}
  .btn-secondary{background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;} .btn-secondary:hover{background:#e2e8f0;}
  .btn-green{background:#059669;color:white;} .btn-green:hover{background:#047857;}
  .btn-red{background:#ef4444;color:white;} .btn-red:hover{background:#dc2626;}
  .tag{display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;}
  .input{border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;width:100%;outline:none;transition:border .15s;font-family:inherit;}
  .input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1);}
  .nav-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:13.5px;font-weight:500;color:#64748b;transition:all .15s;border:none;background:transparent;width:100%;text-align:left;}
  .nav-item:hover{background:#f1f5f9;color:#1e293b;}
  .nav-item.active{background:#eff6ff;color:#2563eb;}
  .row-hover:hover{background:#f8fafc;}
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
  .modal{background:white;border-radius:16px;padding:28px;width:100%;max-width:620px;max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.2);}
  .shift-cell{padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;text-align:center;display:inline-block;}
  .progress-bar{height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;}
  .progress-fill{height:100%;border-radius:3px;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  th{padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;border-bottom:1px solid #f1f5f9;}
  td{padding:11px 14px;border-bottom:1px solid #f8fafc;color:#374151;vertical-align:middle;}
  .stat-card{background:white;border-radius:14px;padding:20px 24px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .mono{font-family:'DM Mono',monospace;}
  .fade-in{animation:fadeIn .2s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .loading{display:flex;align-items:center;justify-content:center;padding:60px;color:#94a3b8;font-size:14px;gap:10px;}
`;

const initialStaffShifts = [
  { staffId:1, name:"中村 世話人", role:"世話人", shifts:{"2026-03-01":"日勤","2026-03-02":"日勤","2026-03-03":"公休","2026-03-04":"日勤","2026-03-05":"日勤","2026-03-06":"日勤"} },
  { staffId:2, name:"高橋 支援員", role:"生活支援員", shifts:{"2026-03-01":"日勤","2026-03-02":"公休","2026-03-03":"日勤","2026-03-04":"夜勤","2026-03-05":"明休","2026-03-06":"公休"} },
  { staffId:3, name:"渡辺 ドライバー", role:"運転手", shifts:{"2026-03-01":"公休","2026-03-02":"日勤","2026-03-03":"日勤","2026-03-04":"日勤","2026-03-05":"日勤","2026-03-06":"公休"} },
  { staffId:4, name:"小林 管理者", role:"施設管理者", shifts:{"2026-03-01":"日勤","2026-03-02":"日勤","2026-03-03":"日勤","2026-03-04":"日勤","2026-03-05":"公休","2026-03-06":"日勤"} },
  { staffId:5, name:"加藤 支援員", role:"生活支援員", shifts:{"2026-03-01":"公休","2026-03-02":"公休","2026-03-03":"日勤","2026-03-04":"公休","2026-03-05":"日勤","2026-03-06":"日勤"} },
];

const initialStaffList = [
  { id:1, name:"中村 世話人", role:"世話人", fullTime:true, tel:"080-1111-2222", email:"nakamura@example.com", certifications:["介護福祉士"], hireDate:"2019-04-01", hourlyRate:1200 },
  { id:2, name:"高橋 支援員", role:"生活支援員", fullTime:true, tel:"080-2222-3333", email:"takahashi@example.com", certifications:["社会福祉士"], hireDate:"2020-09-01", hourlyRate:1100 },
  { id:3, name:"渡辺 ドライバー", role:"運転手", fullTime:false, tel:"080-3333-4444", email:"watanabe@example.com", certifications:["普通自動車第一種"], hireDate:"2021-03-15", hourlyRate:1000 },
  { id:4, name:"小林 管理者", role:"施設管理者", fullTime:true, tel:"080-4444-5555", email:"kobayashi@example.com", certifications:["社会福祉士","介護福祉士"], hireDate:"2018-04-01", hourlyRate:1500 },
  { id:5, name:"加藤 支援員", role:"生活支援員", fullTime:false, tel:"080-5555-6666", email:"kato@example.com", certifications:["ヘルパー2級"], hireDate:"2022-11-01", hourlyRate:1000 },
];

export default function WelfareApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [transportLog, setTransportLog] = useState([]);
  const [entries, setEntries] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddTransport, setShowAddTransport] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [newUser, setNewUser] = useState({ name:"",kana:"",age:"",disability:"",support_level:"1",room:"",admission_date:"",status:"在籍",guardian:"",guardian_tel:"",medication_note:"" });
  const [newTransport, setNewTransport] = useState({ date:"",user_id:"",type:"送迎（往）",destination:"",driver:"渡辺 ドライバー",distance:"",cost:"",time:"" });
  const [newEntry, setNewEntry] = useState({ date:"",category:"支出",sub_category:"",description:"",amount:"",debit:"",credit:"" });

  const fmt = n => Number(n).toLocaleString("ja-JP");
  const shiftColor = s => {
    if(s==="日勤") return{bg:"#e0f2fe",color:"#0369a1"};
    if(s==="夜勤") return{bg:"#ede9fe",color:"#6d28d9"};
    if(s==="明休") return{bg:"#fef3c7",color:"#d97706"};
    return{bg:"#f1f5f9",color:"#94a3b8"};
  };

  // ── DB読み込み ──
  useEffect(() => { loadAll(); }, []);
  const loadAll = async () => {
    setLoading(true);
    const [u, t, e, c] = await Promise.all([
      supabase.from("users").select("*").order("id"),
      supabase.from("transport_log").select("*").order("id"),
      supabase.from("accounting_entries").select("*").order("id"),
      supabase.from("claim_data").select("*").order("id"),
    ]);
    setUsers(u.data || []);
    setTransportLog(t.data || []);
    setEntries(e.data || []);
    setClaimData(c.data || []);
    setLoading(false);
  };

  const totalIncome = entries.filter(e=>e.category==="収入").reduce((s,e)=>s+e.amount,0);
  const totalExpense = entries.filter(e=>e.category==="支出").reduce((s,e)=>s+e.amount,0);
  const totalClaim = claimData.reduce((s,c)=>s+c.total,0);
  const totalTransportCost = transportLog.reduce((s,t)=>s+t.cost,0);

  const downloadCSV = (data, filename) => {
    if(!data.length) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(r=>Object.values(r).map(v=>typeof v==="string"&&v.includes(",")?`"${v}"`:v).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+headers+"\n"+rows],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download=filename+".csv"; a.click(); URL.revokeObjectURL(url);
  };

  // ── 利用者CRUD ──
  const saveUser = async () => {
    if(!newUser.name||!newUser.room) return;
    const payload = {...newUser, age: parseInt(newUser.age)||0};
    if(editUser) {
      await supabase.from("users").update(payload).eq("id", editUser.id);
    } else {
      await supabase.from("users").insert(payload);
    }
    setShowAddUser(false); setEditUser(null);
    setNewUser({name:"",kana:"",age:"",disability:"",support_level:"1",room:"",admission_date:"",status:"在籍",guardian:"",guardian_tel:"",medication_note:""});
    loadAll();
  };
  const deleteUser = async (id) => {
    if(!window.confirm("削除しますか？")) return;
    await supabase.from("users").delete().eq("id", id);
    setSelectedUser(null); loadAll();
  };
  const openEdit = (u) => { setEditUser(u); setNewUser({...u, age:String(u.age)}); setSelectedUser(null); setShowAddUser(true); };

  // ── 送迎CRUD ──
  const saveTransport = async () => {
    if(!newTransport.date||!newTransport.user_id||!newTransport.destination) return;
    const user = users.find(u=>u.id===parseInt(newTransport.user_id));
    await supabase.from("transport_log").insert({
      ...newTransport,
      user_id: parseInt(newTransport.user_id),
      user_name: user?.name||"",
      distance: parseFloat(newTransport.distance)||0,
      cost: parseInt(newTransport.cost)||0,
    });
    setShowAddTransport(false);
    setNewTransport({date:"",user_id:"",type:"送迎（往）",destination:"",driver:"渡辺 ドライバー",distance:"",cost:"",time:""});
    loadAll();
  };

  // ── 仕訳CRUD ──
  const saveEntry = async () => {
    if(!newEntry.date||!newEntry.description||!newEntry.amount) return;
    await supabase.from("accounting_entries").insert({...newEntry, amount: parseInt(newEntry.amount)});
    setShowAddEntry(false);
    setNewEntry({date:"",category:"支出",sub_category:"",description:"",amount:"",debit:"",credit:""});
    loadAll();
  };

  // ── 請求ステータス更新 ──
  const updateClaimStatus = async (id, status) => {
    await supabase.from("claim_data").update({status}).eq("id", id);
    loadAll();
  };

  const tabs = [
    {id:"dashboard",label:"ダッシュボード",icon:"home"},
    {id:"users",label:"利用者管理",icon:"users"},
    {id:"staff",label:"スタッフ管理",icon:"staff"},
    {id:"transport",label:"送迎管理",icon:"car"},
    {id:"claims",label:"国保連請求",icon:"claim"},
    {id:"accounting",label:"経理・決算",icon:"accounting"},
  ];

  const filteredUsers = users.filter(u=>u.name.includes(searchQuery)||u.kana?.includes(searchQuery)||searchQuery==="");

  if(loading) return <div style={{fontFamily:"'Noto Sans JP',sans-serif"}}><style>{CSS}</style><div className="loading">⏳ データを読み込み中...</div></div>;

  return (
    <div style={{fontFamily:"'Noto Sans JP','Hiragino Sans',sans-serif",background:"#f0f4f8",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>

      <header style={{background:"white",borderBottom:"1px solid #e2e8f0",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏠</div>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>グループホーム管理システム</div>
            <div style={{fontSize:11,color:"#94a3b8"}}>特定非営利活動法人 あおば福祉会</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button className="btn btn-secondary" style={{padding:"6px 10px"}}><Icon name="bell" size={16}/></button>
          <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#059669,#10b981)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:12,fontWeight:700}}>管</div>
        </div>
      </header>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <aside style={{width:216,background:"white",borderRight:"1px solid #e2e8f0",padding:"14px 10px",flexShrink:0,overflowY:"auto"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",color:"#cbd5e1",padding:"4px 14px 10px",textTransform:"uppercase"}}>メニュー</div>
          {tabs.map(t=>(
            <button key={t.id} className={`nav-item ${activeTab===t.id?"active":""}`} onClick={()=>{setActiveTab(t.id);setSearchQuery("");}}>
              <Icon name={t.icon} size={15}/>{t.label}
            </button>
          ))}
          <div style={{borderTop:"1px solid #f1f5f9",margin:"14px 0 10px",fontSize:10,fontWeight:700,letterSpacing:".1em",color:"#cbd5e1",padding:"6px 14px 0",textTransform:"uppercase"}}>今月概要</div>
          <div style={{padding:"0 14px"}}>
            {[
              {label:"在籍利用者",value:users.filter(u=>u.status==="在籍").length+"名"},
              {label:"請求総額",value:"¥"+fmt(totalClaim),color:"#2563eb"},
              {label:"送迎コスト",value:"¥"+fmt(totalTransportCost),color:"#059669"},
              {label:"収支差額",value:(totalIncome-totalExpense>=0?"+":"")+"¥"+fmt(totalIncome-totalExpense),color:totalIncome-totalExpense>=0?"#059669":"#ef4444"},
            ].map((k,i)=>(
              <div key={i} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:"#94a3b8",marginBottom:2}}>{k.label}</div>
                <div style={{fontSize:13,fontWeight:700,color:k.color||"#0f172a",fontFamily:"'DM Mono',monospace"}}>{k.value}</div>
              </div>
            ))}
          </div>
        </aside>

        <main style={{flex:1,padding:"22px",overflowY:"auto",overflowX:"hidden"}}>

          {/* DASHBOARD */}
          {activeTab==="dashboard" && (
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:4}}>ダッシュボード</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>今日の状況</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginBottom:20}}>
                {[
                  {label:"在籍利用者数",value:users.filter(u=>u.status==="在籍").length+"名",sub:`外泊中 ${users.filter(u=>u.status==="外泊中").length}名`,color:"#2563eb",icon:"👥"},
                  {label:"国保連請求総額",value:"¥"+fmt(totalClaim),sub:`${claimData.length}件`,color:"#7c3aed",icon:"📄"},
                  {label:"送迎コスト",value:"¥"+fmt(totalTransportCost),sub:`${transportLog.length}回`,color:"#059669",icon:"🚗"},
                  {label:"収支バランス",value:(totalIncome-totalExpense>=0?"+":"")+"¥"+fmt(totalIncome-totalExpense),sub:"累計",color:totalIncome-totalExpense>=0?"#059669":"#ef4444",icon:"💰"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderLeft:`4px solid ${k.color}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div style={{fontSize:12,color:"#64748b",fontWeight:500}}>{k.label}</div>
                      <div style={{fontSize:20}}>{k.icon}</div>
                    </div>
                    <div className="mono" style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:4}}>{k.value}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>{k.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="warning" size={15}/>要対応事項</div>
                  {[
                    {text:`外泊中の利用者 ${users.filter(u=>u.status==="外泊中").length}名 — 帰宅確認`,type:"warn"},
                    {text:`国保連請求 — 入金待ち ${claimData.filter(c=>c.status==="請求済").length}件`,type:"info"},
                    {text:"高橋 支援員 — 夜勤後の代休確認",type:"warn"},
                  ].map((a,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 0",borderBottom:i<2?"1px solid #f8fafc":"none"}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:a.type==="warn"?"#f59e0b":"#3b82f6",marginTop:5,flexShrink:0}}/>
                      <div style={{fontSize:13,color:"#374151"}}>{a.text}</div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="calendar" size={15}/>本日のスタッフ</div>
                  {initialStaffShifts.map((s,i)=>{
                    const today=s.shifts["2026-03-06"]||"公休";
                    const sc=shiftColor(today);
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:i<initialStaffShifts.length-1?"1px solid #f8fafc":"none"}}>
                        <div><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{s.role}</div></div>
                        <div className="shift-cell" style={{background:sc.bg,color:sc.color}}>{today}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:12,display:"flex",alignItems:"center",gap:8}}><Icon name="car" size={15}/>最近の送迎記録</div>
                {transportLog.length===0 ? <div style={{color:"#94a3b8",fontSize:13,padding:"20px 0",textAlign:"center"}}>送迎記録がありません</div> : (
                  <table>
                    <thead><tr><th>日付</th><th>利用者</th><th>種別</th><th>目的地</th><th>距離</th><th>コスト</th></tr></thead>
                    <tbody>
                      {[...transportLog].reverse().slice(0,5).map((t,i)=>(
                        <tr key={i} className="row-hover">
                          <td className="mono" style={{fontSize:12}}>{t.date}</td>
                          <td style={{fontWeight:600}}>{t.user_name}</td>
                          <td><span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{t.type}</span></td>
                          <td>{t.destination}</td>
                          <td className="mono">{t.distance}km</td>
                          <td className="mono" style={{fontWeight:600,color:"#059669"}}>¥{fmt(t.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* USERS */}
          {activeTab==="users" && (
            <div className="fade-in">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>利用者管理</div>
                  <div style={{fontSize:13,color:"#94a3b8"}}>在籍 {users.filter(u=>u.status==="在籍").length}名 / 全 {users.length}名</div>
                </div>
                <button className="btn btn-primary" onClick={()=>{setEditUser(null);setNewUser({name:"",kana:"",age:"",disability:"",support_level:"1",room:"",admission_date:"",status:"在籍",guardian:"",guardian_tel:"",medication_note:""});setShowAddUser(true);}}>
                  <Icon name="plus" size={14}/>新規登録
                </button>
              </div>
              <div style={{position:"relative",maxWidth:300,marginBottom:16}}>
                <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#94a3b8"}}><Icon name="search" size={14}/></div>
                <input className="input" style={{paddingLeft:32}} placeholder="名前・かなで検索..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
              </div>
              {users.length===0 ? (
                <div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}>
                  <div style={{fontSize:32,marginBottom:10}}>👥</div>
                  <div>利用者が登録されていません</div>
                  <div style={{fontSize:12,marginTop:4}}>「新規登録」ボタンから追加してください</div>
                </div>
              ) : (
                <div style={{display:"grid",gap:10}}>
                  {filteredUsers.map(u=>(
                    <div key={u.id} className="card" style={{cursor:"pointer"}} onClick={()=>setSelectedUser(u)}>
                      <div style={{display:"flex",alignItems:"center",gap:14}}>
                        <div style={{width:46,height:46,borderRadius:12,background:`hsl(${u.id*60},55%,88%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{u.name[0]}</div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                            <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>{u.name}</div>
                            <div style={{fontSize:11,color:"#94a3b8"}}>{u.kana}</div>
                            <span className="tag" style={{background:u.status==="在籍"?"#ecfdf5":u.status==="外泊中"?"#fef3c7":"#fee2e2",color:u.status==="在籍"?"#059669":u.status==="外泊中"?"#d97706":"#ef4444"}}>{u.status}</span>
                          </div>
                          <div style={{display:"flex",gap:14,fontSize:12,color:"#64748b",flexWrap:"wrap"}}>
                            <span>🏠 {u.room}号室</span><span>年齢 {u.age}歳</span><span>区分 {u.support_level}</span><span>{u.disability}</span>
                          </div>
                        </div>
                        <div style={{textAlign:"right",fontSize:11,color:"#94a3b8"}}>
                          <div>入居: {u.admission_date}</div><div style={{marginTop:3}}>保護者: {u.guardian}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedUser && (
                <div className="modal-overlay" onClick={()=>setSelectedUser(null)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                      <div style={{fontWeight:700,fontSize:17}}>{selectedUser.name} さんの詳細</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setSelectedUser(null)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                      {[["フリガナ",selectedUser.kana],["年齢",selectedUser.age+"歳"],["部屋番号",selectedUser.room+"号室"],["障害種別",selectedUser.disability],["支援区分","区分"+selectedUser.support_level],["ステータス",selectedUser.status],["入居日",selectedUser.admission_date],["保護者",selectedUser.guardian],["保護者連絡先",selectedUser.guardian_tel],["投薬メモ",selectedUser.medication_note]].map(([k,v])=>(
                        <div key={k} style={{background:"#f8fafc",borderRadius:8,padding:"9px 12px"}}>
                          <div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>{k}</div>
                          <div style={{fontSize:13,fontWeight:600,color:"#0f172a"}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn btn-primary" style={{flex:1}} onClick={()=>openEdit(selectedUser)}><Icon name="edit" size={13}/>編集</button>
                      <button className="btn btn-secondary" style={{flex:1}} onClick={()=>downloadCSV([selectedUser],selectedUser.name+"_個人票")}><Icon name="download" size={13}/>個人票出力</button>
                      <button className="btn btn-red" onClick={()=>deleteUser(selectedUser.id)}><Icon name="trash" size={13}/></button>
                    </div>
                  </div>
                </div>
              )}
              {showAddUser && (
                <div className="modal-overlay" onClick={()=>setShowAddUser(false)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                      <div style={{fontWeight:700,fontSize:17}}>{editUser?"利用者情報を編集":"新規利用者登録"}</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setShowAddUser(false)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gap:12}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        {[["名前","name","text"],["フリガナ","kana","text"],["年齢","age","number"],["部屋番号","room","text"]].map(([l,k,t])=>(
                          <div key={k}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>{l}</label><input className="input" type={t} value={newUser[k]} onChange={e=>setNewUser({...newUser,[k]:e.target.value})}/></div>
                        ))}
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>障害種別</label><input className="input" value={newUser.disability} onChange={e=>setNewUser({...newUser,disability:e.target.value})}/></div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>障害支援区分</label>
                          <select className="input" value={newUser.support_level} onChange={e=>setNewUser({...newUser,support_level:e.target.value})}>
                            {["1","2","3","4","5","6"].map(v=><option key={v}>{v}</option>)}
                          </select>
                        </div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>ステータス</label>
                          <select className="input" value={newUser.status} onChange={e=>setNewUser({...newUser,status:e.target.value})}>
                            {["在籍","外泊中","退去"].map(v=><option key={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>入居日</label><input className="input" type="date" value={newUser.admission_date} onChange={e=>setNewUser({...newUser,admission_date:e.target.value})}/></div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>保護者氏名</label><input className="input" value={newUser.guardian} onChange={e=>setNewUser({...newUser,guardian:e.target.value})}/></div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>保護者連絡先</label><input className="input" value={newUser.guardian_tel} onChange={e=>setNewUser({...newUser,guardian_tel:e.target.value})}/></div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>投薬メモ</label><input className="input" value={newUser.medication_note} onChange={e=>setNewUser({...newUser,medication_note:e.target.value})}/></div>
                      <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"11px"}} onClick={saveUser}><Icon name="check" size={14}/>{editUser?"変更を保存":"登録する"}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STAFF */}
          {activeTab==="staff" && (
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:4}}>スタッフ管理・シフト</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:18}}>スタッフ {initialStaffList.length}名</div>
              <div className="card" style={{marginBottom:18,overflowX:"auto"}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>週間シフト表（3/1〜3/6）</div>
                <table>
                  <thead><tr><th>スタッフ</th>{["3/1(日)","3/2(月)","3/3(火)","3/4(水)","3/5(木)","3/6(金)"].map(d=><th key={d}>{d}</th>)}</tr></thead>
                  <tbody>
                    {initialStaffShifts.map((s,i)=>(
                      <tr key={i} className="row-hover">
                        <td><div style={{fontWeight:600}}>{s.name}</div><div style={{fontSize:11,color:"#94a3b8"}}>{s.role}</div></td>
                        {Object.values(s.shifts).map((sh,j)=>{const sc=shiftColor(sh);return<td key={j}><div className="shift-cell" style={{background:sc.bg,color:sc.color}}>{sh}</div></td>;})}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
                {initialStaffList.map(s=>(
                  <div key={s.id} className="card" style={{cursor:"pointer"}} onClick={()=>setSelectedStaff(s)}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:42,height:42,borderRadius:10,background:`hsl(${s.id*70+200},55%,85%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.name[0]}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,color:"#0f172a",fontSize:14}}>{s.name}</div>
                        <div style={{fontSize:12,color:"#64748b"}}>{s.role}</div>
                      </div>
                      <span className="tag" style={{background:s.fullTime?"#eff6ff":"#f5f3ff",color:s.fullTime?"#2563eb":"#7c3aed"}}>{s.fullTime?"常勤":"非常勤"}</span>
                    </div>
                    <div style={{fontSize:12,color:"#64748b",lineHeight:1.9}}>
                      <div>📞 {s.tel}</div><div>入職: {s.hireDate}</div><div className="mono">時給 ¥{fmt(s.hourlyRate)}</div>
                    </div>
                    <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:5}}>
                      {s.certifications.map(c=><span key={c} className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{c}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              {selectedStaff && (
                <div className="modal-overlay" onClick={()=>setSelectedStaff(null)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                      <div style={{fontWeight:700,fontSize:17}}>{selectedStaff.name}</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setSelectedStaff(null)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                      {[["役職",selectedStaff.role],["雇用形態",selectedStaff.fullTime?"常勤":"非常勤"],["電話",selectedStaff.tel],["メール",selectedStaff.email],["入職日",selectedStaff.hireDate],["時給","¥"+fmt(selectedStaff.hourlyRate)]].map(([k,v])=>(
                        <div key={k} style={{background:"#f8fafc",borderRadius:8,padding:"9px 12px"}}>
                          <div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>{k}</div>
                          <div style={{fontSize:13,fontWeight:600}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:11,color:"#94a3b8",marginBottom:6}}>保有資格</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{selectedStaff.certifications.map(c=><span key={c} className="tag" style={{background:"#eff6ff",color:"#2563eb",padding:"4px 12px"}}>{c}</span>)}</div>
                    </div>
                    <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>downloadCSV([selectedStaff],selectedStaff.name+"_スタッフ情報")}><Icon name="download" size={13}/>スタッフ情報出力</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TRANSPORT */}
          {activeTab==="transport" && (
            <div className="fade-in">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>送迎管理・コスト分析</div>
                  <div style={{fontSize:13,color:"#94a3b8"}}>送迎記録と利用者別コスト</div>
                </div>
                <button className="btn btn-primary" onClick={()=>setShowAddTransport(true)}><Icon name="plus" size={14}/>送迎記録追加</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,marginBottom:18}}>
                {[
                  {label:"総送迎回数",value:transportLog.length+"回",color:"#2563eb"},
                  {label:"総コスト",value:"¥"+fmt(totalTransportCost),color:"#059669"},
                  {label:"平均コスト/回",value:"¥"+fmt(transportLog.length?Math.round(totalTransportCost/transportLog.length):0),color:"#7c3aed"},
                  {label:"総走行距離",value:transportLog.reduce((s,t)=>s+Number(t.distance),0).toFixed(1)+"km",color:"#d97706"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderTop:`3px solid ${k.color}`,textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:6}}>{k.label}</div>
                    <div className="mono" style={{fontSize:20,fontWeight:800,color:k.color}}>{k.value}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{marginBottom:18}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>利用者別 送迎コスト</div>
                {users.length===0 ? <div style={{color:"#94a3b8",fontSize:13}}>利用者データがありません</div> : users.map(u=>{
                  const uT=transportLog.filter(t=>t.user_id===u.id);
                  const uC=uT.reduce((s,t)=>s+t.cost,0);
                  const maxC=Math.max(...users.map(uu=>transportLog.filter(t=>t.user_id===uu.id).reduce((s,t)=>s+t.cost,0)),1);
                  return(
                    <div key={u.id} style={{padding:"9px 0",borderBottom:"1px solid #f8fafc"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <div style={{fontWeight:600,fontSize:13}}>{u.name}</div>
                        <div style={{display:"flex",gap:10,alignItems:"center"}}>
                          <span style={{fontSize:12,color:"#94a3b8"}}>{uT.length}回</span>
                          <span className="mono" style={{fontWeight:700,color:"#059669",fontSize:13}}>¥{fmt(uC)}</span>
                        </div>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{width:(uC/maxC*100)+"%",background:"linear-gradient(90deg,#059669,#34d399)"}}/></div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>送迎記録一覧</div>
                {transportLog.length===0 ? <div style={{color:"#94a3b8",fontSize:13,padding:"20px 0",textAlign:"center"}}>記録がありません。「送迎記録追加」から登録してください。</div> : (
                  <table>
                    <thead><tr><th>日付</th><th>時刻</th><th>利用者</th><th>種別</th><th>目的地</th><th>担当</th><th>距離</th><th>コスト</th></tr></thead>
                    <tbody>
                      {[...transportLog].reverse().map((t,i)=>(
                        <tr key={i} className="row-hover">
                          <td className="mono" style={{fontSize:12}}>{t.date}</td>
                          <td className="mono" style={{fontSize:12}}>{t.time}</td>
                          <td style={{fontWeight:600}}>{t.user_name}</td>
                          <td><span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{t.type}</span></td>
                          <td>{t.destination}</td>
                          <td style={{fontSize:12}}>{t.driver}</td>
                          <td className="mono">{t.distance}km</td>
                          <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{fmt(t.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}>
                  <button className="btn btn-secondary" onClick={()=>downloadCSV(transportLog,"送迎記録")}><Icon name="download" size={13}/>CSVダウンロード</button>
                </div>
              </div>
              {showAddTransport && (
                <div className="modal-overlay" onClick={()=>setShowAddTransport(false)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                      <div style={{fontWeight:700,fontSize:17}}>送迎記録の追加</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setShowAddTransport(false)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gap:12}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label><input className="input" type="date" value={newTransport.date} onChange={e=>setNewTransport({...newTransport,date:e.target.value})}/></div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時刻</label><input className="input" type="time" value={newTransport.time} onChange={e=>setNewTransport({...newTransport,time:e.target.value})}/></div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                        <select className="input" value={newTransport.user_id} onChange={e=>setNewTransport({...newTransport,user_id:e.target.value})}>
                          <option value="">選択してください</option>
                          {users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>種別</label>
                          <select className="input" value={newTransport.type} onChange={e=>setNewTransport({...newTransport,type:e.target.value})}>
                            {["送迎（往）","送迎（復）","通院送迎","その他"].map(v=><option key={v}>{v}</option>)}
                          </select>
                        </div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当ドライバー</label>
                          <select className="input" value={newTransport.driver} onChange={e=>setNewTransport({...newTransport,driver:e.target.value})}>
                            {initialStaffList.map(s=><option key={s.id}>{s.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>目的地</label><input className="input" placeholder="就労支援センター" value={newTransport.destination} onChange={e=>setNewTransport({...newTransport,destination:e.target.value})}/></div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>距離 (km)</label><input className="input" type="number" step="0.1" value={newTransport.distance} onChange={e=>setNewTransport({...newTransport,distance:e.target.value})}/></div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>コスト (円)</label><input className="input" type="number" value={newTransport.cost} onChange={e=>setNewTransport({...newTransport,cost:e.target.value})}/></div>
                      </div>
                      <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"11px"}} onClick={saveTransport}><Icon name="check" size={14}/>記録を保存</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CLAIMS */}
          {activeTab==="claims" && (
            <div className="fade-in">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>国保連請求管理</div>
                  <div style={{fontSize:13,color:"#94a3b8"}}>請求データ一覧</div>
                </div>
                <button className="btn btn-secondary" onClick={()=>downloadCSV(claimData,"国保連請求データ")}><Icon name="download" size={13}/>請求データ出力</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
                {[
                  {label:"請求総額",value:"¥"+fmt(totalClaim),color:"#2563eb",icon:"📋"},
                  {label:"請求済",value:claimData.filter(c=>c.status==="請求済").length+"件",color:"#d97706",icon:"⏳"},
                  {label:"入金済",value:claimData.filter(c=>c.status==="入金済").length+"件",color:"#059669",icon:"✅"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{fontSize:12,color:"#64748b"}}>{k.label}</div><div style={{fontSize:18}}>{k.icon}</div>
                    </div>
                    <div className="mono" style={{fontSize:24,fontWeight:800,color:k.color}}>{k.value}</div>
                  </div>
                ))}
              </div>
              <div className="card" style={{marginBottom:18}}>
                {claimData.length===0 ? <div style={{color:"#94a3b8",fontSize:13,padding:"20px",textAlign:"center"}}>請求データがありません</div> : (
                  <table>
                    <thead><tr><th>利用者</th><th>サービス</th><th>日数</th><th>単価</th><th>請求額</th><th>ステータス</th><th>請求日</th><th>操作</th></tr></thead>
                    <tbody>
                      {claimData.map((c,i)=>(
                        <tr key={i} className="row-hover">
                          <td style={{fontWeight:600}}>{c.user_name}</td>
                          <td>{c.service}</td>
                          <td className="mono">{c.days}日</td>
                          <td className="mono">¥{fmt(c.unit_price)}</td>
                          <td className="mono" style={{fontWeight:700}}>¥{fmt(c.total)}</td>
                          <td><span className="tag" style={{background:c.status==="入金済"?"#ecfdf5":"#fef3c7",color:c.status==="入金済"?"#059669":"#d97706"}}>{c.status==="入金済"?"✓ ":"⏳ "}{c.status}</span></td>
                          <td className="mono" style={{fontSize:12}}>{c.claim_date}</td>
                          <td>{c.status==="請求済"&&<button className="btn btn-green" style={{padding:"4px 10px",fontSize:12}} onClick={()=>updateClaimStatus(c.id,"入金済")}>入金確認</button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {claimData.length>0 && (
                  <div style={{borderTop:"2px solid #e2e8f0",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:700,fontSize:13}}>合計</span>
                    <span className="mono" style={{fontWeight:800,fontSize:18,color:"#2563eb"}}>¥{fmt(totalClaim)}</span>
                  </div>
                )}
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>国保連電子請求 — 帳票ダウンロード</div>
                <div style={{fontSize:13,color:"#64748b",marginBottom:14}}>各種様式をCSVで出力できます</div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  {["サービス提供実績記録票","給付費明細書","請求書（様式第一）","受給者台帳"].map(label=>(
                    <button key={label} className="btn btn-secondary" onClick={()=>downloadCSV(claimData,label)}><Icon name="download" size={13}/>{label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNTING */}
          {activeTab==="accounting" && (
            <div className="fade-in">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>経理・決算管理</div>
                  <div style={{fontSize:13,color:"#94a3b8"}}>仕訳帳・帳簿ダウンロード</div>
                </div>
                <button className="btn btn-primary" onClick={()=>setShowAddEntry(true)}><Icon name="plus" size={14}/>仕訳入力</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:18}}>
                <div className="stat-card" style={{borderLeft:"4px solid #059669"}}>
                  <div style={{fontSize:12,color:"#64748b",marginBottom:8}}>収入合計</div>
                  <div className="mono" style={{fontSize:22,fontWeight:800,color:"#059669"}}>¥{fmt(totalIncome)}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>{entries.filter(e=>e.category==="収入").length}件</div>
                </div>
                <div className="stat-card" style={{borderLeft:"4px solid #ef4444"}}>
                  <div style={{fontSize:12,color:"#64748b",marginBottom:8}}>支出合計</div>
                  <div className="mono" style={{fontSize:22,fontWeight:800,color:"#ef4444"}}>¥{fmt(totalExpense)}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>{entries.filter(e=>e.category==="支出").length}件</div>
                </div>
                <div className="stat-card" style={{borderLeft:"4px solid #2563eb"}}>
                  <div style={{fontSize:12,color:"#64748b",marginBottom:8}}>収支差額</div>
                  <div className="mono" style={{fontSize:22,fontWeight:800,color:totalIncome-totalExpense>=0?"#059669":"#ef4444"}}>
                    {totalIncome-totalExpense>=0?"+":""}¥{fmt(totalIncome-totalExpense)}
                  </div>
                  <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>累計</div>
                </div>
              </div>
              <div className="card" style={{marginBottom:18}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>仕訳帳</div>
                {entries.length===0 ? <div style={{color:"#94a3b8",fontSize:13,padding:"20px",textAlign:"center"}}>仕訳データがありません。「仕訳入力」から登録してください。</div> : (
                  <table>
                    <thead><tr><th>日付</th><th>区分</th><th>科目</th><th>摘要</th><th>借方</th><th>貸方</th><th>金額</th></tr></thead>
                    <tbody>
                      {entries.map((e,i)=>(
                        <tr key={i} className="row-hover">
                          <td className="mono" style={{fontSize:12}}>{e.date}</td>
                          <td><span className="tag" style={{background:e.category==="収入"?"#ecfdf5":"#fef2f2",color:e.category==="収入"?"#059669":"#ef4444"}}>{e.category}</span></td>
                          <td style={{fontWeight:500}}>{e.sub_category}</td>
                          <td style={{color:"#64748b",fontSize:12}}>{e.description}</td>
                          <td style={{fontSize:12}}>{e.debit}</td>
                          <td style={{fontSize:12}}>{e.credit}</td>
                          <td className="mono" style={{fontWeight:700,color:e.category==="収入"?"#059669":"#374151"}}>¥{fmt(e.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>決算帳簿ダウンロード</div>
                <div style={{fontSize:13,color:"#64748b",marginBottom:14}}>CSV形式で各種帳簿をダウンロードできます</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
                  {[
                    {label:"仕訳帳（全件）",data:entries,filename:"仕訳帳"},
                    {label:"収入一覧",data:entries.filter(e=>e.category==="収入"),filename:"収入一覧"},
                    {label:"支出一覧",data:entries.filter(e=>e.category==="支出"),filename:"支出一覧"},
                    {label:"送迎コスト台帳",data:transportLog,filename:"送迎コスト台帳"},
                    {label:"利用者一覧",data:users,filename:"利用者一覧"},
                    {label:"国保連請求一覧",data:claimData,filename:"国保連請求一覧"},
                  ].map((item,i)=>(
                    <div key={i} style={{border:"1px solid #e2e8f0",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontWeight:600,fontSize:13}}>{item.label}</div>
                      <button className="btn btn-green" style={{padding:"5px 11px",flexShrink:0}} onClick={()=>downloadCSV(item.data,item.filename)}><Icon name="download" size={13}/>CSV</button>
                    </div>
                  ))}
                </div>
              </div>
              {showAddEntry && (
                <div className="modal-overlay" onClick={()=>setShowAddEntry(false)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                      <div style={{fontWeight:700,fontSize:17}}>仕訳入力</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setShowAddEntry(false)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gap:12}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label><input className="input" type="date" value={newEntry.date} onChange={e=>setNewEntry({...newEntry,date:e.target.value})}/></div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>区分</label>
                          <select className="input" value={newEntry.category} onChange={e=>setNewEntry({...newEntry,category:e.target.value})}>
                            <option>収入</option><option>支出</option>
                          </select>
                        </div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>科目</label><input className="input" placeholder="例：人件費" value={newEntry.sub_category} onChange={e=>setNewEntry({...newEntry,sub_category:e.target.value})}/></div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>摘要</label><input className="input" placeholder="取引内容を入力" value={newEntry.description} onChange={e=>setNewEntry({...newEntry,description:e.target.value})}/></div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>借方科目</label><input className="input" placeholder="普通預金" value={newEntry.debit} onChange={e=>setNewEntry({...newEntry,debit:e.target.value})}/></div>
                        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>貸方科目</label><input className="input" placeholder="事業収益" value={newEntry.credit} onChange={e=>setNewEntry({...newEntry,credit:e.target.value})}/></div>
                      </div>
                      <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>金額（円）</label><input className="input" type="number" placeholder="0" value={newEntry.amount} onChange={e=>setNewEntry({...newEntry,amount:e.target.value})}/></div>
                      <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"11px"}} onClick={saveEntry}><Icon name="check" size={14}/>仕訳を保存</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}