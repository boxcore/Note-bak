var $$ = function (id) {
			return document.getElementById(id);
		}

		var getByClass = function (parent, className) {
			var aEle = parent.getElementsByTagName("*");
			var re = new RegExp("\\b"+className+"\\b", "i" );
			var arr = [];
			for (var i = 0; i < aEle.length; i++) {
				if (re.test(aEle[i].className)) {
					arr.push(aEle[i]);
				}
			}
			return arr;
		}

		var zIndex = 2;
		var timer = null;

		var slide = function () {
			var oSlide = $$("slideBox");
			var aSlides = getByClass(oSlide, "slide");
			var aBtns = getByClass(oSlide, "btns")[0].getElementsByTagName("li");

			for (var i = 0; i < aBtns.length; i++) {
				aBtns[i].index = i;
				aBtns[i].onmouseover = function () {
					clearInterval(timer);
					for (var j = 0; j < aSlides.length; j++) {
						aSlides[j].style.zIndex = 0 ;
						aBtns[j].className = "";
					}
					aSlides[this.index].style.zIndex = zIndex++ ;
					this.className = "current";
				}
				aBtns[i].onmouseout = function () {
					autoSlide(this.index);
				}
			}
		}
		
		var autoSlide = function (iPara) {
			var oSlide = $$("slideBox");
			var aSlides = getByClass(oSlide, "slide");
			var aBtns = getByClass(oSlide, "btns")[0].getElementsByTagName("li");
			var iPara = iPara || 0;
			timer = setInterval(function () {
				if (iPara >= aBtns.length) {
					iPara = 0;
				}
				for (var i = 0, j = 0; i < aBtns.length, j < aSlides.length; i++, j++) {
					aBtns[i].className = "";
					aSlides[j].style.zIndex = 0;
				}
				aBtns[iPara].className = "current";
				aSlides[iPara].style.zIndex = zIndex++;
				iPara++;
			}, 500);
		}

		onload = function () {
			slide();
			autoSlide();
		}