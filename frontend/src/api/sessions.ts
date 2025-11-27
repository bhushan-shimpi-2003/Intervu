// src/api/sessions.ts
import api from "./client";

export type CreateSessionPayload = {
  domain: string;
  role: string;
  difficulty: string;
  num_questions: number;
};

export type CreateSessionResponse = {
  sessionId: string;
  questions: { id: string; text: string }[];
};

export async function createSession(payload: CreateSessionPayload): Promise<CreateSessionResponse> {
  const res = await api.post("/sessions", payload);
  return res.data as CreateSessionResponse;
}
