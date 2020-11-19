import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-translate-section',
  templateUrl: './translate-section.component.html',
  styleUrls: ['./translate-section.component.scss']
})
export class TranslateSectionComponent implements OnInit {

  currentLanguage = 'en';

  languages = [
    {
      name: 'en',
    },
    {
      name: 'fr'
    }
  ];
  constructor(private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router) {

    setTimeout(() => {
      this.route.queryParams.subscribe(params => {
        if (params !== {} && params.hasOwnProperty('lang') && this.languages.some(l => l.name.toLowerCase() === params.lang)) {
          this.ChangeLanguage(params.lang);
          this.currentLanguage = params.lang;
        } else {
          this.ChangeLanguage('en');
          this.currentLanguage = 'en';
        }
      });
    }, 100);

  }

  ngOnInit(): void {
  }



  ChangeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
    this.ReloadQueryParams(lang);
  }

  ReloadQueryParams(newLanguageUsed: string): void {
    this.router.navigate([], {
      queryParams: { lang: newLanguageUsed },
      queryParamsHandling: 'merge',
    });
  }


}
