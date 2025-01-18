function goBack() {
    window.history.back(); // Quay lại trang trước đó
}
function widgetCarousel()
{

    /*  testimonial one function by = owl.carousel.js */
    jQuery('.widget-carousel').owlCarousel({
        loop:false,
        margin:30,
        nav:true,
        autoplaySpeed: 3000,
        navSpeed: 3000,
        paginationSpeed: 3000,
        slideSpeed: 3000,
        smartSpeed: 3000,
        autoplay: false,
        dots: false,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            
            480:{
                items:2
            },			
            
            1200:{
                items:3
            },
            1750:{
                items:4
            }
        }
    })
}
function carouselReview(){
    /*  testimonial one function by = owl.carousel.js */
    jQuery('.testimonial-one').owlCarousel({
        loop:true,
        autoplay:true,
        margin:0,
        nav:false,
        dots: false,
        navText: [''],
        responsive:{
            0:{
                items:1
            },
            
            480:{
                items:1
            },			
            
            767:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })		
    /*Custom Navigation work*/
    jQuery('#next-slide').on('click', function(){
       $('.testimonial-one').trigger('next.owl.carousel');
    });

    jQuery('#prev-slide').on('click', function(){
       $('.testimonial-one').trigger('prev.owl.carousel');
    });
    /*Custom Navigation work*/
}

jQuery(window).on('load',function(){
    setTimeout(function(){
        widgetCarousel();
        carouselReview();
    }, 1000); 
});