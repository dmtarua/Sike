var velocity = vec3(0.2, 0, 0.2);
var currentlyPressedKeys = {};
var crouch = false;

// Sets callbacks for mouse click
function setEventListeners(canvas){
	canvas.addEventListener('click', pointerLock);
	document.addEventListener('pointerlockchange', lockChange);
	document.addEventListener('mozpointerlockchange', lockChange);
	document.addEventListener('webkitpointerlockchange', lockChange);
}

// When turning mouse pointer lock on/off
function lockChange(){
	canvas = document.getElementById("canvas");
	if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas) {
		// Pointer was just locked
		// Enable the mousemove listener
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);

		if(canvas.webkitRequestFullScreen) 
            canvas.webkitRequestFullScreen();
        else
            canvas.mozRequestFullScreen();
	}
	else {
		// Pointer was just unlocked
		// Disable the mousemove listener
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("keydown", handleKeyDown);
		document.removeEventListener("keyup", handleKeyUp);
	  }
}

// Handle mouse movement, with locked pointer
function handleMouseMove(event) {
	var deltaX = event.movementX || event.mozMovementX || event.webkitMovementX  || 0;
  	var deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
	default_camera.processMouseMovement(deltaX, deltaY);
}

// Handling keyboard events
function handleKeys() {
	default_camera.LastPosition = default_camera.Position;
	if (currentlyPressedKeys[87]) {
		// W
		default_camera.Position = add(default_camera.Position, mult(default_camera.Front, velocity));
	}
	if (currentlyPressedKeys[83]) {
		// S
		default_camera.Position = subtract(default_camera.Position, mult(default_camera.Front, velocity));
	}
	if (currentlyPressedKeys[65]) {
		// A
		default_camera.Position = add(default_camera.Position, mult(default_camera.Right, velocity));
	}
	if (currentlyPressedKeys[68]) {
		// D
		default_camera.Position = subtract(default_camera.Position, mult(default_camera.Right, velocity));
	}
	if (currentlyPressedKeys[32]) {
		// Space
		default_camera.Position = vec3(0, -1, -16);
	}
	if (currentlyPressedKeys[49]) {
		// 1
		default_camera.Position = vec3(8, -1, -8);
	}
	if (currentlyPressedKeys[50]) {
		// 2
		default_camera.Position = vec3(-8, -1, -8);
	}
	if (!crouch)
		default_camera.Position[1] = -1;
	else
		default_camera.Position[1] = 0;
}

// When pressing a key
function handleKeyDown(event) {
	currentlyPressedKeys[event.keyCode] = true;
	if(event.keyCode == 16){
		// Shift Key
		velocity[0] = 0.5;
		velocity[2] = 0.5;
	}
	if(event.keyCode == 17){
		// Ctrl Key
		crouch = !crouch;
	}
	if(event.keyCode == 81){
		// Q
		Portal.fragmentMode = !Portal.fragmentMode;
	}
}

// When releasing a key
function handleKeyUp(event) {
	currentlyPressedKeys[event.keyCode] = false;
	if(event.keyCode == 16){
		// Shift Key
		velocity[0] = 0.2;
		velocity[2] = 0.2;
	}
}

// Lock mouse pointer
function pointerLock(){
	canvas = document.getElementById("canvas");
	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
	// Ask the browser to lock the pointer
	canvas.requestPointerLock();
}

// Unlock mouse pointer
function pointerUnlock(){
	// Ask the browser to release the pointer
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
	document.exitPointerLock();
}