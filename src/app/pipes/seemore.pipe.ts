import {ElementRef, Pipe, PipeTransform, Renderer2} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'seemore',
  pure: false
})
export class SeemorePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef) {

  }

  transform(value: string): SafeHtml {
    if (value) {

      const btnStyle = 'color: #007bff; text-decoration: none; background-color: transparent;';
      const scharRegex = /~/gi;
      const nlRegex = /\n/gi;
      const mainRegex = /\[showhide[^\[]*\[\/showhide\]/gi;
      const startRegex = /\[showhide.*?\]/gi;
      const endRegex = /\[\/showhide\]/gi;
      const moreTextRegex = /more_text=&quot;.*?&quot;/gi;
      const lessTextRegex = /less_text=&quot;.*?&quot;/gi;
      // value = value.replace(nlRegex, '~');
      const matches = value.match(mainRegex);
      if (matches && Array.isArray(matches)) {
        matches.map(str => {
          const replace = str.toString();
          let moreText = 'نمایش ادامه مطلب';
          let lessText = 'مخفی کردن ادامه';
          const moreTextMatches = str.match(moreTextRegex);
          const lessTextMatches = str.match(lessTextRegex);
          if (moreTextMatches && moreTextMatches.length > 0) {
            moreText = moreTextMatches[0].replace('more_text=&quot;', '').replace('&quot;', '').trim();
          }
          if (lessTextMatches && lessTextMatches.length > 0) {
            lessText = lessTextMatches[0].replace('less_text=&quot;', '').replace('&quot;', '').trim();
          }
          // console.log(str.match(startRegex), str.match(endRegex));
          str = str.replace(startRegex, '').trim();
          str = str.replace(endRegex, '').trim();
          str = str.replace(/<\/?[^>]+(>|$)/g, '');
          // console.log(str)
          str = `
<div>
<button style="${btnStyle}" 
onclick="javascript:
if(this.nextElementSibling.style.display==='block'){
this.nextElementSibling.style.display='none';
this.innerHTML='${moreText}';
}
else{
  this.nextElementSibling.style.display='block';
  this.innerHTML='${lessText}';
}">
${moreText}</button>
      <p style="display:none  !important;">${str}</p>
      </div>
      `;
          value = value.replace(replace, str);
        });
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
