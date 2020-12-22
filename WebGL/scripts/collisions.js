function check_collisions(){
	// Cube
	if(default_camera.Position[0] < 1.2 && default_camera.Position[0] > -1.2){
		if( default_camera.Position[2] > -1.2 && default_camera.Position[2] < 1.2){
			default_camera.Position[0] = default_camera.LastPosition[0];
			default_camera.Position[2] = default_camera.LastPosition[2];
		}	
	}

	// Edge of Map
	if(default_camera.Position[0] < -128 || default_camera.Position[0] > 128){
		default_camera.Position[0] = default_camera.LastPosition[0];
	}
	if(default_camera.Position[2] < -128 || default_camera.Position[2] > 128){
		default_camera.Position[2] = default_camera.LastPosition[2];
	}
}