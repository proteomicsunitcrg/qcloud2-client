import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { System } from '../../../../app/models/system';
import { Node } from '../../../../app/models/node';
import { NodeIntranetService } from 'src/app/services/node-intranet.service';
import { APIKEYREGEX } from '../api-key-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-key-node',
  templateUrl: './api-key-node.component.html',
  styleUrls: ['./api-key-node.component.css']
})
export class ApiKeyNodeComponent implements OnInit {

  constructor(private nodeService: NodeIntranetService, private router: Router) { }

  apiKey: string;

  node: Node;

  labsystems: System[] = [];

  apiKeyForm = new FormGroup({
    apiKeyInput: new FormControl('', [
      Validators.required,
      Validators.pattern(APIKEYREGEX)
    ])
  });

  ngOnInit() {
  }

  public find(): void {
    this.nodeService.getNodeByApiKey(this.apiKeyForm.controls['apiKeyInput'].value).subscribe(
      res => {
        this.router.navigate(['/application/intranet/node/', res.apiKey]);
      },
      err => {
        console.error(err);
      }
    );
  }

}
