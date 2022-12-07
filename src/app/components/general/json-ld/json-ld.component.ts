import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-json-ld',
  template: '<div [innerHTML]="html | noSanitize"></div>',
  styles: []
})
export class JsonLdComponent implements OnInit {
  @Input() data: any;
  @Input() comments: any = [];
  @Input() type;
  html: string;

  constructor() {
  }

  ngOnInit() {
    // if (this.type === 'movie') {
    this.html = this.getSafeHTML(this.getMovieLD());
    // } else {
    //   this.html = this.getSafeHTML(this.getSeriesLD());
    // }
  }

  getSeriesLD = () => {
    const episodes = [];
    this.data.seasonsList.map((season: any, sindex: number) => {
      season.data.map((episode: any, eindex: number) => {
        episodes.push({
          '@type': 'ListItem',
          'position': sindex.toString() + '' + eindex.toString(),
          'item': {
            '@type': 'Movie',
            'url': this.data.url + '/' + episode.slug,
            'name': 'فصل' + season.index + ' ' + episode.name,
            'image': this.data.images.thumbnails[0].sizes.sfull,
            'dateCreated': this.data.year,
            'director': {
              '@type': 'Person',
              'name': this.data.directors
            },
            'review': {
              '@type': 'Review',
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5'
              },
              'author': {
                '@type': 'Person',
                'name': 'John D.'
              },
              'reviewBody': 'Heartbreaking, inpsiring, moving. Bradley Cooper is a triple threat.'
            },
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': this.data.kartoonaRateShow ? this.data.kartoonaRateShow : 1,
              'bestRating': 5,
              'worstRating': 1,
              'ratingCount': this.data.rateCount
            }
          }
        });
      });
    });
    const seriesLD =
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': episodes
      };
    return seriesLD;
  };
  getMovieLD = () => {
    const comments = [];
    this.comments.map(comment => {
      this.comments.push({
        '@type': 'Comment',
        'text': comment.comment,
        'downvoteCount': '0',
        'upvoteCount': '0',
        'creator': {
          '@type': 'Person',
          'name': comment.user ? ((comment.user.first_name && comment.user.last_name) ? (comment.user.first_name + ' ' + comment.user.last_name) : ('user ' + comment.user.id)) : comment.name
        }
      });
    });
    const movieLD = {
      '@context': 'http://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          'url': 'https://kartoona.com/'
        },
        {
          '@type': 'Movie',
          'name': this.data.persian_name,
          'actor': [],
          'description': this.data.description,
          'video': {
            '@type': 'VideoObject',
            'name': this.data.persian_name,
            'description': this.data.description,
            'thumbnailUrl': this.data.images.thumbnails[0].sizes.sfull,
            'embedUrl': this.data.url,
            'uploadDate': this.data.createdAt
          },
          'image': {
            '@type': 'ImageObject',
            'url': this.data.images.thumbnails[0].sizes.sfull,
          },
          'dateCreated': this.data.year,
          'aggregateRating': {
            '@type': 'AggregateRating',
            'bestRating': 5,
            'worstRating': 1,
            'ratingCount': this.data.rateCount,
            'ratingValue': this.data.kartoonaRateShow ? this.data.kartoonaRateShow : 1
          },
          'director': {
            '@type': 'person',
            'name': this.data.directors
          },

        },
      ]
    };
    if (comments.length > 0) {
      movieLD['@graph'] = movieLD['@graph'].concat(comments);
    }
    return movieLD;
  };
  getDuration = (dur) => {
    return `PT${parseInt((dur / 60).toString())}H${parseInt((dur % 60).toString())}M`;
  };


  getSafeHTML(jsonLD: { [key: string]: any }): string {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
// escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;

    return (html);
  }
}
