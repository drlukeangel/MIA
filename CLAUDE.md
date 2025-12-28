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
