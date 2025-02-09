// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter(sampleObj => sampleObj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("")` to clear any existing metadata
    panel.html("");

    // Create a table element
    let table = panel.append("table").attr("class", "table table-striped");

    // Append the table body
    let tbody = table.append("tbody");

    // Inside a loop, append new table rows (`<tr>`) and cells (`<td>`) for each key-value pair in the filtered metadata
    Object.entries(result).forEach(([key, value]) => {
      let row = tbody.append("tr");
      row.append("td").text(key.toUpperCase());
      row.append("td").text(value);
    });

    // Append Belly Button Washing Frequency to Demographic Info
    let row = tbody.append("tr");
    row.append("td").html("WASHING ν");
    row.append("td").text(result.wfreq);

    // After populating the panel, calculate the combined height
    adjustBarChartHeight();
  });
}

// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let result = samples.filter(sampleObj => sampleObj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    let bubbleData = [bubbleTrace];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 30 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      showlegend: false,
      height: 600,  // Adjust height as needed
      width: document.getElementById("bubble").offsetWidth,  // Dynamically set width
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true});

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart with a custom colorscale that excludes white
    let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        color: otu_ids.slice(0, 10).reverse(),
        colorscale: [
          [0, 'rgb(165,0,38)'],
          [0.1, 'rgb(215,48,39)'],
          [0.2, 'rgb(244,109,67)'],
          [0.3, 'rgb(253,174,97)'],
          [0.4, 'rgb(254,224,144)'],
          [0.5, 'rgb(255,255,191)'],
          [0.6, 'rgb(224,243,248)'],
          [0.7, 'rgb(171,217,233)'],
          [0.8, 'rgb(116,173,209)'],
          [0.9, 'rgb(69,117,180)'],
          [1, 'rgb(49,54,149)']
        ]
      }
    };

    let barData = [barTrace];

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
      height: document.querySelector('#sample-metadata').parentNode.parentNode.parentNode.parentNode.offsetHeight, // Dynamic height
      width: document.getElementById("bar").offsetWidth,  // Dynamic width
    }, {responsive: true});
  });
}

// Function to adjust bar chart height
function adjustBarChartHeight() {
  // Get the combined height of the demographic and test subject divs
  let metadataCardHeight = document.querySelector('#sample-metadata').parentNode.offsetHeight;
  let testSubjectCardHeight = document.querySelector('#selDataset').parentNode.offsetHeight;
  let combinedHeight = metadataCardHeight + testSubjectCardHeight;

  // Set the bar chart height
  let barDiv = document.getElementById("bar");
  Plotly.relayout(barDiv, { height: combinedHeight });
}

// Initialize the dashboard
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

// Event listener for window resizing to make charts responsive
window.addEventListener('resize', () => {
  let sample = d3.select("#selDataset").property("value");
  buildCharts(sample);
});
