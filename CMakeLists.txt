cmake_minimum_required(VERSION 3.4)

set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)

project(Sike)
find_package(OpenGL REQUIRED)

include_directories(include)
include_directories(lib/glad/include)
file(GLOB incfiles include/*.cpp lib/glad/src/glad.c)
add_subdirectory(lib/glfw)
add_subdirectory(src/)