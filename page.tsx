"use client";

import { useState } from "react";

const candidates = [
  {
    name: "Alex Chen",
    role: "Senior AI Engineer",
    days: "31 Days",
    missions: "12 Missions",
    attempts: "4 Attempts",
    topic: "RAG Opt.",
    signals: ["Prod-Ready Logic", "Tradeoff Aware"],
    online: true,
  },
  {
    name: "Jordan Davis",
    role: "Machine Learning Engineer",
    days: "14 Days",
    missions: "5 Missions",
    attempts: "1 Attempt",
    topic: "Model Tuning",
    signals: ["Deep Theory"],
    online: false,
  },
];

const interviewQuestions = [
  {
    topic: "RAG",
    question:
      "Explain how you would design a production-ready RAG pipeline for an enterprise application.",
  },
  {
    topic: "Vector Databases",
    question:
      "How would you choose a vector database for a production RAG system, and what tradeoffs would you consider?",
  },
  {
    topic: "Prompt Engineering",
    question:
      "How would you design and evaluate prompts for a production AI application?",
  },
  {
    topic: "Agentic AI",
    question:
      "What makes an AI agent different from a traditional LLM application, and when would you use one?",
  },
  {
    topic: "MCP",
    question:
      "Explain the Model Context Protocol and how it can help an AI agent interact with external tools.",
  },
  {
    topic: "AI Deployment",
    question:
      "How would you deploy an AI application reliably in production?",
  },
  {
    topic: "Production AI",
    question:
      "What would you monitor in a production AI system, and how would you handle failures?",
  },
  {
    topic: "Architecture",
    question:
      "Design an end-to-end enterprise AI system and explain the major engineering tradeoffs.",
  },
];

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  if (interviewStarted && selectedCandidate) {
    if (interviewComplete) {
      return (
        <main className="min-h-screen bg-[#131316] text-[#e4e1e6]">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#adc6ff]">
              PROBE / ASSESSMENT COMPLETE
            </p>

            <h1 className="mt-4 text-4xl font-bold">Interview Complete</h1>

            <p className="mt-3 text-[#c2c6d6]">
              Technical interview completed for {selectedCandidate}.
            </p>

            <div className="mt-10 rounded-2xl border border-[#424754] bg-[#1b1b1e] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8c909f]">
                Evaluation Summary
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Adaptive assessment completed successfully.
              </h2>

              {evaluation && (
                <div className="mt-6 rounded-xl border border-[#424754] bg-[#101012] p-5">
                  <p className="text-sm text-[#8c909f]">FINAL AI ASSESSMENT</p>

                  <p className="mt-3 text-lg">{evaluation.assessment}</p>

                  {evaluation.score !== undefined && (
                    <p className="mt-4 text-2xl font-bold text-[#adc6ff]">
                      Score: {evaluation.score}/10
                    </p>
                  )}

                  {evaluation.strengths?.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-[#6ffbbe]">
                        Strengths
                      </p>

                      <ul className="mt-2 list-disc pl-5 text-sm text-[#c2c6d6]">
                        {evaluation.strengths.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {evaluation.gaps?.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-[#ffb4ab]">
                        Areas to Improve
                      </p>

                      <ul className="mt-2 list-disc pl-5 text-sm text-[#c2c6d6]">
                        {evaluation.gaps.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-[#424754] bg-[#101012] p-5">
                  <p className="text-sm text-[#8c909f]">Questions</p>
                  <p className="mt-2 text-2xl font-bold">8 / 8</p>
                </div>

                <div className="rounded-xl border border-[#424754] bg-[#101012] p-5">
                  <p className="text-sm text-[#8c909f]">Curriculum Areas</p>
                  <p className="mt-2 text-2xl font-bold">8</p>
                </div>

                <div className="rounded-xl border border-[#424754] bg-[#101012] p-5">
                  <p className="text-sm text-[#8c909f]">Status</p>
                  <p className="mt-2 text-2xl font-bold text-[#6ffbbe]">
                    Complete
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInterviewStarted(false);
                  setInterviewComplete(false);
                  setQuestionNumber(1);
                  setAnswer("");
                  setEvaluation(null);
                }}
                className="mt-8 rounded-lg border border-[#424754] px-5 py-3 text-sm font-semibold hover:bg-[#2a2a2d]"
              >
                Return to Candidate Pool
              </button>
            </div>
          </div>
        </main>
      );
    }

    const currentQuestion = interviewQuestions[questionNumber - 1];

    return (
      <main className="min-h-screen bg-[#131316] text-[#e4e1e6]">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#adc6ff]">
            PROBE / LIVE INTERVIEW
          </p>

          <h1 className="mt-3 text-4xl font-bold">Technical Interview</h1>

          <p className="mt-2 text-[#c2c6d6]">
            Candidate: {selectedCandidate}
          </p>

          <div className="mt-10 rounded-2xl border border-[#424754] bg-[#1b1b1e] p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-[#8c909f]">
                QUESTION {questionNumber} / {interviewQuestions.length}
              </span>

              <span className="rounded-full bg-[#adc6ff]/10 px-3 py-1 text-xs text-[#adc6ff]">
                {currentQuestion.topic}
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-relaxed">
              {currentQuestion.question}
            </h2>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={loading}
              className="mt-8 min-h-48 w-full rounded-xl border border-[#424754] bg-[#101012] p-5 text-sm outline-none placeholder:text-[#8c909f] focus:border-[#adc6ff] disabled:opacity-50"
              placeholder="Explain your approach, tradeoffs, and engineering decisions..."
            />

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-[#8c909f]">
                {answer.length} characters
              </p>

              <button
                type="button"
                disabled={!answer.trim() || loading}
                onClick={async () => {
                  if (!answer.trim() || loading) return;

                  setLoading(true);

                  try {
                    const response = await fetch("/api/evaluate", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        candidate: selectedCandidate,
                        question: currentQuestion.question,
                        answer: answer,
                        questionNumber: questionNumber,
                      }),
                    });

                    const responseText = await response.text();

                    console.log("API status:", response.status);
                    console.log("API response:", responseText);

                    let data: any = {};

                    try {
                      data = responseText
                        ? JSON.parse(responseText)
                        : {};
                    } catch {
                      console.error(
                        "API returned invalid JSON:",
                        responseText
                      );

                      alert(
                        "The AI server returned an invalid response. Check the VS Code terminal."
                      );

                      return;
                    }

                    if (!response.ok) {
                      console.error("API Error:", data);

                      alert(
                        data.error ||
                          `AI evaluation failed (${response.status})`
                      );

                      return;
                    }

                    console.log("Interview Evaluation:", data);

                    setEvaluation(data);

                    if (
                      questionNumber === interviewQuestions.length
                    ) {
                      setInterviewComplete(true);
                      return;
                    }

                    setAnswer("");

                    setQuestionNumber((current) =>
                      Math.min(
                        current + 1,
                        interviewQuestions.length
                      )
                    );
                  } catch (error) {
                    console.error(
                      "Evaluation request failed:",
                      error
                    );

                    alert(
                      "Could not connect to the AI evaluation server. Check the VS Code terminal."
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
                className="rounded-lg bg-[#adc6ff] px-6 py-3 font-semibold text-[#002e6a] transition hover:bg-[#d8e2ff] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Evaluating..."
                  : questionNumber === interviewQuestions.length
                    ? "Finish Interview →"
                    : "Submit Answer →"}
              </button>
            </div>

            {evaluation && !interviewComplete && (
              <div className="mt-8 rounded-xl border border-[#424754] bg-[#101012] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8c909f]">
                  AI Interviewer Feedback
                </p>

                {evaluation.score !== undefined && (
                  <p className="mt-3 text-xl font-bold text-[#adc6ff]">
                    Score: {evaluation.score}/10
                  </p>
                )}

                <p className="mt-3 text-sm leading-7 text-[#c2c6d6]">
                  {evaluation.assessment}
                </p>

                {evaluation.followUpQuestion && (
                  <div className="mt-5 border-l-2 border-[#adc6ff] pl-4">
                    <p className="text-xs uppercase tracking-wider text-[#8c909f]">
                      Interviewer Probe
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      {evaluation.followUpQuestion}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#131316] text-[#e4e1e6]">
      <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center border-b border-[#424754] bg-[#0e0e11]/95 px-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-[#adc6ff]/30 bg-[#adc6ff]/10 text-[#adc6ff]">
            &gt;_
          </div>

          <div>
            <h2 className="font-bold text-[#adc6ff]">PROBE</h2>
            <p className="text-xs text-[#c2c6d6]">
              Enterprise Edition
            </p>
          </div>
        </div>

        <div className="ml-8 flex-1">
          <input
            className="w-full max-w-md rounded-lg border border-[#424754] bg-[#2a2a2d] px-4 py-2 text-sm outline-none"
            placeholder="Search candidates, skills, or cohorts..."
          />
        </div>
      </header>

      <aside className="fixed bottom-0 left-0 top-0 hidden w-64 border-r border-[#424754] bg-[#0e0e11] pt-20 md:flex md:flex-col">
        <div className="px-5 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-[#adc6ff]/30 bg-[#adc6ff]/10 text-[#adc6ff]">
              &gt;_
            </div>

            <div>
              <h2 className="font-bold text-[#adc6ff]">PROBE</h2>
              <p className="text-xs text-[#c2c6d6]">
                Enterprise Edition
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] italic text-[#8c909f]">
            An AI interviewer that digs deeper.
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          <NavItem active label="Candidates" icon="◉" />
          <NavItem label="Briefings" icon="✦" />
          <NavItem label="Live Session" icon="&gt;_" />
          <NavItem label="Assessments" icon="▥" />
        </nav>

        <div className="px-3 pb-5">
          <NavItem label="Settings" icon="⚙" />
        </div>
      </aside>

      <section className="min-h-screen pt-16 md:ml-64">
        <div className="mx-auto max-w-[1600px] p-6 md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Candidate Pool
              </h1>

              <p className="mt-2 text-sm text-[#c2c6d6]">
                Select a candidate to initiate an adaptive evaluation
                session.
              </p>
            </div>

            <div className="flex w-fit items-center gap-1 rounded-lg border border-[#424754] bg-[#1f1f22] p-1">
              <button className="rounded bg-[#2a2a2d] px-4 py-2 text-xs font-medium">
                All Active
              </button>

              <button className="rounded px-4 py-2 text-xs text-[#c2c6d6]">
                AI Cohort &apos;24
              </button>

              <button className="rounded px-4 py-2 text-xs text-[#c2c6d6]">
                Waitlist
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.name}
                candidate={candidate}
                selected={selectedCandidate === candidate.name}
                onStart={() =>
                  setSelectedCandidate(candidate.name)
                }
              />
            ))}

            <button className="flex min-h-[340px] flex-col items-center justify-center rounded-xl border border-dashed border-[#424754] bg-[#1b1b1e]/40 p-6 text-center transition hover:bg-[#1b1b1e]">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#424754] bg-[#2a2a2d] text-3xl text-[#8c909f]">
                +
              </div>

              <h3 className="text-lg font-semibold">
                Import Candidates
              </h3>

              <p className="mt-2 max-w-[220px] text-sm text-[#c2c6d6]">
                Connect your ATS or upload a CSV to populate the
                evaluation queue.
              </p>
            </button>
          </div>

          {selectedCandidate && (
            <div className="mt-8 rounded-xl border border-[#adc6ff]/30 bg-[#1b1b1e] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#adc6ff]">
                Interview Session
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {selectedCandidate} is ready for evaluation.
              </h2>

              <p className="mt-2 text-sm text-[#c2c6d6]">
                The adaptive interviewer will select questions based
                on the candidate&apos;s learning journey and previous
                answers.
              </p>

              <button
                type="button"
                onClick={() => {
                  setInterviewStarted(true);
                  setQuestionNumber(1);
                  setAnswer("");
                  setInterviewComplete(false);
                  setEvaluation(null);
                }}
                className="mt-5 rounded-lg bg-[#adc6ff] px-5 py-3 text-sm font-semibold text-[#002e6a] hover:bg-[#d8e2ff]"
              >
                Enter Live Interview →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function NavItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`mx-1 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
        active
          ? "bg-[#571bc1] text-[#e9ddff]"
          : "text-[#c2c6d6] hover:bg-[#2a2a2d] hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function CandidateCard({
  candidate,
  selected,
  onStart,
}: {
  candidate: (typeof candidates)[number];
  selected: boolean;
  onStart: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-xl border bg-[#1b1b1e]/80 p-6 ${
        selected
          ? "border-[#adc6ff]"
          : "border-[#424754]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2a2a2d] text-sm font-semibold text-[#adc6ff]">
            {candidate.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {candidate.name}
            </h3>

            <p className="text-sm text-[#c2c6d6]">
              {candidate.role}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-xl text-[#8c909f]"
        >
          ⋮
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-lg border border-[#2d2d35] bg-[#101012] p-3">
        <Stat value={candidate.days} label="Cohort" />

        <Stat
          value={candidate.missions}
          label="Completed"
          border
        />

        <Stat
          value={candidate.attempts}
          label={candidate.topic}
        />
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-wider text-[#8c909f]">
          Detected Signals
        </span>

        <div className="mt-2 flex flex-wrap gap-2">
          {candidate.signals.map((signal) => (
            <span
              key={signal}
              className="rounded-md bg-[#4edea3]/10 px-2 py-1 text-[11px] text-[#6ffbbe]"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex gap-3 pt-4">
        <button
          type="button"
          onClick={onStart}
          className="flex flex-1 items-center justify-center rounded-lg bg-[#adc6ff] px-4 py-2.5 text-sm font-medium text-[#002e6a] transition hover:bg-[#d8e2ff]"
        >
          ▶ Start Interview
        </button>

        <button
          type="button"
          className="flex flex-1 items-center justify-center rounded-lg border border-[#424754] px-4 py-2.5 text-sm transition hover:bg-[#2a2a2d]"
        >
          ◷ View Log
        </button>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  border = false,
}: {
  value: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-1 text-center ${
        border ? "border-x border-[#2d2d35]" : ""
      }`}
    >
      <span className="font-semibold">{value}</span>

      <span className="mt-1 text-[11px] text-[#8c909f]">
        {label}
      </span>
    </div>
  );
}