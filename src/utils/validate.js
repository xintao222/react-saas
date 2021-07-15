export const validate = {
  isPhone(value) {
    if (!/^\d{6,}$/.test(value)) return false
    return true
  },
  isChinessPhone(value) {
    if (!/^(1[3|4|5|6|7|8|9][0-9]([\\-]?[0-9]{4}){2})$/.test(value)) return false
    return true
  },
  isEmail(value) {
    if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) return false;
    return true
  },
  isPsw(value) {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d:~!\\@#$%^&*()_+{}|=:\-"<>\[\]\;\'\,\.\/]{8,20}$/.test(value)) return false
    return true
  },
  isSmsCode(value) {
    if (!/^\d{6}$/.test(value)) return false
    return true
  },
  isEmailCode(value) {
    if (!/^\d{4}$/.test(value)) return false
    return true
  },
  isName(value) {
    if (!value) return false;
    if (!/^.*[~!@#\$%\^&\*\(\)_+\-=\[\]\{\}\\\|\'\";:,\<\.\>\/\?\s+].*$/.test(value) && !/^[0-9]{1,}$/.test(value)) return true
  },
  isNumber(value) {
    if(typeof(+value)!='number') return false
    value = value || String(this)
    var reg =  /^[+-]?\d*\.?\d{0,10}$/
    return reg.test(value)
  },
  isPositiveNumber(value) {
    if(typeof(+value)!='number') return false
    value = value || String(this)
    var reg = /^[+-]?\d*\.?\d{0,10}$/
    return reg.test(value)&&value>0
  },
}