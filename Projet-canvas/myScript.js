var btn1=document.getElementById("addPh");
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
			btn1.style.backgroundColor="C4823C";
		}

		function sauvgarder(canvas){
			var pngUrl = canvas.toDataURL();
			console.log(pngUrl);
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