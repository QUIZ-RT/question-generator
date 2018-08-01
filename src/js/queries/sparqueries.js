export const queries = {
    entity: `SELECT ?propNumber ?propLabel ?val
    WHERE
    {
        hint:Query hint:optimizer 'None' .
        {	BIND(entity:#entity_id AS ?valUrl) .
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
        {	entity:#entity_id ?propUrl ?valUrl .
            ?property ?ref ?propUrl .
            ?property rdf:type wikibase:Property .
            ?property rdfs:label ?propLabel.
             FILTER (lang(?propLabel) = 'en' )
            filter  isliteral(?valUrl) 
            BIND(?valUrl AS ?val)
        }
        UNION
        {	entity:#entity_id ?propUrl ?valUrl .
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
    }`
}