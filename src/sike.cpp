#include "glad/glad.h"
#include "glfw/glfw3.h"

#include "window.h"
#include "shader.h"
#include "vao.h"

const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

int main(){
    GLFWwindow* window = createWindow(SCR_WIDTH, SCR_HEIGHT);
    if(window == NULL){
        return 1;
    }
    
    int shaderProgram = compile_shaders();

    unsigned int* values = build_vao();
    unsigned int VBO = values[0];
    unsigned int EBO = values[1];
    unsigned int VAO = values[2];

    while (!glfwWindowShouldClose(window)){
        processInput(window);

        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        glUseProgram(shaderProgram);
        glBindVertexArray(VAO);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    glDeleteVertexArrays(1, &VAO);
    glDeleteBuffers(1, &VBO);
    glDeleteBuffers(1, &EBO);
    glDeleteProgram(shaderProgram);

    glfwTerminate();
    return 0;
}