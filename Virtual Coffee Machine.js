const input = require('sync-input');

// An Espresso Drink
const espresso = {
    'name': "espresso",
    'waterPerCup': 250,
    'milkPerCup': 0,
    'beansPerCup': 16,
    'cost': 4
};

// A Latte Drink
const latte = {
    'name': "latte",
    'waterPerCup': 350,
    'milkPerCup': 75,
    'beansPerCup': 20,
    'cost': 7
};

// A Cappucino Drink
const cappucino = {
    'name': "cappucino",
    'waterPerCup': 200,
    'milkPerCup': 100,
    'beansPerCup': 12,
    'cost': 6
};

// A virtual coffee machine with various functions
let coffeeMachine = {
    'waterStock': 400,
    'milkStock': 540,
    'beanStock': 120,
    'cupStock': 9,
    'balance': 550,
    'fill': function(water, milk, beans, cups) {
        if (!isNaN(water) && !isNaN(milk) && !isNaN(beans) && !isNaN(cups)) {
            this.waterStock += water;
            this.milkStock += milk;
            this.beanStock += beans;
            this.cupStock += cups;
            return true;
        } else {
            return false;
        }
    },
    'take': function() {
        let currentBalance = this.balance;
        this.balance = 0;
        return currentBalance;
    },
    'state': function() {
        console.log("The coffee machine has:");
        console.log(this.waterStock + " ml of water");
        console.log(this.milkStock + " ml of milk");
        console.log(this.beanStock + " g of coffee beans");
        console.log(this.cupStock + " disposable cups");
        console.log("$" + this.balance + " of money");
    },
    'buy': function(drink) {
        if (drink.name == "espresso" || drink.name == "latte" || drink.name == "cappucino") {
            let stockError = false;
            if (coffeeMachine.waterStock < drink.waterPerCup) {
                console.log("Sorry, not enough water!");
                stockError = true;
            }
            if (coffeeMachine.milkStock < drink.milkPerCup) {
                console.log("Sorry, not enough milk!");
                stockError = true;
            }
            if (coffeeMachine.beanStock < drink.beansPerCup) {
                console.log("Sorry, not enough coffee beans!");
                stockError = true;
            }
            if (coffeeMachine.cupStock < 1) {
                console.log("Sorry, not enough cups!");
                stockError = true;
            }

            if (stockError == false) {
                console.log("I have enough resources, making you a coffee!");
                this.waterStock -= drink.waterPerCup;
                this.milkStock -= drink.milkPerCup;
                this.beanStock -= drink.beansPerCup;
                this.cupStock -= 1;
                this.balance += drink.cost;
            }
        }
    }
};



// The actual program
let running = true;
while (running) {
    console.log("Write action (buy, fill, take, remaining, exit): ");
    let action = input();
    if (action == "buy") {
        console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino: ");
        let drinkSelection = input();
        switch (drinkSelection) {
            case "1":
                coffeeMachine.buy(espresso);
                break;
            case "2":
                coffeeMachine.buy(latte);
                break;
            case "3":
                coffeeMachine.buy(cappucino);
                break;
            case "back":
                break;
            default:
                console.log("No such option available");
        }
    } else if (action == "fill") {
        console.log("Write how many ml of water you want to add: ");
        let waterAdded = Number(input());
        console.log("Write how many ml of milk you want to add: ");
        let milkAdded = Number(input());
        console.log("Write how many grams of coffee beans you want to add: ");
        let beansAdded = Number(input());
        console.log("Write how many disposable cups you want to add: ");
        let cupsAdded = Number(input());
        coffeeMachine.fill(waterAdded, milkAdded, beansAdded, cupsAdded);
    } else if (action == "take") {
        console.log("I gave you $" + coffeeMachine.take());
    } else if (action == "remaining") {
        console.log();
        coffeeMachine.state();
        console.log();
    } else if (action == "exit") {
        running = false;
    }
    else {
        console.log("No such action available");
    }
}