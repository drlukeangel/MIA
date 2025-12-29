import React, { useState } from 'react';
import {
  Calendar, Clock, Play, Save, GitBranch, Layout, Code, Settings, ChevronRight, Check,
  AlertCircle, Plus, Trash2, ArrowRight, Zap, Database, FileText, Bell, RefreshCw,
  Home, Layers, MessageSquare, Shield, Box, MoreHorizontal, User, Search, HelpCircle,
  Server, HardDrive, Cpu, Globe, Lock, Key, Network, Radio, Mail, Activity,
  CheckCircle, XCircle, Pause, ExternalLink, CloudLightning, Workflow, ArrowLeftRight,
  Filter, BarChart3, TrendingUp, Users, Folder, Link2, AlertTriangle, Eye, Terminal,
  Copy, Plug, X, ChevronDown, ChevronUp, Download, Edit2, Tag, Timer, DollarSign,
  Wrench, Bug, Lightbulb, ChevronLeft, RotateCcw, Loader2, CircleDot, Info, Sparkles,
  CheckCircle2
} from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================

const mockJobs = [
  { id: 1, name: 'loan-etl-daily', type: 'dag', target: 'mwaa', schedule: '0 2 * * *', scheduleHuman: 'Daily at 2:00 AM EST', status: 'active', lastRun: '2 hours ago', lastRunStatus: 'success', nextRun: 'Tomorrow 2:00 AM', owner: 'loans-origination', tags: ['loans', 'etl', 'production'], successRate: 98.5, avgDuration: '45m 23s', estimatedCost: '$2.45/mo', taskCount: 4, description: 'Daily ETL pipeline for loan origination data warehouse refresh' },
  { id: 2, name: 'db-backup-nightly', type: 'schedule', target: 'eventbridge', schedule: '0 3 * * *', scheduleHuman: 'Daily at 3:00 AM EST', status: 'active', lastRun: '5 hours ago', lastRunStatus: 'success', nextRun: 'Tomorrow 3:00 AM', owner: 'platform-dba', tags: ['backup', 'database', 'critical'], successRate: 100, avgDuration: '12m 08s', estimatedCost: '$0.15/mo', taskCount: 1, description: 'Nightly PostgreSQL backup to S3 with point-in-time recovery' },
  { id: 3, name: 'cache-invalidation', type: 'schedule', target: 'eventbridge', schedule: 'rate(1 hour)', scheduleHuman: 'Every hour', status: 'active', lastRun: '23 min ago', lastRunStatus: 'success', nextRun: 'In 37 minutes', owner: 'platform-cache', tags: ['cache', 'redis', 'maintenance'], successRate: 99.8, avgDuration: '8s', estimatedCost: '$0.02/mo', taskCount: 1, description: 'Hourly cache invalidation for product catalog updates' },
  { id: 4, name: 'month-end-reporting', type: 'dag', target: 'mwaa', schedule: '0 6 1 * *', scheduleHuman: '1st of month at 6:00 AM EST', status: 'paused', lastRun: '29 days ago', lastRunStatus: 'success', nextRun: 'Jan 1, 6:00 AM', owner: 'finance-reporting', tags: ['finance', 'sox', 'reporting', 'cross-bto'], successRate: 95.2, avgDuration: '2h 15m', estimatedCost: '$8.50/mo', taskCount: 12, description: 'Cross-BTO month-end financial reporting and reconciliation' },
  { id: 5, name: 'payments-reconciliation', type: 'dag', target: 'mwaa', schedule: '0 4 * * *', scheduleHuman: 'Daily at 4:00 AM EST', status: 'active', lastRun: '4 hours ago', lastRunStatus: 'failed', nextRun: 'Tomorrow 4:00 AM', owner: 'payments-gateway', tags: ['payments', 'reconciliation', 'critical'], successRate: 94.1, avgDuration: '1h 05m', estimatedCost: '$4.20/mo', taskCount: 8, description: 'Daily payment gateway reconciliation with bank feeds' },
];

const mockRuns = [
  { id: 'run-001', jobName: 'loan-etl-daily', status: 'success', startTime: '2024-12-23 02:00:05', duration: '44m 12s', triggeredBy: 'schedule', tasks: { total: 4, success: 4, failed: 0 } },
  { id: 'run-002', jobName: 'payments-reconciliation', status: 'failed', startTime: '2024-12-23 04:00:02', duration: '32m 45s', triggeredBy: 'schedule', tasks: { total: 8, success: 5, failed: 3 }, error: 'Bank API timeout on task: fetch_transactions' },
  { id: 'run-003', jobName: 'db-backup-nightly', status: 'success', startTime: '2024-12-23 03:00:01', duration: '11m 58s', triggeredBy: 'schedule', tasks: { total: 1, success: 1, failed: 0 } },
  { id: 'run-004', jobName: 'cache-invalidation', status: 'success', startTime: '2024-12-23 10:00:00', duration: '7s', triggeredBy: 'schedule', tasks: { total: 1, success: 1, failed: 0 } },
  { id: 'run-005', jobName: 'loan-etl-daily', status: 'success', startTime: '2024-12-22 02:00:03', duration: '46m 05s', triggeredBy: 'schedule', tasks: { total: 4, success: 4, failed: 0 } },
  { id: 'run-006', jobName: 'loan-etl-daily', status: 'running', startTime: '2024-12-24 02:00:01', duration: '12m 34s...', triggeredBy: 'schedule', tasks: { total: 4, success: 2, failed: 0, running: 1, pending: 1 } },
];

const mockConnections = [
  { id: 'conn-1', name: 'aws_default', type: 'aws', host: 'us-east-1', status: 'active', lastTested: '2 hours ago' },
  { id: 'conn-2', name: 'postgres_prod', type: 'postgres', host: 'prod-db.internal:5432', status: 'active', lastTested: '1 hour ago' },
  { id: 'conn-3', name: 'redis_cache', type: 'redis', host: 'cache.internal:6379', status: 'active', lastTested: '30 min ago' },
  { id: 'conn-4', name: 's3_data_lake', type: 's3', host: 's3://company-data-lake', status: 'active', lastTested: '1 day ago' },
  { id: 'conn-5', name: 'bank_api', type: 'http', host: 'api.bankpartner.com', status: 'warning', lastTested: '6 hours ago' },
];

const mockVariables = [
  { key: 'ETL_BATCH_SIZE', value: '10000', encrypted: false, description: 'Number of records per batch' },
  { key: 'SLACK_WEBHOOK_URL', value: '********', encrypted: true, description: 'Slack alerts webhook' },
  { key: 'DATA_RETENTION_DAYS', value: '90', encrypted: false, description: 'S3 data retention policy' },
  { key: 'MAX_PARALLEL_TASKS', value: '16', encrypted: false, description: 'Max concurrent task instances' },
];

const mockInfraResources = [
  { id: 1, name: 'loan-service-db', type: 'rds', engine: 'PostgreSQL 15', status: 'available', size: 'db.r6g.large', region: 'us-east-1' },
  { id: 2, name: 'user-cache', type: 'elasticache', engine: 'Redis 7.0', status: 'available', size: 'cache.r6g.large', region: 'us-east-1' },
  { id: 3, name: 'order-processor', type: 'lambda', runtime: 'Python 3.11', status: 'active', memory: '1024 MB', region: 'us-east-1' },
  { id: 4, name: 'payment-api', type: 'ecs', image: 'payment-api:v2.3.1', status: 'running', tasks: '3/3', region: 'us-east-1' },
  { id: 5, name: 'analytics-cluster', type: 'emr', version: 'emr-6.10.0', status: 'waiting', nodes: '1 + 4', region: 'us-east-1' },
];

const mockServices = [
  { id: 1, name: 'loan-service', namespace: 'lending', mesh: true, mtls: 'strict', status: 'healthy', endpoints: 3, latency: '12ms' },
  { id: 2, name: 'user-service', namespace: 'identity', mesh: true, mtls: 'strict', status: 'healthy', endpoints: 2, latency: '8ms' },
  { id: 3, name: 'payment-gateway', namespace: 'payments', mesh: true, mtls: 'permissive', status: 'degraded', endpoints: 3, latency: '45ms' },
  { id: 4, name: 'notification-service', namespace: 'comms', mesh: true, mtls: 'strict', status: 'healthy', endpoints: 2, latency: '15ms' },
  { id: 5, name: 'legacy-adapter', namespace: 'integration', mesh: false, mtls: 'disabled', status: 'healthy', endpoints: 1, latency: '120ms' },
];

const mockMessaging = [
  { id: 1, name: 'order-events', type: 'sns', subscribers: 4, messagesDay: '45.2K', status: 'active', zone: 'local' },
  { id: 2, name: 'payment-queue', type: 'sqs', depth: 23, messagesDay: '12.8K', status: 'active', zone: 'local' },
  { id: 3, name: 'enterprise-bus', type: 'eventbridge', rules: 47, messagesDay: '892K', status: 'active', zone: 'central' },
  { id: 4, name: 'data-stream', type: 'kafka', partitions: 12, messagesDay: '2.4M', status: 'active', zone: 'central' },
  { id: 5, name: 'shipping-dlq', type: 'sqs', depth: 156, messagesDay: '0.3K', status: 'warning', zone: 'local' },
];

// ============================================
// MAIN APP COMPONENT
// ============================================

const App = () => {
  const [activeNav, setActiveNav] = useState('rosie');
  const [activeTab, setActiveTab] = useState('jobs');
  const [showNewJob, setShowNewJob] = useState(false);
  const [showNewResource, setShowNewResource] = useState(false);
  const [designerMode, setDesignerMode] = useState('visual');

  // New state for enhanced functionality
  const [editMode, setEditMode] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToAction, setJobToAction] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTarget, setFilterTarget] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsTab, setSettingsTab] = useState('connections');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [runLogExpanded, setRunLogExpanded] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveNotification, setSaveNotification] = useState(null);

  const [jobConfig, setJobConfig] = useState({
    name: '',
    description: '',
    scheduleType: 'cron',
    cronExpression: '0 2 * * *',
    rateValue: '5',
    rateUnit: 'minutes',
    timezone: 'America/New_York',
    target: 'auto',
    targetType: 'lambda',
    targetArn: '',
    retries: 3,
    flexibleWindow: '15',
    dlqEnabled: true,
    slaMinutes: 60,
    alertOnFailure: true,
    alertOnSlaBreak: true,
    tags: ['team:loans', 'env:prod']
  });
  const [workflowNodes, setWorkflowNodes] = useState([
    { id: 1, type: 'extract', name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: '', table: '', query: '' } },
    { id: 2, type: 'transform', name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Glue ETL', script: '' } },
    { id: 3, type: 'load', name: 'Load to DW', icon: 'file', color: 'emerald', config: { target: 'Redshift', connection: '', schema: '', table: '' } },
    { id: 4, type: 'notify', name: 'Send Alert', icon: 'bell', color: 'pink', config: { topic_arn: '', message: '' } },
  ]);

  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter(job => {
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (filterTarget !== 'all' && job.target !== filterTarget) return false;
    if (searchQuery && !job.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Platform stats calculation
  const platformStats = {
    total: mockJobs.length,
    active: mockJobs.filter(j => j.status === 'active').length,
    paused: mockJobs.filter(j => j.status === 'paused').length,
    eventbridge: mockJobs.filter(j => j.target === 'eventbridge').length,
    mwaa: mockJobs.filter(j => j.target === 'mwaa').length,
    failed24h: mockRuns.filter(r => r.status === 'failed').length,
    successRate: 96.8,
    monthlyCost: '$15.32'
  };

  // Handler functions
  const handleEditJob = (job) => {
    setJobToEdit(job);
    setEditMode(true);
    setJobConfig({
      name: job.name,
      description: job.description || '',
      scheduleType: job.schedule.startsWith('rate') ? 'rate' : 'cron',
      cronExpression: job.schedule.startsWith('rate') ? '0 2 * * *' : job.schedule,
      rateValue: '1',
      rateUnit: 'hours',
      timezone: 'America/New_York',
      target: job.target,
      retries: 3,
      flexibleWindow: '15',
      dlqEnabled: true,
      slaMinutes: 60,
      alertOnFailure: true,
      alertOnSlaBreak: true,
      tags: job.tags || []
    });
    setSelectedJob(null);
    setShowNewJob(true);
  };

  const handleCloseDesigner = () => {
    setShowNewJob(false);
    setEditMode(false);
    setJobToEdit(null);
    setSelectedNode(null);
  };

  const handleSaveJob = () => {
    if (!jobConfig.name && !editMode) {
      setSaveNotification({ type: 'error', message: 'Please enter a job name' });
      setTimeout(() => setSaveNotification(null), 3000);
      return;
    }
    const message = editMode
      ? `Job "${jobToEdit?.name}" updated successfully`
      : `Job "${jobConfig.name || 'new-job'}" created successfully`;
    setSaveNotification({ type: 'success', message });
    setTimeout(() => {
      setSaveNotification(null);
      handleCloseDesigner();
    }, 1500);
  };

  const handleAddNode = (type) => {
    const nodeTypes = {
      extract: { name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: '', table: '', query: '' } },
      transform: { name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Configure...', script: '' } },
      load: { name: 'Load Data', icon: 'file', color: 'emerald', config: { target: 'Configure...', connection: '', schema: '', table: '' } },
      lambda: { name: 'Lambda Function', icon: 'zap', color: 'yellow', config: { function_name: '', payload: '{}' } },
      sns: { name: 'SNS Publish', icon: 'bell', color: 'pink', config: { topic_arn: '', message: '' } },
      notify: { name: 'Notify', icon: 'bell', color: 'pink', config: { channel: 'sns', topic: '', message: '' } },
    };
    const newNode = { id: Date.now(), type, ...nodeTypes[type] };
    setWorkflowNodes([...workflowNodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleRemoveNode = (nodeId) => {
    setWorkflowNodes(workflowNodes.filter(n => n.id !== nodeId));
    if (selectedNode?.id === nodeId) setSelectedNode(null);
  };

  const handleSelectNode = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'mom', icon: Box, label: 'M.O.M.', subtitle: 'Infrastructure', color: 'violet' },
    { id: 'dad', icon: Shield, label: 'D.A.D.', subtitle: 'Service Mesh', color: 'amber' },
    { id: 'auntie', icon: MessageSquare, label: 'A.U.N.T.I.E.', subtitle: 'Messaging', color: 'emerald' },
    { id: 'rosie', icon: Clock, label: 'R.O.S.I.E.', subtitle: 'Scheduling', color: 'pink' },
  ];

  const getTargetRecommendation = () => {
    if (jobConfig.target !== 'auto') return null;
    const hasComplexDeps = workflowNodes.length > 2;
    const isCrossBTO = jobConfig.tags.some(t => t.includes('cross-bto'));
    if (hasComplexDeps || isCrossBTO) {
      return { platform: 'mwaa', reason: 'Complex workflow detected - MWAA recommended for DAG visualization and dependency management' };
    }
    return { platform: 'eventbridge', reason: 'Simple schedule - EventBridge Scheduler recommended for low latency and cost' };
  };

  const recommendation = getTargetRecommendation();

  // Get active color based on nav
  const getActiveColor = () => {
    const nav = navItems.find(n => n.id === activeNav);
    return nav?.color || 'violet';
  };

  // ============================================
  // REUSABLE COMPONENTS
  // ============================================

  // Status Badge Component
  const StatusBadge = ({ status, size = 'sm' }) => {
    const styles = {
      success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      failed: 'bg-red-500/20 text-red-300 border-red-500/30',
      running: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      pending: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      paused: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    };
    const icons = {
      success: CheckCircle2,
      failed: XCircle,
      running: Loader2,
      pending: CircleDot,
      active: CheckCircle2,
      paused: Pause,
      warning: AlertTriangle,
    };
    const Icon = icons[status] || CircleDot;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
        <Icon size={size === 'sm' ? 12 : 14} className={status === 'running' ? 'animate-spin' : ''} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Platform Badge Component
  const PlatformBadge = ({ target }) => {
    const isMWAA = target === 'mwaa';
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
        isMWAA
          ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
      }`}>
        {isMWAA ? <GitBranch size={12} /> : <Zap size={12} />}
        {isMWAA ? 'MWAA' : 'EventBridge'}
      </span>
    );
  };

  // ============================================
  // MODALS
  // ============================================

  // Trigger Modal
  const TriggerModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Play size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold">Trigger Job</h3>
              <p className="text-sm text-gray-500">{jobToAction?.name}</p>
            </div>
          </div>
          <button onClick={() => setShowTriggerModal(false)} className="p-2 hover:bg-gray-800 rounded-lg">
            <X size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Execution Date (Logical)</label>
            <input type="datetime-local" defaultValue="2024-12-24T02:00" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Configuration Override (JSON)</label>
            <textarea rows={4} placeholder='{"param1": "value1"}' className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-violet-500" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800">
          <button onClick={() => setShowTriggerModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
          <button onClick={() => { setShowTriggerModal(false); setSaveNotification({ type: 'success', message: `Job "${jobToAction?.name}" triggered successfully` }); setTimeout(() => setSaveNotification(null), 3000); }} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-medium">
            <Play size={16} />
            Trigger Run
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Trash2 size={20} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold">Delete Job</h3>
            <p className="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-300">Are you sure you want to delete <span className="font-mono text-violet-300">{jobToAction?.name}</span>?</p>
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <div>This will remove all run history and cannot be recovered.</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800">
          <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
          <button onClick={() => { setShowDeleteModal(false); setSaveNotification({ type: 'success', message: `Job "${jobToAction?.name}" deleted` }); setTimeout(() => setSaveNotification(null), 3000); }} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium">
            <Trash2 size={16} />
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );

  // Diagnostics Panel
  const DiagnosticsPanel = () => (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-40 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Wrench size={20} className="text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold">Diagnostics</h3>
            <p className="text-sm text-gray-500">System Health Check</p>
          </div>
        </div>
        <button onClick={() => setShowDiagnostics(false)} className="p-2 hover:bg-gray-800 rounded-lg">
          <X size={18} className="text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2"><Activity size={14} />Health Checks</h4>
          {[
            { name: 'MWAA Environment', status: 'healthy', detail: 'All workers healthy' },
            { name: 'EventBridge Scheduler', status: 'healthy', detail: '3 schedules active' },
            { name: 'IAM Permissions', status: 'healthy', detail: 'Cross-account roles valid' },
            { name: 'Bank API Connection', status: 'warning', detail: 'High latency detected (2.3s)' },
          ].map((check, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${check.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <div>
                  <div className="text-sm font-medium">{check.name}</div>
                  <div className="text-xs text-gray-500">{check.detail}</div>
                </div>
              </div>
              {check.status === 'warning' && <button className="text-xs text-amber-400 hover:text-amber-300">Fix</button>}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2"><Bug size={14} />Recent Issues</h4>
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <XCircle size={16} className="text-red-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-red-300">payments-reconciliation failed</div>
                <div className="text-xs text-gray-400 mt-1">Bank API timeout on fetch_transactions</div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="text-xs text-violet-400 hover:text-violet-300">View Logs</button>
                  <span className="text-gray-600">•</span>
                  <button className="text-xs text-violet-400 hover:text-violet-300">Retry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-medium">
          <Wrench size={16} />
          Run Full Diagnostics
        </button>
      </div>
    </div>
  );

  // Job Detail Panel
  const JobDetailPanel = () => {
    const job = selectedJob;
    if (!job) return null;
    return (
      <div className="fixed inset-y-0 right-0 w-[600px] bg-gray-900 border-l border-gray-800 shadow-2xl z-40 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-gray-800 rounded-lg">
              <ChevronLeft size={18} className="text-gray-400" />
            </button>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
              {job.type === 'dag' ? <GitBranch size={20} /> : <Zap size={20} />}
            </div>
            <div>
              <h3 className="font-semibold">{job.name}</h3>
              <p className="text-sm text-gray-500">{job.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleEditJob(job)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-violet-400" title="Edit Job">
              <Edit2 size={18} />
            </button>
            <button onClick={() => { setJobToAction(job); setShowTriggerModal(true); }} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg text-sm font-medium">
              <Play size={14} />Trigger
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <StatusBadge status={job.status} />
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">Last Run</div>
                <StatusBadge status={job.lastRunStatus} />
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                <div className="text-lg font-semibold text-emerald-400">{job.successRate}%</div>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-gray-800 space-y-3">
            <h4 className="text-sm font-medium text-gray-400">Schedule</h4>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-gray-500" />
              <code className="bg-gray-800 px-2 py-1 rounded text-violet-300">{job.schedule}</code>
              <span className="text-gray-400">→</span>
              <span className="text-gray-300">{job.scheduleHuman}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Timer size={16} className="text-gray-500" />
                <span className="text-gray-400">Avg Duration:</span>
                <span className="text-gray-200">{job.avgDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-gray-500" />
                <span className="text-gray-400">Est. Cost:</span>
                <span className="text-emerald-400">{job.estimatedCost}</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
            <p className="text-sm text-gray-300">{job.description}</p>
          </div>
          <div className="p-4 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  <Tag size={10} />{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Runs</h4>
            <div className="space-y-2">
              {mockRuns.filter(r => r.jobName === job.name).slice(0, 5).map(run => (
                <div key={run.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={run.status} />
                    <span className="text-sm text-gray-400">{run.startTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{run.duration}</span>
                    <button className="text-gray-400 hover:text-gray-200"><Eye size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg">
              <Copy size={14} />Clone
            </button>
            <button onClick={() => { setJobToAction(job); setShowDeleteModal(true); }} className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg">
              <Trash2 size={14} />Delete
            </button>
          </div>
          <button className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg ${job.status === 'active' ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'}`}>
            {job.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
            {job.status === 'active' ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // HOME VIEW
  // ============================================
  const renderHomeView = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Welcome back, Luke</h1>
        <p className="text-gray-500 mt-1">Here's what's happening across your platform</p>
      </div>

      {/* Platform Family Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { id: 'mom', label: 'M.O.M.', persona: 'The Builder', domain: 'Infrastructure', icon: Box, color: 'violet', stats: { resources: 42, healthy: 40, alerts: 2 } },
          { id: 'dad', label: 'D.A.D.', persona: 'The Gatekeeper', domain: 'Service Mesh', icon: Shield, color: 'amber', stats: { services: 28, meshed: 24, mtls: '86%' } },
          { id: 'auntie', label: 'A.U.N.T.I.E.', persona: 'The Connector', domain: 'Messaging', icon: MessageSquare, color: 'emerald', stats: { topics: 156, queues: 89, events: '2.4M/day' } },
          { id: 'rosie', label: 'R.O.S.I.E.', persona: 'The Housekeeper', domain: 'Scheduling', icon: Clock, color: 'pink', stats: { jobs: 234, active: 198, success: '99.2%' } },
        ].map(family => (
          <button
            key={family.id}
            onClick={() => setActiveNav(family.id)}
            className={`bg-gray-800/50 border border-gray-700 rounded-xl p-5 text-left hover:border-${family.color}-500/50 hover:bg-gray-800 transition-all group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${family.color}-500/20 text-${family.color}-400 flex items-center justify-center`}>
                <family.icon size={24} />
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-gray-400 transition-colors" size={20} />
            </div>
            <div className="font-semibold text-lg">{family.label}</div>
            <div className="text-sm text-gray-500">{family.persona} — {family.domain}</div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-700">
              {Object.entries(family.stats).map(([key, value]) => (
                <div key={key}>
                  <div className={`text-lg font-semibold text-${family.color}-400`}>{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
        <h2 className="font-medium mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { icon: CheckCircle, color: 'emerald', text: 'loan-etl-daily completed successfully', time: '2 hours ago', family: 'ROSIE' },
            { icon: AlertTriangle, color: 'amber', text: 'payment-gateway latency spike detected', time: '3 hours ago', family: 'DAD' },
            { icon: Plus, color: 'violet', text: 'New RDS instance analytics-db provisioned', time: '5 hours ago', family: 'MOM' },
            { icon: Mail, color: 'emerald', text: '156 messages in shipping-dlq require attention', time: '6 hours ago', family: 'AUNTIE' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50">
              <div className={`w-8 h-8 rounded-lg bg-${activity.color}-500/20 text-${activity.color}-400 flex items-center justify-center`}>
                <activity.icon size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm">{activity.text}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">{activity.family}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // M.O.M. VIEW (Infrastructure)
  // ============================================
  const renderMOMView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Infrastructure Resources</h1>
          <p className="text-gray-500 text-sm mt-1">Provision and manage databases, compute, and storage</p>
        </div>
        <button 
          onClick={() => setShowNewResource(true)}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          New Resource
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Resources', value: '42', icon: Layers, color: 'violet' },
          { label: 'Databases', value: '8', icon: Database, color: 'blue' },
          { label: 'Compute', value: '18', icon: Cpu, color: 'emerald' },
          { label: 'Storage', value: '12', icon: HardDrive, color: 'amber' },
          { label: 'Alerts', value: '2', icon: AlertCircle, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <stat.icon size={16} />
              <span className="text-sm">{stat.label}</span>
            </div>
            <div className={`text-2xl font-semibold text-${stat.color}-400`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Resource Categories */}
      <div className="flex gap-2 mb-4">
        {['All', 'Databases', 'Compute', 'Storage', 'Networking'].map(cat => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              cat === 'All' 
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Table */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Configuration</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Region</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockInfraResources.map(resource => (
              <tr key={resource.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      resource.type === 'rds' ? 'bg-blue-500/20 text-blue-400' :
                      resource.type === 'elasticache' ? 'bg-red-500/20 text-red-400' :
                      resource.type === 'lambda' ? 'bg-amber-500/20 text-amber-400' :
                      resource.type === 'ecs' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {resource.type === 'rds' && <Database size={16} />}
                      {resource.type === 'elasticache' && <Zap size={16} />}
                      {resource.type === 'lambda' && <CloudLightning size={16} />}
                      {resource.type === 'ecs' && <Server size={16} />}
                      {resource.type === 'emr' && <Activity size={16} />}
                    </div>
                    <div>
                      <div className="font-medium">{resource.name}</div>
                      <div className="text-xs text-gray-500">{resource.engine || resource.runtime || resource.image || resource.version}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-300 uppercase">{resource.type}</span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">
                    {resource.size || resource.memory || resource.tasks || resource.nodes}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-sm ${
                    resource.status === 'available' || resource.status === 'active' || resource.status === 'running' 
                      ? 'text-emerald-400' 
                      : 'text-amber-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      resource.status === 'available' || resource.status === 'active' || resource.status === 'running'
                        ? 'bg-emerald-400' 
                        : 'bg-amber-400'
                    }`} />
                    {resource.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{resource.region}</td>
                <td className="px-4 py-3">
                  <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Terraform Modules */}
      <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-xl p-5">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Folder size={18} className="text-violet-400" />
          Available Blueprints
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'rds-postgres', desc: 'PostgreSQL database', icon: Database },
            { name: 'rds-mysql', desc: 'MySQL database', icon: Database },
            { name: 'elasticache-redis', desc: 'Redis cluster', icon: Zap },
            { name: 'lambda-python', desc: 'Python function', icon: CloudLightning },
            { name: 'ecs-fargate', desc: 'Fargate service', icon: Server },
            { name: 's3-bucket', desc: 'S3 storage', icon: HardDrive },
            { name: 'dynamodb-table', desc: 'DynamoDB table', icon: Database },
            { name: 'emr-cluster', desc: 'EMR Spark cluster', icon: Activity },
          ].map(blueprint => (
            <button key={blueprint.name} className="flex items-center gap-3 p-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-violet-500/50 transition-all text-left">
              <blueprint.icon size={18} className="text-gray-400" />
              <div>
                <div className="text-sm font-medium">{blueprint.name}</div>
                <div className="text-xs text-gray-500">{blueprint.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================
  // D.A.D. VIEW (Service Mesh)
  // ============================================
  const renderDADView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Service Mesh</h1>
          <p className="text-gray-500 text-sm mt-1">Secure service-to-service communication with mTLS</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Register Service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Services', value: '28', icon: Server, color: 'amber' },
          { label: 'Mesh Enabled', value: '24', icon: Network, color: 'emerald' },
          { label: 'mTLS Strict', value: '86%', icon: Lock, color: 'blue' },
          { label: 'Healthy', value: '26', icon: CheckCircle, color: 'emerald' },
          { label: 'Degraded', value: '2', icon: AlertTriangle, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <stat.icon size={16} />
              <span className="text-sm">{stat.label}</span>
            </div>
            <div className={`text-2xl font-semibold text-${stat.color}-400`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Mesh Visualization */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5 mb-6">
        <h3 className="font-medium mb-4">Service Topology</h3>
        <div className="flex items-center justify-center gap-8 py-8">
          {/* Simple mesh visualization */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
              <Server size={24} className="text-emerald-400" />
            </div>
            <span className="text-xs text-gray-400">user-service</span>
          </div>
          <div className="flex flex-col gap-1">
            <ArrowLeftRight className="text-emerald-500" size={24} />
            <span className="text-xs text-emerald-400">mTLS</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center">
              <Server size={24} className="text-emerald-400" />
            </div>
            <span className="text-xs text-gray-400">loan-service</span>
          </div>
          <div className="flex flex-col gap-1">
            <ArrowLeftRight className="text-emerald-500" size={24} />
            <span className="text-xs text-emerald-400">mTLS</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center">
              <Server size={24} className="text-amber-400" />
            </div>
            <span className="text-xs text-gray-400">payment-gateway</span>
          </div>
          <div className="flex flex-col gap-1">
            <ArrowLeftRight className="text-gray-500" size={24} />
            <span className="text-xs text-gray-500">permissive</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center">
              <Server size={24} className="text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">legacy-adapter</span>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Service</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Namespace</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Mesh</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">mTLS</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Endpoints</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">P50 Latency</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockServices.map(service => (
              <tr key={service.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      service.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-400' :
                      service.status === 'degraded' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      <Server size={16} />
                    </div>
                    <div className="font-medium">{service.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-400">{service.namespace}</span>
                </td>
                <td className="px-4 py-3">
                  {service.mesh ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
                      <CheckCircle size={14} /> Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                      <XCircle size={14} /> Disabled
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                    service.mtls === 'strict' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    service.mtls === 'permissive' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}>
                    <Lock size={10} />
                    {service.mtls}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-sm ${
                    service.status === 'healthy' ? 'text-emerald-400' :
                    service.status === 'degraded' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      service.status === 'healthy' ? 'bg-emerald-400' :
                      service.status === 'degraded' ? 'bg-amber-400' :
                      'bg-red-400'
                    }`} />
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{service.endpoints}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm ${
                    parseInt(service.latency) < 20 ? 'text-emerald-400' :
                    parseInt(service.latency) < 50 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {service.latency}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security Policies */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Key size={18} className="text-amber-400" />
            Certificate Status
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Root CA', expires: '2026-12-01', status: 'valid' },
              { name: 'Intermediate CA', expires: '2025-12-01', status: 'valid' },
              { name: 'Service Certs', expires: 'Auto-rotated', status: 'valid' },
            ].map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <span className="text-sm">{cert.name}</span>
                </div>
                <span className="text-xs text-gray-500">{cert.expires}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Shield size={18} className="text-amber-400" />
            Authorization Policies
          </h3>
          <div className="space-y-3">
            {[
              { name: 'deny-all-default', scope: 'Global', rules: 1 },
              { name: 'allow-lending-internal', scope: 'lending', rules: 4 },
              { name: 'allow-payments-strict', scope: 'payments', rules: 6 },
            ].map((policy, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium">{policy.name}</div>
                  <div className="text-xs text-gray-500">Scope: {policy.scope}</div>
                </div>
                <span className="text-xs text-gray-400">{policy.rules} rules</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // A.U.N.T.I.E. VIEW (Messaging)
  // ============================================
  const renderAUNTIEView = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Messaging & Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage topics, queues, and event routing</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} />
          New Topic/Queue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'SNS Topics', value: '156', icon: Radio, color: 'pink' },
          { label: 'SQS Queues', value: '89', icon: Mail, color: 'cyan' },
          { label: 'EventBridge Rules', value: '47', icon: Filter, color: 'violet' },
          { label: 'Kafka Topics', value: '24', icon: Activity, color: 'amber' },
          { label: 'Messages/Day', value: '2.4M', icon: TrendingUp, color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <stat.icon size={16} />
              <span className="text-sm">{stat.label}</span>
            </div>
            <div className={`text-2xl font-semibold text-${stat.color}-400`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Zone Split */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Box size={16} />
            </div>
            <div>
              <div className="font-medium text-cyan-300">Zone 1: Local (Workload)</div>
              <div className="text-xs text-gray-400">Team-owned, distributed</div>
            </div>
          </div>
          <div className="text-2xl font-semibold text-cyan-400">198</div>
          <div className="text-sm text-gray-400">SNS Topics, SQS Queues, Local Rules</div>
        </div>
        <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center">
              <Globe size={16} />
            </div>
            <div>
              <div className="font-medium text-fuchsia-300">Zone 2: Central (Shared)</div>
              <div className="text-xs text-gray-400">Platform-owned, governed</div>
            </div>
          </div>
          <div className="text-2xl font-semibold text-fuchsia-400">71</div>
          <div className="text-sm text-gray-400">Enterprise Bus, Kafka, Audit Archive</div>
        </div>
      </div>

      {/* Message Flow Pattern - Town Hall */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5 mb-6">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Users size={18} className="text-emerald-400" />
          "The Town Hall" Pattern — Cross-BTO Event Flow
        </h3>
        <div className="flex items-center justify-between py-4 px-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center">
              <Radio size={20} className="text-cyan-400" />
            </div>
            <span className="text-xs text-gray-400">Local SNS</span>
            <span className="text-xs text-cyan-400">order-events</span>
          </div>
          <ArrowRight className="text-gray-500" size={20} />
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-fuchsia-500/20 border-2 border-fuchsia-500/50 flex items-center justify-center">
              <Globe size={20} className="text-fuchsia-400" />
            </div>
            <span className="text-xs text-gray-400">Central Bus</span>
            <span className="text-xs text-fuchsia-400">enterprise-bus</span>
          </div>
          <ArrowRight className="text-gray-500" size={20} />
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border-2 border-cyan-500/50 flex items-center justify-center">
              <Mail size={20} className="text-cyan-400" />
            </div>
            <span className="text-xs text-gray-400">Remote SQS</span>
            <span className="text-xs text-cyan-400">shipping-queue</span>
          </div>
        </div>
      </div>

      {/* Messaging Resources Table */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Resource</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Type</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Zone</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Metrics</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Messages/Day</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockMessaging.map(resource => (
              <tr key={resource.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      resource.type === 'sns' ? 'bg-pink-500/20 text-pink-400' :
                      resource.type === 'sqs' ? 'bg-cyan-500/20 text-cyan-400' :
                      resource.type === 'eventbridge' ? 'bg-violet-500/20 text-violet-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {resource.type === 'sns' && <Radio size={16} />}
                      {resource.type === 'sqs' && <Mail size={16} />}
                      {resource.type === 'eventbridge' && <Zap size={16} />}
                      {resource.type === 'kafka' && <Activity size={16} />}
                    </div>
                    <div className="font-medium">{resource.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-300 uppercase">{resource.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                    resource.zone === 'local' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                  }`}>
                    {resource.zone === 'local' ? 'Zone 1' : 'Zone 2'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-400">
                    {resource.subscribers && `${resource.subscribers} subscribers`}
                    {resource.depth !== undefined && `${resource.depth} in queue`}
                    {resource.rules && `${resource.rules} rules`}
                    {resource.partitions && `${resource.partitions} partitions`}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">{resource.messagesDay}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-sm ${
                    resource.status === 'active' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      resource.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} />
                    {resource.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DLQ Alert */}
      <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1">
          <div className="font-medium text-amber-300">Dead Letter Queue Alert</div>
          <div className="text-sm text-gray-400">shipping-dlq has 156 unprocessed messages. Last activity 6 hours ago.</div>
        </div>
        <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium">
          Investigate
        </button>
      </div>
    </div>
  );

  // ============================================
  // R.O.S.I.E. VIEW (Scheduling)
  // ============================================
  const renderROSIEView = () => (
    <>
      {/* Notification Toast */}
      {saveNotification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg flex items-center gap-2 shadow-lg ${
          saveNotification.type === 'success'
            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/20 border border-red-500/30 text-red-300'
        }`}>
          {saveNotification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {saveNotification.message}
        </div>
      )}

      {/* Tabs Navigation */}
      {!showNewJob && (
        <div className="border-b border-gray-800 px-6 flex gap-1 bg-gray-900/30">
          {[
            { id: 'jobs', label: 'My Jobs', count: filteredJobs.length },
            { id: 'runs', label: 'Run History' },
            { id: 'settings', label: 'Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded">{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {!showNewJob && activeTab === 'jobs' ? (
        /* Jobs List View */
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold">Scheduled Jobs</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your scheduled tasks and workflows</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowDiagnostics(true)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg border border-gray-700">
                <Wrench size={16} />
                Diagnostics
              </button>
              <button onClick={() => { setEditMode(false); setJobToEdit(null); setShowNewJob(true); }} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-lg font-medium transition-colors">
                <Plus size={18} />
                New Job
              </button>
            </div>
          </div>

          {/* Stats with Cost */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Active Jobs', value: platformStats.active, color: 'emerald', icon: CheckCircle2 },
              { label: 'Paused', value: platformStats.paused, color: 'amber', icon: Pause },
              { label: 'Failed (24h)', value: platformStats.failed24h, color: 'red', icon: XCircle },
              { label: 'Success Rate', value: `${platformStats.successRate}%`, color: 'violet', icon: TrendingUp },
              { label: 'Est. Monthly Cost', value: platformStats.monthlyCost, color: 'cyan', icon: DollarSign },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                  <stat.icon size={16} className={`text-${stat.color}-400`} />
                </div>
                <div className={`text-2xl font-semibold mt-1 text-${stat.color}-400`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pink-500">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
              <select value={filterTarget} onChange={e => setFilterTarget(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-pink-500">
                <option value="all">All Platforms</option>
                <option value="eventbridge">EventBridge</option>
                <option value="mwaa">MWAA</option>
              </select>
            </div>
            <div className="flex-1" />
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-pink-500" />
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Job Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Target</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Schedule</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Last Run</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job.id} className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer" onClick={() => setSelectedJob(job)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          {job.type === 'dag' ? <GitBranch size={16} /> : <Zap size={16} />}
                        </div>
                        <div>
                          <div className="font-medium">{job.name}</div>
                          <div className="text-xs text-gray-500">{job.owner}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><PlatformBadge target={job.target} /></td>
                    <td className="px-4 py-3"><code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">{job.schedule}</code></td>
                    <td className="px-4 py-3"><StatusBadge status={job.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={job.lastRunStatus} />
                        <span className="text-sm text-gray-500">{job.lastRun}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-400">{job.estimatedCost}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setJobToAction(job); setShowTriggerModal(true); }} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-emerald-400" title="Trigger"><Play size={14} /></button>
                        <button onClick={() => handleEditJob(job)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-violet-400" title="Edit"><Edit2 size={14} /></button>
                        <button onClick={() => { setJobToAction(job); setShowDeleteModal(true); }} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-400" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 90/10 Split with Cost Savings */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-300 flex items-center gap-2"><BarChart3 size={16} className="text-pink-400" />Platform Distribution</div>
                <div className="text-xs text-gray-500">{Math.round(platformStats.eventbridge / platformStats.total * 100)}% EB / {Math.round(platformStats.mwaa / platformStats.total * 100)}% MWAA</div>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-gray-700">
                <div className="bg-cyan-500 transition-all" style={{ width: `${platformStats.eventbridge / platformStats.total * 100}%` }} />
                <div className="bg-fuchsia-500 transition-all" style={{ width: `${platformStats.mwaa / platformStats.total * 100}%` }} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4">
              <div className="text-sm font-medium text-emerald-300 mb-2">Migration Savings</div>
              <div className="flex items-center gap-4">
                <div><div className="text-xs text-gray-400">Control-M</div><div className="text-lg font-bold text-red-400">$1.3M/yr</div></div>
                <ArrowRight className="text-gray-500" />
                <div><div className="text-xs text-gray-400">ROSIE</div><div className="text-lg font-bold text-emerald-400">$77.5K/yr</div></div>
                <div className="ml-auto text-2xl font-bold text-cyan-400">94%</div>
              </div>
            </div>
          </div>
        </div>
      ) : !showNewJob && activeTab === 'runs' ? (
        /* Run History Tab */
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold">Run History</h1>
              <p className="text-gray-500 text-sm mt-1">View execution history and logs</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm"><option>Last 24 hours</option><option>Last 7 days</option></select>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-800 rounded-lg border border-gray-700"><Download size={16} />Export</button>
            </div>
          </div>
          <div className="space-y-3">
            {mockRuns.map(run => (
              <div key={run.id} className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50" onClick={() => setRunLogExpanded(runLogExpanded === run.id ? null : run.id)}>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={run.status} />
                    <div>
                      <div className="font-medium">{run.jobName}</div>
                      <div className="text-sm text-gray-500">{run.startTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-400"><span className="text-gray-500">Duration:</span> {run.duration}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-emerald-400">{run.tasks.success} ✓</span>
                      {run.tasks.failed > 0 && <span className="text-red-400">{run.tasks.failed} ✗</span>}
                    </div>
                    {runLogExpanded === run.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>
                {runLogExpanded === run.id && (
                  <div className="border-t border-gray-700 p-4 bg-gray-900/50">
                    {run.error && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300 flex items-start gap-2">
                        <XCircle size={16} className="mt-0.5" /><div><div className="font-medium">Error</div><div className="text-red-400 mt-1">{run.error}</div></div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-3"><Terminal size={14} className="text-gray-500" /><span className="text-sm font-medium text-gray-400">Logs</span></div>
                    <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-400 max-h-48 overflow-auto">
                      <div className="text-gray-500">[{run.startTime}] Starting job execution...</div>
                      <div className="text-emerald-400">[{run.startTime}] Task 1: extract_data - SUCCESS</div>
                      {run.status === 'failed' ? <div className="text-red-400">[{run.startTime}] Task 3: fetch_transactions - FAILED</div> : <div className="text-emerald-400">[{run.startTime}] All tasks completed successfully</div>}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"><Eye size={14} />Full Logs</button>
                      <span className="text-gray-600">•</span>
                      <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"><RotateCcw size={14} />Retry</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : !showNewJob && activeTab === 'settings' ? (
        /* Settings Tab */
        <div className="flex h-full">
          <div className="w-56 border-r border-gray-800 p-4">
            <nav className="space-y-1">
              {[
                { id: 'connections', icon: Link2, label: 'Connections' },
                { id: 'variables', icon: Settings, label: 'Variables' },
                { id: 'costs', icon: DollarSign, label: 'Cost Management' },
              ].map(item => (
                <button key={item.id} onClick={() => setSettingsTab(item.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${settingsTab === item.id ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <item.icon size={16} />{item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {settingsTab === 'connections' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div><h2 className="text-lg font-semibold">Connections</h2><p className="text-gray-500 text-sm">Manage Airflow connections</p></div>
                  <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-lg text-sm font-medium"><Plus size={16} />Add Connection</button>
                </div>
                <div className="space-y-3">
                  {mockConnections.map(conn => (
                    <div key={conn.id} className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                          {conn.type === 'postgres' && <Database size={18} className="text-blue-400" />}
                          {conn.type === 'redis' && <Cpu size={18} className="text-red-400" />}
                          {conn.type === 's3' && <HardDrive size={18} className="text-emerald-400" />}
                          {conn.type === 'http' && <Globe size={18} className="text-violet-400" />}
                          {conn.type === 'aws' && <Server size={18} className="text-amber-400" />}
                        </div>
                        <div><div className="font-medium">{conn.name}</div><div className="text-sm text-gray-500">{conn.host}</div></div>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={conn.status} />
                        <span className="text-sm text-gray-500">Tested {conn.lastTested}</span>
                        <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"><Edit2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {settingsTab === 'variables' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div><h2 className="text-lg font-semibold">Variables</h2><p className="text-gray-500 text-sm">Manage Airflow variables</p></div>
                  <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-lg text-sm font-medium"><Plus size={16} />Add Variable</button>
                </div>
                <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-700"><th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Key</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Value</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Description</th><th className="px-4 py-3"></th></tr></thead>
                    <tbody>
                      {mockVariables.map((v, i) => (
                        <tr key={i} className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-mono text-sm text-pink-300">{v.key}</td>
                          <td className="px-4 py-3"><div className="flex items-center gap-2">{v.encrypted && <Lock size={12} className="text-amber-400" />}<code className="text-sm text-gray-300">{v.value}</code></div></td>
                          <td className="px-4 py-3 text-sm text-gray-500">{v.description}</td>
                          <td className="px-4 py-3"><button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"><Edit2 size={14} /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {settingsTab === 'costs' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Cost Management</h2>
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4">Migration Savings</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div><div className="text-sm text-gray-400">Control-M (Legacy)</div><div className="text-2xl font-bold text-red-400">$1,300,000<span className="text-sm font-normal">/yr</span></div></div>
                    <div><div className="text-sm text-gray-400">ROSIE (Current)</div><div className="text-2xl font-bold text-emerald-400">$77,500<span className="text-sm font-normal">/yr</span></div></div>
                    <div><div className="text-sm text-gray-400">Annual Savings</div><div className="text-2xl font-bold text-cyan-400">94%</div></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4"><Zap size={18} className="text-cyan-400" /><h3 className="font-medium">EventBridge Scheduler</h3></div>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$0.17<span className="text-lg font-normal text-gray-400">/mo</span></div>
                    <div className="text-sm text-gray-500">{platformStats.eventbridge} schedules × $1/million invocations</div>
                  </div>
                  <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4"><GitBranch size={18} className="text-fuchsia-400" /><h3 className="font-medium">MWAA (Airflow)</h3></div>
                    <div className="text-3xl font-bold text-fuchsia-400 mb-2">$15.15<span className="text-lg font-normal text-gray-400">/mo</span></div>
                    <div className="text-sm text-gray-500">mw1.medium environment + workers</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : showNewJob ? (
        /* New Job Designer */
        <div className="flex h-full">
          {/* Designer Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Designer Toolbar */}
            <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between bg-gray-900/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDesignerMode('visual')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    designerMode === 'visual' 
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <Layout size={16} />
                  Visual Designer
                </button>
                <button
                  onClick={() => setDesignerMode('code')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    designerMode === 'code' 
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <Code size={16} />
                  Code View
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCloseDesigner}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveJob}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-lg text-sm font-medium"
                >
                  <Save size={16} />
                  {editMode ? 'Save Changes' : 'Deploy Job'}
                </button>
              </div>
            </div>

            {/* Save Notification */}
            {saveNotification && (
              <div className={`mx-4 mt-2 p-3 rounded-lg flex items-center gap-2 ${
                saveNotification.type === 'success'
                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {saveNotification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {saveNotification.message}
              </div>
            )}

            {designerMode === 'visual' ? (
              /* Visual Designer */
              <div className="flex-1 p-6 bg-gray-950/50 overflow-auto">
                {/* Operator Palette */}
                <div className="mb-4 bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                  <div className="px-3 py-2 border-b border-gray-700 flex items-center justify-between">
                    <div className="text-xs text-gray-400 font-medium">OPERATORS</div>
                    <div className="text-xs text-gray-500">Click to add</div>
                  </div>
                  <div className="p-3 flex gap-2 flex-wrap">
                    <button onClick={() => handleAddNode('extract')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-blue-500/50 transition-colors">
                      <Database size={14} className="text-blue-400" /> Extract
                    </button>
                    <button onClick={() => handleAddNode('transform')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-amber-500/50 transition-colors">
                      <RefreshCw size={14} className="text-amber-400" /> Transform
                    </button>
                    <button onClick={() => handleAddNode('load')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-emerald-500/50 transition-colors">
                      <FileText size={14} className="text-emerald-400" /> Load
                    </button>
                    <button onClick={() => handleAddNode('lambda')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <Zap size={14} className="text-yellow-400" /> Lambda
                    </button>
                    <button onClick={() => handleAddNode('notify')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-pink-500/50 transition-colors">
                      <Bell size={14} className="text-pink-400" /> Notify
                    </button>
                  </div>
                </div>

                {/* Canvas */}
                <div className="relative bg-gray-900 border border-gray-700 rounded-xl min-h-[300px] p-6">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  {/* Hint */}
                  {workflowNodes.length > 0 && !selectedNode && (
                    <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800/80 px-2 py-1 rounded">Click a node to configure it</div>
                  )}

                  {/* Workflow Nodes */}
                  <div className="relative flex items-center gap-4 flex-wrap">
                    {workflowNodes.map((node, index) => {
                      const colorMap = {
                        blue: { ring: 'ring-blue-500', border: 'border-blue-500/50 hover:border-blue-500', bg: 'bg-blue-500/20 text-blue-400' },
                        amber: { ring: 'ring-amber-500', border: 'border-amber-500/50 hover:border-amber-500', bg: 'bg-amber-500/20 text-amber-400' },
                        emerald: { ring: 'ring-emerald-500', border: 'border-emerald-500/50 hover:border-emerald-500', bg: 'bg-emerald-500/20 text-emerald-400' },
                        pink: { ring: 'ring-pink-500', border: 'border-pink-500/50 hover:border-pink-500', bg: 'bg-pink-500/20 text-pink-400' },
                        yellow: { ring: 'ring-yellow-500', border: 'border-yellow-500/50 hover:border-yellow-500', bg: 'bg-yellow-500/20 text-yellow-400' },
                      };
                      const colors = colorMap[node.color] || colorMap.blue;
                      const iconMap = { database: Database, refresh: RefreshCw, file: FileText, bell: Bell, zap: Zap };
                      const IconComponent = iconMap[node.icon] || Database;
                      return (
                        <React.Fragment key={node.id}>
                          <div
                            onClick={() => handleSelectNode(node)}
                            className={`relative bg-gray-800 border-2 rounded-xl p-4 min-w-[120px] cursor-pointer group transition-all ${
                              selectedNode?.id === node.id ? 'ring-2 ring-offset-2 ring-offset-gray-900 ' + colors.ring + ' border-transparent' : colors.border
                            }`}
                          >
                            <button onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400">
                              <X size={12} />
                            </button>
                            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${colors.bg}`}>
                              <IconComponent size={16} />
                            </div>
                            <div className="text-sm font-medium">{node.name}</div>
                            <div className="text-xs text-gray-500 mt-1 truncate max-w-[100px]">
                              {node.config && Object.values(node.config)[0] || 'Configure...'}
                            </div>
                          </div>
                          {index < workflowNodes.length - 1 && <ArrowRight className="text-gray-600 flex-shrink-0" size={20} />}
                        </React.Fragment>
                      );
                    })}
                    {workflowNodes.length === 0 && (
                      <div className="w-full text-center py-12 text-gray-500">
                        <Plus size={48} className="mx-auto mb-3 opacity-50" />
                        <p>Add operators from the palette above to build your workflow</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Node Config Panel */}
                {selectedNode && (
                  <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">Configure: {selectedNode.name}</div>
                      </div>
                      <button onClick={() => setSelectedNode(null)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400"><X size={16} /></button>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Step Name</label>
                        <input type="text" value={selectedNode.name} onChange={e => setWorkflowNodes(workflowNodes.map(n => n.id === selectedNode.id ? {...n, name: e.target.value} : n))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500" />
                      </div>
                      {selectedNode.type === 'extract' && (
                        <div>
                          <label className="block text-sm text-gray-400 mb-1.5">Connection</label>
                          <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500">
                            <option value="">Select connection...</option>
                            <option value="postgres_prod">postgres_prod</option>
                            <option value="analytics-redshift">analytics-redshift</option>
                          </select>
                        </div>
                      )}
                      {selectedNode.type === 'lambda' && (
                        <div>
                          <label className="block text-sm text-gray-400 mb-1.5">Function Name</label>
                          <input type="text" placeholder="my-function" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500" />
                        </div>
                      )}
                      {selectedNode.type === 'notify' && (
                        <div>
                          <label className="block text-sm text-gray-400 mb-1.5">SNS Topic ARN</label>
                          <input type="text" placeholder="arn:aws:sns:..." className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Target Recommendation */}
                {recommendation && (
                  <div className={`mt-4 p-4 rounded-xl border ${
                    recommendation.platform === 'mwaa' 
                      ? 'bg-fuchsia-500/10 border-fuchsia-500/30'
                      : 'bg-cyan-500/10 border-cyan-500/30'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        recommendation.platform === 'mwaa'
                          ? 'bg-fuchsia-500/20 text-fuchsia-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {recommendation.platform === 'mwaa' ? <GitBranch size={16} /> : <Zap size={16} />}
                      </div>
                      <div>
                        <div className="font-medium text-sm flex items-center gap-2">
                          Recommended Target: 
                          <span className={recommendation.platform === 'mwaa' ? 'text-fuchsia-300' : 'text-cyan-300'}>
                            {recommendation.platform === 'mwaa' ? 'MWAA (Airflow)' : 'EventBridge Scheduler'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{recommendation.reason}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Code View */
              <div className="flex-1 p-6 bg-gray-950/50 overflow-auto">
                <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800/50">
                    <div className="flex items-center gap-2 text-sm">
                      <GitBranch size={14} className="text-gray-400" />
                      <span className="text-gray-300">loan_etl.py</span>
                    </div>
                    <span className="text-xs text-gray-500">Python (Airflow DAG)</span>
                  </div>
                  <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
{`from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.operators.batch import BatchOperator
from airflow.providers.amazon.aws.operators.sns import SnsPublishOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'loan-team',
    'depends_on_past': False,
    'email_on_failure': True,
    'email': ['loan-team@example.com'],
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'loan_etl_daily',
    default_args=default_args,
    description='Daily loan data ETL pipeline',
    schedule='0 2 * * *',
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=['loan', 'etl', 'production'],
) as dag:

    extract = BatchOperator(
        task_id='extract_data',
        job_name='loan-extract',
        job_queue='rosie-batch-queue',
        job_definition='loan-extract-job:1',
    )

    transform = GlueJobOperator(
        task_id='transform_data',
        job_name='loan-transform-glue',
    )

    load = BatchOperator(
        task_id='load_to_warehouse',
        job_name='loan-load',
        job_queue='rosie-batch-queue',
        job_definition='loan-load-job:1',
    )

    notify = SnsPublishOperator(
        task_id='send_notification',
        target_arn='arn:aws:sns:us-east-1:123456789:loan-alerts',
        message='Loan ETL completed successfully',
    )

    extract >> transform >> load >> notify`}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l border-gray-800 bg-gray-900/50 overflow-auto">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-medium">Job Properties</h3>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Job Name</label>
                <input
                  type="text"
                  value={jobConfig.name}
                  onChange={e => setJobConfig({...jobConfig, name: e.target.value})}
                  placeholder="my-job-name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Schedule</label>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setJobConfig({...jobConfig, scheduleType: 'cron'})}
                    className={`flex-1 py-1.5 text-sm rounded-lg border ${
                      jobConfig.scheduleType === 'cron'
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-300'
                        : 'bg-gray-800 border-gray-700 text-gray-400'
                    }`}
                  >
                    Cron
                  </button>
                  <button
                    onClick={() => setJobConfig({...jobConfig, scheduleType: 'rate'})}
                    className={`flex-1 py-1.5 text-sm rounded-lg border ${
                      jobConfig.scheduleType === 'rate'
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-300'
                        : 'bg-gray-800 border-gray-700 text-gray-400'
                    }`}
                  >
                    Rate
                  </button>
                </div>
                {jobConfig.scheduleType === 'cron' ? (
                  <input
                    type="text"
                    value={jobConfig.cronExpression}
                    onChange={e => setJobConfig({...jobConfig, cronExpression: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-pink-500"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={jobConfig.rateValue}
                      onChange={e => setJobConfig({...jobConfig, rateValue: e.target.value})}
                      className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                    />
                    <select
                      value={jobConfig.rateUnit}
                      onChange={e => setJobConfig({...jobConfig, rateUnit: e.target.value})}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                    >
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </select>
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1.5">
                  {jobConfig.scheduleType === 'cron' 
                    ? 'Daily at 2:00 AM' 
                    : `Every ${jobConfig.rateValue} ${jobConfig.rateUnit}`}
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Timezone</label>
                <select
                  value={jobConfig.timezone}
                  onChange={e => setJobConfig({...jobConfig, timezone: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                >
                  <option value="America/New_York">America/New_York (EST/EDT)</option>
                  <option value="America/Chicago">America/Chicago (CST/CDT)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                  <option value="UTC">UTC</option>
                </select>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1.5">
                  <Check size={12} />
                  DST handled automatically
                </div>
              </div>

              {/* Target Platform */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Deployment Target</label>
                <div className="space-y-2">
                  {[
                    { id: 'auto', label: 'Auto (Recommended)', desc: 'Let ROSIE decide' },
                    { id: 'eventbridge', label: 'EventBridge Scheduler', desc: 'Simple schedules' },
                    { id: 'mwaa', label: 'MWAA (Airflow)', desc: 'Complex workflows' },
                  ].map(opt => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        jobConfig.target === opt.id
                          ? 'bg-pink-500/10 border-pink-500/50'
                          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="target"
                        checked={jobConfig.target === opt.id}
                        onChange={() => setJobConfig({...jobConfig, target: opt.id})}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Retries */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Retries</label>
                <input
                  type="number"
                  value={jobConfig.retries}
                  onChange={e => setJobConfig({...jobConfig, retries: parseInt(e.target.value)})}
                  min="0"
                  max="10"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Flexible Window */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Flexible Window (minutes)</label>
                <input
                  type="number"
                  value={jobConfig.flexibleWindow}
                  onChange={e => setJobConfig({...jobConfig, flexibleWindow: e.target.value})}
                  min="0"
                  max="1440"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                />
                <div className="text-xs text-gray-500 mt-1.5">
                  Job can run within {jobConfig.flexibleWindow} min of scheduled time
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {jobConfig.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                      <button className="hover:text-red-400">
                        <Trash2 size={10} />
                      </button>
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 text-pink-400 text-xs px-2 py-1 hover:bg-gray-800 rounded">
                    <Plus size={10} />
                    Add tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modals */}
      {showTriggerModal && <TriggerModal />}
      {showDeleteModal && <DeleteModal />}
      {selectedJob && <JobDetailPanel />}
      {showDiagnostics && <DiagnosticsPanel />}
    </>
  );

  // ============================================
  // RENDER CONTENT BASED ON ACTIVE NAV
  // ============================================
  const renderContent = () => {
    switch (activeNav) {
      case 'home': return renderHomeView();
      case 'mom': return renderMOMView();
      case 'dad': return renderDADView();
      case 'auntie': return renderAUNTIEView();
      case 'rosie': return renderROSIEView();
      default: return renderHomeView();
    }
  };

  // Get header info based on active nav
  const getHeaderInfo = () => {
    switch (activeNav) {
      case 'home': return { icon: Home, label: 'Home', sublabel: 'Dashboard' };
      case 'mom': return { icon: Box, label: 'M.O.M.', sublabel: 'Infrastructure' };
      case 'dad': return { icon: Shield, label: 'D.A.D.', sublabel: 'Service Mesh' };
      case 'auntie': return { icon: MessageSquare, label: 'A.U.N.T.I.E.', sublabel: 'Messaging' };
      case 'rosie': return { icon: Clock, label: 'R.O.S.I.E.', sublabel: 'Scheduling' };
      default: return { icon: Home, label: 'Home', sublabel: 'Dashboard' };
    }
  };

  const headerInfo = getHeaderInfo();

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg">
              M
            </div>
            <div>
              <div className="font-semibold">M.O.M. Portal</div>
              <div className="text-xs text-gray-500">Platform Engineering</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                setShowNewJob(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                activeNav === item.id 
                  ? `bg-${item.color || 'violet'}-500/20 text-${item.color || 'violet'}-300 border border-${item.color || 'violet'}-500/30` 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <item.icon size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.label}</div>
                {item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}
              </div>
              {activeNav === item.id && <ChevronRight size={16} className={`text-${item.color || 'violet'}-400`} />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-medium text-gray-900">
              LA
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Luke Angel</div>
              <div className="text-xs text-gray-500">Platform PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <headerInfo.icon className={`text-${getActiveColor()}-400`} size={20} />
              <span className="font-semibold">{headerInfo.label}</span>
              <span className="text-gray-500">/ {headerInfo.sublabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <HelpCircle size={18} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
