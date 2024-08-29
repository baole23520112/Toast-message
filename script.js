const toast = function ({
	title = "",
	message = "",
	type = "warning",
	duration = 3000,
}) {
	const main = document.getElementById("toast");
	if (main) {
		const toast = document.createElement("div");

		main.appendChild(toast);
		const autoRemoveId = setTimeout(() => {
			main.removeChild(toast);
		}, duration + 1000);

		toast.onclick = (e) => {
			if (e.target.closest(".toast__close")) {
				main.removeChild(toast);
                clearTimeout(autoRemoveId);
			}
		};
		const delay = duration / 1000;
		toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
		const icons = {
			success: "fa-regular fa-circle-check",
			warning: "fa-solid fa-triangle-exclamation",
			error: "fa-solid fa-bug",
		};
		const icon = icons[type];
		toast.classList.add("toast", `toast__${type}`);
		toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">
                    ${message}
                </p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
	}
};

document.querySelector(".btn__success").onclick = () => {
	toast({
		title: "Success",
		message: "This is a success message.",
		type: "success",
		duration: 3000,
	});
};
document.querySelector(".btn__warning").onclick = () => {
	toast({
		title: "Warning",
		message: "This is a warning message.",
		type: "warning",
		duration: 3000,
	});
};
document.querySelector(".btn__error").onclick = () => {
	toast({
		title: "Error",
		message: "This is a error message.",
		type: "error",
		duration: 3000,
	});
};
