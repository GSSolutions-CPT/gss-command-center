# GSS Command Center - Production Deployment Guide

## Overview
Internal AI agent dashboard for Global Security Solutions. Built as a static site with Firebase backend and Vercel Serverless Functions for LLM integration.

## Prerequisites
- Node.js 18+ (for local development)
- Firebase project: `gssolutions-co-za`
- Vercel account (deployed at: `gss-command-center.vercel.app`)
- LLM API key (OpenAI or Anthropic)

## Environment Setup

### 1. Local Development
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
# OPENAI_API_KEY=sk-...

# Start local dev server
npm run dev
```

### 2. Vercel Deployment
Environment variables to set in Vercel dashboard:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes (or ANTHROPIC_API_KEY) |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Alternative to OpenAI |
| `OPENAI_MODEL` | `gpt-4o-mini` | No (defaults to this) |

**Deploy command:**
```bash
vercel --prod
```

## Firebase Configuration
Firebase config is in `js/firebase-init.js`. Ensure:
- Firestore rules allow authenticated read/write
- Authentication is enabled (email/password)
- Users are created in Firebase Console

## Security Headers (vercel.json)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- CSP: Restrictive policy allowing Firebase, Google APIs, jsDelivr

## API Endpoints
- `POST /api/dispatch` - AI agent task dispatch
  - Body: `{ agent, task, priority }`
  - Returns: `{ status, response }`

## Pages
- `/` - Agent dashboard (login required)
- `/login.html` - Authentication
- `/dashboard.html` - Main agent overview
- `/agents.html` - Individual agent details
- `/projects.html` - Project tracking
- `/workflows.html` - Automation workflows
- `/settings.html` - User settings
- `/compliance.html` - Compliance documentation

## Maintenance
- Run `npm run lint` before commits
- Monitor Firebase usage in Console
- Check Vercel Functions logs for API errors

## Support
Contact: Kyle Cass <kyle@globalsecuritysolutions.co.za>