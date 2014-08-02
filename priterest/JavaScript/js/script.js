window.onload = function() {
	waterfall('main', 'box');
	var dataInt = {
		"data": [{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'}]
	}
	window.onscroll = function() {
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i = 0; i < dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main', 'box');
		}
	}
}

function waterfall (parent, box) {
	// 将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent, box);
	//console.log(oBoxs.length);
	// 计算真个页面显示的列数
	var oBoxw = oBoxs[0].offsetWidth;
	//console.log(oBoxw);
	var cols = parseInt(document.documentElement.clientWidth/oBoxw);
	// console.log(cols);
	oParent.style.cssText = 'width:' + oBoxw * cols + 'px;margin 0 auto';

	var hArr = [];
	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		} else{
			var minH = Math.min.apply(null, hArr);
			var index = getMinhIndex(hArr, minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxw * index + 'px';
			// console.log(minH);
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	// console.log(hArr);
}

function getByClass (parent, clsName) {
	// 根据class获取元素
	var boxArr = new Array(),
		oElements = parent.getElementsByTagName('*');
	for(var i = 0; i < oElements.length; i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

function getMinhIndex(arr, val){
	for (var i in arr){
		if (arr[i] == val) {
			return i;
		};
	}
}

function checkScrollSlide () {
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent, 'box');
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	//console.log(scrollTop);

	var height = document.body.clientHeight || document.documentElement.clientHeight;
	//console.log(height);
	return (lastBoxH < scrollTop + height) ? true:false;
}