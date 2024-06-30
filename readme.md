# NGINX Config 

### Connecting to SSH server:

To connect to the server use the following command:

```bash
ssh microweb@sermixer.micro-cloud.it -p 12922
```

Also you can make sure to have long sessions and multiple tabs open for simplicity.

Open `~/.ssh/confing` and add these lines to keep connection alive for long.

```bash

# Set default options for all hosts
Host *
  ServerAliveInterval 60
  ServerAliveCountMax 500

# Other things following 
...
```

### About the Server in question

Apparently, DNS settings make HTTP traffic open only on port 12923, and proxy it to :80

> sermixer.micro-cloud.it:12923

Let's take a look at the configuration to allow traffic to serve Static file for front-end, and serve API (Express).
Following is the main configuration:

```bash
cat /etc/nginx/sites-available/sermixer
```

Outputs:

```bash
server {
    listen 80;
    server_name sermixer.micro-cloud.it;

    location / {
        root /var/www/quotation-app-02;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /pdfs {
        alias /var/www/pdfs;
        autoindex off;
        try_files $uri =404;
    }

    location /phpmyadmin {
        alias /usr/share/phpmyadmin;
        index index.php;

        location ~ \.php$ {
            try_files $uri $uri/ /index.php =404;
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $request_filename;  # Ensures the full path t>
        }
    }
}

```
### Restart

After you done with the changes, make sure to reboot the server.

```bash
sudo systemctl restart nginx
```

<br>
<hr >
<br>


# EXPRESS SERVER

> /var/www/quotation-sql-server-01

We use **pm2** to manage the app, because it offers debug utilities to monitoring and out logging.

Go to directory: **/var/www/quotation-sql-server-01**

**Stop App**:
```bash
pm2 stop quotation-sql-server-01
```

**Start App**:
```bash
npm start
```


**Monitoring**: To keep an eye on the application, you can use
```bash
pm2 monit
```

**Logging**: If you need to view logs for debugging or checking outputs, use
```bash
pm2 logs quotation-sql-server-01 --lines 100
```

<br>
<hr >
<br>

# SQL COMMANDS

### The usual commands

mysql -u admin -p

SHOW DATABASES

USE quotation-sql-database-01

SHOW TABLES;

SELECT * FROM users\G;

UPDATE users SET role = 'admin' WHERE email = 'powerhydratoni@gmail.com';

DROP TABLE users;