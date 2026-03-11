import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

const supabase = createClient(
  "https://qfjmmictnrsbmnlzrbhj.supabase.co",
  "sb_publishable_PS9o6e0oUYuzYL6NxKVpQw_YUyHNua9"
);

const localDate = () => { const n = new Date(); return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0"); };
const getNightRate = (s) => Number(s?.night_rate||0) > 0 ? Number(s.night_rate) : Math.floor(Number(s?.hourly_rate||0)*1.25);

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
  .input{border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;width:100%;outline:none;transition:border .15s;font-family:inherit;box-sizing:border-box;}
  .input:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.1);}
  .textarea{border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;font-size:13px;width:100%;outline:none;resize:vertical;font-family:inherit;min-height:80px;}
  .textarea:focus{border-color:#3b82f6;}
  .nav-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:12.5px;font-weight:500;color:#64748b;transition:all .15s;border:none;background:transparent;width:100%;text-align:left;}
  .nav-item:hover{background:#f1f5f9;color:#1e293b;}
  .nav-item.active{background:#eff6ff;color:#2563eb;}
  .nav-group{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#cbd5e1;padding:10px 12px 4px;}
  .row-hover:hover{background:#f8fafc;cursor:pointer;}
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:200;overflow-y:auto;padding:60px 12px 20px;}
  .modal{background:white;border-radius:16px;padding:20px;width:100%;max-width:680px;box-shadow:0 20px 60px rgba(0,0,0,.25);margin:0 auto;}
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
    .card{padding:12px;}
    .modal{padding:16px;border-radius:12px;}
    th,td{padding:6px 8px;font-size:11px;}
    .stat-card{padding:10px 12px;}
    .btn{padding:7px 10px;font-size:12px;}
    .btn-sm{padding:4px 7px;font-size:11px;}
    .nav-group{padding:8px 10px 3px;}
    select.input{font-size:16px;}
    input.input{font-size:16px;}
    input[type="date"].input,input[type="time"].input{-webkit-appearance:none;appearance:none;border-radius:8px !important;width:100% !important;box-sizing:border-box !important;max-width:100% !important;display:block !important;color:#0f172a;}
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


// 給与明細PDF生成（印刷用HTMLをウィンドウで開く）
function generatePayslip(r, staffInfo, attRows) {
  const nightRate = getNightRate(staffInfo||r);
  const dayRate = staffInfo?.hourly_rate || r.hourly_rate || 0;
  // 勤務明細行
  const attHtml = attRows.length > 0 ? attRows.map(a => {
    const ci = a.clock_in ? new Date(a.clock_in) : null;
    const co = a.clock_out ? new Date(a.clock_out) : null;
    const mins = ci && co ? Math.max(0, Math.round((co - ci) / 60000) - (a.break_minutes||0)) : 0;
    const h = Math.floor(mins/60), m = mins%60;
    const isNight = a.shift_type === "夜勤";
    return `<tr><td>${a.date||""}</td><td>${a.shift_type||"日勤"}</td><td>${ci?ci.toTimeString().slice(0,5):"-"}</td><td>${co?co.toTimeString().slice(0,5):"-"}</td><td>${a.break_minutes||0}分</td><td>${h}h${m}m</td><td>¥${((isNight?nightRate:dayRate)*mins/60).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")||0}</td></tr>`;
  }).join("") : `<tr><td colspan="7" style="text-align:center;color:#999">勤務記録なし</td></tr>`;

  const html = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>給与明細 ${r.year_month} ${r.staff_name}</title>
<style>
  body{font-family:'Noto Sans JP',sans-serif;margin:0;padding:24px;color:#1e293b;font-size:13px;}
  h2{margin:0 0 4px;font-size:20px;} .sub{color:#64748b;font-size:12px;margin-bottom:20px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #1e3a8a;}
  .company{font-size:12px;color:#64748b;text-align:right;}
  table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:12px;}
  th{background:#1e3a8a;color:white;padding:7px 10px;text-align:left;}
  td{padding:6px 10px;border-bottom:1px solid #e2e8f0;}
  .summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
  .box{border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center;}
  .box-label{font-size:11px;color:#64748b;margin-bottom:4px;}
  .box-val{font-size:18px;font-weight:800;}
  .total-box{background:#1e3a8a;color:white;border-radius:10px;padding:16px;text-align:center;margin-bottom:20px;}
  .total-box .label{font-size:11px;opacity:.8;margin-bottom:4px;}
  .total-box .val{font-size:28px;font-weight:800;}
  .note{font-size:11px;color:#64748b;margin-top:4px;}
  @media print{body{padding:10px;} button{display:none;}}
</style></head><body>
<div class="header">
  <div><h2>給 与 明 細 書</h2><div class="sub">${r.year_month} 分</div></div>
  <div class="company"><div style="font-weight:700;font-size:14px">グループホーム管理システム</div><div>発行日: ${new Date().toLocaleDateString("ja-JP")}</div></div>
</div>
<table style="margin-bottom:16px">
  <tr><th colspan="4">スタッフ情報</th></tr>
  <tr><td style="width:25%;color:#64748b">氏名</td><td style="font-weight:700;font-size:15px">${r.staff_name} 様</td><td style="width:25%;color:#64748b">基本時給</td><td>¥${Number(dayRate).toLocaleString()} / 夜勤 ¥${nightRate.toLocaleString()}</td></tr>
  <tr><td style="color:#64748b">対象月</td><td>${r.year_month}</td><td style="color:#64748b">給料日</td><td>${r.pay_date||"調整中"}</td></tr>
</table>
<div class="summary">
  <div class="box"><div class="box-label">総勤務時間</div><div class="box-val" style="color:#2563eb">${Math.floor((r.work_minutes||0)/60)}h${(r.work_minutes||0)%60}m</div></div>
  <div class="box"><div class="box-label">手当・追加</div><div class="box-val" style="color:#059669">¥${(r.extra_pay||0).toLocaleString()}</div></div>
  <div class="box"><div class="box-label">控除額</div><div class="box-val" style="color:#ef4444">¥${(r.deduction||0).toLocaleString()}</div></div>
</div>
<div class="total-box"><div class="label">支 給 額（手 取 り）</div><div class="val">¥${(r.net_pay||0).toLocaleString()}</div>${r.note?`<div class="note">📝 ${r.note}</div>`:""}</div>
<table>
  <tr><th>日付</th><th>区分</th><th>出勤</th><th>退勤</th><th>休憩</th><th>勤務時間</th><th>賃金</th></tr>
  ${attHtml}
</table>
<div style="text-align:center;margin-top:20px">
  <button onclick="window.print()" style="padding:10px 28px;background:#1e3a8a;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer;margin-right:8px">🖨️ 印刷・PDF保存</button>
  <button onclick="window.close()" style="padding:10px 20px;background:#f1f5f9;color:#475569;border:none;border-radius:8px;font-size:14px;cursor:pointer">閉じる</button>
</div>
</body></html>`;
  const w = window.open("","_blank","width=800,height=900");
  if(w){ w.document.write(html); w.document.close(); }
}

function SalaryAdminTab({staffList, salaries, attendance, loadAll, today, isMobile}) {
  const [selStaff, setSelStaff] = useState("");
  const [ym, setYm] = useState((today||localDate()).slice(0,7));
  const [baseHour, setBaseHour] = useState("");
  const [extraPay, setExtraPay] = useState("0");
  const [deduct, setDeduct] = useState("0");
  const [note, setNote] = useState("");
  const [payDate, setPayDate] = useState("");
  const [filterYm, setFilterYm] = useState((today||localDate()).slice(0,7));
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
      <PH title="給与計算・支払管理" sub="勤怠データから自動計算・支払管理"/>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"minmax(0,1fr) minmax(0,1fr)",gap:16,marginBottom:20,alignItems:"start"}}>

        {/* ── 左：給与計算フォーム ── */}
        <div className="card">
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>📝 給与計算</div>
          <div style={{display:"grid",gap:10}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
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
            {selStaffData&&(
              <div style={{background:"#f0f9ff",borderRadius:8,padding:"10px 12px",fontSize:13}}>
                <div style={{color:"#64748b",marginBottom:4}}>📊 {ym} の勤務データ</div>
                <div style={{fontWeight:700,color:"#0369a1"}}>
                  {Math.floor(previewMins/60)}時間{previewMins%60}分
                  <span style={{fontSize:11,fontWeight:400,color:"#64748b",marginLeft:8}}>（基本時給: ¥{(selStaffData.hourly_rate||0).toLocaleString()}）</span>
                </div>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時給上書き（円）</label>
                <input className="input" type="number" placeholder={selStaffData?.hourly_rate||"自動"} value={baseHour} onChange={e=>setBaseHour(e.target.value)}/>
              </div>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>手当・追加（円）</label>
                <input className="input" type="number" value={extraPay} onChange={e=>setExtraPay(e.target.value)}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
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
            {selStaff&&(
              <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:10,padding:"14px",color:"white",textAlign:"center"}}>
                <div style={{fontSize:11,opacity:.8,marginBottom:4}}>支給額（手取り）</div>
                <div style={{fontSize:28,fontWeight:800}}>¥{previewTotal.toLocaleString()}</div>
              </div>
            )}
            {msg&&<div style={{color:msg.includes("✅")?"#059669":"#ef4444",fontSize:13,fontWeight:600}}>{msg}</div>}
            <button className="btn btn-primary" style={{justifyContent:"center",padding:"12px"}} onClick={save}>
              <Icon name="check" size={14}/>保存・確定
            </button>
          </div>
        </div>

        {/* ── 右：支払状況 ── */}
        <div className="card">
          <div style={{fontWeight:700,fontSize:14,marginBottom:14}}>📅 支払状況</div>
          <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
            <input className="input" type="month" value={filterYm} onChange={e=>setFilterYm(e.target.value)} style={{flex:1}}/>
            <span style={{fontSize:12,color:"#64748b",whiteSpace:"nowrap"}}>{totalPaid}/{filtered.length}名 支払済</span>
          </div>
          <div style={{background:"linear-gradient(135deg,#ecfdf5,#d1fae5)",borderRadius:10,padding:"12px",marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#065f46"}}>合計支給額</div>
            <div style={{fontSize:22,fontWeight:800,color:"#059669"}}>¥{totalNet.toLocaleString()}</div>
          </div>
          <div style={{display:"grid",gap:8}}>
            {filtered.length===0&&<div style={{textAlign:"center",padding:"20px",color:"#94a3b8",fontSize:13}}>この月のデータがありません</div>}
            {filtered.map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:r.status==="支払済"?"#f0fdf4":"#fafafa",borderRadius:10,border:"1px solid "+(r.status==="支払済"?"#bbf7d0":"#e2e8f0")}}>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:700,fontSize:13}}>{r.staff_name}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>
                    {Math.floor((r.work_minutes||0)/60)}h{(r.work_minutes||0)%60}m
                    {r.pay_date&&<span style={{marginLeft:6}}>💳 {r.pay_date}</span>}
                  </div>
                  {r.note&&<div style={{fontSize:11,color:"#94a3b8"}}>{r.note}</div>}
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                  <div style={{fontWeight:800,fontSize:15,color:r.status==="支払済"?"#059669":"#1e293b"}}>¥{(r.net_pay||0).toLocaleString()}</div>
                  {r.status==="支払済"
                    ?<span className="tag" style={{background:"#dcfce7",color:"#059669",fontSize:11}}>支払済</span>
                    :<button className="btn btn-green btn-sm" style={{marginTop:4}} onClick={()=>markPaid(r.id)}>支払済にする</button>
                  }
                  <button className="btn btn-secondary btn-sm" style={{marginTop:4,display:"block"}} onClick={()=>{const s=staffList.find(x=>x.id===r.staff_id);const att=attendance.filter(a=>a.staff_id===r.staff_id&&a.date?.startsWith(r.year_month));generatePayslip(r,s,att);}}>📄 明細</button>
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
                  <button className="btn btn-secondary btn-sm" style={{marginLeft:4}} onClick={()=>{const s=staffList.find(x=>x.id===r.staff_id);const att=attendance.filter(a=>a.staff_id===r.staff_id&&a.date?.startsWith(r.year_month));generatePayslip(r,s,att);}}>📄 明細</button>
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
  const allMySalaries = salaries.filter(s => s.staff_id === me?.id);
  const thisMonth = localDate().slice(0,7);
  const [selMonth, setSelMonth] = useState(thisMonth);

  const mySalaries = allMySalaries.slice(0, 12);
  const nextSalary = mySalaries.find(s => s.status !== "支払済");

  const myAttendance = attendance.filter(a => a.staff_id === me?.id);
  const selMonthAtt = myAttendance.filter(a => a.date?.startsWith(selMonth));
  const totalMins = selMonthAtt.reduce((sum,a) => {
    if (!a.clock_in || !a.clock_out) return sum;
    return sum + Math.max(0, Math.round((new Date(a.clock_out)-new Date(a.clock_in))/60000) - (a.break_minutes||0));
  }, 0);
  const selMonthSalary = allMySalaries.find(s => s.year_month === selMonth);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:18,fontWeight:700}}>給料・シフト確認</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <label style={{fontSize:12,color:"#64748b"}}>年月</label>
          <input className="input" type="month" value={selMonth} onChange={e=>setSelMonth(e.target.value)} style={{width:150,fontSize:13}}/>
        </div>
      </div>
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
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{selMonth}の勤務時間</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:"#2563eb"}}>{Math.floor(totalMins/60)}h{totalMins%60}m</div>
        </div>
        <div className="stat-card" style={{borderTop:"3px solid #059669",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>出勤日数</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:"#059669"}}>{selMonthAtt.filter(a=>a.clock_in).length}日</div>
        </div>
        {selMonthSalary&&<div className="stat-card" style={{borderTop:"3px solid #7c3aed",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{selMonth}の給与</div>
          <div className="mono" style={{fontSize:20,fontWeight:800,color:"#7c3aed"}}>¥{(selMonthSalary.net_pay||0).toLocaleString()}</div>
          <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>{selMonthSalary.status||"確認中"}</div>
        </div>}
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
              <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                <div style={{fontWeight:800,fontSize:16,color:"#1e293b"}}>¥{(r.net_pay||0).toLocaleString()}</div>
                <span className="tag" style={{background:r.status==="支払済"?"#dcfce7":"#fef3c7",color:r.status==="支払済"?"#059669":"#d97706",fontSize:11}}>{r.status||"確認中"}</span>
                <button className="btn btn-secondary btn-sm" onClick={()=>{const att=attendance.filter(a=>a.staff_id===me?.id&&a.date?.startsWith(r.year_month));generatePayslip(r,me,att);}}>📄 明細</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 選択月の勤怠記録 */}
      <div className="card" style={{marginTop:12}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>🕐 {selMonth} 勤怠記録</div>
        {selMonthAtt.length===0
          ?<div style={{textAlign:"center",padding:"16px",color:"#94a3b8",fontSize:13}}>この月の勤怠データはありません</div>
          :<div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:"#f8fafc"}}>
                <th style={{padding:"6px 8px",textAlign:"left",borderBottom:"2px solid #e2e8f0"}}>日付</th>
                <th style={{padding:"6px 8px",textAlign:"center",borderBottom:"2px solid #e2e8f0"}}>出勤</th>
                <th style={{padding:"6px 8px",textAlign:"center",borderBottom:"2px solid #e2e8f0"}}>退勤</th>
                <th style={{padding:"6px 8px",textAlign:"center",borderBottom:"2px solid #e2e8f0"}}>休憩</th>
                <th style={{padding:"6px 8px",textAlign:"center",borderBottom:"2px solid #e2e8f0"}}>実働</th>
              </tr></thead>
              <tbody>
                {selMonthAtt.sort((a,b)=>a.date.localeCompare(b.date)).map((a,i)=>{
                  const wd=["日","月","火","水","木","金","土"][new Date(a.date.replace(/-/g,"/")).getDay()];
                  const mins=a.clock_in&&a.clock_out?Math.max(0,Math.round((new Date(a.clock_out)-new Date(a.clock_in))/60000)-(a.break_minutes||0)):0;
                  const isWE=wd==="日"||wd==="土";
                  return(
                    <tr key={i} style={{borderBottom:"1px solid #f1f5f9",background:isWE?"#fafafa":"white"}}>
                      <td style={{padding:"5px 8px",fontWeight:600,color:wd==="日"?"#ef4444":wd==="土"?"#2563eb":"#1e293b"}}>{a.date.slice(5)} ({wd})</td>
                      <td style={{padding:"5px 8px",textAlign:"center",fontFamily:"monospace"}}>{a.clock_in?new Date(a.clock_in).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"-"}</td>
                      <td style={{padding:"5px 8px",textAlign:"center",fontFamily:"monospace"}}>{a.clock_out?new Date(a.clock_out).toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"-"}</td>
                      <td style={{padding:"5px 8px",textAlign:"center",color:"#64748b"}}>{a.break_minutes||0}分</td>
                      <td style={{padding:"5px 8px",textAlign:"center",fontWeight:700,color:mins>0?"#2563eb":"#94a3b8"}}>{mins>0?Math.floor(mins/60)+"h"+mins%60+"m":"-"}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{background:"#eff6ff",fontWeight:700}}>
                  <td colSpan={4} style={{padding:"6px 8px",textAlign:"right",fontSize:12}}>月計</td>
                  <td style={{padding:"6px 8px",textAlign:"center",color:"#2563eb"}}>{Math.floor(totalMins/60)}h{totalMins%60}m</td>
                </tr>
              </tfoot>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

function ShiftReqTab({me, shifts, loadAll, today}) {
  const [type, setType] = useState("希望休");
  const _today = today || localDate();
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

function TransportTab({transport, users, staffList, isAdmin, loadAll, csv}) {
  const [gasPrice, setGasPrice] = useState(170);
  const [savedGasPrice, setSavedGasPrice] = useState(170);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [beforeImg, setBeforeImg] = useState(null);
  const [afterImg, setAfterImg] = useState(null);
  const [beforeKm, setBeforeKm] = useState("");
  const [afterKm, setAfterKm] = useState("");
  const [tForm, setTForm] = useState({date:localDate(),user_id:"",user_name:"",type:"送迎（往）",destination:"",driver:"",distance:"",cost:"",time:"",note:""});
  const [saving, setSaving] = useState(false);
  const [filterMonth, setFilterMonth] = useState(localDate().slice(0,7));

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","gas_price").single().then(({data})=>{
      if(data?.value){const v=Number(data.value);setGasPrice(v);setSavedGasPrice(v);}
    });
  },[]);

  const saveGasPrice=async()=>{
    await supabase.from("app_settings").upsert({key:"gas_price",value:String(gasPrice)},{onConflict:"key"});
    setSavedGasPrice(gasPrice);
    alert("ガソリン単価を保存しました");
  };

  const toBase64=(file)=>new Promise((res,rej)=>{
    const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);
  });

  const readMeter=async(imgBase64,label)=>{
    setOcrLoading(true);setOcrResult(null);
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:100,
          messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:"image/jpeg",data:imgBase64}},
            {type:"text",text:"この車のオドメーター画像から走行距離の数値をkm単位で読み取り、数字のみ答えてください。例：12345.6"}
          ]}]
        })
      });
      const data=await res.json();
      const text=data.content?.[0]?.text||"";
      const num=parseFloat(text.replace(/[^0-9.]/g,""));
      if(!isNaN(num)){
        setOcrResult({label,km:num,ok:true});
        if(label==="before")setBeforeKm(String(num));
        else setAfterKm(String(num));
      } else {
        setOcrResult({label,error:"数値を読み取れませんでした。手動で入力してください。"});
      }
    } catch(e){setOcrResult({label,error:"読み取りエラー: "+e.message});}
    setOcrLoading(false);
  };

  const handleImg=async(e,type)=>{
    const file=e.target.files?.[0];if(!file)return;
    const b64=await toBase64(file);
    const url=URL.createObjectURL(file);
    if(type==="before"){setBeforeImg(url);await readMeter(b64,"before");}
    else{setAfterImg(url);await readMeter(b64,"after");}
  };

  const dist=afterKm&&beforeKm?Math.max(0,Number(afterKm)-Number(beforeKm)).toFixed(1):tForm.distance;
  const autoCost=dist&&savedGasPrice?Math.round(Number(dist)/12*savedGasPrice):"";

  const handleSave=async()=>{
    if(!tForm.date||!tForm.user_id){alert("日付と利用者を入力してください");return;}
    setSaving(true);
    const d=Number(dist)||Number(tForm.distance)||0;
    const c=Number(tForm.cost)||Number(autoCost)||0;
    await supabase.from("transport_log").insert({...tForm,distance:d,cost:c,before_km:beforeKm||null,after_km:afterKm||null});
    setTForm({date:localDate(),user_id:"",user_name:"",type:"送迎（往）",destination:"",driver:"",distance:"",cost:"",time:"",note:""});
    setBeforeImg(null);setAfterImg(null);setBeforeKm("");setAfterKm("");setOcrResult(null);
    setSaving(false);loadAll();
  };

  const filtered=transport.filter(t=>t.date&&t.date.startsWith(filterMonth));
  const totalDist=filtered.reduce((s,t)=>s+Number(t.distance||0),0);
  const totalCost=filtered.reduce((s,t)=>s+Number(t.cost||0),0);

  return(
    <div className="fade-in">
      <div style={{fontWeight:700,fontSize:18,marginBottom:4}}>送迎管理</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>メーター写真でkm自動読取・ガソリンコスト計算</div>

      {isAdmin&&<div className="card" style={{marginBottom:14,background:"#fffbeb",border:"1px solid #fde68a"}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>⛽ ガソリン単価設定（相模原市平均）</div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <input className="input" type="number" min={100} max={300} style={{maxWidth:110}} value={gasPrice} onChange={e=>setGasPrice(Number(e.target.value))}/>
          <span style={{fontSize:13,color:"#64748b"}}>円/L</span>
          <button className="btn btn-primary btn-sm" onClick={saveGasPrice}>保存</button>
          <span style={{fontSize:11,color:"#94a3b8"}}>保存済: ¥{savedGasPrice}/L　燃費12km/L換算で自動計算</span>
        </div>
      </div>}

      <div className="card" style={{marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📷 送迎記録追加</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <div>
            <div style={{fontWeight:600,fontSize:12,marginBottom:6,color:"#2563eb"}}>🚗 出発前メーター</div>
            <label style={{display:"block",border:"2px dashed #93c5fd",borderRadius:10,padding:12,textAlign:"center",cursor:"pointer",background:"#eff6ff",marginBottom:6,minHeight:80}}>
              <input type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>handleImg(e,"before")}/>
              {beforeImg?<img src={beforeImg} alt="before" style={{maxWidth:"100%",maxHeight:100,borderRadius:6,objectFit:"contain"}}/>:<div style={{fontSize:12,color:"#2563eb",paddingTop:16}}>📷 タップして撮影<br/><span style={{fontSize:10,color:"#94a3b8"}}>または選択</span></div>}
            </label>
            <input className="input" type="number" placeholder="km（手動入力可）" value={beforeKm} onChange={e=>setBeforeKm(e.target.value)} style={{fontSize:13}}/>
          </div>
          <div>
            <div style={{fontWeight:600,fontSize:12,marginBottom:6,color:"#059669"}}>🏁 到着後メーター</div>
            <label style={{display:"block",border:"2px dashed #6ee7b7",borderRadius:10,padding:12,textAlign:"center",cursor:"pointer",background:"#ecfdf5",marginBottom:6,minHeight:80}}>
              <input type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>handleImg(e,"after")}/>
              {afterImg?<img src={afterImg} alt="after" style={{maxWidth:"100%",maxHeight:100,borderRadius:6,objectFit:"contain"}}/>:<div style={{fontSize:12,color:"#059669",paddingTop:16}}>📷 タップして撮影<br/><span style={{fontSize:10,color:"#94a3b8"}}>または選択</span></div>}
            </label>
            <input className="input" type="number" placeholder="km（手動入力可）" value={afterKm} onChange={e=>setAfterKm(e.target.value)} style={{fontSize:13}}/>
          </div>
        </div>

        {ocrLoading&&<div style={{textAlign:"center",padding:"10px",fontSize:13,color:"#2563eb",background:"#eff6ff",borderRadius:8,marginBottom:10}}>🤖 AIがメーターを読み取り中...</div>}
        {ocrResult&&<div style={{padding:"8px 12px",borderRadius:8,marginBottom:10,background:ocrResult.error?"#fef2f2":"#f0fdf4",border:"1px solid "+(ocrResult.error?"#fecaca":"#bbf7d0"),fontSize:13}}>
          {ocrResult.error?<span style={{color:"#ef4444"}}>⚠️ {ocrResult.error}</span>:<span style={{color:"#059669"}}>✅ {ocrResult.label==="before"?"出発前":"到着後"}: <strong>{ocrResult.km} km</strong></span>}
        </div>}

        {(dist||autoCost)&&<div style={{display:"flex",gap:16,padding:"10px 14px",background:"#f8fafc",borderRadius:8,marginBottom:10,flexWrap:"wrap"}}>
          {dist&&<div><span style={{fontSize:12,color:"#64748b"}}>走行距離: </span><span style={{fontWeight:700,color:"#0369a1",fontSize:15}}>{dist} km</span></div>}
          {autoCost&&<div><span style={{fontSize:12,color:"#64748b"}}>推定ガソリン代: </span><span style={{fontWeight:700,color:"#059669",fontSize:15}}>¥{Number(autoCost).toLocaleString()}</span><span style={{fontSize:10,color:"#94a3b8"}}>（¥{savedGasPrice}/L, 12km/L）</span></div>}
        </div>}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:8,marginBottom:10}}>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label><input className="input" type="date" value={tForm.date} onChange={e=>setTForm(f=>({...f,date:e.target.value}))}/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時刻</label><input className="input" type="time" value={tForm.time} onChange={e=>setTForm(f=>({...f,time:e.target.value}))}/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
            <select className="input" value={tForm.user_id} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setTForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
              <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>種別</label>
            <select className="input" value={tForm.type} onChange={e=>setTForm(f=>({...f,type:e.target.value}))}>
              {["送迎（往）","送迎（復）","通院送迎","その他"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当者</label>
            <select className="input" value={tForm.driver} onChange={e=>setTForm(f=>({...f,driver:e.target.value}))}>
              <option value="">選択...</option>{staffList.map(s=><option key={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>目的地</label><input className="input" value={tForm.destination} onChange={e=>setTForm(f=>({...f,destination:e.target.value}))} placeholder="例: 相模原市立病院"/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>距離(km)</label><input className="input" type="number" value={dist||tForm.distance} onChange={e=>setTForm(f=>({...f,distance:e.target.value}))} placeholder="写真から自動"/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>コスト(円)</label><input className="input" type="number" value={tForm.cost||autoCost} onChange={e=>setTForm(f=>({...f,cost:e.target.value}))} placeholder={autoCost?String(autoCost):"自動計算"}/></div>
        </div>
        <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px"}} onClick={handleSave} disabled={saving}>{saving?"保存中...":"📝 送迎記録を保存"}</button>
      </div>

      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <input className="input" type="month" style={{maxWidth:160}} value={filterMonth} onChange={e=>setFilterMonth(e.target.value)}/>
        {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(filtered,"送迎記録")}><Icon name="download" size={13}/>CSV</button>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
        {[
          {l:"送迎回数",v:filtered.length+"回",c:"#2563eb"},
          {l:"総走行距離",v:totalDist.toFixed(1)+"km",c:"#d97706"},
          {l:"推定ガソリン代",v:"¥"+Math.round(totalDist/12*savedGasPrice).toLocaleString(),c:"#7c3aed"},
          {l:"記録コスト合計",v:"¥"+totalCost.toLocaleString(),c:"#059669"},
        ].map((k,i)=>(
          <div key={i} className="stat-card" style={{borderLeft:"4px solid "+k.c}}>
            <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div>
            <div style={{fontWeight:800,fontSize:16,color:k.c}}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <table>
          <thead><tr><th>日付</th><th>時刻</th><th>利用者</th><th>種別</th><th>目的地</th><th>担当</th><th>距離</th><th>コスト</th>{isAdmin&&<th>操作</th>}</tr></thead>
          <tbody>
            {filtered.length===0
              ?<tr><td colSpan={9} style={{textAlign:"center",padding:"24px",color:"#94a3b8"}}>この月の記録はありません</td></tr>
              :filtered.map((t,i)=>(
                <tr key={i} className="row-hover">
                  <td className="mono" style={{fontSize:12}}>{t.date}</td>
                  <td className="mono" style={{fontSize:12}}>{t.time||"—"}</td>
                  <td style={{fontWeight:600}}>{t.user_name}</td>
                  <td><span className="tag" style={{background:"#eff6ff",color:"#2563eb",fontSize:11}}>{t.type}</span></td>
                  <td style={{fontSize:12}}>{t.destination}</td>
                  <td style={{fontSize:12}}>{t.driver}</td>
                  <td className="mono">{Number(t.distance||0).toFixed(1)}km</td>
                  <td className="mono" style={{fontWeight:700,color:"#059669"}}>¥{Number(t.cost||0).toLocaleString()}</td>
                  {isAdmin&&<td><button className="btn btn-red btn-sm" onClick={async()=>{if(window.confirm("削除しますか？")){await supabase.from("transport_log").delete().eq("id",t.id);loadAll();}}}><Icon name="trash" size={12}/></button></td>}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}


function BillingTab({claims, users, perfs, srecs, today}) {
  const [activeSection, setActiveSection] = useState("menu");
  const [selMonth, setSelMonth] = useState((today||localDate()).slice(0,7));
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

function SabikanMgmtTab() {
  const [list, setList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({name:"",kana:"",tel:"",email:"",certifications:"",hire_date:"",note:""});

  const KEY = "sabikan_members";
  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key",KEY).single().then(({data})=>{
      try{ setList(JSON.parse(data?.value||"[]")); }catch(e){ setList([]); }
    });
  },[]);
  const save = async(newList)=>{ setList(newList); await supabase.from("app_settings").upsert({key:KEY,value:JSON.stringify(newList)},{onConflict:"key"}); };
  const del = (i)=>{ if(window.confirm("本当に削除しますか？この操作は元に戻せません")) save(list.filter((_,j)=>j!==i)); };
  const submit = ()=>{
    if(!form.name.trim()){alert("入力されていない項目があります。ご確認ください");return;}
    if(editIdx!==null){ const n=[...list];n[editIdx]={...form};save(n);setEditIdx(null); }
    else save([...list,{...form,id:Date.now()}]);
    setForm({name:"",kana:"",tel:"",email:"",certifications:"",hire_date:"",note:""});
    setAdding(false);
  };
  const startEdit=(i)=>{ setForm({...list[i]});setEditIdx(i);setAdding(true); };
  const cancel=()=>{ setAdding(false);setEditIdx(null);setForm({name:"",kana:"",tel:"",email:"",certifications:"",hire_date:"",note:""}); };

  return(
    <div className="fade-in">
      <PH title="サービス管理責任者管理" sub={`${list.length}名`} onAdd={()=>{cancel();setAdding(true);}} addLabel="新規登録"/>
      {adding&&(
        <div className="card" style={{marginBottom:14,border:"2px solid #0284c7"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:"#0369a1"}}>{editIdx!==null?"✏️ 編集":"➕ 新規登録"}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:10}}>
            {[["名前 *","name","text"],["フリガナ","kana","text"],["電話","tel","tel"],["メール","email","email"],["入職日","hire_date","date"]].map(([label,k,type])=>(
              <div key={k}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>{label}</label>
                <input className="input" type={type} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/></div>
            ))}
          </div>
          <div style={{marginBottom:10}}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>保有資格（カンマ区切り）</label>
            <input className="input" value={form.certifications||""} onChange={e=>setForm(f=>({...f,certifications:e.target.value}))} placeholder="例: 社会福祉士, 精神保健福祉士"/></div>
          <div style={{marginBottom:12}}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label>
            <textarea className="input" rows={2} value={form.note||""} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/></div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={submit}><Icon name="check" size={14}/>{editIdx!==null?"更新":"登録"}</button>
            <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={cancel}>キャンセル</button>
          </div>
        </div>
      )}
      {list.length===0&&!adding
        ?<div className="card" style={{textAlign:"center",padding:"40px 20px",color:"#94a3b8"}}><div style={{fontSize:36,marginBottom:8}}>📝</div><div>記録がありません</div></div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:16}}>
          {list.map((s,i)=>(
            <div key={i} className="card">
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,#0369a1,#0284c7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"white",flexShrink:0,fontWeight:700}}>📋</div>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{s.name}</div><div style={{fontSize:12,color:"#64748b"}}>{s.kana}</div></div>
              </div>
              <div style={{fontSize:12,color:"#64748b",lineHeight:2,marginBottom:8}}>
                {s.tel&&<div>📞 {s.tel}</div>}
                {s.email&&<div>✉️ {s.email}</div>}
                {s.hire_date&&<div>📅 入職: {s.hire_date}</div>}
                {s.certifications&&<div>🎓 {s.certifications}</div>}
                {s.note&&<div style={{color:"#475569"}}>📝 {s.note}</div>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>startEdit(i)}><Icon name="edit" size={13}/>編集</button>
                <button className="btn btn-red" style={{padding:"8px 12px"}} onClick={()=>del(i)}><Icon name="trash" size={13}/></button>
              </div>
            </div>
          ))}
        </div>
      }
      <div className="card" style={{maxWidth:480,marginTop:8}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:10}}>🔑 ログインPINコード管理</div>
        <SabikanPinResetForm/>
        <div style={{fontSize:11,color:"#94a3b8",marginTop:8}}>※ PINはサービス管理責任者ログイン画面で使用します</div>
      </div>
    </div>
  );
}

function SabikanPinResetForm() {
  const [newPin, setNewPin] = useState("");
  const [show, setShow] = useState(false);
  const [ok, setOk] = useState(false);
  const reset = async () => {
    if(newPin.length < 4){alert("新しいPINコードは4文字以上で入力してください");return;}
    await supabase.from("app_settings").upsert({key:"sabikan_pin",value:newPin},{onConflict:"key"});
    setOk(true); setNewPin(""); setTimeout(()=>setOk(false),3000);
  };
  return(
    <div>
      {ok&&<div style={{color:"#059669",fontSize:13,marginBottom:8,fontWeight:600}}>✓ PINコードを変更しました</div>}
      <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
        <div style={{flex:1}}>
          <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPINコード（4〜6桁）</label>
          <input className="input" type={show?"text":"password"} maxLength={6} value={newPin} onChange={e=>setNewPin(e.target.value)} placeholder="新しいPIN"/>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={()=>setShow(v=>!v)}>{show?"隠す":"表示"}</button>
        <button className="btn btn-primary btn-sm" onClick={reset}>変更</button>
      </div>
      <div style={{fontSize:11,color:"#94a3b8",marginTop:6}}>変更後はサービス管理責任者へ新しいPINをお知らせください</div>
    </div>
  );
}

function SabikanPinForm() {
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [nw2, setNw2] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const change = async () => {
    setErr("");
    const {data} = await supabase.from("app_settings").select("value").eq("key","sabikan_pin").single();
    const current = data?.value || "5678";
    if(current !== cur){setErr("現在のPINコードが正しくありません");return;}
    if(nw.length < 4){setErr("新しいPINコードは4文字以上で入力してください");return;}
    if(nw !== nw2){setErr("新しいPINコードが一致しません");return;}
    await supabase.from("app_settings").upsert({key:"sabikan_pin",value:nw},{onConflict:"key"});
    setOk(true); setCur(""); setNw(""); setNw2("");
  };
  return(
    <div className="fade-in">
      <PH title="パスワード変更" sub="サービス管理責任者PINコードの変更"/>
      <div className="card" style={{maxWidth:360}}>
        {ok&&<div style={{color:"#059669",marginBottom:12,fontWeight:600}}>✓ 変更しました</div>}
        <div style={{display:"grid",gap:10}}>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>現在のPIN</label><input className="input" type="password" maxLength={6} value={cur} onChange={e=>setCur(e.target.value)}/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN</label><input className="input" type="password" maxLength={6} value={nw} onChange={e=>setNw(e.target.value)}/></div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>新しいPIN（確認）</label><input className="input" type="password" maxLength={6} value={nw2} onChange={e=>setNw2(e.target.value)}/></div>
        </div>
        {err&&<div style={{color:"#ef4444",fontSize:13,marginTop:8}}>{err}</div>}
        <button className="btn btn-primary" style={{marginTop:12,width:"100%",justifyContent:"center"}} onClick={change}>変更する</button>
      </div>
    </div>
  );
}


// 打刻通知設定コンポーネント
function ClockNotifySettings({staffList}) {
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","clock_notify_settings").single().then(({data})=>{
      if(data?.value){
        try{const v=JSON.parse(data.value);setNotifyEmail(v.email||"");setNotifyEnabled(v.enabled||false);setLastSent(v.last_sent||null);}catch(e){}
      }
      setLoaded(true);
    });
  },[]);

  const save=async()=>{
    if(notifyEnabled&&!notifyEmail){alert("通知先メールアドレスを入力してください");return;}
    setSaving(true);
    const val=JSON.stringify({email:notifyEmail,enabled:notifyEnabled,last_sent:lastSent});
    await supabase.from("app_settings").upsert({key:"clock_notify_settings",value:val},{onConflict:"key"});
    setSaving(false);
    alert("通知設定を保存しました");
  };

  if(!loaded) return null;
  return(
    <div className="card" style={{marginBottom:16,border:"2px solid #dbeafe"}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:4,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:20}}>🔔</span> 打刻忘れ通知設定
      </div>
      <div style={{fontSize:12,color:"#64748b",marginBottom:16,lineHeight:1.8}}>
        勤務終了時刻を過ぎても退勤打刻がないスタッフに、設定したメールアドレスへ通知します。<br/>
        ※ メール送信にはSupabaseのEdge FunctionとResend（無料）の設定が必要です。<br/>
        <a href="https://resend.com" target="_blank" rel="noreferrer" style={{color:"#2563eb",fontSize:11}}>Resend無料登録 →</a>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontWeight:600,fontSize:13}}>
          <input type="checkbox" checked={notifyEnabled} onChange={e=>setNotifyEnabled(e.target.checked)} style={{width:16,height:16}}/>
          通知を有効にする
        </label>
      </div>
      {notifyEnabled&&<>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>通知先メールアドレス（管理者）</label>
          <input className="input" type="email" value={notifyEmail} onChange={e=>setNotifyEmail(e.target.value)} placeholder="admin@example.com" style={{maxWidth:300}}/>
        </div>
        <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#92400e"}}>
          <strong>📋 各スタッフのシフト勤務終了時刻</strong>
          <div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:8}}>
            {[
              {label:"日勤",end:"18:00"},{label:"早番",end:"16:00"},
              {label:"遅番",end:"20:00"},{label:"夜勤",end:"05:00（翌日）"},
            ].map(s=><span key={s.label} style={{background:"white",border:"1px solid #fde68a",borderRadius:4,padding:"2px 8px",fontWeight:600}}>{s.label}: {s.end}</span>)}
          </div>
          <div style={{marginTop:8,fontSize:11,color:"#b45309"}}>
            ※ Supabase Edge Function（cron）で上記時刻の5分後に退勤未打刻スタッフを検知してメール送信します。<br/>
            Edge Functionの設定手順: Supabase Dashboard → Edge Functions → 新規作成
          </div>
        </div>
        <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"10px 14px",marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:6,color:"#065f46"}}>📧 各スタッフのメールアドレス確認</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {staffList.map(s=>(
              <div key={s.id} style={{fontSize:11,padding:"3px 8px",borderRadius:6,background:s.email?"#dcfce7":"#fee2e2",color:s.email?"#065f46":"#991b1b",border:"1px solid "+(s.email?"#bbf7d0":"#fecaca")}}>
                {s.name}：{s.email||"⚠️ メール未設定"}
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:"#64748b",marginTop:6}}>⚠️ のスタッフはスタッフ管理から登録してください</div>
        </div>
      </>}
      <button className="btn btn-primary" onClick={save} disabled={saving}>{saving?"保存中...":"設定を保存"}</button>
      {lastSent&&<div style={{fontSize:11,color:"#94a3b8",marginTop:8}}>最終通知: {lastSent}</div>}
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
    if(data?.value!==cur){setErr("現在のPINコードが正しくありません");return;}
    if(nw.length<4){setErr("新しいPINコードは4文字以上で入力してください");return;}
    if(nw!==conf){setErr("新しいPINコードが一致しません");return;}
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
    if(nw.length<4){setErr("新しいPINコードは4文字以上で入力してください");return;}
    if(nw!==conf){setErr("新しいPINコードが一致しません");return;}
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
    if(me?.pin!==cur){setErr("現在のPINコードが正しくありません");return;}
    if(nw.length<4){setErr("新しいPINコードは4文字以上で入力してください");return;}
    if(nw!==conf){setErr("新しいPINコードが一致しません");return;}
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

function TodoTab({staffList, today, me, isAdmin}) {
  const [todos, setTodos] = useState([]);       // マスターTODOリスト
  const [records, setRecords] = useState([]);   // 日付別チェック記録
  const [loaded, setLoaded] = useState(false);
  const [selDate, setSelDate] = useState(today);
  const [viewMode, setViewMode] = useState("check"); // "check"|"manage"|"history"
  const [newTodo, setNewTodo] = useState({title:"",category:"業務",assignee:"全員",note:""});
  const [adding, setAdding] = useState(false);
  const [histMonth, setHistMonth] = useState(today.slice(0,7));

  const CATS = ["業務","清掃","服薬確認","安全確認","書類","ルーティン","その他"];
  const DEFAULT_TODOS = [
    {id:"d1",title:"利用者の健康確認（体温・体調）",category:"安全確認",assignee:"全員",note:""},
    {id:"d2",title:"服薬確認・記録",category:"服薬確認",assignee:"全員",note:""},
    {id:"d3",title:"支援記録の入力",category:"書類",assignee:"全員",note:""},
    {id:"d4",title:"申し送り事項の確認",category:"業務",assignee:"全員",note:""},
    {id:"d5",title:"居室・共用部の清掃確認",category:"清掃",assignee:"全員",note:""},
    {id:"d6",title:"冷蔵庫・食品の確認",category:"ルーティン",assignee:"全員",note:""},
    {id:"d7",title:"鍵・施錠確認",category:"安全確認",assignee:"全員",note:""},
  ];

  useEffect(()=>{
    Promise.all([
      supabase.from("app_settings").select("value").eq("key","todo_master").single(),
      supabase.from("app_settings").select("value").eq("key","todo_records").single(),
    ]).then(([t,r])=>{
      if(t.data?.value){try{setTodos(JSON.parse(t.data.value));}catch(e){setTodos(DEFAULT_TODOS);}}
      else setTodos(DEFAULT_TODOS);
      if(r.data?.value){try{setRecords(JSON.parse(r.data.value));}catch(e){setRecords([]);}}
      else setRecords([]);
      setLoaded(true);
    });
  },[]);

  const saveTodos = async(newT)=>{ setTodos(newT); await supabase.from("app_settings").upsert({key:"todo_master",value:JSON.stringify(newT)},{onConflict:"key"}); };
  const saveRecords = async(newR)=>{ setRecords(newR); await supabase.from("app_settings").upsert({key:"todo_records",value:JSON.stringify(newR)},{onConflict:"key"}); };

  const getCheck = (date, todoId) => records.find(r=>r.date===date&&r.todoId===todoId);
  const toggleCheck = (todoId, staffName) => {
    const existing = getCheck(selDate, todoId);
    let newR;
    if(existing) newR = records.map(r=>r.date===selDate&&r.todoId===todoId ? {...r,done:!r.done,staff:staffName,time:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})} : r);
    else newR = [...records, {date:selDate,todoId,done:true,staff:staffName,time:new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"})}];
    saveRecords(newR);
  };

  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;

  const todayTodos = todos;
  const checkedCount = todayTodos.filter(t=>getCheck(selDate,t.id)?.done).length;
  const pct = todayTodos.length>0 ? Math.round(checkedCount/todayTodos.length*100) : 0;

  // History
  const histDates = [...new Set(records.filter(r=>r.date.startsWith(histMonth)&&r.done).map(r=>r.date))].sort((a,b)=>b.localeCompare(a));

  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        {[["check","✅ チェック"],["manage","⚙️ TODO管理"],["history","📋 履歴"]].map(([v,l])=>(
          <button key={v} className="btn btn-sm" style={{background:viewMode===v?"#2563eb":"#f1f5f9",color:viewMode===v?"white":"#475569",border:"none"}} onClick={()=>setViewMode(v)}>{l}</button>
        ))}
      </div>

      {viewMode==="check"&&(
        <>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
            <input className="input" type="date" style={{flex:1,maxWidth:170}} value={selDate} onChange={e=>setSelDate(e.target.value)}/>
            <div style={{fontSize:12,color:"#64748b"}}>{checkedCount}/{todayTodos.length} 完了</div>
          </div>
          <div style={{background:"#f1f5f9",borderRadius:8,height:8,marginBottom:14,overflow:"hidden"}}>
            <div style={{height:"100%",background:pct===100?"#059669":"#2563eb",width:pct+"%",borderRadius:8,transition:"width .3s"}}/>
          </div>
          {CATS.filter(cat=>todos.some(t=>t.category===cat)).map(cat=>{
            const catTodos = todos.filter(t=>t.category===cat);
            return(
              <div key={cat} style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:"0.05em",marginBottom:6}}>{cat.toUpperCase()}</div>
                <div style={{display:"grid",gap:6}}>
                  {catTodos.map(todo=>{
                    const rec = getCheck(selDate, todo.id);
                    const done = rec?.done||false;
                    return(
                      <div key={todo.id} onClick={()=>toggleCheck(todo.id, me?.name||"管理者")}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:done?"#f0fdf4":"white",border:`1px solid ${done?"#bbf7d0":"#e2e8f0"}`,cursor:"pointer",transition:"all .15s"}}>
                        <div style={{width:20,height:20,borderRadius:6,border:`2px solid ${done?"#059669":"#cbd5e1"}`,background:done?"#059669":"white",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {done&&<span style={{color:"white",fontSize:12,fontWeight:700}}>✓</span>}
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:500,color:done?"#059669":"#0f172a",textDecoration:done?"line-through":"none"}}>{todo.title}</div>
                          {todo.assignee!=="全員"&&<div style={{fontSize:11,color:"#94a3b8"}}>{todo.assignee}</div>}
                          {todo.note&&<div style={{fontSize:11,color:"#94a3b8"}}>{todo.note}</div>}
                        </div>
                        {done&&<div style={{fontSize:10,color:"#059669",flexShrink:0,textAlign:"right"}}>{rec.staff}<br/>{rec.time}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {viewMode==="manage"&&isAdmin&&(
        <>
          <button className="btn btn-primary btn-sm" style={{marginBottom:12}} onClick={()=>setAdding(true)}>＋ TODO追加</button>
          {adding&&(
            <div className="card" style={{marginBottom:12,background:"#f0f9ff",border:"1px solid #bae6fd"}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>新規TODO</div>
              <div style={{display:"grid",gap:8}}>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>タイトル</label><input className="input" value={newTodo.title} onChange={e=>setNewTodo(v=>({...v,title:e.target.value}))} placeholder="例：服薬確認"/></div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>カテゴリ</label>
                  <select className="input" value={newTodo.category} onChange={e=>setNewTodo(v=>({...v,category:e.target.value}))}>
                    {CATS.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当</label>
                  <select className="input" value={newTodo.assignee} onChange={e=>setNewTodo(v=>({...v,assignee:e.target.value}))}>
                    <option>全員</option>
                    {staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label><input className="input" value={newTodo.note} onChange={e=>setNewTodo(v=>({...v,note:e.target.value}))}/></div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button className="btn btn-primary btn-sm" onClick={()=>{
                  if(!newTodo.title.trim()){alert("タイトルを入力してください");return;}
                  saveTodos([...todos,{...newTodo,id:"c"+Date.now()}]);
                  setNewTodo({title:"",category:"業務",assignee:"全員",note:""});
                  setAdding(false);
                }}>追加</button>
                <button className="btn btn-secondary btn-sm" onClick={()=>setAdding(false)}>キャンセル</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gap:8}}>
            {todos.map((todo,i)=>(
              <div key={todo.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:"white",borderRadius:10,border:"1px solid #e2e8f0"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600}}>{todo.title}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{todo.category} · {todo.assignee}</div>
                  {todo.note&&<div style={{fontSize:11,color:"#94a3b8"}}>{todo.note}</div>}
                </div>
                <button className="btn btn-red btn-sm" onClick={()=>{if(window.confirm("本当に削除しますか？この操作は元に戻せません"))saveTodos(todos.filter((_,j)=>j!==i));}}>削除</button>
              </div>
            ))}
          </div>
        </>
      )}

      {viewMode==="history"&&(
        <>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
            <input className="input" type="month" style={{flex:1,maxWidth:170}} value={histMonth} onChange={e=>setHistMonth(e.target.value)}/>
          </div>
          {histDates.length===0
            ?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>この月の記録はありません</div>
            :histDates.map(date=>{
              const dayRecs = records.filter(r=>r.date===date&&r.done);
              const dayPct = Math.round(dayRecs.length/todos.length*100);
              return(
                <div key={date} className="card" style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontWeight:700,fontSize:13}}>{date}</div>
                    <span style={{fontSize:12,background:dayPct===100?"#ecfdf5":"#fef3c7",color:dayPct===100?"#059669":"#d97706",borderRadius:6,padding:"2px 8px"}}>{dayRecs.length}/{todos.length} ({dayPct}%)</span>
                  </div>
                  <div style={{display:"grid",gap:4}}>
                    {todos.map(todo=>{
                      const rec = records.find(r=>r.date===date&&r.todoId===todo.id&&r.done);
                      return(
                        <div key={todo.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,padding:"3px 0",borderBottom:"1px solid #f8fafc"}}>
                          <span style={{color:rec?"#059669":"#94a3b8"}}>{rec?"✅":"⬜"} {todo.title}</span>
                          {rec&&<span style={{fontSize:11,color:"#94a3b8"}}>{rec.staff} {rec.time}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          }
        </>
      )}
    </div>
  );
}

function AttAdminTab({attendance, today, loadAll, csv}) {
  const [attEditRec, setAttEditRec] = useState(null);
  const [attMonth, setAttMonth] = useState(today.slice(0,7));
  const filtered = attendance.filter(a=>a.date&&a.date.startsWith(attMonth));
  return(
    <div className="fade-in">
      {attEditRec&&<AttendanceEditModal rec={attEditRec} onClose={()=>setAttEditRec(null)} onSave={()=>{setAttEditRec(null);loadAll();}}/>}
      <PH title="勤怠管理" sub="全スタッフの勤怠記録"
        extra={<button className="btn btn-secondary btn-sm" onClick={()=>csv(filtered,"勤怠記録")}><Icon name="download" size={13}/>CSV</button>}
      />
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
        <input className="input" type="month" style={{maxWidth:160}} value={attMonth} onChange={e=>setAttMonth(e.target.value)}/>
        <span style={{fontSize:12,color:"#94a3b8"}}>{filtered.length}件</span>
      </div>
      <div className="card" style={{overflowX:"auto"}}>
        <table>
          <thead><tr><th>日付</th><th>スタッフ</th><th>出勤</th><th>退勤</th><th>勤務時間</th><th>休憩</th><th>備考</th><th>編集</th></tr></thead>
          <tbody>
            {filtered.map((a,i)=>{
              const ci=a.clock_in?new Date(a.clock_in):null;
              const co=a.clock_out?new Date(a.clock_out):null;
              const mins=ci&&co?Math.round((co-ci)/60000)-(a.break_minutes||0):null;
              return(
                <tr key={i} className="row-hover">
                  <td className="mono" style={{fontSize:12}}>{a.date}</td>
                  <td style={{fontWeight:600}}>{a.staff_name}</td>
                  <td className="mono" style={{fontSize:12}}>{ci?ci.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"-"}</td>
                  <td className="mono" style={{fontSize:12,color:co?"#374151":"#f59e0b"}}>{co?co.toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit"}):"勤務中"}</td>
                  <td className="mono" style={{fontSize:12,fontWeight:600,color:"#2563eb"}}>{mins!=null?Math.floor(mins/60)+"h"+mins%60+"m":"-"}</td>
                  <td className="mono" style={{fontSize:12,color:"#94a3b8"}}>{a.break_minutes?a.break_minutes+"分":"-"}</td>
                  <td style={{fontSize:12}}>{a.note}{a.edited_by&&<span className="tag" style={{background:"#fef3c7",color:"#d97706",marginLeft:4}}>編集済</span>}</td>
                  <td><button className="btn btn-secondary btn-sm" onClick={()=>setAttEditRec(a)}><Icon name="edit" size={12}/>編集</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>この月の打刻記録がありません</div>}
      </div>
    </div>
  );
}

function AttendanceEditModal({rec, onClose, onSave}) {
  const toLocalTime = (iso) => {
    if(!iso) return "";
    const d = new Date(iso);
    return d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");
  };
  const [date, setDate] = useState(rec.date||"");
  const [inTime, setInTime] = useState(toLocalTime(rec.clock_in));
  const [outTime, setOutTime] = useState(toLocalTime(rec.clock_out));
  const [breakMin, setBreakMin] = useState(rec.break_minutes||0);
  const [note, setNote] = useState(rec.note||"");
  const save = async () => {
    const buildISO = (dateStr, timeStr) => {
      if(!dateStr||!timeStr) return null;
      return new Date(dateStr+"T"+timeStr+":00").toISOString();
    };
    await supabase.from("attendance").update({
      date, clock_in:buildISO(date,inTime), clock_out:outTime?buildISO(date,outTime):null,
      break_minutes:Number(breakMin), note, edited_by:"管理者",
    }).eq("id",rec.id);
    onSave();
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.6)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"white",borderRadius:16,padding:24,width:"100%",maxWidth:400,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
        <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>勤怠記録の編集</div>
        <div style={{display:"grid",gap:10,marginBottom:16}}>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>スタッフ</label>
            <div style={{padding:"8px 12px",background:"#f8fafc",borderRadius:8,fontSize:13,fontWeight:600}}>{rec.staff_name}</div>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label>
            <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>出勤時刻</label>
              <input className="input" type="time" value={inTime} onChange={e=>setInTime(e.target.value)}/>
            </div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>退勤時刻</label>
              <input className="input" type="time" value={outTime} onChange={e=>setOutTime(e.target.value)}/>
            </div>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>休憩時間（分）</label>
            <input className="input" type="number" value={breakMin} onChange={e=>setBreakMin(e.target.value)}/>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label>
            <input className="input" value={note} onChange={e=>setNote(e.target.value)}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-primary" style={{flex:1,justifyContent:"center"}} onClick={save}>保存</button>
          <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
}

function ShiftMgmtTab({staffList, isAdmin, attendance=[], me}) {
  const _tn=new Date();const today=_tn.getFullYear()+"-"+String(_tn.getMonth()+1).padStart(2,"0")+"-"+String(_tn.getDate()).padStart(2,"0");
  const [selMonth, setSelMonth] = useState(today.slice(0,7));
  const [shiftData, setShiftData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [editCell, setEditCell] = useState(null);
  const [cellForm, setCellForm] = useState({});
  const [viewMode, setViewMode] = useState("table");
  const SHIFT_TYPES = [
    {label:"日勤",short:"日",color:"#2563eb",bg:"#eff6ff",start:"09:00",end:"18:00",break:60},
    {label:"夜勤",short:"夜",color:"#7c3aed",bg:"#f5f3ff",start:"22:00",end:"05:00",break:0},
    {label:"早番",short:"早",color:"#059669",bg:"#f0fdf4",start:"07:00",end:"16:00",break:60},
    {label:"遅番",short:"遅",color:"#d97706",bg:"#fffbeb",start:"11:00",end:"20:00",break:60},
    {label:"公休",short:"休",color:"#94a3b8",bg:"#f8fafc",start:"",end:"",break:0},
    {label:"有休",short:"有",color:"#10b981",bg:"#ecfdf5",start:"",end:"",break:0},
    {label:"欠勤",short:"欠",color:"#ef4444",bg:"#fef2f2",start:"",end:"",break:0},
    {label:"研修",short:"研",color:"#f59e0b",bg:"#fefce8",start:"",end:"",break:0},
    {label:"",short:"",color:"#e2e8f0",bg:"white",start:"",end:"",break:0},
  ];
  const ROLES = ["サービス管理責任者","世話人","生活支援員","夜間支援員","管理者","その他"];
  const WDAYS = ["日","月","火","水","木","金","土"];
  const getDays = (ym) => {
    const [y,m] = ym.split("-").map(Number);
    const days = []; const d = new Date(y,m-1,1);
    while(d.getMonth()===m-1){ days.push(y+"-"+String(m).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")); d.setDate(d.getDate()+1); }
    return days;
  };
  const days = getDays(selMonth);
  const skey = (staffId,date) => staffId+"_"+date;
  useEffect(()=>{
    const k="shift_mgmt_"+selMonth;
    supabase.from("app_settings").select("value").eq("key",k).single().then(({data})=>{
      if(data?.value){try{setShiftData(JSON.parse(data.value));}catch(e){setShiftData({});}}
      else setShiftData({});
      setLoaded(true);
    });
  },[selMonth]);
  const saveData = async(newD)=>{
    setShiftData(newD);
    await supabase.from("app_settings").upsert({key:"shift_mgmt_"+selMonth,value:JSON.stringify(newD)},{onConflict:"key"});
  };
  const openEdit = (staffId,date)=>{
    const c=shiftData[skey(staffId,date)]||{};
    const st=SHIFT_TYPES.find(s=>s.label===c.shift)||SHIFT_TYPES[8];
    setCellForm({shift:c.shift||"",start:c.start||st.start,end:c.end||st.end,break_minutes:c.break_minutes!==undefined?c.break_minutes:(st.break||0),role:c.role||"",note:c.note||""});
    setEditCell({staffId,date});
  };
  const saveCell=async()=>{
    const k2=skey(editCell.staffId,editCell.date);
    await saveData({...shiftData,[k2]:{...shiftData[k2],...cellForm}});
    setEditCell(null);
  };
  // 打刻連動：対象スタッフの当日退勤打刻が存在するか確認
  const hasClockedOut = (staffId, date) => {
    return attendance.some(a => a.staff_id === staffId && a.date === date && a.clock_out);
  };
  // スタッフ用：タップ不可（打刻連動のみ）。完了状態は退勤打刻で自動判定
  const isComplete = (staffId, date) => {
    return hasClockedOut(staffId, date);
  };
  const countShifts=(staffId)=>{
    const counts={};
    SHIFT_TYPES.filter(s=>s.label).forEach(s=>{counts[s.label]=0;});
    days.forEach(d=>{const c=shiftData[skey(staffId,d)];if(c?.shift)counts[c.shift]=(counts[c.shift]||0)+1;});
    return counts;
  };
  const weekendBg=(dateStr)=>{ const wd=new Date(dateStr).getDay(); return wd===0?"#fef2f2":wd===6?"#eff6ff":""; };

  // シフト1件の実働分数を計算（跨ぎあり）
  const shiftMins=(st,en,brk=0)=>{
    if(!st||!en) return 0;
    const [sh,sm]=st.split(":").map(Number);
    const [eh,em]=en.split(":").map(Number);
    let mins=(eh*60+em)-(sh*60+sm);
    if(mins<=0) mins+=24*60; // 日跨ぎ
    return Math.max(0,mins-brk);
  };
  // スタッフの月次サマリー計算
  const calcStaffSummary=(staffId)=>{
    const staff=staffList.find(s=>s.id===staffId)||{};
    const rate=Number(staff.hourly_rate||0);
    const nightRate=getNightRate(staff);
    let summary={total:0,day:0,night:0,early:0,late:0,training:0,pay:0};
    days.forEach(d=>{
      const c=shiftData[skey(staffId,d)]||{};
      if(!c.shift||["公休","有休","欠勤"].includes(c.shift)) return;
      const st=SHIFT_TYPES.find(t=>t.label===c.shift)||{};
      const brk=c.break_minutes!==undefined?Number(c.break_minutes):(st.break||0);
      const m=shiftMins(c.start||st.start,c.end||st.end,brk);
      summary.total+=m;
      if(c.shift==="日勤") summary.day+=m;
      else if(c.shift==="夜勤") summary.night+=m;
      else if(c.shift==="早番") summary.early+=m;
      else if(c.shift==="遅番") summary.late+=m;
      else if(c.shift==="研修") summary.training+=m;
      summary.pay+=c.shift==="夜勤"?Math.round(nightRate*m/60):Math.round(rate*m/60);
    });
    return summary;
  };
  const fh=(m)=>Math.floor(m/60)+"h"+(m%60?""+m%60+"m":"");

  // CSVダウンロード（内部管理用）
  const downloadCSV=()=>{
    const WDAYL=["日","月","火","水","木","金","土"];
    const header=["日付","曜日",...staffList.map(s=>s.name+" シフト"),...staffList.map(s=>s.name+" 時間"),"配置数"];
    const rows=days.map(d=>{
      const wd=WDAYL[new Date(d.replace(/-/g,"/")).getDay()];
      const shifts=staffList.map(s=>{const c=shiftData[skey(s.id,d)]||{};return c.shift||"";});
      const hours=staffList.map(s=>{
        const c=shiftData[skey(s.id,d)]||{};
        if(!c.shift||["公休","有休","欠勤"].includes(c.shift)) return "";
        const st=SHIFT_TYPES.find(t=>t.label===c.shift)||{};
        const brk=c.break_minutes!==undefined?Number(c.break_minutes):(st.break||0);
        const m=shiftMins(c.start||st.start,c.end||st.end,brk);
        return m?fh(m):"";
      });
      const wc=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      return [d,wd,...shifts,...hours,wc];
    });
    const totals=staffList.map(s=>{const sm=calcStaffSummary(s.id);return fh(sm.total);});
    const pays=staffList.map(s=>{const sm=calcStaffSummary(s.id);return "¥"+sm.pay.toLocaleString();});
    rows.push(["月計","", ...staffList.map(s=>{const ct=countShifts(s.id);return Object.entries(ct).filter(([k,v])=>v>0).map(([k,v])=>k+v+"日").join("/");}), ...totals, ""]);
    rows.push(["給与見込","","", ...pays,""]);
    const csv=[header,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=selMonth+"_シフト表（内部管理）.csv";a.click();
  };

  // 様式4準拠CSV（行政提出用）
  const downloadCSV4=()=>{
    const WDAYL=["日","月","火","水","木","金","土"];
    const rows=[];
    rows.push(["従業者の勤務体制及び勤務形態一覧表（様式4）"]);
    rows.push(["対象期間: "+selMonth.replace("-","年")+"月","","事業所名:",""]);
    rows.push([]);
    const staffHeader=["氏名","職種・資格","雇用形態"];
    days.forEach(d=>{
      const wd=WDAYL[new Date(d.replace(/-/g,"/")).getDay()];
      staffHeader.push(Number(d.slice(8))+"日("+wd+")");
    });
    staffHeader.push("勤務日数","公休日数","総勤務時間","日勤時間","夜勤時間","早番時間","遅番時間");
    rows.push(staffHeader);
    staffList.forEach(s=>{
      const ft=s.full_time==="true"?"常勤":"非常勤";
      const row=[s.name, s.role||"", ft];
      days.forEach(d=>{
        const c=shiftData[skey(s.id,d)]||{};
        if(!c.shift){row.push(""); return;}
        if(["公休","有休"].includes(c.shift)){row.push(c.shift); return;}
        if(c.shift==="欠勤"){row.push("欠"); return;}
        row.push(c.start&&c.end?c.shift+"("+c.start+"〜"+c.end+")":c.shift);
      });
      const sm=calcStaffSummary(s.id);
      const ct=countShifts(s.id);
      const workDays=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      const offDays=(ct["公休"]||0)+(ct["有休"]||0);
      const hm=(m)=>m?Math.floor(m/60)+":"+String(m%60).padStart(2,"0"):"";
      row.push(workDays, offDays, hm(sm.total)||"0:00", hm(sm.day), hm(sm.night), hm(sm.early), hm(sm.late));
      rows.push(row);
    });
    rows.push([]);
    const countRow=["配置数合計","",""];
    days.forEach(d=>{
      const wc=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      countRow.push(wc>0?wc+"名":"");
    });
    rows.push(countRow);
    const csv=rows.map(r=>r.map(v=>'"'+String(v||"").replace(/"/g,'""')+'"').join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=selMonth+"_様式4_勤務体制一覧表.csv";a.click();
  };

  // 様式1準拠 XLSX出力（行政提出用スプレッドシート形式）
  const downloadXLSX1=()=>{
    const WDAYL=["日","月","火","水","木","金","土"];
    const [yr,mo]=selMonth.split("-");
    const wb=XLSX.utils.book_new();
    const ws_data=[];
    // ── ヘッダー ──
    ws_data.push(["（参考様式１）","","","","","従業者の勤務の体制及び勤務形態一覧表（令和"+( Number(yr)-2018)+"年"+Number(mo)+"月分）","","","サービス種類","共同生活援助　介護包括型"]);
    ws_data.push(["","","","","","","","","事業所名","グループホームつながり"]);
    ws_data.push([]);
    // ── 凡例 ──
    ws_data.push(["１．勤務時間凡例"]);
    ws_data.push(["区分","時間帯","時間数","区分","時間帯","時間数"]);
    ws_data.push(["①","09:00〜18:00","7.00","②","22:00〜05:00","7.00"]);
    ws_data.push([]);
    // ── 列ヘッダー ──
    const hRow=["職種","勤務形態","氏名","社会福祉士等","法人常勤","法人勤続3年以上","行動援護従事"];
    days.forEach(d=>{
      const wd=WDAYL[new Date(d.replace(/-/g,"/")).getDay()];
      hRow.push(Number(d.slice(8))+"("+wd+")");
    });
    hRow.push("4週合計","週平均","常勤換算");
    ws_data.push(hRow);

    // ── スタッフ別2行（時間帯・時間数）──
    // 役職グループ順で並べる
    const roleOrder=["管理者","サービス管理責任者","世話人","生活支援員","夜間支援員","その他"];
    const sorted=[...staffList].sort((a,b)=>roleOrder.indexOf(a.role)-roleOrder.indexOf(b.role));
    sorted.forEach(s=>{
      const ft=s.full_time==="true"?"A：常勤専従":"C：非常勤専従";
      // 時間帯行
      const bandRow=[s.role||"",ft,s.name,"","","",""];
      // 時間数行
      const timeRow=["","","","","","",""];
      let totalMins=0;
      days.forEach(d=>{
        const c=shiftData[skey(s.id,d)]||{};
        if(!c.shift||["公休","有休","欠勤",""].includes(c.shift)){
          bandRow.push(c.shift==="公休"||c.shift==="有休"?"休":c.shift==="欠勤"?"欠":"");
          timeRow.push(c.shift==="公休"||c.shift==="有休"||c.shift==="欠勤"?"0":"");
          return;
        }
        const st=SHIFT_TYPES.find(t=>t.label===c.shift)||{};
        // 凡例記号
        const band=c.shift==="日勤"||c.shift==="早番"||c.shift==="遅番"?"①":c.shift==="夜勤"?"②":c.shift;
        const mins=shiftMins(c.start||st.start, c.end||st.end, c.break_minutes!==undefined?Number(c.break_minutes):(st.break||0));
        totalMins+=mins;
        bandRow.push(band);
        timeRow.push(mins>0?(mins/60).toFixed(2):"");
      });
      const weeks=Math.ceil(days.length/7);
      bandRow.push("","","");
      timeRow.push(totalMins>0?(totalMins/60).toFixed(2):"0", totalMins>0?((totalMins/60)/weeks).toFixed(1):"0", totalMins>0?((totalMins/60)/40).toFixed(2):"0");
      ws_data.push(bandRow);
      ws_data.push(timeRow);
      ws_data.push([]); // スタッフ間の空行
    });

    // ── 配置数合計行 ──
    ws_data.push([]);
    const countRow=["配置数","","合計"];
    for(let i=0;i<7;i++) countRow.push("");
    days.forEach(d=>{
      const wc=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      countRow.push(wc>0?wc:"");
    });
    ws_data.push(countRow);

    // ── シート作成 ──
    const ws=XLSX.utils.aoa_to_sheet(ws_data);

    // 列幅設定
    const colWidths=[{wch:14},{wch:12},{wch:10},{wch:8},{wch:6},{wch:8},{wch:8}];
    days.forEach(()=>colWidths.push({wch:5}));
    colWidths.push({wch:7},{wch:7},{wch:8});
    ws["!cols"]=colWidths;

    XLSX.utils.book_append_sheet(wb,ws,yr+"年"+Number(mo)+"月");
    XLSX.writeFile(wb, selMonth+"_様式1_勤務体制一覧表.xlsx");
  };

  // 印刷用HTML
  const printShift=()=>{
    const html=`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>シフト表 ${selMonth}</title>
<style>
  body{font-family:'Noto Sans JP',sans-serif;margin:0;padding:16px;font-size:10px;color:#1e293b;}
  h2{margin:0 0 4px;font-size:16px;} .sub{color:#64748b;font-size:11px;margin-bottom:12px;}
  table{width:100%;border-collapse:collapse;font-size:9px;}
  th{background:#1e3a8a;color:white;padding:4px 3px;text-align:center;white-space:nowrap;}
  td{padding:3px;border:1px solid #e2e8f0;text-align:center;white-space:nowrap;}
  .weekend-sun{background:#fef2f2;} .weekend-sat{background:#eff6ff;}
  .summary{margin-top:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;}
  .summary-card{border:1px solid #e2e8f0;border-radius:6px;padding:8px;}
  .summary-card h4{margin:0 0 4px;font-size:11px;} .summary-card p{margin:2px 0;font-size:10px;color:#475569;}
  @media print{button{display:none;}}
</style></head><body>
<h2>シフト管理表（勤務体制一覧）</h2>
<div class="sub">${selMonth} ／ 様式4準拠</div>
<table>
<thead><tr><th>日</th><th>曜</th>${staffList.map(s=>`<th>${s.name}</th>`).join("")}<th>配置</th></tr></thead>
<tbody>
${days.map(d=>{
  const wd=["日","月","火","水","木","金","土"][new Date(d.replace(/-/g,"/")).getDay()];
  const cls=wd==="日"?" class='weekend-sun'":wd==="土"?" class='weekend-sat'":"";
  const cells=staffList.map(s=>{
    const c=shiftData[skey(s.id,d)]||{};
    if(!c.shift) return "<td></td>";
    const st=SHIFT_TYPES.find(t=>t.label===c.shift)||{};
    return `<td style="background:${st.bg||''};color:${st.color||''};">${c.shift}${c.start&&c.end&&!["公休","有休","欠勤"].includes(c.shift)?"<br><span style='font-size:8px'>"+c.start+"〜"+c.end+"</span>":""}</td>`;
  }).join("");
  const wc=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
  return `<tr${cls}><td>${d.slice(8)}</td><td>${wd}</td>${cells}<td style="font-weight:700;">${wc}名</td></tr>`;
}).join("")}
</tbody>
<tfoot><tr style="background:#f8fafc;font-weight:700;"><td colspan="2">月計</td>${staffList.map(s=>{
  const ct=countShifts(s.id);const sm=calcStaffSummary(s.id);
  return `<td style="font-size:8px;">${Object.entries(ct).filter(([k,v])=>v>0&&k).map(([k,v])=>k+v).join("/")}${sm.total?"<br>"+fh(sm.total):""}${sm.pay?"<br>¥"+sm.pay.toLocaleString():""}</td>`;
}).join("")}<td></td></tr></tfoot>
</table>
<div class="summary">
${staffList.map(s=>{const sm=calcStaffSummary(s.id);const ct=countShifts(s.id);const r=staffList.find(x=>x.id===s.id);
return `<div class="summary-card"><h4>👤 ${s.name}</h4>
<p>総稼働: <b>${fh(sm.total)}</b></p>
${sm.day?`<p>日勤: ${fh(sm.day)}</p>`:""}
${sm.night?`<p>夜勤: ${fh(sm.night)}</p>`:""}
${sm.early?`<p>早番: ${fh(sm.early)}</p>`:""}
${sm.late?`<p>遅番: ${fh(sm.late)}</p>`:""}
<p>給与見込: <b>¥${sm.pay.toLocaleString()}</b>（基本¥${Number(r?.hourly_rate||0).toLocaleString()} / 夜勤¥${getNightRate(r||{}).toLocaleString()}）</p>
</div>`;}).join("")}
</div>
<div style="text-align:center;margin-top:16px;">
<button onclick="window.print()" style="padding:10px 24px;background:#1e3a8a;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;">🖨️ 印刷・PDF保存</button>
<button onclick="window.close()" style="padding:10px 16px;background:#f1f5f9;color:#475569;border:none;border-radius:6px;cursor:pointer;font-size:13px;margin-left:8px;">閉じる</button>
</div></body></html>`;
    const w=window.open("","_blank","width=1000,height=900");
    if(w){w.document.write(html);w.document.close();}
  };

  // 様式4 PDF（行政提出用）
  const printShift4=()=>{
    const WDAYL=["日","月","火","水","木","金","土"];
    const [yr,mo]=selMonth.split("-");
    const dayRows=days.map(d=>{
      const wd=WDAYL[new Date(d.replace(/-/g,"/")).getDay()];
      const isHol=wd==="日"||wd==="土";
      const cells=staffList.map(s=>{
        const c=shiftData[skey(s.id,d)]||{};
        if(!c.shift) return '<td style="border:1px solid #ccc;padding:2px;text-align:center;font-size:8px;'+(isHol?"background:#fafafa;":"")+'">' + '</td>';
        const st=SHIFT_TYPES.find(t=>t.label===c.shift)||{};
        const bg=["公休","有休"].includes(c.shift)?"#f1f5f9":c.shift==="欠勤"?"#fef2f2":(st.bg||"white");
        const col=["公休","有休"].includes(c.shift)?"#64748b":c.shift==="欠勤"?"#ef4444":(st.color||"#1e293b");
        const label=["公休","有休"].includes(c.shift)?c.shift:c.shift==="欠勤"?"欠":(st.short||c.shift);
        const time=c.start&&c.end&&!["公休","有休","欠勤"].includes(c.shift)?'<br><span style="font-size:7px">'+c.start+'〜'+c.end+'</span>':"";
        return '<td style="border:1px solid #ccc;padding:2px;text-align:center;font-size:8px;background:'+bg+';color:'+col+';font-weight:700;">'+label+time+'</td>';
      });
      const wc=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      const dayStyle=wd==="日"?"color:#ef4444;":wd==="土"?"color:#2563eb;":"";
      return '<tr style="'+(isHol?"background:#fafafa":"")+'">'
        +'<td style="border:1px solid #ccc;padding:2px 4px;font-weight:600;text-align:center;font-size:9px;white-space:nowrap;'+dayStyle+'">'+Number(d.slice(8))+'日<br>'+wd+'</td>'
        +cells.join("")
        +'<td style="border:1px solid #ccc;padding:2px;text-align:center;font-weight:700;font-size:9px;color:'+(wc>0?"#059669":"#94a3b8")+'">'+(wc>0?wc+"名":"")+'</td></tr>';
    }).join("");
    const summaryRows=staffList.map(s=>{
      const sm=calcStaffSummary(s.id);
      const ct=countShifts(s.id);
      const workDays=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      const offDays=(ct["公休"]||0)+(ct["有休"]||0);
      const hm=(m)=>m?Math.floor(m/60)+"h"+String(m%60).padStart(2,"0")+"m":"—";
      const rate=Number(s.hourly_rate||0);
      const nrate=getNightRate(s);
      return '<tr>'
        +'<td style="border:1px solid #ccc;padding:3px 6px;font-weight:700;font-size:9px;">'+s.name+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;">'+(s.role||"")+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;">'+(s.full_time==="true"?"常勤":"非常勤")+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;font-weight:700;">'+workDays+'日</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;">'+offDays+'日</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;font-weight:700;color:#0369a1;">'+hm(sm.total)+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;color:#2563eb;">'+hm(sm.day)+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;color:#7c3aed;">'+hm(sm.night)+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;color:#059669;">'+hm(sm.early)+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;color:#d97706;">'+hm(sm.late)+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;">¥'+rate.toLocaleString()+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;color:#7c3aed;">¥'+nrate.toLocaleString()+'</td>'
        +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:9px;font-weight:700;color:#059669;">'+(sm.pay?"¥"+sm.pay.toLocaleString():"—")+'</td></tr>';
    }).join("");
    const totalPay=staffList.reduce((sum,s)=>sum+calcStaffSummary(s.id).pay,0);
    const staffTH=staffList.map(s=>'<th style="min-width:44px;max-width:56px;font-size:8px;background:#1e3a8a;color:white;padding:3px;text-align:center;">'+s.name+'</th>').join("");
    const tfootCells=staffList.map(s=>{
      const sm=calcStaffSummary(s.id);
      const wd=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
      return '<td style="border:1px solid #ccc;padding:2px;text-align:center;font-size:8px;"><b>'+wd+'日</b>'+(sm.total?"<br>"+Math.floor(sm.total/60)+"h":"")+'</td>';
    }).join("");
    const html='<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>様式4 勤務体制一覧表 '+selMonth+'</title>'
      +'<style>body{font-family:\'Noto Sans JP\',sans-serif;margin:0;padding:12px;font-size:9px;color:#1e293b;}'
      +'h2{font-size:14px;margin:0 0 2px;text-align:center;}'
      +'.meta{text-align:center;font-size:10px;color:#475569;margin-bottom:8px;}'
      +'table{border-collapse:collapse;}'
      +'th{background:#1e3a8a;color:white;padding:4px 3px;text-align:center;font-size:9px;white-space:nowrap;}'
      +'.sign-area{display:flex;gap:16px;margin-top:12px;font-size:10px;}'
      +'.sign-box{border:1px solid #ccc;padding:8px 20px;text-align:center;min-width:100px;}'
      +'@media print{button{display:none;}body{padding:6px;}}'
      +'</style></head><body>'
      +'<h2>従業者の勤務体制及び勤務形態一覧表</h2>'
      +'<div class="meta">'+yr+'年'+mo+'月分　／　様式第4号（第3条関係）</div>'
      +'<div style="display:flex;justify-content:space-between;font-size:9px;margin-bottom:6px;">'
      +'<div>事業所名：＿＿＿＿＿＿＿＿＿＿＿＿＿＿</div>'
      +'<div>作成日：　　　年　　月　　日　　確認印：</div></div>'
      +'<div style="overflow-x:auto;"><table style="width:100%;">'
      +'<thead><tr><th style="width:42px;background:#1e3a8a;color:white;padding:4px;">日付</th>'
      +staffTH
      +'<th style="width:32px;background:#1e3a8a;color:white;padding:4px;">配置数</th></tr></thead>'
      +'<tbody>'+dayRows+'</tbody>'
      +'<tfoot><tr style="background:#f0f9ff;">'
      +'<td style="border:1px solid #ccc;padding:3px 4px;font-weight:700;font-size:9px;text-align:center;">月計</td>'
      +tfootCells
      +'<td style="border:1px solid #ccc;"></td></tr></tfoot>'
      +'</table></div>'
      +'<table style="width:100%;margin-top:14px;">'
      +'<thead><tr><th>氏名</th><th>職種</th><th>雇用形態</th><th>勤務日数</th><th>公休日数</th>'
      +'<th>総勤務時間</th><th>日勤</th><th>夜勤</th><th>早番</th><th>遅番</th>'
      +'<th>基本時給</th><th>夜勤時給</th><th>給与見込</th></tr></thead>'
      +'<tbody>'+summaryRows+'</tbody>'
      +'<tfoot><tr style="background:#f0fdf4;font-weight:700;">'
      +'<td colspan="12" style="border:1px solid #ccc;padding:3px 6px;text-align:right;font-size:9px;">合計給与見込</td>'
      +'<td style="border:1px solid #ccc;padding:3px;text-align:center;font-size:10px;color:#059669;">¥'+totalPay.toLocaleString()+'</td>'
      +'</tr></tfoot></table>'
      +'<div class="sign-area">'
      +'<div class="sign-box">管理者確認印</div>'
      +'<div class="sign-box">サービス管理責任者</div>'
      +'<div class="sign-box">提出日：　　年　月　日</div>'
      +'</div>'
      +'<div style="text-align:center;margin-top:12px;">'
      +'<button onclick="window.print()" style="padding:10px 28px;background:#1e3a8a;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer;margin-right:8px;">🖨️ 印刷・PDF保存</button>'
      +'<button onclick="window.close()" style="padding:10px 16px;background:#f1f5f9;color:#475569;border:none;border-radius:6px;cursor:pointer;font-size:13px;">閉じる</button>'
      +'</div></body></html>';
    const w=window.open("","_blank","width=1100,height=900");
    if(w){w.document.write(html);w.document.close();}
  };

  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;
  return(
    <div className="fade-in">
      <PH title="シフト管理表（勤務体制一覧）" sub="様式4準拠 — 従業者の勤務体制及び勤務形態一覧表"/>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
        <input className="input" type="month" style={{maxWidth:160}} value={selMonth} onChange={e=>setSelMonth(e.target.value)}/>
        <div style={{display:"flex",gap:6}}>
          <button className="btn btn-sm" style={{background:viewMode==="table"?"#2563eb":"#f1f5f9",color:viewMode==="table"?"white":"#475569",border:"none"}} onClick={()=>setViewMode("table")}>📊 表形式</button>
          <button className="btn btn-sm" style={{background:viewMode==="list"?"#2563eb":"#f1f5f9",color:viewMode==="list"?"white":"#475569",border:"none"}} onClick={()=>setViewMode("list")}>📋 スタッフ別</button>
          <button className="btn btn-sm" style={{background:viewMode==="summary"?"#2563eb":"#f1f5f9",color:viewMode==="summary"?"white":"#475569",border:"none"}} onClick={()=>setViewMode("summary")}>💰 給与集計</button>
        </div>
        {isAdmin&&<div style={{display:"flex",gap:6,marginLeft:"auto",flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"center"}}>
            <div style={{fontSize:9,color:"#94a3b8"}}>内部管理</div>
            <div style={{display:"flex",gap:4}}>
              <button className="btn btn-secondary btn-sm" onClick={downloadCSV}><Icon name="download" size={13}/>CSV</button>
              <button className="btn btn-secondary btn-sm" onClick={printShift}>🖨️ 印刷</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"center"}}>
            <div style={{fontSize:9,color:"#1d4ed8",fontWeight:700}}>🏛 行政提出（様式1/4）</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              <button className="btn btn-sm" style={{background:"#1d4ed8",color:"white",fontSize:12,padding:"4px 10px"}} onClick={downloadXLSX1} title="参考様式1準拠のExcelファイル"><Icon name="download" size={13}/>様式1 XLSX</button>
              <button className="btn btn-sm" style={{background:"#0e7490",color:"white",fontSize:12,padding:"4px 10px"}} onClick={downloadCSV4} title="CSV形式（様式4）"><Icon name="download" size={13}/>CSV</button>
              <button className="btn btn-sm" style={{background:"#1d4ed8",color:"white",fontSize:12,padding:"4px 10px"}} onClick={printShift4}>🖨️ PDF</button>
            </div>
          </div>
        </div>}
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {SHIFT_TYPES.filter(s=>s.label).map(s=>(
          <span key={s.label} style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:s.bg,color:s.color,fontWeight:700,border:"1px solid "+s.color+"33"}}>{s.short} {s.label}</span>
        ))}
        <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:"#f0fdf4",color:"#059669",border:"1px solid #059669"}}>✓ 退勤打刻済</span>
      </div>
      {viewMode==="table"&&(
        <div style={{overflowX:"auto",overflowY:"auto",maxHeight:"calc(100vh - 260px)"}}>
          <table style={{borderCollapse:"collapse",fontSize:11,tableLayout:"fixed"}}>
            <thead>
              <tr style={{background:"#1e3a8a",color:"white"}}>
                <th style={{padding:"8px 6px",textAlign:"left",width:58,position:"sticky",left:0,top:0,background:"#1e3a8a",zIndex:20}}>日付</th>
                <th style={{padding:"8px 4px",width:28,position:"sticky",left:58,top:0,background:"#1e3a8a",zIndex:20}}>曜</th>
                {staffList.map(s=>(
                  <th key={s.id} style={{padding:"6px 2px",textAlign:"center",width:52,position:"sticky",top:0,background:"#1e3a8a",zIndex:10}}>
                    <div style={{fontSize:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</div>
                    <div style={{fontSize:9,opacity:.7}}>{(s.role||"").slice(0,4)}</div>
                  </th>
                ))}
                <th style={{padding:"8px 4px",width:50,textAlign:"center",position:"sticky",right:0,top:0,background:"#1e3a8a",zIndex:20}}>配置数</th>
              </tr>
            </thead>
            <tbody>
              {days.map(d=>{
                const wd=new Date(d).getDay();
                const bg=weekendBg(d);
                const workCount=staffList.filter(s=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
                return(
                  <tr key={d} style={{background:bg||"white",borderBottom:"1px solid #e2e8f0"}}>
                    <td style={{padding:"3px 6px",fontWeight:600,fontSize:11,position:"sticky",left:0,background:bg||"white",zIndex:5}}>{d.slice(5)}</td>
                    <td style={{padding:"3px 2px",textAlign:"center",color:wd===0?"#ef4444":wd===6?"#2563eb":"#475569",fontWeight:600,fontSize:11,position:"sticky",left:58,background:bg||"white",zIndex:5}}>{WDAYS[wd]}</td>
                    {staffList.map(s=>{
                      const c=shiftData[skey(s.id,d)]||{};
                      const st=SHIFT_TYPES.find(t=>t.label===c.shift)||SHIFT_TYPES[8];
                      return(
                        <td key={s.id} style={{padding:"2px",textAlign:"center"}}>
                          {(()=>{const done=isComplete(s.id,d);return(
                          <div onClick={()=>isAdmin?openEdit(s.id,d):undefined}
                            style={{display:"inline-flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:46,minHeight:34,borderRadius:6,cursor:isAdmin?"pointer":"default",background:done?"#f0fdf4":st.bg,border:"1px solid "+(done?"#059669":st.color||"#e2e8f0"),position:"relative"}}
                            title={c.shift?(c.start&&c.end?c.shift+" "+c.start+"〜"+c.end:c.shift)+(done?" ✓退勤済":""):""}>
                            {c.shift?(
                              <>
                                <span style={{fontSize:12,fontWeight:700,color:done?"#059669":st.color,lineHeight:1}}>{st.short}</span>
                                {c.start&&c.end&&!["公休","有休","欠勤"].includes(c.shift)&&<span style={{fontSize:8,color:"#64748b"}}>{c.start}</span>}
                                {done&&<span style={{position:"absolute",top:1,right:2,fontSize:9,color:"#059669"}}>✓</span>}
                              </>
                            ):(isAdmin&&<span style={{fontSize:16,color:"#e2e8f0"}}>+</span>)}
                          </div>);})()}
                        </td>
                      );
                    })}
                    <td style={{textAlign:"center",fontWeight:700,fontSize:12,color:workCount>0?"#059669":"#94a3b8",position:"sticky",right:0,background:bg||"white",zIndex:5}}>{workCount}名</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{background:"#f8fafc",borderTop:"2px solid #e2e8f0"}}>
                <td colSpan={2} style={{padding:"6px",fontWeight:700,fontSize:11,position:"sticky",left:0,background:"#f8fafc",zIndex:5}}>月計</td>
                {staffList.map(s=>{
                  const counts=countShifts(s.id);
                  const sm=calcStaffSummary(s.id);
                  const workDays=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
                  return(
                    <td key={s.id} style={{textAlign:"center",padding:"4px 2px",verticalAlign:"top"}}>
                      <div style={{fontWeight:700,fontSize:11,color:"#2563eb"}}>{workDays}日</div>
                      <div style={{fontSize:9,color:"#94a3b8"}}>休{(counts["公休"]||0)+(counts["有休"]||0)}日</div>
                      {sm.total>0&&<div style={{fontSize:9,color:"#0369a1",marginTop:1}}>⏱{fh(sm.total)}</div>}
                      {sm.pay>0&&<div style={{fontSize:9,color:"#059669",fontWeight:700}}>¥{sm.pay.toLocaleString()}</div>}
                    </td>
                  );
                })}
                <td style={{position:"sticky",right:0,background:"#f8fafc"}}/>
              </tr>
              {isAdmin&&<tr style={{background:"#eff6ff",borderTop:"1px solid #bfdbfe"}}>
                <td colSpan={2} style={{padding:"6px",fontWeight:700,fontSize:10,color:"#1d4ed8",position:"sticky",left:0,background:"#eff6ff",zIndex:5}}>区分別</td>
                {staffList.map(s=>{
                  const sm=calcStaffSummary(s.id);
                  return(
                    <td key={s.id} style={{textAlign:"center",padding:"3px 2px",fontSize:8,color:"#475569",verticalAlign:"top"}}>
                      {sm.day>0&&<div style={{color:"#2563eb"}}>日{fh(sm.day)}</div>}
                      {sm.night>0&&<div style={{color:"#7c3aed"}}>夜{fh(sm.night)}</div>}
                      {sm.early>0&&<div style={{color:"#059669"}}>早{fh(sm.early)}</div>}
                      {sm.late>0&&<div style={{color:"#d97706"}}>遅{fh(sm.late)}</div>}
                    </td>
                  );
                })}
                <td style={{position:"sticky",right:0,background:"#eff6ff"}}/>
              </tr>}
            </tfoot>
          </table>
        </div>
      )}
      {viewMode==="list"&&(
        <div style={{display:"grid",gap:12}}>
          {staffList.map(s=>{
            const counts=countShifts(s.id);
            const sm=calcStaffSummary(s.id);
            const workDays=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
            return(
              <div key={s.id} className="card">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div><div style={{fontWeight:700,fontSize:14}}>{s.name}</div><div style={{fontSize:12,color:"#94a3b8"}}>{s.role}</div></div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontWeight:700,fontSize:16,color:"#2563eb"}}>{workDays}日</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>勤務予定</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:10}}>
                  {days.map(d=>{
                    const c=shiftData[skey(s.id,d)]||{};
                    const st=SHIFT_TYPES.find(t=>t.label===c.shift)||SHIFT_TYPES[8];
                    const done=isComplete(s.id,d);
                    return(
                      <div key={d} onClick={()=>isAdmin?openEdit(s.id,d):undefined}
                        style={{width:26,height:26,borderRadius:4,background:done?"#f0fdf4":st.bg,border:"1px solid "+(done?"#059669":st.color||"#e2e8f0"),display:"flex",alignItems:"center",justifyContent:"center",cursor:isAdmin?"pointer":"default",fontSize:10,fontWeight:700,color:done?"#059669":st.color,position:"relative"}}
                        title={d.slice(5)+(c.shift?" "+c.shift:"")+(done?" ✓退勤済":"")}>
                        {c.shift?st.short:d.slice(8)}
                        {done&&<span style={{position:"absolute",top:-3,right:-3,fontSize:7,background:"#059669",color:"white",borderRadius:"50%",width:9,height:9,display:"flex",alignItems:"center",justifyContent:"center"}}>✓</span>}
                      </div>
                    );
                  })}
                </div>
                {/* シフト区分カウント */}
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                  {SHIFT_TYPES.filter(s2=>s2.label&&counts[s2.label]>0).map(s2=>(
                    <span key={s2.label} style={{fontSize:11,color:s2.color,background:s2.bg,borderRadius:4,padding:"1px 6px"}}>{s2.label} {counts[s2.label]}日</span>
                  ))}
                </div>
                {/* 稼働時間・給与サマリー */}
                {sm.total>0&&<div style={{background:"#f8fafc",borderRadius:8,padding:"8px 12px",display:"flex",gap:16,flexWrap:"wrap",fontSize:12}}>
                  <div><span style={{color:"#64748b"}}>総稼働 </span><span style={{fontWeight:700,color:"#0369a1"}}>{fh(sm.total)}</span></div>
                  {sm.day>0&&<div><span style={{color:"#64748b"}}>日勤 </span><span style={{fontWeight:600,color:"#2563eb"}}>{fh(sm.day)}</span></div>}
                  {sm.night>0&&<div><span style={{color:"#64748b"}}>夜勤 </span><span style={{fontWeight:600,color:"#7c3aed"}}>{fh(sm.night)}</span></div>}
                  {sm.early>0&&<div><span style={{color:"#64748b"}}>早番 </span><span style={{fontWeight:600,color:"#059669"}}>{fh(sm.early)}</span></div>}
                  {sm.late>0&&<div><span style={{color:"#64748b"}}>遅番 </span><span style={{fontWeight:600,color:"#d97706"}}>{fh(sm.late)}</span></div>}
                  {isAdmin&&sm.pay>0&&<div style={{marginLeft:"auto"}}><span style={{color:"#64748b"}}>給与見込 </span><span style={{fontWeight:800,color:"#059669",fontSize:14}}>¥{sm.pay.toLocaleString()}</span></div>}
                </div>}
              </div>
            );
          })}
        </div>
      )}
      {viewMode==="summary"&&isAdmin&&(
        <div>
          <div className="card" style={{marginBottom:14}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>💰 {selMonth} 給与集計サマリー</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
              {[
                {l:"スタッフ数",v:staffList.length+"名",c:"#2563eb"},
                {l:"合計給与見込",v:"¥"+staffList.reduce((sum,s)=>sum+calcStaffSummary(s.id).pay,0).toLocaleString(),c:"#059669"},
                {l:"総稼働時間",v:fh(staffList.reduce((sum,s)=>sum+calcStaffSummary(s.id).total,0)),c:"#0891b2"},
                {l:"日勤計",v:fh(staffList.reduce((sum,s)=>sum+calcStaffSummary(s.id).day,0)),c:"#2563eb"},
                {l:"夜勤計",v:fh(staffList.reduce((sum,s)=>sum+calcStaffSummary(s.id).night,0)),c:"#7c3aed"},
              ].map((k,i)=>(
                <div key={i} className="stat-card" style={{borderLeft:"4px solid "+k.c,textAlign:"center"}}>
                  <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div>
                  <div style={{fontWeight:800,fontSize:16,color:k.c}}>{k.v}</div>
                </div>
              ))}
            </div>
            <table>
              <thead><tr><th>スタッフ</th><th>役職</th><th>勤務日</th><th>総稼働</th><th>日勤</th><th>夜勤</th><th>早番</th><th>遅番</th><th>時給</th><th>夜勤時給</th><th>給与見込</th></tr></thead>
              <tbody>
                {staffList.map(s=>{
                  const sm=calcStaffSummary(s.id);
                  const workDays=days.filter(d=>{const c=shiftData[skey(s.id,d)];return c?.shift&&!["公休","有休","欠勤"].includes(c.shift);}).length;
                  const rate=Number(s.hourly_rate||0);
                  const nightRate=getNightRate(s);
                  return(
                    <tr key={s.id} className="row-hover">
                      <td style={{fontWeight:700}}>{s.name}</td>
                      <td style={{fontSize:12,color:"#64748b"}}>{s.role}</td>
                      <td className="mono" style={{textAlign:"center"}}>{workDays}日</td>
                      <td className="mono" style={{fontWeight:700,color:"#0369a1"}}>{sm.total?fh(sm.total):"-"}</td>
                      <td className="mono" style={{color:"#2563eb"}}>{sm.day?fh(sm.day):"-"}</td>
                      <td className="mono" style={{color:"#7c3aed"}}>{sm.night?fh(sm.night):"-"}</td>
                      <td className="mono" style={{color:"#059669"}}>{sm.early?fh(sm.early):"-"}</td>
                      <td className="mono" style={{color:"#d97706"}}>{sm.late?fh(sm.late):"-"}</td>
                      <td className="mono" style={{fontSize:12}}>¥{rate.toLocaleString()}</td>
                      <td className="mono" style={{fontSize:12,color:"#7c3aed"}}>¥{nightRate.toLocaleString()}</td>
                      <td className="mono" style={{fontWeight:800,color:"#059669",fontSize:14}}>¥{sm.pay.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot><tr style={{background:"#f0fdf4",fontWeight:700}}>
                <td colSpan={3}>合計</td>
                <td className="mono" style={{color:"#0369a1"}}>{fh(staffList.reduce((s,x)=>s+calcStaffSummary(x.id).total,0))}</td>
                <td className="mono" style={{color:"#2563eb"}}>{fh(staffList.reduce((s,x)=>s+calcStaffSummary(x.id).day,0))}</td>
                <td className="mono" style={{color:"#7c3aed"}}>{fh(staffList.reduce((s,x)=>s+calcStaffSummary(x.id).night,0))}</td>
                <td className="mono" style={{color:"#059669"}}>{fh(staffList.reduce((s,x)=>s+calcStaffSummary(x.id).early,0))}</td>
                <td className="mono" style={{color:"#d97706"}}>{fh(staffList.reduce((s,x)=>s+calcStaffSummary(x.id).late,0))}</td>
                <td colSpan={2}/>
                <td className="mono" style={{color:"#059669",fontSize:15}}>¥{staffList.reduce((s,x)=>s+calcStaffSummary(x.id).pay,0).toLocaleString()}</td>
              </tr></tfoot>
            </table>
          </div>
        </div>
      )}
      {editCell&&isAdmin&&(
        <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.6)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"white",borderRadius:16,padding:24,width:"100%",maxWidth:360,boxShadow:"0 20px 60px rgba(0,0,0,.3)"}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>シフト編集</div>
            <div style={{fontSize:12,color:"#94a3b8",marginBottom:14}}>{staffList.find(s=>s.id===editCell.staffId)?.name} — {editCell.date}</div>
            <div style={{display:"grid",gap:10}}>
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:6}}>シフト区分</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                  {SHIFT_TYPES.filter(s=>s.label).map(s=>(
                    <button key={s.label} onClick={()=>{const def=SHIFT_TYPES.find(t=>t.label===s.label)||{};setCellForm(f=>({...f,shift:s.label,start:def.start||f.start,end:def.end||f.end,break_minutes:def.break!==undefined?def.break:f.break_minutes}));}}
                      style={{padding:"8px 2px",borderRadius:8,border:"2px solid "+(cellForm.shift===s.label?s.color:"#e2e8f0"),background:cellForm.shift===s.label?s.bg:"white",color:s.color,fontWeight:700,fontSize:11,cursor:"pointer"}}>
                      {s.short}<br/><span style={{fontSize:9,fontWeight:400}}>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              {cellForm.shift&&!["公休","有休","欠勤"].includes(cellForm.shift)&&(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>開始</label><input className="input" type="time" value={cellForm.start||""} onChange={e=>setCellForm(f=>({...f,start:e.target.value}))}/></div>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>終了</label><input className="input" type="time" value={cellForm.end||""} onChange={e=>setCellForm(f=>({...f,end:e.target.value}))}/></div>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>休憩（分）</label><input className="input" type="number" min={0} max={240} value={cellForm.break_minutes!==undefined?cellForm.break_minutes:""} onChange={e=>setCellForm(f=>({...f,break_minutes:e.target.value===""?"":parseInt(e.target.value)||0}))}/></div>
                </div>
              )}
              <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label>
                <input className="input" value={cellForm.note||""} onChange={e=>setCellForm(f=>({...f,note:e.target.value}))} placeholder="特記事項"/>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              <button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:"center"}} onClick={saveCell}>保存</button>
              <button className="btn btn-red btn-sm" onClick={async()=>{const k2=skey(editCell.staffId,editCell.date);const newD={...shiftData};delete newD[k2];await saveData(newD);setEditCell(null);}}>削除</button>
              <button className="btn btn-secondary btn-sm" onClick={()=>setEditCell(null)}>閉じる</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CleaningTab({staffList}) {
  const _tn=new Date();
  const today=_tn.getFullYear()+"-"+String(_tn.getMonth()+1).padStart(2,"0")+"-"+String(_tn.getDate()).padStart(2,"0");
  const [records, setRecords] = useState([]);
  const [locations, setLocations] = useState(["事務所","トイレ（共用）","浴室","廊下・階段","台所・食堂","各居室","玄関","駐車場・外周"]);
  const [loaded, setLoaded] = useState(false);
  const [selDate, setSelDate] = useState(today);
  const [selShift, setSelShift] = useState("日勤");
  const [viewMode, setViewMode] = useState("input");
  const [histMonth, setHistMonth] = useState(today.slice(0,7));
  const [showLocMgr, setShowLocMgr] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [editLocIdx, setEditLocIdx] = useState(null);
  const [editLocVal, setEditLocVal] = useState("");

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","cleaning_records").single().then(({data})=>{
      if(data?.value){try{setRecords(JSON.parse(data.value));}catch(e){setRecords([]);}}
      else setRecords([]);
    });
    supabase.from("app_settings").select("value").eq("key","cleaning_locations").single().then(({data})=>{
      if(data?.value){try{setLocations(JSON.parse(data.value));}catch(e){}}
      setLoaded(true);
    });
  },[]);

  const saveRecords = async(newR) => {
    setRecords(newR);
    await supabase.from("app_settings").upsert({key:"cleaning_records",value:JSON.stringify(newR)},{onConflict:"key"});
  };
  const saveLocations = async(locs) => {
    setLocations(locs);
    await supabase.from("app_settings").upsert({key:"cleaning_locations",value:JSON.stringify(locs)},{onConflict:"key"});
  };

  // record構造: {date, shift, staff, note, checks:{loc:bool}, allDone:bool}
  const getRecord = (date, shift) => records.find(r=>r.date===date&&r.shift===shift)||{date,shift,staff:"",note:"",checks:{},allDone:false};

  const updateField = (date, shift, field, value) => {
    const existing = records.find(r=>r.date===date&&r.shift===shift);
    let newR;
    if(existing) newR = records.map(r=>r.date===date&&r.shift===shift?{...r,[field]:value}:r);
    else newR = [...records,{date,shift,staff:"",note:"",checks:{},allDone:false,[field]:value}];
    saveRecords(newR);
  };

  const toggleCheck = (date, shift, loc) => {
    const rec = getRecord(date, shift);
    const newChecks = {...(rec.checks||{}), [loc]: !(rec.checks||{})[loc]};
    const allDone = locations.every(l=>newChecks[l]);
    const existing = records.find(r=>r.date===date&&r.shift===shift);
    let newR;
    if(existing) newR = records.map(r=>r.date===date&&r.shift===shift?{...r,checks:newChecks,allDone}:r);
    else newR = [...records,{date,shift,staff:"",note:"",checks:newChecks,allDone}];
    saveRecords(newR);
  };

  const addLocation = () => {
    if(!newLocName.trim()) return;
    saveLocations([...locations, newLocName.trim()]);
    setNewLocName("");
  };
  const deleteLocation = (idx) => {
    if(!window.confirm(locations[idx]+"を削除しますか？")) return;
    saveLocations(locations.filter((_,i)=>i!==idx));
  };
  const saveEditLoc = (idx) => {
    if(!editLocVal.trim()) return;
    const updated = locations.map((l,i)=>i===idx?editLocVal.trim():l);
    saveLocations(updated); setEditLocIdx(null); setEditLocVal("");
  };

  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;

  const SHIFTS = [{key:"日勤",color:"#2563eb"},{key:"夜勤",color:"#7c3aed"}];
  const histRecords = records.filter(r=>r.date?.startsWith(histMonth)).sort((a,b)=>b.date.localeCompare(a.date)||a.shift.localeCompare(b.shift));

  const rec = getRecord(selDate, selShift);
  const checkedCount = locations.filter(l=>(rec.checks||{})[l]).length;
  const shiftColor = selShift==="夜勤"?"#7c3aed":"#2563eb";

  return(
    <div className="fade-in">
      <PH title="掃除当番表" sub="担当・箇所別チェックリスト" extra={
        <button className="btn btn-secondary btn-sm" onClick={()=>setShowLocMgr(v=>!v)}>
          {showLocMgr?"✕ 閉じる":"⚙️ 清掃箇所管理"}
        </button>
      }/>

      {/* ── 清掃箇所マスター管理 ── */}
      {showLocMgr&&(
        <div className="card" style={{marginBottom:14,background:"#f0f9ff",border:"1px solid #bae6fd"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>⚙️ 清掃箇所の管理</div>
          <div style={{display:"grid",gap:6,marginBottom:10}}>
            {locations.map((loc,idx)=>(
              <div key={idx} style={{display:"flex",gap:6,alignItems:"center"}}>
                {editLocIdx===idx?(
                  <>
                    <input className="input" value={editLocVal} onChange={e=>setEditLocVal(e.target.value)} style={{flex:1,fontSize:13}} onKeyDown={e=>e.key==="Enter"&&saveEditLoc(idx)}/>
                    <button className="btn btn-primary btn-sm" onClick={()=>saveEditLoc(idx)}>保存</button>
                    <button className="btn btn-secondary btn-sm" onClick={()=>setEditLocIdx(null)}>✕</button>
                  </>
                ):(
                  <>
                    <div style={{flex:1,fontSize:13,padding:"6px 10px",background:"white",border:"1px solid #e2e8f0",borderRadius:8}}>
                      <span style={{fontSize:11,color:"#94a3b8",marginRight:6}}>{idx+1}.</span>{loc}
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={()=>{setEditLocIdx(idx);setEditLocVal(loc);}}>✏️</button>
                    <button className="btn btn-red btn-sm" onClick={()=>deleteLocation(idx)}>🗑</button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:6}}>
            <input className="input" value={newLocName} onChange={e=>setNewLocName(e.target.value)} placeholder="新しい清掃箇所を入力" style={{flex:1}} onKeyDown={e=>e.key==="Enter"&&addLocation()}/>
            <button className="btn btn-primary" onClick={addLocation}>追加</button>
          </div>
        </div>
      )}

      {/* タブ切り替え */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["input","history"].map(m=>(
          <button key={m} className="btn btn-sm" style={{background:viewMode===m?"#2563eb":"#f1f5f9",color:viewMode===m?"white":"#475569",border:"none"}} onClick={()=>setViewMode(m)}>
            {m==="input"?"📝 入力":"📋 履歴"}
          </button>
        ))}
      </div>

      {/* ── 入力モード ── */}
      {viewMode==="input"&&(
        <>
          {/* 日付・シフト選択 */}
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
            <input className="input" type="date" style={{maxWidth:180}} value={selDate} onChange={e=>setSelDate(e.target.value)}/>
            <div style={{display:"flex",gap:6}}>
              {SHIFTS.map(s=>(
                <button key={s.key} className="btn btn-sm" style={{background:selShift===s.key?s.color:"#f1f5f9",color:selShift===s.key?"white":s.color,border:"1px solid "+(selShift===s.key?s.color:"#e2e8f0"),fontWeight:700}} onClick={()=>setSelShift(s.key)}>
                  {s.key==="日勤"?"☀️":"🌙"} {s.key}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{borderLeft:`4px solid ${shiftColor}`}}>
            <div style={{fontWeight:700,fontSize:14,color:shiftColor,marginBottom:12}}>
              {selShift==="日勤"?"☀️":"🌙"} {selShift}　{selDate}
            </div>

            {/* 担当者・備考 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当者</label>
                <select className="input" value={rec.staff||""} onChange={e=>updateField(selDate,selShift,"staff",e.target.value)}>
                  <option value="">選択...</option>
                  {staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label>
                <input className="input" value={rec.note||""} onChange={e=>updateField(selDate,selShift,"note",e.target.value)} placeholder="特記事項があれば"/>
              </div>
            </div>

            {/* 清掃箇所チェックリスト */}
            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <label style={{fontSize:12,color:"#64748b",fontWeight:600}}>清掃箇所チェック</label>
                <span style={{fontSize:12,fontWeight:700,color:checkedCount===locations.length&&locations.length>0?"#059669":"#64748b"}}>
                  {checkedCount} / {locations.length} 完了
                </span>
              </div>
              {/* 進捗バー */}
              <div style={{height:6,background:"#f1f5f9",borderRadius:3,marginBottom:10}}>
                <div style={{height:"100%",width:locations.length>0?(checkedCount/locations.length*100)+"%":"0%",background:checkedCount===locations.length&&locations.length>0?"#059669":shiftColor,borderRadius:3,transition:"width .3s"}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:6}}>
                {locations.map(loc=>{
                  const done = !!(rec.checks||{})[loc];
                  return(
                    <label key={loc} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:done?"#f0fdf4":"#f8fafc",border:"1px solid "+(done?"#bbf7d0":"#e2e8f0"),borderRadius:8,cursor:"pointer",transition:"all .15s"}}>
                      <input type="checkbox" checked={done} onChange={()=>toggleCheck(selDate,selShift,loc)} style={{width:15,height:15,accentColor:shiftColor}}/>
                      <span style={{fontSize:12,fontWeight:600,color:done?"#059669":"#475569",textDecoration:done?"line-through":"none"}}>{loc}</span>
                    </label>
                  );
                })}
              </div>
              {locations.length===0&&<div style={{textAlign:"center",padding:"16px",color:"#94a3b8",fontSize:12}}>清掃箇所が未設定です。「清掃箇所管理」から追加してください。</div>}
            </div>

            {/* 全完了バッジ */}
            {checkedCount===locations.length&&locations.length>0&&(
              <div style={{textAlign:"center",padding:"10px",background:"#f0fdf4",borderRadius:8,border:"1px solid #bbf7d0",color:"#059669",fontWeight:700,fontSize:13}}>
                ✅ 全箇所の清掃完了！
              </div>
            )}
          </div>
        </>
      )}

      {/* ── 履歴モード ── */}
      {viewMode==="history"&&(
        <>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
            <input className="input" type="month" style={{maxWidth:180}} value={histMonth} onChange={e=>setHistMonth(e.target.value)}/>
            <span style={{fontSize:12,color:"#94a3b8"}}>{histRecords.length}件</span>
          </div>
          {histRecords.length===0
            ?<div className="card" style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>この月の記録はありません</div>
            :<div style={{display:"grid",gap:8}}>
              {histRecords.map((r,i)=>{
                const cnt = Object.values(r.checks||{}).filter(Boolean).length;
                const tot = locations.length;
                const sc = r.shift==="夜勤"?"#7c3aed":"#2563eb";
                return(
                  <div key={i} className="card" style={{borderLeft:`3px solid ${sc}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                        <span style={{fontWeight:700,fontSize:13}}>{r.date}</span>
                        <span style={{fontSize:12,fontWeight:700,color:sc,padding:"2px 8px",background:sc+"15",borderRadius:6}}>{r.shift==="夜勤"?"🌙":"☀️"} {r.shift}</span>
                        {r.staff&&<span style={{fontSize:12,color:"#475569"}}>👤 {r.staff}</span>}
                      </div>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        <span style={{fontSize:12,color:cnt===tot&&tot>0?"#059669":"#64748b",fontWeight:600}}>{cnt}/{tot}箇所</span>
                        {cnt===tot&&tot>0?<span style={{fontSize:12,color:"#059669",fontWeight:700}}>✅ 完了</span>:<span style={{fontSize:12,color:"#d97706"}}>⏳ 途中</span>}
                      </div>
                    </div>
                    {Object.keys(r.checks||{}).length>0&&(
                      <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:4}}>
                        {locations.map(loc=>(
                          <span key={loc} style={{fontSize:10,padding:"2px 7px",borderRadius:6,background:(r.checks||{})[loc]?"#f0fdf4":"#fef2f2",color:(r.checks||{})[loc]?"#059669":"#ef4444",border:"1px solid "+(r.checks||{})[loc]?"#bbf7d0":"#fecaca"}}>
                            {(r.checks||{})[loc]?"✓":"✗"} {loc}
                          </span>
                        ))}
                      </div>
                    )}
                    {r.note&&<div style={{fontSize:11,color:"#64748b",marginTop:4}}>📝 {r.note}</div>}
                  </div>
                );
              })}
            </div>
          }
        </>
      )}
    </div>
  );
}

function SuppliesTab() {
  const [items,setItems]=useState([]);
  const [loaded,setLoaded]=useState(false);
  const [newItem,setNewItem]=useState({name:"",stock:0,min_stock:0,unit:"個",note:""});
  const [adding,setAdding]=useState(false);
  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","supplies_list").single().then(({data})=>{
      if(data?.value){try{setItems(JSON.parse(data.value));}catch(e){setItems([]);}}
      else setItems([]);
      setLoaded(true);
    });
  },[]);
  const saveItems=async(newItems)=>{
    setItems(newItems);
    await supabase.from("app_settings").upsert({key:"supplies_list",value:JSON.stringify(newItems)},{onConflict:"key"});
  };
  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;
  const low=items.filter(i=>Number(i.stock)<=Number(i.min_stock)&&Number(i.min_stock)>0);
  return(
    <div className="fade-in">
      <PH title="備品管理表" sub="在庫が最低枚数以下になると赤く表示されます"
        onAdd={()=>setAdding(true)} addLabel="備品追加"/>
      {low.length>0&&<div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:"10px 14px",marginBottom:12,color:"#dc2626",fontSize:13,fontWeight:600}}>
        ⚠️ 発注が必要な備品: {low.map(i=>i.name).join("、")}
      </div>}
      {adding&&(
        <div className="card" style={{marginBottom:12,background:"#f0f9ff",border:"1px solid #bae6fd"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>備品追加</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>品名</label><input className="input" value={newItem.name} onChange={e=>setNewItem(v=>({...v,name:e.target.value}))} placeholder="例：マスク"/></div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>単位</label><input className="input" value={newItem.unit} onChange={e=>setNewItem(v=>({...v,unit:e.target.value}))} placeholder="個・箱・枚"/></div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>現在庫数</label><input className="input" type="number" value={newItem.stock} onChange={e=>setNewItem(v=>({...v,stock:e.target.value}))}/></div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>最低枚数（発注ライン）</label><input className="input" type="number" value={newItem.min_stock} onChange={e=>setNewItem(v=>({...v,min_stock:e.target.value}))}/></div>
          </div>
          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label><input className="input" value={newItem.note} onChange={e=>setNewItem(v=>({...v,note:e.target.value}))}/></div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button className="btn btn-primary btn-sm" onClick={()=>{
              if(!newItem.name.trim()){alert("品名を入力してください");return;}
              saveItems([...items,{...newItem,id:Date.now()}]);
              setNewItem({name:"",stock:0,min_stock:0,unit:"個",note:""});
              setAdding(false);
            }}>追加</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>setAdding(false)}>キャンセル</button>
          </div>
        </div>
      )}
      <div className="card" style={{overflowX:"auto"}}>
        {items.length===0?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>備品が登録されていません</div>:(
          <table>
            <thead><tr>
              <th>品名</th><th>現在庫</th><th>最低枚数</th><th>単位</th><th>備考</th><th></th>
            </tr></thead>
            <tbody>
              {items.map((item,idx)=>{
                const isLow=Number(item.min_stock)>0&&Number(item.stock)<=Number(item.min_stock);
                return(
                  <tr key={item.id||idx} style={{background:isLow?"#fef2f2":""}}>
                    <td style={{fontWeight:600,color:isLow?"#dc2626":"#0f172a"}}>{item.name}{isLow&&<span style={{marginLeft:6,fontSize:11,background:"#dc2626",color:"white",borderRadius:4,padding:"1px 5px"}}>要発注</span>}</td>
                    <td style={{textAlign:"center"}}>
                      <input type="number" style={{width:60,border:"1px solid #e2e8f0",borderRadius:6,padding:"3px 6px",fontSize:13,textAlign:"center",color:isLow?"#dc2626":"#0f172a",fontWeight:isLow?700:400}} value={item.stock} onChange={e=>{
                        const ni=[...items];ni[idx]={...item,stock:e.target.value};saveItems(ni);
                      }}/>
                    </td>
                    <td style={{textAlign:"center"}}>
                      <input type="number" style={{width:60,border:"1px solid #e2e8f0",borderRadius:6,padding:"3px 6px",fontSize:13,textAlign:"center"}} value={item.min_stock} onChange={e=>{
                        const ni=[...items];ni[idx]={...item,min_stock:e.target.value};saveItems(ni);
                      }}/>
                    </td>
                    <td style={{textAlign:"center",color:"#64748b"}}>{item.unit}</td>
                    <td style={{color:"#64748b",fontSize:12}}>{item.note}</td>
                    <td><button className="btn btn-red btn-sm" onClick={()=>{if(window.confirm("本当に削除しますか？この操作は元に戻せません"))saveItems(items.filter((_,j)=>j!==idx));}}>削除</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


// ─── 管理者：立替払い管理 ───────────────────────────────
function ExpenseAdminTab({expenses, staffList, loadAll, csv}) {
  const CATS = ["利用者の日用品・生活用品","送迎・交通費","食材・食事関連","医療・薬代","業務用品・事務用品","研修・書籍","その他"];
  const [filterMonth, setFilterMonth] = useState(localDate().slice(0,7));
  const [filterStaff, setFilterStaff] = useState("全員");
  const [filterStatus, setFilterStatus] = useState("全て");
  const [previewUrl, setPreviewUrl] = useState(null);

  const filtered = expenses.filter(e=>{
    if(filterMonth && !e.date?.startsWith(filterMonth)) return false;
    if(filterStaff!=="全員" && e.staff_name!==filterStaff) return false;
    if(filterStatus!=="全て" && (e.status||"申請中")!==filterStatus) return false;
    return true;
  });

  const totalAmt = filtered.reduce((s,e)=>s+Number(e.amount||0),0);
  const pendingAmt = filtered.filter(e=>e.status==="申請中").reduce((s,e)=>s+Number(e.amount||0),0);
  const paidAmt = filtered.filter(e=>e.status==="精算済").reduce((s,e)=>s+Number(e.amount||0),0);

  const updateStatus = async(id, status) => {
    await supabase.from("expense_claims").update({status, approved_at: status==="承認済"||status==="精算済" ? localDate() : null}).eq("id",id);
    loadAll();
  };

  const downloadCSV = () => {
    const rows = [["日付","スタッフ","カテゴリ","内容","金額","領収書","ステータス","承認日","備考","画像URL"]];
    filtered.forEach(e=>rows.push([e.date,e.staff_name,e.category,e.description,e.amount,e.has_receipt?"あり":"なし",e.status||"申請中",e.approved_at||"",e.note||"",e.receipt_url||""]));
    const c=rows.map(r=>r.map(v=>'"'+String(v||"").replace(/"/g,'""')+'"').join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+c],{type:"text/csv;charset=utf-8;"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=filterMonth+"_立替払い一覧.csv";a.click();
  };

  const catTotals = CATS.map(cat=>({cat,amt:filtered.filter(e=>e.category===cat).reduce((s,e)=>s+Number(e.amount||0),0)})).filter(x=>x.amt>0);
  const statusColor = s => s==="精算済"?"#059669":s==="承認済"?"#2563eb":s==="却下"?"#ef4444":"#d97706";
  const statusBg   = s => s==="精算済"?"#f0fdf4":s==="承認済"?"#eff6ff":s==="却下"?"#fef2f2":"#fffbeb";

  return (
    <div className="fade-in">
      {/* 画像プレビューモーダル */}
      {previewUrl&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setPreviewUrl(null)}>
          <div style={{position:"relative",maxWidth:600,width:"100%"}} onClick={e=>e.stopPropagation()}>
            <img src={previewUrl} alt="領収書" style={{width:"100%",borderRadius:12,boxShadow:"0 20px 60px rgba(0,0,0,.5)"}}/>
            <button onClick={()=>setPreviewUrl(null)} style={{position:"absolute",top:-12,right:-12,width:32,height:32,borderRadius:"50%",background:"white",border:"none",fontSize:18,cursor:"pointer",lineHeight:"32px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,.3)"}}>✕</button>
          </div>
        </div>
      )}

      <PH title="立替払い管理" sub={`${filtered.length}件`} extra={
        <button className="btn btn-secondary btn-sm" onClick={downloadCSV}><Icon name="download" size={13}/>CSV</button>
      }/>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
        {[
          {l:"合計金額",v:"¥"+totalAmt.toLocaleString(),c:"#1e293b"},
          {l:"申請中",v:"¥"+pendingAmt.toLocaleString(),c:"#d97706"},
          {l:"精算済",v:"¥"+paidAmt.toLocaleString(),c:"#059669"},
          {l:"件数",v:filtered.length+"件",c:"#2563eb"},
        ].map(k=>(
          <div key={k.l} className="stat-card" style={{textAlign:"center"}}>
            <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div>
            <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
          </div>
        ))}
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
        <input className="input" type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:150}}/>
        <select className="input" value={filterStaff} onChange={e=>setFilterStaff(e.target.value)} style={{width:140}}>
          <option value="全員">全スタッフ</option>
          {staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        {["全て","申請中","承認済","精算済","却下"].map(st=>(
          <button key={st} className="btn btn-sm" style={{background:filterStatus===st?"#2563eb":"#f1f5f9",color:filterStatus===st?"white":"#475569",border:"none",fontSize:12}} onClick={()=>setFilterStatus(st)}>{st}</button>
        ))}
      </div>

      {catTotals.length>0&&(
        <div className="card" style={{marginBottom:14,padding:"10px 14px"}}>
          <div style={{fontWeight:700,fontSize:12,marginBottom:8,color:"#64748b"}}>📊 カテゴリ別合計</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {catTotals.map(x=>(
              <div key={x.cat} style={{fontSize:11,padding:"3px 8px",borderRadius:8,background:"#f1f5f9",color:"#475569"}}>
                {x.cat}：<b>¥{x.amt.toLocaleString()}</b>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{display:"grid",gap:8}}>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"30px",color:"#94a3b8",fontSize:13}}>該当する申請がありません</div>}
        {filtered.map(e=>(
          <div key={e.id} style={{background:statusBg(e.status),border:"1px solid #e2e8f0",borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:14}}>¥{Number(e.amount||0).toLocaleString()}</span>
                  <span className="tag" style={{background:"#f1f5f9",color:"#475569",fontSize:11}}>{e.category}</span>
                  {e.receipt_url
                    ? <button onClick={()=>setPreviewUrl(e.receipt_url)} style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",cursor:"pointer",fontWeight:600}}>🧾 領収書を見る</button>
                    : e.has_receipt&&<span className="tag" style={{background:"#f0fdf4",color:"#059669",fontSize:11}}>🧾 領収書あり</span>
                  }
                  <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:statusBg(e.status),color:statusColor(e.status),border:"1px solid "+statusColor(e.status),fontWeight:700}}>{e.status||"申請中"}</span>
                </div>
                <div style={{fontSize:13,marginBottom:2}}>{e.description}</div>
                <div style={{fontSize:11,color:"#64748b",display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span>👤 {e.staff_name}</span><span>📅 {e.date}</span>
                  {e.approved_at&&<span>✅ 承認: {e.approved_at}</span>}
                  {e.note&&<span>📝 {e.note}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:4,flexShrink:0,flexWrap:"wrap"}}>
                {e.status==="申請中"&&<>
                  <button className="btn btn-sm" style={{background:"#2563eb",color:"white",fontSize:11,padding:"4px 8px"}} onClick={()=>updateStatus(e.id,"承認済")}>承認</button>
                  <button className="btn btn-sm" style={{background:"#ef4444",color:"white",fontSize:11,padding:"4px 8px"}} onClick={()=>updateStatus(e.id,"却下")}>却下</button>
                </>}
                {e.status==="承認済"&&<button className="btn btn-sm" style={{background:"#059669",color:"white",fontSize:11,padding:"4px 8px"}} onClick={()=>updateStatus(e.id,"精算済")}>精算済</button>}
                {(e.status==="精算済"||e.status==="却下")&&<button className="btn btn-secondary btn-sm" style={{fontSize:11,padding:"4px 8px"}} onClick={()=>updateStatus(e.id,"申請中")}>戻す</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── スタッフ：立替申請（レシートAI解析付き） ─────────────
function MyExpenseTab({me, expenses, loadAll}) {
  const CATS = ["利用者の日用品・生活用品","送迎・交通費","食材・食事関連","医療・薬代","業務用品・事務用品","研修・書籍","その他"];
  const today = localDate();
  const [form, setForm] = useState({date:today, category:CATS[0], description:"", amount:"", has_receipt:false, note:"", other_cat:""});
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [filterMonth, setFilterMonth] = useState(today.slice(0,7));

  // レシート関連
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const fileInputRef = useRef(null);

  const myExpenses = expenses.filter(e=>e.staff_id===me?.id);
  const filtered = myExpenses.filter(e=>!filterMonth||e.date?.startsWith(filterMonth));
  const pendingTotal = myExpenses.filter(e=>e.status==="申請中"||e.status==="承認済").reduce((s,e)=>s+Number(e.amount||0),0);
  const paidTotal = myExpenses.filter(e=>e.status==="精算済").reduce((s,e)=>s+Number(e.amount||0),0);

  // 画像選択
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setReceiptFile(file);
    setAiResult(null);
    const reader = new FileReader();
    reader.onload = ev => setReceiptPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Claude APIでレシート解析
  const analyzeReceipt = async() => {
    if(!receiptFile) return;
    setAnalyzing(true);
    setAiResult(null);
    try {
      const base64 = await new Promise((res,rej)=>{
        const r = new FileReader();
        r.onload = ()=>res(r.result.split(",")[1]);
        r.onerror = ()=>rej(new Error("read error"));
        r.readAsDataURL(receiptFile);
      });
      const mediaType = receiptFile.type||"image/jpeg";

      const resp = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{
            role:"user",
            content:[
              {type:"image",source:{type:"base64",media_type:mediaType,data:base64}},
              {type:"text",text:`このレシート・領収書を読み取って、以下のJSON形式のみで返答してください（他のテキスト不要）：
{
  "amount": 合計金額（数値のみ・税込）,
  "date": "購入日（YYYY-MM-DD形式、不明なら空文字）",
  "store": "店名",
  "items": "購入品目の簡潔な説明（30文字以内）",
  "category": 以下から最も適切な1つ: "利用者の日用品・生活用品" or "送迎・交通費" or "食材・食事関連" or "医療・薬代" or "業務用品・事務用品" or "研修・書籍" or "その他",
  "confidence": "high" or "medium" or "low"
}`}
            ]
          }]
        })
      });
      const data = await resp.json();
      const text = data.content?.find(b=>b.type==="text")?.text||"";
      const clean = text.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      setAiResult(parsed);
      // フォームに自動反映
      setForm(f=>({
        ...f,
        amount: parsed.amount>0 ? String(parsed.amount) : f.amount,
        description: parsed.items||f.description,
        category: CATS.includes(parsed.category) ? parsed.category : f.category,
        note: parsed.store ? (f.note||parsed.store) : f.note,
        has_receipt: true,
        date: parsed.date||f.date,
      }));
    } catch(err) {
      setAiResult({error: "読み取りに失敗しました。手動で入力してください。"});
    }
    setAnalyzing(false);
  };

  // Supabase Storageにアップロード
  const uploadReceipt = async(expenseId) => {
    if(!receiptFile) return null;
    const ext = receiptFile.name.split(".").pop()||"jpg";
    const path = `receipts/${me?.id}/${expenseId}_${Date.now()}.${ext}`;
    const {error} = await supabase.storage.from("expense-receipts").upload(path, receiptFile, {upsert:true});
    if(error) return null;
    const {data} = supabase.storage.from("expense-receipts").getPublicUrl(path);
    return data?.publicUrl||null;
  };

  const submit = async() => {
    const cat = form.category==="その他"&&form.other_cat ? "その他："+form.other_cat : form.category;
    if(!form.description){setMsg("内容を入力してください");return;}
    if(!form.amount||isNaN(Number(form.amount))||Number(form.amount)<=0){setMsg("金額を入力してください");return;}
    setSending(true);setMsg("");
    // まず仮insertしてIDを取得
    const {data:inserted, error} = await supabase.from("expense_claims").insert({
      staff_id: me?.id,
      staff_name: me?.name,
      date: form.date,
      category: cat,
      description: form.description,
      amount: Number(form.amount),
      has_receipt: form.has_receipt||!!receiptFile,
      note: form.note,
      status: "申請中",
    }).select().single();
    if(error){setSending(false);setMsg("送信エラー: "+error.message);return;}
    // 画像アップロード
    if(receiptFile&&inserted?.id){
      const url = await uploadReceipt(inserted.id);
      if(url) await supabase.from("expense_claims").update({receipt_url:url}).eq("id",inserted.id);
    }
    setSending(false);
    setMsg("✅ 申請しました");
    setForm({date:today,category:CATS[0],description:"",amount:"",has_receipt:false,note:"",other_cat:""});
    setReceiptFile(null);setReceiptPreview(null);setAiResult(null);
    if(fileInputRef.current) fileInputRef.current.value="";
    loadAll();
  };

  const statusColor = s => s==="精算済"?"#059669":s==="承認済"?"#2563eb":s==="却下"?"#ef4444":"#d97706";
  const statusBg   = s => s==="精算済"?"#f0fdf4":s==="承認済"?"#eff6ff":s==="却下"?"#fef2f2":"#fffbeb";

  return(
    <div className="fade-in">
      <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>立替払い申請</div>
      <div style={{fontSize:13,color:"#94a3b8",marginBottom:14}}>{me?.name} さんの立替申請</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <div className="stat-card" style={{borderTop:"3px solid #d97706",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>精算待ち</div>
          <div style={{fontSize:20,fontWeight:800,color:"#d97706"}}>¥{pendingTotal.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{borderTop:"3px solid #059669",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>精算済（累計）</div>
          <div style={{fontSize:20,fontWeight:800,color:"#059669"}}>¥{paidTotal.toLocaleString()}</div>
        </div>
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>＋ 新規申請</div>

        {/* ── レシートアップロードエリア ── */}
        <div style={{marginBottom:14}}>
          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:6}}>📷 レシート・領収書（任意）</label>
          <div
            style={{border:"2px dashed #bfdbfe",borderRadius:12,padding:"16px",textAlign:"center",background:"#f8fbff",cursor:"pointer",position:"relative"}}
            onClick={()=>fileInputRef.current?.click()}
          >
            {receiptPreview ? (
              <div style={{position:"relative",display:"inline-block"}}>
                <img src={receiptPreview} alt="レシートプレビュー" style={{maxHeight:200,maxWidth:"100%",borderRadius:8,boxShadow:"0 2px 8px rgba(0,0,0,.15)"}}/>
                <button
                  onClick={e=>{e.stopPropagation();setReceiptFile(null);setReceiptPreview(null);setAiResult(null);if(fileInputRef.current)fileInputRef.current.value="";}}
                  style={{position:"absolute",top:-8,right:-8,width:24,height:24,borderRadius:"50%",background:"#ef4444",color:"white",border:"none",cursor:"pointer",fontSize:14,lineHeight:"24px",textAlign:"center"}}
                >✕</button>
              </div>
            ) : (
              <div style={{color:"#94a3b8"}}>
                <div style={{fontSize:32,marginBottom:4}}>📷</div>
                <div style={{fontSize:13,fontWeight:600,color:"#64748b"}}>タップして写真を選択</div>
                <div style={{fontSize:11,marginTop:2}}>JPG / PNG / HEIC 対応</div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handleFileChange}/>
          </div>

          {/* AI解析ボタン */}
          {receiptFile&&!analyzing&&(
            <button
              className="btn btn-primary"
              style={{width:"100%",marginTop:8,background:"linear-gradient(135deg,#7c3aed,#2563eb)"}}
              onClick={analyzeReceipt}
            >
              ✨ AIでレシートを読み取る
            </button>
          )}
          {analyzing&&(
            <div style={{textAlign:"center",padding:"12px",color:"#7c3aed",fontSize:13,fontWeight:600}}>
              <span style={{marginRight:6}}>✨</span>読み取り中...
            </div>
          )}

          {/* AI解析結果バナー */}
          {aiResult&&!aiResult.error&&(
            <div style={{marginTop:10,padding:"12px 14px",background:"linear-gradient(135deg,#f5f3ff,#eff6ff)",borderRadius:10,border:"1px solid #c4b5fd"}}>
              <div style={{fontWeight:700,fontSize:12,color:"#7c3aed",marginBottom:6}}>✨ AI読み取り結果（フォームに反映済み）</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",fontSize:12}}>
                <span>💴 ¥{Number(aiResult.amount||0).toLocaleString()}</span>
                {aiResult.store&&<span>🏪 {aiResult.store}</span>}
                {aiResult.date&&<span>📅 {aiResult.date}</span>}
                <span>📂 {aiResult.category}</span>
                <span style={{fontSize:10,color:"#94a3b8"}}>
                  精度: {aiResult.confidence==="high"?"高":aiResult.confidence==="medium"?"中":"低"}
                </span>
              </div>
              {aiResult.items&&<div style={{fontSize:12,marginTop:4,color:"#475569"}}>📝 {aiResult.items}</div>}
              <div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>内容を確認して必要に応じて修正してください</div>
            </div>
          )}
          {aiResult?.error&&<div style={{marginTop:8,fontSize:12,color:"#ef4444",padding:"8px 12px",background:"#fef2f2",borderRadius:8}}>{aiResult.error}</div>}
        </div>

        {/* フォーム入力欄 */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:10}}>
          <div>
            <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>日付</label>
            <input className="input" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
          </div>
          <div>
            <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>カテゴリ {aiResult&&!aiResult.error&&<span style={{color:"#7c3aed",fontSize:10}}>✨AI提案</span>}</label>
            <select className="input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>金額（円）{aiResult&&!aiResult.error&&<span style={{color:"#7c3aed",fontSize:10}}>✨AI抽出</span>} <span style={{color:"#ef4444"}}>*</span></label>
            <input className="input" type="number" min={1} placeholder="例: 1500" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}/>
          </div>
        </div>
        {form.category==="その他"&&(
          <div style={{marginBottom:10}}>
            <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>その他の内容を入力</label>
            <input className="input" type="text" placeholder="例: クリーニング代" value={form.other_cat} onChange={e=>setForm(f=>({...f,other_cat:e.target.value}))}/>
          </div>
        )}
        <div style={{marginBottom:10}}>
          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>内容・品目 {aiResult&&!aiResult.error&&<span style={{color:"#7c3aed",fontSize:10}}>✨AI抽出</span>} <span style={{color:"#ef4444"}}>*</span></label>
          <input className="input" type="text" placeholder="例: 〇〇さんのシャンプー・ボディソープ購入" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>備考・補足 {aiResult?.store&&<span style={{color:"#7c3aed",fontSize:10}}>✨{aiResult.store}</span>}</label>
          <input className="input" type="text" placeholder="店名、理由など" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
          <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
            <input type="checkbox" checked={form.has_receipt||!!receiptFile} onChange={e=>setForm(f=>({...f,has_receipt:e.target.checked}))} style={{width:16,height:16}}/>
            🧾 領収書あり{receiptFile&&<span style={{color:"#2563eb",fontSize:11,marginLeft:4}}>（画像添付済）</span>}
          </label>
        </div>
        {msg&&<div style={{fontSize:13,color:msg.startsWith("✅")?"#059669":"#ef4444",marginBottom:8}}>{msg}</div>}
        <button className="btn btn-primary" onClick={submit} disabled={sending}>{sending?"送信中...":"申請する"}</button>
      </div>

      {/* 申請履歴 */}
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:700,fontSize:14}}>📋 申請履歴</div>
          <input className="input" type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:150,fontSize:12}}/>
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"20px",color:"#94a3b8",fontSize:13}}>申請がありません</div>}
        <div style={{display:"grid",gap:8}}>
          {filtered.sort((a,b)=>b.date?.localeCompare(a.date)).map(e=>(
            <div key={e.id} style={{background:statusBg(e.status),border:"1px solid #e2e8f0",borderRadius:8,padding:"10px 12px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                    <span style={{fontWeight:700,fontSize:14}}>¥{Number(e.amount||0).toLocaleString()}</span>
                    <span className="tag" style={{background:"#f1f5f9",color:"#475569",fontSize:11}}>{e.category}</span>
                    {e.receipt_url
                      ? <a href={e.receipt_url} target="_blank" rel="noreferrer" style={{fontSize:11,padding:"2px 8px",borderRadius:8,background:"#eff6ff",color:"#2563eb",border:"1px solid #bfdbfe",textDecoration:"none",fontWeight:600}}>🧾 領収書</a>
                      : e.has_receipt&&<span style={{fontSize:11,color:"#059669"}}>🧾</span>
                    }
                  </div>
                  <div style={{fontSize:12,marginBottom:2}}>{e.description}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>📅 {e.date}{e.note&&<span style={{marginLeft:8}}>📝 {e.note}</span>}</div>
                </div>
                <span style={{fontSize:12,padding:"3px 10px",borderRadius:10,background:statusBg(e.status),color:statusColor(e.status),border:"1px solid "+statusColor(e.status),fontWeight:700,flexShrink:0}}>{e.status||"申請中"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  SVG Chart Helpers (standalone, no external deps)
// ═══════════════════════════════════════════════════════
function PieChart({data, size=160, title}) {
  // data: [{label, value, color}]
  const total = data.reduce((s,d)=>s+d.value,0);
  if(total===0) return <div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:12}}>データなし</div>;
  let angle = -Math.PI/2;
  const cx=size/2, cy=size/2, r=size*0.38, ir=size*0.22;
  const slices = data.map(d=>{
    const sweep = (d.value/total)*2*Math.PI;
    const x1=cx+r*Math.cos(angle), y1=cy+r*Math.sin(angle);
    angle+=sweep;
    const x2=cx+r*Math.cos(angle), y2=cy+r*Math.sin(angle);
    const ix1=cx+ir*Math.cos(angle-sweep), iy1=cy+ir*Math.sin(angle-sweep);
    const ix2=cx+ir*Math.cos(angle), iy2=cy+ir*Math.sin(angle);
    const large=sweep>Math.PI?1:0;
    const path=`M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${ir},${ir} 0 ${large},0 ${ix1},${iy1} Z`;
    return {...d, path, pct:Math.round(d.value/total*100)};
  });
  return(
    <div style={{textAlign:"center"}}>
      {title&&<div style={{fontSize:11,color:"#64748b",marginBottom:4,fontWeight:600}}>{title}</div>}
      <svg width={size} height={size}>
        {slices.map((s,i)=><path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth={1.5}/>)}
        <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fontSize={size*0.12} fontWeight="700" fill="#1e293b">{total}</text>
        <text x={cx} y={cy+size*0.1+4} textAnchor="middle" dominantBaseline="middle" fontSize={size*0.07} fill="#64748b">件</text>
      </svg>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginTop:4}}>
        {slices.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:"#475569"}}>
          <div style={{width:8,height:8,borderRadius:2,background:s.color,flexShrink:0}}/>
          {s.label}({s.pct}%)
        </div>)}
      </div>
    </div>
  );
}

function BarChart({data, height=120, color="#2563eb", yLabel, title}) {
  // data: [{label, value}]
  if(!data||data.length===0) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:"#94a3b8",fontSize:12}}>データなし</div>;
  const max=Math.max(...data.map(d=>d.value),1);
  const W=Math.max(data.length*44,200), H=height;
  const padL=32, padB=24, padT=12, padR=8;
  const cW=W-padL-padR, cH=H-padB-padT;
  const barW=Math.min(28, (cW/data.length)*0.6);
  return(
    <div style={{textAlign:"center"}}>
      {title&&<div style={{fontSize:11,color:"#64748b",marginBottom:4,fontWeight:600}}>{title}</div>}
      <div style={{overflowX:"auto"}}>
        <svg width={W} height={H} style={{minWidth:"100%"}}>
          {/* Grid */}
          {[0,0.25,0.5,0.75,1].map((t,i)=>{
            const y=padT+cH*(1-t);
            return <g key={i}>
              <line x1={padL} y1={y} x2={W-padR} y2={y} stroke="#f1f5f9" strokeWidth={1}/>
              <text x={padL-4} y={y+1} textAnchor="end" fontSize={9} fill="#94a3b8" dominantBaseline="middle">{Math.round(max*t)}</text>
            </g>;
          })}
          {/* Bars */}
          {data.map((d,i)=>{
            const x=padL+(cW/data.length)*i+(cW/data.length-barW)/2;
            const bH=max>0?(d.value/max)*cH:0;
            const y=padT+cH-bH;
            const isArr=Array.isArray(color);
            const c=isArr?color[i%color.length]:color;
            return <g key={i}>
              <rect x={x} y={y} width={barW} height={bH} fill={c} rx={3}/>
              {d.value>0&&<text x={x+barW/2} y={y-3} textAnchor="middle" fontSize={9} fill={c} fontWeight="600">{d.value}</text>}
              <text x={x+barW/2} y={H-4} textAnchor="middle" fontSize={9} fill="#64748b">{d.label}</text>
            </g>;
          })}
        </svg>
      </div>
    </div>
  );
}

function SparkLine({data, color="#2563eb", height=40, width=120}) {
  if(!data||data.length<2) return null;
  const max=Math.max(...data,1), min=Math.min(...data,0);
  const range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*width},${height-(((v-min)/range)*(height-6)+3)}`).join(" ");
  return(
    <svg width={width} height={height}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={(data.length-1)/(data.length-1)*width} cy={height-(((data[data.length-1]-min)/range)*(height-6)+3)} r={3} fill={color}/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  MasterScreen
// ═══════════════════════════════════════════════════════
function MasterScreen({onBack}) {
  const [masterTab, setMasterTab] = useState("dashboard");
  const [homes, setHomes] = useState([]);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selHome, setSelHome] = useState(null);
  const [masterPinNew, setMasterPinNew] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [homeForm, setHomeForm] = useState({name:"",company:"",unit:"",address:"",capacity:"",tel:"",open_date:"",note:""});
  const [homeModal, setHomeModal] = useState(null); // null | "add" | "edit"
  const [editHomeId, setEditHomeId] = useState(null);
  const [filterMonth, setFilterMonth] = useState(localDate().slice(0,7));

  const COLORS = ["#2563eb","#7c3aed","#059669","#d97706","#dc2626","#0891b2","#be185d","#65a30d","#9333ea","#ea580c"];

  const loadMasterData = async() => {
    setLoading(true);
    // ホーム一覧
    const {data:hs} = await supabase.from("master_homes").select("*").order("id");
    setHomes(hs||[]);
    // 全テーブルの件数サマリー
    const [u,st,att,exp,sr,sal,tr,acc,cl,mo,pr,wr,sc,msg,pl,hlt] = await Promise.all([
      supabase.from("users").select("id,status,unit,created_at"),
      supabase.from("staff_members").select("id,role,full_time"),
      supabase.from("attendance").select("id,date,staff_id,shift_type"),
      supabase.from("expense_claims").select("id,date,amount,status,category"),
      supabase.from("support_records").select("id,date,user_id"),
      supabase.from("salary_records").select("id,year_month,staff_id,net_pay,gross_pay"),
      supabase.from("transport_log").select("id,date"),
      supabase.from("accounting_entries").select("id,date,category,amount"),
      supabase.from("claim_data").select("id,year_month,amount,status"),
      supabase.from("monitoring").select("id,date,user_id"),
      supabase.from("performance_records").select("id,date,user_id,service_type"),
      supabase.from("wage_records").select("id,year_month,amount,user_id"),
      supabase.from("schedules").select("id,type,start_date"),
      supabase.from("user_messages").select("id,created_at,is_read"),
      supabase.from("support_plans").select("id,period_start,user_id,status"),
      supabase.from("health_records").select("id,date,user_id"),
    ]);
    setAllData({
      users:u.data||[], staff:st.data||[], attendance:att.data||[],
      expenses:exp.data||[], srecs:sr.data||[], salaries:sal.data||[],
      transport:tr.data||[], accounting:acc.data||[], claims:cl.data||[],
      monitoring:mo.data||[], perfs:pr.data||[], wages:wr.data||[],
      schedules:sc.data||[], msgs:msg.data||[], plans:pl.data||[], health:hlt.data||[],
    });
    setLoading(false);
  };

  useEffect(()=>{ loadMasterData(); },[]);

  const saveHome = async() => {
    if(!homeForm.name){return;}
    if(homeModal==="add"){
      await supabase.from("master_homes").insert({...homeForm, capacity:Number(homeForm.capacity)||0});
    } else {
      await supabase.from("master_homes").update({...homeForm, capacity:Number(homeForm.capacity)||0}).eq("id",editHomeId);
    }
    setHomeModal(null);
    setHomeForm({name:"",company:"",unit:"",address:"",capacity:"",tel:"",open_date:"",note:""});
    loadMasterData();
  };

  const deleteHome = async(id) => {
    if(!window.confirm("このホームを削除しますか？")) return;
    await supabase.from("master_homes").delete().eq("id",id);
    loadMasterData();
  };

  const saveMasterPin = async() => {
    if(masterPinNew.length<4){setPinMsg("4文字以上で入力してください");return;}
    await supabase.from("app_settings").upsert({key:"master_pin",value:masterPinNew});
    setPinMsg("✅ 更新しました");
    setMasterPinNew("");
  };

  // ── 集計データ計算 ──
  const d = allData;
  const activeUsers = (d.users||[]).filter(u=>u.status!=="退居");
  const totalUsers = activeUsers.length;
  const totalStaff = (d.staff||[]).length;
  const fullTimeStaff = (d.staff||[]).filter(s=>s.full_time==="常勤").length;

  // 今月の勤怠
  const thisMonthAtt = (d.attendance||[]).filter(a=>a.date?.startsWith(filterMonth));
  const thisMonthExp = (d.expenses||[]).filter(e=>e.date?.startsWith(filterMonth));
  const thisMonthSal = (d.salaries||[]).filter(s=>s.year_month===filterMonth);
  const thisMonthAcc = (d.accounting||[]).filter(a=>a.date?.startsWith(filterMonth));
  const totalIncome = thisMonthAcc.filter(a=>a.category==="収入").reduce((s,a)=>s+Number(a.amount||0),0);
  const totalExpenseAcc = thisMonthAcc.filter(a=>a.category==="支出").reduce((s,a)=>s+Number(a.amount||0),0);
  const totalExpenseClaim = thisMonthExp.reduce((s,e)=>s+Number(e.amount||0),0);
  const totalSalary = thisMonthSal.reduce((s,r)=>s+Number(r.net_pay||0),0);
  const totalSrecs = (d.srecs||[]).filter(s=>s.date?.startsWith(filterMonth)).length;
  const totalMessages = (d.msgs||[]).filter(m=>m.created_at?.startsWith(filterMonth)).length;
  const unreadMessages = (d.msgs||[]).filter(m=>!m.is_read).length;

  // 過去6ヶ月トレンド
  const months6 = Array.from({length:6},(_,i)=>{
    const d=new Date(); d.setMonth(d.getMonth()-5+i);
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
  });
  const attTrend = months6.map(m=>({label:m.slice(5)+"月",value:(d.attendance||[]).filter(a=>a.date?.startsWith(m)).length}));
  const srecTrend = months6.map(m=>({label:m.slice(5)+"月",value:(d.srecs||[]).filter(s=>s.date?.startsWith(m)).length}));
  const expTrend = months6.map(m=>({label:m.slice(5)+"月",value:(d.expenses||[]).filter(e=>e.date?.startsWith(m)).reduce((s,e)=>s+Number(e.amount||0),0)}));

  // 円グラフデータ
  const userStatusPie = [
    {label:"入居中",value:activeUsers.length,color:"#059669"},
    {label:"外泊中",value:(d.users||[]).filter(u=>u.status==="外泊").length,color:"#d97706"},
    {label:"退居",value:(d.users||[]).filter(u=>u.status==="退居").length,color:"#94a3b8"},
  ].filter(x=>x.value>0);

  const staffRolePie = [
    {label:"世話人",value:(d.staff||[]).filter(s=>s.role==="世話人").length,color:"#2563eb"},
    {label:"生活支援員",value:(d.staff||[]).filter(s=>s.role==="生活支援員").length,color:"#7c3aed"},
    {label:"管理者",value:(d.staff||[]).filter(s=>s.role==="管理者"||s.role==="施設長").length,color:"#059669"},
    {label:"その他",value:(d.staff||[]).filter(s=>!["世話人","生活支援員","管理者","施設長"].includes(s.role)).length,color:"#94a3b8"},
  ].filter(x=>x.value>0);

  const expenseCatPie = [
    {label:"日用品",value:(d.expenses||[]).filter(e=>e.category?.includes("日用品")).reduce((s,e)=>s+Number(e.amount||0),0),color:"#2563eb"},
    {label:"交通費",value:(d.expenses||[]).filter(e=>e.category?.includes("交通")).reduce((s,e)=>s+Number(e.amount||0),0),color:"#7c3aed"},
    {label:"食材",value:(d.expenses||[]).filter(e=>e.category?.includes("食材")).reduce((s,e)=>s+Number(e.amount||0),0),color:"#059669"},
    {label:"医療",value:(d.expenses||[]).filter(e=>e.category?.includes("医療")).reduce((s,e)=>s+Number(e.amount||0),0),color:"#ef4444"},
    {label:"業務",value:(d.expenses||[]).filter(e=>e.category?.includes("業務")).reduce((s,e)=>s+Number(e.amount||0),0),color:"#d97706"},
    {label:"その他",value:(d.expenses||[]).filter(e=>!["日用品","交通","食材","医療","業務"].some(k=>e.category?.includes(k))).reduce((s,e)=>s+Number(e.amount||0),0),color:"#94a3b8"},
  ].filter(x=>x.value>0);

  const expenseStatusPie = [
    {label:"申請中",value:(d.expenses||[]).filter(e=>e.status==="申請中").length,color:"#d97706"},
    {label:"承認済",value:(d.expenses||[]).filter(e=>e.status==="承認済").length,color:"#2563eb"},
    {label:"精算済",value:(d.expenses||[]).filter(e=>e.status==="精算済").length,color:"#059669"},
    {label:"却下",value:(d.expenses||[]).filter(e=>e.status==="却下").length,color:"#ef4444"},
  ].filter(x=>x.value>0);

  const shiftTypePie = [
    {label:"日勤",value:thisMonthAtt.filter(a=>a.shift_type==="日勤"||!a.shift_type).length,color:"#2563eb"},
    {label:"夜勤",value:thisMonthAtt.filter(a=>a.shift_type==="夜勤").length,color:"#7c3aed"},
    {label:"早番",value:thisMonthAtt.filter(a=>a.shift_type==="早番").length,color:"#059669"},
    {label:"遅番",value:thisMonthAtt.filter(a=>a.shift_type==="遅番").length,color:"#d97706"},
  ].filter(x=>x.value>0);

  const unitBar = [...new Set((d.users||[]).map(u=>u.unit).filter(Boolean))].map((unit,i)=>({
    label:unit, value:(d.users||[]).filter(u=>u.unit===unit&&u.status!=="退居").length
  }));

  const CSS_MASTER = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Noto Sans JP',sans-serif;}
    .m-card{background:white;border-radius:14px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.08);border:1px solid #f1f5f9;}
    .m-tab{padding:8px 16px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:600;transition:all .15s;}
    .m-tab-active{background:#0f172a;color:white;}
    .m-tab-inactive{background:#f1f5f9;color:#475569;}
    .m-kpi{background:white;border-radius:12px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.08);border:1px solid #f1f5f9;}
    .m-input{width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;outline:none;font-family:inherit;}
    .m-input:focus{border-color:#0f172a;}
    .m-btn{padding:8px 16px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;}
  `;

  const TABS = [
    {id:"dashboard",label:"📊 ダッシュボード"},
    {id:"homes",label:"🏠 ホーム管理"},
    {id:"analytics",label:"📈 データ分析"},
    {id:"settings",label:"⚙️ 設定"},
  ];

  if(loading) return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"#0f172a",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:14}}>
      <style>{CSS_MASTER}</style>⏳ マスターデータ読み込み中...
    </div>
  );

  return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"#0f172a",color:"#f8fafc"}}>
      <style>{CSS_MASTER}</style>

      {/* ヘッダー */}
      <div style={{background:"linear-gradient(135deg,#0f172a,#1e293b)",borderBottom:"1px solid #334155",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#334155,#475569)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛡️</div>
          <div>
            <div style={{fontWeight:800,fontSize:14,color:"white"}}>Master Console</div>
            <div style={{fontSize:10,color:"#64748b"}}>グループホーム統合管理</div>
          </div>
        </div>
        <button onClick={onBack} style={{background:"#334155",color:"#94a3b8",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600}}>← 退出</button>
      </div>

      {/* タブ */}
      <div style={{padding:"12px 20px",display:"flex",gap:8,overflowX:"auto",borderBottom:"1px solid #1e293b"}}>
        {TABS.map(t=>(
          <button key={t.id} className={"m-tab "+(masterTab===t.id?"m-tab-active":"m-tab-inactive")}
            style={{whiteSpace:"nowrap",background:masterTab===t.id?"white":"#1e293b",color:masterTab===t.id?"#0f172a":"#94a3b8"}}
            onClick={()=>setMasterTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{padding:"16px 20px",maxWidth:1200,margin:"0 auto"}}>

        {/* ═══ ダッシュボード ═══ */}
        {masterTab==="dashboard"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <div style={{fontSize:16,fontWeight:800,color:"white"}}>概要ダッシュボード</div>
              <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)}
                style={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"6px 10px",fontSize:13}}/>
            </div>

            {/* KPIカード */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
              {[
                {l:"入居利用者",v:totalUsers+"名",sub:"アクティブ",c:"#3b82f6",icon:"👤"},
                {l:"スタッフ数",v:totalStaff+"名",sub:`常勤${fullTimeStaff}名`,c:"#8b5cf6",icon:"👥"},
                {l:"今月 支援記録",v:totalSrecs+"件",sub:filterMonth,c:"#10b981",icon:"📝"},
                {l:"今月 勤怠打刻",v:thisMonthAtt.length+"件",sub:filterMonth,c:"#f59e0b",icon:"⏰"},
                {l:"今月 立替総額",v:"¥"+totalExpenseClaim.toLocaleString(),sub:`${thisMonthExp.length}件`,c:"#ef4444",icon:"🧾"},
                {l:"今月 収入",v:"¥"+(totalIncome/10000).toFixed(0)+"万",sub:"経理登録",c:"#059669",icon:"💰"},
                {l:"今月 支出",v:"¥"+(totalExpenseAcc/10000).toFixed(0)+"万",sub:"経理登録",c:"#dc2626",icon:"💸"},
                {l:"未読メッセージ",v:unreadMessages+"件",sub:`今月${totalMessages}件`,c:"#0891b2",icon:"💬"},
              ].map((k,i)=>(
                <div key={i} className="m-kpi" style={{background:"#1e293b",border:"1px solid #334155"}}>
                  <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
                  <div style={{fontSize:11,color:"#64748b",marginBottom:2}}>{k.l}</div>
                  <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
                  <div style={{fontSize:10,color:"#475569"}}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* グラフ行1 */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12,marginBottom:12}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:12}}>👤 利用者ステータス</div>
                <PieChart data={userStatusPie} size={150} />
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:12}}>👥 スタッフ役職別</div>
                <PieChart data={staffRolePie} size={150} />
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:12}}>🧾 立替ステータス</div>
                <PieChart data={expenseStatusPie} size={150} />
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:12}}>⏰ 今月シフト種別</div>
                <PieChart data={shiftTypePie} size={150} />
              </div>
            </div>

            {/* グラフ行2：トレンド */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>📅 月別 勤怠打刻数（6ヶ月）</div>
                <BarChart data={attTrend} height={110} color="#3b82f6"/>
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>📝 月別 支援記録数（6ヶ月）</div>
                <BarChart data={srecTrend} height={110} color="#10b981"/>
              </div>
            </div>

            {/* 棟別利用者 + 立替カテゴリ */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>🏠 棟別 入居者数</div>
                {unitBar.length>0?<BarChart data={unitBar} height={110} color={COLORS}/>:<div style={{color:"#64748b",fontSize:12,padding:"20px",textAlign:"center"}}>データなし</div>}
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>🧾 立替カテゴリ別金額（全期間）</div>
                <PieChart data={expenseCatPie} size={140}/>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ホーム管理 ═══ */}
        {masterTab==="homes"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:16,fontWeight:800,color:"white"}}>🏠 ホーム・ユニット管理</div>
              <button className="m-btn" style={{background:"#3b82f6",color:"white"}} onClick={()=>{setHomeForm({name:"",company:"",unit:"",address:"",capacity:"",tel:"",open_date:"",note:""});setHomeModal("add");}}>＋ ホーム追加</button>
            </div>

            {homes.length===0&&<div className="m-card" style={{background:"#1e293b",border:"1px solid #334155",textAlign:"center",padding:40,color:"#64748b"}}>登録されているホームがありません<br/><span style={{fontSize:12}}>「ホーム追加」から登録してください</span></div>}

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
              {homes.map((h,i)=>{
                const hUsers = (d.users||[]).filter(u=>u.unit===h.unit&&u.status!=="退居");
                const hStaff = (d.staff||[]).filter(s=>s.unit===h.unit||true); // unit未紐付けのため全員
                const fillRate = h.capacity>0?Math.round(hUsers.length/h.capacity*100):null;
                return(
                  <div key={h.id} className="m-card" style={{background:"#1e293b",border:"1px solid #334155",cursor:"pointer",transition:"border-color .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#3b82f6"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#334155"}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:"white",marginBottom:2}}>{h.name}</div>
                        <div style={{fontSize:11,color:"#64748b"}}>{h.company} {h.unit&&<span>/ {h.unit}棟</span>}</div>
                      </div>
                      <div style={{width:10,height:10,borderRadius:"50%",background:COLORS[i%COLORS.length],marginTop:4}}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
                      {[
                        {l:"定員",v:h.capacity||"-"},
                        {l:"入居者",v:hUsers.length+"名"},
                        {l:"充填率",v:fillRate!=null?fillRate+"%":"-"},
                      ].map((k,j)=>(
                        <div key={j} style={{textAlign:"center",padding:"8px 4px",background:"#0f172a",borderRadius:8}}>
                          <div style={{fontSize:10,color:"#64748b"}}>{k.l}</div>
                          <div style={{fontSize:16,fontWeight:800,color:"white"}}>{k.v}</div>
                        </div>
                      ))}
                    </div>
                    {fillRate!=null&&(
                      <div style={{height:6,background:"#334155",borderRadius:3,marginBottom:10}}>
                        <div style={{height:"100%",width:Math.min(fillRate,100)+"%",background:fillRate>=90?"#ef4444":fillRate>=70?"#d97706":"#3b82f6",borderRadius:3,transition:"width .3s"}}/>
                      </div>
                    )}
                    <div style={{fontSize:11,color:"#64748b",marginBottom:10}}>
                      {h.address&&<div>📍 {h.address}</div>}
                      {h.tel&&<div>📞 {h.tel}</div>}
                      {h.open_date&&<div>📅 開設: {h.open_date}</div>}
                      {h.note&&<div>📝 {h.note}</div>}
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="m-btn" style={{background:"#334155",color:"#94a3b8",fontSize:11,padding:"5px 10px",flex:1}} onClick={()=>{setHomeForm({name:h.name,company:h.company||"",unit:h.unit||"",address:h.address||"",capacity:String(h.capacity||""),tel:h.tel||"",open_date:h.open_date||"",note:h.note||""});setEditHomeId(h.id);setHomeModal("edit");}}>✏️ 編集</button>
                      <button className="m-btn" style={{background:"#450a0a",color:"#fca5a5",fontSize:11,padding:"5px 10px"}} onClick={()=>deleteHome(h.id)}>🗑</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ホーム追加・編集モーダル */}
            {homeModal&&(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setHomeModal(null)}>
                <div style={{background:"#1e293b",border:"1px solid #334155",borderRadius:16,padding:24,width:"100%",maxWidth:480}} onClick={e=>e.stopPropagation()}>
                  <div style={{fontWeight:800,fontSize:15,color:"white",marginBottom:16}}>{homeModal==="add"?"🏠 ホーム追加":"🏠 ホーム編集"}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                    {[
                      {l:"ホーム名 *",k:"name",type:"text",span:2},
                      {l:"運営会社",k:"company",type:"text"},
                      {l:"棟・ユニット名",k:"unit",type:"text"},
                      {l:"定員",k:"capacity",type:"number"},
                      {l:"電話番号",k:"tel",type:"tel"},
                      {l:"開設日",k:"open_date",type:"date"},
                      {l:"住所",k:"address",type:"text",span:2},
                      {l:"備考",k:"note",type:"text",span:2},
                    ].map(f=>(
                      <div key={f.k} style={{gridColumn:f.span?"span 2":"span 1"}}>
                        <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>{f.l}</label>
                        <input className="m-input" type={f.type||"text"} value={homeForm[f.k]} onChange={e=>setHomeForm(fm=>({...fm,[f.k]:e.target.value}))}
                          style={{background:"#0f172a",borderColor:"#334155",color:"white"}}/>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="m-btn" style={{background:"#3b82f6",color:"white",flex:1}} onClick={saveHome}>保存</button>
                    <button className="m-btn" style={{background:"#334155",color:"#94a3b8"}} onClick={()=>setHomeModal(null)}>キャンセル</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ データ分析 ═══ */}
        {masterTab==="analytics"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <div style={{fontSize:16,fontWeight:800,color:"white"}}>📈 詳細データ分析</div>
              <input type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)}
                style={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,color:"#e2e8f0",padding:"6px 10px",fontSize:13}}/>
            </div>

            {/* 財務分析 */}
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",marginBottom:8,marginTop:4}}>💰 財務・経費分析</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:12}}>
              {[
                {l:"今月 収入合計",v:"¥"+totalIncome.toLocaleString(),c:"#10b981"},
                {l:"今月 支出合計",v:"¥"+totalExpenseAcc.toLocaleString(),c:"#ef4444"},
                {l:"収支差額",v:(totalIncome-totalExpenseAcc>=0?"+":"")+"¥"+(totalIncome-totalExpenseAcc).toLocaleString(),c:totalIncome-totalExpenseAcc>=0?"#10b981":"#ef4444"},
                {l:"今月 立替払い",v:"¥"+totalExpenseClaim.toLocaleString(),c:"#f59e0b"},
                {l:"今月 給与合計",v:"¥"+totalSalary.toLocaleString(),c:"#8b5cf6"},
                {l:"立替 未精算件数",v:(d.expenses||[]).filter(e=>e.status==="申請中"||e.status==="承認済").length+"件",c:"#dc2626"},
              ].map((k,i)=>(
                <div key={i} className="m-kpi" style={{background:"#1e293b",border:"1px solid #334155"}}>
                  <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div>
                  <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>📊 月別立替金額推移（6ヶ月）</div>
                <BarChart data={expTrend} height={120} color="#f59e0b"/>
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>🧾 立替カテゴリ別（全期間累計）</div>
                <PieChart data={expenseCatPie} size={150}/>
              </div>
            </div>

            {/* 支援・ケア分析 */}
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",marginBottom:8}}>📝 支援・ケア分析</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10,marginBottom:12}}>
              {[
                {l:"今月 支援記録",v:totalSrecs+"件",c:"#10b981"},
                {l:"今月 モニタリング",v:(d.monitoring||[]).filter(m=>m.date?.startsWith(filterMonth)).length+"件",c:"#3b82f6"},
                {l:"今月 健康記録",v:(d.health||[]).filter(h=>h.date?.startsWith(filterMonth)).length+"件",c:"#8b5cf6"},
                {l:"今月 外泊予定",v:(d.schedules||[]).filter(s=>s.type==="外泊"&&s.start_date?.startsWith(filterMonth)).length+"件",c:"#d97706"},
                {l:"活動中 支援計画",v:(d.plans||[]).filter(p=>p.status==="進行中"||!p.status).length+"件",c:"#059669"},
                {l:"利用者 メッセージ",v:totalMessages+"件",c:"#0891b2"},
              ].map((k,i)=>(
                <div key={i} className="m-kpi" style={{background:"#1e293b",border:"1px solid #334155"}}>
                  <div style={{fontSize:11,color:"#64748b",marginBottom:4}}>{k.l}</div>
                  <div style={{fontSize:18,fontWeight:800,color:k.c}}>{k.v}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>📅 月別 支援記録数（6ヶ月）</div>
                <BarChart data={srecTrend} height={110} color="#10b981"/>
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>🏠 棟別 入居者分布</div>
                {unitBar.length>0?<BarChart data={unitBar} height={110} color={COLORS}/>:<div style={{color:"#64748b",fontSize:12,padding:"20px",textAlign:"center"}}>棟データなし</div>}
              </div>
            </div>

            {/* スタッフ分析 */}
            <div style={{fontSize:13,fontWeight:700,color:"#64748b",marginBottom:8}}>👥 スタッフ分析</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>👥 役職構成</div>
                <PieChart data={staffRolePie} size={150}/>
              </div>
              <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginBottom:8}}>⏰ 今月シフト種別</div>
                <PieChart data={shiftTypePie} size={150}/>
              </div>
            </div>
          </div>
        )}

        {/* ═══ 設定 ═══ */}
        {masterTab==="settings"&&(
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"white",marginBottom:16}}>⚙️ マスター設定</div>

            <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:14,color:"white",marginBottom:12}}>🔑 マスターPIN変更</div>
              <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>現在のマスターPINを変更します（初期値: 999999）</div>
              <input className="m-input" type="password" maxLength={8} placeholder="新しいマスターPIN（4〜8桁）"
                value={masterPinNew} onChange={e=>setMasterPinNew(e.target.value)}
                style={{background:"#0f172a",borderColor:"#334155",color:"white",marginBottom:8}}/>
              {pinMsg&&<div style={{fontSize:12,color:pinMsg.startsWith("✅")?"#10b981":"#ef4444",marginBottom:8}}>{pinMsg}</div>}
              <button className="m-btn" style={{background:"#3b82f6",color:"white"}} onClick={saveMasterPin}>更新</button>
            </div>

            <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:14,color:"white",marginBottom:8}}>📊 データ概要</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
                {[
                  ["利用者総数",(d.users||[]).length+"名"],
                  ["スタッフ総数",(d.staff||[]).length+"名"],
                  ["支援記録総数",(d.srecs||[]).length+"件"],
                  ["勤怠記録総数",(d.attendance||[]).length+"件"],
                  ["立替総件数",(d.expenses||[]).length+"件"],
                  ["立替総額","¥"+(d.expenses||[]).reduce((s,e)=>s+Number(e.amount||0),0).toLocaleString()],
                  ["メッセージ総数",(d.msgs||[]).length+"件"],
                  ["ホーム登録数",homes.length+"件"],
                ].map(([l,v],i)=>(
                  <div key={i} style={{padding:"10px",background:"#0f172a",borderRadius:8}}>
                    <div style={{fontSize:10,color:"#64748b",marginBottom:2}}>{l}</div>
                    <div style={{fontSize:15,fontWeight:800,color:"#e2e8f0"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="m-card" style={{background:"#1e293b",border:"1px solid #334155"}}>
              <div style={{fontWeight:700,fontSize:14,color:"white",marginBottom:8}}>🛡️ アクセス方法</div>
              <div style={{fontSize:12,color:"#64748b",lineHeight:1.8}}>
                <div>• ログイン画面のロゴアイコンを <b style={{color:"#e2e8f0"}}>5回連続タップ</b> でマスターPIN入力画面へ</div>
                <div>• 通常の管理者・スタッフ画面からは一切アクセス不可</div>
                <div>• マスターPINは管理者PINとは別に管理してください</div>
                <div>• ナビゲーションにも表示されません</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ExportAllTab({users,staffList,attendance,transport,entries,claims,srecs,plans,monitors,perfs,wages,files,scheds,msgs,salaries,shifts,health,expenses}) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [selectedSheets, setSelectedSheets] = useState({
    users:true, staff:true, attendance:true, shifts_data:true,
    salaries:true, expenses:true, transport:true, srecs:true,
    plans:true, monitors:true, health:true, msgs:true,
    scheds:true, claims:true, accounting:true, wages:true,
    perfs:true, files:true,
  });

  const toggleSheet = (key) => setSelectedSheets(s=>({...s,[key]:!s[key]}));
  const allOn  = () => setSelectedSheets(s=>Object.fromEntries(Object.keys(s).map(k=>[k,true])));
  const allOff = () => setSelectedSheets(s=>Object.fromEntries(Object.keys(s).map(k=>[k,false])));

  const SHEETS = [
    {key:"users",       label:"利用者情報",         icon:"👤", data:users,
     cols:["id","name","kana","status","birth_date","disability_type","recipient_no","unit","move_in_date","move_out_date","emergency_contact","note","access_code"]},
    {key:"staff",       label:"スタッフ情報",        icon:"👥", data:staffList,
     cols:["id","name","kana","role","full_time","tel","email","hourly_rate","night_rate","hire_date","certifications"]},
    {key:"attendance",  label:"勤怠記録",            icon:"⏰", data:attendance,
     cols:["id","staff_id","date","clock_in","clock_out","break_minutes","shift_type","note"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"shifts_data", label:"シフト申請",          icon:"📅", data:shifts,
     cols:["id","staff_id","staff_name","type","date_from","date_to","reason","status","created_at"],
     filter: r=>!filterMonth||r.date_from?.startsWith(filterMonth)},
    {key:"salaries",    label:"給与記録",            icon:"💴", data:salaries,
     cols:["id","staff_id","staff_name","year_month","work_minutes","gross_pay","deductions","net_pay","pay_date","status","note"],
     filter: r=>!filterMonth||r.year_month?.startsWith(filterMonth)},
    {key:"expenses",    label:"立替払い",            icon:"🧾", data:expenses,
     cols:["id","staff_id","staff_name","date","category","description","amount","has_receipt","receipt_url","note","status","approved_at"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"transport",   label:"送迎記録",            icon:"🚗", data:transport,
     cols:["id","date","staff_name","user_name","direction","departure","destination","distance_km","note"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"srecs",       label:"支援記録",            icon:"📝", data:srecs,
     cols:["id","user_id","date","staff_name","content","category","next_action"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"plans",       label:"支援計画",            icon:"📋", data:plans,
     cols:["id","user_id","created_at","period_start","period_end","goal","content","status"]},
    {key:"monitors",    label:"モニタリング",         icon:"🔍", data:monitors,
     cols:["id","user_id","date","staff_name","evaluation","issues","next_plan"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"health",      label:"健康記録",            icon:"🏥", data:health,
     cols:["id","user_id","date","temperature","weight","blood_pressure","condition","medication_taken","note"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"msgs",        label:"利用者メッセージ",    icon:"💬", data:msgs,
     cols:["id","user_id","staff_name","content","created_at","is_read"],
     filter: r=>!filterMonth||r.created_at?.startsWith(filterMonth)},
    {key:"scheds",      label:"予定管理",            icon:"🗓️", data:scheds,
     cols:["id","user_id","unit","type","start_date","end_date","note","status"],
     filter: r=>!filterMonth||r.start_date?.startsWith(filterMonth)},
    {key:"claims",      label:"国保連請求",          icon:"🏦", data:claims,
     cols:["id","year_month","user_id","service_days","amount","status"]},
    {key:"accounting",  label:"経理・仕訳",          icon:"📊", data:entries,
     cols:["id","date","category","sub_category","description","amount","debit","credit"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"wages",       label:"工賃記録",            icon:"💰", data:wages,
     cols:["id","user_id","year_month","work_days","amount","note"],
     filter: r=>!filterMonth||r.year_month?.startsWith(filterMonth)},
    {key:"perfs",       label:"実績記録",            icon:"📈", data:perfs,
     cols:["id","user_id","date","service_type","hours","note"],
     filter: r=>!filterMonth||r.date?.startsWith(filterMonth)},
    {key:"files",       label:"ファイル記録",        icon:"📁", data:files,
     cols:["id","date","category","title","note","url"]},
  ];

  // 日本語列名マッピング
  const COL_JA = {
    id:"ID", name:"氏名", kana:"フリガナ", status:"状態", birth_date:"生年月日",
    disability_type:"障害種別", recipient_no:"受給者番号", unit:"棟", move_in_date:"入居日",
    move_out_date:"退居日", emergency_contact:"緊急連絡先", note:"備考", access_code:"アクセスコード",
    role:"役職", full_time:"雇用形態", tel:"電話", email:"メール", hourly_rate:"基本時給",
    night_rate:"夜勤時給", hire_date:"入職日", certifications:"資格",
    staff_id:"スタッフID", staff_name:"スタッフ名", date:"日付", clock_in:"出勤",
    clock_out:"退勤", break_minutes:"休憩(分)", shift_type:"シフト種別",
    type:"種別", date_from:"開始日", date_to:"終了日", reason:"理由",
    created_at:"作成日時", year_month:"年月", work_minutes:"勤務時間(分)",
    gross_pay:"総支給額", deductions:"控除額", net_pay:"手取り", pay_date:"支払日",
    category:"カテゴリ", description:"内容", amount:"金額", has_receipt:"領収書",
    receipt_url:"領収書URL", approved_at:"承認日", direction:"方向",
    departure:"出発地", destination:"目的地", distance_km:"距離(km)",
    user_id:"利用者ID", content:"内容", next_action:"次のアクション",
    period_start:"計画開始", period_end:"計画終了", goal:"目標", evaluation:"評価",
    issues:"課題", next_plan:"次の計画", temperature:"体温", weight:"体重",
    blood_pressure:"血圧", condition:"体調", medication_taken:"服薬",
    is_read:"既読", start_date:"開始日", end_date:"終了日",
    service_days:"利用日数", service_type:"サービス種別", hours:"時間",
    sub_category:"補助科目", debit:"借方", credit:"貸方",
    work_days:"勤務日数", url:"URL", title:"タイトル",
  };

  const exportAll = async() => {
    setExporting(true);
    const wb = XLSX.utils.book_new();
    const now = new Date();
    const ts = now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");

    // 表紙シート
    const coverData = [
      ["グループホームつながり データエクスポート"],
      ["出力日時", now.toLocaleString("ja-JP")],
      ["対象期間", filterMonth||"全期間"],
      ["出力シート数", SHEETS.filter(s=>selectedSheets[s.key]).length+"シート"],
      [],
      ["シート名","件数","説明"],
    ];
    const activeSheets = SHEETS.filter(s=>selectedSheets[s.key]);
    activeSheets.forEach(s=>{
      const rows = s.filter ? (s.data||[]).filter(s.filter) : (s.data||[]);
      coverData.push([s.icon+" "+s.label, rows.length+"件", ""]);
    });
    const coverWS = XLSX.utils.aoa_to_sheet(coverData);
    coverWS["!cols"] = [{wch:35},{wch:20},{wch:20}];
    XLSX.utils.book_append_sheet(wb, coverWS, "📋 概要");

    // 各データシート
    for(const sheet of activeSheets){
      setProgress(sheet.label+"を処理中...");
      await new Promise(r=>setTimeout(r,10));

      const rawData = sheet.data||[];
      const filtered = sheet.filter ? rawData.filter(sheet.filter) : rawData;

      if(filtered.length===0){
        const emptyWS = XLSX.utils.aoa_to_sheet([[sheet.label+"のデータがありません"]]);
        XLSX.utils.book_append_sheet(wb, emptyWS, sheet.icon+" "+sheet.label);
        continue;
      }

      // ヘッダー行（日本語）
      const header = sheet.cols.map(c=>COL_JA[c]||c);
      // データ行
      const rows = filtered.map(row=>
        sheet.cols.map(col=>{
          const v = row[col];
          if(v===null||v===undefined) return "";
          if(typeof v==="boolean") return v?"はい":"いいえ";
          // 日時文字列を見やすく
          if(typeof v==="string"&&v.match(/^\d{4}-\d{2}-\d{2}T/)) {
            try{ return new Date(v).toLocaleString("ja-JP"); }catch(e){ return v; }
          }
          return v;
        })
      );

      const wsData = [header, ...rows];
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // 列幅自動設定
      const colWidths = header.map((h,i)=>{
        const maxLen = Math.max(h.length, ...rows.map(r=>String(r[i]||"").length));
        return {wch: Math.min(Math.max(maxLen+2, 8), 40)};
      });
      ws["!cols"] = colWidths;

      // ヘッダー行スタイル（背景色）
      const range = XLSX.utils.decode_range(ws["!ref"]||"A1");
      for(let c=range.s.c; c<=range.e.c; c++){
        const cell = ws[XLSX.utils.encode_cell({r:0,c})];
        if(cell) cell.s = {fill:{fgColor:{rgb:"1E3A8A"}},font:{bold:true,color:{rgb:"FFFFFF"}}};
      }

      const sheetName = (sheet.icon+" "+sheet.label).slice(0,31);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }

    setProgress("ファイルを生成中...");
    await new Promise(r=>setTimeout(r,10));

    const filename = "グループホームつながり_データ_"+(filterMonth||ts)+".xlsx";
    XLSX.writeFile(wb, filename);
    setProgress("");
    setExporting(false);
  };

  const totalSelected = SHEETS.filter(s=>selectedSheets[s.key]).length;
  const totalRows = SHEETS.filter(s=>selectedSheets[s.key]).reduce((sum,s)=>{
    const d = s.filter ? (s.data||[]).filter(s.filter) : (s.data||[]);
    return sum + d.length;
  }, 0);

  return(
    <div className="fade-in">
      <PH title="データエクスポート" sub="全データをExcelファイルに出力"/>

      {/* 設定カード */}
      <div className="card" style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>⚙️ エクスポート設定</div>
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:12}}>
          <div>
            <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>対象期間（空欄で全期間）</label>
            <input className="input" type="month" value={filterMonth} onChange={e=>setFilterMonth(e.target.value)} style={{width:160}}/>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"flex-end"}}>
            <button className="btn btn-secondary btn-sm" onClick={allOn}>全選択</button>
            <button className="btn btn-secondary btn-sm" onClick={allOff}>全解除</button>
          </div>
        </div>
        <div style={{fontSize:12,color:"#64748b",marginBottom:8}}>出力するシートを選択：</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:6}}>
          {SHEETS.map(s=>{
            const cnt = s.filter ? (s.data||[]).filter(s.filter).length : (s.data||[]).length;
            return(
              <label key={s.key} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:8,background:selectedSheets[s.key]?"#eff6ff":"#f8fafc",border:"1px solid "+(selectedSheets[s.key]?"#bfdbfe":"#e2e8f0"),cursor:"pointer",fontSize:12}}>
                <input type="checkbox" checked={selectedSheets[s.key]} onChange={()=>toggleSheet(s.key)} style={{width:14,height:14}}/>
                <span>{s.icon} {s.label}</span>
                <span style={{marginLeft:"auto",color:"#94a3b8",fontSize:11}}>{cnt}件</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 出力ボタン */}
      <div className="card" style={{textAlign:"center",padding:24}}>
        <div style={{fontSize:13,color:"#64748b",marginBottom:4}}>{totalSelected}シート / 約{totalRows.toLocaleString()}件のデータ</div>
        {progress&&<div style={{fontSize:12,color:"#7c3aed",marginBottom:8}}>⏳ {progress}</div>}
        <button
          className="btn btn-primary"
          style={{fontSize:15,padding:"12px 32px",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",opacity:exporting||totalSelected===0?0.6:1}}
          onClick={exportAll}
          disabled={exporting||totalSelected===0}
        >
          {exporting?"出力中...":"📥 Excelファイルをダウンロード"}
        </button>
        <div style={{fontSize:11,color:"#94a3b8",marginTop:8}}>
          ファイル名: グループホームつながり_データ_{filterMonth||"全期間"}.xlsx
        </div>
      </div>
    </div>
  );
}

function DocsTab({today, staffList=[]}) {
  const REQUIRED_DOCS = [
    {cat:"指定申請・運営",icon:"📋",items:[
      {id:"d01",name:"指定申請書・添付書類",keep:"永久",freq:"変更時更新"},
      {id:"d02",name:"運営規程",keep:"永久",freq:"変更時更新"},
      {id:"d03",name:"重要事項説明書",keep:"永久",freq:"変更時更新"},
      {id:"d04",name:"利用契約書（利用者全員分）",keep:"契約終了後5年",freq:"入居時"},
      {id:"d23",name:"苦情受付・解決記録",keep:"5年",freq:"発生時"},
      {id:"d24",name:"入居者名簿・緊急連絡先一覧",keep:"退居後5年",freq:"入居時・変更時"},
    ]},
    {cat:"個別支援関係",icon:"👤",items:[
      {id:"d05",name:"個別支援計画（全利用者）",keep:"5年",freq:"6ヶ月ごと"},
      {id:"d06",name:"アセスメント記録",keep:"5年",freq:"計画作成時"},
      {id:"d07",name:"モニタリング記録",keep:"5年",freq:"6ヶ月ごと"},
      {id:"d08",name:"サービス提供記録（日別）",keep:"5年",freq:"毎日"},
      {id:"d25",name:"相談支援専門員との連携記録",keep:"5年",freq:"随時"},
      {id:"d26",name:"医療機関・関係機関との連携記録",keep:"5年",freq:"随時"},
    ]},
    {cat:"請求・経理",icon:"💴",items:[
      {id:"d09",name:"給付費請求書・明細書",keep:"5年",freq:"月次"},
      {id:"d10",name:"領収書・支払記録",keep:"5年",freq:"随時"},
      {id:"d11",name:"収支計算書",keep:"10年",freq:"年次"},
      {id:"d27",name:"加算算定根拠書類（体制届等）",keep:"5年",freq:"届出時・変更時"},
    ]},
    {cat:"人員・組織",icon:"👥",items:[
      {id:"d12",name:"従業者の勤務体制記録（様式4）",keep:"5年",freq:"月次"},
      {id:"d13",name:"資格証・研修修了証（全スタッフ）",keep:"在職中",freq:"取得時"},
      {id:"d14",name:"雇用契約書",keep:"退職後3年",freq:"採用時"},
      {id:"d28",name:"サービス管理責任者 実務経験証明書",keep:"永久",freq:"就任時"},
      {id:"d29",name:"健康診断結果（全従業者）",keep:"5年",freq:"年1回以上"},
    ]},
    {cat:"安全・緊急対応",icon:"🚨",items:[
      {id:"d15",name:"事故報告書・ヒヤリハット",keep:"5年",freq:"発生時"},
      {id:"d16",name:"業務継続計画（BCP）",keep:"永久",freq:"年次見直し"},
      {id:"d17",name:"虐待防止・身体拘束廃止計画",keep:"永久",freq:"年次見直し"},
      {id:"d18",name:"感染症・食中毒対応マニュアル",keep:"永久",freq:"年次見直し"},
      {id:"d30",name:"防火・避難計画・訓練記録",keep:"5年",freq:"年2回以上"},
      {id:"d31",name:"身体拘束適正化の取組記録",keep:"5年",freq:"発生時・委員会時"},
    ]},
    {cat:"会議・委員会",icon:"📝",items:[
      {id:"d19",name:"職員会議議事録",keep:"5年",freq:"月次"},
      {id:"d20",name:"虐待防止委員会議事録",keep:"5年",freq:"年2回以上"},
      {id:"d21",name:"身体拘束廃止委員会議事録",keep:"5年",freq:"年2回以上"},
      {id:"d22",name:"リスクマネジメント委員会議事録",keep:"5年",freq:"年2回以上"},
      {id:"d32",name:"地域連携推進会議 議事録・参加者記録",keep:"5年",freq:"年1回以上"},
      {id:"d33",name:"感染症対策委員会議事録",keep:"5年",freq:"年2回以上"},
    ]},
    {cat:"自立支援・地域移行",icon:"🏘️",items:[
      {id:"d34",name:"地域移行・地域定着支援記録",keep:"5年",freq:"随時"},
      {id:"d35",name:"日中活動・就労支援連携記録",keep:"5年",freq:"随時"},
      {id:"d36",name:"自立生活移行計画（該当者）",keep:"5年",freq:"作成時"},
    ]},
  ];

  const [docStatus, setDocStatus] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("全て");
  const [filterExpiry, setFilterExpiry] = useState(false);

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","doc_status").single().then(({data})=>{
      if(data?.value){try{setDocStatus(JSON.parse(data.value));}catch(e){}}
      setLoaded(true);
    });
  },[]);

  const update = async(id, field, val)=>{
    const newS={...docStatus,[id]:{...docStatus[id],[field]:val}};
    setDocStatus(newS);
    await supabase.from("app_settings").upsert({key:"doc_status",value:JSON.stringify(newS)},{onConflict:"key"});
  };

  const updateMulti = async(id, fields)=>{
    const newS={...docStatus,[id]:{...docStatus[id],...fields}};
    setDocStatus(newS);
    await supabase.from("app_settings").upsert({key:"doc_status",value:JSON.stringify(newS)},{onConflict:"key"});
  };

  // 期限チェック
  const getExpiryState = (docId) => {
    const s = docStatus[docId]||{};
    if(!s.expiry_date) return "none";
    const diff = (new Date(s.expiry_date) - new Date(today)) / (1000*60*60*24);
    if(diff < 0) return "expired";
    if(diff <= 30) return "soon";
    if(diff <= 90) return "warn";
    return "ok";
  };

  const allDocs = REQUIRED_DOCS.flatMap(c=>c.items);
  const done = allDocs.filter(d=>(docStatus[d.id]?.status||"未整備")==="整備済").length;
  const inprog = allDocs.filter(d=>(docStatus[d.id]?.status||"未整備")==="整備中").length;
  const expired = allDocs.filter(d=>getExpiryState(d.id)==="expired").length;
  const expiringSoon = allDocs.filter(d=>["soon","warn"].includes(getExpiryState(d.id))).length;
  const pct = Math.round(done/allDocs.length*100);

  const filteredCats = REQUIRED_DOCS.map(cat=>({
    ...cat,
    items: cat.items.filter(doc=>{
      const s = docStatus[doc.id]||{status:"未整備"};
      const st = s.status||"未整備";
      if(filterStatus!=="全て" && st!==filterStatus) return false;
      if(filterExpiry){
        const ex=getExpiryState(doc.id);
        if(!["expired","soon","warn"].includes(ex)) return false;
      }
      return true;
    })
  })).filter(cat=>cat.items.length>0);

  const expiryBadge = (docId) => {
    const state = getExpiryState(docId);
    const s = docStatus[docId]||{};
    if(state==="none") return null;
    const diff = Math.ceil((new Date(s.expiry_date) - new Date(today)) / (1000*60*60*24));
    if(state==="expired") return <span style={{fontSize:10,padding:"2px 6px",borderRadius:10,background:"#fef2f2",color:"#ef4444",border:"1px solid #fecaca",fontWeight:700}}>⚠️ 期限切れ</span>;
    if(state==="soon") return <span style={{fontSize:10,padding:"2px 6px",borderRadius:10,background:"#fef2f2",color:"#ef4444",border:"1px solid #fecaca",fontWeight:700}}>🔴 あと{diff}日</span>;
    if(state==="warn") return <span style={{fontSize:10,padding:"2px 6px",borderRadius:10,background:"#fffbeb",color:"#d97706",border:"1px solid #fde68a",fontWeight:700}}>🟡 あと{diff}日</span>;
    return <span style={{fontSize:10,padding:"2px 6px",borderRadius:10,background:"#f0fdf4",color:"#059669",border:"1px solid #bbf7d0"}}>✓ {diff}日後</span>;
  };

  return(
    <div className="fade-in">
      {/* サマリーカード */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
        {[
          {l:"整備済",v:done,c:"#059669",bg:"#f0fdf4",b:"#bbf7d0"},
          {l:"整備中",v:inprog,c:"#d97706",bg:"#fffbeb",b:"#fde68a"},
          {l:"未整備",v:allDocs.length-done-inprog,c:"#ef4444",bg:"#fef2f2",b:"#fecaca"},
          {l:"期限切れ",v:expired,c:"#ef4444",bg:"#fef2f2",b:"#fecaca"},
          {l:"期限間近",v:expiringSoon,c:"#d97706",bg:"#fffbeb",b:"#fde68a"},
        ].map(k=>(
          <div key={k.l} style={{background:k.bg,border:"1px solid "+k.b,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
            <div style={{fontSize:11,color:k.c,fontWeight:600,marginBottom:2}}>{k.l}</div>
            <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
            <div style={{fontSize:10,color:"#94a3b8"}}>/ {allDocs.length}件</div>
          </div>
        ))}
        <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#2563eb",fontWeight:600,marginBottom:2}}>整備率</div>
          <div style={{fontSize:22,fontWeight:800,color:"#2563eb"}}>{pct}%</div>
          <div style={{height:4,background:"#bfdbfe",borderRadius:2,marginTop:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:pct+"%",background:"#2563eb",borderRadius:2,transition:"width .4s"}}/>
          </div>
        </div>
      </div>

      {/* フィルター */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
        {["全て","整備済","整備中","未整備"].map(s=>(
          <button key={s} className="btn btn-sm" style={{background:filterStatus===s?"#2563eb":"#f1f5f9",color:filterStatus===s?"white":"#475569",border:"none",fontSize:12}} onClick={()=>setFilterStatus(s)}>{s}</button>
        ))}
        <button className="btn btn-sm" style={{background:filterExpiry?"#ef4444":"#f1f5f9",color:filterExpiry?"white":"#475569",border:"none",fontSize:12}} onClick={()=>setFilterExpiry(v=>!v)}>⚠️ 期限問題のみ</button>
      </div>

      {!loaded ? <div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>読み込み中...</div> :
      filteredCats.length===0 ? <div style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>該当する書類がありません</div> :
      filteredCats.map(cat=>(
        <div key={cat.cat} style={{marginBottom:20}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:8,paddingBottom:6,borderBottom:"2px solid #f1f5f9",display:"flex",alignItems:"center",gap:6}}>
            {cat.icon} {cat.cat}
            <span style={{fontSize:11,color:"#94a3b8",fontWeight:400}}>（{cat.items.length}件）</span>
          </div>
          <div style={{display:"grid",gap:8}}>
            {cat.items.map(doc=>{
              const s = docStatus[doc.id]||{status:"未整備"};
              const st = s.status||"未整備";
              const color = st==="整備済"?"#059669":st==="整備中"?"#d97706":"#ef4444";
              const bg = st==="整備済"?"#f0fdf4":st==="整備中"?"#fffbeb":"#fef2f2";
              const border = st==="整備済"?"#bbf7d0":st==="整備中"?"#fde68a":"#fecaca";
              const exState = getExpiryState(doc.id);
              const isExpired = exState==="expired";
              const isExpanded = expandedId===doc.id;
              return(
                <div key={doc.id} style={{background:isExpired?"#fef2f2":bg,borderRadius:10,border:`1px solid ${isExpired?"#fca5a5":border}`,overflow:"hidden"}}>
                  {/* 折りたたみヘッダー */}
                  <div
                    style={{padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}
                    onClick={()=>setExpandedId(isExpanded?null:doc.id)}
                  >
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:2}}>
                        <span style={{fontWeight:600,fontSize:13}}>{doc.name}</span>
                        {expiryBadge(doc.id)}
                      </div>
                      <div style={{fontSize:11,color:"#64748b",display:"flex",gap:10,flexWrap:"wrap"}}>
                        <span>📦 保管: {doc.keep}</span>
                        <span>🔄 更新: {doc.freq}</span>
                        {s.assignee&&<span>👤 担当: {s.assignee}</span>}
                        {s.updated_at&&<span>📅 更新日: {s.updated_at}</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                      <span style={{fontSize:11,padding:"3px 8px",borderRadius:8,background:"white",color,border:`1px solid ${color}`,fontWeight:700}}>{st}</span>
                      <span style={{color:"#94a3b8",fontSize:14}}>{isExpanded?"▲":"▼"}</span>
                    </div>
                  </div>

                  {/* 展開エリア */}
                  {isExpanded&&(
                    <div style={{padding:"0 14px 14px",borderTop:"1px solid "+border,paddingTop:12,display:"grid",gap:10}}>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                        {/* ステータス */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>ステータス</label>
                          <select className="input" style={{fontSize:13,color}} value={st} onChange={e=>updateMulti(doc.id,{status:e.target.value,updated_at:today})}>
                            <option>未整備</option><option>整備中</option><option>整備済</option>
                          </select>
                        </div>
                        {/* 担当者 */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>担当者</label>
                          <select className="input" style={{fontSize:13}} value={s.assignee||""} onChange={e=>update(doc.id,"assignee",e.target.value)}>
                            <option value="">選択してください</option>
                            {staffList.map(st=><option key={st.id} value={st.name}>{st.name}</option>)}
                            <option value="管理者">管理者</option>
                            <option value="サービス管理責任者">サービス管理責任者</option>
                          </select>
                        </div>
                        {/* 更新日 */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>最終更新日</label>
                          <input className="input" type="date" style={{fontSize:13}} value={s.updated_at||""} onChange={e=>update(doc.id,"updated_at",e.target.value)}/>
                        </div>
                        {/* 有効期限 */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>
                            有効期限
                            {s.expiry_date&&<span style={{marginLeft:4,fontSize:10,color:exState==="expired"?"#ef4444":exState==="soon"?"#ef4444":exState==="warn"?"#d97706":"#059669"}}>
                              {exState==="expired"?"（期限切れ）":exState==="soon"||exState==="warn"?"（間近）":"（有効）"}
                            </span>}
                          </label>
                          <input className="input" type="date" style={{fontSize:13,borderColor:exState==="expired"?"#ef4444":exState==="soon"?"#f97316":""}} value={s.expiry_date||""} onChange={e=>update(doc.id,"expiry_date",e.target.value)}/>
                        </div>
                        {/* 次回更新予定 */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>次回更新予定日</label>
                          <input className="input" type="date" style={{fontSize:13}} value={s.next_update||""} onChange={e=>update(doc.id,"next_update",e.target.value)}/>
                        </div>
                        {/* 保管場所 */}
                        <div>
                          <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>保管場所</label>
                          <input className="input" type="text" style={{fontSize:13}} placeholder="例: 事務室キャビネット2段目" value={s.location||""} onChange={e=>update(doc.id,"location",e.target.value)}/>
                        </div>
                      </div>
                      {/* 備考 */}
                      <div>
                        <label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>備考・メモ</label>
                        <textarea className="input" rows={2} style={{fontSize:12,resize:"vertical",width:"100%",boxSizing:"border-box"}} placeholder="特記事項・引き継ぎ事項・関連書類の場所など" value={s.memo||""} onChange={e=>update(doc.id,"memo",e.target.value)}/>
                      </div>
                      {s.updated_at&&<div style={{fontSize:11,color:"#94a3b8",textAlign:"right"}}>最終保存: {s.updated_at}</div>}
                    </div>
                  )}
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

function UserLoginScreen({onBack, onLogin}) {
  const [users, setUsers] = useState([]);
  const [selId, setSelId] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  useEffect(()=>{ supabase.from("users").select("id,name,access_code,room,unit,status").eq("status","在籍").then(({data})=>setUsers(data||[])); },[]);
  const login = () => {
    const u = selId ? users.find(x=>x.id===parseInt(selId)) : null;
    if(!u){ setErr("お名前を選択してください"); return; }
    if(!u.access_code){ setErr("アクセスコードが設定されていません。スタッフへお問い合わせください"); return; }
    if(u.access_code !== code.trim()){ setErr("アクセスコードが正しくありません"); return; }
    onLogin(u);
  };
  return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#064e3b,#0f172a)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{width:64,height:64,borderRadius:18,background:"linear-gradient(135deg,#059669,#0d9488)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px"}}>🏡</div>
        <div style={{fontWeight:800,fontSize:17,color:"#0f172a",marginBottom:4}}>利用者ポータル</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:24}}>名前を選んでログイン</div>
        <div style={{textAlign:"left",marginBottom:10}}>
          <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>お名前</label>
          <select className="input" style={{fontSize:15}} value={selId} onChange={e=>{setSelId(e.target.value);setErr("");}}>
            <option value="">名前を選択してください</option>
            {users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div style={{textAlign:"left",marginBottom:10}}>
          <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>アクセスコード</label>
          <input className="input" type="password" maxLength={8} placeholder="コードを入力" style={{textAlign:"center",fontSize:22,letterSpacing:8}} value={code} onChange={e=>{setCode(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&login()}/>
        </div>
        {err&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8,textAlign:"left"}}>{err}</div>}
        <button style={{width:"100%",padding:"13px",fontSize:15,background:"linear-gradient(135deg,#059669,#0d9488)",color:"white",border:"none",borderRadius:12,cursor:"pointer",fontWeight:700,marginBottom:10,marginTop:6}} onClick={login}>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={onBack}>← 戻る</button>
      </div>
    </div>
  );
}

function UserPortalScreen({user, onBack}) {
  const [notices, setNotices] = useState([]);
  const [myMsgs, setMyMsgs] = useState([]);
  const [staffReplies, setStaffReplies] = useState([]);
  const [tab, setTab] = useState("home");
  const [msgText, setMsgText] = useState("");
  const [msgCat, setMsgCat] = useState("体調報告");
  const [sent, setSent] = useState(false);
  const [plans, setPlans] = useState([]);
  const [health, setHealth] = useState([]);
  const [myMedData, setMyMedData] = useState({meds:[],notebook:[],logs:[]});
  const _tn=new Date();const today=_tn.getFullYear()+"-"+String(_tn.getMonth()+1).padStart(2,"0")+"-"+String(_tn.getDate()).padStart(2,"0");

  useEffect(()=>{
    Promise.all([
      supabase.from("app_settings").select("value").eq("key","user_notices").single(),
      supabase.from("user_messages").select("*").eq("user_id",user.id).order("created_at",{ascending:false}),
      supabase.from("support_plans").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).limit(3),
      supabase.from("health_records").select("*").eq("user_id",user.id).order("date",{ascending:false}).limit(7),
      supabase.from("app_settings").select("value").eq("key","medication_data").single(),
    ]).then(([n,m,p,h,med])=>{
      if(n.data?.value){try{setNotices(JSON.parse(n.data.value));}catch(e){setNotices([]);}}
      setMyMsgs(m.data||[]);
      setPlans(p.data||[]);
      setHealth(h.data||[]);
      if(med.data?.value){try{const all=JSON.parse(med.data.value);setMyMedData(all[user.id]||{meds:[],notebook:[],logs:[]});}catch(e){}}
    });
  },[user.id]);

  const sendMsg = async() => {
    if(!msgText.trim()){alert("メッセージを入力してください");return;}
    await supabase.from("user_messages").insert({user_id:user.id,user_name:user.name,access_code:user.access_code,message:msgText,category:msgCat,is_read:false});
    setSent(true); setMsgText("");
    const {data} = await supabase.from("user_messages").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setMyMsgs(data||[]);
  };

  const unreadReplies = myMsgs.filter(m=>m.staff_reply&&!m.reply_read).length;

  const PORTAL_TABS = [
    {id:"home",icon:"🏠",label:"ホーム"},
    {id:"notice",icon:"📢",label:"お知らせ"},
    {id:"message",icon:"💬",label:"メッセージ"},
    {id:"health",icon:"❤️",label:"健康記録"},
    {id:"medicine",icon:"💊",label:"お薬手帳"},
    {id:"plan",icon:"📋",label:"支援計画"},
  ];

  return(
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"#f0fdf4",display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      {/* Header */}
      <header style={{background:"linear-gradient(135deg,#059669,#0d9488)",padding:"14px 20px",paddingTop:"calc(14px + env(safe-area-inset-top))",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:22}}>🏡</div>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:"white"}}>{user.name} さん</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{user.unit} {user.room}号室</div>
          </div>
        </div>
        <button style={{background:"rgba(255,255,255,.2)",border:"none",color:"white",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}} onClick={onBack}>ログアウト</button>
      </header>

      {/* Tab nav */}
      <div style={{background:"white",borderBottom:"1px solid #d1fae5",display:"flex",overflowX:"auto",flexShrink:0}}>
        {PORTAL_TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:"0 0 auto",padding:"10px 16px",border:"none",background:"none",borderBottom:tab===t.id?"3px solid #059669":"3px solid transparent",color:tab===t.id?"#059669":"#64748b",fontWeight:tab===t.id?700:400,fontSize:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:18}}>{t.icon}</span><span>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>

        {/* ホーム */}
        {tab==="home"&&(
          <div className="fade-in">
            <div style={{background:"linear-gradient(135deg,#059669,#0d9488)",borderRadius:16,padding:"20px",color:"white",marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:14,marginBottom:4}}>{today}</div>
              <div style={{fontSize:22,fontWeight:800}}>こんにちは、{user.name}さん 👋</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[
                {icon:"📢",label:"お知らせ",count:notices.length,color:"#f59e0b",onClick:()=>setTab("notice")},
                {icon:"💬",label:"未読返信",count:unreadReplies,color:"#2563eb",onClick:()=>setTab("message")},
                {icon:"❤️",label:"健康記録",count:health.length+"件",color:"#ef4444",onClick:()=>setTab("health")},
                {icon:"📋",label:"支援計画",count:plans.length+"件",color:"#7c3aed",onClick:()=>setTab("plan")},
              ].map((c,i)=>(
                <div key={i} onClick={c.onClick} style={{background:"white",borderRadius:14,padding:"16px 12px",textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,.06)",cursor:"pointer",borderTop:`4px solid ${c.color}`}}>
                  <div style={{fontSize:24,marginBottom:4}}>{c.icon}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>{c.label}</div>
                  <div style={{fontSize:18,fontWeight:800,color:c.color}}>{c.count}</div>
                </div>
              ))}
            </div>
            {/* 最新お知らせプレビュー */}
            {notices.length>0&&(
              <div style={{background:"white",borderRadius:14,padding:"14px 16px",marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"#059669"}}>📢 最新のお知らせ</div>
                {notices.slice(0,2).map((n,i)=>(
                  <div key={i} style={{borderLeft:"3px solid #059669",paddingLeft:10,marginBottom:8}}>
                    <div style={{fontSize:13,fontWeight:600}}>{n.title}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>{n.date}</div>
                  </div>
                ))}
              </div>
            )}
            {/* メッセージ送信ボタン */}
            <button style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#2563eb,#0ea5e9)",color:"white",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={()=>setTab("message")}>💬 スタッフにメッセージを送る</button>
          </div>
        )}

        {/* お知らせ */}
        {tab==="notice"&&(
          <div className="fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>📢 運営からのお知らせ</div>
            {notices.length===0
              ?<div style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}>現在お知らせはありません</div>
              :notices.map((n,i)=>(
                <div key={i} style={{background:"white",borderRadius:14,padding:"16px",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
                  {n.important&&<span style={{background:"#ef4444",color:"white",fontSize:10,fontWeight:700,borderRadius:4,padding:"2px 6px",marginBottom:6,display:"inline-block"}}>重要</span>}
                  <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{n.title}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginBottom:8}}>{n.date}</div>
                  <div style={{fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{n.body}</div>
                </div>
              ))
            }
          </div>
        )}

        {/* メッセージ */}
        {tab==="message"&&(
          <div className="fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>💬 スタッフへのメッセージ</div>
            {sent&&<div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"10px 14px",marginBottom:12,color:"#059669",fontSize:13,fontWeight:600}}>✅ 送信しました！スタッフが確認します。</div>}
            <div style={{background:"white",borderRadius:14,padding:"16px",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>新しいメッセージ</div>
              <div style={{marginBottom:8}}>
                <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>種類</label>
                <select className="input" value={msgCat} onChange={e=>setMsgCat(e.target.value)}>
                  {["体調報告","外出連絡","相談・お願い","緊急連絡","うれしかったこと","困っていること","その他"].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>メッセージ</label>
                <textarea className="textarea" style={{minHeight:100}} value={msgText} onChange={e=>setMsgText(e.target.value)} placeholder="スタッフへ伝えたいことを書いてください"/>
              </div>
              <button style={{width:"100%",padding:"12px",background:"linear-gradient(135deg,#2563eb,#0ea5e9)",color:"white",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={()=>{sendMsg();setSent(false);}}>送信する 📤</button>
            </div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"#475569"}}>過去のメッセージ</div>
            {myMsgs.length===0
              ?<div style={{textAlign:"center",padding:"20px",color:"#94a3b8"}}>まだメッセージはありません</div>
              :myMsgs.map((m,i)=>(
                <div key={i} style={{background:"white",borderRadius:12,padding:"12px 14px",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:11,background:"#eff6ff",color:"#2563eb",borderRadius:4,padding:"2px 6px",fontWeight:600}}>{m.category}</span>
                    <span style={{fontSize:11,color:"#94a3b8"}}>{m.created_at?.slice(0,10)}</span>
                  </div>
                  <div style={{fontSize:13,marginBottom:m.staff_reply?8:0}}>{m.message}</div>
                  {m.staff_reply&&(
                    <div style={{background:"#f0fdf4",borderRadius:8,padding:"8px 10px",borderLeft:"3px solid #059669"}}>
                      <div style={{fontSize:11,color:"#059669",fontWeight:700,marginBottom:3}}>💬 スタッフより</div>
                      <div style={{fontSize:13}}>{m.staff_reply}</div>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}

        {/* 健康記録 */}
        {tab==="health"&&(
          <div className="fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>❤️ 健康記録</div>
            {health.length===0
              ?<div style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}>記録がありません</div>
              :health.map((h,i)=>(
                <div key={i} style={{background:"white",borderRadius:14,padding:"14px 16px",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#059669",marginBottom:8}}>{h.date}</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:8}}>
                    {h.temperature&&<div style={{textAlign:"center",background:"#fef3c7",borderRadius:8,padding:"8px"}}><div style={{fontSize:10,color:"#92400e"}}>体温</div><div style={{fontWeight:700,fontSize:15}}>{h.temperature}℃</div></div>}
                    {h.bp_high&&<div style={{textAlign:"center",background:"#eff6ff",borderRadius:8,padding:"8px"}}><div style={{fontSize:10,color:"#1e40af"}}>血圧</div><div style={{fontWeight:700,fontSize:14}}>{h.bp_high}/{h.bp_low}</div></div>}
                    {h.pulse&&<div style={{textAlign:"center",background:"#fdf2f8",borderRadius:8,padding:"8px"}}><div style={{fontSize:10,color:"#9d174d"}}>脈拍</div><div style={{fontWeight:700,fontSize:15}}>{h.pulse}</div></div>}
                    {h.weight&&<div style={{textAlign:"center",background:"#f0fdf4",borderRadius:8,padding:"8px"}}><div style={{fontSize:10,color:"#14532d"}}>体重</div><div style={{fontWeight:700,fontSize:15}}>{h.weight}kg</div></div>}
                  </div>
                  {h.other_note&&<div style={{fontSize:12,color:"#64748b",marginTop:8}}>{h.other_note}</div>}
                </div>
              ))
            }
          </div>
        )}

        {/* お薬手帳 */}
        {tab==="medicine"&&(
          <div className="fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:6}}>💊 お薬手帳</div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:14}}>写真を撮影してアップロードしてください。スタッフが確認します。</div>

            {/* アップロードボタン */}
            <label style={{display:"block",marginBottom:16}}>
              <div style={{background:"#059669",color:"white",borderRadius:12,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:14,fontWeight:700}}>
                📷 写真を追加する
              </div>
              <input type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={async e=>{
                const file=e.target.files[0];
                if(!file) return;
                if(file.size>5*1024*1024){alert("ファイルサイズが大きすぎます。3MB以下のファイルを選択してください");return;}
                const reader=new FileReader();
                reader.onload=async ev=>{
                  const entry={id:Date.now(),date:today,img:ev.target.result,name:file.name};
                  const {data:existing}=await supabase.from("app_settings").select("value").eq("key","medication_data").single();
                  let all={};
                  if(existing?.value){try{all=JSON.parse(existing.value);}catch(e){}}
                  const ud=all[user.id]||{meds:[],notebook:[],logs:[]};
                  const updated={...all,[user.id]:{...ud,notebook:[...(ud.notebook||[]),entry]}};
                  await supabase.from("app_settings").upsert({key:"medication_data",value:JSON.stringify(updated)},{onConflict:"key"});
                  setMyMedData({...ud,notebook:[...(ud.notebook||[]),entry]});
                };
                reader.readAsDataURL(file);
                e.target.value="";
              }}/>
            </label>

            {/* 処方薬一覧（読み取りのみ） */}
            {(myMedData.meds||[]).length>0&&(
              <div style={{marginBottom:16}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:8,color:"#0f172a"}}>📋 処方されているお薬</div>
                {(myMedData.meds||[]).map((med,i)=>(
                  <div key={i} style={{background:"white",borderRadius:12,padding:"12px 14px",marginBottom:8,boxShadow:"0 1px 4px rgba(0,0,0,.06)",border:"1px solid #e2e8f0"}}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{med.name}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {med.dose&&<span style={{fontSize:11,background:"#eff6ff",color:"#2563eb",borderRadius:4,padding:"1px 6px"}}>{med.dose}</span>}
                      {med.timing&&<span style={{fontSize:11,background:"#fef3c7",color:"#d97706",borderRadius:4,padding:"1px 6px"}}>⏰ {med.timing}</span>}
                      {med.route&&<span style={{fontSize:11,background:"#f0fdf4",color:"#059669",borderRadius:4,padding:"1px 6px"}}>{med.route}</span>}
                    </div>
                    {med.note&&<div style={{fontSize:12,color:"#ef4444",marginTop:6,background:"#fef2f2",borderRadius:6,padding:"4px 8px"}}>⚠️ {med.note}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* 写真一覧 */}
            <div style={{fontWeight:700,fontSize:14,marginBottom:8,color:"#0f172a"}}>📷 アップロードした写真</div>
            {(myMedData.notebook||[]).length===0
              ?<div style={{textAlign:"center",padding:"30px",color:"#94a3b8",background:"white",borderRadius:12}}>まだ写真がありません<br/><span style={{fontSize:12}}>上のボタンから追加できます</span></div>
              :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
                {[...(myMedData.notebook||[])].reverse().map((entry,i)=>(
                  <div key={i} style={{borderRadius:12,overflow:"hidden",border:"1px solid #e2e8f0",background:"white",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
                    <img src={entry.img} alt={entry.name} style={{width:"100%",height:130,objectFit:"cover",display:"block"}} onClick={()=>window.open(entry.img,"_blank")}/>
                    <div style={{padding:"6px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>{entry.date}</div></div>
                  </div>
                ))}
              </div>
            }
          </div>
        )}

        {/* 支援計画 */}
        {tab==="plan"&&(
          <div className="fade-in">
            <div style={{fontWeight:800,fontSize:17,marginBottom:14}}>📋 支援計画</div>
            {plans.length===0
              ?<div style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}>支援計画がありません</div>
              :plans.map((p,i)=>(
                <div key={i} style={{background:"white",borderRadius:14,padding:"14px 16px",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontWeight:700,fontSize:14}}>{p.plan_date||p.created_at?.slice(0,10)}</span>
                    <span style={{fontSize:11,background:"#eff6ff",color:"#2563eb",borderRadius:4,padding:"2px 6px"}}>{p.status||"作成済"}</span>
                  </div>
                  {p.long_term_goal&&<div style={{marginBottom:6}}><span style={{fontSize:11,color:"#94a3b8"}}>長期目標：</span><span style={{fontSize:13}}>{p.long_term_goal}</span></div>}
                  {p.short_term_goal&&<div style={{marginBottom:6}}><span style={{fontSize:11,color:"#94a3b8"}}>短期目標：</span><span style={{fontSize:13}}>{p.short_term_goal}</span></div>}
                  {p.note&&<div style={{fontSize:12,color:"#64748b",marginTop:4}}>{p.note}</div>}
                </div>
              ))
            }
          </div>
        )}

      </div>
    </div>
  );
}

// ── 管理者：お知らせ管理（利用者ポータル用） ──
// ── お薬管理（管理者・スタッフ用） ──
function MedicationTab({users, isAdmin}) {
  const _tn=new Date();const today=_tn.getFullYear()+"-"+String(_tn.getMonth()+1).padStart(2,"0")+"-"+String(_tn.getDate()).padStart(2,"0");
  const [selUser, setSelUser] = useState("");
  const [medData, setMedData] = useState({}); // keyed by userId
  const [loaded, setLoaded] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [editMed, setEditMed] = useState(null); // {userId, medIdx} or null
  const [medForm, setMedForm] = useState({});
  const [addingMed, setAddingMed] = useState(false);
  const [newMed, setNewMed] = useState({name:"",dose:"",timing:"",route:"",start_date:"",end_date:"",prescriber:"",pharmacy:"",note:""});
  const [logForm, setLogForm] = useState({});
  const [addingLog, setAddingLog] = useState(null); // userId
  const [activeTab, setActiveTab] = useState("meds"); // "meds"|"notebook"|"log"

  const TIMINGS = ["朝食後","昼食後","夕食後","就寝前","朝夕食後","毎食後","頓服","その他"];
  const ROUTES = ["内服","外用","点眼","点耳","吸入","注射","その他"];

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","medication_data").single().then(({data})=>{
      if(data?.value){try{setMedData(JSON.parse(data.value));}catch(e){setMedData({});}}
      setLoaded(true);
    });
  },[]);

  const saveMedData = async(newD)=>{
    setMedData(newD);
    await supabase.from("app_settings").upsert({key:"medication_data",value:JSON.stringify(newD)},{onConflict:"key"});
  };

  const getUserData = (uid) => medData[uid]||{meds:[],notebook:[],logs:[]};

  const addMed = async(uid)=>{
    if(!newMed.name.trim()){alert("薬品名を入力してください");return;}
    const ud = getUserData(uid);
    const updated = {...medData,[uid]:{...ud,meds:[...(ud.meds||[]),{...newMed,id:Date.now()}]}};
    await saveMedData(updated);
    setNewMed({name:"",dose:"",timing:"",route:"",start_date:"",end_date:"",prescriber:"",pharmacy:"",note:""});
    setAddingMed(false);
  };

  const deleteMed = async(uid,medId)=>{
    if(!window.confirm("本当に削除しますか？この操作は元に戻せません")) return;
    const ud = getUserData(uid);
    const updated = {...medData,[uid]:{...ud,meds:(ud.meds||[]).filter(m=>m.id!==medId)}};
    await saveMedData(updated);
  };

  const addLog = async(uid)=>{
    if(!logForm.date||!logForm.timing){alert("日付と時間帯を入力してください");return;}
    const ud = getUserData(uid);
    const log = {...logForm,id:Date.now(),staff:logForm.staff||""};
    const updated = {...medData,[uid]:{...ud,logs:[...(ud.logs||[]),log]}};
    await saveMedData(updated);
    setLogForm({date:today,timing:"朝食後",done:true,staff:"",note:""});
    setAddingLog(null);
  };

  const addNotebook = async(uid, imgData, imgName)=>{
    const ud = getUserData(uid);
    const entry = {id:Date.now(),date:today,img:imgData,name:imgName};
    const updated = {...medData,[uid]:{...ud,notebook:[...(ud.notebook||[]),entry]}};
    await saveMedData(updated);
  };

  const deleteNotebook = async(uid, entryId)=>{
    if(!window.confirm("本当に削除しますか？この操作は元に戻せません")) return;
    const ud = getUserData(uid);
    const updated = {...medData,[uid]:{...ud,notebook:(ud.notebook||[]).filter(e=>e.id!==entryId)}};
    await saveMedData(updated);
  };

  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;

  const filteredUsers = selUser ? users.filter(u=>u.id===parseInt(selUser)) : users.filter(u=>u.status==="在籍");

  return(
    <div className="fade-in">
      <PH title="お薬管理" sub="お薬手帳・服薬管理・服薬記録"/>
      <div style={{marginBottom:14}}>
        <select className="input" style={{maxWidth:200}} value={selUser} onChange={e=>setSelUser(e.target.value)}>
          <option value="">全利用者（在籍）</option>
          {users.filter(u=>u.status==="在籍").map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      {filteredUsers.map(user=>{
        const ud = getUserData(user.id);
        const meds = ud.meds||[];
        const notebook = ud.notebook||[];
        const logs = ud.logs||[];
        const todayLogs = logs.filter(l=>l.date===today);
        const isOpen = viewUser===user.id;

        return(
          <div key={user.id} className="card" style={{marginBottom:12}}>
            {/* ユーザーヘッダー */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setViewUser(isOpen?null:user.id)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:14,flexShrink:0}}>{user.name.slice(0,1)}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{user.name}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{user.unit} {user.room}号室 · 薬 {meds.length}種 · 写真 {notebook.length}枚</div>
                </div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {todayLogs.length>0&&<span style={{fontSize:11,background:"#ecfdf5",color:"#059669",borderRadius:6,padding:"2px 8px",fontWeight:600}}>✓ 本日記録済</span>}
                <span style={{color:"#94a3b8",fontSize:18}}>{isOpen?"▲":"▼"}</span>
              </div>
            </div>

            {isOpen&&(
              <div style={{marginTop:14,borderTop:"1px solid #f1f5f9",paddingTop:14}}>
                {/* サブタブ */}
                <div style={{display:"flex",gap:6,marginBottom:14}}>
                  {[["meds","💊 処方薬"],["notebook","📷 お薬手帳"],["log","📋 服薬記録"]].map(([id,label])=>(
                    <button key={id} className="btn btn-sm" style={{background:activeTab===id?"#2563eb":"#f1f5f9",color:activeTab===id?"white":"#475569",border:"none"}} onClick={()=>setActiveTab(id)}>{label}</button>
                  ))}
                </div>

                {/* 処方薬一覧 */}
                {activeTab==="meds"&&(
                  <div>
                    {isAdmin&&<button className="btn btn-primary btn-sm" style={{marginBottom:10}} onClick={()=>setAddingMed(true)}>＋ 薬を追加</button>}
                    {addingMed&&isAdmin&&(
                      <div style={{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:10,padding:14,marginBottom:12}}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>新規処方薬登録</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                          <div style={{gridColumn:"1/-1"}}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>薬品名 *</label><input className="input" value={newMed.name} onChange={e=>setNewMed(v=>({...v,name:e.target.value}))} placeholder="例：アムロジピン錠5mg"/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>用量</label><input className="input" value={newMed.dose} onChange={e=>setNewMed(v=>({...v,dose:e.target.value}))} placeholder="例：1錠"/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>服用タイミング</label>
                            <select className="input" value={newMed.timing} onChange={e=>setNewMed(v=>({...v,timing:e.target.value}))}>
                              <option value="">選択...</option>{TIMINGS.map(t=><option key={t}>{t}</option>)}
                            </select>
                          </div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>投与経路</label>
                            <select className="input" value={newMed.route} onChange={e=>setNewMed(v=>({...v,route:e.target.value}))}>
                              <option value="">選択...</option>{ROUTES.map(r=><option key={r}>{r}</option>)}
                            </select>
                          </div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>開始日</label><input className="input" type="date" value={newMed.start_date} onChange={e=>setNewMed(v=>({...v,start_date:e.target.value}))}/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>終了日</label><input className="input" type="date" value={newMed.end_date} onChange={e=>setNewMed(v=>({...v,end_date:e.target.value}))}/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>処方医院</label><input className="input" value={newMed.prescriber} onChange={e=>setNewMed(v=>({...v,prescriber:e.target.value}))}/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>調剤薬局</label><input className="input" value={newMed.pharmacy} onChange={e=>setNewMed(v=>({...v,pharmacy:e.target.value}))}/></div>
                          <div style={{gridColumn:"1/-1"}}><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考・注意事項</label><textarea className="textarea" style={{minHeight:60}} value={newMed.note} onChange={e=>setNewMed(v=>({...v,note:e.target.value}))}/></div>
                        </div>
                        <div style={{display:"flex",gap:8}}>
                          <button className="btn btn-primary btn-sm" onClick={()=>addMed(user.id)}>登録</button>
                          <button className="btn btn-secondary btn-sm" onClick={()=>setAddingMed(false)}>キャンセル</button>
                        </div>
                      </div>
                    )}
                    {meds.length===0?<div style={{textAlign:"center",padding:"20px",color:"#94a3b8"}}>処方薬が登録されていません</div>
                    :meds.map(med=>(
                      <div key={med.id} style={{background:"#f8fafc",borderRadius:10,padding:"12px 14px",marginBottom:8,border:"1px solid #e2e8f0"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:700,fontSize:14,color:"#0f172a",marginBottom:4}}>{med.name}</div>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>
                              {med.dose&&<span style={{fontSize:11,background:"#eff6ff",color:"#2563eb",borderRadius:4,padding:"1px 6px"}}>{med.dose}</span>}
                              {med.timing&&<span style={{fontSize:11,background:"#fef3c7",color:"#d97706",borderRadius:4,padding:"1px 6px"}}>⏰ {med.timing}</span>}
                              {med.route&&<span style={{fontSize:11,background:"#f0fdf4",color:"#059669",borderRadius:4,padding:"1px 6px"}}>{med.route}</span>}
                            </div>
                            <div style={{fontSize:11,color:"#64748b"}}>
                              {med.start_date&&`開始: ${med.start_date}`}{med.end_date&&` 〜 ${med.end_date}`}
                              {med.prescriber&&` | ${med.prescriber}`}{med.pharmacy&&` | ${med.pharmacy}`}
                            </div>
                            {med.note&&<div style={{fontSize:12,color:"#ef4444",marginTop:4,background:"#fef2f2",borderRadius:6,padding:"4px 8px"}}>⚠️ {med.note}</div>}
                          </div>
                          {isAdmin&&<button className="btn btn-red btn-sm" style={{marginLeft:8,flexShrink:0}} onClick={()=>deleteMed(user.id,med.id)}>削除</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* お薬手帳写真 */}
                {activeTab==="notebook"&&(
                  <div>
                    <div style={{marginBottom:10}}>
                      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>📷 写真を追加（利用者がポータルからアップロードした写真もここに表示されます）</label>
                      <input type="file" accept="image/*" style={{fontSize:13}} onChange={e=>{
                        const file=e.target.files[0];
                        if(!file) return;
                        if(file.size>5*1024*1024){alert("ファイルサイズが大きすぎます。3MB以下のファイルを選択してください");return;}
                        const reader=new FileReader();
                        reader.onload=ev=>{ addNotebook(user.id, ev.target.result, file.name); e.target.value=""; };
                        reader.readAsDataURL(file);
                      }}/>
                    </div>
                    {notebook.length===0?<div style={{textAlign:"center",padding:"20px",color:"#94a3b8"}}>お薬手帳の写真がありません</div>
                    :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10}}>
                      {notebook.map(entry=>(
                        <div key={entry.id} style={{borderRadius:10,overflow:"hidden",border:"1px solid #e2e8f0",background:"white"}}>
                          <img src={entry.img} alt={entry.name} style={{width:"100%",height:140,objectFit:"cover",display:"block"}} onClick={()=>window.open(entry.img,"_blank")}/>
                          <div style={{padding:"6px 8px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div><div style={{fontSize:11,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:110}}>{entry.name||"写真"}</div><div style={{fontSize:10,color:"#94a3b8"}}>{entry.date}</div></div>
                            {isAdmin&&<button className="btn btn-red btn-sm" style={{padding:"2px 6px"}} onClick={()=>deleteNotebook(user.id,entry.id)}>削除</button>}
                          </div>
                        </div>
                      ))}
                    </div>}
                  </div>
                )}

                {/* 服薬記録 */}
                {activeTab==="log"&&(
                  <div>
                    <button className="btn btn-primary btn-sm" style={{marginBottom:10}} onClick={()=>{setAddingLog(user.id);setLogForm({date:today,timing:"朝食後",done:true,staff:"",note:""});}}>＋ 服薬記録を追加</button>
                    {addingLog===user.id&&(
                      <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:14,marginBottom:12}}>
                        <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>服薬記録</div>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label><input className="input" type="date" value={logForm.date||today} onChange={e=>setLogForm(v=>({...v,date:e.target.value}))}/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時間帯</label>
                            <select className="input" value={logForm.timing||""} onChange={e=>setLogForm(v=>({...v,timing:e.target.value}))}>
                              <option value="">選択...</option>{TIMINGS.map(t=><option key={t}>{t}</option>)}
                            </select>
                          </div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当スタッフ</label><input className="input" value={logForm.staff||""} onChange={e=>setLogForm(v=>({...v,staff:e.target.value}))}/></div>
                          <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>備考</label><input className="input" value={logForm.note||""} onChange={e=>setLogForm(v=>({...v,note:e.target.value}))}/></div>
                        </div>
                        <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",marginBottom:10}}>
                          <input type="checkbox" checked={logForm.done!==false} onChange={e=>setLogForm(v=>({...v,done:e.target.checked}))} style={{width:16,height:16}}/>
                          <span style={{fontSize:13,fontWeight:600}}>服薬確認済み</span>
                        </label>
                        <div style={{display:"flex",gap:8}}>
                          <button className="btn btn-primary btn-sm" onClick={()=>addLog(user.id)}>記録</button>
                          <button className="btn btn-secondary btn-sm" onClick={()=>setAddingLog(null)}>キャンセル</button>
                        </div>
                      </div>
                    )}
                    {logs.length===0?<div style={{textAlign:"center",padding:"20px",color:"#94a3b8"}}>服薬記録がありません</div>
                    :<div style={{overflowX:"auto"}}>
                      <table>
                        <thead><tr><th>日付</th><th>時間帯</th><th>確認</th><th>担当</th><th>備考</th></tr></thead>
                        <tbody>
                          {[...logs].reverse().slice(0,30).map((l,i)=>(
                            <tr key={l.id||i}>
                              <td className="mono" style={{fontSize:12}}>{l.date}</td>
                              <td><span style={{fontSize:12,background:"#fef3c7",color:"#d97706",borderRadius:4,padding:"1px 6px"}}>{l.timing}</span></td>
                              <td style={{textAlign:"center"}}>{l.done!==false?"✅":"❌"}</td>
                              <td style={{fontSize:12}}>{l.staff}</td>
                              <td style={{fontSize:12,color:"#64748b"}}>{l.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MsgCard({m, isAdmin, loadAll, del}) {
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  return(
    <div className="card" style={{borderLeft:`4px solid ${m.is_read?"#e2e8f0":"#2563eb"}`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontWeight:700,fontSize:14}}>{m.user_name}</div>
          <span className="tag" style={{background:m.category==="緊急連絡"?"#fee2e2":"#ecfdf5",color:m.category==="緊急連絡"?"#ef4444":"#059669"}}>{m.category}</span>
          {!m.is_read&&<span className="tag" style={{background:"#2563eb",color:"white"}}>未読</span>}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
          <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{new Date(m.created_at).toLocaleString("ja-JP",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
          {!m.is_read&&<button className="btn btn-green btn-sm" onClick={async()=>{await supabase.from("user_messages").update({is_read:true}).eq("id",m.id);loadAll();}}>既読</button>}
          {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>setReplying(v=>!v)}><Icon name="message" size={12}/>返信</button>}
          {isAdmin&&<button className="btn btn-red btn-sm" onClick={()=>del("user_messages",m.id)}><Icon name="trash" size={12}/></button>}
        </div>
      </div>
      <div style={{fontSize:13,background:"#f8fafc",borderRadius:8,padding:"10px 12px",lineHeight:1.7,marginBottom:m.staff_reply||replying?8:0}}>{m.message}</div>
      {m.staff_reply&&<div style={{background:"#f0fdf4",borderRadius:8,padding:"8px 12px",borderLeft:"3px solid #059669",marginBottom:replying?8:0}}><div style={{fontSize:11,color:"#059669",fontWeight:700,marginBottom:2}}>💬 返信済み</div><div style={{fontSize:13}}>{m.staff_reply}</div></div>}
      {replying&&(
        <div style={{display:"flex",gap:6}}>
          <input className="input" style={{flex:1,fontSize:13}} placeholder="返信を入力..." value={replyText} onChange={e=>setReplyText(e.target.value)}/>
          <button className="btn btn-primary btn-sm" onClick={async()=>{
            if(!replyText.trim()) return;
            await supabase.from("user_messages").update({staff_reply:replyText,reply_read:false,is_read:true}).eq("id",m.id);
            setReplying(false); loadAll();
          }}>送信</button>
        </div>
      )}
    </div>
  );
}

function MsgList({msgs, isAdmin, loadAll, del}) {
  return(
    <div style={{display:"grid",gap:10}}>
      {msgs.map((m,i)=><MsgCard key={m.id||i} m={m} isAdmin={isAdmin} loadAll={loadAll} del={del}/>)}
    </div>
  );
}

function NoticeManagerTab() {
  const [notices, setNotices] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({title:"",body:"",date:localDate(),important:false});

  useEffect(()=>{
    supabase.from("app_settings").select("value").eq("key","user_notices").single().then(({data})=>{
      if(data?.value){try{setNotices(JSON.parse(data.value));}catch(e){setNotices([]);}}
      setLoaded(true);
    });
  },[]);

  const save = async(newN)=>{ setNotices(newN); await supabase.from("app_settings").upsert({key:"user_notices",value:JSON.stringify(newN)},{onConflict:"key"}); };

  if(!loaded) return <div style={{padding:20,color:"#94a3b8"}}>読み込み中...</div>;

  return(
    <div className="fade-in">
      <PH title="利用者向けお知らせ管理" sub="利用者ポータルに表示されます" onAdd={()=>setAdding(true)} addLabel="お知らせ追加"/>
      {adding&&(
        <div className="card" style={{marginBottom:12,background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>新規お知らせ</div>
          <div style={{display:"grid",gap:8}}>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>タイトル</label><input className="input" value={form.title} onChange={e=>setForm(v=>({...v,title:e.target.value}))}/></div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>日付</label><input className="input" type="date" value={form.date} onChange={e=>setForm(v=>({...v,date:e.target.value}))}/></div>
            <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>内容</label><textarea className="textarea" value={form.body} onChange={e=>setForm(v=>({...v,body:e.target.value}))}/></div>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
              <input type="checkbox" checked={form.important} onChange={e=>setForm(v=>({...v,important:e.target.checked}))}/>
              <span style={{fontSize:13,fontWeight:600,color:"#ef4444"}}>重要なお知らせ</span>
            </label>
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button className="btn btn-primary btn-sm" onClick={()=>{
              if(!form.title.trim()){alert("タイトルを入力してください");return;}
              save([{...form,id:Date.now()},...notices]);
              setForm({title:"",body:"",date:localDate(),important:false});
              setAdding(false);
            }}>投稿</button>
            <button className="btn btn-secondary btn-sm" onClick={()=>setAdding(false)}>キャンセル</button>
          </div>
        </div>
      )}
      {notices.length===0
        ?<div className="card" style={{textAlign:"center",padding:"30px",color:"#94a3b8"}}>お知らせがありません</div>
        :notices.map((n,i)=>(
          <div key={n.id||i} className="card" style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                {n.important&&<span style={{background:"#ef4444",color:"white",fontSize:10,fontWeight:700,borderRadius:4,padding:"2px 6px",marginBottom:4,display:"inline-block"}}>重要</span>}
                <div style={{fontWeight:700,fontSize:14}}>{n.title}</div>
                <div style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>{n.date}</div>
                <div style={{fontSize:13,color:"#475569",whiteSpace:"pre-wrap"}}>{n.body}</div>
              </div>
              <button className="btn btn-red btn-sm" style={{marginLeft:8,flexShrink:0}} onClick={()=>{if(window.confirm("本当に削除しますか？この操作は元に戻せません"))save(notices.filter((_,j)=>j!==i));}}>削除</button>
            </div>
          </div>
        ))
      }
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
    if(!u){setErr("アクセスコードが正しくありません");return;}
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
    <div style={{...(span?{gridColumn:"1/-1"}:{}),minWidth:0,overflow:"hidden"}}>
      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>{label}</label>
      {opts
        ? <select className="input" value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}>{opts.map(v=><option key={v}>{v}</option>)}</select>
        : type==="textarea"
          ? <textarea className="textarea" value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/>
          : <input className="input" type={type} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{display:"block",width:"100%",boxSizing:"border-box",maxWidth:"100%"}}/>
      }
    </div>
  );
}

function PH({title,sub,onAdd,addLabel,extra}) {
  return (
    <div style={{marginBottom:14}}>
      <div style={{fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:2}}>{title}</div>
      {sub&&<div style={{fontSize:12,color:"#94a3b8",marginBottom:8}}>{sub}</div>}
      {(onAdd||extra)&&(
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginTop:8}}>
          {extra}
          {onAdd&&<button className="btn btn-primary" style={{whiteSpace:"nowrap"}} onClick={onAdd}><Icon name="plus" size={14}/>{addLabel||"追加"}</button>}
        </div>
      )}
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


const SREC_TEMPLATES = {
  "日中の様子": [
    "本日B型作業所〇時まで通所\n帰所後は居室にて休息され、落ち着いて過ごされていた。",
    "本日B型作業所休み",
    "本日は午前9時頃に起床し、朝食を摂取後、身支度を整え日中活動先へ出発された。",
    "表情は穏やかで、職員の声掛けに対しても問題なく応答されていた。",
    "特に不安や体調不良の訴えはなく、落ち着いて過ごされていた。",
    "本日は日中活動がお休みのため、居室にてテレビ視聴やスマートフォン操作を行いながら過ごされていた。",
    "職員の声掛けには応じられていたが、自発的な会話は少なめであった。",
    "不穏な様子は見られず、安定して過ごされていた。",
    "午前中は居室にて過ごされた後、午後より近隣コンビニへ買い物のため外出された。",
    "外出前後の様子は安定しており、職員との会話も問題なく行われていた。"
  ],
  "夕方以降の様子": [
    "17:00リビングで職員の用意した夕食を摂取しその後入浴し自室で入眠準備行う",
    "夕食は18時頃に自炊され、完食された。",
    "食後は共有スペースにてテレビを視聴され、その後居室へ戻られた。",
    "職員との会話もあり、穏やかな様子で過ごされていた。",
    "夕食は問題なく摂取された。",
    "食後は居室にてスマートフォンを使用しながら過ごされていた。",
    "特に問題行動は見られず、落ち着いた様子であった。",
    "夕食は摂取されたが、やや表情が硬く、会話は少なめであった。",
    "職員が声掛けを行うと短い返答は見られた。",
    "その後は居室に戻り、休息されていた。大きな不穏は見られず。"
  ],
  "健康状態等": [
    "本日の体調不良の訴えはなく、食事・水分ともに問題なく摂取されていた。",
    "表情、歩行状態ともに安定しており、健康状態は良好であった。",
    "本日、軽度の疲労感を訴えられていたが、食事は摂取されていた。",
    "発熱等の症状は見られず、経過観察とした。",
    "本人は居室にて安静に過ごされていた。",
    "服薬は職員確認のもと、問題なく実施された。",
    "体調不良の訴えはなく、普段通りの様子であった。",
    "引き続き健康状態の観察を行う。"
  ],
  "深夜帯の様子、その他": [
    "自室で入眠される",
    "2時頃に1度トイレで起きるがその後自室で入眠される",
    "消灯後は速やかに入眠された様子であった。",
    "巡視時も安眠されており、覚醒等は見られなかった。",
    "深夜帯に一度覚醒され、トイレを利用された。",
    "一度起き、その後は再度入眠され、以降は安眠されていた。",
    "不穏な様子は見られなかった。",
    "深夜帯に居室内で覚醒されている様子が確認された。",
    "職員の声掛けに対し問題なく応答され、「大丈夫です」との返答あり。",
    "その後は再入眠された。"
  ]
};

export default function App() {
  const [auth, setAuth] = useState("select");
  const [isMaster, setIsMaster] = useState(false);
  const [masterPin, setMasterPin] = useState("");
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [logoTapTimer, setLogoTapTimer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSabikan, setIsSabikan] = useState(false);
  const [me, setMe] = useState(null);
  const [adminPin, setAdminPin] = useState("");
  const [staffPin, setStaffPin] = useState("");
  const [sabikanPin, setSabikanPin] = useState("");
  const [sabikanList, setSabikanList] = useState([]);
  const [selSabikan, setSelSabikan] = useState(null);
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
  const [health, setHealth] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [selUser, setSelUser] = useState(null);
  const [modal, setModal] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [fDate, setFDate] = useState(localDate());
  const [fUser, setFUser] = useState("");
  const [fUnit, setFUnit] = useState("全棟");
  const [fCat, setFCat] = useState("全て");
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = React.useRef(null);
  const [tmplModal, setTmplModal] = useState(null); // field key e.g. "content"
  const [customTemplates, setCustomTemplates] = useState({}); // {category: [...]}
  const [tmplEditMode, setTmplEditMode] = useState(false);
  const [tmplEditIdx, setTmplEditIdx] = useState(null);
  const [tmplEditText, setTmplEditText] = useState("");
  const [winW, setWinW] = useState(375);
  useEffect(()=>{
    setWinW(window.innerWidth);
    const onResize=()=>setWinW(window.innerWidth);
    window.addEventListener('resize',onResize);
    return()=>window.removeEventListener('resize',onResize);
  },[]);
  useEffect(()=>{
    if(mainRef.current) mainRef.current.scrollTop=0;
  },[tab]);
  useEffect(()=>{
    let mv=document.querySelector('meta[name=viewport]');
    if(!mv){mv=document.createElement('meta');mv.name='viewport';document.head.prepend(mv);}
    mv.content='width=device-width,initial-scale=1,maximum-scale=1';
  },[]);
  const isMobile = winW < 1024;

  const _tn=new Date();const today=_tn.getFullYear()+"-"+String(_tn.getMonth()+1).padStart(2,"0")+"-"+String(_tn.getDate()).padStart(2,"0");
  const fmt = n => Number(n||0).toLocaleString("ja-JP");
  const unread = msgs.filter(m=>!m.is_read).length;

  useEffect(() => { if(auth==="app") loadAll(); }, [auth]);

  // 退勤打刻忘れチェック（5分おきにブラウザ側で検知 → Supabaseに通知リクエスト記録）
  useEffect(()=>{
    if(auth!=="app"||!isAdmin) return;
    const SHIFT_ENDS=[
      {label:"日勤",end:"18:05"},{label:"早番",end:"16:05"},
      {label:"遅番",end:"20:05"},{label:"夜勤",end:"05:05"},
    ];
    const checkUnclocked=async()=>{
      const now=new Date();
      const hm=String(now.getHours()).padStart(2,"0")+":"+String(now.getMinutes()).padStart(2,"0");
      const matched=SHIFT_ENDS.find(s=>s.end===hm);
      if(!matched) return;
      const todayStr=localDate();
      const {data:att}=await supabase.from("attendance").select("*").eq("date",todayStr).is("clock_out",null).not("clock_in",null,"is",null);
      if(!att||att.length===0) return;
      // app_settingsから通知設定取得
      const {data:cfg}=await supabase.from("app_settings").select("value").eq("key","clock_notify_settings").single();
      if(!cfg?.value) return;
      let settings;
      try{settings=JSON.parse(cfg.value);}catch(e){return;}
      if(!settings.enabled||!settings.email) return;
      // 未退勤スタッフ名リスト
      const names=att.map(a=>{const s=staffList.find(x=>x.id===a.staff_id);return s?.name||"不明";}).filter(Boolean);
      if(names.length===0) return;
      // 通知リクエストをSupabaseに記録（Edge Functionがポーリングして送信）
      const msg=todayStr+" "+matched.label+"終了時点で退勤打刻なし: "+names.join("、");
      await supabase.from("app_settings").upsert({
        key:"clock_notify_pending",
        value:JSON.stringify({email:settings.email,message:msg,names,date:todayStr,shift:matched.label,created_at:new Date().toISOString()})
      },{onConflict:"key"});
      // ブラウザ通知（管理者が画面を開いている場合）
      if(Notification.permission==="granted"){
        new Notification("退勤打刻忘れ",{body:names.join("、")+"が退勤打刻していません"});
      }
    };
    // ブラウザ通知の許可をリクエスト
    if(Notification.permission==="default") Notification.requestPermission();
    const timer=setInterval(checkUnclocked,60000);
    return ()=>clearInterval(timer);
  },[auth,isAdmin,staffList]);


  const loadAll = async () => {
    setLoading(true);
    const [u,t,e,c,a,sr,sp,mo,pr,wr,fr,sc,um,st,sal,shf,hl,ex] = await Promise.all([
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
      supabase.from("health_records").select("*").order("date",{ascending:false}),
      supabase.from("expense_claims").select("*").order("date",{ascending:false}),
    ]);
    setUsers(u.data||[]); setTransport(t.data||[]); setEntries(e.data||[]);
    setClaims(c.data||[]); setAttendance(a.data||[]); setSrecs(sr.data||[]);
    setPlans(sp.data||[]); setMonitors(mo.data||[]); setPerfs(pr.data||[]);
    setWages(wr.data||[]); setFiles(fr.data||[]); setScheds(sc.data||[]);
    setMsgs(um.data||[]); setStaffList(st.data||[]);
    setSalaries(sal.data||[]); setShifts(shf.data||[]); setHealth(hl.data||[]);
    setExpenses(ex.data||[]);
    setLoading(false);
  };

  const preloadStaff = async () => {
    const {data} = await supabase.from("staff_members").select("*").order("id");
    setStaffList(data||[]); setAuth("staff_pin");
  };
  const preloadSabikan = async () => {
    const {data} = await supabase.from("app_settings").select("value").eq("key","sabikan_members").single();
    try{ setSabikanList(JSON.parse(data?.value||"[]")); }catch(e){ setSabikanList([]); }
    setAuth("sabikan_pin");
  };
  const loginStaff = () => {
    setPinErr("");
    if(!me){setPinErr("スタッフを選択してください");return;}
    if(String(me.pin)!==String(staffPin)){setPinErr("PINコードが違います");return;}
    setIsAdmin(false);setAuth("app");setTab("attendance");
  };
  const loginAdmin = async () => {
    setPinErr("");
    const {data} = await supabase.from("app_settings").select("value").eq("key","admin_pin").single();
    if(data?.value===adminPin){setIsAdmin(true);setMe(null);setAuth("app");setTab("dashboard");}
    else setPinErr("管理者PINが違います");
  };
  const loginSabikan = async () => {
    setPinErr("");
    const {data} = await supabase.from("app_settings").select("value").eq("key","sabikan_pin").single();
    const pin = data?.value || "5678";
    if(pin===sabikanPin){setIsSabikan(true);setIsAdmin(false);setMe(selSabikan);setAuth("app");setTab("sabikan_dash");}
    else setPinErr("PINコードが正しくありません");
  };
  const logout = () => {setAuth("select");setIsAdmin(false);setIsSabikan(false);setMe(null);setAdminPin("");setStaffPin("");setSabikanPin("");setSelSabikan(null);};

  const openModal = (name,init={}) => {setForm(init);setModal(name);setEditId(null);};
  const openEdit = (name,row) => {setForm({...row});setModal(name);setEditId(row.id);};
  const closeModal = () => {setModal(null);setEditId(null);};

  const save = async (tbl,extra={}) => {
    const p = {...form,...extra};
    if(tbl==="staff_members"){
      if(!p.name||!p.name.trim()){alert("名前を入力してください");return;}
      if(!p.hourly_rate||isNaN(Number(p.hourly_rate))||Number(p.hourly_rate)<=0){alert("時給を入力してください（必須）");return;}
    }
    let res;
    if(editId) res = await supabase.from(tbl).update(p).eq("id",editId);
    else res = await supabase.from(tbl).insert(p);
    if(res.error){ alert("入力されていない項目があります。ご確認ください"); return; }
    closeModal(); loadAll();
  };
  const del = async (tbl,id) => {
    if(!window.confirm("本当に削除しますか？この操作は元に戻せません")) return;
    await supabase.from(tbl).delete().eq("id",id); loadAll();
  };

  const loadCustomTemplates = async () => {
    const {data} = await supabase.from("app_settings").select("value").eq("key","custom_templates").single();
    if(data?.value) try{ setCustomTemplates(JSON.parse(data.value)); }catch(e){}
  };
  const saveCustomTemplates = async (newT) => {
    setCustomTemplates(newT);
    await supabase.from("app_settings").upsert({key:"custom_templates",value:JSON.stringify(newT)},{onConflict:"key"});
  };

  const clockIn = async () => {
    if(attendance.find(a=>a.staff_id===me?.id&&a.date===today&&!a.clock_out)){alert("本日はすでに出勤打刻済みです");return;}
    await supabase.from("attendance").insert({staff_id:me.id,staff_name:me.name,clock_in:new Date().toISOString(),date:today});
    loadAll();
  };
  const clockOut = async () => {
    const ex = attendance.find(a=>a.staff_id===me?.id&&a.date===today&&!a.clock_out);
    if(!ex){alert("出勤打刻が見つかりません。先に出勤打刻を行ってください");return;}
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
        <div
          style={{width:68,height:68,borderRadius:18,background:"linear-gradient(135deg,#2563eb,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 16px",cursor:"pointer",userSelect:"none"}}
          onClick={()=>{
            if(logoTapTimer) clearTimeout(logoTapTimer);
            const next = logoTapCount+1;
            setLogoTapCount(next);
            if(next>=5){ setLogoTapCount(0); setAuth("master_pin"); return; }
            const t = setTimeout(()=>setLogoTapCount(0), 2000);
            setLogoTapTimer(t);
          }}
        >🏠</div>
        <div style={{fontWeight:800,fontSize:16,color:"#0f172a",marginBottom:4,whiteSpace:"nowrap"}}>グループホーム管理システム</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:32}}>powered by SOMME合同会社</div>
        <div style={{display:"grid",gap:12}}>
          <button style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15,background:"linear-gradient(135deg,#059669,#0d9488)",color:"white",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontWeight:600}} onClick={()=>setAuth("user_login")}>🏠 利用者ログイン</button>
          <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15}} onClick={preloadStaff}>☘️ スタッフログイン</button>
          <button style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15,background:"linear-gradient(135deg,#0369a1,#0e7490)",color:"white",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontWeight:600}} onClick={preloadSabikan}>📚 サービス管理責任者ログイン</button>
          <button className="btn btn-purple" style={{width:"100%",justifyContent:"center",padding:"14px",fontSize:15}} onClick={()=>setAuth("admin_pin")}>🔑 管理者ログイン</button>
        </div>
      </div>
    </div>
  );

  if(auth==="staff_pin") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#1e3a8a,#1e293b)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{fontWeight:700,fontSize:18,marginBottom:16}}>スタッフログイン</div>
        <select className="input" style={{marginBottom:10,textAlign:"center"}} value={me?.id||""} onChange={e=>{const s=staffList.find(st=>st.id===parseInt(e.target.value));setMe(s||null);}}>
          <option value="">スタッフを選択...</option>
          {staffList.map(s=><option key={s.id} value={s.id}>{s.name}（{s.role}）</option>)}
        </select>
        <input className="input" type="password" maxLength={6} placeholder="PINコード" style={{textAlign:"center",fontSize:22,letterSpacing:10,marginBottom:8}} value={staffPin} onChange={e=>setStaffPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginStaff()}/>
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8}} onClick={loginStaff}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setStaffPin("");setPinErr("");setMe(null);}}>← 戻る</button>
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
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button className="btn btn-purple" style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8}} onClick={loginAdmin}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setAdminPin("");setPinErr("");}}>← 戻る</button>
      </div>
    </div>
  );

  if(auth==="sabikan_pin") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#0369a1,#0c4a6e)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.3)"}}>
        <div style={{fontWeight:700,fontSize:18,marginBottom:16}}>サービス管理責任者ログイン</div>
        <select className="input" style={{marginBottom:10,textAlign:"center"}} onChange={e=>{const s=sabikanList.find(sb=>String(sb.id)===e.target.value);setSelSabikan(s||null);}}>
          <option value="">担当者を選択...</option>
          {sabikanList.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input className="input" type="password" maxLength={6} placeholder="PINコード" style={{textAlign:"center",fontSize:22,letterSpacing:10,marginBottom:8}} value={sabikanPin} onChange={e=>setSabikanPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&loginSabikan()}/>
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8,background:"linear-gradient(135deg,#0369a1,#0284c7)",color:"white",border:"none",borderRadius:8,cursor:"pointer",fontSize:15,fontWeight:600,display:"flex",alignItems:"center",gap:8}} onClick={loginSabikan}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setSabikanPin("");setPinErr("");setSelSabikan(null);}}>← 戻る</button>
      </div>
    </div>
  );

  if(auth==="master_pin") return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",minHeight:"100vh",background:"linear-gradient(135deg,#0f172a,#1e293b)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{CSS}</style>
      <div style={{background:"white",borderRadius:24,padding:40,width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.5)"}}>
        <div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#0f172a,#334155)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26}}>🛡️</div>
        <div style={{fontWeight:800,fontSize:16,color:"#0f172a",marginBottom:4}}>マスター管理</div>
        <div style={{fontSize:12,color:"#94a3b8",marginBottom:20}}>Master Console</div>
        <input className="input" type="password" maxLength={8} placeholder="マスターPIN" style={{textAlign:"center",fontSize:24,letterSpacing:10,marginBottom:8}} value={masterPin} onChange={e=>setMasterPin(e.target.value)} onKeyDown={async e=>{
          if(e.key==="Enter"){
            const {data} = await supabase.from("app_settings").select("value").eq("key","master_pin").single();
            const correctPin = data?.value||"999999";
            if(masterPin===correctPin){ setIsMaster(true); setAuth("master"); setMasterPin(""); }
            else { setPinErr("PINが違います"); }
          }
        }}/>
        {pinErr&&<div style={{color:"#ef4444",fontSize:13,marginBottom:8}}>{pinErr}</div>}
        <button style={{width:"100%",justifyContent:"center",padding:"12px",marginBottom:8,background:"linear-gradient(135deg,#0f172a,#334155)",color:"white",border:"none",borderRadius:8,cursor:"pointer",fontSize:15,fontWeight:600,display:"flex",alignItems:"center",gap:8}} onClick={async()=>{
          const {data} = await supabase.from("app_settings").select("value").eq("key","master_pin").single();
          const correctPin = data?.value||"999999";
          if(masterPin===correctPin){ setIsMaster(true); setAuth("master"); setMasterPin(""); setPinErr(""); }
          else { setPinErr("PINが違います"); }
        }}><Icon name="check" size={15}/>ログイン</button>
        <button className="btn btn-secondary" style={{width:"100%",justifyContent:"center"}} onClick={()=>{setAuth("select");setMasterPin("");setPinErr("");setLogoTapCount(0);}}>← 戻る</button>
      </div>
    </div>
  );

  if(auth==="master") {
    return <MasterScreen onBack={()=>{setAuth("select");setIsMaster(false);setMasterPin("");}} />;
  }

  if(auth==="user_login") {
    return <UserLoginScreen onBack={()=>setAuth("select")} onLogin={(u)=>{setAuth("user_portal");setMe(u);}} />;
  }
  if(auth==="user_portal") {
    return <UserPortalScreen user={me} onBack={()=>{setAuth("select");setMe(null);}} />;
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
      {id:"medication",label:"お薬管理",icon:"hint"},
    ]},
    {g:"実績・工賃",items:[
      {id:"perf_daily",label:"実績管理（日別）",icon:"chart"},
      {id:"perf_sum",label:"実績管理（集計）",icon:"chart"},
    ]},
    {g:"スタッフ",items:[
      {id:"staff",label:"スタッフ管理",icon:"staff"},
      {id:"sabikan_mgmt",label:"サービス管理責任者管理",icon:"staff"},
      {id:"att_admin",label:"勤怠管理",icon:"clock"},
      {id:"shift_mgmt",label:"シフト管理表",icon:"calendar"},
      {id:"salary",label:"給与計算・支払管理",icon:"wage"},
    ]},
    {g:"送迎・経理",items:[
      {id:"transport",label:"送迎管理",icon:"car"},
      {id:"claims",label:"国保連請求",icon:"claim"},
      {id:"accounting",label:"経理・決算",icon:"accounting"},
      {id:"expenses",label:"立替払い管理",icon:"claim"},
    ]},
    {g:"予定・連絡",items:[
      {id:"scheds",label:"予定管理",icon:"calendar"},
      {id:"msgs",label:"利用者メッセージ",icon:"message",badge:unread},
    ]},
    {g:"利用者ポータル管理",items:[
      {id:"notices",label:"お知らせ管理",icon:"news"},
    ]},
    {g:"情報管理",items:[
      {id:"docs",label:"必須保存書類管理",icon:"file"},
      {id:"files",label:"ファイル・会議報告書",icon:"file"},
      {id:"cleaning",label:"掃除当番表",icon:"check"},
      {id:"supplies",label:"備品管理表",icon:"list"},
      {id:"hints",label:"加算ヒント",icon:"hint"},
      {id:"news",label:"最新ニュース",icon:"news"},
    ]},
    {g:"設定",items:[
      {id:"password",label:"パスワード変更",icon:"shield"},
      {id:"export_all",label:"データエクスポート",icon:"download"},
    ]},
  ];
  const staffTabs = [
    {g:"業務",items:[
      {id:"todo",label:"TODO・ルーティン",icon:"check"},
      {id:"attendance",label:"勤怠打刻",icon:"clock"},
      {id:"shift_mgmt",label:"シフト確認",icon:"calendar"},
      {id:"my_salary",label:"給料・シフト確認",icon:"wage"},
      {id:"shift_req",label:"シフト希望・訂正",icon:"calendar"},
      {id:"medication",label:"お薬管理",icon:"hint"},
      {id:"srecs",label:"支援記録入力",icon:"book"},
      {id:"journal",label:"業務日誌確認",icon:"calendar"},
      {id:"transport",label:"送迎記録",icon:"car"},
      {id:"my_expenses",label:"立替申請",icon:"claim"},
    ]},
    {g:"連絡",items:[
      {id:"msgs",label:"利用者メッセージ",icon:"message",badge:unread},
      {id:"scheds",label:"予定確認",icon:"calendar"},
    ]},
    {g:"設定",items:[
      {id:"staff_links",label:"業務リンク集",icon:"news"},
      {id:"staff_password",label:"パスワード変更",icon:"shield"},
    ]},
  ];
  const sabikanTabs = [
    {g:"概要",items:[{id:"sabikan_dash",label:"ダッシュボード",icon:"home"}]},
    {g:"利用者支援",items:[
      {id:"user_status",label:"利用者状況",icon:"users"},
      {id:"plans",label:"支援計画・モニタリング",icon:"plan"},
      {id:"srecs",label:"支援記録（閲覧）",icon:"book"},
      {id:"srec_table",label:"支援記録表",icon:"list"},
      {id:"medication",label:"お薬管理",icon:"hint"},
    ]},
    {g:"連絡・調整",items:[
      {id:"msgs",label:"利用者メッセージ",icon:"message"},
      {id:"scheds",label:"予定管理",icon:"calendar"},
      {id:"notices",label:"お知らせ管理",icon:"news"},
    ]},
    {g:"情報管理",items:[
      {id:"docs",label:"必須保存書類管理",icon:"file"},
      {id:"files",label:"ファイル・会議報告書",icon:"file"},
      {id:"hints",label:"加算ヒント",icon:"hint"},
      {id:"sabikan_links",label:"業務リンク集",icon:"news"},
    ]},
    {g:"設定",items:[
      {id:"sabikan_password",label:"パスワード変更",icon:"shield"},
    ]},
  ];
  const tabs = isAdmin ? adminTabs : isSabikan ? sabikanTabs : staffTabs;

  return (
    <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:"#f0f4f8",height:"100dvh",display:"flex",flexDirection:"column"}}>
      <style>{CSS}</style>
      <header style={{background:"white",borderBottom:"1px solid #e2e8f0",padding:"0 14px",paddingTop:"env(safe-area-inset-top)",height:"calc(54px + env(safe-area-inset-top))",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {isMobile && (
            <button onClick={()=>setNavOpen(true)} style={{background:"none",border:"none",cursor:"pointer",padding:"6px",display:"flex",flexDirection:"column",gap:4,alignItems:"center",justifyContent:"center",borderRadius:8}}>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
              <div style={{width:20,height:2,background:"#475569",borderRadius:2}}/>
            </button>
          )}
          <div style={{width:30,height:30,borderRadius:8,background:isAdmin?"linear-gradient(135deg,#7c3aed,#4c1d95)":"linear-gradient(135deg,#2563eb,#0ea5e9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🏠</div>
          <div><div style={{fontWeight:700,fontSize:13,color:"#0f172a",whiteSpace:"nowrap"}}>グループホーム管理システム</div><div style={{fontSize:10,color:"#94a3b8"}}>{isAdmin?"👑 管理者":isSabikan?"📋 サービス管理責任者":`👤 ${me?.name}`}</div></div>
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

      <div style={{display:"flex",flex:1,minHeight:0}}>
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

        <main ref={mainRef} style={{flex:1,padding:isMobile?"16px 12px 60px":"18px 18px 60px",overflowY:"auto",overflowX:"hidden",minWidth:0,minHeight:0}}>

          {/* ── DASHBOARD ── */}
          {tab==="dashboard"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>ダッシュボード</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:18}}>{today}（{["日","月","火","水","木","金","土"][new Date(today.replace(/-/g,"/")).getDay()]}）</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:18}}>
                {[
                  {l:"在籍利用者",v:users.filter(u=>u.status==="在籍").length+"名",s:`外泊中 ${users.filter(u=>u.status==="外泊中").length}名`,c:"#2563eb",i:"👥"},
                  {l:"本日出勤中",v:attendance.filter(a=>a.date===today&&a.clock_in&&!a.clock_out).length+"名",s:`退勤済 ${attendance.filter(a=>a.date===today&&a.clock_out).length}名`,c:"#059669",i:"⏰"},
                  {l:"本日支援記録",v:srecs.filter(r=>r.date===today).length+"件",s:`対象 ${users.filter(u=>u.status==="在籍").length}名`,c:"#0891b2",i:"📝"},
                  {l:"未読メッセージ",v:unread+"件",s:"利用者から",c:"#ef4444",i:"📩"},
                  {l:"支援計画期限超過",v:overdueP.length+"件",s:"更新要",c:"#f59e0b",i:"⚠️"},
                  {l:"今月モニタリング",v:monitors.filter(m=>m.date&&m.date.startsWith(today.slice(0,7))).length+"件",s:today.slice(0,7),c:"#7c3aed",i:"📊"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderLeft:`4px solid ${k.c}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:11,color:"#64748b",fontWeight:500}}>{k.l}</div><div style={{fontSize:18}}>{k.i}</div></div>
                    <div className="mono" style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:2}}>{k.v}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>{k.s}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,marginBottom:16}}>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>⏰ 本日の出勤状況</div>
                  {(()=>{
                    const clockedToday=attendance.filter(a=>a.date===today);
                    const displayStaff=clockedToday.length>0
                      ?staffList.filter(s=>clockedToday.some(a=>a.staff_id===s.id))
                      :[];
                    return displayStaff.length===0
                      ?<div style={{fontSize:13,color:"#94a3b8"}}>本日の出勤打刻なし</div>
                      :displayStaff.map(s=>{
                        const rec=clockedToday.find(a=>a.staff_id===s.id);
                        return(
                          <div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #f8fafc"}}>
                            <div style={{fontSize:13,fontWeight:500}}>{s.name}</div>
                            {rec?.clock_out
                              ?<span className="tag" style={{background:"#f1f5f9",color:"#64748b",fontSize:11}}>退勤済</span>
                              :<span className="tag" style={{background:"#ecfdf5",color:"#059669",fontSize:11}}>出勤中</span>
                            }
                          </div>
                        );
                      });
                  })()}
                </div>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>📋 本日の支援記録</div>
                  {users.filter(u=>u.status==="在籍").length===0
                    ?<div style={{fontSize:13,color:"#94a3b8"}}>利用者未登録</div>
                    :users.filter(u=>u.status==="在籍").slice(0,8).map(u=>{
                      const rec=srecs.find(r=>r.user_id===u.id&&r.date===today);
                      return(
                        <div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #f8fafc"}}>
                          <div style={{fontSize:13,fontWeight:500}}>{u.name}</div>
                          {rec?<span className="tag" style={{background:"#ecfdf5",color:"#059669"}}>✓ 記録済</span>:<span className="tag" style={{background:"#fef3c7",color:"#d97706"}}>未記録</span>}
                        </div>
                      );
                    })
                  }
                </div>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>⚠️ 要対応事項</div>
                  {[
                    {t:`外泊中 ${users.filter(u=>u.status==="外泊中").length}名 — 帰宅確認`,w:users.filter(u=>u.status==="外泊中").length>0},
                    {t:`支援計画期限超過 ${overdueP.length}件 — 更新要`,w:overdueP.length>0},
                    {t:`未読メッセージ ${unread}件`,w:unread>0},
                    {t:`未退勤スタッフ ${attendance.filter(a=>a.date===today&&a.clock_in&&!a.clock_out).length}名（本日）`,w:attendance.filter(a=>a.date===today&&a.clock_in&&!a.clock_out).length>0},
                    {t:`国保連入金待ち ${claims.filter(c=>c.status==="請求済").length}件`,w:false},
                  ].map((a,i)=>(
                    <div key={i} style={{display:"flex",gap:8,padding:"7px 0",borderBottom:i<4?"1px solid #f8fafc":"none",alignItems:"flex-start"}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:a.w?"#ef4444":"#3b82f6",marginTop:5,flexShrink:0}}/>
                      <div style={{fontSize:13,color:a.w?"#1e293b":"#64748b"}}>{a.t}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>☑️ 本日のTODO・ルーティン</div>
                <TodoTab staffList={staffList} today={today} me={me} isAdmin={isAdmin}/>
              </div>
              <div className="card" style={{marginTop:14}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>📰 最新ニュース</span>
                  <button className="btn btn-secondary btn-sm" onClick={()=>setTab("news")}>すべて見る →</button>
                </div>
                <div style={{display:"grid",gap:8}}>
                  {NEWS.slice(0,3).map((n,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 0",borderBottom:i<2?"1px solid #f8fafc":"none"}}>
                      <span className="tag" style={{background:n.tag==="重要"?"#fee2e2":n.tag==="改定"?"#fef3c7":"#eff6ff",color:n.tag==="重要"?"#ef4444":n.tag==="改定"?"#d97706":"#2563eb",flexShrink:0}}>{n.tag}</span>
                      <a href={n.url} target="_blank" rel="noreferrer" style={{fontSize:13,color:"#0f172a",textDecoration:"none",fontWeight:500,flex:1}}>{n.title}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── サビ管ダッシュボード ── */}
          {tab==="sabikan_dash"&&isSabikan&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:2}}>📋 サービス管理責任者 ダッシュボード</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:18}}>{today}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:18}}>
                {[
                  {l:"在籍利用者",v:users.filter(u=>u.status==="在籍").length+"名",c:"#2563eb",i:"👥"},
                  {l:"支援計画期限超過",v:overdueP.length+"件",s:"更新要",c:"#ef4444",i:"⚠️"},
                  {l:"今月モニタリング",v:monitors.filter(m=>m.date&&m.date.startsWith(today.slice(0,7))).length+"件",c:"#7c3aed",i:"📊"},
                  {l:"未読メッセージ",v:unread+"件",s:"利用者から",c:"#f59e0b",i:"📩"},
                ].map((k,i)=>(
                  <div key={i} className="stat-card" style={{borderLeft:"4px solid "+k.c}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontSize:11,color:"#64748b",fontWeight:500}}>{k.l}</div><div style={{fontSize:18}}>{k.i}</div></div>
                    <div className="mono" style={{fontSize:20,fontWeight:800,color:"#0f172a",marginBottom:2}}>{k.v}</div>
                    {k.s&&<div style={{fontSize:11,color:"#94a3b8"}}>{k.s}</div>}
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14,marginBottom:16}}>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>⚠️ 支援計画 期限超過・要更新</div>
                  {overdueP.length===0?<div style={{fontSize:13,color:"#94a3b8"}}>超過なし ✓</div>
                  :overdueP.slice(0,5).map((p,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f8fafc",fontSize:13}}>
                      <span style={{fontWeight:500}}>{users.find(u=>u.id===p.user_id)?.name||"-"}</span>
                      <span style={{color:"#ef4444",fontSize:12}}>期限: {p.review_date}</span>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>👥 利用者サマリー</div>
                  {users.filter(u=>u.status==="在籍").slice(0,7).map(u=>{
                    const plan=plans.filter(p=>p.user_id===u.id).sort((a,b)=>(b.plan_date||"").localeCompare(a.plan_date||""))[0];
                    return(
                      <div key={u.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f8fafc"}}>
                        <span style={{fontSize:13,fontWeight:500}}>{u.name}</span>
                        {plan?<span className="tag" style={{background:"#eff6ff",color:"#2563eb",fontSize:10}}>{plan.plan_date||"計画あり"}</span>:<span className="tag" style={{background:"#fef3c7",color:"#d97706",fontSize:10}}>計画なし</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* サビ管 便利リンク */}
              <div className="card">
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>🔗 サービス管理責任者 業務リンク</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:8}}>
                  {[
                    {label:"WAM NET（社会福祉・医療）",url:"https://www.wam.go.jp/",tag:"情報"},
                    {label:"厚労省 障害福祉",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/",tag:"行政"},
                    {label:"障害福祉サービス等報酬",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000202214.html",tag:"報酬"},
                    {label:"相談支援・個別支援計画",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/soudan.html",tag:"計画"},
                    {label:"国保連合会",url:"https://www.kokuho.or.jp/",tag:"請求"},
                    {label:"電子請求受付システム",url:"https://www.e-seikyuu.jp/",tag:"請求"},
                    {label:"サービス管理責任者研修",url:"https://www.wam.go.jp/content/wamnet/pcpub/top/",tag:"研修"},
                    {label:"就労支援ネットワーク",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/shougaishakoyou/06a.html",tag:"就労"},
                  ].map((link,i)=>(
                    <a key={i} href={link.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                      <div style={{padding:"10px 12px",borderRadius:10,background:"#f0f9ff",border:"1px solid #bae6fd",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                        <span style={{fontSize:12,fontWeight:500,color:"#0369a1"}}>{link.label}</span>
                        <span style={{fontSize:10,background:"#0369a1",color:"white",borderRadius:4,padding:"1px 6px",flexShrink:0,marginLeft:6}}>{link.tag}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── サビ管 業務リンク集 ── */}
          {tab==="sabikan_links"&&isSabikan&&(
            <div className="fade-in">
              <PH title="業務リンク集" sub="サービス管理責任者の業務に役立つリンク"/>
              {[
                {cat:"📋 個別支援計画・アセスメント",links:[
                  {label:"厚労省 障害福祉サービス",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html"},
                  {label:"相談支援専門員・サービス管理責任者",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/soudan.html"},
                  {label:"WAM NET 福祉・保健・医療情報",url:"https://www.wam.go.jp/"},
                ]},
                {cat:"💰 報酬・請求",links:[
                  {label:"障害福祉サービス等報酬改定",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000202214.html"},
                  {label:"国保連合会（電子請求）",url:"https://www.kokuho.or.jp/"},
                  {label:"電子請求受付システム",url:"https://www.e-seikyuu.jp/"},
                ]},
                {cat:"🏛 行政・法令",links:[
                  {label:"障害者総合支援法",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/sougoushien/index.html"},
                  {label:"指定障害福祉サービス基準",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html"},
                  {label:"e-Gov 法令検索",url:"https://elaws.e-gov.go.jp/"},
                ]},
                {cat:"📚 研修・資格",links:[
                  {label:"サービス管理責任者研修（WAM）",url:"https://www.wam.go.jp/content/wamnet/pcpub/top/"},
                  {label:"日本相談支援専門員協会",url:"https://www.jcsa.gr.jp/"},
                ]},
              ].map((sec,si)=>(
                <div key={si} className="card" style={{marginBottom:12}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>{sec.cat}</div>
                  <div style={{display:"grid",gap:6}}>
                    {sec.links.map((link,li)=>(
                      <a key={li} href={link.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                        <div style={{padding:"10px 14px",borderRadius:8,background:"#f0f9ff",border:"1px solid #bae6fd",fontSize:13,color:"#0369a1",fontWeight:500,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          {link.label} <span style={{fontSize:12,color:"#7dd3fc"}}>→</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── サビ管 パスワード変更 ── */}
          {tab==="sabikan_password"&&isSabikan&&<SabikanPinForm/>}

          {/* ── 利用者状況 ── */}
          {tab==="user_status"&&(
            <div className="fade-in">
              <PH title="利用者状況" sub={`在籍 ${users.filter(u=>u.status==="在籍").length}名`}
                onAdd={isAdmin?()=>openModal("利用者",{name:"",kana:"",age:"",disability:"",support_level:"1",room:"",unit:"A棟",admission_date:"",status:"在籍",guardian:"",guardian_tel:"",medication_note:"",access_code:""}):null}
                addLabel="新規登録"
              />
              <div style={{marginBottom:12}}>
                <select className="input" style={{width:"100%",maxWidth:200}} value={fUnit} onChange={e=>setFUnit(e.target.value)}>{["全棟","A棟","B棟","C棟"].map(v=><option key={v}>{v}</option>)}</select>
              </div>
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
              <MD name="利用者" table="users" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,overflow:"hidden"}}>
                  <F label="名前" k="name" form={form} setForm={setForm}/><F label="フリガナ" k="kana" form={form} setForm={setForm}/>
                  <F label="年齢" k="age" type="number" form={form} setForm={setForm}/><F label="部屋番号" k="room" form={form} setForm={setForm}/>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]} form={form} setForm={setForm}/><F label="支援区分" k="support_level" opts={["1","2","3","4","5","6"]} form={form} setForm={setForm}/>
                  <F label="ステータス" k="status" opts={["在籍","外泊中","退去","入院中"]} form={form} setForm={setForm}/><F label="入居日" k="admission_date" type="date" form={form} setForm={setForm}/>
                  <F label="保護者" k="guardian" form={form} setForm={setForm}/><F label="保護者連絡先" k="guardian_tel" form={form} setForm={setForm}/>
                </div>
                <F label="障害種別" k="disability" form={form} setForm={setForm}/>
                <F label="投薬メモ" k="medication_note" type="textarea" form={form} setForm={setForm}/>
                <F label="利用者アクセスコード（メッセージ用）" k="access_code" form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 支援記録 ── */}
          {tab==="srecs"&&(
            <div className="fade-in">
              <PH title="支援記録" sub="日々の支援内容"
                onAdd={()=>openModal("支援記録",{user_id:"",date:today,staff_name:me?.name||"管理者",health:"良好",content:"",activity:"",behavior:"",note:""})}
                addLabel="記録追加"
              />
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="date" style={{flex:1,minWidth:130}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                <select className="input" style={{flex:1,minWidth:110}} value={fUser} onChange={e=>setFUser(e.target.value)}>
                  <option value="">全利用者</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
                {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs,"支援記録")}><Icon name="download" size={13}/>CSV</button>}
              </div>
              <div style={{display:"grid",gap:10}}>
                {srecs.filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).slice(0,30).map((r,i)=>(
                  <div key={i} className="card">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                        <div style={{fontWeight:700,fontSize:14}}>{r.user_name}</div>
                        <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{r.date}</span>
                        <span style={{fontSize:12,color:"#64748b"}}>{r.staff_name}</span>
                      </div>
                      <div style={{display:"flex",gap:6,flexShrink:0}}>
                        {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>openEdit("支援記録",r)}><Icon name="edit" size={12}/></button>}
                        {isAdmin&&<button className="btn btn-red btn-sm" onClick={()=>del("support_records",r.id)}><Icon name="trash" size={12}/></button>}
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8,fontSize:13}}>
                      {r.content&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>日中の様子</div>{r.content}</div>}
                      {r.activity&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>夕方以降の様子</div>{r.activity}</div>}
                      {r.behavior&&<div style={{background:"#f8fafc",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>健康状態等</div>{r.behavior}</div>}
                      {r.note&&<div style={{background:"#fffbeb",borderRadius:8,padding:"7px 10px",gridColumn:"1/-1"}}><div style={{fontSize:10,color:"#94a3b8",marginBottom:2}}>深夜帯の様子、その他</div>{r.note}</div>}
                    </div>
                  </div>
                ))}
                {srecs.filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).length===0&&(
                  <div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📝</div>記録がありません</div>
                )}
              </div>
              <MD name="支援記録" table="support_records" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date" form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>記録者</label>
                    <select className="input" value={form.staff_name||""} onChange={e=>setForm(f=>({...f,staff_name:e.target.value}))}>
                      <option value="">選択...</option>{staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                {["content","activity","behavior","note"].map(k=>{
                  const labels={"content":"日中の様子","activity":"夕方以降の様子","behavior":"健康状態等","note":"深夜帯の様子、その他"};
                  const slots={"content":"日中の様子","activity":"夕方以降の様子","behavior":"健康状態等","note":"深夜帯の様子、その他"};
                  return(
                    <div key={k}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                        <label style={{fontSize:12,color:"#64748b"}}>{labels[k]}</label>
                        <button type="button" className="btn btn-secondary btn-sm" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>setTmplModal(k)}>テンプレ</button>
                      </div>
                      <textarea className="input" rows={3} value={form[k]||""} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",resize:"vertical"}}/>
                    </div>
                  );
                })}
              </MD>
              {/* Template Modal */}
              {tmplModal&&(()=>{
                const fieldLabels={"content":"日中の様子","activity":"夕方以降の様子","behavior":"健康状態等","note":"深夜帯の様子、その他"};
                const cat = fieldLabels[tmplModal];
                const builtIn = SREC_TEMPLATES[cat]||[];
                const custom = customTemplates[cat]||[];
                const allTmpls = [...builtIn.map(t=>({text:t,type:"builtin"})),...custom.map((t,i)=>({text:t,type:"custom",idx:i}))];
                return(
                  <div className="modal-overlay" onClick={()=>{setTmplModal(null);setTmplEditMode(false);setTmplEditIdx(null);setTmplEditText("");}}>
                    <div className="modal" style={{maxWidth:680}} onClick={e=>e.stopPropagation()}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                        <div style={{fontWeight:700,fontSize:16}}>📝 {cat}</div>
                        <div style={{display:"flex",gap:6}}>
                          <button className="btn btn-secondary btn-sm" onClick={()=>{setTmplEditMode(true);setTmplEditIdx(null);setTmplEditText("");}}>＋ 追加</button>
                          <button className="btn btn-secondary" style={{padding:"4px 10px"}} onClick={()=>{setTmplModal(null);setTmplEditMode(false);setTmplEditIdx(null);setTmplEditText("");}}>×</button>
                        </div>
                      </div>
                      {tmplEditMode&&(
                        <div style={{background:"#f0f9ff",borderRadius:10,padding:12,marginBottom:12,border:"1px solid #bae6fd"}}>
                          <div style={{fontSize:12,color:"#0369a1",marginBottom:6,fontWeight:600}}>{tmplEditIdx!==null?"テンプレ編集":"新規テンプレ追加"}</div>
                          <textarea className="input" rows={4} style={{width:"100%",marginBottom:8,resize:"vertical"}} value={tmplEditText} onChange={e=>setTmplEditText(e.target.value)} placeholder="テンプレートの内容を入力..."/>
                          <div style={{display:"flex",gap:6}}>
                            <button className="btn btn-primary btn-sm" onClick={()=>{
                              if(!tmplEditText.trim()) return;
                              const cur = [...(customTemplates[cat]||[])];
                              if(tmplEditIdx!==null) cur[tmplEditIdx]=tmplEditText.trim();
                              else cur.push(tmplEditText.trim());
                              saveCustomTemplates({...customTemplates,[cat]:cur});
                              setTmplEditMode(false);setTmplEditIdx(null);setTmplEditText("");
                            }}>保存</button>
                            <button className="btn btn-secondary btn-sm" onClick={()=>{setTmplEditMode(false);setTmplEditIdx(null);setTmplEditText("");}}>キャンセル</button>
                          </div>
                        </div>
                      )}
                      <div style={{display:"grid",gap:8,maxHeight:450,overflowY:"auto"}}>
                        {allTmpls.map((item,i)=>(
                          <div key={i} style={{background:item.type==="custom"?"#f0fdf4":"#f8fafc",borderRadius:8,padding:"10px 12px",border:`1px solid ${item.type==="custom"?"#bbf7d0":"#e2e8f0"}`}}>
                            <div style={{fontSize:13,color:"#334155",lineHeight:1.6,whiteSpace:"pre-line",marginBottom:8}}>{item.text}{item.type==="custom"&&<span style={{fontSize:10,color:"#059669",marginLeft:6}}>カスタム</span>}</div>
                            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                            <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0,alignItems:"stretch",minWidth:52}}>
                              <button className="btn btn-primary btn-sm" style={{whiteSpace:"nowrap"}} onClick={()=>{setForm(f=>({...f,[tmplModal]:(f[tmplModal]?f[tmplModal]+"\n":"")+item.text}));setTmplModal(null);setTmplEditMode(false);}}>利用</button>
                              {item.type==="custom"&&<>
                                <button className="btn btn-secondary btn-sm" style={{whiteSpace:"nowrap"}} onClick={()=>{setTmplEditMode(true);setTmplEditIdx(item.idx);setTmplEditText(item.text);}}>編集</button>
                                <button className="btn btn-red btn-sm" style={{whiteSpace:"nowrap"}} onClick={()=>{
                                  if(!window.confirm("本当に削除しますか？この操作は元に戻せません")) return;
                                  const cur=[...(customTemplates[cat]||[])];
                                  cur.splice(item.idx,1);
                                  saveCustomTemplates({...customTemplates,[cat]:cur});
                                }}>削除</button>
                              </>}
                            </div>
                          </div>
                          </div>
                        ))}
                        {allTmpls.length===0&&<div style={{textAlign:"center",color:"#94a3b8",padding:"30px"}}>テンプレートがありません</div>}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── 支援記録表 ── */}
          {tab==="srec_table"&&(
            <div className="fade-in">
              <PH title="支援記録表" sub="利用者×日付マトリクス"/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="month" style={{flex:1,minWidth:130}} value={fDate.slice(0,7)} onChange={e=>setFDate(e.target.value+"-01")}/>
                {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs,"支援記録表")}><Icon name="download" size={13}/>CSV</button>}
              </div>
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
              <PH title="業務日誌" sub="引継ぎ・全利用者一覧" onAdd={()=>{ setTab("srecs"); setTimeout(()=>openModal("支援記録",{user_id:"",date:fDate||today,staff_name:me?.name||"管理者",health:"良好",content:"",activity:"",behavior:"",note:""}),50); }} addLabel="支援記録を書く"/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="date" style={{flex:1,minWidth:130}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                {isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(srecs.filter(r=>r.date===fDate),fDate+"_業務日誌")}><Icon name="download" size={13}/>CSV</button>}
              </div>
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
          {tab==="plans"&&(isAdmin||isSabikan)&&(
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
              <MD name="支援計画" table="support_plans" wide modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,overflow:"hidden"}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="ステータス" k="status" opts={["作成中","進行中","完了"]} form={form} setForm={setForm}/>
                  <F label="計画開始日" k="period_start" type="date" form={form} setForm={setForm}/>
                  <F label="計画終了日" k="period_end" type="date" form={form} setForm={setForm}/>
                  <F label="更新予定日" k="review_date" type="date" form={form} setForm={setForm}/>
                  <F label="作成者" k="created_by" form={form} setForm={setForm}/>
                </div>
                <div style={{borderTop:"1px solid #e2e8f0",paddingTop:12,marginTop:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:8}}>📋 支援計画詳細</div>
                  <div style={{display:"grid",gap:10}}>
                    <F label="総合的な援助の方針（支援内容）" k="assessment" type="textarea" span form={form} setForm={setForm}/>
                    <F label="長期目標" k="goals" type="textarea" span form={form} setForm={setForm}/>
                    <F label="短期目標" k="short_term_goal" type="textarea" span form={form} setForm={setForm}/>
                    <F label="自立生活への移行目標" k="independence_goal" type="textarea" span form={form} setForm={setForm}/>
                    <F label="本人の意向・希望" k="user_hope" type="textarea" span form={form} setForm={setForm}/>
                    <F label="家族の意向" k="family_hope" type="textarea" span form={form} setForm={setForm}/>
                  </div>
                </div>
              </MD>
              <MD name="モニタリング" table="monitoring" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,overflow:"hidden"}}>
                  <F label="評価日" k="date" type="date" form={form} setForm={setForm}/>
                  <F label="評価者" k="evaluator" form={form} setForm={setForm}/>
                  <F label="ステータス" k="status" opts={["未完","実施済","承認済"]} form={form} setForm={setForm}/>
                </div>
                <F label="目標達成状況" k="goal_achievement" type="textarea" span form={form} setForm={setForm}/>
                <F label="課題・問題点" k="issues" type="textarea" span form={form} setForm={setForm}/>
                <F label="次期計画の方向性" k="next_plan" type="textarea" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 実績管理（日別） ── */}
          {tab==="perf_daily"&&isAdmin&&(
            <div className="fade-in">
              <PH title="実績管理（日別）" sub="サービス提供実績"
                onAdd={()=>openModal("実績",{user_id:"",date:fDate,service_type:"共同生活援助",start_time:"09:00",end_time:"17:00",support_category:"",staff_name:"",is_absence:false,note:""})}
                addLabel="実績追加"
              />
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="date" style={{flex:1,minWidth:130}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                <button className="btn btn-secondary btn-sm" onClick={()=>csv(perfs.filter(r=>r.date===fDate),fDate+"_実績")}><Icon name="download" size={13}/>CSV</button>
              </div>
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
              <MD name="実績" table="performance_records" wide modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date" form={form} setForm={setForm}/>
                  <F label="サービス種別" k="service_type" opts={["共同生活援助（介護サービス包括型）","共同生活援助（外部サービス利用型）","共同生活援助（日中サービス支援型）","短期入所","日中支援"]} form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>担当スタッフ</label>
                    <select className="input" value={form.staff_name||""} onChange={e=>setForm(f=>({...f,staff_name:e.target.value}))}>
                      <option value="">選択...</option>{staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>時間帯パターン</label>
                    <select className="input" onChange={e=>{
                      const v=e.target.value;
                      if(v==="日勤") setForm(f=>({...f,start_time:"09:00",end_time:"18:00"}));
                      else if(v==="夜勤") setForm(f=>({...f,start_time:"22:00",end_time:"05:00"}));
                      else if(v==="早番") setForm(f=>({...f,start_time:"07:00",end_time:"15:00"}));
                      else if(v==="遅番") setForm(f=>({...f,start_time:"11:00",end_time:"19:00"}));
                    }}>
                      <option value="">パターン選択...</option>
                      <option value="日勤">日勤（9:00〜17:00）</option>
                      <option value="夜勤">夜勤（17:00〜翌9:00）</option>
                      <option value="早番">早番（7:00〜15:00）</option>
                      <option value="遅番">遅番（11:00〜19:00）</option>
                    </select>
                  </div>
                  <F label="開始時刻（変更可）" k="start_time" type="time" form={form} setForm={setForm}/>
                  <F label="終了時刻（変更可）" k="end_time" type="time" form={form} setForm={setForm}/>
                </div>
                <div style={{borderTop:"1px solid #e2e8f0",paddingTop:12,marginTop:4}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:8}}>📊 実績記録用（共同生活援助）</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                    <F label="サービス提供" k="service_provided" opts={["サービス有","サービス無（入院）","サービス無（外泊）","サービス無（その他）"]} form={form} setForm={setForm}/>
                    <F label="日中支援" k="daytime_support" opts={["--","あり","なし"]} form={form} setForm={setForm}/>
                    <div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <label style={{fontSize:12,color:"#64748b"}}>夜間支援</label>
                      <span title="【体制Ⅰ】夜間に専従の夜間支援員が常駐（夜勤）。より手厚い支援が必要な利用者向け。加算単価が高い。&#13;【体制Ⅱ】夜間に夜間支援員が巡回または待機（宿直等）。常駐ではない。加算単価が低い。" style={{cursor:"help",fontSize:13,color:"#f59e0b"}}>💡</span>
                    </div>
                    <select className="input" value={form.night_support||""} onChange={e=>setForm(f=>({...f,night_support:e.target.value}))}>
                      {["初期設定と同じ","体制Ⅰ","体制Ⅱ","なし"].map(v=><option key={v}>{v}</option>)}
                    </select></div>
                    <div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <label style={{fontSize:12,color:"#64748b"}}>自立生活支援加算</label>
                      <span title="一人暮らし等を希望する利用者に対し、地域生活に向けた支援計画を作成・実施した場合に算定。本人同意書と具体的な支援記録が必要。" style={{cursor:"help",fontSize:13,color:"#f59e0b"}}>💡</span>
                    </div>
                    <select className="input" value={form.independence_support||""} onChange={e=>setForm(f=>({...f,independence_support:e.target.value}))}>
                      {["--","算定あり","算定なし"].map(v=><option key={v}>{v}</option>)}
                    </select></div>
                    <F label="ピアサポート実施加算" k="peer_support" opts={["--","算定あり","算定なし"]} form={form} setForm={setForm}/>
                  </div>
                </div>
                <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>欠席</label>
                  <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                    <input type="checkbox" checked={form.is_absence||false} onChange={e=>setForm(f=>({...f,is_absence:e.target.checked}))}/>
                    <span style={{fontSize:13}}>欠席扱いにする</span>
                  </label>
                </div>
                <F label="備考" k="note" type="textarea" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 実績管理（集計） ── */}
          {tab==="perf_sum"&&isAdmin&&(
            <div className="fade-in">
              <PH title="実績管理（集計）" sub="月別・利用者別"/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="month" style={{flex:1,minWidth:130}} value={fDate.slice(0,7)} onChange={e=>setFDate(e.target.value+"-01")}/>
                <button className="btn btn-secondary btn-sm" onClick={()=>csv(perfs,"実績集計")}><Icon name="download" size={13}/>CSV</button>
              </div>
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


                    {/* ── スタッフ管理 ── */}
          {tab==="staff"&&isAdmin&&(
            <div className="fade-in">
              <PH title="スタッフ管理" sub={`${staffList.length}名`} onAdd={()=>openModal("スタッフ",{name:"",kana:"",role:"世話人",full_time:"true",tel:"",email:"",hourly_rate:"",night_rate:"",pin:"",hire_date:"",certifications:""})} addLabel="スタッフ追加"/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
                {staffList.map(s=>(
                  <div key={s.id} className="card">
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                      <div style={{width:40,height:40,borderRadius:10,background:`hsl(${s.id*70+200},55%,85%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{s.name[0]}</div>
                      <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14}}>{s.name}</div><div style={{fontSize:12,color:"#64748b"}}>{s.role}</div></div>
                      <span className="tag" style={{background:s.full_time?"#eff6ff":"#f5f3ff",color:s.full_time?"#2563eb":"#7c3aed"}}>{s.full_time?"常勤":"非常勤"}</span>
                    </div>
                    <div style={{fontSize:12,color:"#64748b",lineHeight:2,marginBottom:8}}>
                      <div>📞 {s.tel}</div><div className="mono">基本時給 ¥{fmt(s.hourly_rate)} / 夜勤 ¥{getNightRate(s).toLocaleString()}</div><div>🔑 PIN: {s.pin}</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn btn-secondary" style={{flex:1,justifyContent:"center"}} onClick={()=>openEdit("スタッフ",s)}><Icon name="edit" size={13}/>編集</button>
                      <button className="btn btn-red" style={{padding:"8px 12px"}} onClick={()=>del("staff_members",s.id)}><Icon name="trash" size={13}/></button>
                    </div>
                  </div>
                ))}
              </div>
              <MD name="スタッフ" table="staff_members" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="名前" k="name" form={form} setForm={setForm}/><F label="フリガナ" k="kana" form={form} setForm={setForm}/>
                  <F label="電話" k="tel" form={form} setForm={setForm}/><F label="メール" k="email" type="email" form={form} setForm={setForm}/>
                  <F label="役職" k="role" opts={["世話人","生活支援員","運転手","施設管理者","サービス管理責任者"]} form={form} setForm={setForm}/>
                  <F label="雇用形態" k="full_time" opts={["true","false"]} form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>基本時給（円）<span style={{color:"#ef4444",marginLeft:3}}>*必須</span></label>
                    <input className="input" type="number" min={1} value={form.hourly_rate||""} onChange={e=>setForm(f=>({...f,hourly_rate:e.target.value}))} placeholder="例: 1100"/>
                    {form.hourly_rate&&Number(form.hourly_rate)>0&&!form.night_rate&&<div style={{fontSize:11,color:"#64748b",marginTop:3}}>夜勤時給未設定 → 自動: ¥{Math.floor(Number(form.hourly_rate)*1.25).toLocaleString()}（×1.25）</div>}
                  </div>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>夜勤時給（円）<span style={{fontSize:11,color:"#94a3b8",marginLeft:4}}>未入力で基本×1.25</span></label>
                    <input className="input" type="number" min={1} value={form.night_rate||""} onChange={e=>setForm(f=>({...f,night_rate:e.target.value}))} placeholder={form.hourly_rate?`自動: ¥${Math.floor(Number(form.hourly_rate||0)*1.25)}`:"例: 1375"}/>
                  </div>
                  <F label="PINコード" k="pin" form={form} setForm={setForm}/>
                  <F label="入職日" k="hire_date" type="date" form={form} setForm={setForm}/>
                </div>
                <F label="保有資格（カンマ区切り）" k="certifications" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── サービス管理責任者管理 ── */}
          {tab==="sabikan_mgmt"&&isAdmin&&<SabikanMgmtTab/>}

          {/* ── 勤怠管理（管理者） ── */}
          {tab==="att_admin"&&isAdmin&&<AttAdminTab attendance={attendance} today={today} loadAll={loadAll} csv={csv}/>}

          {/* ── シフト管理表 ── */}
          {tab==="shift_mgmt"&&<div className="fade-in"><ShiftMgmtTab staffList={staffList} isAdmin={isAdmin} attendance={attendance} me={me}/></div>}

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
          {/* ── TODO（スタッフ） ── */}
          {tab==="todo"&&!isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>TODO・ルーティン</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>本日のチェックリスト</div>
              <TodoTab staffList={staffList} today={today} me={me} isAdmin={false}/>
            </div>
          )}

          {/* ── TODO（管理者 単独ページ） ── */}
          {tab==="todo"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>TODO・ルーティン</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>チェックリスト管理・履歴</div>
              <TodoTab staffList={staffList} today={today} me={me} isAdmin={isAdmin}/>
            </div>
          )}

          {/* ── スタッフ便利リンク（業務ではなく設定に置く、ダッシュボードのは別途） ── */}
          {tab==="staff_links"&&!isAdmin&&!isSabikan&&(
            <div className="fade-in">
              <PH title="業務リンク集" sub="世話人・生活支援員の業務に役立つリンク"/>
              {[
                {cat:"📋 障害福祉・支援",links:[
                  {label:"厚労省 障害福祉サービスとは",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/index.html"},
                  {label:"障害者総合支援法 わかりやすい解説（WAM）",url:"https://www.wam.go.jp/content/wamnet/pcpub/top/"},
                  {label:"共同生活援助（グループホーム）制度",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/sumau.html"},
                ]},
                {cat:"🏥 健康・医療・緊急",links:[
                  {label:"救急安心センター（#7119に電話）",url:"tel:7119"},
                  {label:"こころの健康相談（0570-064-556）",url:"tel:0570-064-556"},
                  {label:"中毒110番（0990-950-2499）",url:"tel:0990-950-2499"},
                  {label:"熱中症に関する情報（環境省）",url:"https://www.wbgt.env.go.jp/"},
                  {label:"感染症情報（国立感染症研究所）",url:"https://www.niid.go.jp/niid/ja/"},
                ]},
                {cat:"🌦 天気・防災",links:[
                  {label:"気象庁 今日の天気",url:"https://www.jma.go.jp/bosai/forecast/"},
                  {label:"気象庁 警報・注意報",url:"https://www.jma.go.jp/bosai/warning/"},
                  {label:"国土交通省 川の防災情報",url:"https://www.river.go.jp/"},
                  {label:"Yahoo!天気・災害",url:"https://weather.yahoo.co.jp/weather/"},
                ]},
                {cat:"📚 研修・スキルアップ",links:[
                  {label:"WAM NET 福祉の仕事",url:"https://www.wam.go.jp/content/wamnet/pcpub/top/"},
                  {label:"e-ラーニング 介護・福祉（中央福祉学院）",url:"https://www.chuofukushi.or.jp/"},
                  {label:"障害者虐待防止・権利擁護（厚労省）",url:"https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/gyakutaiboushi/index.html"},
                ]},
              ].map((sec,si)=>(
                <div key={si} className="card" style={{marginBottom:12}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>{sec.cat}</div>
                  <div style={{display:"grid",gap:6}}>
                    {sec.links.map((link,li)=>(
                      <a key={li} href={link.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                        <div style={{padding:"10px 14px",borderRadius:8,background:"#f0fdf4",border:"1px solid #bbf7d0",fontSize:13,color:"#059669",fontWeight:500,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          {link.label} <span style={{fontSize:12,color:"#86efac"}}>→</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

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
                isMobile={isMobile}
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


          {/* ── 健康管理 ── */}
          {tab==="health"&&(
            <div className="fade-in">
              <PH title="健康管理" sub="利用者の健康記録"
                onAdd={()=>openModal("健康記録",{user_id:"",date:today,measured_at:"",temperature:"",bp_high:"",bp_low:"",pulse:"",spo2:"",blood_sugar:"",height:"",weight:"",water_intake:"",food_intake:"",other_note:""})}
                addLabel="記録追加"
              />
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
                <input className="input" type="date" style={{flex:1,minWidth:130}} value={fDate} onChange={e=>setFDate(e.target.value)}/>
                <select className="input" style={{flex:1,minWidth:110}} value={fUser} onChange={e=>setFUser(e.target.value)}>
                  <option value="">全利用者</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div style={{display:"grid",gap:10}}>
                {(health||[]).filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).map((r,i)=>(
                  <div key={i} className="card">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14}}>{r.user_name}</div>
                        <div style={{fontSize:12,color:"#64748b"}}>{r.date} {r.measured_at&&`${r.measured_at}測定`}</div>
                      </div>
                      <div style={{display:"flex",gap:6}}>
                        <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("健康記録",r)}><Icon name="edit" size={12}/></button>
                        <button className="btn btn-red btn-sm" onClick={()=>del("health_records",r.id)}><Icon name="trash" size={12}/></button>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:6,fontSize:12}}>
                      {r.temperature&&<div style={{background:"#fff7ed",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>体温</div><span style={{fontWeight:700}}>{r.temperature}</span>度</div>}
                      {(r.bp_high||r.bp_low)&&<div style={{background:"#fef2f2",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>血圧</div><span style={{fontWeight:700}}>{r.bp_high}/{r.bp_low}</span>mmHg</div>}
                      {r.pulse&&<div style={{background:"#fdf4ff",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>脈拍</div><span style={{fontWeight:700}}>{r.pulse}</span>回</div>}
                      {r.spo2&&<div style={{background:"#eff6ff",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>SpO2</div><span style={{fontWeight:700}}>{r.spo2}</span>%</div>}
                      {r.blood_sugar&&<div style={{background:"#f0fdf4",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>血糖値</div><span style={{fontWeight:700}}>{r.blood_sugar}</span>mg/dL</div>}
                      {r.weight&&<div style={{background:"#f8fafc",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>体重</div><span style={{fontWeight:700}}>{r.weight}</span>kg</div>}
                      {r.water_intake&&<div style={{background:"#ecfeff",borderRadius:6,padding:"5px 8px"}}><div style={{fontSize:10,color:"#94a3b8"}}>水分</div><span style={{fontWeight:700}}>{r.water_intake}</span>ml</div>}
                    </div>
                    {r.other_note&&<div style={{marginTop:6,fontSize:12,color:"#475569",background:"#f8fafc",borderRadius:6,padding:"5px 8px"}}>{r.other_note}</div>}
                  </div>
                ))}
                {(health||[]).filter(r=>(r.date===fDate||!fDate)&&(!fUser||r.user_id===parseInt(fUser))).length===0&&(
                  <div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>🏥</div>健康記録がありません</div>
                )}
              </div>
              <MD name="健康記録" table="health_records" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||""}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="日付" k="date" type="date" form={form} setForm={setForm}/>
                  <F label="測定時刻" k="measured_at" type="time" form={form} setForm={setForm}/>
                  <F label="体温（度）" k="temperature" type="number" form={form} setForm={setForm}/>
                  <F label="血圧（高）mmHg" k="bp_high" type="number" form={form} setForm={setForm}/>
                  <F label="血圧（低）mmHg" k="bp_low" type="number" form={form} setForm={setForm}/>
                  <F label="脈拍（回）" k="pulse" type="number" form={form} setForm={setForm}/>
                  <F label="酸素濃度 SpO2（%）" k="spo2" type="number" form={form} setForm={setForm}/>
                  <F label="血糖値 mg/dL" k="blood_sugar" type="number" form={form} setForm={setForm}/>
                  <F label="身長（cm）" k="height" type="number" form={form} setForm={setForm}/>
                  <F label="体重（kg）" k="weight" type="number" form={form} setForm={setForm}/>
                  <F label="水分摂取量（ml）" k="water_intake" type="number" form={form} setForm={setForm}/>
                  <F label="食事摂取量" k="food_intake" form={form} setForm={setForm}/>
                </div>
                <F label="その他（睡眠・排便・排尿等）" k="other_note" type="textarea" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 送迎管理 ── */}
          {tab==="transport"&&<TransportTab transport={transport} users={users} staffList={staffList} isAdmin={isAdmin} loadAll={loadAll} csv={csv}/>}

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
              <MD name="仕訳" table="accounting_entries" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <F label="日付" k="date" type="date" form={form} setForm={setForm}/>
                  <F label="区分" k="category" opts={["収入","支出"]} form={form} setForm={setForm}/>
                  <F label="科目" k="sub_category" form={form} setForm={setForm}/>
                  <F label="金額（円）" k="amount" type="number" form={form} setForm={setForm}/>
                  <F label="借方" k="debit" form={form} setForm={setForm}/>
                  <F label="貸方" k="credit" form={form} setForm={setForm}/>
                </div>
                <F label="摘要" k="description" type="textarea" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 立替払い管理（管理者） ── */}
          {tab==="expenses"&&isAdmin&&(
            <ExpenseAdminTab expenses={expenses} staffList={staffList} loadAll={loadAll} csv={csv}/>
          )}

          {/* ── 立替申請（スタッフ） ── */}
          {tab==="my_expenses"&&!isAdmin&&(
            <MyExpenseTab me={me} expenses={expenses} loadAll={loadAll}/>
          )}

          {/* ── 予定管理 ── */}
          {tab==="scheds"&&(
            <div className="fade-in">
              <PH title="予定管理" sub="入院・外泊・通院などの予定"
                onAdd={isAdmin?()=>openModal("予定",{user_id:"",unit:"A棟",type:"外泊",start_date:"",end_date:"",note:"",status:"予定"}):null}
                addLabel="予定追加"
              />
              <div style={{marginBottom:12}}>
                <select className="input" style={{width:"100%",maxWidth:200}} value={fUnit} onChange={e=>setFUnit(e.target.value)}>{["全棟","A棟","B棟","C棟"].map(v=><option key={v}>{v}</option>)}</select>
              </div>
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
              <MD name="予定" table="schedules" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>利用者</label>
                    <select className="input" value={form.user_id||""} onChange={e=>{const u=users.find(u=>u.id===parseInt(e.target.value));setForm(f=>({...f,user_id:e.target.value,user_name:u?.name||"",unit:u?.unit||"A棟"}));}}>
                      <option value="">選択...</option>{users.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>
                  <F label="棟" k="unit" opts={["A棟","B棟","C棟"]} form={form} setForm={setForm}/>
                  <F label="種別" k="type" opts={["外泊","通院","入院","服薬変更","短期入所","その他"]} form={form} setForm={setForm}/>
                  <F label="状態" k="status" opts={["予定","実施中","実施済","キャンセル"]} form={form} setForm={setForm}/>
                  <F label="開始日" k="start_date" type="date" form={form} setForm={setForm}/>
                  <F label="終了日" k="end_date" type="date" form={form} setForm={setForm}/>
                </div>
                <F label="備考" k="note" type="textarea" span form={form} setForm={setForm}/>
              </MD>
            </div>
          )}

          {/* ── 利用者メッセージ ── */}
          {tab==="notices"&&(isAdmin||isSabikan)&&<div className="fade-in"><NoticeManagerTab/></div>}

          {/* ── お薬管理 ── */}
          {tab==="medication"&&<div className="fade-in"><MedicationTab users={users} isAdmin={isAdmin}/></div>}

          {tab==="msgs"&&(
            <div className="fade-in">
              <PH title="利用者メッセージ" sub={`未読 ${unread}件`}
                extra={isAdmin&&<button className="btn btn-secondary btn-sm" onClick={()=>csv(msgs,"利用者メッセージ")}><Icon name="download" size={13}/>CSV</button>}
              />
              {msgs.length===0?<div className="card" style={{textAlign:"center",padding:"40px",color:"#94a3b8"}}><div style={{fontSize:32,marginBottom:8}}>📩</div>メッセージがありません</div>:(
                <MsgList msgs={msgs} isAdmin={isAdmin} loadAll={loadAll} del={del}/>
              )}
              {isAdmin&&<div className="card" style={{marginTop:16,background:"#eff6ff",border:"1px solid #bfdbfe"}}><div style={{fontWeight:700,fontSize:13,marginBottom:4,color:"#1d4ed8"}}>📱 アクセスコード設定</div><div style={{fontSize:13,color:"#1e40af"}}>「利用者状況」→ 各利用者の編集でアクセスコードを設定。利用者はトップ画面の「利用者ログイン」からアクセスできます。</div></div>}
            </div>
          )}

          {/* ── ファイル・会議報告書 ── */}
          {tab==="files"&&(isAdmin||isSabikan)&&(
            <div className="fade-in">
              <PH title="ファイル・会議報告書" sub={`${files.length}件`}
                onAdd={()=>openModal("ファイル",{category:"職員会議",title:"",date:today,author:me?.name||"管理者",content:"",file_type:"議事録",url:"",file_name:"",file_data:""})}
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
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                          <span className="tag" style={{background:"#eff6ff",color:"#2563eb"}}>{f.category}</span>
                          <span className="tag" style={{background:"#f1f5f9",color:"#475569"}}>{f.file_type}</span>
                          <span className="mono" style={{fontSize:11,color:"#94a3b8"}}>{f.date}</span>
                        </div>
                        <div style={{display:"flex",gap:6}}>
                          {(f.url||f.file_data)&&(
                            <a href={f.file_data?"data:application/octet-stream;base64,"+f.file_data:f.url}
                              download={f.file_name||f.title}
                              target="_blank" rel="noreferrer"
                              className="btn btn-secondary btn-sm"
                              style={{textDecoration:"none"}}>
                              <Icon name="download" size={12}/>
                            </a>
                          )}
                          <button className="btn btn-secondary btn-sm" onClick={()=>openEdit("ファイル",f)}><Icon name="edit" size={12}/></button>
                          <button className="btn btn-red btn-sm" onClick={()=>del("file_records",f.id)}><Icon name="trash" size={12}/></button>
                        </div>
                      </div>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{f.title}</div>
                      <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>作成者: {f.author}</div>
                      {f.file_name&&<div style={{fontSize:12,color:"#2563eb",marginBottom:4}}>📎 {f.file_name}</div>}
                      {f.url&&!f.file_data&&<a href={f.url} target="_blank" rel="noreferrer" style={{fontSize:12,color:"#2563eb",display:"block",marginBottom:4,wordBreak:"break-all"}}>🔗 {f.url}</a>}
                      {f.content&&<div style={{fontSize:13,background:"#f8fafc",borderRadius:8,padding:"10px 12px",lineHeight:1.7,marginTop:4}}>{f.content}</div>}
                    </div>
                  ))}
                </div>
              )}
              <MD name="ファイル" table="file_records" modal={modal} editId={editId} closeModal={closeModal} save={save}>
                <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,overflow:"hidden"}}>
                  <F label="カテゴリ" k="category" opts={["職員会議","虐待防止","BCP","ヒヤリハット","事故報告","研修記録","その他"]} form={form} setForm={setForm}/>
                  <F label="種別" k="file_type" opts={["議事録","報告書","計画書","マニュアル","記録票","その他"]} form={form} setForm={setForm}/>
                  <F label="タイトル" k="title" span form={form} setForm={setForm}/>
                  <F label="日付" k="date" type="date" form={form} setForm={setForm}/>
                  <div><label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:3}}>作成者</label>
                    <select className="input" value={form.author||""} onChange={e=>setForm(f=>({...f,author:e.target.value}))}>
                      <option value="">選択...</option>
                      {staffList.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div style={{border:"1px solid #e2e8f0",borderRadius:10,padding:12}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:10}}>📎 ファイル添付（いずれか）</div>
                    <div style={{marginBottom:10}}>
                      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>ファイルをアップロード</label>
                      <input type="file" style={{fontSize:13,width:"100%"}} onChange={e=>{
                        const file=e.target.files[0];
                        if(!file) return;
                        if(file.size>3*1024*1024){alert("ファイルサイズが大きすぎます。3MB以下のファイルを選択してください");return;}
                        const reader=new FileReader();
                        reader.onload=ev=>{
                          const b64=ev.target.result.split(",")[1];
                          setForm(f=>({...f,file_data:b64,file_name:file.name,url:""}));
                        };
                        reader.readAsDataURL(file);
                      }}/>
                      {form.file_name&&<div style={{fontSize:12,color:"#059669",marginTop:4}}>✅ {form.file_name}</div>}
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>※ 3MB以下のファイル（PDF・Word・Excel等）</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <div style={{flex:1,height:1,background:"#e2e8f0"}}/>
                      <span style={{fontSize:11,color:"#94a3b8"}}>または</span>
                      <div style={{flex:1,height:1,background:"#e2e8f0"}}/>
                    </div>
                    <div>
                      <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>URLを入力（Google Drive・Dropbox等）</label>
                      <input className="input" value={form.url||""} onChange={e=>setForm(f=>({...f,url:e.target.value,file_data:"",file_name:""}))} placeholder="https://..."/>
                    </div>
                  </div>
                  <F label="内容・メモ" k="content" type="textarea" span form={form} setForm={setForm}/>
                </div>
              </MD>
            </div>
          )}

          {/* ── データエクスポート ── */}
          {tab==="export_all"&&isAdmin&&(
            <ExportAllTab
              users={users} staffList={staffList} attendance={attendance}
              transport={transport} entries={entries} claims={claims}
              srecs={srecs} plans={plans} monitors={monitors}
              perfs={perfs} wages={wages} files={files}
              scheds={scheds} msgs={msgs} salaries={salaries}
              shifts={shifts} health={health} expenses={expenses}
            />
          )}

          {/* ── パスワード変更（管理者） ── */}
          {tab==="password"&&isAdmin&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>設定</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:20}}>管理者PIN・スタッフPIN・打刻通知の設定</div>
              <AdminPinForm loadAll={loadAll}/>
              <StaffPinForm staffList={staffList} loadAll={loadAll}/>
              <ClockNotifySettings staffList={staffList}/>
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


          {/* ── 掃除当番表 ── */}
          {tab==="cleaning"&&isAdmin&&<CleaningTab staffList={staffList}/>}

          {/* ── 備品管理表 ── */}
          {tab==="supplies"&&isAdmin&&<SuppliesTab/>}

          {/* ── 必須保存書類管理 ── */}
          {tab==="docs"&&(isAdmin||isSabikan)&&(
            <div className="fade-in">
              <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>必須保存書類管理</div>
              <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>法定・行政上の保管義務がある書類の整備状況</div>
              <DocsTab today={today} staffList={staffList}/>
            </div>
          )}

          {/* ── 加算ヒント ── */}
          {tab==="hints"&&(isAdmin||isSabikan)&&<HintsTab/>}

          {/* ── ニュース ── */}
          {tab==="news"&&(isAdmin||isSabikan)&&(
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
