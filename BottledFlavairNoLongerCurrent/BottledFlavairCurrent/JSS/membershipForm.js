// JavaScript Document
//This defines email format, requiring that at least 1 non-@ character precedes and follows the @ symbol, and at least two follow the required period.
var emailForm =/^([^@]+([^@])*)@([^@]+(\.[^@]+)*).([^@]+[^@]+(\.[^@]+)*)$/;
//This defines phone format, just including numeric characters and dashes, in any order.
var phoneForm = /^[0123456789-]*$/;
//This checks to make sure some alphabetic character appears.
var hasLetter = /[a-zA-Z]/;
//This checks to make sure some numeric character appears.
var hasNumber = /[0-9]/;

//The function below defines new listeners which will check for empty fields using the checkEmpty function on submission, as well as additional validation by specific field.
function newListeners()
{
	var mainForm = document.getElementById("FullForm");
	window.addEventListener("change", capitalize);
    mainForm.addEventListener("submit", checkEmpty);
	mainForm.addEventListener("submit", checkEmail);
	mainForm.addEventListener("submit", checkPass);
	mainForm.addEventListener("submit", checkPhone);
	mainForm.addEventListener("submit", checkRadio);
	mainForm.addEventListener("submit", finalCheck);
}

//This adds one more listener, making sure that only after content is loaded can each function be called.
window.addEventListener("DOMContentLoaded", newListeners);
//This defines a new function to set the background of active form input areas.
function setBackground(prompt)
{
	//If in focus, a new yellow color is chosen as the background.
	if(prompt.type == "focus")
		{
			prompt.target.style.backgroundColor = "#f5f3ce";
		}
	//If out of focus, the background is reset to white.
	else if(prompt.type == "blur")
		{
			prompt.target.style.backgroundColor = "white";
		}
}

//When loaded, the function below is called. This consistently checks input fields to bring them in and out of focus and call the setBackground function above as needed.
window.addEventListener("load", function (i)
{
	//selections is specified to include all text input fields, and fields is specified as all of those from our document.
	var selections = "input[type=text], input[type=password]";
	var fields = document.querySelectorAll(selections);
	//Fields is cycled through to add new event listeners to blur or focus the forms as needed. This brings attention to forms in use.
	for(i = 0; i < fields.length; i++)
	{
		fields[i].addEventListener("focus", setBackground);
		fields[i].addEventListener("blur", setBackground);
	}
});
//The checkEmpty function below acts on submission, as specified earlier, and checks to make sure input fields are not empty, also calling the appropriate functions to validate input on more specific forms at the end. If an error is encountered, the form will not be submitted.
function checkEmpty()
{
	//The errorArea variable is specified as the element with the id "errors", which appears just above the submit and reset buttons. fnameError and lnameError are similar, but are specific to the first and last name fields, and appear beneath their input fields instead.
	var errorArea = document.getElementById("errors");
	var fnameError = document.getElementById("fnameError");
	var lnameError = document.getElementById("lnameError");
	//All error spots are hidden on function start, since it is assumed error free until one is found in the following search.
    errorArea.className = "hidden";
	fnameError.className = "hidden";
	lnameError.className = "hidden";
	//The fname, lname, and email fields will return an error if found to be empty. As such, these three input fields are selected first.
	var textField = "input[id=fname],input[id=lname],input[id=email]";
	var fields = document.querySelectorAll(textField);
	//This is doing base empty field checking by cycling through the defined fields array.
	for(var i = 0; i < fields.length;i++)
	{
		//This checks if the current value is empty/null.
		if(fields[i].value == null || fields[i].value == "")
		{
			//This restyles the input box background to a pale red, indicating an error was found.
			fields[i].style.backgroundColor = "#ebb2b6";
			//This prevents form submission.
			//The new error message is set.
			var msg = "Please ensure that all marked fields contain valid data for the prompt given.";
			//These two if statements determine if the fname or lname field should display an error message, depending on which is empty. The email field has a more specific error message to be shown later. The sections are set to visible to present to the user.
			if(fields[i].id == "fname")
			{
				fnameError.className = "visible";
			}
			if(fields[i].id == "lname")
			{
				lnameError.className = "visible";
			}
			//The errorArea section has text adjusted and is made visible.
			errorArea.innerHTML = "<p>" + msg + "</p>";
			errorArea.className = "visible";
		}
	}
}
//This capitalize function is called when a value is changed, and serves to capitalize the first letters of the first and last name fields.
function capitalize()
{
	//As such, we only select these two fields.
	var selections = "input[id=fname], input[id=lname]";
	var fields = document.querySelectorAll(selections);
	//If not empty, we cycle through the fields array.
	if(fields != null)
	{
		//The full array is cycled through.
		for(var i = 0; i <fields.length; i++)
		{
			//The var string is set to the basic value for some input adjustment. If not empty, only the first character is capitalized, with the rest staying lowercase. Then, the adjusted value is set as the new text box value.
			var string = fields[i].value;
			if(string != "")
			{
				string = string[0].toUpperCase() + string.slice(1).toLowerCase(); 
				fields[i].value = string;
			}
			
		}
	}
}

//Next is the checkEmail function, which will use the previous emailForm regular expression to check that all input is valid for the email field.
function checkEmail()
{
	var errorArea = document.getElementById("errors");
	var msg = "Please ensure that all marked fields contain valid data for the prompt given.";
	//So, we set the emailError field below the email text box to hidden at first.
	
	var error = document.getElementById('emailError');
	error.className = "hidden";
	//We then grab the actual content within the email text box.
	var email = document.getElementById('email');
	//We now text it against its valid input format, as shown below. If it does not meet criteria, its background color is set to the light-red error color, the document may not be submitted, and the error message is user-visible.
	if(!emailForm.test(email.value))
	{
		email.style.backgroundColor = "#ebb2b6";
		error.className = "visible";
		
		errorArea.innerHTML = "<p>" + msg + "</p>";
	}
}

//Next, the phone number is checked. We similarly want to use the phoneForm regular expression to test that the phone number is valid.
function checkPhone()
{
	var errorArea = document.getElementById("errors");
	var msg = "Please ensure that all marked fields contain valid data for the prompt given.";
	
	//First, the phoneError section is located and hidden from the user.
	var error = document.getElementById('phoneError');
	error.className = "hidden";
	//Next, we grab the actual phone input field to get its current data.
	var phone = document.getElementById('phone');
	//Finally, we test the value contained against the valid input format in phoneForm. If it fails, its background color is set to light-red, the document may not submit, and the error screen is visible to the user.
	if(!phoneForm.test(phone.value))
	{
		phone.style.backgroundColor = "#ebb2b6";
		error.className = "visible";
		errorArea.innerHTML = msg;
	}
}
//This function checks the password.
function checkPass()
{
	//To begin, we hide the passError section, as well as the main error section.
	var errorArea = document.getElementById("errors");
	var msg = "Please ensure that all marked fields contain valid data for the prompt given.";
	
	var error = document.getElementById('passError');
	error.className = "hidden";
	var password = document.getElementById('password');
	//Now, we check to make sure all criteria are met for the password. If it doesnt meet it, the color is changed to error color, and the error field is shown.
	if(!(password.value.length >=6 && password.value.length <= 9) || !hasLetter.test(password.value) || !hasNumber.test(password.value))
	{
		password.style.backgroundColor = "#ebb2b6";
		error.className = "visible";
		
		errorArea.innerHTML = "<p>" + msg + "</p>";
	}
}
//This function checks to ensure that a radio button is selected out of the form. 
function checkRadio()
{
	var errorArea = document.getElementById("errors");
	var msg = "Please ensure that all marked fields contain valid data for the prompt given.";
	
	var error = document.getElementById('radioError');
	error.className = "hidden";
	//This checks to ensure that, prior to displaying an error message, it is ensured that all radio buttons are unpressed.
	if(!document.getElementById("pro").checked && !document.getElementById("premier").checked && !document.getElementById("base").checked)
	{
		error.className = "visible";
		errorArea.innerHTML = "<p>" + msg + "</p>";
	}
}
//Checks to ensure all error fields are inactive, and thus, no errors occurred.
function finalCheck(doc)
{
	var emptyError = document.getElementById('errors');
	var emailError = document.getElementById('emailError');
	var radioError = document.getElementById('radioError');
	var passError = document.getElementById('passError');
	var fnameError = document.getElementById('fnameError');
	var lnameError = document.getElementById('lnameError');
	var phoneError = document.getElementById('phoneError');
	
	//If all error fields are hidden, no errors rose in the form input.
	if(!(emailError.className == "hidden" && radioError.className == "hidden" && passError.className == "hidden" && emptyError.className == "hidden" && fnameError.className == "hidden" && lnameError.className == "hidden" && phoneError.className == "hidden"))
	{
		//The document prevents final submission if so.
		doc.preventDefault();
	}
	else
	{
		//Otherwise, a message is displayed to indicate that submission occured, and default submission is prevented to let this message be seen by users.
		var final = document.getElementById('Final');
		if(final.className == "hidden")
		{
			final.classList.toggle('hidden');
		}
		doc.preventDefault();
	}
}