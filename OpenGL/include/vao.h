#ifndef VAO_H
#define VAO_H

class VAO{
public:
    unsigned int VBOid;
    unsigned int VAOid;
    unsigned int EBOid;
    VAO();
    int delete_vao();
};

#endif