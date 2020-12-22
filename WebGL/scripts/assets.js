var default_camera = null;
var ground = null;
var portalList = [];
var cubeList = [];

function createObjects(){
    Cube.initObjectBuffers();
	Ground.initObjectBuffers();

	default_camera = new Camera(vec3(0, -1, -16));

	var cube_texture = new Texture("textures/marble2.jpg");
	var ground_texture =  new Texture("textures/marble.jpg");

    // Ground
    ground = new Ground(vec3(128, 0, 128), vec3(0, -1, 0), ground_texture); 
    
    // Cube
	cubeList.push(new Cube(vec3(1, 1, 1), vec3(0, 1, 0), cube_texture));
}