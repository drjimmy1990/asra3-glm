# asra3.com — CLI Deployment Guide (Recommended)

> This guide focuses on deploying using the **Command Line (Terminal)** for maximum control and reliability.

---

## Step 1: Server Preparation

Ensure your aaPanel has **Nginx** and **Node.js Manager** installed. Install **Node v20 LTS** and set it as the "Command line version".

---

## Step 2: Upload Project

```bash
cd /www/wwwroot/
git clone https://github.com/drjimmy1990/asra3-glm asra3.com
cd asra3.com
```

---

## Step 3: Environment Config

Ensure your `/www/wwwroot/asra3.com/.env` contains:

```env
NODE_ENV=production
DATABASE_URL="file:./db/custom.db"
PORT=3005
```

---

## Step 4: Install & Build (Production)

Run these commands to prepare the high-performance standalone server:

```bash
# 1. Install dependencies (ignoring peer conflicts)
npm install --legacy-peer-deps

# 2. Generate database connector
npx prisma generate

# 3. Build & Prepare
# (NOTE: Our updated build script automatically copies 'public', 'static', and 'db' for you!)
npm run build

# 4. Final step: Copy your server .env inside the standalone folder
mkdir -p .next/standalone/db
cp .env .next/standalone/.env
```

---

## Step 5: Start Background Process (PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app on Port 3005
PORT=3005 pm2 start .next/standalone/server.js --name "asra3"

# Ensure it starts on server reboot
pm2 save
pm2 startup
```

---

## Step 6: Configure Nginx (CLI)

Add the site configuration to aaPanel's Nginx vhost directory:

```bash
nano /www/server/panel/vhost/nginx/asra3.com.conf
```

**Paste this block:**

```nginx
server {
    listen 80;
    server_name asra3.com www.asra3.com;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    access_log /www/wwwlogs/asra3.com.log;
    error_log /www/wwwlogs/asra3.com.error.log;
}
```

**Restart Nginx:**
```bash
nginx -t
service nginx restart
```

---

## Step 7: (Optional) aaPanel UI Method

If you prefer using the "Add Node project" UI:

1.  **PM2 Project Tab**:
    - **Startup File**: `/www/wwwroot/asra3.com/.next/standalone/server.js`
    - **Run Directory**: `/www/wwwroot/asra3.com/.next/standalone`
2.  **Default Project Tab**:
    - **Domain**: `asra3.com`
    - **Port**: `3005`
    - **External Access**: Enabled.

---

## Step 8: Updating the Site

When you make changes to your code and want to push them to the live server, follow these exact steps in your terminal:

```bash
cd /www/wwwroot/asra3.com

# 1. Pull the latest code from GitHub
git pull origin master

# 2. Install any new dependencies
npm install --legacy-peer-deps

# 3. Rebuild the optimized standalone app (This copies assets automatically)
npm run build

# 4. Copy the environment file to the new build folder
cp .env .next/standalone/.env

# 5. Restart the PM2 process to apply the changes
pm2 restart asra3
```

---

## Maintenance Commands

| Action | Command |
| :--- | :--- |
| **View Logs** | `pm2 logs asra3` |
| **Check Status** | `pm2 status` |
| **Restart App** | `pm2 restart asra3` |

---

## Directory Structure (How it works)

- `/www/wwwroot/asra3.com/` — Your main code.
- `/www/wwwroot/asra3.com/.next/standalone/` — The **actual** folder running the site.
- `/db/custom.db` — Your database file.
