cmake_minimum_required(VERSION 3.4)

set(test3 test3d.cpp)
add_executable(test3d ${test3} ${incfiles})
target_link_libraries(test3d OpenGL::GL glfw)

set(test2 test2d.cpp)
add_executable(test2d ${test2} ${incfiles})
target_link_libraries(test2d OpenGL::GL glfw)