export const queries = {
  entity: `SELECT ?propNumber ?propLabel ?val
      WHERE
      {
          hint:Query hint:optimizer 'None' .
          {
              BIND(entity:$(var) AS ?valUrl) .
              BIND("N/A" AS ?propUrl ) .
              BIND("Name"@de AS ?propLabel ) .
             entity:#entity_id rdfs:label ?val .
            
              FILTER (LANG(?val) = "en") 
          }
          UNION
          {   BIND(entity:#entity_id AS ?valUrl) .
            
              BIND("AltLabel"@de AS ?propLabel ) .
              optional{entity:#entity_id skos:altLabel ?val}.
              FILTER (LANG(?val) = "en") 
          }
          UNION
          {   BIND(entity:#entity_id AS ?valUrl) .
            
              BIND("Beschreibung"@de AS ?propLabel ) .
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

  similar_entities: `SELECT ?item ?itemLabel 
      WHERE 
      {
          ?item wdt:P31 wd:Q146.
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }`,

  query: `select distinct ?item ?itemLabel ?country ?countryLabel ?placeofbirth ?placeofbirthLabel ?questionlabel
      where {
        ?item wdt:P106 wd:Q12299841.
        ?item wdt:P19 ?placeofbirth .
        ?item rdfs:label ?personlabel.
        FILTER(LANG(?personlabel) = "en").
        ?placeofbirth wdt:P17 ?country.
        BIND(concat("What is the place of birth of ", ?personlabel) AS ?questionlabel).
      
        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en" .
          
        }
      }
      LIMIT 100`,

  city_query: `SELECT ?instance ?instanceLabel WHERE {
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          ?instance wdt:P31 wd:Q515.
          ?instance wdt:P17 #countryCode
      }
      LIMIT 5`,

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
