import csv
from PyDictionary import PyDictionary 
from scipy import spatial
import json
from alive_progress import alive_bar
import pickle
import os


def tokenize(string, englishDict):
    
    with open('categorizer/words.txt', 'r') as f:
        for word in f:
            englishDict.add(word.lower().strip())

    res = set()
    tokenized = string.split(" ")

    for word in tokenized:
        if word.lower() not in englishDict: continue
        res.add(word)
        
    return res


def getVocab(file):
    vocab = {}
    dictionary_en = set()

    with open('categorizer/words.txt', 'r') as f:
        for word in f:
            dictionary_en.add(word.lower().strip())

    def digest(string):
        res = set()
        tokenized = string.split(" ")

        for word in tokenized:
            word = word.lower()
            if word.lower() not in dictionary_en: continue
            res.add(word)
            if word not in vocab:
                vocab[str(word)] = 0
            vocab[word] += 1
        
        return res

    with open(file) as data_file:    
        data = json.load(data_file)
        for v in data:
            digest(v['name'])
            #print(v['name'])
        
    
    return dict(sorted(vocab.items(), key=lambda item: item[1], reverse=True))

def total(dic):
    return sum(dic.values())

def index(dic):
    indexes = {}
    rankings = sorted(dic.items(), key=lambda item: item[0], reverse=True)
    for i, item in enumerate(rankings):
        indexes[item[0]] = i
    return indexes
    
def bag(tokens, vocab):
    count = total(vocab)
    indexes = index(vocab)
    #print(indexes)
    vector = [0 for i in range(len(vocab))]

    for token in tokens:
        token = token.lower()
        vector[indexes[token]] = vocab[token] / count
        #vector[indexes[token]] = token
    
    return vector

def packData(file, dataPath):

    dataset = {}

    dictionary_en = set()

    with open('categorizer/words.txt', 'r') as f:
        for word in f:
            dictionary_en.add(word.lower().strip())

    vocab = getVocab(file)

    with open(file) as data_file:    
        data = json.load(data_file)

        with alive_bar(len(data)) as bar:
            for v in data:
                tokens = tokenize(v['name'], dictionary_en)
                dataset[v['id']] = bag(tokens, vocab)
                bar()

    with open(dataPath, 'wb') as handle:
        pickle.dump(dataset, handle, protocol=pickle.HIGHEST_PROTOCOL)

    return dataset

def findClosestK(dataset, vector, k):
    distances = []
    for key in dataset:
        distances.append((key, spatial.distance.cosine(dataset[key], vector)))
    distances.sort(key=lambda x: x[1])
    return distances[:k]

# dictionary_en = set()

# with open('words.txt', 'r') as f:
#     for word in f:
#         dictionary_en.add(word.lower().strip())

# v1 = bag(tokenize("Wegmans Sharp Cheddar Cheese Thin Sliced", dictionary_en))
# v2 = bag(tokenize("Wegmans Giant Bread", dictionary_en))
# v3 = bag(tokenize("Wegmans Mild White Cheddar Shredded Cheese", dictionary_en))

# print(spatial.distance.cosine(v1, v2))
# print(spatial.distance.cosine(v1, v3))
# print(spatial.distance.cosine(v2, v3))

if __name__ == "__main__":

    file = input("enter path of json file: ")

    dataPath = 'categorizer/pickledData/' + file.split("/")[-1] 
    categoryName = str(dataPath.split(".")[0])
    dataPath = categoryName + ".pickle"

    print(dataPath)

    if not os.path.exists(dataPath):
        dataset = packData(file, dataPath)
    else:
        dataset = pickle.load(open(dataPath, "rb"))
    
    dictionary_en = set()

    with open('categorizer/words.txt', 'r') as f:
        for word in f:
            dictionary_en.add(word.lower().strip())

    vocab = getVocab(file)
    #search = input("enter search term: ")
    search = "Wegmans Sharp Cheddar Cheese Thin Sliced"
    tokens = tokenize(search, dictionary_en)
    vector = bag(tokens, vocab)
    #v1 = bag(tokenize("Wegmans Sharp Cheddar Cheese Thin Sliced", dictionary_en), vocab)

    print(findClosestK(dataset, vector, 10))

    #scraper/data/sample.json
    #Wegmans Sharp Cheddar Cheese Thin Sliced