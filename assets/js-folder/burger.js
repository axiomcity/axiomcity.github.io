wdocument.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".navbar-burger").forEach((burger) => {
		burger.addEventListener("click", () => {
			let target = document.querySelector(burger.dataset.target);
			burger.classList.toggle("is-active");
			target.classList.toggle("is-active");
		});
	});

	document.querySelectorAll(".tabs").forEach((tabset) => {
		let target = document.querySelector(tabset.dataset.target);
		let tabs = tabset.querySelectorAll(".tab");
		let contents = target.querySelectorAll(".tab-content");
		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				tabs.forEach((tab2) => {
					if (tab2 == tab) tab2.classList.add("is-active");
					else tab2.classList.remove("is-active");
				});

				contents.forEach((content) => {
					if (content.dataset.tab == tab.dataset.tab)
						content.classList.remove("is-hidden");
					else content.classList.add("is-hidden");
				});
			});
		});
	});
