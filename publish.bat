@echo off

npm i && npm run build && git add -A && git commit -m "modification" && git push heroku master && pause
