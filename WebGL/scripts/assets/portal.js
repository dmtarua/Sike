class Portal{
    static portalVertexPositionBuffer;
    static portalVertexTextureCoordBuffer;
    static portalVertexIndexBuffer;
    static fragmentMode = false;
    texture;
    pos;
    siz;

    constructor(size, position, texture){
        this.pos = position;
        this.siz = size;
        this.texture = texture;
    }

    // Draw portal
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
        gl.bindBuffer(gl.ARRAY_BUFFER, Portal.portalVertexPositionBuffer);
        gl.vertexAttribPointer(shader.vertexPositionAttribute, Portal.portalVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Texture
        gl.bindBuffer(gl.ARRAY_BUFFER, Portal.portalVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shader.textureCoordAttribute, Portal.portalVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture); 
        gl.uniform1i(shader.samplerUniform, 0);

        // The vertex indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Portal.portalVertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);	
        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 6);	
    }

    static initObjectBuffers() {	
        // Coordinates
        Portal.portalVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Portal.portalVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Portal.portalVertices), gl.STATIC_DRAW);
        Portal.portalVertexPositionBuffer.itemSize = 3;
        Portal.portalVertexPositionBuffer.numItems = Portal.portalVertices.length / 3;

        // Texture
        Portal.portalVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Portal.portalVertexTextureCoordBuffer);
 	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Portal.portalTextureCoords), gl.STATIC_DRAW);
        Portal.portalVertexTextureCoordBuffer.itemSize = 2;
        Portal.portalVertexTextureCoordBuffer.numItems = 4;
    
        // Vertex indices
        Portal.portalVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Portal.portalVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Portal.portalVertexIndices), gl.STATIC_DRAW);
        Portal.portalVertexIndexBuffer.itemSize = 1;
        Portal.portalVertexIndexBuffer.numItems = 6;
    }

    // Vertices defining portal
    static portalVertices = [
        -0.5, -1.0,  1.0,
         0.5, -1.0,  1.0,
         0.5,  1.0,  1.0,
        -0.5,  1.0,  1.0
    ];

    // Vertex indices defining the triangles   
    static portalVertexIndices = [
        0, 1, 2, 
        0, 2, 3,
    ];

    // Texture coordinates
    static portalTextureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];
}