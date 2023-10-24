import os
import json
import requests
import plaid
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from dotenv import dotenv_values

# Python Environment Variable setup required on System or .env file
config_env = {
    **dotenv_values(".env"),  # load local file development variables
    **os.environ,  # override loaded values with system environment variables
}

app = FastAPI()


@app.get("/ping")
async def ping():
    return JSONResponse({"message": "GG !!!"})

accounts = {}

with open('accounts.json') as f:
    accounts = json.load(f)
    # print(accounts)

# Get client ID


@app.get("/accounts")
async def client_id():
    return JSONResponse(accounts)

# Get objects in image


@app.get("/accounts")
async def client_id():
    return JSONResponse(accounts)

banglore = {
    'latitude_North': 13.023577,
    'longitude_West': 77.536856,
    'latitude_South': 12.923210,
    'longitude_East': 77.642256,
}
london ={
    'latitude_North': 51.520180,
    'longitude_West': -0.169882,
    'latitude_South': 51.484703,
    'longitude_East': -0.061048,
}
