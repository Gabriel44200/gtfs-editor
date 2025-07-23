import os
import pandas as pd

GTFS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'gtfs'))

def read_csv_file(filename, dtype=None):
    path = os.path.join(GTFS_PATH, filename)
    if not os.path.exists(path):
        return []
    df = pd.read_csv(path, dtype=dtype)
    return df.where(pd.notnull(df), None).to_dict(orient='records')

def write_csv_file(filename, data):
    path = os.path.join(GTFS_PATH, filename)
    df = pd.DataFrame(data)
    df.to_csv(path, index=False)

# Stops
def get_stops():
    return read_csv_file('stops.txt')

def update_stops(data):
    write_csv_file('stops.txt', data)

# Agencies
def get_agencies():
    return read_csv_file('agency.txt')

def update_agencies(data):
    write_csv_file('agency.txt', data)

# Routes
def get_routes():
    return read_csv_file('routes.txt')

def update_routes(data):
    write_csv_file('routes.txt', data)

# Calendar
def get_calendar():
    return read_csv_file('calendar.txt', dtype=str)

def update_calendar(data):
    write_csv_file('calendar.txt', data)
