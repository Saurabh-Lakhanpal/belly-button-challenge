# belly-button-challenge
Create an interactive dashboard to explore the [Belly Button Biodiversity dataset](https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Solution
[Belly Button Biodiversity Dashboard](https://saurabh-lakhanpal.github.io/belly-button-challenge/)

## Instructions
Complete the following steps:

1. Use the D3 library to read in `samples.json` from the URL [https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json](https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json).
2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
   - Use `sample_values` as the values for the bar chart.
   - Use `otu_ids` as the labels for the bar chart.
   - Use `otu_labels` as the hovertext for the chart.

     ![image](https://github.com/user-attachments/assets/fe721c1d-bdd7-4f96-a71c-80cf600b514a)

### Bar Chart

3. Create a bubble chart that displays each sample.
   - Use `otu_ids` for the x values.
   - Use `sample_values` for the y values.
   - Use `sample_values` for the marker size.
   - Use `otu_ids` for the marker colors.
   - Use `otu_labels` for the text values.

     ![image](https://github.com/user-attachments/assets/0dc8d299-8bfe-4ec9-92b1-a0c84aba07bf)

### Bubble Chart

4. Display the sample's metadata, i.e., an individual's demographic information.
   - Loop through each key-value pair from the metadata JSON object and create a text string.
   - Append an html tag with that text to the `#sample-metadata` panel.

     ![image](https://github.com/user-attachments/assets/b5ef0447-1780-4106-9b47-6768993b2025)


### Updating Plots

5. Update all the plots when a new sample is selected. Create a layout that for the dashboard. An example dashboard is shown as follows:

   ![image](https://github.com/user-attachments/assets/47e4777d-465d-46e3-9e48-c361d7005d90)

### Deployment

6. Deploy the app to a free static page hosting service, such as GitHub Pages. 
- Use `console.log` inside of your JavaScript code to see what your data looks like at each step.
- Refer to the [Plotly.js documentation](https://plotly.com/javascript/) when building the plots.

### References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.
