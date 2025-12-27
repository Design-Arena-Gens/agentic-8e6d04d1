import AutomationForm from "@/components/automation-form";
import WorkflowBlueprint from "@/components/workflow-blueprint";

const highlights = [
  {
    title: "AI-native prompt builder",
    description:
      "Craft structured prompts tailored for LLM, TTS, and video generation nodes with one click."
  },
  {
    title: "n8n ready webhook payloads",
    description:
      "Copy the JSON output directly into your Webhook Trigger node. No mapping gymnastics."
  },
  {
    title: "Production-safe fallbacks",
    description:
      "Even without an active n8n instance, the local generator simulates prompts for rapid prototyping."
  }
];

export default function Home() {
  return (
    <main className="space-y-16 px-4 py-16 sm:px-8 md:px-14 lg:px-20">
      <section className="space-y-8 rounded-3xl border border-white/10 bg-gradient-to-br from-night via-horizon to-night p-12 shadow-2xl shadow-black/40">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-aurora/40 bg-aurora/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-aurora/90">
            YouTube Automation · n8n
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Launch an AI writing room for your YouTube channel
          </h1>
          <p className="text-lg text-slate-300">
            Design prompts, scripts, and voice direction in minutes. Pipe the
            payload into n8n to coordinate LLM scripting, text-to-speech, and
            AI video generation—ready to deploy on autopilot.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
              Works with OpenAI, Claude, Gemini
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
              Compatible with ElevenLabs, Azure TTS
            </span>
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
              Plug into Runway, Pika, Sora, LTX
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 shadow-lg shadow-black/30"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <AutomationForm />
      <WorkflowBlueprint />

      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-sm text-slate-200 shadow-xl shadow-black/30">
        <h2 className="text-2xl font-semibold text-white">
          Deploy the workflow in n8n
        </h2>
        <ol className="list-decimal space-y-3 pl-4">
          <li>
            Import <code>n8n/workflow-youtube-ai.json</code> into your n8n
            instance and connect your credentials.
          </li>
          <li>
            Add the `N8N_WEBHOOK_URL` environment variable in Vercel pointing to
            your webhook URL.
          </li>
          <li>
            Run a test execution to confirm script, voice, and video nodes have
            valid providers.
          </li>
          <li>
            Schedule via Cron node or trigger with YouTube metrics to keep your
            channel on autopilot.
          </li>
        </ol>
      </section>
    </main>
  );
}
