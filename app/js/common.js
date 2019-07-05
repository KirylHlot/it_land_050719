window.onload = function() {
///////////////need carousel
	if(setDotName("carousel_custom_dots", "owl-dot", "dot_name")){

		$('.need_carousel').owlCarousel({
				loop: false,
				nav: false,
				responsiveClass: true,
				margin: 0,
				padding: 0,
				dots: false,
				center: true,
				dotsContainer: '#carousel_custom_dots',
				responsive: {
		    0: {
		      items: 1
		     }
		  }
		});

		var need_carousel=$(".need_carousel");
		need_carousel.owlCarousel();

		$(".right_arrow").click(function(){
		  need_carousel.trigger("next.owl.carousel");
		});
		$(".left_arrow").click(function(){
		  need_carousel.trigger("prev.owl.carousel");
		});

		$('.owl-dot').click(function () {
		  need_carousel.trigger('to.owl.carousel', [$(this).index(), 300]);
		});

		need_carousel.on('translate.owl.carousel', function(event) {
			addActiveClass(event.item.index, "owl-dot")
		})


	}
	

	


///////////////advantage carousel
	if(setDotName("advantages_carousel_dots", "advantage_galary_dot", "advantages_dot_name")){
		$('.advantages_carousel').owlCarousel({
				loop: false,
				nav: false,
				responsiveClass: true,
				margin: 0,
				padding: 0,
				dots: false,
				dotsContainer: '#advantages_carousel_dots',
				center: true,
				responsive: {
		    0: {
		      items: 1
		     }
		  }
		});
		var advantages_carousel=$(".advantages_carousel");
		$(".advantages_ar_right").click(function(){
		  advantages_carousel.trigger("next.owl.carousel");
		});
		$(".advantages_ar_left").click(function(){
		  advantages_carousel.trigger("prev.owl.carousel");
		});
		$('.advantage_galary_dot').click(function () {
		  advantages_carousel.trigger('to.owl.carousel', [$(this).index(), 300]);
		});

		setMaxHeightAllBlocks ("advantages_carousel_content_wrapper");

		advantages_carousel.on('translate.owl.carousel', function(event) {
			addActiveClass(event.item.index, "advantage_galary_dot")
		})
}
	
	setMaxHeightAllBlocks("price_item");
	setMaxHeightAllBlocks("portfolio_item_description");
	setMaxHeightByWrapper("portfolio_image_wrapper","portfolio_image");

}

function setDotName (idDotWrapper, dotClass, dotName) {
	let dot_name_mass = document.getElementsByClassName(dotName);
	let carousel_custom_dots = document.querySelector('#'+ idDotWrapper);

	for (var i = 0; i < dot_name_mass.length; i++) {
		let div = document.createElement('div');
		if (i==0){
			div.className = dotClass + " active";
		} else {
			div.className = dotClass;
		}
		div.innerText = dot_name_mass[i].innerText;
		carousel_custom_dots.appendChild(div);
	}
	return true;
};

function clearActiveClass (className) {
	let massElem = document.getElementsByClassName(className);

	for (var i = 0; i < massElem.length; i++) {
		massElem[i].classList.remove('active');
	};

	return true;
}

function addActiveClass(index, owlDotClass) {
	if (clearActiveClass(owlDotClass)) {
		document.getElementsByClassName(owlDotClass)[index].classList.add('active');
		return true;
	}

	return false;
};


var price_item_mass = document.getElementsByClassName('price_item');

for (var i = 0; i < price_item_mass.length; i++) {
	price_item_mass[i].addEventListener('click', function() {
		cleanActive();
		this.classList.add('active');
	});
}


function cleanActive() {
	for (var i = 0; i < price_item_mass.length; i++) {
		price_item_mass[i].classList.remove('active');
	}
}

var faq_item_mass = document.getElementsByClassName('faq_item');

for (var i = 0; i < faq_item_mass.length; i++) {

	faq_item_mass[i].addEventListener('click', function(){
		for (var i = 0; i < faq_item_mass.length; i++) {
			faq_item_mass[i].classList.remove('active');
		}

		this.classList.add('active');
	});
}

////form validate
var one_word_mass = document.getElementsByClassName('one_word');
var seven_word_mass = document.getElementsByClassName('seven_word');
var dog_word_mass = document.getElementsByClassName('dog_word');

var allInputsMass = [];

for (var i = 0; i < one_word_mass.length; i++) {
	allInputsMass.push(one_word_mass[i]);
}

for (var i = 0; i < seven_word_mass.length; i++) {
	allInputsMass.push(seven_word_mass[i]);
}

for (var i = 0; i < dog_word_mass.length; i++) {
	allInputsMass.push(dog_word_mass[i]);
}

for (var i = 0; i < allInputsMass.length; i++) {
	allInputsMass[i].addEventListener('input', function(){
		if(validateInput(this)){
			this.parentNode.classList.add('input_accept');
		} else {
			this.parentNode.classList.remove('input_accept');
		}
	});
}

function validateInput (elem){
	if(elem.classList.contains('one_word') && elem.value.length > 1){
		return true;
	}
	if(elem.classList.contains('seven_word') && elem.value.length > 6){
		return true;
	} 	
	if(elem.classList.contains('dog_word') && elem.value.length > 7 && elem.value.indexOf("@") !== -1){
		return true;
	} 
	return false;
}

function checkInputs (elem){
	let inputMass = elem.getElementsByClassName('input_wrapper');

	for (var i = 0; i < inputMass.length; i++) {
		if(!inputMass[i].classList.contains('input_accept')){
			alert('Введите корректные данные');
			return false;
		}
	}

	return true;
}


$(document).ready(function() {
   $(".header_form").submit(function() {
   	if(checkInputs(this)){
			$.ajax({
         type: "POST",
         url: "header_form_mail.php",
         data: $(this).serialize()
      }).done(function() {
         $(this).find("input").val("");
					alert('Сообщение отправлено');
      }).fail(function() {
        alert('Ошибка соединения');
      });
    }
      return false;
   });
});


/////////viewport elem

$.fn.isInViewport = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on("load resize scroll", function () {
    $('.vieving').each(function() {
        if( $(this).isInViewport() ) {
						removeСurrientPageSelector();
						setСurrientPage(this.id);
        }
    });

});

function removeСurrientPageSelector (){
	let li_elem_mass = document.getElementsByClassName('li_elem');

	for (var i = 0; i < li_elem_mass.length; i++) {
		li_elem_mass[i].classList.remove('currient_page');
	}

}

function setСurrientPage(elemId) {
	document.querySelector("." + elemId).classList.add('currient_page');
}

jQuery(document).ready(function() {
	jQuery('.who_icon').viewportChecker({
		classToAdd: 'show_img',
	  offset: 0,
	  repeat: true
	});
});