#include "game.h"
#include "resource_manager.h"
#include "sprite_renderer.h"

SpriteRenderer  *Renderer;

Game::Game(unsigned int width, unsigned int height) : State(GAME_ACTIVE), Keys(), Width(width), Height(height){ 

}

Game::~Game(){
    delete Renderer;
}

void Game::Init(){
    ResourceManager::LoadShader("../../shaders/2dvshader.cg", "../../shaders/2dfshader.cg", nullptr, "sprite");
    glm::mat4 projection = glm::ortho(0.0f, static_cast<float>(this->Width), static_cast<float>(this->Height), 0.0f, -1.0f, 1.0f);
    ResourceManager::GetShader("sprite").Use().SetInteger("image", 0);
    ResourceManager::GetShader("sprite").SetMatrix4("projection", projection);
    Shader myShader = ResourceManager::GetShader("sprite");
    Renderer = new SpriteRenderer(myShader);
    ResourceManager::LoadTexture("../../textures/house.png", true, "house");
}

void Game::Update(float dt){
    
}

void Game::ProcessInput(float dt){
   
}

void Game::Render(){
    Texture2D myTexture = ResourceManager::GetTexture("house");
    Renderer->DrawSprite(myTexture, glm::vec2(200, 200), glm::vec2(300, 300));
}