#include <napi.h>
#include <string>
#include "greeting.h"

using namespace std;

// native C++ function that is assigned to 'greetHello' property on 'exports' object
Napi::String greetHello(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    //call 'helloUser' function from 'greeting.cpp' file
    //Passing hardcoded 'Szymon'
    std::string result = helloUser( info[0].As<Napi::String>()  );

    //return new 'Napi::String' value
    return Napi::String::New(env, result);
}

Napi::String modBright(const Napi::CallbackInfo &info)
{
    // const char *imageName = info[0].IsString()
    // const char *value = info[1].IsNumber()

    Napi::Env env = info.Env();

    //call 'helloUser' function from 'greeting.cpp' file
    //Passing hardcoded 'Szymon'

    //return new 'Napi::String' value

    return Napi::String::New(env, brightness("./images/BartSimpson.jpg", 200));
}

//callback method when module is registered with Node.js
Napi::Object Init(Napi::Env env, Napi::Object exports)
{

    exports.Set(
        Napi::String::New(env, "modBright"),  //property name =>"greetHello"
        Napi::Function::New(env, modBright)); //property value => 'greetHello' function

    exports.Set(Napi::String::New(env, "greetHello"),
        Napi::Function::New(env, greetHello));


    return exports;
}

NODE_API_MODULE(greet, Init)
