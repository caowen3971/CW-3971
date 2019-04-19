class Drag  {
	constructor (obj, title){
		this.obj = obj;
		// 有title拖title，否则就是obj本身
		this.title = title ? this.obj.querySelector(title) : obj;
		this.init();
	}
	

	init () {
		var _this = this;//先把this取出来，现在的this是Drag
		this.title.onmousedown = function (e) {
			// e = e || window.event;
			// 获取鼠标距离元素左上角的坐标
			var disX = e.offsetX,//鼠标到事件源的距离
				disY = e.offsetY;
			document.onmousemove = function (e) {
				var _top = e.clientY - disY,//鼠标到可视区域的距离减去到事件源的距离
					_left = e.clientX - disX;
				_this.move(_top, _left);//调用move拖拽（分工）
			}
			// 鼠标抬起，move失效
			document.onmouseup = function () {
				document.onmousemove = null;
			}
			// 阻止默认事件
			//e.preventDefault();
			return false;
		}
	}
	move (top, left) {
		// 考虑边界
		if(left < 0) left = 0;
		if(top < 0) top = 0;
		// 窗口宽度减去盒子自身宽度
		if(left > tools.getBody().width - this.obj.offsetWidth) left = tools.getBody().width - this.obj.offsetWidth;
		if(top > tools.getBody().height - this.obj.offsetHeight) top = tools.getBody().height - this.obj.offsetHeight;
		tools.setStyle(this.obj, {
			left : left + "px",
			top : top + "px"
		})
	}
}