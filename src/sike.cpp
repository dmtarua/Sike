#include "glfw/glfw3.h"
#include "sprite.h"
#include "window.h"

const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 800;

int main(){
    GLFWwindow* window = createWindow(SCR_WIDTH, SCR_HEIGHT);
    if(window == NULL){
        return 1;
    }

    while (!glfwWindowShouldClose(window)){
        processInput(window);

        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        glfwSwapBuffers(window);
        glfwPollEvents();
    }
    glfwTerminate();
    return 0;
}