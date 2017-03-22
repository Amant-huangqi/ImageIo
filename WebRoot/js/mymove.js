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
    var transform;   //ͼ��Ч��
    var timer;
    var initAngle = 0;  //��ת�Ƕ�
	var initScale = 1;  //�Ŵ���

    var mc = new Hammer.Manager(el);   //�ù�����  ����ͬʱ������ת ��ק  �ƶ�
	//var mc = new Hammer(el);	      //��ת���ƶ�����
/**
ev.srcEvent.type  touchstart  touchend touchmove
ev.deltaX  �����ƶ�λ�Ʊ���  
*/
	mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));  
	mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
    mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);
	//����ʱ��һЩ����
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
�ڶ��ν�����קʱ  deltaλ������
�ƶ�ʱ ��ʼλ��startxy������delta����
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

	//��ת���
	var  preAngle =0 ;
	var  tempAngleFlag=0;
	var  deltaAngle = 0;	
	var  startRotateAngle = 0;
	
	function onRotate(ev) {
		
		//���µڶ������ص�ʱ����
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
				transform.rz = 1;  //��0  ��ֱxy��
				transform.angle =initAngle + deltaAngle;									
				requestElementUpdate();	
			}
		}
			
		//��ת����  ��¼��ǰͼƬ�Ƕ�	
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
        //el.style.webkitTransform = value;  /*ΪChrome/Safari*/
        //el.style.mozTransform = value; /*ΪFirefox*/
        //el.style.transform = value; /*IE Opera?*/
        ticking = false;
			//$('#img3').cropper('zoomTo', 1)
			//$('#mycontainer').cropper('setData',{"x":26,"y":30.500000000000007,"width":208,"height":117,"rotate":transform.angle,"scaleX":transform.scale,"scaleY":transform.scale});
			//$('#img3').cropper('moveTo',transform.translate.x,transform.translate.y);
			try{//hammer.js������Ʋ���  �ֳɷŴ���С��ת  ��  λ��  ���õ�cropper.js�ķ���;δ����ͼ�εĿ�ߵ���cropper.js�ײ��߱�ֵΪnull  trycatch֮... 
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
	��ʼ������
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

	
/*	����
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
			//ͼƬ��ʼ
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




