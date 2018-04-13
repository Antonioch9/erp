import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FacturasService} from '../../servicios/facturas.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-fact',
  templateUrl: './creacion-fact.component.html',
  styleUrls: ['./creacion-fact.component.css']
})
export class CreacionFactComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;
  factura:any;
  formFra: FormGroup;
  mensaje:String="Error de conexion con el servidor"
  base: number;
  tipo: number = 0.21;
  importe: number;
  total: number;
  irpf:number;
  cif:Number;
  retencion:boolean=false;
  constructor(private ff: FormBuilder,  private facturasService:FacturasService, private router:Router ) { }

  ngOnInit() {
    this.formFra = this.ff.group({
      proveedor:[null,Validators.required],
      cif:['',[Validators.required, Validators.minLength(9)]],
      fecha:null,
      concepto:null,
      base:[0,[Validators.required,Validators.max(100000)]],
      retencion:false,
      tipo:null,
      irpf:this.formatearMoneda(0),
      importe:this.formatearMoneda(0),
      total:this.formatearMoneda(0),
    })
    this.detectarCambios();
  }
  redondear(valor) {
    var valor;
    if (valor < 0) {
      var resultado = Math.round(-valor * 100) / 100 * -1;
    } else {
      var resultado = Math.round(valor * 100) / 100;
    }
    return resultado;
  }
   //formateamos moneda
   formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style: "currency", currency: "EUR"}).format(valor);
    return resultado;
    }
  detectarCambios() {
    //subcribe detectan cambio en los valores 
    this.formFra.valueChanges.subscribe(valorForm => {
      this.cif=valorForm.cif.startsWith('A') || valorForm.cif.startsWith('B');
      this.base = this.redondear(valorForm.base);
      this.retencion = valorForm.retencion;
      if(this.retencion){
        this.irpf = this.redondear(this.base * -0.15);
      }else {
        this.irpf=0;
      }
      this.tipo = valorForm.tipo;
    
      this.importe = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.irpf+ this.importe);
      this.formFra.value.importe = this.formatearMoneda(this.importe);
      this.formFra.value.total = this.formatearMoneda(this.total);
      this.formFra.value.irpf = this.formatearMoneda(this.irpf);
     
    })


  }
  crearFra(){
    this.factura = this.guardarFra();
    this.facturasService.postFra(this.factura).subscribe((resp:any)=>{
      console.log(this.factura);
      this.router.navigate(['/listado-fact'])
    },(error:any)=>{
      console.log(error);
    })
  }
  guardarFra(){
    const guardarFra = {
      proveedor:this.formFra.get('proveedor').value,
      cif:this.formFra.get('cif').value,
      fecha:this.formFra.get('fecha').value,
      concepto:this.formFra.get('concepto').value,
      base:this.formFra.get('base').value,
      retencion:this.formFra.get('retencion').value,
      tipo:this.formFra.get('tipo').value,
      irpf:this.formFra.get('irpf').value,
      importe:this.formFra.get('importe').value,
      total:this.formFra.get('total').value,
    }
    return guardarFra;
  }
 
}
