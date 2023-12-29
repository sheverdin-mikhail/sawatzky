import pandas as pd
import requests
import json

base_url = 'http://localhost:8000'

def get_access_token():
    username = 'admin'
    password = 'admin'
    response = requests.post(f'{base_url}/api/auth/jwt/create/', json={'username': username, 'password': password})
    return json.loads(response.text)['access']

def read_file():
    xlsx = pd.ExcelFile('./file.xlsx')
    return pd.read_excel(xlsx, xlsx.sheet_names[2])

def get_data_dict(data_frame: pd.DataFrame):

    data = {}
    for row in data_frame.values:
        if str(row[0]) != 'nan':
            if row[0] in data:
                data[row[0]].append({
                    "price": row[1],
                    "name": row[2]
                })
            else:
                data[row[0]] = []
                data[row[0]].append({
                    "price": row[1],
                    "name": row[2]
                })
    return data


def send_data(data, access_token):
    for work_task_group in data:
        requests.post(f'{base_url}/api/v1/work_task_groups/create/', json={"name": work_task_group}, headers={
            "Authorization": f"Bearer {access_token}",
        })
    
    response = requests.get(f'{base_url}/api/v1/work_task_groups/', headers={
            "Authorization": f"Bearer {access_token}"
        })
    work_task_groups = json.loads(response.text)

    for work_task_group in work_task_groups:
        if work_task_group['name'] in data:
            for work_task in data[work_task_group['name']]:
                context = {
                    "workTaskGroup": work_task_group['id'],
                    "name": work_task['name'],
                    "price": work_task['price'],
                    "time": 0
                }

                requests.post(f'{base_url}/api/v1/work_tasks/create/', json=context, headers={
                    "Authorization": f"Bearer {access_token}",
                })


if __name__ == '__main__':
    data_frame = read_file()
    data = get_data_dict(data_frame)
    access_token = get_access_token()
    send_data(data, access_token)