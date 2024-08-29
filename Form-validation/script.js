const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function Validator(options) {
	const selectorRules = {};

	// Handle validate
	function validate(inputElement, rule) {
        // Get rule functions of each selector
        const rules = selectorRules[rule.selector];
        let errorMessage;

        // Handle each function
        for (let i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

		const errorElement = inputElement.parentElement.querySelector(
			options.errorSelector
		);
		if (errorMessage) {
			errorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add("invalid");
		} else {
			errorElement.innerText = "";
			inputElement.parentElement.classList.remove("invalid");
		}

		return !errorMessage;
	}

	// Get form element
	const formElement = $(options.form);

	if (formElement) {
        // Handle logic of inputs
		// rules is an array of objects, each of them including selector and function
		options.rules.forEach((rule) => {
			// Save rule for each input
			if (!Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector] = [];
			}
			selectorRules[rule.selector].push(rule.test);

			const inputElement = formElement.querySelector(rule.selector);

			if (inputElement) {
				// Main feature: Handle blur event => validate
				inputElement.addEventListener("blur", () => {
					validate(inputElement, rule);
				});

				// Optimize UX: Handle type event
				inputElement.addEventListener("input", () => {
					const errorElement =
						inputElement.parentElement.querySelector(
							options.errorSelector
						);
					errorElement.innerText = "";
					inputElement.parentElement.classList.remove("invalid");
				});
			}
		});

        // Handle submit
        formElement.onsubmit = (e) => {
            e.preventDefault();

			let isFormValid = true;

			options.rules.forEach(rule => {
				const inputElement = formElement.querySelector(rule.selector);
				const isValid = validate(inputElement, rule);
				if (!isValid) isFormValid = false;
			})

			if (isFormValid) {
				if (typeof options.onSubmit === 'function') {
					const enableInputs = formElement.querySelectorAll("[name]:not([disabled])")
					const formValues = Array.from(enableInputs).reduce((values, input) => {
						return (values[input.name] = input.value) && values;
					}, {});
					console.log(formValues);
				} else {
					formElement.submit();
				}
			}
        }
	}
}

// Methods: return object including selector and function handling logic
Validator.isRequired = function (selector, message) {
	return {
		selector,
		test: function (value) {
			return value.trim()
				? undefined
				: message || "Please fill out this field";
		},
	};
};

Validator.isEmail = function (selector) {
	return {
		selector,
		test: function (value) {
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : "Please enter a valid email";
		},
	};
};

Validator.minLength = function (selector, min) {
	return {
		selector,
		test: function (value) {
			return value.length >= min
				? undefined
				: `The password must be at least ${min} characters long`;
		},
	};
};

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
	return {
		selector,
		test: function (value) {
			return value === getConfirmedValue()
				? undefined
				: message ||
						"Please ensure both passwords are identical and try again.";
		},
	};
};
