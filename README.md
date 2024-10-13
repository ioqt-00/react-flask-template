# template react flask

yarn config set script-shell /bin/bash

yarn start

# For production
Copy .env.example into .env
Complete .env

Run
docker-compose up -d --build

# For development
For API:
```
docker-compose up -d db 
cd src/api/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

For front:
yarn start

You will probably need to fix issues with URLs... I recently removed the react proxy for working on deployment. 
I've seen something called env-cmd smthing like that, I think you should check that 
