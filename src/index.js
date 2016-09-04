import stopwords from 'natural/lib/natural/util/stopwords';
import ClassifierBase from 'natural/lib/natural/classifiers/classifier';
import Classifier from './classifier';

const stopwordsBackup = stopwords.words.slice();

class BrainJSClassifier extends ClassifierBase {
  constructor(options, stemmer) {
    const b = new Classifier(options);
    super(b, stemmer);
    this.options = options;
  }
}

BrainJSClassifier.restore = function(data, options, stemmer) {
  var result = new BrainJSClassifier(options?options:data.options, stemmer);

  result.classifier.brain.fromJSON(data.classifier.brain);
  result.docs = data.docs;
  result.features = data.features;

  return result;
};

BrainJSClassifier.load = function(filename, options, stemmer, callback) {
  ClassifierBase.load(filename, (err, classifier) => {
    if (err) {
      callback(err);
    }
    callback(err, BrainJSClassifier.restore(classifier, options, stemmer));
  });
};

BrainJSClassifier.disableStopWords = function() {
  stopwords.words.splice(0, stopwords.words.length);
  return stopwordsBackup;
};

BrainJSClassifier.enableStopWords = function() {
  if(!stopwords.length) {
    stopwords.words.push.apply(stopwords.words, stopwordsBackup);
  }
};

BrainJSClassifier.stopwords = stopwords;

export default BrainJSClassifier;
