import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Dato } from './model/dato.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,IonicModule,CommonModule]
})
export class FormularioComponent  {

  Lista:Dato[] = [];
  editIndex: number | null = null;
  videoUrl: string | null = null;

  constructor() { }

  onSubmit(form: any) {
    const nuevoDato: Dato = {
      nombre: form.value.nombre,
      url: form.value.url
    };

    if (!nuevoDato.nombre || !nuevoDato.url) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.editIndex !== null) {
      this.Lista[this.editIndex] = nuevoDato;
      this.editIndex = null;
    } else {
      this.Lista.push(nuevoDato);
    }

    form.reset();
  }

  editarDato(index: number) {
    const dato = this.Lista[index];
    console.log(dato);
    const form = document.querySelector('form');
    if (form) {
      (form.querySelector('#nombre') as HTMLInputElement).value = dato.nombre;
      (form.querySelector('#url') as HTMLInputElement).value = dato.url;
    }
    this.editIndex = index;
  }

  eliminarDato(index: number) {
    this.Lista.splice(index, 1);
  }

  onVideoError(event: Event) {
    alert('Error al cargar el video. Por favor, verifique la URL.');
    this.videoUrl = null;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
