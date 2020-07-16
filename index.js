const greetModule = require('./build/Release/greet.node');
//Skompilowane index.cpp to greetModule
//z modułu uruchamiamy greetHello();

//see properties on 'exports' object
console.log('exports: ', greetModule);
console.log();

//execute  'greetHello' function
console.log('greetModule.greetHello(): ', greetModule.modBright());
console.log();
console.log('greetModule.greetHello(): ', greetModule.greetHello("Jakub"));