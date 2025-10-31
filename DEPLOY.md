# 🚀 Guía de Despliegue en Vercel

## Método 1: Desde GitHub (Recomendado)

### Paso 1: Subir a GitHub

1. **Inicializa Git** (si no está inicializado):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portafolio LuisDev"
   ```

2. **Crea un repositorio en GitHub**:
   - Ve a [github.com](https://github.com)
   - Haz clic en "New repository"
   - Nombra el repositorio (ej: `PortafolioLuisDev`)
   - NO inicialices con README, .gitignore o licencia
   - Haz clic en "Create repository"

3. **Conecta tu repositorio local con GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```

### Paso 2: Desplegar en Vercel

1. **Ve a Vercel**:
   - Visita [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importa el proyecto**:
   - Haz clic en "Add New Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Astro

3. **Configuración del proyecto**:
   - **Framework Preset:** Astro (automático)
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `dist` (automático)
   - **Install Command:** `npm install` (automático)

4. **Deploy**:
   - Haz clic en "Deploy"
   - Espera 1-2 minutos
   - ¡Listo! Tu portafolio estará en línea

---

## Método 2: Con Vercel CLI

### Instalación

```bash
npm install -g vercel
```

### Desplegar

1. **Inicia sesión en Vercel**:
   ```bash
   vercel login
   ```

2. **Despliega el proyecto**:
   ```bash
   vercel
   ```
   
   Sigue las instrucciones:
   - ¿Estás listo para desplegar?: **Yes**
   - ¿Qué nombre quieres para tu proyecto?: **portafolio-luisdev** (o el que prefieras)
   - ¿En qué directorio está tu código?: **./** (actual)
   - ¿Quieres sobrescribir la configuración?: **No**

3. **Para producción**:
   ```bash
   vercel --prod
   ```

---

## Método 3: Integración continua (CI/CD)

Una vez conectado con GitHub, cada push a la rama `main` desplegará automáticamente una nueva versión.

### Agregar dominio personalizado (Opcional)

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones

---

## ⚙️ Configuración Recomendada

### Variables de Entorno

Si necesitas variables de entorno, agrégalas en:
- Vercel Dashboard → Settings → Environment Variables

### Configuración de Build

Vercel detecta automáticamente Astro, pero puedes crear `vercel.json` para configuración personalizada:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

## 🔍 Verificación Post-Deploy

Después del despliegue, verifica:

- [ ] ✅ El sitio carga correctamente
- [ ] ✅ Todos los enlaces funcionan
- [ ] ✅ Las imágenes se cargan
- [ ] ✅ El diseño responsivo funciona
- [ ] ✅ Los formularios funcionan (si aplica)
- [ ] ✅ Las animaciones se reproducen correctamente

---

## 📊 Monitoreo

Vercel proporciona:
- Analytics de visitas
- Logs de rendimiento
- Errores en tiempo real
- Preview deployments para cada PR

---

## 🆘 Solución de Problemas

### Error: "Build failed"

1. Verifica que `npm run build` funcione localmente
2. Revisa los logs en Vercel Dashboard
3. Asegúrate de que todas las dependencias estén en `package.json`

### Error: "Page not found"

1. Verifica que la ruta base esté configurada correctamente
2. Asegúrate de que existe `src/pages/index.astro`

### Error: "Styles not loading"

1. Verifica que Tailwind CSS esté configurado correctamente
2. Asegúrate de que `src/styles/global.css` esté importado

---

## 📚 Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Vercel](https://vercel.com/docs)
- [Deploying Astro to Vercel](https://docs.astro.build/en/guides/deploy/vercel/)

---

¿Necesitas ayuda? Contáctame:
- Email: luisoro009@gmail.com
- GitHub: [@Luisr26](https://github.com/Luisr26)

