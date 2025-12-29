# MIA - Make Infrastructure Awesome

## Project Overview
MIA is a single-page React application for managing cloud infrastructure platforms. It provides a unified dashboard for monitoring and configuring various infrastructure components.

## Tech Stack
- **React 18** - UI framework (loaded via CDN)
- **Babel Standalone** - JSX transpilation in browser
- **Tailwind CSS** - Styling (loaded via CDN)
- **Single HTML file** - No build process required

## Architecture
The entire application lives in `index.html` as a single-file React app with inline Babel transpilation.

## Platform Dashboards

### M.O.M. (Managed Operations for Microservices)
Compute resources - Lambda, ECS, EMR

### U.N.C.L.E. (Unified Node for Cloud-Level Estates)
Databases - Aurora, MongoDB, DynamoDB, DSQL

### D.A.D. (Distributed Application Delivery)
Service mesh - Istio services, gateways, virtual services, WASM plugins, Lua filters

### A.U.N.T.I.E. (Asynchronous Unified Notification & Transport Infrastructure Engine)
Messaging - SNS, SQS, EventBridge, Kafka

### R.O.S.I.E. (Reliable Orchestration & Scheduling Infrastructure Engine)
Scheduling - EventBridge Scheduler, MWAA, Batch jobs

### B.R.O. (Backbone Resources & Operations)
Networking - VPC, Transit Gateway, VPN, Direct Connect, Route53

## D.A.D. Service Editor (Layers View)
Full-screen editor for configuring Istio/Envoy filters on services and gateways.

### Features
- **Left Panel**: Filter palette with categories (security, traffic, transform, observability)
- **Center Top**: Phase columns (Authentication, Authorization, Telemetry, Default)
- **Center Bottom**: Filter configuration form when a filter is selected
- **Right Panel**: Editable resource properties

### Available Filters
- **Security**: JWT Auth, OAuth2, mTLS, RBAC
- **Traffic**: Rate Limit, Circuit Breaker, Retry, Timeout
- **Transform**: Headers, Path Rewrite, CORS, Compression
- **Observability**: Access Log, Tracing

### Filter Phases
Filters are organized by Envoy filter chain phases:
- `AUTHN` - Authentication phase
- `AUTHZ` - Authorization phase
- `STATS` - Telemetry/metrics phase
- `UNSPECIFIED` - Default phase (near end of chain)

## Key Files
- `index.html` - Main application (single-file React app)
- `verify_parse.js` - Babel syntax verification script
- `backup/` - Backup copies of working versions

## Development
Simply open `index.html` in a browser. No build step required.

To verify syntax: `node verify_parse.js`

## State Management
Uses React useState hooks. Key state includes:
- `showServiceEditor` / `serviceEditorResource` - Layers view modal
- `savedServiceFilters` - Persisted filter configurations per resource
- `selectedFilterNode` - Currently selected filter for editing
- `serviceFilterCategory` - Filter palette category filter
- `networkResources` - Editable B.R.O. network resources (initialized from mockNetworkResources)
- `messagingResources` - Editable A.U.N.T.I.E. messaging resources (initialized from mockMessaging)
- `jobs` - Editable R.O.S.I.E. jobs (initialized from mockJobs)

---

## UI Styling Patterns (December 2024)

### Stat Card Titles
All dashboard stat card titles use consistent styling:
```jsx
<span className="text-base font-semibold text-gray-300">Title</span>
```
**NOT** `text-sm text-gray-400` (too small/faint)

### Filter Tabs
Filter tabs with counts use bold styling:
```jsx
<button className={`px-3 py-1.5 rounded-lg text-base font-semibold flex items-center gap-2 ${
  isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-gray-800'
}`}>
```

### Table Headers
All table headers use consistent styling:
```jsx
<th className="text-left px-4 py-3 text-base font-semibold text-gray-300">Column</th>
```

### Region Column
Region columns should not wrap:
```jsx
<code className="text-sm text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded whitespace-nowrap">{r.region}</code>
```

---

## History & QA Workflow

### Screenshot History
The `history/` folder contains dated screenshots for UI verification:
- Format: `YYYY-MM-DD_HH-MM-SS.png`
- Contains annotated screenshots showing required UI changes
- Reference `history/history.txt` for context from previous sessions

### QA Process
1. Review screenshot chronologically (earliest first)
2. Compare with current UI in browser
3. Make required changes based on annotations
4. Take verification screenshot
5. Move to next image

---

## Light Mode Theme (December 2024)

### Status: COMPLETE
Light mode implemented with pixel-extracted colors from M.O.M./Infrastructure screenshot.

### CSS Variables (`:root`)
```css
/* PRIMARY ACTION (+ New button) */
--action-primary: #10B981;       /* Emerald-500 */
--action-primary-hover: #059669; /* Emerald-600 */

/* SIDEBAR */
--sidebar-bg: #0F172A;           /* Dark Navy */
--sidebar-active: #134E4A;       /* Dark Teal highlight */

/* FILTER CHIP ACTIVE ("All 16") */
--filter-active: #EC4899;        /* Pink-500 */

/* ICON HIGHLIGHTS (Lambda/ECS) */
--icon-highlight: #F59E0B;       /* Amber-500 */

/* CARD BACKGROUNDS */
--bg-card-success: #ECFDF5;      /* Emerald-50 - Monthly Spend */
--bg-card-info: #EFF6FF;         /* Blue-50 - Total Resources */
--bg-card-alert: #FEF2F2;        /* Red-50 - Active Alerts */

/* STATUS BADGES (Traffic Light) */
--status-healthy: #10B981;       /* Green */
--status-warning: #F59E0B;       /* Amber */
--status-error: #EF4444;         /* Red */
```

### Color Mapping
| UI Element | Color | Hex |
|------------|-------|-----|
| + New button | Emerald | `#10B981` |
| Active filter chip | Pink | `#EC4899` |
| Resource icons | Amber | `#F59E0B` |
| Healthy badge | Green | `#10B981` |
| Warning badge | Amber | `#F59E0B` |
| Sidebar bg | Navy | `#0F172A` |
| Sidebar active | Dark Teal | `#134E4A` |
| Card (success) | Mint | `#ECFDF5` |
| Card (alert) | Light Red | `#FEF2F2` |

### Features
- Light mode is DEFAULT (`featureFlags.darkMode: false`)
- Toggle button in header (sun/moon icon)
- Dark sidebar maintained in both modes
- Traffic light status badges (Green/Amber/Red)

### Verification
```bash
node verify_parse.js  # Should output: SUCCESS - index.html parses correctly
```

---

## Edit Modal Patterns (December 2024)

### A.U.N.T.I.E. Edit Modal
When editing messaging resources, the modal shows these fields (Type hidden):
- Resource Name (text input)
- Retention & Encryption (side by side)
- Region (dropdown: us-east-1, us-east-2, us-west-1, us-west-2, eu-west-1)
- Subscribers & Producers (for SNS, SQS, Kafka)
- Rules (for EventBridge only)
- Targets (all types)
- Description (textarea)

Owner and Zone are hidden when editing (`editingMessaging` is truthy).
Type selector and type-specific configuration are also hidden when editing.

### A.U.N.T.I.E. Mock Data Fields
All messaging types have: `id`, `name`, `type`, `namespace`, `messagesDay`, `status`, `zone`, `region`, `owner`, `created`, `monthlyCost`, `retention`, `encryption`, `targets`, `description`
- **SNS/SQS/Kafka**: `subscribers`, `producers`
- **EventBridge**: `rules`

### Input Field Styling
All input fields in edit modals must include `text-white` class:
```jsx
className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
```

### D.A.D. Sidebar Navigation Colors
Dynamic Tailwind classes don't work with CDN. Use inline styles:
```jsx
style={activeNav === item.id ? {
  backgroundColor: item.color === 'amber' ? 'rgba(251,191,36,0.2)' : ...,
  border: item.color === 'amber' ? '1px solid #fbbf24' : ...
} : {}}
```
- D.A.D. uses amber: `#fbbf24`, `rgba(251,191,36,0.2)`

### Icon Component
The Icon component accepts `style` prop for inline color styling:
```jsx
<Icon name="zap" size={16} style={{color: '#ff9900'}} />
```
Required icons for pause/play functionality: `pause-circle`, `play-circle`
