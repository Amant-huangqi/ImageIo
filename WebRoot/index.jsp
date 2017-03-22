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
<!--
<link rel="stylesheet" href="./css/bootstrap.min.css">-->
<link rel="stylesheet" href="./css/cropper.css">
<script
	src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script
	src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link
	href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet">
<link href="//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css"
	rel="stylesheet">
<style>
img {
	max-width: 100%;
}

.checkbox-inline+.checkbox-inline {
	margin-left: 0;
}

label {
	margin-top: 5px;
}

.btn-file {
	position: relative;
	overflow: hidden;
}

.btn-file input[type=file] {
	position: absolute;
	top: 0;
	right: 0;
	min-width: 100%;
	min-height: 100%;
	font-size: 100px;
	text-align: right;
	filter: alpha(opacity = 0);
	opacity: 0;
	outline: none;
	background: white;
	cursor: inherit;
	display: block;
}

.mui-bar{
  position:fixed;
  z-index:10;
  right:0;
  left:0;
  height:44px;
  padding-right:10px;
  padding-left:10px;
  border-bottom:0;
  background-color:#f7f7f7;
  box-shadow:0 0 1px rgba(0,0,0,.85);
  -webkit-box-shadow:0 0 1px rgba(0,0,0,.85);
  -webkit-backface-visibility:hidden;
  backface-visibility:hidden;
}
.mui-bar-nav{
  top:0;
  box-shadow:0 1px 6px #ccc
}
.mui-bar-tab{
  bottom:0;
  display:table;
  width:100%;
  height:50px;
  padding:0;
  table-layout:fixed;
  border-top:0;
  border-bottom:0;
}
.mui-bar-tab .mui-tab-item{
  display:table-cell;
  cursor:pointer;
}
.nav-tab{
  bottom:6px;
}
.mui-tab-item .fa{
  /*margin-left:3px;*/
  margin-top:6px;
  font-size:20px;
}
.mui-bar .mui-title{
  right:40px;
  left:40px;
  display:inline-block;
  overflow:hidden;
  width:auto;
  margin:0;
  text-overflow:ellipsis;
}
.mui-title{
  font-size:17px;
  font-weight:500;
  line-height:44px;
  position:absolute;
  text-align:center;
  white-space:nowrap;
  color:#000;
}
.mui-bar-nav .fa{
  cursor: pointer;
  line-height:44px;
}
</style>

</head>
<body>
<form id="upload_form" enctype="multipart/form-data" method="post" action="${pageContext.request.contextPath}/thumbnail">
	<header class="mui-bar mui-bar-nav">  
	<h1 class="mui-title">
		<!--  --><span class="all" data-id="0c6818da-5173-11e6-998d-52543c3a2aa7">请选择图片</span>
		<span class="btn btn-default btn-file">选择<input type="file" name="image" onchange="showPreview(this)"></span> 
	</h1>
	</header>
	<div class="container" id="container-2">
	
		<!--  <h1 class="page-header"> </h1>-->
		<div class="row">
			<!-- <div class="col-sm-6" >
				  <h3 class="page-header"></h3> 
				<div id="" >
					<!--<span class="btn btn-default btn-file"> 选择<input type="file" name="image" onchange="showPreview(this)">
					</span> 
					 <input type="hidden" name="image" id="avatar"> 
				</div>
			</div>-->
			<div class="col-sm-6" style="">
				<h3 class="page-header" style="border-bottom: 1px solid #fff"></h3>
				<div style="margin:0 auto;width:200; height:200;"><img id="portrait" src="" width="200" height="200" ></div>
				<div style="margin-top:25px">
				
				<button type="submit" class="btn btn-primary" id="" style="width:100%;">上传</button>
				</div>
			</div>
			<!--  
			<div class="col-sm-6" style="margin-top:25px">
				<h3 class="page-header"></h3>
				<button type="submit" class="btn btn-primary" id="" style="width:100%;">上传</button>
			</div>-->

		</div>
		
	</div>
</form>
	<!-- Scripts 

	 <script src="js/bootstrap.min.js"></script>
   
  -->
	<script type="text/javascript">
		function showPreview(source) {
			var file = source.files[0];
			if (!/image\/\w+/.test(file.type)) {
				alert("请确保文件为图像类型");
				return false;
			}
			if (window.FileReader) {
				var fr = new FileReader();
				fr.onloadend = function(e) {
					document.getElementById("portrait").src = e.target.result;
					//document.getElementById("avatar").value = e.target.result;
				};
				fr.readAsDataURL(file);
			}
		}
		
	</script>

	
</body>
</html>
