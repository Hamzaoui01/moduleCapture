var btn1=document.getElementById("addPh");
	var imgData;
	var source=document.createElement('source');
		var video=document.createElement('video');
		video.appendChild(source);
		video.id="camera";video.width=500;video.height=375;;video.autoplay="true"
		var container=document.getElementById("container");
		function addPhoto() {
			container.appendChild(video);		
			btn1.firstChild.data="capturer";
			btn1.onclick= function() { capture() };
			btn1.style.backgroundColor="#5FB1CD";
			startCamera();
		}
		function capture(){
			var overlay=document.createElement('div');
			overlay.id="overlay";
			counter=document.createElement('p');
			counter.id="counter";		
			var rect = video.getBoundingClientRect();
			counter.style.left=rect.left;
			overlay.appendChild(counter)
			container.appendChild(overlay)
			counterF(3,counter);									
		}
		function counterF(i,p){		
			if(i>=0){
				p.innerText=i;
				setTimeout(function(){ counterF(i,p) }, 1000);	
				i--;
			}
			else{
				console.log("Fin");
				catchImg();
			}
			
		}

		function catchImg(){
			canvas=document.createElement('canvas');
			w=canvas.width=video.width;
			h=canvas.height=video.height;
			ctx=canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, w, h);
			video.parentNode.removeChild(video);
			container.appendChild(canvas);
			counter.parentNode.removeChild(counter);
			btn1.firstChild.data="sauvgarder";
			btn1.onclick=function()		{ sauvgarder(canvas); }
			btn1.style.backgroundColor="#C4823C";
			btn2=document.createElement('button');
			btn2.id="btn2";btn2.style.backgroundColor="#7BB456";
			btn2.innerHTML="Editer";
			btn2.onclick=function () {
					sauvgarder(canvas);
					editImg(canvas);
			}
			btn1.parentNode.appendChild(btn2);
		}

		function sauvgarder(canvas){
			imgData= canvas.toDataURL();
			console.log(imgData);
		}

		 async function   startCamera() {
	            let stream 
	            try {
	               stream = await navigator.mediaDevices.getUserMedia({video: true})
	                video.srcObject = stream

	            } catch (error) {
	                console.log(error)
	                    var sources = video.getElementsByTagName('source');
	    			sources[0].src = 'video.mp4';
	    			video.load();

	            }
	        }

	        function editImg(canvas){
	        	editMenu=document.getElementById("editMenu");
	        	editMenu.style.display="block";	        	
	        	createEditMenu(editMenu,canvas);	        	
	        }

	        function createEditMenu(div,canvas) {
	        	hueInput=document.getElementById("hue");
	        	brightnessInput=document.getElementById("brightness");
	        	contrastInput=document.getElementById("contrast");
	        	sepiaInput=document.getElementById("sepia");
	        	grayscaleInput=document.getElementById("grayscale");
	        	saturateInput=document.getElementById("saturate");
	        	resizeBtn=document.getElementById("resize");
				
				hueInput.onchange=function () {
	        		refresheHue(this.value,canvas);
	        	}
	        	brightnessInput.onchange=function () {
	        		refresheBrightness(this.value,canvas);
	        	}
	        	contrastInput.onchange=function () {
	        		refresheBrightness(this.value,canvas);
	        	}
	        	sepiaInput.onchange=function () {
	        		refresheSepia(this.value,canvas);
	        	}
	        	grayscaleInput.onchange=function () {
	        		refresheGrayscale(this.value,canvas);
	        	}
	        	saturateInput.onchange=function () {
	        		refresheSaturate(this.value,canvas);
	        	}
	        	resizeBtn.onclick=function () {
	        		resize(canvas);
	        	}

	        }
	 function refresheHue(v,canvas) {
       	ctx=canvas.getContext('2d');
        ctx.filter = 'hue-rotate(' + v + 'deg)'       
        ctx.drawImage(video,0,0,video.width,video.height);        
    }
    function refresheBrightness(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'brightness(' + v + '%)'       
        ctx.drawImage(video,0,0,video.width,video.height);         
    }
    function refresheContrast(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'contrast(' + v + '%)'       
        ctx.drawImage(video,0,0,video.width,video.height);         
    }
    function refresheSepia(v,canvas) {
       	ctx=canvas.getContext('2d');
        ctx.filter = 'sepia(' + v + '%)'       
        ctx.drawImage(video,0,0,video.width,video.height);        
    }
    function refresheSaturate(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'saturate(' + v + '%)'       
        ctx.drawImage(video,0,0,video.width,video.height);         
    }
    function refresheGrayscale(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'grayscale(' + v + '%)'       
        ctx.drawImage(video,0,0,video.width,video.height);         
    }
    	
    rect={
    	x:20,
    	y:20,
    	w:150,
    	h:100,
    }	
    pd=10;//poinets height's and width
    	var poinets;
    function setUpPoignets() {
    	 poinets=[
    	{id:0,x:rect.x-(pd/2),y:rect.y-(pd/2)},
    	{id:1,x:rect.x-(pd/2)+rect.w,y:rect.y-(pd/2)},
    	{id:2,x:rect.x-(pd/2),y:rect.y-(pd/2)+rect.h},
    	{id:3,x:rect.x-(pd/2)+rect.w,y:rect.y-(pd/2)+rect.h},
   		]
    }
    
   	var clicked=false,pClicked=0,canvasBound;

   	 function resize(canvas){
   	 	canvasBound=canvas.getBoundingClientRect();
    	ctx=canvas.getContext('2d');
    	drawRect(ctx,canvas.width,canvas.height);   

    	canvas.onmousemove = function (e) {
    		if(clicked){
    			switch (pClicked) {
 					 case 0:{
 					 	poinets[0].x=poinets[2].x=e.clientX-canvasBound.x;
    					poinets[0].y=poinets[1].y=e.clientY-canvasBound.y;
 					 	break;
 					 } 
 					 case 1:{
 					 	poinets[1].x=poinets[3].x=e.clientX-canvasBound.x;
    					poinets[1].y=poinets[0].y=e.clientY-canvasBound.y;

 					 	break;
 					 } 
 					 case 2:{
 					 	poinets[2].x=poinets[0].x=e.clientX-canvasBound.x;
    					poinets[2].y=poinets[3].y=e.clientY-canvasBound.y;

 					 	break;
 					 } 
 					 case 3:{
 					 	poinets[3].x=poinets[1].x=e.clientX-canvasBound.x;
 					 	poinets[3].y=poinets[2].y=e.clientY-canvasBound.y;
 					 	break;
 					 } 					 		 					
				}    		
    			//redissin de canvas
				RefreshCanvas(ctx,canvas.width,canvas.height)
    		}    
		};

		canvas.onmousedown = function (e) {
			xClick=e.clientX-canvasBound.x;
			yClick=e.clientY-canvasBound.y;
			poinets.forEach(p=>{
				if(xClick>=p.x && xClick<=p.x+pd &&
				yClick>=p.y &&yClick<=p.y+pd
				){
    				clicked=true;pClicked=p.id;
    			}
			})
				
		};
		canvas.onmouseup = function (e) {
			if(clicked){
				clicked=false; 		
			}
		};		
    }

    function drawRect(ctx,w,h) {    	
    	ctx.strokeRect(rect.x, rect.y,rect.w, rect.h);
    	setUpPoignets();
    	poignetsDraw(ctx);
    	blur(ctx,w,h);
    }

    function recalculeRect(){
    	let xmax=xmin=poinets[0].x,ymax=ymin=poinets[0].y;
    	poinets.forEach(p=>{
    		if(p.x>xmax)xmax=p.x;
    		if(p.x<xmin)xmin=p.x;
    		if(p.y>ymax)ymax=p.y;
    		if(p.y<ymin)ymin=p.y;
    	});
    	rect.x=xmin+(pd/2);
    	rect.y=ymin+(pd/2);
    	rect.w=xmax-xmin;
    	rect.h=ymax-ymin;    	
    }

    function poignetsDraw(ctx) {
    	ctx.fillStyle = "#000000";
    	poinets.forEach(p=>{

    		ctx.fillRect(p.x,p.y,pd,pd);
    	})    	
    }

    function RefreshCanvas(ctx,w,h) {
    	
    	var image = new Image();
		image.onload = function() {
			ctx.clearRect(0,0,w,h);
  			ctx.drawImage(image, 0, 0);
  			recalculeRect();
			drawRect(ctx,w,h);
		};
		image.src = imgData;   
    }

    function blur(ctx,w,h) {
    	ctx.fillStyle = "#000000AA";
		ctx.fillRect(0, 0, rect.x,h);
		ctx.fillRect(rect.x, 0, w,rect.y);
		ctx.fillRect(rect.x+rect.w,rect.y, w,h);
		ctx.fillRect(rect.x,rect.y+rect.h, rect.w,h);
    }

