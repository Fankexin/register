var userName = document.getElementById('TANGRAM__PSP_4__userName');
var userNameError = document.getElementById('TANGRAM__PSP_4__userNameError');
var userNameTip = document.getElementById('TANGRAM__PSP_4__userNameTip');
var phone = document.getElementById('TANGRAM__PSP_4__phone');
var phoneError = document.getElementById('TANGRAM__PSP_4__phoneError');
var password = document.getElementById('TANGRAM__PSP_4__password');
var passwordError = document.getElementById('TANGRAM__PSP_4__passwordError');
var verifyCode = document.getElementById('TANGRAM__PSP_4__verifyCode');
var verifyCodeError = document.getElementById('TANGRAM__PSP_4__verifyCodeError');
var verifyCodeSend = document.getElementById('TANGRAM__PSP_4__verifyCodeSend');
var submit = document.getElementById('TANGRAM__PSP_4__submit');
var form = document.getElementById('TANGRAM__PSP_4__form');

userNameTip.style.display='none';

function checkUserName () {
  userNameTip.style.display='none';
  var value = userName.value;
  var space_reg = /\s/g;
  value = value.replace(space_reg, "");
  userName.value = value;
  if (value === '') {
    return 1;
  }
  var len = 0;
  //1个汉字顶2个
  for (var i = 0; i < value.length; i++) { 
    if ((value.charCodeAt(i) < 0) || (value.charCodeAt(i) > 255)) {
      len = len + 2;
    } else {
      len=len + 1;
    }
  }
  if (len > 14) {
    userName.classList.add('pass-text-input-error');
    userNameError.innerText = '用户名不能超过7个汉字或14个字符';
    userNameError.style.display = 'block';
    return false;
  }
  var reg1 = /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/;//数字英文和中文还有-_和空格
  var reg2 = /^[0-9]+$/;//整数
  if (!(reg1.test(value) === true && reg2.test(value) === false)) {
    userName.classList.add('pass-text-input-error');
    userNameError.innerText = '用户名仅支持中英文、数字和下划线,且不能为纯数字';
    userNameError.style.display = 'block';
    return false;
  }
}

function checkPhone () {
  var value = phone.value;
  if (value === '') {
    return 1;
  }
  var reg = /^[1][0-9]{10}$/;//1打头11位数字,手机号码使用正则表达式完成验证
  if (reg.test(value) === false) {
    phone.classList.add('pass-text-input-error');
    phoneError.innerText = '手机号码格式不正确';
    phoneError.style.display = 'block';
    return false;
  }
}

function checkPassword () {
  var value = password.value;
  if (value === '') {
    return 1;
  }
  var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,14}$/;
  if (reg.test(value) === false) {
    password.classList.add('pass-text-input-error');
    passwordError.innerText = '密码设置不符合要求';
    passwordError.style.display = 'block';
    return false;
  }
}

function checkVerifyCode () {
  var value = verifyCode.value;
  var space_reg = /\s/g;
  var value = value.replace(space_reg, "");
  verifyCode.value = value;
  if (value === '') {
    return 1;
  }
}

userName.onfocus = function () {
  userNameTip.style.display='block';
  userName.classList.remove('pass-text-input-error');
  userNameError.innerText = '';
  userNameError.style.display = 'none';
}
phone.onfocus = function () {
  phone.classList.remove('pass-text-input-error');
  phoneError.innerText = '';
  phoneError.style.display = 'none';
}
password.onfocus = function () {
  password.classList.remove('pass-text-input-error');
  passwordError.innerText = '';
  passwordError.style.display = 'none';
}
verifyCode.onfocus = function () {
  verifyCode.classList.remove('pass-text-input-error');
  verifyCodeError.innerText = '';
  verifyCodeError.style.display = 'none';
}

//字段级别验证
userName.onblur = function () {
  checkUserName();
}
phone.onblur = function () {
  checkPhone();
}
password.onblur = function () {
  checkPassword();
}
verifyCode.onblur = function () {
  checkVerifyCode();
}

//实现点击发送验证码的JS效果，即点击后倒计时效果，且按钮变为不可用
verifyCodeSend.style.cursor='pointer';

verifyCodeSend.onclick = function () {
  verifyCodeSend.style.color='#F0F0F0';
  verifyCodeSend.style.cursor='not-allowed'
  verifyCodeSend.disabled = true;
  var s = 10;
  verifyCodeSend.value = '重发验证(' + s + '秒)';
  var timer = setInterval(function () {
    s--;
    verifyCodeSend.value = '重发验证(' + s + '秒)';
    if (s < 0) {
      clearInterval(timer);
      verifyCodeSend.disabled = false;
      verifyCodeSend.value = '重发验证';
      verifyCode.classList.add('pass-text-input-error');
      verifyCodeError.innerText = '请求超时，请稍后再试';
      verifyCodeError.style.display = 'block';
      verifyCodeSend.style.color='#333';
      verifyCodeSend.style.cursor='pointer';
    }
  }, 1000);
}

//表单级别验证
form.onsubmit = function () {
  event.preventDefault();
  if (checkUserName() === 1) {
    userName.classList.add('pass-text-input-error');
    userNameError.innerText = '用户名不能为空';
    userNameError.style.display = 'block';
  }
  if (checkPhone() === 1) {
    phone.classList.add('pass-text-input-error');
    phoneError.innerText = '手机号不能为空';
    phoneError.style.display = 'block';
  }
  if (checkPassword() === 1) {
    password.classList.add('pass-text-input-error');
    passwordError.innerText = '密码不能为空';
    passwordError.style.display = 'block';
  }
  if (checkVerifyCode() === 1) {
    verifyCode.classList.add('pass-text-input-error');
    verifyCodeError.innerText = '验证码不能为空';
    verifyCodeError.style.display = 'block';
  }
}
