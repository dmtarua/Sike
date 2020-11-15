cmake_minimum_required(VERSION 3.4)

project(Sike)
find_package(OpenGL REQUIRED)

set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(CMAKE_EXE_LINKER_FLAGS  "${CMAKE_EXE_LINKER_FLAGS} -static-libgcc -static-libstdc++")

include_directories(include)
include_directories(lib/glad/include)
include_directories(lib/stb)
include_directories(lib/glm)
add_subdirectory(lib/glfw)

file(GLOB incfiles src/*.cpp lib/glad/src/glad.c lib/stb/stb_image.cpp)
add_subdirectory(tests/)