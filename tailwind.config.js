// Builds /site.css (committed; GitHub Pages has no build step).
// Rebuild after changing classes in any page or site.js:
//   npx tailwindcss@3.4 -c tailwind.config.js -o site.css --minify

// Material 3 dark tonal palette, seeded from Telegram blue
module.exports = {
    content: ['./*.html', './site.js'],
    theme: {
        extend: {
            fontFamily: { sans: ['"Roboto Flex"', 'system-ui', 'sans-serif'] },
            colors: {
                md: {
                    primary: '#8ecdff',
                    'on-primary': '#00344e',
                    'primary-container': '#004b6f',
                    'on-primary-container': '#c9e6ff',
                    'secondary-container': '#344956',
                    'on-secondary-container': '#cfe5f5',
                    tertiary: '#ffb951',
                    'tertiary-container': '#5c4200',
                    'on-tertiary-container': '#ffdeac',
                    surface: '#0f1418',
                    'surface-lowest': '#0a0f12',
                    'surface-low': '#171c20',
                    'surface-container': '#1b2024',
                    'surface-high': '#252b2f',
                    'surface-highest': '#30363a',
                    'on-surface': '#dee3e8',
                    'on-surface-variant': '#c0c7cf',
                    outline: '#8a9199',
                    'outline-variant': '#40484f'
                },
                telegram: '#229ED9'
            },
            boxShadow: {
                e1: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
                e2: '0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)',
                e3: '0 4px 8px 3px rgba(0,0,0,.15), 0 1px 3px rgba(0,0,0,.3)'
            }
        }
    }
};
