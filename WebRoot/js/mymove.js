    //var el = document.querySelector("#mycontainer");//img3  imgbak
    var el =$mycontainer[0];
	
    var reqAnimationFrame = (function () {
        return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();


	
	
    var START_X = Math.round((window.innerWidth - el.offsetWidth) / 2);
    var START_Y = Math.round((window.innerHeight - el.offsetHeight) / 2);
START_X=0;
START_Y=0;
	
	
    var ticking = false;
    var transform;   //图像效果
    var timer;
    var initAngle = 0;  //旋转角度
	var initScale = 1;  //放大倍数

    var mc = new Hammer.Manager(el);   //用管理器  可以同时触发旋转 拖拽  移动
	//var mc = new Hammer(el);	      //旋转和移动互斥
/**
ev.srcEvent.type  touchstart  touchend touchmove
ev.deltaX  手势移动位移变量  
*/
	mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));  
	mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
	//结束时做一些处理
    mc.on("hammer.input", function(ev) {
        if(ev.isFinal) {
		//console.log(START_X+"  "+transform.translate.x  +"   "+ev.deltaX);
		START_X = transform.translate.x ;
		START_Y = transform.translate.y ;
		
	
		
        }
		
    });
    mc.on("panstart panmove", onPan);
    mc.on("rotatestart rotatemove rotateend", onRotate);
    mc.on("pinchstart pinchmove", onPinch);
/**
第二次进入拖拽时  delta位移重置
移动时 初始位置startxy不动。delta增加
*/
	function onPan(ev){
		if(!ev.isFinal) {
		 el.className = '';
			//console.log(START_X   +"  "+  START_Y +" |  "+ev.deltaX   +"  "+  ev.deltaY);		
				transform.translate = {
					x: START_X + ev.deltaX,
					y: START_Y + ev.deltaY
				};
				requestElementUpdate();
				
		}	   
	}
	
	function onPinch(ev){
		if(ev.type == 'pinchstart') {
			initScale = transform.scale || 1;
		}
		el.className = '';
		transform.scale = initScale * ev.scale;
		requestElementUpdate();	
	}

	//旋转相关
	var  preAngle =0 ;
	var  tempAngleFlag=0;
	var  deltaAngle = 0;	
	var  startRotateAngle = 0;
	
	function onRotate(ev) {
		
		//点下第二个触控点时触发
        if(ev.type == 'rotatestart') {			    
				startRotateAngle =  ev.rotation ;			 
				tempAngleFlag = 0 ;
        }	
		if(ev.type == 'rotatemove'){
			if(tempAngleFlag == 0){
				preAngle = startRotateAngle;
				tempAngleFlag ++;
			}else{				
				deltaAngle = ev.rotation - preAngle;
				el.className = '';
				transform.rz = 1;  //非0  垂直xy轴
				transform.angle =initAngle + deltaAngle;									
				requestElementUpdate();	
			}
		}
			
		//旋转结束  记录当前图片角度	
		if(ev.type =='rotateend'){
			initAngle = transform.angle;
		}	
    }



    function updateElementTransform() {
        var value = [
                    'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
                    'scale(' + transform.scale + ', ' + transform.scale + ')',
                    'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
        ];

        value = value.join(" ");
        //el.style.webkitTransform = value;  /*为Chrome/Safari*/
        //el.style.mozTransform = value; /*为Firefox*/
        //el.style.transform = value; /*IE Opera?*/
        ticking = false;
			//$('#img3').cropper('zoomTo', 1)
			//$('#mycontainer').cropper('setData',{"x":26,"y":30.500000000000007,"width":208,"height":117,"rotate":transform.angle,"scaleX":transform.scale,"scaleY":transform.scale});
			//$('#img3').cropper('moveTo',transform.translate.x,transform.translate.y);
			try{//hammer.js获得手势参数  分成放大缩小旋转  和  位移  设置到cropper.js的方法;未传递图形的宽高导致cropper.js底层宽高比值为null  trycatch之... 
				$image.cropper('setData',{"rotate":transform.angle,"scaleX":transform.scale,"scaleY":transform.scale});
		     	$image.cropper('setCanvasData',{
				"left":transform.translate.x,
				"top":transform.translate.y
				});
				setMyCropBoxData();
			}catch(e){
				
			}
			

			
    }

    function requestElementUpdate() {
        if(!ticking) {
            reqAnimationFrame(updateElementTransform);
            ticking = true;
			
        }
    }


	
	/**
	初始化设置
	*/
    function resetElement() {

        el.className = 'animate';
		 transform = {
            translate: { x: START_X, y: START_Y },
            scale: 1,
            angle: 0,
            rx: 0,
            ry: 0,
            rz: 0
        };
        requestElementUpdate();
    }
	
	
    resetElement();

	
/*	废弃
	function testBtn(){
//$('#img3').cropper('move', 1, 0);
//	$('#img3').cropper('setData', );
//	$('#img3').cropper('setData',{"x":26,"y":30.500000000000007,"width":208,"height":117,"rotate":60,"scaleX":1,"scaleY":1});
//$('#img3').cropper('setData',{"x":26,"y":30.500000000000007,"width":208,"height":117,"rotate":0,"scaleX":1,"scaleY":1});

//$('#myCanvas').getCanvasImage('jpeg', 1);
 var base64 = $('#myCanvas')[0].toDataURL('image/jpg', 1); 
 $("#img4").eq(0).attr('src', base64);
}
*/

		$btnreset.on('click', function () {					
			//图片初始
			START_X=0;
			START_Y=0;
			initAngle=0;
			initScale=1;
			transform = {
				translate: { x: START_X, y: START_Y },
				scale: 1,
				angle: 0,
				rx: 0,
				ry: 0,
				rz: 0
			};
			$image.cropper('setData',{"rotate":transform.angle,"scaleX":transform.scale,"scaleY":transform.scale});
			$image.cropper('setCanvasData',{
			"left":transform.translate.x,
			"top":transform.translate.y
			});
			
			
        });




