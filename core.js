var public_key = "-----BEGIN RSA PUBLIC KEY-----\nMEgCQQCYJNFscmQtekYH9/GwQgz5K98v3vT1rf3KwczhEFTxteYrUtHylKV7yFze\n6a/yVug4wQdxHyR9oarR2NWVJe11AgMBAAE=\n-----END RSA PUBLIC KEY-----\n";
var server_url = "127.0.0.1:5000";


CryptoJS.pad.NoPadding = {
    pad: function () {},
    unpad: function () {}
};

// StackOverflow
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function aes_encrypt_text(text, key) {
    console.log(typeof text);
    console.log(typeof key);
    return CryptoJS.AES.encrypt(text, key).toString();
}


function aes_decrypt_text(encrypted_string, key) {
    const bytes = CryptoJS.AES.decrypt(encrypted_string, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function rsa_encrypt_text(text) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    return encrypt.encrypt(text);
}


async function get_local_key() {
    // window.localStorage.getItem('local_key');
    var to_return = 0;
    await chrome.storage.sync.get('local_key', function (item) {
        to_return = item['local_key'];
    });

    return to_return;
}

async function get_local_userid() {
    // window.localStorage.getItem('local_user_id');
    var to_return = 0;
    await chrome.storage.sync.get('local_user_id', function (item) {
        to_return = item['local_user_id'];
    });

    console.log(to_return)

    return to_return;
}

function set_local_key(local_key) {
    // window.localStorage.setItem('local_key', local_key);

    chrome.storage.sync.set({
        'local_key': local_key,
    }, function () {
        console.log('Settings saved');
    });
}

function set_local_user_id(local_user_id) {
    // window.localStorage.setItem('local_user_id', local_user_id);

    chrome.storage.sync.set({
        'local_user_id': local_user_id,
    }, function () {
        console.log('Settings saved');
    });
}



function sign_up() {
    let new_user_id = uuidv4();
    let new_local_key = uuidv4();

    set_local_user_id(new_user_id);
    set_local_key(new_local_key);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", [server_url, "signup", new_user_id].join('/'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log([xhr.status, xhr.responseText]);
        }
    };

    xhr.send(rsa_encrypt_text(new_local_key));

    return new_user_id;
}


function add_password(website, username, password) {
    console.log(get_local_userid())
    let xhr = new XMLHttpRequest();
    xhr.open("POST", [server_url, "addpassword", get_local_userid()].join('/'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log([xhr.status, xhr.responseText]);
        }
    };


    xhr.send(JSON.stringify({
        username: username,
        password: aes_encrypt_text(password, t),
        website: website
    }));
}


function get_passwords(website) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", [server_url, "getpassword", get_local_userid(), website].join('/'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log([xhr.status, aes_decrypt_text(xhr.responseText, get_local_key())]);
        }
    };

    xhr.send();
}