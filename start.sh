echo "Starting Lighttpd"
lighttpd -f /etc/lighttpd/lighttpd.conf

echo "Starting node"
node backend/app.js &

tail -f /dev/null 