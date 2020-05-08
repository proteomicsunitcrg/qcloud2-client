import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/links.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from '../../shared/ToastConfig';
import { Link } from '../../models/Link';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  constructor(private linkService: LinkService, private router: Router, private toast: ToastrService) { }

  allLinks: Link[]

  ngOnInit() {
    this.getAllLinks();
  }

  private getAllLinks(): void {
    this.linkService.getAllLinks().subscribe(
      res => {
        this.allLinks = res;
      },
      err => console.error(err)
    );
  }

  public updateLink(link: Link): void {
    this.router.navigate(['/application/administration/links/editor', link.apiKey])
  }

}
