/*스크롤*/
var scrollableElement = document.body; //document.getElementById('scrollableElement');
scrollableElement.addEventListener("wheel", checkScrollDetection);

function checkScrollDetection(event) {
	document.querySelector("section").appendChild(document.querySelector("#one-cycle").innerHTML);
}

/*카테고리 불러오기*/
async function get_category() {
	var requestOptions = {
		method: "GET",
		redirect: "follow",
		origin: "http://127.0.0.1:5500",
	};
	let categories_info = await (await fetch("https://www.myeongchon.shop/hotels/categories", requestOptions)).json();
	const categories = document.querySelectorAll("#nav-menu>.menu-item");
	for (let i = 0; i < categories_info["result"].length; i++) {
		categories[i].querySelector("img").setAttribute("src", categories_info["result"][i]["categoryImg"]);
		categories[i].querySelector(".menu-item-text").textContent = categories_info["result"][i]["categoryName"];
	}
}
get_category();

/*카테고리 글 불러오기*/
let all_articles = undefined;
async function get_category_article(category_idx, get_idx) {
	var requestOptions = {
		method: "GET",
		redirect: "follow",
		origin: "http://127.0.0.1:5500",
	};
	const article_infos = await (await fetch(`https://www.myeongchon.shop/hotels/category/${category_idx}`, requestOptions)).json();
	all_articles = article_infos;
	const articles = document.querySelectorAll("section>article");
	getNum = get_idx + 50;
	for (let i = get_idx; i < getNum; i++) {
		const article_info = article_infos["result"][i];
		console.log(article_info);
		if (article_info == undefined) {
			articles[i].querySelector("img").setAttribute("src", "https://via.placeholder.com/300/?text=noData.png");
		} else {
			articles[i].querySelector("img").setAttribute("src", article_info["hotelInstructionImgs"][1]);
			const info = articles[i].querySelector("div.article-content");
			info.querySelector(".content-first>.content-destination").textContent = article_info["region"];
			info.querySelectorAll(".content-info")[0].textContent = article_info["distance"];
			info.querySelectorAll(".content-info")[1].textContent = article_info["baseDate"];
			info.querySelector(".content-price").textContent = article_info["fee"];
			info.querySelector(".content-score>span").textContent = article_info["avgGrade"];
		}
	}
}
get_category_article(1, 0);

/*네비게이션 바 버튼*/
let nav_btn = document.querySelectorAll("#nav-search_bar > .nav-button");
nav_btn.forEach((element, index) => {
	element.addEventListener("click", function () {
		click_nav_btn(index);
	});
});
function click_nav_btn(index) {
	const nav_click_background = document.querySelector("#nav-search_bar-click");
	nav_click_background.style.display = "block";
	const nav_click_menu = document.querySelector("#nav-search_bar-click-menu");
	nav_click_menu.style.display = "block";
	nav_click_menu.animate({ height: "16rem" }, 200);
	const clicked_button = document.querySelector(`#nav-bottom-click>div>button.nav-bottom-menu:nth-of-type(${index + 1})`);
	clicked_button.style.background = "white";
	clicked_button.style.boxShadow = "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)";
	setTimeout(() => {
		const element = document.querySelector("#nav-search_bar-click-menu");
		element.style.height = "16rem";
	}, 200);

	document.querySelector("#nav-search_bar-click").addEventListener("click", function () {
		document.querySelector("#nav-search_bar-click").style.display = "none";
		const element = document.querySelector("#nav-search_bar-click-menu");
		element.style.height = "8rem";
		element.style.display = "none";
		clicked_button.style.background = "inherit";
		clicked_button.style.boxShadow = "none";
	});
	console.log(index);
}

/*네비게이션 메뉴 버튼*/
let nav_menu = document.querySelectorAll("#nav-menu>div.menu-item");
nav_menu.forEach((element, index) => {
	element.addEventListener("click", function () {
		click_nav_menu(index);
	});
	click_nav_menu(index);
});

function click_nav_menu(index) {
	get_category_article(index + 1, 0);
}

/*article 글 이미지 변경 버튼*/
let next_button = document.querySelectorAll("article > .next_image_btn");
next_button.forEach((element, index) => {
	element.addEventListener("click", function () {
		let idx = 0;
		if (all_articles["result"][index]["imageIdx"] == undefined) {
			all_articles["result"][index].imageIdx = 0;
			console.log(all_articles["result"][index]["hotelInstructionImgs"].length);
		} else {
			idx = all_articles["result"][index]["imageIdx"];
		}
		all_articles["result"][index]["imageIdx"] = (idx + 1) % all_articles["result"][index]["hotelInstructionImgs"].length;
		console.log(all_articles["result"][index]["imageIdx"]);
		document.querySelector(`article:nth-of-type(${index + 1}) > img`).setAttribute("src", all_articles["result"][index]["hotelInstructionImgs"][idx]);
	});
});
let prev_button = document.querySelectorAll("article > .pre_image_btn");
prev_button.forEach((element, index) => {
	element.addEventListener("click", function () {
		let idx = 3;
		if (all_articles["result"][index]["imageIdx"] == undefined) {
			all_articles["result"][index].imageIdx = 3;
		} else {
			idx = all_articles["result"][index]["imageIdx"];
		}
		all_articles["result"][index]["imageIdx"] = (idx + 3) % all_articles["result"][index]["hotelInstructionImgs"].length;
		console.log(all_articles["result"][index]["imageIdx"]);
		document.querySelector(`article:nth-of-type(${index + 1}) > img`).setAttribute("src", all_articles["result"][index]["hotelInstructionImgs"][idx]);
	});
});
