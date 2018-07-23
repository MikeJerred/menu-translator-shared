export interface IDetectedLanguage {
    "languageCode": string,
    "confidence": number
}

export interface IDetectedBreak {
    "type": "UNKNOWN" | "SPACE" | "SURE_SPACE" | "EOL_SURE_SPACE" | "HYPHEN" | "LINE_BREAK",
    "isPrefix": boolean
}

export interface ITextProperty {
    "detectedLanguages": IDetectedLanguage[],
    "detectedBreak": IDetectedBreak
}

export interface IVertex {
    "x": number,
    "y": number
}

export interface IBoundingPoly {
    "vertices": IVertex[]
}

export interface ISymbol {
    "property": ITextProperty,
    "boundingBox": IBoundingPoly,
    "text": string,
    "confidence": number
}

export interface IWord {
    "property": ITextProperty,
    "boundingBox": IBoundingPoly,
    "symbols": ISymbol[],
    "confidence": number
}

export interface IParagraph {
        "property": ITextProperty,
        "boundingBox": IBoundingPoly,
        "words": IWord[],
        "confidence": number
}

export interface IBlock {
    "property": ITextProperty,
    "boundingBox": IBoundingPoly,
    "paragraphs": IParagraph[],
    "blockType": "UNKNOWN" | "TEXT" | "TABLE" | "PICTURE" | "RULER" | "BARCODE",
    "confidence": number
}

export interface ILatLang {
    "latitude": number,
    "longitude": number
}

export interface ILocationInfo {
    "latLng": ILatLang
}

export interface IProperty {
    "name": string,
    "value": string,
    "uint64Value": string
}

export interface IAnnotateImageResponse {
    "textAnnotations": {
        "mid": string,
        "locale": string,
        "description": string,
        "score": number,
        "confidence": number,
        "topicality": number,
        "boundingPoly": IBoundingPoly,
        "locations": ILocationInfo[],
        "properties": IProperty[]
    }[],
    "fullTextAnnotation": {
        "pages": {
            "property": ITextProperty,
            "width": number,
            "height": number,
            "blocks": IBlock[],
            "confidence": number
        }[],
        "text": string
    },
    "error": {
        "code": number,
        "message": string,
        "details": {
            "@type": string,
            [index: string]: any
        }[]
    }
}
