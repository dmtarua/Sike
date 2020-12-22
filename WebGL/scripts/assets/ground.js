class Ground{
    static groundVertexPositionBuffer;
    static groundVertexTextureCoordBuffer;
    static groundVertexIndexBuffer;
    texture;
    pos;
    siz;

    constructor(size, position, texture){
        this.pos = position;
        this.siz = size;
        this.texture = texture;
    }

    // Draw ground
    computeModelMatrix(shader) {
        gl.useProgram(shader);
        var modelMatrix = mat4();
        modelMatrix = mult( modelMatrix, translationMatrix( this.pos[0], this.pos[1], this.pos[2] ) );					 
        modelMatrix = mult( modelMatrix, scalingMatrix( this.siz[0], this.siz[1], this.siz[2] ) );
         
        // Passing the Model View Matrix to apply the current transformation
        gl.uniformMatrix4fv(shader.modelMatrixUniform, false, new Float32Array(flatten(modelMatrix)));

        // Mode
        if (typeof shader.modeUniform !== 'undefined') {
            if (Portal.fragmentMode){
                gl.uniform1f(shader.modeUniform, 1);
            }
            else{
                gl.uniform1f(shader.modeUniform, 0);
            }
        }

        // Passing the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, Ground.groundVertexPositionBuffer);
        gl.vertexAttribPointer(shader.vertexPositionAttribute, Ground.groundVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Texture
        gl.bindBuffer(gl.ARRAY_BUFFER, Ground.groundVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shader.textureCoordAttribute, Ground.groundVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture); 
        gl.uniform1i(shader.samplerUniform, 0);

        // The vertex indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Ground.groundVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);	
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 6);	
}

    static initObjectBuffers() {	
        // Coordinates
	    Ground.groundVertexPositionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, Ground.groundVertexPositionBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Ground.groundVertices), gl.STATIC_DRAW);
	    Ground.groundVertexPositionBuffer.itemSize = 3;
        Ground.groundVertexPositionBuffer.numItems = Ground.groundVertices.length / 3;	

        // Texture
        Ground.groundVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Ground.groundVertexTextureCoordBuffer);
 	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Ground.groundTextureCoords), gl.STATIC_DRAW);
        Ground.groundVertexTextureCoordBuffer.itemSize = 2;
        Ground.groundVertexTextureCoordBuffer.numItems = 4;

        // Vertex indices - Ground
        Ground.groundVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Ground.groundVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Ground.groundVertexIndices), gl.STATIC_DRAW);
        Ground.groundVertexIndexBuffer.itemSize = 1;
        Ground.groundVertexIndexBuffer.numItems = 6;
    }

    // Vertices defining ground
    static groundVertices = [
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
    ];

    // Vertex indices defining the triangles   
    static groundVertexIndices = [
        0, 1, 2, 
        0, 2, 3,
    ];

    // Texture coordinates for the ground
    static groundTextureCoords = [
        0.0, 128.0,
        0.0, 0.0,
        128.0, 0.0,
        128.0, 128.0,
    ];
}