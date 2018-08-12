export class Helper {
  generateRange(pCount, pMin, pMax, result, results) {
    const min = pMin < pMax ? pMin : pMax;
    const max = pMax > pMin ? pMax : pMin;
    const itemId = result.item.value;
    if (pMax < pCount) {
      pCount = pMax;
    }
    const resultArr = [];
    let randNumber = 0;
    let foundMatch = false;

    while (pCount > 0) {
      foundMatch = false;
      randNumber = Math.round(min + Math.random() * (max - min));
      if (resultArr.indexOf(randNumber) === -1) {
        const randomItem = results[randNumber];
        const randomItemId = randomItem.item.value;
        if (itemId !== randomItemId) {
          for (let j = 0; j < resultArr.length; j += 1) {
            const resultObj = results[j];
            if (resultObj.property.value === randomItem.property.value) {
              foundMatch = true;
              break;
            }
          }
          if (foundMatch) {
            continue;
          }
          resultArr.push(randNumber);
          pCount -= 1;
        }
      }
    }
    return resultArr;
  }

  generateOptions(result, results, numberOfOptions, isDate) {
    let optionIndices = [];
    const options = [];
    if (numberOfOptions) {
      optionIndices = this.generateRange(numberOfOptions, 0, results.length - 1, result, results);
    } else {
      optionIndices = this.generateRange(3, 0, results.length - 1, result, results);
    }
    for (const index of optionIndices) {
      if(isDate) {
        options.push(results[index].property.value);
      } else {
        options.push(results[index].propertyLabel.value);
      }
    }
    return options;
  }

  constructOptionMap(result, results) {
    const itemId = resultObj.item.value;
    for (const resultIterated of results) {
      const itemIdIterated = resultIterated.item.value;
      if (itemId !== itemIdIterated) {

      }
    }
  }

  replaceAll(string, search, replacement) {
    return string.replace(new RegExp(search, 'g'), replacement);
  }

  getPropertyValueByLabel(propLabel, propertyArray) {
    const result = [];
    for (const property of propertyArray) {
      if (property.propLabel) {
        if (`P${property.propLabel.value}` === propLabel) {
          const propertyValue = property.valUrl.value;
          result.push(propertyValue.substring(propertyValue.lastIndexOf('/') + 1));
        }
      }
    }
    return result;
  }

  getPropertyValueByPropertyId(propertyId, propertyArray) {
    const result = [];
    for (const property of propertyArray) {
      if (property.propNumber) {
        if (`P${property.propNumber.value}` === propertyId) {
          const propertyValue = property.valUrl.value;
          result.push(propertyValue.substring(propertyValue.lastIndexOf('/') + 1));
        }
      }
    }
    return result;
  }

  getPropertiesByPropertyId(propertyId, propertyArray) {
    const result = [];
    for (const property of propertyArray) {
      if (property.propNumber) {
        if (`P${property.propNumber.value}` === propertyId) {
          result.push(property);
        }
      }
    }
    return result;
  }

  getValueByValueId(value, allValues) {
    let keys = Object.keys(allValues);
    for (const key of keys) {
      let innerValue = allValues[key];
      if (typeof innerValue == 'object') {
        let returnedKey = this.getValueByValueId(value, innerValue);
        if(returnedKey && returnedKey !== '') {
          return returnedKey;
        }
      } else {
        if (value && value === innerValue) {
          return key;
        }
      }
    }

    return '';
  }

  convertToSparqConcat(template) {
    const hashPart = '#ITEM';
    const beforePart = template.substring(0, template.indexOf(hashPart));
    const afterPart = template.substring(template.indexOf(hashPart) + hashPart.length);
    return `'${beforePart}', ?itemlabel, '${afterPart}'`;
  }

  addQueryFilter(query, filterProperty, filterValues) {
    let filterString = '';
    for(let i = 0; i < filterValues.length; i++) {
      let currentFilterValue = filterValues[i];
      filterString = `${filterString} {?item wdt:${filterProperty} wd:${currentFilterValue} }`;
      if(i != filterValues.length - 1) {
        filterString = `${filterString} UNION `;
      }
    }
    query = query.replace('.', `.\n${filterString}`);
    return query;
  }

  matchValue(array, object) {
    const result = [];
    Object.keys(object).forEach((key) => {
      if (array.includes(object[key])) {
        result.push(object[key]);
      }
    });
    return result;
  }

  generateId() {
    let counter;
    if (window.localStorage.getItem('id_counter1')) {
      counter = parseInt(window.localStorage.getItem('id_counter1'));
    } else {
      counter = 0;
    }
    counter += 1;
    window.localStorage.setItem('id_counter1', counter);
    return counter;
  }

  chunkArray(array, chunk_size){
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        let chunk = array.slice(index, index+chunk_size);
        tempArray.push(chunk);
    }
    return tempArray;
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
