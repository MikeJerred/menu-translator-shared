import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Environment } from '../environments/environment';
import { IAnnotateImageResponse } from './google-cloud-vision';

@Injectable()
export class TranslationService {
    constructor(private http: HttpClient, private environment: Environment) {
    }

    public translateImage(image: string): Observable<string> {
        return this.ocr(image).pipe(
            map(response => response.fullTextAnnotation.pages
                    .map(page => page.blocks
                        .map(block => block.paragraphs
                            .map(paragraph => paragraph.words
                                .map(word => word.symbols
                                    .map(symbol => symbol.text)
                                    .reduce(this.concat))
                                .reduce(this.concat))
                            .reduce(this.concat))
                        .reduce(this.concat))
                    .reduce(this.concat)));
    }

    private ocr(image: string): Observable<IAnnotateImageResponse> {
        const request = {
            "requests": [{
                "image": {
                    "content": image
                },
                "features": [{
                    "type": "DOCUMENT_TEXT_DETECTION"
                }],
                "imageContext": {
                    "languageHints": ["zh"]
                }
            }]
        };

        return this.http.post<IAnnotateImageResponse>(
            'https://vision.googleapis.com/v1/images:annotate?key=' + this.environment.googleCloudVisionAPIKey,
            request);
    }

    private concat = (accumulated: string, value: string) => accumulated + value;
}