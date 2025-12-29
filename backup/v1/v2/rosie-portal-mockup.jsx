import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Play, Save, GitBranch, Layout, Code, Settings, ChevronRight, Check, 
  AlertCircle, Plus, Trash2, ArrowRight, Zap, Database, FileText, Bell, RefreshCw, 
  Home, Layers, MessageSquare, Shield, Box, User, Search, HelpCircle,
  Pause, Copy, ExternalLink, Activity, AlertTriangle, CheckCircle2, XCircle, Timer,
  ChevronDown, ChevronUp, Filter, Download, Upload, Terminal, Eye, Edit2, Link2,
  Lock, Unlock, Users, DollarSign, TrendingDown, BarChart3, Cpu, HardDrive, Network,
  Wrench, Bug, Lightbulb, X, ChevronLeft, RotateCcw, Bookmark, Tag, FolderOpen,
  Globe, Server, Workflow, CircleDot, Loader2, Info, Sparkles
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockJobs = [
  { 
    id: 1, 
    name: 'loan-etl-daily', 
    type: 'dag', 
    target: 'mwaa', 
    schedule: '0 2 * * *',
    scheduleHuman: 'Daily at 2:00 AM EST',
    status: 'active', 
    lastRun: '2 hours ago',
    lastRunStatus: 'success',
    nextRun: 'Tomorrow 2:00 AM',
    owner: 'loans-origination',
    tags: ['loans', 'etl', 'production'],
    successRate: 98.5,
    avgDuration: '45m 23s',
    estimatedCost: '$2.45/mo',
    taskCount: 4,
    description: 'Daily ETL pipeline for loan origination data warehouse refresh'
  },
  { 
    id: 2, 
    name: 'db-backup-nightly', 
    type: 'schedule', 
    target: 'eventbridge', 
    schedule: '0 3 * * *',
    scheduleHuman: 'Daily at 3:00 AM EST',
    status: 'active', 
    lastRun: '5 hours ago',
    lastRunStatus: 'success',
    nextRun: 'Tomorrow 3:00 AM',
    owner: 'platform-dba',
    tags: ['backup', 'database', 'critical'],
    successRate: 100,
    avgDuration: '12m 08s',
    estimatedCost: '$0.15/mo',
    taskCount: 1,
    description: 'Nightly PostgreSQL backup to S3 with point-in-time recovery'
  },
  { 
    id: 3, 
    name: 'cache-invalidation', 
    type: 'schedule', 
    target: 'eventbridge', 
    schedule: 'rate(1 hour)',
    scheduleHuman: 'Every hour',
    status: 'active', 
    lastRun: '23 min ago',
    lastRunStatus: 'success',
    nextRun: 'In 37 minutes',
    owner: 'platform-cache',
    tags: ['cache', 'redis', 'maintenance'],
    successRate: 99.8,
    avgDuration: '8s',
    estimatedCost: '$0.02/mo',
    taskCount: 1,
    description: 'Hourly cache invalidation for product catalog updates'
  },
  { 
    id: 4, 
    name: 'month-end-reporting', 
    type: 'dag', 
    target: 'mwaa', 
    schedule: '0 6 1 * *',
    scheduleHuman: '1st of month at 6:00 AM EST',
    status: 'paused', 
    lastRun: '29 days ago',
    lastRunStatus: 'success',
    nextRun: 'Jan 1, 6:00 AM',
    owner: 'finance-reporting',
    tags: ['finance', 'sox', 'reporting', 'cross-bto'],
    successRate: 95.2,
    avgDuration: '2h 15m',
    estimatedCost: '$8.50/mo',
    taskCount: 12,
    description: 'Cross-BTO month-end financial reporting and reconciliation'
  },
  { 
    id: 5, 
    name: 'payments-reconciliation', 
    type: 'dag', 
    target: 'mwaa', 
    schedule: '0 4 * * *',
    scheduleHuman: 'Daily at 4:00 AM EST',
    status: 'active', 
    lastRun: '4 hours ago',
    lastRunStatus: 'failed',
    nextRun: 'Tomorrow 4:00 AM',
    owner: 'payments-gateway',
    tags: ['payments', 'reconciliation', 'critical'],
    successRate: 94.1,
    avgDuration: '1h 05m',
    estimatedCost: '$4.20/mo',
    taskCount: 8,
    description: 'Daily payment gateway reconciliation with bank feeds'
  },
];

const mockRuns = [
  { id: 'run-001', jobName: 'loan-etl-daily', status: 'success', startTime: '2024-12-23 02:00:05', duration: '44m 12s', triggeredBy: 'schedule', tasks: { total: 4, success: 4, failed: 0 } },
  { id: 'run-002', jobName: 'payments-reconciliation', status: 'failed', startTime: '2024-12-23 04:00:02', duration: '32m 45s', triggeredBy: 'schedule', tasks: { total: 8, success: 5, failed: 3 }, error: 'Bank API timeout on task: fetch_transactions' },
  { id: 'run-003', jobName: 'db-backup-nightly', status: 'success', startTime: '2024-12-23 03:00:01', duration: '11m 58s', triggeredBy: 'schedule', tasks: { total: 1, success: 1, failed: 0 } },
  { id: 'run-004', jobName: 'cache-invalidation', status: 'success', startTime: '2024-12-23 10:00:00', duration: '7s', triggeredBy: 'schedule', tasks: { total: 1, success: 1, failed: 0 } },
  { id: 'run-005', jobName: 'loan-etl-daily', status: 'success', startTime: '2024-12-22 02:00:03', duration: '46m 05s', triggeredBy: 'schedule', tasks: { total: 4, success: 4, failed: 0 } },
  { id: 'run-006', jobName: 'loan-etl-daily', status: 'running', startTime: '2024-12-24 02:00:01', duration: '12m 34s...', triggeredBy: 'schedule', tasks: { total: 4, success: 2, failed: 0, running: 1, pending: 1 } },
  { id: 'run-007', jobName: 'cache-invalidation', status: 'success', startTime: '2024-12-23 09:00:00', duration: '8s', triggeredBy: 'schedule', tasks: { total: 1, success: 1, failed: 0 } },
  { id: 'run-008', jobName: 'payments-reconciliation', status: 'success', startTime: '2024-12-22 04:00:01', duration: '1h 02m', triggeredBy: 'manual', tasks: { total: 8, success: 8, failed: 0 } },
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

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const App = () => {
  const [activeNav, setActiveNav] = useState('rosie');
  const [activeTab, setActiveTab] = useState('jobs');
  const [showNewJob, setShowNewJob] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [designerMode, setDesignerMode] = useState('visual');
  const [showTriggerModal, setShowTriggerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToAction, setJobToAction] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTarget, setFilterTarget] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsTab, setSettingsTab] = useState('connections');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [runLogExpanded, setRunLogExpanded] = useState(null);
  
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
    { id: 1, type: 'extract', name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: 'loans-prod-rds', table: 'loans', query: 'SELECT * FROM loans WHERE status = active' } },
    { id: 2, type: 'transform', name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Glue ETL', script: 'loan-transform.py' } },
    { id: 3, type: 'load', name: 'Load to DW', icon: 'file', color: 'emerald', config: { target: 'Redshift', connection: 'analytics-redshift', schema: 'analytics', table: 'loan_facts' } },
    { id: 4, type: 'notify', name: 'Send Alert', icon: 'bell', color: 'pink', config: { topic_arn: 'arn:aws:sns:us-east-1:123456789:loan-alerts', message: 'ETL completed successfully' } },
  ]);
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [operatorCategory, setOperatorCategory] = useState('all');
  const [newTag, setNewTag] = useState('');

  // Navigation items
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'mom', icon: Box, label: 'M.O.M.', subtitle: 'Infrastructure' },
    { id: 'dad', icon: Shield, label: 'D.A.D.', subtitle: 'Service Mesh' },
    { id: 'auntie', icon: MessageSquare, label: 'A.U.N.T.I.E.', subtitle: 'Messaging' },
    { id: 'rosie', icon: Clock, label: 'R.O.S.I.E.', subtitle: 'Scheduling' },
  ];

  // Filter jobs
  const filteredJobs = mockJobs.filter(job => {
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (filterTarget !== 'all' && job.target !== filterTarget) return false;
    if (searchQuery && !job.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Get target recommendation
  const getTargetRecommendation = () => {
    if (jobConfig.target !== 'auto') return null;
    const hasComplexDeps = workflowNodes.length > 2;
    const isCrossBTO = jobConfig.tags.some(t => t.includes('cross-bto'));
    if (hasComplexDeps || isCrossBTO) {
      return { platform: 'mwaa', reason: 'Complex workflow detected — MWAA recommended for DAG visualization and dependency management' };
    }
    return { platform: 'eventbridge', reason: 'Simple schedule — EventBridge Scheduler recommended for low latency and cost' };
  };

  const recommendation = getTargetRecommendation();

  // DAG Editor handlers
  const handleAddNode = (type) => {
    const nodeTypes = {
      // Data operators
      extract: { name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: '', table: '', query: '' } },
      transform: { name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Configure...', script: '' } },
      load: { name: 'Load Data', icon: 'file', color: 'emerald', config: { target: 'Configure...', connection: '', schema: '', table: '' } },
      
      // Sensors
      s3_sensor: { name: 'Wait for S3 File', icon: 'clock', color: 'orange', config: { bucket: '', prefix: '', wildcard: '*.csv', poke_interval: 60, timeout: 3600 } },
      sqs_sensor: { name: 'Poll SQS Queue', icon: 'clock', color: 'orange', config: { queue_url: '', max_messages: 10, wait_time: 20, visibility_timeout: 300 } },
      http_sensor: { name: 'Wait for HTTP', icon: 'globe', color: 'orange', config: { endpoint: '', method: 'GET', response_check: 'status == 200', poke_interval: 60 } },
      sql_sensor: { name: 'Wait for SQL', icon: 'database', color: 'orange', config: { connection: '', sql: 'SELECT 1 WHERE condition', poke_interval: 60 } },
      
      // AWS Services
      lambda: { name: 'Lambda Function', icon: 'zap', color: 'yellow', config: { function_name: '', payload: '{}', invocation_type: 'RequestResponse' } },
      batch: { name: 'Batch Job', icon: 'layers', color: 'yellow', config: { job_name: '', job_queue: 'rosie-batch-queue', job_definition: '', parameters: '{}' } },
      glue: { name: 'Glue Job', icon: 'refresh', color: 'yellow', config: { job_name: '', script_args: '{}', allocated_capacity: 2 } },
      ecs: { name: 'ECS Task', icon: 'layers', color: 'yellow', config: { cluster: '', task_definition: '', launch_type: 'FARGATE', overrides: '{}' } },
      step_function: { name: 'Step Function', icon: 'git-branch', color: 'yellow', config: { state_machine_arn: '', input: '{}' } },
      emr: { name: 'EMR Step', icon: 'database', color: 'yellow', config: { cluster_id: '', step_name: '', jar: '', args: [] } },
      sns: { name: 'SNS Publish', icon: 'bell', color: 'pink', config: { topic_arn: '', message: '', subject: '' } },
      sqs_send: { name: 'SQS Send', icon: 'bell', color: 'pink', config: { queue_url: '', message_body: '', delay_seconds: 0 } },
      
      // Control flow
      condition: { name: 'Branch', icon: 'git-branch', color: 'purple', config: { rule: '', true_branch: '', false_branch: '' } },
      parallel: { name: 'Parallel', icon: 'layers', color: 'purple', config: { branches: [] } },
      wait: { name: 'Wait', icon: 'clock', color: 'purple', config: { duration: 60, duration_unit: 'seconds' } },
      trigger_dag: { name: 'Trigger DAG', icon: 'play', color: 'purple', config: { dag_id: '', wait_for_completion: true, conf: '{}' } },
      notify: { name: 'Notify', icon: 'bell', color: 'pink', config: { channel: 'sns', topic: '', message: '' } },
    };
    const newNode = {
      id: Date.now(),
      type,
      ...nodeTypes[type]
    };
    setWorkflowNodes([...workflowNodes, newNode]);
    setSelectedNode(newNode);
  };

  const handleRemoveNode = (nodeId) => {
    setWorkflowNodes(workflowNodes.filter(n => n.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleSelectNode = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const handleUpdateNode = (nodeId, updates) => {
    setWorkflowNodes(workflowNodes.map(n => 
      n.id === nodeId ? { ...n, ...updates } : n
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode({ ...selectedNode, ...updates });
    }
  };

  const handleUpdateNodeConfig = (nodeId, key, value) => {
    setWorkflowNodes(workflowNodes.map(n => 
      n.id === nodeId ? { ...n, config: { ...n.config, [key]: value } } : n
    ));
    if (selectedNode?.id === nodeId) {
      setSelectedNode({ ...selectedNode, config: { ...selectedNode.config, [key]: value } });
    }
  };

  const handleAddTag = () => {
    if (newTag && !jobConfig.tags.includes(newTag)) {
      setJobConfig({ ...jobConfig, tags: [...jobConfig.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveJobTag = (tag) => {
    setJobConfig({ ...jobConfig, tags: jobConfig.tags.filter(t => t !== tag) });
  };

  // Handle editing an existing job
  const handleEditJob = (job) => {
    setJobToEdit(job);
    setEditMode(true);
    // Load job config into form
    setJobConfig({
      name: job.name,
      description: job.description || '',
      scheduleType: job.schedule.startsWith('rate') ? 'rate' : 'cron',
      cronExpression: job.schedule.startsWith('rate') ? '0 2 * * *' : job.schedule,
      rateValue: '1',
      rateUnit: 'hours',
      timezone: 'America/New_York',
      target: job.target,
      targetType: 'lambda',
      targetArn: '',
      retries: 3,
      flexibleWindow: '15',
      tags: job.tags || []
    });
    // Load workflow nodes (simulated - in real app would load from job definition)
    if (job.type === 'dag') {
      setWorkflowNodes([
        { id: 1, type: 'extract', name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: 'loans-rds', table: 'loans', query: '' } },
        { id: 2, type: 'transform', name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Glue ETL', script: 'transform.py' } },
        { id: 3, type: 'load', name: 'Load to DW', icon: 'file', color: 'emerald', config: { target: 'Redshift', connection: 'analytics-redshift', schema: 'analytics', table: 'loan_facts' } },
        { id: 4, type: 'notify', name: 'Send Alert', icon: 'bell', color: 'pink', config: { channel: 'sns', topic: 'loan-alerts', message: 'ETL completed' } },
      ]);
    } else {
      setWorkflowNodes([
        { id: 1, type: 'lambda', name: job.name, icon: 'zap', color: 'yellow', config: { function_name: job.name, payload: '{}', invocation_type: 'RequestResponse' } },
      ]);
    }
    setSelectedJob(null); // Close detail panel
    setShowNewJob(true); // Open designer
  };

  // Handle closing designer
  const handleCloseDesigner = () => {
    setShowNewJob(false);
    setEditMode(false);
    setJobToEdit(null);
  };

  // Save notification state
  const [saveNotification, setSaveNotification] = useState(null);

  // Handle saving job (create or update)
  const handleSaveJob = () => {
    // Validate
    if (!jobConfig.name && !editMode) {
      setSaveNotification({ type: 'error', message: 'Please enter a job name' });
      setTimeout(() => setSaveNotification(null), 3000);
      return;
    }

    // In a real app, this would call an API
    // For now, just show success and close
    const message = editMode 
      ? `Job "${jobToEdit?.name}" updated successfully`
      : `Job "${jobConfig.name || 'new-job'}" created successfully`;
    
    setSaveNotification({ type: 'success', message });
    
    // Close designer after brief delay
    setTimeout(() => {
      setSaveNotification(null);
      handleCloseDesigner();
    }, 1500);
  };

  // Calculate platform stats
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

  // ============================================================================
  // SUB-COMPONENTS
  // ============================================================================

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
            <input 
              type="datetime-local" 
              defaultValue="2024-12-24T02:00"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Configuration Override (JSON)</label>
            <textarea 
              rows={4}
              placeholder='{"param1": "value1"}'
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="clearPrevious" className="rounded" />
            <label htmlFor="clearPrevious" className="text-sm text-gray-300">Clear previous task instances</label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-800">
          <button onClick={() => setShowTriggerModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">
            Cancel
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-medium">
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
          <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">
            Cancel
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium">
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
            <p className="text-sm text-gray-500">Fix Workflow Integration</p>
          </div>
        </div>
        <button onClick={() => setShowDiagnostics(false)} className="p-2 hover:bg-gray-800 rounded-lg">
          <X size={18} className="text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Health Checks */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Activity size={14} />
            Health Checks
          </h4>
          {[
            { name: 'MWAA Environment', status: 'healthy', detail: 'All workers healthy' },
            { name: 'EventBridge Scheduler', status: 'healthy', detail: '3 schedules active' },
            { name: 'IAM Permissions', status: 'healthy', detail: 'Cross-account roles valid' },
            { name: 'Bank API Connection', status: 'warning', detail: 'High latency detected (2.3s)' },
            { name: 'S3 DAG Bucket', status: 'healthy', detail: 'Sync operational' },
          ].map((check, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  check.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'
                }`} />
                <div>
                  <div className="text-sm font-medium">{check.name}</div>
                  <div className="text-xs text-gray-500">{check.detail}</div>
                </div>
              </div>
              {check.status === 'warning' && (
                <button className="text-xs text-amber-400 hover:text-amber-300">Fix</button>
              )}
            </div>
          ))}
        </div>

        {/* Recent Issues */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Bug size={14} />
            Recent Issues
          </h4>
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

        {/* Recommendations */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Lightbulb size={14} />
            Recommendations
          </h4>
          <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-violet-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-violet-300">Optimize month-end-reporting</div>
                <div className="text-xs text-gray-400 mt-1">Consider parallelizing tasks 3-7 to reduce runtime by ~40%</div>
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
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'
            }`}>
              {job.type === 'dag' ? <GitBranch size={20} /> : <Zap size={20} />}
            </div>
            <div>
              <h3 className="font-semibold">{job.name}</h3>
              <p className="text-sm text-gray-500">{job.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleEditJob(job)}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-violet-400"
              title="Edit Job"
            >
              <Edit2 size={18} />
            </button>
            <button 
              onClick={() => { setJobToAction(job); setShowTriggerModal(true); }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              <Play size={14} />
              Trigger
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Status Overview */}
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

          {/* Schedule Info */}
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

          {/* Description */}
          <div className="p-4 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
            <p className="text-sm text-gray-300">{job.description}</p>
          </div>

          {/* Tags */}
          <div className="p-4 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Access Control */}
          <div className="p-4 border-b border-gray-800">
            <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <Lock size={14} />
              Access Control (RBAC)
            </h4>
            <div className="space-y-2">
              {[
                { role: `${job.owner}-admins`, perms: ['read', 'edit', 'delete', 'trigger'] },
                { role: `${job.owner}-developers`, perms: ['read', 'edit', 'trigger'] },
                { role: `${job.owner}-viewers`, perms: ['read'] },
                { role: 'platform-admins', perms: ['read', 'edit', 'delete', 'trigger'] },
                { role: 'auditors', perms: ['read'] },
              ].map((acl, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-mono">{acl.role}</span>
                  <div className="flex gap-1">
                    {acl.perms.map((p, j) => (
                      <span key={j} className="px-1.5 py-0.5 bg-gray-700 text-gray-400 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAG Visualization (for MWAA jobs) */}
          {job.type === 'dag' && (
            <div className="p-4 border-b border-gray-800">
              <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <Workflow size={14} />
                DAG Structure
              </h4>
              <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3 overflow-x-auto">
                {Array.from({ length: job.taskCount }).map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="flex-shrink-0 w-20 h-16 bg-gray-700 rounded-lg flex flex-col items-center justify-center border border-gray-600">
                      <Database size={16} className="text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400">Task {i + 1}</span>
                    </div>
                    {i < job.taskCount - 1 && <ArrowRight size={16} className="text-gray-600 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
              <button className="mt-3 text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
                <ExternalLink size={14} />
                Open in Airflow UI
              </button>
            </div>
          )}

          {/* Recent Runs */}
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
                    <button className="text-gray-400 hover:text-gray-200">
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg">
              <Copy size={14} />
              Clone
            </button>
            <button 
              onClick={() => { setJobToAction(job); setShowDeleteModal(true); }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
          <button className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg ${
            job.status === 'active' 
              ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
          }`}>
            {job.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
            {job.status === 'active' ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MAIN TABS CONTENT
  // ============================================================================

  // Jobs List Tab
  const JobsTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Scheduled Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your scheduled tasks and workflows</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowDiagnostics(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg border border-gray-700"
          >
            <Wrench size={16} />
            Diagnostics
          </button>
          <button 
            onClick={() => {
              setEditMode(false);
              setJobToEdit(null);
              setJobConfig({
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
                tags: ['loans', 'production']
              });
              setWorkflowNodes([
                { id: 1, type: 'extract', name: 'Extract Data', icon: 'database', color: 'blue', config: { sourceType: 'database', connection: '', table: '', query: '' } },
                { id: 2, type: 'transform', name: 'Transform', icon: 'refresh', color: 'amber', config: { job: 'Configure...', script: '' } },
                { id: 3, type: 'load', name: 'Load to DW', icon: 'file', color: 'emerald', config: { target: 'Configure...', connection: '', schema: '', table: '' } },
                { id: 4, type: 'notify', name: 'Send Alert', icon: 'bell', color: 'pink', config: { channel: 'sns', topic: '', message: '' } },
              ]);
              setShowNewJob(true);
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} />
            New Job
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Active Jobs', value: platformStats.active, color: 'emerald', icon: CheckCircle2 },
          { label: 'Paused', value: platformStats.paused, color: 'amber', icon: Pause },
          { label: 'Failed (24h)', value: platformStats.failed24h, color: 'red', icon: XCircle },
          { label: 'Success Rate', value: `${platformStats.successRate}%`, color: 'violet', icon: TrendingDown },
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
          <select 
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-violet-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
          <select 
            value={filterTarget}
            onChange={e => setFilterTarget(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-violet-500"
          >
            <option value="all">All Platforms</option>
            <option value="eventbridge">EventBridge</option>
            <option value="mwaa">MWAA</option>
          </select>
        </div>
        <div className="flex-1" />
        <div className="text-sm text-gray-500">{filteredJobs.length} jobs</div>
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
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Next Run</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Cost</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr 
                key={job.id} 
                className="border-b border-gray-700/50 hover:bg-gray-800/30 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'
                    }`}>
                      {job.type === 'dag' ? <GitBranch size={16} /> : <Zap size={16} />}
                    </div>
                    <div>
                      <div className="font-medium">{job.name}</div>
                      <div className="text-xs text-gray-500">{job.owner}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <PlatformBadge target={job.target} />
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">
                    {job.schedule}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={job.lastRunStatus} />
                    <span className="text-sm text-gray-500">{job.lastRun}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{job.nextRun}</td>
                <td className="px-4 py-3 text-sm text-emerald-400">{job.estimatedCost}</td>
                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => { setJobToAction(job); setShowTriggerModal(true); }}
                      className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-emerald-400"
                      title="Trigger"
                    >
                      <Play size={14} />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-amber-400"
                      title={job.status === 'active' ? 'Pause' : 'Resume'}
                    >
                      {job.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button 
                      onClick={() => handleEditJob(job)}
                      className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-violet-400"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 90/10 Split Indicator */}
      <div className="mt-6 bg-gray-800/30 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <BarChart3 size={16} className="text-violet-400" />
            Platform Distribution (90/10 Target)
          </div>
          <div className="text-xs text-gray-500">
            Your jobs: {Math.round(platformStats.eventbridge / platformStats.total * 100)}% EventBridge / {Math.round(platformStats.mwaa / platformStats.total * 100)}% MWAA
          </div>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-700">
          <div className="bg-cyan-500 transition-all" style={{ width: `${platformStats.eventbridge / platformStats.total * 100}%` }} />
          <div className="bg-fuchsia-500 transition-all" style={{ width: `${platformStats.mwaa / platformStats.total * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>EventBridge Scheduler (Target: 90%)</span>
          <span>MWAA (Target: 10%)</span>
        </div>
      </div>
    </div>
  );

  // Run History Tab
  const RunsTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Run History</h1>
          <p className="text-gray-500 text-sm mt-1">View execution history and logs</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-violet-500">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg border border-gray-700">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Run Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Runs', value: mockRuns.length, color: 'gray' },
          { label: 'Successful', value: mockRuns.filter(r => r.status === 'success').length, color: 'emerald' },
          { label: 'Failed', value: mockRuns.filter(r => r.status === 'failed').length, color: 'red' },
          { label: 'Running', value: mockRuns.filter(r => r.status === 'running').length, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="text-gray-400 text-sm">{stat.label}</div>
            <div className={`text-2xl font-semibold mt-1 text-${stat.color}-400`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Runs List */}
      <div className="space-y-3">
        {mockRuns.map(run => (
          <div key={run.id} className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-800/50"
              onClick={() => setRunLogExpanded(runLogExpanded === run.id ? null : run.id)}
            >
              <div className="flex items-center gap-4">
                <StatusBadge status={run.status} size="md" />
                <div>
                  <div className="font-medium">{run.jobName}</div>
                  <div className="text-sm text-gray-500">{run.startTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-400">
                  <span className="text-gray-500">Duration:</span> {run.duration}
                </div>
                <div className="text-sm text-gray-400">
                  <span className="text-gray-500">Triggered:</span> {run.triggeredBy}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-400">{run.tasks.success} ✓</span>
                  {run.tasks.failed > 0 && <span className="text-red-400">{run.tasks.failed} ✗</span>}
                  {run.tasks.running > 0 && <span className="text-blue-400">{run.tasks.running} ⟳</span>}
                </div>
                {runLogExpanded === run.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
            </div>
            
            {runLogExpanded === run.id && (
              <div className="border-t border-gray-700 p-4 bg-gray-900/50">
                {run.error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-2 text-sm text-red-300">
                      <XCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Error</div>
                        <div className="text-red-400 mt-1">{run.error}</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <Terminal size={14} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-400">Logs</span>
                </div>
                <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs text-gray-400 max-h-48 overflow-auto">
                  <div className="text-gray-500">[{run.startTime}] Starting job execution...</div>
                  <div className="text-emerald-400">[{run.startTime}] Task 1/4: extract_data - SUCCESS (2m 15s)</div>
                  <div className="text-emerald-400">[{run.startTime}] Task 2/4: transform_data - SUCCESS (15m 30s)</div>
                  {run.status === 'failed' ? (
                    <div className="text-red-400">[{run.startTime}] Task 3/4: fetch_transactions - FAILED (32m 45s)</div>
                  ) : (
                    <>
                      <div className="text-emerald-400">[{run.startTime}] Task 3/4: load_to_warehouse - SUCCESS (25m 10s)</div>
                      <div className="text-emerald-400">[{run.startTime}] Task 4/4: send_notification - SUCCESS (2s)</div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    <Eye size={14} />
                    Full Logs
                  </button>
                  <span className="text-gray-600">•</span>
                  <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    <RotateCcw size={14} />
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Airflow UI Tab
  const AirflowTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Airflow UI Access</h1>
          <p className="text-gray-500 text-sm mt-1">Direct access to MWAA for advanced debugging</p>
        </div>
      </div>

      {/* Access Info */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 flex items-center justify-center">
            <GitBranch size={24} className="text-fuchsia-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">MWAA Environment</h3>
            <p className="text-gray-400 text-sm mt-1">mwaa-rosie-prod.us-east-1.amazonaws.com</p>
            <div className="flex items-center gap-4 mt-4">
              <a 
                href="#" 
                className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 rounded-lg text-sm font-medium"
              >
                <ExternalLink size={16} />
                Open Airflow UI
              </a>
              <span className="text-sm text-gray-500">Opens in new tab with SSO authentication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Your Role */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
          <Users size={16} />
          Your Access Level
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-medium text-gray-900">
              LA
            </div>
            <div>
              <div className="font-medium">Luke Angel</div>
              <div className="text-sm text-gray-500">luke.angel@company.com</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm rounded-full border border-violet-500/30">
              platform-admins
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30">
              loans-origination-developers
            </span>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Lock size={16} />
            Permission Matrix
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-800/50">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Role</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">View DAGs</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Trigger</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Edit</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Delete</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-400">Admin</th>
            </tr>
          </thead>
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
                <td className="px-4 py-3 text-center">{row.view ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-gray-600 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{row.trigger ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-gray-600 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{row.edit ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-gray-600 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{row.del ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-gray-600 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{row.admin ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-gray-600 mx-auto" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Settings Tab
  const SettingsTab = () => (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <div className="w-56 border-r border-gray-800 p-4">
        <nav className="space-y-1">
          {[
            { id: 'connections', icon: Link2, label: 'Connections' },
            { id: 'variables', icon: Settings, label: 'Variables' },
            { id: 'pools', icon: Layers, label: 'Pools' },
            { id: 'team', icon: Users, label: 'Team Access' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'costs', icon: DollarSign, label: 'Cost Management' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setSettingsTab(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                settingsTab === item.id
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-6 overflow-auto">
        {settingsTab === 'connections' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Connections</h2>
                <p className="text-gray-500 text-sm">Manage Airflow connections for external services</p>
              </div>
              <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} />
                Add Connection
              </button>
            </div>
            <div className="space-y-3">
              {mockConnections.map(conn => (
                <div key={conn.id} className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                      {conn.type === 'aws' && <Server size={18} className="text-amber-400" />}
                      {conn.type === 'postgres' && <Database size={18} className="text-blue-400" />}
                      {conn.type === 'redis' && <Cpu size={18} className="text-red-400" />}
                      {conn.type === 's3' && <HardDrive size={18} className="text-emerald-400" />}
                      {conn.type === 'http' && <Globe size={18} className="text-violet-400" />}
                    </div>
                    <div>
                      <div className="font-medium">{conn.name}</div>
                      <div className="text-sm text-gray-500">{conn.host}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={conn.status} />
                    <span className="text-sm text-gray-500">Tested {conn.lastTested}</span>
                    <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                      <Edit2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {settingsTab === 'variables' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Variables</h2>
                <p className="text-gray-500 text-sm">Manage Airflow variables for DAG configuration</p>
              </div>
              <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} />
                Add Variable
              </button>
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Key</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Value</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Description</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockVariables.map((v, i) => (
                    <tr key={i} className="border-b border-gray-700/50">
                      <td className="px-4 py-3 font-mono text-sm text-violet-300">{v.key}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {v.encrypted && <Lock size={12} className="text-amber-400" />}
                          <code className="text-sm text-gray-300">{v.value}</code>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{v.description}</td>
                      <td className="px-4 py-3">
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                          <Edit2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {settingsTab === 'costs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Cost Management</h2>
                <p className="text-gray-500 text-sm">Track and optimize scheduling costs</p>
              </div>
            </div>

            {/* Cost Comparison */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-emerald-300 mb-4">Migration Savings</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Control-M (Legacy)</div>
                  <div className="text-2xl font-bold text-red-400">$1,300,000<span className="text-sm font-normal">/yr</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">ROSIE (Current)</div>
                  <div className="text-2xl font-bold text-emerald-400">$77,500<span className="text-sm font-normal">/yr</span></div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Annual Savings</div>
                  <div className="text-2xl font-bold text-cyan-400">94%</div>
                </div>
              </div>
            </div>

            {/* Cost by Platform */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={18} className="text-cyan-400" />
                  <h3 className="font-medium">EventBridge Scheduler</h3>
                </div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">$0.17<span className="text-lg font-normal text-gray-400">/mo</span></div>
                <div className="text-sm text-gray-500">{platformStats.eventbridge} schedules × $1/million invocations</div>
              </div>
              <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch size={18} className="text-fuchsia-400" />
                  <h3 className="font-medium">MWAA (Airflow)</h3>
                </div>
                <div className="text-3xl font-bold text-fuchsia-400 mb-2">$15.15<span className="text-lg font-normal text-gray-400">/mo</span></div>
                <div className="text-sm text-gray-500">mw1.medium environment + workers</div>
              </div>
            </div>

            {/* Cost by Job */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium">Cost by Job</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-800/50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Job</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Platform</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Runs/Month</th>
                    <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">Est. Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map(job => (
                    <tr key={job.id} className="border-b border-gray-700/50">
                      <td className="px-4 py-3 text-sm">{job.name}</td>
                      <td className="px-4 py-3"><PlatformBadge target={job.target} /></td>
                      <td className="px-4 py-3 text-sm text-gray-400">~30</td>
                      <td className="px-4 py-3 text-sm text-right text-emerald-400">{job.estimatedCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // New Job Designer
  const NewJobDesigner = () => (
    <div className="flex h-full">
      {/* Designer Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Designer Toolbar */}
        <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between bg-gray-900/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {editMode ? (
                <div className="flex items-center gap-2">
                  <Edit2 size={16} className="text-violet-400" />
                  <span className="font-medium">Edit Job:</span>
                  <span className="text-violet-300">{jobToEdit?.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus size={16} className="text-emerald-400" />
                  <span className="font-medium">New Job</span>
                </div>
              )}
            </div>
            <div className="w-px h-6 bg-gray-700" />
            <button
              onClick={() => setDesignerMode('visual')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                designerMode === 'visual' 
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
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
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
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
                <div className="flex gap-1">
                  {['all', 'data', 'sensors', 'aws', 'control'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setOperatorCategory(cat)}
                      className={`px-2 py-0.5 text-xs rounded transition-colors ${
                        operatorCategory === cat 
                          ? 'bg-fuchsia-500/20 text-fuchsia-300' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-3 flex gap-2 flex-wrap">
                {/* Data Operators */}
                {(operatorCategory === 'all' || operatorCategory === 'data') && (
                  <>
                    <button onClick={() => handleAddNode('extract')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-blue-500/50 transition-colors">
                      <Database size={14} className="text-blue-400" /> Extract
                    </button>
                    <button onClick={() => handleAddNode('transform')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-amber-500/50 transition-colors">
                      <RefreshCw size={14} className="text-amber-400" /> Transform
                    </button>
                    <button onClick={() => handleAddNode('load')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-emerald-500/50 transition-colors">
                      <FileText size={14} className="text-emerald-400" /> Load
                    </button>
                  </>
                )}

                {/* Sensors */}
                {(operatorCategory === 'all' || operatorCategory === 'sensors') && (
                  <>
                    <button onClick={() => handleAddNode('s3_sensor')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-orange-500/50 transition-colors">
                      <Clock size={14} className="text-orange-400" /> S3 Sensor
                    </button>
                    <button onClick={() => handleAddNode('sqs_sensor')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-orange-500/50 transition-colors">
                      <Clock size={14} className="text-orange-400" /> SQS Sensor
                    </button>
                    <button onClick={() => handleAddNode('http_sensor')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-orange-500/50 transition-colors">
                      <Globe size={14} className="text-orange-400" /> HTTP Sensor
                    </button>
                    <button onClick={() => handleAddNode('sql_sensor')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-orange-500/50 transition-colors">
                      <Database size={14} className="text-orange-400" /> SQL Sensor
                    </button>
                  </>
                )}

                {/* AWS Services */}
                {(operatorCategory === 'all' || operatorCategory === 'aws') && (
                  <>
                    <button onClick={() => handleAddNode('lambda')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <Zap size={14} className="text-yellow-400" /> Lambda
                    </button>
                    <button onClick={() => handleAddNode('batch')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <Layers size={14} className="text-yellow-400" /> Batch Job
                    </button>
                    <button onClick={() => handleAddNode('glue')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <RefreshCw size={14} className="text-yellow-400" /> Glue Job
                    </button>
                    <button onClick={() => handleAddNode('ecs')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <Server size={14} className="text-yellow-400" /> ECS Task
                    </button>
                    <button onClick={() => handleAddNode('step_function')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <Workflow size={14} className="text-yellow-400" /> Step Function
                    </button>
                    <button onClick={() => handleAddNode('sns')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-pink-500/50 transition-colors">
                      <Bell size={14} className="text-pink-400" /> SNS Publish
                    </button>
                    <button onClick={() => handleAddNode('sqs_send')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-pink-500/50 transition-colors">
                      <Bell size={14} className="text-pink-400" /> SQS Send
                    </button>
                    <button onClick={() => handleAddNode('emr')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-yellow-500/50 transition-colors">
                      <HardDrive size={14} className="text-yellow-400" /> EMR Step
                    </button>
                  </>
                )}

                {/* Control Flow */}
                {(operatorCategory === 'all' || operatorCategory === 'control') && (
                  <>
                    <button onClick={() => handleAddNode('condition')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-purple-500/50 transition-colors">
                      <GitBranch size={14} className="text-purple-400" /> Branch
                    </button>
                    <button onClick={() => handleAddNode('parallel')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-purple-500/50 transition-colors">
                      <Layers size={14} className="text-purple-400" /> Parallel
                    </button>
                    <button onClick={() => handleAddNode('wait')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-purple-500/50 transition-colors">
                      <Timer size={14} className="text-purple-400" /> Wait
                    </button>
                    <button onClick={() => handleAddNode('trigger_dag')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-purple-500/50 transition-colors">
                      <Play size={14} className="text-purple-400" /> Trigger DAG
                    </button>
                    <button onClick={() => handleAddNode('notify')} className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm hover:border-pink-500/50 transition-colors">
                      <Bell size={14} className="text-pink-400" /> Notify
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Canvas */}
            <div className="relative bg-gray-900 border border-gray-700 rounded-xl min-h-[400px] p-8">
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Hint */}
              {workflowNodes.length > 0 && !selectedNode && (
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-800/80 px-2 py-1 rounded">
                  💡 Click a node to edit its properties
                </div>
              )}
              
              {/* Workflow Nodes */}
              <div className="relative flex items-center gap-4 flex-wrap">
                {workflowNodes.map((node, index) => {
                  const colorMap = {
                    blue: { ring: 'ring-blue-500', border: 'border-blue-500/50 hover:border-blue-500', bg: 'bg-blue-500/20 text-blue-400' },
                    amber: { ring: 'ring-amber-500', border: 'border-amber-500/50 hover:border-amber-500', bg: 'bg-amber-500/20 text-amber-400' },
                    emerald: { ring: 'ring-emerald-500', border: 'border-emerald-500/50 hover:border-emerald-500', bg: 'bg-emerald-500/20 text-emerald-400' },
                    pink: { ring: 'ring-pink-500', border: 'border-pink-500/50 hover:border-pink-500', bg: 'bg-pink-500/20 text-pink-400' },
                    purple: { ring: 'ring-purple-500', border: 'border-purple-500/50 hover:border-purple-500', bg: 'bg-purple-500/20 text-purple-400' },
                    orange: { ring: 'ring-orange-500', border: 'border-orange-500/50 hover:border-orange-500', bg: 'bg-orange-500/20 text-orange-400' },
                    yellow: { ring: 'ring-yellow-500', border: 'border-yellow-500/50 hover:border-yellow-500', bg: 'bg-yellow-500/20 text-yellow-400' },
                  };
                  const colors = colorMap[node.color] || colorMap.blue;
                  
                  const iconMap = {
                    database: Database, refresh: RefreshCw, file: FileText, bell: Bell, 
                    'git-branch': GitBranch, clock: Clock, zap: Zap, layers: Layers,
                    globe: Globe, play: Play
                  };
                  const IconComponent = iconMap[node.icon] || Database;
                  
                  return (
                  <React.Fragment key={node.id}>
                    <div 
                      onClick={() => handleSelectNode(node)}
                      className={`relative bg-gray-800 border-2 rounded-xl p-4 min-w-[140px] group cursor-pointer transition-all ${
                        selectedNode?.id === node.id 
                          ? 'ring-2 ring-offset-2 ring-offset-gray-900 ' + colors.ring + ' border-transparent'
                          : colors.border
                      }`}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400"
                      >
                        <X size={12} />
                      </button>
                      <div className={`w-10 h-10 rounded-lg mb-2 flex items-center justify-center ${colors.bg}`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="text-sm font-medium">{node.name}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[120px]">
                        {node.config && Object.values(node.config)[0] || 'Configure...'}
                      </div>
                      {selectedNode?.id === node.id && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-400 rounded-full" />
                      )}
                    </div>
                    {index < workflowNodes.length - 1 && (
                      <ArrowRight className="text-gray-600 flex-shrink-0" size={24} />
                    )}
                  </React.Fragment>
                )})}
                
                {workflowNodes.length === 0 && (
                  <div className="w-full text-center py-12 text-gray-500">
                    <Plus size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Add operators from the palette above to build your workflow</p>
                  </div>
                )}
              </div>
            </div>

            {/* Target Recommendation */}
            {recommendation && (
              <div className={`mt-4 p-4 rounded-xl border ${
                recommendation.platform === 'mwaa' 
                  ? 'bg-fuchsia-500/10 border-fuchsia-500/30'
                  : 'bg-cyan-500/10 border-cyan-500/30'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    recommendation.platform === 'mwaa'
                      ? 'bg-fuchsia-500/20 text-fuchsia-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {recommendation.platform === 'mwaa' ? <GitBranch size={20} /> : <Zap size={20} />}
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

            {/* Node Properties Editor */}
            {selectedNode && (
              <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedNode.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      selectedNode.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                      selectedNode.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                      selectedNode.color === 'pink' ? 'bg-pink-500/20 text-pink-400' :
                      selectedNode.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                      selectedNode.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                      selectedNode.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedNode.icon === 'database' && <Database size={16} />}
                      {selectedNode.icon === 'refresh' && <RefreshCw size={16} />}
                      {selectedNode.icon === 'file' && <FileText size={16} />}
                      {selectedNode.icon === 'bell' && <Bell size={16} />}
                      {selectedNode.icon === 'git-branch' && <GitBranch size={16} />}
                      {selectedNode.icon === 'clock' && <Clock size={16} />}
                      {selectedNode.icon === 'zap' && <Zap size={16} />}
                      {selectedNode.icon === 'layers' && <Layers size={16} />}
                      {selectedNode.icon === 'globe' && <Globe size={16} />}
                      {selectedNode.icon === 'play' && <Play size={16} />}
                    </div>
                    <div>
                      <div className="font-medium text-sm">Configure: {selectedNode.name}</div>
                      <div className="text-xs text-gray-500">{selectedNode.type.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="p-4 grid grid-cols-2 gap-4">
                  {/* Step Name - always shown */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Step Name</label>
                    <input
                      type="text"
                      value={selectedNode.name}
                      onChange={e => handleUpdateNode(selectedNode.id, { name: e.target.value })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>

                  {/* Extract */}
                  {selectedNode.type === 'extract' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Connection</label>
                        <select
                          value={selectedNode.config?.connection || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'connection', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="">Select connection...</option>
                          <option value="loans-prod-rds">loans-prod-rds</option>
                          <option value="loans-replica-rds">loans-replica-rds</option>
                          <option value="analytics-redshift">analytics-redshift</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Table</label>
                        <input
                          type="text"
                          value={selectedNode.config?.table || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'table', e.target.value)}
                          placeholder="schema.table_name"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-400 mb-1.5">Query</label>
                        <textarea
                          value={selectedNode.config?.query || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'query', e.target.value)}
                          placeholder="SELECT * FROM loans WHERE created_at > '{{ ds }}'"
                          rows={3}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fuchsia-500 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Transform */}
                  {selectedNode.type === 'transform' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Transform Type</label>
                        <select
                          value={selectedNode.config?.job || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'job', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="">Select type...</option>
                          <option value="glue">AWS Glue</option>
                          <option value="lambda">Lambda</option>
                          <option value="batch">Batch Job</option>
                          <option value="emr">EMR Step</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Script/Job Name</label>
                        <input
                          type="text"
                          value={selectedNode.config?.script || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'script', e.target.value)}
                          placeholder="transform-loans.py"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Load */}
                  {selectedNode.type === 'load' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Connection</label>
                        <select
                          value={selectedNode.config?.connection || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'connection', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="">Select connection...</option>
                          <option value="analytics-redshift">analytics-redshift</option>
                          <option value="loans-s3-processed">loans-s3-processed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Schema.Table</label>
                        <input
                          type="text"
                          value={selectedNode.config?.table || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'table', e.target.value)}
                          placeholder="analytics.loan_facts"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                    </>
                  )}

                  {/* S3 Sensor */}
                  {selectedNode.type === 's3_sensor' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Bucket</label>
                        <input
                          type="text"
                          value={selectedNode.config?.bucket || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'bucket', e.target.value)}
                          placeholder="my-bucket-name"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Prefix / Path</label>
                        <input
                          type="text"
                          value={selectedNode.config?.prefix || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'prefix', e.target.value)}
                          placeholder="incoming/loans/"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">File Pattern</label>
                        <input
                          type="text"
                          value={selectedNode.config?.wildcard || '*.csv'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'wildcard', e.target.value)}
                          placeholder="*.csv"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Poke Interval (sec)</label>
                        <input
                          type="number"
                          value={selectedNode.config?.poke_interval || 60}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'poke_interval', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                    </>
                  )}

                  {/* Lambda */}
                  {selectedNode.type === 'lambda' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Function Name</label>
                        <input
                          type="text"
                          value={selectedNode.config?.function_name || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'function_name', e.target.value)}
                          placeholder="my-function"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Invocation Type</label>
                        <select
                          value={selectedNode.config?.invocation_type || 'RequestResponse'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'invocation_type', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="RequestResponse">Sync (wait for result)</option>
                          <option value="Event">Async (fire & forget)</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-400 mb-1.5">Payload (JSON)</label>
                        <textarea
                          value={selectedNode.config?.payload || '{}'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'payload', e.target.value)}
                          rows={3}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fuchsia-500 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Batch Job */}
                  {selectedNode.type === 'batch' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Job Definition</label>
                        <input
                          type="text"
                          value={selectedNode.config?.job_definition || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'job_definition', e.target.value)}
                          placeholder="my-job-def:1"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Job Queue</label>
                        <input
                          type="text"
                          value={selectedNode.config?.job_queue || 'rosie-batch-queue'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'job_queue', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-400 mb-1.5">Parameters (JSON)</label>
                        <textarea
                          value={selectedNode.config?.parameters || '{}'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'parameters', e.target.value)}
                          rows={2}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fuchsia-500 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Glue Job */}
                  {selectedNode.type === 'glue' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Job Name</label>
                        <input
                          type="text"
                          value={selectedNode.config?.job_name || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'job_name', e.target.value)}
                          placeholder="my-glue-job"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">DPU Capacity</label>
                        <input
                          type="number"
                          value={selectedNode.config?.allocated_capacity || 2}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'allocated_capacity', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                    </>
                  )}

                  {/* SNS / Notify */}
                  {(selectedNode.type === 'sns' || selectedNode.type === 'notify') && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Topic ARN</label>
                        <input
                          type="text"
                          value={selectedNode.config?.topic_arn || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'topic_arn', e.target.value)}
                          placeholder="arn:aws:sns:us-east-1:..."
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={selectedNode.config?.subject || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'subject', e.target.value)}
                          placeholder="Job Notification"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                        <textarea
                          value={selectedNode.config?.message || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'message', e.target.value)}
                          placeholder="Job completed. Records processed: {{ task_instance.xcom_pull() }}"
                          rows={2}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500 resize-none"
                        />
                      </div>
                    </>
                  )}

                  {/* Wait */}
                  {selectedNode.type === 'wait' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Duration</label>
                        <input
                          type="number"
                          value={selectedNode.config?.duration || 60}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'duration', parseInt(e.target.value))}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Unit</label>
                        <select
                          value={selectedNode.config?.duration_unit || 'seconds'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'duration_unit', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="seconds">Seconds</option>
                          <option value="minutes">Minutes</option>
                          <option value="hours">Hours</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Trigger DAG */}
                  {selectedNode.type === 'trigger_dag' && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">DAG ID</label>
                        <input
                          type="text"
                          value={selectedNode.config?.dag_id || ''}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'dag_id', e.target.value)}
                          placeholder="loans-origination-downstream"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Wait for Completion</label>
                        <select
                          value={selectedNode.config?.wait_for_completion ? 'true' : 'false'}
                          onChange={e => handleUpdateNodeConfig(selectedNode.id, 'wait_for_completion', e.target.value === 'true')}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-fuchsia-500"
                        >
                          <option value="true">Yes (blocking)</option>
                          <option value="false">No (fire & forget)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Branch / Condition */}
                  {selectedNode.type === 'condition' && (
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-400 mb-1.5">Condition Expression</label>
                      <input
                        type="text"
                        value={selectedNode.config?.rule || ''}
                        onChange={e => handleUpdateNodeConfig(selectedNode.id, 'rule', e.target.value)}
                        placeholder="{{ ti.xcom_pull('extract')['count'] }} > 0"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-fuchsia-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Validation Messages */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={14} />
                DAG structure is valid
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={14} />
                All connections available
              </div>
            </div>
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
                <div className="flex items-center gap-2">
                  <button className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1">
                    <Copy size={12} />
                    Copy
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
              <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
{`from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.operators.batch import BatchOperator
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.amazon.aws.operators.sns import SnsPublishOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'loan-team',
    'depends_on_past': False,
    'email_on_failure': True,
    'email': ['loan-team@example.com'],
    'retries': ${jobConfig.retries},
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    '${jobConfig.name || 'my_dag'}',
    default_args=default_args,
    description='${jobConfig.description || 'My DAG description'}',
    schedule='${jobConfig.cronExpression}',
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=${JSON.stringify(jobConfig.tags)},
    
    # ROSIE auto-injected access control
    access_control={
        'loans-origination-admins': {'can_read', 'can_edit', 'can_delete'},
        'loans-origination-developers': {'can_read', 'can_edit'},
        'loans-origination-viewers': {'can_read'},
        'platform-admins': {'can_read', 'can_edit', 'can_delete'},
        'auditors': {'can_read'},
    },
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
        message='Pipeline completed successfully',
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
              placeholder="loans-origination-my-etl"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
            />
            <div className="text-xs text-gray-500 mt-1">Must follow: {'{bto}-{app}-{job_name}'}</div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Description</label>
            <textarea
              value={jobConfig.description}
              onChange={e => setJobConfig({...jobConfig, description: e.target.value})}
              placeholder="What does this job do?"
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
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
                    ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                    : 'bg-gray-800 border-gray-700 text-gray-400'
                }`}
              >
                Cron
              </button>
              <button
                onClick={() => setJobConfig({...jobConfig, scheduleType: 'rate'})}
                className={`flex-1 py-1.5 text-sm rounded-lg border ${
                  jobConfig.scheduleType === 'rate'
                    ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
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
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-violet-500"
              />
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={jobConfig.rateValue}
                  onChange={e => setJobConfig({...jobConfig, rateValue: e.target.value})}
                  className="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                />
                <select
                  value={jobConfig.rateUnit}
                  onChange={e => setJobConfig({...jobConfig, rateUnit: e.target.value})}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
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
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
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
                { id: 'auto', label: 'Auto (Recommended)', desc: 'Let ROSIE decide', icon: Sparkles },
                { id: 'eventbridge', label: 'EventBridge Scheduler', desc: '90% of jobs', icon: Zap },
                { id: 'mwaa', label: 'MWAA (Airflow)', desc: '10% of jobs', icon: GitBranch },
              ].map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    jobConfig.target === opt.id
                      ? 'bg-violet-500/10 border-violet-500/50'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="target"
                    checked={jobConfig.target === opt.id}
                    onChange={() => setJobConfig({...jobConfig, target: opt.id})}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      <opt.icon size={14} />
                      {opt.label}
                    </div>
                    <div className="text-xs text-gray-500">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Advanced Settings</h4>
            
            {/* Retries */}
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Retries</label>
              <input
                type="number"
                value={jobConfig.retries}
                onChange={e => setJobConfig({...jobConfig, retries: parseInt(e.target.value)})}
                min="0"
                max="10"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* SLA */}
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">SLA (minutes)</label>
              <input
                type="number"
                value={jobConfig.slaMinutes}
                onChange={e => setJobConfig({...jobConfig, slaMinutes: parseInt(e.target.value)})}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Flexible Window */}
            <div className="mb-3">
              <label className="block text-xs text-gray-500 mb-1">Flexible Window (minutes)</label>
              <input
                type="number"
                value={jobConfig.flexibleWindow}
                onChange={e => setJobConfig({...jobConfig, flexibleWindow: e.target.value})}
                min="0"
                max="1440"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Dead Letter Queue</span>
                <input type="checkbox" checked={jobConfig.dlqEnabled} onChange={e => setJobConfig({...jobConfig, dlqEnabled: e.target.checked})} className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Alert on Failure</span>
                <input type="checkbox" checked={jobConfig.alertOnFailure} onChange={e => setJobConfig({...jobConfig, alertOnFailure: e.target.checked})} className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Alert on SLA Break</span>
                <input type="checkbox" checked={jobConfig.alertOnSlaBreak} onChange={e => setJobConfig({...jobConfig, alertOnSlaBreak: e.target.checked})} className="rounded" />
              </label>
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-gray-700 pt-4">
            <label className="block text-sm text-gray-400 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {jobConfig.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                  {tag}
                  <button 
                    onClick={() => setJobConfig({...jobConfig, tags: jobConfig.tags.filter((_, j) => j !== i)})}
                    className="hover:text-red-400"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <button className="inline-flex items-center gap-1 text-violet-400 text-xs px-2 py-1 hover:bg-gray-800 rounded">
                <Plus size={10} />
                Add tag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg shadow-lg shadow-violet-500/20">
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
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                activeNav === item.id 
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <item.icon size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.label}</div>
                {item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}
              </div>
              {activeNav === item.id && <ChevronRight size={16} className="text-violet-400" />}
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="p-3 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-500 mb-2">Platform Health</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-emerald-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

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
            <Settings size={16} className="text-gray-500 hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="text-pink-400" size={20} />
              <span className="font-semibold">R.O.S.I.E.</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">Job Scheduling</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
              The Housekeeper
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50"
              />
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-lg relative">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <HelpCircle size={18} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Tabs */}
        {!showNewJob && (
          <div className="border-b border-gray-800 px-6 flex gap-1 bg-gray-900/30">
            {[
              { id: 'jobs', label: 'My Jobs', count: mockJobs.length },
              { id: 'runs', label: 'Run History' },
              { id: 'airflow', label: 'Airflow UI', external: true },
              { id: 'settings', label: 'Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-violet-500 text-violet-300'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded">
                    {tab.count}
                  </span>
                )}
                {tab.external && <ExternalLink size={12} />}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {showNewJob ? (
            <NewJobDesigner />
          ) : activeTab === 'jobs' ? (
            <JobsTab />
          ) : activeTab === 'runs' ? (
            <RunsTab />
          ) : activeTab === 'airflow' ? (
            <AirflowTab />
          ) : activeTab === 'settings' ? (
            <SettingsTab />
          ) : null}
        </div>
      </div>

      {/* Modals and Panels */}
      {showTriggerModal && <TriggerModal />}
      {showDeleteModal && <DeleteModal />}
      {selectedJob && <JobDetailPanel />}
      {showDiagnostics && <DiagnosticsPanel />}
    </div>
  );
};

export default App;
