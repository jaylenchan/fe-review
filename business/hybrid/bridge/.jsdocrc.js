'use strict';

module.exports = {
  "source": {
    "include": ["./index.js"],
    "includePattern": ".+\\.js(doc|x)?$",
    "excludePattern": "(^|\\/|\\\\)_"
  },
  "opts": {
    "template": "node_modules/docdash",
    "destination": "./public/"
  }
}