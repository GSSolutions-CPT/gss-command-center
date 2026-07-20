# GSS Command Center - Production Checklist

## Pre-Deployment

### Environment Variables
- [ ] Set `OPENAI_API_KEY` in Vercel (or `ANTHROPIC_API_KEY`)
- [ ] Optionally set `OPENAI_MODEL` (default: `gpt-4o-mini`)
- [ ] Never commit `.env` files

### Firebase Setup
- [ ] Verify Firebase project `gssolutions-co-za` is active
- [ ] Enable Authentication (Email/Password)
- [ ] Configure Firestore security rules
- [ ] Create admin user: `kyle@globalsecuritysolutions.co.za`

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Test all pages locally with `npm run dev`
- [ ] Verify API endpoint `/api/dispatch` works

## Security Review

### CSP Headers
- ✅ `default-src 'self'`
- ✅ Firebase domains allowed
- ✅ Only trusted CDNs: jsDelivr, Google Fonts
- ✅ No `unsafe-eval`, minimal `unsafe-inline`

### Authentication
- [ ] All pages except login redirect if not authenticated
- [ ] Firebase Auth state checked on page load
- [ ] Logout clears localStorage and redirects

### API Security
- [ ] Serverless function validates method (POST only)
- [ ] Input validation on agent/task parameters
- [ ] API keys stored as Vercel env vars (not in code)

## Post-Deployment

### Verification
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Test login flow
- [ ] Test agent dashboard loads
- [ ] Test AI dispatch API call
- [ ] Check Vercel Function logs for errors

### Monitoring
- [ ] Enable Vercel Analytics (optional)
- [ ] Monitor Firebase usage
- [ ] Set up Vercel deployment notifications

## Rollback Plan
- [ ] Keep previous Vercel deployment active until verified
- [ ] Use Vercel rollback if issues found

---
Last updated: 2026-07-20
Owner: Kyle Cass, Global Security Solutions