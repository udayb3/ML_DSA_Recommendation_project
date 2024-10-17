import time
import os
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE = 'https://codeforces.com/problemset/page/'
num = range(7, 8)  # Pages to scrape

# Set up the Selenium WebDriver with Chrome
opt = webdriver.ChromeOptions()
opt.add_argument('--disable-extensions')
opt.add_argument('--no-sandbox')
opt.add_argument('--disable-infobars')
opt.add_argument('--disable-dev-shm-usage')
opt.add_argument('--disable-browser-side-navigation')
opt.add_argument('--disable-gpu')
opt.add_argument('--blink-settings=imagesEnabled=false')
opt.add_argument('--headless')  # Run browser in headless mode
opt.add_argument(
    'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
)

# Initialize the WebDriver for Chrome
drv = webdriver.Chrome(options=opt)
drv.set_window_size(700, 850)
drv.set_window_position(0, 0)

QUES = {'link': [], 'tags': [], 'diff': [], 'submission': []}

# Loop through the pages
for i in num:
    WEBSITE = BASE + str(i)
    print(f"Scraping page: {WEBSITE}")
    drv.get(WEBSITE)
    time.sleep(2)

    try:
        # Explicit wait for the table to appear
        qtable = WebDriverWait(drv, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@class="problems"]'))
        )
        
        # Find all the rows in the table, except the header row
        questions = qtable.find_elements(By.TAG_NAME, 'tr')[1:]  # Skip the header row
        
        # Loop through each question in the table
        for ques in questions:
            try:
                # Extract the link to the problem (first column)
                eleme = ques.find_element(By.CSS_SELECTOR, 'a')
                link = eleme.get_attribute('href')

                # Extract the tags (in the third column, as a list of text)
                tag_elements = ques.find_elements(By.CSS_SELECTOR, '.notice')
                tags = [tag.text for tag in tag_elements]

                # Extract the difficulty (problem rating), which is the second to last column
                difficulty = ques.find_elements(By.TAG_NAME, 'td')[-2].text

                # Extract the number of submissions (last column)
                submission = ques.find_elements(By.TAG_NAME, 'td')[-1].text

                # Append data to the dictionary
                QUES['link'].append(link)
                QUES['diff'].append(difficulty)
                QUES['tags'].append(", ".join(tags))  # Combine tags into a single string
                QUES['submission'].append(submission)

            except Exception as e:
                print(f"Error occurred while processing a question: {e}")
                
        if i % 10 == 0:
            print(f"Page {i} done")
    
    except Exception as e:
        print(f"Error occurred on page {i}: {e}")
        continue

drv.quit()


# Check if the CSV file already exists
csv_file = './link_data.csv'

if os.path.exists(csv_file):
    # If the file exists, read the existing data
    existing_df = pd.read_csv(csv_file)
    
    # Append the new data to the existing data
    df = pd.concat([existing_df, pd.DataFrame(QUES)], ignore_index=True)
else:
    # If the file does not exist, the new data will be the only content
    df = pd.DataFrame(QUES)

# Write the combined data back to the CSV file
df.to_csv(csv_file, index=False)


print("Scraping completed and data saved to link_data.csv")
