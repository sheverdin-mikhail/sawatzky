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
    return pd.read_excel(xlsx, xlsx.sheet_names[3])

def get_data_dict(data_frame: pd.DataFrame):

    data = {}
    for row in data_frame.values:
        if str(row[0]) != 'nan':
            if row[0] in data:
                data[row[0]].append({
                    "name": row[1],
                    "code": row[2],
                    'contract_number': row[5],
                    'address': row[6]
                })
            else:
                data[row[0]] = []
                data[row[0]].append({
                    "name": row[1],
                    "code": row[2],
                    'contract_number': row[5],
                    'address': row[6]
                })
    return data

def send_data(data, access_token):
    for work_object_group in data:
        requests.post(f'{base_url}/api/v1/work_objects_groups/create/', data=json.dumps({"name": work_object_group}), headers={
            "Authorization": f"Bearer {access_token}",
            'Content-Type': 'application/json'
        })
    
        response = requests.get(f'{base_url}/api/v1/work_objects_groups/', headers={
                "Authorization": f"Bearer {access_token}",
                'Content-Type': 'application/json'
            })
        work_object_groups = json.loads(response.text)

        for work_object_group in work_object_groups:
        
            if(work_object_group['name'] in data):
                for work_object in data[work_object_group['name']]:
                    context = json.dumps({
                        "workObjectGroup": work_object_group['id'],
                        "name": work_object['name'],
                        "code": work_object['code'],
                        "contractNumber": work_object['contract_number'],
                        "address": work_object['address']
                    })

                    requests.post(f'{base_url}/api/v1/work_objects/create/', data=context, headers={
                    "Authorization": f"Bearer {access_token}",
                    'Content-Type': 'application/json'
                })


if __name__ == '__main__':
    data_frame = read_file()
    data = get_data_dict(data_frame)
    access_token = get_access_token()
    
    send_data(data, access_token)