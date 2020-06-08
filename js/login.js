const passwordField = document.getElementById('password');
const emailField = document.getElementById('email');
const submitButton = document.getElementById('submit');

// error
let error = document.createElement('div');
error.setAttribute('class', 'alert alert-danger');
error.style.width = '65%';
error.style.margin = 'auto';

// success
let success = document.createElement('div');
success.setAttribute('class', 'alert alert-success');
success.style.width = '65%';
success.style.margin = 'auto';

// spinner
let spinnerDiv = document.createElement('div');
let spinner = document.createElement('div');
let spinnerSpan = document.createElement('span');
spinnerDiv.setAttribute('class', 'd-flex justify-content-center');
spinner.setAttribute('class', 'spinner-border');
spinnerSpan.setAttribute('class', 'sr-only');
spinner.appendChild(spinnerSpan);
spinnerDiv.appendChild(spinner);
spinnerDiv.style.margin = '10px 0 0 0';

// can prob do this a better way ...
submitButton.addEventListener(
	'click',
	(e) => {
		if (!validateEmail(emailField.value) && !validatePassword(passwordField.value)) {
			error.innerHTML = 'Invalid email and password. Please try again.';
			document.getElementById('header').appendChild(error);
		} else if (!validatePassword(passwordField.value) && validateEmail(emailField.value)) {
			error.innerHTML = 'Invalid password. Please try again.';
			document.getElementById('header').appendChild(error);
		} else if (validatePassword(passwordField.value) && !validateEmail(emailField.value)) {
			error.innerHTML = 'Invalid email. Please try again.';
			document.getElementById('header').appendChild(error);
		} else {
			// Check and Remove error
			if (error.innerHTML != '') {
				document.getElementById('header').removeChild(error);
			}

			// Add success and spinner
			success.innerHTML = 'Success! Redirecting...';
			let header = document.getElementById('header');
			header.appendChild(success);
			header.appendChild(spinnerDiv);

			// Redirect to simulation page after 3 seconds
			window.setTimeout(function() {
				window.location.replace('simulation.html');
			}, 3000);
		}
		e.preventDefault();
	},
	false
);

validateEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

// 8 characters and at least one number
validatePassword = (pw) => {
	return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 8;
};
