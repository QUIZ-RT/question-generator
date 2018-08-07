import { SparqlConstants } from "../shared/sparqlConstants";

export class Helper {
    generateRange(pCount, pMin, pMax, result, results) {
        let min = pMin < pMax ? pMin : pMax;
        let max = pMax > pMin ? pMax : pMin;
        let itemId = result.item.value;
        if (pMax < pCount) {
            pCount = pMax;
        }
        var resultArr = [],
            randNumber,
            foundMatch = false;
        while (pCount > 0) {
            foundMatch = false;
            randNumber = Math.round(min + Math.random() * (max - min));
            if (resultArr.indexOf(randNumber) == -1) {
                let randomItem = results[randNumber];
                let randomItemId = randomItem.item.value;
                if(itemId !== randomItemId) {
                    for(let j = 0; j < resultArr.length; j++) {
                        let resultObj = results[j];
                        if(resultObj.property.value == randomItem.property.value) {
                            foundMatch = true;
                            break;
                        }
                    }
                    if(foundMatch) {
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
        let options = [];
        if (number_of_options)
            optionIndices = this.generateRange(number_of_options, 0, results.length - 1, result, results);
        else
            optionIndices = this.generateRange(3, 0, results.length - 1, result, results);
        for (const index of optionIndices) {
            options.push(results[index].propertyLabel.value);
        }
        return options;
    }

    constructOptionMap(result, results) {
        let itemId = resultObj.item.value;
        for(const resultIterated of results) {
            let itemIdIterated = resultIterated.item.value;
            if(itemId !== itemIdIterated) {

            }
        }
    }

    replaceAll(string, search, replacement) {
        return string.replace(new RegExp(search, 'g'), replacement);
    }

    getPropertyValueByLabel(propLabel, propertyArray) {
        let result = [];
        for(const property of propertyArray) {
            if(property.propLabel) {
                if(`P${property.propLabel.value}` == propLabel) {
                    let propertyValue = property.valUrl.value;
                    result.push(propertyValue.substring(propertyValue.lastIndexOf('/') + 1));
                }
            }
        }
        return result;
    }

    getPropertyValueByPropertyId(propertyId, propertyArray) {
        let result = [];
        for(const property of propertyArray) {
            if(property.propNumber) {
                if(`P${property.propNumber.value}` == propertyId) {
                    let propertyValue = property.valUrl.value;
                    result.push(propertyValue.substring(propertyValue.lastIndexOf('/') + 1));
                }
            }
        }
        return result;
    }

    getPropertiesByPropertyId(propertyId, propertyArray) {
        let result = [];
        for(const property of propertyArray) {
            if(property.propNumber) {
                if(`P${property.propNumber.value}` == propertyId) {
                    result.push(property);
                }
            }
        }
        return result;
    }

    convertToSparqConcat(template) {
        let hashPart = '#ITEM';
        let beforePart = template.substring(0, template.indexOf(hashPart));
        let afterPart = template.substring(template.indexOf(hashPart) + hashPart.length);     
        return '\'' + beforePart + '\', ?itemlabel, \'' + afterPart + '\'';
    }

    matchValue(array, object) {
        let result = [];
        Object.keys(object).forEach(function(key) {
            if(array.includes(object[key])) {
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
        counter = counter + 1;
        window.localStorage.setItem('id_counter1', counter);
        return counter;
    }
}