
    const { useState } = React;

    // Simple SVG Icon Component
    const Icon = ({ name, size = 18, className = '' }) => {
      const icons = {
        home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10"/>,
        clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
        box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></>,
        package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
        shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
        'message-square': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
        'chevron-right': <path d="M9 18l6-6-6-6"/>,
        plus: <path d="M12 5v14M5 12h14"/>,
        play: <polygon points="5 3 19 12 5 21 5 3"/>,
        'more-horizontal': <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
        'git-branch': <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
        zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
        database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
        server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
        cpu: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
        'hard-drive': <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></>,
        layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
        'alert-circle': <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
        'alert-triangle': <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
        'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
        'x-circle': <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
        network: <><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/></>,
        lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
        key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
        'arrow-left-right': <><polyline points="17 11 21 7 17 3"/><line x1="21" y1="7" x2="9" y2="7"/><polyline points="7 21 3 17 7 13"/><line x1="15" y1="17" x2="3" y2="17"/></>,
        radio: <><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></>,
        mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
        activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
        filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
        'trending-up': <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
        users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
        globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
        'arrow-right': <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
        folder: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></>,
        'cloud-lightning': <><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></>,
        'refresh-cw': <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>,
        'file-text': <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
        bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
        save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>,
        layout: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
        code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
        check: <polyline points="20 6 9 17 4 12"/>,
        trash2: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>,
        search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
        'help-circle': <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
        'dollar-sign': <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
        'trending-down': <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
        pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
        loader: <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></>,
        'chevron-left': <polyline points="15 18 9 12 15 6"/>,
        'chevron-down': <polyline points="6 9 12 15 18 9"/>,
        edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
        x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
        copy: <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
        eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
        terminal: <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
        clock2: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
        user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
        tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
        calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
        'external-link': <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
        'log-in': <><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></>,
        'log-out': <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
        sliders: <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>,
        target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
        'pause-circle': <><circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/></>,
        settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
        wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
        monitor: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
        'git-merge': <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></>,
        wifi: <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
        grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
        'share-2': <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
        link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
        gauge: <><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L19 5"/><circle cx="12" cy="12" r="2"/></>,
        'zap-off': <><polyline points="12.41 6.75 13 2 10.57 4.92"/><polyline points="18.57 12.91 21 10 15.66 10"/><polyline points="8 8 3 14 12 14 11 22 16 16"/><line x1="1" y1="1" x2="23" y2="23"/></>,
        'edit-3': <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
        'minimize-2': <><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></>,
        'bar-chart-2': <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
        clipboard: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>,
      };
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {icons[name] || null}
        </svg>
      );
    };

    // Platform Costs Data Model
    const platformCosts = {
      mom: { total: 6000, breakdown: { lambda: 850, ecs: 3200, emr: 1950 }, trend: 2.3 },
      uncle: { total: 6500, breakdown: { aurora: 2800, mongodb: 1200, dynamodb: 1350, dsql: 1150 }, trend: 1.8 },
      dad: { total: 2800, breakdown: { mesh: 1200, certificates: 400, observability: 1200 }, trend: -1.5 },
      auntie: { total: 8200, breakdown: { sns: 1200, sqs: 2400, eventbridge: 1800, kafka: 2800 }, trend: 5.2 },
      rosie: { total: 1550, breakdown: { eventbridge_scheduler: 450, mwaa: 850, batch: 250 }, trend: -12.4 },
      bro: { total: 4200, breakdown: { vpc: 850, tgw: 1400, vpn: 650, directconnect: 980, route53: 320 }, trend: -3.2 },
      legacyCost: 108333
    };
    const platformTotal = platformCosts.mom.total + platformCosts.uncle.total + platformCosts.dad.total + platformCosts.auntie.total + platformCosts.rosie.total + platformCosts.bro.total;
    const platformSavings = ((platformCosts.legacyCost - platformTotal) / platformCosts.legacyCost * 100).toFixed(1);

    // Enhanced Mock Jobs Data
    const mockJobs = [
      { id: 1, name: 'loan-etl-daily', type: 'dag', target: 'mwaa', schedule: '0 2 * * *', scheduleHuman: 'Daily at 2:00 AM', status: 'active', lastRun: '2 hours ago', lastRunStatus: 'success', nextRun: 'Tomorrow 2:00 AM', owner: 'loans-origination', tags: ['etl', 'production', 'critical'], successRate: 99.2, avgDuration: '45m 30s', estimatedCost: '$0.85', taskCount: 4, description: 'Daily ETL pipeline for loan origination data. Extracts from source systems, transforms, and loads to data warehouse.' },
      { id: 2, name: 'db-backup-nightly', type: 'schedule', target: 'eventbridge', schedule: '0 3 * * *', scheduleHuman: 'Daily at 3:00 AM', status: 'active', lastRun: '5 hours ago', lastRunStatus: 'success', nextRun: 'Tomorrow 3:00 AM', owner: 'platform-ops', tags: ['backup', 'production'], successRate: 100, avgDuration: '12m 15s', estimatedCost: '$0.12', taskCount: 1, description: 'Nightly database backup job for all production RDS instances.' },
      { id: 3, name: 'cache-invalidation', type: 'schedule', target: 'eventbridge', schedule: 'rate(1 hour)', scheduleHuman: 'Every hour', status: 'active', lastRun: '23 min ago', lastRunStatus: 'success', nextRun: 'In 37 minutes', owner: 'platform-ops', tags: ['cache', 'maintenance'], successRate: 99.8, avgDuration: '45s', estimatedCost: '$0.02', taskCount: 1, description: 'Hourly cache invalidation for stale data cleanup.' },
      { id: 4, name: 'month-end-reporting', type: 'dag', target: 'mwaa', schedule: '0 6 1 * *', scheduleHuman: '1st of month at 6:00 AM', status: 'paused', lastRun: '29 days ago', lastRunStatus: 'success', nextRun: 'Jan 1, 6:00 AM', owner: 'finance-analytics', tags: ['reporting', 'finance'], successRate: 97.5, avgDuration: '2h 15m', estimatedCost: '$2.40', taskCount: 8, description: 'Monthly financial reporting pipeline with reconciliation checks.' },
      { id: 5, name: 'payments-reconciliation', type: 'dag', target: 'mwaa', schedule: '0 1 * * *', scheduleHuman: 'Daily at 1:00 AM', status: 'active', lastRun: '3 hours ago', lastRunStatus: 'failed', nextRun: 'Tomorrow 1:00 AM', owner: 'payments-team', tags: ['payments', 'reconciliation', 'critical'], successRate: 94.2, avgDuration: '55m', estimatedCost: '$1.20', taskCount: 6, description: 'Daily reconciliation of payment transactions with bank systems.' },
    ];

    // Mock Runs Data
    // Generate 1000+ mock runs
    const jobTemplates = [
      { name: 'loan-etl-daily', jobId: 1, avgDuration: 45, steps: ['WaitForS3File', 'ValidateSchema', 'TransformData', 'LoadToAurora'] },
      { name: 'db-backup-nightly', jobId: 2, avgDuration: 12, steps: ['CreateRDSSnapshots'] },
      { name: 'cache-invalidation', jobId: 3, avgDuration: 3, steps: ['InvalidateRedisCache'] },
      { name: 'fraud-detection-ml', jobId: 4, avgDuration: 25, steps: ['FetchTransactions', 'RunMLModel', 'FlagSuspicious', 'NotifyTeam'] },
      { name: 'payments-reconciliation', jobId: 5, avgDuration: 35, steps: ['FetchInternalTxns', 'FetchBankTxns', 'ReconcileTxns', 'GenerateReport'] },
    ];
    const triggers = ['Scheduled', 'Manual', 'API', 'Webhook'];
    const errors = [null, null, null, null, null, null, null, 'Timeout after 3 retries', 'Connection refused', 'Invalid schema', 'Rate limit exceeded', 'Memory limit exceeded'];
    const mockRuns = Array.from({ length: 1005 }, (_, i) => {
      const job = jobTemplates[i % jobTemplates.length];
      const date = new Date(2025, 0, 15);
      date.setMinutes(date.getMinutes() - i * 30);
      const isRunning = i < 2;
      const isFailed = !isRunning && Math.random() < 0.08;
      const status = isRunning ? 'running' : isFailed ? 'failed' : 'success';
      const error = isFailed ? errors[Math.floor(Math.random() * errors.length)] || 'Unknown error' : null;
      const duration = Math.floor(job.avgDuration * (0.8 + Math.random() * 0.4));
      const stepStatuses = job.steps.map((s, si) => {
        if (isRunning && si === job.steps.length - 1) return 'running';
        if (isFailed && si === job.steps.length - 1) return 'failed';
        return 'success';
      });
      return {
        id: `run-${String(i + 1).padStart(4, '0')}`,
        jobName: job.name,
        jobId: job.jobId,
        status,
        startTime: date.toISOString().replace('T', ' ').slice(0, 19),
        duration: `${duration}m ${Math.floor(Math.random() * 60)}s`,
        triggeredBy: triggers[Math.floor(Math.random() * triggers.length)],
        tasks: { success: stepStatuses.filter(s => s === 'success').length, failed: stepStatuses.filter(s => s === 'failed').length, running: stepStatuses.filter(s => s === 'running').length },
        error,
        steps: job.steps.map((name, si) => ({
          name,
          type: 'Task',
          status: stepStatuses[si],
          startTime: `${String(2 + si).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
          duration: `${Math.floor(duration / job.steps.length)}m`,
          logs: `[INFO] Starting ${name}...\n[INFO] Processing batch 1/10\n[INFO] Processing batch 2/10\n[INFO] Processing batch 3/10\n${stepStatuses[si] === 'failed' ? '[ERROR] ' + (error || 'Task failed') : '[INFO] Completed successfully'}`
        }))
      };
    });

    // Mock Connections Data
    const mockConnections = [
      { id: 1, name: 'loans-prod-aurora', type: 'aurora', host: 'loans-prod.xxx.rds.amazonaws.com', status: 'healthy', lastTested: '2 hours ago' },
      { id: 2, name: 'analytics-dsql', type: 'dsql', host: 'analytics.xxx.dsql.amazonaws.com', status: 'healthy', lastTested: '1 hour ago' },
      { id: 3, name: 'payments-api', type: 'http', host: 'api.payments.internal', status: 'degraded', lastTested: '30 min ago' },
      { id: 4, name: 's3-data-lake', type: 's3', host: 's3://data-lake-prod', status: 'healthy', lastTested: '15 min ago' },
    ];

    // Mock Variables Data
    const mockVariables = [
      { key: 'LOANS_S3_BUCKET', value: 'loans-data-prod', description: 'Production S3 bucket for loan data', encrypted: false },
      { key: 'BANK_API_KEY', value: '********', description: 'Bank integration API key', encrypted: true },
      { key: 'DW_SCHEMA', value: 'analytics_prod', description: 'Data warehouse schema name', encrypted: false },
      { key: 'SLACK_WEBHOOK', value: '********', description: 'Slack notifications webhook URL', encrypted: true },
    ];

    // StatusBadge Component - Reusable status indicator
    const StatusBadge = ({ status, size = 'md' }) => {
      const configs = {
        active: { icon: 'check-circle', color: 'emerald', label: 'Active' },
        paused: { icon: 'pause', color: 'amber', label: 'Paused' },
        success: { icon: 'check-circle', color: 'emerald', label: 'Success' },
        failed: { icon: 'x-circle', color: 'red', label: 'Failed' },
        running: { icon: 'loader', color: 'blue', label: 'Running', animate: true },
        healthy: { icon: 'check-circle', color: 'emerald', label: 'Healthy' },
        degraded: { icon: 'alert-triangle', color: 'amber', label: 'Degraded' },
        warning: { icon: 'alert-triangle', color: 'amber', label: 'Warning' },
        available: { icon: 'check-circle', color: 'emerald', label: 'Available' },
      };
      const config = configs[status] || configs.active;
      const sizeClasses = size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-sm px-2 py-1';
      return (
        <span className={`inline-flex items-center gap-1.5 ${sizeClasses} rounded-full font-medium bg-${config.color}-500/20 text-${config.color}-300 border border-${config.color}-500/30`}>
          <Icon name={config.icon} size={size === 'sm' ? 10 : 12} className={config.animate ? 'animate-spin' : ''} />
          {config.label}
        </span>
      );
    };

    // PlatformBadge Component - Shows Step Function vs MWAA
    const PlatformBadge = ({ target }) => {
      const isMAWA = target === 'mwaa';
      return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
          isMAWA ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
        }`}>
          <Icon name={isMAWA ? 'git-branch' : 'zap'} size={10} />
          {isMAWA ? 'Airflow' : 'Step Function'}
        </span>
      );
    };

    // FakeGraph Component - SVG line chart
    const FakeGraph = ({ color = 'emerald', height = 100, data, label }) => {
      const points = data || Array.from({ length: 30 }, (_, i) => 50 + Math.sin(i * 0.5) * 30 + Math.random() * 20);
      const max = Math.max(...points);
      const min = Math.min(...points);
      const range = max - min || 1;
      const pathData = points.map((p, i) => {
        const x = (i / (points.length - 1)) * 100;
        const y = 10 + (1 - ((p - min) / range)) * 80;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
      const areaData = pathData + ` L 100 95 L 0 95 Z`;
      const colorMap = { emerald: '#10b981', cyan: '#06b6d4', amber: '#f59e0b', red: '#ef4444', pink: '#ec4899', violet: '#8b5cf6' };
      const strokeColor = colorMap[color] || colorMap.emerald;
      const gradientId = `grad-${color}-${Math.random().toString(36).substr(2, 9)}`;
      return (
        <div className="relative">
          {label && <div className="text-xs text-gray-500 mb-2">{label}</div>}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaData} fill={`url(#${gradientId})`} />
            <path d={pathData} fill="none" stroke={strokeColor} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{points.length > 60 ? '6mo ago' : points.length > 30 ? '3mo ago' : '30d ago'}</span>
            <span>Now</span>
          </div>
        </div>
      );
    };

    // CostWidget Component - Shows cost with trend
    const CostWidget = ({ label, cost, trend, color = 'emerald' }) => (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400">
            <Icon name="dollar-sign" size={16} />
            <span className="text-sm">{label}</span>
          </div>
          {trend !== undefined && (
            <span className={`text-xs flex items-center gap-1 ${trend < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              <Icon name={trend < 0 ? 'trending-down' : 'trending-up'} size={12} />
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        <div className={`text-2xl font-semibold mt-1 text-${color}-400`}>
          ${cost.toLocaleString()}
        </div>
      </div>
    );

    // M.O.M. - Compute/Infrastructure resources (no databases)
    const mockInfraResources = [
      { id: 1, name: 'order-processor', type: 'lambda', runtime: 'Python 3.11', status: 'active', memory: '1024 MB', region: 'us-east-1', owner: 'orders-team', created: '2024-09-10', monthlyCost: '$45', invocations: '2.4M/mo', avgDuration: '234ms', errors: '0.02%', timeout: '30s', description: 'Processes incoming orders and validates inventory. Triggers downstream fulfillment workflows.' },
      { id: 2, name: 'payment-api', type: 'ecs', image: 'payment-api:v2.3.1', status: 'running', tasks: '3/3', region: 'us-east-1', owner: 'payments-team', created: '2024-07-01', monthlyCost: '$890', cpu: '45%', memory: '62%', requests: '8.5K/min', latency: '12ms', description: 'Payment processing API service. Handles card tokenization, payment authorization, and settlement.' },
      { id: 3, name: 'analytics-cluster', type: 'emr', version: 'emr-6.10.0', status: 'waiting', nodes: '1 + 4', region: 'us-east-1', owner: 'data-platform', created: '2024-11-20', monthlyCost: '$1,250', jobsRun: 156, uptime: '99.2%', storage: '2.4 TB', description: 'Spark cluster for analytics and reporting. Runs nightly ETL jobs and ad-hoc queries.' },
      { id: 4, name: 'image-resizer', type: 'lambda', runtime: 'Node.js 20', status: 'active', memory: '512 MB', region: 'us-east-1', owner: 'media-team', created: '2024-10-05', monthlyCost: '$28', invocations: '850K/mo', avgDuration: '180ms', errors: '0.01%', timeout: '15s', description: 'Resizes and optimizes uploaded images. Triggered by S3 events.' },
      { id: 5, name: 'fraud-detection', type: 'ecs', image: 'fraud-ml:v1.2.0', status: 'running', tasks: '2/2', region: 'us-east-1', owner: 'risk-team', created: '2024-08-15', monthlyCost: '$650', cpu: '68%', memory: '74%', requests: '3.2K/min', latency: '45ms', description: 'ML-based fraud detection service. Analyzes transactions in real-time.' },
      { id: 6, name: 'api-gateway-01', type: 'ec2', instanceType: 't3.xlarge', status: 'running', size: '4 vCPU / 16 GB', region: 'us-east-1', owner: 'platform-ops', created: '2024-03-10', monthlyCost: '$125', cpu: '34%', memory: '52%', network: '450 Mbps', disk: '45%', description: 'API Gateway load balancer instance. Handles incoming traffic distribution.' },
      { id: 7, name: 'jenkins-master', type: 'ec2', instanceType: 'm5.2xlarge', status: 'running', size: '8 vCPU / 32 GB', region: 'us-east-1', owner: 'devops-team', created: '2024-01-15', monthlyCost: '$280', cpu: '62%', memory: '71%', network: '120 Mbps', disk: '68%', description: 'Jenkins CI/CD master server. Orchestrates build and deployment pipelines.' },
      { id: 8, name: 'bastion-host', type: 'ec2', instanceType: 't3.medium', status: 'running', size: '2 vCPU / 4 GB', region: 'us-east-1', owner: 'security-team', created: '2024-02-20', monthlyCost: '$35', cpu: '8%', memory: '22%', network: '25 Mbps', disk: '12%', description: 'Secure bastion host for SSH access. Provides controlled entry to private subnets.' },
      { id: 9, name: 'kafka-broker-01', type: 'ec2', instanceType: 'r5.xlarge', status: 'running', size: '4 vCPU / 32 GB', region: 'us-east-1', owner: 'data-platform', created: '2024-05-08', monthlyCost: '$195', cpu: '45%', memory: '78%', network: '850 Mbps', disk: '56%', description: 'Kafka broker for event streaming. Handles high-throughput message processing.' },
      { id: 10, name: 'monitoring-server', type: 'ec2', instanceType: 'm5.xlarge', status: 'running', size: '4 vCPU / 16 GB', region: 'us-east-1', owner: 'platform-ops', created: '2024-04-12', monthlyCost: '$145', cpu: '28%', memory: '65%', network: '200 Mbps', disk: '42%', description: 'Prometheus and Grafana monitoring stack. Collects metrics from all services.' },
      { id: 11, name: 'lending-api-gw', type: 'apigateway', apiType: 'HTTP', status: 'active', size: 'Regional', region: 'us-east-1', owner: 'loans-origination', created: '2024-02-15', monthlyCost: '$185', requests: '2.4M/mo', latency: '12ms', routes: 24, stages: ['prod', 'staging'], description: 'API Gateway for lending services. Handles authentication, rate limiting, and request routing.' },
      { id: 12, name: 'partner-api-gw', type: 'apigateway', apiType: 'REST', status: 'active', size: 'Regional', region: 'us-east-1', owner: 'integration-team', created: '2024-03-20', monthlyCost: '$320', requests: '4.1M/mo', latency: '18ms', routes: 45, stages: ['prod', 'sandbox'], description: 'Partner-facing API Gateway. Provides external API access with usage plans and API keys.' },
      { id: 13, name: 'websocket-gw', type: 'apigateway', apiType: 'WebSocket', status: 'active', size: 'Regional', region: 'us-east-1', owner: 'platform-ops', created: '2024-05-10', monthlyCost: '$95', connections: '12K active', messages: '850K/day', routes: 8, stages: ['prod'], description: 'WebSocket API for real-time notifications. Powers live updates in dashboard applications.' },
      { id: 14, name: 'order-enrichment-pipe', type: 'pipe', source: 'SQS: order-queue', target: 'EventBridge: order-bus', status: 'running', size: 'On-demand', region: 'us-east-1', owner: 'orders-team', created: '2024-06-01', monthlyCost: '$45', throughput: '2.8K/hr', enrichment: 'Lambda', filterRate: '15%', description: 'Enriches order events with customer data before routing to EventBridge.' },
      { id: 15, name: 'payment-sync-pipe', type: 'pipe', source: 'DynamoDB Streams', target: 'Kinesis: payment-stream', status: 'running', size: 'On-demand', region: 'us-east-1', owner: 'payments-team', created: '2024-04-15', monthlyCost: '$68', throughput: '5.2K/hr', enrichment: 'None', filterRate: '0%', description: 'Streams payment table changes to Kinesis for real-time analytics.' },
      { id: 16, name: 'audit-log-pipe', type: 'pipe', source: 'Kinesis: app-logs', target: 'S3: audit-archive', status: 'running', size: 'On-demand', region: 'us-east-1', owner: 'security-team', created: '2024-01-20', monthlyCost: '$32', throughput: '12K/hr', enrichment: 'Lambda', filterRate: '40%', description: 'Filters and archives audit-relevant events to S3 for compliance.' },
    ];

    // U.N.C.L.E. - Data Storage resources
    const mockDatastores = [
      { id: 1, name: 'loan-service-db', type: 'aurora', engine: 'Aurora PostgreSQL 15', status: 'available', size: 'db.r6g.large', region: 'us-east-1', owner: 'loans-origination', created: '2024-06-15', monthlyCost: '$485', storage: '500 GB', connections: 42, cpu: '23%', iops: '1,250', description: 'Primary database for loan origination service. Contains customer applications, loan products, and pricing data.' },
      { id: 2, name: 'user-profiles', type: 'mongodb', engine: 'MongoDB Atlas M30', status: 'available', size: 'M30', region: 'us-east-1', owner: 'identity-team', created: '2024-08-22', monthlyCost: '$624', nodes: 3, collections: 45, documents: '2.8M', storage: '125 GB', description: 'User profile and preferences store. Powers personalization and user settings across all applications.' },
      { id: 3, name: 'orders-table', type: 'dynamodb', mode: 'On-demand', status: 'active', region: 'us-east-1', owner: 'orders-team', created: '2024-04-20', monthlyCost: '$156', reads: '12.5K/sec', writes: '3.2K/sec', items: '4.2M', size: '8.5 GB', description: 'Orders table with order items and status. Supports high-throughput order processing.' },
      { id: 4, name: 'analytics-db', type: 'dsql', engine: 'Aurora DSQL', status: 'available', region: 'us-east-1, us-west-2', owner: 'data-platform', created: '2024-02-10', monthlyCost: '$890', queries: '2.4K/day', storage: '1.2 TB', users: 45, description: 'Distributed SQL database for analytics. Powers BI dashboards and executive reports with strong consistency.' },
      { id: 5, name: 'document-store', type: 'mongodb', engine: 'MongoDB Atlas M40', status: 'available', size: 'M40', region: 'us-east-1', owner: 'content-team', created: '2024-05-30', monthlyCost: '$420', nodes: 3, collections: 28, documents: '1.8M', storage: '45 GB', description: 'Document store for CMS and content management. Stores articles, templates, and media metadata.' },
      { id: 6, name: 'payments-ledger', type: 'aurora', engine: 'Aurora PostgreSQL 15', status: 'available', size: 'db.r6g.xlarge', region: 'us-east-1', owner: 'payments-team', created: '2024-07-15', monthlyCost: '$750', storage: '800 GB', connections: 85, cpu: '34%', iops: '2,500', description: 'Payment ledger and transaction history. ACID-compliant for financial operations.' },
    ];

    // B.R.O. - Networking resources
    const mockNetworkResources = [
      // VPCs
      { id: 1, name: 'prod-vpc', type: 'vpc', cidr: '10.0.0.0/16', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-05', monthlyCost: '$125', subnets: 12, routeTables: 6, nacls: 4, flowLogs: true, description: 'Production VPC hosting all production workloads. Multi-AZ with public and private subnets.' },
      { id: 2, name: 'staging-vpc', type: 'vpc', cidr: '10.1.0.0/16', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-10', monthlyCost: '$85', subnets: 8, routeTables: 4, nacls: 3, flowLogs: true, description: 'Staging VPC for pre-production testing. Mirrors production architecture at smaller scale.' },
      { id: 3, name: 'dev-vpc', type: 'vpc', cidr: '10.2.0.0/16', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-15', monthlyCost: '$45', subnets: 6, routeTables: 3, nacls: 2, flowLogs: false, description: 'Development VPC for engineering teams. Isolated environment for feature development.' },
      { id: 4, name: 'shared-services-vpc', type: 'vpc', cidr: '10.10.0.0/16', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-02-01', monthlyCost: '$95', subnets: 6, routeTables: 4, nacls: 3, flowLogs: true, description: 'Shared services VPC for common infrastructure. Hosts monitoring, logging, and CI/CD systems.' },
      // Transit Gateways
      { id: 5, name: 'main-tgw', type: 'tgw', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-20', monthlyCost: '$450', attachments: 8, routeTables: 3, associations: 8, propagations: 12, bandwidth: '50 Gbps', description: 'Primary Transit Gateway connecting all VPCs. Hub for east-west traffic routing.' },
      { id: 6, name: 'cross-region-tgw', type: 'tgw', status: 'available', region: 'us-west-2', owner: 'platform-ops', created: '2024-03-01', monthlyCost: '$380', attachments: 4, routeTables: 2, associations: 4, propagations: 6, bandwidth: '25 Gbps', description: 'West region Transit Gateway. Peered with main TGW for cross-region connectivity.' },
      { id: 7, name: 'partner-tgw', type: 'tgw', status: 'available', region: 'us-east-1', owner: 'integration-team', created: '2024-04-15', monthlyCost: '$280', attachments: 3, routeTables: 2, associations: 3, propagations: 4, bandwidth: '10 Gbps', description: 'Partner Transit Gateway for B2B integrations. Isolated routing for external partner connectivity.' },
      // VPN Connections
      { id: 8, name: 'datacenter-vpn-01', type: 'vpn', status: 'up', region: 'us-east-1', owner: 'network-ops', created: '2024-02-10', monthlyCost: '$125', tunnels: '2/2', encryption: 'AES-256', remoteIp: '203.0.113.10', localCidr: '10.0.0.0/8', remoteCidr: '172.16.0.0/12', throughput: '1.25 Gbps', description: 'Primary VPN to on-premises datacenter. Encrypted tunnel for hybrid connectivity.' },
      { id: 9, name: 'datacenter-vpn-02', type: 'vpn', status: 'up', region: 'us-east-1', owner: 'network-ops', created: '2024-02-10', monthlyCost: '$125', tunnels: '2/2', encryption: 'AES-256', remoteIp: '203.0.113.20', localCidr: '10.0.0.0/8', remoteCidr: '172.16.0.0/12', throughput: '1.25 Gbps', description: 'Backup VPN to on-premises datacenter. Failover path for high availability.' },
      { id: 10, name: 'partner-bank-vpn', type: 'vpn', status: 'up', region: 'us-east-1', owner: 'integration-team', created: '2024-05-20', monthlyCost: '$95', tunnels: '2/2', encryption: 'AES-256-GCM', remoteIp: '198.51.100.50', localCidr: '10.100.0.0/16', remoteCidr: '192.168.50.0/24', throughput: '500 Mbps', description: 'VPN tunnel to partner bank for payment processing. Secure B2B connectivity.' },
      { id: 11, name: 'dr-site-vpn', type: 'vpn', status: 'down', region: 'us-west-2', owner: 'network-ops', created: '2024-03-15', monthlyCost: '$85', tunnels: '0/2', encryption: 'AES-256', remoteIp: '203.0.113.100', localCidr: '10.0.0.0/8', remoteCidr: '172.20.0.0/16', throughput: '0 Mbps', description: 'VPN to DR site. Currently in maintenance mode.' },
      // Direct Connect
      { id: 12, name: 'dx-primary', type: 'directconnect', status: 'available', region: 'us-east-1', owner: 'network-ops', created: '2024-01-25', monthlyCost: '$650', connection: '10 Gbps', vifs: 4, location: 'Equinix DC6', lagId: 'dxlag-abc123', jumboFrames: true, macSec: true, description: 'Primary Direct Connect to Equinix datacenter. Dedicated 10G link for low-latency connectivity.' },
      { id: 13, name: 'dx-backup', type: 'directconnect', status: 'available', region: 'us-east-1', owner: 'network-ops', created: '2024-02-01', monthlyCost: '$330', connection: '1 Gbps', vifs: 2, location: 'CoreSite VA1', lagId: null, jumboFrames: true, macSec: false, description: 'Backup Direct Connect at alternate facility. Provides path diversity for resilience.' },
      // Route 53 Hosted Zones
      { id: 14, name: 'fanniemae.com', type: 'route53', zoneType: 'public', status: 'active', region: 'global', owner: 'platform-ops', created: '2024-01-01', monthlyCost: '$85', records: 245, queries: '12.5M/mo', healthChecks: 18, trafficPolicies: 3, description: 'Primary public hosted zone. Manages all public DNS records for fanniemae.com domain.' },
      { id: 15, name: 'internal.fm.com', type: 'route53', zoneType: 'private', status: 'active', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-05', monthlyCost: '$45', records: 520, queries: '45M/mo', healthChecks: 42, vpcs: 4, description: 'Private hosted zone for internal services. Service discovery across all VPCs.' },
      { id: 16, name: 'api.fanniemae.com', type: 'route53', zoneType: 'public', status: 'active', region: 'global', owner: 'platform-ops', created: '2024-02-15', monthlyCost: '$125', records: 85, queries: '28M/mo', healthChecks: 12, trafficPolicies: 5, description: 'API subdomain zone with latency-based routing. Serves API traffic with geo-aware DNS.' },
      // Peering Connections
      { id: 17, name: 'prod-to-shared', type: 'peering', status: 'active', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-25', monthlyCost: '$0', requester: 'prod-vpc', accepter: 'shared-services-vpc', requesterCidr: '10.0.0.0/16', accepterCidr: '10.10.0.0/16', description: 'VPC peering between production and shared services. Enables access to monitoring and logging.' },
      { id: 18, name: 'staging-to-shared', type: 'peering', status: 'active', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-25', monthlyCost: '$0', requester: 'staging-vpc', accepter: 'shared-services-vpc', requesterCidr: '10.1.0.0/16', accepterCidr: '10.10.0.0/16', description: 'VPC peering between staging and shared services. Provides staging access to common tools.' },
      // PrivateLink Endpoints
      { id: 19, name: 's3-endpoint', type: 'privatelink', endpointType: 'Gateway', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-10', monthlyCost: '$0', service: 'com.amazonaws.us-east-1.s3', vpc: 'prod-vpc', subnets: 0, securityGroups: 0, description: 'Gateway endpoint for S3 access. Enables private connectivity to S3 without NAT gateway costs.' },
      { id: 20, name: 'dynamodb-endpoint', type: 'privatelink', endpointType: 'Gateway', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-01-10', monthlyCost: '$0', service: 'com.amazonaws.us-east-1.dynamodb', vpc: 'prod-vpc', subnets: 0, securityGroups: 0, description: 'Gateway endpoint for DynamoDB. Provides free private access to DynamoDB tables.' },
      { id: 21, name: 'secrets-manager-endpoint', type: 'privatelink', endpointType: 'Interface', status: 'available', region: 'us-east-1', owner: 'security-team', created: '2024-02-05', monthlyCost: '$21', service: 'com.amazonaws.us-east-1.secretsmanager', vpc: 'prod-vpc', subnets: 3, securityGroups: 2, eniCount: 3, privateDns: true, description: 'Interface endpoint for Secrets Manager. Secure access to secrets without internet exposure.' },
      { id: 22, name: 'ecr-api-endpoint', type: 'privatelink', endpointType: 'Interface', status: 'available', region: 'us-east-1', owner: 'platform-ops', created: '2024-02-10', monthlyCost: '$21', service: 'com.amazonaws.us-east-1.ecr.api', vpc: 'prod-vpc', subnets: 3, securityGroups: 1, eniCount: 3, privateDns: true, description: 'ECR API endpoint for container registry access. Enables private Docker image pulls.' },
      { id: 23, name: 'kms-endpoint', type: 'privatelink', endpointType: 'Interface', status: 'available', region: 'us-east-1', owner: 'security-team', created: '2024-01-15', monthlyCost: '$21', service: 'com.amazonaws.us-east-1.kms', vpc: 'prod-vpc', subnets: 3, securityGroups: 2, eniCount: 3, privateDns: true, description: 'KMS endpoint for encryption key operations. All encryption happens over private network.' },
      { id: 24, name: 'payment-service-endpoint', type: 'privatelink', endpointType: 'Interface', status: 'available', region: 'us-east-1', owner: 'payments-team', created: '2024-03-20', monthlyCost: '$35', service: 'vpce-svc-payment-gateway', vpc: 'prod-vpc', subnets: 3, securityGroups: 3, eniCount: 3, privateDns: true, description: 'PrivateLink service for partner payment gateway. Secure B2B connectivity without VPN.' },
    ];

    // Istio Mesh Resources - Services, Virtual Services, Gateways, Policies
    const mockMeshResources = [
      // Services (backend services in the mesh)
      { id: 1, name: 'loan-service', type: 'service', namespace: 'lending', status: 'healthy', host: 'loan-service.lending.svc.cluster.local', port: 8080, protocol: 'HTTP', endpoints: 3, owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-15' },
      { id: 2, name: 'user-service', type: 'service', namespace: 'identity', status: 'healthy', host: 'user-service.identity.svc.cluster.local', port: 8080, protocol: 'HTTP', endpoints: 2, owner: 'identity-team', bu: 'Enterprise', created: '2024-01-20' },
      { id: 3, name: 'payment-gateway', type: 'service', namespace: 'payments', status: 'degraded', host: 'payment-gateway.payments.svc.cluster.local', port: 8443, protocol: 'HTTPS', endpoints: 3, owner: 'payments-team', bu: 'Enterprise', created: '2024-02-10' },
      { id: 4, name: 'notification-service', type: 'service', namespace: 'comms', status: 'healthy', host: 'notification-service.comms.svc.cluster.local', port: 8080, protocol: 'HTTP', endpoints: 2, owner: 'platform-ops', bu: 'Enterprise', created: '2024-04-05' },
      { id: 5, name: 'mortgage-calc', type: 'service', namespace: 'lending', status: 'healthy', host: 'mortgage-calc.lending.svc.cluster.local', port: 8080, protocol: 'gRPC', endpoints: 3, owner: 'loans-origination', bu: 'Single-Family', created: '2024-05-12' },
      // Virtual Services (traffic routing)
      { id: 6, name: 'loan-api-routes', type: 'virtualservice', namespace: 'lending', status: 'healthy', host: 'api.lending.fm.com', gateway: 'lending-gateway', routes: 12, owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-16' },
      { id: 7, name: 'user-api-routes', type: 'virtualservice', namespace: 'identity', status: 'healthy', host: 'api.identity.fm.com', gateway: 'identity-gateway', routes: 8, owner: 'identity-team', bu: 'Enterprise', created: '2024-01-21' },
      { id: 8, name: 'payment-routes', type: 'virtualservice', namespace: 'payments', status: 'healthy', host: 'api.payments.fm.com', gateway: 'payments-gateway', routes: 15, owner: 'payments-team', bu: 'Enterprise', created: '2024-02-11' },
      { id: 9, name: 'public-api-routes', type: 'virtualservice', namespace: 'istio-system', status: 'healthy', host: 'api.fanniemae.com', gateway: 'public-gateway', routes: 45, owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-10' },
      // Ingress Gateways (external traffic entry)
      { id: 10, name: 'public-gateway', type: 'ingress', namespace: 'istio-system', status: 'healthy', hosts: ['api.fanniemae.com', 'portal.fanniemae.com'], tls: 'MUTUAL', port: 443, owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-05' },
      { id: 11, name: 'lending-gateway', type: 'ingress', namespace: 'lending', status: 'healthy', hosts: ['api.lending.fm.com'], tls: 'SIMPLE', port: 443, owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-10' },
      { id: 12, name: 'partner-gateway', type: 'ingress', namespace: 'integration', status: 'healthy', hosts: ['partner-api.fm.com'], tls: 'MUTUAL', port: 443, owner: 'integration-team', bu: 'Enterprise', created: '2024-04-20' },
      // Egress Gateways (controlled external calls)
      { id: 13, name: 'bank-egress', type: 'egress', namespace: 'payments', status: 'healthy', hosts: ['*.bankofamerica.com', '*.chase.com', '*.wellsfargo.com'], tls: 'ORIGINATE', port: 443, owner: 'payments-team', bu: 'Enterprise', created: '2024-02-15' },
      { id: 14, name: 'credit-bureau-egress', type: 'egress', namespace: 'lending', status: 'healthy', hosts: ['api.equifax.com', 'api.experian.com', 'api.transunion.com'], tls: 'ORIGINATE', port: 443, owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-20' },
      { id: 15, name: 'snowflake-egress', type: 'egress', namespace: 'data', status: 'healthy', hosts: ['*.snowflakecomputing.com'], tls: 'ORIGINATE', port: 443, owner: 'data-platform', bu: 'Enterprise', created: '2024-05-01' },
      // East-West Gateways (cross-cluster/namespace traffic)
      { id: 28, name: 'lending-to-payments', type: 'eastwest', namespace: 'istio-system', status: 'healthy', hosts: ['*.payments.svc.cluster.local'], tls: 'MUTUAL', port: 15443, owner: 'platform-ops', bu: 'Enterprise', created: '2024-02-01' },
      { id: 29, name: 'identity-mesh', type: 'eastwest', namespace: 'istio-system', status: 'healthy', hosts: ['*.identity.svc.cluster.local', '*.lending.svc.cluster.local'], tls: 'MUTUAL', port: 15443, owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-15' },
      { id: 30, name: 'cross-cluster-gw', type: 'eastwest', namespace: 'istio-system', status: 'healthy', hosts: ['*.cluster-east.fm.com', '*.cluster-west.fm.com'], tls: 'MUTUAL', port: 15443, owner: 'platform-ops', bu: 'Enterprise', created: '2024-03-05' },
      // Destination Rules (load balancing, circuit breakers)
      { id: 16, name: 'loan-service-dr', type: 'destinationrule', namespace: 'lending', status: 'healthy', host: 'loan-service', trafficPolicy: 'ROUND_ROBIN', circuitBreaker: true, mtls: 'STRICT', owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-17' },
      { id: 17, name: 'payment-gateway-dr', type: 'destinationrule', namespace: 'payments', status: 'warning', host: 'payment-gateway', trafficPolicy: 'LEAST_CONN', circuitBreaker: true, mtls: 'STRICT', owner: 'payments-team', bu: 'Enterprise', created: '2024-02-12' },
      { id: 18, name: 'external-banks-dr', type: 'destinationrule', namespace: 'payments', status: 'healthy', host: '*.bankofamerica.com', trafficPolicy: 'ROUND_ROBIN', circuitBreaker: true, mtls: 'SIMPLE', owner: 'payments-team', bu: 'Enterprise', created: '2024-02-16' },
      // Authorization Policies (access control)
      { id: 19, name: 'lending-authz', type: 'authpolicy', namespace: 'lending', status: 'healthy', action: 'ALLOW', principals: ['cluster.local/ns/identity/sa/user-service'], rules: 5, owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-18' },
      { id: 20, name: 'payments-authz', type: 'authpolicy', namespace: 'payments', status: 'healthy', action: 'ALLOW', principals: ['cluster.local/ns/lending/sa/*'], rules: 8, owner: 'payments-team', bu: 'Enterprise', created: '2024-02-13' },
      { id: 21, name: 'deny-external', type: 'authpolicy', namespace: 'istio-system', status: 'healthy', action: 'DENY', principals: ['*'], rules: 3, owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-06' },
      // ServiceEntry (external services registry)
      { id: 22, name: 'stripe-api', type: 'serviceentry', namespace: 'payments', status: 'healthy', hosts: ['api.stripe.com'], location: 'MESH_EXTERNAL', resolution: 'DNS', ports: [{ number: 443, protocol: 'HTTPS' }], owner: 'payments-team', bu: 'Enterprise', created: '2024-02-20' },
      { id: 23, name: 'google-apis', type: 'serviceentry', namespace: 'istio-system', status: 'healthy', hosts: ['*.googleapis.com'], location: 'MESH_EXTERNAL', resolution: 'DNS', ports: [{ number: 443, protocol: 'HTTPS' }], owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-15' },
      { id: 24, name: 'plaid-api', type: 'serviceentry', namespace: 'lending', status: 'healthy', hosts: ['api.plaid.com', 'sandbox.plaid.com'], location: 'MESH_EXTERNAL', resolution: 'DNS', ports: [{ number: 443, protocol: 'HTTPS' }], owner: 'loans-origination', bu: 'Single-Family', created: '2024-03-25' },
      { id: 25, name: 'twilio-api', type: 'serviceentry', namespace: 'comms', status: 'healthy', hosts: ['api.twilio.com'], location: 'MESH_EXTERNAL', resolution: 'DNS', ports: [{ number: 443, protocol: 'HTTPS' }], owner: 'platform-ops', bu: 'Enterprise', created: '2024-04-10' },
      { id: 26, name: 'datadog-intake', type: 'serviceentry', namespace: 'monitoring', status: 'healthy', hosts: ['intake.logs.datadoghq.com', 'api.datadoghq.com'], location: 'MESH_EXTERNAL', resolution: 'DNS', ports: [{ number: 443, protocol: 'HTTPS' }], owner: 'platform-ops', bu: 'Enterprise', created: '2024-01-20' },
      { id: 27, name: 'legacy-mainframe', type: 'serviceentry', namespace: 'integration', status: 'warning', hosts: ['mainframe.internal.fm.com'], location: 'MESH_INTERNAL', resolution: 'STATIC', ports: [{ number: 5250, protocol: 'TCP' }], endpoints: ['10.50.100.15', '10.50.100.16'], owner: 'integration-team', bu: 'Enterprise', created: '2024-05-05' },
    ];

    // WASM Plugins for Envoy
    const mockWasmPlugins = [
      // rate-limiter module used by 3 plugins with different configs
      { id: 1, name: 'rate-limiter-public', namespace: 'istio-system', status: 'active', enabled: true, phase: 'AUTHN', image: 'oci://gcr.io/fm-wasm/rate-limiter:v1.2.0', module: 'rate-limiter', version: 'v1.2.0', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'istio': 'ingressgateway' } }, targetGateway: 'public-gateway', priority: 100, owner: 'platform-ops', bu: 'Enterprise', created: '2024-08-15', config: { requests_per_minute: 1000, burst: 50 }, metrics: { requests: '1.2M', blocked: '2.4K' } },
      { id: 7, name: 'rate-limiter-partner', namespace: 'integration', status: 'active', enabled: true, phase: 'AUTHN', image: 'oci://gcr.io/fm-wasm/rate-limiter:v1.2.0', module: 'rate-limiter', version: 'v1.2.0', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'gateway': 'partner' } }, targetGateway: 'partner-gateway', priority: 100, owner: 'integration-team', bu: 'Enterprise', created: '2024-09-20', config: { requests_per_minute: 500, burst: 25 }, metrics: { requests: '340K', blocked: '890' } },
      { id: 8, name: 'rate-limiter-internal', namespace: 'istio-system', status: 'active', enabled: true, phase: 'AUTHN', image: 'oci://gcr.io/fm-wasm/rate-limiter:v1.2.0', module: 'rate-limiter', version: 'v1.2.0', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'gateway': 'internal' } }, targetGateway: 'internal-gateway', priority: 100, owner: 'platform-ops', bu: 'Enterprise', created: '2024-10-01', config: { requests_per_minute: 5000, burst: 200 }, metrics: { requests: '4.5M', blocked: '120' } },
      // jwt-validator module used by 2 plugins
      { id: 2, name: 'jwt-validator-public', namespace: 'istio-system', status: 'active', enabled: true, phase: 'AUTHN', image: 'oci://gcr.io/fm-wasm/jwt-validator:v2.0.1', module: 'jwt-validator', version: 'v2.0.1', sourceType: 'OCI', pullPolicy: 'Always', selector: { matchLabels: { 'app': 'api-gateway' } }, targetGateway: 'public-gateway', priority: 90, owner: 'identity-team', bu: 'Enterprise', created: '2024-07-20', config: { issuer: 'https://auth.fanniemae.com', audience: 'api.fanniemae.com' }, metrics: { requests: '890K', rejected: '1.2K' } },
      { id: 9, name: 'jwt-validator-partner', namespace: 'integration', status: 'active', enabled: true, phase: 'AUTHN', image: 'oci://gcr.io/fm-wasm/jwt-validator:v2.0.1', module: 'jwt-validator', version: 'v2.0.1', sourceType: 'OCI', pullPolicy: 'Always', selector: { matchLabels: { 'gateway': 'partner' } }, targetGateway: 'partner-gateway', priority: 90, owner: 'identity-team', bu: 'Enterprise', created: '2024-08-15', config: { issuer: 'https://partner-auth.fanniemae.com', audience: 'partner-api.fanniemae.com' }, metrics: { requests: '125K', rejected: '340' } },
      // Single-use modules
      { id: 3, name: 'pii-redactor', namespace: 'lending', status: 'active', enabled: true, phase: 'STATS', image: 'oci://gcr.io/fm-wasm/pii-redactor:v1.0.3', module: 'pii-redactor', version: 'v1.0.3', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'app': 'loan-service' } }, targetGateway: 'lending-gateway', priority: 200, owner: 'loans-origination', bu: 'Single-Family', created: '2024-09-01', config: { redact_fields: ['ssn', 'dob', 'account_number'], log_level: 'INFO' }, metrics: { requests: '450K', redacted: '12.5K' } },
      { id: 4, name: 'header-injector', namespace: 'payments', status: 'active', enabled: true, phase: 'AUTHZ', image: 'oci://gcr.io/fm-wasm/header-injector:v1.1.0', module: 'header-injector', version: 'v1.1.0', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'app': 'payment-gateway' } }, targetGateway: 'payments-gateway', priority: 150, owner: 'payments-team', bu: 'Enterprise', created: '2024-06-10', config: { headers: { 'X-Request-ID': 'uuid()', 'X-Correlation-ID': 'header(traceparent)' } }, metrics: { requests: '340K', injected: '340K' } },
      { id: 5, name: 'request-transformer', namespace: 'integration', status: 'warning', enabled: false, phase: 'AUTHN', image: 'https://storage.fm.com/wasm/request-transformer-v0.9.0.wasm', module: 'request-transformer', version: 'v0.9.0', sourceType: 'HTTP', pullPolicy: 'Always', selector: { matchLabels: { 'gateway': 'partner' } }, targetGateway: 'partner-gateway', priority: 80, owner: 'integration-team', bu: 'Enterprise', created: '2024-10-05', config: { transform_body: true, xml_to_json: true }, metrics: { requests: '0', errors: '0' } },
      { id: 6, name: 'audit-logger', namespace: 'istio-system', status: 'active', enabled: true, phase: 'STATS', image: 'oci://gcr.io/fm-wasm/audit-logger:v1.3.2', module: 'audit-logger', version: 'v1.3.2', sourceType: 'OCI', pullPolicy: 'IfNotPresent', selector: { matchLabels: { 'audit': 'enabled' } }, targetGateway: 'public-gateway', priority: 250, owner: 'compliance-team', bu: 'Enterprise', created: '2024-05-25', config: { log_request: true, log_response: true, sensitive_headers: ['Authorization'] }, metrics: { requests: '2.1M', logged: '2.1M' } },
    ];

    // Lua Filters (script definitions) - the global filter objects
    const mockLuaFilterDefs = [
      { name: 'custom-cors', version: 'v1.0.0', sourceType: 'inline', script: 'function envoy_on_request(handle)\n  handle:headers():add("Access-Control-Allow-Origin", "*")\nend', owner: 'platform-ops', bu: 'Enterprise', created: '2024-04-10' },
      { name: 'response-enricher', version: 'v2.1.0', sourceType: 'configmap', script: 'function envoy_on_response(handle)\n  handle:headers():add("X-Served-By", os.getenv("SERVICE_NAME"))\nend', owner: 'loans-origination', bu: 'Single-Family', created: '2024-06-15' },
      { name: 'debug-headers', version: 'v1.0.0', sourceType: 'inline', script: 'function envoy_on_request(handle)\n  handle:logInfo("Request: " .. handle:headers():get(":path"))\nend', owner: 'payments-team', bu: 'Enterprise', created: '2024-07-01' },
      { name: 'path-rewriter', version: 'v1.2.0', sourceType: 'file', script: 'function envoy_on_request(handle)\n  local path = handle:headers():get(":path")\n  if string.match(path, "^/v1/") then\n    handle:headers():replace(":path", string.gsub(path, "^/v1/", "/api/"))\n  end\nend', owner: 'integration-team', bu: 'Enterprise', created: '2024-08-20' },
      { name: 'tenant-router', version: 'v3.0.1', sourceType: 'inline', script: 'function envoy_on_request(handle)\n  local tenant = handle:headers():get("X-Tenant-ID")\n  if tenant then\n    handle:headers():add("X-Upstream-Cluster", tenant .. "-cluster")\n  end\nend\nfunction envoy_on_response(handle)\n  handle:headers():add("X-Processed-By", "tenant-router")\nend', owner: 'platform-ops', bu: 'Enterprise', created: '2024-09-10' },
      { name: 'auth-enricher', version: 'v1.0.0-beta', sourceType: 'configmap', script: 'function envoy_on_request(handle)\n  -- TODO: Add auth enrichment\nend', owner: 'identity-team', bu: 'Enterprise', created: '2024-11-01' },
    ];

    // Lua Filter Configs (individual service configurations) - each is independent like WASM plugins
    const mockLuaFilters = [
      // custom-cors filter used by 2 services with different configs
      { id: 1, name: 'custom-cors-public', filter: 'custom-cors', namespace: 'istio-system', target: 'public-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'request', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '1.5M', errors: '0' } },
      { id: 2, name: 'custom-cors-partner', filter: 'custom-cors', namespace: 'integration', target: 'partner-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'request', operation: 'INSERT_AFTER', targetFilter: 'envoy.filters.http.jwt_authn', validated: true, targetExists: true, metrics: { invocations: '600K', errors: '0' } },
      // response-enricher used by 2 services
      { id: 3, name: 'response-enricher-loans', filter: 'response-enricher', namespace: 'lending', target: 'loan-service', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'SIDECAR_OUTBOUND', listener: { portNumber: 8080 } }, hookType: 'response', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '450K', errors: '12' } },
      { id: 4, name: 'response-enricher-payments', filter: 'response-enricher', namespace: 'payments', target: 'payment-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'SIDECAR_OUTBOUND' }, hookType: 'response', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '280K', errors: '3' } },
      // debug-headers - single service, disabled
      { id: 5, name: 'debug-headers-payments', filter: 'debug-headers', namespace: 'payments', target: 'payment-gateway', status: 'inactive', enabled: false, applyTo: 'HTTP_FILTER', match: { context: 'SIDECAR_INBOUND' }, hookType: 'request', operation: 'INSERT_FIRST', targetFilter: null, validated: true, targetExists: true, metrics: { invocations: '0', errors: '0' } },
      // path-rewriter used by 2 gateways
      { id: 6, name: 'path-rewriter-partner', filter: 'path-rewriter', namespace: 'integration', target: 'partner-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY', listener: { portNumber: 443 } }, hookType: 'request', operation: 'INSERT_AFTER', targetFilter: 'envoy.filters.http.jwt_authn', validated: true, targetExists: true, metrics: { invocations: '125K', errors: '0' } },
      { id: 7, name: 'path-rewriter-public', filter: 'path-rewriter', namespace: 'istio-system', target: 'public-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'request', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '340K', errors: '2' } },
      // tenant-router - used by 3 services
      { id: 8, name: 'tenant-router-public', filter: 'tenant-router', namespace: 'istio-system', target: 'public-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'both', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '890K', errors: '5' } },
      { id: 9, name: 'tenant-router-partner', filter: 'tenant-router', namespace: 'integration', target: 'partner-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'both', operation: 'INSERT_BEFORE', targetFilter: 'envoy.filters.http.router', validated: true, targetExists: true, metrics: { invocations: '340K', errors: '1' } },
      { id: 10, name: 'tenant-router-internal', filter: 'tenant-router', namespace: 'istio-system', target: 'internal-gateway', status: 'active', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'GATEWAY' }, hookType: 'request', operation: 'INSERT_AFTER', targetFilter: 'envoy.filters.http.ext_authz', validated: true, targetExists: true, metrics: { invocations: '1.2M', errors: '0' } },
      // auth-enricher - single service with warning
      { id: 11, name: 'auth-enricher-users', filter: 'auth-enricher', namespace: 'identity', target: 'user-service', status: 'warning', enabled: true, applyTo: 'HTTP_FILTER', match: { context: 'SIDECAR_INBOUND' }, hookType: 'request', operation: 'INSERT_AFTER', targetFilter: 'envoy.filters.http.ext_authz', validated: false, targetExists: false, metrics: { invocations: '0', errors: '0' } },
    ];

    // Certificates (TLS, mTLS, cert-manager)
    const mockCertificates = [
      { id: 1, name: 'public-gateway-tls', namespace: 'istio-system', type: 'gateway', issuer: 'DigiCert', status: 'valid', dnsNames: ['api.fanniemae.com', 'portal.fanniemae.com'], notAfter: '2025-06-15', daysRemaining: 172, autoRenew: true, owner: 'platform-ops', created: '2024-06-15' },
      { id: 2, name: 'lending-gateway-tls', namespace: 'lending', type: 'gateway', issuer: 'cert-manager/letsencrypt', status: 'valid', dnsNames: ['api.lending.fm.com'], notAfter: '2025-03-20', daysRemaining: 85, autoRenew: true, owner: 'loans-origination', created: '2024-12-20' },
      { id: 3, name: 'partner-gateway-mtls', namespace: 'integration', type: 'mtls', issuer: 'cert-manager/internal-ca', status: 'valid', dnsNames: ['partner-api.fm.com'], notAfter: '2025-02-10', daysRemaining: 47, autoRenew: true, owner: 'integration-team', created: '2024-11-10' },
      { id: 4, name: 'payments-client-cert', namespace: 'payments', type: 'client', issuer: 'cert-manager/internal-ca', status: 'expiring', dnsNames: ['payments.internal'], notAfter: '2025-01-15', daysRemaining: 21, autoRenew: false, owner: 'payments-team', created: '2024-01-15' },
      { id: 5, name: 'mesh-ca-root', namespace: 'istio-system', type: 'ca', issuer: 'Self-signed', status: 'valid', dnsNames: ['istiod.istio-system.svc'], notAfter: '2026-01-01', daysRemaining: 372, autoRenew: false, owner: 'platform-ops', created: '2024-01-01' },
      { id: 6, name: 'external-bank-mtls', namespace: 'payments', type: 'mtls', issuer: 'Bank of America CA', status: 'valid', dnsNames: ['*.bankofamerica.com'], notAfter: '2025-08-30', daysRemaining: 248, autoRenew: false, owner: 'payments-team', created: '2024-08-30' },
      { id: 7, name: 'snowflake-client', namespace: 'data', type: 'client', issuer: 'Snowflake CA', status: 'valid', dnsNames: ['*.snowflakecomputing.com'], notAfter: '2025-05-01', daysRemaining: 127, autoRenew: false, owner: 'data-platform', created: '2024-05-01' },
    ];

    // Security resources (PeerAuth, RequestAuth)
    const mockSecurityPolicies = [
      { id: 1, name: 'mesh-strict-mtls', namespace: 'istio-system', type: 'PeerAuthentication', mode: 'STRICT', selector: null, status: 'enforced', owner: 'platform-ops', created: '2024-01-05' },
      { id: 2, name: 'lending-mtls', namespace: 'lending', type: 'PeerAuthentication', mode: 'STRICT', selector: { app: 'loan-service' }, status: 'enforced', owner: 'loans-origination', created: '2024-03-15' },
      { id: 3, name: 'payments-permissive', namespace: 'payments', type: 'PeerAuthentication', mode: 'PERMISSIVE', selector: { app: 'legacy-adapter' }, status: 'warning', owner: 'payments-team', created: '2024-02-10' },
      { id: 4, name: 'jwt-auth-gateway', namespace: 'istio-system', type: 'RequestAuthentication', issuer: 'https://auth.fanniemae.com', jwksUri: 'https://auth.fanniemae.com/.well-known/jwks.json', status: 'active', owner: 'identity-team', created: '2024-01-10' },
      { id: 5, name: 'partner-jwt-auth', namespace: 'integration', type: 'RequestAuthentication', issuer: 'https://partners.fanniemae.com', jwksUri: 'https://partners.fanniemae.com/.well-known/jwks.json', status: 'active', owner: 'integration-team', created: '2024-04-20' },
      { id: 6, name: 'internal-jwt-auth', namespace: 'lending', type: 'RequestAuthentication', issuer: 'https://internal-auth.fm.com', jwksUri: 'https://internal-auth.fm.com/.well-known/jwks.json', status: 'active', owner: 'identity-team', created: '2024-03-01' },
    ];

    // Legacy reference for backward compatibility
    const mockServices = mockMeshResources.filter(r => r.type === 'service');

    // Mesh resource statistics
    const getMeshStats = (resources) => ({
      total: resources.length,
      services: resources.filter(r => r.type === 'service').length,
      virtualServices: resources.filter(r => r.type === 'virtualservice').length,
      ingress: resources.filter(r => r.type === 'ingress').length,
      egress: resources.filter(r => r.type === 'egress').length,
      eastwest: resources.filter(r => r.type === 'eastwest').length,
      destinationRules: resources.filter(r => r.type === 'destinationrule').length,
      authPolicies: resources.filter(r => r.type === 'authpolicy').length,
      serviceEntries: resources.filter(r => r.type === 'serviceentry').length,
      healthy: resources.filter(r => r.status === 'healthy').length,
      degraded: resources.filter(r => r.status === 'degraded' || r.status === 'warning').length,
    });

    const mockMessaging = [
      { id: 1, name: 'order-events', type: 'sns', subscribers: 4, messagesDay: '45.2K', status: 'active', zone: 'local', owner: 'orders-team', created: '2024-05-12', monthlyCost: '$125', retention: 'N/A', encryption: 'AWS KMS', deliveryRate: '99.98%', description: 'Order lifecycle events topic. Publishes order created, updated, shipped, and delivered events.' },
      { id: 2, name: 'payment-queue', type: 'sqs', depth: 23, messagesDay: '12.8K', status: 'active', zone: 'local', owner: 'payments-team', created: '2024-06-01', monthlyCost: '$85', retention: '14 days', encryption: 'AWS KMS', avgProcessTime: '245ms', description: 'Payment processing queue. Handles async payment authorization and capture requests.' },
      { id: 3, name: 'enterprise-bus', type: 'eventbridge', rules: 47, messagesDay: '892K', status: 'active', zone: 'central', owner: 'platform-ops', created: '2024-01-15', monthlyCost: '$450', retention: 'Archive enabled', encryption: 'AWS KMS', targets: 23, description: 'Central event bus for cross-domain integration. Routes events between business domains using content-based filtering.' },
      { id: 4, name: 'data-stream', type: 'kafka', partitions: 12, messagesDay: '2.4M', status: 'active', zone: 'central', owner: 'data-platform', created: '2024-03-20', monthlyCost: '$680', retention: '7 days', encryption: 'TLS 1.3', consumerGroups: 8, description: 'High-throughput data stream for analytics and real-time processing. Powers dashboards and ML pipelines.' },
      { id: 5, name: 'shipping-dlq', type: 'sqs', depth: 156, messagesDay: '0.3K', status: 'warning', zone: 'local', owner: 'logistics-team', created: '2024-07-10', monthlyCost: '$12', retention: '14 days', encryption: 'AWS KMS', avgAge: '6 hours', description: 'Dead letter queue for failed shipping notifications. Messages require manual investigation and replay.' },
    ];

    // Main App
    const App = () => {
      // URL-based navigation
      const getInitialNav = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('dashboard') || 'rosie';
      };

      const [activeNav, setActiveNavState] = useState(getInitialNav);
      const [activeTab, setActiveTab] = useState('jobs');

      // Update URL when navigation changes
      const setActiveNav = (nav) => {
        setActiveNavState(nav);
        const url = new URL(window.location);
        url.searchParams.set('dashboard', nav);
        window.history.pushState({}, '', url);
      };

      // Handle browser back/forward
      React.useEffect(() => {
        const handlePopState = () => {
          const params = new URLSearchParams(window.location.search);
          setActiveNavState(params.get('dashboard') || 'rosie');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
      }, []);

      // ROSIE state
      const [showNewJob, setShowNewJob] = useState(false);
      const [designerMode, setDesignerMode] = useState('visual');
      const [filterStatus, setFilterStatus] = useState('all');
      const [filterTarget, setFilterTarget] = useState('all');
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedJob, setSelectedJob] = useState(null);
      const [selectedRun, setSelectedRun] = useState(null);
      const [showTriggerModal, setShowTriggerModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [jobToAction, setJobToAction] = useState(null);
      const [notification, setNotification] = useState(null);
      const [editingJob, setEditingJob] = useState(null);
      const [showDiagnostics, setShowDiagnostics] = useState(false);
      const [operatorCategory, setOperatorCategory] = useState('all');
      const [selectedNode, setSelectedNode] = useState(null);
      const [runLogExpanded, setRunLogExpanded] = useState(null);
      const [runsFilter, setRunsFilter] = useState('all');
      const [runsSearch, setRunsSearch] = useState('');
      const [metricsResource, setMetricsResource] = useState(null);
      const [metricsTimeRange, setMetricsTimeRange] = useState('1m');
      const [viewMessagesResource, setViewMessagesResource] = useState(null);
      const [datastoreMetrics, setDatastoreMetrics] = useState(null);
      const [datastoreMetricsTimeRange, setDatastoreMetricsTimeRange] = useState('1h');

      // M.O.M., D.A.D., A.U.N.T.I.E., U.N.C.L.E. state
      const [selectedResource, setSelectedResource] = useState(null);
      const [selectedService, setSelectedService] = useState(null);
      const [selectedMessaging, setSelectedMessaging] = useState(null);
      const [selectedDatastore, setSelectedDatastore] = useState(null);
      const [momFilter, setMomFilter] = useState('All');
      const [broFilter, setBroFilter] = useState('All');
      const [selectedNetworkResource, setSelectedNetworkResource] = useState(null);
      const [showNewNetworkResource, setShowNewNetworkResource] = useState(false);
      const [newNetworkData, setNewNetworkData] = useState({ name: '', type: 'vpc', cidr: '', region: 'us-east-1', owner: '', description: '' });
      const [uncleFilter, setUncleFilter] = useState('All');
      const [dadFilter, setDadFilter] = useState('All');
      const [securityFilter, setSecurityFilter] = useState('All');
      const [certFilter, setCertFilter] = useState('All');
      const [wasmFilter, setWasmFilter] = useState('Enabled');
      const [luaFilter, setLuaFilter] = useState('All');
      const [dadActiveTab, setDadActiveTab] = useState('resources');
      const [expandedWasmModules, setExpandedWasmModules] = useState([]);
      const [expandedLuaFilters, setExpandedLuaFilters] = useState([]);
      const [editingLuaFilter, setEditingLuaFilter] = useState(null);
      const [viewingLuaScript, setViewingLuaScript] = useState(null);
      const [auntieFilter, setAuntieFilter] = useState('All');
      const [showNewMessaging, setShowNewMessaging] = useState(false);
      const [editingMessaging, setEditingMessaging] = useState(null);
      const [newMessagingData, setNewMessagingData] = useState({ name: '', type: 'sqs', zone: 'local', description: '' });
      const [newMessagingTab, setNewMessagingTab] = useState('blueprints');
      const [selectedBlueprint, setSelectedBlueprint] = useState(null);
      const [showNewDatastore, setShowNewDatastore] = useState(false);
      const [newDatastoreData, setNewDatastoreData] = useState({ name: '', type: 'aurora', engine: '', region: 'us-east-1', owner: '', description: '' });
      const [showNewMomResource, setShowNewMomResource] = useState(false);
      const [newMomData, setNewMomData] = useState({ name: '', type: 'ec2', size: '', region: 'us-east-1', owner: '', description: '' });
      const [rosieStatusFilter, setRosieStatusFilter] = useState('All');
      const [editingResource, setEditingResource] = useState(null);
      const [editFormData, setEditFormData] = useState({});
      const [creatingResource, setCreatingResource] = useState(false);
      const [newResourceType, setNewResourceType] = useState('service');
      const [newResourceData, setNewResourceData] = useState({ name: '', namespace: 'default' });
      const [editingWasmPlugin, setEditingWasmPlugin] = useState(null);
      const [editingVirtualService, setEditingVirtualService] = useState(null);
      const [vsFilterTab, setVsFilterTab] = useState('details');
      const [dadDetailEditMode, setDadDetailEditMode] = useState(false);
      // Full-screen Service Editor state (ROSIE-style)
      const [showServiceEditor, setShowServiceEditor] = useState(false);
      const [serviceEditorResource, setServiceEditorResource] = useState(null);
      const [serviceEditorMode, setServiceEditorMode] = useState('visual'); // 'visual' or 'code'
      const [serviceFilterCategory, setServiceFilterCategory] = useState('all'); // 'all', 'lua', 'wasm'
      const [selectedFilterNode, setSelectedFilterNode] = useState(null);
      const [serviceFilterChain, setServiceFilterChain] = useState([]);
      const [savedServiceFilters, setSavedServiceFilters] = useState({}); // Persisted filter configs by service name
      const [savedMomResources, setSavedMomResources] = useState([]); // M.O.M. created resources
      const [savedMessaging, setSavedMessaging] = useState([]); // A.U.N.T.I.E. created resources
      const [savedJobs, setSavedJobs] = useState([]); // R.O.S.I.E. created jobs
      const [savedDadResources, setSavedDadResources] = useState([]); // D.A.D. created resources
      const [savedDatastores, setSavedDatastores] = useState([]); // U.N.C.L.E. created datastores
      // U.N.C.L.E. Full-screen Datastore Editor state
      const [showDatastoreEditor, setShowDatastoreEditor] = useState(false);
      const [datastoreEditorResource, setDatastoreEditorResource] = useState(null);
      const [datastoreEditorMode, setDatastoreEditorMode] = useState('visual'); // 'visual' or 'code'
      const [datastoreConfig, setDatastoreConfig] = useState({});
      const [showSettings, setShowSettings] = useState(false);
      const [featureFlags, setFeatureFlags] = useState({
        mom: true,
        uncle: true,
        dad: true,
        auntie: true,
        rosie: true,
        bro: false,
        darkMode: true,
        notifications: true,
        autoRefresh: false,
        dadSecurity: false,
        dadCertificates: false,
        dadLua: false
      });

      // Helper function to get existing WASM filters for a service (checks saved first, then mock data)
      const getServiceFilters = (service) => {
        // Return saved configuration if it exists
        if (savedServiceFilters[service.name]) {
          return savedServiceFilters[service.name];
        }
        // Otherwise return default mock data
        const mockFilters = {
          'loan-service': [
            { id: 1, name: 'JWT Auth', icon: 'key', desc: 'Validate JWT tokens', phase: 'AUTHN', config: { issuer: 'https://auth.fm.com', audience: 'loan-api' } },
            { id: 2, name: 'RBAC', icon: 'users', desc: 'Role-based access control', phase: 'AUTHZ', config: { policy: 'allow-authenticated' } },
            { id: 3, name: 'Tracing', icon: 'activity', desc: 'Distributed tracing', phase: 'STATS', config: { sampling: '100%' } }
          ],
          'user-service': [
            { id: 1, name: 'OAuth2', icon: 'lock', desc: 'OAuth2 authentication', phase: 'AUTHN', config: { provider: 'okta' } },
            { id: 2, name: 'Rate Limit', icon: 'gauge', desc: 'Request rate limiting', phase: 'AUTHZ', config: { requests_per_minute: 1000 } }
          ],
          'payment-gateway': [
            { id: 1, name: 'mTLS', icon: 'shield', desc: 'Mutual TLS enforcement', phase: 'AUTHN', config: { mode: 'STRICT' } },
            { id: 2, name: 'JWT Auth', icon: 'key', desc: 'Validate JWT tokens', phase: 'AUTHN', config: { issuer: 'https://auth.fm.com' } },
            { id: 3, name: 'RBAC', icon: 'users', desc: 'Role-based access control', phase: 'AUTHZ', config: { policy: 'payments-access' } },
            { id: 4, name: 'Audit', icon: 'clipboard', desc: 'Audit logging', phase: 'STATS', config: { log_level: 'INFO' } }
          ],
          'notification-service': [
            { id: 1, name: 'JWT Auth', icon: 'key', desc: 'Validate JWT tokens', phase: 'AUTHN', config: {} },
            { id: 2, name: 'Metrics', icon: 'bar-chart-2', desc: 'Custom metrics', phase: 'STATS', config: {} }
          ]
        };
        const vsFilters = {
          'loan-vs': [
            { id: 1, name: 'CORS', icon: 'globe', desc: 'Cross-origin settings', phase: 'AUTHN', config: { origins: ['*.fm.com'] } },
            { id: 2, name: 'Path Rewrite', icon: 'edit-3', desc: 'URL path manipulation', phase: 'AUTHZ', config: { prefix: '/api/v2' } },
            { id: 3, name: 'Timeout', icon: 'clock', desc: 'Request timeouts', phase: 'UNSPECIFIED', config: { timeout: '30s' } }
          ],
          'payment-vs': [
            { id: 1, name: 'Rate Limit', icon: 'gauge', desc: 'Request rate limiting', phase: 'AUTHZ', config: { requests_per_minute: 500 } },
            { id: 2, name: 'Circuit Breaker', icon: 'zap-off', desc: 'Prevent cascade failures', phase: 'AUTHZ', config: { threshold: 5 } },
            { id: 3, name: 'Retry', icon: 'refresh-cw', desc: 'Automatic retry logic', phase: 'UNSPECIFIED', config: { attempts: 3 } }
          ]
        };
        return service.type === 'virtualservice'
          ? (vsFilters[service.name] || [])
          : (mockFilters[service.name] || []);
      };

      const [jobConfig, setJobConfig] = useState({
        name: '', scheduleType: 'cron', cronExpression: '0 2 * * *',
        rateValue: '5', rateUnit: 'minutes', timezone: 'America/New_York',
        target: 'eventbridge', retries: 3, flexibleWindow: '15', tags: ['team:loans', 'env:prod']
      });
      const [workflowNodes, setWorkflowNodes] = useState([
        { id: 1, type: 's3', name: 'Wait for S3 File', color: 'blue', config: { bucket: 'loan-data-bucket', prefix: 'raw/', wildcard: '*.parquet' } },
        { id: 2, type: 'glue', name: 'Transform Data', color: 'amber', config: { job_name: 'loan-transform-glue', allocated_capacity: 2 } },
        { id: 3, type: 'aurora', name: 'Load to DW', color: 'emerald', config: { connection: 'analytics-aurora', schema: 'analytics', table: 'loan_facts' } },
        { id: 4, type: 'sns', name: 'Send Alert', color: 'pink', config: { topic_arn: 'arn:aws:sns:us-east-1:loan-alerts', message: 'Pipeline completed' } },
      ]);

      // Combine mock jobs with saved jobs (saved jobs override mock jobs by id, maintaining order)
      const allJobs = [
        ...mockJobs.map(m => savedJobs.find(s => s.id === m.id) || m), // Replace mock with saved if exists
        ...savedJobs.filter(s => !mockJobs.find(m => m.id === s.id))   // Add new saved jobs not in mock
      ];

      // Filter jobs based on current filters
      const filteredJobs = allJobs.filter(job => {
        const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
        const matchesTarget = filterTarget === 'all' || job.target === filterTarget;
        const matchesSearch = !searchQuery || job.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesTarget && matchesSearch;
      });

      // Calculate ROSIE stats
      const rosieStats = {
        active: allJobs.filter(j => j.status === 'active').length,
        paused: allJobs.filter(j => j.status === 'paused').length,
        failed24h: allJobs.filter(j => j.lastRunStatus === 'failed').length,
        successRate: allJobs.length > 0 ? (allJobs.reduce((acc, j) => acc + (j.successRate || 0), 0) / allJobs.length).toFixed(1) : '0'
      };

      // Show notification helper
      const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
      };

      // Handle trigger job
      const handleTriggerJob = (job) => {
        setJobToAction(job);
        setShowTriggerModal(true);
      };

      // Handle delete job
      const handleDeleteJob = (job) => {
        setJobToAction(job);
        setShowDeleteModal(true);
      };

      // Confirm trigger
      const confirmTrigger = () => {
        showNotification(`Job "${jobToAction.name}" triggered successfully`);
        setShowTriggerModal(false);
        setJobToAction(null);
      };

      // Confirm delete
      const confirmDelete = () => {
        showNotification(`Job "${jobToAction.name}" deleted`, 'warning');
        setShowDeleteModal(false);
        setJobToAction(null);
      };

      // Handle edit job - opens the DAG editor with job data
      const handleEditJob = (job) => {
        setEditingJob(job);
        setJobConfig({
          name: job.name,
          description: job.description || '',
          scheduleType: job.schedule?.startsWith('rate') ? 'rate' : 'cron',
          cronExpression: job.schedule?.startsWith('rate') ? '0 2 * * *' : (job.schedule || '0 2 * * *'),
          rateValue: '1',
          rateUnit: 'hours',
          timezone: 'America/New_York',
          target: job.target || 'eventbridge',
          retries: 3,
          flexibleWindow: '15',
          tags: job.tags || []
        });
        // Load workflow nodes based on job type - include color and config from nodeTypeConfigs
        if (job.type === 'dag') {
          setWorkflowNodes([
            { id: 1, type: 's3', name: 'Read Source', color: 'blue', config: { bucket: '', prefix: '', wildcard: '*.csv' } },
            { id: 2, type: 'glue', name: 'Transform Data', color: 'amber', config: { job_name: '', allocated_capacity: 2 } },
            { id: 3, type: 'aurora', name: 'Load to DW', color: 'blue', config: { connection: '', query: '' } },
            { id: 4, type: 'sns', name: 'Send Alert', color: 'pink', config: { topic_arn: '', message: '' } },
          ]);
        } else {
          setWorkflowNodes([
            { id: 1, type: 'lambda', name: job.name, color: 'amber', config: { function_name: '', payload: '{}' } },
          ]);
        }
        setSelectedJob(null);
        setShowNewJob(true);
      };

      // Handle closing the designer
      const handleCloseDesigner = () => {
        setShowNewJob(false);
        setEditingJob(null);
        setSelectedNode(null);
        setOperatorCategory('all');
        // Reset job config
        setJobConfig({
          name: '', scheduleType: 'cron', cronExpression: '0 2 * * *',
          rateValue: '5', rateUnit: 'minutes', timezone: 'America/New_York',
          target: 'eventbridge', retries: 3, flexibleWindow: '15', tags: []
        });
      };

      // Handle saving job
      const handleSaveJob = () => {
        if (!jobConfig.name && !editingJob) {
          showNotification('Please enter a job name', 'error');
          return;
        }
        if (editingJob) {
          // Update existing job - preserve all original fields and update specific ones
          const updatedJob = {
            ...editingJob,
            name: jobConfig.name || editingJob.name,
            description: jobConfig.description || editingJob.description || '',
            schedule: jobConfig.cronExpression || editingJob.schedule,
            scheduleHuman: jobConfig.scheduleType === 'cron' ? (jobConfig.cronExpression || editingJob.schedule) : `Every ${jobConfig.rateValue} ${jobConfig.rateUnit}`,
            target: jobConfig.target || editingJob.target,
            tags: jobConfig.tags || editingJob.tags || [],
            taskCount: workflowNodes.length
          };
          // Check if job exists in savedJobs
          const existsInSaved = savedJobs.find(j => j.id === editingJob.id);
          if (existsInSaved) {
            const newSaved = savedJobs.map(j => j.id === editingJob.id ? updatedJob : j);
            setSavedJobs(newSaved);
          } else {
            // Job is from mockJobs, add to savedJobs (will override in allJobs)
            const newSaved = [...savedJobs, updatedJob];
            setSavedJobs(newSaved);
          }
          showNotification(`Job "${updatedJob.name}" updated successfully`, 'success');
        } else {
          // Create new job
          const newJob = {
            id: Date.now(),
            name: jobConfig.name,
            type: 'dag',
            target: jobConfig.target,
            schedule: jobConfig.cronExpression,
            scheduleHuman: jobConfig.scheduleType === 'cron' ? jobConfig.cronExpression : `Every ${jobConfig.rateValue} ${jobConfig.rateUnit}`,
            status: 'active',
            lastRun: 'Never',
            lastRunStatus: 'pending',
            nextRun: 'Pending',
            owner: 'current-user',
            tags: jobConfig.tags || [],
            successRate: 0,
            avgDuration: '-',
            estimatedCost: '$0.00',
            taskCount: workflowNodes.length,
            description: jobConfig.description || ''
          };
          setSavedJobs([...savedJobs, newJob]);
          showNotification(`Job "${jobConfig.name}" created successfully`, 'success');
        }
        handleCloseDesigner();
      };

      // Node management for designer
      const nodeTypeConfigs = {
        's3': { name: 'Wait for S3 File', color: 'blue', icon: 'hard-drive', operator: 'S3KeySensor', config: { bucket: '', prefix: '', wildcard: '*.csv' } },
        'aurora': { name: 'Aurora Query', color: 'blue', icon: 'database', operator: 'AuroraOperator', config: { connection: '', query: '' } },
        'api': { name: 'API Call', color: 'blue', icon: 'globe', operator: 'HTTPOperator', config: { endpoint: '', method: 'GET' } },
        'lambda': { name: 'Lambda Function', color: 'amber', icon: 'zap', operator: 'LambdaOperator', config: { function_name: '', payload: '{}' } },
        'glue': { name: 'Glue Job', color: 'amber', icon: 'refresh-cw', operator: 'GlueJobOperator', config: { job_name: '', allocated_capacity: 2 } },
        'batch': { name: 'Batch Job', color: 'amber', icon: 'layers', operator: 'BatchOperator', config: { job_definition: '', job_queue: 'default' } },
        'emr': { name: 'EMR Step', color: 'amber', icon: 'cpu', operator: 'EmrOperator', config: { cluster_id: '', step_name: '' } },
        's3-write': { name: 'S3 Write', color: 'emerald', icon: 'upload', operator: 'S3CopyOperator', config: { bucket: '', prefix: '' } },
        'dsql': { name: 'DSQL Load', color: 'emerald', icon: 'server', operator: 'DSQLOperator', config: { connection: '', schema: '', table: '' } },
        'dynamodb': { name: 'DynamoDB', color: 'emerald', icon: 'table', operator: 'DynamoDBOperator', config: { table_name: '' } },
        'sqs': { name: 'SQS Publish', color: 'emerald', icon: 'mail', operator: 'SQSOperator', config: { queue_url: '', message: '' } },
        'branch': { name: 'Branch', color: 'pink', icon: 'git-branch', operator: 'BranchOperator', config: { condition: '' } },
        'join': { name: 'Join', color: 'pink', icon: 'git-merge', operator: 'JoinOperator', config: { trigger_rule: 'all_success' } },
        'sensor': { name: 'Wait/Sensor', color: 'pink', icon: 'clock', operator: 'TimeSensor', config: { duration: 60 } },
        'sns': { name: 'SNS Notify', color: 'pink', icon: 'bell', operator: 'SnsPublishOperator', config: { topic_arn: '', message: '' } },
      };

      const handleAddNode = (type) => {
        const typeConfig = nodeTypeConfigs[type] || { name: type, color: 'gray', icon: 'box', operator: 'Operator', config: {} };
        const newNode = {
          id: Date.now(),
          type,
          name: typeConfig.name,
          color: typeConfig.color,
          config: { ...typeConfig.config }
        };
        setWorkflowNodes([...workflowNodes, newNode]);
        setSelectedNode(newNode);
        showNotification(`Added ${typeConfig.name} operator`);
      };

      const handleRemoveNode = (nodeId) => {
        setWorkflowNodes(workflowNodes.filter(n => n.id !== nodeId));
        if (selectedNode?.id === nodeId) setSelectedNode(null);
      };

      const handleSelectNode = (node) => {
        setSelectedNode(selectedNode?.id === node.id ? null : node);
      };

      const handleUpdateNodeConfig = (nodeId, key, value) => {
        setWorkflowNodes(workflowNodes.map(n =>
          n.id === nodeId ? { ...n, config: { ...n.config, [key]: value } } : n
        ));
        if (selectedNode?.id === nodeId) {
          setSelectedNode({ ...selectedNode, config: { ...selectedNode.config, [key]: value } });
        }
      };

      const handleUpdateNodeName = (nodeId, name) => {
        setWorkflowNodes(workflowNodes.map(n =>
          n.id === nodeId ? { ...n, name } : n
        ));
        if (selectedNode?.id === nodeId) {
          setSelectedNode({ ...selectedNode, name });
        }
      };

      const navItems = [
        { id: 'home', icon: 'home', label: 'Home', color: 'violet' },
        ...(featureFlags.mom ? [{ id: 'mom', icon: 'box', label: 'M.O.M.', subtitle: 'Infrastructure', color: 'violet' }] : []),
        ...(featureFlags.uncle ? [{ id: 'uncle', icon: 'database', label: 'U.N.C.L.E.', subtitle: 'Data Storage', color: 'blue' }] : []),
        ...(featureFlags.dad ? [{ id: 'dad', icon: 'shield', label: 'D.A.D.', subtitle: 'Service Mesh', color: 'amber' }] : []),
        ...(featureFlags.auntie ? [{ id: 'auntie', icon: 'message-square', label: 'A.U.N.T.I.E.', subtitle: 'Messaging', color: 'emerald' }] : []),
        ...(featureFlags.rosie ? [{ id: 'rosie', icon: 'clock', label: 'R.O.S.I.E.', subtitle: 'Scheduling', color: 'pink' }] : []),
        ...(featureFlags.bro ? [{ id: 'bro', icon: 'wifi', label: 'B.R.O.', subtitle: 'Networking', color: 'cyan' }] : []),
      ];

      const getTargetRecommendation = () => {
        if (jobConfig.target !== 'auto') return null;
        const hasComplexDeps = workflowNodes.length > 2;
        if (hasComplexDeps) {
          return { platform: 'mwaa', reason: 'Complex workflow detected - MWAA recommended for DAG visualization and dependency management' };
        }
        return { platform: 'eventbridge', reason: 'Simple schedule - Step Function recommended for low latency and cost' };
      };

      // HOME VIEW
      const HomeView = () => (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Welcome back, Luke</h1>
            <p className="text-gray-500 mt-1">Here's what's happening across your platform</p>
          </div>

          {/* Total Platform Cost Card */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2"><Icon name="dollar-sign" size={18} /><span className="text-sm font-medium">Total Monthly Platform Spend</span></div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-emerald-400">${platformTotal.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">vs ${platformCosts.legacyCost.toLocaleString()}/mo Control-M</span>
                </div>
                <div className="flex items-center gap-2 mt-2"><Icon name="trending-down" size={14} className="text-emerald-400" /><span className="text-sm text-emerald-400 font-medium">{platformSavings}% savings</span><span className="text-xs text-gray-500">from legacy migration</span></div>
              </div>
              <div className="flex gap-1">
                {[
                  { id: 'mom', label: 'M.O.M.', cost: platformCosts.mom.total, color: 'violet' },
                  { id: 'uncle', label: 'U.N.C.L.E.', cost: platformCosts.uncle.total, color: 'blue' },
                  { id: 'dad', label: 'D.A.D.', cost: platformCosts.dad.total, color: 'amber' },
                  { id: 'auntie', label: 'A.U.N.T.I.E.', cost: platformCosts.auntie.total, color: 'emerald' },
                  { id: 'rosie', label: 'R.O.S.I.E.', cost: platformCosts.rosie.total, color: 'pink' },
                  { id: 'bro', label: 'B.R.O.', cost: platformCosts.bro.total, color: 'cyan' },
                ].map((item, i) => (
                  <button key={i} onClick={() => setActiveNav(item.id)} className="text-center px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="text-xs text-gray-500">{item.label}</div>
                    <div className={`text-sm font-semibold text-${item.color}-400`}>${(item.cost/1000).toFixed(1)}K</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Family Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { id: 'mom', label: 'M.O.M.', persona: 'The Builder', domain: 'Infrastructure', icon: 'box', color: 'violet', cost: platformCosts.mom.total, stats: { compute: 5, lambda: 2, ecs: 2 } },
              { id: 'uncle', label: 'U.N.C.L.E.', persona: 'The Storyteller', domain: 'Data Storage', icon: 'database', color: 'blue', cost: platformCosts.uncle.total, stats: { datastores: 6, databases: 4, caches: 2 } },
              { id: 'dad', label: 'D.A.D.', persona: 'The Gatekeeper', domain: 'Service Mesh', icon: 'shield', color: 'amber', cost: platformCosts.dad.total, stats: { services: 28, meshed: 24, mtls: '86%' } },
              { id: 'auntie', label: 'A.U.N.T.I.E.', persona: 'The Connector', domain: 'Messaging', icon: 'message-square', color: 'emerald', cost: platformCosts.auntie.total, stats: { topics: 156, queues: 89, events: '2.4M/day' } },
              { id: 'rosie', label: 'R.O.S.I.E.', persona: 'The Housekeeper', domain: 'Scheduling', icon: 'clock', color: 'pink', cost: platformCosts.rosie.total, stats: { jobs: 234, active: 198, success: '99.2%' } },
              { id: 'bro', label: 'B.R.O.', persona: 'The Roadbuilder', domain: 'Networking', icon: 'wifi', color: 'cyan', cost: platformCosts.bro.total, stats: { vpcs: 4, tgw: 3, vpn: 4 } },
            ].map(family => (
              <button key={family.id} onClick={() => setActiveNav(family.id)} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 text-left hover:border-gray-600 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${family.color}-500/20 text-${family.color}-400 flex items-center justify-center`}>
                    <Icon name={family.icon} size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Monthly</div>
                    <div className={`text-sm font-semibold text-${family.color}-400`}>${(family.cost/1000).toFixed(1)}K</div>
                  </div>
                </div>
                <div className="font-semibold text-lg">{family.label}</div>
                <div className="text-sm text-gray-500">{family.persona} - {family.domain}</div>
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-700">
                  {Object.entries(family.stats).map(([key, value]) => (
                    <div key={key}><div className={`text-lg font-semibold text-${family.color}-400`}>{value}</div><div className="text-xs text-gray-500 capitalize">{key}</div></div>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
            <h2 className="font-medium mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { icon: 'check-circle', color: 'emerald', text: 'loan-etl-daily completed successfully', time: '2 hours ago', family: 'ROSIE', navId: 'rosie' },
                { icon: 'alert-triangle', color: 'amber', text: 'payment-gateway latency spike detected', time: '3 hours ago', family: 'DAD', navId: 'dad' },
                { icon: 'database', color: 'blue', text: 'New RDS instance analytics-db provisioned', time: '5 hours ago', family: 'UNCLE', navId: 'uncle' },
                { icon: 'mail', color: 'emerald', text: '156 messages in shipping-dlq require attention', time: '6 hours ago', family: 'AUNTIE', navId: 'auntie' },
              ].map((activity, i) => (
                <button key={i} onClick={() => setActiveNav(activity.navId)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 text-left transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-${activity.color}-500/20 text-${activity.color}-400 flex items-center justify-center`}>
                    <Icon name={activity.icon} size={16} />
                  </div>
                  <div className="flex-1"><div className="text-sm">{activity.text}</div><div className="text-xs text-gray-500">{activity.time}</div></div>
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">{activity.family}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );

      // M.O.M. VIEW (Infrastructure)
      const MOMView = () => (
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Monthly Spend</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1"><Icon name="trending-down" size={12} />{platformCosts.mom.trend}</span>
              </div>
              <div className="text-2xl font-semibold text-emerald-300">${platformCosts.mom.total.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">EC2 + Lambda + ECS + EMR + API GW + Pipes</div>
            </div>
            <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Total Resources</span>
                <Icon name="layers" size={14} className="text-violet-400" />
              </div>
              <div className="text-2xl font-semibold text-violet-300">{mockInfraResources.length}</div>
              <div className="text-xs text-gray-500 mt-1">{mockInfraResources.filter(r => r.type === 'ec2').length} EC2, {mockInfraResources.filter(r => r.type === 'lambda').length} Lambda, {mockInfraResources.filter(r => r.type === 'ecs').length} ECS, {mockInfraResources.filter(r => r.type === 'apigateway').length} API GW, {mockInfraResources.filter(r => r.type === 'pipe').length} Pipes</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Health Score</span>
                <Icon name="activity" size={14} className="text-blue-400" />
              </div>
              <div className="text-2xl font-semibold text-blue-300">{Math.round((mockInfraResources.filter(r => ['active', 'running', 'waiting'].includes(r.status)).length / mockInfraResources.length) * 100)}%</div>
              <div className="text-xs text-gray-500 mt-1">{mockInfraResources.filter(r => ['active', 'running', 'waiting'].includes(r.status)).length} healthy resources</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Active Alerts</span>
                <Icon name="alert-triangle" size={14} className="text-red-400" />
              </div>
              <div className="text-2xl font-semibold text-red-300">1</div>
              <div className="text-xs text-gray-500 mt-1">1 resource degraded</div>
            </div>
          </div>
          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            {[
              { id: 'All', count: mockInfraResources.length },
              { id: 'EC2', count: mockInfraResources.filter(r => r.type === 'ec2').length },
              { id: 'Lambda', count: mockInfraResources.filter(r => r.type === 'lambda').length },
              { id: 'ECS', count: mockInfraResources.filter(r => r.type === 'ecs').length },
              { id: 'EMR', count: mockInfraResources.filter(r => r.type === 'emr').length },
              { id: 'API GW', count: mockInfraResources.filter(r => r.type === 'apigateway').length },
              { id: 'Pipes', count: mockInfraResources.filter(r => r.type === 'pipe').length }
            ].map(cat => (
              <button key={cat.id} onClick={() => setMomFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${momFilter === cat.id ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                {cat.id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${momFilter === cat.id ? 'bg-violet-500/30 text-violet-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Configuration</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr></thead>
              <tbody>
                {mockInfraResources.filter(r => momFilter === 'All' || r.type.toLowerCase() === momFilter.toLowerCase() || (momFilter === 'API GW' && r.type === 'apigateway') || (momFilter === 'Pipes' && r.type === 'pipe')).map(r => (
                  <tr key={r.id} onClick={() => setSelectedResource(r)} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.type === 'ec2' ? 'bg-cyan-500/20 text-cyan-400' : r.type === 'apigateway' ? 'bg-pink-500/20 text-pink-400' : r.type === 'pipe' ? 'bg-teal-500/20 text-teal-400' : r.type === 'rds' ? 'bg-blue-500/20 text-blue-400' : r.type === 'elasticache' ? 'bg-red-500/20 text-red-400' : r.type === 'lambda' ? 'bg-amber-500/20 text-amber-400' : r.type === 'ecs' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        <Icon name={r.type === 'ec2' ? 'monitor' : r.type === 'apigateway' ? 'globe' : r.type === 'pipe' ? 'git-merge' : r.type === 'rds' ? 'database' : r.type === 'elasticache' ? 'zap' : r.type === 'lambda' ? 'cloud-lightning' : r.type === 'ecs' ? 'server' : 'activity'} size={16} />
                      </div>
                      <div><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.owner}</div></div>
                    </div></td>
                    <td className="px-4 py-3"><div><span className="text-sm text-gray-300 uppercase">{r.type === 'apigateway' ? 'API GW' : r.type}</span><div className="text-xs text-gray-500">{r.apiType || r.source || r.instanceType || r.engine || r.runtime || r.image || r.version}</div></div></td>
                    <td className="px-4 py-3"><code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{r.size || r.memory || r.tasks || r.nodes}</code></td>
                    <td className="px-4 py-3"><StatusBadge status={['available', 'active', 'running'].includes(r.status) ? 'healthy' : 'warning'} size="sm" /></td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{r.monthlyCost}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setSelectedResource(r); showNotification(`Editing ${r.name}...`); }} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title="Edit"><Icon name="edit" size={14} /></button>
                        <button onClick={() => showNotification(`Resource "${r.name}" deleted`, 'warning')} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resource Detail Panel */}
          {selectedResource && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedResource(null)} />
              <div className="relative w-[600px] bg-gray-900 border-l border-gray-700 overflow-auto">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedResource(null)} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedResource.type === 'ec2' ? 'bg-cyan-500/20 text-cyan-400' : selectedResource.type === 'apigateway' ? 'bg-pink-500/20 text-pink-400' : selectedResource.type === 'pipe' ? 'bg-teal-500/20 text-teal-400' : selectedResource.type === 'rds' ? 'bg-blue-500/20 text-blue-400' : selectedResource.type === 'elasticache' ? 'bg-red-500/20 text-red-400' : selectedResource.type === 'lambda' ? 'bg-amber-500/20 text-amber-400' : selectedResource.type === 'ecs' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'}`}>
                      <Icon name={selectedResource.type === 'ec2' ? 'monitor' : selectedResource.type === 'apigateway' ? 'globe' : selectedResource.type === 'pipe' ? 'git-merge' : selectedResource.type === 'rds' ? 'database' : selectedResource.type === 'elasticache' ? 'zap' : selectedResource.type === 'lambda' ? 'cloud-lightning' : selectedResource.type === 'ecs' ? 'server' : 'activity'} size={20} />
                    </div>
                    <div><div className="font-semibold">{selectedResource.name}</div><div className="text-xs text-gray-500">{selectedResource.owner}</div></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showNotification(`Cloning ${selectedResource.name}...`)} className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Clone"><Icon name="copy" size={16} /></button>
                    <button onClick={() => showNotification(`Restarting ${selectedResource.name}...`)} className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Restart"><Icon name="refresh-cw" size={16} /></button>
                    <button onClick={() => showNotification(`Editing ${selectedResource.name}...`)} className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"><Icon name="edit" size={14} className="inline mr-1.5" />Edit</button>
                    <button onClick={() => { showNotification(`Resource "${selectedResource.name}" deleted`, 'warning'); setSelectedResource(null); }} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={16} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={['available', 'active', 'running'].includes(selectedResource.status) ? 'healthy' : 'warning'} /></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Monthly Cost</div><div className="text-lg font-semibold text-emerald-400">{selectedResource.monthlyCost}</div></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Region</div><div className="text-sm text-gray-300">{selectedResource.region}</div></div>
                  </div>

                  {/* Resource Info */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="server" size={14} className="text-gray-400" />Configuration</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">Type</div><div className="text-gray-300 uppercase">{selectedResource.type}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Size</div><code className="text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{selectedResource.size || selectedResource.memory || selectedResource.tasks || selectedResource.nodes}</code></div>
                      <div><div className="text-xs text-gray-500 mb-1">{selectedResource.type === 'ec2' ? 'Instance Type' : selectedResource.type === 'apigateway' ? 'API Type' : selectedResource.type === 'pipe' ? 'Source' : 'Engine/Runtime'}</div><div className="text-gray-300">{selectedResource.apiType || selectedResource.source || selectedResource.instanceType || selectedResource.engine || selectedResource.runtime || selectedResource.image || selectedResource.version}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Created</div><div className="text-gray-300">{selectedResource.created}</div></div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-gray-400" />Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {selectedResource.cpu && <div><div className="text-xs text-gray-500 mb-1">CPU</div><div className="text-emerald-400">{selectedResource.cpu}</div></div>}
                      {selectedResource.memory && typeof selectedResource.memory === 'string' && selectedResource.memory.includes('%') && <div><div className="text-xs text-gray-500 mb-1">Memory</div><div className="text-emerald-400">{selectedResource.memory}</div></div>}
                      {selectedResource.storage && <div><div className="text-xs text-gray-500 mb-1">Storage</div><div className="text-gray-300">{selectedResource.storage}</div></div>}
                      {selectedResource.connections !== undefined && <div><div className="text-xs text-gray-500 mb-1">Connections</div><div className="text-gray-300">{selectedResource.connections}</div></div>}
                      {selectedResource.iops && <div><div className="text-xs text-gray-500 mb-1">IOPS</div><div className="text-gray-300">{selectedResource.iops}</div></div>}
                      {selectedResource.hitRate && <div><div className="text-xs text-gray-500 mb-1">Hit Rate</div><div className="text-emerald-400">{selectedResource.hitRate}</div></div>}
                      {selectedResource.invocations && <div><div className="text-xs text-gray-500 mb-1">Invocations</div><div className="text-gray-300">{selectedResource.invocations}</div></div>}
                      {selectedResource.avgDuration && <div><div className="text-xs text-gray-500 mb-1">Avg Duration</div><div className="text-gray-300">{selectedResource.avgDuration}</div></div>}
                      {selectedResource.errors && <div><div className="text-xs text-gray-500 mb-1">Error Rate</div><div className={parseFloat(selectedResource.errors) < 0.1 ? 'text-emerald-400' : 'text-amber-400'}>{selectedResource.errors}</div></div>}
                      {selectedResource.requests && <div><div className="text-xs text-gray-500 mb-1">Requests</div><div className="text-gray-300">{selectedResource.requests}</div></div>}
                      {selectedResource.latency && <div><div className="text-xs text-gray-500 mb-1">Latency</div><div className="text-emerald-400">{selectedResource.latency}</div></div>}
                      {selectedResource.uptime && <div><div className="text-xs text-gray-500 mb-1">Uptime</div><div className="text-emerald-400">{selectedResource.uptime}</div></div>}
                      {selectedResource.jobsRun !== undefined && <div><div className="text-xs text-gray-500 mb-1">Jobs Run</div><div className="text-gray-300">{selectedResource.jobsRun}</div></div>}
                      {selectedResource.network && <div><div className="text-xs text-gray-500 mb-1">Network</div><div className="text-cyan-400">{selectedResource.network}</div></div>}
                      {selectedResource.disk && <div><div className="text-xs text-gray-500 mb-1">Disk Usage</div><div className={parseInt(selectedResource.disk) > 70 ? 'text-amber-400' : 'text-emerald-400'}>{selectedResource.disk}</div></div>}
                      {selectedResource.routes !== undefined && <div><div className="text-xs text-gray-500 mb-1">Routes</div><div className="text-gray-300">{selectedResource.routes}</div></div>}
                      {selectedResource.stages && <div><div className="text-xs text-gray-500 mb-1">Stages</div><div className="text-gray-300">{selectedResource.stages?.join(', ')}</div></div>}
                      {selectedResource.connections && <div><div className="text-xs text-gray-500 mb-1">Connections</div><div className="text-gray-300">{selectedResource.connections}</div></div>}
                      {selectedResource.messages && <div><div className="text-xs text-gray-500 mb-1">Messages</div><div className="text-gray-300">{selectedResource.messages}</div></div>}
                      {selectedResource.target && <div><div className="text-xs text-gray-500 mb-1">Target</div><div className="text-gray-300">{selectedResource.target}</div></div>}
                      {selectedResource.throughput && <div><div className="text-xs text-gray-500 mb-1">Throughput</div><div className="text-emerald-400">{selectedResource.throughput}</div></div>}
                      {selectedResource.enrichment && <div><div className="text-xs text-gray-500 mb-1">Enrichment</div><div className="text-gray-300">{selectedResource.enrichment}</div></div>}
                      {selectedResource.filterRate && <div><div className="text-xs text-gray-500 mb-1">Filter Rate</div><div className="text-gray-300">{selectedResource.filterRate}</div></div>}
                    </div>
                  </div>

                  {/* Description */}
                  <div><h3 className="text-sm font-medium mb-2">Description</h3><p className="text-sm text-gray-400">{selectedResource.description}</p></div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

      // B.R.O. VIEW (Networking)
      const BROView = () => (
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Monthly Spend</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1"><Icon name="trending-down" size={12} />{platformCosts.bro.trend}%</span>
              </div>
              <div className="text-2xl font-semibold text-emerald-300">${platformCosts.bro.total.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">VPC + TGW + VPN + DX + R53</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Total Resources</span>
                <Icon name="wifi" size={14} className="text-cyan-400" />
              </div>
              <div className="text-2xl font-semibold text-cyan-300">{mockNetworkResources.length}</div>
              <div className="text-xs text-gray-500 mt-1">{mockNetworkResources.filter(r => r.type === 'vpc').length} VPC, {mockNetworkResources.filter(r => r.type === 'tgw').length} TGW, {mockNetworkResources.filter(r => r.type === 'vpn').length} VPN, {mockNetworkResources.filter(r => r.type === 'directconnect').length} DX</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Connectivity</span>
                <Icon name="activity" size={14} className="text-blue-400" />
              </div>
              <div className="text-2xl font-semibold text-blue-300">{Math.round((mockNetworkResources.filter(r => ['available', 'active', 'up'].includes(r.status)).length / mockNetworkResources.length) * 100)}%</div>
              <div className="text-xs text-gray-500 mt-1">{mockNetworkResources.filter(r => ['available', 'active', 'up'].includes(r.status)).length} healthy connections</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Active Alerts</span>
                <Icon name="alert-triangle" size={14} className="text-red-400" />
              </div>
              <div className="text-2xl font-semibold text-red-300">{mockNetworkResources.filter(r => r.status === 'down').length}</div>
              <div className="text-xs text-gray-500 mt-1">{mockNetworkResources.filter(r => r.status === 'down').length} connection down</div>
            </div>
          </div>
          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            {[
              { id: 'All', count: mockNetworkResources.length },
              { id: 'VPC', count: mockNetworkResources.filter(r => r.type === 'vpc').length },
              { id: 'TGW', count: mockNetworkResources.filter(r => r.type === 'tgw').length },
              { id: 'VPN', count: mockNetworkResources.filter(r => r.type === 'vpn').length },
              { id: 'Direct Connect', count: mockNetworkResources.filter(r => r.type === 'directconnect').length },
              { id: 'Route 53', count: mockNetworkResources.filter(r => r.type === 'route53').length },
              { id: 'Peering', count: mockNetworkResources.filter(r => r.type === 'peering').length },
              { id: 'PrivateLink', count: mockNetworkResources.filter(r => r.type === 'privatelink').length }
            ].map(cat => (
              <button key={cat.id} onClick={() => setBroFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${broFilter === cat.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                {cat.id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${broFilter === cat.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Configuration</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr></thead>
              <tbody>
                {mockNetworkResources.filter(r => broFilter === 'All' || r.type.toLowerCase() === broFilter.toLowerCase() || (broFilter === 'Direct Connect' && r.type === 'directconnect') || (broFilter === 'Route 53' && r.type === 'route53') || (broFilter === 'TGW' && r.type === 'tgw') || (broFilter === 'VPC' && r.type === 'vpc') || (broFilter === 'VPN' && r.type === 'vpn') || (broFilter === 'Peering' && r.type === 'peering') || (broFilter === 'PrivateLink' && r.type === 'privatelink')).map(r => (
                  <tr key={r.id} onClick={() => setSelectedNetworkResource(r)} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.type === 'vpc' ? 'bg-cyan-500/20 text-cyan-400' : r.type === 'tgw' ? 'bg-purple-500/20 text-purple-400' : r.type === 'vpn' ? 'bg-amber-500/20 text-amber-400' : r.type === 'directconnect' ? 'bg-emerald-500/20 text-emerald-400' : r.type === 'route53' ? 'bg-blue-500/20 text-blue-400' : r.type === 'privatelink' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-pink-500/20 text-pink-400'}`}>
                        <Icon name={r.type === 'vpc' ? 'grid' : r.type === 'tgw' ? 'share-2' : r.type === 'vpn' ? 'lock' : r.type === 'directconnect' ? 'zap' : r.type === 'route53' ? 'globe' : r.type === 'privatelink' ? 'key' : 'link'} size={16} />
                      </div>
                      <div><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.owner}</div></div>
                    </div></td>
                    <td className="px-4 py-3"><div><span className="text-sm text-gray-300 uppercase">{r.type === 'directconnect' ? 'Direct Connect' : r.type === 'route53' ? 'Route 53' : r.type === 'privatelink' ? 'PrivateLink' : r.type.toUpperCase()}</span><div className="text-xs text-gray-500">{r.cidr || r.connection || r.zoneType || r.tunnels || r.endpointType || (r.requester && r.accepter ? `${r.requester} ↔ ${r.accepter}` : '')}</div></div></td>
                    <td className="px-4 py-3"><code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{r.service ? r.service.split('.').pop() : r.subnets && r.type === 'vpc' ? `${r.subnets} subnets` : r.attachments ? `${r.attachments} attachments` : r.vifs ? `${r.vifs} VIFs` : r.records ? `${r.records} records` : r.region}</code></td>
                    <td className="px-4 py-3"><StatusBadge status={['available', 'active', 'up'].includes(r.status) ? 'healthy' : r.status === 'down' ? 'error' : 'warning'} size="sm" /></td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{r.monthlyCost}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setSelectedNetworkResource(r); showNotification(`Editing ${r.name}...`); }} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title="Edit"><Icon name="edit" size={14} /></button>
                        <button onClick={() => showNotification(`Resource "${r.name}" deleted`, 'warning')} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Network Resource Detail Panel */}
          {selectedNetworkResource && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedNetworkResource(null)} />
              <div className="relative w-[600px] bg-gray-900 border-l border-gray-700 overflow-auto">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedNetworkResource(null)} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedNetworkResource.type === 'vpc' ? 'bg-cyan-500/20 text-cyan-400' : selectedNetworkResource.type === 'tgw' ? 'bg-purple-500/20 text-purple-400' : selectedNetworkResource.type === 'vpn' ? 'bg-amber-500/20 text-amber-400' : selectedNetworkResource.type === 'directconnect' ? 'bg-emerald-500/20 text-emerald-400' : selectedNetworkResource.type === 'route53' ? 'bg-blue-500/20 text-blue-400' : selectedNetworkResource.type === 'privatelink' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-pink-500/20 text-pink-400'}`}>
                      <Icon name={selectedNetworkResource.type === 'vpc' ? 'grid' : selectedNetworkResource.type === 'tgw' ? 'share-2' : selectedNetworkResource.type === 'vpn' ? 'lock' : selectedNetworkResource.type === 'directconnect' ? 'zap' : selectedNetworkResource.type === 'route53' ? 'globe' : selectedNetworkResource.type === 'privatelink' ? 'key' : 'link'} size={20} />
                    </div>
                    <div><div className="font-semibold">{selectedNetworkResource.name}</div><div className="text-xs text-gray-500">{selectedNetworkResource.owner}</div></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showNotification(`Cloning ${selectedNetworkResource.name}...`)} className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Clone"><Icon name="copy" size={16} /></button>
                    <button onClick={() => showNotification(`Editing ${selectedNetworkResource.name}...`)} className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"><Icon name="edit" size={14} className="inline mr-1.5" />Edit</button>
                    <button onClick={() => { showNotification(`Resource "${selectedNetworkResource.name}" deleted`, 'warning'); setSelectedNetworkResource(null); }} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={16} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={['available', 'active', 'up'].includes(selectedNetworkResource.status) ? 'healthy' : selectedNetworkResource.status === 'down' ? 'error' : 'warning'} /></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Monthly Cost</div><div className="text-lg font-semibold text-emerald-400">{selectedNetworkResource.monthlyCost}</div></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Region</div><div className="text-sm text-gray-300">{selectedNetworkResource.region}</div></div>
                  </div>

                  {/* Resource Info */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="settings" size={14} className="text-gray-400" />Configuration</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">Type</div><div className="text-gray-300 uppercase">{selectedNetworkResource.type === 'directconnect' ? 'Direct Connect' : selectedNetworkResource.type === 'route53' ? 'Route 53' : selectedNetworkResource.type}</div></div>
                      {selectedNetworkResource.cidr && <div><div className="text-xs text-gray-500 mb-1">CIDR Block</div><code className="text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{selectedNetworkResource.cidr}</code></div>}
                      {selectedNetworkResource.subnets && <div><div className="text-xs text-gray-500 mb-1">Subnets</div><div className="text-gray-300">{selectedNetworkResource.subnets}</div></div>}
                      {selectedNetworkResource.routeTables && <div><div className="text-xs text-gray-500 mb-1">Route Tables</div><div className="text-gray-300">{selectedNetworkResource.routeTables}</div></div>}
                      {selectedNetworkResource.attachments && <div><div className="text-xs text-gray-500 mb-1">Attachments</div><div className="text-gray-300">{selectedNetworkResource.attachments}</div></div>}
                      {selectedNetworkResource.bandwidth && <div><div className="text-xs text-gray-500 mb-1">Bandwidth</div><div className="text-cyan-400">{selectedNetworkResource.bandwidth}</div></div>}
                      {selectedNetworkResource.tunnels && <div><div className="text-xs text-gray-500 mb-1">Tunnels</div><div className="text-gray-300">{selectedNetworkResource.tunnels}</div></div>}
                      {selectedNetworkResource.encryption && <div><div className="text-xs text-gray-500 mb-1">Encryption</div><div className="text-emerald-400">{selectedNetworkResource.encryption}</div></div>}
                      {selectedNetworkResource.connection && <div><div className="text-xs text-gray-500 mb-1">Connection Speed</div><div className="text-cyan-400">{selectedNetworkResource.connection}</div></div>}
                      {selectedNetworkResource.location && <div><div className="text-xs text-gray-500 mb-1">Location</div><div className="text-gray-300">{selectedNetworkResource.location}</div></div>}
                      {selectedNetworkResource.vifs && <div><div className="text-xs text-gray-500 mb-1">Virtual Interfaces</div><div className="text-gray-300">{selectedNetworkResource.vifs}</div></div>}
                      {selectedNetworkResource.zoneType && <div><div className="text-xs text-gray-500 mb-1">Zone Type</div><div className="text-gray-300 capitalize">{selectedNetworkResource.zoneType}</div></div>}
                      {selectedNetworkResource.records && <div><div className="text-xs text-gray-500 mb-1">DNS Records</div><div className="text-gray-300">{selectedNetworkResource.records}</div></div>}
                      {selectedNetworkResource.queries && <div><div className="text-xs text-gray-500 mb-1">Queries</div><div className="text-cyan-400">{selectedNetworkResource.queries}</div></div>}
                      {selectedNetworkResource.healthChecks && <div><div className="text-xs text-gray-500 mb-1">Health Checks</div><div className="text-gray-300">{selectedNetworkResource.healthChecks}</div></div>}
                      {selectedNetworkResource.requester && <div><div className="text-xs text-gray-500 mb-1">Requester VPC</div><div className="text-gray-300">{selectedNetworkResource.requester}</div></div>}
                      {selectedNetworkResource.accepter && <div><div className="text-xs text-gray-500 mb-1">Accepter VPC</div><div className="text-gray-300">{selectedNetworkResource.accepter}</div></div>}
                      {selectedNetworkResource.service && <div><div className="text-xs text-gray-500 mb-1">Service</div><code className="text-indigo-400 bg-gray-700/50 px-2 py-0.5 rounded text-xs">{selectedNetworkResource.service}</code></div>}
                      {selectedNetworkResource.endpointType && <div><div className="text-xs text-gray-500 mb-1">Endpoint Type</div><div className="text-indigo-400">{selectedNetworkResource.endpointType}</div></div>}
                      {selectedNetworkResource.vpc && <div><div className="text-xs text-gray-500 mb-1">VPC</div><div className="text-gray-300">{selectedNetworkResource.vpc}</div></div>}
                      {selectedNetworkResource.eniCount && <div><div className="text-xs text-gray-500 mb-1">ENI Count</div><div className="text-gray-300">{selectedNetworkResource.eniCount}</div></div>}
                      {selectedNetworkResource.securityGroups !== undefined && selectedNetworkResource.type === 'privatelink' && <div><div className="text-xs text-gray-500 mb-1">Security Groups</div><div className="text-gray-300">{selectedNetworkResource.securityGroups}</div></div>}
                      {selectedNetworkResource.privateDns !== undefined && <div><div className="text-xs text-gray-500 mb-1">Private DNS</div><div className={selectedNetworkResource.privateDns ? 'text-emerald-400' : 'text-gray-500'}>{selectedNetworkResource.privateDns ? 'Enabled' : 'Disabled'}</div></div>}
                      <div><div className="text-xs text-gray-500 mb-1">Created</div><div className="text-gray-300">{selectedNetworkResource.created}</div></div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  {(selectedNetworkResource.flowLogs !== undefined || selectedNetworkResource.macSec !== undefined || selectedNetworkResource.jumboFrames !== undefined) && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="shield" size={14} className="text-gray-400" />Security & Features</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        {selectedNetworkResource.flowLogs !== undefined && <div><div className="text-xs text-gray-500 mb-1">Flow Logs</div><div className={selectedNetworkResource.flowLogs ? 'text-emerald-400' : 'text-gray-500'}>{selectedNetworkResource.flowLogs ? 'Enabled' : 'Disabled'}</div></div>}
                        {selectedNetworkResource.macSec !== undefined && <div><div className="text-xs text-gray-500 mb-1">MACsec</div><div className={selectedNetworkResource.macSec ? 'text-emerald-400' : 'text-gray-500'}>{selectedNetworkResource.macSec ? 'Enabled' : 'Disabled'}</div></div>}
                        {selectedNetworkResource.jumboFrames !== undefined && <div><div className="text-xs text-gray-500 mb-1">Jumbo Frames</div><div className={selectedNetworkResource.jumboFrames ? 'text-emerald-400' : 'text-gray-500'}>{selectedNetworkResource.jumboFrames ? 'Enabled' : 'Disabled'}</div></div>}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div><h3 className="text-sm font-medium mb-2">Description</h3><p className="text-sm text-gray-400">{selectedNetworkResource.description}</p></div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

      // U.N.C.L.E. VIEW (Data Storage)
      const UNCLEView = () => (
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Monthly Spend</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1"><Icon name="trending-down" size={12} />{platformCosts.uncle.trend}</span>
              </div>
              <div className="text-2xl font-semibold text-emerald-300">${platformCosts.uncle.total.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">RDS + ElastiCache + DynamoDB</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Total Datastores</span>
                <Icon name="database" size={14} className="text-blue-400" />
              </div>
              <div className="text-2xl font-semibold text-blue-300">{mockDatastores.length}</div>
              <div className="text-xs text-gray-500 mt-1">{mockDatastores.filter(d => ['aurora', 'dsql'].includes(d.type)).length} SQL, {mockDatastores.filter(d => d.type === 'mongodb').length} Document, {mockDatastores.filter(d => d.type === 'dynamodb').length} NoSQL</div>
            </div>
            <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Availability</span>
                <Icon name="activity" size={14} className="text-violet-400" />
              </div>
              <div className="text-2xl font-semibold text-violet-300">{Math.round((mockDatastores.filter(d => ['available', 'active'].includes(d.status)).length / mockDatastores.length) * 100)}%</div>
              <div className="text-xs text-gray-500 mt-1">{mockDatastores.filter(d => ['available', 'active'].includes(d.status)).length} of {mockDatastores.length} available</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Active Alerts</span>
                <Icon name="alert-triangle" size={14} className="text-red-400" />
              </div>
              <div className="text-2xl font-semibold text-red-300">0</div>
              <div className="text-xs text-gray-500 mt-1">All datastores healthy</div>
            </div>
          </div>
          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            {[
              { id: 'All', count: mockDatastores.length },
              { id: 'Aurora', count: mockDatastores.filter(d => d.type === 'aurora').length },
              { id: 'MongoDB', count: mockDatastores.filter(d => d.type === 'mongodb').length },
              { id: 'DynamoDB', count: mockDatastores.filter(d => d.type === 'dynamodb').length },
              { id: 'DSQL', count: mockDatastores.filter(d => d.type === 'dsql').length }
            ].map(cat => (
              <button key={cat.id} onClick={() => setUncleFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${uncleFilter === cat.id ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                {cat.id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${uncleFilter === cat.id ? 'bg-blue-500/30 text-blue-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Datastore</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Configuration</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr></thead>
              <tbody>
                {mockDatastores.filter(d => uncleFilter === 'All' || d.type.toLowerCase() === uncleFilter.toLowerCase()).map(d => (
                  <tr key={d.id} onClick={() => setSelectedDatastore(d)} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${d.type === 'aurora' ? 'bg-blue-500/20 text-blue-400' : d.type === 'mongodb' ? 'bg-emerald-500/20 text-emerald-400' : d.type === 'dynamodb' ? 'bg-amber-500/20 text-amber-400' : 'bg-violet-500/20 text-violet-400'}`}>
                        <Icon name={d.type === 'aurora' ? 'database' : d.type === 'mongodb' ? 'file-text' : d.type === 'dynamodb' ? 'layers' : 'server'} size={16} />
                      </div>
                      <div><div className="font-medium">{d.name}</div><div className="text-xs text-gray-500">{d.owner}</div></div>
                    </div></td>
                    <td className="px-4 py-3"><div><span className="text-sm text-gray-300 uppercase">{d.type}</span><div className="text-xs text-gray-500">{d.engine || d.version || d.mode}</div></div></td>
                    <td className="px-4 py-3"><code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{d.size || d.mode || d.version}</code></td>
                    <td className="px-4 py-3"><StatusBadge status={['available', 'active'].includes(d.status) ? 'healthy' : 'warning'} size="sm" /></td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{d.monthlyCost}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setDatastoreMetrics(d)} className="p-1.5 hover:bg-blue-500/20 rounded-lg text-gray-400 hover:text-blue-400" title="View Metrics"><Icon name="activity" size={14} /></button>
                        <button onClick={() => { setSelectedDatastore(d); showNotification(`Editing ${d.name}...`); }} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title="Edit"><Icon name="edit" size={14} /></button>
                        <button onClick={() => showNotification(`Datastore "${d.name}" deleted`, 'warning')} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Datastore Detail Panel */}
          {selectedDatastore && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedDatastore(null)} />
              <div className="relative w-[600px] bg-gray-900 border-l border-gray-700 overflow-auto">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedDatastore(null)} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedDatastore.type === 'aurora' ? 'bg-blue-500/20 text-blue-400' : selectedDatastore.type === 'mongodb' ? 'bg-emerald-500/20 text-emerald-400' : selectedDatastore.type === 'dynamodb' ? 'bg-amber-500/20 text-amber-400' : 'bg-violet-500/20 text-violet-400'}`}>
                      <Icon name={selectedDatastore.type === 'aurora' ? 'database' : selectedDatastore.type === 'mongodb' ? 'file-text' : selectedDatastore.type === 'dynamodb' ? 'layers' : 'server'} size={20} />
                    </div>
                    <div><div className="font-semibold">{selectedDatastore.name}</div><div className="text-xs text-gray-500">{selectedDatastore.owner}</div></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => showNotification(`Refreshing ${selectedDatastore.name}...`)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Refresh"><Icon name="refresh-cw" size={16} /></button>
                    <button onClick={() => showNotification(`Creating backup for ${selectedDatastore.name}...`)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Backup"><Icon name="save" size={16} /></button>
                    <button onClick={() => showNotification(`Editing ${selectedDatastore.name}...`)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200" title="Edit"><Icon name="edit" size={16} /></button>
                    <button onClick={() => { showNotification(`Datastore "${selectedDatastore.name}" deleted`, 'warning'); setSelectedDatastore(null); }} className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={16} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={['available', 'active'].includes(selectedDatastore.status) ? 'healthy' : 'warning'} /></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Monthly Cost</div><div className="text-lg font-semibold text-emerald-400">{selectedDatastore.monthlyCost}</div></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Mode</div><div className="text-sm text-emerald-400 font-medium">Active-Active</div></div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-gray-400" />Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">RAM</div><div className="text-emerald-400">{selectedDatastore.size === 'M30' ? '8 GB' : selectedDatastore.size === 'M40' ? '16 GB' : selectedDatastore.size?.includes('large') ? '16 GB' : selectedDatastore.size?.includes('xlarge') ? '32 GB' : '8 GB'}</div></div>
                      {selectedDatastore.connections !== undefined && <div><div className="text-xs text-gray-500 mb-1">Connections</div><div className="text-gray-300">{selectedDatastore.connections}</div></div>}
                      {selectedDatastore.cpu && <div><div className="text-xs text-gray-500 mb-1">CPU</div><div className="text-emerald-400">{selectedDatastore.cpu}</div></div>}
                      {selectedDatastore.iops && <div><div className="text-xs text-gray-500 mb-1">IOPS</div><div className="text-gray-300">{selectedDatastore.iops}</div></div>}
                      {selectedDatastore.nodes !== undefined && <div><div className="text-xs text-gray-500 mb-1">Nodes</div><div className="text-gray-300">{selectedDatastore.nodes}</div></div>}
                      {selectedDatastore.hitRate && <div><div className="text-xs text-gray-500 mb-1">Hit Rate</div><div className="text-emerald-400">{selectedDatastore.hitRate}</div></div>}
                      {selectedDatastore.memory && <div><div className="text-xs text-gray-500 mb-1">Memory Usage</div><div className="text-emerald-400">{selectedDatastore.memory}</div></div>}
                      {selectedDatastore.evictions !== undefined && <div><div className="text-xs text-gray-500 mb-1">Evictions</div><div className={selectedDatastore.evictions === 0 ? 'text-emerald-400' : 'text-amber-400'}>{selectedDatastore.evictions}</div></div>}
                      {selectedDatastore.reads && <div><div className="text-xs text-gray-500 mb-1">Reads</div><div className="text-gray-300">{selectedDatastore.reads}</div></div>}
                      {selectedDatastore.writes && <div><div className="text-xs text-gray-500 mb-1">Writes</div><div className="text-gray-300">{selectedDatastore.writes}</div></div>}
                      {selectedDatastore.items && <div><div className="text-xs text-gray-500 mb-1">Items</div><div className="text-gray-300">{selectedDatastore.items}</div></div>}
                      {selectedDatastore.queries && <div><div className="text-xs text-gray-500 mb-1">Queries</div><div className="text-gray-300">{selectedDatastore.queries}</div></div>}
                      {selectedDatastore.users !== undefined && <div><div className="text-xs text-gray-500 mb-1">Users</div><div className="text-gray-300">{selectedDatastore.users}</div></div>}
                      {selectedDatastore.collections !== undefined && <div><div className="text-xs text-gray-500 mb-1">Collections</div><div className="text-gray-300">{selectedDatastore.collections}</div></div>}
                      {selectedDatastore.documents && <div><div className="text-xs text-gray-500 mb-1">Documents</div><div className="text-gray-300">{selectedDatastore.documents}</div></div>}
                    </div>
                  </div>

                  {/* Active-Active Regions */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="globe" size={14} className="text-gray-400" />Active-Active Regions</h3>
                    <div className="space-y-3">
                      {['us-east-1', 'us-east-2'].map((region, idx) => (
                        <div key={region} className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
                              <span className="text-sm font-medium">{region}</span>
                              {idx === 0 && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">Primary</span>}
                            </div>
                            <StatusBadge status="healthy" size="sm" />
                          </div>
                          <div className="text-xs text-gray-500 mb-1">ARN</div>
                          <code className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded block mb-2 font-mono">arn:aws:{selectedDatastore.type === 'dynamodb' ? 'dynamodb' : selectedDatastore.type === 'mongodb' ? 'docdb' : 'rds'}:{region}:123456789012:{selectedDatastore.type === 'dynamodb' ? 'table' : 'cluster'}/{selectedDatastore.name}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connection */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="link" size={14} className="text-gray-400" />Connection</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Global Connection String</div>
                        <code className="text-xs text-blue-400 bg-gray-900 px-2 py-1.5 rounded block font-mono break-all">{selectedDatastore.type === 'mongodb' ? `mongodb+srv://${selectedDatastore.name}.global.mongodb.net/?retryWrites=true&w=majority` : selectedDatastore.type === 'dynamodb' ? `dynamodb.global.amazonaws.com` : `${selectedDatastore.name}.cluster-global.${selectedDatastore.type}.amazonaws.com:5432`}</code>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Vault Secret Path</div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs text-amber-400 bg-gray-900 px-2 py-1.5 rounded flex-1 font-mono">secret/data/databases/{selectedDatastore.name}/credentials</code>
                          <button onClick={() => showNotification('Secret path copied to clipboard')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-gray-200"><Icon name="copy" size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Configuration */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="settings" size={14} className="text-gray-400" />Configuration</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">Type</div><div className="text-gray-300 uppercase">{selectedDatastore.type}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Size/Mode</div><code className="text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{selectedDatastore.size || selectedDatastore.mode || selectedDatastore.version}</code></div>
                      <div><div className="text-xs text-gray-500 mb-1">Engine</div><div className="text-gray-300">{selectedDatastore.engine || selectedDatastore.version || selectedDatastore.mode}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Storage</div><div className="text-gray-300">{selectedDatastore.storage || '500 GB'}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Created</div><div className="text-gray-300">{selectedDatastore.created}</div></div>
                    </div>
                  </div>

                  {/* Description */}
                  <div><h3 className="text-sm font-medium mb-2">Description</h3><p className="text-sm text-gray-400">{selectedDatastore.description}</p></div>
                </div>
              </div>
            </div>
          )}

          {/* New Datastore Modal */}
          {showNewDatastore && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowNewDatastore(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold">Create New Datastore</h2>
                  <button onClick={() => setShowNewDatastore(false)} className="p-1 hover:bg-gray-800 rounded-lg"><Icon name="x" size={18} /></button>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                    <input type="text" value={newDatastoreData.name} onChange={e => setNewDatastoreData({...newDatastoreData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="my-database" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Type</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'aurora', label: 'Aurora', icon: 'database', color: 'blue' },
                        { id: 'mongodb', label: 'MongoDB', icon: 'file-text', color: 'emerald' },
                        { id: 'dynamodb', label: 'DynamoDB', icon: 'layers', color: 'amber' },
                        { id: 'dsql', label: 'DSQL', icon: 'server', color: 'violet' }
                      ].map(t => (
                        <button key={t.id} onClick={() => setNewDatastoreData({...newDatastoreData, type: t.id})} className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border ${newDatastoreData.type === t.id ? `border-${t.color}-500 bg-${t.color}-500/10` : 'border-gray-700 hover:border-gray-600'}`}>
                          <Icon name={t.icon} size={20} className={newDatastoreData.type === t.id ? `text-${t.color}-400` : 'text-gray-400'} />
                          <span className="text-xs">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Environment</label>
                      <select value={newDatastoreData.environment || 'prod'} onChange={e => setNewDatastoreData({...newDatastoreData, environment: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                        <option value="prod">Production</option>
                        <option value="np">Non-Production</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Account Name</label>
                      <input type="text" value={newDatastoreData.accountName || ''} onChange={e => setNewDatastoreData({...newDatastoreData, accountName: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="aws-account-name" />
                    </div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <label className="block text-sm text-gray-400 mb-3">Ownership</label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">LDAP Group - Admin</label>
                        <input type="text" value={newDatastoreData.ldapAdmin || ''} onChange={e => setNewDatastoreData({...newDatastoreData, ldapAdmin: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="cn=db-admins,ou=groups,dc=corp" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">LDAP Group - Dev</label>
                        <input type="text" value={newDatastoreData.ldapDev || ''} onChange={e => setNewDatastoreData({...newDatastoreData, ldapDev: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="cn=db-developers,ou=groups,dc=corp" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">LDAP Group - Read</label>
                        <input type="text" value={newDatastoreData.ldapRead || ''} onChange={e => setNewDatastoreData({...newDatastoreData, ldapRead: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="cn=db-readonly,ou=groups,dc=corp" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Description</label>
                    <textarea value={newDatastoreData.description} onChange={e => setNewDatastoreData({...newDatastoreData, description: e.target.value})} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none" placeholder="What is this datastore for?" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700">
                  <button onClick={() => setShowNewDatastore(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                  <button onClick={() => {
                    const newDatastore = {
                      id: Date.now(),
                      name: newDatastoreData.name || 'new-datastore',
                      type: newDatastoreData.type || 'aurora',
                      status: 'provisioning',
                      environment: newDatastoreData.environment || 'prod',
                      accountName: newDatastoreData.accountName,
                      ldapAdmin: newDatastoreData.ldapAdmin,
                      ldapDev: newDatastoreData.ldapDev,
                      ldapRead: newDatastoreData.ldapRead,
                      description: newDatastoreData.description,
                      owner: 'current-user',
                      created: new Date().toISOString().split('T')[0],
                      monthlyCost: '$0.00'
                    };
                    setSavedDatastores([...savedDatastores, newDatastore]);
                    showNotification(`Datastore "${newDatastoreData.name}" created successfully`, 'success');
                    setShowNewDatastore(false);
                    setNewDatastoreData({ name: '', type: 'aurora', engine: '', region: 'us-east-1', owner: '', description: '' });
                  }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-lg">Create Datastore</button>
                </div>
              </div>
            </div>
          )}

          {/* Datastore Metrics Modal */}
          {datastoreMetrics && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setDatastoreMetrics(null)} />
              <div className="relative w-[900px] max-h-[90vh] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${datastoreMetrics.type === 'aurora' ? 'bg-blue-500/20 text-blue-400' : datastoreMetrics.type === 'mongodb' ? 'bg-emerald-500/20 text-emerald-400' : datastoreMetrics.type === 'dynamodb' ? 'bg-amber-500/20 text-amber-400' : 'bg-violet-500/20 text-violet-400'}`}>
                      <Icon name={datastoreMetrics.type === 'aurora' ? 'database' : datastoreMetrics.type === 'mongodb' ? 'file-text' : datastoreMetrics.type === 'dynamodb' ? 'layers' : 'server'} size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{datastoreMetrics.name}</div>
                      <div className="text-xs text-gray-500">Database Metrics Dashboard</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 p-1 bg-gray-800 rounded-lg border border-gray-700">
                      {[
                        { id: '1h', label: '1 Hour' },
                        { id: '6h', label: '6 Hours' },
                        { id: '24h', label: '24 Hours' },
                        { id: '7d', label: '7 Days' }
                      ].map(t => (
                        <button key={t.id} onClick={() => setDatastoreMetricsTimeRange(t.id)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${datastoreMetricsTimeRange === t.id ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:text-gray-200'}`}>{t.label}</button>
                      ))}
                    </div>
                    <button onClick={() => setDatastoreMetrics(null)} className="p-2 hover:bg-gray-700 rounded-lg"><Icon name="x" size={18} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
                  {/* Key Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">CPU Utilization</div>
                      <div className="text-2xl font-semibold text-blue-400">{datastoreMetricsTimeRange === '1h' ? '34%' : datastoreMetricsTimeRange === '6h' ? '42%' : datastoreMetricsTimeRange === '24h' ? '38%' : '35%'}</div>
                      <div className="text-xs text-emerald-400 mt-1">-8% vs prev period</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Memory Utilization</div>
                      <div className="text-2xl font-semibold text-emerald-400">{datastoreMetricsTimeRange === '1h' ? '67%' : datastoreMetricsTimeRange === '6h' ? '71%' : datastoreMetricsTimeRange === '24h' ? '68%' : '65%'}</div>
                      <div className="text-xs text-gray-500 mt-1">Of allocated RAM</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Connections</div>
                      <div className="text-2xl font-semibold text-cyan-400">{datastoreMetricsTimeRange === '1h' ? '124' : datastoreMetricsTimeRange === '6h' ? '156' : datastoreMetricsTimeRange === '24h' ? '142' : '138'}</div>
                      <div className="text-xs text-gray-500 mt-1">Active connections</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Avg Latency</div>
                      <div className="text-2xl font-semibold text-amber-400">{datastoreMetricsTimeRange === '1h' ? '2.4ms' : datastoreMetricsTimeRange === '6h' ? '3.1ms' : datastoreMetricsTimeRange === '24h' ? '2.8ms' : '2.6ms'}</div>
                      <div className="text-xs text-emerald-400 mt-1">p50 response time</div>
                    </div>
                  </div>

                  {/* Query Performance Chart */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center gap-2"><Icon name="activity" size={16} className="text-blue-400" />Query Throughput (queries/sec)</h3>
                      <span className="text-xs text-gray-500">{datastoreMetricsTimeRange === '1h' ? 'Last 60 minutes' : datastoreMetricsTimeRange === '6h' ? 'Last 6 hours' : datastoreMetricsTimeRange === '24h' ? 'Last 24 hours' : 'Last 7 days'}</span>
                    </div>
                    <FakeGraph color="blue" height={120} data={Array.from({ length: datastoreMetricsTimeRange === '1h' ? 60 : datastoreMetricsTimeRange === '6h' ? 72 : datastoreMetricsTimeRange === '24h' ? 96 : 168 }, (_, i) => 1200 + Math.sin(i * 0.2) * 400 + Math.random() * 200)} />
                  </div>

                  {/* Two Column Charts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="cpu" size={16} className="text-cyan-400" />CPU & Memory</h3>
                      </div>
                      <FakeGraph color="cyan" height={100} data={Array.from({ length: 30 }, (_, i) => 30 + Math.sin(i * 0.3) * 20 + Math.random() * 10)} />
                      <div className="flex items-center justify-center gap-6 mt-2 text-xs">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> CPU</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Memory</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="clock" size={16} className="text-amber-400" />Query Latency (p99)</h3>
                      </div>
                      <FakeGraph color="amber" height={100} data={Array.from({ length: 30 }, (_, i) => 5 + Math.sin(i * 0.3) * 3 + Math.random() * 2)} />
                    </div>
                  </div>

                  {/* IOPS & Storage */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="hard-drive" size={16} className="text-violet-400" />IOPS</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-emerald-400">{datastoreMetricsTimeRange === '1h' ? '4.2K' : '3.8K'}</div>
                          <div className="text-xs text-gray-500">Read IOPS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-semibold text-blue-400">{datastoreMetricsTimeRange === '1h' ? '1.8K' : '1.5K'}</div>
                          <div className="text-xs text-gray-500">Write IOPS</div>
                        </div>
                      </div>
                      <FakeGraph color="violet" height={80} data={Array.from({ length: 30 }, (_, i) => 3000 + Math.sin(i * 0.4) * 1500 + Math.random() * 500)} />
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="database" size={16} className="text-pink-400" />Storage</h3>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Used: 156 GB</span>
                          <span className="text-gray-500">/ 500 GB</span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full" style={{width: '31%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">31% utilized</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-900/50 rounded p-2">
                          <div className="text-gray-500">Free Space</div>
                          <div className="text-gray-300 font-medium">344 GB</div>
                        </div>
                        <div className="bg-gray-900/50 rounded p-2">
                          <div className="text-gray-500">Growth Rate</div>
                          <div className="text-amber-400 font-medium">+2.1 GB/day</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slow Queries */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-4"><Icon name="alert-triangle" size={16} className="text-amber-400" />Slow Queries (> 100ms)</h3>
                    <div className="space-y-2">
                      {[
                        { query: 'SELECT * FROM orders WHERE customer_id = ? AND status IN (...)', time: '245ms', calls: 156, table: 'orders' },
                        { query: 'UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?', time: '189ms', calls: 89, table: 'inventory' },
                        { query: 'SELECT u.*, p.* FROM users u JOIN profiles p ON u.id = p.user_id', time: '167ms', calls: 234, table: 'users' },
                        { query: 'INSERT INTO audit_log (action, entity_id, timestamp, data) VALUES ...', time: '134ms', calls: 412, table: 'audit_log' }
                      ].map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 cursor-pointer" onClick={() => showNotification(`Query details: ${q.query.slice(0, 50)}...`)}>
                          <div className="flex-1 min-w-0">
                            <code className="text-xs text-gray-400 font-mono truncate block">{q.query}</code>
                            <div className="text-xs text-gray-500 mt-1">Table: {q.table}</div>
                          </div>
                          <div className="flex items-center gap-4 ml-4">
                            <div className="text-right">
                              <div className="text-sm text-amber-400 font-medium">{q.time}</div>
                              <div className="text-xs text-gray-500">{q.calls} calls</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Replication Status */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-4"><Icon name="refresh-cw" size={16} className="text-emerald-400" />Active-Active Replication</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {['us-east-1', 'us-east-2'].map((region, i) => (
                        <div key={region} className="bg-gray-900/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon name="server" size={14} className="text-gray-400" />
                              <span className="font-medium">{region}</span>
                            </div>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400">{i === 0 ? 'Primary' : 'Replica'}</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Status</span>
                              <span className="text-emerald-400">Healthy</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Replication Lag</span>
                              <span className="text-gray-300">{i === 0 ? 'N/A' : '< 1ms'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Transactions/sec</span>
                              <span className="text-gray-300">{i === 0 ? '1,247' : '1,243'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

      // D.A.D. Full-Screen Service Editor (ROSIE-style)
      const ServiceEditor = () => {
        if (!showServiceEditor || !serviceEditorResource) return null;
        const r = serviceEditorResource;
        const isService = r.type === 'service';
        const isVirtualService = r.type === 'virtualservice';

        // The four Istio WASM plugin insertion phases
        const phases = [
          { id: 'AUTHN', name: 'Authentication', desc: 'Before JWT/authn logic', color: 'emerald', icon: 'key' },
          { id: 'AUTHZ', name: 'Authorization', desc: 'Before RBAC/authz filters', color: 'amber', icon: 'shield' },
          { id: 'STATS', name: 'Telemetry', desc: 'Before stats/metrics', color: 'violet', icon: 'activity' },
          { id: 'UNSPECIFIED', name: 'Default', desc: 'Near end, before router', color: 'gray', icon: 'layers' }
        ];

        // Available WASM filters organized by category with suggested phases
        const filterTypes = {
          security: [
            { id: 'jwt_auth', name: 'JWT Auth', icon: 'key', desc: 'Validate JWT tokens', suggestedPhase: 'AUTHN' },
            { id: 'oauth2', name: 'OAuth2', icon: 'lock', desc: 'OAuth2 authentication', suggestedPhase: 'AUTHN' },
            { id: 'mtls', name: 'mTLS', icon: 'shield', desc: 'Mutual TLS enforcement', suggestedPhase: 'AUTHN' },
            { id: 'rbac', name: 'RBAC', icon: 'users', desc: 'Role-based access control', suggestedPhase: 'AUTHZ' },
          ],
          traffic: [
            { id: 'rate_limit', name: 'Rate Limit', icon: 'gauge', desc: 'Request rate limiting', suggestedPhase: 'AUTHZ' },
            { id: 'circuit_breaker', name: 'Circuit Breaker', icon: 'zap-off', desc: 'Prevent cascade failures', suggestedPhase: 'AUTHZ' },
            { id: 'retry', name: 'Retry', icon: 'refresh-cw', desc: 'Automatic retry logic', suggestedPhase: 'UNSPECIFIED' },
            { id: 'timeout', name: 'Timeout', icon: 'clock', desc: 'Request timeouts', suggestedPhase: 'UNSPECIFIED' },
          ],
          transform: [
            { id: 'header_mutation', name: 'Headers', icon: 'file-text', desc: 'Add/remove headers', suggestedPhase: 'AUTHZ' },
            { id: 'path_rewrite', name: 'Path Rewrite', icon: 'edit-3', desc: 'URL path manipulation', suggestedPhase: 'AUTHZ' },
            { id: 'cors', name: 'CORS', icon: 'globe', desc: 'Cross-origin settings', suggestedPhase: 'AUTHN' },
            { id: 'compression', name: 'Compression', icon: 'minimize-2', desc: 'Response compression', suggestedPhase: 'STATS' },
          ],
          observability: [
            { id: 'access_log', name: 'Access Log', icon: 'file-text', desc: 'Request logging', suggestedPhase: 'STATS' },
            { id: 'tracing', name: 'Tracing', icon: 'activity', desc: 'Distributed tracing', suggestedPhase: 'STATS' },
            { id: 'metrics', name: 'Metrics', icon: 'bar-chart-2', desc: 'Custom metrics', suggestedPhase: 'STATS' },
            { id: 'audit', name: 'Audit', icon: 'clipboard', desc: 'Audit logging', suggestedPhase: 'STATS' },
          ]
        };

        const allFilters = Object.values(filterTypes).flat();
        const getFiltersByCategory = () => {
          if (serviceFilterCategory === 'all') return allFilters;
          return filterTypes[serviceFilterCategory] || [];
        };

        // Get filters by phase
        const getFiltersByPhase = (phaseId) => serviceFilterChain.filter(f => f.phase === phaseId);

        const handleAddFilter = (filter, targetPhase) => {
          const phase = targetPhase || filter.suggestedPhase || 'UNSPECIFIED';
          const phaseFilters = getFiltersByPhase(phase);
          const newFilter = {
            id: Date.now(),
            ...filter,
            phase,
            position: phaseFilters.length + 1,
            config: {}
          };
          setServiceFilterChain([...serviceFilterChain, newFilter]);
          setSelectedFilterNode(newFilter);
        };

        const handleRemoveFilter = (filterId) => {
          setServiceFilterChain(serviceFilterChain.filter(f => f.id !== filterId));
          if (selectedFilterNode?.id === filterId) setSelectedFilterNode(null);
        };

        const handleSelectFilter = (filter) => {
          setSelectedFilterNode(selectedFilterNode?.id === filter.id ? null : filter);
        };

        return (
          <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isService ? 'bg-blue-500/20 text-blue-400' : 'bg-violet-500/20 text-violet-400'}`}>
                    <Icon name={isService ? 'server' : 'git-branch'} size={14} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">{isService ? 'Service' : 'Virtual Service'}</div>
                    <div className="text-sm font-medium leading-tight">{r.name}</div>
                  </div>
                </div>
                <div className="w-px h-5 bg-gray-700" />
                <div className="flex gap-1">
                  <button
                    onClick={() => setServiceEditorMode('visual')}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all ${
                      serviceEditorMode === 'visual'
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Icon name="layout" size={12} />
                    Visual
                  </button>
                  <button
                    onClick={() => setServiceEditorMode('code')}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all ${
                      serviceEditorMode === 'code'
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Icon name="code" size={12} />
                    YAML
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowServiceEditor(false); setServiceEditorResource(null); setSelectedFilterNode(null); }}
                  className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSavedServiceFilters({...savedServiceFilters, [r.name]: serviceFilterChain});
                    showNotification(`${r.name} configuration saved!`, 'success');
                    setShowServiceEditor(false);
                    setServiceEditorResource(null);
                    setSelectedFilterNode(null);
                  }}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded text-xs font-medium"
                >
                  <Icon name="check" size={12} />
                  Save
                </button>
              </div>
            </div>

            {serviceEditorMode === 'visual' ? (
              <div className="flex-1 flex overflow-hidden">
                {/* Left: Filter Palette */}
                <div className="w-56 border-r border-gray-800 bg-gray-900/50 flex flex-col">
                  <div className="px-2 py-2 border-b border-gray-800">
                    <div className="flex flex-wrap gap-0.5">
                      {['all', 'security', 'traffic', 'transform', 'observability'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setServiceFilterCategory(cat)}
                          className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${
                            serviceFilterCategory === cat
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-1.5 space-y-1">
                    {getFiltersByCategory().map(filter => {
                      const isAdded = serviceFilterChain.some(f => f.name === filter.name);
                      return (
                        <button
                          key={filter.id}
                          onClick={() => !isAdded && handleAddFilter(filter)}
                          disabled={isAdded}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 border rounded text-left transition-colors ${
                            isAdded
                              ? 'bg-gray-800/30 border-gray-700/50 opacity-50 cursor-not-allowed'
                              : 'bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 group'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                            isAdded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30'
                          }`}>
                            <Icon name={isAdded ? 'check' : filter.icon} size={12} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-medium ${isAdded ? 'text-gray-500' : 'text-gray-200'}`}>{filter.name}</div>
                          </div>
                          {isAdded ? (
                            <span className="text-[9px] text-emerald-400">Added</span>
                          ) : (
                            <Icon name="plus" size={10} className="text-gray-600 group-hover:text-cyan-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Center: Filter Chain Canvas with 4 Phases - 50/50 split */}
                <div className="flex-1 flex flex-col bg-gray-950/50">
                  {/* Top 50%: Phase Boxes */}
                  <div className="h-1/2 p-3 flex flex-col">
                    {/* Request Flow Header */}
                    <div className="flex items-center gap-1.5 mb-2 text-[10px] text-gray-500">
                      <Icon name="arrow-right" size={10} />
                      <span>Request flow: AUTHN → AUTHZ → STATS → UNSPECIFIED</span>
                    </div>

                    {/* Four Phase Boxes - Full Width */}
                    <div className="flex-1 flex gap-2">
                      {phases.map((phase, phaseIdx) => {
                        const phaseFilters = getFiltersByPhase(phase.id);
                        const colorClasses = {
                          emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', headerBg: 'bg-emerald-500/20' },
                          amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', headerBg: 'bg-amber-500/20' },
                          violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', headerBg: 'bg-violet-500/20' },
                          gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', headerBg: 'bg-gray-500/20' }
                        }[phase.color];

                        return (
                          <div key={phase.id} className={`flex-1 rounded-lg border ${colorClasses.border} ${colorClasses.bg} overflow-hidden flex flex-col`}>
                            {/* Phase Header */}
                            <div className={`px-3 py-2 ${colorClasses.headerBg} border-b ${colorClasses.border}`}>
                              <div className={`flex items-center gap-2 ${colorClasses.text} font-medium text-sm`}>
                                <Icon name={phase.icon} size={14} />
                                {phase.name}
                              </div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{phase.desc}</div>
                            </div>

                            {/* Phase Filters */}
                            <div className="flex-1 p-2 space-y-1.5 overflow-auto">
                              {phaseFilters.map(filter => (
                                <div
                                  key={filter.id}
                                  onClick={() => handleSelectFilter(filter)}
                                  className={`relative px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all group ${
                                    selectedFilterNode?.id === filter.id
                                      ? `ring-2 ring-cyan-500 ${colorClasses.border} bg-gray-800`
                                      : `${colorClasses.border} bg-gray-800/50 hover:bg-gray-800`
                                  }`}
                                >
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleRemoveFilter(filter.id); }}
                                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400"
                                  >
                                    <Icon name="x" size={10} />
                                  </button>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded ${colorClasses.headerBg} flex items-center justify-center ${colorClasses.text}`}>
                                      <Icon name={filter.icon} size={12} />
                                    </div>
                                    <span className="text-sm text-gray-200">{filter.name}</span>
                                  </div>
                                </div>
                              ))}

                              {phaseFilters.length === 0 && (
                                <div className="h-full flex items-center justify-center text-gray-600">
                                  <div className="text-center">
                                    <Icon name="plus" size={20} className="mx-auto opacity-40" />
                                    <div className="text-xs mt-1">Add filter</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom 50%: Filter Configuration */}
                  <div className="h-1/2 border-t border-gray-800 bg-gray-900/50 p-4 overflow-auto">
                    {selectedFilterNode ? (
                      <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                              <Icon name={selectedFilterNode.icon} size={20} />
                            </div>
                            <div>
                              <div className="text-lg font-medium text-gray-200">{selectedFilterNode.name}</div>
                              <div className="text-xs text-gray-500">{selectedFilterNode.desc}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <select
                              value={selectedFilterNode.phase}
                              onChange={(e) => {
                                const newPhase = e.target.value;
                                setServiceFilterChain(serviceFilterChain.map(f =>
                                  f.id === selectedFilterNode.id ? { ...f, phase: newPhase } : f
                                ));
                                setSelectedFilterNode({ ...selectedFilterNode, phase: newPhase });
                              }}
                              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                            >
                              {phases.map(p => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
                            </select>
                            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                              <option value="yes">Enabled</option>
                              <option value="no">Disabled</option>
                            </select>
                          </div>
                        </div>
                        {/* Filter-specific config */}
                        <div className="grid grid-cols-4 gap-4">
                          {(selectedFilterNode.name === 'Rate Limit') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Requests/sec</label><input type="number" defaultValue={100} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Burst Size</label><input type="number" defaultValue={200} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Rate Limit Key</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Client IP</option><option>User ID</option><option>API Key</option><option>Header Value</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Fail Open</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>No</option><option>Yes</option></select></div>
                          </>}
                          {(selectedFilterNode.name === 'JWT Auth') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Issuer URL</label><input type="text" placeholder="https://auth.example.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">JWKS URI</label><input type="text" placeholder="/.well-known/jwks.json" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Audiences</label><input type="text" placeholder="api.example.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Forward JWT</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Yes</option><option>No</option></select></div>
                          </>}
                          {(selectedFilterNode.name === 'OAuth2') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Token Endpoint</label><input type="text" placeholder="https://auth.example.com/oauth/token" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Client ID</label><input type="text" placeholder="client-id" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Scopes</label><input type="text" placeholder="openid profile" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Grant Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>client_credentials</option><option>authorization_code</option></select></div>
                          </>}
                          {(selectedFilterNode.name === 'mTLS') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Mode</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>STRICT</option><option>PERMISSIVE</option><option>DISABLE</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Client Cert Header</label><input type="text" defaultValue="X-Client-Cert" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Trust Domain</label><input type="text" placeholder="cluster.local" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Verify Depth</label><input type="number" defaultValue={1} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'RBAC') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Action</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>ALLOW</option><option>DENY</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Principals</label><input type="text" placeholder="cluster.local/ns/*/sa/*" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Methods</label><input type="text" placeholder="GET, POST" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Paths</label><input type="text" placeholder="/api/*" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Circuit Breaker') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Connections</label><input type="number" defaultValue={1000} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Pending</label><input type="number" defaultValue={100} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Requests</label><input type="number" defaultValue={1000} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Retries</label><input type="number" defaultValue={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Retry') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Attempts</label><input type="number" defaultValue={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Per Try Timeout</label><input type="text" defaultValue="2s" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Retry On</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>5xx</option><option>gateway-error</option><option>connect-failure</option><option>retriable-4xx</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Backoff</label><input type="text" defaultValue="25ms" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Timeout') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Request Timeout</label><input type="text" defaultValue="30s" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Idle Timeout</label><input type="text" defaultValue="60s" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Stream Duration</label><input type="text" placeholder="0s (unlimited)" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">gRPC Timeout Header</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Yes</option><option>No</option></select></div>
                          </>}
                          {(selectedFilterNode.name === 'Headers') && <>
                            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1.5">Add Headers</label><input type="text" placeholder="X-Custom: value, X-Request-ID: %REQ_ID%" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1.5">Remove Headers</label><input type="text" placeholder="X-Internal, X-Debug" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Path Rewrite') && <>
                            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1.5">Match Pattern</label><input type="text" placeholder="/api/v1/(.*)" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1.5">Rewrite To</label><input type="text" placeholder="/internal/$1" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'CORS') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Allow Origins</label><input type="text" placeholder="*" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Allow Methods</label><input type="text" defaultValue="GET,POST,PUT,DELETE" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Allow Headers</label><input type="text" defaultValue="Authorization,Content-Type" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Age (sec)</label><input type="number" defaultValue={86400} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Compression') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Algorithm</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>gzip</option><option>br</option><option>deflate</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Min Length</label><input type="number" defaultValue={1024} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Content Types</label><input type="text" defaultValue="text/*,application/json" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Level</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>BEST_SPEED</option><option>DEFAULT</option><option>BEST_COMPRESSION</option></select></div>
                          </>}
                          {(selectedFilterNode.name === 'Access Log') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Log Format</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>JSON</option><option>TEXT</option><option>CEL</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Destination</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>STDOUT</option><option>FILE</option><option>gRPC</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Flush Interval</label><input type="text" defaultValue="10s" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Sample Rate</label><input type="text" defaultValue="100%" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Tracing') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Provider</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Zipkin</option><option>Jaeger</option><option>OpenTelemetry</option><option>Datadog</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Sampling Rate</label><input type="text" defaultValue="1%" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Max Tag Length</label><input type="number" defaultValue={256} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Custom Tags</label><input type="text" placeholder="env:prod,version:v1" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Metrics') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Provider</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Prometheus</option><option>StatsD</option><option>OpenTelemetry</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Prefix</label><input type="text" defaultValue="istio_" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Dimensions</label><input type="text" placeholder="source,destination,status" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Histogram Buckets</label><input type="text" defaultValue="0.01,0.1,1,10" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" /></div>
                          </>}
                          {(selectedFilterNode.name === 'Audit') && <>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Audit Policy</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Request</option><option>RequestResponse</option><option>Metadata</option><option>None</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Destination</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Log File</option><option>Webhook</option><option>Both</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Include Headers</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>Yes</option><option>No</option></select></div>
                            <div><label className="block text-xs text-gray-400 mb-1.5">Include Body</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"><option>No</option><option>Yes</option></select></div>
                          </>}
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <Icon name="settings" size={40} className="mx-auto mb-3 opacity-30" />
                          <div className="text-sm">Select a filter to configure</div>
                          <div className="text-xs text-gray-600 mt-1">Click on a filter in the phases above</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Service Properties */}
                <div className="w-64 border-l border-gray-800 bg-gray-900/50 overflow-auto">
                  <div className="px-3 py-2 border-b border-gray-800">
                    <h3 className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                      <Icon name="settings" size={12} className="text-gray-500" />
                      Properties
                    </h3>
                  </div>
                  <div className="p-2 space-y-2">
                    <div><label className="block text-[10px] text-gray-500 mb-0.5">Name</label><input type="text" value={r.name} readOnly className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs" /></div>
                    <div><label className="block text-[10px] text-gray-500 mb-0.5">Namespace</label><input type="text" value={r.namespace} readOnly className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs" /></div>
                    {isService && (
                      <>
                        <div><label className="block text-[10px] text-gray-500 mb-0.5">Host</label><input type="text" defaultValue={r.host} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-cyan-500" /></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div><label className="block text-[10px] text-gray-500 mb-0.5">Port</label><input type="number" defaultValue={r.port} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500" /></div>
                          <div><label className="block text-[10px] text-gray-500 mb-0.5">Protocol</label><select defaultValue={r.protocol} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500"><option>HTTP</option><option>HTTPS</option><option>gRPC</option><option>TCP</option></select></div>
                        </div>
                      </>
                    )}
                    {isVirtualService && (
                      <>
                        <div><label className="block text-[10px] text-gray-500 mb-0.5">Host</label><input type="text" defaultValue={r.host} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-cyan-500" /></div>
                        <div><label className="block text-[10px] text-gray-500 mb-0.5">Gateway</label><input type="text" defaultValue={r.gateway} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500" /></div>
                      </>
                    )}
                    <div><label className="block text-[10px] text-gray-500 mb-0.5">Owner</label><input type="text" defaultValue={r.owner} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan-500" /></div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">Status</span>
                        <StatusBadge status={r.status} />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="text-[10px] text-gray-500 mb-1">Filters ({serviceFilterChain.length})</div>
                      <div className="space-y-0.5 max-h-24 overflow-auto">
                        {serviceFilterChain.map((f, i) => (
                          <div key={f.id} className="flex items-center gap-1.5 text-[10px]">
                            <span className="w-3 h-3 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[8px]">{i + 1}</span>
                            <span className="text-gray-300">{f.name}</span>
                            <span className="text-gray-600">({f.phase})</span>
                          </div>
                        ))}
                        {serviceFilterChain.length === 0 && <div className="text-[10px] text-gray-500 italic">None</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Code View */
              <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/50">
                      <span className="text-sm text-gray-400 font-mono">{r.name}.yaml</span>
                      <button className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1"><Icon name="copy" size={12} />Copy</button>
                    </div>
                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-auto">
{`apiVersion: networking.istio.io/v1beta1
kind: ${isService ? 'Service' : 'VirtualService'}
metadata:
  name: ${r.name}
  namespace: ${r.namespace}
spec:
${isVirtualService ? `  hosts:
    - ${r.host}
  gateways:
    - ${r.gateway}
  http:
    - route:
        - destination:
            host: ${r.name}
            port:
              number: 80` : `  selector:
    app: ${r.name}
  ports:
    - port: ${r.port}
      targetPort: ${r.port}
      protocol: ${r.protocol}`}
${serviceFilterChain.length > 0 ? `
---
apiVersion: extensions.istio.io/v1alpha1
kind: WasmPlugin
metadata:
  name: ${r.name}-filters
  namespace: ${r.namespace}
spec:
  selector:
    matchLabels:
      app: ${r.name}
  plugins:
${serviceFilterChain.map((f, i) => `    - name: ${f.id}
      priority: ${i + 1}`).join('\n')}` : ''}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      };

      // D.A.D. VIEW (Service Mesh)
      const DADView = () => {
        const meshStats = getMeshStats(mockMeshResources);
        const filteredResources = mockMeshResources.filter(r => {
          if (r.type === 'authpolicy') return false; // Auth policies moved to Security tab
          if (dadFilter === 'All') return true;
          if (dadFilter === 'Services') return r.type === 'service';
          if (dadFilter === 'Virtual Services') return r.type === 'virtualservice';
          if (dadFilter === 'Ingress') return r.type === 'ingress';
          if (dadFilter === 'Egress') return r.type === 'egress';
          if (dadFilter === 'East-West') return r.type === 'eastwest';
          if (dadFilter === 'Dest Rules') return r.type === 'destinationrule';
          if (dadFilter === 'Svc Entries') return r.type === 'serviceentry';
          return true;
        });
        return (
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6 border-b border-gray-700">
            {[
              { id: 'resources', label: 'Traffic', icon: 'git-branch' },
              ...(featureFlags.dadSecurity ? [{ id: 'security', label: 'Security', icon: 'shield' }] : []),
              ...(featureFlags.dadCertificates ? [{ id: 'certs', label: 'Certificates', icon: 'lock' }] : []),
              { id: 'wasm', label: 'WASM', icon: 'cpu' },
              ...(featureFlags.dadLua ? [{ id: 'lua', label: 'Lua', icon: 'code' }] : []),
            ].map(tab => (
              <button key={tab.id} onClick={() => setDadActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${dadActiveTab === tab.id ? 'border-amber-500 text-amber-300' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                <Icon name={tab.icon} size={16} />{tab.label}
              </button>
            ))}
          </div>

          {/* Resources Tab */}
          {dadActiveTab === 'resources' && <>
          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            {[
              { id: 'Services', count: meshStats.services },
              { id: 'Virtual Services', count: meshStats.virtualServices },
              { id: 'divider1' },
              { id: 'Svc Entries', count: meshStats.serviceEntries },
              { id: 'Dest Rules', count: meshStats.destinationRules },
              { id: 'divider2' },
              { id: 'Ingress', count: meshStats.ingress, sublabel: 'Gateway' },
              { id: 'Egress', count: meshStats.egress, sublabel: 'Gateway' },
              { id: 'East-West', count: meshStats.eastwest, sublabel: 'Gateway' }
            ].map(cat => (
              cat.id.startsWith('divider') ? (
                <div key={cat.id} className="w-px bg-gray-600 mx-1"></div>
              ) : (
                <button key={cat.id} onClick={() => setDadFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${dadFilter === cat.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <div className="flex flex-col items-center">
                    <span>{cat.id}</span>
                    {cat.sublabel && <span className="text-xs text-gray-500">{cat.sublabel}</span>}
                  </div>
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${dadFilter === cat.id ? 'bg-amber-500/30 text-amber-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                </button>
              )
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Details</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Owner</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">BU</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr></thead>
              <tbody>
                {filteredResources.map(r => {
                  const typeConfig = {
                    service: { icon: 'server', label: 'Service', badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
                    virtualservice: { icon: 'git-branch', label: 'Virtual Service', badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
                    ingress: { icon: 'log-in', label: 'Ingress', badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
                    egress: { icon: 'log-out', label: 'Egress', badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
                    eastwest: { icon: 'repeat', label: 'East-West', badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
                    destinationrule: { icon: 'sliders', label: 'Dest Rule', badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
                    authpolicy: { icon: 'shield', label: 'Auth Policy', badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                    serviceentry: { icon: 'external-link', label: 'Svc Entry', badgeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/30' }
                  }[r.type] || { icon: 'box', label: r.type, badgeClass: 'bg-gray-500/20 text-gray-300 border-gray-500/30' };

                  const getDetails = () => {
                    switch(r.type) {
                      case 'service': return `${r.protocol} :${r.port} • ${r.endpoints} endpoints`;
                      case 'virtualservice': return `${r.routes} routes • ${r.gateway}`;
                      case 'ingress': return `${r.tls} TLS • Port ${r.port}`;
                      case 'egress': return `${r.hosts?.length || 0} hosts • ${r.tls}`;
                      case 'eastwest': return `${r.hosts?.length || 0} hosts • ${r.tls} mTLS`;
                      case 'destinationrule': return `${r.trafficPolicy} • ${r.mtls} mTLS`;
                      case 'authpolicy': return `${r.action} • ${r.rules} rules`;
                      case 'serviceentry': return `${r.location} • ${r.resolution} • ${r.hosts?.length || 0} hosts`;
                      default: return '';
                    }
                  };

                  return (
                  <tr key={r.id} onClick={() => { setSelectedService(r); setDadDetailEditMode(false); }} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-400' : r.status === 'warning' ? 'bg-amber-500/20 text-amber-400' : r.status === 'degraded' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}><Icon name={typeConfig.icon} size={16} /></div>
                      <div><div className="font-medium">{r.name}</div><div className="text-xs text-gray-500">{r.namespace}</div></div>
                    </div></td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${typeConfig.badgeClass}`}><Icon name={typeConfig.icon} size={10} />{typeConfig.label}</span></td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} size="sm" /></td>
                    <td className="px-4 py-3"><span className="text-sm text-gray-400">{getDetails()}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-400">{r.owner}</span></td>
                    <td className="px-4 py-3"><span className="text-xs text-gray-400">{r.bu}</span></td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => {
                          if (r.type === 'service' || r.type === 'virtualservice') {
                            setServiceEditorResource(r);
                            setServiceFilterChain(getServiceFilters(r));
                            setSelectedFilterNode(null);
                            setShowServiceEditor(true);
                          } else {
                            setSelectedService(r); setEditFormData({...r}); setDadDetailEditMode(true);
                          }
                        }} className="p-1.5 hover:bg-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-400" title="Edit"><Icon name="edit" size={14} /></button>
                        <button onClick={() => { setSelectedService(r); setDadDetailEditMode(false); }} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title="View Details"><Icon name="eye" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </>}

          {/* WASM Plugins Tab */}
          {dadActiveTab === 'wasm' && (() => {
            // Group plugins by module
            const moduleGroups = mockWasmPlugins.reduce((acc, p) => {
              if (!acc[p.module]) {
                acc[p.module] = { module: p.module, image: p.image.split(':')[0], version: p.version, sourceType: p.sourceType, plugins: [] };
              }
              acc[p.module].plugins.push(p);
              return acc;
            }, {});
            const modules = Object.values(moduleGroups);

            return <>
            {/* Filter Tabs with Counts */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                {[
                  { id: 'Enabled', label: 'Enabled', count: mockWasmPlugins.filter(p => p.enabled).length },
                  { id: 'Disabled', label: 'Disabled', count: mockWasmPlugins.filter(p => !p.enabled).length }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setWasmFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${wasmFilter === cat.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                    {cat.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${wasmFilter === cat.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modules with Expandable Plugins */}
            <div className="space-y-3 mb-6">
              {modules.filter(mod => {
                if (wasmFilter === 'Enabled') return mod.plugins.some(p => p.enabled);
                if (wasmFilter === 'Disabled') return mod.plugins.some(p => !p.enabled);
                return true;
              }).map(mod => {
                const isExpanded = expandedWasmModules.includes(mod.module);
                const activeCount = mod.plugins.filter(p => p.enabled).length;
                const gateways = [...new Set(mod.plugins.map(p => p.targetGateway))];
                return (
                  <div key={mod.module} className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                    {/* Module Header Row */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors"
                      onClick={() => setExpandedWasmModules(prev => isExpanded ? prev.filter(m => m !== mod.module) : [...prev, mod.module])}
                    >
                      <div className="flex items-center gap-3">
                        <button className={`w-6 h-6 flex items-center justify-center rounded transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                          <Icon name="chevron-right" size={16} className="text-gray-400" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Icon name="package" size={20} className="text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-200 flex items-center gap-2">
                            {mod.module}
                            <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">{mod.version}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${mod.sourceType === 'OCI' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'}`}>{mod.sourceType}</span>
                          </div>
                          <div className="text-xs text-gray-500 font-mono truncate max-w-md">{mod.image}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-300">{mod.plugins.length} plugin{mod.plugins.length !== 1 ? 's' : ''}</div>
                          <div className="text-xs text-gray-500">{activeCount} active</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {gateways.slice(0, 3).map(gw => (
                            <span key={gw} className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">{gw.replace('-gateway', '')}</span>
                          ))}
                          {gateways.length > 3 && <span className="text-[10px] text-gray-500">+{gateways.length - 3}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Plugins */}
                    {isExpanded && (
                      <div className="border-t border-gray-700">
                        <table className="w-full">
                          <thead><tr className="border-b border-gray-700/50 bg-gray-900/30">
                            <th className="w-10"></th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Plugin Instance</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Phase</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Target Gateway</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Config</th>
                            <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Metrics</th>
                            <th className="text-center px-4 py-2 text-xs font-medium text-gray-500">Enabled</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
                          </tr></thead>
                          <tbody>
                            {mod.plugins.map(p => (
                              <tr key={p.id} className={`border-b border-gray-700/30 hover:bg-gray-800/30 ${!p.enabled ? 'opacity-50' : ''}`}>
                                <td className="w-10"></td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${p.enabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-500'}`}>
                                      <Icon name="cpu" size={12} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-300">{p.name}</div>
                                      <div className="text-[10px] text-gray-500">{p.namespace} • P{p.priority}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-2.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                                    p.phase === 'AUTHN' ? 'bg-blue-500/20 text-blue-300' :
                                    p.phase === 'AUTHZ' ? 'bg-emerald-500/20 text-emerald-300' :
                                    'bg-violet-500/20 text-violet-300'
                                  }`}>{p.phase}</span>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-1.5">
                                    <Icon name="log-in" size={10} className="text-teal-400" />
                                    <span className="text-xs text-gray-300">{p.targetGateway}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="text-[10px] text-gray-400 font-mono max-w-[150px] truncate" title={JSON.stringify(p.config)}>
                                    {Object.entries(p.config).slice(0, 2).map(([k, v]) => `${k}: ${typeof v === 'object' ? '...' : v}`).join(', ')}
                                  </div>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="text-[10px]">
                                    <span className="text-emerald-400">{p.metrics.requests}</span>
                                    <span className="text-gray-600 mx-1">|</span>
                                    <span className="text-amber-400">{Object.values(p.metrics)[1]}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-2.5 text-center">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); showNotification(`${p.enabled ? 'Disabling' : 'Enabling'} ${p.name}...`); }}
                                    className={`relative w-8 h-4 rounded-full transition-colors ${p.enabled ? 'bg-emerald-500' : 'bg-gray-600'}`}
                                  >
                                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform ${p.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                  </button>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => {
                                      // Create a resource object for the Service Editor based on the WASM plugin's target
                                      const targetResource = {
                                        id: p.id,
                                        name: p.targetGateway || p.name,
                                        type: 'service',
                                        namespace: p.namespace,
                                        status: p.status,
                                        host: `${p.targetGateway}.${p.namespace}.svc.cluster.local`,
                                        port: 8080,
                                        protocol: 'HTTP',
                                        owner: p.owner
                                      };
                                      setServiceEditorResource(targetResource);
                                      // Load the plugin as a filter in the chain
                                      const pluginAsFilter = {
                                        id: p.id,
                                        name: p.module || p.name.split('-')[0],
                                        icon: 'cpu',
                                        desc: `${p.name} plugin`,
                                        phase: p.phase,
                                        config: p.config
                                      };
                                      setServiceFilterChain([pluginAsFilter]);
                                      setSelectedFilterNode(null);
                                      setShowServiceEditor(true);
                                    }} className="p-1 hover:bg-cyan-500/20 rounded text-gray-400 hover:text-cyan-400" title="Edit"><Icon name="edit" size={12} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
              <h4 className="text-sm font-medium text-purple-400 mb-2 flex items-center gap-2"><Icon name="info" size={14} />WASM Module Reuse</h4>
              <p className="text-xs text-gray-400">One WASM module can be reused by multiple WasmPlugin resources with different scopes and configs. This allows the same compiled logic (e.g., rate-limiter) to run on different gateways with tenant-specific settings. Plugins execute in priority order within their phase (AUTHN → AUTHZ → STATS).</p>
            </div>
          </>;
          })()}

          {/* Lua Filters Tab */}
          {dadActiveTab === 'lua' && featureFlags.dadLua && (() => {
            // Group configs by filter name
            const luaFilterGroups = mockLuaFilterDefs.map(def => ({
              ...def,
              configs: mockLuaFilters.filter(c => c.filter === def.name)
            }));

            return <>
            {/* Filter Tabs with Counts */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                {[
                  { id: 'All', label: 'All Filters', count: mockLuaFilterDefs.length },
                  { id: 'Inline', label: 'Inline', count: mockLuaFilterDefs.filter(f => f.sourceType === 'inline').length },
                  { id: 'ConfigMap', label: 'ConfigMap', count: mockLuaFilterDefs.filter(f => f.sourceType === 'configmap').length }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setLuaFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${luaFilter === cat.id ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                    {cat.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${luaFilter === cat.id ? 'bg-indigo-500/30 text-indigo-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                {[
                  { id: 'AllConfigs', label: 'All Configs', count: mockLuaFilters.length },
                  { id: 'Enabled', label: 'Enabled', count: mockLuaFilters.filter(f => f.enabled).length },
                  { id: 'Disabled', label: 'Disabled', count: mockLuaFilters.filter(f => !f.enabled).length }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setLuaFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${luaFilter === cat.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                    {cat.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${luaFilter === cat.id ? 'bg-cyan-500/30 text-cyan-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Lua Filters List - grouped by filter like WASM */}
            <div className="space-y-3 mb-6">
              {luaFilterGroups.filter(filterDef => {
                if (luaFilter === 'All' || luaFilter === 'AllConfigs') return true;
                if (luaFilter === 'Inline') return filterDef.sourceType === 'inline';
                if (luaFilter === 'ConfigMap') return filterDef.sourceType === 'configmap';
                if (luaFilter === 'Enabled') return filterDef.configs.some(c => c.enabled);
                if (luaFilter === 'Disabled') return filterDef.configs.some(c => !c.enabled);
                return true;
              }).map(filterDef => {
                const isExpanded = expandedLuaFilters.includes(filterDef.name);
                const configs = filterDef.configs;
                const activeCount = configs.filter(c => c.enabled).length;
                const totalInvocations = configs.reduce((sum, c) => {
                  const val = c.metrics?.invocations || '0';
                  const num = parseFloat(val.replace(/[KM]/g, '')) * (val.includes('M') ? 1000000 : val.includes('K') ? 1000 : 1);
                  return sum + num;
                }, 0);
                const hasWarnings = configs.some(c => !c.validated || !c.targetExists);

                return (
                  <div key={filterDef.name} className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                    {/* Filter Header Row (the global script) */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors"
                      onClick={() => setExpandedLuaFilters(prev => isExpanded ? prev.filter(n => n !== filterDef.name) : [...prev, filterDef.name])}
                    >
                      <div className="flex items-center gap-3">
                        <button className={`w-6 h-6 flex items-center justify-center rounded transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                          <Icon name="chevron-right" size={16} className="text-gray-400" />
                        </button>
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Icon name="code" size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-200 flex items-center gap-2">
                            {filterDef.name}
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-400 font-mono">{filterDef.version}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{configs.length} config{configs.length !== 1 ? 's' : ''}</span>
                            {hasWarnings && <Icon name="alert-triangle" size={12} className="text-amber-400" title="Some configs have warnings" />}
                          </div>
                          <div className="text-xs text-gray-500">{filterDef.sourceType} • {filterDef.owner}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-300">{totalInvocations >= 1000000 ? (totalInvocations/1000000).toFixed(1) + 'M' : totalInvocations >= 1000 ? (totalInvocations/1000).toFixed(0) + 'K' : totalInvocations} <span className="text-gray-500 text-xs">calls</span></div>
                          <div className="text-xs text-gray-500">{activeCount}/{configs.length} active</div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setViewingLuaScript(filterDef); }}
                          className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs rounded-lg flex items-center gap-1.5"
                        >
                          <Icon name="file-text" size={12} />Script
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content: Service Configs Table */}
                    {isExpanded && (
                      <div className="border-t border-gray-700 bg-gray-900/30">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-700/50">
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Service Config</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Target</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Operation</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Context</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Hook</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Metrics</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {configs.map(cfg => {
                              const targetShort = cfg.targetFilter?.replace('envoy.filters.http.', '') || null;
                              return (
                              <tr key={cfg.id} className={`border-b border-gray-700/30 hover:bg-gray-800/30 ${!cfg.enabled ? 'opacity-50' : ''}`}>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-200">{cfg.name}</span>
                                    {!cfg.validated && <Icon name="alert-circle" size={12} className="text-amber-400" title="Validation warning" />}
                                    {!cfg.targetExists && <Icon name="alert-triangle" size={12} className="text-orange-400" title="IST0151" />}
                                  </div>
                                  <div className="text-[10px] text-gray-500">{cfg.namespace}</div>
                                </td>
                                <td className="px-4 py-2.5">
                                  <span className="text-xs px-2 py-1 rounded bg-teal-500/20 text-teal-300">{cfg.target}</span>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center gap-1">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                      cfg.operation === 'INSERT_BEFORE' ? 'bg-blue-500/20 text-blue-300' :
                                      cfg.operation === 'INSERT_AFTER' ? 'bg-green-500/20 text-green-300' :
                                      'bg-orange-500/20 text-orange-300'
                                    }`}>{cfg.operation.replace('INSERT_', '')}</span>
                                    {targetShort && <span className="text-[10px] text-gray-400">→ {targetShort}</span>}
                                  </div>
                                </td>
                                <td className="px-4 py-2.5 text-xs text-gray-400">{cfg.match.context}</td>
                                <td className="px-4 py-2.5">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                    cfg.hookType === 'request' ? 'bg-blue-500/20 text-blue-300' :
                                    cfg.hookType === 'response' ? 'bg-green-500/20 text-green-300' :
                                    'bg-purple-500/20 text-purple-300'
                                  }`}>{cfg.hookType === 'both' ? 'req+res' : cfg.hookType}</span>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="text-xs text-gray-300">{cfg.metrics?.invocations || '0'}</div>
                                  <div className={`text-[10px] ${cfg.metrics?.errors !== '0' ? 'text-red-400' : 'text-gray-500'}`}>{cfg.metrics?.errors || '0'} err</div>
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => setEditingLuaFilter(cfg)}
                                      className="p-1 hover:bg-cyan-500/20 rounded text-gray-400 hover:text-cyan-400"
                                      title="Edit Config"
                                    >
                                      <Icon name="edit" size={12} />
                                    </button>
                                    <button
                                      onClick={() => showNotification(`${cfg.enabled ? 'Disabling' : 'Enabling'} ${cfg.name}...`)}
                                      className={`relative w-8 h-4 rounded-full transition-colors ${cfg.enabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
                                    >
                                      <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${cfg.enabled ? 'translate-x-4' : 'translate-x-1'}`} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )})}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Icon name="info" size={16} className="text-indigo-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-indigo-300 mb-2">Lua Filter Reuse (like WASM Modules)</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">
                    One Lua filter script can be reused by multiple service configurations with different settings. Each config specifies its own:
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1 mb-2">
                    <li><strong>Operation</strong>: <code className="text-blue-300">INSERT_BEFORE</code>, <code className="text-green-300">INSERT_AFTER</code>, or <code className="text-orange-300">INSERT_FIRST</code></li>
                    <li><strong>Target Filter</strong>: Which Envoy filter to insert relative to (e.g., router, jwt_authn)</li>
                    <li><strong>Context</strong>: GATEWAY, SIDECAR_INBOUND, or SIDECAR_OUTBOUND</li>
                    <li><strong>Hook Type</strong>: request, response, or both</li>
                  </ul>
                  <p className="text-xs text-gray-500">
                    <Icon name="alert-triangle" size={10} className="inline text-amber-400 mr-1" />
                    <strong>IST0151 Warning:</strong> If the target filter doesn't exist, INSERT_BEFORE goes to front, INSERT_AFTER goes to end.
                  </p>
                </div>
              </div>
            </div>
          </>})()}

          {/* Lua Filter Config Edit Modal */}
          {featureFlags.dadLua && editingLuaFilter && (() => {
            const filterDef = mockLuaFilterDefs.find(f => f.name === editingLuaFilter.filter);
            return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setEditingLuaFilter(null)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <Icon name="settings" size={20} className="text-cyan-400" />
                        </div>
                        Edit Config: {editingLuaFilter.name}
                      </h2>
                      <div className="mt-1 ml-[52px] text-sm text-gray-400 flex items-center gap-2">
                        Uses filter: <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium">{editingLuaFilter.filter}</span>
                        <span className="text-gray-600">•</span>
                        Target: <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">{editingLuaFilter.target}</span>
                      </div>
                    </div>
                    <button onClick={() => setEditingLuaFilter(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200">
                      <Icon name="x" size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Filter Chain Visualization */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                      <Icon name="git-branch" size={14} className="text-indigo-400" />
                      Filter Chain Position for {editingLuaFilter.target}
                    </h3>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {editingLuaFilter.operation === 'INSERT_FIRST' && (
                          <>
                            <div className="px-4 py-2 rounded-lg bg-indigo-500/30 border-2 border-indigo-400 text-sm font-medium text-indigo-200 shadow-lg shadow-indigo-500/20">
                              {editingLuaFilter.filter}
                              <div className="text-[10px] text-indigo-400 mt-0.5">Your Filter</div>
                            </div>
                            <Icon name="chevron-right" size={16} className="text-gray-500" />
                          </>
                        )}
                        {['jwt_authn', 'ext_authz', 'rbac', 'router'].map((filter, idx) => {
                          const targetShort = editingLuaFilter.targetFilter?.replace('envoy.filters.http.', '') || null;
                          const isTarget = filter === targetShort;
                          const showBefore = editingLuaFilter.operation === 'INSERT_BEFORE' && isTarget;
                          const showAfter = editingLuaFilter.operation === 'INSERT_AFTER' && isTarget;
                          return (
                            <React.Fragment key={filter}>
                              {showBefore && (
                                <>
                                  <div className="px-4 py-2 rounded-lg bg-indigo-500/30 border-2 border-indigo-400 text-sm font-medium text-indigo-200 shadow-lg shadow-indigo-500/20">
                                    {editingLuaFilter.filter}
                                    <div className="text-[10px] text-indigo-400 mt-0.5">Your Filter</div>
                                  </div>
                                  <Icon name="chevron-right" size={16} className="text-gray-500" />
                                </>
                              )}
                              <div className={`px-4 py-2 rounded-lg text-sm font-mono ${
                                filter === 'router' ? 'bg-violet-500/20 border border-violet-500/30 text-violet-300' :
                                filter === 'jwt_authn' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' :
                                'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                              }`}>
                                {filter}
                                <div className="text-[10px] text-gray-500 mt-0.5">{filter === 'jwt_authn' ? 'AuthN' : filter === 'router' ? 'Terminal' : 'AuthZ'}</div>
                              </div>
                              {showAfter && (
                                <>
                                  <Icon name="chevron-right" size={16} className="text-gray-500" />
                                  <div className="px-4 py-2 rounded-lg bg-indigo-500/30 border-2 border-indigo-400 text-sm font-medium text-indigo-200 shadow-lg shadow-indigo-500/20">
                                    {editingLuaFilter.filter}
                                    <div className="text-[10px] text-indigo-400 mt-0.5">Your Filter</div>
                                  </div>
                                </>
                              )}
                              {idx < 3 && <Icon name="chevron-right" size={16} className="text-gray-500" />}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      {!editingLuaFilter.targetExists && (
                        <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center gap-2">
                          <Icon name="alert-triangle" size={14} />
                          IST0151: Target filter may not exist on this proxy. Your filter will be inserted at the {editingLuaFilter.operation === 'INSERT_BEFORE' ? 'front' : 'end'} of the chain instead.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Config Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Operation</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200" defaultValue={editingLuaFilter.operation}>
                        <option value="INSERT_BEFORE">INSERT_BEFORE</option>
                        <option value="INSERT_AFTER">INSERT_AFTER</option>
                        <option value="INSERT_FIRST">INSERT_FIRST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Target Filter</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200" defaultValue={editingLuaFilter.targetFilter || ''}>
                        <option value="">-- Select Target --</option>
                        <option value="envoy.filters.http.jwt_authn">jwt_authn</option>
                        <option value="envoy.filters.http.ext_authz">ext_authz</option>
                        <option value="envoy.filters.http.rbac">rbac</option>
                        <option value="envoy.filters.http.router">router</option>
                        <option value="envoy.filters.http.cors">cors</option>
                        <option value="envoy.filters.http.fault">fault</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Context</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200" defaultValue={editingLuaFilter.match.context}>
                        <option value="GATEWAY">GATEWAY</option>
                        <option value="SIDECAR_INBOUND">SIDECAR_INBOUND</option>
                        <option value="SIDECAR_OUTBOUND">SIDECAR_OUTBOUND</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Hook Type</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200" defaultValue={editingLuaFilter.hookType}>
                        <option value="request">envoy_on_request</option>
                        <option value="response">envoy_on_response</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>

                  {/* Lua Script (from filter definition - read only here) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-gray-400">Lua Script (from {editingLuaFilter.filter})</label>
                      <button
                        onClick={() => showNotification(`Opening script editor for ${editingLuaFilter.filter}`)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Icon name="edit" size={10} />Edit Script
                      </button>
                    </div>
                    <pre className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 font-mono h-32 overflow-auto">
                      {filterDef?.script || '-- Script not found'}
                    </pre>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                  <button onClick={() => setEditingLuaFilter(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg">Cancel</button>
                  <button onClick={() => { showNotification(`Saved config changes to ${editingLuaFilter.name}`); setEditingLuaFilter(null); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded-lg">Save Config</button>
                </div>
              </div>
            </div>
          );})()}

          {/* Lua Script Viewer (Read-Only) */}
          {featureFlags.dadLua && viewingLuaScript && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setViewingLuaScript(null)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                          <Icon name="code" size={20} className="text-indigo-400" />
                        </div>
                        {viewingLuaScript.name}
                      </h2>
                      <div className="mt-1 ml-[52px] text-sm text-gray-400 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-300 font-mono">{viewingLuaScript.version}</span>
                        <span className="text-gray-600">•</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{viewingLuaScript.sourceType}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-500">{viewingLuaScript.owner}</span>
                      </div>
                    </div>
                    <button onClick={() => setViewingLuaScript(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-gray-200">
                      <Icon name="x" size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Script Content (Read-Only) */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-mono">lua</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700 text-gray-500">read-only</span>
                      </div>
                      <button
                        onClick={() => { navigator.clipboard.writeText(viewingLuaScript.script || ''); showNotification('Script copied to clipboard'); }}
                        className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1"
                      >
                        <Icon name="copy" size={12} />Copy
                      </button>
                    </div>
                    <pre className="p-4 text-sm text-gray-300 font-mono overflow-auto max-h-[400px] leading-relaxed whitespace-pre-wrap">
                      {viewingLuaScript.script || '-- Script not available'}
                    </pre>
                  </div>

                  {/* Usage Info */}
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="info" size={16} className="text-indigo-400 mt-0.5" />
                      <div className="text-xs text-gray-400">
                        <p>This filter script is used by <strong className="text-indigo-300">{viewingLuaScript.configs?.length || 0} service config(s)</strong>.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-700 flex justify-end">
                  <button onClick={() => setViewingLuaScript(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg">Close</button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {dadActiveTab === 'security' && featureFlags.dadSecurity && <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">mTLS Enforcement</span>
                  <Icon name="lock" size={14} className="text-emerald-400" />
                </div>
                <div className="text-2xl font-semibold text-emerald-300">{mockSecurityPolicies.filter(p => p.type === 'PeerAuthentication' && p.mode === 'STRICT').length}/{mockSecurityPolicies.filter(p => p.type === 'PeerAuthentication').length}</div>
                <div className="text-xs text-gray-500 mt-1">STRICT mode policies</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Auth Policies</span>
                  <Icon name="shield" size={14} className="text-blue-400" />
                </div>
                <div className="text-2xl font-semibold text-blue-300">{meshStats.authPolicies}</div>
                <div className="text-xs text-gray-500 mt-1">Authorization rules</div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">JWT Providers</span>
                  <Icon name="key" size={14} className="text-violet-400" />
                </div>
                <div className="text-2xl font-semibold text-violet-300">{mockSecurityPolicies.filter(p => p.type === 'RequestAuthentication').length}</div>
                <div className="text-xs text-gray-500 mt-1">RequestAuthentication</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Warnings</span>
                  <Icon name="alert-triangle" size={14} className="text-amber-400" />
                </div>
                <div className="text-2xl font-semibold text-amber-300">{mockSecurityPolicies.filter(p => p.status === 'warning').length}</div>
                <div className="text-xs text-gray-500 mt-1">PERMISSIVE mode</div>
              </div>
            </div>
            {/* Filter Tabs with Counts */}
            <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
              {[
                { id: 'All', count: mockSecurityPolicies.length + mockMeshResources.filter(r => r.type === 'authpolicy').length },
                { id: 'PeerAuth', count: mockSecurityPolicies.filter(p => p.type === 'PeerAuthentication').length },
                { id: 'RequestAuth', count: mockSecurityPolicies.filter(p => p.type === 'RequestAuthentication').length },
                { id: 'AuthPolicy', count: mockMeshResources.filter(r => r.type === 'authpolicy').length }
              ].map(cat => (
                <button key={cat.id} onClick={() => setSecurityFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${securityFilter === cat.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                  {cat.id}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${securityFilter === cat.id ? 'bg-amber-500/30 text-amber-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                </button>
              ))}
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Policy</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Mode/Issuer</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Selector</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Owner</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr></thead>
                <tbody>
                  {[...mockSecurityPolicies, ...mockMeshResources.filter(r => r.type === 'authpolicy')].filter(p => {
                    if (securityFilter === 'All') return true;
                    if (securityFilter === 'PeerAuth') return p.type === 'PeerAuthentication';
                    if (securityFilter === 'RequestAuth') return p.type === 'RequestAuthentication';
                    if (securityFilter === 'AuthPolicy') return p.type === 'authpolicy';
                    return true;
                  }).map((p, idx) => {
                    const isPeerAuth = p.type === 'PeerAuthentication';
                    const isReqAuth = p.type === 'RequestAuthentication';
                    const isAuthPolicy = p.type === 'authpolicy';
                    return (
                    <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                      <td className="px-4 py-3"><div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isPeerAuth ? 'bg-emerald-500/20 text-emerald-400' :
                          isReqAuth ? 'bg-violet-500/20 text-violet-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}><Icon name={isPeerAuth ? 'lock' : isReqAuth ? 'key' : 'shield'} size={16} /></div>
                        <div><div className="font-medium">{p.name}</div><div className="text-xs text-gray-500">{p.namespace}</div></div>
                      </div></td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        isPeerAuth ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        isReqAuth ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' :
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>{isPeerAuth ? 'PeerAuth' : isReqAuth ? 'RequestAuth' : 'AuthPolicy'}</span></td>
                      <td className="px-4 py-3"><span className="text-sm text-gray-400 font-mono">{isPeerAuth ? p.mode : isReqAuth ? new URL(p.issuer).hostname : p.action}</span></td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === 'enforced' || p.status === 'active' || p.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-300' :
                        p.status === 'warning' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-500/20 text-gray-300'
                      }`}>{p.status}</span></td>
                      <td className="px-4 py-3"><span className="text-xs text-gray-400">{p.selector ? Object.entries(p.selector).map(([k,v]) => `${k}=${v}`).join(', ') : 'mesh-wide'}</span></td>
                      <td className="px-4 py-3"><span className="text-xs text-gray-400">{p.owner}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => showNotification(`Editing ${p.name}...`)} className="p-1.5 hover:bg-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-400" title="Edit"><Icon name="edit" size={14} /></button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* Certificates Tab */}
          {dadActiveTab === 'certs' && featureFlags.dadCertificates && <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Valid Certs</span>
                  <Icon name="check-circle" size={14} className="text-emerald-400" />
                </div>
                <div className="text-2xl font-semibold text-emerald-300">{mockCertificates.filter(c => c.status === 'valid').length}</div>
                <div className="text-xs text-gray-500 mt-1">Active & healthy</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Expiring Soon</span>
                  <Icon name="alert-triangle" size={14} className="text-amber-400" />
                </div>
                <div className="text-2xl font-semibold text-amber-300">{mockCertificates.filter(c => c.daysRemaining < 30).length}</div>
                <div className="text-xs text-gray-500 mt-1">&lt; 30 days remaining</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Auto-Renew</span>
                  <Icon name="refresh-cw" size={14} className="text-cyan-400" />
                </div>
                <div className="text-2xl font-semibold text-cyan-300">{mockCertificates.filter(c => c.autoRenew).length}</div>
                <div className="text-xs text-gray-500 mt-1">cert-manager enabled</div>
              </div>
              <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">External CAs</span>
                  <Icon name="globe" size={14} className="text-violet-400" />
                </div>
                <div className="text-2xl font-semibold text-violet-300">{mockCertificates.filter(c => !c.issuer.includes('cert-manager')).length}</div>
                <div className="text-xs text-gray-500 mt-1">DigiCert, external</div>
              </div>
            </div>
            {/* Filter Tabs with Counts */}
            <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
              {[
                { id: 'All', count: mockCertificates.length },
                { id: 'Gateway', count: mockCertificates.filter(c => c.type === 'gateway').length },
                { id: 'mTLS', count: mockCertificates.filter(c => c.type === 'mtls').length },
                { id: 'Client', count: mockCertificates.filter(c => c.type === 'client').length },
                { id: 'Workload', count: mockCertificates.filter(c => c.type === 'workload').length }
              ].map(cat => (
                <button key={cat.id} onClick={() => setCertFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${certFilter === cat.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                  {cat.id}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${certFilter === cat.id ? 'bg-amber-500/30 text-amber-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                </button>
              ))}
              <div className="border-l border-gray-600 mx-2" />
              {[
                { id: 'Valid', count: mockCertificates.filter(c => c.status === 'valid').length, activeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30', countClass: 'bg-emerald-500/30 text-emerald-200' },
                { id: 'Expiring', count: mockCertificates.filter(c => c.status === 'expiring' || c.daysRemaining < 30).length, activeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30', countClass: 'bg-amber-500/30 text-amber-200' }
              ].map(cat => (
                <button key={cat.id} onClick={() => setCertFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${certFilter === cat.id ? cat.activeClass : 'text-gray-400 hover:bg-gray-800'}`}>
                  {cat.id}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${certFilter === cat.id ? cat.countClass : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                </button>
              ))}
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Certificate</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Issuer</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Expires</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Auto</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr></thead>
                <tbody>
                  {mockCertificates.filter(c => {
                    if (certFilter === 'All') return true;
                    if (certFilter === 'Gateway') return c.type === 'gateway';
                    if (certFilter === 'mTLS') return c.type === 'mtls';
                    if (certFilter === 'Client') return c.type === 'client';
                    if (certFilter === 'Workload') return c.type === 'workload';
                    if (certFilter === 'Valid') return c.status === 'valid';
                    if (certFilter === 'Expiring') return c.status === 'expiring' || c.daysRemaining < 30;
                    return true;
                  }).map(c => (
                    <tr key={c.id} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                      <td className="px-4 py-3"><div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          c.status === 'valid' ? 'bg-emerald-500/20 text-emerald-400' :
                          c.status === 'expiring' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                        }`}><Icon name="lock" size={16} /></div>
                        <div><div className="font-medium">{c.name}</div><div className="text-xs text-gray-500">{c.namespace}</div></div>
                      </div></td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                        c.type === 'gateway' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                        c.type === 'mtls' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        c.type === 'client' ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' :
                        'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>{c.type.toUpperCase()}</span></td>
                      <td className="px-4 py-3"><span className="text-xs text-gray-400">{c.issuer}</span></td>
                      <td className="px-4 py-3">
                        <div className="text-sm">{c.notAfter}</div>
                        <div className={`text-xs ${c.daysRemaining < 30 ? 'text-amber-400' : 'text-gray-500'}`}>{c.daysRemaining} days</div>
                      </td>
                      <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        c.status === 'valid' ? 'bg-emerald-500/20 text-emerald-300' :
                        c.status === 'expiring' ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
                      }`}>{c.status}</span></td>
                      <td className="px-4 py-3">{c.autoRenew ? <Icon name="check" size={16} className="text-emerald-400" /> : <span className="text-gray-500">-</span>}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => showNotification(`Viewing ${c.name} details...`)} className="p-1.5 hover:bg-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-400" title="View Details"><Icon name="eye" size={14} /></button>
                          <button onClick={() => showNotification(`Renewing ${c.name}...`)} className="p-1.5 hover:bg-emerald-500/20 rounded-lg text-gray-400 hover:text-emerald-400" title="Renew"><Icon name="refresh-cw" size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {/* Resource Detail Panel */}
          {selectedService && (() => {
            const r = selectedService;
            const typeConfig = {
              service: { icon: 'server', label: 'Service', iconClass: 'bg-blue-500/20 text-blue-400' },
              virtualservice: { icon: 'git-branch', label: 'Virtual Service', iconClass: 'bg-violet-500/20 text-violet-400' },
              ingress: { icon: 'log-in', label: 'Ingress Gateway', iconClass: 'bg-cyan-500/20 text-cyan-400' },
              egress: { icon: 'log-out', label: 'Egress Gateway', iconClass: 'bg-orange-500/20 text-orange-400' },
              eastwest: { icon: 'repeat', label: 'East-West Gateway', iconClass: 'bg-teal-500/20 text-teal-400' },
              destinationrule: { icon: 'sliders', label: 'Destination Rule', iconClass: 'bg-violet-500/20 text-violet-400' },
              authpolicy: { icon: 'shield', label: 'Authorization Policy', iconClass: 'bg-emerald-500/20 text-emerald-400' },
              serviceentry: { icon: 'external-link', label: 'Service Entry', iconClass: 'bg-pink-500/20 text-pink-400' }
            }[r.type] || { icon: 'box', label: r.type, iconClass: 'bg-gray-500/20 text-gray-400' };

            return (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => { setSelectedService(null); setDadDetailEditMode(false); }} />
              <div className="relative w-[650px] bg-gray-900 border-l border-gray-700 overflow-auto">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setSelectedService(null); setDadDetailEditMode(false); }} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.iconClass}`}>
                      <Icon name={typeConfig.icon} size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs text-gray-500">{typeConfig.label} • {r.namespace}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {dadDetailEditMode ? (
                      <>
                        <button onClick={() => {
                          // Save updates to the resource
                          const updatedResource = { ...r, ...editFormData };
                          setSavedDadResources(prev => {
                            const existing = prev.find(p => p.id === r.id);
                            if (existing) {
                              return prev.map(p => p.id === r.id ? updatedResource : p);
                            }
                            return [...prev, updatedResource];
                          });
                          showNotification(`${r.name} saved successfully!`, 'success');
                          setDadDetailEditMode(false);
                        }} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium flex items-center gap-1"><Icon name="check" size={14} />Save</button>
                        <button onClick={() => setDadDetailEditMode(false)} className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg text-sm">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => {
                          if (r.type === 'service' || r.type === 'virtualservice') {
                            setSelectedService(null);
                            setServiceEditorResource(r);
                            setServiceFilterChain(getServiceFilters(r));
                            setSelectedFilterNode(null);
                            setShowServiceEditor(true);
                          } else {
                            setEditFormData({...r}); setDadDetailEditMode(true);
                          }
                        }} className="p-2 text-gray-400 hover:text-amber-400 hover:bg-amber-500/20 rounded-lg" title="Edit"><Icon name="edit" size={16} /></button>
                        <button onClick={() => showNotification(`Viewing logs for ${r.name}...`)} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg" title="Logs"><Icon name="file-text" size={16} /></button>
                        <button onClick={() => showNotification(`Opening Kiali for ${r.name}`)} className="p-2 text-gray-400 hover:text-violet-400 hover:bg-violet-500/20 rounded-lg" title="Kiali"><Icon name="external-link" size={16} /></button>
                        <button onClick={() => { showNotification(`Resource "${r.name}" deleted`, 'warning'); setSelectedService(null); setDadDetailEditMode(false); }} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg" title="Delete"><Icon name="trash-2" size={16} /></button>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={r.status} /></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Created</div><div className="text-sm text-gray-300">{r.created}</div></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Owner</div><div className="text-sm text-gray-300">{r.owner}</div></div>
                  </div>

                  {/* INGRESS GATEWAY Details */}
                  {r.type === 'ingress' && (
                    <>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="globe" size={14} className="text-cyan-400" />Gateway Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Port</div><div className="text-gray-300">{r.port}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">TLS Mode</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${r.tls === 'MUTUAL' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'}`}><Icon name="lock" size={10} />{r.tls}</span></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="link" size={14} className="text-cyan-400" />Hosts ({r.hosts?.length || 0})</h3>
                        <div className="space-y-2">
                          {r.hosts?.map((host, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Icon name="globe" size={14} className="text-cyan-400" />
                                <span className="text-sm font-mono">{host}</span>
                              </div>
                              <span className="text-xs text-emerald-400">Active</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="shield" size={14} className="text-cyan-400" />TLS Configuration</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Certificate</span>
                            <span className="text-xs font-mono text-gray-300">/etc/istio/ingressgateway-certs/tls.crt</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Private Key</span>
                            <span className="text-xs font-mono text-gray-300">/etc/istio/ingressgateway-certs/tls.key</span>
                          </div>
                          {r.tls === 'MUTUAL' && (
                            <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-gray-400">CA Certificate</span>
                              <span className="text-xs font-mono text-gray-300">/etc/istio/ingressgateway-ca-certs/ca.crt</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Min TLS Version</span>
                            <span className="text-xs text-emerald-300">TLSv1_3</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-cyan-400" />Traffic Metrics</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Requests/sec</div><div className="text-lg font-semibold text-cyan-400">1.2K</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">P99 Latency</div><div className="text-lg font-semibold text-emerald-400">45ms</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Error Rate</div><div className="text-lg font-semibold text-emerald-400">0.02%</div></div>
                        </div>
                      </div>
                      {/* WASM Plugins */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="cpu" size={14} className="text-cyan-400" />WASM Plugins</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
                              <span className="font-mono text-cyan-300">jwt_validator</span>
                            </div>
                            <span className="text-xs text-gray-500">Position 2</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* EGRESS GATEWAY Details */}
                  {r.type === 'egress' && (
                    <>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="log-out" size={14} className="text-orange-400" />Egress Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Port</div><div className="text-gray-300">{r.port}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">TLS Mode</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30`}><Icon name="lock" size={10} />{r.tls}</span></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="external-link" size={14} className="text-orange-400" />Allowed External Hosts ({r.hosts?.length || 0})</h3>
                        <div className="space-y-2">
                          {r.hosts?.map((host, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Icon name="globe" size={14} className="text-orange-400" />
                                <span className="text-sm font-mono">{host}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Port 443</span>
                                <span className="text-xs text-emerald-400">Allowed</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="shield" size={14} className="text-orange-400" />TLS Origination</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Mode</span>
                            <span className="text-xs text-orange-300">{r.tls}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">SNI</span>
                            <span className="text-xs font-mono text-gray-300">auto (from host)</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Credential Name</span>
                            <span className="text-xs font-mono text-gray-300">egress-tls-secret</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-orange-400" />Outbound Traffic</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Requests/sec</div><div className="text-lg font-semibold text-orange-400">340</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Avg Latency</div><div className="text-lg font-semibold text-amber-400">120ms</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Blocked</div><div className="text-lg font-semibold text-red-400">12</div></div>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-2 text-amber-400"><Icon name="alert-triangle" size={14} />Security Note</h3>
                        <p className="text-xs text-gray-400">All outbound traffic to external services is routed through this egress gateway for audit logging and policy enforcement. Requests to unlisted hosts are blocked by default.</p>
                      </div>
                      {/* Egress Flow Diagram - Two Hop Model */}
                      <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-4 flex items-center gap-2"><Icon name="git-merge" size={14} className="text-orange-400" />Egress Traffic Flow (Two-Hop Model)</h3>
                        <div className="space-y-2">
                          {/* Step 1: App to Sidecar */}
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-24 text-right">
                              <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                                <Icon name="box" size={14} className="text-blue-400" />
                                <span className="text-xs font-medium text-blue-300">App Pod</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0"><Icon name="arrow-right" size={16} className="text-gray-500" /></div>
                            <div className="flex-1 px-3 py-1.5 bg-gray-800/50 rounded text-xs text-gray-400">Request to external host</div>
                          </div>
                          {/* Step 2: Sidecar to Egress Gateway */}
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-24 text-right">
                              <div className="inline-flex items-center gap-2 px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded-lg">
                                <Icon name="shield" size={14} className="text-violet-400" />
                                <span className="text-xs font-medium text-violet-300">Sidecar</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0"><Icon name="arrow-right" size={16} className="text-gray-500" /></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">VirtualService</span>
                                <span className="text-xs text-gray-500">routes to</span>
                                <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded">{r.name}</span>
                              </div>
                            </div>
                          </div>
                          {/* Step 3: Egress Gateway */}
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-24 text-right">
                              <div className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                                <Icon name="log-out" size={14} className="text-orange-400" />
                                <span className="text-xs font-medium text-orange-300">Egress GW</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0"><Icon name="arrow-right" size={16} className="text-gray-500" /></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">VirtualService</span>
                                <span className="text-xs text-gray-500">+</span>
                                <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">DestinationRule</span>
                                <span className="text-xs text-gray-500">to external</span>
                              </div>
                            </div>
                          </div>
                          {/* Step 4: External Service */}
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-24 text-right">
                              <div className="inline-flex items-center gap-2 px-3 py-2 bg-pink-500/20 border border-pink-500/30 rounded-lg">
                                <Icon name="globe" size={14} className="text-pink-400" />
                                <span className="text-xs font-medium text-pink-300">External</span>
                              </div>
                            </div>
                            <div className="flex-shrink-0"><Icon name="check" size={16} className="text-emerald-500" /></div>
                            <div className="flex-1 px-3 py-1.5 bg-gray-800/50 rounded text-xs text-gray-400">TLS origination, mTLS, audit logging applied</div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg text-xs text-gray-500">
                          <strong className="text-gray-400">Two-hop architecture:</strong> Traffic flows from sidecar → egress gateway → external service. This provides a single controlled exit point for policy enforcement, audit logging, and TLS origination.
                        </div>
                      </div>
                    </>
                  )}

                  {/* SERVICE Details */}
                  {r.type === 'service' && (
                    <>
                      {/* EDIT MODE - Tabbed like filter chain modal */}
                      {dadDetailEditMode ? (() => {
                        const editTab = editFormData._editTab || 'details';
                        const luaFilters = editFormData.luaFilters || [
                          { name: 'trace_context', type: 'Tracing', position: 1 }
                        ];
                        const wasmPlugins = editFormData.wasmPlugins || [
                          { name: 'service_auth', type: 'AuthN', position: 2 }
                        ];
                        const unifiedChain = [
                          ...wasmPlugins.map(p => ({ ...p, filterType: 'wasm' })),
                          ...luaFilters.map(f => ({ ...f, filterType: 'lua' }))
                        ].sort((a, b) => a.position - b.position);
                        return (
                        <div className="-mx-6 -mt-6">
                          {/* Edit Tabs */}
                          <div className="flex border-b border-gray-700 bg-gray-800/30">
                            {[
                              { id: 'details', label: 'Details', icon: 'settings' },
                              { id: 'chain', label: 'Unified Chain', icon: 'layers', count: unifiedChain.length },
                              ...(featureFlags.dadLua ? [{ id: 'lua', label: 'Lua Filters', icon: 'code', count: luaFilters.length }] : []),
                              { id: 'wasm', label: 'WASM Plugins', icon: 'cpu', count: wasmPlugins.length }
                            ].map(tab => (
                              <button key={tab.id} onClick={() => setEditFormData({...editFormData, _editTab: tab.id})} className={`flex-1 px-3 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 border-b-2 ${editTab === tab.id ? 'border-blue-500 text-blue-300 bg-blue-500/5' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                                <Icon name={tab.icon} size={14} />{tab.label}
                                {tab.count !== undefined && <span className={`px-1.5 py-0.5 rounded text-xs ${editTab === tab.id ? 'bg-blue-500/20 text-blue-200' : 'bg-gray-700 text-gray-400'}`}>{tab.count}</span>}
                              </button>
                            ))}
                          </div>
                          <div className="p-4 space-y-4">
                            {/* Details Tab */}
                            {editTab === 'details' && <>
                              <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs text-gray-500 mb-1">Name</label><input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500" /></div>
                                <div><label className="block text-xs text-gray-500 mb-1">Namespace</label><input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500" /></div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs text-gray-500 mb-1">Port</label><input type="number" value={editFormData.port || 8080} onChange={e => setEditFormData({...editFormData, port: parseInt(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500" /></div>
                                <div><label className="block text-xs text-gray-500 mb-1">Protocol</label>
                                  <select value={editFormData.protocol || 'HTTP'} onChange={e => setEditFormData({...editFormData, protocol: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500">
                                    <option value="HTTP">HTTP</option><option value="HTTPS">HTTPS</option><option value="TCP">TCP</option><option value="gRPC">gRPC</option>
                                  </select>
                                </div>
                              </div>
                              <div><label className="block text-xs text-gray-500 mb-1">Service Type</label>
                                <div className="flex gap-2">
                                  {['ClusterIP', 'NodePort', 'LoadBalancer'].map(t => (
                                    <button key={t} onClick={() => setEditFormData({...editFormData, serviceType: t})} className={`flex-1 py-1.5 text-xs rounded-lg border ${(editFormData.serviceType || 'ClusterIP') === t ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>{t}</button>
                                  ))}
                                </div>
                              </div>
                            </>}
                            {/* Unified Chain Tab */}
                            {editTab === 'chain' && <>
                              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400"><Icon name="git-merge" size={14} className="text-blue-400" />Complete Filter Chain for <span className="text-blue-300 font-mono">{editFormData.host || r.host}</span></div>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                  {unifiedChain.map((f, i) => (
                                    <React.Fragment key={f.name}>
                                      <div className={`flex-shrink-0 px-3 py-2 rounded-lg border ${f.filterType === 'wasm' ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-amber-500/10 border-amber-500/50'}`}>
                                        <div className={`text-sm font-medium ${f.filterType === 'wasm' ? 'text-cyan-300' : 'text-amber-300'}`}>{f.name}</div>
                                        <div className={`text-xs flex items-center gap-1 ${f.filterType === 'wasm' ? 'text-cyan-500' : 'text-amber-500'}`}><Icon name={f.filterType === 'wasm' ? 'cpu' : 'code'} size={10} />{f.type}</div>
                                      </div>
                                      {i < unifiedChain.length - 1 && <Icon name="chevron-right" size={14} className="text-gray-600 flex-shrink-0" />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm"><Icon name="cpu" size={14} />WASM Plugins ({wasmPlugins.length})</div>
                                <div className="space-y-1.5">{wasmPlugins.map(p => (<div key={p.name} className="flex items-center justify-between p-1.5 bg-gray-900/50 rounded text-xs"><span className="text-gray-200">{p.name}</span><span className="text-gray-500">Pos {p.position}</span></div>))}</div>
                              </div>
                            </>}
                            {/* Lua Filters Tab */}
                            {featureFlags.dadLua && editTab === 'lua' && <>
                              <div className="space-y-2">
                                {luaFilters.map((f, idx) => (
                                  <div key={f.name} className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                    <Icon name="code" size={16} className="text-amber-400" />
                                    <div className="flex-1"><div className="text-sm text-amber-300">{f.name}</div><div className="text-xs text-gray-500">{f.type}</div></div>
                                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">Position {f.position}</span>
                                    <button className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                                  </div>
                                ))}
                                <button className="w-full p-2.5 border border-dashed border-amber-500/30 rounded-lg text-sm text-amber-400 hover:bg-amber-500/10 flex items-center justify-center gap-2"><Icon name="plus" size={14} />Attach Lua Filter</button>
                              </div>
                            </>}
                            {/* WASM Plugins Tab */}
                            {editTab === 'wasm' && <>
                              <div className="space-y-2">
                                {wasmPlugins.map((p, idx) => (
                                  <div key={p.name} className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                    <Icon name="cpu" size={16} className="text-cyan-400" />
                                    <div className="flex-1"><div className="text-sm text-cyan-300">{p.name}</div><div className="text-xs text-gray-500">{p.type}</div></div>
                                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">Position {p.position}</span>
                                    <button className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                                  </div>
                                ))}
                                <button className="w-full p-2.5 border border-dashed border-cyan-500/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center gap-2"><Icon name="plus" size={14} />Attach WASM Plugin</button>
                              </div>
                            </>}
                          </div>
                        </div>
                      );})() : (
                      <>
                      {/* VIEW MODE */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="server" size={14} className="text-blue-400" />Service Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Host</div><div className="text-xs font-mono text-gray-300">{r.host}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Port</div><div className="text-gray-300">{r.port}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Protocol</div><div className="text-gray-300">{r.protocol}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Endpoints</div><div className="text-gray-300">{r.endpoints} healthy</div></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-blue-400" />Traffic Metrics</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Requests/sec</div><div className="text-lg font-semibold text-blue-400">450</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">P99 Latency</div><div className="text-lg font-semibold text-emerald-400">28ms</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Error Rate</div><div className="text-lg font-semibold text-emerald-400">0.01%</div></div>
                        </div>
                      </div>
                      {/* WASM Plugins */}
                      {(() => {
                        const filters = savedServiceFilters[r.name] || getServiceFilters(r);
                        return (
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="cpu" size={14} className="text-cyan-400" />WASM Plugins ({filters.length})</h3>
                            <div className="space-y-2 text-sm">
                              {filters.length > 0 ? filters.map((f, idx) => (
                                <div key={f.id || idx} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">{idx + 1}</span>
                                    <span className="font-mono text-cyan-300">{f.name}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{f.phase}</span>
                                </div>
                              )) : (
                                <div className="text-gray-500 text-center py-2">No filters configured</div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                      </>
                      )}
                    </>
                  )}

                  {/* VIRTUAL SERVICE Details */}
                  {r.type === 'virtualservice' && (
                    <>
                      {/* EDIT MODE - Tabbed like filter chain modal */}
                      {dadDetailEditMode ? (() => {
                        const editTab = editFormData._editTab || 'details';
                        const luaFilters = editFormData.luaFilters || [
                          { name: 'custom-cors', type: 'CORS', position: 1 },
                          { name: 'path-rewriter', type: 'Rewrite', position: 2 },
                          { name: 'tenant-router', type: 'Router', position: 4 }
                        ];
                        const wasmPlugins = editFormData.wasmPlugins || [
                          { name: 'jwt-validator', type: 'AuthN', position: 1 },
                          { name: 'rate-limiter', type: 'Rate Limit', position: 2 },
                          { name: 'audit-logger', type: 'Audit', position: 5 }
                        ];
                        const unifiedChain = [
                          ...wasmPlugins.map(p => ({ ...p, filterType: 'wasm' })),
                          ...luaFilters.map(f => ({ ...f, filterType: 'lua' }))
                        ].sort((a, b) => a.position - b.position);
                        return (
                        <div className="-mx-6 -mt-6">
                          {/* Edit Tabs */}
                          <div className="flex border-b border-gray-700 bg-gray-800/30">
                            {[
                              { id: 'details', label: 'Details', icon: 'settings' },
                              { id: 'chain', label: 'Unified Chain', icon: 'layers', count: unifiedChain.length },
                              ...(featureFlags.dadLua ? [{ id: 'lua', label: 'Lua Filters', icon: 'code', count: luaFilters.length }] : []),
                              { id: 'wasm', label: 'WASM Plugins', icon: 'cpu', count: wasmPlugins.length }
                            ].map(tab => (
                              <button key={tab.id} onClick={() => setEditFormData({...editFormData, _editTab: tab.id})} className={`flex-1 px-3 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 border-b-2 ${editTab === tab.id ? 'border-violet-500 text-violet-300 bg-violet-500/5' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                                <Icon name={tab.icon} size={14} />{tab.label}
                                {tab.count !== undefined && <span className={`px-1.5 py-0.5 rounded text-xs ${editTab === tab.id ? 'bg-violet-500/20 text-violet-200' : 'bg-gray-700 text-gray-400'}`}>{tab.count}</span>}
                              </button>
                            ))}
                          </div>
                          <div className="p-4 space-y-4">
                            {/* Details Tab */}
                            {editTab === 'details' && <>
                              <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs text-gray-500 mb-1">Name</label><input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-violet-500" /></div>
                                <div><label className="block text-xs text-gray-500 mb-1">Namespace</label><input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-violet-500" /></div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs text-gray-500 mb-1">Host</label><input type="text" value={editFormData.host || ''} onChange={e => setEditFormData({...editFormData, host: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm font-mono focus:outline-none focus:border-violet-500" /></div>
                                <div><label className="block text-xs text-gray-500 mb-1">Gateway</label><input type="text" value={editFormData.gateway || ''} onChange={e => setEditFormData({...editFormData, gateway: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-violet-500" /></div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs text-gray-500 mb-1">Timeout (s)</label><input type="number" value={editFormData.timeout || 30} onChange={e => setEditFormData({...editFormData, timeout: parseInt(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-violet-500" /></div>
                                <div><label className="block text-xs text-gray-500 mb-1">Retries</label><input type="number" value={editFormData.retries || 3} min={0} max={10} onChange={e => setEditFormData({...editFormData, retries: parseInt(e.target.value)})} className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-violet-500" /></div>
                              </div>
                            </>}
                            {/* Unified Chain Tab */}
                            {editTab === 'chain' && <>
                              <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-400"><Icon name="git-merge" size={14} className="text-violet-400" />Complete Filter Chain for <span className="text-violet-300 font-mono">{editFormData.host || r.host}</span></div>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                  {unifiedChain.map((f, i) => (
                                    <React.Fragment key={f.name}>
                                      <div className={`flex-shrink-0 px-3 py-2 rounded-lg border ${f.filterType === 'wasm' ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-amber-500/10 border-amber-500/50'}`}>
                                        <div className={`text-sm font-medium ${f.filterType === 'wasm' ? 'text-cyan-300' : 'text-amber-300'}`}>{f.name}</div>
                                        <div className={`text-xs flex items-center gap-1 ${f.filterType === 'wasm' ? 'text-cyan-500' : 'text-amber-500'}`}><Icon name={f.filterType === 'wasm' ? 'cpu' : 'code'} size={10} />{f.type}</div>
                                      </div>
                                      {i < unifiedChain.length - 1 && <Icon name="chevron-right" size={14} className="text-gray-600 flex-shrink-0" />}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm"><Icon name="cpu" size={14} />WASM Plugins ({wasmPlugins.length})</div>
                                <div className="space-y-1.5">{wasmPlugins.map(p => (<div key={p.name} className="flex items-center justify-between p-1.5 bg-gray-900/50 rounded text-xs"><span className="text-gray-200">{p.name}</span><span className="text-gray-500">Pos {p.position}</span></div>))}</div>
                              </div>
                            </>}
                            {/* Lua Filters Tab */}
                            {featureFlags.dadLua && editTab === 'lua' && <>
                              <div className="space-y-2">
                                {luaFilters.map((f, idx) => (
                                  <div key={f.name} className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                    <Icon name="code" size={16} className="text-amber-400" />
                                    <div className="flex-1"><div className="text-sm text-amber-300">{f.name}</div><div className="text-xs text-gray-500">{f.type}</div></div>
                                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">Position {f.position}</span>
                                    <button className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                                  </div>
                                ))}
                                <button className="w-full p-2.5 border border-dashed border-amber-500/30 rounded-lg text-sm text-amber-400 hover:bg-amber-500/10 flex items-center justify-center gap-2"><Icon name="plus" size={14} />Attach Lua Filter</button>
                              </div>
                            </>}
                            {/* WASM Plugins Tab */}
                            {editTab === 'wasm' && <>
                              <div className="space-y-2">
                                {wasmPlugins.map((p, idx) => (
                                  <div key={p.name} className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                    <Icon name="cpu" size={16} className="text-cyan-400" />
                                    <div className="flex-1"><div className="text-sm text-cyan-300">{p.name}</div><div className="text-xs text-gray-500">{p.type}</div></div>
                                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded">Position {p.position}</span>
                                    <button className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                                  </div>
                                ))}
                                <button className="w-full p-2.5 border border-dashed border-cyan-500/30 rounded-lg text-sm text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center gap-2"><Icon name="plus" size={14} />Attach WASM Plugin</button>
                              </div>
                            </>}
                          </div>
                        </div>
                      );})() : (
                      <>
                      {/* VIEW MODE */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="git-branch" size={14} className="text-violet-400" />Routing Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Host</div><div className="text-xs font-mono text-gray-300">{r.host}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Gateway</div><div className="text-gray-300">{r.gateway}</div></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="git-merge" size={14} className="text-violet-400" />HTTP Routes ({r.routes})</h3>
                        <div className="space-y-2">
                          <div className="p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-violet-300">Route: /api/v1/*</span>
                              <span className="text-xs text-gray-500">100% traffic</span>
                            </div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <div className="flex items-center gap-2"><Icon name="arrow-right" size={10} /><span className="font-mono">{r.name.split('-')[0]}-service:8080</span></div>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-violet-300">Route: /api/v2/*</span>
                              <span className="text-xs text-amber-400">Canary 10%</span>
                            </div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <div className="flex items-center gap-2"><Icon name="arrow-right" size={10} /><span className="font-mono">{r.name.split('-')[0]}-service-v2:8080 (10%)</span></div>
                              <div className="flex items-center gap-2"><Icon name="arrow-right" size={10} /><span className="font-mono">{r.name.split('-')[0]}-service:8080 (90%)</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="clock" size={14} className="text-violet-400" />Timeout & Retry</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Request Timeout</span>
                            <span className="text-xs text-violet-300">30s</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Retry Attempts</span>
                            <span className="text-xs text-violet-300">3</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Retry On</span>
                            <span className="text-xs font-mono text-gray-300">5xx,reset,connect-failure</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="shuffle" size={14} className="text-violet-400" />Header Manipulation</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-emerald-400">ADD</span>
                            <span className="font-mono text-gray-300">x-request-id: %REQ_ID%</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-emerald-400">ADD</span>
                            <span className="font-mono text-gray-300">x-envoy-upstream-rq-timeout-ms: 30000</span>
                          </div>
                        </div>
                      </div>
                      {/* Traffic Splitting */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="percent" size={14} className="text-amber-400" />Traffic Splitting (Canary)</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-900/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">v1 (stable)</span>
                                <span className="text-lg font-semibold text-emerald-400">90%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{width: '90%'}}></div>
                              </div>
                            </div>
                            <div className="flex-1 bg-gray-900/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-300">v2 (canary)</span>
                                <span className="text-lg font-semibold text-amber-400">10%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{width: '10%'}}></div>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => showNotification('Opening traffic split editor...')} className="w-full px-3 py-2 text-sm bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300">
                            <Icon name="sliders" size={14} className="inline mr-2" />Adjust Traffic Split
                          </button>
                        </div>
                      </div>
                      {/* Fault Injection */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="zap" size={14} className="text-red-400" />Fault Injection (Testing)</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center"><Icon name="clock" size={14} className="text-amber-400" /></div>
                              <div>
                                <div className="font-medium text-gray-300">Delay Injection</div>
                                <div className="text-xs text-gray-500">Add latency to test timeout handling</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">5% @ 2s</span>
                              <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded">Active</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center"><Icon name="x-circle" size={14} className="text-red-400" /></div>
                              <div>
                                <div className="font-medium text-gray-300">Abort Injection</div>
                                <div className="text-xs text-gray-500">Return HTTP errors to test resilience</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Disabled</span>
                              <button onClick={() => showNotification('Enabling abort injection...')} className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded">Enable</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Traffic Mirroring */}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="copy" size={14} className="text-cyan-400" />Traffic Mirroring (Shadow)</h3>
                        <div className="p-3 bg-gray-900/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon name="copy" size={14} className="text-cyan-400" />
                              <span className="text-sm font-medium text-gray-300">Mirror to v3-shadow</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">100%</span>
                          </div>
                          <div className="text-xs text-gray-500">Traffic is copied to {r.name.split('-')[0]}-service-v3:8080 for testing. Responses are discarded.</div>
                        </div>
                        <button onClick={() => showNotification('Opening mirror configuration...')} className="w-full mt-3 px-3 py-2 text-sm bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300">
                          <Icon name="settings" size={14} className="inline mr-2" />Configure Mirroring
                        </button>
                      </div>
                      {/* WASM Plugins */}
                      {(() => {
                        const filters = savedServiceFilters[r.name] || getServiceFilters(r);
                        return (
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="cpu" size={14} className="text-cyan-400" />WASM Plugins ({filters.length})</h3>
                            <div className="space-y-2 text-sm">
                              {filters.length > 0 ? filters.map((f, idx) => (
                                <div key={f.id || idx} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">{idx + 1}</span>
                                    <span className="font-mono text-cyan-300">{f.name}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{f.phase}</span>
                                </div>
                              )) : (
                                <div className="text-gray-500 text-center py-2">No filters configured</div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                      </>
                      )}
                    </>
                  )}

                  {/* DESTINATION RULE Details */}
                  {r.type === 'destinationrule' && (
                    <>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="sliders" size={14} className="text-violet-400" />Traffic Policy</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Host</div><div className="text-xs font-mono text-gray-300">{r.host}</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">mTLS Mode</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${r.mtls === 'STRICT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}><Icon name="lock" size={10} />{r.mtls}</span></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="loader" size={14} className="text-violet-400" />Load Balancing</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Algorithm</span>
                            <span className="text-xs text-violet-300">{r.trafficPolicy}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Locality LB</span>
                            <span className="text-xs text-emerald-400">Enabled</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Failover Priority</span>
                            <span className="text-xs font-mono text-gray-300">us-east-1 → us-west-2</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="zap-off" size={14} className={r.circuitBreaker ? 'text-orange-400' : 'text-gray-500'} />Circuit Breaker</h3>
                        {r.circuitBreaker ? (
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-gray-400">Max Connections</span>
                              <span className="text-xs text-orange-300">1000</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-gray-400">Max Pending Requests</span>
                              <span className="text-xs text-orange-300">100</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-gray-400">Max Requests/Connection</span>
                              <span className="text-xs text-orange-300">10</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-gray-400">Max Retries</span>
                              <span className="text-xs text-orange-300">3</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 p-2">Circuit breaker is disabled</div>
                        )}
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="alert-circle" size={14} className="text-red-400" />Outlier Detection</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Consecutive 5xx Errors</span>
                            <span className="text-xs text-red-300">5</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Interval</span>
                            <span className="text-xs text-gray-300">10s</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Base Ejection Time</span>
                            <span className="text-xs text-gray-300">30s</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Max Ejection %</span>
                            <span className="text-xs text-gray-300">50%</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* AUTH POLICY Details */}
                  {r.type === 'authpolicy' && (
                    <>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="shield" size={14} className="text-emerald-400" />Policy Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Action</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${r.action === 'ALLOW' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{r.action}</span></div>
                          <div><div className="text-xs text-gray-500 mb-1">Selector</div><div className="text-xs font-mono text-gray-300">app={r.namespace}</div></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="users" size={14} className="text-emerald-400" />Source Principals</h3>
                        <div className="space-y-2">
                          {r.principals?.map((p, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <span className="text-xs font-mono text-gray-300">{p}</span>
                              <span className="text-xs text-emerald-400">Allowed</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="list" size={14} className="text-emerald-400" />Rules ({r.rules})</h3>
                        <div className="space-y-2">
                          <div className="p-3 bg-gray-900/50 rounded-lg">
                            <div className="text-xs font-medium text-emerald-300 mb-2">Rule 1: API Access</div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <div className="flex items-center gap-2"><span className="text-gray-500">Methods:</span><span className="font-mono">GET, POST, PUT</span></div>
                              <div className="flex items-center gap-2"><span className="text-gray-500">Paths:</span><span className="font-mono">/api/*</span></div>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-900/50 rounded-lg">
                            <div className="text-xs font-medium text-emerald-300 mb-2">Rule 2: Health Check</div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <div className="flex items-center gap-2"><span className="text-gray-500">Methods:</span><span className="font-mono">GET</span></div>
                              <div className="flex items-center gap-2"><span className="text-gray-500">Paths:</span><span className="font-mono">/health, /ready</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="key" size={14} className="text-emerald-400" />JWT Requirements</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Issuer</span>
                            <span className="text-xs font-mono text-gray-300">https://auth.fanniemae.com</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">Audiences</span>
                            <span className="text-xs font-mono text-gray-300">{r.namespace}-api</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                            <span className="text-gray-400">JWKS URI</span>
                            <span className="text-xs font-mono text-gray-300">/.well-known/jwks.json</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SERVICE ENTRY Details */}
                  {r.type === 'serviceentry' && (
                    <>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="external-link" size={14} className="text-pink-400" />External Service Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Location</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${r.location === 'MESH_EXTERNAL' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}><Icon name={r.location === 'MESH_EXTERNAL' ? 'external-link' : 'server'} size={10} />{r.location}</span></div>
                          <div><div className="text-xs text-gray-500 mb-1">Resolution</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-300 border border-gray-500/30`}>{r.resolution}</span></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="globe" size={14} className="text-pink-400" />Hosts ({r.hosts?.length || 0})</h3>
                        <div className="space-y-2">
                          {r.hosts?.map((host, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Icon name="globe" size={14} className="text-pink-400" />
                                <span className="text-sm font-mono">{host}</span>
                              </div>
                              <span className="text-xs text-emerald-400">Registered</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="link" size={14} className="text-pink-400" />Ports</h3>
                        <div className="space-y-2">
                          {r.ports?.map((port, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-300">Port {port.number}</span>
                                <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded">{port.protocol}</span>
                              </div>
                              <span className="text-xs text-gray-500">{port.name || 'default'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {r.endpoints && (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="target" size={14} className="text-pink-400" />Static Endpoints</h3>
                          <div className="space-y-2">
                            {r.endpoints.map((ep, i) => (
                              <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                                <span className="text-sm font-mono text-gray-300">{ep}</span>
                                <span className="text-xs text-emerald-400">Healthy</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-pink-400" />Traffic Metrics</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div><div className="text-xs text-gray-500 mb-1">Requests/sec</div><div className="text-lg font-semibold text-pink-400">85</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Avg Latency</div><div className="text-lg font-semibold text-emerald-400">145ms</div></div>
                          <div><div className="text-xs text-gray-500 mb-1">Error Rate</div><div className="text-lg font-semibold text-emerald-400">0.1%</div></div>
                        </div>
                      </div>
                      <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-2 text-pink-400"><Icon name="info" size={14} />About ServiceEntry</h3>
                        <p className="text-xs text-gray-400">ServiceEntry extends Istio's service registry to include external services not in the mesh. Traffic to these hosts can be routed through egress gateways and have DestinationRules applied for mTLS, load balancing, and circuit breaking.</p>
                      </div>
                    </>
                  )}

                  {/* VS/DR Relationship (shown for VirtualService and DestinationRule) */}
                  {(r.type === 'virtualservice' || r.type === 'destinationrule') && (
                    <div className="bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="git-merge" size={14} className="text-violet-400" />Resource Relationships</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Icon name="git-branch" size={16} className="text-violet-400" /></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-violet-300">{r.type === 'virtualservice' ? r.name : 'loan-api-routes'}</div>
                            <div className="text-xs text-gray-500">VirtualService → Defines WHERE traffic goes (routing)</div>
                          </div>
                          {r.type === 'virtualservice' && <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">Current</span>}
                        </div>
                        <div className="flex items-center justify-center"><Icon name="arrow-down" size={16} className="text-gray-500" /></div>
                        <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center"><Icon name="sliders" size={16} className="text-violet-400" /></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-violet-300">{r.type === 'destinationrule' ? r.name : 'loan-service-dr'}</div>
                            <div className="text-xs text-gray-500">DestinationRule → Defines HOW traffic is handled (policies)</div>
                          </div>
                          {r.type === 'destinationrule' && <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">Current</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-800/50 rounded">
                          <strong className="text-gray-400">Key insight:</strong> VirtualService picks the destination host/subset; DestinationRule defines policies (LB, mTLS, circuit breaker) for that host. One DR per host is shared by all VirtualServices.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          })()}

          {/* Edit Resource Modal */}
          {editingResource && (() => {
            const r = editingResource;
            const typeConfig = {
              service: { icon: 'server', color: 'blue', label: 'Service', bgClass: 'bg-blue-500/20', textClass: 'text-blue-400', borderClass: 'border-blue-500/30' },
              virtualservice: { icon: 'git-branch', color: 'violet', label: 'Virtual Service', bgClass: 'bg-violet-500/20', textClass: 'text-violet-400', borderClass: 'border-violet-500/30' },
              ingress: { icon: 'log-in', color: 'cyan', label: 'Ingress Gateway', bgClass: 'bg-cyan-500/20', textClass: 'text-cyan-400', borderClass: 'border-cyan-500/30' },
              egress: { icon: 'log-out', color: 'orange', label: 'Egress Gateway', bgClass: 'bg-orange-500/20', textClass: 'text-orange-400', borderClass: 'border-orange-500/30' },
              eastwest: { icon: 'repeat', color: 'teal', label: 'East-West Gateway', bgClass: 'bg-teal-500/20', textClass: 'text-teal-400', borderClass: 'border-teal-500/30' },
              destinationrule: { icon: 'sliders', color: 'violet', label: 'Destination Rule', bgClass: 'bg-violet-500/20', textClass: 'text-violet-400', borderClass: 'border-violet-500/30' },
              authpolicy: { icon: 'shield', color: 'emerald', label: 'Authorization Policy', bgClass: 'bg-emerald-500/20', textClass: 'text-emerald-400', borderClass: 'border-emerald-500/30' },
              serviceentry: { icon: 'external-link', color: 'pink', label: 'Service Entry', bgClass: 'bg-pink-500/20', textClass: 'text-pink-400', borderClass: 'border-pink-500/30' }
            }[r.type] || { icon: 'box', color: 'gray', label: r.type, bgClass: 'bg-gray-500/20', textClass: 'text-gray-400', borderClass: 'border-gray-500/30' };

            const ToggleSwitch = ({ label, enabled, onChange, description }) => (
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  {description && <div className="text-xs text-gray-500">{description}</div>}
                </div>
                <button onClick={onChange} className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            );

            const SliderInput = ({ label, value, min, max, unit, onChange }) => (
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm text-amber-400 font-mono">{value}{unit}</span>
                </div>
                <input type="range" min={min} max={max} value={value} onChange={e => onChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>{min}{unit}</span><span>{max}{unit}</span></div>
              </div>
            );

            const TagEditor = ({ label, tags, onAdd, onRemove }) => {
              const [newTag, setNewTag] = React.useState('');
              return (
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm font-medium mb-2">{label}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-lg text-xs">
                        {tag}
                        <button onClick={() => onRemove(i)} className="hover:text-red-400"><Icon name="x" size={12} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add host..."
                      className="flex-1 bg-gray-900 border border-gray-600 rounded px-2 py-1 text-sm focus:border-amber-500 focus:outline-none" />
                    <button onClick={() => { if(newTag) { onAdd(newTag); setNewTag(''); }}} className="px-3 py-1 bg-amber-600 hover:bg-amber-500 rounded text-sm">Add</button>
                  </div>
                </div>
              );
            };

            return (
              <div className="fixed inset-0 z-[60] flex items-center justify-center">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingResource(null)} />
                <div className="relative w-[700px] max-h-[85vh] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className={`${typeConfig.bgClass} border-b ${typeConfig.borderClass} p-5`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeConfig.bgClass} ${typeConfig.textClass}`}>
                          <Icon name={typeConfig.icon} size={24} />
                        </div>
                        <div>
                          <div className="text-lg font-semibold">Edit {typeConfig.label}</div>
                          <div className="text-sm text-gray-400">{r.name}</div>
                        </div>
                      </div>
                      <button onClick={() => setEditingResource(null)} className="p-2 hover:bg-gray-800 rounded-lg"><Icon name="x" size={20} /></button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4">
                    {/* INGRESS Edit Form */}
                    {r.type === 'ingress' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Gateway Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                            <input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Port</label>
                            <input type="number" value={editFormData.port || 443} onChange={e => setEditFormData({...editFormData, port: parseInt(e.target.value)})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">TLS Mode</label>
                            <select value={editFormData.tls || 'SIMPLE'} onChange={e => setEditFormData({...editFormData, tls: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none">
                              <option value="SIMPLE">SIMPLE</option>
                              <option value="MUTUAL">MUTUAL (mTLS)</option>
                              <option value="PASSTHROUGH">PASSTHROUGH</option>
                              <option value="AUTO_PASSTHROUGH">AUTO_PASSTHROUGH</option>
                            </select>
                          </div>
                        </div>
                        <TagEditor label="Hosts" tags={editFormData.hosts || []}
                          onAdd={tag => setEditFormData({...editFormData, hosts: [...(editFormData.hosts || []), tag]})}
                          onRemove={i => setEditFormData({...editFormData, hosts: editFormData.hosts.filter((_, idx) => idx !== i)})} />
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-1 block">Min TLS Version</label>
                          <div className="flex gap-2">
                            {['TLSv1_2', 'TLSv1_3'].map(v => (
                              <button key={v} onClick={() => setEditFormData({...editFormData, minTls: v})}
                                className={`px-4 py-2 rounded-lg text-sm ${(editFormData.minTls || 'TLSv1_3') === v ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{v}</button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* EGRESS Edit Form */}
                    {r.type === 'egress' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Gateway Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Port</label>
                            <input type="number" value={editFormData.port || 443} onChange={e => setEditFormData({...editFormData, port: parseInt(e.target.value)})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-1 block">TLS Origination Mode</label>
                          <select value={editFormData.tls || 'ORIGINATE'} onChange={e => setEditFormData({...editFormData, tls: e.target.value})}
                            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                            <option value="ORIGINATE">ORIGINATE</option>
                            <option value="SIMPLE">SIMPLE</option>
                            <option value="MUTUAL">MUTUAL</option>
                          </select>
                        </div>
                        <TagEditor label="Allowed External Hosts" tags={editFormData.hosts || []}
                          onAdd={tag => setEditFormData({...editFormData, hosts: [...(editFormData.hosts || []), tag]})}
                          onRemove={i => setEditFormData({...editFormData, hosts: editFormData.hosts.filter((_, idx) => idx !== i)})} />
                        <ToggleSwitch label="Enable SNI Auto" enabled={editFormData.sniAuto !== false}
                          onChange={() => setEditFormData({...editFormData, sniAuto: !editFormData.sniAuto})}
                          description="Automatically set SNI from host header" />
                      </>
                    )}

                    {/* VIRTUAL SERVICE Edit Form */}
                    {r.type === 'virtualservice' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                            <input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Host</label>
                            <input type="text" value={editFormData.host || ''} onChange={e => setEditFormData({...editFormData, host: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Gateway</label>
                            <input type="text" value={editFormData.gateway || ''} onChange={e => setEditFormData({...editFormData, gateway: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-2 block">HTTP Match Rules</label>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded border border-gray-700">
                              <Icon name="git-branch" size={14} className="text-violet-400" />
                              <span className="text-sm flex-1">Path prefix: <span className="font-mono text-violet-300">/api/v1/*</span></span>
                              <span className="text-xs text-gray-500">→ {editFormData.name?.split('-')[0] || 'service'}:8080</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded border border-gray-700">
                              <Icon name="git-branch" size={14} className="text-violet-400" />
                              <span className="text-sm flex-1">Path prefix: <span className="font-mono text-violet-300">/api/v2/*</span></span>
                              <span className="text-xs text-gray-500">→ {editFormData.name?.split('-')[0] || 'service'}:8080</span>
                            </div>
                            <button className="w-full p-2 border border-dashed border-gray-600 rounded text-sm text-gray-400 hover:border-violet-500 hover:text-violet-400 flex items-center justify-center gap-2">
                              <Icon name="plus" size={14} />Add Route
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <SliderInput label="Request Timeout" value={editFormData.timeout || 30} min={1} max={120} unit="s"
                            onChange={v => setEditFormData({...editFormData, timeout: v})} />
                          <SliderInput label="Retry Attempts" value={editFormData.retries || 3} min={0} max={10} unit=""
                            onChange={v => setEditFormData({...editFormData, retries: v})} />
                        </div>
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-2 block">Retry Conditions</label>
                          <div className="flex flex-wrap gap-2">
                            {['5xx', 'reset', 'connect-failure', 'retriable-4xx', 'gateway-error'].map(c => (
                              <button key={c} onClick={() => {
                                const conditions = editFormData.retryOn || ['5xx', 'reset', 'connect-failure'];
                                setEditFormData({...editFormData, retryOn: conditions.includes(c) ? conditions.filter(x => x !== c) : [...conditions, c]});
                              }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${(editFormData.retryOn || ['5xx', 'reset', 'connect-failure']).includes(c) ? 'bg-violet-500/20 text-violet-300 border border-violet-500' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{c}</button>
                            ))}
                          </div>
                        </div>
                        <ToggleSwitch label="Enable Canary Deployment" enabled={editFormData.canary || false}
                          onChange={() => setEditFormData({...editFormData, canary: !editFormData.canary})}
                          description="Split traffic between versions" />
                        {editFormData.canary && (
                          <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <Icon name="git-merge" size={16} className="text-violet-400" />
                              <span className="text-sm font-medium">Traffic Split</span>
                            </div>
                            <SliderInput label="Canary (v2)" value={editFormData.canaryPercent || 10} min={1} max={50} unit="%"
                              onChange={v => setEditFormData({...editFormData, canaryPercent: v})} />
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <span className="text-gray-400">Stable (v1): <span className="text-emerald-400">{100 - (editFormData.canaryPercent || 10)}%</span></span>
                              <span className="text-gray-400">Canary (v2): <span className="text-amber-400">{editFormData.canaryPercent || 10}%</span></span>
                            </div>
                          </div>
                        )}
                        <ToggleSwitch label="Enable Fault Injection" enabled={editFormData.faultInjection || false}
                          onChange={() => setEditFormData({...editFormData, faultInjection: !editFormData.faultInjection})}
                          description="Inject delays or abort responses for testing" />
                      </>
                    )}

                    {/* DESTINATION RULE Edit Form */}
                    {r.type === 'destinationrule' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Host</label>
                            <input type="text" value={editFormData.host || ''} onChange={e => setEditFormData({...editFormData, host: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Load Balancer</label>
                            <select value={editFormData.trafficPolicy || 'ROUND_ROBIN'} onChange={e => setEditFormData({...editFormData, trafficPolicy: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none">
                              <option value="ROUND_ROBIN">ROUND_ROBIN</option>
                              <option value="LEAST_CONN">LEAST_CONN</option>
                              <option value="RANDOM">RANDOM</option>
                              <option value="PASSTHROUGH">PASSTHROUGH</option>
                            </select>
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">mTLS Mode</label>
                            <select value={editFormData.mtls || 'STRICT'} onChange={e => setEditFormData({...editFormData, mtls: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none">
                              <option value="STRICT">STRICT</option>
                              <option value="PERMISSIVE">PERMISSIVE</option>
                              <option value="DISABLE">DISABLE</option>
                            </select>
                          </div>
                        </div>
                        <ToggleSwitch label="Circuit Breaker" enabled={editFormData.circuitBreaker || false}
                          onChange={() => setEditFormData({...editFormData, circuitBreaker: !editFormData.circuitBreaker})}
                          description="Enable connection pool limits and outlier detection" />
                        {editFormData.circuitBreaker && (
                          <>
                            <SliderInput label="Max Connections" value={editFormData.maxConnections || 1000} min={100} max={10000} unit=""
                              onChange={v => setEditFormData({...editFormData, maxConnections: v})} />
                            <SliderInput label="Max Pending Requests" value={editFormData.maxPending || 100} min={10} max={1000} unit=""
                              onChange={v => setEditFormData({...editFormData, maxPending: v})} />
                            <SliderInput label="Consecutive 5xx for Ejection" value={editFormData.consecutive5xx || 5} min={1} max={20} unit=""
                              onChange={v => setEditFormData({...editFormData, consecutive5xx: v})} />
                          </>
                        )}
                        <ToggleSwitch label="Locality Load Balancing" enabled={editFormData.localityLb !== false}
                          onChange={() => setEditFormData({...editFormData, localityLb: !editFormData.localityLb})}
                          description="Prefer endpoints in the same region/zone" />
                      </>
                    )}

                    {/* AUTH POLICY Edit Form */}
                    {r.type === 'authpolicy' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Policy Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Action</label>
                            <div className="flex gap-2">
                              {['ALLOW', 'DENY'].map(a => (
                                <button key={a} onClick={() => setEditFormData({...editFormData, action: a})}
                                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${editFormData.action === a ? (a === 'ALLOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-red-500/20 text-red-300 border border-red-500') : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{a}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <TagEditor label="Source Principals" tags={editFormData.principals || []}
                          onAdd={tag => setEditFormData({...editFormData, principals: [...(editFormData.principals || []), tag]})}
                          onRemove={i => setEditFormData({...editFormData, principals: editFormData.principals.filter((_, idx) => idx !== i)})} />
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-2 block">Allowed Methods</label>
                          <div className="flex flex-wrap gap-2">
                            {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => (
                              <button key={m} onClick={() => {
                                const methods = editFormData.methods || ['GET', 'POST', 'PUT'];
                                setEditFormData({...editFormData, methods: methods.includes(m) ? methods.filter(x => x !== m) : [...methods, m]});
                              }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${(editFormData.methods || ['GET', 'POST', 'PUT']).includes(m) ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{m}</button>
                            ))}
                          </div>
                        </div>
                        <ToggleSwitch label="Require JWT" enabled={editFormData.requireJwt !== false}
                          onChange={() => setEditFormData({...editFormData, requireJwt: !editFormData.requireJwt})}
                          description="Require valid JWT token for requests" />
                        {editFormData.requireJwt !== false && (
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">JWT Issuer</label>
                            <input type="text" value={editFormData.jwtIssuer || 'https://auth.fanniemae.com'}
                              onChange={e => setEditFormData({...editFormData, jwtIssuer: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-emerald-500 focus:outline-none" />
                          </div>
                        )}
                      </>
                    )}

                    {/* SERVICE Edit Form with Tabs */}
                    {r.type === 'service' && (() => {
                      const svcWasm = editFormData.wasmPlugins || ['jwt-validator', 'rate-limiter', 'audit-logger'];
                      const svcLua = editFormData.luaFilters || ['custom-cors', 'path-rewriter', 'tenant-router'];
                      const svcEditTab = editFormData._tab || 'details';
                      const allFilters = [
                        ...svcWasm.map((n, i) => ({ name: n, type: 'wasm', pos: i + 1 })),
                        ...svcLua.map((n, i) => ({ name: n, type: 'lua', pos: i + 1 }))
                      ].sort((a, b) => a.pos - b.pos);
                      return (
                      <>
                        {/* Service Edit Tabs */}
                        <div className="flex gap-1 border-b border-gray-700 -mx-4 px-4 mb-4">
                          {[
                            { id: 'details', label: 'Details', icon: 'settings' },
                            { id: 'chain', label: 'Unified Chain', icon: 'layers', count: svcWasm.length },
                            ...(featureFlags.dadLua ? [{ id: 'lua', label: 'Lua Filters', icon: 'code', count: svcLua.length }] : []),
                            { id: 'wasm', label: 'WASM Plugins', icon: 'cpu', count: svcWasm.length },
                          ].map(tab => (
                            <button key={tab.id} onClick={() => setEditFormData({...editFormData, _tab: tab.id})}
                              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${svcEditTab === tab.id ? 'border-violet-500 text-violet-300' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                              <Icon name={tab.icon} size={14} />{tab.label}
                              {tab.count !== undefined && <span className={`px-1.5 py-0.5 rounded text-xs ${svcEditTab === tab.id ? 'bg-violet-500/30 text-violet-200' : 'bg-gray-700 text-gray-300'}`}>{tab.count}</span>}
                            </button>
                          ))}
                        </div>

                        {/* Details Tab */}
                        {svcEditTab === 'details' && <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                              <label className="text-xs text-gray-500 mb-1 block">Service Name</label>
                              <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                            </div>
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                              <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                              <input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                              <label className="text-xs text-gray-500 mb-1 block">Service Type</label>
                              <select value={editFormData.serviceType || 'ClusterIP'} onChange={e => setEditFormData({...editFormData, serviceType: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
                                <option value="ClusterIP">ClusterIP</option>
                                <option value="NodePort">NodePort</option>
                                <option value="LoadBalancer">LoadBalancer</option>
                              </select>
                            </div>
                            <div className="p-3 bg-gray-800/50 rounded-lg">
                              <label className="text-xs text-gray-500 mb-1 block">Port</label>
                              <input type="number" value={editFormData.port || 8080} onChange={e => setEditFormData({...editFormData, port: parseInt(e.target.value)})}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                            </div>
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-2 block">Selector Labels</label>
                            <div className="flex flex-wrap gap-2">
                              {(editFormData.selectorLabels || [{ key: 'app', value: editFormData.name || 'service' }]).map((label, idx) => (
                                <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                                  <span className="text-xs text-blue-300">{label.key}</span><span className="text-gray-500">=</span><span className="text-xs text-blue-200">{label.value}</span>
                                  <button onClick={() => {
                                    const labels = (editFormData.selectorLabels || []).filter((_, i) => i !== idx);
                                    setEditFormData({...editFormData, selectorLabels: labels.length ? labels : [{ key: 'app', value: 'service' }]});
                                  }} className="hover:text-red-400 ml-1"><Icon name="x" size={10} /></button>
                                </div>
                              ))}
                              <button className="px-2 py-1 border border-dashed border-gray-600 rounded-lg text-xs text-gray-400 hover:border-blue-500">+ Add</button>
                            </div>
                          </div>
                        </>}

                        {/* Unified Chain Tab */}
                        {svcEditTab === 'chain' && <>
                          <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-4 text-gray-300">
                              <Icon name="git-merge" size={16} className="text-violet-400" />
                              <span className="text-sm">Complete Filter Chain for <span className="text-violet-300 font-mono">{editFormData.host || `${editFormData.name}.${editFormData.namespace}.svc.cluster.local`}</span></span>
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                              {[...svcWasm.map((n, i) => ({ name: n, type: 'wasm', label: mockWasmPlugins.find(p => p.name === n)?.phase || 'Filter' })),
                                ...svcLua.map((n, i) => ({ name: n, type: 'lua', label: mockLuaFilterDefs.find(f => mockLuaFilters.find(lf => lf.name === n)?.filterDef === f.name)?.type || 'Script' }))
                              ].map((f, i, arr) => (
                                <React.Fragment key={f.name}>
                                  <div className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 ${f.type === 'wasm' ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-amber-500/10 border-amber-500/50'}`}>
                                    <div className={`text-sm font-medium ${f.type === 'wasm' ? 'text-cyan-300' : 'text-amber-300'}`}>{f.name}</div>
                                    <div className={`text-xs flex items-center gap-1 ${f.type === 'wasm' ? 'text-cyan-500' : 'text-amber-500'}`}>
                                      <Icon name={f.type === 'wasm' ? 'cpu' : 'code'} size={10} />{f.label}
                                    </div>
                                  </div>
                                  {i < arr.length - 1 && <Icon name="chevron-right" size={16} className="text-gray-600 flex-shrink-0" />}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-3 text-cyan-400"><Icon name="cpu" size={16} /><span className="font-medium">WASM Plugins ({svcWasm.length})</span></div>
                            <div className="space-y-2">
                              {svcWasm.map((p, i) => (
                                <div key={p} className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                                  <span className="text-sm text-gray-200">{p}</span>
                                  <span className="text-xs text-gray-500">Position {i + 1}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>}

                        {/* Lua Filters Tab */}
                        {featureFlags.dadLua && svcEditTab === 'lua' && <>
                          <div className="space-y-2">
                            {svcLua.map((f, idx) => (
                              <div key={f} className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                <Icon name="code" size={16} className="text-amber-400" />
                                <span className="text-sm text-amber-300 flex-1">{f}</span>
                                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded">Position {idx + 1}</span>
                                <button onClick={() => setEditFormData({...editFormData, luaFilters: svcLua.filter((_, i) => i !== idx)})}
                                  className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                              </div>
                            ))}
                            <select onChange={e => {
                              if (e.target.value) setEditFormData({...editFormData, luaFilters: [...svcLua, e.target.value]});
                              e.target.value = '';
                            }} className="w-full bg-gray-900 border border-dashed border-amber-500/30 rounded-lg px-3 py-3 text-sm text-gray-400 focus:border-amber-500 focus:outline-none">
                              <option value="">+ Attach Lua Filter...</option>
                              {mockLuaFilters.filter(f => f.enabled && !svcLua.includes(f.name)).map(f => (
                                <option key={f.name} value={f.name}>{f.name}</option>
                              ))}
                            </select>
                          </div>
                        </>}

                        {/* WASM Plugins Tab */}
                        {svcEditTab === 'wasm' && <>
                          <div className="space-y-2">
                            {svcWasm.map((p, idx) => (
                              <div key={p} className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                <Icon name="cpu" size={16} className="text-cyan-400" />
                                <span className="text-sm text-cyan-300 flex-1">{p}</span>
                                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded">Position {idx + 1}</span>
                                <button onClick={() => setEditFormData({...editFormData, wasmPlugins: svcWasm.filter((_, i) => i !== idx)})}
                                  className="p-1 hover:bg-red-500/20 rounded"><Icon name="x" size={14} className="text-red-400" /></button>
                              </div>
                            ))}
                            <select onChange={e => {
                              if (e.target.value) setEditFormData({...editFormData, wasmPlugins: [...svcWasm, e.target.value]});
                              e.target.value = '';
                            }} className="w-full bg-gray-900 border border-dashed border-cyan-500/30 rounded-lg px-3 py-3 text-sm text-gray-400 focus:border-cyan-500 focus:outline-none">
                              <option value="">+ Attach WASM Plugin...</option>
                              {mockWasmPlugins.filter(p => p.enabled && !svcWasm.includes(p.name)).map(p => (
                                <option key={p.name} value={p.name}>{p.name} ({p.module})</option>
                              ))}
                            </select>
                          </div>
                        </>}
                      </>
                    );})()}

                    {/* SERVICE ENTRY Edit Form */}
                    {r.type === 'serviceentry' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Entry Name</label>
                            <input type="text" value={editFormData.name || ''} onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-pink-500 focus:outline-none" />
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                            <input type="text" value={editFormData.namespace || ''} onChange={e => setEditFormData({...editFormData, namespace: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-pink-500 focus:outline-none" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Location</label>
                            <select value={editFormData.location || 'MESH_EXTERNAL'} onChange={e => setEditFormData({...editFormData, location: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-pink-500 focus:outline-none">
                              <option value="MESH_EXTERNAL">MESH_EXTERNAL</option>
                              <option value="MESH_INTERNAL">MESH_INTERNAL</option>
                            </select>
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <label className="text-xs text-gray-500 mb-1 block">Resolution</label>
                            <select value={editFormData.resolution || 'DNS'} onChange={e => setEditFormData({...editFormData, resolution: e.target.value})}
                              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-pink-500 focus:outline-none">
                              <option value="DNS">DNS</option>
                              <option value="STATIC">STATIC</option>
                              <option value="NONE">NONE</option>
                            </select>
                          </div>
                        </div>
                        <TagEditor label="Hosts" tags={editFormData.hosts || []}
                          onAdd={tag => setEditFormData({...editFormData, hosts: [...(editFormData.hosts || []), tag]})}
                          onRemove={i => setEditFormData({...editFormData, hosts: editFormData.hosts.filter((_, idx) => idx !== i)})} />
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <label className="text-xs text-gray-500 mb-2 block">Ports</label>
                          <div className="space-y-2">
                            {(editFormData.ports || r.ports || []).map((port, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-gray-900/50 rounded border border-gray-700">
                                <span className="text-sm text-gray-300">Port {port.number}</span>
                                <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded">{port.protocol}</span>
                                <button onClick={() => {
                                  const ports = [...(editFormData.ports || r.ports || [])];
                                  ports.splice(i, 1);
                                  setEditFormData({...editFormData, ports});
                                }} className="ml-auto text-gray-500 hover:text-red-400"><Icon name="x" size={14} /></button>
                              </div>
                            ))}
                            <button className="w-full p-2 border border-dashed border-gray-600 rounded text-sm text-gray-400 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center gap-2">
                              <Icon name="plus" size={14} />Add Port
                            </button>
                          </div>
                        </div>
                        {(editFormData.resolution === 'STATIC' || r.resolution === 'STATIC') && (
                          <TagEditor label="Static Endpoints" tags={editFormData.endpoints || r.endpoints || []}
                            onAdd={tag => setEditFormData({...editFormData, endpoints: [...(editFormData.endpoints || r.endpoints || []), tag]})}
                            onRemove={i => setEditFormData({...editFormData, endpoints: (editFormData.endpoints || r.endpoints || []).filter((_, idx) => idx !== i)})} />
                        )}
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-700 p-5 bg-gray-800/30 flex items-center justify-between">
                    <button onClick={() => setEditingResource(null)} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">Cancel</button>
                    <div className="flex gap-2">
                      <button onClick={() => { showNotification(`Validating ${r.name} configuration...`); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                        <Icon name="check-circle" size={16} />Validate
                      </button>
                      <button onClick={() => { showNotification(`${r.name} updated successfully!`, 'success'); setEditingResource(null); setSelectedService(null); }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg flex items-center gap-2 font-medium">
                        <Icon name="save" size={16} />Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Edit WASM Plugin Modal */}
          {editingWasmPlugin && (() => {
            const p = editingWasmPlugin;
            const filterChain = [
              { name: 'jwt_authn', label: 'AuthN', color: 'emerald', active: p.phase === 'AUTHN' },
              { name: 'ext_authz', label: 'AuthZ', color: 'teal', active: p.phase === 'AUTHZ' },
              { name: 'rbac', label: 'AuthZ', color: 'teal', active: false },
              { name: p.module, label: 'Your Filter', color: 'violet', active: true, highlight: true },
              { name: 'router', label: 'Terminal', color: 'gray', active: false }
            ];
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingWasmPlugin(null)} />
                <div className="relative w-[700px] max-h-[85vh] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                  {/* Header */}
                  <div className="bg-cyan-500/10 border-b border-cyan-500/30 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                          <Icon name="settings" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-cyan-300">Edit Config: {p.name}</h2>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Uses filter:</span>
                            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-xs font-medium">{p.module}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">Target:</span>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs font-medium">{p.targetGateway}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setEditingWasmPlugin(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                        <Icon name="x" size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Filter Chain Position */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <Icon name="git-branch" size={16} className="text-violet-400" />
                        <span>Filter Chain Position for {p.targetGateway}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        {filterChain.map((f, i) => (
                          <React.Fragment key={i}>
                            <div className={`px-4 py-3 rounded-lg border-2 text-center min-w-[100px] ${f.highlight ? 'bg-violet-500/20 border-violet-500 text-violet-300' : f.active ? `bg-${f.color}-500/10 border-${f.color}-500/30 text-${f.color}-300` : 'bg-gray-800 border-gray-600 text-gray-400'}`}>
                              <div className="font-mono text-sm">{f.name}</div>
                              <div className="text-xs mt-1 opacity-70">{f.label}</div>
                            </div>
                            {i < filterChain.length - 1 && (
                              <Icon name="chevron-right" size={20} className="text-gray-600 flex-shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Configuration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Plugin Name</label>
                        <input type="text" defaultValue={p.name} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Namespace</label>
                        <input type="text" defaultValue={p.namespace} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phase</label>
                        <select defaultValue={p.phase} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500">
                          <option value="AUTHN">AUTHN</option>
                          <option value="AUTHZ">AUTHZ</option>
                          <option value="STATS">STATS</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                        <input type="number" defaultValue={p.priority} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500" />
                      </div>
                    </div>

                    {/* Image Source */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Image Source ({p.sourceType})</label>
                      <input type="text" defaultValue={p.image} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono text-xs focus:outline-none focus:border-cyan-500" />
                    </div>

                    {/* Plugin Config */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Plugin Configuration</label>
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 font-mono text-xs">
                        <pre className="text-cyan-300 whitespace-pre-wrap">{JSON.stringify(p.config, null, 2)}</pre>
                      </div>
                    </div>

                    {/* Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Workload Selector</label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(p.selector?.matchLabels || {}).map(([k, v], i) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm">
                            <span className="text-gray-400">{k}:</span> <span className="text-cyan-300">{v}</span>
                          </span>
                        ))}
                        <button className="px-3 py-1.5 bg-gray-800 border border-dashed border-gray-600 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:border-gray-500">
                          + Add Label
                        </button>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-4">
                      {Object.entries(p.metrics || {}).map(([k, v], i) => (
                        <div key={i} className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-gray-200">{v}</div>
                          <div className="text-xs text-gray-500 capitalize">{k}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-700 p-4 bg-gray-800/50 flex items-center justify-between">
                    <button onClick={() => setEditingWasmPlugin(null)} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">Cancel</button>
                    <div className="flex gap-2">
                      <button onClick={() => showNotification(`Validating ${p.name}...`)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                        <Icon name="check-circle" size={16} />Validate
                      </button>
                      <button onClick={() => { showNotification(`${p.name} updated successfully!`, 'success'); setEditingWasmPlugin(null); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-2 font-medium">
                        <Icon name="save" size={16} />Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Edit Virtual Service Modal */}
          {editingVirtualService && (() => {
            const vs = editingVirtualService;
            const luaFilters = [
              { name: 'custom-cors', label: 'CORS', color: 'amber', position: 1 },
              { name: 'path-rewriter', label: 'Rewrite', color: 'amber', position: 2 },
              { name: 'tenant-router', label: 'Router', color: 'amber', position: 4 }
            ];
            const wasmFilters = [
              { name: 'jwt-validator', label: 'AuthN', color: 'emerald', position: 1 },
              { name: 'rate-limiter', label: 'Rate Limit', color: 'cyan', position: 2 },
              { name: 'audit-logger', label: 'Audit', color: 'pink', position: 5 }
            ];
            const unifiedChain = [
              { name: 'jwt-validator', label: 'AuthN', type: 'wasm', color: 'emerald' },
              { name: 'rate-limiter', label: 'Rate Limit', type: 'wasm', color: 'cyan' },
              { name: 'custom-cors', label: 'CORS', type: 'lua', color: 'amber' },
              { name: 'path-rewriter', label: 'Rewrite', type: 'lua', color: 'amber' },
              { name: 'tenant-router', label: 'Router', type: 'lua', color: 'amber' },
              { name: 'audit-logger', label: 'Audit', type: 'wasm', color: 'pink' },
              { name: 'router', label: 'Terminal', type: 'envoy', color: 'gray' }
            ];
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingVirtualService(null)} />
                <div className="relative w-[800px] max-h-[90vh] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                  {/* Header */}
                  <div className="bg-violet-500/10 border-b border-violet-500/30 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/20 text-violet-400">
                          <Icon name="git-branch" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-violet-300">Filter Chain: {vs.name}</h2>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="text-gray-400">Host:</span>
                            <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded text-xs font-medium">{vs.host}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">Gateway:</span>
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs font-medium">{vs.gateway}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setEditingVirtualService(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                        <Icon name="x" size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-gray-700">
                    {[
                      { id: 'details', label: 'Details', icon: 'settings' },
                      { id: 'unified', label: 'Unified Chain', icon: 'layers', count: unifiedChain.length - 1 },
                      ...(featureFlags.dadLua ? [{ id: 'lua', label: 'Lua Filters', icon: 'code', count: luaFilters.length }] : []),
                      { id: 'wasm', label: 'WASM Plugins', icon: 'cpu', count: wasmFilters.length }
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setVsFilterTab(tab.id)} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${vsFilterTab === tab.id ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-500/5' : 'text-gray-400 hover:text-gray-200'}`}>
                        <Icon name={tab.icon} size={16} />
                        {tab.label}
                        {tab.count !== undefined && <span className={`px-1.5 py-0.5 rounded text-xs ${vsFilterTab === tab.id ? 'bg-violet-500/20 text-violet-300' : 'bg-gray-700 text-gray-400'}`}>{tab.count}</span>}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-auto p-6 space-y-6">
                    {/* Details Tab */}
                    {vsFilterTab === 'details' && (
                      <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Icon name="info" size={16} className="text-violet-400" />
                            <span className="text-sm font-medium text-gray-300">Basic Information</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Name</label>
                              <input type="text" defaultValue={vs.name} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                              <input type="text" defaultValue={vs.namespace} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Host</label>
                              <input type="text" defaultValue={vs.host} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none" />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 mb-1 block">Gateway</label>
                              <input type="text" defaultValue={vs.gateway} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none" />
                            </div>
                          </div>
                        </div>

                        {/* Routing */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Icon name="git-branch" size={16} className="text-cyan-400" />
                              <span className="text-sm font-medium text-gray-300">Routes</span>
                              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-xs">{vs.routes || 3}</span>
                            </div>
                            <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                              <Icon name="plus" size={12} />Add Route
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-500">1</span>
                                <code className="text-sm text-cyan-300">/api/*</code>
                                <Icon name="arrow-right" size={14} className="text-gray-600" />
                                <span className="text-sm text-gray-300">api-service:8080</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button className="p-1 hover:bg-gray-700 rounded text-gray-500 hover:text-white"><Icon name="edit" size={12} /></button>
                                <button className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400"><Icon name="trash-2" size={12} /></button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-500">2</span>
                                <code className="text-sm text-cyan-300">/auth/*</code>
                                <Icon name="arrow-right" size={14} className="text-gray-600" />
                                <span className="text-sm text-gray-300">auth-service:8080</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button className="p-1 hover:bg-gray-700 rounded text-gray-500 hover:text-white"><Icon name="edit" size={12} /></button>
                                <button className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400"><Icon name="trash-2" size={12} /></button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-500">3</span>
                                <code className="text-sm text-cyan-300">/*</code>
                                <Icon name="arrow-right" size={14} className="text-gray-600" />
                                <span className="text-sm text-gray-300">frontend:80</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button className="p-1 hover:bg-gray-700 rounded text-gray-500 hover:text-white"><Icon name="edit" size={12} /></button>
                                <button className="p-1 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400"><Icon name="trash-2" size={12} /></button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Icon name="tag" size={16} className="text-amber-400" />
                            <span className="text-sm font-medium text-gray-300">Labels & Annotations</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-500 mb-2 block">Labels</label>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <input type="text" defaultValue="app" className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 focus:border-violet-500 focus:outline-none" />
                                  <span className="text-gray-600">=</span>
                                  <input type="text" defaultValue={vs.name} className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 focus:border-violet-500 focus:outline-none" />
                                  <button className="p-1 text-gray-500 hover:text-red-400"><Icon name="x" size={14} /></button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="text" defaultValue="version" className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 focus:border-violet-500 focus:outline-none" />
                                  <span className="text-gray-600">=</span>
                                  <input type="text" defaultValue="v1" className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-700 rounded text-sm text-gray-300 focus:border-violet-500 focus:outline-none" />
                                  <button className="p-1 text-gray-500 hover:text-red-400"><Icon name="x" size={14} /></button>
                                </div>
                                <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 mt-1">
                                  <Icon name="plus" size={12} />Add Label
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 mb-2 block">Owner</label>
                              <input type="text" defaultValue={vs.owner || 'platform-team'} className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:outline-none" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Unified Tab */}
                    {vsFilterTab === 'unified' && (
                      <>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                            <Icon name="git-branch" size={16} className="text-violet-400" />
                            <span>Complete Filter Chain for {vs.host}</span>
                          </div>
                          <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {unifiedChain.map((f, i) => (
                              <React.Fragment key={i}>
                                <div className={`px-3 py-2 rounded-lg border-2 text-center min-w-[90px] flex-shrink-0 ${f.type === 'envoy' ? 'bg-gray-800 border-gray-600 text-gray-400' : `bg-${f.color}-500/20 border-${f.color}-500/50 text-${f.color}-300`}`}>
                                  <div className="font-mono text-xs">{f.name}</div>
                                  <div className="text-[10px] mt-1 opacity-70 flex items-center justify-center gap-1">
                                    {f.type === 'lua' && <Icon name="code" size={10} />}
                                    {f.type === 'wasm' && <Icon name="cpu" size={10} />}
                                    {f.label}
                                  </div>
                                </div>
                                {i < unifiedChain.length - 1 && (
                                  <Icon name="chevron-right" size={16} className="text-gray-600 flex-shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3"><Icon name="cpu" size={16} />WASM Plugins ({wasmFilters.length})</div>
                            {wasmFilters.map((f, i) => (
                              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
                                <span className="text-sm text-gray-300">{f.name}</span>
                                <span className="text-xs text-gray-500">Position {f.position}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Lua Tab */}
                    {featureFlags.dadLua && vsFilterTab === 'lua' && (
                      <>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                            <Icon name="code" size={16} className="text-amber-400" />
                            <span>Lua Filter Chain</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {luaFilters.map((f, i) => (
                              <React.Fragment key={i}>
                                <div className="px-4 py-3 rounded-lg border-2 bg-amber-500/20 border-amber-500/50 text-amber-300 text-center min-w-[100px]">
                                  <div className="font-mono text-sm">{f.name}</div>
                                  <div className="text-xs mt-1 opacity-70">{f.label}</div>
                                </div>
                                {i < luaFilters.length - 1 && <Icon name="chevron-right" size={20} className="text-gray-600" />}
                              </React.Fragment>
                            ))}
                            <Icon name="chevron-right" size={20} className="text-gray-600" />
                            <div className="px-4 py-3 rounded-lg border-2 bg-gray-800 border-gray-600 text-gray-400 text-center min-w-[100px]">
                              <div className="font-mono text-sm">router</div>
                              <div className="text-xs mt-1 opacity-70">Terminal</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {luaFilters.map((f, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/20 text-amber-400"><Icon name="code" size={16} /></div>
                                  <div>
                                    <div className="font-medium text-amber-300">{f.name}</div>
                                    <div className="text-xs text-gray-500">Position {f.position} • Lua Script</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="p-1.5 hover:bg-amber-500/20 rounded text-gray-400 hover:text-amber-400"><Icon name="edit" size={14} /></button>
                                  <button className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400"><Icon name="trash-2" size={14} /></button>
                                </div>
                              </div>
                              <div className="bg-gray-900 rounded p-3 font-mono text-xs text-gray-400 max-h-20 overflow-auto">
                                function envoy_on_request(handle)<br/>  -- {f.label} logic<br/>end
                              </div>
                            </div>
                          ))}
                          <button className="w-full p-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-500 hover:text-amber-400 hover:border-amber-500/50 flex items-center justify-center gap-2">
                            <Icon name="plus" size={16} />Add Lua Filter
                          </button>
                        </div>
                      </>
                    )}

                    {/* WASM Tab */}
                    {vsFilterTab === 'wasm' && (
                      <>
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                            <Icon name="cpu" size={16} className="text-cyan-400" />
                            <span>WASM Plugin Chain</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {wasmFilters.map((f, i) => (
                              <React.Fragment key={i}>
                                <div className={`px-4 py-3 rounded-lg border-2 bg-${f.color}-500/20 border-${f.color}-500/50 text-${f.color}-300 text-center min-w-[100px]`}>
                                  <div className="font-mono text-sm">{f.name}</div>
                                  <div className="text-xs mt-1 opacity-70">{f.label}</div>
                                </div>
                                {i < wasmFilters.length - 1 && <Icon name="chevron-right" size={20} className="text-gray-600" />}
                              </React.Fragment>
                            ))}
                            <Icon name="chevron-right" size={20} className="text-gray-600" />
                            <div className="px-4 py-3 rounded-lg border-2 bg-gray-800 border-gray-600 text-gray-400 text-center min-w-[100px]">
                              <div className="font-mono text-sm">router</div>
                              <div className="text-xs mt-1 opacity-70">Terminal</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {wasmFilters.map((f, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${f.color}-500/20 text-${f.color}-400`}><Icon name="cpu" size={16} /></div>
                                  <div>
                                    <div className={`font-medium text-${f.color}-300`}>{f.name}</div>
                                    <div className="text-xs text-gray-500">Position {f.position} • OCI Image</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded text-xs bg-${f.color}-500/20 text-${f.color}-300`}>{f.label}</span>
                                  <button className="p-1.5 hover:bg-cyan-500/20 rounded text-gray-400 hover:text-cyan-400"><Icon name="edit" size={14} /></button>
                                  <button className="p-1.5 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400"><Icon name="trash-2" size={14} /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button className="w-full p-3 border-2 border-dashed border-gray-700 rounded-lg text-gray-500 hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center gap-2">
                            <Icon name="plus" size={16} />Add WASM Plugin
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-700 p-4 bg-gray-800/50 flex items-center justify-between">
                    <button onClick={() => setEditingVirtualService(null)} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">Cancel</button>
                    <div className="flex gap-2">
                      <button onClick={() => showNotification(`Validating filter chain...`)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                        <Icon name="check-circle" size={16} />Validate Chain
                      </button>
                      <button onClick={() => { showNotification(`Filter chain for ${vs.name} updated successfully!`, 'success'); setEditingVirtualService(null); }} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-2 font-medium">
                        <Icon name="save" size={16} />Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Create Resource Modal */}
          {creatingResource && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setCreatingResource(false)} />
              <div className="relative w-[600px] max-h-[80vh] bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-amber-500/10 border-b border-amber-500/30 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/20 text-amber-400">
                        <Icon name="plus" size={24} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Create New Resource</h2>
                        <p className="text-sm text-gray-400">Add a new Istio/Service Mesh resource</p>
                      </div>
                    </div>
                    <button onClick={() => setCreatingResource(false)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white">
                      <Icon name="x" size={20} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                  {/* Resource Type Selector */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Resource Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { type: 'service', label: 'Service', icon: 'server', activeClass: 'bg-blue-500/20 border-blue-500 text-blue-300' },
                        { type: 'virtualservice', label: 'Virtual Service', icon: 'git-branch', activeClass: 'bg-violet-500/20 border-violet-500 text-violet-300' },
                        { type: 'ingress', label: 'Ingress', icon: 'log-in', activeClass: 'bg-cyan-500/20 border-cyan-500 text-cyan-300' },
                        { type: 'egress', label: 'Egress', icon: 'log-out', activeClass: 'bg-orange-500/20 border-orange-500 text-orange-300' },
                        { type: 'eastwest', label: 'East-West', icon: 'repeat', activeClass: 'bg-teal-500/20 border-teal-500 text-teal-300' },
                        { type: 'destinationrule', label: 'Dest Rule', icon: 'sliders', activeClass: 'bg-violet-500/20 border-violet-500 text-violet-300' },
                      ].map(t => (
                        <button key={t.type} onClick={() => setNewResourceType(t.type)}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${newResourceType === t.type ? t.activeClass : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                          <Icon name={t.icon} size={16} />
                          <span className="text-sm font-medium">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <label className="text-xs text-gray-500 mb-1 block">Name</label>
                      <input type="text" value={newResourceData.name} onChange={e => setNewResourceData({...newResourceData, name: e.target.value})}
                        placeholder={newResourceType === 'service' ? 'my-service' : newResourceType === 'virtualservice' ? 'my-virtualservice' : newResourceType + '-gateway'}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-amber-500 focus:outline-none" />
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <label className="text-xs text-gray-500 mb-1 block">Namespace</label>
                      <select value={newResourceData.namespace} onChange={e => setNewResourceData({...newResourceData, namespace: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-amber-500 focus:outline-none">
                        <option value="default">default</option>
                        <option value="istio-system">istio-system</option>
                        <option value="lending">lending</option>
                        <option value="payments">payments</option>
                        <option value="accounts">accounts</option>
                      </select>
                    </div>
                  </div>

                  {/* Type-specific options */}
                  {newResourceType === 'service' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Port</label>
                        <input type="number" value={newResourceData.port || 8080} onChange={e => setNewResourceData({...newResourceData, port: e.target.value})}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Protocol</label>
                        <div className="flex gap-2">
                          {['HTTP', 'HTTPS', 'gRPC', 'TCP'].map(p => (
                            <button key={p} onClick={() => setNewResourceData({...newResourceData, protocol: p})}
                              className={`px-3 py-1.5 rounded text-sm ${newResourceData.protocol === p ? 'bg-blue-500/20 text-blue-300 border border-blue-500' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {newResourceType === 'virtualservice' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Target Service</label>
                        <input type="text" value={newResourceData.targetService || ''} onChange={e => setNewResourceData({...newResourceData, targetService: e.target.value})}
                          placeholder="my-service.default.svc.cluster.local"
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Route Prefix</label>
                        <input type="text" value={newResourceData.prefix || '/'} onChange={e => setNewResourceData({...newResourceData, prefix: e.target.value})}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {(newResourceType === 'ingress' || newResourceType === 'egress' || newResourceType === 'eastwest') && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">{newResourceType === 'ingress' ? 'External Hosts' : newResourceType === 'eastwest' ? 'Internal Service Hosts' : 'External Services'}</label>
                        <input type="text" value={newResourceData.hosts || ''} onChange={e => setNewResourceData({...newResourceData, hosts: e.target.value})}
                          placeholder={newResourceType === 'ingress' ? 'api.example.com, *.example.com' : newResourceType === 'eastwest' ? '*.namespace.svc.cluster.local' : 'external-api.com'}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-cyan-500 focus:outline-none" />
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Port</label>
                        <div className="flex gap-2">
                          {['80', '443', '8080'].map(p => (
                            <button key={p} onClick={() => setNewResourceData({...newResourceData, gwPort: p})}
                              className={`px-3 py-1.5 rounded text-sm ${newResourceData.gwPort === p ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500' : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {newResourceType === 'destinationrule' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Target Host</label>
                        <input type="text" value={newResourceData.host || ''} onChange={e => setNewResourceData({...newResourceData, host: e.target.value})}
                          placeholder="my-service.default.svc.cluster.local"
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Load Balancer</label>
                        <select value={newResourceData.lb || 'ROUND_ROBIN'} onChange={e => setNewResourceData({...newResourceData, lb: e.target.value})}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none">
                          <option value="ROUND_ROBIN">ROUND_ROBIN</option>
                          <option value="LEAST_CONN">LEAST_CONN</option>
                          <option value="RANDOM">RANDOM</option>
                          <option value="PASSTHROUGH">PASSTHROUGH</option>
                        </select>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">TLS Mode</label>
                        <select value={newResourceData.tlsMode || 'DISABLE'} onChange={e => setNewResourceData({...newResourceData, tlsMode: e.target.value})}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm focus:border-violet-500 focus:outline-none">
                          <option value="DISABLE">DISABLE</option>
                          <option value="SIMPLE">SIMPLE</option>
                          <option value="MUTUAL">MUTUAL (mTLS)</option>
                          <option value="ISTIO_MUTUAL">ISTIO_MUTUAL</option>
                        </select>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-2 block">Connection Pool</label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Max Connections</label>
                            <input type="number" value={newResourceData.maxConnections || ''} onChange={e => setNewResourceData({...newResourceData, maxConnections: e.target.value})}
                              placeholder="100" className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Connect Timeout</label>
                            <input type="text" value={newResourceData.connectTimeout || ''} onChange={e => setNewResourceData({...newResourceData, connectTimeout: e.target.value})}
                              placeholder="10s" className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-2 block">Outlier Detection</label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Consecutive Errors</label>
                            <input type="number" value={newResourceData.consecutiveErrors || ''} onChange={e => setNewResourceData({...newResourceData, consecutiveErrors: e.target.value})}
                              placeholder="5" className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block mb-1">Ejection Time</label>
                            <input type="text" value={newResourceData.ejectionTime || ''} onChange={e => setNewResourceData({...newResourceData, ejectionTime: e.target.value})}
                              placeholder="30s" className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1.5 text-sm focus:border-violet-500 focus:outline-none" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Subsets (one per line: name=selector)</label>
                        <textarea value={newResourceData.subsets || ''} onChange={e => setNewResourceData({...newResourceData, subsets: e.target.value})}
                          placeholder="v1=version:v1&#10;v2=version:v2"
                          rows={3}
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-violet-500 focus:outline-none" />
                      </div>
                    </div>
                  )}

                  {newResourceType === 'authpolicy' && (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Destination (Target Workload)</label>
                        <input type="text" value={newResourceData.destination || ''} onChange={e => setNewResourceData({...newResourceData, destination: e.target.value})}
                          placeholder="app=my-service or version=v1"
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-emerald-500 focus:outline-none" />
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Action</label>
                        <div className="flex gap-2">
                          {['ALLOW', 'DENY'].map(a => (
                            <button key={a} onClick={() => setNewResourceData({...newResourceData, action: a})}
                              className={`flex-1 px-4 py-2 rounded text-sm font-medium ${newResourceData.action === a ? (a === 'ALLOW' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-red-500/20 text-red-300 border border-red-500') : 'bg-gray-800 text-gray-400 border border-gray-600'}`}>{a}</button>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <label className="text-xs text-gray-500 mb-1 block">Source Principals</label>
                        <input type="text" value={newResourceData.principals || ''} onChange={e => setNewResourceData({...newResourceData, principals: e.target.value})}
                          placeholder="cluster.local/ns/default/sa/*"
                          className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm font-mono focus:border-emerald-500 focus:outline-none" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-700 p-4 flex items-center justify-between bg-gray-900/80">
                  <button onClick={() => setCreatingResource(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                  <button onClick={() => {
                    const typeLabels = { service: 'Service', virtualservice: 'Virtual Service', ingress: 'Ingress Gateway', egress: 'Egress Gateway', eastwest: 'East-West Gateway', destinationrule: 'Destination Rule', authpolicy: 'Authorization Policy' };
                    showNotification(`Created ${typeLabels[newResourceType]}: ${newResourceData.name || 'new-resource'}`, 'success');
                    setCreatingResource(false);
                  }} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Icon name="plus" size={16} />Create Resource
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      );
      };

      // A.U.N.T.I.E. VIEW (Messaging)
      const AUNTIEView = () => (
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Monthly Spend</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1"><Icon name="trending-down" size={12} />{platformCosts.auntie.trend}</span>
              </div>
              <div className="text-2xl font-semibold text-emerald-300">${platformCosts.auntie.total.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">SNS + SQS + EventBridge + Kafka</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Event Sources</span>
                <Icon name="radio" size={14} className="text-pink-400" />
              </div>
              <div className="text-2xl font-semibold text-pink-300">{mockMessaging.length}</div>
              <div className="text-xs text-gray-500 mt-1">{mockMessaging.filter(m => m.type === 'sns').length} SNS, {mockMessaging.filter(m => m.type === 'sqs').length} SQS, {mockMessaging.filter(m => m.type === 'kafka').length} Kafka</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Messages/Day</span>
                <Icon name="trending-up" size={14} className="text-cyan-400" />
              </div>
              <div className="text-2xl font-semibold text-cyan-300">2.4M</div>
              <div className="text-xs text-gray-500 mt-1">+12% from last week</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Dead Letter Queue</span>
                <Icon name="inbox" size={14} className="text-amber-400" />
              </div>
              <div className="text-2xl font-semibold text-amber-300">247</div>
              <div className="text-xs text-gray-500 mt-1">3 queues with messages</div>
            </div>
          </div>
          {/* Filter Tabs with Counts */}
          <div className="flex gap-2 mb-4 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
            {[
              { id: 'All', count: mockMessaging.length },
              { id: 'SNS', count: mockMessaging.filter(m => m.type === 'sns').length },
              { id: 'SQS', count: mockMessaging.filter(m => m.type === 'sqs').length },
              { id: 'EventBridge', count: mockMessaging.filter(m => m.type === 'eventbridge').length },
              { id: 'Kafka', count: mockMessaging.filter(m => m.type === 'kafka').length }
            ].map(cat => (
              <button key={cat.id} onClick={() => setAuntieFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${auntieFilter === cat.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                {cat.id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${auntieFilter === cat.id ? 'bg-emerald-500/30 text-emerald-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
              </button>
            ))}
            <div className="border-l border-gray-600 mx-2" />
            {[
              { id: 'Local', count: mockMessaging.filter(m => m.zone === 'local').length, activeClass: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30', countClass: 'bg-cyan-500/30 text-cyan-200' },
              { id: 'Enterprise', count: mockMessaging.filter(m => m.zone === 'central').length, activeClass: 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30', countClass: 'bg-fuchsia-500/30 text-fuchsia-200' }
            ].map(cat => (
              <button key={cat.id} onClick={() => setAuntieFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${auntieFilter === cat.id ? cat.activeClass : 'text-gray-400 hover:bg-gray-800'}`}>
                {cat.id}
                <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${auntieFilter === cat.id ? cat.countClass : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Zone</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Metrics</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Messages/Day</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr></thead>
              <tbody>
                {mockMessaging.filter(m => {
                  if (auntieFilter === 'All') return true;
                  if (auntieFilter === 'Local') return m.zone === 'local';
                  if (auntieFilter === 'Enterprise') return m.zone === 'central';
                  return m.type.toLowerCase() === auntieFilter.toLowerCase();
                }).map(m => (
                  <tr key={m.id} onClick={() => setSelectedMessaging(m)} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                    <td className="px-4 py-3"><div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.type === 'sns' ? 'bg-pink-500/20 text-pink-400' : m.type === 'sqs' ? 'bg-cyan-500/20 text-cyan-400' : m.type === 'eventbridge' ? 'bg-violet-500/20 text-violet-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        <Icon name={m.type === 'sns' ? 'radio' : m.type === 'sqs' ? 'mail' : m.type === 'eventbridge' ? 'zap' : 'activity'} size={16} />
                      </div>
                      <div><div className="font-medium">{m.name}</div><div className="text-xs text-gray-500">{m.owner}</div></div>
                    </div></td>
                    <td className="px-4 py-3"><span className="text-sm text-gray-300 uppercase">{m.type}</span></td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${m.zone === 'local' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'}`}>{m.zone === 'local' ? 'Zone 1' : 'Zone 2'}</span></td>
                    <td className="px-4 py-3"><span className="text-sm text-gray-400">{m.subscribers ? `${m.subscribers} subscribers` : m.depth !== undefined ? `${m.depth} in queue` : m.rules ? `${m.rules} rules` : `${m.partitions} partitions`}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-300">{m.messagesDay}</td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{m.monthlyCost}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setMetricsResource(m)} className="p-1.5 hover:bg-blue-500/20 rounded-lg text-gray-400 hover:text-blue-400" title="View Metrics"><Icon name="activity" size={14} /></button>
                        <button onClick={() => { setSelectedMessaging(m); showNotification(`Editing ${m.name}...`); }} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title="Edit"><Icon name="edit" size={14} /></button>
                        <button onClick={() => showNotification(`Resource "${m.name}" deleted`, 'warning')} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Messaging Detail Panel */}
          {selectedMessaging && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedMessaging(null)} />
              <div className="relative w-[600px] bg-gray-900 border-l border-gray-700 overflow-auto">
                <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedMessaging(null)} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedMessaging.type === 'sns' ? 'bg-pink-500/20 text-pink-400' : selectedMessaging.type === 'sqs' ? 'bg-cyan-500/20 text-cyan-400' : selectedMessaging.type === 'eventbridge' ? 'bg-violet-500/20 text-violet-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      <Icon name={selectedMessaging.type === 'sns' ? 'radio' : selectedMessaging.type === 'sqs' ? 'mail' : selectedMessaging.type === 'eventbridge' ? 'zap' : 'activity'} size={20} />
                    </div>
                    <div><div className="font-semibold">{selectedMessaging.name}</div><div className="text-xs text-gray-500">{selectedMessaging.owner}</div></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditingMessaging(selectedMessaging); setNewMessagingData({ name: selectedMessaging.name, type: selectedMessaging.type, zone: selectedMessaging.zone, description: selectedMessaging.description }); setShowNewMessaging(true); }} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg" title="Edit"><Icon name="edit" size={16} /></button>
                    <button onClick={() => showNotification(`Cloning ${selectedMessaging.name}...`)} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg" title="Clone"><Icon name="copy" size={16} /></button>
                    <button onClick={() => setViewMessagesResource(selectedMessaging)} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg" title="View Messages"><Icon name="eye" size={16} /></button>
                    <button onClick={() => { showNotification(`Resource "${selectedMessaging.name}" deleted`, 'warning'); setSelectedMessaging(null); }} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg" title="Delete"><Icon name="trash2" size={16} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {/* Status Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={selectedMessaging.status === 'active' ? 'healthy' : 'warning'} /></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Monthly Cost</div><div className="text-lg font-semibold text-emerald-400">{selectedMessaging.monthlyCost}</div></div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Zone</div><span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${selectedMessaging.zone === 'local' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'}`}>{selectedMessaging.zone === 'local' ? 'Zone 1 (Local)' : 'Zone 2 (Central)'}</span></div>
                  </div>

                  {/* Configuration */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="database" size={14} className="text-gray-400" />Configuration</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">Type</div><div className="text-gray-300 uppercase">{selectedMessaging.type}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Created</div><div className="text-gray-300">{selectedMessaging.created}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Retention</div><div className="text-gray-300">{selectedMessaging.retention}</div></div>
                      <div><div className="text-xs text-gray-500 mb-1">Encryption</div><div className="text-gray-300">{selectedMessaging.encryption}</div></div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="activity" size={14} className="text-gray-400" />Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><div className="text-xs text-gray-500 mb-1">Messages/Day</div><div className="text-gray-300">{selectedMessaging.messagesDay}</div></div>
                      {selectedMessaging.subscribers && <div><div className="text-xs text-gray-500 mb-1">Subscribers</div><div className="text-gray-300">{selectedMessaging.subscribers}</div></div>}
                      {selectedMessaging.depth !== undefined && <div><div className="text-xs text-gray-500 mb-1">Queue Depth</div><div className={selectedMessaging.depth > 100 ? 'text-amber-400' : 'text-emerald-400'}>{selectedMessaging.depth}</div></div>}
                      {selectedMessaging.rules && <div><div className="text-xs text-gray-500 mb-1">Rules</div><div className="text-gray-300">{selectedMessaging.rules}</div></div>}
                      {selectedMessaging.targets && <div><div className="text-xs text-gray-500 mb-1">Targets</div><div className="text-gray-300">{selectedMessaging.targets}</div></div>}
                      {selectedMessaging.partitions && <div><div className="text-xs text-gray-500 mb-1">Partitions</div><div className="text-gray-300">{selectedMessaging.partitions}</div></div>}
                      {selectedMessaging.consumerGroups && <div><div className="text-xs text-gray-500 mb-1">Consumer Groups</div><div className="text-gray-300">{selectedMessaging.consumerGroups}</div></div>}
                      {selectedMessaging.deliveryRate && <div><div className="text-xs text-gray-500 mb-1">Delivery Rate</div><div className="text-emerald-400">{selectedMessaging.deliveryRate}</div></div>}
                      {selectedMessaging.avgProcessTime && <div><div className="text-xs text-gray-500 mb-1">Avg Process Time</div><div className="text-gray-300">{selectedMessaging.avgProcessTime}</div></div>}
                      {selectedMessaging.avgAge && <div><div className="text-xs text-gray-500 mb-1">Avg Message Age</div><div className="text-amber-400">{selectedMessaging.avgAge}</div></div>}
                    </div>
                  </div>

                  {/* Consumer Lag */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="clock" size={14} className="text-amber-400" />Consumer Lag</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'order-processor', lag: 12, trend: 'down', partition: 0 },
                        { name: 'notification-svc', lag: 847, trend: 'up', partition: 1 },
                        { name: 'analytics-consumer', lag: 3, trend: 'stable', partition: 2 },
                        { name: 'audit-logger', lag: 0, trend: 'stable', partition: 3 },
                      ].map((consumer, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-gray-900/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${consumer.lag > 100 ? 'bg-amber-400' : consumer.lag > 0 ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                            <div>
                              <div className="text-sm font-medium">{consumer.name}</div>
                              <div className="text-xs text-gray-500">Partition {consumer.partition}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className={`text-sm font-medium ${consumer.lag > 100 ? 'text-amber-400' : consumer.lag > 0 ? 'text-gray-300' : 'text-emerald-400'}`}>{consumer.lag.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">messages behind</div>
                            </div>
                            <Icon name={consumer.trend === 'up' ? 'trending-up' : consumer.trend === 'down' ? 'trending-down' : 'minus'} size={14} className={consumer.trend === 'up' ? 'text-amber-400' : consumer.trend === 'down' ? 'text-emerald-400' : 'text-gray-500'} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Total Lag</span>
                      <span className="text-amber-400 font-medium">862 messages</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div><h3 className="text-sm font-medium mb-2">Description</h3><p className="text-sm text-gray-400">{selectedMessaging.description}</p></div>

                  {/* DLQ Warning */}
                  {selectedMessaging.status === 'warning' && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon name="alert-triangle" size={18} className="text-amber-400" />
                        <span className="font-medium text-amber-300">Attention Required</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">This queue has {selectedMessaging.depth} unprocessed messages that may require investigation.</p>
                      <div className="flex gap-2">
                        <button onClick={() => showNotification('Replaying messages...', 'info')} className="px-3 py-1.5 text-sm bg-amber-600 hover:bg-amber-500 rounded-lg"><Icon name="refresh-cw" size={14} className="inline mr-1.5" />Replay Messages</button>
                        <button onClick={() => showNotification('Purging queue...', 'warning')} className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg"><Icon name="trash2" size={14} className="inline mr-1.5" />Purge Queue</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Metrics Modal */}
          {metricsResource && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setMetricsResource(null)} />
              <div className="relative w-[800px] max-h-[90vh] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metricsResource.type === 'sns' ? 'bg-pink-500/20 text-pink-400' : metricsResource.type === 'sqs' ? 'bg-cyan-500/20 text-cyan-400' : metricsResource.type === 'eventbridge' ? 'bg-violet-500/20 text-violet-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      <Icon name={metricsResource.type === 'sns' ? 'radio' : metricsResource.type === 'sqs' ? 'mail' : metricsResource.type === 'eventbridge' ? 'zap' : 'activity'} size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{metricsResource.name}</div>
                      <div className="text-xs text-gray-500">Metrics Dashboard</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1 p-1 bg-gray-800 rounded-lg border border-gray-700">
                      {[
                        { id: '1m', label: '1 Month' },
                        { id: '3m', label: '3 Months' },
                        { id: '6m', label: '6 Months' }
                      ].map(t => (
                        <button key={t.id} onClick={() => setMetricsTimeRange(t.id)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${metricsTimeRange === t.id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-gray-400 hover:text-gray-200'}`}>{t.label}</button>
                      ))}
                    </div>
                    <button onClick={() => setMetricsResource(null)} className="p-2 hover:bg-gray-700 rounded-lg"><Icon name="x" size={18} /></button>
                  </div>
                </div>
                <div className="p-6 space-y-6 max-h-[calc(90vh-80px)] overflow-y-auto">
                  {/* Key Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Total Messages</div>
                      <div className="text-2xl font-semibold text-gray-100">{metricsTimeRange === '1m' ? '1.2M' : metricsTimeRange === '3m' ? '3.8M' : '7.4M'}</div>
                      <div className="text-xs text-emerald-400 mt-1">+12% vs prev period</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Avg Throughput</div>
                      <div className="text-2xl font-semibold text-cyan-400">{metricsTimeRange === '1m' ? '42K' : metricsTimeRange === '3m' ? '38K' : '35K'}/day</div>
                      <div className="text-xs text-gray-500 mt-1">Messages processed</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                      <div className="text-2xl font-semibold text-emerald-400">99.7%</div>
                      <div className="text-xs text-gray-500 mt-1">Delivery success</div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="text-xs text-gray-500 mb-1">Avg Latency</div>
                      <div className="text-2xl font-semibold text-amber-400">45ms</div>
                      <div className="text-xs text-gray-500 mt-1">End-to-end</div>
                    </div>
                  </div>
                  {/* Message Volume Chart */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium flex items-center gap-2"><Icon name="bar-chart-2" size={16} className="text-cyan-400" />Message Volume</h3>
                      <span className="text-xs text-gray-500">{metricsTimeRange === '1m' ? 'Last 30 days' : metricsTimeRange === '3m' ? 'Last 90 days' : 'Last 180 days'}</span>
                    </div>
                    <FakeGraph color="cyan" height={120} data={Array.from({ length: metricsTimeRange === '1m' ? 30 : metricsTimeRange === '3m' ? 90 : 180 }, (_, i) => 30000 + Math.sin(i * 0.2) * 10000 + Math.random() * 5000)} />
                  </div>
                  {/* Two Column Charts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="clock" size={16} className="text-amber-400" />Latency (p99)</h3>
                      </div>
                      <FakeGraph color="amber" height={100} data={Array.from({ length: 30 }, (_, i) => 30 + Math.sin(i * 0.3) * 15 + Math.random() * 10)} />
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center gap-2"><Icon name="alert-circle" size={16} className="text-red-400" />Error Rate</h3>
                      </div>
                      <FakeGraph color="red" height={100} data={Array.from({ length: 30 }, (_, i) => 0.1 + Math.random() * 0.5)} />
                    </div>
                  </div>
                  {/* Consumer/Publisher Stats */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h3 className="font-medium flex items-center gap-2 mb-4"><Icon name="users" size={16} className="text-violet-400" />Subscribers & Activity</h3>
                    <div className="space-y-3">
                      {['order-processor', 'notification-service', 'analytics-pipeline', 'audit-logger'].map((sub, i) => (
                        <div key={sub} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center"><Icon name="box" size={14} /></div>
                            <div>
                              <div className="text-sm font-medium">{sub}</div>
                              <div className="text-xs text-gray-500">{['Lambda', 'ECS Service', 'Kinesis', 'CloudWatch'][i]}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-300">{[12400, 8900, 15200, 5600][i].toLocaleString()} msgs</div>
                            <div className="text-xs text-emerald-400">{['99.9%', '99.8%', '99.7%', '100%'][i]} success</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Viewer Modal */}
          {viewMessagesResource && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setViewMessagesResource(null)} />
              <div className="relative w-[900px] max-h-[85vh] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${viewMessagesResource.type === 'sns' ? 'bg-pink-500/20 text-pink-400' : viewMessagesResource.type === 'sqs' ? 'bg-cyan-500/20 text-cyan-400' : viewMessagesResource.type === 'eventbridge' ? 'bg-violet-500/20 text-violet-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      <Icon name={viewMessagesResource.type === 'sns' ? 'radio' : viewMessagesResource.type === 'sqs' ? 'mail' : viewMessagesResource.type === 'eventbridge' ? 'zap' : 'activity'} size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{viewMessagesResource.name}</div>
                      <div className="text-xs text-gray-500">Message Browser</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showNotification('Refreshing messages...')} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg"><Icon name="refresh-cw" size={16} /></button>
                    <button onClick={() => setViewMessagesResource(null)} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg"><Icon name="x" size={16} /></button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-2">
                  {Array.from({ length: 15 }, (_, i) => {
                    const timestamps = ['2 seconds ago', '15 seconds ago', '42 seconds ago', '1 minute ago', '2 minutes ago', '3 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago', '15 minutes ago', '20 minutes ago', '25 minutes ago', '30 minutes ago', '45 minutes ago', '1 hour ago'];
                    const messageTypes = ['OrderCreated', 'PaymentProcessed', 'InventoryUpdate', 'ShipmentReady', 'CustomerNotification', 'AuditLog', 'MetricsEvent'];
                    const sources = ['order-service', 'payment-gateway', 'inventory-api', 'shipping-service', 'notification-hub', 'audit-system'];
                    const msgType = messageTypes[i % messageTypes.length];
                    const source = sources[i % sources.length];
                    const msgId = `msg-${Date.now() - i * 30000}-${Math.random().toString(36).substr(2, 8)}`;
                    const size = (Math.random() * 2 + 0.3).toFixed(1);
                    return (
                      <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800 cursor-pointer" onClick={() => showNotification(`Viewing message ${msgId}`)}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded font-mono">{msgType}</span>
                            <span className="text-xs text-gray-500">from</span>
                            <span className="text-xs text-cyan-400">{source}</span>
                          </div>
                          <span className="text-xs text-gray-500">{timestamps[i]}</span>
                        </div>
                        <div className="font-mono text-xs text-gray-400 bg-gray-900/50 rounded p-2 overflow-hidden">
                          {`{ "messageId": "${msgId}", "type": "${msgType}", "source": "${source}", "payload": { "id": ${1000 + i}, "status": "processed", "timestamp": "${new Date(Date.now() - i * 60000).toISOString()}" } }`}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span><Icon name="hash" size={10} className="inline mr-1" />{msgId.slice(0, 16)}...</span>
                          <span><Icon name="database" size={10} className="inline mr-1" />{size} KB</span>
                          <span className={i === 1 ? 'text-amber-400' : 'text-emerald-400'}><Icon name={i === 1 ? 'clock' : 'check-circle'} size={10} className="inline mr-1" />{i === 1 ? 'Pending' : 'Delivered'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-6 py-3 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
                  <div className="text-sm text-gray-400">Showing 15 of {viewMessagesResource.messagesDay?.replace(/,/g, '') || '1,234'} messages</div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50" disabled>Previous</button>
                    <span className="text-sm text-gray-400">Page 1</span>
                    <button className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create/Edit Messaging Resource Modal */}
          {showNewMessaging && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowNewMessaging(false)} />
              <div className="relative w-[600px] max-h-[85vh] bg-gray-900 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Icon name={editingMessaging ? 'edit' : 'plus'} size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{editingMessaging ? 'Edit Resource' : 'New Messaging Resource'}</div>
                      <div className="text-xs text-gray-500">{editingMessaging ? `Editing ${editingMessaging.name}` : 'Choose a blueprint or configure manually'}</div>
                    </div>
                  </div>
                  <button onClick={() => setShowNewMessaging(false)} className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg"><Icon name="x" size={16} /></button>
                </div>
                {/* Tabs */}
                {!editingMessaging && (
                  <div className="flex border-b border-gray-700">
                    <button onClick={() => setNewMessagingTab('blueprints')} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${newMessagingTab === 'blueprints' ? 'text-pink-400 border-b-2 border-pink-400 bg-pink-500/5' : 'text-gray-400 hover:text-gray-200'}`}>
                      <Icon name="layout" size={16} />Blueprints
                    </button>
                    <button onClick={() => setNewMessagingTab('custom')} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${newMessagingTab === 'custom' ? 'text-pink-400 border-b-2 border-pink-400 bg-pink-500/5' : 'text-gray-400 hover:text-gray-200'}`}>
                      <Icon name="sliders" size={16} />Standard
                    </button>
                  </div>
                )}
                <div className="flex-1 overflow-auto p-6">
                  {/* Blueprints Tab */}
                  {(newMessagingTab === 'blueprints' && !editingMessaging && !selectedBlueprint) && (
                    <div className="space-y-3">
                      <button onClick={() => setSelectedBlueprint('fanout')} className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800 text-left flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-pink-500/20 text-pink-400 flex-shrink-0">
                          <Icon name="share-2" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-200">Fan-Out Pattern</span>
                            <span className="px-2 py-0.5 rounded text-xs bg-pink-500/20 text-pink-300">SNS+SQS</span>
                          </div>
                          <div className="text-sm text-gray-400 mb-1">SNS topic with multiple SQS queue subscribers</div>
                          <div className="text-xs text-gray-500">SNS → 2x SQS</div>
                        </div>
                        <Icon name="chevron-right" size={20} className="text-gray-600 group-hover:text-gray-400 flex-shrink-0 mt-2" />
                      </button>
                    </div>
                  )}
                  {/* Fan-Out Blueprint Detail */}
                  {(newMessagingTab === 'blueprints' && selectedBlueprint === 'fanout') && (
                    <div className="space-y-4">
                      <button onClick={() => setSelectedBlueprint(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 mb-2">
                        <Icon name="arrow-left" size={14} />Back to Blueprints
                      </button>
                      <div className="text-center mb-4">
                        <div className="text-lg font-medium text-gray-200">Fan-Out Pattern</div>
                        <div className="text-sm text-gray-400">SNS topic distributing to multiple SQS queues</div>
                      </div>
                      {/* SNS Topic */}
                      <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500/20 text-pink-400">
                            <Icon name="radio" size={20} />
                          </div>
                          <div>
                            <div className="font-medium text-pink-300">SNS Topic</div>
                            <div className="text-xs text-gray-400">Publisher</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><label className="block text-xs text-gray-500 mb-1">Topic Name</label><input type="text" defaultValue="order-events-topic" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                          <div><label className="block text-xs text-gray-500 mb-1">Topic Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"><option>Standard</option><option>FIFO</option></select></div>
                          <div><label className="block text-xs text-gray-500 mb-1">Display Name</label><input type="text" defaultValue="Order Events" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                          <div><label className="block text-xs text-gray-500 mb-1">Delivery Policy</label><select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"><option>Immediate</option><option>Batched</option></select></div>
                        </div>
                      </div>
                      {/* Arrow connector */}
                      <div className="flex justify-center py-2">
                        <div className="flex flex-col items-center text-gray-500">
                          <div className="w-0.5 h-4 bg-gray-600"></div>
                          <Icon name="chevrons-down" size={20} />
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-0.5 bg-gray-600"></div>
                            <div className="w-16 h-0.5 bg-gray-600"></div>
                          </div>
                        </div>
                      </div>
                      {/* SQS Queues */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Queue 1 */}
                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                              <Icon name="mail" size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-cyan-300">SQS Queue 1</div>
                              <div className="text-xs text-gray-400">Subscriber</div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><label className="block text-xs text-gray-500 mb-1">Queue Name</label><input type="text" defaultValue="order-processing-queue" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><label className="block text-xs text-gray-500 mb-1">Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"><option>Standard</option><option>FIFO</option></select></div>
                              <div><label className="block text-xs text-gray-500 mb-1">Visibility (s)</label><input type="number" defaultValue="30" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><label className="block text-xs text-gray-500 mb-1">Retention (days)</label><input type="number" defaultValue="4" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                              <div><label className="block text-xs text-gray-500 mb-1">Max Size (KB)</label><input type="number" defaultValue="256" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            </div>
                          </div>
                        </div>
                        {/* Queue 2 */}
                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                              <Icon name="mail" size={20} />
                            </div>
                            <div>
                              <div className="font-medium text-cyan-300">SQS Queue 2</div>
                              <div className="text-xs text-gray-400">Subscriber</div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div><label className="block text-xs text-gray-500 mb-1">Queue Name</label><input type="text" defaultValue="order-analytics-queue" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><label className="block text-xs text-gray-500 mb-1">Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm"><option>Standard</option><option>FIFO</option></select></div>
                              <div><label className="block text-xs text-gray-500 mb-1">Visibility (s)</label><input type="number" defaultValue="60" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div><label className="block text-xs text-gray-500 mb-1">Retention (days)</label><input type="number" defaultValue="7" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                              <div><label className="block text-xs text-gray-500 mb-1">Max Size (KB)</label><input type="number" defaultValue="256" className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Custom Tab */}
                  {(newMessagingTab === 'custom' || editingMessaging) && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Resource Name</label>
                        <input type="text" value={newMessagingData.name} onChange={(e) => setNewMessagingData({ ...newMessagingData, name: e.target.value })} placeholder="e.g., order-events" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'sns', label: 'SNS', icon: 'radio', color: 'pink' },
                            { id: 'sqs', label: 'SQS', icon: 'mail', color: 'cyan' },
                            { id: 'eventbridge', label: 'EventBridge', icon: 'zap', color: 'violet' },
                            { id: 'kafka', label: 'Kafka', icon: 'activity', color: 'amber' }
                          ].map(t => (
                            <button key={t.id} onClick={() => setNewMessagingData({ ...newMessagingData, type: t.id })} className={`p-3 rounded-lg border text-center ${newMessagingData.type === t.id ? `bg-${t.color}-500/20 border-${t.color}-500/50 text-${t.color}-300` : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                              <Icon name={t.icon} size={20} className="mx-auto mb-1" />
                              <div className="text-xs">{t.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Type-specific Configuration */}
                      {newMessagingData.type === 'sns' && (
                        <div className="space-y-3 p-4 bg-pink-500/5 border border-pink-500/20 rounded-lg">
                          <div className="text-xs font-medium text-pink-400 mb-2">SNS Configuration</div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Topic Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"><option>Standard</option><option>FIFO</option></select></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Delivery Protocol</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"><option>HTTP/HTTPS</option><option>Email</option><option>SQS</option><option>Lambda</option></select></div>
                          </div>
                          <div><label className="block text-xs text-gray-500 mb-1">Display Name</label><input type="text" placeholder="e.g., Order Notifications" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                        </div>
                      )}
                      {newMessagingData.type === 'sqs' && (
                        <div className="space-y-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                          <div className="text-xs font-medium text-cyan-400 mb-2">SQS Configuration</div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Queue Type</label><select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"><option>Standard</option><option>FIFO</option></select></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Visibility Timeout (sec)</label><input type="number" defaultValue="30" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Message Retention (days)</label><input type="number" defaultValue="4" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Max Message Size (KB)</label><input type="number" defaultValue="256" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          </div>
                        </div>
                      )}
                      {newMessagingData.type === 'eventbridge' && (
                        <div className="space-y-3 p-4 bg-violet-500/5 border border-violet-500/20 rounded-lg">
                          <div className="text-xs font-medium text-violet-400 mb-2">EventBridge Configuration</div>
                          <div><label className="block text-xs text-gray-500 mb-1">Event Bus Name</label><input type="text" placeholder="e.g., custom-events" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Source Pattern</label><input type="text" placeholder="e.g., com.myapp.*" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Detail Type</label><input type="text" placeholder="e.g., OrderCreated" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          </div>
                        </div>
                      )}
                      {newMessagingData.type === 'kafka' && (
                        <div className="space-y-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <div className="text-xs font-medium text-amber-400 mb-2">Kafka Configuration</div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Consumer Group</label><input type="text" placeholder="e.g., order-processors" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Producer Group</label><input type="text" placeholder="e.g., order-service" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><label className="block text-xs text-gray-500 mb-1">Partitions</label><input type="number" defaultValue="3" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                            <div><label className="block text-xs text-gray-500 mb-1">Replication Factor</label><input type="number" defaultValue="2" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                          </div>
                          <div><label className="block text-xs text-gray-500 mb-1">Retention (hours)</label><input type="number" defaultValue="168" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm" /></div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <textarea value={newMessagingData.description} onChange={(e) => setNewMessagingData({ ...newMessagingData, description: e.target.value })} placeholder="Describe this resource..." rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 resize-none" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
                  {!editingMessaging && newMessagingTab === 'custom' && !selectedBlueprint && (
                    <button onClick={() => setNewMessagingTab('blueprints')} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 flex items-center gap-2"><Icon name="arrow-left" size={14} />Back to Blueprints</button>
                  )}
                  {(editingMessaging || (newMessagingTab === 'blueprints' && !selectedBlueprint)) && <div />}
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setShowNewMessaging(false); setSelectedBlueprint(null); }} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                    {(newMessagingTab === 'custom' || editingMessaging) && (
                      <button onClick={() => {
                        if (editingMessaging) {
                          // Update existing resource
                          setSavedMessaging(savedMessaging.map(m => m.id === editingMessaging.id ? { ...editingMessaging, ...newMessagingData } : m));
                          showNotification(`Resource "${newMessagingData.name}" updated successfully`, 'success');
                        } else {
                          // Create new resource
                          const newResource = {
                            id: Date.now(),
                            name: newMessagingData.name,
                            type: newMessagingData.type || 'sns',
                            zone: newMessagingData.zone || 'local',
                            status: 'active',
                            owner: newMessagingData.owner || 'current-user',
                            messagesDay: '0',
                            monthlyCost: '$0.00',
                            created: new Date().toISOString().split('T')[0],
                            ...newMessagingData
                          };
                          setSavedMessaging([...savedMessaging, newResource]);
                          showNotification(`Resource "${newMessagingData.name}" created successfully`, 'success');
                        }
                        setShowNewMessaging(false);
                        setSelectedMessaging(null);
                        setSelectedBlueprint(null);
                      }} className="px-4 py-2 text-sm bg-pink-600 hover:bg-pink-500 rounded-lg font-medium">{editingMessaging ? 'Save Changes' : 'Create Resource'}</button>
                    )}
                                      </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

      // R.O.S.I.E. VIEW (Scheduling)
      const ROSIEView = () => {
        const recommendation = getTargetRecommendation();

        if (showNewJob) {
          return (
            <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between bg-gray-900 flex-shrink-0">
                <div className="flex items-center gap-4">
                  {editingJob && (
                    <div className="flex items-center gap-2 pr-4 border-r border-gray-700">
                      <Icon name="edit" size={16} className="text-pink-400" />
                      <span className="text-sm font-medium">Editing: <span className="text-pink-300">{editingJob.name}</span></span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDesignerMode('visual')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${designerMode === 'visual' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}><Icon name="layout" size={16} />Visual</button>
                    <button onClick={() => setDesignerMode('code')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${designerMode === 'code' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}><Icon name="code" size={16} />Code</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleCloseDesigner} className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                  <button onClick={handleSaveJob} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-lg text-sm font-medium"><Icon name="save" size={16} />Save</button>
                </div>
              </div>

              {/* Main Content: 3-column layout */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left: Operator Palette */}
                <div className="w-36 border-r border-gray-800 bg-gray-900/80 flex flex-col flex-shrink-0">
                  <div className="p-2 border-b border-gray-800">
                    <div className="flex flex-wrap gap-1">
                      {['All', 'Src', 'Proc', 'Dest', 'Ctrl'].map(cat => (
                        <button key={cat} onClick={() => setOperatorCategory(cat === 'Src' ? 'sources' : cat === 'Proc' ? 'process' : cat === 'Ctrl' ? 'control' : cat === 'Dest' ? 'destinations' : 'all')} className={`px-1.5 py-0.5 text-[10px] rounded ${(operatorCategory === 'all' && cat === 'All') || (operatorCategory === 'sources' && cat === 'Src') || (operatorCategory === 'process' && cat === 'Proc') || (operatorCategory === 'destinations' && cat === 'Dest') || (operatorCategory === 'control' && cat === 'Ctrl') ? 'bg-pink-500/20 text-pink-300' : 'text-gray-500 hover:text-gray-300'}`}>{cat}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-2 space-y-1">
                    {(operatorCategory === 'all' || operatorCategory === 'sources') &&
                      [{ type: 's3', icon: 'hard-drive', label: 'S3 Sensor', color: 'blue' }, { type: 'aurora', icon: 'database', label: 'Aurora', color: 'blue' }, { type: 'api', icon: 'globe', label: 'API Call', color: 'blue' }].map(op => (
                        <button key={op.type} onClick={() => handleAddNode(op.type)} className="w-full flex items-center gap-2 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-left hover:border-blue-500/50 group">
                          <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-400"><Icon name={op.icon} size={11} /></div>
                          <span className="text-xs text-gray-300">{op.label}</span>
                        </button>
                      ))
                    }
                    {(operatorCategory === 'all' || operatorCategory === 'process') &&
                      [{ type: 'lambda', icon: 'zap', label: 'Lambda' }, { type: 'glue', icon: 'refresh-cw', label: 'Glue Job' }, { type: 'batch', icon: 'layers', label: 'Batch' }, { type: 'emr', icon: 'cpu', label: 'EMR Step' }].map(op => (
                        <button key={op.type} onClick={() => handleAddNode(op.type)} className="w-full flex items-center gap-2 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-left hover:border-amber-500/50 group">
                          <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400"><Icon name={op.icon} size={11} /></div>
                          <span className="text-xs text-gray-300">{op.label}</span>
                        </button>
                      ))
                    }
                    {(operatorCategory === 'all' || operatorCategory === 'destinations') &&
                      [{ type: 's3-write', icon: 'upload', label: 'S3 Write' }, { type: 'dsql', icon: 'server', label: 'DSQL' }, { type: 'dynamodb', icon: 'table', label: 'DynamoDB' }, { type: 'sqs', icon: 'mail', label: 'SQS' }].map(op => (
                        <button key={op.type} onClick={() => handleAddNode(op.type)} className="w-full flex items-center gap-2 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-left hover:border-emerald-500/50 group">
                          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Icon name={op.icon} size={11} /></div>
                          <span className="text-xs text-gray-300">{op.label}</span>
                        </button>
                      ))
                    }
                    {(operatorCategory === 'all' || operatorCategory === 'control') &&
                      [{ type: 'branch', icon: 'git-branch', label: 'Branch' }, { type: 'sensor', icon: 'clock', label: 'Wait' }, { type: 'sns', icon: 'bell', label: 'SNS Notify' }].map(op => (
                        <button key={op.type} onClick={() => handleAddNode(op.type)} className="w-full flex items-center gap-2 px-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded text-left hover:border-pink-500/50 group">
                          <div className="w-5 h-5 rounded bg-pink-500/20 flex items-center justify-center text-pink-400"><Icon name={op.icon} size={11} /></div>
                          <span className="text-xs text-gray-300">{op.label}</span>
                        </button>
                      ))
                    }
                  </div>
                </div>

                {/* Center: Canvas + Config */}
                <div className="flex-1 flex flex-col min-w-0">
                  {designerMode === 'visual' ? (<>
                    {/* Canvas */}
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="relative bg-gray-900/80 border border-gray-700 rounded-lg h-full min-h-[200px] p-4">
                        <div className="absolute inset-0 opacity-10 rounded-lg" style={{ backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="relative flex items-start gap-3 flex-wrap">
                          {workflowNodes.map((node, index) => {
                            const colorMap = {
                              blue: { ring: 'ring-blue-500', border: 'border-blue-500/50 hover:border-blue-500', bg: 'bg-blue-500/20 text-blue-400' },
                              amber: { ring: 'ring-amber-500', border: 'border-amber-500/50 hover:border-amber-500', bg: 'bg-amber-500/20 text-amber-400' },
                              emerald: { ring: 'ring-emerald-500', border: 'border-emerald-500/50 hover:border-emerald-500', bg: 'bg-emerald-500/20 text-emerald-400' },
                              pink: { ring: 'ring-pink-500', border: 'border-pink-500/50 hover:border-pink-500', bg: 'bg-pink-500/20 text-pink-400' },
                            };
                            const colors = colorMap[node.color] || colorMap.blue;
                            const typeConfig = nodeTypeConfigs[node.type] || { icon: 'box' };
                            return (
                            <React.Fragment key={node.id}>
                              <div onClick={() => handleSelectNode(node)} className={`relative bg-gray-800 border-2 rounded-lg p-3 min-w-[90px] group cursor-pointer ${selectedNode?.id === node.id ? `ring-2 ring-offset-2 ring-offset-gray-900 ${colors.ring} border-transparent` : colors.border}`}>
                                <button onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-400"><Icon name="x" size={12} /></button>
                                <div className={`w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center ${colors.bg}`}><Icon name={typeConfig.icon} size={16} /></div>
                                <div className="text-xs font-medium text-center">{node.name}</div>
                                <div className="text-[10px] text-gray-500 text-center mt-0.5">Configure...</div>
                              </div>
                              {index < workflowNodes.length - 1 && <div className="flex items-center self-center"><Icon name="arrow-right" className="text-gray-600" size={16} /></div>}
                            </React.Fragment>
                          );})}
                          {workflowNodes.length === 0 && <div className="w-full text-center py-12 text-gray-500"><Icon name="plus" size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm">Click operators on the left to add them</p></div>}
                        </div>
                      </div>
                    </div>
                    {/* Config Panel */}
                    <div className="h-48 border-t border-gray-800 bg-gray-900/50 p-4 overflow-auto flex-shrink-0">
                      {selectedNode ? (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedNode.color === 'blue' ? 'bg-blue-500/20 text-blue-400' : selectedNode.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : selectedNode.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-pink-500/20 text-pink-400'}`}><Icon name={nodeTypeConfigs[selectedNode.type]?.icon || 'box'} size={14} /></div>
                              <div><div className="font-medium text-sm">{selectedNode.name}</div><div className="text-xs text-gray-500">{selectedNode.type}</div></div>
                            </div>
                            <button onClick={() => setSelectedNode(null)} className="p-1.5 hover:bg-gray-700 rounded text-gray-400"><Icon name="x" size={14} /></button>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div><label className="block text-xs text-gray-400 mb-1">Step Name</label><input type="text" value={selectedNode.name} onChange={e => handleUpdateNodeName(selectedNode.id, e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm" /></div>
                            {selectedNode.config && Object.entries(selectedNode.config).map(([key, val]) => (
                              <div key={key}><label className="block text-xs text-gray-400 mb-1">{key.replace(/_/g, ' ')}</label><input type="text" value={val} onChange={e => handleUpdateNodeConfig(selectedNode.id, key, e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-sm" /></div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          <div className="text-center"><Icon name="settings" size={32} className="mx-auto mb-2 opacity-30" /><div className="text-sm">Select a node to configure</div></div>
                        </div>
                      )}
                    </div>
                  </>) : (
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden h-full">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/50">
                          <div className="flex items-center gap-2 text-sm"><Icon name="git-branch" size={14} className="text-gray-400" /><span className="text-gray-300">workflow.py</span></div>
                          <span className="text-xs text-gray-500">Python (Airflow DAG)</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-auto h-[calc(100%-40px)]">{`from airflow import DAG
from datetime import datetime

with DAG('${jobConfig.name || 'my_workflow'}', schedule='${jobConfig.cronExpression}') as dag:
${workflowNodes.map(n => `    ${n.name.toLowerCase().replace(/\s+/g, '_')} = ${nodeTypeConfigs[n.type]?.operator || 'Operator'}(task_id='${n.name.toLowerCase().replace(/\s+/g, '_')}')`).join('\n')}
${workflowNodes.length > 1 ? `\n    ${workflowNodes.map(n => n.name.toLowerCase().replace(/\s+/g, '_')).join(' >> ')}` : ''}`}</pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Job Properties */}
                <div className="w-72 border-l border-gray-800 bg-gray-900/50 overflow-auto flex-shrink-0">
                <div className="p-4 border-b border-gray-800"><h3 className="font-medium">Job Properties</h3></div>
                <div className="p-4 space-y-4">
                  <div><label className="block text-sm text-gray-400 mb-1.5">Job Name</label><input type="text" value={jobConfig.name} onChange={e => setJobConfig({...jobConfig, name: e.target.value})} placeholder="my-job-name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500" /></div>
                  <div><label className="block text-sm text-gray-400 mb-1.5">Schedule</label>
                    <div className="flex gap-2 mb-2">
                      <button onClick={() => setJobConfig({...jobConfig, scheduleType: 'cron'})} className={`flex-1 py-1.5 text-sm rounded-lg border ${jobConfig.scheduleType === 'cron' ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>Cron</button>
                      <button onClick={() => setJobConfig({...jobConfig, scheduleType: 'rate'})} className={`flex-1 py-1.5 text-sm rounded-lg border ${jobConfig.scheduleType === 'rate' ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>Rate</button>
                    </div>
                    <input type="text" value={jobConfig.cronExpression} onChange={e => setJobConfig({...jobConfig, cronExpression: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-pink-500" />
                    <div className="text-xs text-gray-500 mt-1.5">Daily at 2:00 AM</div>
                  </div>
                  <div><label className="block text-sm text-gray-400 mb-1.5">Deployment Target</label>
                    <div className="space-y-2">
                      {[{ id: 'eventbridge', label: 'Step Function', desc: 'Simple schedules' }, { id: 'mwaa', label: 'Airflow (MWAA)', desc: 'Complex workflows' }].map(opt => (
                        <label key={opt.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer ${jobConfig.target === opt.id ? 'bg-pink-500/10 border-pink-500/50' : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'}`}>
                          <input type="radio" name="target" checked={jobConfig.target === opt.id} onChange={() => setJobConfig({...jobConfig, target: opt.id})} className="mt-0.5" />
                          <div><div className="text-sm font-medium">{opt.label}</div><div className="text-xs text-gray-500">{opt.desc}</div></div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div><label className="block text-sm text-gray-400 mb-1.5">Tags</label>
                    <div className="flex flex-wrap gap-1.5">
                      {jobConfig.tags.map((tag, i) => (<span key={i} className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{tag}<button onClick={() => setJobConfig({...jobConfig, tags: jobConfig.tags.filter((_, idx) => idx !== i)})} className="hover:text-red-400"><Icon name="trash2" size={10} /></button></span>))}
                      <button onClick={() => showNotification('Enter tag name in prompt...')} className="inline-flex items-center gap-1 text-pink-400 text-xs px-2 py-1 hover:bg-gray-800 rounded"><Icon name="plus" size={10} />Add tag</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-700">
              <div className="flex gap-1">
              {[
                { id: 'jobs', label: 'Jobs', icon: 'clock' },
                { id: 'runs', label: 'Run History', icon: 'activity' },
                { id: 'airflow', label: 'Airflow UI', icon: 'external-link' },
                { id: 'settings', label: 'Settings', icon: 'database' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.id ? 'border-pink-500 text-pink-300' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                  <Icon name={tab.icon} size={16} />{tab.label}
                </button>
              ))}
              </div>
              {activeTab === 'jobs' && (
                <button onClick={() => setShowDiagnostics(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg border border-gray-700 mb-2"><Icon name="wrench" size={16} />Diagnostics</button>
              )}
            </div>

            {/* JOBS TAB */}
            {activeTab === 'jobs' && (<>
            {/* Stats Grid with Cost */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Monthly Spend</span>
                  <span className="text-xs text-emerald-400 flex items-center gap-1"><Icon name="trending-down" size={12} />{platformCosts.rosie.trend}</span>
                </div>
                <div className="text-2xl font-semibold text-emerald-300">${platformCosts.rosie.total.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Step Functions + MWAA</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Total Jobs</span>
                  <Icon name="git-branch" size={14} className="text-pink-400" />
                </div>
                <div className="text-2xl font-semibold text-pink-300">{allJobs.length}</div>
                <div className="text-xs text-gray-500 mt-1">{rosieStats.active} active, {rosieStats.paused} paused</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Success Rate</span>
                  <Icon name="trending-up" size={14} className="text-cyan-400" />
                </div>
                <div className="text-2xl font-semibold text-cyan-300">{rosieStats.successRate}%</div>
                <div className="text-xs text-gray-500 mt-1">Last 24 hours</div>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Failed (24h)</span>
                  <Icon name="alert-triangle" size={14} className="text-red-400" />
                </div>
                <div className="text-2xl font-semibold text-red-300">{rosieStats.failed24h}</div>
                <div className="text-xs text-gray-500 mt-1">{rosieStats.failed24h > 0 ? 'Needs attention' : 'All jobs healthy'}</div>
              </div>
            </div>

            {/* Filter Tabs with Counts */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                {[
                  { id: 'all', label: 'All', count: allJobs.length },
                  { id: 'active', label: 'Active', count: allJobs.filter(j => j.status === 'active').length },
                  { id: 'paused', label: 'Paused', count: allJobs.filter(j => j.status === 'paused').length }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setFilterStatus(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${filterStatus === cat.id ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                    {cat.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${filterStatus === cat.id ? 'bg-pink-500/30 text-pink-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                {[
                  { id: 'all', label: 'All Platforms', count: allJobs.length },
                  { id: 'eventbridge', label: 'Step Function', count: allJobs.filter(j => j.target === 'eventbridge').length },
                  { id: 'mwaa', label: 'MWAA', count: allJobs.filter(j => j.target === 'mwaa').length }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setFilterTarget(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${filterTarget === cat.id ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                    {cat.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${filterTarget === cat.id ? 'bg-pink-500/30 text-pink-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-xs">
                <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-pink-500" />
              </div>
              <span className="text-sm text-gray-500">{filteredJobs.length} jobs</span>
            </div>

            {/* Jobs Table */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Job Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Target</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Schedule</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Last Run</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr></thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job.id} onClick={() => setSelectedJob(job)} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer">
                      <td className="px-4 py-3"><div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'}`}><Icon name={job.type === 'dag' ? 'git-branch' : 'zap'} size={16} /></div>
                        <div><div className="font-medium">{job.name}</div><div className="text-xs text-gray-500">{job.owner}</div></div>
                      </div></td>
                      <td className="px-4 py-3"><PlatformBadge target={job.target} /></td>
                      <td className="px-4 py-3"><div><code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{job.schedule}</code><div className="text-xs text-gray-500 mt-0.5">{job.scheduleHuman}</div></div></td>
                      <td className="px-4 py-3"><StatusBadge status={job.status} size="sm" /></td>
                      <td className="px-4 py-3"><div className="flex items-center gap-2"><StatusBadge status={job.lastRunStatus} size="sm" /><span className="text-xs text-gray-500">{job.lastRun}</span></div></td>
                      <td className="px-4 py-3 text-sm text-gray-300">{job.estimatedCost}</td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => { setSelectedJob(job); setShowDiagnostics(true); }} className="p-1.5 hover:bg-violet-500/20 rounded-lg text-gray-400 hover:text-violet-400" title="Diagnose"><Icon name="wrench" size={14} /></button>
                          <button onClick={() => handleEditJob(job)} className="p-1.5 hover:bg-blue-500/20 rounded-lg text-gray-400 hover:text-blue-400" title="Edit"><Icon name="edit" size={14} /></button>
                          <button onClick={() => handleTriggerJob(job)} className="p-1.5 hover:bg-emerald-500/20 rounded-lg text-gray-400 hover:text-emerald-400" title="Trigger"><Icon name="play" size={14} /></button>
                          <button onClick={() => showNotification(`Job "${job.name}" ${job.status === 'active' ? 'paused' : 'resumed'}`)} className="p-1.5 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400" title={job.status === 'active' ? 'Pause' : 'Resume'}><Icon name={job.status === 'active' ? 'pause' : 'play'} size={14} /></button>
                          <button onClick={() => handleDeleteJob(job)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Icon name="trash2" size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Platform Distribution */}
            <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3"><div className="text-sm font-medium text-gray-300">Platform Distribution (90/10 Target)</div><div className="text-xs text-gray-500">Your jobs: {allJobs.length > 0 ? Math.round(allJobs.filter(j => j.target === 'eventbridge').length / allJobs.length * 100) : 0}% Step Function / {allJobs.length > 0 ? Math.round(allJobs.filter(j => j.target === 'mwaa').length / allJobs.length * 100) : 0}% Airflow</div></div>
              <div className="flex h-3 rounded-full overflow-hidden bg-gray-700"><div className="bg-cyan-500" style={{ width: `${allJobs.length > 0 ? allJobs.filter(j => j.target === 'eventbridge').length / allJobs.length * 100 : 0}%` }} /><div className="bg-fuchsia-500" style={{ width: `${allJobs.length > 0 ? allJobs.filter(j => j.target === 'mwaa').length / allJobs.length * 100 : 0}%` }} /></div>
              <div className="flex justify-between mt-2 text-xs text-gray-500"><span>Step Function (Target: 90%)</span><span>Airflow (Target: 10%)</span></div>
            </div>

            {/* Job Detail Panel */}
            {selectedJob && (
              <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedJob(null)} />
                <div className="relative w-[600px] bg-gray-900 border-l border-gray-700 overflow-auto">
                  <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedJob(null)} className="p-1 hover:bg-gray-800 rounded"><Icon name="chevron-left" size={20} /></button>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedJob.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'}`}><Icon name={selectedJob.type === 'dag' ? 'git-branch' : 'zap'} size={20} /></div>
                      <div><div className="font-semibold">{selectedJob.name}</div><div className="text-xs text-gray-500">{selectedJob.owner}</div></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditJob(selectedJob)} className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"><Icon name="edit" size={14} className="inline mr-1.5" />Edit</button>
                      <button onClick={() => handleTriggerJob(selectedJob)} className="px-3 py-1.5 text-sm bg-pink-600 hover:bg-pink-500 rounded-lg"><Icon name="play" size={14} className="inline mr-1.5" />Trigger</button>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Status</div><StatusBadge status={selectedJob.status} /></div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Last Run</div><StatusBadge status={selectedJob.lastRunStatus} /></div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><div className="text-xs text-gray-500 mb-1">Success Rate</div><div className="text-lg font-semibold text-emerald-400">{selectedJob.successRate}%</div></div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Icon name="calendar" size={14} className="text-gray-400" />Schedule</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div><div className="text-xs text-gray-500 mb-1">Cron Expression</div><code className="text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{selectedJob.schedule}</code></div>
                        <div><div className="text-xs text-gray-500 mb-1">Avg Duration</div><div className="text-gray-300">{selectedJob.avgDuration}</div></div>
                        <div><div className="text-xs text-gray-500 mb-1">Est. Cost/Run</div><div className="text-emerald-400">{selectedJob.estimatedCost}</div></div>
                      </div>
                      <div className="mt-3 text-sm text-gray-400">{selectedJob.scheduleHuman}</div>
                    </div>
                    <div><h3 className="text-sm font-medium mb-2">Description</h3><p className="text-sm text-gray-400">{selectedJob.description}</p></div>
                    <div><h3 className="text-sm font-medium mb-2">Tags</h3><div className="flex flex-wrap gap-2">{selectedJob.tags.map((tag, i) => (<span key={i} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">{tag}</span>))}</div></div>

                    {/* Recent Runs - Step Function Execution History */}
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                        <h3 className="text-sm font-medium flex items-center gap-2"><Icon name="activity" size={14} className="text-pink-400" />Recent Executions</h3>
                        <button onClick={() => { setActiveTab('runs'); setSelectedJob(null); }} className="text-xs text-pink-400 hover:text-pink-300">View All</button>
                      </div>
                      <div className="divide-y divide-gray-700/50 max-h-[300px] overflow-y-auto">
                        {mockRuns.filter(r => r.jobName === selectedJob.name).slice(0, 5).map(run => (
                          <div key={run.id} className="p-3 hover:bg-gray-800/30">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <StatusBadge status={run.status} size="sm" />
                                <span className="text-xs text-gray-500">{run.id}</span>
                              </div>
                              <span className="text-xs text-gray-400">{run.startTime}</span>
                            </div>
                            {/* Step Function Steps */}
                            <div className="flex items-center gap-1 mb-2">
                              {run.steps?.map((step, i) => (
                                <React.Fragment key={i}>
                                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${step.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' : step.status === 'failed' ? 'bg-red-500/20 text-red-400' : step.status === 'running' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-600/50 text-gray-500'}`} title={`${step.name}: ${step.status}`}>
                                    <Icon name={step.status === 'success' ? 'check' : step.status === 'failed' ? 'x' : step.status === 'running' ? 'loader' : 'minus'} size={12} />
                                  </div>
                                  {i < run.steps.length - 1 && <div className="w-3 h-0.5 bg-gray-600" />}
                                </React.Fragment>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Duration: {run.duration}</span>
                              <span className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400">{run.triggeredBy}</span>
                            </div>
                            {run.error && <div className="mt-2 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded truncate">{run.error}</div>}
                          </div>
                        ))}
                        {mockRuns.filter(r => r.jobName === selectedJob.name).length === 0 && (
                          <div className="p-4 text-center text-gray-500 text-sm">No recent executions</div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700 flex items-center gap-2">
                      <button onClick={() => { showNotification(`Cloning job "${selectedJob.name}"...`); setJobConfig({ ...jobConfig, name: `${selectedJob.name}-copy` }); handleEditJob({ ...selectedJob, name: `${selectedJob.name}-copy` }); }} className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg"><Icon name="copy" size={14} className="inline mr-1.5" />Clone</button>
                      <button onClick={() => handleDeleteJob(selectedJob)} className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg"><Icon name="trash2" size={14} className="inline mr-1.5" />Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Trigger Modal */}
            {showTriggerModal && jobToAction && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowTriggerModal(false)} />
                <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Trigger Job</h2>
                  <p className="text-gray-400 mb-4">Run <strong className="text-gray-200">{jobToAction.name}</strong> immediately?</p>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Execution Date</div>
                    <div className="text-sm">Now (manual trigger)</div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowTriggerModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                    <button onClick={confirmTrigger} className="px-4 py-2 text-sm bg-pink-600 hover:bg-pink-500 rounded-lg">Trigger Now</button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && jobToAction && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)} />
                <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 w-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Delete Job</h2>
                  <p className="text-gray-400 mb-4">Are you sure you want to delete <strong className="text-gray-200">{jobToAction.name}</strong>?</p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-sm text-red-300">This will remove all run history and cannot be recovered.</div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                    <button onClick={confirmDelete} className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 rounded-lg">Delete</button>
                  </div>
                </div>
              </div>
            )}
            </>)}

            {/* RUNS TAB */}
            {activeTab === 'runs' && (
              <div className="flex gap-6">
                {/* Run List */}
                <div className="flex-1">
                  {/* Filter Pills and Search */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-2 p-2 bg-gray-800/30 border border-gray-700 rounded-lg">
                      {[
                        { id: 'all', label: 'All', count: mockRuns.length },
                        { id: 'success', label: 'Success', count: mockRuns.filter(r => r.status === 'success').length },
                        { id: 'failed', label: 'Failed', count: mockRuns.filter(r => r.status === 'failed').length },
                        { id: 'running', label: 'Running', count: mockRuns.filter(r => r.status === 'running').length }
                      ].map(cat => (
                        <button key={cat.id} onClick={() => setRunsFilter(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${runsFilter === cat.id ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                          {cat.label}
                          <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium ${runsFilter === cat.id ? 'bg-pink-500/30 text-pink-200' : 'bg-gray-700 text-gray-300'}`}>{cat.count}</span>
                        </button>
                      ))}
                    </div>
                    <div className="relative flex-1 max-w-xs">
                      <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input type="text" placeholder="Search runs..." value={runsSearch} onChange={e => setRunsSearch(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-pink-500" />
                    </div>
                    <span className="text-sm text-gray-500">{mockRuns.filter(r => (runsFilter === 'all' || r.status === runsFilter) && (runsSearch === '' || r.jobName.toLowerCase().includes(runsSearch.toLowerCase()) || r.id.includes(runsSearch))).length} runs</span>
                  </div>

                  {/* Run History List */}
                  <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden max-h-[600px] overflow-y-auto">
                    <div className="divide-y divide-gray-700/50">
                      {mockRuns.filter(r => (runsFilter === 'all' || r.status === runsFilter) && (runsSearch === '' || r.jobName.toLowerCase().includes(runsSearch.toLowerCase()) || r.id.includes(runsSearch))).slice(0, 100).map(run => (
                        <button key={run.id} onClick={() => setSelectedRun(run)} className={`w-full p-4 hover:bg-gray-800/30 text-left transition-colors ${selectedRun?.id === run.id ? 'bg-pink-500/10 border-l-2 border-pink-500' : ''}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <StatusBadge status={run.status} size="sm" />
                              <span className="font-medium">{run.jobName}</span>
                              <span className="text-xs text-gray-500">#{run.id}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span><Icon name="clock" size={12} className="inline mr-1" />{run.duration}</span>
                              <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">{run.triggeredBy}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-xs text-gray-500">{run.startTime}</span>
                            {run.error && (
                              <div className="flex-1 text-red-400 text-xs bg-red-500/10 px-2 py-1 rounded truncate"><Icon name="alert-circle" size={12} className="inline mr-1" />{run.error}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Run Details Panel */}
                {selectedRun && (
                  <div className="w-[450px] bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={selectedRun.status} size="sm" />
                        <span className="font-medium">{selectedRun.jobName}</span>
                      </div>
                      <button onClick={() => setSelectedRun(null)} className="p-1 hover:bg-gray-700 rounded"><Icon name="x" size={16} /></button>
                    </div>
                    <div className="p-4 space-y-4 max-h-[550px] overflow-y-auto">
                      {/* Run Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><div className="text-gray-500 text-xs mb-1">Run ID</div><div className="font-mono text-gray-300">{selectedRun.id}</div></div>
                        <div><div className="text-gray-500 text-xs mb-1">Duration</div><div className="text-gray-300">{selectedRun.duration}</div></div>
                        <div><div className="text-gray-500 text-xs mb-1">Started</div><div className="text-gray-300">{selectedRun.startTime}</div></div>
                        <div><div className="text-gray-500 text-xs mb-1">Triggered By</div><div className="text-gray-300">{selectedRun.triggeredBy}</div></div>
                      </div>
                      {selectedRun.error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                          <div className="text-red-400 text-sm font-medium flex items-center gap-2"><Icon name="alert-circle" size={14} />Error</div>
                          <div className="text-red-300 text-sm mt-1">{selectedRun.error}</div>
                        </div>
                      )}
                      {/* Steps */}
                      <div>
                        <div className="text-gray-400 text-sm font-medium mb-2">Steps</div>
                        <div className="space-y-2">
                          {selectedRun.steps.map((step, i) => (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                              <button onClick={() => setRunLogExpanded(runLogExpanded === `${selectedRun.id}-${i}` ? null : `${selectedRun.id}-${i}`)} className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-700/30">
                                <div className="flex items-center gap-2">
                                  <Icon name={step.status === 'success' ? 'check-circle' : step.status === 'failed' ? 'x-circle' : 'loader'} size={14} className={step.status === 'success' ? 'text-emerald-400' : step.status === 'failed' ? 'text-red-400' : 'text-blue-400 animate-spin'} />
                                  <span className="text-sm font-medium">{step.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{step.duration}</span>
                                  <Icon name={runLogExpanded === `${selectedRun.id}-${i}` ? 'chevron-up' : 'chevron-down'} size={14} />
                                </div>
                              </button>
                              {runLogExpanded === `${selectedRun.id}-${i}` && (
                                <div className="border-t border-gray-700 p-3 bg-gray-900/50">
                                  <div className="text-xs text-gray-500 mb-2">Logs</div>
                                  <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap bg-black/30 p-2 rounded">{step.logs}</pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="flex gap-6">
                {/* Settings Sidebar */}
                <div className="w-48 space-y-1">
                  {[
                    { id: 'connections', label: 'Connections', icon: 'database' },
                    { id: 'variables', label: 'Variables', icon: 'tag' },
                    { id: 'notifications', label: 'Notifications', icon: 'bell' },
                    { id: 'cost', label: 'Cost Management', icon: 'dollar-sign' },
                  ].map(item => (
                    <button key={item.id} onClick={() => showNotification(`Showing ${item.label} settings...`)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm ${item.id === 'connections' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                      <Icon name={item.icon} size={16} />{item.label}
                    </button>
                  ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                  {/* Connections Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div><h2 className="text-lg font-semibold">Connections</h2><p className="text-sm text-gray-500">Manage Airflow connections for your jobs</p></div>
                    <button onClick={() => showNotification('Opening connection wizard...')} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-3 py-1.5 rounded-lg text-sm"><Icon name="plus" size={14} />Add Connection</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {mockConnections.map(conn => (
                      <div key={conn.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${conn.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              <Icon name="database" size={18} />
                            </div>
                            <div>
                              <div className="font-medium">{conn.name}</div>
                              <div className="text-xs text-gray-500">{conn.type}</div>
                            </div>
                          </div>
                          <StatusBadge status={conn.status} size="sm" />
                        </div>
                        <div className="text-xs text-gray-400 mb-3 font-mono bg-gray-900 px-2 py-1 rounded truncate">{conn.host}</div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Tested {conn.lastTested}</span>
                          <button onClick={() => showNotification(`Editing connection "${conn.name}"...`)} className="text-pink-400 hover:text-pink-300">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Variables Section */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <div><h2 className="text-lg font-semibold">Variables</h2><p className="text-sm text-gray-500">Environment variables for your jobs</p></div>
                      <button onClick={() => showNotification('Opening variable editor...')} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-sm"><Icon name="plus" size={14} />Add Variable</button>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead><tr className="border-b border-gray-700">
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Key</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Value</th>
                          <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Description</th>
                          <th className="px-4 py-3"></th>
                        </tr></thead>
                        <tbody>
                          {mockVariables.map((v, i) => (
                            <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                              <td className="px-4 py-3"><code className="text-sm text-pink-300">{v.key}</code></td>
                              <td className="px-4 py-3"><code className="text-sm text-gray-300">{v.encrypted ? <span className="flex items-center gap-1"><Icon name="lock" size={12} />{v.value}</span> : v.value}</code></td>
                              <td className="px-4 py-3 text-sm text-gray-400">{v.description}</td>
                              <td className="px-4 py-3"><button onClick={() => showNotification(`Editing variable "${v.key}"...`)} className="text-gray-400 hover:text-gray-200"><Icon name="edit" size={14} /></button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Cost Management Section */}
                  <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">Cost Management</h2>
                    <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-5 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Migration Savings vs Control-M</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-emerald-400">${(platformCosts.legacyCost - platformCosts.rosie.total).toLocaleString()}/mo</span>
                            <span className="text-sm text-gray-500">saved</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Control-M Legacy</div>
                          <div className="text-lg text-gray-400 line-through">${platformCosts.legacyCost.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">ROSIE Platform</div>
                          <div className="text-lg text-emerald-400">${platformCosts.rosie.total.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-sm font-medium mb-3">Cost by Platform</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between"><span className="text-sm text-gray-400">Step Functions</span><span className="text-sm text-cyan-400">${platformCosts.rosie.breakdown.eventbridge_scheduler}</span></div>
                          <div className="flex items-center justify-between"><span className="text-sm text-gray-400">MWAA (Airflow)</span><span className="text-sm text-fuchsia-400">${platformCosts.rosie.breakdown.mwaa}</span></div>
                          <div className="flex items-center justify-between"><span className="text-sm text-gray-400">AWS Batch</span><span className="text-sm text-amber-400">${platformCosts.rosie.breakdown.batch}</span></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <h3 className="text-sm font-medium mb-3">Top Cost Jobs</h3>
                        <div className="space-y-2">
                          {mockJobs.slice(0, 3).sort((a, b) => parseFloat(b.estimatedCost.replace('$', '')) - parseFloat(a.estimatedCost.replace('$', ''))).map((job, i) => (
                            <div key={i} className="flex items-center justify-between"><span className="text-sm text-gray-400">{job.name}</span><span className="text-sm text-emerald-400">{job.estimatedCost}/run</span></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AIRFLOW TAB */}
            {activeTab === 'airflow' && (
              <div>
                {/* MWAA Environment Info */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center"><Icon name="git-branch" size={24} className="text-fuchsia-400" /></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">MWAA Environment</h3>
                      <p className="text-gray-400 text-sm mt-1">mwaa-rosie-prod.us-east-1.amazonaws.com</p>
                      <div className="flex items-center gap-4 mt-4">
                        <button onClick={() => showNotification('Opening Airflow UI in new tab...')} className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 rounded-lg text-sm font-medium"><Icon name="external-link" size={16} />Open Airflow UI</button>
                        <span className="text-sm text-gray-500">Opens in new tab with SSO authentication</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Access Level */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2"><Icon name="users" size={16} />Your Access Level</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-medium text-gray-900">LA</div>
                      <div><div className="font-medium">Luke Angel</div><div className="text-sm text-gray-500">luke.angel@company.com</div></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full border border-violet-500/30">platform-admins</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30">loans-origination-developers</span>
                    </div>
                  </div>
                </div>

                {/* Permission Matrix */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-gray-700"><h3 className="text-sm font-medium text-gray-400 flex items-center gap-2"><Icon name="lock" size={16} />Permission Matrix</h3></div>
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-700 bg-gray-800/50">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Role</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">View DAGs</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Trigger</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Edit</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Delete</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Admin</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { role: 'Viewers', view: true, trigger: false, edit: false, del: false, admin: false },
                        { role: 'Developers', view: true, trigger: true, edit: true, del: false, admin: false },
                        { role: 'Team Admins', view: true, trigger: true, edit: true, del: true, admin: false },
                        { role: 'Platform Admins', view: true, trigger: true, edit: true, del: true, admin: true },
                        { role: 'Auditors', view: true, trigger: false, edit: false, del: false, admin: false },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-700/50">
                          <td className="px-4 py-3 text-sm font-medium">{row.role}</td>
                          <td className="px-4 py-3 text-center">{row.view ? <Icon name="check" size={16} className="text-emerald-400 mx-auto" /> : <Icon name="x" size={16} className="text-gray-600 mx-auto" />}</td>
                          <td className="px-4 py-3 text-center">{row.trigger ? <Icon name="check" size={16} className="text-emerald-400 mx-auto" /> : <Icon name="x" size={16} className="text-gray-600 mx-auto" />}</td>
                          <td className="px-4 py-3 text-center">{row.edit ? <Icon name="check" size={16} className="text-emerald-400 mx-auto" /> : <Icon name="x" size={16} className="text-gray-600 mx-auto" />}</td>
                          <td className="px-4 py-3 text-center">{row.del ? <Icon name="check" size={16} className="text-emerald-400 mx-auto" /> : <Icon name="x" size={16} className="text-gray-600 mx-auto" />}</td>
                          <td className="px-4 py-3 text-center">{row.admin ? <Icon name="check" size={16} className="text-emerald-400 mx-auto" /> : <Icon name="x" size={16} className="text-gray-600 mx-auto" />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Diagnostics Panel */}
            {showDiagnostics && (
              <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowDiagnostics(false)} />
                <div className="relative w-96 bg-gray-900 border-l border-gray-700 overflow-auto flex flex-col">
                  <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Icon name="wrench" size={20} className="text-amber-400" /></div>
                      <div><div className="font-semibold">Diagnostics</div><div className="text-sm text-gray-500">Platform Health</div></div>
                    </div>
                    <button onClick={() => setShowDiagnostics(false)} className="p-2 hover:bg-gray-800 rounded-lg"><Icon name="x" size={18} className="text-gray-400" /></button>
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    {/* Health Checks */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Icon name="activity" size={14} />Health Checks</h4>
                      <div className="space-y-2">
                        {[
                          { name: 'MWAA Environment', status: 'healthy', detail: 'All workers healthy' },
                          { name: 'Step Functions', status: 'healthy', detail: '3 state machines active' },
                          { name: 'IAM Permissions', status: 'healthy', detail: 'Cross-account roles valid' },
                          { name: 'Bank API Connection', status: 'warning', detail: 'High latency detected (2.3s)' },
                          { name: 'S3 DAG Bucket', status: 'healthy', detail: 'Sync operational' },
                        ].map((check, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${check.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                              <div><div className="text-sm font-medium">{check.name}</div><div className="text-xs text-gray-500">{check.detail}</div></div>
                            </div>
                            {check.status === 'warning' && <button onClick={() => showNotification('Running fix for ' + check.name + '...')} className="text-xs text-amber-400 hover:text-amber-300">Fix</button>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Issues */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Icon name="alert-circle" size={14} />Recent Issues</h4>
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Icon name="x-circle" size={16} className="text-red-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-red-300">payments-reconciliation failed</div>
                            <div className="text-xs text-gray-400 mt-1">Bank API timeout on fetch_transactions</div>
                            <div className="flex items-center gap-2 mt-2">
                              <button onClick={() => showNotification('Opening logs...')} className="text-xs text-violet-400 hover:text-violet-300">View Logs</button>
                              <span className="text-gray-600">•</span>
                              <button onClick={() => showNotification('Retrying job...')} className="text-xs text-violet-400 hover:text-violet-300">Retry</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2"><Icon name="zap" size={14} />Recommendations</h4>
                      <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Icon name="sparkles" size={16} className="text-violet-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-violet-300">Optimize month-end-reporting</div>
                            <div className="text-xs text-gray-400 mt-1">Consider parallelizing tasks 3-7 to reduce runtime by ~40%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-700">
                    <button onClick={() => showNotification('Running full diagnostics...')} className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-medium"><Icon name="wrench" size={16} />Run Full Diagnostics</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      };

      return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
          {/* Notification Toast */}
          {notification && (
            <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-emerald-600' : notification.type === 'warning' ? 'bg-amber-600' : notification.type === 'error' ? 'bg-red-600' : 'bg-gray-700'
            }`}>
              <Icon name={notification.type === 'success' ? 'check-circle' : notification.type === 'warning' ? 'alert-triangle' : notification.type === 'error' ? 'x-circle' : 'bell'} size={16} />
              <span className="text-sm">{notification.message}</span>
            </div>
          )}

          <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">M</div>
                <div><div className="font-semibold">MIA</div><div className="text-xs text-gray-500">Make Infrastructure Awesome</div></div>
              </div>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveNav(item.id); setShowNewJob(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${activeNav === item.id ? `bg-${item.color}-500/20 text-${item.color}-300 border border-${item.color}-500/30` : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Icon name={item.icon} size={18} />
                  <div className="flex-1"><div className="text-sm font-medium">{item.label}</div>{item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}</div>
                  {activeNav === item.id && <Icon name="chevron-right" size={16} className={`text-${item.color}-400`} />}
                </button>
              ))}
            </nav>
            <div className="p-3 border-t border-gray-800">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-medium text-gray-900">LA</div>
                <div className="flex-1"><div className="text-sm font-medium">Luke Angel</div><div className="text-xs text-gray-500">Platform PM</div></div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Icon name={navItems.find(n => n.id === activeNav)?.icon || 'home'} size={20} className={`text-${navItems.find(n => n.id === activeNav)?.color || 'violet'}-400`} />
                  <span className="font-semibold">{navItems.find(n => n.id === activeNav)?.label}</span>
                  {navItems.find(n => n.id === activeNav)?.subtitle && <span className="text-gray-500">/ {navItems.find(n => n.id === activeNav)?.subtitle}</span>}
                </div>
                {activeNav !== 'home' && (
                  <button onClick={() => {
                    if (activeNav === 'mom') { setNewMomData({ name: '', type: 'ec2', size: '', region: 'us-east-1', owner: '', description: '' }); setShowNewMomResource(true); }
                    else if (activeNav === 'uncle') { setNewDatastoreData({ name: '', type: 'aurora', engine: '', region: 'us-east-1', owner: '', description: '' }); setShowNewDatastore(true); }
                    else if (activeNav === 'dad') {
                      if (dadActiveTab === 'resources') { setCreatingResource(true); setNewResourceType('service'); setNewResourceData({ name: '', namespace: 'default' }); }
                      else if (dadActiveTab === 'security') { setCreatingResource(true); setNewResourceType('authpolicy'); setNewResourceData({ name: '', namespace: 'default' }); }
                      else if (dadActiveTab === 'certs') showNotification('Creating new Certificate...');
                      else if (dadActiveTab === 'wasm') showNotification('Creating new WASM Plugin...');
                      else if (dadActiveTab === 'lua') showNotification('Creating new Lua Filter...');
                    }
                    else if (activeNav === 'auntie') { setEditingMessaging(null); setNewMessagingData({ name: '', type: 'sqs', zone: 'local', description: '' }); setShowNewMessaging(true); }
                    else if (activeNav === 'rosie') { setEditingJob(null); setSelectedNode(null); setOperatorCategory('all'); setJobConfig({ name: '', description: '', scheduleType: 'cron', cronExpression: '0 2 * * *', rateValue: '5', rateUnit: 'minutes', timezone: 'America/New_York', target: 'eventbridge', retries: 3, flexibleWindow: '15', tags: [] }); setWorkflowNodes([{ id: 1, type: 's3', name: 'Wait for S3 File', color: 'blue', config: { bucket: '', prefix: '', wildcard: '*.csv' } }, { id: 2, type: 'glue', name: 'Transform Data', color: 'amber', config: { job_name: '', allocated_capacity: 2 } }, { id: 3, type: 'aurora', name: 'Load to DW', color: 'emerald', config: { connection: '', schema: '', table: '' } }]); setShowNewJob(true); }
                    else if (activeNav === 'bro') { setNewNetworkData({ name: '', type: 'vpc', cidr: '', region: 'us-east-1', owner: '', description: '' }); setShowNewNetworkResource(true); }
                  }} className={`flex items-center gap-1.5 bg-${navItems.find(n => n.id === activeNav)?.color || 'violet'}-600 hover:bg-${navItems.find(n => n.id === activeNav)?.color || 'violet'}-500 px-3 py-1.5 rounded-lg text-sm font-medium`}><Icon name="plus" size={16} />New</button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" placeholder="Search..." className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-violet-500" />
                </div>
                <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-gray-800 rounded-lg" title="Settings"><Icon name="settings" size={18} className="text-gray-400" /></button>
              </div>
            </header>
            <div className="flex-1 overflow-auto">
              {activeNav === 'home' && <HomeView />}
              {activeNav === 'mom' && <MOMView />}
              {activeNav === 'uncle' && <UNCLEView />}
              {activeNav === 'dad' && <DADView />}
              {activeNav === 'auntie' && <AUNTIEView />}
              {activeNav === 'rosie' && <ROSIEView />}
              {activeNav === 'bro' && <BROView />}
            </div>
          </div>

          {/* D.A.D. Service Full-Screen Editor */}
          <ServiceEditor />

          {/* Global Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowSettings(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-5 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <Icon name="settings" size={20} className="text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Global Settings</h2>
                      <p className="text-sm text-gray-400">Configure MIA features and preferences</p>
                    </div>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-800 rounded-lg"><Icon name="x" size={20} /></button>
                </div>
                <div className="p-5 overflow-y-auto space-y-6">
                  {/* Dashboard Modules */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2"><Icon name="layout" size={16} className="text-violet-400" />Dashboard Modules</h3>
                    <div className="space-y-2">
                      {[
                        { key: 'mom', label: 'M.O.M.', desc: 'Multi-Cloud Orchestration Manager', icon: 'cloud', color: 'emerald' },
                        { key: 'uncle', label: 'U.N.C.L.E.', desc: 'Unified Notification & Communication Layer Engine', icon: 'bell', color: 'blue' },
                        { key: 'dad', label: 'D.A.D.', desc: 'Distributed Application Director', icon: 'shield', color: 'amber' },
                        { key: 'auntie', label: 'A.U.N.T.I.E.', desc: 'Advanced Unified Network Traffic Inspection Engine', icon: 'cpu', color: 'purple' },
                        { key: 'rosie', label: 'R.O.S.I.E.', desc: 'Routine Operations Scheduling & Integration Engine', icon: 'clock', color: 'rose' },
                        { key: 'bro', label: 'B.R.O.', desc: 'Backbone Routing Operations', icon: 'network', color: 'cyan' }
                      ].map(mod => (
                        <div key={mod.key} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-${mod.color}-500/20 flex items-center justify-center`}>
                              <Icon name={mod.icon} size={16} className={`text-${mod.color}-400`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{mod.label}</div>
                              <div className="text-xs text-gray-500">{mod.desc}</div>
                            </div>
                          </div>
                          <button onClick={() => setFeatureFlags({...featureFlags, [mod.key]: !featureFlags[mod.key]})}
                            className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags[mod.key] ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags[mod.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* General Settings */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2"><Icon name="sliders" size={16} className="text-violet-400" />General Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div>
                          <div className="text-sm font-medium">Dark Mode</div>
                          <div className="text-xs text-gray-500">Use dark theme across the application</div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, darkMode: !featureFlags.darkMode})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.darkMode ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div>
                          <div className="text-sm font-medium">Notifications</div>
                          <div className="text-xs text-gray-500">Show system notifications and alerts</div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, notifications: !featureFlags.notifications})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.notifications ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div>
                          <div className="text-sm font-medium">Auto Refresh</div>
                          <div className="text-xs text-gray-500">Automatically refresh data every 30 seconds</div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, autoRefresh: !featureFlags.autoRefresh})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.autoRefresh ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.autoRefresh ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* D.A.D. Settings */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2"><Icon name="shield" size={16} className="text-amber-400" />D.A.D. Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <Icon name="shield" size={16} className="text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Security Tab</div>
                            <div className="text-xs text-gray-500">Show Security policies in D.A.D. dashboard</div>
                          </div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, dadSecurity: !featureFlags.dadSecurity})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.dadSecurity ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.dadSecurity ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <Icon name="lock" size={16} className="text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Certificates Tab</div>
                            <div className="text-xs text-gray-500">Show Certificates management in D.A.D. dashboard</div>
                          </div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, dadCertificates: !featureFlags.dadCertificates})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.dadCertificates ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.dadCertificates ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <Icon name="code" size={16} className="text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Lua Filters</div>
                            <div className="text-xs text-gray-500">Enable Lua filter support (legacy)</div>
                          </div>
                        </div>
                        <button onClick={() => setFeatureFlags({...featureFlags, dadLua: !featureFlags.dadLua})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${featureFlags.dadLua ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${featureFlags.dadLua ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
                  <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg">Close</button>
                  <button onClick={() => { showNotification('Settings saved!', 'success'); setShowSettings(false); }} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* New MOM Resource Modal */}
          {showNewMomResource && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowNewMomResource(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                  <h2 className="text-lg font-semibold">Create New Resource</h2>
                  <button onClick={() => setShowNewMomResource(false)} className="p-1 hover:bg-gray-800 rounded-lg"><Icon name="x" size={18} /></button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Resource Name</label>
                    <input type="text" value={newMomData.name} onChange={e => setNewMomData({...newMomData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" placeholder="my-resource" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Resource Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'ec2', label: 'EC2', icon: 'monitor', color: 'cyan' },
                        { id: 'lambda', label: 'Lambda', icon: 'cloud-lightning', color: 'amber' },
                        { id: 'ecs', label: 'ECS', icon: 'server', color: 'orange' },
                        { id: 'apigateway', label: 'API GW', icon: 'globe', color: 'pink' },
                        { id: 'pipe', label: 'Pipe', icon: 'git-merge', color: 'teal' },
                        { id: 'emr', label: 'EMR', icon: 'activity', color: 'purple' }
                      ].map(t => (
                        <button key={t.id} onClick={() => setNewMomData({...newMomData, type: t.id})} className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border ${newMomData.type === t.id ? `border-${t.color}-500 bg-${t.color}-500/10` : 'border-gray-700 hover:border-gray-600'}`}>
                          <Icon name={t.icon} size={20} className={newMomData.type === t.id ? `text-${t.color}-400` : 'text-gray-400'} />
                          <span className={`text-xs ${newMomData.type === t.id ? `text-${t.color}-300` : 'text-gray-400'}`}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {newMomData.type === 'ec2' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Instance Type</label>
                        <select value={newMomData.instanceType || 't3.medium'} onChange={e => setNewMomData({...newMomData, instanceType: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="t3.micro">t3.micro</option>
                          <option value="t3.small">t3.small</option>
                          <option value="t3.medium">t3.medium</option>
                          <option value="t3.large">t3.large</option>
                          <option value="m5.large">m5.large</option>
                          <option value="m5.xlarge">m5.xlarge</option>
                          <option value="c5.large">c5.large</option>
                          <option value="r5.large">r5.large</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Storage (GB)</label>
                        <input type="number" value={newMomData.storage || '100'} onChange={e => setNewMomData({...newMomData, storage: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" />
                      </div>
                    </div>
                  )}
                  {newMomData.type === 'lambda' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Runtime</label>
                        <select value={newMomData.runtime || 'Python 3.11'} onChange={e => setNewMomData({...newMomData, runtime: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="Python 3.11">Python 3.11</option>
                          <option value="Python 3.12">Python 3.12</option>
                          <option value="Node.js 18.x">Node.js 18.x</option>
                          <option value="Node.js 20.x">Node.js 20.x</option>
                          <option value="Java 17">Java 17</option>
                          <option value="Go 1.x">Go 1.x</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Memory (MB)</label>
                        <select value={newMomData.memory || '512 MB'} onChange={e => setNewMomData({...newMomData, memory: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="128 MB">128 MB</option>
                          <option value="256 MB">256 MB</option>
                          <option value="512 MB">512 MB</option>
                          <option value="1024 MB">1024 MB</option>
                          <option value="2048 MB">2048 MB</option>
                          <option value="4096 MB">4096 MB</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {newMomData.type === 'ecs' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Launch Type</label>
                        <select value={newMomData.launchType || 'Fargate'} onChange={e => setNewMomData({...newMomData, launchType: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="Fargate">Fargate</option>
                          <option value="EC2">EC2</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Task Count</label>
                        <input type="number" value={newMomData.tasks || '2'} onChange={e => setNewMomData({...newMomData, tasks: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" min="1" />
                      </div>
                    </div>
                  )}
                  {newMomData.type === 'apigateway' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">API Type</label>
                        <select value={newMomData.apiType || 'HTTP'} onChange={e => setNewMomData({...newMomData, apiType: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="HTTP">HTTP API</option>
                          <option value="REST">REST API</option>
                          <option value="WebSocket">WebSocket</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Stage</label>
                        <input type="text" value={newMomData.stage || 'prod'} onChange={e => setNewMomData({...newMomData, stage: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" placeholder="prod" />
                      </div>
                    </div>
                  )}
                  {newMomData.type === 'pipe' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Source</label>
                        <select value={newMomData.source || 'SQS'} onChange={e => setNewMomData({...newMomData, source: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="SQS">SQS Queue</option>
                          <option value="DynamoDB Streams">DynamoDB Streams</option>
                          <option value="Kinesis">Kinesis Stream</option>
                          <option value="EventBridge">EventBridge</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Target</label>
                        <select value={newMomData.target || 'EventBridge'} onChange={e => setNewMomData({...newMomData, target: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="EventBridge">EventBridge</option>
                          <option value="Lambda">Lambda</option>
                          <option value="Kinesis">Kinesis</option>
                          <option value="S3">S3</option>
                          <option value="Step Functions">Step Functions</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1.5 block">Enrichment</label>
                        <select value={newMomData.enrichment || 'None'} onChange={e => setNewMomData({...newMomData, enrichment: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                          <option value="None">None</option>
                          <option value="Lambda">Lambda Function</option>
                          <option value="API Gateway">API Gateway</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block">Region</label>
                      <select value={newMomData.region || 'us-east-1'} onChange={e => setNewMomData({...newMomData, region: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500">
                        <option value="us-east-1">us-east-1</option>
                        <option value="us-west-2">us-west-2</option>
                        <option value="eu-west-1">eu-west-1</option>
                        <option value="ap-southeast-1">ap-southeast-1</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1.5 block">Owner Team</label>
                      <input type="text" value={newMomData.owner || ''} onChange={e => setNewMomData({...newMomData, owner: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" placeholder="team-name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Description</label>
                    <textarea value={newMomData.description} onChange={e => setNewMomData({...newMomData, description: e.target.value})} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 resize-none" placeholder="What is this resource for?" />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700 flex-shrink-0">
                  <button onClick={() => setShowNewMomResource(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                  <button onClick={() => {
                    const newResource = {
                      id: Date.now(),
                      name: newMomData.name || 'new-resource',
                      type: newMomData.type,
                      status: 'provisioning',
                      region: newMomData.region,
                      owner: newMomData.owner || 'current-user',
                      created: new Date().toISOString().split('T')[0],
                      monthlyCost: '$0.00',
                      description: newMomData.description,
                      ...newMomData
                    };
                    setSavedMomResources([...savedMomResources, newResource]);
                    showNotification(`Resource "${newMomData.name || 'new-resource'}" created successfully`, 'success');
                    setShowNewMomResource(false);
                    setNewMomData({ name: '', type: 'ec2', size: '', region: 'us-east-1', owner: '', description: '' });
                  }} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-sm font-medium rounded-lg">Create Resource</button>
                </div>
              </div>
            </div>
          )}

          {/* New BRO Network Resource Modal */}
          {showNewNetworkResource && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowNewNetworkResource(false)}>
              <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                  <h2 className="text-lg font-semibold">Create Network Resource</h2>
                  <button onClick={() => setShowNewNetworkResource(false)} className="p-1 hover:bg-gray-800 rounded-lg"><Icon name="x" size={18} /></button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Resource Name</label>
                    <input type="text" value={newNetworkData.name} onChange={e => setNewNetworkData({...newNetworkData, name: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g., production-vpc" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Resource Type</label>
                    <select value={newNetworkData.type} onChange={e => setNewNetworkData({...newNetworkData, type: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                      <option value="vpc">VPC</option>
                      <option value="tgw">Transit Gateway</option>
                      <option value="vpn">VPN Connection</option>
                      <option value="directconnect">Direct Connect</option>
                      <option value="route53">Route 53 Hosted Zone</option>
                      <option value="peering">VPC Peering</option>
                      <option value="privatelink">PrivateLink Endpoint</option>
                    </select>
                  </div>
                  {newNetworkData.type === 'vpc' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">CIDR Block</label>
                        <input type="text" value={newNetworkData.cidr || ''} onChange={e => setNewNetworkData({...newNetworkData, cidr: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="e.g., 10.0.0.0/16" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Subnets</label>
                          <input type="number" value={newNetworkData.subnets || ''} onChange={e => setNewNetworkData({...newNetworkData, subnets: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="6" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Flow Logs</label>
                          <select value={newNetworkData.flowLogs || 'true'} onChange={e => setNewNetworkData({...newNetworkData, flowLogs: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  {newNetworkData.type === 'tgw' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bandwidth</label>
                        <input type="text" value={newNetworkData.bandwidth || ''} onChange={e => setNewNetworkData({...newNetworkData, bandwidth: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="50 Gbps" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Route Tables</label>
                        <input type="number" value={newNetworkData.routeTables || ''} onChange={e => setNewNetworkData({...newNetworkData, routeTables: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="3" />
                      </div>
                    </div>
                  )}
                  {newNetworkData.type === 'vpn' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Remote IP</label>
                          <input type="text" value={newNetworkData.remoteIp || ''} onChange={e => setNewNetworkData({...newNetworkData, remoteIp: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="203.0.113.10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Encryption</label>
                          <select value={newNetworkData.encryption || 'AES-256'} onChange={e => setNewNetworkData({...newNetworkData, encryption: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                            <option value="AES-256">AES-256</option>
                            <option value="AES-256-GCM">AES-256-GCM</option>
                            <option value="AES-128">AES-128</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Local CIDR</label>
                          <input type="text" value={newNetworkData.localCidr || ''} onChange={e => setNewNetworkData({...newNetworkData, localCidr: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="10.0.0.0/8" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Remote CIDR</label>
                          <input type="text" value={newNetworkData.remoteCidr || ''} onChange={e => setNewNetworkData({...newNetworkData, remoteCidr: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="172.16.0.0/12" />
                        </div>
                      </div>
                    </>
                  )}
                  {newNetworkData.type === 'directconnect' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Connection Speed</label>
                        <select value={newNetworkData.connection || '10 Gbps'} onChange={e => setNewNetworkData({...newNetworkData, connection: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                          <option value="1 Gbps">1 Gbps</option>
                          <option value="10 Gbps">10 Gbps</option>
                          <option value="100 Gbps">100 Gbps</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                        <input type="text" value={newNetworkData.location || ''} onChange={e => setNewNetworkData({...newNetworkData, location: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="Equinix DC6" />
                      </div>
                    </div>
                  )}
                  {newNetworkData.type === 'route53' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Domain Name</label>
                        <input type="text" value={newNetworkData.domain || ''} onChange={e => setNewNetworkData({...newNetworkData, domain: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Zone Type</label>
                        <select value={newNetworkData.zoneType || 'public'} onChange={e => setNewNetworkData({...newNetworkData, zoneType: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {newNetworkData.type === 'peering' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Requester VPC</label>
                        <input type="text" value={newNetworkData.requester || ''} onChange={e => setNewNetworkData({...newNetworkData, requester: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="prod-vpc" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Accepter VPC</label>
                        <input type="text" value={newNetworkData.accepter || ''} onChange={e => setNewNetworkData({...newNetworkData, accepter: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="shared-vpc" />
                      </div>
                    </div>
                  )}
                  {newNetworkData.type === 'privatelink' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Endpoint Type</label>
                          <select value={newNetworkData.endpointType || 'Interface'} onChange={e => setNewNetworkData({...newNetworkData, endpointType: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500">
                            <option value="Interface">Interface</option>
                            <option value="Gateway">Gateway</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Target VPC</label>
                          <input type="text" value={newNetworkData.vpc || ''} onChange={e => setNewNetworkData({...newNetworkData, vpc: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" placeholder="prod-vpc" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Service Name</label>
                        <input type="text" value={newNetworkData.service || ''} onChange={e => setNewNetworkData({...newNetworkData, service: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" placeholder="com.amazonaws.us-east-1.s3" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Subnets</label>
                          <input type="number" value={newNetworkData.subnets || ''} onChange={e => setNewNetworkData({...newNetworkData, subnets: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" placeholder="3" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Private DNS</label>
                          <select value={newNetworkData.privateDns || 'true'} onChange={e => setNewNetworkData({...newNetworkData, privateDns: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500">
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Region</label>
                    <select value={newNetworkData.region} onChange={e => setNewNetworkData({...newNetworkData, region: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500">
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                      <option value="eu-west-1">EU (Ireland)</option>
                      <option value="global">Global</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Owner</label>
                    <input type="text" value={newNetworkData.owner} onChange={e => setNewNetworkData({...newNetworkData, owner: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" placeholder="platform-ops" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea value={newNetworkData.description} onChange={e => setNewNetworkData({...newNetworkData, description: e.target.value})} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 resize-none" rows={3} placeholder="Describe the purpose of this network resource..." />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700 flex-shrink-0">
                  <button onClick={() => setShowNewNetworkResource(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
                  <button onClick={() => { showNotification(`Network resource "${newNetworkData.name || 'new-resource'}" created successfully`, 'success'); setShowNewNetworkResource(false); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-sm font-medium rounded-lg">Create Resource</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  