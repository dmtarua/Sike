cmake_minimum_required(VERSION 3.4)

set(test test3d.cpp)
add_executable(test3d ${test} ${incfiles})
target_link_libraries(test3d OpenGL::GL glfw)

set(game sike_game.cpp)
add_executable(sike_game ${game} ${incfiles})
target_link_libraries(sike_game OpenGL::GL glfw)