var public_url = "https://api.zdrive.ir/v1/AUTH_coconut";
var api_key = "78796f35c272d9a00ebd30ff6b05d9ddd8ba956c";  // COCONUT!


function container_create(container_name) {
    let url = public_url + '/' + container_name;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url);

    xhr.setRequestHeader("Content-Length", "0");
    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function container_list(container_name) {
    let url = public_url + '/' + container_name;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function container_update_metadata(container_name, metadata_dict) {
    let url = public_url + '/' + container_name;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    for (const [key, value] of Object.entries(metadata_dict)) {
        xhr.setRequestHeader('X-Container-Meta-' + key.charAt(0).toUpperCase() + key.slice(1), value);
    }

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function container_list_metadata(container_name) {
    let url = public_url + '/' + container_name;

    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function container_delete(container_name) {
    let url = public_url + '/' + container_name;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function object_get(container_name, object_name) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function object_update(container_name, object_name, object_data) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url);

    xhr.setRequestHeader("X-API-KEY", api_key);
    xhr.setRequestHeader("Content-Type", "text/html; charset=UTF-8");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function object_copy(container_name, object_name, destination) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("COPY", url);

    xhr.setRequestHeader("X-API-KEY", api_key);
    xhr.setRequestHeader("Destination", destination);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function object_delete_metadata(container_name, object_name) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}



function object_list_metadata(container_name, object_name) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}


function object_update_metadata(container_name, object_name, metadata_dict) {
    let url = public_url + '/' + container_name + '/' + object_name;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("X-API-KEY", api_key);

    for (const [key, value] of Object.entries(metadata_dict)) {
        xhr.setRequestHeader('X-Object-Meta-' + key.charAt(0).toUpperCase() + key.slice(1), value);
    }

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        return [xhr.status, xhr.responseText];
    }};

    xhr.send();
}
