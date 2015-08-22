$(window).load(function(){
	waterfall();//瀑布流动态布局
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};//模拟服务器返回的JSON数据
	$(window).scroll(function(){
		if(checkScrollPic){
			$.each(dataInt.data,function(index,element){//动态生成新的DOM节点
				var $oBox = $('<div>').addClass('box').appendTo($('#main'));
				$('<img>').addClass('pic').attr('src','images/'+$(element).attr('src')).appendTo($oBox);
			})
		}
		waterfall();
	})
})
function waterfall(){
	var $boxes = $('#main>div');
	var w = $boxes.eq(0).outerWidth();//计算图片布局的列数
	var cols = Math.floor($(window).width()/w);
	$('#main').css({width : w*cols,
					'margin' : '0 auto'});
	var hArr=[];
	$boxes.each(function(index, element) {
		var h=$boxes.eq(index).outerHeight();
		if(index<cols){
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);//寻找当前高度最短的列
			$(element).css({
				'position':'absolute',
				'top':minH,
				'left':minHIndex*w	
			})
			hArr[minHIndex]+=$(element).outerHeight();//更新新添加图片的列的高度
		}
	});
}
function checkScrollPic(){//判断当前页最后一张图片显示是否超过一半
	var $lastBox = $('#main>div').last();//当前最后一张图相对于document的高度
	var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop;//滚动条滑动的高度
	var documentH = $(window).height();//视窗高度
	return(lastBoxDis<scrollTop+documentH)?true:false;
}