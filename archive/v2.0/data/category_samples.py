#### code to get random summaries from the data...
from pymongo import MongoClient
client = MongoClient
client = MongoClient()
db = client.nh1
summaries = []

#get summary and description data
for doc in db.issues.find():
    summaries.append([doc["summary"],doc["description"]])

#repeat iteratively until satisfied...
options = {}
samples = []
done=False
get_new_category=True
while not done:
    import random
    random.shuffle(summaries)
    if get_new_category:
        summary = summaries.pop()
    print 'SUMMARY:'
    print summary[0]
    print '***'
    print 'DESCRIPTION:'
    print summary[1]
    print ''
    print 'choose one of these...'
    print "'done':   Finish"
    print "'new':    New Category"
    for option in options.items():
        print option[0],':   ',option[1]
    print ''
    label = raw_input('What Say You? :')

    if label == 'done':
        done=True

    elif label == 'new':
        category_name = raw_input('What shall this new category be called? :')
        options[str(len(options))] = category_name
        get_new_category=False

    elif str(label) not in options:
        print str(label),' is not a thing... try again...'
        get_new_category=False

    else:
        samples.append(summary+[options[str(label)]])
        get_new_category=True

import pickle
with open('data/wrangling/training_samples.pkl','w') as f:
    pickle.dump(samples)
