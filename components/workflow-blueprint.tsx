const nodes = [
  {
    name: "Webhook (Trigger)",
    description:
      "Receives configuration payload from this app. Use the provided JSON to start your automation pipeline."
  },
  {
    name: "LLM Prompt Builder",
    description:
      "OpenAI/Claude node generates narration script + shot list using the master prompt."
  },
  {
    name: "Branch: Text-to-Speech",
    description:
      "Send narration blocks to ElevenLabs, Azure, or Coqui TTS for voice assets."
  },
  {
    name: "Branch: Video Generation",
    description:
      "Prepare shot prompts for Runway, Pika, or Sora via HTTP Request nodes. Sync with voice cadence."
  },
  {
    name: "Assets Merge",
    description:
      "Combine generated scenes, captions, and voiceover into storage (e.g., S3, GDrive)."
  },
  {
    name: "YouTube Upload",
    description:
      "Leverage Google OAuth2 and YouTube nodes to publish drafts, set metadata, and schedule release."
  },
  {
    name: "Team Notification",
    description:
      "Send summary + URLs to Slack, Notion, or Airtable. Include QA checklist and manual override link."
  }
];

export default function WorkflowBlueprint() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-inner shadow-black/30">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-aurora/70">
            n8n Node Graph
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Orchestrate your AI production fleet
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Drop <code>n8n/workflow-youtube-ai.json</code> into your n8n
            instance and connect your preferred AI providers. Every node is
            wired for retries, fallbacks, and manual QA hooks.
          </p>
        </div>
      </div>
      <ol className="mt-8 grid gap-4 lg:grid-cols-3">
        {nodes.map((node, index) => (
          <li
            key={node.name}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-night/80 p-5 transition hover:border-aurora/60 hover:shadow-lg hover:shadow-aurora/20"
          >
            <span className="absolute right-4 top-4 text-3xl font-black text-white/10">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-white">{node.name}</h3>
            <p className="mt-3 text-sm text-slate-300">{node.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
