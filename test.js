
//--------------------FINISHED-----------------------------------------
// Сократить URL
// Внести PostNum и PageCount в класс в объект paginate
// Refresh без кнопки
// Сделать список отображаемых страниц

//--------------------WIP----------------------------------------------
// 1. Рендерить список отображаемых страниц
// ----------------------
//
// Переделать пагинацию
// Ловить текущую страницу
// Рендерить навигацию
//---------------------------------------------------------------------

var url = "http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/0/0/0/0/-1/0/0/";

function Grid(options) {
    this.options = options || {};
    this.total = 0;
    this.data = [];

    this.pageNum = this.options.paginate.pageNum;
    this.postNum = this.options.paginate.postNum;


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
        var self = this;

        var pageTotal = this.pageList;

        var $navDiv = $(document.createElement('div'));
        $navDiv.addClass('container bottom-nav');
        var $paginateDiv = $(document.createElement('div'));
        $paginateDiv.addClass('pagination');

        console.log(pageTotal)

    };

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
        $.get(this.options.url + "/" + this.pageNum + "/" + this.postNum)
            .then(function (result) {
            self.total = result.total;
            self.data = result.defects;
            self.render();

            var pageTotal = Math.ceil(self.total / self.postNum);
            self.pageList = self.testpg(self.pageNum, pageTotal);

            self.renderNav();
        });
    };
    this.refresh();

    this.pageSet = function () {
        var btn = document.getElementsByClassName('pages');
        var self = this;
        var elemId;
        for ( var k = 0; k < btn.length; k++) {
            btn[k].onclick = function (event) {
                if (event.target.attributes.id) {
                    console.log(event.eventPhase);
                    elemId = event.target.attributes.id.value;
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
            }
        }
    };
    this.pageSet();

    this.postsCount = function () {
        var selector = document.getElementById("postNum");
        var self = this;
        selector.onchange = function (ev) {
            self.postNum = Number(selector.options[selector.selectedIndex].value);
            self.refresh()
        };
    };
    this.postsCount();
}

var grid = new Grid({
    url: url,
    $el: $('#grid'),
    paginate: {
        pageNum: 1,
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

























