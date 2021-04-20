# Delivery Associates: Global Vaccine Equity Tracker
_**Faris Bdair, Julia Wang, Claire Yu, AJ Arnolie**_

## Project Overview
Over the last year, the coronavirus has impacted the lives of billions of people around the world. But in the last few months, vaccine development for this virus has advanced rapidly with a number of approved vaccines and more in development. Many experts identify that success in this vaccination distribution and adoption process is critical in ending this pandemic and ensuring the health and safety of people across the world. To address issues with vaccine distribution, we will **develop a Global Vaccine Dashboard with COVID and demographic data highlighting (in)equity in testing and vaccine rollout.**

<p align="center"><img width="600" alt="Screen Shot 2021-04-19 at 4 43 04 PM" src="https://user-images.githubusercontent.com/57520931/115300799-65989c80-a12e-11eb-9504-08602b4e5899.png"></p>

## Setup Instructions
### Cloning Git Repository
In order to get started, either open up a **Terminal** by typing **Command + SpaceBar**, typing **"Terminal"** into the search bar, and then clicking on the application. You can also open **Virtual Studio Code**, go to the **Terminal** tab, and select **New Terminal**. After that, enter the following commands into your terminal.
```
git clone https://github.com/CS-SG-Studio/Delivery-Associates.git
cd Delivery-Associates
```
This should put you in the Github Repository.

### React Project Setup and Usage
Download NodeJS: `https://nodejs.org/en/download/`

Here are the general setup instructions for a React Project (We will only need to do this once).
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
_TBD_

## Index Design
### Data
- [Our World in Data Covid Vaccination Data](https://ourworldindata.org/covid-vaccinations)
- [Country Adult Mortality Rate Data WHO](https://www.who.int/data/gho/data/indicators/indicator-details/GHO/adult-mortality-rate-(probability-of-dying-between-15-and-60-years-per-1000-population))
- [Country Life Expectancy Data WHO](https://www.who.int/data/gho/data/indicators/indicator-details/GHO/life-expectancy-at-birth-(years))
- [Country Medical Doctors per 10,000 People WHO](https://www.who.int/data/gho/data/indicators/indicator-details/GHO/medical-doctors-(per-10-000-population))
- [WHO COVID Dashboard](https://covid19.who.int/table?tableDay=yesterday)
- [UNICEF Country Data](https://unicef.shinyapps.io/wuenic-analytics-2020)
- [Country Socioeconomic Status Indicator Data](https://www.visualcapitalist.com/ranked-the-social-mobility-of-82-countries/)
- [Country GDP Data WorldoMeters](https://www.worldometers.info/gdp/gdp-by-country/)

_TBD_
