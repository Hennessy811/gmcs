const url = "http://10.40.10.118:81/Service1.svc/restapi/DefectDirectSql/0/0/0/0/0/-1/0/0/0/15";

var table = document.getElementById('table-grid');
//
// fetch(url)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         var dataList = data.defects;
//
//         for (i = 0; i < dataList.length; i++) {
//             var tr = document.createElement("tr");
//
//             var dataSet = [];
//             dataSet.push(dataList[i].org1Description);
//             dataSet.push(dataList[i].org2Description);
//             dataSet.push(dataList[i].org3Description);
//             dataSet.push(dataList[i].developmentReason);
//             dataSet.push(dataList[i].itemDescription);
//             dataSet.push(dataList[i].reasonDescription);
//
//             for (j = 0; j < dataSet.length; j++) {
//                 var td = document.createElement("td");
//
//                 td.innerText = dataSet[j];
//                 tr.appendChild(td)
//             }
//             table.appendChild(tr)
//         }
//
//     })
//     .catch( alert );

class DataReciever {

    constructor(url){
        this.url = url
    }

    getList() {
        console.log(this.url)
    }

}

var datum = new DataReciever(url);

datum.getList();

// dataReciever.getList
