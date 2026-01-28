import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme = {
  dark: true,
  colors: {
    background: '#050816',
    surface: '#0f172a',
    'surface-variant': '#1f2937',
    primary: '#22d3ee',
    'primary-darken-1': '#06b6d4',
    secondary: '#a855f7',
    'secondary-darken-1': '#7c3aed',
    error: '#f97373',
    info: '#38bdf8',
    success: '#4ade80',
    warning: '#facc15',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme,
    },
  },
  defaults: {
    VCard: {
      rounded: 'xl',
      elevation: 6,
    },
    VBtn: {
      rounded: 'lg',
      elevation: 0,
      ripple: true,
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
    },
    VTextarea: {
      density: 'comfortable',
      variant: 'outlined',
    },
    VSheet: {
      rounded: 'lg',
    },
    VNavigationDrawer: {
      rounded: 'xl',
      elevation: 8,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
})
