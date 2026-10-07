/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Clave pública de Web3Forms. Sin ella, el formulario abre el cliente de correo (mailto). */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
