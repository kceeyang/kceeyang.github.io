function howdy() {
  var firstName = prompt("Hello. What is your first name?");
  alert("Howdy " + firstName + "!");
}


//Simple for loop.
function simpleFor() {
  for (let i = 0; i < 5; i++) {
    console.log("The number is "+i)
  }
}

function letScope() {
  let x = 1;
  if(x===1){
    let x = 2;
    console.log("inside x = "+x);
  };
  console.log("outside x = "+x);
};

function parentFunction()
{
  let a = 1;
  function childFunction()
  {
    var b = a + 2;
    return b;
  }
  return childFunction();
}




///////////////////////
//in class demo on scope(); and one additional function. 

//If you want to run these functions, 
//you can simply paste them into your console then invoke them by name in the console 
//to see the output.

function letScope() {
  let x = 1;
  if(x===1){
  let x = 2;
  console.log("inside x = " + x);
  };
  console.log("outside x = " + x);
 };
 // inside x in the if block updates to 2
 // outside x in the letScope block stays 1
 


 function varScope(){
  var x = 1;
  if(x===1){
  var x = 2;
  console.log("inside x = " + x);
  };
  console.log("outside x = " + x);
 }
 // inside x in if block updates to 2
 // outside x also updates to 2 because var is not block scoped
 // let is block scoped, var is function scoped (or global scoped)
 // change var to let in the if block
 


 function parentFunction()
 {
  let a = 1;
  function childFunction()
  {
  var b = a + 2;
  console.log("Inner child function: "+b);
  }
  console.log("Invoking the childFuntion in the outer scope: " + childFunction()) ;
  // What happens if I invoke the parentFunction() here.
 }
 
 /*
 The childFunction() is defined within the scope of the parentFunction(), so it is not directly accessible outside of the parentFunction().
 */