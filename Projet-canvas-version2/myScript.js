	var btn1=document.getElementById("addPh");
	var imgData;
	var source=document.createElement('source');
	var video=document.createElement('video');
	canvas=document.createElement('canvas');
	video.appendChild(source);
	video.id="camera";video.width=500;video.height=375;;video.autoplay="true"
	var container=document.getElementById("container");
	
	//function called by pressing the button Add photo
	function addPhoto() {
			container.appendChild(video);		
			btn1.firstChild.data="capturer";
			btn1.onclick= function() { capture() };
			btn1.style.backgroundColor="#5FB1CD";
			startCamera();
		}
	//function clled by the function addPhoto(): to Active Camera
	async function   startCamera() {
	            let stream 
	            try {
	               stream = await navigator.mediaDevices.getUserMedia({video: true})
	                video.srcObject = stream

	            } catch (error) {
	            	//if the camera does not working, a video will replace it
	                console.log(error)
	                 var sources = video.getElementsByTagName('source');
	    			sources[0].src = 'video.mp4';
	    			video.load();
	            }
	        }
	//To capture the photo by pressing "capturer"
	function capture(){
			var overlay=document.createElement('div');
			overlay.id="overlay";
			counter=document.createElement('p');
			counter.id="counter";		
			var rect = video.getBoundingClientRect();
			counter.style.left=rect.left;
			overlay.appendChild(counter)
			container.appendChild(overlay)
			counterF(1,counter);									
		}

	//the countdown befor capting image. i number of seconds.
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
	// Setup the envirenement after catching image
	var btn2;
	function catchImg(){
		
		w=canvas.width=video.width;
		h=canvas.height=video.height;
		ctx=canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, w, h);
		video.parentNode.removeChild(video);
		container.appendChild(canvas);
		counter.parentNode.removeChild(counter);
		btn1.firstChild.data="sauvgarder";
		btn1.onclick=function(){ sauvgarder(canvas); }
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
	// sauvgarde 
	function sauvgarder(canvas){
			imgData= canvas.toDataURL();			
	}

	// displaying menu to edit image
	function editImg(canvas){
	 	editMenu=document.getElementById("editMenu");
	 	editMenu.style.display="block";	        	
	 	createEditMenu(editMenu,canvas);
	 	btn2.style.display="none";

 	}

 	//Set up the menu of editing
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

	function drawDataUrl(imgData,ctx){
		var image = new Image();
		image.onload = function() {
  			ctx.drawImage(image, 0, 0,canvas.width,canvas.height);  						
		};
		image.src = imgData; 
	}
	function refresheHue(v,canvas) {
       	ctx=canvas.getContext('2d');
        ctx.filter = 'hue-rotate(' + v + 'deg)';       
        drawDataUrl(imgData,ctx);
    }

    function refresheBrightness(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'brightness(' + v + '%)'       
    	drawDataUrl(imgData,ctx);
    }

    function refresheContrast(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'contrast(' + v + '%)'       
        drawDataUrl(imgData,ctx);
    }

    function refresheSepia(v,canvas) {
       	ctx=canvas.getContext('2d');
        ctx.filter = 'sepia(' + v + '%)'       
        drawDataUrl(imgData,ctx);
    }

    function refresheSaturate(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'saturate(' + v + '%)'       
		drawDataUrl(imgData,ctx);   
		 }

    function refresheGrayscale(v,canvas) {
     	ctx=canvas.getContext('2d');
        ctx.filter = 'grayscale(' + v + '%)'       
		drawDataUrl(imgData,ctx);		        
    }
    
    //initialisation of the selection zone	
    rect={
    	x:10,
    	y:10,
    	w:canvas.width/2,
    	h:canvas.height/2,
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
    
   	var clicked=false,	//if the mouse is clicked 
   		pClicked=0, 	//the number of poinet clicked
   		canvasBound;
	
	// to resizing the zone   		
   	 function resize(canvas){
   	 	canvasBound=canvas.getBoundingClientRect();
    	ctx=canvas.getContext('2d');
    	drawRect(ctx,canvas.width,canvas.height);    	 
    	//cut img button setups
    	btn2.firstChild.data="Cut image";
    	btn2.style.display="inline";
    	btn2.style.backgroundColor="#44000088";
    	btn2.onclick=function () {
    		//here the function of cuting img    		
    		imgData=ctx.getImageData(rect.x,rect.y,rect.w,rect.h);
    		canvas.width=rect.w;
    		canvas.height=rect.h;
    		ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ctx=canvas.getContext('2d');    		   
    		ctx.putImageData(imgData, 0, 0, 0, 0,canvas.width,canvas.height); 
    		sauvgarder(canvas);
			
				rect.x=10,
    	rect.y=10,
    	rect.w=canvas.width/2,
    	rect.h=canvas.height/2, 
    	setUpPoignets();
    	}
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

    // Drawing zone
    function drawRect(ctx,w,h) {    	
    	ctx.strokeRect(rect.x, rect.y,rect.w, rect.h);
    	// After moving one of Poignets, the setUp of others must be done
    	setUpPoignets();
    	//Drawing poignets
    	poignetsDraw(ctx);
    	//Drawing blur area
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
    //
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
    //remplir la surface non selectionnée par un ombre
    function blur(ctx,w,h) {
    	ctx.fillStyle = "#000000AA";
		ctx.fillRect(0, 0, rect.x,h);
		ctx.fillRect(rect.x, 0, w,rect.y);
		ctx.fillRect(rect.x+rect.w,rect.y, w,h);
		ctx.fillRect(rect.x,rect.y+rect.h, rect.w,h);
    }

