const vehicles = [
    { make: 'Honda', model: 'CR-V', type: 'suv', price: 24045 },
    { make: 'Honda', model: 'Accord', type: 'sedan', price: 22455 },
    { make: 'Mazda', model: 'Mazda 6', type: 'sedan', price: 22995 },
    { make: 'Mazda', model: 'CX-9', type: 'suv', price: 31520 },
    { make: 'Toyota', model: '4Runner', type: 'suv', price: 34210 },
    { make: 'Toyota', model: 'Sequoia', type: 'suv', price: 45560 },
    { make: 'Toyota', model: 'Tacoma', type: 'truck', price: 24320 },
    { make: 'Ford', model: 'F-150', type: 'truck', price: 27110 },
    { make: 'Ford', model: 'Fusion', type: 'sedan', price: 22120 },
    { make: 'Ford', model: 'Explorer', type: 'suv', price: 31660 }
];

const averageSUVPrice = vehicles
    .filter(v => v.type === 'suv')
    .map(v => v.price)
    //here we consider the three input parameters of the reduce function: sum, price, and i
    //sum is the accumulator, price is the current value, and i is the index of the current value
    //the last parameter is the array itself
    //in this case, we use the array parameter to calculate the average price of the SUVs
    .reduce((sum, price, i, array) => sum + price / array.length, 0);


console.log(averageSUVPrice); // 33399
