function welcome() {
    console.log("welcome to this function.");
}

function getLost()
{
    console.log("get Lost from here");
}

function getchoice(choice)
{
    choice();
}


getchoice(welcome);
getchoice(getLost);
