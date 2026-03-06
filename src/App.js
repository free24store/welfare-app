import React, { useState, useEffect, useRef } from "react";
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
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    news: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    hint: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    message: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    plan: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    chart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    file: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
    mic: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    wage: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  };
  return icons[name] || null;
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
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
  .btn-purple{background:#7c3aed;color:white;} .btn-purple:hover{background:#6d28d9;}
  .btn-sm{padding:5px 10px;font-size:12px;}
  .tag{display:inline-block;padding:2px 10px;border-radius:99px;font-size:11px;font-weight:600;}
  .input{border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;width:100%;outline:none;transition:border .15s;font-family:inherit;}
  .input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1);}
  .textarea{border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;width:100%;outline:none;resize:vertical;font-family:inherit;min-height:80px;}
  .textarea:focus{border-color:#3b82f6;}
  .nav-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:12.5px;font-weight:500;color:#64748b;transition:all .15s;border:none;background:transparent;width:100%;text-align:left;}
  .nav-item:hover{background:#f1f5f9;color:#1e293b;}
  .nav-item.active{background:#eff6ff;color:#2563eb;}
  .nav-group{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#cbd5e1;padding:10px 12px 4px;}
  .row-hover:hover{background:#f8fafc;cursor:pointer;}
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;}
  .modal{background:white;border-radius:16px;padding:28px;width:100%;max-width:680px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.25);}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;border-bottom:2px solid #f1f5f9;white-space:nowrap;}
  td{padding:10px 12px;border-bottom:1px solid #f8fafc;color:#374151;vertical-align:middle;}
  .stat-card{background:white;border-radius:14px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .mono{font-family:'DM Mono',monospace;}
  .fade-in{animation:fadeIn .2s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .alert-badge{background:#ef4444;color:white;border-radius:99px;font-size:10px;font-weight:700;padding:1px 6px;margin-left:auto;}
  .timebadge{background:#1e3a8a;color:white;border-radius:6px;padding:2px 8px;font-size:11px;font-family:'DM Mono',monospace;}
  .hint-card{border-left:4px solid #f59e0b;background:#fffbeb;border-radius:0 12px 12px 0;padding:12px 16px;margin-bottom:10px;}
`;

const HINTS = [
  {title:"夜間支援体制加算（Ⅰ）",points:"夜間に常駐の夜間支援員を配置することで算定可能。夜勤記録の整備が必須。",cat:"体制加算",pri:"高"},
  {title:"強度行動障害支援者養成研修加算",points:"基礎研修・実践研修修了者を配置。修了証の管理と記録が必要。",cat:"人員加算",pri:"高"},
  {title:"個別支援計画未作成減算（回避）",points:"個別支援計画は6ヶ月ごとの見直しが必要。作成漏れは減算対象。",cat:"減算回避",pri:"高"},
  {title:"精神障害者地域移行特別加算",points:"精神科病院から退院後1年以内の利用者に算定可能。受入れ記録の保管が必要。",cat:"対象者加算",pri:"中"},
  {title:"医療連携体制加算（Ⅳ）",points:"看護師等との連携協定を締結し、医療的ケアを提供することで算定。",cat:"医療連携",pri:"中"},
  {title:"自立生活支援加算",points:"一人暮らし等を希望する利用者への支援計画作成で算定。本人同意書と支援記録が必要。",cat:"支援加算",pri:"中"},
  {title:"食事提供体制加算",points:"施設内で食事を提供する場合に算定可能。食事記録・献立表の整備が必要。",cat:"サービス加算",pri:"低"},
];

const NEWS = [
  {id:1,date:"2026-03-01",title:"令和6年度障害福祉サービス等報酬改定について",source:"国保連",tag:"重要",url:"https://www.wam.go.jp/"},
  {id:2,date:"2026-02-20",title:"電子請求受付システムメンテナンスのお知らせ（3月10日）",source:"国保連",tag:"お知らせ",url:"https://www.e-seikyuu.jp/"},
  {id:3,date:"2026-02-15",title:"共同生活援助（グループホーム）の報酬算定構造の変更点",source:"厚労省",tag:"改定",url:"https://www.mhlw.go.jp/"},
  {id:4,date:"2026-02-01",title:"令和6年度介護給付費等の請求及び受付・審査の流れ",source:"国保連",tag:"手続き",url:"https://www.e-seikyuu.jp/"},
];

function UserMsgScreen({onBack}) {
  const [code,setCode]=useState("");
  const [msg,setMsg]=useState("");
  const [cat,setCat]=useState("体調報告");
  const [sent,setSent]=useState(false);
  const [err,setErr]=useState("");
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    supabase.from("users").select("id,name,access_code").then(({data})=>setUsers(data||[]));
  },[]);
  const send = async () => {
    const u=users.find(x=>x.access_code===code);
    if(!u){setErr("アクセスコードが違います");return;}
    await supabase.from("user_messages").insert({user_id:u.id,user_name:u.name,access_code:code,message:msg,category:cat,is_read:false});
    setSent(true);
  };
  return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e3a8a)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:440,boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        {sent?(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>✅</div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:6}}>送信完了</div>
            <div style={{fontSize:13,color:"#64748b",marginBottom:24}}>スタッフに届きました</div>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setSent(false);setMsg("");setCode("");}}>もう一度送る</button>
          </div>
        ):(
          <>
            <div style={{fontWeight:700,fontSize:18,marginBottom:16,textAlign:"center"}}>メッセージ送信</div>
            <div style={{display:"grid",gap:12}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>アクセスコード</label><input className="input" placeholder="コードを入力" value={code} onChange={e=>setCode(e.target.value)}/>{err&&<div style={{color:"#ef4444",fontSize:12,marginTop:4}}>{err}</div>}</div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>種類</label><select className="input" value={cat} onChange={e=>setCat(e.target.value)}>{["体調報告","外出連絡","相談・お願い","緊急連絡","その他"].map(v=><option key={v}>{v}</option>)}</select></div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>メッセージ</label><textarea className="textarea" style={{minHeight:120}} value={msg} onChange={e=>setMsg(e.target.value)}/></div>
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px"}} onClick={send}><Icon name="message" size={15}/>送信する</button>
              <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={onBack}>← 戻る</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState("select");
  const [isAdmin, setIsAdmin] = useState(false);
  const [me, setMe] = useState(null);
  const [adminPin, setAdminPin] = useState("");
  const [staffPin, setStaffPin] = useState("");
  const [pinErr, setPinErr] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [transport, setTransport] = useState([]);
  const [entries, setEntries] = useState([]);
  const [claims, setClaims] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [srecs, setSrecs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [perfs, setPerfs] = useState([]);
  const [wages, setWages] = useState([]);
  const [files, setFiles] = useState([]);
  const [scheds, setScheds] = useState([]);
  const [msgs, setMsgs] = useState([]);

  const [selUser, setSelUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0,10));
  const [fUser, setFUser] = useState("");
  const [fUnit, setFUnit] = useState("全棟");
  const [fCat, setFCat] = useState("全て");
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().slice(0,10);
  const fmt = n => Number(n||0).toLocaleString("ja-JP");
  const unread = msgs.filter(m=>!m.is_read).length;

  useEffect(() => { if(auth==="app") loadAll(); }, [auth]);

  const loadAll = async () => {
    setLoading(true);
    const [u,t,e,c,a,sr,sp,mo,pr,wr,fr,sc,um,st] = await Promise.all([
      supabase.from("users").select("*").order("id"),
      supabase.from("transport_log").select("*").order("date",{ascending:false}),
      supabase.from("accounting_entries").select("*").order("date",{ascending:false}),
      supabase.from("claim_data").select("*").order("id"),
      supabase.from("attendance").select("*").order("date",{ascending:false}),
      supabase.from("support_records").select("*").order("date",{ascending:false}),
      supabase.from("support_plans").select("*").order("created_at",{ascending:false}),
      supabase.from("monitoring").select("*").order("date",{ascending:false}),
      supabase.from("performance_records").select("*").order("date",{ascending:false}),
      supabase.from("wage_records").select("*").order("year_month",{ascending:false}),
      supabase.from("file_records").select("*").order("date",{ascending:false}),
      supabase.from("schedules").select("*").order("start_date",{ascending:false}),
      supabase.from("user_messages").select("*").order("created_at",{ascending:false}),
      supabase.from("staff_members").select("*").order("id"),
    ]);
    setUsers(u.data||[]); setTransport(t.data||[]); setEntries(e.data||[]);
    setClaims(c.data||[]); setAttendance(a.data||[]); setSrecs(sr.data||[]);
    setPlans(sp.data||[]); setMonitors(mo.data||[]); setPerfs(pr.data||[]);
    setWages(wr.data||[]); setFiles(fr.data||[]); setScheds(sc.data||[]);
    setMsgs(um.data||[]); setStaffList(st.data||[]);
    setLoading(false);
  };

  const preloadStaff = async () => {
    const {data} = await supabase.from("staff_members").select("*").order("id");
    setStaffList(data||[]); setAuth("staff_pin");
  };
  const loginStaff = () => {
    setPinErr("");
    const f = staffList.find(s=>s.pin===staffPin);
    if(f){setMe(f);setIsAdmin(false);setAuth("app");setTab("attendance");}
    else setPinErr("PINコードが違います");
  };
  const loginAdmin = async () => {
    setPinErr("");
    const {data} = await supabase.from("app_settings").select("value").eq("key","admin_pin").single();
    if(data?.value===adminPin){setIsAdmin(true);setMe(null);setAuth("app");setTab("dashboard");}
    else setPinErr("管理者PINが違います");
  };
  const logout = () => {setAuth("select");setIsAdmin(false);setMe(null);setAdminPin("");setStaffPin("");};

  const openModal = (name,init={}) => {setForm(init);setModal(name);setEditId(null);};
  const openEdit = (name,row) => {setForm({...row});setModal(name);setEditId(row.id);};
  const closeModal = () => {setModal(null);setEditId(null);};

  const save = async (tbl,extra={}) => {
    const p = {...form,...extra};
    if(editId) await supabase.from(tbl).update(p).eq("id",editId);
    else await supabase.from(tbl).insert(p);
    closeModal(); loadAll();
  };
  const del = async (tbl,id) => {
    if(!window.confirm("削除しますか？")) return;
    await supabase.from(tbl).delete().eq("id",id); loadAll();
  };

  const clockIn = async () => {
    if(attendance.find(a=>a.staff_id===me?.id&&a.date===today&&!a.clock_out)){alert("すでに出勤打刻済みです");return;}
    await supabase.from("attendance").insert({staff_id:me.id,staff_name:me.name,clock_in:new Date().toISOString(),date:today});
    loadAll();
  };
  const clockOut = async () => {
    const ex = attendance.find(a=>a.staff_id===me?.id&&a.date===today&&!a.clock_out);
    if(!ex){alert("出勤打刻がありません");return;}
    await supabase.from("attendance").update({clock_out:new Date().toISOString()}).eq("id",ex.id);
    loadAll();
  };

  const csv = (data,name) => {
    if(!data||!data.length) return;
    const h = Object.keys(data[0]).join(",");
    const r = data.map(row=>Object.values(row).map(v=>typeof v==="string"&&v.includes(",")?`"${v}"`:v??'').join(",")).join("\n");
    const b = new Blob(["\uFEFF"+h+"\n"+r],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(b);const a=document.createElement("a");a.href=url;a.download=name+".csv";a.click();URL.revokeObjectURL(url);
  };

  const totalInc = entries.filter(e=>e.category==="収入").reduce((s,e)=>s+e.amount,0);
  const totalExp = entries.filter(e=>e.category==="支出").reduce((s,e)=>s+e.amount,0);
  const totalClaim = claims.reduce((s,c)=>s+c.total,0);
  const overdueP = plans.filter(p=>p.review_date&&p.review_date<today&&p.status!=="完了");

  // フォームフィールド helper
  const F = ({label,k,type="text",opts,span}) => (
    <div style={span?{gridColumn:"1/-1"}:{}}>
      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>{label}</label>
      {opts
        ? <select className="input" value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}>{opts.map(v=><option key={v}>{v}</option>)}</select>
        : type==="textarea"
          ? <textarea className="textarea" value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
          : <input className="input" type={type} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
      }
    </div>
  );

  const PH = ({title,sub,onAdd,addLabel,extra}) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
      <div><div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>{title}</div>{sub&&<div style={{fontSize:13,color:"#94a3b8"}}>{sub}</div>}</div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>{extra}{onAdd&&<button className="btn btn-primary" onClick={onAdd}><Icon name="plus" size={14}/>{addLabel||"追加"}</button>}</div>
    </div>
  );

  const MD = ({name,table,children,wide}) => modal===name && (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" style={wide?{maxWidth:900}:{}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
          <div style={{fontWeight:700,fontSize:17}}>{editId?"編集":"新規"} — {name}</div>
          <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={closeModal}><Icon name="close" size={15}/></button>
        </div>
        <div style={{display:"grid",gap:11}}>{children}</div>
        {table&&<button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"11px",marginTop:14}} onClick={()=>save(table)}><Icon name="check" size={14}/>{editId?"変更保存":"保存"}</button>}
      </div>
    </div>
  );

  // ── ログイン画面 ──
  if(auth==="select") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#1e3a8a,#1e293b)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:44,width:"100%",maxWidth:440,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{width:68,height:68,borderRadius:18,background:"linear-gradient(135deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px"}}>🏠</div>
        <div style={{fontWeight:800,fontSize:22,color:"#0f172a",marginBottom:4}}>グループホーム管理システム</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:32}}>あおば福祉会</div>
        <div style={{display:"grid",gap:12}}>
          <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15}} onClick={preloadStaff}><Icon name="staff" size={18}/>スタッフログイン</button>
          <button className="btn btn-purple" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15}} onClick={()=>setAuth("admin_pin")}><Icon name="shield" size={18}/>管理者ログイン</button>
          <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center",padding:"12px"}} onClick={()=>setAuth("user_msg")}><Icon name="message" size={16}/>利用者メッセージ送信</button>
        </div>
      </div>
    </div>
  );

  if(auth==="staff_pin") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#1e3a8a,#1e293b)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{fontWeight:700,fontSize:18,marginBottom:16}}>スタッフログイン</div>
        <select className="input" style={{marginBottom:10,textAlign:"center"}} onChange={e=>{const s=staffList.find(st=>st.id===parseInt(e.target.value));setMe(s);}}>
          <option value="">スタッフを選択...</option>
          {staffList.map(s=><option key={s.id} value={s.id}>{s.name}（{s.role}）</option>)}
        </select>
        <input className="input" type="password" maxLength={6} placeholder="PINコード" style={{textAlign:"center",fontSize:22,letterSpacing:10,marginBottom:8}} value={staffPin} onChange={e=>setStaffPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginStaff()}/>
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8}} onClick={loginStaff}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setStaffPin("");setPinErr("");}}>← 戻る</button>
      </div>
    </div>
  );

  if(auth==="admin_pin") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#4c1d95,#1e293b)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#7c3aed,#4c1d95)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Icon name="shield" size={22}/></div>
        <div style={{fontWeight:700,fontSize:18,marginBottom:16}}>管理者ログイン</div>
        <input className="input" type="password" maxLength={6} placeholder="管理者PIN" style={{textAlign:"center",fontSize:24,letterSpacing:10,marginBottom:8}} value={adminPin} onChange={e=>setAdminPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginAdmin()}/>
        <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>デフォルト: 1234</div>
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button className="btn btn-purple" style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8}} onClick={loginAdmin}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setAdminPin("");setPinErr("");}}>← 戻る</button>
      </div>
    </div>
  );

  if(auth==="user_msg") {
    return <UserMsgScreen onBack={()=>setAuth("select")}/>;
  }

  if(loading) return <div style={{fontFamily:"'Noto Sans JP',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"#94a3b8",fontSize:14}}><style>{CSS}</style>⏳ 読み込み中...</div>;

  const adminTabs = [
    {g:"概要",items:[{id:"dashboard",label:"ダッシュボード",icon:"home"}]},
    {g:"利用者支援",items:[
      {id:"user_status",label:"利用者状況",icon:"users"},
      {id:"srecs",label:"支援記録",icon:"book"},
      {id:"srec_table",label:"支援記録表",icon:"list"},
      {id:"journal",label:"業務日誌",icon:"calendar"},
      {id:"plans",label:"支援計画・モニタリング",icon:"plan"},
    ]},
    {g:"実績・工賃",items:[
      {id:"perf_daily",label:"実績管理（日別）",icon:"chart"},
      {id:"perf_sum",label:"実績管理（集計）",icon:"chart"},
      {id:"wage",label:"工賃計算表",icon:"wage"},
    ]},
    {g:"スタッフ",items:[
      {id:"staff",label:"スタッフ管理",icon:"staff"},
      {id:"att_admin",label:"勤怠管理",icon:"clock"},
    ]},
    {g:"送迎・経理",items:[
      {id:"transport",label:"送迎管理",icon:"car"},
      {id:"claims",label:"国保連請求",icon:"claim"},
      {id:"accounting",label:"経理・決算",icon:"accounting"},
    ]},
    {g:"予定・連絡",items:[
      {id:"scheds",label:"予定管理",icon:"calendar"},
      {id:"msgs",label:"利用者メッセージ",icon:"message",badge:unread},
    ]},
    {g:"情報管理",items:[
      {id:"files",label:"ファイル・会議報告書",icon:"file"},
      {id:"hints",label:"加算ヒント",icon:"hint"},
      {id:"news",label:"最新ニュース",icon:"news"},
    ]},
  ];
  const staffTabs = [
    {g:"業務",items:[
      {id:"attendance",label:"勤怠打刻",icon:"clock"},
      {id:"srecs",label:"支援記録入力",icon:"book"},
      {id:"journal",label:"業務日誌確認",icon:"calendar"},
      {id:"transport",label:"送迎記録",icon:"car"},
    ]},
    {g:"連絡",items:[
      {id:"msgs",label:"利用者メッセージ",icon:"message",badge:unread},
      {id:"scheds",label:"予定確認",icon:"calendar"},
    ]},
  ];
  const tabs = isAdmin ? adminTabs : staffTabs;

  return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#f0f4f8",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      <header style={{background:"white",borderBottom:"1px solid #e2e8f0",padding:"0 18px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:isAdmin?"linear-gradient(135deg,#7c3aed,#4c1d95)":"linear-gradient(135deg,#2563eb,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🏠</div>
          <div><div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>グループホーム管理</div><div style={{fontSize:10,color:"#94a3b8"}}>{isAdmin?"👑 管理者":`👤 ${me?.name}`}</div></div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {unread>0&&<span style={{background:"#ef4444",color:"white",borderRadius:99,fontSize:11,fontWeight:700,padding:"2px 8px"}}>📩 {unread}</span>}
          <button className="btn btn-secondary btn-sm" onClick={logout}><Icon name="logout" size={13}/>ログアウト</button>
        </div>
      </header>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <aside style={{width:196,background:"white",borderRight:"1px solid #e2e8f0",padding:"8px 6px",flexShrink:0,overflowY:"auto"}}>
          {tabs.map(g=>(
            <div key={g.g}>
              <div className="nav-group">{g.g}</div>
              {g.items.map(t=>(
                <button key={t.id} className={`nav-item ${tab===t.id?"active":""}`} onClick={()=>{setTab(t.id);setSearch("");}}>
                  <Icon name={t.icon} size={14}/>{t.label}
                  {t.badge>0&&<span className="alert-badge">{t.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main style={{flex:1,padding:"18px",overflowY:"auto",overflowX:"hidden"}}>

          {/* ── DASHBOARD ── */}
          {tab==="dashboard"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>ダッシュボード</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:18}}>{today}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,marginBottom:18}}>
                {[
                  {l:"在籍利用者",v:users.filter(u=>u.status==="在籍").length+"名",s:`外泊 ${users.filter(u=>u.status==="外泊中").length}名`,c:"#2563eb",i:"👥"},
                  {l:"本日出勤",v:attendance.filter(a=>a.date===today).length+"名",s:"打刻済",c:"#059669",i:"⏰"},
                  {l:"未読メッセージ",v:unread+"件",s:"利用者から",c:"#ef4444",i:"📩"},
                  {l:"国保連請求",v:"¥"+fmt(totalClaim),s:`${claims.length}件`,c:"#7c3aed",i:"📄"},
                  {l:"収支差額",v:(totalInc-totalExp>=0?"+":"")+"¥"+fmt(totalInc-totalExp),s:"累計",c:totalInc-totalExp>=0?"#059669":"#ef4444",i:"💰"},
                  {l:"支援計画期限超過",v:overdueP.length+"件",s:"更新要",c:"#f59e0b",i:"⚠️"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderLeft:`4px solid ${k.c}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:11,color:"#64748b",fontWeight:500}}>{k.l}</div><div style={{fontSize:18}}>{k.i}</div></div>
                    <div className="mono" style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:2}}>{k.v}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>{k.s}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>⚠️ 要対応事項</div>
                  {[
                    {t:`外泊中 ${users.filter(u=>u.status==="外泊中").length}名 — 帰宅確認`,w:true},
                    {t:`支援計画期限超過 ${overdueP.length}件`,w:overdueP.length>0},
                    {t:`未読メッセージ ${unread}件`,w:unread>0},
                    {t:`国保連入金待ち ${claims.filter(c=>c.status==="請求済").length}件`,w:false},
                  ].map((a,i)=>(
                    <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<3?"1px solid #f8fafc":"none",alignItems:"flex-start"}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:a.w?"#ef4444":"#3b82f6",marginTop:5,flexShrink:0}}/>
                      <div style={{fontSize:13}}>{a.t}</div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📋 本日の支援記録状況</div>
                  {users.filter(u=>u.status==="在籍").slice(0,7).map(u=>{
                    const rec=srecs.find(r=>r.user_id===u.id&&r.date===today);
                    return(
                      <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #f8fafc"}}>
                        <div style={{fontSize:13,fontWeight:500}}>{u.name}</div>
                        {rec?<span className="tag" style={{background:"#ecfdf5",color:"#059669"}}>✓ 記録済</span>:<span className="tag" style={{background:"#fef3c7",color:"#d97706"}}>未記録</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── 利用者状況 ── */}
          {tab==="user_status"&&(
            <div className="fade-in">
              <PH title="利用者状況" sub={`在籍 ${users.filter(u=>u.status==="在籍").length}名`}
                onAdd={isAdmin?()=>openModal("利用者",{name:"",kana:"",age:"",disability:"",support_level:"1",room:"",unit:"A棟",admission_date:"",status:"在籍",guardian:"",guardian_tel:"",medication_note:"",access_code:""}):null}
                addLabel="新規登録"
                extra={<select className="input" style={{width:110}} value={fUnit} onChange={e=>setFUnit(e.target.value)}>{["全棟","A棟","B棟","C棟"].map(v=><option key={v}>{v}</option>)}</select>}
              />
              <div style={{display:"grid",gap:10}}>
                {users.filter(u=>(fUnit==="全棟"||u.unit===fUnit)&&(u.name.includes(search)||!search)).map(u=>{
                  const rec=srecs.find(r=>r.user_id===u.id&&r.date===today);
                  const planOD=plans.find(p=>p.user_id===u.id&&p.review_date&&p.review_date<today&&p.status!=="完了");
                  return(
                    <div key={u.id} className="card" style={{cursor:"pointer"}} onClick={()=>setSelUser(u)}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:42,height:42,borderRadius:11,background:`hsl(${u.id*60},55%,88%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{u.name[0]}</div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                            <div style={{fontWeight:700,fontSize:14}}>{u.name}</div>
                            <span className="tag" style={{background:u.status==="在籍"?"#ecfdf5":u.status==="外泊中"?"#fef3c7":"#fee2e2",color:u.status==="在籍"?"#059669":u.status==="外泊中"?"#d97706":"#ef4444"}}>{u.status}</span>
                            {u.unit&&<span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{u.unit}</span>}
                            {planOD&&<span className="tag" style={{background:"#fee2e2",color:"#ef4444"}}>⚠️計画期限超過</span>}
                          </div>
                          <div style={{display:"flex",gap:12,fontSize:12,color:"#64748b",flexWrap:"wrap"}}>
                            <span>🏠 {u.room}号室</span><span>{u.age}歳</span><span>区分{u.support_level}</span><span>{u.disability}</span>
                          </div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          {rec?<span className="tag" style={{background:"#ecfdf5",color:"#059669"}}>本日記録済</span>:<span className="tag" style={{background:"#fef3c7",color:"#d97706"}}>本日未記録</span>}
                          {u.access_code&&<div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>CODE: {u.access_code}</div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {selUser&&(
                <div className="modal-overlay" onClick={()=>setSelUser(null)}>
                  <div className="modal" onClick={e=>e.stopPropagation()}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
                      <div style={{fontWeight:700,fontSize:17}}>{selUser.name} さん</div>
                      <button className="btn btn-secondary" style={{padding:"5px 8px"}} onClick={()=>setSelUser(null)}><Icon name="close" size={15}/></button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
                      {[["フリガナ",selUser.kana],["年齢",selUser.age+"歳"],["部屋",selUser.room+"号室"],["棟",selUser.unit],["障害種別",selUser.disability],["支援区分","区分"+selUser.support_level],["ステータス",selUser.status],["入居日",selUser.admission_date],["保護者",selUser.guardian],["保護者連絡先",selUser.guardian_tel],["投薬",selUser.medication_note],["アクセスコード",selUser.access_code||"未設定"]].map(([k,v])=>(
                        <div key={k} style={{background:"#f8fafc",borderRadius:8,padding:"8px 11px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>{k}</div><div style={{fontSize:13,fontWeight:600}}>{v}</div></div>
                      ))}
                    </div>
                    {isAdmin&&<div style={{display:"flex",gap:8}}>
                      <button className="btn btn-primary" style={{flex:1}} onClick={()=>{openEdit("利用者",selUser);setSelUser(null);}}><Icon name="edit" size={13}/>編集</button>
                      <button className="btn btn-secondary" style={{flex:1}} onClick={()=>csv([selUser],selUser.name+"_個人票")}><Icon name="download" size={13}/>個人票</button>
                      <button className="btn btn-red" onClick={()=>del("users",selUser.id).then(()=>setSelUser(null))}><Icon name="trash" size={13}/></button>
                    </div>}
                  </div>
                </div>
              )}
              <MD name="利用者" table="users">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="名前" k="name"/><F label="フリガナ" k="kana"/>
                  <F label="年齢" k="age" type="number"/><F label="部屋番号" k="room"/>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]}/><F label="支援区分" k="support_level" opts={["1","2","3","4","5","6"]}/>
                  <F label="ステータス" k="status" opts={["在籍","外泊中","退去","入院中"]}/><F label="入居日" k="admission_date" type="date"/>
                  <F label="保護者" k="guardian"/><F label="保護者連絡先" k="guardian_tel"/>
                </div>
                <F label="障害種別" k="disability"/>
                <F label="投薬メモ" k="medication_note" type="textarea"/>
                <F label="利用者アクセスコード（メッセージ用）" k="access_code"/>
              </MD>
            </div>
          )}

          {/* ── 支援記録 ── */}
          {tab==="srecs"&&(
            <div className="fade-in">
              <PH title="支援記録" sub="日々の支援内容"
                onAdd={()=>openModal("支援記録",{user_id:"",date:today,time_slot:"日中",staff_name:me?.name||"管理者",health:"良好",meal:"完食",content:"",activity:"",behavior:"",note:""})}
                addLabel="記録追加"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="date" style={{width:150}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                  <select className="input" style={{width:120}} value={fUser} onChange={e=>setFUser(e.target.value)}>
                    <option value="">全利用者</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                  {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs,"支援記録")}><Icon name="download" size={13}/>CSV</button>}
                </div>}
              />
              <div style={{display:"grid",gap:10}}>
                {srecs.filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).slice(0,30).map((r,i)=>(
                  <div key={i} className="card">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{fontWeight:700,fontSize:14}}>{r.user_name}</div>
                        <span className="timebadge">{r.time_slot||"日中"}</span>
                        <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{r.date}</span>
                        <span style={{fontSize:12,color:"#64748b"}}>{r.staff_name}</span>
                      </div>
                      <div style={{display:"flex",gap:6,flexShrink:0}}>
                        <span className="tag" style={{background:r.health==="良好"?"#ecfdf5":"#fef3c7",color:r.health==="良好"?"#059669":"#d97706"}}>{r.health}</span>
                        <span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{r.meal}</span>
                        {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>openEdit("支援記録",r)}><Icon name="edit" size={12}/></button>}
                        {isAdmin&&<button className="btn btn-red btn-sm" onClick={()=>del("support_records",r.id)}><Icon name="trash" size={12}/></button>}
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:13}}>
                      {r.content&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>支援内容</div>{r.content}</div>}
                      {r.activity&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>活動</div>{r.activity}</div>}
                      {r.behavior&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>様子</div>{r.behavior}</div>}
                      {r.note&&<div style={{background:"#fffbeb",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>特記</div>{r.note}</div>}
                    </div>
                  </div>
                ))}
                {srecs.filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).length===0&&(
                  <div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📝</div>記録がありません</div>
                )}
              </div>
              <MD name="支援記録" table="support_records">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date"/>
                  <F label="時間帯" k="time_slot" opts={["日中","夜間","深夜"]}/>
                  <F label="記録者" k="staff_name"/>
                  <F label="健康状態" k="health" opts={["良好","普通","不調","体調不良","通院"]}/>
                  <F label="食事" k="meal" opts={["完食","8割","半分","少量","欠食"]}/>
                </div>
                <F label="支援内容" k="content" type="textarea" span/>
                <F label="活動内容" k="activity" type="textarea" span/>
                <F label="様子・行動" k="behavior" type="textarea" span/>
                <F label="特記事項" k="note" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 支援記録表 ── */}
          {tab==="srec_table"&&(
            <div className="fade-in">
              <PH title="支援記録表" sub="利用者×日付マトリクス"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="month" style={{width:150}} value={fDate.slice(0,7)} onChange={e=>setFDate(e.target.value+"-01")}/>
                  {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs,"支援記録表")}><Icon name="download" size={13}/>CSV</button>}
                </div>}
              />
              <div className="card" style={{overflowX:"auto"}}>
                {(()=>{
                  const month=fDate.slice(0,7);
                  const [y,m]=month.split("-").map(Number);
                  const days=Array.from({length:new Date(y,m,0).getDate()},(_,i)=>i+1);
                  return(
                    <table>
                      <thead><tr>
                        <th style={{minWidth:80,position:"sticky",left:0,background:"white"}}>利用者</th>
                        {days.map(d=><th key={d} style={{minWidth:32,textAlign:"center",padding:"9px 4px"}}>{d}</th>)}
                      </tr></thead>
                      <tbody>
                        {users.filter(u=>u.status==="在籍").map(u=>(
                          <tr key={u.id} className="row-hover">
                            <td style={{fontWeight:600,fontSize:12,position:"sticky",left:0,background:"white",whiteSpace:"nowrap"}}>{u.name}</td>
                            {days.map(d=>{
                              const ds=`${month}-${String(d).padStart(2,"0")}`;
                              const recs=srecs.filter(r=>r.user_id===u.id&&r.date===ds);
                              return(
                                <td key={d} style={{textAlign:"center",padding:"4px 2px"}}>
                                  {recs.length>0
                                    ?<div title={recs.map(r=>r.staff_name).join(",")} style={{width:22,height:22,borderRadius:5,background:"#2563eb",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,margin:"0 auto",cursor:"pointer"}} onClick={()=>{setFDate(ds);setFUser(String(u.id));setTab("srecs");}}>{recs.length}</div>
                                    :<div style={{width:22,height:22,borderRadius:5,background:"#f1f5f9",margin:"0 auto"}}/>}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ── 業務日誌 ── */}
          {tab==="journal"&&(
            <div className="fade-in">
              <PH title="業務日誌" sub="引継ぎ・全利用者一覧"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="date" style={{width:160}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                  {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs.filter(r=>r.date===fDate),fDate+"_業務日誌")}><Icon name="download" size={13}/>CSV</button>}
                </div>}
              />
              {["日中","夜間","深夜"].map(slot=>{
                const recs=srecs.filter(r=>r.date===fDate&&r.time_slot===slot);
                return(
                  <div key={slot} style={{marginBottom:20}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <span className="timebadge" style={{fontSize:13,padding:"3px 12px"}}>{slot}</span>
                      <span style={{fontSize:13,color:"#64748b"}}>{recs.length}件</span>
                    </div>
                    {recs.length===0
                      ?<div style={{background:"#f8fafc",borderRadius:10,padding:"12px 16px",fontSize:13,color:"#94a3b8",textAlign:"center"}}>{slot}の記録はありません</div>
                      :<div style={{display:"grid",gap:8}}>
                        {recs.map((r,i)=>(
                          <div key={i} className="card" style={{padding:"12px 16px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                                <div style={{fontWeight:700,fontSize:13}}>{r.user_name}</div>
                                <span className="tag" style={{background:r.health==="良好"?"#ecfdf5":"#fef3c7",color:r.health==="良好"?"#059669":"#d97706"}}>{r.health}</span>
                                <span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>食事:{r.meal}</span>
                              </div>
                              <span style={{fontSize:11,color:"#94a3b8"}}>{r.staff_name}</span>
                            </div>
                            {r.content&&<div style={{fontSize:13,marginBottom:3}}>📝 {r.content}</div>}
                            {r.behavior&&<div style={{fontSize:13,marginBottom:3}}>👤 {r.behavior}</div>}
                            {r.note&&<div style={{fontSize:13,background:"#fffbeb",borderRadius:6,padding:"5px 10px",color:"#92400e"}}>⚠️ {r.note}</div>}
                          </div>
                        ))}
                      </div>
                    }
                  </div>
                );
              })}
            </div>
          )}

          {/* ── 支援計画・モニタリング ── */}
          {tab==="plans"&&isAdmin&&(
            <div className="fade-in">
              <PH title="支援計画・モニタリング" sub={`${plans.length}件`}
                onAdd={()=>openModal("支援計画",{user_id:"",period_start:"",period_end:"",goals:"",assessment:"",review_date:"",status:"作成中",created_by:""})}
                addLabel="計画作成"
              />
              <div style={{display:"grid",gap:10}}>
                {plans.map((p,i)=>{
                  const overdue=p.review_date&&p.review_date<today;
                  const mons=monitors.filter(m=>m.plan_id===p.id);
                  return(
                    <div key={i} className="card">
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                          <div style={{fontWeight:700,fontSize:14}}>{p.user_name}</div>
                          <span className="tag" style={{background:p.status==="進行中"?"#ecfdf5":"#eff6ff",color:p.status==="進行中"?"#059669":"#2563eb"}}>{p.status}</span>
                          {overdue&&<span className="tag" style={{background:"#fee2e2",color:"#ef4444"}}>⚠️ 期限超過</span>}
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openModal("モニタリング",{plan_id:p.id,user_id:p.user_id,user_name:p.user_name,date:today,evaluator:me?.name||"管理者",goal_achievement:"",issues:"",next_plan:"",status:"未完"})}>+モニタリング</button>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("支援計画",p)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("support_plans",p.id)}><Icon name="trash" size={12}/></button>
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:12,marginBottom:8}}>
                        <div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>期間</div>{p.period_start} 〜 {p.period_end}</div>
                        <div style={{background:overdue?"#fee2e2":"#f8fafc",borderRadius:8,padding:"7px 10px"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>更新日</div>{p.review_date||"未設定"}</div>
                        {p.goals&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:1}}>支援目標</div>{p.goals}</div>}
                      </div>
                      {mons.length>0&&<div style={{borderTop:"1px solid #f1f5f9",paddingTop:8}}>
                        <div style={{fontSize:11,color:"#94a3b8",marginBottom:6}}>モニタリング {mons.length}件</div>
                        {mons.slice(0,2).map((m,j)=>(
                          <div key={j} style={{fontSize:12,background:"#f0fdf4",borderRadius:6,padding:"5px 10px",marginBottom:4,display:"flex",justifyContent:"space-between"}}>
                            <span>{m.date} — {m.goal_achievement}</span><span style={{color:"#64748b"}}>{m.evaluator}</span>
                          </div>
                        ))}
                      </div>}
                    </div>
                  );
                })}
                {plans.length===0&&<div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📋</div>支援計画がありません</div>}
              </div>
              <MD name="支援計画" table="support_plans">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="ステータス" k="status" opts={["作成中","進行中","完了"]}/>
                  <F label="計画開始日" k="period_start" type="date"/>
                  <F label="計画終了日" k="period_end" type="date"/>
                  <F label="更新予定日" k="review_date" type="date"/>
                  <F label="作成者" k="created_by"/>
                </div>
                <F label="アセスメント" k="assessment" type="textarea" span/>
                <F label="支援目標" k="goals" type="textarea" span/>
              </MD>
              <MD name="モニタリング" table="monitoring">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="評価日" k="date" type="date"/>
                  <F label="評価者" k="evaluator"/>
                  <F label="ステータス" k="status" opts={["未完","実施済","承認済"]}/>
                </div>
                <F label="目標達成状況" k="goal_achievement" type="textarea" span/>
                <F label="課題・問題点" k="issues" type="textarea" span/>
                <F label="次期計画の方向性" k="next_plan" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 実績管理（日別） ── */}
          {tab==="perf_daily"&&isAdmin&&(
            <div className="fade-in">
              <PH title="実績管理（日別）" sub="サービス提供実績"
                onAdd={()=>openModal("実績",{user_id:"",date:fDate,service_type:"共同生活援助",start_time:"09:00",end_time:"17:00",support_category:"",staff_name:"",is_absence:false,note:""})}
                addLabel="実績追加"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="date" style={{width:150}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                  <button className="btn btn-secondary btn-sm" onClick={()=>csv(perfs.filter(r=>r.date===fDate),fDate+"_実績")}><Icon name="download" size={13}/>CSV</button>
                </div>}
              />
              <div className="card">
                <table>
                  <thead><tr><th>利用者</th><th>サービス</th><th>開始</th><th>終了</th><th>担当</th><th>状態</th><th>備考</th><th>操作</th></tr></thead>
                  <tbody>
                    {perfs.filter(r=>r.date===fDate).map((r,i)=>(
                      <tr key={i} className="row-hover">
                        <td style={{fontWeight:600}}>{r.user_name}</td>
                        <td>{r.service_type}</td>
                        <td className="mono" style={{fontSize:12}}>{r.start_time}</td>
                        <td className="mono" style={{fontSize:12}}>{r.end_time}</td>
                        <td style={{fontSize:12}}>{r.staff_name}</td>
                        <td>{r.is_absence?<span className="tag" style={{background:"#fee2e2",color:"#ef4444"}}>欠席</span>:<span className="tag" style={{background:"#ecfdf5",color:"#059669"}}>出席</span>}</td>
                        <td style={{fontSize:12,color:"#64748b"}}>{r.note}</td>
                        <td><div style={{display:"flex",gap:4}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("実績",r)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("performance_records",r.id)}><Icon name="trash" size={12}/></button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {perfs.filter(r=>r.date===fDate).length===0&&<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>この日の実績記録がありません</div>}
              </div>
              <MD name="実績" table="performance_records">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date"/>
                  <F label="サービス種別" k="service_type" opts={["共同生活援助","短期入所","日中支援"]}/>
                  <F label="担当スタッフ" k="staff_name"/>
                  <F label="開始時刻" k="start_time" type="time"/>
                  <F label="終了時刻" k="end_time" type="time"/>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>欠席</label>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                    <input type="checkbox" checked={form.is_absence||false} onChange={e=>setForm(f=>({...f,is_absence:e.target.checked}))}/>
                    <span style={{fontSize:13}}>欠席扱いにする</span>
                  </label>
                </div>
                <F label="備考" k="note" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 実績管理（集計） ── */}
          {tab==="perf_sum"&&isAdmin&&(
            <div className="fade-in">
              <PH title="実績管理（集計）" sub="月別・利用者別"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="month" style={{width:150}} value={fDate.slice(0,7)} onChange={e=>setFDate(e.target.value+"-01")}/>
                  <button className="btn btn-secondary btn-sm" onClick={()=>csv(perfs,"実績集計")}><Icon name="download" size={13}/>CSV</button>
                </div>}
              />
              <div className="card">
                <table>
                  <thead><tr><th>利用者</th><th>出席日数</th><th>欠席日数</th><th>出席率</th><th>主サービス</th></tr></thead>
                  <tbody>
                    {users.filter(u=>u.status==="在籍").map(u=>{
                      const month=fDate.slice(0,7);
                      const recs=perfs.filter(r=>r.user_id===u.id&&r.date?.startsWith(month));
                      const abs=recs.filter(r=>r.is_absence).length;
                      const pres=recs.length-abs;
                      const rate=recs.length>0?Math.round(pres/recs.length*100):0;
                      return(
                        <tr key={u.id} className="row-hover">
                          <td style={{fontWeight:600}}>{u.name}</td>
                          <td className="mono">{pres}日</td>
                          <td className="mono" style={{color:abs>0?"#ef4444":"#374151"}}>{abs}日</td>
                          <td><div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{flex:1,height:6,background:"#e2e8f0",borderRadius:3,overflow:"hidden"}}>
                              <div style={{height:"100%",width:rate+"%",background:rate>=80?"#059669":rate>=60?"#f59e0b":"#ef4444",borderRadius:3}}/>
                            </div>
                            <span className="mono" style={{fontSize:12,width:36}}>{rate}%</span>
                          </div></td>
                          <td style={{fontSize:12}}>{recs[0]?.service_type||"-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 工賃計算表 ── */}
          {tab==="wage"&&isAdmin&&(
            <div className="fade-in">
              <PH title="工賃計算表" sub="利用者工賃管理"
                onAdd={()=>openModal("工賃",{user_id:"",year_month:fDate.slice(0,7),work_days:0,work_hours:0,unit_wage:0,total_wage:0,paid:false,note:""})}
                addLabel="工賃追加"
                extra={<div style={{display:"flex",gap:8}}>
                  <input className="input" type="month" style={{width:150}} value={fDate.slice(0,7)} onChange={e=>setFDate(e.target.value+"-01")}/>
                  <button className="btn btn-secondary btn-sm" onClick={()=>csv(wages.filter(r=>r.year_month===fDate.slice(0,7)),"工賃計算表")}><Icon name="download" size={13}/>CSV</button>
                </div>}
              />
              <div className="card" style={{marginBottom:16,display:"flex",gap:24,flexWrap:"wrap"}}>
                {[{l:"支払総額",v:"¥"+fmt(wages.filter(r=>r.year_month===fDate.slice(0,7)).reduce((s,r)=>s+r.total_wage,0))},{l:"支払済",v:wages.filter(r=>r.year_month===fDate.slice(0,7)&&r.paid).length+"名"},{l:"未払い",v:wages.filter(r=>r.year_month===fDate.slice(0,7)&&!r.paid).length+"名"}].map((k,i)=>(
                  <div key={i}><div style={{fontSize:11,color:"#94a3b8",marginBottom:2}}>{k.l}</div><div className="mono" style={{fontSize:18,fontWeight:700}}>{k.v}</div></div>
                ))}
              </div>
              <div className="card">
                <table>
                  <thead><tr><th>利用者</th><th>年月</th><th>勤務日数</th><th>勤務時間</th><th>単価</th><th>工賃合計</th><th>支払状況</th><th>操作</th></tr></thead>
                  <tbody>
                    {wages.filter(r=>r.year_month===fDate.slice(0,7)).map((r,i)=>(
                      <tr key={i} className="row-hover">
                        <td style={{fontWeight:600}}>{r.user_name}</td>
                        <td className="mono" style={{fontSize:12}}>{r.year_month}</td>
                        <td className="mono">{r.work_days}日</td>
                        <td className="mono">{r.work_hours}時間</td>
                        <td className="mono">¥{fmt(r.unit_wage)}</td>
                        <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{fmt(r.total_wage)}</td>
                        <td><span className="tag" style={{background:r.paid?"#ecfdf5":"#fef3c7",color:r.paid?"#059669":"#d97706"}}>{r.paid?"支払済":"未払い"}</span></td>
                        <td><div style={{display:"flex",gap:4}}>
                          {!r.paid&&<button className="btn btn-green btn-sm" onClick={async()=>{await supabase.from("wage_records").update({paid:true}).eq("id",r.id);loadAll();}}>支払済</button>}
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("工賃",r)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("wage_records",r.id)}><Icon name="trash" size={12}/></button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {wages.filter(r=>r.year_month===fDate.slice(0,7)).length===0&&<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>工賃データがありません</div>}
              </div>
              <MD name="工賃" table="wage_records">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="年月" k="year_month" type="month"/>
                  <F label="勤務日数" k="work_days" type="number"/>
                  <F label="勤務時間" k="work_hours" type="number"/>
                  <F label="単価（円）" k="unit_wage" type="number"/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>工賃合計</label>
                    <div className="input" style={{background:"#f8fafc",fontWeight:700,color:"#059669"}}>¥{fmt((form.work_hours||0)*(form.unit_wage||0))}</div>
                  </div>
                </div>
                <F label="備考" k="note" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── スタッフ管理 ── */}
          {tab==="staff"&&isAdmin&&(
            <div className="fade-in">
              <PH title="スタッフ管理" sub={`${staffList.length}名`}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
                {staffList.map(s=>(
                  <div key={s.id} className="card">
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:40,height:40,borderRadius:10,background:`hsl(${s.id*70+200},55%,85%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{s.name[0]}</div>
                      <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{s.name}</div><div style={{fontSize:12,color:"#64748b"}}>{s.role}</div></div>
                      <span className="tag" style={{background:s.full_time?"#eff6ff":"#f5f3ff",color:s.full_time?"#2563eb":"#7c3aed"}}>{s.full_time?"常勤":"非常勤"}</span>
                    </div>
                    <div style={{fontSize:12,color:"#64748b",lineHeight:2,marginBottom:8}}>
                      <div>📞 {s.tel}</div><div className="mono">時給 ¥{fmt(s.hourly_rate)}</div><div>🔑 PIN: {s.pin}</div>
                    </div>
                    <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>openEdit("スタッフ",s)}><Icon name="edit" size={13}/>編集</button>
                  </div>
                ))}
              </div>
              <MD name="スタッフ" table="staff_members">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="名前" k="name"/><F label="フリガナ" k="kana"/>
                  <F label="電話" k="tel"/><F label="メール" k="email" type="email"/>
                  <F label="役職" k="role" opts={["世話人","生活支援員","運転手","施設管理者","サービス管理責任者"]}/>
                  <F label="雇用形態" k="full_time" opts={["true","false"]}/>
                  <F label="時給（円）" k="hourly_rate" type="number"/>
                  <F label="PINコード" k="pin"/>
                  <F label="入職日" k="hire_date" type="date"/>
                </div>
                <F label="保有資格（カンマ区切り）" k="certifications" span/>
              </MD>
            </div>
          )}

          {/* ── 勤怠管理（管理者） ── */}
          {tab==="att_admin"&&isAdmin&&(
            <div className="fade-in">
              <PH title="勤怠管理" sub="全スタッフの勤怠記録"
                extra={<button className="btn btn-secondary btn-sm" onClick={()=>csv(attendance,"勤怠記録")}><Icon name="download" size={13}/>CSV</button>}
              />
              <div className="card">
                <table>
                  <thead><tr><th>日付</th><th>スタッフ</th><th>出勤</th><th>退勤</th><th>勤務時間</th><th>備考</th><th>編集</th></tr></thead>
                  <tbody>
                    {attendance.slice(0,50).map((a,i)=>{
                      const ci=a.clock_in?new Date(a.clock_in):null;
                      const co=a.clock_out?new Date(a.clock_out):null;
                      const mins=ci&&co?Math.round((co-ci)/60000)-(a.break_minutes||0):null;
                      return(
                        <tr key={i} className="row-hover">
                          <td className="mono" style={{fontSize:12}}>{a.date}</td>
                          <td style={{fontWeight:600}}>{a.staff_name}</td>
                          <td className="mono" style={{fontSize:12}}>{ci?ci.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"-"}</td>
                          <td className="mono" style={{fontSize:12,color:co?"#374151":"#f59e0b"}}>{co?co.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"勤務中"}</td>
                          <td className="mono" style={{fontSize:12,fontWeight:600}}>{mins?`${Math.floor(mins/60)}h${mins%60}m`:"-"}</td>
                          <td style={{fontSize:12}}>{a.note}{a.edited_by&&<span className="tag" style={{background:"#fef3c7",color:"#d97706",marginLeft:4}}>編集済</span>}</td>
                          <td><button className="btn btn-secondary btn-sm" onClick={()=>{const n=window.prompt("備考",a.note||"");if(n!==null)supabase.from("attendance").update({note:n,edited_by:"管理者"}).eq("id",a.id).then(()=>loadAll());}}><Icon name="edit" size={12}/></button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {attendance.length===0&&<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>打刻記録がありません</div>}
              </div>
            </div>
          )}

          {/* ── 勤怠打刻（スタッフ） ── */}
          {tab==="attendance"&&!isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>勤怠打刻</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>{me?.name} さん — {today}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,maxWidth:440,marginBottom:24}}>
                <button className="btn btn-green" style={{padding:"24px",fontSize:16,justifyContent:"center",flexDirection:"column",gap:8,borderRadius:14}} onClick={clockIn}><Icon name="clock" size={28}/>出勤</button>
                <button className="btn btn-red" style={{padding:"24px",fontSize:16,justifyContent:"center",flexDirection:"column",gap:8,borderRadius:14}} onClick={clockOut}><Icon name="clock" size={28}/>退勤</button>
              </div>
              <div className="card" style={{maxWidth:540}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>今月の勤怠</div>
                <table>
                  <thead><tr><th>日付</th><th>出勤</th><th>退勤</th><th>勤務時間</th></tr></thead>
                  <tbody>
                    {attendance.filter(a=>a.staff_id===me?.id).map((a,i)=>{
                      const ci=a.clock_in?new Date(a.clock_in):null;
                      const co=a.clock_out?new Date(a.clock_out):null;
                      const mins=ci&&co?Math.round((co-ci)/60000)-(a.break_minutes||0):null;
                      return(
                        <tr key={i}><td className="mono" style={{fontSize:12}}>{a.date}</td>
                          <td className="mono" style={{fontSize:12}}>{ci?ci.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"-"}</td>
                          <td className="mono" style={{fontSize:12,color:co?"#374151":"#f59e0b"}}>{co?co.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"勤務中"}</td>
                          <td className="mono" style={{fontSize:12,fontWeight:600}}>{mins?`${Math.floor(mins/60)}h${mins%60}m`:"-"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── 送迎管理 ── */}
          {tab==="transport"&&(
            <div className="fade-in">
              <PH title="送迎管理" sub="送迎記録・コスト分析"
                onAdd={()=>openModal("送迎",{date:"",user_id:"",type:"送迎（往）",destination:"",driver:"",distance:"",cost:"",time:""})}
                addLabel="送迎記録追加"
                extra={isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(transport,"送迎記録")}><Icon name="download" size={13}/>CSV</button>}
              />
              {isAdmin&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:16}}>
                {[{l:"総回数",v:transport.length+"回",c:"#2563eb"},{l:"総コスト",v:"¥"+fmt(transport.reduce((s,t)=>s+t.cost,0)),c:"#059669"},{l:"総距離",v:transport.reduce((s,t)=>s+Number(t.distance),0).toFixed(1)+"km",c:"#d97706"}].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderTop:`3px solid ${k.c}`,textAlign:"center"}}><div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div><div className="mono" style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div></div>
                ))}
              </div>}
              <div className="card">
                <table>
                  <thead><tr><th>日付</th><th>利用者</th><th>種別</th><th>目的地</th><th>担当</th><th>距離</th><th>コスト</th>{isAdmin&&<th>操作</th>}</tr></thead>
                  <tbody>
                    {transport.slice(0,30).map((t,i)=>(
                      <tr key={i} className="row-hover">
                        <td className="mono" style={{fontSize:12}}>{t.date}</td>
                        <td style={{fontWeight:600}}>{t.user_name}</td>
                        <td><span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{t.type}</span></td>
                        <td>{t.destination}</td>
                        <td style={{fontSize:12}}>{t.driver}</td>
                        <td className="mono">{t.distance}km</td>
                        <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{fmt(t.cost)}</td>
                        {isAdmin&&<td><div style={{display:"flex",gap:4}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("送迎",t)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("transport_log",t.id)}><Icon name="trash" size={12}/></button>
                        </div></td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <MD name="送迎" table="transport_log">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="日付" k="date" type="date"/>
                  <F label="時刻" k="time" type="time"/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="種別" k="type" opts={["送迎（往）","送迎（復）","通院送迎","その他"]}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当</label>
                    <select className="input" value={form.driver||""} onChange={e=>setForm(f=>({...f,driver:e.target.value}))}>
                      <option value="">選択...</option>{staffList.map(s=><option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <F label="目的地" k="destination"/>
                  <F label="距離(km)" k="distance" type="number"/>
                  <F label="コスト(円)" k="cost" type="number"/>
                </div>
              </MD>
            </div>
          )}

          {/* ── 国保連請求 ── */}
          {tab==="claims"&&isAdmin&&(
            <div className="fade-in">
              <PH title="国保連請求管理" sub="請求・入金管理"
                extra={<button className="btn btn-secondary btn-sm" onClick={()=>csv(claims,"国保連請求")}><Icon name="download" size={13}/>CSV</button>}
              />
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:16}}>
                {[{l:"請求総額",v:"¥"+fmt(totalClaim),c:"#2563eb",i:"📋"},{l:"請求済",v:claims.filter(c=>c.status==="請求済").length+"件",c:"#d97706",i:"⏳"},{l:"入金済",v:claims.filter(c=>c.status==="入金済").length+"件",c:"#059669",i:"✅"}].map((k,i)=>(
                  <div key={i} className="stat-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:12,color:"#64748b"}}>{k.l}</div><div style={{fontSize:18}}>{k.i}</div></div><div className="mono" style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div></div>
                ))}
              </div>
              <div className="card" style={{marginBottom:16}}>
                {claims.length===0?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>請求データがありません</div>:(
                  <table>
                    <thead><tr><th>利用者</th><th>サービス</th><th>日数</th><th>単価</th><th>請求額</th><th>状態</th><th>請求日</th><th>操作</th></tr></thead>
                    <tbody>
                      {claims.map((c,i)=>(
                        <tr key={i} className="row-hover">
                          <td style={{fontWeight:600}}>{c.user_name}</td><td>{c.service}</td>
                          <td className="mono">{c.days}日</td><td className="mono">¥{fmt(c.unit_price)}</td>
                          <td className="mono" style={{fontWeight:700}}>¥{fmt(c.total)}</td>
                          <td><span className="tag" style={{background:c.status==="入金済"?"#ecfdf5":"#fef3c7",color:c.status==="入金済"?"#059669":"#d97706"}}>{c.status}</span></td>
                          <td className="mono" style={{fontSize:12}}>{c.claim_date}</td>
                          <td>{c.status==="請求済"&&<button className="btn btn-green btn-sm" onClick={async()=>{await supabase.from("claim_data").update({status:"入金済"}).eq("id",c.id);loadAll();}}>入金確認</button>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📤 帳票・CSV出力</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
                  {[{l:"サービス提供実績記録票",d:claims},{l:"給付費明細書",d:claims},{l:"受給者台帳",d:users},{l:"支援記録（月別）",d:srecs},{l:"実績記録表",d:perfs}].map((item,i)=>(
                    <div key={i} style={{border:"1px solid #e2e8f0",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                      <div style={{fontWeight:600,fontSize:13}}>{item.l}</div>
                      <button className="btn btn-green btn-sm" onClick={()=>csv(item.d,item.l)}><Icon name="download" size={12}/>出力</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 経理 ── */}
          {tab==="accounting"&&isAdmin&&(
            <div className="fade-in">
              <PH title="経理・決算管理" onAdd={()=>openModal("仕訳",{date:"",category:"支出",sub_category:"",description:"",amount:"",debit:"",credit:""})} addLabel="仕訳入力"/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:16}}>
                <div className="stat-card" style={{borderLeft:"4px solid #059669"}}><div style={{fontSize:12,color:"#64748b",marginBottom:8}}>収入合計</div><div className="mono" style={{fontSize:20,fontWeight:800,color:"#059669"}}>¥{fmt(totalInc)}</div></div>
                <div className="stat-card" style={{borderLeft:"4px solid #ef4444"}}><div style={{fontSize:12,color:"#64748b",marginBottom:8}}>支出合計</div><div className="mono" style={{fontSize:20,fontWeight:800,color:"#ef4444"}}>¥{fmt(totalExp)}</div></div>
                <div className="stat-card" style={{borderLeft:"4px solid #2563eb"}}><div style={{fontSize:12,color:"#64748b",marginBottom:8}}>収支差額</div><div className="mono" style={{fontSize:20,fontWeight:800,color:totalInc-totalExp>=0?"#059669":"#ef4444"}}>{totalInc-totalExp>=0?"+":""}¥{fmt(totalInc-totalExp)}</div></div>
              </div>
              <div className="card" style={{marginBottom:16}}>
                {entries.length===0?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>仕訳データがありません</div>:(
                  <table>
                    <thead><tr><th>日付</th><th>区分</th><th>科目</th><th>摘要</th><th>金額</th><th>操作</th></tr></thead>
                    <tbody>
                      {entries.map((e,i)=>(
                        <tr key={i} className="row-hover">
                          <td className="mono" style={{fontSize:12}}>{e.date}</td>
                          <td><span className="tag" style={{background:e.category==="収入"?"#ecfdf5":"#fef2f2",color:e.category==="収入"?"#059669":"#ef4444"}}>{e.category}</span></td>
                          <td>{e.sub_category}</td>
                          <td style={{color:"#64748b",fontSize:12}}>{e.description}</td>
                          <td className="mono" style={{fontWeight:700,color:e.category==="収入"?"#059669":"#374151"}}>¥{fmt(e.amount)}</td>
                          <td><div style={{display:"flex",gap:4}}>
                            <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("仕訳",e)}><Icon name="edit" size={12}/></button>
                            <button className="btn btn-red btn-sm" onClick={()=>del("accounting_entries",e.id)}><Icon name="trash" size={12}/></button>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>決算帳簿ダウンロード</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>
                  {[{l:"仕訳帳",d:entries},{l:"収入一覧",d:entries.filter(e=>e.category==="収入")},{l:"支出一覧",d:entries.filter(e=>e.category==="支出")},{l:"送迎コスト台帳",d:transport},{l:"勤怠記録",d:attendance},{l:"工賃計算表",d:wages}].map((item,i)=>(
                    <div key={i} style={{border:"1px solid #e2e8f0",borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{fontWeight:600,fontSize:13}}>{item.l}</div>
                      <button className="btn btn-green btn-sm" onClick={()=>csv(item.d,item.l)}><Icon name="download" size={12}/>CSV</button>
                    </div>
                  ))}
                </div>
              </div>
              <MD name="仕訳" table="accounting_entries">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="日付" k="date" type="date"/>
                  <F label="区分" k="category" opts={["収入","支出"]}/>
                  <F label="科目" k="sub_category"/>
                  <F label="金額（円）" k="amount" type="number"/>
                  <F label="借方" k="debit"/>
                  <F label="貸方" k="credit"/>
                </div>
                <F label="摘要" k="description" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 予定管理 ── */}
          {tab==="scheds"&&(
            <div className="fade-in">
              <PH title="予定管理" sub="入院・外泊・通院などの予定"
                onAdd={isAdmin?()=>openModal("予定",{user_id:"",unit:"A棟",type:"外泊",start_date:"",end_date:"",note:"",status:"予定"}):null}
                addLabel="予定追加"
                extra={<select className="input" style={{width:110}} value={fUnit} onChange={e=>setFUnit(e.target.value)}>{["全棟","A棟","B棟","C棟"].map(v=><option key={v}>{v}</option>)}</select>}
              />
              {["A棟","B棟","C棟"].filter(u=>fUnit==="全棟"||u===fUnit).map(unit=>{
                const unitUsers=users.filter(u=>u.unit===unit);
                return(
                  <div key={unit} style={{marginBottom:20}}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>🏠 {unit} <span style={{fontSize:12,color:"#64748b",fontWeight:400}}>在籍 {unitUsers.filter(u=>u.status==="在籍").length}名</span></div>
                    <div style={{display:"grid",gap:8}}>
                      {unitUsers.map(u=>{
                        const uS=scheds.filter(s=>s.user_id===u.id&&s.end_date>=today);
                        return(
                          <div key={u.id} style={{borderRadius:10,padding:"10px 14px",border:"1px solid #e2e8f0",background:u.status==="外泊中"?"#fffbeb":u.status==="入院中"?"#fef2f2":"white"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                                <div style={{fontWeight:600,fontSize:13}}>{u.name}</div>
                                <span className="tag" style={{background:u.status==="在籍"?"#ecfdf5":u.status==="外泊中"?"#fef3c7":"#fee2e2",color:u.status==="在籍"?"#059669":u.status==="外泊中"?"#d97706":"#ef4444"}}>{u.status}</span>
                                {uS.map((s,i)=><span key={i} className="tag" style={{background:"#ede9fe",color:"#7c3aed"}}>{s.type}: {s.start_date}〜{s.end_date}</span>)}
                              </div>
                              {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>openModal("予定",{user_id:u.id,user_name:u.name,unit:u.unit||"A棟",type:"外泊",start_date:"",end_date:"",note:"",status:"予定"})}>+予定</button>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="card" style={{marginTop:16}}>
                <table>
                  <thead><tr><th>利用者</th><th>棟</th><th>種別</th><th>開始</th><th>終了</th><th>状態</th><th>備考</th>{isAdmin&&<th>操作</th>}</tr></thead>
                  <tbody>
                    {scheds.slice(0,30).map((s,i)=>(
                      <tr key={i} className="row-hover">
                        <td style={{fontWeight:600}}>{s.user_name}</td><td>{s.unit}</td>
                        <td><span className="tag" style={{background:"#ede9fe",color:"#7c3aed"}}>{s.type}</span></td>
                        <td className="mono" style={{fontSize:12}}>{s.start_date}</td>
                        <td className="mono" style={{fontSize:12}}>{s.end_date}</td>
                        <td><span className="tag" style={{background:s.status==="実施済"?"#ecfdf5":"#eff6ff",color:s.status==="実施済"?"#059669":"#2563eb"}}>{s.status}</span></td>
                        <td style={{fontSize:12,color:"#64748b"}}>{s.note}</td>
                        {isAdmin&&<td><div style={{display:"flex",gap:4}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("予定",s)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("schedules",s.id)}><Icon name="trash" size={12}/></button>
                        </div></td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <MD name="予定" table="schedules">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||"",unit:u?.unit||"A棟"}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]}/>
                  <F label="種別" k="type" opts={["外泊","通院","入院","服薬変更","短期入所","その他"]}/>
                  <F label="状態" k="status" opts={["予定","実施中","実施済","キャンセル"]}/>
                  <F label="開始日" k="start_date" type="date"/>
                  <F label="終了日" k="end_date" type="date"/>
                </div>
                <F label="備考" k="note" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 利用者メッセージ ── */}
          {tab==="msgs"&&(
            <div className="fade-in">
              <PH title="利用者メッセージ" sub={`未読 ${unread}件`}
                extra={isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(msgs,"利用者メッセージ")}><Icon name="download" size={13}/>CSV</button>}
              />
              {msgs.length===0?<div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📩</div>メッセージがありません</div>:(
                <div style={{display:"grid",gap:10}}>
                  {msgs.map((m,i)=>(
                    <div key={i} className="card" style={{borderLeft:`4px solid ${m.is_read?"#e2e8f0":"#2563eb"}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <div style={{fontWeight:700,fontSize:14}}>{m.user_name}</div>
                          <span className="tag" style={{background:m.category==="緊急連絡"?"#fee2e2":"#ecfdf5",color:m.category==="緊急連絡"?"#ef4444":"#059669"}}>{m.category}</span>
                          {!m.is_read&&<span className="tag" style={{background:"#2563eb",color:"white"}}>未読</span>}
                        </div>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{new Date(m.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
                          {!m.is_read&&<button className="btn btn-green btn-sm" onClick={async()=>{await supabase.from("user_messages").update({is_read:true}).eq("id",m.id);loadAll();}}>既読</button>}
                          {isAdmin&&<button className="btn btn-red btn-sm" onClick={()=>del("user_messages",m.id)}><Icon name="trash" size={12}/></button>}
                        </div>
                      </div>
                      <div style={{fontSize:13,background:"#f8fafc",borderRadius:8,padding:"10px 12px",lineHeight:1.7}}>{m.message}</div>
                    </div>
                  ))}
                </div>
              )}
              {isAdmin&&<div className="card" style={{marginTop:16,background:"#eff6ff",border:"1px solid #bfdbfe"}}><div style={{fontWeight:700,fontSize:13,marginBottom:4,color:"#1d4ed8"}}>📱 アクセスコード設定</div><div style={{fontSize:13,color:"#1e40af"}}>「利用者状況」→ 各利用者の編集でアクセスコードを設定。利用者はトップ画面の「利用者メッセージ送信」から送れます。</div></div>}
            </div>
          )}

          {/* ── ファイル・会議報告書 ── */}
          {tab==="files"&&isAdmin&&(
            <div className="fade-in">
              <PH title="ファイル・会議報告書" sub={`${files.length}件`}
                onAdd={()=>openModal("ファイル",{category:"職員会議",title:"",date:today,author:me?.name||"管理者",content:"",file_type:"議事録"})}
                addLabel="新規作成"
                extra={<button className="btn btn-secondary btn-sm" onClick={()=>csv(files,"ファイル一覧")}><Icon name="download" size={13}/>CSV</button>}
              />
              <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
                {["全て","職員会議","虐待防止","BCP","ヒヤリハット","事故報告","研修記録","その他"].map(cat=>(
                  <button key={cat} className={`btn ${fCat===cat?"btn-primary":"btn-secondary"} btn-sm`} onClick={()=>setFCat(cat)}>{cat}</button>
                ))}
              </div>
              {files.filter(f=>fCat==="全て"||f.category===fCat).length===0?(
                <div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📁</div>ファイルがありません</div>
              ):(
                <div style={{display:"grid",gap:10}}>
                  {files.filter(f=>fCat==="全て"||f.category===fCat).map((f,i)=>(
                    <div key={i} className="card">
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          <span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{f.category}</span>
                          <span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{f.file_type}</span>
                          <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{f.date}</span>
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("ファイル",f)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("file_records",f.id)}><Icon name="trash" size={12}/></button>
                        </div>
                      </div>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{f.title}</div>
                      <div style={{fontSize:12,color:"#64748b",marginBottom:f.content?6:0}}>作成者: {f.author}</div>
                      {f.content&&<div style={{fontSize:13,background:"#f8fafc",borderRadius:8,padding:"10px 12px",lineHeight:1.7}}>{f.content}</div>}
                    </div>
                  ))}
                </div>
              )}
              <MD name="ファイル" table="file_records">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="カテゴリ" k="category" opts={["職員会議","虐待防止","BCP","ヒヤリハット","事故報告","研修記録","その他"]}/>
                  <F label="種別" k="file_type" opts={["議事録","報告書","計画書","マニュアル","記録票","その他"]}/>
                  <F label="日付" k="date" type="date"/>
                  <F label="作成者" k="author"/>
                </div>
                <F label="タイトル" k="title" span/>
                <F label="内容" k="content" type="textarea" span/>
              </MD>
            </div>
          )}

          {/* ── 加算ヒント ── */}
          {tab==="hints"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>加算取得ヒント</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>グループホームで取得可能な加算と要件チェック</div>
              {["高","中","低"].map(pri=>(
                <div key={pri} style={{marginBottom:22}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <span className="tag" style={{background:pri==="高"?"#fee2e2":pri==="中"?"#fef3c7":"#f1f5f9",color:pri==="高"?"#ef4444":pri==="中"?"#d97706":"#94a3b8",fontSize:12,padding:"3px 12px"}}>優先度 {pri}</span>
                  </div>
                  {HINTS.filter(h=>h.pri===pri).map((h,i)=>(
                    <div key={i} className="hint-card">
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <div style={{fontWeight:700,fontSize:13}}>{h.title}</div>
                        <span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{h.cat}</span>
                      </div>
                      <div style={{fontSize:13,color:"#374151",lineHeight:1.7}}>💡 {h.points}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── ニュース ── */}
          {tab==="news"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>最新ニュース</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>国保連・厚労省からの最新情報</div>
              <div className="card" style={{marginBottom:14,background:"#fffbeb",border:"1px solid #fde68a"}}><div style={{fontSize:13,color:"#92400e",display:"flex",gap:8,alignItems:"center"}}><Icon name="warning" size={15}/>最新情報は各公式サイトでご確認ください。</div></div>
              {NEWS.map((n,i)=>(
                <div key={i} className="card" style={{marginBottom:10}}>
                  <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                    <span className="tag" style={{background:n.tag==="重要"?"#fee2e2":n.tag==="改定"?"#fef3c7":"#eff6ff",color:n.tag==="重要"?"#ef4444":n.tag==="改定"?"#d97706":"#2563eb"}}>{n.tag}</span>
                    <span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{n.source}</span>
                    <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{n.date}</span>
                  </div>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:6}}>{n.title}</div>
                  <a href={n.url} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#2563eb",textDecoration:"none"}}>🔗 詳細を見る →</a>
                </div>
              ))}
              <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
                {[{l:"国保連",url:"https://www.kokuho.or.jp/"},{l:"電子請求システム",url:"https://www.e-seikyuu.jp/"},{l:"WAM NET",url:"https://www.wam.go.jp/"},{l:"厚労省",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/"}].map((link,i)=>(
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                    <button className="btn btn-secondary btn-sm">{link.l}</button>
                  </a>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
