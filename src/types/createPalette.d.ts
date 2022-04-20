import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    background: {
        primary: string,
        secondary: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
        primary?: string,
        secondary?: string
    }
  }
}
