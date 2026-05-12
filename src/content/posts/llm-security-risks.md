---
title: "LLM Security Risks: The Top Threats Facing Large Language Models in 2025"
description: "Prompt injection, data poisoning, excessive agency, and system prompt leakage — a practitioner breakdown of the LLM security risks catalogued by OWASP and NIST for 2025 deployments."
pubDate: 2026-05-12
author: "Tech Sentinel Newsroom"
tags: ["llm-security", "prompt-injection", "owasp", "generative-ai", "ai-security"]
category: "vulnerability"
sources:
  - title: "OWASP Top 10 for Large Language Model Applications 2025"
    url: "https://genai.owasp.org/llm-top-10/"
  - title: "LLM01:2025 Prompt Injection — OWASP Gen AI Security Project"
    url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/"
  - title: "NIST AI 600-1: Artificial Intelligence Risk Management Framework — Generative AI Profile"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
  - title: "How Microsoft Defends Against Indirect Prompt Injection Attacks"
    url: "https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks"
schema:
  type: "TechArticle"
---

LLM security risks have moved from research curiosity to active operational concern. Security teams deploying large language models in production now face a documented, evolving set of attack classes — prompt injection, data poisoning, excessive agency, and more — that standard application security controls were never designed to catch.

Two authoritative frameworks have emerged to map this landscape: [OWASP's Top 10 for Large Language Model Applications](https://genai.owasp.org/llm-top-10/), updated for 2025, and [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), a generative AI risk profile published in July 2024. Together they give security practitioners a structured vocabulary for what can go wrong and where to focus defenses.

## The OWASP Top 10 for LLMs: What's on the List

OWASP's working group, drawing on real-world deployment data, identified ten risk categories for LLM applications in 2025. The list reflects both novel AI-specific threats and familiar application security problems that manifest differently when a language model is in the chain:

1. **Prompt Injection** — Malicious or accidental user input alters LLM behavior, bypassing safety guidelines or extracting sensitive data.
2. **Sensitive Information Disclosure** — Models expose confidential data from training sets, context windows, or connected systems.
3. **Supply Chain** — Compromised pre-trained models, datasets, or third-party plugins introduce vulnerabilities before deployment.
4. **Data and Model Poisoning** — Tampered training or fine-tuning data shapes model outputs to serve attacker goals.
5. **Improper Output Handling** — LLM outputs passed downstream without sanitization enable injection attacks in connected systems (SQL injection, XSS, command injection).
6. **Excessive Agency** — Models granted broad tool access or autonomous action capabilities create high-impact blast radii when manipulated.
7. **System Prompt Leakage** — Confidential instructions embedded in system prompts are extracted through adversarial queries.
8. **Vector and Embedding Weaknesses** — Security gaps in retrieval-augmented generation (RAG) pipelines enable data poisoning through vector stores.
9. **Misinformation** — Models produce false or misleading content, including fabricated citations, with high apparent confidence.
10. **Unbounded Consumption** — Uncontrolled resource usage leads to denial-of-service conditions or financial exploitation through excessive API calls.

## Prompt Injection: Still the Primary Attack Vector

[Prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) holds the top position because it is structurally difficult to eliminate. The vulnerability is rooted in how LLMs process instructions: the model cannot reliably distinguish between legitimate operator directives and attacker-supplied instructions embedded in user input or external content.

**Direct injection** is the simpler variant — an attacker crafts input that overrides the system prompt or manipulates the model into producing prohibited output. **Indirect injection** is more dangerous in production environments. Here, an LLM processing external content (web pages, documents, emails, API responses) encounters hidden instructions embedded in that content. The model executes those instructions as if they came from a trusted source.

Microsoft documented this class of attack in detail in July 2025, describing how an attacker with no direct system access can embed malicious instructions in a document or webpage that a corporate AI assistant will later process. In one documented scenario involving Microsoft 365 Copilot, a specially crafted email triggered the AI to autonomously exfiltrate corporate data — without any user action. Microsoft's response involves three defensive layers: system prompt hardening using "Spotlighting" (marking untrusted content with explicit delimiters), [Prompt Shields](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks) (an AI classifier trained on injection patterns), and deterministic blocking of known data exfiltration methods.

The full taxonomy of injection techniques — including RAG poisoning, multimodal attacks, and base64-encoded obfuscation — is covered in depth at [promptinjection.report](https://promptinjection.report).

## Data Poisoning and Supply Chain Risk

Data and model poisoning attacks target the model before it reaches production. An attacker who can influence training or fine-tuning data can introduce subtle biases, backdoors, or triggered behaviors that activate under specific conditions.

The supply chain risk is closely related. Most organizations deploying LLMs rely on foundation models from third-party providers, fine-tuned on proprietary data and extended with third-party plugins or tool integrations. Each of those components is a trust boundary. A compromised model weight file, a malicious dataset from a public repository, or a backdoored LLM plugin can all introduce security issues that are invisible to standard code review.

NIST AI 600-1 specifically flags supply chain provenance as a priority risk category — organizations should maintain software bills of materials (SBOMs) for AI components and require attestations on training data sourcing. For teams building on open-source models, [adversarialml.dev](https://adversarialml.dev) tracks active research on poisoning attacks and detection techniques.

## Excessive Agency: The Expanding Blast Radius

OWASP expanded its coverage of excessive agency significantly for the 2025 list, reflecting the rapid growth of agentic LLM deployments. When a model is granted the ability to call APIs, read files, send emails, or execute code, a successful prompt injection attack escalates from data disclosure to full system compromise.

The risk is compounded by how agency is typically scoped. Development teams often grant broad permissions during prototyping and never tighten them for production. A model that can read any file in a directory, call any endpoint in a service, or send messages to any recipient is a high-value target for attackers who know how to issue the right instructions.

Least-privilege tool access is the primary mitigation: each tool an LLM agent can invoke should be scoped to the minimum necessary permissions, and high-impact actions (sending emails, writing to databases, executing system commands) should require explicit human confirmation before execution. Teams deploying guardrail layers to enforce these controls can find comparative tooling coverage at [guardml.io](https://guardml.io).

## Mitigation: A Defense-in-Depth Approach

No single control addresses the full LLM security risks surface. Effective deployments layer multiple controls:

- **Input validation and output sanitization** — treat LLM inputs as untrusted user data and LLM outputs as untrusted content before passing them to downstream systems.
- **Privilege scoping** — constrain what tools and data the model can access based on session context and user role.
- **Architectural isolation** — keep sensitive data out of contexts that process untrusted external content; maintain clear trust boundaries between system prompts and user-supplied data.
- **Monitoring and anomaly detection** — log all model interactions and flag unusual patterns: unexpected tool calls, abnormal output formats, or high-volume API consumption. [sentryml.com](https://sentryml.com) covers the MLOps observability layer that makes this practical at scale.
- **Red-teaming and adversarial testing** — run structured adversarial evaluations against deployed models before and after updates, using the frameworks catalogued at [aisecbench.com](https://aisecbench.com).

The NIST AI 600-1 profile adds governance requirements on top of technical controls: documented risk assessments, content provenance tracking, incident disclosure procedures, and pre-deployment testing against defined threat models.

The common thread across all guidance is that LLMs require security controls that operate at the semantic level, not just the syntactic. Standard WAF rules and input length limits catch the easy cases. The harder cases — an indirect injection hidden in a PDF summary, a poisoned embedding quietly shaping retrieval results — require controls built to understand what the model is doing, not just what bytes it is receiving.

---

## Sources

- **[OWASP Top 10 for Large Language Model Applications 2025](https://genai.owasp.org/llm-top-10/)** — The authoritative community-maintained risk catalogue for LLM applications, updated annually with real-world deployment data.
- **[LLM01:2025 Prompt Injection — OWASP Gen AI Security Project](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)** — Detailed breakdown of direct and indirect prompt injection attack scenarios with mitigation guidance.
- **[NIST AI 600-1: Generative AI Risk Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)** — U.S. government AI risk management profile covering twelve risk categories including information security, privacy, and supply chain risks for generative AI systems.
- **[How Microsoft Defends Against Indirect Prompt Injection Attacks](https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks)** — Microsoft Security Response Center's technical breakdown of indirect prompt injection threats and the defense-in-depth controls deployed across Microsoft 365 AI products.
