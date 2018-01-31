
//--------------------FINISHED-----------------------------------------
// Сократить URL
// Внести PostNum и PageCount в класс в объект paginate
// Refresh без кнопки
// Сделать список отображаемых страниц
// Рендерить список отображаемых страниц
// Рендер select на postnum
//--------------------WIP----------------------------------------------
// Фильтр по органзациям
// ----------------------
//
// Рендерить навигацию
//---------------------------------------------------------------------

// Параметры № 2,3,4

var url = "http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/0/0/0/0/-1/0/0/";

// http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/03/05/01/0/-1/0/0/1/15
// http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/03/05/01/0/-1/0/0/0/15
function Grid(options) {
    this.options = options || {};
    this.total = 0;
    this.data = [];

    // PageNum - current page number
    // PostNum - current number of displayed posts
    this.pageNum = this.options.paginate.pageNum;
    this.postNum = this.options.paginate.postNum;

    this.renderFilter = function () {
        var $filterDiv = $(document.createElement('div')),
            $el = this.options.$el,
            $select_1 = $(document.createElement('select')),
            $select_2 = $(document.createElement('select')),
            $select_3 = $(document.createElement('select')),
            $btnReftresh = $(document.createElement('button')),
            $btnReset = $(document.createElement('button')),
            digits = [];

        $btnReftresh.text('Фильтровать');
        $btnReset.text('Сбросить фильтр');
        $filterDiv.attr('class', 'filterdiv');

        for ( var i = 1; i < 21; i++) {
            var digit = '0';
            if (i < 10) {
                digit += i;
            } else {
                digit = i;
            }
            digits.push(String(digit))
        }

        for ( var i = 0; i < digits.length; i++) {
            var $option1 = $(document.createElement('option'));
            var $option2 = $(document.createElement('option'));
            var $option3 = $(document.createElement('option'));

            $option1.attr('value', digits[i]);
            $option1.text(digits[i]);
            $option1.appendTo($select_1);

            $option2.attr('value', digits[i]);
            $option2.text(digits[i]);
            $option2.appendTo($select_2 );

            $option3.attr('value', digits[i]);
            $option3.text(digits[i]);
            $option3.appendTo($select_3);
        }

        $el.append($filterDiv);
        $select_1.appendTo($filterDiv);
        $select_2.appendTo($filterDiv);
        $select_3.appendTo($filterDiv);
        $btnReftresh.appendTo($filterDiv);
        $btnReset.appendTo($filterDiv);

        var self = this;

        $btnReftresh.click(function (event) {
            var val_1 = $select_1["0"].value,
                val_2 = $select_2["0"].value,
                val_3 = $select_3["0"].value;

            var workUrl = self.options.url;

            workUrl = workUrl.split('/');

            // Необходим 7,8,9 индекс в юрл

            workUrl[7] = val_1;
            workUrl[8] = val_2;
            workUrl[9] = val_3;

            self.options.url = workUrl.join('/');

            self.refresh();
        });

        $btnReset.click(function (event) {
            var defStr = self.options.url;
            defStr = defStr.split('/');

            defStr[7] = 0;
            defStr[8] = 0;
            defStr[9] = 0;

            self.options.url = defStr.join('/');
            self.refresh();
        });

    };

    this.render = function () {
        this.options.$el.html('');

        // Рендер заголовков

        var $table = $(document.createElement('table'));
        $table.addClass('table');
        var $thead = $(document.createElement('thead'));
        var $tr = $(document.createElement('tr'));

        for(var i = 0; i < this.options.columns.length; i++) {
            var $th = $(document.createElement('th'));
            $th.text(this.options.columns[i].name);
            $th.appendTo($tr);
        }
        $tr.appendTo($thead);

        // Рендер содержимого

        var $tbody = $(document.createElement('tbody'));

        for(var j = 0; j < this.data.length; j++) {
            var $tr = $(document.createElement('tr'));
            for(var i = 0; i < this.options.columns.length; i++) {
                var $td = $(document.createElement('td'));
                $td.text(this.data[j][this.options.columns[i].prop]);
                $td.appendTo($tr);
            }
            $tr.appendTo($tbody);
        }

        // Рендер навигации

        $thead.appendTo($table);
        $tbody.appendTo($table);
        $table.appendTo(this.options.$el);
    };
    this.renderNav = function () {
        var self = this,
            $iconLeft = $(document.createElement('i')),
            $iconRight = $(document.createElement('i')),
            $moveLeft = $(document.createElement('a')),
            $moveRight = $(document.createElement('a')),
            $p = $(document.createElement('p')),
            $visiblePosts = $(document.createElement('div')),
            $selectPosts = $(document.createElement('select')),
            $navDiv = $(document.createElement('div')),
            $paginateDiv = $(document.createElement('div'));

        $visiblePosts.attr('class', 'postVisible');
        $selectPosts.attr('id', 'postNum');
        $selectPosts.attr('name', 'postVis');
        $p.text('Записей на странице: ');

        // Create Left/right navigation buttons
        $navDiv.attr('class', 'container bottom-nav');
        $paginateDiv.attr('class', 'pagination');
        $iconLeft.attr('class', 'fas fa-arrow-circle-left');
        $iconRight.attr('class', 'fas fa-arrow-circle-right');

        // Set attributes to left/right navigations
        $moveLeft.attr('class', 'pages');
        $moveLeft.attr('href', '#');
        $moveLeft.attr('id', 'prev');
        $moveRight.attr('id', 'forv');
        $moveRight.attr('class', 'pages');
        $moveRight.attr('href', '#');

        // Render elements of navigation menu
        $moveLeft.appendTo($paginateDiv);
        for ( var i = 0; i < this.pageList.length; i++) {
            var $a = $(document.createElement('a'));
            $a.attr('href', '#');
            $a.attr('class', 'pages');
            $a.attr('id', this.pageList[i]);
            $a.text(this.pageList[i]);
            $a.appendTo($paginateDiv);
        }
        $moveRight.appendTo($paginateDiv);
        $paginateDiv.appendTo($navDiv);
        $navDiv.appendTo(this.options.$el);
        $iconLeft.appendTo($moveLeft);
        $iconRight.appendTo($moveRight);

        // Render select area
        $p.appendTo($visiblePosts);
        $visiblePosts.appendTo($navDiv);

        for ( var i = 0; i < 5; i++) {
            var num = ["", 5, 15, 30, 50, 100];
            var $option = $(document.createElement('option'));
            $option.attr('value', num[i]);
            $option.text(num[i]);
            $option.appendTo($selectPosts)
        }

        $selectPosts.appendTo($visiblePosts);

    };

    // This function makes 'smart' pagination
    this.testpg = function(c, m) {
            var delta = 2,
                range = [],
                rangeWithDots = [],
                l;

            range.push(1);
            for (var i = c - delta; i <= c + delta; i++) {
                if (i < m && i > 1) {
                    range.push(i);
                }
            }
            if (m != 1) range.push(m);

            for (var i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }

            return rangeWithDots;
        };

    this.refresh = function () {
        var self = this;
        $.get(this.options.url + this.pageNum + "/" + this.postNum)
            .then(function (result) {

                // console.log(self.options.url + self.pageNum + "/" + self.postNum);

                self.total = result.total;
                self.data = result.defects;
                self.render();

                var pageTotal = Math.ceil(self.total / self.postNum);
                self.pageList = self.testpg(self.pageNum, pageTotal);

                self.renderFilter();
                self.renderNav();
                self.pageSet();
                self.postsCount();

            });
    };
    this.refresh();

    // Set current page
    this.pageSet = function () {
        var self = this;
        var elemId;

        this.options.$el.find('.pages').click(function (e) {
            if ($(e.currentTarget).attr('id')) {
                elemId = $(e.currentTarget).attr('id');
                if (elemId === "prev") {
                    self.pageNum--;
                    self.refresh();

                } else if (elemId === "forv") {
                    console.log(event.eventPhase);
                    self.pageNum++;
                    self.refresh();

                } else {
                    self.pageNum = Number(elemId);
                    self.refresh();
                }
            }
        })
    };

    // Set current number of displayed posts
    this.postsCount = function () {
        var selector = document.getElementById("postNum");
        var self = this;
        selector.onchange = function (ev) {
            self.postNum = Number(selector.options[selector.selectedIndex].value);
            self.refresh()
        };
    };
}

var grid = new Grid({
    url: url,
    $el: $('#grid'),
    paginate: {
        pageNum: 0,
        postNum: 15
    },
    columns: [
        {
            name: 'Орг 1',
            prop: 'org1Description'
        },
        {
            name: 'Орг 2',
            prop: 'org2Description'
        },
        {
            name: 'Орг 3',
            prop: 'org3Description'
        },
        {
            name: 'Причина поломки',
            prop: 'developmentReason'
        },
        {
            name: 'Описание ЕО',
            prop: 'itemDescription'
        },
        {
            name: 'Описание причины',
            prop: 'reasonDescription'
        }
    ]
});