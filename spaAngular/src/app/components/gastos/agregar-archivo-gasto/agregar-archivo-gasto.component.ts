import { Component, HostBinding, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { slideInDownAnimation } from '../../../utils/constants/animations';
import { ConstantsRoutes } from '../../../utils/constants/ConstantsRoutes';
import { ErrorValidationService } from '../../../utils/service/error-validation.service';
import { IdentityUserService } from '../../../utils/IdentityUser/identity-user.service';
import { LoadingService } from '../../loading/loading.service';
import { FileInput } from '../../../models/file/FileInput';
import { ArchivoInput } from '../../../models/file/ArchivoInput';
import { ConstantsCatalogos } from '../../../utils/constants/ConstantsCatalogos';
import { ImportDataLog } from '../../../models/file/ImportDataLog';
import { ImportMultipleXml } from '../../../models/file/ImportMultipleXml';
import { VisualizarPdfComponent } from '../../file/visualizar-pdf/visualizar-pdf.component';
import { GastoService } from '../gastos.service';

@Component({
  selector: 'app-agregar-archivo-gasto',
  templateUrl: './agregar-archivo-gasto.component.html',
  styleUrls: ['./agregar-archivo-gasto.component.css'],
  providers: [ErrorValidationService, GastoService],
  animations: [slideInDownAnimation]
})
export class AgregarArchivoGastoComponent implements OnInit {


  file: FileInput;
  files: FileInput[] = new Array();
  xmlExt = ConstantsCatalogos.EXT_FILE;
  erroresData: ImportDataLog[] = new Array();
  importaciones: ImportMultipleXml[] = new Array();
  total = 0;
  lastIndex = 0;
  actualizar = false;
  MAX_IMPORT = 5;
  gasto = '';

  constructor(
    private toastr: ToastrService,
    private identityUserService: IdentityUserService,
    private loadingService: LoadingService,
    public errorValidationService: ErrorValidationService,
    private gastoService: GastoService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarArchivoGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {

  }

  ngOnInit(): void {
    this.gasto = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close(this.actualizar);
  }

  getFileInput(files: FileInput[]) {
    // tslint:disable-next-line: forin
    for (const i in files) {
      this.lastIndex++;
      const importacion = new ImportMultipleXml();
      importacion.id = this.lastIndex;
      importacion.fileInput = files[i];
      importacion.estado = 1;
      this.importaciones.push(importacion);
    }
  }

  eliminarImportacion(importacion: ImportMultipleXml) {
    importacion.estado = 4;
  }

  importar() {
    const newImports = this.importaciones.filter(i => {
      return i.estado === 1;
    });

    if (newImports != null && newImports.length > 0) {
      const form: FormData = new FormData();
      form.append('gasto', this.gasto);
      let filesCount = 1;

      for (const i in newImports) {
        if (filesCount <= this.MAX_IMPORT) {
          form.append('files', newImports[i].fileInput.file);
          filesCount++;
        } else { break; }
      }

      this.loadingService.show();
      this.gastoService.postGastoAgregarFile(form)
        .subscribe(
          registro => {
            this.loadingService.hide();
            this.toastr.success('Registro!', 'Datos correctos!');
            this.dialogRef.close(true);
          }, error => {
            this.loadingService.hide();
            this.dialogRef.close(false);
          }, () => {
            this.loadingService.hide();
          }
        );

    } else { this.toastr.info('Favor de seleccionar un archivo válido.', 'Atención'); }
  }
}
