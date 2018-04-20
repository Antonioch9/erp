import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FacturasService} from '../../servicios/facturas.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-fact',
  templateUrl: './editar-fact.component.html',
  styleUrls: ['./editar-fact.component.css']
})
export class EditarFactComponent implements OnInit {
  formFra: FormGroup;
  id:string;
  mensaje:String="Error de conexion con el servidor"
  facturas: any;
  base: number;
  tipo: number;
  importe: number;
  total: number;
  irpf:number;
  cif:Number;
  retencion:boolean=false;
  constructor(private ff:FormBuilder,private facturasService:FacturasService,private router: Router, private route: ActivatedRoute) {
    if(!this.facturas){
      this.facturas={};
    }
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log(this.id);
    this.cargarFactura(this.id);
    this.formFra = this.ff.group({
      proveedor:[null,Validators.required],
      cif:['',[Validators.required, Validators.minLength(9)]],
      fecha:null,
      concepto:null,
      base:[0.21,[Validators.required,Validators.max(100000)]],
      retencion:false,
      tipo:null,
      irpf:this.formatearMoneda(0),
      importe:this.formatearMoneda(0),
      total:this.formatearMoneda(0)
    })
    this.detectarCambios();
  }
  detectarCambios() {
    //subcribe detectan cambio en los valores 
    this.formFra.valueChanges.subscribe(valorForm => {
      // this.cif=valorForm.cif.startsWith('A') || valorForm.cif.startsWith('B');
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
  redondear(valor) {
    var valor;
    if (valor < 0) {
      var resultado = Math.round(-valor * 100) / 100 * -1;
    } else {
      var resultado = Math.round(valor * 100) / 100;
    }
    return resultado;
  }
  formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style: "currency", currency: "EUR"}).format(valor);
    return resultado;
    }
  cargarFactura(id){
    this.facturasService.getFacturaId(id).subscribe((res:any)=>{
      this.facturas = res.factura
      console.log(this.facturas);
    })
  }
  editarFactura(){
    this.facturas =this.guardarFra();
    this.facturasService.putFactura(this.id,this.facturas).subscribe((res:any)=>{
      this.router.navigate(["/listado-fact"]);
    });
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
