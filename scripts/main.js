
 d3.csv("Project1_Data/survey_results_public.csv", function(datum){

    let initialPeople = "I am not primarily a developer, but I write code sometimes as part of my work";
    var donut = new StackedDonut(datum,function(targetPeople){
        calander.drawCalanderChart(targetPeople);
        parrallel.drawParallelCoordinator(targetPeople);
    });

    var parrallel = new Parrallel_coordinator(datum,initialPeople);

    var calander = new CalanderChart("initialPeople");

})



