// Getting and compiling a shader
function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;
	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} 
	else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} 
	else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

// Initializing the world shader program
function initWorldShaders(gl) {
	var fragmentShader = getShader(gl, "world-shader-fs");
	var vertexShader = getShader(gl, "world-shader-vs");

	var worldShader = gl.createProgram();
	gl.attachShader(worldShader, vertexShader);
	gl.attachShader(worldShader, fragmentShader);
	gl.linkProgram(worldShader);

	if (!gl.getProgramParameter(worldShader, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	// Coordinates 
	worldShader.vertexPositionAttribute = gl.getAttribLocation(worldShader, "position");
	gl.enableVertexAttribArray(worldShader.vertexPositionAttribute);

	// Texture coordinates
    worldShader.textureCoordAttribute = gl.getAttribLocation(worldShader, "texture");
    gl.enableVertexAttribArray(worldShader.textureCoordAttribute);

	// The matrices
	worldShader.projectionMatrixUniform = gl.getUniformLocation(worldShader, "projection");
	worldShader.viewMatrixUniform = gl.getUniformLocation(worldShader, "view");
    worldShader.modelMatrixUniform = gl.getUniformLocation(worldShader, "model");

    // The sampler
	worldShader.samplerUniform = gl.getUniformLocation(worldShader, "sampler");
	
	return worldShader;
}

// Initializing the portal shader program
function initPortalShaders(gl) {
	var fragmentShader = getShader(gl, "portal-shader-fs");
	var vertexShader = getShader(gl, "portal-shader-vs");

	var portalShader = gl.createProgram();
	gl.attachShader(portalShader, vertexShader);
	gl.attachShader(portalShader, fragmentShader);
	gl.linkProgram(portalShader);

	if (!gl.getProgramParameter(portalShader, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	// Coordinates 
	portalShader.vertexPositionAttribute = gl.getAttribLocation(portalShader, "position");
	gl.enableVertexAttribArray(portalShader.vertexPositionAttribute);

	// Texture coordinates
    portalShader.textureCoordAttribute = gl.getAttribLocation(portalShader, "texture");
    gl.enableVertexAttribArray(portalShader.textureCoordAttribute);

	// The matrices
	portalShader.projectionMatrixUniform = gl.getUniformLocation(portalShader, "projection");
	portalShader.viewMatrixUniform = gl.getUniformLocation(portalShader, "view");
    portalShader.modelMatrixUniform = gl.getUniformLocation(portalShader, "model");

	// Draw mode
	portalShader.modeUniform = gl.getUniformLocation(portalShader, "mode");

	// The sampler
	portalShader.samplerUniform = gl.getUniformLocation(portalShader, "sampler");
	
	return portalShader;
}