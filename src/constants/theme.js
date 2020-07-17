const color = {
    black: '#212121',

    greyDarkest: '#24242',
    greyDarker: '#707070',
    greyDark: '#8E8E93',
    grey: '#9e9e9e',
    greyLight: '#bdbdbd',
    greyLighter: '#F5F5F5',
    greyLightest: '#eeeeee',

    white: '#fff',

    redDarkest: '#b71c1c',
    redDarker: '#c62828',
    redDark: '#d32f2f',
    red: '#f44336',
    redLight: '#ef5350',
    redLighter: '#e57373',
    redLightest: '#ef9a9a',

    blueDarkest: '#0d47a1',
    blueDarker: '#1565c0',
    blueDark: '#1976d2',
    blue: '#2196f3',
    blueLight: '#42a5f5',
    blueLighter: '#64b5f6',
    blueLightest: '#90caf9',

    purpleDarkest: '#4a148c',
    purpleDarker: '#6a1b9a',
    purpleDark: '#7b1fa2',
    purple: '#9c27b0',
    purpleLight: '#ab47bc',
    purpleLighter: '#ba68c8',
    purpleLightest: '#ce93d8',

    greenDarkest: '#1b5e20',
    greenDarker: '#2e7d32',
    greenDark: '#388e3c',
    green: '#42B029',
    greenLight: '#66bb6a',
    greenLighter: '#81c784',
    greenLightest: '#a5d6a7',

    googleGreen: '#33A853',
    facebookBlue: '#4D6FA9',

    peepBlue: '#53C7FC',
};

const theme = {
    text: {
        size: {
            xs: 10,
            sm: 14,
            base: 16,
            md: 18,
            lg: 20,
            xl: 24,
            '2xl': 32,
        },
        weight: {
            light: '200',
            normal: '400',
            bold: '700',
        },
        spacing: {
            tight: 0.8,
            normal: 1,
            wide: 1.5,
        },
        lineHeight: {
            none: 1,
            tight: 1.25,
            normal: 1.5,
            large: 2,
        },
        fonts: {
            base: null,
        },
    },
    color,
    space: {
        '2xs': 6,
        xs: 8,
        sm: 16,
        md: 24,
        lg: 36,
        xl: 40,
    },
    radius: {
        '2xs': 3,
        xs: 6,
        sm: 10,
        base: 14,
        lg: 20,
        xl: 30,
    },
    opacity: {
        none: 0,
        low: 0.3,
        demi: 0.5,
        high: 0.8,
        base: 1,
    },
    shadows: [
        {
            shadowColor: color.black,
            shadowOffset: {
                width: 0,
                height: -1,
            },
            shadowOpacity: 0.16,
            shadowRadius: 4,
        },
        {
            shadowColor: color.black,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.6,
            shadowRadius: 5,
        },
    ],
    borders: [
        {
            borderWidth: 1,
            borderColor: color.black,
        },
        {
            borderWidth: 2,
            borderColor: color.black,
        },
        {
            borderWidth: 5,
            borderColor: color.black,
        },
    ],
    button: {
        disabled: {
            opacity: 0.5,
        },
    },
};

export { theme };
