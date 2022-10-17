/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: false,

  darkMode: 'class', // or 'media' or 'class'

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
      '4xl': '2500px',
      '5xl': '3000px'
    },

    colors: {
      currentColor: 'currentColor',
      transparent: 'transparent',

      white: '#FFFFFF',
      black: '#000000',

      'tradewind': '#60BCB5',
      'mint-chiffon': '#E4FBF1',
      'shallow-end': '#C7F7E7',
      'oasis-stream': '#a5ead8',
      'riptide': '#88D6C9',
      'downy': '#6DD3C9',
      'bianchi-green': '#3AD1C6',
      'aqua-fresco': '#46A0A1',
      'sea-swimmer': '#307E88',
      'deep-blue-sea': '#1E5D6E',
      'sultans-silk': '#12455A',
      'blue-bayberry': '#2D5162',
      'pickled-bluewood': '#283F4B',
      'azure-tide': '#299D95',
      'kuroi-black': '#0E131A',
      'bunker': '#161D22',
      'mirage': '#1A2B34',
      'dark-slate-blue': '#204C61',
      'sailors-coat': '#324B56',
      'berry-blue': '#316279',
      'bering-wave': '#3C6C83',
      'dark-void': '#151619',
      'architecture-grey': '#6A6A6A',
      'georgian-bay': '#215F7C',
      'keppel': '#47A79F',
      'after-dark': '#3F3535',
      'let-it-snow': '#D5F2F2',
      'stone-silver': '#88A8B0',
      'gull-gray': '#929CB2',
      'zircon': '#F6F9FF',
      'blue-haze': '#B9C0D7',
      'botticelli': '#DADFEC',
      'periwinkle-gray': '#D4DBEC',
      'catskill-white': '#E7EAF3',
      'distant-horizon': '#F0F8F8',
      'white-lilac': '#F3F4FA',
      'milky-way': '#E8F5F4',
      'glacier-bay': '#E0F2F0',
      'rivers-edge': '#AADAD6',
      'smooth-satin': '#A2D7D3',
      'fountain-city': '#9AD3CF',
      'artesian-well': '#5FB2AC',
      'paradise-island': '#5AA9A3',
      'cold-north': '#55A09A',
      'lacrosse': '#325E5A',
      'hidden-depths': '#2D5552',
      'june-bug': '#284B48',
      'nile-blue': '#19414B',
      'blue-syzygy': '#1E4557',
      'william': '#356268',
      'puerto-rico': '#42C0B7',
      'aquamarine-blue': '#76D4E3',
      'bright-turquoise': '#32DAF5',
      'eastern-blue': '#14A0B7',
      'astral': '#378C9C',
      'blue-chill': '#0B8CA1',
      'gable-green': '#1A2E37',
      'ball-blue': '#25B4CB',
      'turquoise-chalk': '#68E7DD',
      'abyssal-anchorfish-blue': '#162730',
      'icy-wind': '#D5F2F0',
      'true-lavender': '#8482D2',
      'spring-bouquet': '#6DD38A',
      'cold-heights': '#32DAF5',
      'cold-blue': '#83E1E1',
      'cashmere-blue': '#A6B8CF',
      'alexandria': '#FF8C73',
      'miami-marmalade': '#F7931A',
      'hidden-sea-glass': '#6AD0C8',
      'deep-aquamarine': '#76D5E3',
      'indigo-iron': '#37404C',
      'kentucky-blue': '#A3B5CB',
      'medieval': '#6E6CB0',
      'industrial-gray': '#727373',
      'light-steel-blue': '#ADC2DE',
      'himalaya-sky': '#7595C5',
      'whiteout': '#FBFBFB',
      'chicory-flower': '#63799A',
      'soaring-eagle': '#9AABC1',
      'industrial-revolution': '#727373',
      'bluster-blue': '#4A5B72',
      'oh-boy': '#B9D4F9',
      'heavy-metal-armor': '#888B8F',
      'blair': '#A2BEE3',
      'scarabaeus-sacer': '#414141',
      'namara-grey': '#7B7B7B',
      'hard-coal': '#656565',
      'sargasso-sea': '#354358',
      'misty-mountains': '#BFCFE5',
      'faded-lilac': '#8FA1BA',
      'shadow-blue': '#798AA3',
      'beguiling-blue': '#5C708B',
      'bel-air-blue': '#7E9ABF',
      'blue-heeler': '#949CA8',
      'seal-blue': '#485465',
      'british-shorthair': '#5E6774',
      'cowgirl-blue': '#6F86A9',
      'promise-keeping': '#ACC5EA',
      'pool-blue': '#68BDB6',
      'identity': '#788EAB',
      'noghrei-silver': '#BDBDBD',
      'brisk-blue': '#6C819D',
      'moon-white': '#E8F2FF',
      'aerial-view': '#A1B2CA',
      'cypress-grey-blue': '#6B7787',
      'cotton-ball': '#F2F6FC',
      'rushing-river': '#627895',
      'searching-blue': '#6B7F9A',
      'peachy-pinky': '#FF7664',
      'emerald-succulent': '#56ABA4',
      'compact-disc-grey': '#CDCDCD',
      'downy-second': '#6DD3CA',
      'frostbite': '#AFFCF5',
      'passionate-blueberry': '#344257',
      'skylar': '#66CBC3',
      'apocyan': '#9CC6FF',
      'anchors-aweign': '#293342',
      'emptiness': '#FCFCFC',
      'kettleman': '#616161',
      'placebo-blue': '#ECF4FF',
      'empire-state-grey': '#D9DADE',
      'crow-black': '#273242',
      'waterhen-back': '#313F52',
      'copen-blue': '#546986',
      'desired-dawn': '#D8D8D8',
      'silver': '#BFBFBF',
      'willow-blue': '#2A3647',
      'midnight-mosaic': '#3F516A',
      'maui-mist': '#EFF1F5',
      'calico-dress': '#3d4f66',
      'crushed-ice': '#C7FBF7',
      'cotton-boll': '#E6F1FF',
      'ice-berge': '#DCE4EE',
      'icecold-stare': '#B7D2FC',
      'dark': '#1D2530',
      'cotton-ball-second': '#F0F5FC',
      'toxic-sludge': '#00ba34',
      'artful-red': '#b10000',
      'fiery-coral': '#E05B5B',
      'brazilianite': '#3AC748',
      'fly-a-kite': '#C9DBF3',
      'frostbite-second': '#A5FFF8',
      'boundless': '#5A6C84',
      'belair-blue': '#829DC2',
      'columbus': '#5F748F',
      'dockside': '#9AB0CD',
      'surf-green': '#407672',
      'brainstem-grey': '#B5B5B5',
      'bel-air-blue-second': '#829DC2',
      'crispy-samosa': '#FFBB64',
      'seascape-blue': '#A7B9D0',
      'bubble-turquoise': '#427E7E',
      'biscay': '#303D51',
      'blueberry-dream': '#586B86',
      'light-pale-lilac': '#CDD6E4',
      'blue-party-parrot': '#7F86FF',
      'pale-blue': '#D1FFFB',
      'fly-a-kite-second': '#C2D8F5',
      'xmarks-the-spot': '#EA4B4B',
      'salmon-upstream': '#FFA6A6',
      'boring-green': '#5EB55D',
      'bermuda-grass': '#6AC068',
      'horror-snob': '#D94C4C',
      'windsurf-blue': '#7089AA',
      'electronic': '#536A88',
      'crow-black-second': '#253142',
      'rushing-river-second': '#5F7696',
      'tugce-silver': '#CCDBF2',
      'azureish-white': '#d9e5f5',
      'wizard-white': '#E2EEFF',
      'black-river-falls': '#334054',
      'american-green': '#32BF2F',
      'mulgore-mustard': '#BFB12F',
      'chambray': '#485B77',
      'cloudless': '#D7E7FC',
      'coconut-white': '#E7EDF5',
      'lucid-blue': '#7D8CA0',
      'amazon-parrot': '#90E367',
      'frills': '#90A6C2',
      'blue-thistle': '#AEC0D8',
      'into-the-stratosphere': '#40526B',
      'inkjet': '#41536D',
      'golden-poppy': '#FCC201',
      'pan-tostado': '#E6BF99',
      'port-gore': '#384469',
      'bluish-purple-anemone': '#636BC5',
      'stoic-white': '#E2E1FF',
      'cool-air-of-debonair': '#2A384C',
      'foam-green': '#95FDA8',
      'pochard-duck-head': '#EF967A',
      'bachelor-button': '#47C1D4',

      green: {
        100: '#84EB4F',
        200: '#60C630',
        300: '#479D1E',
        400: '#3B8813'
      },

      orange: {
        100: '#F5C365',
        200: '#F8B53A',
        300: '#E79E1A',
        400: '#CC8E1B'
      },

      red: {
        100: '#FF806C',
        200: '#ED6651',
        300: '#F34B31',
        400: '#FF3122'
      },

      blue: {
        100: '#60C4FF',
        200: '#45AFEC',
        300: '#1193DE',
        400: '#128CD2'
      }
    },

    spacing: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      28: '28px',
      30: '30px',
      32: '32px',
      34: '34px',
      36: '36px',
      40: '40px',
      45: '45px',
      50: '50px',
      60: '60px',
      70: '70px',
      75: '75px',
      80: '80px',
      300: '300px',
      335: '335px',
      368: '368px',
      375: '375px',
      500: '500px',
      550: '550px',
      600: '600px',
      800: '800px'
    },

    animation: {},

    backgroundColor: theme => theme('colors'),

    backgroundOpacity: {
      '10': '0.1',
      '20': '0.2',
      '30': '0.3',
      '40': '0.4',
      '50': '0.5',
      '60': '0.6',
      '70': '0.7',
      '100': '1'
    },

    linearGradientColors: (theme) => ({
      ...theme('colors'),
      10: ['#6ED4CA 0%', '#27ADC5 100%'],
      20: ['#105A6C 0%', '#5BC5C8 100%'],
      30: ['rgba(110, 212, 202, 0.1) 0%', 'rgba(36, 129, 155, 0.3)  100%'],
      40: ['#27ADC5 0%', '#FFFFFF 100%']
    }),

    textOpacity: {
      '10': '0.1',
      '30': '0.3',
      '50': '0.5',
      '60': '0.6',
      '100': '100'
    },

    borderColor: theme => theme('colors'),

    borderOpacity: {
      '10': '0.1',
      '20': '0.2',
      '50': '0.5',
      '60': '0.6'
    },

    borderRadius: {
      DEFAULT: '2px',
      sm: '5px',
      sm1: '6px',
      md: '8px',
      lg: '10px',
      xlg: '12px',
      xl: '15px',
      xl1: '20px',
      full: '9999px',
      none: '0'
    },

    borderWidth: {
      DEFAULT: '1px',
      '2': '2px',
      '3': '3px',
      '0': '0'
    },

    boxShadow: {
      DEFAULT: '0px 10px 15px rgba(0, 0, 0, 0.12)',
      sm: '0px 2px 15px rgba(21, 26, 48, 0.4)',
      100: '0px 12px 27px rgba(0, 0, 0, 0.25), 0px 28px 42px rgba(0, 0, 0, 0.08)',
      200: '0px 10px 15px rgba(0, 0, 0, 0.12)',
      300: '0px 28px 42px rgba(0, 0, 0, 0.08)',
      400: '0px 10px 15px #D5DFEB',
      500: '0px 10px 24px #293444',
      600: '0px 12px 27px rgba(0, 0, 0, 0.25)',
      700: 'inset 0px 7px 15px rgba(0, 0, 0, 0.14)',
      800: 'inset 0px 6px 15px rgba(0, 0, 0, 0.1)',
      none: 'none'
    },

    divideColor: theme => theme('colors'),

    divideOpacity: {
      '10': '0.1',
      '20': '0.2'
    },

    divideWidth: {
      DEFAULT: '1px',
      '0': '0'
    },

    fontFamily: {
      base: ['Montserrat', ...defaultTheme.fontFamily.sans],
      'luckiest-guy': ['Luckiest Guy', ...defaultTheme.fontFamily.sans]
    },

    fontSize: {
      xs: '0.6666666666666666rem', // 10px
      sm: '0.8rem', // 12px
      base: '1rem', // 15px
      md2: '1.133333333333333rem', // 17px
      md: '1.2rem', // 18px
      lg: '1.3333333333333333rem', // 20px
      xl: '1.4666666666666666rem', // 22px
      '2xl': '1.6666666666666rem', // 25px
      '3xl': '1.8rem', // 27px
      '4xl': '2rem', // 30px
      '5xl': '2.3333333333333rem', // 35px
      '6xl': '2.93333333333333rem' // 44px
    },

    lineHeight: {
      normal: 'normal',
      1: '1'
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },

    letterSpacing: {
      tightest: '1.5px'
    },

    height: theme => ({
      ...theme('spacing'),
      auto: 'auto',
      full: '100%',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/5': '40%',
      '3/5': '60%',
      fit: 'fit-content'
    }),

    width: theme => ({
      ...theme('spacing'),
      auto: 'auto',
      full: '100%',
      fit: 'fit-content',
      '1/6': '16.666667%',
      '1/5': '20%',
      '3/10': '30%',
      '1/3': '33.333333%',
      '2/5': '40%',
      '1/2': '50%',
      '3/5': '60%',
      '7/10': '70%',
      '4/5': '80%'
    }),

    margin: (theme, { negative }) => ({
      ...theme('spacing'),
      ...negative(theme('spacing')),
      auto: 'auto'
    }),

    maxHeight: theme => ({
      ...theme('spacing'),
      full: '100%'
    }),

    maxWidth: theme => ({
      ...theme('spacing'),
      full: '100%'
    }),

    minHeight: theme => ({
      ...theme('spacing'),
      full: '100%',
      auto: 'auto'
    }),

    minWidth: theme => ({
      ...theme('spacing'),
      full: '100%',
      auto: 'auto'
    }),

    opacity: {
      0: '0',
      20: '0.2',
      30: '0.3',
      40: '0.4',
      50: '0.5',
      70: '0.7',
      100: '1'
    },

    padding: theme => theme('spacing'),

    placeholderColor: (theme) => theme('colors'),

    placeholderOpacity: {
      '10': '0.1'
    },

    textColor: (theme) => theme('colors'),

    zIndex: {
      0: '0',
      1: '1',
      2: '2',
      10: '10',
      20: '20',
      99: '99', // #loader
      100: '100', // #modals teleport
      999: '999'
    },

    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
      'copy': 'copy'
    },

    lineClamp: {
      1: 1
    },

    // Extended
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
      },

      animation: {
        wiggle: 'wiggle 0.4s cubic-bezier(.36,.07,.19,.97) both'
      },

      keyframes: {
        wiggle: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(5px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-10px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(8px, 0, 0)' }
        }
      },

      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6'
      }
    }
  },

  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'hover',
    'focus',
    'focus-within',
    'focus-visible',
    'active',
    'group-disabled', // Custom variant
    'disabled'
  ],

  variants: {
    extend: {
      backgroundColor: ['responsive', 'focus-within', 'hover', 'focus', 'active'],
      textColor: ['responsive', 'hover', 'focus', 'active'],
      borderColor: ['responsive', 'hover', 'focus', 'active'],
      borderStyle: ['responsive', 'last'],
      borderWidth: ['responsive', 'last'],
      backgroundOpacity: ['responsive', 'hover', 'focus', 'active'],
      textOpacity: ['responsive', 'hover', 'focus', 'active'],
      margin: ['responsive', 'first', 'last'],
      padding: ['responsive', 'first', 'last'],
      lineClamp: ['responsive'],
      translate: ['active', 'group-hover']
    }
  },

  plugins: [require('@tailwindcss/line-clamp')]
}
