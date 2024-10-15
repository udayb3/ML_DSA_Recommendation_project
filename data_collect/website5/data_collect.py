from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
import pandas as pd


opt= webdriver.FirefoxOptions()
drv=webdriver.Firefox(options=opt)

opt.add_argument('--disable-extensions')
opt.add_argument('--start-maximized')
opt.add_argument('--no-sandbox') 
opt.add_argument('--disable-infobars')
opt.add_argument('--disable-application-cache')
opt.add_argument('--disable-dev-shm-usage')
opt.add_argument('--disable-browser-side-navigation')
opt.add_argument('--disable-gpu')
opt.add_argument('--blink-settings=imagesEnabled=false')
opt.add_argument('--headless')
opt.add_argument(
  'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
)

QUES= {'link': [], 'diff':[], 'score': [], 'success rate':[], 'text': []}
SUFFIX=['mathematics', 'data-structures', 'algorithms']

for suffix in SUFFIX:

  WEBSITE=f'https://www.hackerrank.com/domains/{suffix}'
  print(WEBSITE)

  drv.get(WEBSITE)
  drv.set_window_position(0,0)
  last_height = drv.execute_script("return document.body.scrollHeight")

  print("Fetching links...")

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
        QUES['diff'].append(link.find_element(by.CLASS_NAME, 'difficulty').text)
        QUES['success rate'].append(link.find_element(by.CLASS_NAME, 'success-ratio').text)
        QUES['score'].append(link.find_element(by.CLASS_NAME, 'max-score').text)
      except Exception:
        QUES['link'].append(None)
        QUES['diff'].append(None)
        QUES['score'].append(None)
        QUES['success rate'].append(None)

  print(f"Saved links. Total questions found: {len(QUES['link'])}. Now fetching question texts...")

  batch_size = 32
  for i in range(0, len(QUES['link']), batch_size):
    batch_links = QUES['link'][i:i + batch_size]
    for j in range(len(batch_links)):
      try:
        if batch_links[j] is not None:
          drv.get(batch_links[j])
          sleep(2)
          QUES['text'].append(drv.find_element(by.CLASS_NAME, 'challenge-body-html').text)
        else:
          QUES['text'].append(None)
      except Exception:
        QUES['text'].append(None)
    print(f"Batch {i // batch_size + 1}: {j + 1} questions fetched.")

  drv.quit()

  df= pd.DataFrame(QUES)
  df.to_json('./data.json')

  print("Data saved for website: "+WEBSITE)

print("Data saved successfully to data.json")
