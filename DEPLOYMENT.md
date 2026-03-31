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

Create the production `.env` file at the root of your project `/www/wwwroot/asra3.com/.env`.

Ensure it contains the **absolute path** to your database so it never resets:

```env
NODE_ENV=production
DATABASE_URL="file:/www/wwwroot/asra3.com/db/custom.db"
PORT=3008
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
npm run build

# 4. Final step: Replicate your .env into the standalone folder
echo 'NODE_ENV=production' > .next/standalone/.env
echo 'DATABASE_URL="file:/www/wwwroot/asra3.com/db/custom.db"' >> .next/standalone/.env
echo 'PORT=3008' >> .next/standalone/.env

# 5. Ensure database permissions are correct
chmod 777 /www/wwwroot/asra3.com/db
chmod 666 /www/wwwroot/asra3.com/db/custom.db
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
echo 'NODE_ENV=production' > .next/standalone/.env
echo 'DATABASE_URL="file:/www/wwwroot/asra3.com/db/custom.db"' >> .next/standalone/.env
echo 'PORT=3008' >> .next/standalone/.env

# 5. Connect your permanent uploads folder so images survive the update!
mkdir -p /www/wwwroot/asra3.com/public/uploads
ln -sfn /www/wwwroot/asra3.com/public/uploads /www/wwwroot/asra3.com/.next/standalone/public/uploads

# 6. Ensure database permissions are correct
chmod 777 /www/wwwroot/asra3.com/db
chmod 666 /www/wwwroot/asra3.com/db/custom.db

# 7. Restart the PM2 process to apply the changes
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






UPDATE:
# 1. Pull the fix
git pull origin master

# 2. Make sure the database folder exists
mkdir -p /www/wwwroot/asra3.com/db

# 3. Install (always use --legacy-peer-deps)
npm install --legacy-peer-deps

# 4. Build (will now succeed — no DB needed at build time)
npm run build

# 5. Relink uploads (every time after build)
ln -sfn /www/wwwroot/asra3.com/public/uploads /www/wwwroot/asra3.com/.next/standalone/public/uploads

# 6. Restart
pm2 restart asra3








cd /www/wwwroot/asra3.com
git pull origin master
npm install --legacy-peer-deps
npm run build
ln -sfn /www/wwwroot/asra3.com/public/uploads /www/wwwroot/asra3.com/.next/standalone/public/uploads
pm2 restart asra3
























# 0. BACKUP DB & UPLOADS FIRST
cp /www/wwwroot/asra3.com/db/custom.db /root/custom.db.backup
cp -r /www/wwwroot/asra3.com/public/uploads /root/uploads.backup

# 1. Stop & remove old process
pm2 delete asra3

# 2. Delete old project
rm -rf /www/wwwroot/asra3.com

# 3. Clone fresh
cd /www/wwwroot
git clone https://github.com/drjimmy1990/asra3-glm asra3.com
cd asra3.com

# 4. Create .env
cat > /www/wwwroot/asra3.com/.env << 'EOF'
NODE_ENV=production
DATABASE_URL="file:/www/wwwroot/asra3.com/db/custom.db"
PORT=3008
EOF

# 5. Restore DB & UPLOADS
mkdir -p /www/wwwroot/asra3.com/db
mkdir -p /www/wwwroot/asra3.com/public
cp /root/custom.db.backup /www/wwwroot/asra3.com/db/custom.db
cp -r /root/uploads.backup /www/wwwroot/asra3.com/public/uploads
# 6. Install
npm install --legacy-peer-deps

# 7. Generate Prisma + Build
npx prisma generate
npm run build

# 8. Relink uploads
ln -sfn /www/wwwroot/asra3.com/public/uploads /www/wwwroot/asra3.com/.next/standalone/public/uploads

# 9. Start with ecosystem file (port + DB path hardcoded)
pm2 start ecosystem.config.js
pm2 save

# 10. Verify
pm2 flush asra3
pm2 logs asra3 --lines 15
