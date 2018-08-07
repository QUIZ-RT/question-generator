import { SparqlConstants } from '../shared/sparqlConstants';

export class Helper {
  generateRange(pCount, pMin, pMax, result, results) {
    const min = pMin < pMax ? pMin : pMax;
    const max = pMax > pMin ? pMax : pMin;
    const itemId = result.item.value;
    if (pMax < pCount) {
      pCount = pMax;
    }
    let resultArr = [],
      randNumber,
      foundMatch = false;
    while (pCount > 0) {
      foundMatch = false;
      randNumber = Math.round(min + Math.random() * (max - min));
      if (resultArr.indexOf(randNumber) == -1) {
        const randomItem = results[randNumber];
        const randomItemId = randomItem.item.value;
        if (itemId !== randomItemId) {
          for (let j = 0; j < resultArr.length; j++) {
            const resultObj = results[j];
            if (resultObj.property.value == randomItem.property.value) {
              foundMatch = true;
              break;
            }
          }
          if (foundMatch) {
            continue;
          }
          resultArr.push(randNumber);
          pCount--;
        }
      }
    }
    return resultArr;
  }

  generateOptions(result, results, number_of_options) {
    let optionIndices = [];
    const options = [];
    if (number_of_options) optionIndices = this.generateRange(number_of_options, 0, results.length - 1, result, results);
    else optionIndices = this.generateRange(3, 0, results.length - 1, result, results);
    for (const index of optionIndices) {
      options.push(results[index].propertyLabel.value);
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
        if (`P${property.propLabel.value}` == propLabel) {
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
        if (`P${property.propNumber.value}` == propertyId) {
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
        if (`P${property.propNumber.value}` == propertyId) {
          result.push(property);
        }
      }
    }
    return result;
  }

  convertToSparqConcat(template) {
    const hashPart = '#ITEM';
    const beforePart = template.substring(0, template.indexOf(hashPart));
    const afterPart = template.substring(template.indexOf(hashPart) + hashPart.length);
    return `'${beforePart}', ?itemlabel, '${afterPart}'`;
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
}
