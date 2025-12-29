# M.O.M. Portal Family - Complete Feature Implementation Specification

## Overview

This document provides a comprehensive specification for making all UI elements functional in the M.O.M. Portal Family dashboard. The portal consists of five main sections: Home, M.O.M. (Infrastructure), D.A.D. (Service Mesh), A.U.N.T.I.E. (Messaging), and R.O.S.I.E. (Scheduling).

**Target File:** `mom-portal-full.jsx`
**Reference File:** `rosie-portal-mockup.jsx` (contains enhanced features to integrate)

---

## Global Features (Apply to All Sections)

### 1. Search Functionality
- [ ] Global search bar in header should filter visible content
- [ ] Implement fuzzy search across all resource names, job names, service names
- [ ] Display search results dropdown with categorized results
- [ ] Keyboard shortcut (Cmd/Ctrl+K) to focus search

### 2. Cost Tracking Widget (CRITICAL FEATURE)
Each dashboard displays its own monthly cost, and the Home dashboard shows the combined total.

#### Home Dashboard (Primary) - Total Platform Cost
- [ ] Add "Total Platform Cost" card showing sum of all family costs
- [ ] Display breakdown: M.O.M. + D.A.D. + A.U.N.T.I.E. + R.O.S.I.E. = Total
- [ ] Show month-over-month trend (up/down with percentage)
- [ ] Compare to Control-M legacy cost ($1.3M/yr) showing savings
- [ ] Click to expand detailed cost breakdown modal

#### M.O.M. Dashboard - Infrastructure Cost
- [ ] Add "Monthly Spend" stat card to stats grid
- [ ] Calculate from: RDS instances, ElastiCache, Lambda, ECS, EMR, S3
- [ ] Show cost per resource type breakdown
- [ ] Trend indicator vs last month

#### D.A.D. Dashboard - Service Mesh Cost
- [ ] Add "Monthly Spend" stat card to stats grid
- [ ] Calculate from: App Mesh/Service mesh data plane, certificates, observability
- [ ] Generally lower cost - show efficiency metrics

#### A.U.N.T.I.E. Dashboard - Messaging Cost
- [ ] Add "Monthly Spend" stat card to stats grid
- [ ] Calculate from: SNS messages, SQS requests, EventBridge events, Kafka clusters
- [ ] Show cost per message type breakdown

#### R.O.S.I.E. Dashboard - Scheduling Cost
- [ ] Add "Est. Monthly Cost" stat card (already in mockup)
- [ ] Calculate from: EventBridge Scheduler invocations, MWAA environment, Batch jobs
- [ ] Show cost per job in table
- [ ] Cost Management settings tab with detailed breakdown

### 3. Notifications System
- [ ] Implement toast notification system for all actions
- [ ] Auto-dismiss after 3-5 seconds
- [ ] Support success, error, warning, info types
- [ ] Queue multiple notifications

### 4. Help Button
- [ ] Header help button (?) should open help panel/modal
- [ ] Context-sensitive help based on current section

---

## HOME Section

### Total Platform Cost Display (Primary Cost View)
- [ ] Add prominent "Total Monthly Spend" card at top of dashboard
- [ ] Show total: $25,050/mo (sum of all families)
- [ ] Show legacy comparison: "vs $108,333/mo Control-M = 77% savings"
- [ ] Visual breakdown bar showing contribution from each family
- [ ] Click to open detailed cost breakdown modal

### Dashboard Stats
- [ ] Make platform family cards clickable (navigate to respective sections)
- [ ] Add cost to each family card (e.g., "$12.5K/mo" under M.O.M.)
- [ ] Add loading states for stats
- [ ] Implement real-time stats refresh

### Recent Activity
- [ ] Make activity items clickable (navigate to related resource)
- [ ] Add "View All" link to activity section
- [ ] Implement activity filtering by family type

---

## M.O.M. Section (Infrastructure)

### Stats Cards (6 cards including cost)
- [ ] Total Resources (violet)
- [ ] Databases (blue)
- [ ] Compute (emerald)
- [ ] Storage (amber)
- [ ] Alerts (red)
- [ ] Monthly Spend (emerald) - Shows infrastructure cost with trend
- [ ] Make stats cards clickable to filter table by that metric
- [ ] Add trend indicators showing change from yesterday

### Resource Category Tabs
- [ ] Implement tab switching to filter resources by category
- [ ] Persist selected tab in state
- [ ] Show count badges on each tab

### Resources Table
- [ ] Row Click: Open resource detail panel/modal
- [ ] MoreHorizontal Button: Replace with dropdown menu
- [ ] Add row selection checkboxes for bulk actions
- [ ] Implement table sorting by clicking column headers
- [ ] Add pagination for large datasets

### New Resource Button
- [ ] Open resource creation wizard/modal
- [ ] Support all blueprint types as templates
- [ ] Form validation for required fields
- [ ] Show estimated cost before provisioning

### Available Blueprints Section
- [ ] Make blueprint cards clickable to pre-fill New Resource form
- [ ] Add "View Details" hover action
- [ ] Show usage count for each blueprint

---

## D.A.D. Section (Service Mesh)

### Stats Cards (6 cards including cost)
- [ ] Total Services (amber)
- [ ] Mesh Enabled (emerald)
- [ ] mTLS Strict (blue)
- [ ] Healthy (emerald)
- [ ] Degraded (amber)
- [ ] Monthly Spend (emerald) - Shows mesh/security cost with trend
- [ ] Make stats cards clickable to filter services

### Service Topology Visualization
- [ ] Make service nodes clickable to select
- [ ] Add hover tooltips with service details
- [ ] Implement zoom/pan controls
- [ ] Show connection status on hover

### Services Table
- [ ] Row Click: Open service detail panel
- [ ] MoreHorizontal Button: Replace with dropdown
- [ ] Implement table sorting

### Register Service Button
- [ ] Open service registration wizard
- [ ] Form fields: name, namespace, mesh settings, mTLS mode
- [ ] Validation and confirmation

### Certificate Status Section
- [ ] Make certificate items clickable to view/manage
- [ ] Add "Rotate" action button
- [ ] Show expiration warnings

### Authorization Policies Section
- [ ] Make policy items clickable to edit
- [ ] Add "New Policy" button
- [ ] Policy editor with rule builder

---

## A.U.N.T.I.E. Section (Messaging)

### Stats Cards (6 cards including cost)
- [ ] SNS Topics (pink)
- [ ] SQS Queues (cyan)
- [ ] EventBridge Rules (violet)
- [ ] Kafka Topics (amber)
- [ ] Messages/Day (emerald)
- [ ] Monthly Spend (emerald) - Shows messaging cost with trend
- [ ] Make stats cards clickable to filter resources

### Zone Split Cards
- [ ] Make zone cards clickable to filter by zone
- [ ] Show expand action for zone details

### Town Hall Pattern Diagram
- [ ] Make flow diagram nodes clickable
- [ ] Show message flow animation on hover
- [ ] Add "Configure Rule" action

### Messaging Resources Table
- [ ] Row Click: Open resource detail panel
- [ ] MoreHorizontal Button: Replace with dropdown
- [ ] Implement table sorting

### DLQ Alert
- [ ] "Investigate" button should open the DLQ detail panel
- [ ] Add "Purge" and "Replay" actions
- [ ] Show message samples

### New Topic/Queue Button
- [ ] Open creation wizard with type selection
- [ ] Form fields vary by type
- [ ] Zone selection

---

## R.O.S.I.E. Section (Scheduling) - Enhanced Features

### Enhanced Data Model
- [ ] Update mockJobs with additional fields (scheduleHuman, lastRunStatus, owner, tags, successRate, avgDuration, estimatedCost, taskCount, description)

### Stats Grid Enhancement
- [ ] Expand stats to 5 cards: Active Jobs, Paused, Failed (24h), Success Rate, Est. Monthly Cost
- [ ] Calculate stats dynamically from jobs array

### Filtering System
- [ ] Add filter dropdowns (Status, Target)
- [ ] Add search input for job name filtering
- [ ] Show filtered count
- [ ] Implement filter logic

### Jobs Table Enhancements
- [ ] Add "Cost" column
- [ ] Add "Owner" subtitle
- [ ] Row Click: Open Job Detail Panel
- [ ] Enhanced row actions (Play, Pause, Edit buttons)

### StatusBadge Component
- [ ] Create reusable StatusBadge component

### PlatformBadge Component
- [ ] Create reusable PlatformBadge component

### Job Detail Panel (Slide-out)
- [ ] 600px wide panel from right side
- [ ] Header with job info and actions
- [ ] Status Overview grid
- [ ] Schedule Info section
- [ ] Description, Tags, RBAC sections
- [ ] DAG Structure visualization
- [ ] Recent Runs list
- [ ] Footer actions

### Trigger Modal
- [ ] Modal to trigger job manually
- [ ] Run options and parameter overrides

### Delete Modal
- [ ] Confirmation modal with warning

### Edit Mode
- [ ] Implement editMode state
- [ ] Pre-fill form fields for editing
- [ ] Update existing job

### Save Notification
- [ ] Show success notification after save

### Run History Tab
- [ ] Add "Runs" tab
- [ ] Time range selector
- [ ] Run stats and expandable list

### Airflow Tab
- [ ] Add "Airflow" tab
- [ ] MWAA Environment info
- [ ] User access and permissions

### Settings Tab
- [ ] Add "Settings" tab with sub-tabs
- [ ] Connections, Variables, Pools, Team Access, Notifications, Cost Management

### Diagnostics Panel
- [ ] Health Checks and Issues display
- [ ] Recommendations

### Enhanced Job Designer
- [ ] Operator Palette with categories
- [ ] Node Management functions
- [ ] Node Configuration Panel
- [ ] Save/Deploy with validation

---

## Implementation Priority

### Phase 1: Core Functionality
1. StatusBadge and PlatformBadge components
2. Enhanced job data model
3. Filtering and search
4. Job detail panel
5. Replace MoreHorizontal with proper action buttons

### Phase 2: ROSIE Enhancements
1. Cost tracking widget (all dashboards)
2. Trigger and Delete modals
3. Edit mode for jobs
4. Save notification system
5. Enhanced designer with node configuration

### Phase 3: Additional Tabs
1. Run History tab
2. Settings tab with sub-tabs
3. Diagnostics panel

### Phase 4: Other Sections
1. M.O.M. resource detail panel and actions
2. D.A.D. service detail panel and actions
3. A.U.N.T.I.E. messaging detail panel and actions
