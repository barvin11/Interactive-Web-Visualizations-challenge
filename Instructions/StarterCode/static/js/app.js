// 1. Use the D3 library to read in samples.json
function optionChanged(selectedID){

  //Pathing to JSON file data
  d3.json("samples.json").then((data) => {
  d3.select("#selDataset").html("");

  //Grab metadata array data for each item aka "ID" and append each id to an item
  data.metadata.forEach(item =>{
      d3.select ("#selDataset").append("option").attr("value", item.id).text(item.id);
      });

  //Pass the selected value through JSON for filtering
  d3.select ("#selDataset").node().value = selectedID;

  //Filter metadata based on selected ID
  var metaDataID = data.metadata.filter(item=> (item.id == selectedID));

  // This grabs selectedID data and filters to be used in demograpic info card
  var demographicInfo = d3.select("#sample-metadata");
  demographicInfo.html("");
  Object.entries(metaDataID[0]).forEach(item=> {
        demographicInfo.append("p").text(`${item[0]}: ${item[1]}`)
    });

  //Create a horizontal bar chartwith a dropdown menu to display the top 10 OTUs found in that

  //Reverse dropdown to match example format

  //Filter through the JSON to grab selectedID data
  var subjectID = data.samples.filter(item => parseInt(item.id) == selectedID);

  //Use sample_values as the values for the bar chart.  (We only want the top 10)
  var values = subjectID[0].sample_values.slice(0,10);
  values = values.reverse();

  //Use otu_ids as the labels for the bar chart
  var otu = subjectID[0].otu_ids.slice(0,10)
  otu = otu.reverse();

  //Use otu_ids as the labels for the bar chart
  var otuLabel = subjectID[0].otu_labels
  otuLabel = otuLabel.reverse();

  //Define y axis value
  var yValue = otu.map(item => 'OTU' +  " " + item);

  //Define trace object and add formatting
    var trace = {
    y: yValue,
    x: values,
    type: 'bar',
    orientation: "h",
    text: otuLabel,
    marker: {
    color: '#17BECF',
    line:{
    width: 3
        }
      }
    },
    layout = {
    title: '<b> Top 10 Tested Individuals (OTU)</b>',
    xaxis: {title: 'Numbers of Samples Collected'},
    yaxis: {title: 'OTU ID'}
    }
    Plotly.newPlot('bar', [trace], layout, {responsive: true});

//Create a bubble chart that displays each sample.
//Reset sample value and otu to be able to seevisual correctly
var resetValue = subjectID[0].sample_values;
var resetOtu = subjectID[0].otu_ids;

//Define trace object and add formatting
var bubbleTrace = {
    x: resetOtu,
    y: resetValue,
    mode: 'markers',
    marker: {
    color: resetOtu,
    size: resetValue
    }
};

  bubbleLayout = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1600
    };
Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);
});
}

//Begin with subject 940 data showing in landing
optionChanged(940);
  
//This starts the function again whenever a new test subject is selected from dropdown
d3.select("#selselDataset").on('change',() => {
optionChanged(d3.event.target.value);
});