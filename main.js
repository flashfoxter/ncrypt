import Vue from 'vue'
import App from './App.vue'
import Quill from './assets/quill.min.js'
import scrypt from './assets/scrypt.js'
var CryptoJS = require("crypto-js");
var attr = require('dynamodb-data-types').AttributeValue;
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
require('typeface-open-sans')

Vue.config.productionTip = false

//Blank templates
var blanknote = [
  {id: Date.now(), ts: Date.now(), title: null, contents: '', show: true}
];

//AWS Cognito
var poolData = { UserPoolId : 'us-east-1_HTLzhRIAD',
  ClientId : '5nh7m50nha5fjjqbjqh79mud23'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var attributeList = [];

//Key Generation
function nscrypt(username, password, callback) {
  var logN = 18;
  var r = 8;
  var L = 32;
  var step = 2048;
  var salt = username;
  scrypt(password, salt, logN, r, L, step,
    function(progress) {
      ncrypt.status = 'generating secret key';
      ncrypt.progressbar = Math.round(progress);
    },
    function(result) {
      ncrypt.progressbar = 100;
      ncrypt.key = result; //used to encrypt

      //generate aws pawwsord
      scrypt(ncrypt.key, salt, 17, r, L, step,
        function(progress) {
          ncrypt.status = 'generating cloud key';
          ncrypt.progressbar = Math.round(progress);
        },
        function(result) {
          ncrypt.progressbar = 100;
          ncrypt.awspw = result;
          callback();
        },
        "hex"
      );
    },
    "hex"
  );
}

var autosave = null;
var autosaveBusy = false;
var autorefresh = null;  //automatically refresh token on interval

var ncrypt = {
  user: null,       //aws user data
  username: '',
  key: '',
  awspw: '',
  token: null,
  rtoken: null, //refresh token
  status: '',
  progressbar: 0,
  page: 0,          // 0 = login, 1 = home, 2 = busy, 3 = create account, 4 = about
  nav: true,
  ts: null,
  init: true,
  confirm: false,   //delete confirm subpage
  profile: false,   //user profile subpage
  searchmenu: false,
  enc: function(data, key) {
    var ct = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return(ct);
  },
  dec: function(ct, key) {
    var bytes  = CryptoJS.AES.decrypt(ct.toString(), key);
    var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return(data);
  },
  signup: function(username, password) {
    ncrypt.page = 2;
    ncrypt.username = username;
    nscrypt(username, password, function() { //generate key
      //create aws cognito user
      userPool.signUp(ncrypt.username, ncrypt.awspw, attributeList, null, function(err, result){
        if (result) {
          ncrypt.user = result.user;
          ncrypt.page = 0;
          ncrypt.status = 'account successfully created';
        }
        else if (err) {;
          ncrypt.status = err.message.replace('.','').toLowerCase();
          ncrypt.page = 3;
        }
      });

    });

  },
  signin: function(username, password) {
    ncrypt.init = true;
    ncrypt.page = 2;
    ncrypt.username = username;
    nscrypt(username, password, function() {
      var authenticationData = {
          Username : ncrypt.username,
          Password : ncrypt.awspw
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      var userData = {
          Username : ncrypt.username,
          Pool : userPool
      };
      ncrypt.user = new AmazonCognitoIdentity.CognitoUser(userData);

      ncrypt.status = 'authenticating';
      ncrypt.user.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              ncrypt.status = 'successfully signed in';
              ncrypt.token = result.idToken.jwtToken;
              ncrypt.rtoken = result.refreshToken;
              autorefresh = setInterval(function() {
                ncrypt.refreshToken();
              },600000); //10 minutes
              ncrypt.get();
          },
          onFailure: function(err) {
              ncrypt.page = 0;
              ncrypt.status = err.message.replace('.','').toLowerCase();
          },
      });
    });
  },
  refreshToken: function() {
    ncrypt.user.refreshSession(ncrypt.rtoken, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        ncrypt.token = result.idToken.jwtToken;
        ncrypt.rtoken = result.refreshToken;
      }
    });
  },
  signout: function() {
    this.page = 0;
    this.nav = true;
    this.username = null;
    this.key = null;
    this.awspw = null;
    this.token = null;
    this.notepad.d = blanknote;
    this.profile = false;
    this.status = '';
    if (ncrypt.user != null) {
      ncrypt.user.signOut();
      ncrypt.user = null;
    }
    clearInterval(autorefresh);
  },
  change: function(oldpass, newpass) {  //use promises here.  propagate using .then instead of nesting
    ncrypt.page = 2;
    var logN = 18;
    var r = 8;
    var L = 32;
    var step = 2048;
    var salt = ncrypt.username;

    //generate old key
    scrypt(oldpass, salt, logN, r, L, step,
      function(progress) {
        ncrypt.status = 'generating secret key';
        ncrypt.progressbar = Math.round(progress);
      },
      function(result) {
        ncrypt.progressbar = 100;
        var oldkey = result;

        //generate old aws password
        scrypt(oldkey, salt, 17, r, L, step,
          function(progress) {
            ncrypt.status = 'generating cloud key';
            ncrypt.progressbar = Math.round(progress);
          },
          function(result) {
            ncrypt.progressbar = 100;
            var oldawspw = result;
            if (oldawspw != ncrypt.awspw) {
              ncrypt.page = 6;
              ncrypt.status = 'current password incorrect';
              return;
            }

            //generate new key
            scrypt(newpass, salt, logN, r, L, step,
              function(progress) {
                ncrypt.status = 'generating new secret key';
                ncrypt.progressbar = Math.round(progress);
              },
              function(result) {
                ncrypt.progressbar = 100;
                var newkey = result;

                //generate new aws pawwsord
                scrypt(newkey, salt, 17, r, L, step,
                  function(progress) {
                    ncrypt.status = 'generating new cloud key';
                    ncrypt.progressbar = Math.round(progress);
                  },
                  function(result) {
                    ncrypt.progressbar = 100;
                    var newawspw = result;

                    // send password change to aws cognito
                    ncrypt.user.changePassword(oldawspw, newawspw, function(err, result) {
                      if (err) {
                        ncrypt.page = 6;
                        ncrypt.status = 'error: ' + err.message;
                        return;
                      }
                      console.log(result);

                      //encrypt entire notepad, one at a time
                      var j = 0;
                      for (let i of ncrypt.notepad.d) {
                        //create http post data
                        var data = {
                          space: ncrypt.username,
                          id: i.id,
                          ct: ncrypt.enc(i, newkey).toString()
                        };
                        data = attr.wrap(data);

                        //save to AWS (one at a time)
                        fetch('https://ncrypt.org/api/save', {
                          method: 'POST',
                          mode: 'cors',
                          headers: {
                            "Content-type": "application/json",
                            "Authorization": ncrypt.token
                          },
                          body: JSON.stringify(data)
                        })
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (json) {
                          if (json.body == 'successfully saved') {
                            // ncrypt.status = 'saved';
                          }
                          else {
                            ncrypt.page = 6;
                            ncrypt.status = 'error saving. please revert to your old password.';
                            return;
                          }
                        })
                        .catch(function (error) {
                          ncrypt.page = 6;
                          ncrypt.status = 'error saving. please revert to your old password.';
                          return;
                        });

                        j++;
                        if (j == Object.keys(ncrypt.notepad.d).length) {
                          ncrypt.key = newkey;
                          ncrypt.awspw = newawspw;
                          ncrypt.page = 1;
                          ncrypt.status = 'password changed';
                        }
                      }
                    });
                  },
                  "hex"
                );
              },
              "hex"
            );

          },
          "hex"
        );
      },
      "hex"
    );
  },

  get: function() {
    ncrypt.status = 'downloading encrypted data';
    var data = {
      // space: ncrypt.space
      space: ncrypt.username
    }
    fetch('https://ncrypt.org/api/get', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
        "Authorization": ncrypt.token
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var d = JSON.parse(json.body);
      var d = attr.unwrap(d.Item);
      ncrypt.status = 'decrypting data';
      ncrypt.notepad.d = [];
      try {
        for (let i of Object.keys(d)) {
          if (i != 'space') {
            ncrypt.notepad.d.push(ncrypt.dec(d[i], ncrypt.key));
          }
        }

        //no notes
        if(Object.keys(ncrypt.notepad.d).length == 0) {
          ncrypt.notepad.new();
        }

        ncrypt.notepad.d.sort(function (a, b) {
          return b.ts - a.ts;
        });

        ncrypt.notepad.sel(0);
        ncrypt.status = '';
        ncrypt.page = 1;
        ncrypt.nav = true;
      }
      catch(err) {
        ncrypt.status = 'error decrypting data'
        ncrypt.page = 0;
      }

    })
    .catch(function (error) {
      ncrypt.status = error;
    });
  },
  save: function(option) {
    if (option == 'now') {
      clearTimeout(autosave);
      autosaveBusy = false;
      ncrypt.status = 'saving';
      var q = quill.getContents();

      //update title
      var notepadJSON = q.ops;
      var plaintext = '';
      for (let i of notepadJSON) {
        plaintext = plaintext + i.insert;
      }
      var firstline = plaintext.substring(0,plaintext.indexOf('\n'));

      if (firstline.length == 0) {
        firstline = 'untitled';
      }
      else if (firstline.length > 26) {
        firstline = firstline.substring(0,26) + '...';
      }
      firstline = firstline.replace('object Object','image');
      ncrypt.notepad.t = firstline;
      ncrypt.notepad.d[ncrypt.notepad.n].title = firstline;

      //store to json object
      ncrypt.notepad.d[ncrypt.notepad.n].contents = q;
      ncrypt.notepad.d[ncrypt.notepad.n].ts = Date.now();
      ncrypt.notepad.d.sort(function (a, b) {
        return b.ts - a.ts;
      });
      ncrypt.notepad.n = 0;

      //scroll to top of div
      var myDiv = document.getElementById('topnav');
      myDiv.scrollTop = 0;

      //create http post data
      var data = {
        space: ncrypt.username,
        id: ncrypt.notepad.d[ncrypt.notepad.n].id,
        ct: ncrypt.enc(ncrypt.notepad.d[ncrypt.notepad.n], ncrypt.key).toString()
      };
      data = attr.wrap(data);

      //save to AWS
      fetch('https://ncrypt.org/api/save', {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-type": "application/json",
          "Authorization": ncrypt.token
        },
        body: JSON.stringify(data)
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.body == 'successfully saved') {
          ncrypt.status = 'saved';
        }
        else {
          ncrypt.status = 'error saving'
        }
      })
      .catch(function (error) {
        ncrypt.status = 'error saving'
      });
    }
    else if (option == 'timer') {
      clearTimeout(autosave);
      ncrypt.status = '...';
      autosaveBusy = true;
      autosave = setTimeout(function() {
        ncrypt.save('now');
        autosave = null;
        autosaveBusy = false;
      }, 2000);
    }
  },
  del: function(id) {
    ncrypt.status = 'deleting';
    var data = {
      space: ncrypt.username,
      id: ncrypt.notepad.d[ncrypt.notepad.n].id
    };
    data = attr.wrap(data);

    fetch('https://ncrypt.org/api/del', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-type": "application/json",
        "Authorization": ncrypt.token
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json.body == 'successfully deleted') {
        ncrypt.status = 'deleted';
      }
      else {
        ncrypt.status = 'error deleting'
      }
    })
    .catch(function (error) {
      ncrypt.status = 'error deleting'
    });
  },
  search: {
    n: 0, //current search result index
    q: function(searchtext) {
      ncrypt.init = true; //to avoid autosaving when notepad contents are changed
      quill.setText('');
      for (let i of ncrypt.notepad.d) {
        var result = JSON.stringify(i.contents).search(new RegExp(searchtext, "i")); //case insensitive
        if (result >= 0) {
          i.show = true;
        }
        else {
          i.show = false;
        }
      }
      ncrypt.init = false;
    }

  },
  notepad: { ///////////////////////////////////////////////////////////////////    NOTEPAD    /////
    n: 0,  // current notepad index
    t: null, // current notepad title
    d: blanknote,
    sel: function(i) {
      ncrypt.init = true; //to avoid autosaving when notepad contents are changed
      if (autosaveBusy == true) { //save unsaved note before switching
        ncrypt.save('now');
      }
      ncrypt.nav = false;
      this.n = i;
      this.t = this.d[i].title;
      // var last = new Date(this.d[i].ts).toString();
      // ncrypt.status = last.substring(4,last.indexOf('GMT'));
      quill.setContents(this.d[i].contents);
      ncrypt.init = false;
      ncrypt.status = '';
    },
    del: function() {
      ncrypt.init = true;
      ncrypt.confirm = false;
      clearTimeout(autosave);
      ncrypt.del(); //delete from cloud
      if(this.d.length > 1) {
        this.d.splice(this.n, 1);
        this.d.sort(function (a, b) {
          return b.ts - a.ts;
        });
        if (this.n == this.d.length) {
          this.n = this.n - 1;
        }

        this.sel(this.n);
      }
      else { //clear note
        this.d = [];
        this.new();
        this.sel(0);
      }
      ncrypt.nav = true;
    },
    new: function() { //autosaves after creating new note
      if (autosaveBusy == true) {
        ncrypt.save('now');
      }
      this.d.push({id: Date.now(), ts: Date.now(), title: null, contents: '', show: true});
      this.d.sort(function (a, b) {
        return b.ts - a.ts;
      });
      this.n = 0;
      this.t = null;
      quill.setContents(this.d[0].contents);
      quill.focus();
      ncrypt.nav = false;
    }
  }
}

new Vue({
  render: h => h(App),
  data: ncrypt
}).$mount('#app')

var Clipboard = Quill.import('modules/clipboard');
var Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
  convert(html = null) {
    if (typeof html === 'string') {
      this.container.innerHTML = html;
    }
    let text = this.container.innerText;
    this.container.innerHTML = '';
    return new Delta().insert(text);
  }
}

Quill.register('modules/clipboard', PlainClipboard, true);


// Add fonts to whitelist
var Font = Quill.import('formats/font');
Font.whitelist = ['arial','times','courier','opensans'];
// Font.whitelist = ['opensans'];
Quill.register(Font, true);

var quill = new Quill('#editor', {
  modules: {
      toolbar: '#toolbar'
      // toolbar: {
      //   container: toolbarOptions
      // }
    },
    theme: 'snow'
});

quill.on('editor-change', function(eventName, ...args) {
  if (eventName === 'text-change' && ncrypt.init == false) {
    // args[0] will be delta
    ncrypt.save('timer');

    ncrypt.searchmenu = false;
    ncrypt.profile = false;
    for (let i of ncrypt.notepad.d) {
      i.show = true;
    }

  } else if (eventName === 'selection-change') {
    // args[0] will be old range
  }
});
