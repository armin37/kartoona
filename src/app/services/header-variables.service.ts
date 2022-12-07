import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderVariablesService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta) { }

  setMetaTags = async (data) => {
    if (isPlatformBrowser(this.platformId)) {
      this.meta.updateTag({ name: 'description', content: data.seo_description });
      this.meta.updateTag({ name: 'keywords', content: data.seo_keyword });
    }
  }
}
