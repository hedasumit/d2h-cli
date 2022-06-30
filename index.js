const NodeCache = require('node-cache');
const myCache = new NodeCache();
myCache.set('balance', 0);
myCache.set('package', [{ 'name': 'c1', 'price': 0 }, { 'name': 'c2', 'price': 0 }, { 'name': 'c3', 'price': 0 }]);
let categories = [
    {
        'name': 'entertainment',
        'channels': [{ 'name': 'ent1', 'price': 10 }, { 'name': 'ent2', 'price': 20 }, { 'name': 'ent3', 'price': 30 }]
    },
    {
        'name': 'educational',
        'channels': [{ 'name': 'edu1', 'price': 40 }, { 'name': 'edu2', 'price': 50 }, { 'name': 'edu3', 'price': 60 }]
    },
    {
        'name': 'regional',
        'channels': [{ 'name': 'r1', 'price': 100 }, { 'name': 'r2', 'price': 200 }, { 'name': 'r3', 'price': 300 }]

    }, {
        'name': 'sports',
        'channels': [{ 'name': 's1', 'price': 123 }, { 'name': 's2', 'price': 135 }, { 'name': 's3', 'price': 138 }]

    }
];
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let recursiveAsyncReadLine = function () {
    readline.question(`
    Welcome. What would you like to do? Please choose
        1. To view your balance.
        2. To add amount to your balance.
        3. To view your basic tariff package.
        4. To add addon channel to your tariff package.
        5. To remove the channel from your tariff plan.`, option => {

        if (isNaN(option)) {
            console.log(`You choosed wrong option ${option}!`);
            readline.close();
        } else {
            switch (option) {
                case '1':
                    console.log(`Your balance is ` + myCache.get('balance'));
                    break;
                case '2':
                    return new Promise((resolve, reject) => {
                        readline.question(`Add Amount.`, amount => {
                            if (isNaN(amount)) {
                                console.log(`You choosed wrong amount ${amount}!`);
                            }
                            myCache.set('balance', myCache.get('balance') + parseInt(amount));
                            console.log(`Your balance is ` + myCache.get('balance'));
                            resolve(recursiveAsyncReadLine());
                        });
                    })
                    break;
                case '3':
                    return new Promise((resolve, reject) => {
                        console.log(`Your Terrif package channels are `);
                        myCache.get('package').forEach(function (entry) {
                            console.log(entry.name);
                        });
                        resolve(recursiveAsyncReadLine());
                    });
                    break;
                case '4':
                    return new Promise((resolve, reject) => {
                        readline.question(`Choose the channel category
                                        1. Entertainment.
                                        2. Educational.
                                        3. Regional.
                                        4. Sports`, category => {
                            if (isNaN(category)) {
                                console.log(`You choosed wrong category ${category}!`);
                            } else {
                                categories[parseInt(category) - 1].channels.forEach(function (entry) {
                                    console.log('Channel name is ' + entry.name + ' and there prize is ' + entry.price);
                                });
                                readline.question(`Add Channel`, channel => {
                                    // check channel is valid or not
                                    categories[parseInt(category) - 1].channels.forEach(function (entry) {
                                        console.log('Channel name is ' + entry.name + ' and there prize is ' + entry.price);
                                    });
                                    if (myCache.get('balance') >= 0) {
                                        console.log(`You don’t have sufficient balance to add this channel in your tariff plan`);
                                        resolve(recursiveAsyncReadLine());
                                    } else {

                                        myCache.set('balance', myCache.get('balance') - 1)
                                    }
                                })
                            }
                        })
                    });
                    break;
                case '5':
                    return new Promise((resolve, reject) => {
                        readline.question(`Enter channel name to remove`, removeChannel => {
                            if (1) {
                                myCache.get('package')
                                // remove channel from the package list 
                                

                            } else {
                                console.log(`You don’t have ${removeChannel} in your tariff plan`);
                                resolve(recursiveAsyncReadLine());

                            }
                        })
                    })
                    break;
                default:
                // code block
            }

        }
        recursiveAsyncReadLine();
    });

}

recursiveAsyncReadLine();