import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Verify required fields
    if (!data.name || !data.email || !data.whatsapp || !data.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, this can forward to a CRM (HubSpot, Notion, Linear),
    // trigger a WhatsApp notification via Meta Graph API, or send via Resend/SendGrid.
    console.log("[HOZA STUDIO] New Inbound Project Request:", {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      whatsapp: data.whatsapp,
      country: data.country,
      service: data.service,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
    });

    return NextResponse.json({
      status: "SUCCESS",
      message: "PROJECT REQUEST RECEIVED. HOZA WILL BE IN CONTACT SHORTLY.",
      requestId: `HZ-${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process project request" },
      { status: 500 }
    );
  }
}
