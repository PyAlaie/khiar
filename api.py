import requests
from requests.structures import CaseInsensitiveDict

public_url = "https://api.zdrive.ir/v1/AUTH_coconut"
api_key = "78796f35c272d9a00ebd30ff6b05d9ddd8ba956c"  # COCONUT!


def container_create(container_name):
    url = public_url + '/' + container_name

    headers = CaseInsensitiveDict()
    headers["Content-Length"] = "0"
    headers["X-API-KEY"] = api_key

    resp = requests.put(url, headers=headers)

    return resp.status_code, resp.content


def container_list(container_name):
    url = public_url + '/' + container_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.get(url, headers=headers)

    return resp.status_code, resp.content


def container_update_metadata(container_name, metadata_dict):
    url = public_url + '/' + container_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    for key, value in metadata_dict:
        headers.update({'X-Container-Meta-' + key.capitalize(), value})

    resp = requests.post(url, headers=headers)

    return resp.status_code, resp.content


def container_list_metadata(container_name):
    url = public_url + '/' + container_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.head(url, headers=headers)

    return resp.status_code, resp.content


def container_delete(container_name):
    url = public_url + '/' + container_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.delete(url, headers=headers)

    return resp.status_code, resp.content


def object_get(container_name, object_name):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.get(url, headers=headers)

    return resp.status_code, resp.content


def object_update(container_name, object_name, object_data):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key
    headers["Content-Type"] = 'text/html; charset=UTF-8'

    resp = requests.put(url, headers=headers, data=object_data)

    return resp.status_code, resp.content


def object_copy(container_name, object_name, destination):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key
    headers["Destination"] = destination

    resp = requests.request('COPY', url, headers=headers)

    return resp.status_code, resp.content


def object_delete_metadata(container_name, object_name):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.delete(url, headers=headers)

    return resp.status_code, resp.content



def object_list_metadata(container_name, object_name):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    resp = requests.head(url, headers=headers)

    return resp.status_code, resp.content


def object_update_metadata(container_name, object_name, metadata_dict):
    url = public_url + '/' + container_name + '/' + object_name

    headers = CaseInsensitiveDict()
    headers["X-API-KEY"] = api_key

    for key, value in metadata_dict:
        headers.update({'X-Object-Meta-' + key.capitalize(), value})

    resp = requests.post(url, headers=headers)

    return resp.status_code, resp.content
