$(document).ready(function () {
    $('.item.new_button_panel').on('mouseenter', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const parentElement = $(this).parent();
        parentElement.css({
            'width': '100%', 
            'background': 'unset',  
        });

        parentElement.find('.item.emails > .link > .text').css('display', 'none');
        parentElement.find('.item.contacts > .link > .text').css('display', 'none');
        parentElement.find('.item.calendar > .link > .text').css('display', 'none');
        parentElement.find('.item.files > .link > .text').css('display', 'none');
        parentElement.find('.item.tasks > .link > .text').css('display', 'none');
        parentElement.find('.item.notes > .link > .text').css('display', 'none');
    })


    $('.item.new_button_panel').on('mouseleave', function (e) {
        const parentElement = $(this).parent();

        parentElement.css({
            'width': '', 
            'background': '',  
        })
        
        parentElement.find('.item > .link > .text').css('display', '');
    });
})