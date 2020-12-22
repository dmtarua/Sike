class Camera{
    Position = vec3();
    LastPosition = vec3();
    
    // Always points to z positive axis
    WorldUp = vec3(0, 1, 0);
    Front = vec3(0, 0, 1);
    Right = vec3(1, 0, 0);
    Up = vec3(0, 1, 0);
    Yaw = 0;
    Pitch = 0;

    constructor(pos){
        this.Position = pos;
    }
    
    // Called when mouse moves
    processMouseMovement(xoffset, yoffset){
        xoffset *= 0.1;
        yoffset *= 0.1;
        this.Yaw += xoffset;
        this.Pitch += yoffset;
        // update Front, Right and Up Vectors using the updated Euler angles
        this.updateCameraVectors();
    }

    // Updates camera parameters
    updateCameraVectors(){
        // calculate the new Front vector
        var right = vec3();
        right[0] = Math.cos(radians(this.Yaw)) * Math.cos(radians(this.Pitch));
        right[1] = Math.sin(radians(this.Pitch));
        right[2] = Math.sin(radians(this.Yaw)) * Math.cos(radians(this.Pitch));
        this.Right = normalize(right);
        // also re-calculate the Right and Up vector
        this.Front = normalize(cross(this.Right, this.WorldUp));
        this.Up = normalize(cross(this.Right, this.Front));
    }

    // Returns matrix with transformations needed to see what the camera is looking at
    lookingAt() {
        var translation = translationMatrix(this.Position[0], this.Position[1], this.Position[2]);  
        var rotationX = rotationXXMatrix(this.Pitch);
        var rotationY = rotationYYMatrix(this.Yaw);
        var temp = mult(rotationX, rotationY);
        return mult(temp, translation);
    }

    // Sets matrix that transforms world space to view space
    computeViewMatrix(shader) {
        gl.useProgram(shader);
        var move = this.lookingAt();
        // Passing the View Matrix to apply the current transformation
        gl.uniformMatrix4fv(shader.viewMatrixUniform, false, new Float32Array(flatten(move)));
    }

    // Sets matrix that transforms view space to clip space
    computeProjectionMatrix(shader, aspect) {
        gl.useProgram(shader);
        var local = perspective(45, aspect, 0.1, 256 );
        // Passing the Projection Matrix to apply the current transformation
        gl.uniformMatrix4fv(shader.projectionMatrixUniform, false, new Float32Array(flatten(local)));
    }
}
