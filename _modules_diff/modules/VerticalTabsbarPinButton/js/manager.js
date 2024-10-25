'use strict';
const $ = require('jquery')

module.exports = function () {
  return {
    start: function () {
      setTimeout(function () {
        const tabsbar = $('.screens > .tabsbar');
        const tabsbarContent = $('.screens > .tabsbar > .content');

        if (tabsbarContent.length === 0 || tabsbar.length === 0) {
          console.error('Could not find elements tabsbar or tabsbar content');
          return;
        }

        function updateTabsbarClass() {
          const isExpanded = localStorage.getItem('aurora_tabsbar_expanded') === 'true';
          tabsbar.toggleClass('tabsbar--pinned', isExpanded);
        }

        if (localStorage.getItem('aurora_tabsbar_expanded') === null) {
          localStorage.setItem('aurora_tabsbar_expanded', 'false');
        }

        updateTabsbarClass();

        const newEl = $('<div>', { class: 'pin-menu' });
        newEl.on('click', function () {
          const currentState = localStorage.getItem('aurora_tabsbar_expanded') === 'true';
          localStorage.setItem('aurora_tabsbar_expanded', !currentState);
          updateTabsbarClass();
        });
        tabsbarContent.append(newEl);


        $('.tabsbar').on('mouseenter', function () {
            if (!$(this).hasClass('tabsbar--pinned')) {
                $(this).addClass('tabsbar--expanded');
            }
        })
        .on('mouseleave', function() {
            if (!$(this).hasClass('tabsbar--pinned')) {
                $(this).removeClass('tabsbar--expanded');
            }
        });

        $('.tabsbar .item.usermenu, .tabsbar .item.new_button_panel').on('mouseenter', function (e) {
            e.stopPropagation();
        })
      }, 0);
    },
  };
};