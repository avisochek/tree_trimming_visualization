
from metamind.api import set_api_key, ClassificationData, ClassificationModel
import pymongo
from pymongo import MongoClient
import pickle
import time

### metamind setup
set_api_key("k3U0ZYw5U7BiQWnXYCAJGzKHmSk42VSNUoVebKxPC9jlchnXzk")
training_data = ClassificationData(private=True, data_type='text', name="text snippets")
clf = ClassificationModel(private=True, name='SCF_category_classifier')

### mongodb setup
client = MongoClient()
db = client.nh1

### extract samples
with open('/home/allan/Desktop/new_haven_seeclickfix_visualization/data/wrangling/training_samples.pkl','r') as f: #load the samples...
	training_samples = pickle.load(f)

count=0
training_samples_2=[]
for sample in training_samples:
	count+=1
	training_samples_2.append((sample[0]+' '+sample[1],sample[2]))
training_data.add_samples(training_samples_2,input_type='text') #add them to the training data.


clf.fit(training_data) # train the classifier...

## put all cleaning operations under a single function
def clean(issue,clf=clf):
	cleaned_issue = issue
	cleaned_issue['category'] = clf.predict(issue["summary"]+' '+issue['description'],input_type='text')
	return cleaned_issue

#iterate through each of the documents
#replacing each
for issue in db.issues.find():
	db.issuesCleaned.insert_one(clean(issue))
