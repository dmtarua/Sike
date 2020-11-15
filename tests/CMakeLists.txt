cmake_minimum_required(VERSION 3.4)

set(test 3dtest.cpp)
add_executable(3dtest ${test} ${incfiles})
target_link_libraries(3dtest glfw OpenGL::GL)
