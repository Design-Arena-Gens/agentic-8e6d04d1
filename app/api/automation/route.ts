import { NextResponse } from "next/server";
import {
  triggerN8nAutomation,
  type VideoAutomationPayload
} from "@/lib/n8n";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VideoAutomationPayload;

    const requiredFields: Array<keyof VideoAutomationPayload> = [
      "channelName",
      "topic",
      "objective",
      "durationPreference",
      "callToAction",
      "voiceProfile",
      "targetAudience",
      "language"
    ];

    const missing = requiredFields.filter(
      (field) => !payload[field] || String(payload[field]).trim().length === 0
    );

    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missing.join(", ")}`
        },
        { status: 400 }
      );
    }

    payload.referenceLinks = (payload.referenceLinks ?? []).filter(
      (link) => link.trim().length > 0
    );

    const result = await triggerN8nAutomation(payload);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Automation failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to trigger automation"
      },
      { status: 500 }
    );
  }
}
