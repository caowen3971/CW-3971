class Register {
  constructor () {
    this.inputUserName = document.querySelector("#inputUserName");
    this.inputPassword = document.querySelector("#inputPassword");
    this.btn = document.querySelector("#btn");
    this.bindEvent();
  }

  bindEvent () {
    this.btn.onclick = () => {
      let username = this.inputUserName.value,
          password = this.inputPassword.value;
      // 前端数据验证
      if(username === /^.{2,8}$/ && password === /^.{6,16}$/){
	      // 发送请求
	      tools.ajax("POST", "../api/v1/register.php", {username, password}, data => {
	        alert(data.res_message);
	        if(data.res_code === 1){
	        	window.location.href = "login.html";
	        }
	      })
      }else{
      	alert(用户名或密码长度错误,请重新设置);
      }
     

      return false;

    }
  }


}

new Register();