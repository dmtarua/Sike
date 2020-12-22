// WebGL context
var gl = null; 
var worldShader = null; 
var portalShader = null;

// Sets matrix that sets objects in local space into world space
function drawObjects() {
	// Render on canvas
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
	
	default_camera.computeViewMatrix(worldShader);
	default_camera.computeProjectionMatrix(worldShader, window.innerWidth/window.innerHeight);
	
	ground.computeModelMatrix(worldShader);
	for (var i = 0; i < cubeList.length; i++) {
		cubeList[i].computeModelMatrix(worldShader);
	}

	for (var i = 0; i < portalList.length; i++) {
		portalList[i].computeModelMatrix(worldShader);
	}

	// Render on portals
	for (var i = 0; i < portalList.length; i++) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, portalList[i].texture.fb);
		gl.viewport(0, 0, portalList[i].texture.width, portalList[i].texture.height);
		gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
		portalList[i].texture.update();
	}
}

// Main function
function main() {
	var canvas = document.getElementById("canvas");
    initWebGL(canvas);
	worldShader = initWorldShaders(gl);
	portalShader = initPortalShaders(gl);
	setEventListeners(canvas);
	createObjects();
	tick();
}

// Loop
function tick() {
	requestAnimFrame(tick);
	drawObjects();
	handleKeys();
	check_collisions();
}

// WebGL Initialization
function initWebGL( canvas ) {
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;
	try {
		// Create the WebGL context
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		gl.enable( gl.DEPTH_TEST );
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		
	} catch (e) {
		alert("Could not initialise WebGL, sorry! :-(");
	}      
}