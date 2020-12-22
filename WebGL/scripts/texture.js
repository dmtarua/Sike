class Texture{
    texture = null;
    fb = null;
    camera = null;
    width;
    height;

    constructor(arg){
        if(arg instanceof Camera){
            this.camera = arg;

            var temp = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, temp);
            this.width = gl.canvas.width;
            this.height = gl.canvas.width*2;
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            this.texture = temp;
            this.fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
            var depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            this.update();
        }
        else{
            var temp = gl.createTexture();
            temp.image = new Image();
            temp.image.onload = function () {
                Texture.handleLoadedTexture(temp);
            }
            temp.image.src = arg;
            this.texture = temp;
        }
    }

    // Updates camera texture
    update(){
        ground.computeModelMatrix(portalShader);
        for (var i = 0; i < cubeList.length; i++) {
            cubeList[i].computeModelMatrix(portalShader);
        }
        this.camera.computeViewMatrix(portalShader);
        this.camera.computeProjectionMatrix(portalShader, this.width/this.height);
    }

    // Handling the Textures
    static handleLoadedTexture(texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
}