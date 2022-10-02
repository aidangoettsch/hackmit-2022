import csv
from PyDictionary import PyDictionary 
from scipy import spatial


def tokenize(string, englishDict):
    
    with open('words.txt', 'r') as f:
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

    with open('words.txt', 'r') as f:
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
    
    with open(file) as r:
        reader = csv.reader(r, delimiter=",", quotechar='"')
        
        for row in reader:

            string = row[1]
            if not string: continue
            digest(string.lower())
        
    
    return dict(sorted(vocab.items(), key=lambda item: item[1], reverse=True))

def total(dic):
    return sum(dic.values())

def index(dic):
    indexes = {}
    rankings = sorted(dic.items(), key=lambda item: item[0], reverse=True)
    for i, item in enumerate(rankings):
        indexes[item[0]] = i
    return indexes
    
def bag(tokens):
    vocab = getVocab("scraper/data/sample.csv") 
    print(vocab)
    count = total(vocab)
    indexes = index(vocab)
    #print(indexes)
    vector = [0 for i in range(len(vocab))]

    for token in tokens:
        token = token.lower()
        vector[indexes[token]] = vocab[token] / count
        #vector[indexes[token]] = token
    
    return vector

dictionary_en = set()

with open('words.txt', 'r') as f:
    for word in f:
        dictionary_en.add(word.lower().strip())

v1 = bag(tokenize("Wegmans Sharp Cheddar Cheese Thin Sliced", dictionary_en))
v2 = bag(tokenize("Wegmans Giant Bread", dictionary_en))
v3 = bag(tokenize("Wegmans Mild White Cheddar Shredded Cheese", dictionary_en))



# print(spatial.distance.cosine(v1, v2))
# print(spatial.distance.cosine(v1, v3))
# print(spatial.distance.cosine(v2, v3))

print(v1)
print(v2)
print(v3)

