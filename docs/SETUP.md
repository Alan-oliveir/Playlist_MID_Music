# 📖 Guia de Configuração - Playlist MID Music

Este guia contém instruções detalhadas para rodar o projeto localmente e personalizar com suas próprias músicas.

## 🚀 Como Rodar o Projeto Localmente

### ⚠️ Por que usar um servidor HTTP?
Navegadores modernos bloqueiam o carregamento de arquivos locais por questões de segurança (política CORS). Por isso, é recomendado usar um servidor HTTP local.

### Método 1: Python (Mais Comum)
```bash
# Python 3
python -m http.server 8000

# Python 2  
python -m SimpleHTTPServer 8000
```
Acesse: `http://localhost:8000`

### Método 2: Node.js
```bash
# Instalar o serve globalmente
npm install -g serve

# Rodar o servidor
serve .
```

### Método 3: PHP
```bash
php -S localhost:8000
```

### Método 4: Extensões do VS Code
- **Live Server** - Clique direito no `index.html` → "Open with Live Server"
- **Preview on Web Server** - Similar ao Live Server

## 🎵 Personalizando com Suas Músicas

### 📁 Estrutura de Arquivos
```
projeto/
├── index.html
├── style.css  
├── script.js
├── songs/                    ← Seus arquivos de música
│   ├── bohemian_rhapsody.mp3
│   ├── imagine.mp3
│   └── hotel_california.mp3
├── images/                   ← Capas das músicas
│   ├── bohemian_rhapsody.webp
│   ├── imagine.webp  
│   └── hotel_california.webp
└── docs/
    └── SETUP.md
```

### 🎼 Formatos Suportados

**Áudio:**
- `.mp3` (recomendado)
- `.ogg`
- `.wav` 
- `.m4a`

**Imagens:**
- `.webp` (recomendado - menor tamanho)
- `.jpg` / `.jpeg`
- `.png`

### ⚙️ Configuração no Código

1. **Abra o arquivo `script.js`**
2. **Localize o objeto `playlistData`** (próximo ao início do arquivo)
3. **Substitua pelas suas músicas:**

```javascript
const playlistData = {
  bohemianRhapsody: {
    songName: "Bohemian Rhapsody",
    artist: "Queen",
    file: "bohemian_rhapsody",  // Nome do arquivo SEM extensão
    liked: false,
  },
  imagine: {
    songName: "Imagine", 
    artist: "John Lennon",
    file: "imagine",
    liked: false,
  },
  hotelCalifornia: {
    songName: "Hotel California",
    artist: "Eagles", 
    file: "hotel_california",
    liked: false,
  },
  // Adicione quantas quiser...
};
```

### 📝 Passo a Passo Completo

#### 1. Preparar os Arquivos
- Coloque suas músicas na pasta `songs/`
- Coloque as capas na pasta `images/`
- **Importante:** Use o mesmo nome para música e capa (ex: `musica.mp3` e `musica.webp`)

#### 2. Nomear Corretamente
- ❌ **Evite:** espaços, acentos, caracteres especiais
- ✅ **Use:** underscore `_` ou hífen `-`
- ✅ **Exemplos bons:** `bohemian_rhapsody.mp3`, `hotel-california.mp3`

#### 3. Configurar no JavaScript
Para cada música, adicione um objeto no `playlistData`:
- **`songName:`** Nome que aparece no player
- **`artist:`** Nome do artista
- **`file:`** Nome do arquivo SEM a extensão
- **`liked:`** Sempre comece com `false`

#### 4. Testar
- Rode o servidor HTTP
- Verifique se as músicas carregam
- Teste todos os controles

### 🔧 Dicas e Soluções de Problemas

#### Música não carrega?
- ✅ Confira se o nome no `file:` está igual ao arquivo físico
- ✅ Verifique se o arquivo está na pasta `songs/`
- ✅ Teste com um arquivo `.mp3` simples primeiro

#### Capa não aparece?
- ✅ Confira se a imagem está na pasta `images/`
- ✅ Verifique se o nome da imagem é igual ao campo `file:`
- ✅ Teste com formato `.jpg` se `.webp` não funcionar

#### Player não abre?
- ✅ Use um servidor HTTP local
- ✅ Confira se não há erros no console do navegador (F12)

### 🎨 Personalizações Extras

#### Trocar Cores
Edite o arquivo `style.css` e procure pelas variáveis CSS no `:root`:
```css
:root {
  --primary-color: #1db954;    /* Verde do Spotify */
  --background-color: #121212; /* Fundo escuro */
  --text-color: #ffffff;       /* Texto branco */
}
```

#### Adicionar Mais Funcionalidades
Algumas ideias para expandir:
- Volume control
- Playlist salvas
- Visualizador de áudio
- Modo escuro/claro
- Busca de músicas

## 🐛 Solução de Problemas Comuns

| Problema | Solução |
|----------|---------|
| "Access blocked by CORS policy" | Use servidor HTTP local |
| Música não carrega | Verifique nome do arquivo e extensão |
| Capa não aparece | Confirme nome da imagem igual ao `file:` |
| Player não responde | Abra console (F12) e veja erros |

## 💡 Dicas Profissionais

1. **Backup:** Sempre faça backup do `script.js` original
2. **Organização:** Mantenha uma planilha com nome das músicas e arquivos
3. **Performance:** Use `.webp` para imagens (menor tamanho)
4. **Testes:** Teste sempre após adicionar novas músicas
5. **Versionamento:** Use Git para versionar suas mudanças

---

**🆘 Precisa de ajuda?** Abra uma issue no repositório com detalhes do problema!
