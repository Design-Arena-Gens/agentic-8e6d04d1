## n8n YouTube Automation Studio

A Next.js dashboard that composes YouTube video prompts, narration scripts, and voice direction, then relays the payload to an n8n workflow for end-to-end automation (LLM → text-to-speech → AI video → distribution).

### Local development

```bash
npm install
npm run dev
```

Optional `.env.local`:

```bash
N8N_WEBHOOK_URL=https://your-n8n-host/webhook/youtube-ai-automation
```

### Production build

```bash
npm install
npm run build
```

### Deploy to Vercel

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-8e6d04d1
```

After deploying, create the `N8N_WEBHOOK_URL` environment variable in Vercel (Project Settings → Environment Variables) and redeploy or trigger a new build.

### n8n workflow

Import `n8n/workflow-youtube-ai.json` into your n8n instance. Connect credentials for OpenAI (or preferred LLM), ElevenLabs (or other TTS provider), Runway/Pika/Sora (video generation), Google Drive (or storage), and Slack (notifications). The workflow consumes the JSON payload produced by this app via the Webhook Trigger node.
