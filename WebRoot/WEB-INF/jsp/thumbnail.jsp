<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="x-ua-compatible" content="ie=edge">
<!-- <meta name="viewport" content="width=device-width, initial-scale=1">-->
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" />
<title>Cropper</title>
<!---->
<link rel="stylesheet" href="./css/bootstrap.min.css">
<link rel="stylesheet" href="./css/cropper.css">

<link href="//cdn.muicss.com/mui-0.9.5/css/mui.min.css" rel="stylesheet"
	type="text/css" />
<script src="//cdn.muicss.com/mui-0.9.5/js/mui.min.js"></script>
<link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css"
	rel="stylesheet">
<style>
img {
	max-width: 50%;
}


</style>

</head>
<body>

	<div class="container">
		<!--  <h1 class="page-header">拖拽、旋转、放大 缩小 截取 图片</h1>-->
		<div class="row">
			<div class="col-sm-6">
				  <h3 class="page-header" style="border-bottom: 1px solid #fff;margin:5px 0 20px;"></h3>

				<div id="mycontainer">
					<img class="img-responsive" id="image"
						src="${pageContext.request.contextPath}${imageURL}" alt="" style="width:80%;">
				</div>
				<div style="margin-top:25px">
				
				<!--  <h3 class="page-header"></h3> -->
				<button type="button" class="btn btn-primary" id="button" style="width:100%;">打印</button>
				<!--  <button type="button" class="btn btn-primary" id="btnreset">复位</button>
				<button type="button" class="btn btn-primary" id="btn_sub">上传</button>-->
				
				</div>
				
			</div>
			<!--<div class="col-sm-6">
				<h3 class="page-header">结果</h3>
				<div id="result"></div>
			</div>-->


			</div>
		</div>
	</div>

	<!-- Scripts 

	 <script src="js/bootstrap.min.js"></script>
   
  -->
	<script src="./js/jquery.min.js"></script>

	<script src="./js/cropper.js"></script>
	<script src="./js/hammer.min.js"></script>

	<script>
	    
	    function back_index(){
	       window.location.href = "thumbnail";
	    }
	
		//手势监听控件 全局变量 mymove.js 内使用
		var $mycontainer = $('#mycontainer');//hammer.js 
		var $image = $('#image');//cropper.js
		var $btnreset = $('#btnreset');

		$(function() {
			var $previews = $('.preview');
			var $button = $('#button');
			var $result = $('#result');
			var croppable = false;

			$image.cropper({
				aspectRatio : 127 / 89, //宽高比
				background : false, //透明的色块改为默认

				viewMode : 0, //移出边框
				dragMode : 'none', //crop  move none
				autoCropArea : 0.8, //0~1   percent
				restore : false, //true:缩小浏览器  图片也自适应缩小
				guides : false, //true:cropbox内部虚线显示
				highlight : false, //true:白色透明蒙版
				cropBoxMovable : false,
				cropBoxResizable : false,
				zoomable : false,
				center : false,//中心的十字是否显示

				//加载图片结束
				built : function() {
					croppable = true;
					// var obj =$image.cropper('getCanvasData');//height  width  top left naturalHeight  naturalWidth    		
					//图片初始
					$image.cropper('setCanvasData', {
						"left" :30,
						"top" : 0
					});

					setMyCropBoxData();

				},

				build : function() {

				}

			});

			$button.on('click', function() {
				var croppedCanvas;
				if (!croppable) {
					return;
				}
				// Crop
				//croppedCanvas = $image.cropper('getCroppedCanvas');
				croppedCanvas = $image.cropper('getCroppedCanvas', {
					width : 1500, //最好和上方的aspectRatio 比例相同  否则1/1情况下 截图的大小是160*160
					height : 1051
				});

				// Show
				//$result.html('<img src="' + croppedCanvas.toDataURL()
				//+ '" id="submit_img">');
				//$result.html('<div>'+JSON.stringify($image.cropper('getCanvasData')));		

				var xx = croppedCanvas.toDataURL();
				if (xx != "") {
					$.ajax({
						type : "POST",
						url : "thumbnail_2",
						contentType : "application/json; charset=utf-8",
						data : JSON.stringify(xx.substring(22)),
						//data : {image:xx.substring(22)},
						dataType : "json",
						success : function(message) {
							alert("正在打印请稍后");
							history.go(-1)
						},
						error : function(message) {
							alert("正在打印请稍后");
							history.go(-1)
						}
					});
				}

			});
			$('#btn_sub').click(function() {

				//alert(xx);
			});

		});
		/**
		 *设置自己定义的剪切图大小  mymove.js  canvas绘制时也有调用 这个方法不断刷新
		修改布局样式 放在这个方法内
		 */
		function setMyCropBoxData() {

			//容器大小  按照图片自适应容器 就不手动设置宽高了
			//$(".cropper-container").css("width",window.innerWidth);
			//$(".cropper-container").css("height",600);

			//设置剪切框的大小位置 
			/*
			$image.cropper('setCropBoxData',{
				"left":0,
				"top":0,
				"height":200,//如果图宽高小于200  则以图片的高度为准 cropper.js的bug
				"width":200
			});
			 */
			//$(".cropper-crop-box").css("height",200); //对切图无效
			//$(".cropper-crop-box").css("width",200);	//对切图无效
		}
	</script>
	<script src="js/mymove.js"></script>
	<!-- 手势操作逻辑 -->
</body>
</html>
