"use strict";

const namesString = 'Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Enrico Masala, Antonio Servetti';

const names = namesString => namesString.split(',');

console.log(names)

for (let i = 0; i < names.length; i++) {
  names[i] = names[i].trim();
}

console.log(userString);
console.log(names);

for (const name of names){
    let s = name.toUpperCase();
    for (let i=0; i < name.length; i++){
        if (name[i] === " "){
            s += name[i+1].toUpperCase();
        }
    }
    console.log(s);
}

