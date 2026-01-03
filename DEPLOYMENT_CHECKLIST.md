# 🚀 Production Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] All ESLint warnings fixed
- [ ] Code properly formatted (Prettier)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] All TODO comments resolved
- [ ] Code reviewed by team
- [ ] All tests passing

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] API keys are not in source code
- [ ] CORS origins configured for production
- [ ] Password hashing implemented
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] Rate limiting configured (if applicable)

### Environment Configuration
- [ ] Production `.env` file created
- [ ] All environment variables set
- [ ] API URLs point to production
- [ ] Database URL is production database
- [ ] JWT secret is production-grade
- [ ] CORS origins include production frontend
- [ ] No development-only configs enabled

### Database
- [ ] Production database created
- [ ] Database migrations run
- [ ] Database indexes created
- [ ] Database backup strategy in place
- [ ] Connection pooling configured
- [ ] Database credentials secured
- [ ] Test data removed (if any)

### Testing
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass (if implemented)
- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] Mobile responsiveness verified
- [ ] Performance testing done
- [ ] Load testing completed (if applicable)

---

## 🗄️ Database Deployment

### Preparation
```bash
# 1. Create production database
psql -U postgres
CREATE DATABASE dayflow_hrms_prod;
\q

# 2. Set production DATABASE_URL in .env
DATABASE_URL="postgresql://user:password@host:5432/dayflow_hrms_prod?schema=public"

# 3. Run migrations
npx prisma migrate deploy

# 4. Verify schema
npx prisma db pull
```

### Backup Strategy
- [ ] Automated daily backups configured
- [ ] Backup retention policy set
- [ ] Backup restoration tested
- [ ] Point-in-time recovery enabled (if available)

---

## 🔧 Backend Deployment

### Build Process
```bash
# 1. Install dependencies
npm ci --production

# 2. Generate Prisma Client
npx prisma generate

# 3. Build application
npm run build

# 4. Test build
npm run start:prod (locally)
```

### Environment Variables
```env
# Production .env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://..."
JWT_SECRET="strong-production-secret-min-32-chars"
JWT_EXPIRES_IN=24h
ALLOWED_ORIGINS="https://your-frontend-domain.com"
```

### Deployment Steps
- [ ] Choose hosting platform (Railway, Render, Heroku, AWS)
- [ ] Create production project/app
- [ ] Set environment variables
- [ ] Connect to database
- [ ] Deploy code
- [ ] Run migrations
- [ ] Verify deployment
- [ ] Test API endpoints
- [ ] Check logs for errors

### Platform-Specific Instructions

#### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

#### Render
1. Connect GitHub repository
2. Select backend directory
3. Set build command: `npm install && npx prisma generate && npm run build`
4. Set start command: `npm run start:prod`
5. Add environment variables
6. Deploy

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create dayflow-hrms-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma migrate deploy
```

### Post-Deployment Verification
- [ ] API is accessible
- [ ] Health check endpoint responds
- [ ] Database connection works
- [ ] Authentication works
- [ ] All endpoints respond correctly
- [ ] Logs are being generated
- [ ] Error tracking is working

---

## 🎨 Frontend Deployment

### Build Process
```bash
# 1. Update environment variables
VITE_API_BASE_URL=https://your-api-domain.com
VITE_API_TIMEOUT=30000

# 2. Install dependencies
npm ci

# 3. Build for production
npm run build

# 4. Test build locally
npm run preview
```

### Optimization
- [ ] Environment variables updated for production
- [ ] API base URL points to production backend
- [ ] Code splitting enabled
- [ ] Assets optimized (images, fonts)
- [ ] Bundle size is acceptable
- [ ] Source maps configured for debugging
- [ ] Cache headers configured

### Deployment Steps
- [ ] Choose hosting platform (Vercel, Netlify, AWS S3)
- [ ] Connect repository or upload build
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Configure redirects for SPA
- [ ] Deploy
- [ ] Verify deployment
- [ ] Test application

### Platform-Specific Instructions

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Or connect via GitHub for automatic deployments
```

Configuration (vercel.json):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

Configuration (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### AWS S3 + CloudFront
1. Create S3 bucket
2. Enable static website hosting
3. Upload build files
4. Configure bucket policy for public access
5. Create CloudFront distribution
6. Configure error pages (404 → /index.html)
7. Update DNS

### Post-Deployment Verification
- [ ] Application loads correctly
- [ ] No console errors
- [ ] All pages are accessible
- [ ] Login works
- [ ] API calls succeed
- [ ] Assets load correctly
- [ ] HTTPS is working
- [ ] Performance is acceptable

---

## 🌐 Domain & DNS Configuration

### Domain Setup
- [ ] Domain purchased
- [ ] SSL certificate obtained (or Let's Encrypt)
- [ ] DNS records configured
- [ ] A record points to frontend
- [ ] A/CNAME record points to backend
- [ ] WWW redirect configured (if needed)

### DNS Records Example
```
Type  Name     Value                      TTL
A     @        <frontend-ip>              3600
A     api      <backend-ip>               3600
CNAME www      your-domain.com            3600
```

### SSL/TLS
- [ ] HTTPS enabled on frontend
- [ ] HTTPS enabled on backend
- [ ] Certificate auto-renewal configured
- [ ] HTTP to HTTPS redirect enabled
- [ ] Mixed content warnings resolved

---

## 📊 Monitoring & Logging

### Application Monitoring
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring set up
- [ ] Alert notifications configured
- [ ] Log aggregation configured
- [ ] Metrics dashboard created

### Health Checks
```typescript
// Backend health check endpoint
@Get('health')
health() {
  return { status: 'ok', timestamp: new Date() };
}
```

### Logging
- [ ] Production logging configured
- [ ] Log levels set appropriately
- [ ] Sensitive data not logged
- [ ] Log rotation enabled
- [ ] Log retention policy set

---

## 🔄 CI/CD Setup (Optional but Recommended)

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          # Deploy commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          # Deploy commands
```

### Automated Deployment
- [ ] CI/CD pipeline configured
- [ ] Automated tests run on push
- [ ] Deployment triggered on merge to main
- [ ] Rollback strategy in place
- [ ] Deployment notifications set up

---

## 🔐 Security Hardening

### Backend
- [ ] Rate limiting enabled
- [ ] Request size limits configured
- [ ] Helmet.js configured (if applicable)
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF protection (if needed)

### Frontend
- [ ] Content Security Policy configured
- [ ] No sensitive data in localStorage
- [ ] XSS prevention measures
- [ ] Secure cookie settings
- [ ] HTTPS only

### Database
- [ ] Strong database password
- [ ] Firewall rules configured
- [ ] Only API server can connect
- [ ] Regular security updates
- [ ] Backup encryption enabled

---

## 📈 Performance Optimization

### Backend
- [ ] Database query optimization
- [ ] Indexes on frequently queried fields
- [ ] Connection pooling configured
- [ ] Caching strategy implemented
- [ ] Response compression enabled

### Frontend
- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Image optimization
- [ ] CDN for static assets
- [ ] Browser caching configured

---

## 🧪 Post-Deployment Testing

### Smoke Tests
- [ ] Homepage loads
- [ ] Login works
- [ ] Dashboard loads
- [ ] API responds
- [ ] Database queries work

### Functional Tests
- [ ] User registration (if applicable)
- [ ] User login/logout
- [ ] Employee CRUD operations
- [ ] Attendance check-in/out
- [ ] Leave application
- [ ] Payroll viewing
- [ ] Admin operations

### Performance Tests
- [ ] Page load times < 3s
- [ ] API response times < 500ms
- [ ] No memory leaks
- [ ] Handles concurrent users

### Security Tests
- [ ] SQL injection attempts blocked
- [ ] XSS attempts blocked
- [ ] Unauthorized access prevented
- [ ] Token validation works
- [ ] CORS properly configured

---

## 📱 User Acceptance Testing

### Test Users
- [ ] Create test admin user
- [ ] Create test HR user
- [ ] Create test employee user
- [ ] Verify different role access

### User Flows
- [ ] Admin can create employees
- [ ] Employees can check in/out
- [ ] Employees can apply for leave
- [ ] Admin can approve leaves
- [ ] Employees can view payslips
- [ ] All role permissions work correctly

---

## 📚 Documentation Updates

### Technical Documentation
- [ ] API documentation updated
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Architecture diagrams updated
- [ ] Troubleshooting guide updated

### User Documentation
- [ ] User manual created/updated
- [ ] Admin guide created/updated
- [ ] FAQ page created
- [ ] Video tutorials (if applicable)

---

## 🎉 Go-Live Checklist

### Final Steps
- [ ] All above checklists completed
- [ ] Stakeholders notified
- [ ] Support team briefed
- [ ] Rollback plan documented
- [ ] Incident response plan ready
- [ ] Team on standby for issues

### Launch
- [ ] DNS cutover completed
- [ ] Application is live
- [ ] Monitoring confirmed working
- [ ] All systems green
- [ ] Users can access application
- [ ] No critical errors

### Post-Launch
- [ ] Monitor logs for 24 hours
- [ ] Check error rates
- [ ] Monitor performance
- [ ] Gather user feedback
- [ ] Address any issues immediately
- [ ] Document lessons learned

---

## 🆘 Rollback Plan

### If Things Go Wrong
1. [ ] Identify the issue
2. [ ] Assess impact
3. [ ] Decide: fix forward or rollback
4. [ ] Execute rollback if needed
5. [ ] Notify users
6. [ ] Fix issue in staging
7. [ ] Redeploy when ready

### Rollback Steps
```bash
# Backend
git revert <commit>
git push origin main

# Frontend
# Revert to previous deployment (platform-specific)
```

---

## 📞 Support & Maintenance

### Monitoring Schedule
- [ ] Daily: Check logs and metrics
- [ ] Weekly: Review performance
- [ ] Monthly: Security updates
- [ ] Quarterly: Backup restoration test

### Maintenance Windows
- [ ] Schedule defined (e.g., Sunday 2-4 AM)
- [ ] Users notified in advance
- [ ] Maintenance banner implemented
- [ ] Rollback plan for maintenance

---

## ✅ Deployment Sign-Off

**Deployed By:** _________________  
**Date:** _________________  
**Environment:** Production  
**Version:** _________________

### Verification
- [ ] All checklist items completed
- [ ] Application tested and verified
- [ ] Stakeholders approved
- [ ] Documentation updated
- [ ] Team notified

### Notes
_______________________________________
_______________________________________
_______________________________________

---

## 🎊 Congratulations!

Your Dayflow HRMS application is now live in production!

**Remember:**
- Monitor closely for the first 24-48 hours
- Be ready to respond to issues quickly
- Collect user feedback
- Plan for continuous improvement

---

**Last Updated:** January 3, 2026  
**Version:** 1.0.0
