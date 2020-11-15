cmake_minimum_required(VERSION 3.4)

set(game sike_game.cpp)
add_executable(sike_game ${game} ${incfiles})
target_link_libraries(sike_game glfw OpenGL::GL)
