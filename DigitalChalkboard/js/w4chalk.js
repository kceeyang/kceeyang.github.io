
document.getElementById("button1").addEventListener("click", greeting);

function greeting(){
    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if(hour > 5 && hour < 12)
    {
        greeting = "Good morning";
    }
    else if (hour >=12 && hour < 16)
    {
        greeting = "Good day";
    }
    else
    {
        greeting = "Good evening";
    }

    alert(greeting);
}


document.getElementById("button2").addEventListener("click", changeButton);

function changeButton()
{
    let button = document.getElementById("button2");
    console.log("Before change:", button.textContent, button.className);

    button.textContent = "Done";
    button.className = "btn btn-success";

    console.log("After change:", button.textContent, button.className);

}

