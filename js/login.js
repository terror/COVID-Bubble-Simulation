let passwordField = document.getElementById('password');
let emailField = document.getElementById('email');
let submitButton = document.getElementById('submit');

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

// can prob do this a better way ...
submitButton.addEventListener(
	'click',
	function(e) {
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
			if (error.innerHTML != "")
				document.getElementById('header').removeChild(error);
			success.innerHTML = 'Success! Redirecting...';
			document.getElementById('header').appendChild(success);

			// Redirect to simulation page after 3 seconds
			window.setTimeout(function() {
				window.location.replace('simulation.html');
			}, 3000);
		}
		e.preventDefault();
	},
	false
);

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

// 8 characters and at least one number
function validatePassword(pw) {
	return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 8;
}
