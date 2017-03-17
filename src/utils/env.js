/**
 * Created by KeiSei on 2017/3/12.
 */
const Dev = {
  apiDomain: 'https://localhost:3000'
}

const Prod = {
  apiDomain: 'https://23.105.205.168:3000'
}
let Env
if (window.location.href.indexOf('baochen520') > -1 || window.location.href.indexOf('ixiqi') > -1) {
  Env = Prod
} else {
  Env = Dev
}

module.exports = Env
