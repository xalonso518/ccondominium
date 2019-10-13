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
    public static get CONFIG_CONDOMINIO(): string { return '/api/config'; }

    /* Usuarios */
    public static get USUARIOS_GET(): string { return '/api/usuario/list'; }
    public static get USUARIO_GET(): string { return '/api/usuario'; }
    public static get USUARIO_AGREGAR(): string { return '/api/usuario'; }
    public static get USUARIO_EDITAR(): string { return '/api/usuario'; }
    public static get USUARIO_ELIMINAR(): string { return '/api/usuario'; }
    public static get USUARIO_CAMBIO_ESTADO(): string { return '/api/usuario/estado'; }
    public static get USUARIO_ENVIAR_INVITACION(): string { return '/api/usuario/invitacion'; }
    public static get USUARIO_ENVIAR_MENSAJE(): string { return '/api/usuario/mensaje'; }
}