#include "glad/glad.h"
#include "glfw/glfw3.h"
#include "vao.h"

unsigned int* build_vao(){
    unsigned int* obj[3];
    float vertices[] = {
         0.5f,  0.5f, 0.0f,  
         0.5f, -0.5f, 0.0f, 
        -0.5f, -0.5f, 0.0f, 
        -0.5f,  0.5f, 0.0f 
    };
    unsigned int indices[] = {
        0, 1, 3, 
        1, 2, 3 
    };
    unsigned int VBO, VAO, EBO;
    glGenVertexArrays(1, &VAO);
    glGenBuffers(1, &VBO);
    glGenBuffers(1, &EBO);
    glBindVertexArray(VAO);

    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);

    glBindBuffer(GL_ARRAY_BUFFER, 0); 
    glBindVertexArray(0); 

    obj[0] = &VBO;
    obj[1] = &EBO;
    obj[2] = &VAO;
    return *obj;
}