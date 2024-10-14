from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
import pandas as pd


drv=webdriver.Firefox()
opt= webdriver.FirefoxOptions()

opt.add_argument('--disable-extensions')
opt.add_argument('--no-sandbox') 
opt.add_argument('--disable-infobars')
opt.add_argument('--disable-dev-shm-usage')
opt.add_argument('--disable-browser-side-navigation')
opt.add_argument('--disable-gpu')
opt.add_argument('--blink-settings=imagesEnabled=false')
opt.add_argument('--headless')
opt.add_argument(
  'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
)

QUES= {'link': [], 'diff':[], 'score': [], 'success rate':[], 'text': []}

SUFFIX={'algorithms', 'data-structures', 'mathematics'}

for suffix in SUFFIX:
  WEBSITE='https://www.hackerrank.com/domains/'+suffix

  drv.get(WEBSITE)
  drv.set_window_size(1400,850);	drv.set_window_position(0,0)
  last_height = drv.execute_script("return document.body.scrollHeight")

  while True:
          drv.execute_script("window.scrollTo(0, document.body.scrollHeight);")

          sleep(2)

          new_height = drv.execute_script("return document.body.scrollHeight")
          if new_height == last_height:
              break
          last_height = new_height

          questions = drv.find_elements(by.CLASS_NAME, 'challenges-list')
          links = drv.find_elements(by.CLASS_NAME, 'challenge-list-item')
          for link in links:
              try:
                QUES['link'].append(link.get_attribute('href'))
              except Exception:
                  QUES['link'].append(None)

              try:
                QUES['diff'].append(link.find_element(by.CLASS_NAME, 'difficulty').text)
              except Exception:
                  QUES['diff'].append(None)

              try:
                  QUES['score'].append(link.find_element(by.CLASS_NAME, 'max-score').text)
              except Exception:
                  QUES['score'].append(None)

              try:
                  QUES['success rate'].append(link.find_element(by.CLASS_NAME, 'success-ratio').text)
              except Exception:
                  QUES['success rate'].append(None)

  print(f"Saved links. Total questions found: {len(QUES['link'])}. Now fetching question texts...")

  for i in range(len(QUES['link'])):
      try:
          drv.get(QUES['link'][i])
          sleep(2)
          QUES['text'] = drv.find_element(by.CLASS_NAME, 'challenge-body-html').text
      except Exception:
          QUES['text'] = None
      print(f"Question {i+1} fetched.")

  drv.quit()

  df= pd.DataFrame(QUES)
  df.to_json('./data.json', orient='records', lines=True)

  print("Data saved for website: "+WEBSITE)

print("Data saved successfully to data.json")
