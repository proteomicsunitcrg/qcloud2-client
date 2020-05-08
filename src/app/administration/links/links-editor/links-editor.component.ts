import { Component, OnInit } from '@angular/core';
import { Link } from '../../../models/Link';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LinkService } from '../../../services/links.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from 'src/app/shared/ToastConfig';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-links-editor',
  templateUrl: './links-editor.component.html',
  styleUrls: ['./links-editor.component.css']
})
export class LinksEditorComponent implements OnInit {

  constructor(
    private linkService: LinkService,
    private toast: ToastrService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }
  link: Link;

  linkForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit() {
    this.activeRouter.params.subscribe(
      params => {
        if (params.apiKey !== null && params.apiKey !== undefined) {
          this.retrieveInfo(params.apiKey);
        } else {
          this.router.navigate(['/application/administration/links']);
        }
      }
    );
  }

  private retrieveInfo(apiKey: String): void {
    this.linkService.getByApiKey(apiKey).subscribe(
      res => {
        this.linkForm.controls.name.setValue(res.name);
        this.linkForm.controls.url.setValue(res.url);
        this.link = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public update(): void {
    this.linkService.updateLink(new Link(this.link.id, this.link.apiKey, this.linkForm.value.url, this.linkForm.value.name)).subscribe(
      res => {
        this.toast.success('Link updated', 'Success!', TOASTSETTING);
      },
      err => {
        console.error(err);
        this.toast.error(err.error.error, 'Error!', TOASTSETTINGLONG);
      }
    );
  }

  public closeForm(): void {
    this.router.navigate(['/application/administration/links', ]);
  }

}
