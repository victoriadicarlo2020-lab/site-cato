/* Configuração do Tailwind da Home da Cato Mídias.
   Para regenerar styles.css depois de mudar classes no index.html ou no script.js:
   npx tailwindcss@3.4.17 -i styles.src.css -o styles.css */
module.exports = {
  content: ['./index.html', './script.js'],
  theme: {
    extend: {
      colors: { ambar: '#FCA001', verm: '#B70223', off: '#F9FAFE', quase: '#151515' },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
        display: ['Lot', 'Montserrat', 'Arial', 'sans-serif']
      }
    }
  }
};
