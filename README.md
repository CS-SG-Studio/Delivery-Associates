# Delivery Associates: Global Vaccine Equity Tracker
_**Faris Bdair, Julia Wang, Claire Yu, AJ Arnolie**_

## Project Overview
Over the last year, the coronavirus has impacted the lives of billions of people around the world. But in the last few months, vaccine development for this virus has advanced rapidly with a number of approved vaccines and more in development. Many experts identify that success in this vaccination distribution and adoption process is critical in ending this pandemic and ensuring the health and safety of people across the world. To address issues with vaccine distribution, we will **develop a Global Vaccine Dashboard with COVID and demographic data highlighting (in)equity in testing and vaccine rollout.**

<p align="center"><img width="900" alt="Screen Shot 2021-06-04 at 10 16 38 AM" src="https://user-images.githubusercontent.com/57520931/120815609-fb8d5880-c51d-11eb-9af1-0352e91dfd03.png">
</p>

## Setup Instructions
### Cloning Git Repository
In order to get started, open up a **Terminal** by typing **Command + SpaceBar**, typing **"Terminal"** into the search bar, and then clicking on the application. You can also open **Virtual Studio Code**, go to the **Terminal** tab, and select **New Terminal**. After that, enter the following commands into your terminal.
```
git clone https://github.com/CS-SG-Studio/Delivery-Associates.git
cd Delivery-Associates
```
This should put you in the Github Repository.

### React Project Setup and Usage
Download NodeJS: `https://nodejs.org/en/download/`

Here are the general setup instructions for a React Project **(_SKIP THIS STEP FROM NOW ON_)**.
```
npm install <package-name>
npm install -g create-react-app
npx create-react-app vaccine-equity-tracker
cd vaccine-equity-tracker
npm start
```

In order to run a React App for testing purposes, navigate to the `Delivery-Associates` repo and then run the following commands:
```
cd vaccine-equity-tracker
npm start
```

### Commit + Push Instructions
After making changes to the code, in order to push your changes to the remote Git repository, type the following:
```
git pull                               # To make sure code is up to date
git add .                              # Adds all modified files to commit (Sometimes we only want to add one)
git commit -m "[Explain code changes]" # Commits selected files with Commit message as description
git push                               # Pushes commit to remote Git repository
```
Because we will be working out of multiple branches, here are a few branch commands to get us started:
```
git checkout -b <new-branch-name>      # Creates a new branch locally
git push -u origin <new-branch-name>   # Saves new branch to remote repository
git branch                             # Shows all available branches
git checkout <branch-name>             # Switch to a different branch
git branch -d <branch-name>            # Deletes local branch
git push origin :<branch-name>         # Deletes remote branch
git merge <branch-name>                # Merges current branch with <branch-name> and saves over current branch
```

## Usage
### Data Selection
Use the buttons at the bottom of the page to select which data should be displayed on the map.

If the **Percent Vaccinated** button is selected, the values for this primary datatype will be displayed as shades of red for each country on the map. Then, the site provides the option to select a secondary data type. This data type defaults to **None**, but the user can also choose between **Cases per Million**, **GDP per Capita**, and **Life Expectancy**. When one of these secondary data types is selected, the data is displayed as bubbles of various sizes for each country. Larger bubbles correspond to higher values.

If the **Percent Vaccinated** button is not selected, one of the secondary data types can be selected to be displayed as a primary data type, appearing as shades of red for each country on the map.

### The Map
The map displays the data that has been selected in the previous step. To see specific information for each country, simply hover over that country with your mouse.

### Search Bar
An additional way to find more information about a specific country is using the search bar. Simply type the name of a country in the bar and press **Submit**, and that country will be selected and zoomed in on.

### Time Slider
Finally, the user has the option to select the time frame for the data to be displayed. This slider defaults to **Now**, which displays data updated to within the past three weeks, but the user can select any month dating back to March 2020.

## Index Design
### Data
All data is taken from [Our World in Data](https://ourworldindata.org/) and is updated on a daily basis. Our World in Data provides a unified dataset with data pulled from reputable sources such as the [Johns Hopkins University COVID-19 Data Repository](https://github.com/CSSEGISandData/COVID-19) as well as official government reports. Further information about the dataset and its sources can be found on the [OWID Github](https://github.com/owid/covid-19-data/tree/master/public/data) or at the [OWID website](https://ourworldindata.org/coronavirus-source-data).

Along with vaccination data, we selected the following three data types for their strong correlation to **Percent Vaccinated** as well as for the amount of data available for these data types.

### Percent Vaccinated
The percentage of the population that has recieved at least one dose of a COVID-19 vaccine. This measure is calculated by taking the total number of adults in a given country that have recieved at least one vaccine dose and dividing that number by the population size.

### COVID-19 Cases per Million
The number of COVID-19 cases within a given country for every million people. This measure is scaled by population and thus gives us a way to compare the spread of COVID-19 within countries while adjusting for population.

### GDP Per Capita
Is equivalent to the Gross Domestic Product (a measure of a country’s economic output) of a country divided by its population. This measure is generally used to gauge the prosperity and standard of living in a given country.

### Life Expectancy
Refers to the number of years a person in a given country will live on average.
