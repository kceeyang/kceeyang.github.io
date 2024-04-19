function checkTriviaAnswer()
{
    const answer = document.getElementById("trivia-answer").value.trim()
    const responseElement = document.getElementById("trivia-response");
    const correctAnswer = "Paris";

    if(answer.toLowerCase() === correctAnswer.toLowerCase())
    {
        responseElement.textContent = `Correct! You gussed: ${answer}`;
    }
    else
    {
        responseElement.textContent = `Incorrect! You gussed: ${answer}`;
    }
}

function checkNumber()
{
    const numberInput = document.getElementById("number-input").value;
    const num = parseInt(numberInput);
    if(!isNaN(num) && num>= 10000 && num <= 99999)
    {
        const isEven = num % 2 === 0;
        document.getElementById("number-response").innerText = `The number ${num} is ${isEven ? "even" : "odd"}.`;
    }
    else
    {
        document.getElementById("number-response").innerText = "Please enter a valid 5-digit number.";
    }
}




// document.addEventListener('DOMContentLoaded', () => {

//     const triviaInput = document.getElementById("trivia-submit");
//     triviaInput.addEventListener("keypress", function(event){
//         if (event.key === "Enter")
//         {
//             event.preventDefault();
//             checkTriviaAnswer();
//         }   
//     });
//     const numberInput = document.getElementById("numberCheck");
//     numberInput.addEventListener("keypress", function(event){
//         if (event.key === "Return")
//         {
//             event.preventDefault();
//             checkNumber();
//         }   
//     });

// });

