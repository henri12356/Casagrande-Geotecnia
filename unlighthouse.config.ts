import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'https://www.casagrandegeotecnia.com.pe',
  scanner: {
    device: 'desktop',   // 👈 fuerza escritorio SIEMPRE
    throttle: false,
  },
})
