import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any[]=[];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
  this.formData=this.formService.getFormData()
  console.log(this.formData)
  }
}
