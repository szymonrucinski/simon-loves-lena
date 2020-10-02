// src/greeting.cpp
#include <iostream>
#include <string>
#include "greeting.h"
#define cimg_display 0
#include "CImg.h"

using namespace cimg_library;
using namespace std;

std::string uploadToOutput(std::string path)
{
    while (path.find("upload") != string::npos)
        path.replace(path.find("upload"), 6, "output");
    
    return path;
}

std::string brightness(string imgPath, int value, string imgName)
{

    const char *c_name = imgPath.c_str();
    std::cout << (c_name)<<endl;

    
    


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
        std::cout << ("Saved")<<endl;

    string output = uploadToOutput(imgPath); 
    const char *c_output = output.c_str();

    image.save(c_output);

    return "Brightness increased " + to_string(value);
}