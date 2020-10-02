#include <napi.h>
#include <string>
#include "part1.h"

using namespace std;

Napi::String brightness(const Napi::CallbackInfo &info)
{
    string imagePath = info[0].As<Napi::String>();
    int value = info[1].As<Napi::Number>();
    string imageName = info[2].As<Napi::String>();

    Napi::Env env = info.Env();

    //call 'helloUser' function from 'greeting.cpp' file
    //return new 'Napi::String' value

    return Napi::String::New(env, __brightness(imagePath, value, imageName));
}

//callback method when module is registered with Node.js
Napi::Object Init(Napi::Env env, Napi::Object exports)
{

    exports.Set(
        Napi::String::New(env, "brightness"),  //property name =>"brightness"
        Napi::Function::New(env, brightness)); //property value => 'brightness' function

    return exports;
}

NODE_API_MODULE(brightness, Init)
