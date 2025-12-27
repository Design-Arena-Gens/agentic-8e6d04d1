"use client";

import { useMemo, useState, useTransition } from "react";
import clsx from "clsx";
import type {
  VideoAutomationPayload,
  VideoAutomationResult
} from "@/lib/n8n";

type FormState = VideoAutomationPayload & {
  referenceLinksText: string;
};

const defaultState: FormState = {
  channelName: "FutureFrame AI",
  topic: "How AI voice cloning transforms YouTube content creation",
  objective: "Educate viewers and drive sign-ups for our AI automation studio",
  durationPreference: "mid",
  callToAction:
    "Tap the link below to launch your own AI-first YouTube workflow with FutureFrame.",
  voiceProfile: "authoritative",
  targetAudience: "AI-curious creators and growth-focused content teams",
  language: "English",
  referenceLinks: [],
  referenceLinksText:
    "https://openai.com | GPT-4o launch\nhttps://runwayml.com | Runway Gen-2"
};

export default function AutomationForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [result, setResult] = useState<VideoAutomationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const references = useMemo(
    () =>
      form.referenceLinksText
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean),
    [form.referenceLinksText]
  );

  const [shareableLink, setShareableLink] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    setResult(null);
    setShareableLink(null);
    startTransition(async () => {
      try {
        const payload: VideoAutomationPayload = {
          ...form,
          referenceLinks: references
        };
        const response = await fetch("/api/automation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? "Unexpected error");
        }

        const data = (await response.json()) as VideoAutomationResult;
        setResult(data);
        setShareableLink(
          `${window.location.origin}/?topic=${encodeURIComponent(
            form.topic
          )}&voice=${form.voiceProfile}`
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to run automation";
        setError(message);
      }
    });
  };

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 rounded-2xl bg-white/5 p-8 shadow-xl shadow-black/20 ring-1 ring-white/10 backdrop-blur">
          <header className="space-y-1">
            <p className="text-sm uppercase tracking-widest text-aurora/70">
              Mission Control
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Configure your AI YouTube workflow
            </h2>
            <p className="text-sm text-slate-300">
              The form below generates the system prompt delivered to n8n. You
              can drop this payload into an n8n webhook or run it locally.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Channel name" htmlFor="channelName">
              <input
                id="channelName"
                value={form.channelName}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    channelName: event.target.value
                  }))
                }
                placeholder="Channel brand"
              />
            </Field>
            <Field label="Primary audience" htmlFor="audience">
              <input
                id="audience"
                value={form.targetAudience}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    targetAudience: event.target.value
                  }))
                }
                placeholder="Startup founders, solopreneurs..."
              />
            </Field>
          </div>

          <Field label="Topic" htmlFor="topic">
            <textarea
              id="topic"
              rows={3}
              value={form.topic}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, topic: event.target.value }))
              }
            />
          </Field>

          <Field label="Objective" htmlFor="objective">
            <textarea
              id="objective"
              rows={2}
              value={form.objective}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  objective: event.target.value
                }))
              }
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Duration">
              <div className="grid grid-cols-3 gap-2">
                {(["short", "mid", "long"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        durationPreference: option
                      }))
                    }
                    className={clsx(
                      "rounded-xl px-3 py-2 text-sm font-semibold capitalize transition",
                      form.durationPreference === option
                        ? "bg-aurora text-night"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Voice profile">
              <select
                value={form.voiceProfile}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    voiceProfile: event.target.value as FormState["voiceProfile"]
                  }))
                }
              >
                <option value="friendly">Friendly guide</option>
                <option value="authoritative">Authoritative expert</option>
                <option value="enthusiastic">Enthusiastic storyteller</option>
                <option value="calm">Calm documentary</option>
              </select>
            </Field>
          </div>

          <Field label="Call to action">
            <textarea
              rows={2}
              value={form.callToAction}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  callToAction: event.target.value
                }))
              }
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Language">
              <input
                value={form.language}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    language: event.target.value
                  }))
                }
              />
            </Field>
            <Field label="Reference links">
              <textarea
                rows={3}
                value={form.referenceLinksText}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    referenceLinksText: event.target.value
                  }))
                }
              />
              <p className="text-xs text-slate-400">
                One per line, optional notes allowed (e.g.{" "}
                <span className="italic">https://example.com | research pdf</span>
                ).
              </p>
            </Field>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Building automation..." : "Generate prompts"}
            </button>
            <button
              type="button"
              className="bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/20"
              onClick={() => {
                setForm(defaultState);
                setResult(null);
                setError(null);
                setShareableLink(null);
              }}
              disabled={isPending}
            >
              Reset Defaults
            </button>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </p>
          ) : null}
        </div>

        <aside className="flex h-full flex-col gap-5">
          <div className="rounded-2xl bg-white/5 p-7 shadow-lg shadow-black/20 ring-1 ring-white/10">
            <h3 className="text-lg font-semibold text-white">
              Live payload preview
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Use this JSON inside your n8n Webhook node. Pass it into OpenAI,
              TTS, and video generator nodes downstream.
            </p>
            <pre className="mt-4 max-h-[26rem] overflow-auto whitespace-pre-wrap rounded-xl bg-black/60 p-4 text-xs text-emerald-200">
              {JSON.stringify(
                {
                  channelName: form.channelName,
                  topic: form.topic,
                  objective: form.objective,
                  durationPreference: form.durationPreference,
                  callToAction: form.callToAction,
                  voiceProfile: form.voiceProfile,
                  targetAudience: form.targetAudience,
                  referenceLinks: references,
                  language: form.language
                },
                null,
                2
              )}
            </pre>
          </div>
          <PlaybookCard />
        </aside>
      </section>

      {result ? (
        <section className="grid gap-6 lg:grid-cols-3">
          <PromptPanel
            title="Master Prompt"
            highlight="Feed this into your n8n LLM node"
            content={result.prompt}
          />
          <PromptPanel
            title="Narration Script"
            highlight="Push to your text-to-video + TTS steps"
            content={result.script}
          />
          <PromptPanel
            title="Voice Direction & Workflow"
            highlight="Guides TTS settings + automation routing"
            content={`${result.voiceDirection}\n\n${result.workflowSummary}`}
            footer={
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">
                  Recommended assets
                </p>
                <ul className="space-y-1 text-sm text-slate-200">
                  {result.assets.map((asset) => (
                    <li key={asset.label}>
                      <a href={asset.url} target="_blank" rel="noreferrer">
                        {asset.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        </section>
      ) : null}

      {shareableLink ? (
        <div className="rounded-2xl border border-aurora/50 bg-aurora/10 p-6 text-sm text-slate-100">
          <p className="font-medium text-aurora">
            Share this configuration link with your team
          </p>
          <p className="mt-2 break-all font-mono text-xs">{shareableLink}</p>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
      <span className="flex items-center gap-2">
        <span>{label}</span>
      </span>
      {children}
    </label>
  );
}

function PromptPanel({
  title,
  highlight,
  content,
  footer
}: {
  title: string;
  highlight: string;
  content: string;
  footer?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl bg-white/5 p-6 shadow-xl shadow-black/20 ring-1 ring-white/10">
      <header>
        <p className="text-xs uppercase tracking-widest text-aurora/70">
          {highlight}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
      </header>
      <pre className="flex-1 overflow-auto whitespace-pre-wrap rounded-xl bg-black/60 p-4 text-xs text-slate-200 shadow-inner">
        {content}
      </pre>
      {footer}
    </article>
  );
}

function PlaybookCard() {
  const playbook = [
    {
      title: "1. Capture triggers",
      description:
        "Use an n8n Cron or YouTube Analytics watch to decide when to ideate the next video."
    },
    {
      title: "2. Generate script",
      description:
        "Call OpenAI, Claude, or Gemini via the n8n LLM node using the master prompt above."
    },
    {
      title: "3. Create narration",
      description:
        "Push narration blocks to ElevenLabs, Azure TTS, or Coqui for voice synthesis."
    },
    {
      title: "4. Render video",
      description:
        "Pass scenes to Runway, Pika, or Stable Video. Upload to Google Drive or YouTube."
    },
    {
      title: "5. Notify team",
      description:
        "Send the deliverables to Slack, Notion, or Airtable via n8n's built-in connectors."
    }
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-aurora/10 via-white/5 to-ember/10 p-[1px]">
      <div className="space-y-4 rounded-[1.5rem] bg-night/90 p-6">
        <h4 className="text-lg font-semibold text-white">
          Automation playbook
        </h4>
        <ul className="space-y-3 text-sm text-slate-200">
          {playbook.map((step) => (
            <li key={step.title} className="rounded-xl border border-white/10 p-3">
              <p className="text-aurora font-semibold">{step.title}</p>
              <p className="mt-1 text-slate-300">{step.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
