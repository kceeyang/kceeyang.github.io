// function lastItem()
// {
//     var fruits = ['Watermelon', 'Apple', 'Orange', 'Kiwi']
//     fruits.sort((a,b)=> a.localeCompare(b));
    
//     const lastAlphabetical = fruits[fruits.length-1];
//     const outputDiv = document.getElementById(output1);
//     if(!outputDiv.innerHTML)
//     {
//         outputDiv.innerHTML = `Fruits sorted: ${fruits.join(', ')}<br>Last Alphabetical Item: ${lastAlphabetical}`;
//     }
//     toggleVisibility(outputID);
// }


// function lastItem(fruits, outputID)
// {
//     fruits.sort((a,b)=> a.localeCompare(b));
//     const lastAlphabetical = fruits[fruits.length-1];
//     const outputDiv = document.getElementById(outputID);
//     outputDiv.innerHTML = `Fruits sorted: ${fruits.join(', ')}<br>Last Alphabetical Item: ${lastAlphabetical}`;
// }


// Last item function - working 
function lastItem() {
    var arrayName = ['Watermelon', 'Apple', 'Orange', 'Kiwi']
    var y = arrayName.slice();
    var selectedElement = document.getElementById("output1");
    var x = arrayName.sort();
    selectedElement.innerText = `The original array is [${y}], and I sorted it alphabetically.
    The last item of the sorted array is ${x[x.length - 1]}.`;
  }






document.getElementById('sortButton').addEventListener('click', sortItemsInput);

const responses = {};

function sortItemsInput() 
{
    while(isNaN(numItems) || numItems > 4 || numItems < 2 || !(Number.isInteger(numItems)))
    {
        // var numItems = Number(prompt('How many items would you like to enter? 2-4.'))
        var numItems = Number(prompt('How many items would you like to enter? 2-4.'))

        console.log("enter itm")
    }

    // if (numItems == null)
    // {
    //     console.log("hit canel");
    //     return;
    // }

    // var hitCancel = !(numItems != "" && numItems !== null);
    // console.log(hitCancel)



    // COLLECT INPUT FROM USER
    for (let index = 0; index < numItems; index++) 
    {
        let catInput = prompt(`Enter category ${index+1} of ${numItems}.`)
        let catItem = prompt(`Enter your ${catInput}`)
        responses[catInput] = catItem;   
    };

    
    // IF YOU WANT TO SORT BY KEY
    const responseKeys = Object.keys(responses).sort();
    for (const key of responseKeys) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `Your ${key.toLowerCase()} is ${responses[key]}`
        document.getElementById('displayOutput').appendChild(newDiv)
    }

};
