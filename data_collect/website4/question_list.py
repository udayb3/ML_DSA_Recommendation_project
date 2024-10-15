from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
import pandas as pd

from bs4 import BeautifulSoup

WEBSITE = 'https://workat.tech/problem-solving/lists/top-interview-questions/practice?page=1'

# Create options for Chrome
opt = webdriver.ChromeOptions()
opt.add_argument('--disable-extensions')
opt.add_argument('--no-sandbox') 
opt.add_argument('--disable-infobars')
opt.add_argument('--disable-dev-shm-usage')
opt.add_argument('--disable-browser-side-navigation')
opt.add_argument('--disable-gpu')
opt.add_argument('--blink-settings=imagesEnabled=false')
opt.add_argument('--headless')  # Headless mode (runs browser without UI)
opt.add_argument(
    'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
)

# Set up the WebDriver with the options
drv = webdriver.Chrome(options=opt)  # Pass the options object here

# Set window size and position
drv.set_window_size(700, 850)
drv.set_window_position(0, 0)

# Open the URL
drv.get(WEBSITE)
elem = drv.find_elements(by.CLASS_NAME, 'ps-lists-content')

final_question_name = []
final_question_link = []
final_difficulty = []
final_score = []
final_accuracy = []
# Should be array of array
final_company = []

cnt = 0
for questions in elem :
    questions_name = questions.find_elements(by.CLASS_NAME, 'problem-status-unattempted')
    # print(questions_name[0].text)
    final_question_name.append(questions_name[0].text)

    question_score = questions.find_elements(by.CLASS_NAME, 'ps-lists-content-score')
    final_score.append(question_score[0].text)

    # question_accuracy = questions.find_elements(by.CLASS_NAME, 'ps-lists-content-accuracy')
    # print(question_accuracy[0].text.strip())
    # final_accuracy.append(question_accuracy[0].text.strip())

    question_link_anchor = questions.find_elements(by.CLASS_NAME, 'ps-list-link')
    question_link_attr = question_link_anchor[0].get_attribute('href')
    final_question_link.append(question_link_attr)

    question_company = questions.find_elements(by.CLASS_NAME , 'company-icon')

    comp = []

    for name in question_company :
        question_company_name = name.get_attribute('alt')
        comp.append(question_company_name)
    
    final_company.append(comp)

    difficulty = questions.find_elements(by.CLASS_NAME , 'content-difficulty')
    final_difficulty.append(difficulty)


# Fetching the question text , ipt , opt examples from the respective links

for q_link in final_question_link :
    drv.get(q_link)
    whole_page = drv.find_elements(by.CLASS_NAME , 'ps-practice-problem-part')
    # print(whole_page[0].text)



print(final_accuracy)
print(final_company)
print(final_difficulty)
print(final_question_link)
print(final_question_name)








    

