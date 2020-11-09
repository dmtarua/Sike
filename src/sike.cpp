#include "glad/glad.h"
#include "glfw/glfw3.h"

#include "window.h"
#include "shader.h"
#include "vao.h"

const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

int main(){
    GLFWwindow* window = createWindow(SCR_WIDTH, SCR_HEIGHT); 
    Shader ourShader("../../shaders/vshader.cg", "../../shaders/fshader.cg");

    unsigned int* values = build_vao();
    unsigned int VBO = values[0];
    unsigned int VAO = values[1];

    while (!glfwWindowShouldClose(window)){
        processInput(window);

        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        ourShader.use();
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    delete_vao();
    glfwTerminate();
    return 0;
}