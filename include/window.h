#include "glfw/glfw3.h"

class Window{
public:
    GLFWwindow* window;
    Window(unsigned int SCR_WIDTH, unsigned int SCR_HEIGHT);
};