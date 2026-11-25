/* Configuração do Tailwind do demo Rumba Bar (mesmas cores e fonte que a página usava pela CDN).
   O CSS gerado (tailwind.css) fica dentro do projeto: a página não depende mais do cdn.tailwindcss.com.
   Para regenerar tailwind.css depois de mudar classes no index.html (rode na raiz do repositório):
   npx tailwindcss@3.4.17 -c demo-rumba-bar/tailwind.config.js -i demo-rumba-bar/tailwind.src.css -o demo-rumba-bar/tailwind.css --minify
   Depois, troque o ?v= do <link> do tailwind.css no index.html para o navegador baixar a versão nova. */
module.exports = {
  /* relative:true → o caminho abaixo é relativo a esta pasta, de onde quer que o comando seja rodado.
     O index.html inclui o <script> que monta os cards do cardápio, então as classes de lá também entram. */
  content: { relative: true, files: ['./index.html'] },
  theme: {
    extend: {
      /* grafite2 = cartões de vidro fosco (translúcidos; o desfoque está no styles.css) */
      colors: { grafite: '#16161A', grafite2: 'rgba(22,22,26,.42)', ouro: '#F2B441', creme: '#F3EDE2', zap: '#25D366', ambar: '#FCA001', verm: '#B70223' },
      fontFamily: { sans: ['Montserrat', 'Arial', 'sans-serif'] }
    }
  }
};
