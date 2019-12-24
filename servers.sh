#!/bin/zsh
echo "term 1"
. venv/bin/activate
gnome-terminal . -e "python3 manage.py runserver"
cd frontend
npm start 
