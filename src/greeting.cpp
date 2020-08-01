// src/greeting.cpp
#include <iostream>
#include <string>
#include "greeting.h"
#define cimg_display 0
#include "CImg.h"

using namespace cimg_library;
using namespace std;

std::string helloUser(std::string name)
{
    return "Hello " + name + "!";
}

std::string brightness(string img_name, int value)
{
    const char * c_name = img_name.c_str();

    CImg<unsigned char> image(c_name);
    int height = image.height();
    int width = image.width();
    int spectrum = image.spectrum();
    for (int y = 0; y < height; y++)
    {
        for (int x = 0; x < width; x++)
        {
            for (int z = 0; z < spectrum; z++)
            {
                if (image(x, y, z) + value > 255)
                    image(x, y, z) = 255;
                else if (image(x, y, z) + value < 0)
                    image(x, y, z) = 0;
                else
                    image(x, y, z) += value;
            }
        }
    }

    image.save("./images/new.jpg");

    return "Brightness increased" + to_string(value);
}