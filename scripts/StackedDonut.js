//console.log("inside donutchart")

function StackedDonut(datum,onUpdate){
 // console.log("HI")
  this.onUpdate = onUpdate;
  
  var margin = {top: 20, right: 40, bottom: 20, left: 20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;

    var svg = d3.select("div.donut").append("svg")
        .attr("class", "pie")
        .attr("width", 700)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal()
        .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

    // var color2 = //["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f"];
    //     d3.scaleOrdinal()
    //       .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f"]);

    var arc = d3.arc()
            .outerRadius(radius - 20)
            .innerRadius(radius-80);

    // var arc2 = d3.arc()
    //         .outerRadius(80)
    //         .innerRadius(radius-70);

    var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);
    //define pie
    var pie = d3.pie()
                .sort(null)
                .value(function(d) { return d.value; });

    // var pie2 = d3.pie()
    //             .sort(null)
    //             .value(function(d){return d.value});

    //define svg
    // var svg = d3.select("div.vis1").append("svg")
    // .attr("width", width )
    // .attr("height", height )
    // //.append("g")
    // .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");

    //import data 
   


      datum.forEach(function(d) {
          d.MainBranch = d.MainBranch
          // d.Employment = d.Employment
          //console.log(d.MainBranch);
        });
        var mainBranch = d3.nest()
                    .key(function(d) { return d.MainBranch; })
                    .rollup(function(v) { return v.length; })
                    .entries(datum);
                  // console.log(JSON.stringify(mainBranch));
                // console.log(mainBranch[0].key);
                //  for(var i = 0; i < mainBranch.length; ++i){
                //    console.log( mainBranch[i].key);
                // }
        // var Employment = d3.nest()
        //             .key(function(d){return d.Employment})
        //             .rollup(function(v){return v.length})
        //             .entries(datum);
                //   console.log(JSON.stringify(Employment));

        var g = svg.selectAll(".arc")
                    .data(pie(mainBranch))
                    .enter().append("g")
                    .attr("class", "arc");

          g.on("click", function(d) {
            
                      onUpdate(d.data.key)
                    })
                    // svg.on('mouseover', function(d) {
                    //   // map.attr('opacity', 0.2);
                    //   // d3.select(this).attr('opacity', 1)
                    //   // onUpdate(datum.properties.neighbourhood);
                    //   console.log("HHHHHH")
                    //   //onUpdate(this)
                
                    //   //d3.event.stopPropagation();
                    // })

        // var g2 = svg.selectAll(".arc2")
        //             .data(pie(Employment))
        //             .enter().append("g")
        //             .attr("d", arc2);
    
        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.value); })
          .style("stroke", "#fff")
          .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween("d", tweenDonut);

            g.on('mouseover', function(d, index, nodes) {
              // select our tooltip
              var tooltip = d3.select('#myTooltip');
  
              // make sure our tooltip is going to be displayed
              tooltip.style('display', 'block');
  
              // set the initial position of the tooltip
              tooltip.style('left', d3.event.pageX + "px");
              tooltip.style('top', d3.event.pageY) + "px";
  
              // set our tooltip to have the values for the 
              // element that we're mousing over
              tooltip.html(d.data.key);
          })
          .on('mousemove', function(d, index, nodes) {
              // select our tooltip
              var tooltip = d3.select('#myTooltip');
  
              // update the position if the user's moved the mouse 
              //in the element
              tooltip.style('left', d3.event.pageX +"px");
              tooltip.style('top', d3.event.pageY + "px");
          })
          .on('mouseleave', function(d, index, nodes) {
              // select our tooltip 
              var tooltip = d3.select('#myTooltip');
  
              // hide tooltip if we leave the element we've been 
              // mousing over
              tooltip.style('display', 'none');
          })

        // g2.append("path")
        //     .attr("d", arc2)
        //     .style("fill", function(d) { return color2(d.value); })
        //     .style("stroke", "#fff")
        //     .transition()
        //       .ease(d3.easeLinear)
        //       .duration(2000)
        //       .attrTween("d", tweenDonut2);
      
        

            // g.append("text")
            // .transition()
            //   .ease(d3.easeLinear)
            //   .duration(2000)
            // .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            //   .attr("dy", ".35em")
            //   .text(function(d) { for(var i = 0; i < mainBranch.length; ++i){
            //       return mainBranch[i].key
            //   } });
            
            
            

          function tweenDonut(b) {
            b.innerRadius = 0;
            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function(t) { return arc(i(t)); };

          }

          // function tweenDonut2(b) {
          //   b.innerRadius = 0;
          //   var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
          //   return function(t) { return arc2(i(t)); }}

}





    