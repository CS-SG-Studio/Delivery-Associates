"""
Code used to gain understanding of potential correlation between % Vaccinated and a variety of other data types
"""
import ssl
import pandas as pd
from scipy import stats
ssl._create_default_https_context = ssl._create_unverified_context

# Saved data as CSV locally to speed up process
df = pd.read_csv("covid.csv")
# df = pd.read_csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv")

vals = {}
# List of data types to try. To add more, simply add to this list
l = ["total_cases_per_million", "life_expectancy", "gdp_per_capita",\
     "human_development_index", "diabetes_prevalence", "aged_70_older",\
     "population_density", "total_cases_per_million", "total_cases", "median_age",\
     "diabetes_prevalence", "extreme_poverty", "aged_65_older", "total_tests", "reproduction_rate", "stringency_index"]
    
for c in l:
    df2 = df[["location", "date", "people_vaccinated", "population", c]]
    df2["vaccination_percent"] = df2["people_vaccinated"]/df2["population"]
    df2 = df2[["location", "date", "vaccination_percent", c]].dropna()

    # Grabs the ids of the most recent datapoints for each country and load data for those rows
    idx = df2.groupby(['location'])['date'].transform(max) == df2['date']
    df3 = df2[idx]

    # Check correlation between the various datapoints and Vaccination % (i.e. GDP and Vaccination %)
    vacc = df3["vaccination_percent"].tolist()
    val = df3[c].tolist()
    print(c + ": ", val)
    # Pearsons Correlation Coefficient. range: (-1, 1)
    correlation, p_value = stats.pearsonr(vacc, val)
    vals[c] = (correlation, p_value, len(val))

print("-------------------------\n")
for v in vals:
    print(v + ": ", vals[v])