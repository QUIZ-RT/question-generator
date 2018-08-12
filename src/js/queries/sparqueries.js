module.exports = {
  entity: `PREFIX entity: <http://www.wikidata.org/entity/>
    SELECT ?propNumber ?propUrl ?propLabel ?valUrl ?val
    WHERE
    {
        hint:Query hint:optimizer 'None' .
        {
            BIND(entity:#entity_id AS ?valUrl) .
            BIND("N/A" AS ?propUrl ) .
            BIND("Name"@en AS ?propLabel ) .
           entity:#entity_id rdfs:label ?val .
          
            FILTER (LANG(?val) = "en") 
        }
        UNION
        {   BIND(entity:#entity_id AS ?valUrl) .
          
            BIND("AltLabel"@en AS ?propLabel ) .
            optional{entity:#entity_id skos:altLabel ?val}.
            FILTER (LANG(?val) = "en") 
        }
        UNION
        {   BIND(entity:#entity_id AS ?valUrl) .
          
            BIND("Description"@en AS ?propLabel ) .
            optional{entity:#entity_id schema:description ?val}.
            FILTER (LANG(?val) = "en") 
        }
        UNION
        {
            entity:#entity_id ?propUrl ?valUrl .
            ?property ?ref ?propUrl .
            ?property rdf:type wikibase:Property .
            ?property rdfs:label ?propLabel.
             FILTER (lang(?propLabel) = 'en' )
            filter  isliteral(?valUrl) 
            BIND(?valUrl AS ?val)
        }
        UNION
        {
            entity:#entity_id ?propUrl ?valUrl .
            ?property ?ref ?propUrl .
            ?property rdf:type wikibase:Property .
            ?property rdfs:label ?propLabel.
             FILTER (lang(?propLabel) = 'en' ) 
            filter  isIRI(?valUrl) 
            ?valUrl rdfs:label ?valLabel 
            FILTER (LANG(?valLabel) = "en") 
             BIND(CONCAT(?valLabel) AS ?val)
        }
            BIND( SUBSTR(str(?propUrl),38, 250) AS ?propNumber)
    }
    ORDER BY xsd:integer(?propNumber)`,

  city_query: `SELECT ?instance ?instanceLabel WHERE {
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          ?instance wdt:P31 wd:Q515.
          ?instance wdt:P17 #countryCode
      }
      LIMIT 5`,

  person_query: `select distinct ?item ?itemlabel ?property ?propertyLabel ?questionlabel
  where {
    ?item wdt:P31 wd:#INSTANCE_OF .
    ?item wdt:#PRIMARY_FILTER wd:#PRIMARY_FILTER_VALUE.
    ?item wdt:#PROPERTY ?property .
    ?item rdfs:label ?itemlabel.
    FILTER(LANG(?itemlabel) = "en").
    BIND(concat(#TEMPLATE) AS ?questionlabel).
  
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
      
    }
  }
  LIMIT 300`,

  general_query: `select distinct ?item ?itemlabel ?property ?propertyLabel ?questionlabel
  where {
    ?item wdt:P31 wd:#INSTANCE_OF .
    ?item wdt:#PROPERTY ?property .
    ?item rdfs:label ?itemlabel.
    FILTER(LANG(?itemlabel) = "en").
    BIND(concat(#TEMPLATE) AS ?questionlabel).
  
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
      
    }
  }
  LIMIT 300`, 

  person_date_query: `select distinct ?item ?itemlabel ?property ?propertyLabel ?questionlabel
  where {
    ?item wdt:P31 wd:#INSTANCE_OF .
    ?item wdt:#PRIMARY_FILTER wd:#PRIMARY_FILTER_VALUE.
    ?item p:#PROPERTY/psv:#PROPERTY [
        wikibase:timePrecision "11"^^xsd:integer ;
        wikibase:timeValue ?propertyLabel ;
      ] ;.
    ?item rdfs:label ?itemlabel.
    FILTER(LANG(?itemlabel) = "en").
    BIND(concat(#TEMPLATE) AS ?questionlabel).
  
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
      
    }
  }
  LIMIT 300`, 

  general_date_query: `select distinct ?item ?itemlabel ?property ?propertyLabel ?questionlabel
  where {
    ?item wdt:P31 wd:#INSTANCE_OF .
    ?item p:#PROPERTY/psv:#PROPERTY [
        wikibase:timePrecision "11"^^xsd:integer ;
        wikibase:timeValue ?propertyLabel ;
      ] ;.
    ?item rdfs:label ?itemlabel.
    FILTER(LANG(?itemlabel) = "en").
    BIND(concat(#TEMPLATE) AS ?questionlabel).
  
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
      
    }
  }
  LIMIT 300`, 

  distinct_countries: `select distinct ?country ?placeofbirth ?placeofbirthLabel
  where {
    ?person wdt:P106 wd:Q12299841.
    ?person wdt:P19 ?placeofbirth .
    ?placeofbirth wdt:P17 ?country.
  
    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en" .
      
    }
  } order by ?country`,
};
