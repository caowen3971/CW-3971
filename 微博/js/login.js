class Weibo{
	constructor(btn) {
		// 找到点击弹框按钮
	    this.btn = document.querySelector(btn);
		this.container = document.querySelector("#container");
		this.bindEvents();
	}
	
	bindEvents () {
		let _this = this;
		this.btn.onclick = function () {
			// 给container插入内容
			_this.container.innerHTML = '<h4>微博发布</h4>'+
			'<a id="closeBtn" class="close_btn" href="javascript:;">×</a>'+
			'<p><label>用户名：<input id="username" type="text"></label></p>'+
			'<p><textarea id="content"></textarea></p>'+
			'<button id="loginBtn" class="loginBtn" type="button">发布</button>';
			// 调用tools里的方法让container显示并且居中
			tools.showCenter(_this.container);
			// 创建模态层
			_this.modal = document.createElement("div");
			_this.modal.className = "modal";
			document.body.appendChild(_this.modal);
			
			// container可拖拽
			// var h4 = _this.container.querySelector("h4");
			new Drag(_this.container, "h4");
			
			
		}
		
		// 给删除按钮绑事件（委托给container）
		this.container.onclick = e => {
			e = e || window.event;
			var target = e.target || e.srcElement;
			
			
			// 利用case穿透，可以减少两行重复代码
			switch(target.id) {
				case "loginBtn":
					let username = document.querySelector("#username").value;
					let content = document.querySelector("#content").value;
					//获取发布时间
					let time = new Date().getTime();
					//将发布时间、内容、用户名等作为参数传过去
					this.fabu(username,content,time);
					
				case "closeBtn" :
					//隐藏弹框，并删除模态层
					_this.container.style.display = "none";
					document.body.removeChild(_this.modal);
			}	
		}
	
	}
	
	fabu (username,content,time){
		let weibo = document.createElement("div");
		weibo.className = "ccc";
		let nowtime = this.getNowFormatDate();
		let html = `<p class="p2">用户名:${username}</p>
					<p class="p1">内容:<br/>${content}</p>
					<p class="p3">时间:${nowtime}</p>
					<button>撤销</button>`
		weibo.innerHTML = html;
		this.btn.parentNode.appendChild(weibo);
		
		//通过事件委托给撤销按钮绑事件
		weibo.onclick = e =>{
			//获取当前撤销的时间
			let time1 = new Date().getTime();
			//发布时间和撤销时间进行比较
			if(time1 - time < 1000*120 && e.target.nodeName === "BUTTON"){
				if(confirm("确定要撤销该条微博吗？")) {
					weibo.remove();
				}
				//weibo.remove();
			}else if(time1 - time >= 1000*120 && e.target.nodeName === "BUTTON"){
				alert("超过两分钟无法撤销");
			}	
		}
	}
	getNowFormatDate() {//获取当前时间
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
		var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
		var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
				+ " "  + date.getHours()  + seperator2  + date.getMinutes()
				+ seperator2 + date.getSeconds();
		return currentdate;
	}

	
}
