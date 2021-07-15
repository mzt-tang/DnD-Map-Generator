import csv

list = []

with open("testing - Sheet1.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print("[", ', '.join(row), "],")
