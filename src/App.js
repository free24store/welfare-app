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
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:12px;}
  .modal{background:white;border-radius:16px;padding:24px;width:100%;max-width:680px;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.25);}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  .card{overflow-x:auto;}
  th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;border-bottom:2px solid #f1f5f9;white-space:nowrap;}
  td{padding:10px 12px;border-bottom:1px solid #f8fafc;color:#374151;vertical-align:middle;}
  .stat-card{background:white;border-radius:14px;padding:18px 20px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .mono{font-family:'DM Mono',monospace;}
  .fade-in{animation:fadeIn .2s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .alert-badge{background:#ef4444;color:white;border-radius:99px;font-size:10px;font-weight:700;padding:1px 6px;margin-left:auto;}
  .timebadge{background:#1e3a8a;color:white;border-radius:6px;padding:2px 8px;font-size:11px;font-family:'DM Mono',monospace;}
  .hint-card{border-left:4px solid #f59e0b;background:#fffbeb;border-radius:0 12px 12px 0;padding:12px 16px;margin-bottom:10px;}

  /* ── drawer overlay ── */
  .drawer-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:90;display:none;}
  .drawer-overlay.open{display:block;}

  /* ── mobile nav drawer ── */
  .sidebar{width:196px;background:white;border-right:1px solid #e2e8f0;padding:8px 6px;flex-shrink:0;overflow-y:auto;transition:transform .25s ease;}

  /* ── table scroll wrapper ── */
  .tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}

  /* ── responsive ── */
  @media(max-width:768px){
    .card{padding:14px;}
    .modal{padding:18px;border-radius:12px;}
    .sidebar{
      position:fixed;top:0;left:0;height:100%;z-index:100;
      transform:translateX(-100%);
      box-shadow:4px 0 24px rgba(0,0,0,.12);
    }
    .sidebar.open{transform:translateX(0);}
    .menu-btn{display:flex !important;}
    .hamburger-close{display:flex !important;}
    th,td{padding:7px 8px;font-size:12px;}
    .stat-card{padding:12px 14px;}
    .btn{padding:7px 12px;font-size:12px;}
    .btn-sm{padding:4px 8px;font-size:11px;}
  }
  @media(min-width:769px){
    .menu-btn{display:none !important;}
    .hamburger-close{display:none !important;}
    .drawer-overlay{display:none !important;}
  }
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


function SalaryAdminTab({staffList, salaries, attendance, loadAll, today}) {
  const [selStaff, setSelStaff] = useState("");
  const [ym, setYm] = useState((today||new Date().toISOString().slice(0,10)).slice(0,7));
  const [baseHour, setBaseHour] = useState("");
  const [extraPay, setExtraPay] = useState("0");
  const [deduct, setDeduct] = useState("0");
  const [note, setNote] = useState("");
  const [payDate, setPayDate] = useState("");
  const [filterYm, setFilterYm] = useState((today||new Date().toISOString().slice(0,10)).slice(0,7));
  const [msg, setMsg] = useState("");

  const calcHours = (staffId, yearMonth) => {
    return attendance
      .filter(a => a.staff_id === staffId && a.date && a.date.startsWith(yearMonth))
      .reduce((sum, a) => {
        if (!a.clock_in || !a.clock_out) return sum;
        const mins = Math.round((new Date(a.clock_out) - new Date(a.clock_in)) / 60000) - (a.break_minutes || 0);
        return sum + Math.max(0, mins);
      }, 0);
  };

  const calcSalary = () => {
    const s = staffList.find(x => String(x.id) === String(selStaff));
    if (!s) return 0;
    const rate = Number(baseHour || s.hourly_rate || 0);
    const mins = calcHours(s.id, ym);
    const hours = mins / 60;
    return Math.round(hours * rate) + Number(extraPay || 0) - Number(deduct || 0);
  };

  const save = async () => {
    setMsg("");
    const s = staffList.find(x => String(x.id) === String(selStaff));
    if (!s || !ym) { setMsg("スタッフと対象月を選択してください"); return; }
    const rate = Number(baseHour || s.hourly_rate || 0);
    const mins = calcHours(s.id, ym);
    const hours = mins / 60;
    const gross = Math.round(hours * rate) + Number(extraPay || 0);
    const net = gross - Number(deduct || 0);
    const {error} = await supabase.from("salary_records").upsert({
      staff_id: s.id, staff_name: s.name, year_month: ym,
      hourly_rate: rate, work_minutes: mins,
      extra_pay: Number(extraPay || 0), deduction: Number(deduct || 0),
      gross_pay: gross, net_pay: net,
      pay_date: payDate || null, note, status: "計算済",
    }, {onConflict: "staff_id,year_month"});
    if (error) { setMsg("保存エラー: " + error.message); return; }
    setMsg("✅ 保存しました");
    loadAll();
  };

  const markPaid = async (id) => {
    await supabase.from("salary_records").update({status:"支払済", paid_at: new Date().toISOString()}).eq("id", id);
    loadAll();
  };

  const filtered = salaries.filter(s => s.year_month === filterYm);
  const totalNet = filtered.reduce((s,r) => s + (r.net_pay||0), 0);
  const totalPaid = filtered.filter(r=>r.status==="支払済").length;

  const selStaffData = staffList.find(x => String(x.id) === String(selStaff));
  const previewMins = selStaff ? calcHours(selStaffData?.id, ym) : 0;
  const previewTotal = calcSalary();

  return (
    <div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>給与計算・支払管理</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>勤怠データから自動計算・支払管理</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16,marginBottom:20}}>
        <div className="card">
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>📝 給与計算</div>
          <div style={{display:"grid",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>対象月</label>
                <input className="input" type="month" value={ym} onChange={e=>setYm(e.target.value)}/>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>スタッフ</label>
                <select className="input" value={selStaff} onChange={e=>setSelStaff(e.target.value)}>
                  <option value="">選択...</option>
                  {staffList.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>
            {selStaffData && (
              <div style={{background:"#f0f9ff",borderRadius:8,padding:"10px 12px",fontSize:13}}>
                <div style={{color:"#64748b",marginBottom:4}}>📊 {ym} の勤務データ</div>
                <div style={{fontWeight:700,color:"#0369a1"}}>
                  {Math.floor(previewMins/60)}時間{previewMins%60}分
                  <span style={{fontSize:11,fontWeight:400,color:"#64748b",marginLeft:8}}>
                    （基本時給: ¥{(selStaffData.hourly_rate||0).toLocaleString()}）
                  </span>
                </div>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時給上書き（円）</label>
                <input className="input" type="number" placeholder={selStaffData?.hourly_rate||"自動"} value={baseHour} onChange={e=>setBaseHour(e.target.value)}/>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>手当・追加（円）</label>
                <input className="input" type="number" value={extraPay} onChange={e=>setExtraPay(e.target.value)}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>控除額（円）</label>
                <input className="input" type="number" value={deduct} onChange={e=>setDeduct(e.target.value)}/>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>給料日</label>
                <input className="input" type="date" value={payDate} onChange={e=>setPayDate(e.target.value)}/>
              </div>
            </div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label>
              <input className="input" placeholder="備考・連絡事項..." value={note} onChange={e=>setNote(e.target.value)}/>
            </div>
            {selStaff && (
              <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:10,padding:"14px",color:"white",textAlign:"center"}}>
                <div style={{fontSize:11,opacity:.8,marginBottom:4}}>支給額（手取り）</div>
                <div style={{fontSize:28,fontWeight:800}}>¥{previewTotal.toLocaleString()}</div>
              </div>
            )}
            {msg && <div style={{color:msg.includes("✅")?"#059669":"#ef4444",fontSize:13}}>{msg}</div>}
            <button className="btn btn-primary" style={{justifyContent:"center",padding:"10px"}} onClick={save}>
              <Icon name="check" size={14}/>保存・確定
            </button>
          </div>
        </div>
        <div className="card">
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>📅 支払状況</div>
          <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
            <input className="input" type="month" value={filterYm} onChange={e=>setFilterYm(e.target.value)} style={{flex:1}}/>
            <span style={{fontSize:12,color:"#64748b"}}>{totalPaid}/{filtered.length}名 支払済</span>
          </div>
          <div style={{background:"linear-gradient(135deg,#ecfdf5,#d1fae5)",borderRadius:10,padding:"12px",marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#065f46"}}>合計支給額</div>
            <div style={{fontSize:22,fontWeight:800,color:"#059669"}}>¥{totalNet.toLocaleString()}</div>
          </div>
          <div style={{display:"grid",gap:8}}>
            {filtered.length === 0 && <div style={{textAlign:"center",padding:"20px",color:"#94a3b8",fontSize:13}}>この月のデータがありません</div>}
            {filtered.map((r,i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:r.status==="支払済"?"#f0fdf4":"#fafafa",borderRadius:10,border:`1px solid ${r.status==="支払済"?"#bbf7d0":"#e2e8f0"}`}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{r.staff_name}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>
                    {Math.floor((r.work_minutes||0)/60)}h{(r.work_minutes||0)%60}m
                    {r.pay_date && <span style={{marginLeft:6}}>💳 {r.pay_date}</span>}
                  </div>
                  {r.note && <div style={{fontSize:11,color:"#94a3b8"}}>{r.note}</div>}
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:800,fontSize:15,color:r.status==="支払済"?"#059669":"#1e293b"}}>¥{(r.net_pay||0).toLocaleString()}</div>
                  {r.status==="支払済"
                    ? <span className="tag" style={{background:"#dcfce7",color:"#059669",fontSize:11}}>支払済</span>
                    : <button className="btn btn-green btn-sm" style={{marginTop:4}} onClick={()=>markPaid(r.id)}>支払済にする</button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📋 全履歴</div>
        <table>
          <thead><tr><th>月</th><th>スタッフ</th><th>勤務時間</th><th>支給額</th><th>給料日</th><th>状態</th><th>操作</th></tr></thead>
          <tbody>
            {salaries.slice(0,50).map((r,i)=>(
              <tr key={i} className="row-hover">
                <td className="mono" style={{fontSize:12}}>{r.year_month}</td>
                <td style={{fontWeight:600}}>{r.staff_name}</td>
                <td className="mono" style={{fontSize:12}}>{Math.floor((r.work_minutes||0)/60)}h{(r.work_minutes||0)%60}m</td>
                <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{(r.net_pay||0).toLocaleString()}</td>
                <td className="mono" style={{fontSize:12}}>{r.pay_date||"-"}</td>
                <td><span className="tag" style={{background:r.status==="支払済"?"#dcfce7":"#fef3c7",color:r.status==="支払済"?"#059669":"#d97706"}}>{r.status||"計算済"}</span></td>
                <td>
                  {r.status!=="支払済" && <button className="btn btn-green btn-sm" onClick={()=>markPaid(r.id)}>支払済</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MySalaryTab({me, salaries, attendance}) {
  const mySalaries = salaries.filter(s => s.staff_id === me?.id).slice(0, 12);
  const nextSalary = mySalaries.find(s => s.status !== "支払済");

  const myAttendance = attendance.filter(a => a.staff_id === me?.id);
  const thisMonth = new Date().toISOString().slice(0,7);
  const thisMonthAtt = myAttendance.filter(a => a.date?.startsWith(thisMonth));
  const totalMins = thisMonthAtt.reduce((sum,a) => {
    if (!a.clock_in || !a.clock_out) return sum;
    return sum + Math.max(0, Math.round((new Date(a.clock_out)-new Date(a.clock_in))/60000) - (a.break_minutes||0));
  }, 0);

  return (
    <div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>給料・シフト確認</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>{me?.name} さんの給与情報</div>
      {nextSalary && (
        <div style={{background:"linear-gradient(135deg,#1e3a8a,#7c3aed)",borderRadius:16,padding:"20px",color:"white",marginBottom:16}}>
          <div style={{fontSize:12,opacity:.8,marginBottom:4}}>💳 次の給料日</div>
          <div style={{fontSize:26,fontWeight:800,marginBottom:8}}>
            {nextSalary.pay_date ? nextSalary.pay_date : "調整中"}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:11,opacity:.7}}>{nextSalary.year_month} 分</div>
              {nextSalary.note && <div style={{fontSize:12,opacity:.9,marginTop:4}}>📝 {nextSalary.note}</div>}
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:11,opacity:.7}}>支給額</div>
              <div style={{fontSize:28,fontWeight:800}}>¥{(nextSalary.net_pay||0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
      {!nextSalary && (
        <div style={{background:"#f8fafc",borderRadius:12,padding:"16px",marginBottom:16,textAlign:"center",color:"#94a3b8",fontSize:13}}>
          給与情報は管理者が入力後に表示されます
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12,marginBottom:16}}>
        <div className="stat-card" style={{borderTop:"3px solid #2563eb",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>今月の勤務時間</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:"#2563eb"}}>{Math.floor(totalMins/60)}h{totalMins%60}m</div>
        </div>
        <div className="stat-card" style={{borderTop:"3px solid #059669",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>出勤日数</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:"#059669"}}>{thisMonthAtt.filter(a=>a.clock_in).length}日</div>
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📋 給与履歴</div>
        {mySalaries.length === 0 && <div style={{textAlign:"center",padding:"20px",color:"#94a3b8",fontSize:13}}>まだデータがありません</div>}
        <div style={{display:"grid",gap:8}}>
          {mySalaries.map((r,i) => (
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:r.status==="支払済"?"#f0fdf4":"#fffbeb",borderRadius:10,border:`1px solid ${r.status==="支払済"?"#bbf7d0":"#fde68a"}`}}>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>{r.year_month}</div>
                <div style={{fontSize:11,color:"#64748b"}}>
                  {Math.floor((r.work_minutes||0)/60)}h{(r.work_minutes||0)%60}m
                  {r.pay_date && <span style={{marginLeft:6}}>💳 {r.pay_date}</span>}
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,fontSize:16,color:"#1e293b"}}>¥{(r.net_pay||0).toLocaleString()}</div>
                <span className="tag" style={{background:r.status==="支払済"?"#dcfce7":"#fef3c7",color:r.status==="支払済"?"#059669":"#d97706",fontSize:11}}>{r.status||"確認中"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShiftReqTab({me, shifts, loadAll, today}) {
  const [type, setType] = useState("希望休");
  const _today = today || new Date().toISOString().slice(0,10);
  const [dateFrom, setDateFrom] = useState(_today);
  const [dateTo, setDateTo] = useState(_today);
  const [reason, setReason] = useState("");
  const [correction, setCorrection] = useState("");
  const [corrDate, setCorrDate] = useState(_today);
  const [corrIn, setCorrIn] = useState("");
  const [corrOut, setCorrOut] = useState("");
  const [msg, setMsg] = useState("");

  const myShifts = shifts.filter(s => s.staff_id === me?.id).slice(0, 20);

  const submit = async () => {
    setMsg("");
    if (!dateFrom) { setMsg("日付を入力してください"); return; }
    const isCorr = type === "打刻訂正";
    await supabase.from("shift_requests").insert({
      staff_id: me?.id,
      staff_name: me?.name,
      type,
      date_from: dateFrom,
      date_to: isCorr ? dateFrom : (dateTo || dateFrom),
      correction_date: isCorr ? corrDate : null,
      correction_in: isCorr ? corrIn : null,
      correction_out: isCorr ? corrOut : null,
      reason: isCorr ? correction : reason,
      status: "申請中",
    });
    setMsg("✅ 申請しました");
    setReason(""); setCorrection(""); setCorrIn(""); setCorrOut("");
    loadAll();
  };

  const typeColor = t => t==="希望休"?"#ef4444":t==="打刻訂正"?"#d97706":"#2563eb";
  const typeBg = t => t==="希望休"?"#fee2e2":t==="打刻訂正"?"#fef3c7":"#eff6ff";

  return (
    <div>
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>シフト希望・打刻訂正</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>希望休・出勤希望・打刻の訂正申請</div>
      <div className="card" style={{maxWidth:520,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>📝 新規申請</div>
        <div style={{display:"grid",gap:10}}>
          <div>
            <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:6}}>申請種別</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["希望休","出勤希望","打刻訂正","その他"].map(t=>(
                <button key={t} className={`btn btn-sm ${type===t?"btn-primary":"btn-secondary"}`} onClick={()=>setType(t)}>{t}</button>
              ))}
            </div>
          </div>
          {type === "打刻訂正" ? (
            <>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>訂正日</label>
                <input className="input" type="date" value={corrDate} onChange={e=>setCorrDate(e.target.value)}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>正しい出勤時刻</label>
                  <input className="input" type="time" value={corrIn} onChange={e=>setCorrIn(e.target.value)}/>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>正しい退勤時刻</label>
                  <input className="input" type="time" value={corrOut} onChange={e=>setCorrOut(e.target.value)}/>
                </div>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>訂正理由</label>
                <input className="input" placeholder="訂正の理由を入力..." value={correction} onChange={e=>setCorrection(e.target.value)}/>
              </div>
            </>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>開始日</label>
                  <input className="input" type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}/>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>終了日</label>
                  <input className="input" type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}/>
                </div>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>理由・備考</label>
                <input className="input" placeholder="理由があれば入力..." value={reason} onChange={e=>setReason(e.target.value)}/>
              </div>
            </>
          )}
          {msg && <div style={{color:msg.includes("✅")?"#059669":"#ef4444",fontSize:13}}>{msg}</div>}
          <button className="btn btn-primary" style={{justifyContent:"center",padding:"10px"}} onClick={submit}>
            <Icon name="plus" size={14}/>申請する
          </button>
        </div>
      </div>
      <div className="card">
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📋 申請履歴</div>
        {myShifts.length === 0 && <div style={{textAlign:"center",padding:"20px",color:"#94a3b8",fontSize:13}}>申請履歴がありません</div>}
        <div style={{display:"grid",gap:8}}>
          {myShifts.map((s,i) => (
            <div key={i} style={{padding:"10px 14px",background:typeBg(s.type),borderRadius:10,border:`1px solid ${typeColor(s.type)}30`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                    <span className="tag" style={{background:"white",color:typeColor(s.type),border:`1px solid ${typeColor(s.type)}`}}>{s.type}</span>
                    <span className="mono" style={{fontSize:12,color:"#475569"}}>{s.date_from}{s.date_to&&s.date_to!==s.date_from?" 〜 "+s.date_to:""}</span>
                  </div>
                  {s.correction_date && <div style={{fontSize:12,color:"#64748b"}}>訂正日: {s.correction_date} {s.correction_in}→{s.correction_out}</div>}
                  {s.reason && <div style={{fontSize:12,color:"#475569"}}>{s.reason}</div>}
                </div>
                <span className="tag" style={{background:s.status==="承認"?"#dcfce7":s.status==="却下"?"#fee2e2":"#fef3c7",color:s.status==="承認"?"#059669":s.status==="却下"?"#ef4444":"#d97706",flexShrink:0}}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingTab({claims, users, perfs, srecs, today}) {
  const [activeSection, setActiveSection] = useState("menu");
  const [selMonth, setSelMonth] = useState((today||new Date().toISOString().slice(0,10)).slice(0,7));
  const [selUser, setSelUser] = useState("全員");
  const [printMode, setPrintMode] = useState(false);

  const activeUsers = users.filter(u => u.status === "在籍");

  // 月別実績データ集計
  const monthPerfs = perfs.filter(p => p.date && p.date.startsWith(selMonth));
  const monthClaims = claims.filter(c => c.claim_date && c.claim_date.startsWith(selMonth));
  const monthSrecs = srecs.filter(s => s.date && s.date.startsWith(selMonth));

  // 利用者別日数集計
  const userDays = activeUsers.map(u => {
    const days = monthPerfs.filter(p => p.user_id === u.id && p.attended).length ||
                 monthSrecs.filter(s => s.user_id === u.id).map(s=>s.date).filter((v,i,a)=>a.indexOf(v)===i).length;
    const claim = monthClaims.filter(c => c.user_id === u.id);
    const total = claim.reduce((s,c) => s+Number(c.total||0), 0);
    return { ...u, days, total, claim };
  });

  // CSV出力ヘルパー
  const dlCsv = (rows, filename) => {
    const bom = '\uFEFF';
    const header = Object.keys(rows[0]||{}).join(',');
    const body = rows.map(r=>Object.values(r).map(v=>`"${String(v||'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([bom+header+'\n'+body], {type:'text/csv'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = filename+'.csv'; a.click();
  };

  // 利用者台帳CSV
  const exportUserLedger = () => {
    const rows = activeUsers.map(u => ({
      受給者番号: u.recipient_no || '', 氏名: u.name, フリガナ: u.kana || '',
      生年月日: u.birth_date || '', 性別: u.gender || '',
      障害支援区分: u.disability_level || '', サービス: u.service_type || '',
      入居日: u.move_in_date || '', 保護者: u.guardian_name || '',
      連絡先: u.emergency_tel || ''
    }));
    dlCsv(rows, `利用者台帳_${selMonth}`);
  };

  // サービス提供実績記録票CSV
  const exportServiceRecord = () => {
    const rows = [];
    const [y,m] = selMonth.split('-').map(Number);
    const daysInMonth = new Date(y,m,0).getDate();
    activeUsers.forEach(u => {
      const row = { 受給者番号: u.recipient_no||'', 氏名: u.name };
      for(let d=1; d<=daysInMonth; d++) {
        const ds = `${selMonth}-${String(d).padStart(2,'0')}`;
        const rec = monthSrecs.filter(s=>s.user_id===u.id&&s.date===ds);
        row[`${d}日`] = rec.length > 0 ? '○' : '';
      }
      row['提供日数'] = Object.values(row).filter(v=>v==='○').length;
      rows.push(row);
    });
    dlCsv(rows, `サービス提供実績_${selMonth}`);
  };

  // 請求書CSV（国保連取込用）
  const exportClaimData = () => {
    const rows = userDays.filter(u=>u.days>0).map(u => ({
      受給者番号: u.recipient_no||'', 氏名: u.name,
      サービス種類: u.service_type||'共同生活援助',
      提供月: selMonth, 提供日数: u.days,
      請求額: u.total, 状態: '請求済'
    }));
    dlCsv(rows, `国保連請求データ_${selMonth}`);
  };

  // 利用実績表CSV
  const exportUsageReport = () => {
    const rows = userDays.map(u => ({
      氏名: u.name, 利用日数: u.days,
      請求額: `¥${u.total.toLocaleString()}`,
      サービス: u.service_type||'共同生活援助',
      対象月: selMonth
    }));
    dlCsv(rows, `利用実績表_${selMonth}`);
  };

  const sections = [
    { id:"service_record", label:"サービス提供実績記録票", icon:"📋", color:"#2563eb" },
    { id:"claim_print", label:"請求書・明細書", icon:"🧾", color:"#7c3aed" },
    { id:"receipt", label:"利用者への領収書", icon:"📄", color:"#059669" },
    { id:"proxy_notice", label:"代理受領通知書", icon:"📨", color:"#d97706" },
    { id:"user_ledger", label:"利用者台帳CSV", icon:"📊", color:"#0891b2" },
    { id:"claim_csv", label:"国保連取込データ", icon:"💾", color:"#7c3aed" },
    { id:"usage_report", label:"利用実績表", icon:"📈", color:"#059669" },
    { id:"daily_summary", label:"定員日報集計表", icon:"📅", color:"#d97706" },
  ];

  if(activeSection !== "menu") {
    const section = sections.find(s=>s.id===activeSection);
    return (
      <div className="fade-in">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <button className="btn btn-secondary btn-sm" onClick={()=>setActiveSection("menu")}>← 戻る</button>
          <div style={{fontWeight:700,fontSize:16}}>{section?.icon} {section?.label}</div>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>対象月</label>
            <input className="input" type="month" value={selMonth} onChange={e=>setSelMonth(e.target.value)} style={{width:160}}/>
          </div>
          {activeSection !== "user_ledger" && activeSection !== "claim_csv" && (
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
              <select className="input" value={selUser} onChange={e=>setSelUser(e.target.value)} style={{width:160}}>
                <option>全員</option>{activeUsers.map(u=><option key={u.id}>{u.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* サービス提供実績記録票 */}
        {activeSection==="service_record"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button className="btn btn-green" onClick={exportServiceRecord}><Icon name="download" size={13}/>CSVダウンロード</button>
              <button className="btn btn-secondary" onClick={()=>window.print()}>🖨️ 印刷</button>
            </div>
            <div className="card" style={{overflowX:"auto"}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>サービス提供実績記録票 — {selMonth}</div>
              {(()=>{
                const [y,m]=selMonth.split('-').map(Number);
                const days=Array.from({length:new Date(y,m,0).getDate()},(_,i)=>i+1);
                const tUsers = selUser==="全員" ? activeUsers : activeUsers.filter(u=>u.name===selUser);
                return(
                  <table style={{fontSize:11}}>
                    <thead><tr>
                      <th style={{minWidth:80,position:"sticky",left:0,background:"white"}}>利用者</th>
                      {days.map(d=><th key={d} style={{minWidth:28,textAlign:"center",padding:"6px 2px"}}>{d}</th>)}
                      <th>提供日数</th><th>請求額</th>
                    </tr></thead>
                    <tbody>
                      {tUsers.map(u=>{
                        const attended = days.map(d=>{
                          const ds=`${selMonth}-${String(d).padStart(2,'0')}`;
                          return monthSrecs.some(s=>s.user_id===u.id&&s.date===ds) ||
                                 monthPerfs.some(p=>p.user_id===u.id&&p.date===ds&&p.attended);
                        });
                        const cnt = attended.filter(Boolean).length;
                        const total = monthClaims.filter(c=>c.user_id===u.id).reduce((s,c)=>s+Number(c.total||0),0);
                        return(
                          <tr key={u.id} className="row-hover">
                            <td style={{fontWeight:600,fontSize:12,position:"sticky",left:0,background:"white",whiteSpace:"nowrap"}}>{u.name}</td>
                            {attended.map((a,i)=>(
                              <td key={i} style={{textAlign:"center",padding:"4px 2px"}}>
                                {a?<span style={{color:"#2563eb",fontWeight:700}}>○</span>:<span style={{color:"#e2e8f0"}}>-</span>}
                              </td>
                            ))}
                            <td className="mono" style={{fontWeight:700,textAlign:"center"}}>{cnt}日</td>
                            <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{total.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })()}
            </div>
          </div>
        )}

        {/* 請求書・明細書 */}
        {activeSection==="claim_print"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button className="btn btn-green" onClick={exportClaimData}><Icon name="download" size={13}/>国保連取込CSV</button>
              <button className="btn btn-secondary" onClick={()=>window.print()}>🖨️ 印刷</button>
            </div>
            {(selUser==="全員"?activeUsers:activeUsers.filter(u=>u.name===selUser)).filter(u=>userDays.find(d=>d.id===u.id)?.days>0).map((u,i)=>{
              const ud = userDays.find(d=>d.id===u.id);
              const uClaims = monthClaims.filter(c=>c.user_id===u.id);
              return(
                <div key={i} className="card" style={{marginBottom:14,pageBreakAfter:"always"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                    <div>
                      <div style={{fontSize:11,color:"#64748b",marginBottom:2}}>障害福祉サービス費請求書・明細書</div>
                      <div style={{fontWeight:800,fontSize:16}}>{u.name} 様</div>
                      <div style={{fontSize:12,color:"#64748b"}}>受給者番号: {u.recipient_no||'未設定'} ／ {selMonth}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"#64748b"}}>サービス提供月</div>
                      <div style={{fontWeight:700,fontSize:14}}>{selMonth}</div>
                    </div>
                  </div>
                  <table style={{marginBottom:10}}>
                    <thead><tr><th>サービス種類</th><th>日数</th><th>単位数</th><th>給付費</th><th>利用者負担</th></tr></thead>
                    <tbody>
                      {uClaims.length>0 ? uClaims.map((c,j)=>(
                        <tr key={j}>
                          <td>{c.service||u.service_type||'共同生活援助'}</td>
                          <td className="mono" style={{textAlign:"center"}}>{c.days||ud?.days||0}日</td>
                          <td className="mono" style={{textAlign:"center"}}>{c.units||'-'}</td>
                          <td className="mono" style={{fontWeight:700}}>¥{Number(c.total||0).toLocaleString()}</td>
                          <td className="mono">¥{Number(c.user_burden||0).toLocaleString()}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td>{u.service_type||'共同生活援助'}</td>
                          <td className="mono" style={{textAlign:"center"}}>{ud?.days||0}日</td>
                          <td className="mono" style={{textAlign:"center"}}>-</td>
                          <td className="mono" style={{fontWeight:700}}>¥{(ud?.total||0).toLocaleString()}</td>
                          <td className="mono">¥0</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <div style={{background:"#f0f9ff",borderRadius:10,padding:"10px 18px",textAlign:"right"}}>
                      <div style={{fontSize:11,color:"#64748b"}}>請求額合計</div>
                      <div style={{fontSize:22,fontWeight:800,color:"#2563eb"}}>¥{(ud?.total||0).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            {(selUser==="全員"?activeUsers:activeUsers.filter(u=>u.name===selUser)).filter(u=>userDays.find(d=>d.id===u.id)?.days>0).length===0&&(
              <div style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}>この月の実績データがありません。<br/>実績管理から日別データを入力してください。</div>
            )}
          </div>
        )}

        {/* 領収書 */}
        {activeSection==="receipt"&&(
          <div>
            <button className="btn btn-secondary" style={{marginBottom:12}} onClick={()=>window.print()}>🖨️ 印刷</button>
            {(selUser==="全員"?activeUsers:activeUsers.filter(u=>u.name===selUser)).map((u,i)=>{
              const ud=userDays.find(d=>d.id===u.id);
              return(
                <div key={i} className="card" style={{marginBottom:14,maxWidth:500}}>
                  <div style={{textAlign:"center",borderBottom:"2px solid #e2e8f0",paddingBottom:12,marginBottom:12}}>
                    <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>領 収 書</div>
                    <div style={{fontSize:12,color:"#64748b"}}>{selMonth}分</div>
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:13,marginBottom:6}}>{u.name} 様</div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #e2e8f0"}}>
                      <span style={{fontSize:13}}>サービス利用料（{u.service_type||'共同生活援助'}）</span>
                      <span style={{fontWeight:700,fontSize:15}}>¥{(ud?.total||0).toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{background:"#f0fdf4",borderRadius:8,padding:"10px",textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#065f46"}}>上記金額を領収いたしました</div>
                    <div style={{fontSize:11,color:"#64748b",marginTop:4}}>発行日: {today}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 代理受領通知書 */}
        {activeSection==="proxy_notice"&&(
          <div>
            <button className="btn btn-secondary" style={{marginBottom:12}} onClick={()=>window.print()}>🖨️ 印刷</button>
            {(selUser==="全員"?activeUsers:activeUsers.filter(u=>u.name===selUser)).map((u,i)=>{
              const ud=userDays.find(d=>d.id===u.id);
              return(
                <div key={i} className="card" style={{marginBottom:14,maxWidth:540}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:12,textAlign:"center"}}>代理受領通知書</div>
                  <div style={{fontSize:13,lineHeight:2}}>
                    <div>受給者番号: {u.recipient_no||'　　　　　　'}</div>
                    <div>氏名: {u.name} 様</div>
                    <div>サービス提供月: {selMonth}</div>
                    <div>サービス種類: {u.service_type||'共同生活援助'}</div>
                    <div>利用日数: {ud?.days||0}日</div>
                    <div>給付費: ¥{(ud?.total||0).toLocaleString()}</div>
                  </div>
                  <div style={{marginTop:12,fontSize:12,color:"#64748b",borderTop:"1px solid #e2e8f0",paddingTop:10}}>
                    上記のとおり障害福祉サービス費を代理受領しましたのでお知らせします。
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 利用者台帳CSV */}
        {activeSection==="user_ledger"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button className="btn btn-green" onClick={exportUserLedger}><Icon name="download" size={13}/>CSVダウンロード</button>
            </div>
            <div className="card">
              <table>
                <thead><tr><th>受給者番号</th><th>氏名</th><th>生年月日</th><th>障害支援区分</th><th>サービス</th><th>入居日</th></tr></thead>
                <tbody>
                  {activeUsers.map((u,i)=>(
                    <tr key={i} className="row-hover">
                      <td className="mono" style={{fontSize:12}}>{u.recipient_no||'-'}</td>
                      <td style={{fontWeight:600}}>{u.name}</td>
                      <td className="mono" style={{fontSize:12}}>{u.birth_date||'-'}</td>
                      <td><span className="tag">{u.disability_level||'-'}</span></td>
                      <td style={{fontSize:12}}>{u.service_type||'共同生活援助'}</td>
                      <td className="mono" style={{fontSize:12}}>{u.move_in_date||'-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 国保連取込CSV */}
        {activeSection==="claim_csv"&&(
          <div>
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"12px 14px",marginBottom:14,fontSize:13}}>
              💡 このCSVは国保連電子請求受付システムへの取込用です。内容確認後にダウンロードしてください。
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button className="btn btn-green" onClick={exportClaimData}><Icon name="download" size={13}/>CSVダウンロード</button>
            </div>
            <div className="card">
              <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>請求データ確認 — {selMonth}</div>
              <table>
                <thead><tr><th>受給者番号</th><th>氏名</th><th>サービス</th><th>提供日数</th><th>請求額</th></tr></thead>
                <tbody>
                  {userDays.map((u,i)=>(
                    <tr key={i} className="row-hover">
                      <td className="mono" style={{fontSize:12}}>{u.recipient_no||'-'}</td>
                      <td style={{fontWeight:600}}>{u.name}</td>
                      <td style={{fontSize:12}}>{u.service_type||'共同生活援助'}</td>
                      <td className="mono" style={{textAlign:"center"}}>{u.days}日</td>
                      <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{u.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr style={{background:"#f0fdf4",fontWeight:700}}>
                    <td colSpan={3} style={{textAlign:"right"}}>合計</td>
                    <td className="mono" style={{textAlign:"center"}}>{userDays.reduce((s,u)=>s+u.days,0)}日</td>
                    <td className="mono" style={{color:"#059669"}}>¥{userDays.reduce((s,u)=>s+u.total,0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 利用実績表 */}
        {activeSection==="usage_report"&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <button className="btn btn-green" onClick={exportUsageReport}><Icon name="download" size={13}/>CSVダウンロード</button>
              <button className="btn btn-secondary" onClick={()=>window.print()}>🖨️ 印刷</button>
            </div>
            <div className="card">
              <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>利用実績表 — {selMonth}</div>
              <table>
                <thead><tr><th>氏名</th><th>サービス</th><th>利用日数</th><th>請求額</th><th>状態</th></tr></thead>
                <tbody>
                  {userDays.map((u,i)=>(
                    <tr key={i} className="row-hover">
                      <td style={{fontWeight:600}}>{u.name}</td>
                      <td style={{fontSize:12}}>{u.service_type||'共同生活援助'}</td>
                      <td className="mono" style={{textAlign:"center",fontWeight:700}}>{u.days}日</td>
                      <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{u.total.toLocaleString()}</td>
                      <td><span className="tag" style={{background:u.days>0?"#ecfdf5":"#f1f5f9",color:u.days>0?"#059669":"#94a3b8"}}>{u.days>0?"利用あり":"未利用"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 定員日報集計表 */}
        {activeSection==="daily_summary"&&(
          <div>
            <button className="btn btn-secondary" style={{marginBottom:12}} onClick={()=>window.print()}>🖨️ 印刷</button>
            <div className="card" style={{overflowX:"auto"}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>定員日報集計表 — {selMonth}</div>
              {(()=>{
                const [y,m]=selMonth.split('-').map(Number);
                const days=Array.from({length:new Date(y,m,0).getDate()},(_,i)=>i+1);
                return(
                  <table style={{fontSize:11}}>
                    <thead><tr>
                      <th style={{position:"sticky",left:0,background:"white"}}>日付</th>
                      <th>在籍数</th><th>利用数</th><th>利用率</th>
                    </tr></thead>
                    <tbody>
                      {days.map(d=>{
                        const ds=`${selMonth}-${String(d).padStart(2,'0')}`;
                        const cnt=activeUsers.filter(u=>
                          monthSrecs.some(s=>s.user_id===u.id&&s.date===ds)||
                          monthPerfs.some(p=>p.user_id===u.id&&p.date===ds&&p.attended)
                        ).length;
                        const rate=activeUsers.length>0?Math.round(cnt/activeUsers.length*100):0;
                        return(
                          <tr key={d} className="row-hover">
                            <td style={{position:"sticky",left:0,background:"white",fontWeight:600}}>{selMonth.slice(5)}/{String(d).padStart(2,'0')}</td>
                            <td className="mono" style={{textAlign:"center"}}>{activeUsers.length}名</td>
                            <td className="mono" style={{textAlign:"center",fontWeight:700,color:cnt>0?"#2563eb":"#94a3b8"}}>{cnt}名</td>
                            <td>
                              <div style={{display:"flex",alignItems:"center",gap:6}}>
                                <div style={{flex:1,height:6,background:"#e2e8f0",borderRadius:3,overflow:"hidden"}}>
                                  <div style={{width:rate+"%",height:"100%",background:rate>=80?"#059669":rate>=50?"#f59e0b":"#ef4444",borderRadius:3}}/>
                                </div>
                                <span className="mono" style={{fontSize:11,width:32}}>{rate}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }

  // メニュー画面
  return (
    <div className="fade-in">
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>国保連請求・帳票管理</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>請求書・実績記録票・CSV出力</div>
      <div style={{display:"flex",gap:10,marginBottom:20,alignItems:"center",flexWrap:"wrap"}}>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>対象月</label>
          <input className="input" type="month" value={selMonth} onChange={e=>setSelMonth(e.target.value)} style={{width:180}}/>
        </div>
        <div style={{background:"#f0f9ff",borderRadius:10,padding:"10px 16px",fontSize:13}}>
          <span style={{color:"#64748b"}}>在籍利用者: </span>
          <span style={{fontWeight:700,color:"#2563eb"}}>{activeUsers.length}名</span>
          <span style={{color:"#64748b",marginLeft:12}}>今月実績あり: </span>
          <span style={{fontWeight:700,color:"#059669"}}>{userDays.filter(u=>u.days>0).length}名</span>
        </div>
      </div>

      <div style={{marginBottom:20}}>
        <div style={{fontWeight:700,fontSize:14,color:"#1e293b",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
          <span style={{background:"#eff6ff",color:"#2563eb",borderRadius:6,padding:"2px 8px",fontSize:12}}>集計・請求</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
          {sections.slice(0,4).map(s=>(
            <button key={s.id} onClick={()=>setActiveSection(s.id)}
              style={{background:"white",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left",transition:"all .15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=s.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
              <div style={{fontSize:24,flexShrink:0}}>{s.icon}</div>
              <div style={{fontWeight:600,fontSize:13,color:"#1e293b"}}>{s.label}</div>
              <div style={{marginLeft:"auto",color:"#94a3b8"}}>›</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{fontWeight:700,fontSize:14,color:"#1e293b",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
          <span style={{background:"#f0fdf4",color:"#059669",borderRadius:6,padding:"2px 8px",fontSize:12}}>データ出力・台帳</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
          {sections.slice(4).map(s=>(
            <button key={s.id} onClick={()=>setActiveSection(s.id)}
              style={{background:"white",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left",transition:"all .15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=s.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#e2e8f0"}>
              <div style={{fontSize:24,flexShrink:0}}>{s.icon}</div>
              <div style={{fontWeight:600,fontSize:13,color:"#1e293b"}}>{s.label}</div>
              <div style={{marginLeft:"auto",color:"#94a3b8"}}>›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPinForm({loadAll}) {
  const [cur,setCur]=useState("");
  const [nw,setNw]=useState("");
  const [conf,setConf]=useState("");
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const change = async()=>{
    setErr(""); setMsg("");
    const {data}=await supabase.from("app_settings").select("value").eq("key","admin_pin").single();
    if(data?.value!==cur){setErr("現在のPINが違います");return;}
    if(nw.length<4){setErr("新PINは4文字以上");return;}
    if(nw!==conf){setErr("新PINが一致しません");return;}
    await supabase.from("app_settings").upsert({key:"admin_pin",value:nw});
    setMsg("管理者PINを変更しました"); setCur(""); setNw(""); setConf("");
  };
  return(
    <div className="card" style={{maxWidth:480,marginBottom:16}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>🔑 管理者PINの変更</div>
      <div style={{display:"grid",gap:10}}>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>現在のPIN</label><input className="input" type="password" maxLength={8} value={cur} onChange={e=>setCur(e.target.value)}/></div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN</label><input className="input" type="password" maxLength={8} value={nw} onChange={e=>setNw(e.target.value)}/></div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN（確認）</label><input className="input" type="password" maxLength={8} value={conf} onChange={e=>setConf(e.target.value)}/></div>
        {err&&<div style={{color:"#ef4444",fontSize:13}}>{err}</div>}
        {msg&&<div style={{color:"#059669",fontSize:13}}>✅ {msg}</div>}
        <button className="btn btn-purple" style={{justifyContent:"center"}} onClick={change}><Icon name="shield" size={14}/>PINを変更する</button>
      </div>
    </div>
  );
}

function StaffPinForm({staffList,loadAll}) {
  const [sel,setSel]=useState("");
  const [nw,setNw]=useState("");
  const [conf,setConf]=useState("");
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const change = async()=>{
    setErr(""); setMsg("");
    if(!sel){setErr("スタッフを選択してください");return;}
    if(nw.length<4){setErr("新PINは4文字以上");return;}
    if(nw!==conf){setErr("新PINが一致しません");return;}
    await supabase.from("staff_members").update({pin:nw}).eq("id",parseInt(sel));
    setMsg("PINを変更しました"); setNw(""); setConf(""); loadAll();
  };
  return(
    <div className="card" style={{maxWidth:480}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>👤 スタッフPINの変更</div>
      <div style={{display:"grid",gap:10}}>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>スタッフ</label>
          <select className="input" value={sel} onChange={e=>setSel(e.target.value)}>
            <option value="">選択...</option>{staffList.map(s=><option key={s.id} value={s.id}>{s.name}（{s.role}）</option>)}
          </select>
        </div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN</label><input className="input" type="password" maxLength={8} value={nw} onChange={e=>setNw(e.target.value)}/></div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN（確認）</label><input className="input" type="password" maxLength={8} value={conf} onChange={e=>setConf(e.target.value)}/></div>
        {err&&<div style={{color:"#ef4444",fontSize:13}}>{err}</div>}
        {msg&&<div style={{color:"#059669",fontSize:13}}>✅ {msg}</div>}
        <button className="btn btn-primary" style={{justifyContent:"center"}} onClick={change}><Icon name="shield" size={14}/>PINを変更する</button>
      </div>
    </div>
  );
}

function SelfPinForm({me,loadAll}) {
  const [cur,setCur]=useState("");
  const [nw,setNw]=useState("");
  const [conf,setConf]=useState("");
  const [msg,setMsg]=useState("");
  const [err,setErr]=useState("");
  const change = async()=>{
    setErr(""); setMsg("");
    if(me?.pin!==cur){setErr("現在のPINが違います");return;}
    if(nw.length<4){setErr("新PINは4文字以上");return;}
    if(nw!==conf){setErr("新PINが一致しません");return;}
    await supabase.from("staff_members").update({pin:nw}).eq("id",me.id);
    setMsg("PINを変更しました"); setCur(""); setNw(""); setConf(""); loadAll();
  };
  return(
    <div className="card" style={{maxWidth:440}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>🔑 自分のPINを変更</div>
      <div style={{display:"grid",gap:10}}>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>現在のPIN</label><input className="input" type="password" maxLength={8} value={cur} onChange={e=>setCur(e.target.value)}/></div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN</label><input className="input" type="password" maxLength={8} value={nw} onChange={e=>setNw(e.target.value)}/></div>
        <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN（確認）</label><input className="input" type="password" maxLength={8} value={conf} onChange={e=>setConf(e.target.value)}/></div>
        {err&&<div style={{color:"#ef4444",fontSize:13}}>{err}</div>}
        {msg&&<div style={{color:"#059669",fontSize:13}}>✅ {msg}</div>}
        <button className="btn btn-primary" style={{justifyContent:"center"}} onClick={change}><Icon name="shield" size={14}/>PINを変更する</button>
      </div>
    </div>
  );
}

function DocsTab({today}) {
  const REQUIRED_DOCS = [
    {cat:"指定申請・運営",items:[
      {id:"d01",name:"指定申請書・添付書類",keep:"永久",freq:"変更時更新"},
      {id:"d02",name:"運営規程",keep:"永久",freq:"変更時更新"},
      {id:"d03",name:"重要事項説明書",keep:"永久",freq:"変更時更新"},
      {id:"d04",name:"利用契約書（利用者全員分）",keep:"契約終了後5年",freq:"入居時"},
    ]},
    {cat:"個別支援関係",items:[
      {id:"d05",name:"個別支援計画（全利用者）",keep:"5年",freq:"6ヶ月ごと"},
      {id:"d06",name:"アセスメント記録",keep:"5年",freq:"計画作成時"},
      {id:"d07",name:"モニタリング記録",keep:"5年",freq:"6ヶ月ごと"},
      {id:"d08",name:"サービス提供記録（日別）",keep:"5年",freq:"毎日"},
    ]},
    {cat:"請求・経理",items:[
      {id:"d09",name:"給付費請求書・明細書",keep:"5年",freq:"月次"},
      {id:"d10",name:"領収書・支払記録",keep:"5年",freq:"随時"},
      {id:"d11",name:"収支計算書",keep:"10年",freq:"年次"},
    ]},
    {cat:"人員・組織",items:[
      {id:"d12",name:"従業者の勤務体制記録",keep:"5年",freq:"月次"},
      {id:"d13",name:"資格証・研修修了証（全スタッフ）",keep:"在職中",freq:"取得時"},
      {id:"d14",name:"雇用契約書",keep:"退職後3年",freq:"採用時"},
    ]},
    {cat:"安全・緊急対応",items:[
      {id:"d15",name:"事故報告書・ヒヤリハット",keep:"5年",freq:"発生時"},
      {id:"d16",name:"業務継続計画（BCP）",keep:"永久",freq:"年次見直し"},
      {id:"d17",name:"虐待防止・身体拘束廃止計画",keep:"永久",freq:"年次見直し"},
      {id:"d18",name:"感染症・食中毒対応マニュアル",keep:"永久",freq:"年次見直し"},
    ]},
    {cat:"会議・委員会",items:[
      {id:"d19",name:"職員会議議事録",keep:"5年",freq:"月次"},
      {id:"d20",name:"虐待防止委員会議事録",keep:"5年",freq:"年2回以上"},
      {id:"d21",name:"身体拘束廃止委員会議事録",keep:"5年",freq:"年2回以上"},
      {id:"d22",name:"リスクマネジメント委員会議事録",keep:"5年",freq:"年2回以上"},
    ]},
  ];
  const [docStatus,setDocStatus]=useState({});
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","doc_status").single().then(({data})=>{
      if(data?.value){try{setDocStatus(JSON.parse(data.value));}catch(e){}}
      setLoaded(true);
    });
  },[]);
  const update = async(id,field,val)=>{
    const newS={...docStatus,[id]:{...docStatus[id],[field]:val}};
    setDocStatus(newS);
    await supabase.from("app_settings").upsert({key:"doc_status",value:JSON.stringify(newS)});
  };
  const allDocs=REQUIRED_DOCS.flatMap(c=>c.items);
  const done=allDocs.filter(d=>docStatus[d.id]?.status==="整備済").length;
  const pct=Math.round(done/allDocs.length*100);
  return(
    <div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontWeight:700,fontSize:15}}>整備状況 {done}/{allDocs.length}件</div>
          <div className="mono" style={{fontSize:22,fontWeight:800,color:pct>=80?"#059669":pct>=50?"#d97706":"#ef4444"}}>{pct}%</div>
        </div>
        <div style={{height:10,background:"#e2e8f0",borderRadius:5,overflow:"hidden"}}>
          <div style={{height:"100%",width:pct+"%",background:pct>=80?"#059669":pct>=50?"#f59e0b":"#ef4444",transition:"width .4s",borderRadius:5}}/>
        </div>
        <div style={{display:"flex",gap:16,marginTop:8,fontSize:12,flexWrap:"wrap"}}>
          {[{l:"整備済",c:"#059669",st:"整備済"},{l:"整備中",c:"#d97706",st:"整備中"},{l:"未整備",c:"#ef4444",st:"未整備"}].map(k=>(
            <div key={k.st} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:"50%",background:k.c}}/><span style={{color:"#64748b"}}>{k.l}: {allDocs.filter(d=>(docStatus[d.id]?.status||"未整備")===k.st).length}件</span></div>
          ))}
        </div>
      </div>
      {!loaded?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>読み込み中...</div>:
      REQUIRED_DOCS.map(cat=>(
        <div key={cat.cat} style={{marginBottom:18}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8,paddingBottom:6,borderBottom:"2px solid #f1f5f9"}}>📁 {cat.cat}</div>
          <div style={{display:"grid",gap:6}}>
            {cat.items.map(doc=>{
              const s=docStatus[doc.id]||{status:"未整備"};
              const color=s.status==="整備済"?"#059669":s.status==="整備中"?"#d97706":"#ef4444";
              const bg=s.status==="整備済"?"#f0fdf4":s.status==="整備中"?"#fffbeb":"#fef2f2";
              return(
                <div key={doc.id} style={{background:bg,borderRadius:10,padding:"10px 14px",border:`1px solid ${s.status==="整備済"?"#bbf7d0":s.status==="整備中"?"#fde68a":"#fecaca"}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13,marginBottom:3}}>{doc.name}</div>
                      <div style={{fontSize:11,color:"#64748b"}}>保管期間: {doc.keep} ／ 更新: {doc.freq}</div>
                      {s.updated&&<div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>更新日: {s.updated}</div>}
                      <input className="input" style={{marginTop:6,fontSize:12}} placeholder="メモ・保管場所・担当者..." value={s.memo||""} onChange={e=>update(doc.id,"memo",e.target.value)}/>
                    </div>
                    <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
                      <span className="tag" style={{color,border:`1px solid ${color}`,background:"white"}}>{s.status}</span>
                      <select style={{fontSize:11,border:"1px solid #e2e8f0",borderRadius:6,padding:"4px 6px",cursor:"pointer"}} value={s.status||"未整備"} onChange={e=>update(doc.id,"status",e.target.value).then(()=>update(doc.id,"updated",today))}>
                        <option>未整備</option><option>整備中</option><option>整備済</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function HintsTab() {
  const HINTS_DATA = [
    {title:"夜間支援体制加算（Ⅰ）",points:"夜間に常駐の夜間支援員を配置することで算定可能。夜勤記録の整備が必須。",cat:"体制加算",pri:"高",
     advice:["夜勤専従職員の配置計画を立てる","夜勤記録フォームを整備する","労基法の深夜割増賃金を確認する"]},
    {title:"強度行動障害支援者養成研修加算",points:"基礎研修・実践研修修了者を配置。修了証の管理と記録が必要。",cat:"人員加算",pri:"高",
     advice:["研修日程を都道府県に確認","受講対象スタッフをリストアップ","研修費用の予算確保"]},
    {title:"個別支援計画未作成減算（回避）",points:"個別支援計画は6ヶ月ごとの見直しが必要。作成漏れは減算対象。",cat:"減算回避",pri:"高",
     advice:["6ヶ月サイクルの更新カレンダーを作成","計画期限アラートを設定","サービス管理責任者との連携体制確認"]},
    {title:"精神障害者地域移行特別加算",points:"精神科病院から退院後1年以内の利用者に算定可能。受入れ記録の保管が必要。",cat:"対象者加算",pri:"中",
     advice:["対象利用者の入院歴を確認","退院後1年以内の受入れ体制を整備","病院との連携協定書を締結"]},
    {title:"医療連携体制加算（Ⅳ）",points:"看護師等との連携協定を締結し、医療的ケアを提供することで算定。",cat:"医療連携",pri:"中",
     advice:["連携看護師・医療機関を探す","連携協定書のひな形を準備","医療的ケア手順書を整備"]},
    {title:"自立生活支援加算",points:"一人暮らし等を希望する利用者への支援計画作成で算定。本人同意書と支援記録が必要。",cat:"支援加算",pri:"中",
     advice:["一人暮らし希望者の意向確認","本人同意書のフォームを準備","地域移行支援機関との連携"]},
    {title:"食事提供体制加算",points:"施設内で食事を提供する場合に算定可能。食事記録・献立表の整備が必要。",cat:"サービス加算",pri:"低",
     advice:["栄養士との連携または献立外注を検討","食事記録フォームを整備","衛生管理マニュアルを作成"]},
  ];
  const [hStatus,setHStatus]=useState({});
  const [hNote,setHNote]=useState({});
  const [loaded,setLoaded]=useState(false);
  const [filterPri,setFilterPri]=useState("全て");
  const [filterSt,setFilterSt]=useState("全て");
  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","hint_progress").single().then(({data})=>{
      if(data?.value){try{const p=JSON.parse(data.value);setHStatus(p.s||{});setHNote(p.n||{});}catch(e){}}
      setLoaded(true);
    });
  },[]);
  const saveProgress = async(newS,newN)=>{
    await supabase.from("app_settings").upsert({key:"hint_progress",value:JSON.stringify({s:newS,n:newN})});
  };
  const setStatus = (id,val)=>{
    const newS={...hStatus,[id]:val};
    setHStatus(newS);
    saveProgress(newS,hNote);
  };
  const setNote = (id,val)=>{
    const newN={...hNote,[id]:val};
    setHNote(newN);
    saveProgress(hStatus,newN);
  };
  const done=HINTS_DATA.filter(h=>hStatus[h.title]==="取得済").length;
  const inprog=HINTS_DATA.filter(h=>hStatus[h.title]==="準備中").length;
  const pct=Math.round(done/HINTS_DATA.length*100);
  const filtered=HINTS_DATA.filter(h=>(filterPri==="全て"||h.pri===filterPri)&&(filterSt==="全て"||(hStatus[h.title]||"未対応")===filterSt));
  return(
    <div className="fade-in">
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>加算取得ヒント＆進捗管理</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>取得状況を記録してアドバイスを確認できます</div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:15}}>取得進捗 — {done}/{HINTS_DATA.length}件取得済</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:pct>=80?"#059669":pct>=40?"#d97706":"#2563eb"}}>{pct}%</div>
        </div>
        <div style={{height:10,background:"#e2e8f0",borderRadius:5,overflow:"hidden",marginBottom:10}}>
          <div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#2563eb,#059669)",borderRadius:5,transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex",gap:16,fontSize:12,flexWrap:"wrap"}}>
          {[{l:"取得済",c:"#059669",v:done},{l:"準備中",c:"#d97706",v:inprog},{l:"未対応",c:"#94a3b8",v:HINTS_DATA.length-done-inprog}].map(k=>(
            <div key={k.l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:10,borderRadius:"50%",background:k.c}}/><span style={{color:"#64748b"}}>{k.l}: {k.v}件</span></div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["全て","高","中","低"].map(p=><button key={p} className={`btn ${filterPri===p?"btn-primary":"btn-secondary"} btn-sm`} onClick={()=>setFilterPri(p)}>{p==="全て"?"全優先度":"優先度 "+p}</button>)}
        <div style={{width:1,background:"#e2e8f0"}}/>
        {["全て","未対応","準備中","取得済"].map(s=><button key={s} className={`btn ${filterSt===s?"btn-primary":"btn-secondary"} btn-sm`} onClick={()=>setFilterSt(s)}>{s}</button>)}
      </div>
      {!loaded?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>読み込み中...</div>:
      <div style={{display:"grid",gap:12}}>
        {filtered.map((h,i)=>{
          const st=hStatus[h.title]||"未対応";
          const nt=hNote[h.title]||"";
          const stColor=st==="取得済"?"#059669":st==="準備中"?"#d97706":"#94a3b8";
          const stBg=st==="取得済"?"#f0fdf4":st==="準備中"?"#fffbeb":"#f8fafc";
          return(
            <div key={i} style={{background:stBg,borderRadius:12,padding:"14px 16px",border:`1px solid ${st==="取得済"?"#bbf7d0":st==="準備中"?"#fde68a":"#e2e8f0"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                    <div style={{fontWeight:700,fontSize:13}}>{h.title}</div>
                    <span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{h.cat}</span>
                    <span className="tag" style={{background:h.pri==="高"?"#fee2e2":h.pri==="中"?"#fef3c7":"#f1f5f9",color:h.pri==="高"?"#ef4444":h.pri==="中"?"#d97706":"#94a3b8"}}>優先:{h.pri}</span>
                  </div>
                  <div style={{fontSize:13,color:"#374151",lineHeight:1.7}}>💡 {h.points}</div>
                </div>
                <select style={{fontSize:12,border:`1px solid ${stColor}`,borderRadius:8,padding:"5px 8px",background:"white",color:stColor,fontWeight:600,cursor:"pointer",flexShrink:0}} value={st} onChange={e=>setStatus(h.title,e.target.value)}>
                  <option>未対応</option><option>準備中</option><option>取得済</option>
                </select>
              </div>
              {st!=="取得済"&&h.advice&&(
                <div style={{background:"white",borderRadius:8,padding:"10px 12px",marginBottom:8}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#2563eb",marginBottom:6}}>📋 次のアクション</div>
                  {h.advice.map((a,j)=>(
                    <div key={j} style={{fontSize:12,color:"#374151",display:"flex",gap:6,marginBottom:3}}>
                      <span style={{color:"#2563eb",flexShrink:0}}>→</span>{a}
                    </div>
                  ))}
                </div>
              )}
              <input className="input" style={{fontSize:12}} placeholder="メモ・担当者・完了予定日など..." value={nt} onChange={e=>setNote(h.title,e.target.value)}/>
            </div>
          );
        })}
      </div>}
    </div>
  );
}

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


function F({label,k,type="text",opts,span,form,setForm}) {
  return (
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
}

function PH({title,sub,onAdd,addLabel,extra}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
      <div><div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>{title}</div>{sub&&<div style={{fontSize:13,color:"#94a3b8"}}>{sub}</div>}</div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>{extra}{onAdd&&<button className="btn btn-primary" onClick={onAdd}><Icon name="plus" size={14}/>{addLabel||"追加"}</button>}</div>
    </div>
  );
}

function MD({name,table,children,wide,modal,editId,closeModal,save}) {
  if(modal!==name) return null;
  return (
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
  const [salaries, setSalaries] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [selUser, setSelUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0,10));
  const [fUser, setFUser] = useState("");
  const [fUnit, setFUnit] = useState("全棟");
  const [fCat, setFCat] = useState("全て");
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [winW, setWinW] = useState(375);
  useEffect(()=>{
    setWinW(window.innerWidth);
    const onResize=()=>setWinW(window.innerWidth);
    window.addEventListener('resize',onResize);
    return()=>window.removeEventListener('resize',onResize);
  },[]);
  useEffect(()=>{
    let mv=document.querySelector('meta[name=viewport]');
    if(!mv){mv=document.createElement('meta');mv.name='viewport';document.head.prepend(mv);}
    mv.content='width=device-width,initial-scale=1,maximum-scale=1';
  },[]);
  const isMobile = winW < 1024;

  const today = new Date().toISOString().slice(0,10);
  const fmt = n => Number(n||0).toLocaleString("ja-JP");
  const unread = msgs.filter(m=>!m.is_read).length;

  useEffect(() => { if(auth==="app") loadAll(); }, [auth]);

  const loadAll = async () => {
    setLoading(true);
    const [u,t,e,c,a,sr,sp,mo,pr,wr,fr,sc,um,st,sal,shf] = await Promise.all([
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
      supabase.from("salary_records").select("*").order("year_month",{ascending:false}),
      supabase.from("shift_requests").select("*").order("created_at",{ascending:false}),
    ]);
    setUsers(u.data||[]); setTransport(t.data||[]); setEntries(e.data||[]);
    setClaims(c.data||[]); setAttendance(a.data||[]); setSrecs(sr.data||[]);
    setPlans(sp.data||[]); setMonitors(mo.data||[]); setPerfs(pr.data||[]);
    setWages(wr.data||[]); setFiles(fr.data||[]); setScheds(sc.data||[]);
    setMsgs(um.data||[]); setStaffList(st.data||[]);
    setSalaries(sal.data||[]); setShifts(shf.data||[]);
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
      {id:"salary",label:"給与計算・支払管理",icon:"wage"},
      {id:"password",label:"パスワード変更",icon:"shield"},
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
      {id:"docs",label:"必須保存書類管理",icon:"file"},
      {id:"files",label:"ファイル・会議報告書",icon:"file"},
      {id:"hints",label:"加算ヒント",icon:"hint"},
      {id:"news",label:"最新ニュース",icon:"news"},
    ]},
  ];
  const staffTabs = [
    {g:"業務",items:[
      {id:"attendance",label:"勤怠打刻",icon:"clock"},
      {id:"my_salary",label:"給料・シフト確認",icon:"wage"},
      {id:"shift_req",label:"シフト希望・訂正",icon:"calendar"},
      {id:"staff_password",label:"パスワード変更",icon:"shield"},
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
      <header style={{background:"white",borderBottom:"1px solid #e2e8f0",padding:"0 14px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {isMobile && (
            <button onClick={()=>setNavOpen(true)} style={{background:"none",border:"none",cursor:"pointer",padding:"6px",display:"flex",flexDirection:"column",gap:4,alignItems:"center",justifyContent:"center",borderRadius:8}}>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
            </button>
          )}
          <div style={{width:30,height:30,borderRadius:8,background:isAdmin?"linear-gradient(135deg,#7c3aed,#4c1d95)":"linear-gradient(135deg,#2563eb,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🏠</div>
          <div><div style={{fontWeight:700,fontSize:13,color:"#0f172a"}}>グループホーム管理</div><div style={{fontSize:10,color:"#94a3b8"}}>{isAdmin?"👑 管理者":`👤 ${me?.name}`}</div></div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {unread>0&&<span style={{background:"#ef4444",color:"white",borderRadius:99,fontSize:11,fontWeight:700,padding:"2px 8px"}}>📩 {unread}</span>}
          <button className="btn btn-secondary btn-sm" onClick={logout}><Icon name="logout" size={13}/>{isMobile?"":"ログアウト"}</button>
        </div>
      </header>

      {/* ドロワーオーバーレイ（モバイル） */}
      {isMobile && navOpen && (
        <div onClick={()=>setNavOpen(false)} style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",zIndex:90}}/>
      )}

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* サイドバー */}
        <aside style={{
          width: 196,
          background:"white",
          borderRight:"1px solid #e2e8f0",
          padding:"8px 6px",
          flexShrink:0,
          overflowY:"auto",
          ...(isMobile ? {
            position:"fixed", top:0, left:0, height:"100%", zIndex:100,
            transform: navOpen ? "translateX(0)" : "translateX(-100%)",
            transition:"transform .25s ease",
            boxShadow: navOpen ? "4px 0 24px rgba(0,0,0,.15)" : "none",
          } : {})
        }}>
          {isMobile && (
            <div style={{display:"flex",justifyContent:"flex-end",padding:"4px 4px 8px"}}>
              <button style={{background:"none",border:"none",cursor:"pointer",fontSize:22,color:"#94a3b8",padding:"4px 8px",lineHeight:1}} onClick={()=>setNavOpen(false)}>✕</button>
            </div>
          )}
          {tabs.map(g=>(
            <div key={g.g}>
              <div className="nav-group">{g.g}</div>
              {g.items.map(t=>(
                <button key={t.id} className={`nav-item ${tab===t.id?"active":""}`} onClick={()=>{setTab(t.id);setSearch("");setNavOpen(false);}}>
                  <Icon name={t.icon} size={14}/>{t.label}
                  {t.badge>0&&<span className="alert-badge">{t.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main style={{flex:1,padding:isMobile?"12px":"18px",overflowY:"auto",overflowX:"hidden",minWidth:0}}>

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
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16}}>
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
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:9,marginBottom:14}}>
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
              <MD name="利用者" table="users"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="名前" k="name"form={form} setForm={setForm}/><F label="フリガナ" k="kana"form={form} setForm={setForm}/>
                  <F label="年齢" k="age" type="number"form={form} setForm={setForm}/><F label="部屋番号" k="room"form={form} setForm={setForm}/>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]}form={form} setForm={setForm}/><F label="支援区分" k="support_level" opts={["1","2","3","4","5","6"]}form={form} setForm={setForm}/>
                  <F label="ステータス" k="status" opts={["在籍","外泊中","退去","入院中"]}form={form} setForm={setForm}/><F label="入居日" k="admission_date" type="date"form={form} setForm={setForm}/>
                  <F label="保護者" k="guardian"form={form} setForm={setForm}/><F label="保護者連絡先" k="guardian_tel"form={form} setForm={setForm}/>
                </div>
                <F label="障害種別" k="disability"form={form} setForm={setForm}/>
                <F label="投薬メモ" k="medication_note" type="textarea"form={form} setForm={setForm}/>
                <F label="利用者アクセスコード（メッセージ用）" k="access_code"form={form} setForm={setForm}/>
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
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8,fontSize:13}}>
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
              <MD name="支援記録" table="support_records"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="時間帯" k="time_slot" opts={["日中","夜間","深夜"]}form={form} setForm={setForm}/>
                  <F label="記録者" k="staff_name"form={form} setForm={setForm}/>
                  <F label="健康状態" k="health" opts={["良好","普通","不調","体調不良","通院"]}form={form} setForm={setForm}/>
                  <F label="食事" k="meal" opts={["完食","8割","半分","少量","欠食"]}form={form} setForm={setForm}/>
                </div>
                <F label="支援内容" k="content" type="textarea" spanform={form} setForm={setForm}/>
                <F label="活動内容" k="activity" type="textarea" spanform={form} setForm={setForm}/>
                <F label="様子・行動" k="behavior" type="textarea" spanform={form} setForm={setForm}/>
                <F label="特記事項" k="note" type="textarea" spanform={form} setForm={setForm}/>
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
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8,fontSize:12,marginBottom:8}}>
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
              <MD name="支援計画" table="support_plans"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="ステータス" k="status" opts={["作成中","進行中","完了"]}form={form} setForm={setForm}/>
                  <F label="計画開始日" k="period_start" type="date"form={form} setForm={setForm}/>
                  <F label="計画終了日" k="period_end" type="date"form={form} setForm={setForm}/>
                  <F label="更新予定日" k="review_date" type="date"form={form} setForm={setForm}/>
                  <F label="作成者" k="created_by"form={form} setForm={setForm}/>
                </div>
                <F label="アセスメント" k="assessment" type="textarea" spanform={form} setForm={setForm}/>
                <F label="支援目標" k="goals" type="textarea" spanform={form} setForm={setForm}/>
              </MD>
              <MD name="モニタリング" table="monitoring"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="評価日" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="評価者" k="evaluator"form={form} setForm={setForm}/>
                  <F label="ステータス" k="status" opts={["未完","実施済","承認済"]}form={form} setForm={setForm}/>
                </div>
                <F label="目標達成状況" k="goal_achievement" type="textarea" spanform={form} setForm={setForm}/>
                <F label="課題・問題点" k="issues" type="textarea" spanform={form} setForm={setForm}/>
                <F label="次期計画の方向性" k="next_plan" type="textarea" spanform={form} setForm={setForm}/>
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
              <MD name="実績" table="performance_records"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="サービス種別" k="service_type" opts={["共同生活援助","短期入所","日中支援"]}form={form} setForm={setForm}/>
                  <F label="担当スタッフ" k="staff_name"form={form} setForm={setForm}/>
                  <F label="開始時刻" k="start_time" type="time"form={form} setForm={setForm}/>
                  <F label="終了時刻" k="end_time" type="time"form={form} setForm={setForm}/>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>欠席</label>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                    <input type="checkbox" checked={form.is_absence||false} onChange={e=>setForm(f=>({...f,is_absence:e.target.checked}))}/>
                    <span style={{fontSize:13}}>欠席扱いにする</span>
                  </label>
                </div>
                <F label="備考" k="note" type="textarea" spanform={form} setForm={setForm}/>
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
              <MD name="工賃" table="wage_records"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="年月" k="year_month" type="month"form={form} setForm={setForm}/>
                  <F label="勤務日数" k="work_days" type="number"form={form} setForm={setForm}/>
                  <F label="勤務時間" k="work_hours" type="number"form={form} setForm={setForm}/>
                  <F label="単価（円）" k="unit_wage" type="number"form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>工賃合計</label>
                    <div className="input" style={{background:"#f8fafc",fontWeight:700,color:"#059669"}}>¥{fmt((form.work_hours||0)*(form.unit_wage||0))}</div>
                  </div>
                </div>
                <F label="備考" k="note" type="textarea" spanform={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── スタッフ管理 ── */}
          {tab==="staff"&&isAdmin&&(
            <div className="fade-in">
              <PH title="スタッフ管理" sub={`${staffList.length}名`} onAdd={()=>openModal("スタッフ",{name:"",kana:"",role:"世話人",full_time:"true",tel:"",email:"",hourly_rate:"",pin:"",hire_date:"",certifications:""})} addLabel="スタッフ追加"/>
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
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>openEdit("スタッフ",s)}><Icon name="edit" size={13}/>編集</button>
                      <button className="btn btn-red" style={{padding:"8px 12px"}} onClick={()=>del("staff_members",s.id)}><Icon name="trash" size={13}/></button>
                    </div>
                  </div>
                ))}
              </div>
              <MD name="スタッフ" table="staff_members"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="名前" k="name"form={form} setForm={setForm}/><F label="フリガナ" k="kana"form={form} setForm={setForm}/>
                  <F label="電話" k="tel"form={form} setForm={setForm}/><F label="メール" k="email" type="email"form={form} setForm={setForm}/>
                  <F label="役職" k="role" opts={["世話人","生活支援員","運転手","施設管理者","サービス管理責任者"]}form={form} setForm={setForm}/>
                  <F label="雇用形態" k="full_time" opts={["true","false"]}form={form} setForm={setForm}/>
                  <F label="時給（円）" k="hourly_rate" type="number"form={form} setForm={setForm}/>
                  <F label="PINコード" k="pin"form={form} setForm={setForm}/>
                  <F label="入職日" k="hire_date" type="date"form={form} setForm={setForm}/>
                </div>
                <F label="保有資格（カンマ区切り）" k="certifications" spanform={form} setForm={setForm}/>
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

          {/* ── シフト申請確認（管理者） ── */}
          {tab==="att_admin"&&isAdmin&&shifts.length>0&&(
            <div style={{marginTop:20}}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>📬 シフト・打刻訂正申請</div>
              <div style={{display:"grid",gap:8}}>
                {shifts.filter(s=>s.status==="申請中").map((s,i)=>(
                  <div key={i} style={{background:"#fffbeb",borderRadius:10,padding:"12px 14px",border:"1px solid #fde68a",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                    <div>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                        <span className="tag" style={{background:"#fef3c7",color:"#d97706"}}>{s.type}</span>
                        <span style={{fontWeight:700,fontSize:13}}>{s.staff_name}</span>
                        <span className="mono" style={{fontSize:12,color:"#64748b"}}>{s.date_from}{s.date_to&&s.date_to!==s.date_from?"〜"+s.date_to:""}</span>
                      </div>
                      {s.reason&&<div style={{fontSize:12,color:"#475569"}}>{s.reason}</div>}
                      {s.correction_date&&<div style={{fontSize:12,color:"#475569"}}>訂正: {s.correction_date} {s.correction_in}〜{s.correction_out}</div>}
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button className="btn btn-green btn-sm" onClick={async()=>{await supabase.from("shift_requests").update({status:"承認"}).eq("id",s.id);loadAll();}}>承認</button>
                      <button className="btn btn-red btn-sm" onClick={async()=>{await supabase.from("shift_requests").update({status:"却下"}).eq("id",s.id);loadAll();}}>却下</button>
                    </div>
                  </div>
                ))}
                {shifts.filter(s=>s.status==="申請中").length===0&&<div style={{textAlign:"center",padding:"16px",color:"#94a3b8",fontSize:13,background:"#f8fafc",borderRadius:10}}>未処理の申請はありません</div>}
              </div>
            </div>
          )}

          {/* ── 勤怠打刻（スタッフ） ── */}
          {tab==="attendance"&&!isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>勤怠打刻</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>{me?.name} さん — {today}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16,maxWidth:440,marginBottom:24}}>
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

          {/* ── 給与計算・支払管理（管理者） ── */}
          {tab==="salary"&&isAdmin&&(
            <div className="fade-in">
              <SalaryAdminTab
                staffList={staffList}
                salaries={salaries}
                attendance={attendance}
                loadAll={loadAll}
                today={today}
              />
            </div>
          )}

          {/* ── 給料・シフト確認（スタッフ） ── */}
          {tab==="my_salary"&&!isAdmin&&(
            <div className="fade-in">
              <MySalaryTab me={me} salaries={salaries} attendance={attendance}/>
            </div>
          )}

          {/* ── シフト希望・訂正（スタッフ） ── */}
          {tab==="shift_req"&&!isAdmin&&(
            <div className="fade-in">
              <ShiftReqTab me={me} shifts={shifts} loadAll={loadAll} today={today}/>
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
              <MD name="送迎" table="transport_log"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="日付" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="時刻" k="time" type="time"form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="種別" k="type" opts={["送迎（往）","送迎（復）","通院送迎","その他"]}form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当</label>
                    <select className="input" value={form.driver||""} onChange={e=>setForm(f=>({...f,driver:e.target.value}))}>
                      <option value="">選択...</option>{staffList.map(s=><option key={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <F label="目的地" k="destination"form={form} setForm={setForm}/>
                  <F label="距離(km)" k="distance" type="number"form={form} setForm={setForm}/>
                  <F label="コスト(円)" k="cost" type="number"form={form} setForm={setForm}/>
                </div>
              </MD>
            </div>
          )}

          {/* ── 国保連請求 ── */}
          {tab==="claims"&&isAdmin&&(
            <div className="fade-in">
              <BillingTab claims={claims} users={users} perfs={perfs} srecs={srecs} today={today}/>
            </div>
          )}

          {/* ── 経理 ── */}
          {tab==="accounting"&&isAdmin&&(
            <div className="fade-in">
              <PH title="経理・決算管理" onAdd={()=>openModal("仕訳",{date:"",category:"支出",sub_category:"",description:"",amount:"",debit:"",credit:""})} addLabel="仕訳入力"/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:14,marginBottom:16}}>
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
              <MD name="仕訳" table="accounting_entries"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="日付" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="区分" k="category" opts={["収入","支出"]}form={form} setForm={setForm}/>
                  <F label="科目" k="sub_category"form={form} setForm={setForm}/>
                  <F label="金額（円）" k="amount" type="number"form={form} setForm={setForm}/>
                  <F label="借方" k="debit"form={form} setForm={setForm}/>
                  <F label="貸方" k="credit"form={form} setForm={setForm}/>
                </div>
                <F label="摘要" k="description" type="textarea" spanform={form} setForm={setForm}/>
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
              <MD name="予定" table="schedules"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||"",unit:u?.unit||"A棟"}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]}form={form} setForm={setForm}/>
                  <F label="種別" k="type" opts={["外泊","通院","入院","服薬変更","短期入所","その他"]}form={form} setForm={setForm}/>
                  <F label="状態" k="status" opts={["予定","実施中","実施済","キャンセル"]}form={form} setForm={setForm}/>
                  <F label="開始日" k="start_date" type="date"form={form} setForm={setForm}/>
                  <F label="終了日" k="end_date" type="date"form={form} setForm={setForm}/>
                </div>
                <F label="備考" k="note" type="textarea" spanform={form} setForm={setForm}/>
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
              <MD name="ファイル" table="file_records"modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="カテゴリ" k="category" opts={["職員会議","虐待防止","BCP","ヒヤリハット","事故報告","研修記録","その他"]}form={form} setForm={setForm}/>
                  <F label="種別" k="file_type" opts={["議事録","報告書","計画書","マニュアル","記録票","その他"]}form={form} setForm={setForm}/>
                  <F label="日付" k="date" type="date"form={form} setForm={setForm}/>
                  <F label="作成者" k="author"form={form} setForm={setForm}/>
                </div>
                <F label="タイトル" k="title" spanform={form} setForm={setForm}/>
                <F label="内容" k="content" type="textarea" spanform={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── パスワード変更（管理者） ── */}
          {tab==="password"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>パスワード変更</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>管理者PINおよびスタッフPINの変更</div>
              <AdminPinForm loadAll={loadAll}/>
              <StaffPinForm staffList={staffList} loadAll={loadAll}/>
            </div>
          )}

          {/* ── パスワード変更（スタッフ） ── */}
          {tab==="staff_password"&&!isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>パスワード変更</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>{me?.name} さんのPINコード変更</div>
              <SelfPinForm me={me} loadAll={loadAll}/>
            </div>
          )}

          {/* ── 必須保存書類管理 ── */}
          {tab==="docs"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>必須保存書類管理</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>法定・行政上の保管義務がある書類の整備状況</div>
              <DocsTab today={today}/>
            </div>
          )}

                    {/* ── 加算ヒント ── */}
                    {tab==="hints"&&isAdmin&&<HintsTab/>}

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
