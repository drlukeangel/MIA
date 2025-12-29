import React, { useState } from 'react';
import { Calendar, Clock, Play, Save, GitBranch, Layout, Code, Settings, ChevronRight, Check, AlertCircle, Plus, Trash2, ArrowRight, Zap, Database, FileText, Bell, RefreshCw, Home, Layers, MessageSquare, Shield, Box, MoreHorizontal, User, Search, HelpCircle, Server, HardDrive, Cpu, Globe, Lock, Key, Network, Radio, Mail, Activity, CheckCircle, XCircle, Pause, ExternalLink, CloudLightning, Workflow, ArrowLeftRight, Filter, BarChart3, TrendingUp, Users, Folder, Link2, AlertTriangle, Eye, Terminal, Copy, Plug } from 'lucide-react';

// ============================================
// MOCK DATA
// ============================================

const mockJobs = [
  { id: 1, name: 'loan-etl-daily', type: 'dag', target: 'mwaa', schedule: '0 2 * * *', status: 'active', lastRun: '2 hours ago', nextRun: 'Tomorrow 2:00 AM' },
  { id: 2, name: 'db-backup-nightly', type: 'schedule', target: 'eventbridge', schedule: '0 3 * * *', status: 'active', lastRun: '5 hours ago', nextRun: 'Tomorrow 3:00 AM' },
  { id: 3, name: 'cache-invalidation', type: 'schedule', target: 'eventbridge', schedule: 'rate(1 hour)', status: 'active', lastRun: '23 min ago', nextRun: 'In 37 minutes' },
  { id: 4, name: 'month-end-reporting', type: 'dag', target: 'mwaa', schedule: '0 6 1 * *', status: 'paused', lastRun: '29 days ago', nextRun: 'Jan 1, 6:00 AM' },
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
    tags: ['team:loans', 'env:prod']
  });
  const [workflowNodes] = useState([
    { id: 1, type: 'extract', name: 'Extract Data', x: 50, y: 100 },
    { id: 2, type: 'transform', name: 'Transform', x: 250, y: 100 },
    { id: 3, type: 'load', name: 'Load to DW', x: 450, y: 100 },
    { id: 4, type: 'notify', name: 'Send Alert', x: 650, y: 100 },
  ]);

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
      {!showNewJob ? (
        /* Jobs List View */
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold">Scheduled Jobs</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your scheduled tasks and workflows</p>
            </div>
            <button 
              onClick={() => setShowNewJob(true)}
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              New Job
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Active Jobs', value: '3', color: 'emerald' },
              { label: 'Paused', value: '1', color: 'amber' },
              { label: 'EventBridge', value: '2', sublabel: '50%', color: 'cyan' },
              { label: 'MWAA', value: '2', sublabel: '50%', color: 'fuchsia' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-2xl font-semibold text-${stat.color}-400`}>{stat.value}</span>
                  {stat.sublabel && <span className="text-gray-500 text-sm">{stat.sublabel}</span>}
                </div>
              </div>
            ))}
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
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {mockJobs.map(job => (
                  <tr key={job.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          job.type === 'dag' ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {job.type === 'dag' ? <GitBranch size={16} /> : <Zap size={16} />}
                        </div>
                        <div>
                          <div className="font-medium">{job.name}</div>
                          <div className="text-xs text-gray-500">{job.type === 'dag' ? 'DAG Workflow' : 'Simple Schedule'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        job.target === 'mwaa' 
                          ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {job.target === 'mwaa' ? 'MWAA' : 'EventBridge'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded">
                        {job.schedule}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm ${
                        job.status === 'active' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          job.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`} />
                        {job.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{job.lastRun}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{job.nextRun}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                          <Play size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200">
                          <MoreHorizontal size={14} />
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
              <div className="text-sm font-medium text-gray-300">Platform Distribution (90/10 Target)</div>
              <div className="text-xs text-gray-500">Your jobs: 50% EventBridge / 50% MWAA</div>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-gray-700">
              <div className="bg-cyan-500 transition-all" style={{ width: '50%' }} />
              <div className="bg-fuchsia-500 transition-all" style={{ width: '50%' }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>EventBridge Scheduler (Target: 90%)</span>
              <span>MWAA (Target: 10%)</span>
            </div>
          </div>
        </div>
      ) : (
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
                  onClick={() => setShowNewJob(false)}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
                <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-lg text-sm font-medium">
                  <Save size={16} />
                  Deploy Job
                </button>
              </div>
            </div>

            {designerMode === 'visual' ? (
              /* Visual Designer */
              <div className="flex-1 p-6 bg-gray-950/50 overflow-auto">
                <div className="mb-4 flex items-center gap-4">
                  <div className="text-sm text-gray-500">Drag operators to build your workflow</div>
                  <div className="flex gap-2">
                    {[
                      { type: 'extract', icon: Database, label: 'Extract' },
                      { type: 'transform', icon: RefreshCw, label: 'Transform' },
                      { type: 'load', icon: FileText, label: 'Load' },
                      { type: 'notify', icon: Bell, label: 'Notify' },
                    ].map(op => (
                      <button
                        key={op.type}
                        className="flex items-center gap-1.5 px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 hover:border-gray-600"
                      >
                        <op.icon size={12} />
                        {op.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Canvas */}
                <div className="relative bg-gray-900 border border-gray-700 rounded-xl min-h-[300px] p-6">
                  {/* Grid pattern */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Workflow Nodes */}
                  <div className="relative flex items-center gap-4">
                    {workflowNodes.map((node, index) => (
                      <React.Fragment key={node.id}>
                        <div className={`relative bg-gray-800 border-2 rounded-xl p-4 min-w-[120px] ${
                          node.type === 'extract' ? 'border-blue-500/50' :
                          node.type === 'transform' ? 'border-amber-500/50' :
                          node.type === 'load' ? 'border-emerald-500/50' :
                          'border-pink-500/50'
                        }`}>
                          <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                            node.type === 'extract' ? 'bg-blue-500/20 text-blue-400' :
                            node.type === 'transform' ? 'bg-amber-500/20 text-amber-400' :
                            node.type === 'load' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-pink-500/20 text-pink-400'
                          }`}>
                            {node.type === 'extract' && <Database size={16} />}
                            {node.type === 'transform' && <RefreshCw size={16} />}
                            {node.type === 'load' && <FileText size={16} />}
                            {node.type === 'notify' && <Bell size={16} />}
                          </div>
                          <div className="text-sm font-medium">{node.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {node.type === 'extract' ? 'BatchOperator' :
                             node.type === 'transform' ? 'GlueOperator' :
                             node.type === 'load' ? 'BatchOperator' :
                             'SNSOperator'}
                          </div>
                        </div>
                        {index < workflowNodes.length - 1 && (
                          <ArrowRight className="text-gray-600 flex-shrink-0" size={20} />
                        )}
                      </React.Fragment>
                    ))}
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
      )}
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
