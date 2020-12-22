class Cube{
    static cubeVertexPositionBuffer;
    static cubeVertexIndexBuffer;
    static cubeVertexTextureCoordBuffer;
    texture;
    pos;
    siz;

    constructor(size, position, texture){
        this.pos = position;
        this.siz = size;
        this.texture = texture;
    }

    // Draw cube
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
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shader.vertexPositionAttribute, Cube.cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Texture
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.cubeVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shader.textureCoordAttribute, Cube.cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture); 
        gl.uniform1i(shader.samplerUniform, 0);

        // The vertex indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Cube.cubeVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);	
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 12);	
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 24);	
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 36);	
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 48);	
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 60);	
    }

    static initObjectBuffers() {	
        // Coordinates	
        Cube.cubeVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.cubeVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cube.cubeVertices), gl.STATIC_DRAW);
        Cube.cubeVertexPositionBuffer.itemSize = 3;
        Cube.cubeVertexPositionBuffer.numItems = Cube.cubeVertices.length / 3;
    
        // Texture
        Cube.cubeVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Cube.cubeVertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Cube.cubeTextureCoords), gl.STATIC_DRAW);
        Cube.cubeVertexTextureCoordBuffer.itemSize = 2;
        Cube.cubeVertexTextureCoordBuffer.numItems = 24;		
    
        // Vertex indices
        Cube.cubeVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Cube.cubeVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Cube.cubeVertexIndices), gl.STATIC_DRAW);
        Cube.cubeVertexIndexBuffer.itemSize = 1;
        Cube.cubeVertexIndexBuffer.numItems = 36;
    }

    // Vertices defining the cube faces
    static cubeVertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];

    // Texture coordinates for the quadrangular faces
    static cubeTextureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    // Vertex indices defining the triangles   
    static cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];

}