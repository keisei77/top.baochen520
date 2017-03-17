/**
 * Created by KeiSei on 2017/3/12.
 */
const Dev = {
  apiDomain: 'http://localhost:3000'
}

const Prod = {
  apiDomain: 'http://ajax.baochen520.top'
}
let Env
if (window.location.href.indexOf('baochen520') > -1 || window.location.href.indexOf('ixiqi') > -1) {
  Env = Prod
} else {
  Env = Dev
}

module.exports = Env
