# asra3.com — aaPanel Deployment Guide

> Complete guide to deploy asra3.com on a VPS using aaPanel (BT Panel).

---

## Prerequisites

| Requirement | Minimum |
|------------|---------|
| VPS | Ubuntu 20.04+ / Debian 11+ |
| RAM | 1 GB (2 GB recommended) |
| Disk | 10 GB |
| aaPanel | v7.x+ installed |
| Node.js | v20+ (LTS) |
| Domain | Pointed to VPS IP via A record |

---

## Step 1: Install aaPanel

If aaPanel is not yet installed:

```bash
# Ubuntu/Debian
wget -O install.sh https://www.aapanel.com/script/install_7.0_en.sh && bash install.sh aapanel
```

After installation, log in to the panel at `http://YOUR_IP:8888` and install:
- **Nginx** (recommended over Apache)
- **Node.js Manager** (from App Store → Runtime)

---

## Step 2: Install Node.js 20+ via aaPanel

1. Go to **App Store → Runtime → Node.js Manager**
2. Install **Node.js v20.x** (or later LTS)
3. Verify from SSH:

```bash
node -v   # Should show v20.x+
npm -v    # Should show 10.x+
```

---

## Step 3: Upload Project Files

### Option A: Git Clone (Recommended)

```bash
cd /www/wwwroot/
git clone https://github.com/YOUR_USER/asra3-glm.git asra3.com
cd asra3.com
```

### Option B: Upload via aaPanel File Manager

1. Go to **Files** in aaPanel
2. Navigate to `/www/wwwroot/`
3. Upload your project zip
4. Extract to `/www/wwwroot/asra3.com/`

---

## Step 4: Install Dependencies & Build

```bash
cd /www/wwwroot/asra3.com

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Initialize SQLite database (creates prisma/dev.db)
npx prisma db push

# Seed initial data (admin password, default settings)
npx tsx scripts/seed-settings.ts

# Build the production bundle
npm run build
```

**Important**: The `output: "standalone"` config in `next.config.ts` means the build creates a self-contained `.next/standalone/` directory.

---

## Step 5: Create Environment File

```bash
nano /www/wwwroot/asra3.com/.env
```

Add:

```env
NODE_ENV=production
DATABASE_URL="file:./prisma/dev.db"
```

> **Note**: The SQLite database file lives at `prisma/dev.db`. No external DB server needed.

---

## Step 6: Set Up the Standalone Server

Next.js standalone mode requires a specific file structure:

```bash
cd /www/wwwroot/asra3.com

# Copy static assets into standalone
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# Copy the database into standalone
cp -r prisma .next/standalone/prisma

# Copy uploads directory (if exists)
mkdir -p .next/standalone/public/uploads
cp -r public/uploads/* .next/standalone/public/uploads/ 2>/dev/null || true
```

---

## Step 7: Test the Server

```bash
cd /www/wwwroot/asra3.com/.next/standalone
PORT=3000 node server.js
```

Visit `http://YOUR_IP:3000` to verify. Press `Ctrl+C` to stop.

---

## Step 8: Create PM2 Process (Background Service)

Install PM2 globally:

```bash
npm install -g pm2
```

Create an ecosystem config:

```bash
nano /www/wwwroot/asra3.com/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'asra3',
    cwd: '/www/wwwroot/asra3.com/.next/standalone',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'file:./prisma/dev.db',
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '512M',
    watch: false,
  }],
};
```

Start the process:

```bash
cd /www/wwwroot/asra3.com
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the instructions to enable auto-start on reboot
```

Useful PM2 commands:

```bash
pm2 status         # Check running processes
pm2 logs asra3     # View logs
pm2 restart asra3  # Restart after updates
pm2 stop asra3     # Stop the server
```

---

## Step 9: Configure Nginx Reverse Proxy (via aaPanel)

### 9a. Create Website in aaPanel

1. Go to **Websites → Add Site**
2. Set domain: `asra3.com` (and `www.asra3.com`)
3. Root directory: `/www/wwwroot/asra3.com`
4. PHP: **Static** (not PHP)
5. Click **Submit**

### 9b. Configure Reverse Proxy

1. Click on the site → **Reverse Proxy**
2. Add a new proxy:
   - **Proxy Name**: `nextjs`
   - **Target URL**: `http://127.0.0.1:3000`
   - **Send Domain**: `$host`
3. Submit

### 9c. Edit Nginx Config (Advanced)

Click on the site → **Config** to manually edit. Replace the location block:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name asra3.com www.asra3.com;

    # SSL (managed by aaPanel Let's Encrypt)
    # ssl_certificate and ssl_certificate_key are auto-added

    # Serve uploaded files directly (bypass Node.js)
    location /uploads/ {
        alias /www/wwwroot/asra3.com/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Serve static Next.js assets directly
    location /_next/static/ {
        alias /www/wwwroot/asra3.com/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Serve public assets directly
    location ~* \.(ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot|css|js)$ {
        root /www/wwwroot/asra3.com/public;
        expires 30d;
        add_header Cache-Control "public";
        try_files $uri @nextjs;
    }

    # Proxy everything else to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
        proxy_send_timeout 120s;

        # Increase body size limit for image uploads
        client_max_body_size 10m;
    }

    location @nextjs {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 9d. Enable SSL

1. Click on the site → **SSL**
2. Select **Let's Encrypt**
3. Check your domain(s)
4. Click **Apply**
5. Enable **Force HTTPS** toggle

---

## Step 10: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check Nginx config
nginx -t

# Restart Nginx
service nginx restart
```

Visit:
- `https://asra3.com` — Landing page
- `https://asra3.com/admin` — Admin panel
- `https://asra3.com/blog` — Blog listing

---

## Updating the Site

When you push new code:

```bash
cd /www/wwwroot/asra3.com

# Pull latest code
git pull origin main

# Install any new dependencies
npm install

# Regenerate Prisma (if schema changed)
npx prisma generate
npx prisma db push

# Rebuild
npm run build

# Copy static assets to standalone
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r prisma .next/standalone/prisma
mkdir -p .next/standalone/public/uploads
cp -r public/uploads/* .next/standalone/public/uploads/ 2>/dev/null || true

# Restart the server
pm2 restart asra3
```

### Quick Update Script

Create `/www/wwwroot/asra3.com/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "📦 Pulling latest code..."
git pull origin main

echo "📥 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate
npx prisma db push

echo "🏗️  Building..."
npm run build

echo "📁 Copying assets to standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r prisma .next/standalone/prisma
mkdir -p .next/standalone/public/uploads
cp -r public/uploads/* .next/standalone/public/uploads/ 2>/dev/null || true

echo "🔄 Restarting PM2..."
pm2 restart asra3

echo "✅ Deployed successfully!"
```

Make executable:

```bash
chmod +x deploy.sh
```

Run deploys with:

```bash
./deploy.sh
```

---

## Image Uploads in Production

Uploaded images are stored in `/www/wwwroot/asra3.com/public/uploads/`. Important notes:

1. **Uploads persist outside standalone** — they live in the main `public/uploads/` directory
2. **The deploy script copies them** into standalone on each deploy
3. **Nginx serves them directly** via the `/uploads/` location block (bypasses Node.js for performance)
4. **Backup uploads** — include this directory in your backup strategy

---

## Database Backups

The SQLite database is a single file. Back it up regularly:

```bash
# Manual backup
cp /www/wwwroot/asra3.com/prisma/dev.db /www/backup/asra3-$(date +%Y%m%d).db

# Cron job (daily at 2am via aaPanel → Cron)
0 2 * * * cp /www/wwwroot/asra3.com/prisma/dev.db /www/backup/asra3-$(date +\%Y\%m\%d).db
```

---

## Troubleshooting

### Site shows 502 Bad Gateway
- Check if PM2 process is running: `pm2 status`
- Check logs: `pm2 logs asra3`
- Restart: `pm2 restart asra3`

### Images not loading after deploy
- Ensure uploads are copied: `ls -la .next/standalone/public/uploads/`
- Check Nginx config has the `/uploads/` location block

### Admin login not working
- Verify the database exists: `ls -la prisma/dev.db`
- Re-seed if needed: `npx tsx scripts/seed-settings.ts`

### Database locked errors
- SQLite can have issues with concurrent writes
- Ensure only 1 PM2 instance is running (not cluster mode)
- Check: `pm2 status` should show `instances: 1`

### Build fails with memory error
- Increase Node.js memory: `NODE_OPTIONS="--max-old-space-size=2048" npm run build`
- Or add to ecosystem config: `node_args: '--max-old-space-size=2048'`

---

## File Structure on Server

```
/www/wwwroot/asra3.com/
├── .env                    # Environment variables
├── .next/
│   ├── standalone/         # ← PM2 runs from here
│   │   ├── server.js       # Entry point
│   │   ├── public/         # Copied static assets
│   │   ├── prisma/         # Copied database
│   │   └── .next/static/   # Copied build assets
│   └── static/             # Build output
├── public/
│   ├── uploads/            # 📷 Uploaded images persist here
│   ├── logo.png
│   └── favicon.png
├── prisma/
│   ├── schema.prisma
│   └── dev.db              # 🗄️ SQLite database
├── ecosystem.config.js     # PM2 config
├── deploy.sh               # Quick deploy script
└── package.json
```
