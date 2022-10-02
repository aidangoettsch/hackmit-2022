import spacy

# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

# Process whole documents
text = "Wegmans White Bread Made With Whole Grain"
doc = nlp(text)

# Analyze syntax
print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
print("Adjectives:", [token.lemma_ for token in doc if token.pos_ == "ADJ"])

# Find named entities, phrases and concepts
for entity in doc.ents:
    print(entity.text, entity.label_)
