#include "glad/glad.h"
#include "glfw/glfw3.h"

#include "window.h"
#include "shader.h"
#include "texture.h"
#include "vao.h"

const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

int main(){
    GLFWwindow* window = createWindow(SCR_WIDTH, SCR_HEIGHT); 
    Shader ourShader("../../shaders/vshader.cg", "../../shaders/fshader.cg");
    Texture texture1("../../textures/container.jpg", false);
    Texture texture2("../../textures/face.png", true);
    VAO vao;

    ourShader.use();
    ourShader.setInt("texture1", 0);
    ourShader.setInt("texture2", 1);

    while (!glfwWindowShouldClose(window)){
        processInput(window);

        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, texture1.texture);
        glActiveTexture(GL_TEXTURE1);
        glBindTexture(GL_TEXTURE_2D, texture2.texture);

        ourShader.use();
        glBindVertexArray(vao.VAOid);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    vao.delete_vao();
    glfwTerminate();
    return 0;
}