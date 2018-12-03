
    var stack = []
    $(function () {
        function update() {
            if (stack.length != 0)
                [title, num, level_1] = stack[stack.length - 1];
            else
                [title, num, level_1] = ['', '', ''];
            var target = $('.title_bar');
            target.find('.tube > span').html(title);
            target.find('.num > .int').html(num);
            target.find('.num > .level').html(level_1);
        }

        $('.pointer').on('inview', function(event, isInView) {
            var target = $(event.target);
            var h3 = target.parent();
            var top = target.offset().top;
            var offset = target.offset();
            var offsetTop = offset.top - $(document).scrollTop();
            if (isInView) {
                if (stack.length != 0 && stack[stack.length - 1][3] >= top  && offsetTop < 350) {
                    //alert('undo');
                    h3.css('z-index', 89);
                    stack.pop();
                    console.log(stack.length);
                    update();
                }
            } else {
                if (stack.length == 0 || stack[stack.length - 1][3] < top && offsetTop < 350) {
                    //alert('lets z = 0');
                    h3.css('z-index', 0);
                    var title = h3.find('.tube > span').html();
                    var num = h3.find('.num > .int').html();
                    var level_1 = h3.find('.num > .level').html();
                    stack.push([title, num, level_1, top]);
                    console.log(stack.length);
                    update();
                }
            }
        });

        function absolute(height) {
            //alert(height);
            var ratio = height / 6;
            height = 90 - height / 2.3;
            $('.theme').css({
                height: height + 'px',
                'padding-top': height + 'px',
                'background-position-y': 27 - ratio + '%',
            });
            $('.theme').find('.menu').css({
                position: 'initial',
            });
            $('.menu-shadow').css({
                height: '0px',
            });
        }
        function fixed() {
            $('.theme').css({
                height: '0px',
                'padding-top': '0px',
                'background-position-y': '27%',
            });
            $('.theme').find('.menu').css({
                position: 'fixed',
            });
            $('.menu-shadow').css({
                height: '128px',
            });
        }
        if($('.theme').css('background-image') != 'none') {
            absolute(0);
            $(window).on( "scroll", function(eve) {
                var windows_top = $(window).scrollTop();
                if(windows_top < 190 - 54 - 68)
                    absolute(windows_top);
                else
                    fixed();
            });
        } else {

        }
    });