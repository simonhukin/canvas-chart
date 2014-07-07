var data = {
    "layout": "vertical", // e.g., spreads charts horizontally by equal width, .. also can be "vertical"
    "charts": [
        { "type": "pie-plot",
            "data": [0.5, 0.5, 0.25, 0.25],
            "colours": ["#0f0", "#00f", "#f00", "#ff0"],
            "labels": ["apple", "pear", "plum", "melon"]
        },
        { "type": "pie-plot",
            "data": [0.5, 0.5, 0.25, 0.25],
            "colours": ["#0f0", "#00f", "#f00", "#ff0"],
            "labels": ["apple", "pear", "plum", "melon"]
        },
        { "type": "pie-plot",
            "data": [0.5, 0.5, 0.25, 0.25],
            "colours": ["#0f0", "#00f", "#f00", "#ff0"],
            "labels": ["apple", "pear", "plum", "melon"]
        },
        { "type": "bar-plot",
            "data": [0.5, 0.5, 0.25, 0.25],
            "colours": ["#0f0", "#00f", "#f00", "#ff0"],
            "labels": ["apple", "pear", "plum", "melon"]
        },
        { "type": "scatter-plot",
            "data": {
            "x": [0.5, 0.5, 0.25, 0.25],
            "y": [0.5, 0.5, 0.25, 0.25]},
            "colours": ["#0f0", "#00f", "#f00", "#ff0"],
            "labels": ["apple", "pear", "plum", "melon"]
        }
    ]
};

var chart = {
  "height": 200,
  "width": 200,
  "charts": [],
  "container": "",
  "createChart": function(){
    var c = data.charts.length;
    var i;
    var arr;

    chart.container = document.getElementById("chartContainer");

    for(i = 0; i<c; i++){
      console.log("i = "+i);
      if( data.charts[i].type === "pie-plot" ){
        console.log("pie");

        chart.drawPie(data.charts[i], i);
      }
      else if( data.charts[i].type === "bar-plot" ){
        chart.drawBar(data.charts[i], i);
      }
      else if( data.charts[i].type === "scatter-plot" ){
        chart.drawScatter(data.charts[i], i);
      }
    }

    //handle layout.
    arr = document.getElementsByClassName("charts");
    for(i = 0; i<arr.length; i++){
      arr[i].className = "charts " + data.layout;
    }

  },
  "drawPie": function(obj, n){
    var lastend = 0;
    var pieCtx;
    var pieCanvas;
    var pieTotal = chart.getTotal(obj.data);
    //console.log("Pie _ "+obj.data[0]);
    pieCanvas = document.createElement('canvas');
    pieDiv = document.createElement('div');
    pieCanvas.id = "chart_"+chart.charts.length;
    pieDiv.className = "charts";
    pieCanvas.width = chart.width;
    pieCanvas.height = chart.height;
    pieCanvas.innerHTML = "Not supported [add link to chrome here]."
    pieCtx = pieCanvas.getContext("2d");
    pieCtx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);
    chart.container.appendChild(pieDiv);
    pieDiv.appendChild(pieCanvas);
    chart.charts.push(pieCanvas);

    for(var x = 0; x < obj.data.length; x++){
      console.log("Pie _ "+obj.data[x]);
      console.log("length "+obj.data.length);

      pieCtx.fillStyle = obj.colours[x];
      pieCtx.beginPath();
      pieCtx.moveTo((chart.width/2), (chart.height/2));
      pieCtx.arc((chart.width/2), (chart.height/2), (chart.height/2),
        lastend, lastend + (Math.PI*2*(obj.data[x]/pieTotal)), false);
      pieCtx.lineTo((chart.width/2),(chart.height/2));
      pieCtx.fill();
      lastend += Math.PI*2*(obj.data[x]/pieTotal);

    }

  },
  "drawBar": function(obj, n){
    console.log("Bar");
    //handle bar here.
  },
  "drawScatter": function(obj, n){
    console.log("Scatter");
    //handle scatter here.
  },
  "getTotal": function(obj){
    var myTotal = 0;
    for (var j = 0; j < obj.length; j++) {
    myTotal += (typeof obj[j] == 'number') ? obj[j] : 0;
    }
    return myTotal;
  }
};
