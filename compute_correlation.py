import ssl
import pandas as pd
from scipy import stats
ssl._create_default_https_context = ssl._create_unverified_context

df = pd.read_csv("covid.csv")

vals = {}
l = ["total_cases_per_million", "life_expectancy", "gdp_per_capita",\
     "human_development_index", "diabetes_prevalence", "aged_70_older",\
     "population_density", "total_cases_per_million", "total_cases", "median_age",\
     "diabetes_prevalence", "extreme_poverty", "aged_65_older", "total_tests", "reproduction_rate", "stringency_index"]
    
for c in l:
    df2 = df[["location", "date", "people_vaccinated", "population", c]]
    df2["vaccination_percent"] = df2["people_vaccinated"]/df2["population"]
    df2 = df2[["location", "date", "vaccination_percent", c]].dropna()

    idx = df2.groupby(['location'])['date'].transform(max) == df2['date']
    df3 = df2[idx]

    # Check correlation between the various datapoints (i.e. GDP and Vaccination %)
    vacc = df3["vaccination_percent"].tolist()
    val = df3[c].tolist()
    print(c + ": ", val)
    correlation, p_value = stats.pearsonr(vacc, val)
    vals[c] = (correlation, p_value, len(val))

print("-------------------------\n")
for v in vals:
    print(v + ": ", vals[v])