import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService.getFormData().subscribe(data => {
      this.formData = data;
      console.log('Received form data:', this.formData);
    });
  }
}
