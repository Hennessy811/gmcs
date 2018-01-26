var url = "http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/0/0/0/0/-1/0/0/0/15";

var postNum = url.split("/");
postNum = String(postNum[postNum.length - 1]);

var pageNum = url.split("/");
pageNum = String(Number(pageNum[pageNum.length - 2]) + 1);

var url = url.split("/");
url = url.slice(0, url.length - 2).join("/");
console.log(url);

function Grid(options) {
    this.options = options || {};
    this.total = 0;
    this.data = [];
    this.render = function () {
        this.options.$el.html('');

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

        $thead.appendTo($table);
        $tbody.appendTo($table);
        $table.appendTo(this.options.$el);
    };

    this.refresh = function () {
        var self = this;
        $.get(this.options.url + "/" + pageNum + "/" + postNum).then(function (result) {
            self.total = result.total;
            self.data = result.defects;
            self.render();
        });
    };

    this.setPage = function () {

    };

    this.refresh();
}

var grid = new Grid({
    url: url,
    $el: $('#grid'),
    page: pageNum,
    postCount: postNum,
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

























