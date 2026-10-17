import { NextResponse } from "next/server";
import { z } from "zod";
import { addMessage } from "@/lib/messages";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(8).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    await addMessage({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
