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
				setTimeout(function(){ counterF(i,p) }, 0);	
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

