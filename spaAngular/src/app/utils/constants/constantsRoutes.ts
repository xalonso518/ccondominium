export class ConstantsRoutes {
    /* ANGULAR ROUTES */
    public static get ANGULAR_LOGIN(): string { return '/auth/login'; }
    public static get ANGULAR_REGISTRO(): string { return '/auth/registro'; }
    public static get ANGULAR_RESET(): string { return '/auth/reset'; }
    public static get ANGULAR_PANEL(): string { return '/panel'; }
    public static get ANGULAR_ADMIN(): string { return '/admin'; }
    public static get ANGULAR_PANEL_ADMIN(): string { return '/admin/panel'; }
    public static get ANGULAR_PANEL_USUARIO(): string { return '/condominio/panel'; }

    /* API ROUTES*/
    public static get LOGIN(): string { return '/api/auth/login'; }
    public static get REGISTRO(): string { return '/api/auth/registro'; }
    public static get RESET(): string { return '/api/auth/reset'; }
    public static get IDENTITY_USER(): string { return '/api/auth/getIdentityUser'; }
    public static get NAVBAR_USER(): string { return '/api/usuario/NavBarData'; }
    public static get PERFIL_USER_FILE(): string { return '/api/usuario/perfilFile'; }
    public static get PERFIL_USER(): string { return '/api/usuario/perfil'; }
    public static get BUSCAR_MENSAJES(): string { return '/api/mensajes'; }
    public static get PERFIL_BORRAR_IMG(): string { return '/api/usuario/borraFile'; }

    /* Usuarios */
    public static get USUARIOS_GET(): string { return '/api/usuario/list'; }
    public static get USUARIOS_CASA_GET(): string { return '/api/usuario/casa'; }
    public static get USUARIO_GET(): string { return '/api/usuario'; }
    public static get USUARIO_AGREGAR(): string { return '/api/usuario'; }
    public static get USUARIO_EDITAR(): string { return '/api/usuario'; }
    public static get USUARIO_ELIMINAR(): string { return '/api/usuario'; }
    public static get USUARIO_CAMBIO_ESTADO(): string { return '/api/usuario/estado'; }
    public static get USUARIO_ENVIAR_INVITACION(): string { return '/api/usuario/invitacion'; }
    public static get USUARIO_ENVIAR_MENSAJE(): string { return '/api/usuario/mensaje'; }

    /* Tipo CUOTAS */
    public static get TIPOS_CUOTAS_TODOS(): string { return '/api/tipoCuota/list/todos'; }
    public static get TIPOS_CUOTAS(): string { return '/api/tipoCuota/list'; }
    public static get TIPO_CUOTA_GET(): string { return '/api/tipoCuota'; }
    public static get TIPO_CUOTA_AGREGAR(): string { return '/api/tipoCuota'; }
    public static get TIPO_CUOTA_EDITAR(): string { return '/api/tipoCuota'; }
    public static get TIPO_CUOTA_ELIMINAR(): string { return '/api/tipoCuota'; }
    public static get TIPO_CUOTA_CAMBIO_ESTADO(): string { return '/api/tipoCuota/estado'; }

    /* CUOTAS */
    public static get CUOTAS(): string { return '/api/cuota/list'; }
    public static get CUOTAS_FALTANTES(): string { return '/api/cuota/faltantes'; }
    public static get CUOTA_GET(): string { return '/api/cuota'; }
    public static get CUOTA_AGREGAR_FILE(): string { return '/api/cuota/postFile'; }
    public static get CUOTA_AGREGAR(): string { return '/api/cuota'; }
    public static get CUOTA_EDITAR(): string { return '/api/cuota'; }
    public static get CUOTA_EDITAR_IMPORTE(): string { return '/api/cuota/editarImporte'; }
    public static get CUOTA_ELIMINAR(): string { return '/api/cuota'; }
    public static get CUOTA_ARCHIVO_ELIMINAR(): string { return '/api/cuota/archivo/eliminar'; }
    public static get CUOTA_ARCHIVO_AGREGAR(): string { return '/api/cuota/archivo'; }

    /* Tipo GASTOS */
    public static get TIPOS_GASTOS_TODOS(): string { return '/api/tipoGasto/list/todos'; }
    public static get TIPOS_GASTOS(): string { return '/api/tipoGasto/list'; }
    public static get TIPO_GASTO_GET(): string { return '/api/tipoGasto'; }
    public static get TIPO_GASTO_AGREGAR(): string { return '/api/tipoGasto'; }
    public static get TIPO_GASTO_EDITAR(): string { return '/api/tipoGasto'; }
    public static get TIPO_GASTO_ELIMINAR(): string { return '/api/tipoGasto'; }
    public static get TIPO_GASTO_CAMBIO_ESTADO(): string { return '/api/tipoGasto/estado'; }

    /* GASTOS */
    public static get GASTOS(): string { return '/api/gasto/list'; }
    public static get GASTO_GET(): string { return '/api/gasto'; }
    public static get GASTO_AGREGAR_FILE(): string { return '/api/gasto/postFile'; }
    public static get GASTO_AGREGAR(): string { return '/api/gasto'; }
    public static get GASTO_EDITAR(): string { return '/api/gasto'; }
    public static get GASTO_EDITAR_IMPORTE(): string { return '/api/gasto/editarImporte'; }
    public static get GASTO_ELIMINAR(): string { return '/api/gasto'; }
    public static get GASTO_ARCHIVO_ELIMINAR(): string { return '/api/gasto/archivo/eliminar'; }
    public static get GASTO_ARCHIVO_AGREGAR(): string { return '/api/gasto/archivo'; }

    /* Tipo CUMPLIMIENTO */
    public static get TIPOS_CUMPLIMIENTOS_TODOS(): string { return '/api/tipoCumplimiento/list/todos'; }
    public static get TIPOS_CUMPLIMIENTOS(): string { return '/api/tipoCumplimiento/list'; }
    public static get TIPO_CUMPLIMIENTO_GET(): string { return '/api/tipoCumplimiento'; }
    public static get TIPO_CUMPLIMIENTO_AGREGAR(): string { return '/api/tipoCumplimiento'; }
    public static get TIPO_CUMPLIMIENTO_EDITAR(): string { return '/api/tipoCumplimiento'; }
    public static get TIPO_CUMPLIMIENTO_ELIMINAR(): string { return '/api/tipoCumplimiento'; }
    public static get TIPO_CUMPLIMIENTO_CAMBIO_ESTADO(): string { return '/api/tipoCumplimiento/estado'; }

    /* CUMPLIMIENTO */
    public static get CUMPLIMIENTOS(): string { return '/api/cumplimiento/list'; }
    public static get CUMPLIMIENTO_GET(): string { return '/api/cumplimiento'; }
    public static get CUMPLIMIENTO_AGREGAR(): string { return '/api/cumplimiento'; }
    public static get CUMPLIMIENTO_EDITAR(): string { return '/api/cumplimiento'; }
    public static get CUMPLIMIENTO_ELIMINAR(): string { return '/api/cumplimiento'; }

    /* REPORTE */
    public static get REPORTE_ANUAL(): string { return '/api/reporte/anual'; }

    /* CONDOMINIO */
    public static get CONDOMINIO_BITACORA(): string { return '/api/condominio/bitacora'; }
    public static get CONFIG_CONDOMINIO(): string { return '/api/config'; }
    public static get CONFIG_CONDOMINIO_EDITAR(): string { return '/api/config'; }
    public static get CONDOMINIO_MENSAJES(): string { return '/api/condominio/mensaje'; }
    public static get CONDOMINIO_AVISOS(): string { return '/api/condominio/aviso'; }
    public static get CONDOMINIO_AVISO_AGREGAR(): string { return '/api/condominio/aviso'; }
}
