from flask import Flask, request, jsonify
import api
import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES

import rsa
from rsa import PublicKey, PrivateKey

private_key = PrivateKey(7968418451849388411686511419102849847456288053676590008266364015089846943974588511889344694614500584210500094928819208165464344093048562169530009057095029, 65537, 7707493691825756150040734933981548662283924439791456997024781135550307264371692498381820682728839825496136127413577859961746990491406509035972720744525953, 6946814674291535698062296879882645431946585438975812764028437980681325861389300321, 1147060750208085838328891507608384923007811689294070467233963889595923349)
public_key = PublicKey(7968418451849388411686511419102849847456288053676590008266364015089846943974588511889344694614500584210500094928819208165464344093048562169530009057095029, 65537)


class AESCipher(object):
    def __init__(self, key): 
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]


def encrypt_rsa(text):
    return rsa.encrypt(text.encode(), public_key)


def decrypt_rsa(encrypted_text):
    return rsa.decrypt(encrypted_text, private_key).decode()



app = Flask(__name__)

@app.route("/signup/<user_id>", methods=['POST'])
def signup(user_id):
    api.container_create(user_id);
    api.object_update(user_id, 'user_local_key', request.data)


@app.route("/addpassword/<user_id>", methods=['POST'])
def add_password(user_id):
    website = request.json['website']
    current_data = api.object_get(user_id, website).decode()
    api.object_update(user_id, website, '\n'.join(current_data, decrypt_rsa(request.json['username']) + ',' + decrypt_rsa(request.json['password'])))


@app.route("/getpassword/<user_id>/<website>", methods=['POST'])
def get_password(user_id, website):
    current_data = api.object_get(user_id, website)
    aes_object = AESCipher(api.object_get(user_id, 'user_local_key').decode())
    return aes_object.encrypt(current_data)




app.run()
