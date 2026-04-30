# Guia de Instalação - Evolution API (WhatsApp)

## O que é a Evolution API?

A Evolution API é uma solução **open source** e **gratuita** para enviar mensagens via WhatsApp sem precisar de verificação da Meta. Ela funciona emulando o WhatsApp Web.

## Opções de Instalação

### Opção 1: Railway (Recomendada - Mais fácil)

1. Acesse https://railway.app
2. Crie uma conta (pode usar GitHub)
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Procure por `Evolution-API/evolution-api` ou use o template
6. Clique em **Deploy**
7. Após o deploy, vá em **Variables** e adicione:
   - `AUTHENTICATION_API_KEY` = uma senha forte (ex: `aruanda2025!@#`)
   - `AUTHENTICATION_TYPE` = `apikey`
8. Copie a **URL do deploy** (ex: `https://evolution-api-seu-projeto.up.railway.app`)

### Opção 2: Render (Alternativa)

1. Acesse https://render.com
2. Crie uma conta
3. Clique em **"New Web Service"**
4. Conecte com GitHub e use o repo `Evolution-API/evolution-api`
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Adicione Environment Variables:
   - `AUTHENTICATION_API_KEY` = senha forte
   - `AUTHENTICATION_TYPE` = `apikey`
7. Deploy

### Opção 3: Docker Local (Para testes)

```bash
# Instale o Docker primeiro: https://docs.docker.com/get-docker/

# Rode o container
docker run -d \
  --name evolution-api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=sua-senha-forte \
  -e AUTHENTICATION_TYPE=apikey \
  atendai/evolution-api:latest

# Acesse: http://localhost:8080
```

## Configuração da Instância

Após o deploy:

1. Acesse a URL do seu Evolution API (ex: `https://evolution-api-seu-projeto.up.railway.app`)
2. No Vercel, adicione as variáveis de ambiente:
   - `EVOLUTION_API_URL` = URL do deploy (ex: `https://evolution-api-seu-projeto.up.railway.app`)
   - `EVOLUTION_API_KEY` = senha que você definiu em `AUTHENTICATION_API_KEY`
   - `EVOLUTION_INSTANCE` = `casa-aruanda`
3. Reinicie o deploy no Vercel

## Conectando o WhatsApp

1. Acesse a URL do Evolution API + `/manager`
   - Ex: `https://evolution-api-seu-projeto.up.railway.app/manager`
2. Crie uma instância com nome `casa-aruanda`
3. Escaneie o QR Code com o celular (use o número do WhatsApp da casa)
4. Pronto! O WhatsApp está conectado

## Testando

Quando sortear uma rifa no admin, o ganhador receberá mensagem automática no WhatsApp:

```
🎉 Parabéns [Nome]! 🎉

Você foi o ganhador(a) da rifa "[Título]" com o número [001]!

Entre em contato com a Casa de Umbanda Aruanda para retirar seu prêmio.

📞 (11) 99214-3492
```

## Links Úteis

- Documentação oficial: https://doc.evolution-api.com
- GitHub: https://github.com/Evolution-API/evolution-api
- Comunidade no WhatsApp: disponível no GitHub

## Observações

- O número do WhatsApp deve estar sempre online (celular conectado à internet)
- Não use o WhatsApp pessoal — crie um número exclusivo para a casa
- A Evolution API é gratuita e open source
- Funciona com grupos, imagens, áudios, etc.
